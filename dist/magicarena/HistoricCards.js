// ==========================================================================
// Adds a "Hightlight historic cards" link to historic decks which hightlights
// the cards that can only be played in historic formats.
//
// Version 1.1.0
// Author: Aspallar
//
// ** Please do not edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
window.magicArena = window.magicArena || {};
window.magicArena.highlightHistoric = window.magicArena.highlightHistoric || (function ($) {
    'use strict';

    if ($('#mdw-disabled-js').attr('data-historiccards-1-1-0'))
        return null;

    var highlighted;
    var highlightText = 'Highlight historic cards';

    function toggleHighlight(event) {
        event.preventDefault();
        highlighted = !highlighted;
        if (highlighted) {
            $('.card-historiccard').addClass('card-historic');
            $('#mdw-historic-highlight').text('Remove historic card highlighting');
        } else {
            $('.card-historiccard').removeClass('card-historic');
            $('#mdw-historic-highlight').text(highlightText);
        }
    }

    function setLink(link) {
        highlighted = false;
        link.html(
            $('<br>').after($('<a>', { id: 'mdw-historic-highlight', href: '#', text: highlightText}).click(toggleHighlight))
        );
    }

    function apply(content) {
        setLink(content.find('#mdw-show-historic'));
    }

    $(function () { setLink($('#mdw-show-historic')); });

    return apply;

}(jQuery));