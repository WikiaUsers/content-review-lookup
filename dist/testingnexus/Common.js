/* Any JavaScript here will be loaded for all users on every page load. */
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

const coloredTables = new Set(); // Track colored tables

function applyColorsToTableCells() {
    document.querySelectorAll("table").forEach(table => {
        if (coloredTables.has(table)) return; // Skip already colored table

        table.querySelectorAll("td").forEach(cell => {
            const text = cell.textContent.trim();
            if (!text) return; // Skip empty cells
			
			let match = false;
			for (const code in colorMap) {
				match = text.includes(code);
				if (match) {break}
			}
            if (!match) return; // Skip invalid formats

            if (colorMap[code]) {
                cell.style.backgroundColor = colorMap[code];
                // cell.style.color = ["YLW", "CYN", "GLD", "PNK", "ORG"].includes(code) ? "black" : "white"; // for contrast
            }
        });

        coloredTables.add(table); // Mark table as colored
    });
}

// Apply colors to existing tables
applyColorsToTableCells();

// Observer to watch for dynamically added tables anywhere in the document
const observer = new MutationObserver(mutations => {
    let newTableAdded = false;
    
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === "TABLE" || node.querySelector?.("table")) {
                    newTableAdded = true;
                }
            });
        }
    });

    if (newTableAdded) {
        applyColorsToTableCells();
    }
});
observer.observe(document.body, { childList: true, subtree: true });

// mw.hook("wikipage.content").add(function($content) {
//     // code to run
// });