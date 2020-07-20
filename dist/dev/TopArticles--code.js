/** Creates a Top 10 with the most viewed articles
** © BlackZetsu, 2015
** License: https://creativecommons.org/licenses/by-sa/3.0/
**/
(function() {
    'use strict';
    var results, details, i18n;

    function searchMap(article) {
        var detail = details[article.id],
            description = detail.abstract;
        if (description.indexOf(article.title) === 0) {
            description = description.slice(article.title.length);
        } else {
            description = ' - ' + description;
        }
        return $('<li>', {
            attr: {
                'data-title': article.title,
                'data-id': article.id
            }
        }).append(
            $('<div>', {
                'class': 'TopArticlesThumbnail'
            }).append(
                $('<a>', {
                    href: article.url,
                    title: article.title
                }).append(
                    $('<img>', {
                        src: detail.thumbnail
                    })
                )
            ),
            $('<div>', {
                'class': 'TopArticlesDescription'
            }).append(
                $('<a>', {
                    href: article.url,
                    text: article.title
                }),
                $('<span>', {
                    text: description
                })
            )
        );
    }

    function plainMap(article) {
        return $('<li>').append(
            $('<a>', {
                href: article.url,
                text: article.title
            })
        );
    }

    function each(_, el) {
        var $this = $(el),
            data = $this.data(),
            limit = Number(data.limit) || 5,
            isSearch = data.type === 'search',
            namespace = (data.namespace || '0').split(',').map(Number),
            res = results.filter(function(r) {
                return namespace.indexOf(r.ns) !== -1 &&
                       (!isSearch || details[r.id].thumbnail);
            }).slice(0, limit);
        if (isSearch) {
            $this.html(
                $('<section>', {
                    'class': 'TopArticles TopArticlesSearch'
                }).append(
                    $('<h1>', {
                        text: i18n.msg('top-articles').plain()
                    }),
                    $('<ul>', {
                        append: res.map(searchMap)
                    })
                )
            );
        } else {
            $this.html(
                $('<ul>', {
                    'class': 'TopArticles TopArticlesPlain',
                    append: res.map(plainMap)
                })
            );
        }
    }

    function load() {
        var promise = $.Deferred();
        $.get('/api/v1/Articles/Top', function(res) {
            results = res.items;
            $.get('/api/v1/Articles/Details', {
                ids: results.map(function(article) {
                         return article.id;
                     }).join(',')
            }, function(deets) {
                details = deets.items;
                promise.resolve();
            });
        });
        return promise;
    }

    function init(i18nd) {
        i18n = i18nd;
        mw.hook('wikipage.content').add(function($content) {
            $content
                .find('#top-articles:not(.loaded), .TopArticles:not(.loaded)')
                .each(each);
        });
    }

    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('TopArticles'),
            load()
        ).then(init);
    });

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:TopArticles.css'
    });
})();