 $(document).ready(function() {
    // Create and append the search input field
    var searchInput = $('<input class="bfw-search" type="text" autocomplete="off" id="searchInput" placeholder="Filter items" style="width: 100%;">');
    $('#search').append(searchInput);
    
    // Create and append the dropdown for sea type selection
    var seaDropdown = $('<select class="bfw-filter" id="seaCategory"><option value="all">All Seas</option><option value="sea-type-1">First Sea</option><option value="sea-type-2">Second Sea</option><option value="sea-type-3">Third Sea</option></select>');
    $('#sea-filter').append(seaDropdown);
    
    // Create and append the dropdown for item type selection
    var itemTypeDropdown = $('<select class="bfw-filter" id="itemTypeCategory"><option value="all">All Item Types</option><option value="item-type-sword">Sword</option><option value="item-type-fruit">Fruit</option><option value="item-type-gun">Gun</option><option value="item-type-melee">Melee</option></select>');
    $('#item-type-filter').append(itemTypeDropdown);
    
    // Create and append the dropdown for item effect selection
    var effectDropdown = $('<select class="bfw-filter" id="effectCategory"><option value="all">All Effects</option><option value="effect-Damage-Reduction">Damage Reduction</option><option value="effect-Damage-Increase">Damage Increase</option></select>');
    $('#effect-filter').append(effectDropdown);

    // Function to filter items based on the selected sea, item type, and effect
    function filterItems() {
        var searchTerm = $('#searchInput').val().toLowerCase();
        var selectedSea = $('#seaCategory').val();
        var selectedItemType = $('#itemTypeCategory').val();
        var selectedEffect = $('#effectCategory').val();

        // Filter only direct children of #itemList
        $('#itemList > div').each(function() {
            var itemId = $(this).attr('id') ? $(this).attr('id').toLowerCase() : '';
            var itemText = $(this).text().toLowerCase();
            var itemSea = $(this).data('sea');
            var itemType = $(this).data('item-type');
            var itemEffect = $(this).data('effect');

            // Check if search term matches ID or text at the beginning
            var matchesSearch = (searchTerm === '' || itemId.startsWith(searchTerm) || itemText.startsWith(searchTerm));

            // Check if the item matches the selected criteria from the dropdowns
            var matchesSea = (selectedSea === 'all' || itemSea === selectedSea);
            var matchesItemType = (selectedItemType === 'all' || itemType === selectedItemType);
            var matchesEffect = (selectedEffect === 'all' || itemEffect === selectedEffect);

            // Show or hide item based on the search and selected category matches
            if (matchesSearch && matchesSea && matchesItemType && matchesEffect) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Event listeners for input and dropdown changes
    $('#searchInput').on('input', filterItems);
    $('#seaCategory').on('change', filterItems);
    $('#itemTypeCategory').on('change', filterItems);
    $('#effectCategory').on('change', filterItems);
});