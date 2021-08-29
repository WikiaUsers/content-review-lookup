/* <nowiki>
 * 
 * @module          WDSIcons demo
 * @description     Wikia Design System icon library demo.
 * @author          Speedit
 * @version         1.2.0
 * @license         CC-BY-SA 3.0
 * 
 */
;(function (window, mw, undefined) {
    mw.hook('dev.wds').add(function(wds) {
        wds.render(mw.util.$content.find('#dev-wds-demo'));
    });
    importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });
}(this, mediaWiki));
/* </nowiki> */