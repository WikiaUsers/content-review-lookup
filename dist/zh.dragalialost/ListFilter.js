/* [[Template:ListFilter]] [[Module:ListFilter]] */
(function($, mw) {
	'use strict';
	function filter(list, filter) {
		if (!filter.length) {
			return list;
		}

		return list.filter(function(x) {
			var entry = $(list[x]).get(0);
			return filter.find(function(y) {
				var filterEntry = $(y).get(0);
				if (filterEntry.dataset.key === "ability-filter") {
					var abilityFilterValues = entry.dataset.abilityFilter.replace(/\s/g, '').split(",") || "";
					var hasMatchingAbility = false;
					abilityFilterValues.forEach(function(value) {
						if (filterEntry.dataset.value.indexOf(value) >= 0)	 {
							hasMatchingAbility = true;
						}
					});
					return hasMatchingAbility;
				}

				return String(filterEntry.dataset.value).toLowerCase() === String(entry.dataset[filterEntry.dataset.key]			).toLowerCase();
			});
		});
	}

	function updateFilters() {
		var elementFilters = $('.filter-group-element > .mw-ui-button.mw-ui-progressive').toArray();
		var weaponFilters = $('.filter-group-weapon > .mw-ui-button.mw-ui-progressive').toArray();
		var rarityFilters = $('.filter-group-rarity > .mw-ui-button.mw-ui-progressive').toArray();
		var classFilters = $('.filter-group-class > .mw-ui-button.mw-ui-progressive').toArray();
		var groupFilters = $('.filter-group-group > .mw-ui-button.mw-ui-progressive').toArray();
		var characterList = $('.grid-entry');

		characterList.each(function() {
			this.style.display = 'none';
		});

		var filteredList = characterList;
		filteredList = filter(filteredList, elementFilters);
		filteredList = filter(filteredList, weaponFilters);
		filteredList = filter(filteredList, rarityFilters);
		filteredList = filter(filteredList, classFilters);
		filteredList = filter(filteredList, groupFilters);
		console.log(filteredList);

		filteredList.each(function() {
			this.style.display = '';
		});
	}
	mw.hook('wikipage.content').add(function($content) {
		var ele = $content.find('.character-filters:not(.loaded)')[0];
		if (!ele) return;
		ele.classList.add('loaded');
		$('.character-filters span.mw-ui-button').on('click', function(event) {
			$(event.target).toggleClass('mw-ui-progressive');
			updateFilters();
		});
	});
})(window.jQuery, window.mediaWiki);