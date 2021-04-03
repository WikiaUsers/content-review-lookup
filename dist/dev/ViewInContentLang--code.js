/**
 * @name           ViewInContentLang
 * @description    Allows you to see a wiki page in Wiki's language
 *                 (Useful when an article uses MediaWiki messages and has them translated in many languages including its main language)
 * @author         HM100
 * @contributors   Rail01
                   TheGoldenPatrik1
 * @version        1.4
 */
$(function() {
    var config = mw.config.get([
        'wgPageContentLanguage',
        'wgUserLanguage'
    ]);
    if (
        window.ViewInContentLangLoaded ||
        config.wgPageContentLanguage === config.wgUserLanguage
    ) {
        return;
    }
    window.ViewInContentLangLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    var place = '.UserProfileActionButton .WikiaMenuElement, .WikiaPage .page-header .wds-button-group .wds-list';
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('ViewInContentLang').then(function(i18n) {
            $(
                ($(place).length === 0) ?
                '.toolbar ul.tools' :
                place
            ).append(
                $('<li>', {
                    id: 'ca-language'
                }).append(
                    $('<a>', {
                        href: new mw.Uri().extend({
                            uselang: config.wgPageContentLanguage
                        }).toString(),
                        text: i18n.msg('text').plain(),
                        title: i18n.msg('title').plain()
                    })
                )
            );
        });
    });
});