/**
 * @name            UserActivityLink
 * @version         v1.0
 * @author          TheGoldenPatrik1
 * @description     Adds a Special:UserActivity global nav link.
 */
(function () {
    if (window.UserActivityLinkLoaded) {
        return;
    }
    window.UserActivityLinkLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    function init (i18n) {
        $('.wds-global-navigation__user-menu div:nth-child(2) ul li:nth-child(2), .global-navigation__bottom .wds-list li:nth-child(2)').after(
            $('<li>').append(
                $('<a>', {
                    'data-id': 'activity',
                    'class': 'wds-global-navigation__dropdown-link',
                    href: 'https://community.fandom.com/wiki/Special:UserActivity',
                    text: i18n.msg('activity').plain()
                })
            )
        );
    }
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('UserActivityLink').then(init);
    });
})();