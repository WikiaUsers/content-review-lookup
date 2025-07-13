/* Defer execution until the page is loaded */
$(function() {
    // Find the placeholder on the page
    var $placeholder = $('#weapon-search-placeholder');

    // If the placeholder exists, then proceed. This stops the script from running on other pages.
    if ($placeholder.length) {

        // 1. Create the search input element dynamically
        var $searchInput = $('<input>', {
            type: 'text',
            id: 'weaponSearchInput', // Give it the same ID the CSS will look for
            placeholder: 'Search for weapons...'
        });

        // 2. Insert the newly created input into the placeholder
        $placeholder.append($searchInput);
        
        // Add a class to the container for styling purposes
        $placeholder.addClass('weapon-search-container');

        // 3. Attach the keyup event to the new input to make it work
        $searchInput.on('keyup', function() {
            var filter = $(this).val().toUpperCase();
            var $weaponGrid = $('#weaponGrid');

            // Find each weapon button inside the grid
            $weaponGrid.find('.navbutton').each(function() {
                var weaponName = $(this).find('.navbutton-caption').text().toUpperCase();

                if (weaponName.indexOf(filter) > -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    }
});