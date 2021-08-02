/* <nowiki>
 * Script to place a notice above JSON pages used for script translation
 * telling the editors how should it be used and pointing them to the
 * translation editor on [[Special:BlankPage/I18nEdit]]
 * 
 * @author KockaAdmiralac <wikia@kocka.tech>
 * @version 1.3
 */
mw.loader.using('mediawiki.util').then(function() {
    var config = mw.config.get([
        'wgAction',
        'wgArticleId',
        'wgPageName',
        'wgUserLanguage'
    ]), res = /^MediaWiki:Custom-(.*)\/i18n\.json$/.exec(config.wgPageName);
    if (
        !res ||
        config.wgAction !== 'view' ||
        mw.util.getParamValue('diff') ||
        config.wgArticleId === 0
    ) {
        return;
    }
    mw.loader.using('mediawiki.api').done(function() {
        new mw.Api().get({
            action: 'parse',
            text: '{{int:Custom-I18nEdit-notice|' + res[1] + '}}',
            disablelimitreport: true,
            uselang: config.wgUserLanguage
        }).done(function(d) {
            if (!d.error) {
            	$('#mw-clearyourcache').remove();
                var $c = $('#mw-content-text'),
                    $contents = $c.contents();
                for (var i = 0, len = $contents.length; i < len; ++i) {
                    var node = $contents[i];
                    node.remove();
                    if (node.nodeType === Node.TEXT_NODE) {
                        break;
                    }
                }
                $c.prepend(d.parse.text['*']);
            }
        });
    });
});