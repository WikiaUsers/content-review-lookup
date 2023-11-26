/** <nowiki>
 * Script to place a notice above JSON pages used for script translation
 * telling the editors how should it be used and pointing them to the
 * translation editor on [[Special:BlankPage/I18nEdit]]
 * 
 * @author KockaAdmiralac <wikia@kocka.tech>
 * @version 1.4
 */
(function() {
    var config = mw.config.get([
        'wgAction',
        'wgArticleId',
        'wgIsArticle',
        'wgPageName',
        'wgUserLanguage'
    ]);
    var res = /^MediaWiki:Custom-(.*)\/i18n\.json$/.exec(config.wgPageName);
    if (!res || !config.wgIsArticle || config.wgArticleId === 0) {
        return;
    }
    mw.loader.using('mediawiki.api').then(function() {
        return new mw.Api().get({
            action: 'parse',
            text: '{{int:Custom-I18nEdit-notice|' + res[1] + '}}',
            disableeditsection: true,
            disablelimitreport: true,
            prop: 'text',
            uselang: config.wgUserLanguage,
            wrapoutputclass: 'I18nEdit-warning'
        });
    }).then(function(data) {
    	$('#mw-clearyourcache').replaceWith(data.parse.text['*']);
    });
})();