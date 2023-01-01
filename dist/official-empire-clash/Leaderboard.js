// Replace YOUR_SPREADSHEET_ID with the actual ID of your Google Spreadsheet
var spreadsheetId = '1naBv8yT7suk7ePNCJtFpaed2ewSeqxLJWaegdpzjVt0';

// Replace YOUR_API_KEY with your actual API key
var apiKey = 'AIzaSyAwTlTkfbL5cxg1SXE5Mm6Y5VXt_MZpVTc';

// Replace SHEET_NAME with the actual name of the sheet in your spreadsheet
var sheetName = 'Sheet1';

// Replace RANGE with the range of cells that you want to retrieve (e.g. "A2:C10")
var range = 'A1:C10';

// Construct the URL for the Google Sheets API request
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + sheetName + '!' + range + '?key=' + apiKey;

// Make a GET request to the Google Sheets API
fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // data.values is an array of rows, where each row is also an array of cell values
    var rows = data.values;

    // Sort the rows by score in descending order
    rows.sort(function(a, b) {
      return b[2] - a[2];
    });

    // Loop through the rows and insert the values into the HTML grid
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var rank = i + 1; // Calculate the rank
      var name = row[1];
      var score = row[2];

      // Insert the values into the appropriate divs
      document.getElementById('rank-' + (i+1)).innerHTML = rank;
      document.getElementById('name-' + (i+1)).innerHTML = name;
      document.getElementById('score-' + (i+1)).innerHTML = score;
    }
  });