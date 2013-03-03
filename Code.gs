function getFromNamedRange(spreadSheet, sheetName, rangeName) {
  var DATA_OFFSET = 1
  var sheet = spreadSheet.getSheetByName(sheetName);
  var range = spreadSheet.getRangeByName(rangeName);

  var headersRange = sheet.getRange(range.getRow(), range.getColumn(), 1, range.getLastColumn());
  var dataRange = sheet.getRange(range.getRow() + DATA_OFFSET, range.getColumn(), range.getLastRow(), range.getLastColumn());

  return [headersRange, dataRange];
}

function getHeaders(ranges) {
  return ranges[0].getValues();
}

function getData(ranges) {
  return ranges[1].getValues();
}

function getContentForTwitterBootstrap() { 
  var content = Bootstrap.getBootstrapContents(
    "http://bootstrap_path/img/glyphicons-halflings.png", 
    "http://bootstrap_path/img/glyphicons-halflings-white.png"
    ); //this args are icon image path. u can chage it your own. 
  return content;
}

function doGet() {
  var spreadsheetId = 'id of the spreadsheet from the URL';
  var ss = SpreadsheetApp.openById(spreadsheetId);
  
  var t = HtmlService.createTemplateFromFile('index');
  var headersAndData = getFromNamedRange(ss, 'Data Set', 'RangeForExport')
  t.headers = getHeaders(headersAndData);
  t.data = getData(headersAndData);
  t.bootstrapContent = getContentForTwitterBootstrap();
  return t.evaluate();
}

