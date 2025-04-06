/* Any JavaScript here will be loaded for all users on every page load. */

const coloredTables = new Set(); // Track colored tables


function applyColorsToTableCells() {
	
	const cols = ["UTR", "MOR", "CMP", "LTL", "OTT"];
	const rows = ["PP", "P", "SP", "", "M", "SN", "N", "NN"];
	const default_row = rows.indexOf("")
	
	const row1 = ["#c9daf8", "#a4c2f4", "#6d9eeb", "#3c78d8", "#4a86e8"];
	const row2 = ["#d0e0e3", "#a2c4c9", "#76a5af", "#45818e", "#00ffff"];
	const row3 = ["#d9ead3", "#b6d7a8", "#93c47d", "#6aa84f", "#00ff00"];
	const row4 = ["#fff2cc", "#ffe599", "#ffd966", "#f1c232", "#ffff00"];
	const row5 = ["#fce5cd", "#f9cb9c", "#f6b26b", "#e69138", "#ff9900"];
	const row6 = ["#f4cccc", "#ea9999", "#e06666", "#cc0000", "#ff0000"];
	const row7 = ["#ead1dc", "#d5a6bd", "#c27ba0", "#a64d79", "#ff00ff"];
	const row8 = ["#d9d2e9", "#b4a7d6", "#8e7cc3", "#674ea7", "#9900ff"];
		
	const colorMap = [
		row1,
		row2,
		row3,
		row4,
		row5,
		row6,
		row7,
		row8,
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