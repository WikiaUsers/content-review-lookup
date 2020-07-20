/** <nowiki>
 * 
 * @module                  DisableInfoboxBuilder
 * @description             Bypasses infobox builder.
 * @author                  Speedit
 * @version                 1.0
 * @license                 CC-BY-SA 3.0
 * @scope                   For PERSONAL use only.
 * 
 */
mw.loader.using('mediawiki.util').then(function() {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgArticlePath'
    ]);
    if (
       config.wgCanonicalSpecialPageName !== 'InfoboxBuilder' ||
        window.DisableInfoboxBuilderLoaded
    ) {
        return;
    }
    window.DisableInfoboxBuilderLoaded = true;
    var r = new RegExp(config.wgArticlePath.replace('$1', '([\\s\\S]+)')),
        n = window.location.pathname.match(r)[1].match(/[^/]+\/([\s\S]+)/)[1];
    window.location.href = new mw.Uri(mw.util.getUrl('Template:' + n)).extend({
        'action': 'edit',
        'useeditor': 'source'
    }).toString();
});