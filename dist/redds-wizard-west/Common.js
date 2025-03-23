/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
    // Create and append the search input field
    var searchInput = $('<input class="bfw-search" type="text" autocomplete="off" id="searchInput" placeholder="Filter fruit name" style="width: 100%;">');
    $('#search').append(searchInput);
    
    // Create and append the dropdown for category selection
    var dropdown = $('<select class="bfw-filter" id="category"><option value="all">All</option><option value="fruit-type-natural">Natural</option><option value="fruit-type-beast">Beast</option><option value="fruit-type-elemental">Elemental</option></select>');
    $('#filter').append(dropdown);

    // Function to filter items
    function filterItems() {
        var searchTerm = $('#searchInput').val().toLowerCase();
        var selectedCategory = $('#category').val();

        // Filter only direct children of #itemList
        $('#itemList > div').each(function() {
            var itemId = $(this).attr('id') ? $(this).attr('id').toLowerCase() : '';
            var itemText = $(this).text().toLowerCase();
            var itemCategory = $(this).data('category');

            // Check if search term matches ID or text at the beginning
            var matchesSearch = (searchTerm === '' || itemId.startsWith(searchTerm) || itemText.startsWith(searchTerm) || (searchTerm === 'f' && itemId.startsWith('f')));
            
            // Check if the item matches the selected category from dropdown
            var matchesCategory = (selectedCategory === 'all' || itemCategory === selectedCategory);

            // Show or hide item based on search and category match
            if (matchesSearch && matchesCategory) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Event listeners for input and dropdown changes
    $('#searchInput').on('input', filterItems);
    $('#category').on('change', filterItems);
});