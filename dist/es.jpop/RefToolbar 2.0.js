function initializeRefTools() {
    if ( typeof refToolbarInstalled == 'undefined' ) {
        importScriptURI('//en.wikipedia.org/w/index.php?title=MediaWiki:RefToolbarBase.js&action=raw&ctype=text/javascript');

        if( mw.user.options.get('usebetatoolbar') && mw.user.options.get('usebetatoolbar-cgd') ) {
            // Enhanced editing toolbar is on with dialogs. Load standard refToolbar.
            importScript('MediaWiki:RefToolbar.js');
        } else if( mw.user.options.get('usebetatoolbar') ) {
            // Dialogs are off. Load refToolbar 2.0 without dialogs.
            importScriptURI('//en.wikipedia.org/w/index.php?title=MediaWiki:RefToolbarNoDialogs.js&action=raw&ctype=text/javascript');
        } else {
            // Enhanced editing toolbar is off. Load legacy refToolbar 1.0.
            importScriptURI('//en.wikipedia.org/w/index.php?title=MediaWiki:RefToolbarLegacy.js&action=raw&ctype=text/javascript');
        }
        window.refToolbarInstalled = true;
    }
}
$(initializeRefTools);