/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('MediaWiki:Common.js/displayTimer.js', 'runescape');

$(document).ready(function () {
    function sortTable() {
        var table = $("#wiki-highscore-table"); // This ensures it only affects the highscore table.
        var rows = table.find("tr:nth-child(n+3)"); // Select all rows starting from the third row (exclude 2 header rows).

		// A utility function to sort user rows.
        rows.sort(function(rowA, rowB) {
            var scoreA = parseInt($(rowA).find("td:nth-child(3)").text().replace(/,/g, ''), 10);
            var scoreB = parseInt($(rowB).find("td:nth-child(3)").text().replace(/,/g, ''), 10);
            return scoreB - scoreA; // Descending order
        });

        table.append(rows); // Append rows in sorted order

        // Update ranks
        rows.each(function(index) {
            $(this).find("td:nth-child(1)").text(index + 1);
        });
    }

    // Initial sorting
    sortTable();
});