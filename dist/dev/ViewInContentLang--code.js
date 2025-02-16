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
    var place = '.wds-global-navigation__user-menu .wds-list, .wiki-tools .wds-dropdown__content .wds-list',
    	url = new URL(window.location.href);
    url.searchParams.set('uselang', config.wgPageContentLanguage);
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
                        href: url.href,
                        text: i18n.msg('text').plain(),
                        title: i18n.msg('title').plain()
                    })
                )
            );
        });
    });
});