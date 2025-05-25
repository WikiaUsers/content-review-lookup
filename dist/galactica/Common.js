/* Any JavaScript here will be loaded for all users on every page load. */
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:Watchlist",
    "Special:Allpages",
    "Special:Log",
    "Special:Contributions",
];
/* The following makes MediaWiki:Common.js/uploadform.js work */
if (['MultipleUpload', 'Upload'].indexOf(mw.config.get('wgCanonicalSpecialPageName')) > -1) {
        importScript('MediaWiki:Common.js/uploadform.js');
    }
/* prevents existing tags from being hidden */
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
$(function () {
    var $title = $('#mw-page-title-main');
    if ($title.length === 0) return;
    var maxWidth = 360;
    var fontSize = 36;
    $title.css({
        'white-space': 'nowrap',
        'overflow': 'hidden',
        'display': 'inline-block',
        'max-width': maxWidth + 'px',
    });
    function shrinkTitle() {
        while ($title.outerWidth() > maxWidth && fontSize > 12) {
            fontSize--;
            $title.css('font-size', fontSize + 'px');
        }
    }
    // Wait a bit to ensure rendering is complete
    setTimeout(shrinkTitle, 0);
});