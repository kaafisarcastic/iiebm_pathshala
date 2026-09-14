/**
 * Apps Script backing the lead sheet.
 *
 * Setup
 *   1. Open the Google Sheet that should collect leads.
 *   2. Extensions → Apps Script, paste this file over Code.gs, and save.
 *   3. Set SECRET below to the same value you put in SHEETS_WEBHOOK_SECRET.
 *   4. Deploy → New deployment → type "Web app".
 *        Execute as:        Me
 *        Who has access:    Anyone
 *   5. Copy the /exec URL into SHEETS_WEBHOOK_URL in the app's environment.
 *
 * Re-deploy (Manage deployments → edit → New version) after any change here,
 * otherwise the old code keeps serving.
 */

var SECRET = 'change-me';
var SHEET_NAME = 'Leads';

var COLUMNS = [
  ['submittedAt', 'Submitted (IST)'],
  ['name', 'Name'],
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['city', 'City'],
  ['program', 'Program'],
  ['source', 'Form'],
  ['pageUrl', 'Page URL'],
  ['gclid', 'GCLID'],
  ['utmSource', 'utm_source'],
  ['utmMedium', 'utm_medium'],
  ['utmCampaign', 'utm_campaign'],
  ['utmTerm', 'utm_term'],
  ['utmContent', 'utm_content'],
];

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    if (SECRET && payload.secret !== SECRET) {
      return json({ ok: false, error: 'unauthorised' });
    }

    var lead = payload.lead || {};
    var sheet = getSheet();

    sheet.appendRow(
      COLUMNS.map(function (column) {
        return lead[column[0]] || '';
      })
    );

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

function getSheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    var headers = COLUMNS.map(function (column) {
      return column[1];
    });
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
