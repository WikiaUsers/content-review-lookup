/* Any JavaScript here will be loaded for all users on every page load. */

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
    var filterKeys = [
        'rarity', 'affinity', 'type', 'org', 'name', 'gender', 'global'];
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
    var queryParams = new URLSearchParams(window.location.search);
    queryParams.set('characterFilters', filterParams.join('|'));
    history.replaceState(null, null, window.location.pathname + '?'
        + queryParams.toString() + window.location.hash)
  }

$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    $('.character-filters .button').on('click', function(event) {
        $(event.delegateTarget).toggleClass('active');
        updateCharacterFilters();
    });
    // If the URL query param exists, set initial filters.
    if (urlParams.has('characterFilters')) {
        var filters = urlParams.get('characterFilters').split('|');
        filters.forEach(function(filterString) {
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