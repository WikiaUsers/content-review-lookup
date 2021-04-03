/* Any JavaScript here will be loaded for all users on every page load. */
var indvMatColumns = {};

$(document).ready(function() {
    indvMatColumns = document.getElementsByClassName("indv-mat-column");
    createIndvMatColumnFilterToggle();
});

function createIndvMatColumnFilterToggle() {
	var indvMatColumnFilterElement = document.getElementById("indvMatColumnFilter");
	if (!indvMatColumnFilterElement ) {
		return;
	}

	indvMatColumnFilterElement.innerHTML = '<input type="checkbox" id="indvMatColumnToggle" name="indvMatColumnToggle" onchange="toggleIndvMatColumns(this)"> Hide Individual Material Columns';
}

function toggleIndvMatColumns(checkbox) {
	for (var i = 0; i < indvMatColumns.length; i++) {
		if (checkbox.checked) {
			indvMatColumns[i].style.display = "none";
		}
		else {
			indvMatColumns[i].style.display = "table-cell";
		}
    }
}

/* Any JavaScript here will be loaded for all users on every page load. */
;(function(mw, $) {
	$(document).ready(function() {
		// Filter+Search JS
		var filterButtons = document.getElementsByClassName('filter-button');
		var searchFields = document.getElementsByClassName('search-text');
		
		for (var i = 0; i < filterButtons.length; i++) {
			filterButtons[i].addEventListener("click", function(e) {
				// Toggle the select class
				if (this.classList.contains('filter-button-selected')) {
					this.classList.remove('filter-button-selected');
				} else {
					this.classList.add('filter-button-selected');
				}
				filter();
			});
		}
		
		for (var i = 0; i < searchFields.length; i++) {
			searchFields[i].addEventListener("keyup", function(e) {
				filter();	
			});
		}
		
		function filter() {
			//Get all filter groups on the page
			var filterGroups = document.getElementsByClassName('mw-ui-button-group');
			var searchFields = document.getElementsByClassName('search-text');
			
			//Get filter list
			var list = document.getElementsByClassName('filter-element');
			for (var i = 0; i < list.length; i++) {
				list[i].style.display = 'none';
			}
			
			//Loop through all filter groups
			for (var i = 0; i < filterGroups.length; i++) {
				var selectedFilters = filterGroups[i].getElementsByClassName('filter-button-selected');
				list = filterList(selectedFilters, list);
			}
			
			// Loop through all the searches
			for (var i = 0; i < searchFields.length; i++) {
				list = searchList(searchFields[i], list);
			}
			
			// Go through and display the elements still in the filtered list
			for (var i = 0; i < list.length; i++) {
				list[i].style.display = '';	
			}
		}
		
		function filterList(selectedFilters, list) {
			if (!list.length || !selectedFilters.length) {
				return list;
			}
			
			var dataKey = '';
			var selectedFilterValues = [];
			
			for (var i = 0; i < selectedFilters.length; i++) {
				var dataKey = selectedFilters[i].attributes['data-key'].value;
				var filterValue = String(selectedFilters[i].dataset.value).toLowerCase();
				selectedFilterValues.push(filterValue);
			}
			
			var filteredList = [];
			
			for (var i = 0; i < list.length; i++) {
				var elementDataValue = String(list[i].dataset[dataKey]).toLowerCase();
				
				if (elementDataValue.includes(',')) {
					for (var count = 0; count < selectedFilterValues.length; count++) {
						if (elementDataValue.includes(selectedFilterValues[count])) {
							filteredList.push(list[i]);
							continue;
						}
					}
				} else {
					if (selectedFilterValues.includes(elementDataValue)) {
						filteredList.push(list[i]);
					}	
				}
			}

			return filteredList;
		}
		
		function searchList(searchField, list) {
			var dataKey = searchField.attributes['data-key'].value;
			var searchText = searchField.value.toLowerCase();
			
			if (searchText.length <= 0) {
				return list;
			}
			
			var filteredList = [];
			
			for (var i = 0; i < list.length; i++) {
				var elementDataValue = String(list[i].dataset[dataKey]).toLowerCase();
				if (elementDataValue.includes(searchText)) {
					filteredList.push(list[i]);	
				}
			}
			
			return filteredList;
		}
	});
})(mediaWiki, jQuery);