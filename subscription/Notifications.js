/**
 * Function to check for new blog entries via RSS feed and send
 * email notifications to active, approved subscribers with the
 * summaries and links to the blog.
 * TRIGGER: Time-based, daily @ midnight UTC
 */
function sendNotifications() {
  // Get last timestamp watermark
  const scriptProperties = PropertiesService.getScriptProperties();
  const lastCheck = scriptProperties.getProperty('last_check_date');
  const lastCheckDate = new Date(lastCheck);

  // Get RSS feed and set namespace
  const checkDate = new Date();
  const response = UrlFetchApp.fetch(
    scriptProperties.getProperty('rss_feed_url')
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
      entry.getChild('published', atomNS).getText()
    );

    // Check if the entry is newer than the last date
    if (publishedDate > lastCheckDate) {
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
    }
  }

  // Send an email if there are new entries
  if (newEntries.length > 0) {
    // Get current subscribers
    const subcribers = getActiveSubscribers();
    console.log(subcribers.length + ' subscribers to notify');
    if (subcribers.length) {
      // Structure email details
      const subject = `New ${blogTitle} blog`;
      let body = `<h4>New entries for ${blogTitle}:</h4>`;

      // Add blogs to email body
      for (let j = 0; j < newEntries.length; j++) {
        const entry = newEntries[j];
        body += `<p><a href="${entry.link}">${entry.title}</a><br/>
          Summary: ${entry.summary}<br/>
          Published on: ${entry.publishedDate.toDateString()}</p>`;
      }
      console.log('Generated email content');

      // Send to each subscriber individually with edit link
      for (const subcriber of subcribers) {
        // Check quota remaining
        if (MailApp.getRemainingDailyQuota() > 0) {
          // Add form edit link to email body
          const subscriberBody =
            body +
            `<p>Note:<br/>To update subscription, edit the form <a href="${subcriber[2]}">here</a>.`;
          // Send email to subscriber
          MailApp.sendEmail({
            to: subcriber[3],
            subject: subject,
            htmlBody: subscriberBody,
            name: blogTitle,
          });
          console.log('Sent to: ' + subcriber[3]);
        } else {
          console.warn('Quota exceeded for day.');
          return;
        }
      }
    }
  } else {
    console.log('No new blog entries found.');
  }

  // Store check date for next run
  scriptProperties.setProperty('last_check_date', checkDate.toDateString());
}
