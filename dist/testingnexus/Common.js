/* Any JavaScript here will be loaded for all users on every page load. */

const coloredTables = new Set(); // Track colored tables


function applyColorsToTableCells() {
	
	const row1 = ["#FF0000", "#0000FF", "#FFFF00"];
	const row2 = ["#00FFFF", "#008080", "#FFD700"];
	const row3 = ["#800080", "#FFA500", "#FFC0CB"];
	
	const colorMap = {
		row1,
		row2,
		row3,
	};
	
	const cols = ["RED", "BLUE", "YLW"];
	const rows = ["101", "202", "303"];
	
    $("table").each(function() {
    	
    	console.log(coloredTables)
    	
        if (coloredTables.has($(this))) return; // Skip already colored table
     
        $(this).find("tbody tr td").each(function() {
            var text = $(this).text().trim();
            
            console.log($(this) + "text: " + text)
            
            if (typeof text !== 'string' && isNaN(text)) {
            	return;
            } // Skip empty cells
			
			var code = text.split("-");
			var col = code[0];
			var row_index = -1;
			if (code.length == 2) {
				row_index = rows.indexOf(code[1])
			}
			col_index = cols.indexOf(col)
			var background_color = -1;
			
			if (col_index != -1 && row_index != -1) {
				background_color = colorMap[row_index][col_index];
			}
			else if (col_index != -1) {
				background_color = colorMap[0][col_index];
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