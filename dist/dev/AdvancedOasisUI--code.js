/**
 * Script for adding various UI improvements to Oasis
 * Script by User:Porter21 (https://fallout.fandom.com) and User:Kangaroopower (https://39clues.fandom.com)
 */
(function (window, $, mw, dev) {
    "use strict";
    var config = dev.AdvancedOasisUI || window.AdvancedOasisUI || {},
        mwconfig = mw.config.get([
            'wgAction',
            'wgBlankImgUrl',
            'wgCanonicalSpecialPageName',
            'wgPageName',
            'wgUserName'
        ]), i18n;

    // Stop the script from starting more than once
    if (config.Actions) {
        return;
    }

    config = $.extend({
        accountNavFollowedPages: false,
        accountNavWatchlist: false,
        categoryRedlink: true,
        RCHeader: true,
        lightbox: true,
        DefaultSourceMode: true,
        randomPageLimitedTo: '',
        activity2RC: true,
        userLang: true
    }, config, {
        version: '1.15.1'
    });

    if (!dev.i18n) {
        var articles = ['u:dev:MediaWiki:I18n-js/code.js'];
        if (config.lightbox) {
            articles.push('u:dev:NoImageLightbox/code.js');
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
        // Header: "WikiActivity" -> "Recent Changes"
        if (config.activity2RC) {
            var rcTitle = i18n.msg('recentChanges').plain();
            $('[data-tracking="explore-activity"], [data-tracking="wiki-activity"]').attr({
                href: mw.util.getUrl('Special:RecentChanges'),
                title: rcTitle
            });
            $('[data-tracking="explore-activity"]').text(rcTitle);
        }

        // Header: Limit "Random Page" to specific namespace
        if (config.randomPageLimitedTo) {
            $('a[data-id="randompage"]').attr('href', mw.util.getUrl('Special:Random/' + config.randomPageLimitedTo));
        }

        // Account navigation: Add "contributions", "followed pages", "watchlist"
        $('.wds-global-navigation__user-menu .wds-list').append(
            newNavItem('Special:Contributions/' + mwconfig.wgUserName, 'contributions'),
            (config.accountNavFollowedPages ? newNavItem('Special:Following', 'followedPages') : ''),
            (config.accountNavWatchlist ? newNavItem('Special:Watchlist', 'watchlist') : '')
        );

        // Search: Add "go to search term" button
        var searchVal = $('#search-v2-input').val();
        if (mwconfig.wgCanonicalSpecialPageName === 'Search' && searchVal !== '') {
            $('.search-tabs').append(
                $('<li>', {
                    'class': 'normal'
                }).append(
                    $('<a>', {
                        href: mw.util.getUrl(searchVal),
                        text: i18n.msg('goToPage').plain(),
                        title: searchVal
                    })
                )
            );
        }

        // Edit screen: Add "history" and "what links here"
        if (mwconfig.wgAction === 'edit' || mwconfig.wgAction === 'submit') {
            if (!$('#wpSave').parent().hasClass('wikia-menu-button')) {
                // save button does not have dropdown menu, so make one
                $('#wpSave').removeClass('even').css({
                    'width': 'calc(100% - 17px)',
                    'margin-top': '0'
                }).after(
                    $('<nav>', {
                        'class': 'wikia-menu-button wikia-menu-button-submit control-button even'
                    }).append(
                        $('<span>', {
                            'class': 'drop'
                        }).append(
                            $('<img>', {
                                'class': 'chevron',
                                src: mwconfig.wgBlankImgUrl
                            })
                        ),
                        $('<ul>', {
                            'class': 'WikiaMenuElement'
                        })
                    )
                ).prependTo('.wikia-menu-button-submit');
                WikiaButtons.add($('.wikia-menu-button-submit'));
            }
            $('#wpSave').parent().find('.WikiaMenuElement').append(
                newEditDropdownItem(mwconfig.wgPageName, 'history', {action: 'history'}),
                newEditDropdownItem('Special:WhatLinksHere/' + mwconfig.wgPageName, 'whatLinksHere')
            );
        }

        // Categories: Turn links pointing to non-created categories into redlinks (MW default)
        if (config.categoryRedlink) {
            $('.newcategory').addClass('new');
        }

        // Publish to save and rename to move
        $('#wpSave').attr('value', i18n.msg('savePage').plain());
        $('#ca-move').text(i18n.msg('movePage').plain());

        // Source mode as default
        if (config.DefaultSourceMode) {
            $(window.document).on('click.DefaultSourceMode', function (ev) {
                if (mwconfig.wgAction === 'view' && ev.target.tagName === 'A' && /[\?&]action=edit(?:[&#]|$)/.test(ev.target.href)) {
                    ev.target.href += '&useeditor=source';
                }
            });
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