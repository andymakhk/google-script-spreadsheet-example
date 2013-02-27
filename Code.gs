function getHeaders(ss) {
  return getFromNamedRange(ss)[0].getValues();
}

function getData(ss) {
  return getFromNamedRange(ss)[1].getValues();
}

function getFromNamedRange(ss) {
  var DATA_OFFSET = 1
  var sheet = ss.getSheetByName('Data Set');
  
  var range = ss.getRangeByName("RangeForExport");
  var headersRange = sheet.getRange(range.getRow(), range.getColumn(), 1, range.getLastColumn());
  var dataRange = sheet.getRange(range.getRow() + DATA_OFFSET, range.getColumn(), range.getLastRow(), range.getLastColumn());

  return [headersRange, dataRange];
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
  t.headers = getHeaders(ss);
  t.data = getData(ss);
  t.content = getContentForTwitterBootstrap();
  return t.evaluate();
}

