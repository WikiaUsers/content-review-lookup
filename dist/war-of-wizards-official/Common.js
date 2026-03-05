/* 
   Live Search for Spells Directory (MOBILE-FRIENDLY VERSION)
   Paste this into [[MediaWiki:Common.js]]
*/

function initSpellSearch() {
    // Only run if the container exists and hasn't been initialized
    var $container = $('#spellSearchContainer');
    if ($container.length && !$container.data('initialized')) {

        $container.data('initialized', true);

        // 1. Inject the search bar UI
        var $searchBox = $('<input type="text" placeholder="Filter spells by name..." style="width: 100%; background: transparent; border: none; color: #ffffff; font-size: 1.1em; outline: none;">');

        var $ui = $('<div class="spell-search-bar"></div>').append('<span style="font-size: 1.5em;">🔍</span>').append($searchBox);

        $container.empty().append($ui);

        // 2. Logic to filter cards
        $searchBox.on('keyup', function () {
            var value = $(this).val().toLowerCase();
            $('.spell-card').each(function () {
                var text = $(this).text().toLowerCase();
                $(this).toggle(text.indexOf(value) > -1);
            });
        });

        console.log("Spell Search Initialized!");
    }
}

// oficial MediaWiki hook - runs on page load AND when content is swapped (crucial for mobile)
if (window.mw) {
    mw.hook('wikipage.content').add(initSpellSearch);
} else {
    $(initSpellSearch);
}