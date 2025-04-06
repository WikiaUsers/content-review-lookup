/* Any JavaScript here will be loaded for all users on every page load. */

const coloredTables = new Set(); // Track colored tables


function applyColorsToTableCells() {
	
	const cols = ["RED", "BLU", "YLW"];
	const rows = ["101", "202", "303"];
	const default_row = rows.indexOf("202");
	
	const row1 = ["#FF0000", "#0000FF", "#FFFF00"];
	const row2 = ["#00FFFF", "#008080", "#FFD700"];
	const row3 = ["#800080", "#FFA500", "#FFC0CB"];
	
	const colorMap = [
		row1,
		row2,
		row3,
	];
	
    $("table").each(function() {
    	
        if (coloredTables.has($(this))) return; // Skip already colored table
     
        $(this).find("tbody tr td").each(function() {
            var text = $(this).text().trim();
            
            if (typeof text !== 'string') {
            	return;
            } // Skip invalid cells
			
			var code = text.split("-");
			
			var col = code[0];
			
			var row_index = -1;
			if (code.length == 2) {
				let matchingRows = rows.filter(row => code[1].includes(row));

	            if (matchingRows.length > 0) {
	                let longestRow = matchingRows.reduce((a, b) => a.length >= b.length ? a : b);
	                row_index = rows.indexOf(longestRow);
	            }
			}
			
			let matchingCols = cols.filter(row => col.includes(cols));
            if (matchingCols.length > 1) {
                let longestCol = matchingCols.reduce((a, b) => a.length >= b.length ? a : b);
                col_index = cols.indexOf(longestCol);
            }
			
			var background_color = -1;
			
			if (col_index != -1 && row_index != -1) {
				background_color = colorMap[row_index][col_index];
			}
			else if (col_index != -1) {
				background_color = colorMap[default_row][col_index];
			}
            if (background_color != -1) {
                $(this).css({
                	"background-color": background_color,
                	"color": [
                		"#FFFF00", "#00FFFF", "#FFC0CB", "#FFA500"
            		].includes(background_color) ? "black" : "white", // for contrast
                });
            }
        });

        coloredTables.add($(this)); // Mark table as colored
    });
}

mw.hook("wikipage.content").add(function($content) {
	
    // Apply colors to existing tables
	applyColorsToTableCells();
});