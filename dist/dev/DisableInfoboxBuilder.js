/** <nowiki>
 * 
 * @module                  DisableInfoboxBuilder
 * @description             Bypasses infobox builder.
 * @author                  Speedit
 * @version                 1.1
 * @license                 CC-BY-SA 3.0
 * @scope                   For PERSONAL use only.
 * 
 */
mw.loader.using('mediawiki.util').then(function() {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgTitle',
    ]);
    if (config.wgCanonicalSpecialPageName !== 'InfoboxBuilder') {
        return;
    }
    var n = config.wgTitle.substr(config.wgTitle.indexOf('/') + 1);
    window.location.href = mw.util.getUrl('Template:' + n, {
        'action': 'edit',
        'useeditor': 'source'
    });
});