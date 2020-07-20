/**
 * Name:        ShareMenu
 * Version:     v1.1
 * Author:      Deadcoder
 * Description: Provides an interface for social sharing buttons
 */
(function() {
    if (window.dev && window.dev.ShareMenu) {
        return;
    }
    var $menu = $('<span>', {
        id: 'PowerShareMenu'
    }).prependTo('.WikiaMainContent');
    window.dev = window.dev || {};
    window.dev.ShareMenu = $menu;
    mw.hook('dev.ShareMenu').fire($menu);
})();