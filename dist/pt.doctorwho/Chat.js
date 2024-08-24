// Diversos
importArticles( {
    type: 'script',
    articles: [
        "MediaWiki:Chat.js/ChatTags.js",      // ChatTags
        "u:dev:MediaWiki:ChatHacks.js",       // ChatHack
        "u:dev:ChatAnnouncements/code.js"     // Anúncio
    ]
});
 
// Enviar
$(function () {
    'use strict';
    var $messageBox = $('.Write [name="message"]');
    var $sendButton = $('<span class="button">Enviar</span>');
 
    $sendButton
        .css({
            position: 'relative',
            bottom: '28px',
            left: '-35px'
        })
        .click(function () {
            $messageBox.trigger({
                type: 'keypress',
                which: 13
            });
        });
 
    $messageBox
        .css('width', 'calc(100% - 70px)')
        .after($sendButton);
 
});


mw.loader.using('jquery.ui.autocomplete', function() {
    $(function() {
        var availableTags = [
            '[b][/b]',
            '[bg=""][/bg]',
            '[big][/big]',
            '[c=""][/c]',
            '[code][/code]',
            '[font=""][/font]',
            '[i][/i]',
            '[img=""]',
            '[small][/small]',
            '[s][/s]',
            '[sub][/sub]',
            '[sup][/sup]',
            '[u][/u]',
            '[yt=""]'
        ];
 
        $('textarea[name=message]').autocomplete({
            source: availableTags,
            position: { my: "left bottom", at: "left top", collision: "none" }
        });
 
        mw.util.addCSS('.ui-autocomplete{border:1px solid #000;background:#000;width:150px!important}.ui-menu-item{background:#fff;border-bottom:2px solid #000}.ui-menu-item a{font-family:monospace;color:#000!important}');
    });
});