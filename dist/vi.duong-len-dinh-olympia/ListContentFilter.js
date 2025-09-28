/* Any JavaScript here will be loaded for all users on every page load. */


/* ========== List Content Filter ========== */

$(function() {
	function initializeListContentFilter($content) {
		// Prevent double initialization
		if ($content.data("listContentFilterInitialized")) {
			return;
		}
		$content.data("listContentFilterInitialized", true);
		
		// Create and append filter search input box
		var searchFilterInput = $('<input type="text" placeholder="Filter search box" class="filter-search-box">');
		$('#search-filter').append(searchFilterInput);
		
		// New Set for filters
		var currentGenderFilters = new Set();
		var currentPhaseFilters = new Set();
		var currentTypeFilters = new Set();
		var currentRankFilters = new Set();
		
		// Debounce function
		function debounce(func, wait) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					func.apply(context, args);
				}, wait);
			};
		}
		
		// Debounce filterSelection, or delay animation
		var debouncedFilterSelection = debounce(filterSelection, 500);
		
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
		
		// Listen input change on the filter search input box
		searchFilterInput.on('input', function() {
			debouncedFilterSelection();
		});
		
		// Initially show items based on checked filters, include filter search input when searching, count items when visible
		function filterSelection() {
			var items = document.getElementsByClassName("filterItem");
			var searchFilterTerm = searchFilterInput.val().toLowerCase();
			var hasActiveFilters = currentGenderFilters.size > 0 || currentPhaseFilters.size > 0 || currentTypeFilters.size > 0 || currentRankFilters.size > 0;
			var visibleFilterItemCount = 0;
			
			function checkItem(item) {
				var genderMatch = currentGenderFilters.size === 0 || Array.from(currentGenderFilters).some(function(filter) {
					return item.classList.contains(filter);
				});
				var phaseMatch = currentPhaseFilters.size === 0 || Array.from(currentPhaseFilters).some(function(filter) {
					return item.classList.contains(filter);
				});
				var typeMatch = currentTypeFilters.size === 0 || Array.from(currentTypeFilters).some(function(filter) {
					return item.classList.contains(filter);
				});
				var rankMatch = currentRankFilters.size === 0 || Array.from(currentRankFilters).some(function(filter) {
					return item.classList.contains(filter);
				});
				
				var textMatch = searchFilterTerm === '' || item.textContent.toLowerCase().includes(searchFilterTerm);
				
				if ((hasActiveFilters && genderMatch && phaseMatch && typeMatch && rankMatch) && textMatch) {
					fadeIn(item);
					visibleFilterItemCount++; // Increment counter for visible items
				} else {
					fadeOut(item);
				}
			}
			
			for (var i = 0; i < items.length; i++) {
				checkItem(items[i]); // Call the separate function with the current item
			}
			
			// Update counter display
			document.getElementById("filter-item-count").textContent = visibleFilterItemCount;
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
		
		// Toggle button click handlers
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
					debouncedFilterSelection();
				});
			});
			
			// Handle "All" button clicks
			//// Add all filters in the set
			btnContainer.find(".btn-filter-common-all").on("click", function() {
				btns.addClass("btn-filter-toggle-checked");
				if (filterType === 'gender') {
					btns.each(function() {
						currentGenderFilters.add($(this).data("filter"));
					});
				} else if (filterType === 'phase') {
					btns.each(function() {
						currentPhaseFilters.add($(this).data("filter"));
					});
				} else if (filterType === 'type') {
					btns.each(function() {
						currentTypeFilters.add($(this).data("filter"));
					});
				} else if (filterType === 'rank') {
					btns.each(function() {
						currentRankFilters.add($(this).data("filter"));
					});
				}
				debouncedFilterSelection(); // Reapply filters after setting all
			});
			
			// Handle "None" button clicks
			//// Clear all filters in the set
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
				debouncedFilterSelection(); // Clear all items
			});
		}
		
		// Setup button click for filters
		setupButtonClickHandlers("gender-filter", "gender");
		setupButtonClickHandlers("phase-filter", "phase");
		setupButtonClickHandlers("type-filter", "type");
		setupButtonClickHandlers("rank-filter", "rank");
	}
	
	// Initialize the function
	mw.hook("wikipage.content").add(initializeListContentFilter);
});