/* Any JavaScript here will be loaded for all users on every page load. */
console.log("COMMON.JS Executed");
importScript('MediaWiki:DynamicRemainingItemsTable.js');


console.log("Searching for Checkbox tracker");
document.querySelectorAll('.last-column table.table-progress-tracking').forEach(table => {
  // move header
  let headerRow = table.querySelector('tr');
  if (headerRow) {
    let firstHeader = headerRow.querySelector('th:first-child');
    if (firstHeader) {
      headerRow.appendChild(firstHeader);
    }
  }

  //move column
  table.querySelectorAll('tr').forEach(row => {
    let firstCell = row.querySelector('td:first-child');
    if (firstCell) {
      row.appendChild(firstCell);
    }
  });
});

console.log("COMMON.JS END");