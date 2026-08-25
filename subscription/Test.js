/**
 * Test function for form data update
 */
function testFormSubmit() {
  // Connect to linked form
  const ss = SpreadsheetApp.getActive();
  const form = FormApp.openByUrl(ss.getFormUrl());

  // Get first timestamp value
  const formTimestamp = form.getResponses()[1].getTimestamp();
  const timestamp = ss
    .getSheetByName('Form responses 1')
    .getDataRange()
    .getValues()
    .slice(1)[0][0];
  const dateString = Utilities.formatDate(
    timestamp,
    'Europe/Dublin',
    'dd/MM/yyyy HH:mm:ss',
  );
  const formDateString = Utilities.formatDate(
    formTimestamp,
    'Europe/Dublin',
    'dd/MM/yyyy HH:mm:ss',
  );
  console.log(dateString, formDateString);

  // Run function with test value
  onFormSubmit({
    namedValues: {
      Timestamp: [dateString],
    },
  });
}

/**
 * Test date filter logic for blog retrieval
 */
function testNewBlogs() {
  // Use prior date for test
  const testDate = new Date('2025-11-08');

  // Retrieve blog data
  const blogResults = getNewBlogs(testDate);

  // Check
  const novBlog = blogResults.entries.filter((e) =>
    e.publishedDate.toISOString().startsWith('2025-11-09'),
  );
  if (!novBlog.length) {
    throw 'November blog missing from results';
  }
}
