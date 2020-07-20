/* Any JavaScript here will be loaded for all users on every page load. */
    /**
     * Script for {{switch infobox}} and [[Module:Infobox]]
     */
if ($('.switch-infobox').length || $('.infobox-buttons').length) {
    importArticles({type:'script', articles:'MediaWiki:Common.js/switchInfobox.js'});
}