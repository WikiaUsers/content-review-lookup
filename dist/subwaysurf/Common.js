/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('MediaWiki:Common.js/displayTimer.js', 'runescape');

$(document).ready(function () {
    // Function to sort the table rows by highscore
    function sortTable() {
        var table = $("#leaderboard-table"); // Select the table
        var rows = table.find("tr:nth-child(n+3)"); // Select all rows excluding the first two header rows (tr:nth-child(n+3))

        // Sort the rows based on the highscore (3rd column)
        rows.sort(function(rowA, rowB) {
            var scoreA = parseInt($(rowA).find("td:nth-child(3)").text().replace(/,/g, ''), 10);
            var scoreB = parseInt($(rowB).find("td:nth-child(3)").text().replace(/,/g, ''), 10);
            return scoreB - scoreA; // Sort in descending order
        });

        // Detach rows and append them in the correct sorted order
        rows.detach().appendTo(table);

        // Update the rank column after sorting
        rows.each(function(index) {
            $(this).find("td:nth-child(1)").text(index + 1); // Update the rank based on the row position
        });
    }

    // Call the sortTable function on page load
    sortTable();

    // Optionally: Listen for dynamic additions to the table (if you're adding rows dynamically)
    $(document).on('DOMNodeInserted', 'table tr', function () {
        sortTable();
    });
});