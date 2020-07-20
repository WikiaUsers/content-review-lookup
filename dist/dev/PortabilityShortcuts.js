/**
 * @name        PortabilityShortcuts
 * @description Provides some useful shortcuts for users that making content portable
 * @author      Railfail536
 * @ license    CC-BY-SA 3.0
 */
$(function() {
    if (window.PortabilityShortcutsLoaded) {
        return;
    }
    window.PortabilityShortcutsLoaded = true;
 
    var i18n;
 
    function buildListItem(name) {
        return {
            title: i18n.msg(name + '-title').plain(),
            id: 'ca-' + name
        };
    }
 
    function init(i18nData) {
        i18n = i18nData;
        $('.page-header__contribution-buttons .wds-is-linked').append(
            $('<li>', buildListItem('portability-check')).append(
                $('<a>', {
                    href: '//portability.wikia.com/wiki/Special:PortabilityDashboard?url=' + window.location.hostname,
                    text: i18n.msg('portability-check').plain(),
                    target: '_blank'
                })
            ),
            $('<li>', buildListItem('infobox-check')).append(
                $('<a>', {
                    href: mw.util.getUrl('Special:Templates', { type: 'infobox' }),
                    text: i18n.msg('infobox-check').plain()
                })
            ),
            $('<li>', buildListItem('see-insights')).append(
                $('<a>', {
                    href: mw.util.getUrl('Special:Insights'),
                    text: i18n.msg('see-insights').plain()
                })
            )
        );
    }
 
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('PortabilityShortcuts').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});