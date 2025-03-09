/* Any JavaScript here will be loaded for all users on every page load. */

const coloredTables = new Set(); // Track colored tables


function applyColorsToTableCells() {
	
	const colorMap = {
	    "RED": "#FF0000",
	    "BLU": "#0000FF",
	    "GRN": "#008000",
	    "YLW": "#FFFF00",
	    "ORG": "#FFA500",
	    "PNK": "#FFC0CB",
	    "PUR": "#800080",
	    "BRN": "#A52A2A",
	    "GRY": "#808080",
	    "CYN": "#00FFFF",
	    "TEA": "#008080",
	    "GLD": "#FFD700"
	};

    $("table").each(function() {
        if (coloredTables.has($(this))) return; // Skip already colored table

        $(this).find("td").each(function() {
            var text = $(this).text().trim();
            if (isNaN(text)) return; // Skip empty cells
			
			var code = text.split("-")[0]
            if (colorMap.hasOwnProperty(code)) {
                $(this).css({
                	"background-color": colorMap[code],
                	"color": ["YLW", "CYN", "GLD", "PNK", "ORG"].includes(code) ? "black" : "white", // for contrast
                });
            }
        });

        coloredTables.add($(this)); // Mark table as colored
    });
}

// // Observer to watch for dynamically added tables anywhere in the document
// const observer = new MutationObserver(mutations => {
//     let newTableAdded = false;
    
//     mutations.forEach(mutation => {
//         if (mutation.addedNodes.length > 0) {
//             mutation.addedNodes.forEach(node => {
//                 if (node.tagName === "TABLE" || node.querySelector?.("table")) {
//                     newTableAdded = true;
//                 }
//             });
//         }
//     });

//     if (newTableAdded) {
//         applyColorsToTableCells();
//     }
// });
// observer.observe(document.body, { childList: true, subtree: true });

mw.hook("wikipage.content").add(function($content) {
	
    // Apply colors to existing tables
	applyColorsToTableCells();
});