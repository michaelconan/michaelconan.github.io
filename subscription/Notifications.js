// Global definition of a day in milliseconds for date functions
const ADAY = 1000 * 60 * 60 * 24;

/**
 * Get properties from script
 */
function getScriptProperties() {
  return PropertiesService.getScriptProperties();
}

/**
 * Function to check for new blog entries via RSS feed and send
 * email notifications to active, approved subscribers with the
 * summaries and links to the blog.
 * TRIGGER: Time-based, daily @ midnight UTC
 */
function sendNotifications() {
  // Get last timestamp watermark
  const blogPropertyName ='last_blog_date';
  const scriptProperties = getScriptProperties();
  const lastBlog = scriptProperties.getProperty(blogPropertyName);
  const lastBlogDate = new Date(lastBlog);
  const blogResults = getNewBlogs(lastBlogDate);

  // Send an email if there are new entries
  const newEntries = blogResults.entries;
  if (newEntries.length > 0) {
    // Get current subscribers
    const subscribers = getActiveSubscribers();
    console.log(subscribers.length + ' subscribers to notify');
    if (subscribers.length) {
      sendMessages(blogResults.title, newEntries, subscribers);
    }
  } else {
    console.log('No new blog entries found.');
  }

  // Store check date for next run
  if (blogResults.latestDate) {
    scriptProperties.setProperty(blogPropertyName, blogResults.latestDate.toDateString());
  }
}


/**
 * Get list of blog entries based on latest blog date
 *
 * @param {Date} lastBlogDate - last blog, cached in properties
 */
function getNewBlogs(lastBlogDate) {
  const scriptProperties = getScriptProperties();
  const oneDay = 24 * 60 * 60 * 1000;
  const lastBlogDateTrunc = new Date(
    lastBlogDate.getFullYear(),
    lastBlogDate.getMonth(),
    lastBlogDate.getDate(),
  );
  let newBlogDate;

  // Get RSS feed and set namespace
  const response = UrlFetchApp.fetch(
    scriptProperties.getProperty('rss_feed_url'),
  );
  const feed = XmlService.parse(response.getContentText());
  const atomNS = XmlService.getNamespace('http://www.w3.org/2005/Atom');

  // Get all blog entries
  const blogTitle = feed.getRootElement().getChild('title', atomNS).getText();
  const entries = feed.getRootElement().getChildren('entry', atomNS);
  const newEntries = [];

  // Check if each entry is published after last check
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const publishedDate = new Date(
      entry.getChild('published', atomNS).getText(),
    );
    const publishedDateTrunc = new Date(
      publishedDate.getFullYear(),
      publishedDate.getMonth(),
      publishedDate.getDate(),
    );

    // Check if the entry is newer than the last date
    const isNew = publishedDateTrunc.getTime() - lastBlogDateTrunc.getTime() >= oneDay;
    if (isNew) {
      const title = entry.getChild('title', atomNS).getText();
      const summary = entry.getChild('summary', atomNS).getText();
      const link = entry
        .getChild('link', atomNS)
        .getAttribute('href')
        .getValue();
      // Store title, link, date
      newEntries.push({
        title: title,
        summary: summary,
        link: link,
        publishedDate: publishedDate,
      });

      // Check if log is new or later than the previous
      if (!newBlogDate || publishedDateTrunc.getTime() > newBlogDate.getTime()) {
        newBlogDate = publishedDateTrunc;
      }
    }
  }

  return {
    title: blogTitle,
    entries: newEntries,
    latestDate: newBlogDate,
  }
}


/**
 * Format and send message to subscriber list
 *
 * @param {string} blogTitle - title of blog entry
 * @param {object[]} entries - new blog entry details
 * @param {string[]} subscribers - emails to send blog alerts
 */
function sendMessages(blogTitle, entries, subscribers) {
  // Structure email details
  const subject = `New ${blogTitle} blog`;
  let body = `<h4>New entries for ${blogTitle}:</h4>`;

  // Add blogs to email body
  for (let j = 0; j < entries.length; j++) {
    const entry = entries[j];
    body += `<p><a href="${entry.link}">${entry.title}</a><br/>
      Summary: ${entry.summary}<br/>
      Published on: ${entry.publishedDate.toDateString()}</p>`;
  }
  console.log('Generated email content');

  // Send to each subscriber individually with edit link
  for (const subscriber of subscribers) {
    // Check quota remaining
    if (MailApp.getRemainingDailyQuota() > 0) {
      // Add form edit link to email body
      const subscriberBody =
        body +
        `<p>Note:<br/>To update subscription, edit the form <a href="${subscriber[2]}">here</a>.`;
      // Send email to subscriber
      MailApp.sendEmail({
        to: subscriber[3],
        subject: subject,
        htmlBody: subscriberBody,
        name: blogTitle,
      });
      console.log('Sent to: ' + subscriber[3]);
    } else {
      console.warn('Quota exceeded for day.');
      return;
    }
  }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getScriptProperties,
    getNewBlogs,
    sendMessages,
    sendNotifications,
  };
}
