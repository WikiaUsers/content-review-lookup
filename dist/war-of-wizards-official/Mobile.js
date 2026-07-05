/* All JavaScript here will be loaded for users of the mobile site */
/* Live Search for Spells Directory - MOBILE */
function initSpellSearch() {
    var $container = $('#spellSearchContainer');
    if ($container.length && !$container.data('initialized')) {
        $container.data('initialized', true);
        var $searchBox = $('<input type="text" placeholder="Filter spells by name..." style="width: 100%; background: transparent; border: none; color: #ffffff; font-size: 1.1em; outline: none;">');
        var $ui = $('<div class="spell-search-bar"></div>').append('<span style="font-size: 1.5em;">🔍</span>').append($searchBox);
        $container.empty().append($ui);
        $searchBox.on('keyup', function () {
            var value = $(this).val().toLowerCase();
            $('.spell-card').each(function () {
                var text = $(this).text().toLowerCase();
                $(this).toggle(text.indexOf(value) > -1);
            });
        });
    }
}
if (window.mw) {
    mw.hook('wikipage.content').add(initSpellSearch);
} else {
    $(initSpellSearch);
}