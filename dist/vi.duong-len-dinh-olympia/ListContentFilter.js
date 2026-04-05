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
		var filterGroups = {
			gender: new Set(),
			phaseQuarter: new Set(),
			phaseWeek: new Set(),
			phaseMonth: new Set(),
			type: new Set(),
			rank: new Set()
		};
		
		// FilterCongigs
		var filterConfigs = [
			{ id: "gender-filter",	key: "gender" },
			{ id: "phase-quarter-filter",	key: "phaseQuarter" },
			{ id: "phase-week-filter",	key: "phaseWeek" },
			{ id: "phase-month-filter",	key: "phaseMonth" },
			{ id: "type-filter",	key: "type" },
			{ id: "rank-filter",	key: "rank" }
		];
		
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
		filterConfigs.forEach(function(config) {
			$("#" + config.id).find(".btn-filter-toggle-checked").each(function() {
				filterGroups[config.key].add($(this).data("filter"));
			});
		});
		
		// Listen input change on the filter search input box
		searchFilterInput.on('input', function() {
			debouncedFilterSelection();
		});
		
		// Initially show items based on checked filters, include filter search input when searching, count items when visible
		function filterSelection() {
			var items = document.getElementsByClassName("filterItem");
			var searchFilterTerm = searchFilterInput.val().toLowerCase();
			var hasActiveFilters = Object.keys(filterGroups).some(function(key) {
				return filterGroups[key].size > 0;
			});
			var visibleFilterItemCount = 0;
			
			function checkItem(item) {
				var matchesAllGroups = Object.keys(filterGroups).every(function(key) {
					var currentGroupSet = filterGroups[key];
					if (currentGroupSet.size === 0) return true; // No filter active in this group, set true
					
					return Array.from(currentGroupSet).some(function(filterClass) {
						return item.classList.contains(filterClass);
					});
				});
				
				var textMatch = searchFilterTerm === '' || item.textContent.toLowerCase().includes(searchFilterTerm);
				
				if ((hasActiveFilters && matchesAllGroups) && textMatch) {
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
			
			btns.on("click", function() {
				var filterValue = $(this).data("filter");
				$(this).toggleClass("btn-filter-toggle-checked");
				
				// Update current filters based on the toggle state by adding or deleting filters
				if ($(this).hasClass("btn-filter-toggle-checked")) {
					filterGroups[filterType].add(filterValue);
				} else {
					filterGroups[filterType].delete(filterValue);
				}
				debouncedFilterSelection(); // Reapply filters after the update
			});
			
			// Handle "All" button clicks
			//// Add all filters in the set
			btnContainer.find(".btn-filter-common-all").on("click", function() {
				btns.addClass("btn-filter-toggle-checked").each(function() {
					filterGroups[filterType].add($(this).data("filter"));
				});
				debouncedFilterSelection();
			});
			
			// Handle "None" button clicks
			//// Clear all filters in the set
			btnContainer.find(".btn-filter-common-none").on("click", function() {
				btns.removeClass("btn-filter-toggle-checked");
				filterGroups[filterType].clear();
				debouncedFilterSelection();
			});
		}
		
		// Setup button click for filters
		filterConfigs.forEach(function(config) {
			setupButtonClickHandlers(config.id, config.key);
		});
		
		// Run filterSelection when page is loaded
		filterSelection();
	}
	
	// Initialize the function
	mw.hook("wikipage.content").add(initializeListContentFilter);
});