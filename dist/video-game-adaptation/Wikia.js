// AjaxRC Configuration 
 
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';
 
// Go to bottom button. Credit to Fngplg and Fandyllic
 
(function(window, $, mw) {
    'use strict';
 
    var translations = { en: 'Go to bottom' },
 
    buttonStart = typeof window.JumpToBottomStart === 'number' ?
        window.JumpToBottomStart :
        0,
    scrollSpeed = typeof window.JumpToBottomSpeed === 'number' ?
        window.JumpToBottomSpeed :
        600,
    fadeSwitch = typeof window.JumpToBottomFade === 'number' ?
        window.JumpToBottomFade :
        600,
 
    theText = (typeof window.JumpToBottomText === 'string' && window.JumpToBottomText) ||
    translations['en'] || translations.en;
 
    if (window.JumpToBottomLoaded) { return }
 
    window.JumpToBottomLoaded = true;
 
    $(addJumpToBottom);
 
    function hideFade() {
        $("#jumptobottom").hide();
 
        $(window).scroll(function() {
            if (($(this).scrollTop() > buttonStart) && ($(this).scrollTop() < ($('#mw-content-text').height() - $('.wds-global-footer').height()))) {
                switch (fadeSwitch) {
                    case 0:
                        $('#jumptobottom').show();
                        break;
                    default:
                        $('#jumptobottom').fadeIn();
                        break;
                }
            } else {
                switch (fadeSwitch) {
                    case 0:
                        $('#jumptobottom').hide();
                        break;
                    default:
                        $('#jumptobottom').fadeOut();
                        break;
                }
            }
        });
    }
 
    $('body').on('click', '#jumptobottom', function() {
        $('body,html').animate({
            scrollTop: $('#mw-content-text').height() - $('.wds-global-footer').height() + 250
            }, scrollSpeed);
 
        return false;
    });
 
    function addJumpToBottom() {
        if (skin == 'oasis') {
            $('<li />', {
                id: 'jumptobottom',
                style: 'float: right; margin-top: -1px; border-right: none'
            })
            .append(
                $('<button />', {
                    type: 'button',
                    style: 'height: 20px;',
                    text: theText
                })
            )
            .appendTo('#WikiaBarWrapper .toolbar > .tools');
 
            hideFade();
        }
    }
}(this, jQuery, mediaWiki));

/* Cancel Edit button
$(function() {
  if (typeof(wgIsEditPage) != 'undefined') { 
    $('<span id="cancbutton" class="button" style="margin-top:2px"><a id="WS235-CB" href="/wiki/'+ wgPageName +'"><span style="color:#FFFFFF">Cancel Edit</span></a></span>').prependTo('#EditPageHeader h2');
  }
});
*/

/* Adds a "Log" header to User Mastheads
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});
*/