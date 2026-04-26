/* Any JavaScript here will be loaded for all users on every page load. */
//back to top button
window.BackToTopModern = true;

//Wikitable Filterable https://community.fandom.com/wiki/User_blog:Sammylau/Wikitable_Filterable:_The_Filter_for_Long_Tables
$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

// PreloadTemplate config
window.preloadTemplates_list = "MediaWiki:Custom-PreloadTemplates";
window.preloadTemplates_subpage = "syntax";
window.preloadTemplates_namespace = "Template";

//Filter table
importScript('MediaWiki:CardSelectTr.js');

//Table progress tracking
//This code adds a percent of checked boxes (completion percent) on every table that has progress tracking. The percent is added in the top left cell. 
function percent_completed() {
    // Selects all tables that have progress tracking.
    const tables = document.querySelectorAll('.table-progress-tracking');
    
    for (let i = 0; i < tables.length; i++) {
    	
    	// Important for updating percentages when page loads.
        observer.observe(tables[i], {
            subtree: true,
            childNodes: true,
            attributes: true
        });
        
        var selected_boxes = 0;
    	var total_boxes = -1; // Omits the table header row.
        for (let row of tables[i].rows) {
            total_boxes += 1;
            for (let cell of row.cells) {
                cell.addEventListener("change", percent_completed); // On cell change, update percent.
                if (cell.getAttribute('data-sort-value') == "1") {
                    selected_boxes += 1;
                }
            }
        }
        
        const th = tables[i].querySelector('th'); // Selects the first table header cell (top left).
        const text = Math.round(selected_boxes / total_boxes * 100) + '%';
        if (th.textContent !== text) {
            th.textContent = text;
        }
    }
}

const observer = new MutationObserver(percent_completed);
percent_completed(); // Execute function on page load.