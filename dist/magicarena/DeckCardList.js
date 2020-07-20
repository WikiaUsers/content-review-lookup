// ==========================================================================
// Displays a detailed card list of all cards in a deck.
//
// Version 1.1.1
// Author: Aspallar
//
// ** Please do not edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
//<nowiki>
(function ($) {
    /*global mw, tooltips*/
    /*jshint -W003*/
    'use strict';

    if(document.getElementById('mdw-view-card-list') === null || $('#mdw-disabled-js').attr('data-deckcardlist-1-1-1'))
        return;

    var parsed = false;

    function adjustName(name) {
        var pos = name.indexOf('//');
        return pos === -1 ? name : name.substring(0, pos - 1);
    }

    function setButtonText() {
        var link = $('#mdw-view-card-list > button');
        if ($('#mdw-deck-card-list').is(':visible'))
            link.text('Hide detailed card list');
        else
            link.text('View detailed card list');
    }

    function showButton() {
        $('#mdw-view-card-list').html($('<button>').click(clickViewList));
        setButtonText();
    }

    function showWorking() {
        $('#mdw-view-card-list').html($('<img>', {
            src: mw.config.get('stylepath') + '/common/images/ajax.gif'
        }));
    }

    function cardData(selector) {
        try { return JSON.parse($(selector).text()); } catch(e) { return []; }
    }

    function cardTable(cards) {
        return cards.length > 0 ? cards.reduce(function (acc, card) {
            return acc + '{{CardRow|' + adjustName(card.name) + '|' + card.num + '}}\n';
        }, '{| class="CardRow article-table"\n') + '|}\n' : false;
    }

    function cardListText() {
        var mainText = cardTable(cardData('#mdw-chartdata-pre')),
            sideText = cardTable(cardData('#mdw-sideboard-data')),
            text = '';
        if (mainText)
            text += '===Main===\n' + mainText;
        if (sideText) {
            if (mainText)
                text += '<hr/>\n';
            text += '===Sideboard===\n' + sideText;
        }
        return text + '__NOEDITSECTION__\n';
    }

    function parseError() {
        $('#mdw-deck-card-list')
            .html('<p class="mdw-error">Unable to obtain detailed card list.</p>')
            .show();
        showButton();
    }

    function parse(text) {
        showWorking();
        mw.loader.using('mediawiki.api', function () {
            new mw.Api().post({
                action: 'parse',
                disablepp: '',
                prop: 'text',
                text: text
            }).done(function (data) {
                parsed = true;
                if (data.parse && data.parse.text) {
                    var container = $('#mdw-deck-card-list');
                    container.html(data.parse.text['*']);
                    if (tooltips && tooltips.applyTooltips)
                        tooltips.applyTooltips(container.get(0));
                    container.show(400);
                    showButton();
                } else {
                    parseError();
                }
            }).fail(function () {
                parseError();
            });
        });
    }
   
    function clickViewList() { 
        if (parsed) {
            $('#mdw-deck-card-list').toggle(400, function() {
                setButtonText();
            });
        } else {
            parse(cardListText());
        }
    }

    $(showButton);

}(jQuery));