// ==========================================================================
// Implements a link on card pages that displays links to the decks which
// contain that card.
//
// Version 1.0.2
// Author: Aspallar
//
// ** Please do not edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
(function ($) {
    'use strict';
    /*global mw */

    if (document.getElementById('mdw-deck-links') === null || $('#mdw-disabled-js').attr('data-linkeddecks-1-0-2'))
        return;

    function fetchDecks() {
        var deferred = $.Deferred(),
            api = new mw.Api(),
            decks = [];

        function getDecks(blcontinue) {
            api.get({
                action: 'query',
                list: 'backlinks',
                bltitle: mw.config.get('wgTitle'),
                bllimit: 500,
                rawcontinue: '',
                blfilterredir: 'nonredirects',
                blcontinue: blcontinue
            }).done(function (data) {
                if (data.query && data.query.backlinks) {
                    data.query.backlinks.forEach(function (deck) {
                        if (/^Decks\//.test(deck.title))
                            decks.push(deck.title);
                    });
                }
                if (data['query-continue']) {
                    getDecks(data['query-continue'].backlinks.blcontinue);
                } else {
                    deferred.resolve(decks);
                }
            });
        }

        getDecks();
        return deferred.promise();
    }

    function showDecks(event) {
        event.preventDefault();
        var container = $('#mdw-deck-links').empty();
        fetchDecks().done(function (decks) {
            if (decks.length === 0)
                container.html('There are no decks that contain this card.');
            else {
                var decklinks = $(document.createDocumentFragment());
                decks.sort();
                decks.forEach(function (deck) {
                    decklinks.append($('<a>', {
                        href: mw.util.getUrl(deck),
                        target: '_blank',
                        html: deck.substring(6)
                    })).append('<br>');
                });
                container.append(decklinks);
            }
        });
    }

    mw.loader.using('mediawiki.api', function () {
        $(function () {
            $('#mdw-deck-links').append(
                $('<a>', {href: '#', html: 'Show decks that contain this card.', click: showDecks})
            );
        });
    });

}(jQuery));