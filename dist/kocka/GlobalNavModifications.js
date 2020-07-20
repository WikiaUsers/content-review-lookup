/**
 * Name:        Global navbar modifications
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Version:     v1.3
 * Description: Modifies the global navbar to add useful buttons
 * NOTE:        PERSONAL USE ONLY
 */
(function() {
    var $container = $('.wds-global-navigation__notifications-dropdown').first().parent(),
        config = mw.config.get([
            'wgArticlePath',
            'wgPageName',
            'wgServer',
            'wgUserName'
        ]),
        links = window.globalLinks || {};
    if (window.GlobalNavModificationsKockaMode) {
        $container = $('[data-tracking="explore-activity"]').parent().parent().empty();
        $container.closest('.wds-tabs__tab-label span').text('Links');
    }
    if (!$container.exists() || window.GlobalNavModificationsLoaded) {
        return;
    }
    window.GlobalNavModificationsLoaded = true;
    links = $.extend(links.global, links[/^https?:\/\/(.*)\.(?:wikia|fandom)\.(?:com|org)\/?\w*$/.exec(config.wgServer)[1]]);
    $.each(links, function(prop, link) {
        link = link.replace(/%page%/g, config.wgPageName).replace(/%user%/g, config.wgUserName);
        var $link = $('<a>', {
            'class': 'wds-global-navigation__link global-nav-link',
            href: config.wgArticlePath.replace('$1', link),
            target: '_blank',
            text: prop
        });
        if (window.GlobalNavModificationsKockaMode) {
            $link = $('<li>').append($link.removeClass('wds-global-navigation__link'));
            $container.prepend($link);
        } else {
            $container
                .find('.wds-global-navigation__notifications-dropdown')
                .first()
                .before($link);
        }
    });
})();