/* Any JavaScript here will be loaded for all users on every page load. */
/* Please don't change without Admin's permission. That means another Admin, not just you. */

(function(window, $, mw){
    var scripts = [
        // "MediaWiki:Wikia.js/DISPLAYTITLE.js",
        "MediaWiki:Wikia.js/Qslideshow.js",
        "MediaWiki:Wikia.js/RfA.js"
    ];
    
    importArticles({
        type: "script",
        articles: scripts
    });
})(window, jQuery, mediaWiki);