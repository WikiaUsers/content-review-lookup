/**
 * Name:        ToggleSideBar
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Version:     v1.5
 * Description: Adds a button for toggling the side bar
 */
(function() {
    var $rail = $('.WikiaRail'),
        $wrapper = $('#WikiaMainContent'),
        isMobile = false,
        isLegacy = mw.config.get('wgVersion') === '1.19.24';
    if ($rail.length === 0 || window.ToggleSideBarLoaded) {
        return;
    }
    window.ToggleSideBarLoaded = true;
    // Importing I18n-js library
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    if (isLegacy) {
        require(['wikia.browserDetect'], function(detect) {
            isMobile = detect.isMobile();
        });
    } else {
        var modules = mw.loader
            .getModuleNames()
            .filter(function(module) {
                return module.indexOf('isTouchScreen') === 0;
            });
        if (modules.length === 1) {
            mw.loader.using(modules[0]).then(function() {
                var module = mw.loader.require(modules[0]);
                isMobile = module.isTouchScreen();
            });
        }
    }
    function click() {
        if ($rail.css('display') !== 'none') {
            $rail.fadeToggle('slow', null, function() {
                if (!isMobile && isLegacy) {
                    $wrapper.animate({ width: '100%' }, 'slow');
                }
            });
        } else if (isMobile || !isLegacy) {
            $rail.fadeToggle();
        } else {
            $wrapper.animate(
                { width: ($('.WikiaPageContentWrapper').width() - 330) + 'px' },
                'slow',
                null,
                function() {
                    $rail.fadeToggle();
                }
            );
        }
    }
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('ToggleSideBar').done(function(i18n) {
            i18n.useUserLang();
            var action = '.UserProfileActionButton',
                $action = $(action).length === 0;
            $(
                $action ?
                window.ToggleSideBarSelector || '.page-header__contribution-buttons' :
                action
            )[
                $action ? 'after' : 'append'
            ](
                $('<a>', {
                    'class':
                        $action ?
                        'wds-button wds-is-squished wds-is-secondary' :
                        'button',
                    id: 'toggle-side-bar-button',
                    text: i18n.msg('toggle').plain(),
                    click: click
                })
            );
            mw.hook('ToggleSideBar.loaded').fire();
        });
    });
})();