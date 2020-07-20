// ==========================================================================
// Implements a Special:RandomCard page which redirects the user to a
// randomly selected card page/
//
// Version 1.0.1
// Author: Aspallar

(function ($) {
    /*global mw*/
    'use strict';

    if (mw.config.get('wgPageName') !== 'Special:RandomCard')
        return;

    $.get(mw.util.getUrl('MediaWiki:Custom-CardData', {action: 'raw'})).done(function (data) {
        var cards = data.split('\n');
        var index = Math.floor(Math.random() * cards.length);
        var card = cards[index];
        card = card.substring(0, card.indexOf('|'));
        window.location = mw.util.getUrl(card);
    });

    $(function () {
        $('.page-header__title').text('Random Card');
        $('title').text('Random Card');
        $('#mw-content-text').html('<p>Selecting a random card just for you.</p><p>Stand by...</p>');
    });

}(jQuery));