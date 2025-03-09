/** Creates a list of recent articles
** Based on work by BlackZetsu, 2015
** License: https://creativecommons.org/licenses/by-sa/3.0/
**/
(function() {
    'use strict';
    console.log('TopArticles loaded');

    var EMPTY_MESSAGE = '<div id="top-articles-empty" class="vcw-card" style="text-align: center">' +
        'Новых статей нет. Вы можете улучшить VOCALOID вики, создав <a href="/ru/wiki/Служебная:CreatePage">новую статью</a>!</div>';
    var ERROR_MESSAGE = '<div id="top-articles-empty" class="vcw-card" style="text-align: center">' +
        'Не удалось загрузить новые статьи. Попробуйте позже.</div>';

    function init() {
        mw.loader.using('moment').then(function() {
            initWithMoment(true);
        }).catch(function() {
            initWithMoment(false);
        });
    }

    function initWithMoment(hasMoment) {
        mw.hook('wikipage.content').add(function($content) {
            $content
                .find('#top-articles.articles-wrapper:not(.loaded)')
                .each(function(_, el) {
                    loadRecentArticles($(el), hasMoment);
                });
        });
    }

    function formatTimestamp(timestamp, hasMoment) {
        if (!timestamp) return '';
        
        if (hasMoment) {
            try {
                return moment(timestamp).fromNow();
            } catch (e) {
                console.error('Error formatting with moment:', e);
                var date = new Date(timestamp);
                return date.toLocaleDateString();
            }
        } else {
            var date = new Date(timestamp);
            return date.toLocaleDateString();
        }
    }

    function createArticleElement(article, hasMoment) {
        var thumbnailUrl = article.thumbnail ? article.thumbnail : '';
        var formattedTime = formatTimestamp(article.timestamp, hasMoment);
        
        var $article = $('<a>', {
            attr: {
                'data-title': article.title,
                'data-id': article.pageid,
                href: article.fullurl
            },
            'class': 'article-card'
        });
        
        var $thumbnailDiv = $('<div>', {
            'class': 'article-card__thumbnail'
        });
        
        if (thumbnailUrl) {
            $thumbnailDiv.append(
                $('<img>', {
                    src: thumbnailUrl,
                    alt: article.title,
                    'class': 'article-card__image'
                })
            );
        }

        var $textDiv = $('<div>', {
            'class': 'article-card__text'
        }).append(
            $('<div>', {
                text: article.title,
                'class': 'article-card__title'
            }),
            formattedTime ? $('<div>', {
                text: formattedTime,
                'class': 'article-card__subtitle'
            }) : null
        );

        $article.append($thumbnailDiv, $textDiv);
        
        return $article;
    }

    function loadRecentArticles($container, hasMoment) {
        var data = $container.data(),
            limit = Number(data.limit) || 5,
            namespace = (data.namespace || '0').split(',').map(Number);
        
        var api = new mw.Api();
        
        api.get({
            action: 'query',
            list: 'recentchanges',
            rcnamespace: namespace.join('|'),
            rclimit: limit,
            rctype: 'new',
            rcshow: '!redirect',
            rcprop: 'title|ids|timestamp',
            format: 'json',
            generator: 'recentchanges',
            grcnamespace: namespace.join('|'),
            grclimit: limit,
            grctype: 'new',
            grcshow: '!redirect',
            prop: 'info|pageimages',
            inprop: 'url',
            pithumbsize: 300
        }).done(function(data) {
            if (!data.query || !data.query.pages || !data.query.recentchanges) {
                showMessage($container, EMPTY_MESSAGE);
                return;
            }

            var pages = Object.values(data.query.pages);
            var recentChanges = data.query.recentchanges;
            
            pages.forEach(function(page) {
                var rcEntry = recentChanges.find(function(rc) {
                    return rc.pageid === page.pageid;
                });
                
                if (rcEntry) {
                    page.timestamp = rcEntry.timestamp;
                }
            });
            
            pages.sort(function(a, b) {
                return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
            });
            
            pages = pages.slice(0, limit);

            pages.forEach(function(page) {
                if (page.thumbnail) {
                    page.thumbnail = page.thumbnail.source;
                } else {
                    page.thumbnail = null;
                }
            });

            if (pages.length === 0) {
                showMessage($container, EMPTY_MESSAGE);
            } else {
                renderResults($container, pages, hasMoment);
            }
        }).fail(function() {
            showMessage($container, ERROR_MESSAGE);
        });
    }

    function showMessage($container, message) {
        $container.html(message);
    }

    function renderResults($container, pages, hasMoment) {
        var $wrapper = $('<div>', {
            'class': 'article-cards-wrapper'
        });
        
        $wrapper.append(
            pages.map(function(page) {
                return createArticleElement(page, hasMoment);
            })
        );
        
        $container.empty().append($wrapper);
    }

    init();
})();