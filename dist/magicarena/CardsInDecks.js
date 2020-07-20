// ==========================================================================
// CardsInDecks
//    Supports the "Cards In Decks" article. Dynamically fills in the deck lists
//    for just cards the user chooses to view, rather than the old way of having
//    all the decks for all the cards specified in wikitext on the server. Results
//    in a significantly smaller page and a lot less wikitext for the server to parse.
//
// Version 1.1.1
// Author: Aspallar
//
// ** Please do not edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
(function ($) {
    /*global mw*/
    'use strict';

    if (document.getElementById('mdw-cardsindecks-container') === null || $('#mdw-disabled-js').attr('data-cardsindecks-1-1-1'))
        return;

    var rightImageSrc = mw.config.get('stylepath') + '/common/images/Arr_r.png';
    var downImageSrc = mw.config.get('stylepath') + '/common/images/Arr_d.png';

    function fillDeckDiv(div) {
        var ul = $('<ul>');
        var cardDecks = JSON.parse(div.attr('data-decks'));
        var allDecks = JSON.parse($('#mdw-deck-data').text());
        var prefix = $('#mdw-cardsindecks-config').attr('data-deck-prefix');
        if (prefix === undefined) prefix = 'Decks/';
        cardDecks.forEach(function (deckIndex) {
            var name = allDecks[deckIndex];
            var fullName = prefix + name;
            var link = $('<a>')
                .attr('href', mw.util.getUrl(fullName))
                .attr('title', fullName)
                .attr('target', '_blank')
                .html(name);
            ul.append($('<li>').append(link));
        });
        div.append(ul);
    }

    function clickArrow() {
        /*jshint -W040 */ // allow old school jquery use of this
        var that = $(this);
        var deckDiv = that.closest('div').next();
        if (deckDiv.html().length === 0)
            fillDeckDiv(deckDiv);
        if (that.attr('src') === rightImageSrc)
            that.attr('src', downImageSrc);
        else
            that.attr('src', rightImageSrc);
        deckDiv.fadeToggle(150);
    }

    function initialize() {
        $('.mdw-cardsindecks-arrow').html($('<img>', {src: rightImageSrc}));
        $('#mdw-cardsindecks-container').on('click', 'img', clickArrow);
    }

    $(document).ready(initialize);

}(jQuery));