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

  // Get full response data from latest submission
  const response = form
    .getResponses()
    .filter(
      (r) => r.getTimestamp().getTime() === e.namedValues.Timestamp.getTime()
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
        (i) => i.getItem().getType() === FormApp.ItemType.MULTIPLE_CHOICE
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
    console.log('Identified existing subscription, performing insert');
    // Add new row
    subSheet.appendRow(responseData);
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
  const timestamp = form.getResponses()[0].getTimestamp();

  // Run function with test value
  onFormSubmit({
    namedValues: {
      Timestamp: timestamp,
    },
  });
}
