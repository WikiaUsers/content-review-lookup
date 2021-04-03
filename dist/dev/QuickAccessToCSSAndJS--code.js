/* QuickAccessToCSSAndJS
 * Original code by [[User:JPhil2.0]] (can be found in https://community.fandom.com/wiki/User:JPhil2.0/global.js?diff=2017878&oldid=2017872)
 * Modified and fixed by [[User:Ultragustavo25]] and [[User:Doork]]
 */

mw.loader.using('mediawiki.util').then(function() {
    var user = mw.config.get('wgUserName'),
        i18n;

    if (
        window.QuickAccessToCSSAndJSLoaded ||
        user === null
    ) {
        return;
    }
    window.QuickAccessToCSSAndJSLoaded = true;

    var links = {
        js: 'https://community.fandom.com/wiki/User:' + user + '/global.js',
        css: 'https://community.fandom.com/wiki/User:' + user + '/global.css',
        localcommoncss: mw.util.getUrl('User:' + user + '/common.css'),
        localcommonjs: mw.util.getUrl('User:' + user + '/common.js'),
        localchatcss: mw.util.getUrl('User:' + user + '/chat.css'),
        localchatjs: mw.util.getUrl('User:' + user + '/chat.js'),
    };

    function addLink(linkName) {
        $('<li>').append(
            $('<a>', {
                href: links[linkName],
                text: i18n.msg(linkName).plain()
            })
        ).insertBefore('.wds-global-navigation__user-menu li:last');
    }

    mw.hook('dev.i18n').add(function(i18njs) {
        i18njs.loadMessages(
            'QuickAccessToCSSAndJS'
        ).then(function(i18nData) {
            i18n = i18nData;
            Object.keys(links).forEach(addLink);
        });
    });

    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
});