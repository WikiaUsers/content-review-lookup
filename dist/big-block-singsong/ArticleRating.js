/**
 * @name            ArticleRating
 * @version         2.0
 * @description     Creates an article rating system
 * @author          KhangND
 */
mw.loader.using([
    'mediawiki',
    'mediawiki.api',
    'mediawiki.util',
    'mediawiki.user',
    'jquery',
    'jquery.ui.progressbar'
]).then(function() {
    var config = mw.config.get([
        'wgCanonicalNamespace',
        'wgTitle',
        'wgNamespaceNumber',
        'wgArticleId',
        'wgUserId'
    ]);
 
    /* @load Insights */
    if(config.wgCanonicalNamespace === 'Special'
    && config.wgTitle === 'ArticleRating') {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:ArticleRating/Insights.js'
        });
        return;
    }
 
    /* @protections */
    if(config.wgNamespaceNumber !== 0 // not article
    || config.wgArticleId === 0       // not exist
    || window.ArticleRatingLoaded) {
        return;
    } window.ArticleRatingLoaded = true;
 
    var api = new mw.Api(),
        storage = 'Module:Rating-storage',
        userId = config.wgUserId || mw.user.id(),
        current = 0,
        imports = 3,
        icon,
        i18n = {},
        options = {},
        ratingInfo = {};
        ratingInfo[config.wgArticleId] = {},
        ratingInfo[config.wgArticleId][userId] = 0,
        selectors = {
            // ids
            module:     'rating-module',
            title:      'rating-title',
            starsWrap:  'rating-stars-wrapper',
            starsBg:    'rating-stars-bg',
            stars:      'rating-stars',
            info:       'rating-info',
            my:         'rating-my',
            text:       'rating-text',
            total:      'rating-total',
            avg:        'rating-avg',
            footer:     'rating-footer',
            // classes
            bars:       'rating-bars',
            labels:     'rating-bars-label'
        };
 
    /**
     * @method      prepare
     * @description Prepares imported scripts
     * @returns     {void}
     */
    function prepare() {
        if(--imports > 0)
            return;
        icon = window.dev.wds.icon;
        window.dev.i18n.loadMessages('ArticleRating').done(function(i18nLoaded) {
            i18n = i18nLoaded._messages.en;
            for(var i in i18n) i18n[i] = i18nLoaded.msg(i).escape();
        });
        var colors = window.dev.colors,
            pageColor = colors.parse(colors.wikia.page),
            isBright = pageColor.isBright(),
            style =
                '.rating-bars { background-color: $bar }' +
                '.rating-bars > div { background-color: $inner }';
        mw.util.addCSS(colors.css(style, {
            bar: isBright ? pageColor.lighten(-5) : pageColor.lighten(10),
            inner: isBright ? pageColor.lighten(-20) : pageColor.lighten(5)
        }));
        preload();
    }
 
    /**
     * @method      preload
     * @description Preloads options and retrieves article rating data
     * @returns     {void}
     */
    function preload() {
        options = $.extend({
            title: i18n.title,
            values: [i18n.worst, i18n.bad, i18n.average, i18n.good, i18n.great],
            starSize: [24, 24],
            starColor: ['#ccc', '#ffba01'],
            starStroke: '#000'
        }, window.ArticleRating);
 
        // Retrieve article rating data from storage
        api.get({
            action: 'parse',
            text: '{{' + storage + '}}',
            prop: 'text',
            disablepp: true
        }).done(function(data) {
            data = $(data.parse.text['*']);
            if(!data.find('a').length) {
                data = data.text();
                try {
                    data = JSON.parse(data.substr(2, data.length));
                } catch(e) {
                    console.log(
                        'Malformed rating storage. Please check: '
                        + location.origin
                        + mw.util.getUrl(storage)
                    );
                    return;
                }
                ratingInfo = $.extend(ratingInfo, data);
            }
            init();
        });
    }
 
    /**
     * @method      init
     * @description Initiates UI and displays rating data
     * @returns     {void}
     */
    function init() {
        var bg = 'url("data:image/svg+xml,$1") repeat-x',
            star = '<svg xmlns="http://www.w3.org/2000/svg" width="$w" height="$h" viewBox="0 0 24 24"><path stroke="$s" fill="$c" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/></svg>'
                .replace('$w', options.starSize[0])
                .replace('$h', options.starSize[1])
                .replace('$s', options.starStroke),
            defaultStar = encodeURIComponent(star.replace('$c', options.starColor[0])),
            activeStar = encodeURIComponent(star.replace('$c', options.starColor[1]));
 
        $('<section>', {
            'class': 'rail-module',
            id: selectors.module,
            prependTo: '#WikiaRail',
            append: [
                $('<h2>', {
                    'class': 'has-icon',
                    id: selectors.title,
                    text: options.title,
                    click: show,
                    css: { cursor: 'pointer' },
                    prepend: icon('upvote-small'),
                    append: $('<a>', { html: icon('menu-control-tiny') })
                }),
                $('<div>', { id: selectors.starsWrap,
                    css: {
                        width: options.starSize[0] * 5,
                        height: options.starSize[1],
                        background: bg.replace('$1', defaultStar)
                    },
                    append: [
                        $('<div>', {
                            id: selectors.starsBg,
                            css: {
                                width: 0,
                                height: '100%',
                                transition: 'all 0.3s ease-out',
                                background: bg.replace('$1', activeStar)
                            }
                        }),
                        $('<ul>', { id: selectors.stars })
                    ]
                }),
                $('<div>', {
                    id: selectors.my,
                    css: { textAlign: 'center' },
                    text: i18n.myrating + ': ',
                    append: $('<b>', { text: '-' })
                }),
                $('<div>',{ id: selectors.info,
                    css: { display: 'none' },
                    append: [
                        $('<div>'),
                        $('<div>', {
                            append: [
                                $('<div>', {
                                    text: i18n.avgrating
                                }),
                                $('<div>', {
                                    id: selectors.avg,
                                    append: $('<b>')
                                }),
                                $('<div>', {
                                    text: i18n.totalrating + ': ',
                                    id: selectors.total,
                                    append: $('<b>')
                                })
                            ]
                        }),
                        $('<div>', {
                            css: {
                                width: '100%',
                                marginTop: 8
                            },
                            append: $('<a>', {
                                'class': 'wds-button wds-is-secondary',
                                css: { margin: 'auto' },
                                href: mw.util.getUrl('Special:ArticleRating'),
                                text: i18n.insights
                            })
                        })
                    ]
                }),
                $('<div>', { id: selectors.footer,
                    append: [
                        $('<div>', { text: i18n.poweredby + ' ArticleRating'}),
                        $('<a>', {
                            href: '//dev.fandom.com/wiki/ArticleRating',
                            text: i18n.doc
                        }),
                        ' | ',
                        $('<a>', {
                            href: '//dev.fandom.com/wiki/Talk:ArticleRating',
                            text: i18n.report
                        })
                    ]
                })
            ]
        });
 
        for(var i = 1; i <= 5; i++) {
            $('<li>', {
                css: {
                    width: options.starSize[0],
                    height: options.starSize[1]
                },
                'data-rating': i,
                appendTo: '#' + selectors.stars,
                hover: hover,
                click: rate
            });
            $('<div>', {
                'class': selectors.bars,
                appendTo: $('#' + selectors.info).children('div').first(),
                append: $('<span>', {
                    class: selectors.labels,
                    text: i
                })
            });
        }
 
        display();
    }
 
    /**
     * @method      process
     * @description Processes rating info and returns results
     * @param       {Object} ratingInfo
     * @returns     {Object}
     */
    function process(ratingInfo) {
        var prev;
        var sum = function(sum, num) { return sum + num; };
        var values = Object.values(ratingInfo[config.wgArticleId]).sort();
        var data = {
            value: parseInt(ratingInfo[config.wgArticleId][userId]) || '-',
            total: Object.keys(ratingInfo[config.wgArticleId]).length,
            avg: 0,
            rates: [],
            counts: []
        };
 
        for(var i in values) {
            if(values[i] === prev)
                data.counts[data.counts.length - 1]++;
            else {
                data.rates.push(values[i]);
                data.counts.push(1);
            }
            prev = values[i];
        }
 
        // reduces array to a number
        data.avg = (values.reduce(sum) / data.total).toFixed(1);
        current = data.avg;
 
        return data;
    }
 
    /**
     * @method      display
     * @description Displays processed rating info on UI
     * @returns     {void}
     */
    function display() {
        var data = process(ratingInfo);
        if (data.value === 0)
            return;
        if (data.avg === '0.0' && data.total === 1)
            data.avg = data.total = 0;
 
        $('#' + selectors.starsBg).width(data.avg * 100 / 5 + '%');
        $('#' + selectors.my).children('b').text(options.values[data.value - 1]);
        $('#' + selectors.total).children('b').text(data.total);
        $('#' + selectors.avg).children('b').text(data.avg);
        $('.' + selectors.bars).progressbar({ value: 0, max: data.total });
        $(data.rates).each(function(i) {
            $('.' + selectors.bars).eq(data.rates[i] - 1).progressbar('value', data.counts[i]);
        });
    }
 
    /**
     * @handlers
     *  show
     *  rate
     *  hover
     */
    function show() {
        $(this).children('a').toggleClass('show');
        $('#' + selectors.info).slideToggle(200);
    }
 
    function rate() {
        ratingInfo[config.wgArticleId][userId] = $(this).data('rating');
 
        // saves to storage
        api.post({
            action: 'edit',
            title: storage,
            minor: true,
            token: mw.user.tokens.get('editToken'),
            text: '--' + JSON.stringify(ratingInfo)
        }).done(function() {
            $('#' + selectors.stars).children('li').removeAttr('style'); // disables rating
            display();
        });
    }
 
    function hover(e) {
        if(e.type === 'mouseleave')
            $('#' + selectors.starsBg).width(current * 100 / 5 + '%');
        else
            $('#' + selectors.starsBg).width($(this).data('rating') * 20 + '%');
    }
 
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
    mw.hook('dev.i18n').add(prepare);
    mw.hook('dev.colors').add(prepare);
    mw.hook('dev.wds').add(prepare);
});