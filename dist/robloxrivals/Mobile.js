/* All JavaScript here will be loaded for users of the mobile site */

@import url("/MediaWiki:Common.js?ctype=text/css&action=raw");

	// ==================== Table Counter ====================

	function updateCounts() {
	    const tables = document.querySelectorAll(
	        '.count-table[data-type][data-id]'
	    );
	
	    tables.forEach(function (table) {
	        const type = table.dataset.type;
	        const rarity = table.dataset.id;
	
	        const count = table.querySelectorAll('tr').length - 1;
	
	        const counter =
	            document.getElementById(
	                `${type}-${rarity}-count`
	            );
	
	        if (counter) {
	            counter.textContent = count;
	        }
	    });
	}