/* Any JavaScript here will be loaded for all users on every page load. */


/* ========== List Content Filter ========== */

$(function() {
	function initializeListContentFilter() {
	
	// New Set for filters
	var currentGenderFilters = new Set();
	var currentPhaseFilters = new Set();
	var currentTypeFilters = new Set();
	var currentRankFilters = new Set();

	// Check initial button states
	$(".btn-filter-toggle-checked").each(function() {
		var filterValue = $(this).data("filter");
		if ($(this).closest("#gender-filter").length) {
			currentGenderFilters.add(filterValue);
		} else if ($(this).closest("#phase-filter").length) {
			currentPhaseFilters.add(filterValue);
		} else if ($(this).closest("#type-filter").length) {
			currentTypeFilters.add(filterValue);
		} else if ($(this).closest("#rank-filter").length) {
			currentRankFilters.add(filterValue);
		}
	});

	// Initially show items based on checked filters
	filterSelection();

	function filterSelection() {
		var items = document.getElementsByClassName("filterItem");
		var hasActiveFilters = 
		currentGenderFilters.size > 0 || 
		currentPhaseFilters.size > 0 || 
		currentTypeFilters.size > 0 || 
		currentRankFilters.size > 0;

		for (var item of items) {
			var genderMatch = currentGenderFilters.size === 0 || [...currentGenderFilters].some(filter => item.classList.contains(filter));
			var phaseMatch = currentPhaseFilters.size === 0 || [...currentPhaseFilters].some(filter => item.classList.contains(filter));
			var typeMatch = currentTypeFilters.size === 0 || [...currentTypeFilters].some(filter => item.classList.contains(filter));
			var rankMatch = currentRankFilters.size === 0 || [...currentRankFilters].some(filter => item.classList.contains(filter));

			if (hasActiveFilters && genderMatch && phaseMatch && typeMatch && rankMatch) {
				fadeIn(item);
			} else {
				fadeOut(item);
			}
		}
	}

	function fadeIn(element) {
		element.style.display = "inline";
		element.style.opacity = 0;
		var opacity = 0;

		var timer = setInterval(function() {
			if (opacity >= 1) {
				clearInterval(timer);
			}
			element.style.opacity = opacity;
			opacity += 0.1;
		}, 30);
	}

	function fadeOut(element) {
		element.style.opacity = 1;
		var opacity = 1;

		var timer = setInterval(function() {
			if (opacity <= 0) {
				clearInterval(timer);
				element.style.display = "none";
			}
			element.style.opacity = opacity;
			opacity -= 0.1;
		}, 30);
	}

	function setupButtonClickHandlers(containerId, filterType) {
		var btnContainer = $("#" + containerId);
		var btns = btnContainer.find(".btn-filter-toggle");

		btns.each(function() {
			$(this).on("click", function() {
				var filterValue = $(this).data("filter");
				$(this).toggleClass("btn-filter-toggle-checked");

				// Update current filters based on the toggle state by adding or deleting filters
				
				if ($(this).hasClass("btn-filter-toggle-checked")) {
					if (filterType === 'gender') {
						currentGenderFilters.add(filterValue);
					} else if (filterType === 'phase') {
						currentPhaseFilters.add(filterValue);
					} else if (filterType === 'type') {
						currentTypeFilters.add(filterValue);
					} else if (filterType === 'rank') {
						currentRankFilters.add(filterValue);
					}
				} else {
					if (filterType === 'gender') {
						currentGenderFilters.delete(filterValue);
					} else if (filterType === 'phase') {
						currentPhaseFilters.delete(filterValue);
					} else if (filterType === 'type') {
						currentTypeFilters.delete(filterValue);
					} else if (filterType === 'rank') {
						currentRankFilters.delete(filterValue);
					}
				}

				// Reapply filters after the update
				filterSelection();
			});
		});

		// Handle "All" and "None" button clicks
		//// Set defined items in filters
		btnContainer.find(".btn-filter-common-all").on("click", function() {
			btns.addClass("btn-filter-toggle-checked");
			if (filterType === 'gender') {
				currentGenderFilters.add($(this).data("filter"));
			} else if (filterType === 'phase') {
				currentPhaseFilters.add($(this).data("filter"));
			} else if (filterType === 'type') {
				currentTypeFilters.add($(this).data("filter"));
			} else if (filterType === 'rank') {
				currentRankFilters.add($(this).data("filter"));
			}
			filterSelection();
		});
		
		//// Clear defined items in filters
		btnContainer.find(".btn-filter-common-none").on("click", function() {
			btns.removeClass("btn-filter-toggle-checked");
			if (filterType === 'gender') {
				currentGenderFilters.clear();
			} else if (filterType === 'phase') {
				currentPhaseFilters.clear();
			} else if (filterType === 'type') {
				currentTypeFilters.clear();
			} else if (filterType === 'rank') {
				currentRankFilters.clear();
			}
			filterSelection(); // Hide only relevant items
		});
	}
	
	// Setup button click for filters
	setupButtonClickHandlers("gender-filter", "gender");
	setupButtonClickHandlers("phase-filter", "phase");
	setupButtonClickHandlers("type-filter", "type");
	setupButtonClickHandlers("rank-filter", "rank");
	}
	
	// Initialize the function
	initializeListContentFilter();
});