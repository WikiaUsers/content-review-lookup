/**
 * @name        ArticleRating Insights
 * @version     1.1
 * @moduleof    ArticleRating
 * @description Creates an Insights special page for ArticleRating
 * @author      KhangND
 * <nowiki>
 */
require(['wikia.window', 'mw', 'jquery'],
function(window, mw, $) {
    'use strict';

    var $content = $('#mw-content-text');
    var ARInsights = {
        /**
         * @properties:
         *  {number} imports
         *  {string} storage
         *  {constructor} api
         *  {method} i18n
         *  {object} colors
         *  {object} icons
         *  {method} icon
         *  {array}  articles
         */
    };
    ARInsights.imports = 3,
    ARInsights.storage = 'Module:Rating-storage',
    ARInsights.icons = {
        most: 'poll',
        highest: 'upvote',
        lowest: 'upvote'
    },
    /**
     * @method      prepare
     * @desc        Prepares properties with imported scripts
     * @returns     {void}
     */
    ARInsights.prepare = function() {
        if(--this.imports > 0)
            return;
        this.api = new mw.Api();
        this.icon   = window.dev.wds.icon;
        this.colors = window.dev.colors;
        window.dev.i18n
            .loadMessages('ArticleRating')
            .done($.proxy(this.preload, this));
    },
    /**
     * @method      preload
     * @desc        Preloads data and i18n
     * @returns     {void}
     */
    ARInsights.preload = function(i18nData) {
        this.api.get({
            action: 'parse',
            text: '{{' + this.storage + '}}',
            prop: 'text',
            disablepp: true
        }).done($.proxy(function(data) {
            data = $(data.parse.text['*']);
            if(data.find('a').length)
                return;
            data = data.text();
            try {
                data = JSON.parse(data.substr(2, data.length));
            } catch(e) {
                return;
            }

            // stores articles in an array for sorting purpose
            this.articles = [];
            var i = 0,
                ids   = Object.keys(data),
                rates = Object.values(data),
                sum = function(sum, num) { return sum + num };
            for(i in ids) {
                var total = Object.keys(rates[i]).length;
                this.articles[i] = {
                    id: ids[i],
                    info: rates[i],
                    rates: total,
                    avg: Object.values(rates[i]).reduce(sum) / total
                };
            }
            this.i18n = i18nData.msg;
            this.init();
        }, this));
    },
    /**
     * @method      init
     * @desc        Initializes components and data
     * @returns     {void}
     */
    ARInsights.init = function() {
        // add internal css
        var bgColor = this.colors.parse(this.colors.wikia.page),
            bdColor = this.colors.parse(this.colors.wikia.menu),
            style = 
            '.rating-col,' +
            '.rating-bars,' +
            '.rating-table th,' +
            '.rating-details .head,' +
            '.wikia-paginator,' +
            'tr:hover > td {' +
                'background-color: $bg;' +
            '}' +
            '.rating-col { border-top: 4px solid $bd }' +
            '.rating-bars > div { background-color: $bd }' +
            '.rating-table th,' +
            '.rating-details .head {' +
                'border-top: 2px solid $bd' +
            '}';
        mw.util.addCSS(
            this.colors.css(style, {
                bg: bgColor.isBright() ? bgColor.lighten(-5) : bgColor.lighten(5),
                bd: bdColor
            })
        );

        // modify blank page
        var title = $('title').text();
        $('title').text(title.replace(title.split('|')[0], this.i18n('insights').plain() + ' '));
        $('.page-header__title').text('ArticleRating: ' + this.i18n('insights').plain());
        $content
        .html('<svg class="wds-spinner wds-spinner__block" width="66" height="66" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><g transform="translate(33, 33)"><circle class="wds-spinner__stroke" fill="none" stroke-width="3" stroke-dasharray="188.49555921538757" stroke-dashoffset="188.49555921538757" stroke-linecap="round" r="30"></circle></g></svg>')
        .after(
            $('<div>', {
                id: 'rating-footer',
                append: [
                    $('<div>', { text: this.i18n('poweredby').plain() + ' ArticleRating'}),
                    $('<a>', {
                        href: '//dev.fandom.com/wiki/ArticleRating',
                        text: this.i18n('doc').plain()
                    }),
                    ' | ',
                    $('<a>', {
                        href: '//dev.fandom.com/wiki/Talk:ArticleRating',
                        text: this.i18n('report').plain()
                    })
                ]
            })
        );

        for(var i = 0; i < this.articles.length; i++) {
            this.getTitle(this.articles[i].id, i);
        }
    },
    /**
     * @method      getTitle
     * @desc        Retrieves page title with API
     * @param       {Number} id: page id to retrieve from
     * @param       {Number} i: current index
     * @returns     {void}
     */
    ARInsights.getTitle = function(id, i) {
        this.api.get({
            action: 'query',
            pageids: id
        }).done(
            $.proxy(function(data) {
                var pages = Object.values(data.query.pages);
                if(pages[0].title)
                    this.articles[i].title = pages[0].title;
                else
                    this.articles.splice(i, 1);
                if(i === this.articles.length - 1)
                    this.create();
            }, this)
        );
    },
    /**
     * @methods     byTitle, byRate, byAvg
     * @desc        Methods to perform sorting
     * @param       {Object} a: first object to compare
     * @param       {Object} b: second object to compare
     * @returns     {Number}
     */
    ARInsights.byRate = function(a, b) { return a.rates - b.rates },
    ARInsights.byAvg  = function(a, b) { return a.avg - b.avg || a.rates - b.rates },
    ARInsights.byTitle= function(a, b) {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
    },
    /**
     * @method      getArticle
     * @desc        Returns an article from the specified type
     * @param       {string} t: article type
     * @returns     {object}
     */
    ARInsights.getArticle = function(t) {
        var clone = this.articles.slice(0);
        switch(t) {
            case 'most': // most rated
                return clone.sort(this.byRate)[clone.length - 1];
            case 'highest': // highest rated
                return clone.sort(this.byAvg)[clone.length - 1];
            case 'lowest': // lowest rated
                return clone.sort(this.byAvg)[0];
        }
    },
    /**
     * @method      paging
     * @desc        Pagination of data
     * @returns     {void}
     */
    ARInsights.paging = function() {
        var $table  = $('.rating-table').first(),
            $pager  = $('.wikia-paginator').children(),
            results = 30,
            pages   = Math.ceil(this.articles.length / results),
            i = 0;
        var page = $.proxy(function(start, max) {
            $table.find('tbody').empty();
            if (max > this.articles.length) max = this.articles.length;
            for(i = start; i < max; i++)
                $table.append(this.row(this.articles[i]));
        }, this);
        var paging = function() {
            var index = $(this).text(),
                start = (index - 1) * results,
                max = index * results;
            page(start, max);
            $(this).parents('ul').find('a').removeClass('active');
            $(this).addClass('active');
            return false;
        };

        if(pages <= 1) {
            page(0, this.articles.length);
            return;
        }
        page(0, results);
        $pager.empty();
        for(i = 1; i <= pages; i++) {
            $('<li>', {
                appendTo: $pager,
                append: $('<a>', {
                    'class': 'paginator-page' + ((i === 1) ? ' active' : ''),
                    href: '',
                    text: i,
                    click: paging
                })
            });
        }
    },
    /**
     * @method      sort
     * @desc        Sorting data on header click
     * @param       {Number} t: sorting type
     * @param       {Event} e: target event
     * @returns     {void}
     */
    ARInsights.sort = function(t, e) {
        var cur = $(e.target),
            curClass = cur.attr('class');
        cur.parent().children(':not(:last-child)').attr('class', 'sortable');
        cur.attr('class', curClass);
        if (cur.hasClass('asc'))
            cur.removeClass('asc').addClass('desc');
        else
            cur.removeClass('desc').addClass('asc');

        switch(t) {
            case 0:
                this.articles.sort(this.byTitle);
                break;
            case 1:
                this.articles.sort(this.byAvg);
                break;
            case 2:
                this.articles.sort(this.byRate);
                break;
        }
        if(cur.hasClass('desc')) this.articles.reverse();
        this.paging();
    },
    /**
     * @method      create
     * @desc        Creates elements
     * @returns     {void}
     */
    ARInsights.create = function() {
        $content.empty()
        .append(this.board('most',    this.getArticle('most')))
        .append(this.board('highest', this.getArticle('highest')))
        .append(this.board('lowest',  this.getArticle('lowest')))
        .append($('<div>', {
            'class': 'rating-col-2',
            append: [$('<table>', {
                'class': 'rating-table',
                append: $('<thead>').append(
                        $('<tr>').append([
                            $('<th>', {
                                'class': 'sortable',
                                width: '50%',
                                click: $.proxy(function(e) { this.sort(0, e) }, this),
                                text: this.i18n('article').plain()
                            }),
                            $('<th>', {
                                'class': 'sortable',
                                width: '35%',
                                click: $.proxy(function(e) { this.sort(1, e) }, this),
                                text: this.i18n('avgrating').plain()
                            }),
                            $('<th>', {
                                'class': 'sortable',
                                width: '15%',
                                click: $.proxy(function(e) { this.sort(2, e) }, this),
                                text: this.i18n('totalrating').plain()
                            }),
                            $('<th>')
                        ])
                    )
                }),
                $('<div>', {
                    'class': 'wikia-paginator',
                    append: $('<ul>')
                })]
            })
        )
        .append($('<div>', {
            'class': 'rating-details',
            append: [
                $('<div>', { 'class': 'head', text: this.i18n('details').plain() }),
                $('<div>', { id: 'rating-details', append: this.bars() })
            ]
        }));
        this.paging();
    },
    /**
     * @method      board
     * @desc        Creates a featured board
     * @param       {string} t: board type
     * @param       {object} d: data
     * @returns     {jQuery}
     */
    ARInsights.board = function(t, d) {
        return $('<div>', {
            'class': 'rating-col',
            append: [
                $('<div>', {
                    'class': 'rating-icon',
                    html: this.icon(this.icons[t])
                }),
                $('<div>', {
                    'class': 'rating-title',
                    text: this.i18n(t).plain()
                }),
                $('<a>', {
                    'class': 'rating-link',
                    href: mw.util.getUrl(d.title),
                    text: d.title
                }),
                $('<div>', {
                    'class': 'rating-foot',
                    text: t === 'most'
                        ? this.i18n('totalrating').plain() + ': ' + d.rates
                        : this.i18n('avgrating').plain() + ': ' + d.avg.toFixed(1)
                })
            ]
        });
    },
    /**
     * @method      rows
     * @desc        Creates a table row
     * @param       {Object} article: article data
     * @returns     {jQuery}
     */
    ARInsights.row = function(article) {
        return $('<tr>').append([
            $('<td>').append(
                $('<a>', {
                    href: mw.util.getUrl(article.title),
                    text: article.title
                })
            ),
            $('<td>').append(
                $('<span>', { text: article.avg.toFixed(2) }),
                $('<div>')
                .addClass('rating-bars')
                .progressbar({
                    value: article.avg,
                    max: 5
                })
            ),
            $('<td>')
                .addClass('centered-text')
                .text(article.rates),
            $('<td>')
                .addClass('centered-text')
                .append(
                    $('<a>', {
                        css: { cursor: 'pointer' },
                        html: this.icon('external-small'),
                        'data-details': JSON.stringify(article.info),
                        click: this.detail
                    })
                )
        ]);
    },
    /**
     * @method      bars
     * @desc        Creates rating bars
     * @returns     {Array}
     */
    ARInsights.bars = function(t) {
        var res = [];
        for(var i = 1; i <= 5; i++) {
            res.push(
                $('<div>', {
                    'class': 'rating-bars',
                    'append': [
                        $('<span>', { 'class': 'rating-bars-label', text: i }),
                        $('<span>', { 'class': 'rating-bars-total' })
                    ]
                })
            );
        }
        return res;
    },
    /**
     * @method      detail
     * @desc        Displays rating details
     * @returns     {void}
     */
    ARInsights.detail = function() {
        var win = $(window),
            panelTop = $('.rating-details').offset().top;
        if (win.scrollTop() > panelTop)
            win.scrollTop(panelTop - $('#globalNavigation').height());

        var prev, i = 0,
            rates  = [],
            counts = [],
            values = Object.values($(this).data('details')).sort();
        for(i in values) {
            if(values[i] === prev)
                counts[counts.length - 1]++;
            else {
                rates .push(values[i]);
                counts.push(1);
            }
            prev = values[i];
        }
        var bar = $('#rating-details').children(),
            lbl = $('.rating-bars-total');
        bar.progressbar({ value: 0, max: values.length });
        lbl.text('0');
        for(i in rates) {
            bar.eq(rates[i] - 1).progressbar('value', counts[i]);
            lbl.eq(rates[i] - 1).text(counts[i]);
        }
    };


    importArticles({
        type: 'style',
        articles: 'u:dev:MediaWiki:ArticleRating.css'
    }, {
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Colors/code.js',
            'u:dev:MediaWiki:WDSIcons/code.js'
        ]
    });
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util',
        'jquery.ui.progressbar',
    ]).then(function() {
        mw.hook('dev.i18n')  .add($.proxy(ARInsights.prepare, ARInsights));
        mw.hook('dev.wds')   .add($.proxy(ARInsights.prepare, ARInsights));
        mw.hook('dev.colors').add($.proxy(ARInsights.prepare, ARInsights));
    });
});