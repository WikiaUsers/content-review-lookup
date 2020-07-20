/**
 * 14:12, January 26, 2015 (UTC)
 * SkinSwitchButton
 * https://dev.wikia.com/wiki/SkinSwitchButton
 * Adds a button for switching to Mercury.
 * @author: UltimateSupreme (https://dev.wikia.com/wiki/User:UltimateSupreme)
 */
/*jshint browser:true, jquery:true */
/*global mw */

jQuery(function ($) {
    'use strict';
    if ($('.ca-skins-switch').length) {
        return;
    }
    window.WikiaBar.wikiaBarWrapperObj.find('.tools').append(
        $('<li>').append(
            $('<a>', {
                href: mw.util.getUrl(
                    mw.config.get('wgPageName'),
                    $.extend($.getUrlVars(), {
                        useskin: 'mercury'
                    })
                ),
                title: 'See this page in Mercury skin',
                'class': 'ca-skins-switch',
                text: window.mobileText || 'Mobile'
            })
        )
    );
    if ($.cookies.test()) {
        window.skinSwitchDeleteCookie = function () {
            // fallback
            document.cookie = 'useskin=oasis; expires=01 Jan 1970 00:00:00 GMT; path=/';
        };
        $('body').on('click', '.ca-skins-switch', function(e){
            var $target = $(e.target);
            if (window.skinSwitchPermanent) {
                document.cookie = 'useskin=mercury; expires=01 Jan 2100 00:00:00 GMT; path=/';
            } else {
                // delete cookie
                if (window.skinSwitchDeleteCookie) {
                    window.skinSwitchDeleteCookie();
                }
            }
            return true;
        });
    }
});