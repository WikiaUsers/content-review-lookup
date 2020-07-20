/**
 * Name:        ToggleSideBar
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Version:     v1.4
 * Description: Adds a button for toggling the side bar
 */
require([
    'jquery',
    'mw',
    'wikia.window',
    'wikia.browserDetect'
], function($, mw, window, detect) {
    var $rail = $('#WikiaRail'),
        $wrapper = $('#WikiaMainContent');
    if (!$rail.exists() || window.ToggleSideBarLoaded) {
        return;
    }
    window.ToggleSideBarLoaded = true;
    // Importing I18n-js library
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('ToggleSideBar').done(function(i18n) {
            i18n.useUserLang();
            var action = '.UserProfileActionButton',
                $action = $(action).length === 0;
            function click() {
                var mob = detect.isMobile();
                if ($rail.css('display') === 'block') {
                    $rail.fadeToggle('slow', null, function() {
                        if (!mob) {
                            $wrapper.animate({ width: '100%' }, 'slow');
                        }
                    });
                } else if (mob) {
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
});