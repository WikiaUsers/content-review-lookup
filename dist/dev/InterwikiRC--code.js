/**
 * Name:        InterwikiRC
 * Description: Automatically updates interwiki links on RecentChanges in a set interval of time
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Version:     v1.2
 */
(function() {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgContentLanguage'
    ]);
    if (
        config.wgCanonicalSpecialPageName !== 'Recentchanges' ||
        window.InterwikiRCLoaded
    ) {
        return;
    }
    window.InterwikiRCLoaded = true;
    var InterwikiRC = {
        config: $.extend({
            interval: 7200000
        }, window.InterwikiRCConfig),
        map: [],
        preload: function() {
            return $.get(mw.util.wikiScript('load'), {
                mode: 'articles',
                articles: 'u:dev:MediaWiki:Custom-language-code-sorting',
                only: 'styles'
            });
        },
        init: function(d) {
            this.codes = JSON.parse(d[0].replace(/\/\*.*\*\//g, ''));
            this.api = new mw.Api();
            this.refreshing = $('<img>', {
                id: 'InterwikiRCRefreshing',
                src: 'https://images.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif',
                width: 16,
                height: 16
            }).hide().appendTo('.page-header__main');
            setInterval($.proxy(this.updateLanguages, this), this.config.interval);
            if (!$('.page-header__languages .wds-list').exists()) {
                this.insertLists();
            } else {
                this.checkCache();
            }
        },
        insertLists: function() {
            this.api.get({
                action: 'query',
                meta: 'siteinfo|allmessages',
                siprop: 'languages',
                ammessages: 'oasis-interlang-languages'
            }).done($.proxy(this.cbLists, this));
        },
        cbLists: function(d) {
            var q = d.query;
            $('.page-header__contribution div:first').append(
                $('<div>', {
                    'class': 'wds-dropdown page-header__languages'
                }).append(
                    $('<div>', {
                        'class': 'wds-dropdown__toggle'
                    }).append(
                        $('<span>', {
                            text: q.languages.filter(function(el) {
                                return el.code === config.wgContentLanguage;
                            })[0]['*']
                        }),
                        '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny">' +
                            '<path d="M6 9l4-5H2" fill-rule="evenodd"></path>' +
                        '</svg>'
                    ),
                    $('<div>', {
                        'class': 'wds-dropdown__content wds-is-right-aligned'
                    }).append(
                        $('<ul>', {
                            'class': 'wds-list wds-is-linked'
                        })
                    )
                )
            );
            $('.WikiaArticle').after(
                $('<nav>', {
                    'class': 'WikiaArticleInterlang'
                }).append(
                    $('<h3>', {
                        text: q.allmessages[0]['*']
                    }),
                    $('<ul>')
                )
            );
            this.checkCache();
        },
        checkCache: function() {
            var cache = localStorage.getItem('InterwikiRC');
            if (cache) {
                cache = JSON.parse(cache);
                this.map = cache.data;
                this.showLanguages();
                if(new Date() - new Date(cache.updated) > this.config.interval) {
                    this.updateLanguages();
                }
            } else {
                this.updateLanguages();
            }
        },
        updateLanguages: function() {
            this.map = [];
            this.refreshing.show();
            this.api.get({
                action: 'query',
                meta: 'siteinfo',
                siprop: 'interwikimap',
                sifilteriw: 'local'
            }).done($.proxy(this.cbLanguages, this));
        },
        cbLanguages: function(d) {
            if (!d.error) {
                this.tempMap = d.query.interwikimap.filter(function(obj) {
                    return obj.language;
                });
                this.checkNextWiki();
            }
        },
        checkNextWiki: function() {
            if (typeof this.checkTimeout === 'number') {
                clearTimeout(this.checkTimeout);
                this.checkTimeout = null;
            }
            this.checkWiki = this.tempMap.shift();
            if (this.checkWiki) {
                $('#InterwikiRCCheck').remove();
                var script = $('<script>', {
                    src: this.checkWiki.url.replace(
                        '/wiki/$1',
                        '/api.php?action=query&meta=siteinfo&format=json&callback=cbCheckWiki'
                    ),
                    type: 'text/javascript',
                    id: 'InterwikiRCCheck'
                })[0];
                this.checkTimeout = setTimeout(this.generateCorbTimeout(), 5000);
                script.addEventListener('error', $.proxy(this.checkNextWiki, this));
                document.head.appendChild(script);
            } else {
                localStorage.setItem('InterwikiRC', JSON.stringify({
                    updated: new Date(),
                    data: this.map
                }));
                this.showLanguages();
            }
        },
        generateCorbTimeout: function() {
            var url = this.checkWiki.url;
            return $.proxy(function() {
                if (this.checkWiki.url === url) {
                    this.checkNextWiki();
                }
            }, this);
        },
        cbCheckWiki: function(d) {
            var q = d.query.general;
            this.checkWiki.url = q.server + q.articlepath
                .replace('$1', 'Special:RecentChanges');
            this.map.push(this.checkWiki);
            this.checkNextWiki();
        },
        showLanguages: function() {
            this.refreshing.hide();
            var $list1 = $('.page-header__languages .wds-list'),
                $list2 = $('.WikiaArticleInterlang ul');
            $list1.html('');
            $list2.html('');
            this.map.sort(function(a, b) {
                return a.language.localeCompare(b.language);
            }).forEach(this.forEachGen($list1));
            this.map.sort($.proxy(function(a, b) {
                return this.codes.indexOf(a.prefix) -
                       this.codes.indexOf(b.prefix);
            }, this)).forEach(this.forEachGen($list2));
        },
        forEachGen: function($list) {
            return function(el) {
                $list.append(
                    $('<li>').append(
                        $('<a>', {
                            href: el.url,
                            text: el.language
                        })
                    )
                );
            };
        }
    };
    window.cbCheckWiki = $.proxy(InterwikiRC.cbCheckWiki, InterwikiRC);
    $.when(
        InterwikiRC.preload(),
        mw.loader.using('mediawiki.api')
    ).then($.proxy(InterwikiRC.init, InterwikiRC));
})();