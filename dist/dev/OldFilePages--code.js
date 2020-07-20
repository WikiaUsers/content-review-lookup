/**
 * Revert file pages to the previous non-tabbed design, plus some improvements.
 * Original idea/base code by Callofduty4: https://community.fandom.com/wiki/User:Callofduty4/OldFilePages.js?oldid=1019612
 * Updated, adjusted, added to, etc. by Bobogoobo
 * Rewrite and i18n support by KockaAdmiralac
 */
;(function($, mw) {
    'use strict';
    var config = mw.config.get([
        'skin',
        'stylepath',
        'wgAction',
        'wgArticleId',
        'wgFormattedNamespaces',
        'wgNamespaceNumber',
        'wgPageName'
    ]);
    if (
        config.skin !== 'oasis' ||
        config.wgNamespaceNumber !== 6 ||
        config.wgAction !== 'view' ||
        $.getUrlVar('diff') ||
        window.OldFilePagesLoaded
    ) {
        return;
    }
    window.OldFilePagesLoaded = true;
    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:OldFilePages.css'
    });
    var OldFilePages = {
        config: $.extend({
            limit: 100
        }, window.OFPoptions),
        page: config.wgPageName,
        preload: function(i18no) {
            $('#mw-content-text > .tabBody').removeAttr('class');
            $('ul.tabs, .page-listings').remove();
            // Old version of OldFilePages was causing this cache
            // value to become corrupt, so clearing that value here
            // will help people that may remove OldFilePages sometime
            // in future
            require(['wikia.cache'], function(cache) {
                cache.del('WikiaFilePageTab');
            });
            this.$loading = $('<img>', {
                src: config.stylepath + '/common/images/ajax.gif',
                'class': 'OFPloading'
            }).appendTo('[data-tab-body="history"]');
            $.when(
                this.loadAPI(),
                i18no.loadMessages('OldFilePages')
            ).done($.proxy(this.init, this));
        },
        loadAPI: function() {
            return new mw.Api().get({
                action: 'query',
                // Fetching messages
                meta: 'allmessages',
                ammessages: [
                    'imagelinks'
                ].join('|'),
                // Fetching image usage and backlinks
                list: 'imageusage|backlinks',
                iutitle: this.page,
                bltitle: this.page,
                iulimit: 'max',
                bllimit: 'max',
                // Fetching duplicate images
                titles: this.page,
                prop: 'duplicatefiles',
                dflimit: 'max'
            });
        },
        init: function(data, i18n) {
            var query = data[0].query;
            this.msg = {};
            query.allmessages.forEach(function(msg) {
                this.msg[msg.name] = msg['*'];
            }, this);
            this.i18n = i18n;
            this.addLinks(query, i18n);
        },
        addLinks: function(data) {
            var usage = this.fullSort(data.imageusage),
                links = this.fullSort(data.backlinks),
                dupes, $history = $('[data-tab-body="history"]');
            this.$loading.remove();
            $history.append(
                $('<h2>', { text: this.msg.imagelinks }),
                $('<p>', { 'class': 'FileTransclusions' })
            );
            if (config.wgArticleId !== 0) {
                dupes = data.pages[config.wgArticleId].duplicatefiles;
            }
            this.addUsage($history, usage);
            if (this.config.showlinks || !usage.length) {
                this.addBacklinks($history, links, this.config.showlinks && usage.length);
            }
            if (dupes && dupes.length) {
                this.addDupes($history, dupes.sort(this.sort('name')));
            }
        },
        fullSort: function(arr) {
            return arr.sort(this.sort('title'))
                      .sort(this.sort('ns'));
        },
        plural: function(msg, num) {
            return this.i18n.msg(msg + '-' + (num === 1 ? 'singular' : 'plural'), num).plain();
        },
        sort: function(param) {
            return function(a, b) {
                if (a[param] < b[param]) {
                    return -1;
                } else if (a[param] > b[param]) {
                    return 1;
                } else {
                    return 0;
                }
            };
        },
        arrToUl: function(arr, prop) {
            prop = prop || 'title';
            return arr.map(function(el) {
                var $a = $('<a>', {
                    href: mw.util.getUrl(el[prop]),
                    text: el[prop]
                });
                if (el.redirect === '') {
                    $a.addClass('allpagesredirect');
                    $a.attr('href', $a.attr('href') + '?redirect=no');
                }
                return $('<li>').append($a);
            });
        },
        addUsage: function($container, usage) {
            var text, uses = usage.length;
            if (uses) {
                if (uses > this.config.limit) {
                    text = this.i18n.msg(
                        'too-many-transclusions',
                        this.config.limit,
                        this.page
                    ).parse();
                } else {
                    text = this.i18n.msg(
                        'transclusions',
                        uses,
                        this.plural('use', uses)
                    ).escape();
                }
                $container.append(
                    $('<ul>', {
                        'class': 'FileTransclusions'
                    }).append(this.arrToUl(usage.slice(0, this.config.limit)))
                );
            } else {
                text = this.i18n.msg('no-transclusions').escape();
            }
            $('p.FileTransclusions').html(text);
        },
        addBacklinks: function($container, links, separate) {
            var text, uses = links.length;
            if (uses) {
                // TODO: Limit the list of links as well?
                text = this.i18n.msg(
                    separate ? 'links' : 'no-transclusions-links',
                    this.plural('link', uses)
                ).escape();
                $container.append(
                    $('<ul>', {
                        'class': 'FileLinks'
                    }).append(this.arrToUl(links))
                );
            } else {
                text = this.i18n.msg('no-links' + (separate ? '-separate' : '')).escape();
            }
            if (separate) {
                $('ul.FileLinks').before($('<p>', {
                    'class': 'FileLinks',
                    text: text
                }));
            } else {
                $('p.FileTransclusions').append(' ', text);
            }
        },
        addDupes: function($container, dupes) {
            $container.append(
                $('<p>', {
                    'class': 'FileDuplicates',
                    html: this.i18n.msg(
                            'duplicates',
                            this.plural('duplicate', dupes.length),
                            this.page
                        ).parse()
                }),
                $('<ul>', {
                    'class': 'FileDuplicates'
                }).append(this.arrToUl(dupes.map(function(dupe) {
                    return $.extend(dupe, {
                        name: config.wgFormattedNamespaces[6] + ':' + dupe.name
                    });
                }), 'name'))
            );
        }
    };
    mw.loader.using(['mediawiki.api', 'mediawiki.action.view.metadata']).then(function() {
        mw.hook('dev.i18n').add($.proxy(OldFilePages.preload, OldFilePages));
    });
}(this.jQuery, this.mediaWiki));