// ############## DECLARATIONS ################
function createNestedTabber() {
    var loc = location.hash.replace("#", "").replace(/\./g, "%");
	var originalHash = location.hash.replace(/\%23/g, "#").replace(/%20/g, "_");
	var hashes = originalHash.split('#');
	
	if (loc !== "") {
    	var i;
	    for (i = 1; i < hashes.length; i++) {
	        $(".tabber .wds-tabs__tab").filter(function() {
	                return ($(this).attr("data-hash") == hashes[i]);
	        }).click();
	    }
		location.hash = originalHash;
	}
	
	$(".anchorLink > a").off("click").click(function() {
	    var loc = $(this).attr('href').replace("#", "").replace(/\./g, "%");
	    var hashes = $(this).attr('href').replace(/\%23/g, "#").replace(/%20/g, "_").split('#');
	
	    if (loc !== "") {
	        var i;
	        var tabs;
	        for (i = 1; i < hashes.length; i++) {
	            tabs = $(".tabber .wds-tabs__tab").filter(function() {
	                return ($(this).attr("data-hash") == hashes[i]);
	            });
	            tabs.click();
	            if (i == 1)
	            {
		            tabs[0].scrollIntoView({
					    behavior: "smooth", // or "auto" or "instant"
					    block: "start", // or "end"
					    inline: "nearest"
					});
	            }
	        }
	    }
	});
}

function _setupToggleButtonsMemoriaList (button, case1_rows, case2_rows, hide_class, case1, case2) {
	state = 0;
	button.html("Showing " + case1 + " and " + case2 + " memoria");
	button.css("width", button.css("width"));
    button.click(function () {
    	state = (state + 1) % 3;
		if (state === 0) {
			button.html("Showing " + case1 + " and " + case2 + " memoria");
			case1_rows.removeClass(hide_class);
			case2_rows.removeClass(hide_class);
		} else if (state === 1) {
			button.html("Showing " + case1 + " memoria");
			case1_rows.removeClass(hide_class);
			case2_rows.addClass(hide_class);
		} else {
			button.html("Showing " + case2 + " memoria");
			case1_rows.addClass(hide_class);
			case2_rows.removeClass(hide_class);
		}	
	});
}

function setupToggleButtonsMemoriaList() {
	_setupToggleButtonsMemoriaList(
		$("#active-toggle-button"), 
		$("tr.memo-active-row"),
		$("tr.memo-passive-row"),
		"toggeled-active-hide",
		"active",
		"passive"
	);
	
	_setupToggleButtonsMemoriaList(
		$("#limited-toggle-button"), 
		$("tr.memo-limited-row"),
		$("tr.memo-unlimited-row"),
		"toggeled-limited-hide",
		"limited",
		"unlimited"
	);
}

// ############### CALLERS ############
// function equivalent to jquery ready. Runs once the page loads on all pages
$(function() {
	createNestedTabber();

	switch (mw.config.get('wgPageName')) {
	    case 'Memoria_Stats_List': 
			setupToggleButtonsMemoriaList();
	        break;
	}
});