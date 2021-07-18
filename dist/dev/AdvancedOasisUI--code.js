/**
 * Script for adding various UI improvements to Oasis
 * Script by User:Porter21 (https://fallout.fandom.com) and User:Kangaroopower (https://39clues.fandom.com)
 */
(function (window, $, mw, dev) {
    "use strict";
    var config = dev.AdvancedOasisUI || window.AdvancedOasisUI || {}, i18n;

    // Stop the script from starting more than once
    if (config.Actions) {
        return;
    }

    config = $.extend({
        accountNavWatchlist: false,
        categoryRedlink: true,
        lightbox: true,
        randomPageLimitedTo: '',
        userLang: true
    }, config, {
        version: '1.15.1'
    });

    if (!dev.i18n) {
        var articles = ['u:dev:MediaWiki:I18n-js/code.js'];
        if (config.lightbox) {
            articles.push('u:dev:MediaWiki:NoImageLightbox/code.js');
        }
        importArticles({
            type: 'script',
            articles: articles
        });
    }

    // Private function
    function newNavItem(navItemLink, navItemMsg) {
        return $('<li>').append(
            $('<a>', {
                'class': 'wds-global-navigation__dropdown-link',
                href: mw.util.getUrl(navItemLink),
                text: i18n.msg(navItemMsg).plain()
            })
        );
    }

    function newEditDropdownItem(link, msg, params) {
        return $('<li>').append(
            $('<a>', {
                href: mw.util.getUrl(link, params),
                target: '_blank',
                text: i18n.msg(msg).plain()
            })
        );
    }

    // Expose this function as window.AdvancedOasisUI.Actions
    config.Actions = function () {
        // Header: Limit "Random Page" to specific namespace
        if (config.randomPageLimitedTo) {
            $('[data-tracking="explore-random"]').attr('href', mw.util.getUrl('Special:Random/' + config.randomPageLimitedTo));
        }

        // Account navigation: Add watchlist link
        if (config.accountNavWatchlist) {
            $('.wds-global-navigation__user-menu .wds-list, .global-navigation__bottom .wds-list').append(
                $('<li>').append(
                    $('<a>', {
                        'class': 'wds-global-navigation__dropdown-link',
                        href: mw.util.getUrl('Special:Watchlist'),
                        text: i18n.msg('watchlist').plain()
                    })
                )
            );
        }

        // Search: Add "go to search term" button
        var searchVal = $('.unified-search__input__query').val();
        if (mw.config.get('wgCanonicalSpecialPageName') === 'Search' && searchVal !== '') {
            $('.unified-search__profiles').append(
                $('<li>', {
                    'class': 'unified-search__profiles__profile',
                }).append(
                    $('<a>', {
                        href: mw.util.getUrl(searchVal),
                        text: i18n.msg('goToPage').plain(),
                        title: searchVal
                    })
                )
            );
        }

        // Categories: Turn links pointing to non-created categories into redlinks (MW default)
        if (config.categoryRedlink) {
            $('.newcategory').addClass('new');
        }
    };
    mw.hook('dev.i18n').add(function(i18no) {
        var i18nOptions = {};
        if (typeof config.userLang === 'string') {
            i18nOptions.language = config.userLang;
        }
        i18no.loadMessages('AdvancedOasisUI', i18nOptions).then(function(i18nd) {
            i18n = i18nd;
            config.Actions();
        });
    });

    dev.AdvancedOasisUI = config;

}(this, jQuery, mediaWiki, window.dev = window.dev || {}));