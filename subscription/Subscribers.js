// Name of Sheets tab used as subscriber database
const SHEETNAME = 'Subscriptions';

/**
 * Function to retrieve response data for subs, updated with each submission
 * TRIGGER: onFormSubmit
 * @param {object} e - event object for `onFormSubmit` Sheets event
 */
function onFormSubmit(e) {
  // Connect to linked form
  const ss = SpreadsheetApp.getActive();
  const form = FormApp.openByUrl(ss.getFormUrl());
  console.log(JSON.stringify(e.namedValues));

  // Get full response data from latest submission
  const timestamp = parseEuroDate_(e.namedValues.Timestamp[0]);
  const response = form.getResponses().filter(
    // Rounding in event object and using Utilities.formatDate are inconsistent
    // This method will perform the comparison with a threshold of 1 second
    (r) => Math.abs(timestamp.getTime() - r.getTimestamp().getTime()) < 1000,
  )[0];

  // Structure relevant data
  const responseData = [
    response.getId(),
    response.getTimestamp(),
    response.getEditResponseUrl(),
    response.getRespondentEmail(),
    // Subscription selection
    response
      .getItemResponses()
      .filter(
        (i) => i.getItem().getType() === FormApp.ItemType.MULTIPLE_CHOICE,
      )[0]
      .getResponse(),
    false, // Whether subscription approved
  ];
  console.log('Processing form response: ' + responseData[0]);

  // Get current subscriptions
  const subSheet = ss.getSheetByName(SHEETNAME);
  const sheetData = subSheet.getDataRange().getValues();

  // Filter for current response, including index
  const currentSub = sheetData
    .map((r, i) => [r[0], i])
    .filter((r) => r[0] === responseData[0]);
  // UPSERT response to spreadsheet
  // Check if updated response, otherwise append to sheet
  if (currentSub.length) {
    console.log('Identified existing subscription, performing update');
    // Update existing subscription, excluding approval field
    subSheet
      .getRange(currentSub[0][1] + 1, 1, 1, responseData.length - 1)
      .setValues([responseData.slice(0, -1)]);
  } else {
    console.log('No existing subscription, performing insert');
    // Add new row
    subSheet.appendRow(responseData);
    // Apply checkbox formatting
    const checkbox = SpreadsheetApp.newDataValidation()
      .requireCheckbox()
      .build();
    subSheet
      .getRange(subSheet.getDataRange().getLastRow(), 6)
      .setDataValidation(checkbox);
    // Notify owner to approve subscription
    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      subject: responseData[3] + ' wants to subscribe to Clan Conan',
      body: 'Refer to spreadsheet: ' + ss.getUrl(),
    });
    console.log('Sent email update to owner');
  }
}

/**
 * Function to get rows with active, approved subscriptions
 * @return {any[][]} 2d array of spreadsheet data for subscribers
 */
function getActiveSubscribers() {
  // Connect to spreadsheet
  const ss = SpreadsheetApp.getActive();
  const sheetData = ss.getSheetByName(SHEETNAME).getDataRange().getValues();

  // Return filtered data
  return sheetData.slice(1).filter((r) => r[4] === 'Yes' && r[5]);
}

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
 * Helper function to parse European format date
 *  following the convention dd/MM/yyyy HH:mm:ss
 * @param {string} dateString - string in specified format
 * @return {Date} parsed date object
 */
function parseEuroDate_(dateString) {
  // Split date and time components
  const dateTime = dateString.split(' ');
  // Split components of date
  const dateParts = dateTime[0].split('/');
  return new Date(
    `${dateParts[1]}-${dateParts[0]}-${dateParts[2]} ${dateTime[1]}`,
  );
}
