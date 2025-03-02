$(function() {
    if (!window.wdsIconsImported) {
        window.wdsIconsImported = true;
        importArticle({ 
            type: 'script', 
            article: 'u:dev:MediaWiki:WDSIcons/code.js' 
        });
    }
    
    mw.hook('dev.wds').add(function(wds) {
        wds.render('body');
    });
});