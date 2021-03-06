/* Any JavaScript here will be loaded for all users on every page load. */
window.AddRailModule = [
    {page: 'Template:RailModule', prepend: true},
];
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: '4uDXqna',
    prependToRail: true,
    noRail: false,
};

(function(mw, $) {
  // Return list of elements whose data-value matches the active filters.
  function filterCharacters(list, key, filter) {
    // If no active filters, all elements valid.
    if (!filter.length) {
      return list;
    }
    return list.filter(function(i, entry) {
      return filter.find(function(filterEntry) {
        return String(filterEntry.dataset.value).toLowerCase() ===
            String(entry.dataset[key]).toLowerCase();
      });
    });
  }

  function updateCharacterFilters() {
    var filterParams = [];
    var characterList = $('.character-entry');
    characterList.each(function() {
      this.style.display = 'none';
    });

    var filteredList = characterList;
    var filterGroupElements = $("div[class*='filter-group-']");
    var filterGroupClassPattern = /filter-group-([a-z-]+)/;
    var filterKeys = filterGroupElements.map(function() {
      return this.className.match(filterGroupClassPattern)[1];
    }).get();
    filterKeys.forEach(function(key) {
        var activeFilters =
            $('.filter-group-' + key + ' > .active').toArray();
        var activeValues = activeFilters.map(function(filter) {
            return filter.dataset.value;
        }).join(',');
        if (activeValues.length) {
            filterParams.push(key + ':' + activeValues);
        }
        filteredList = filterCharacters(filteredList, key, activeFilters);
    });

    filteredList.each(function() {
      this.style.display = '';
    });
    // Update the URL so the filtered state can be directly linked to.
    var hashParams = new URLSearchParams();
    hashParams.set('characterFilters', filterParams.join(';'));
    history.replaceState(null, null, '#' + hashParams.toString())
  }

$(document).ready(function() {
    $('.character-filters .button').on('click', function(event) {
        $(event.delegateTarget).toggleClass('active');
        updateCharacterFilters();
    });
	$('.character-filters .select-group')
		.prepend(function() { return '<input placeholder="' + this.title + '">'; })
		.children('input')
		.keyup(function() {
		const inputEl = $(this);
		const filterText = inputEl.val();
		const selectOptions = inputEl.parent().find('.select');

		if (filterText.length === 0) {
			selectOptions.show();
		} else {
			selectOptions.hide();
			selectOptions.filter(function() {
				return this.innerText.toLowerCase().includes(filterText.toLowerCase());
			}).show();
		}
	});
    
    // Replace periods in URL hash with %'s because wiki links URL
    // encode characters with periods instead.
    var urlParams = new URLSearchParams(decodeURIComponent(
        window.location.hash.slice(1).replace(/\./g, '%')));
    // If the URL hash-based param exists, set initial filters.
    // The expected format is filter1:valueA,valueB;filter2...
    // e.g name:Nakajima Atsushi;type:Offensive,Balanced;...
    if (urlParams.has('characterFilters')) {
        urlParams.get('characterFilters').split(';')
            .forEach(function(filterString) {
                var keyValue = filterString.split(':');
                keyValue[1].split(',').forEach(function(value) {
                    $('.filter-group-' + keyValue[0] +
                        "> [data-value='" + value + "']").toggleClass('active');
                });
        });
        updateCharacterFilters();
    }
});

})(mediaWiki, jQuery);