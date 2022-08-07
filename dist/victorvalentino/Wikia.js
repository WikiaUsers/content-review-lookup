
importArticles({
    type: 'script',
    article: 'u:diepio:MediaWiki:BlogLink/code.js' 
});
 
window.discussionsModuleEmbed = true;
mw.loader.using('mediawiki.util').then(function() {
    mw.hook('discussionsModule.added').add(function() {
        // Module addition
        if ($('.insights-module').exists()) {
            $('#WikiaRail .discussions-rail-theme').insertBefore('.insights-module');
        } else {
            $('#WikiaRail .discussions-rail-theme').appendTo('#WikiaRail');
        }
    });
});