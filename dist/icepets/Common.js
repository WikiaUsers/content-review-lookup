/* Any JavaScript here will be loaded for all users on every page load. */

/* Intent: Remove annoying red bar notification for non-existent script files.
 * Reference: http://code.ohloh.net/file?fid=PqkfxS7n_yekWeSPA42HaGQP32w&cid=pF-UvDg2B9o&s=&fp=303747&mp&projSelected=true#L0
 */
window.importArticleMissing = null;

/* Intent:
 *   1. To make development/maintenance easier.  Rather than have a giant Common.js/Common.css file with everything, each article's
 *        script/stylesheet is compartmentalized.
 *   2. The functions importScript & importStylesheet are planned to be deprecated.
 *      Reference: http://www.mediawiki.org/w/index.php?title=ResourceLoader/JavaScript_Deprecations&oldid=911203
 *   3. Handles automatic JavaScript minification.
 *      Reference: http://dev.wikia.com/wiki/Help:Including_additional_JavaScript_and_CSS?oldid=11395
 */
importArticles({
    type: 'script',
    article: 'MediaWiki:' + wgPageName + '.js'
}, {
    type: 'style',
    article: 'MediaWiki:' + wgPageName + '.css'
});