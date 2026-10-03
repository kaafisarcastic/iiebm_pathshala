/**
 * Lead webhook for Google Sheets.
 *
 * Paste this into the sheet via Extensions → Apps Script, set SECRET to the
 * same value as GOOGLE_SHEET_SECRET, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Put the /exec URL in
 * GOOGLE_SHEET_WEBHOOK_URL.
 *
 * After any edit: Deploy → Manage deployments → Edit → Version: New version.
 * Saving alone does not update the live web app.
 *
 * One script serves every landing page: each sends its own tab name, and a
 * missing tab is created with the header row on its first lead.
 */

const SECRET = "change-this-to-a-long-random-word";

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply("bad request");
  }
  if (data.secret !== SECRET) return reply("forbidden");
  if (!Array.isArray(data.row) || !data.tab) return reply("bad request");

  // Serialise writes so two leads arriving together never take the same row.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const book = SpreadsheetApp.getActive();
    let sheet = book.getSheetByName(String(data.tab));
    if (!sheet) {
      sheet = book.insertSheet(String(data.tab));
      if (Array.isArray(data.headers)) {
        sheet.appendRow(data.headers);
        sheet.getRange(1, 1, 1, data.headers.length).setFontWeight("bold");
        sheet.setFrozenRows(1);
      }
    }

    const row = data.row.map(asText);
    const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
    // Plain-text format keeps phone numbers as typed (no 9.87E+09).
    range.setNumberFormat("@");
    range.setValues([row]);
  } finally {
    lock.releaseLock();
  }
  return reply("ok");
}

/**
 * Submitted text starting with = + - @ would run as a formula; a leading
 * apostrophe makes Sheets store it as plain text (the apostrophe stays hidden).
 */
function asText(value) {
  const text = value == null ? "" : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply(text) {
  return ContentService.createTextOutput(text);
}
