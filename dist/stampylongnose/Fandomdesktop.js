/* All JavaScript codes for Fandomdesktop. Do not edit this script if you don't know what you're doing. */

// register hook before import to avoid race conditions
mw.hook('dev.wds').add(function(wds) {
    // wds is a shortcut to window.dev.wds
});

importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });