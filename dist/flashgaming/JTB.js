/**
 * Jump to bottom button. 
 * Creates a button that takes you to the bottom of a page
 * By Fngplg and Fandyllic.
*/ 
 
(function(window, $, mw) { 'use strict'; var translations = { en: 'Jump to bottom'},
    buttonStart = typeof window.JumpToBottomStart === 'number' ?
        window.JumpToBottomStart: 0,
    scrollSpeed = typeof window.JumpToBottomSpeed === 'number' ?
        window.JumpToBottomSpeed: 600,
    fadeSwitch = typeof window.JumpToBottomFade === 'number' ?
        window.JumpToBottomFade: 600,
    theText = (typeof window.JumpToBottomText === 'string' && window.JumpToBottomText) ||
    translations['.en'] || translations.en; if (window.JumpToBottomLoaded) {return}
    window.JumpToBottomLoaded = true; $(addJumpToBottom);
    function hideFade() {$("#jumptobottom").hide();$(window).scroll(function() {
            if (($(this).scrollTop() > buttonStart) && ($(this).scrollTop() < 
               ($('#mw-content-text').height() - $('.wds-global-footer').height()))) {
                switch (fadeSwitch) { case 0: $('#jumptobottom').show(); break;
                    default: $('#jumptobottom').fadeIn(); break;}} else {
                switch (fadeSwitch) { case 0: $('#jumptobottom').hide(); break;
                    default: $('#jumptobottom').fadeOut(); break;}}});}
 
    $('body').on('click', '#jumptobottom', function() {$('body,html').animate({
            scrollTop: $('#mw-content-text').height() - 
              $('.wds-global-footer').height() + 250}, scrollSpeed);return false;});
 
    function addJumpToBottom() {
        if (skin == 'oasis') { $('<li />', {
                id: 'jumptobottom',
                style: 'float: right; margin-top: -1px; border-right: none'
            })
            .append(
                $('<button />', {
                    type: 'button',
                    style: 'height: 20px;',
                    text: theText}))
            .appendTo('#WikiaBarWrapper .toolbar > .tools'); hideFade();}}}
            (this, jQuery, mediaWiki));