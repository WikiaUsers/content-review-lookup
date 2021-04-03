/** Creates a Top 10 with the most viewed articles
** © BlackZetsu, 2015
** License: https://creativecommons.org/licenses/by-sa/3.0/
**/
(function() {
    'use strict';
    var results, i18n, isUCP = mw.config.get('wgVersion') !== '1.19.24';

    function searchMap(article) {
        var description = article.abstract;
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
                        src: article.thumbnail
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
                       (!isSearch || r.thumbnail);
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

    function init(i18nd, data) {
        i18n = i18nd;
        results = data[0].items;
        mw.hook('wikipage.content').add(function($content) {
            $content
                .find('#top-articles:not(.loaded), .TopArticles:not(.loaded)')
                .each(each);
        });
    }

    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('TopArticles'),
            $.get(mw.config.get('wgScriptPath') + '/api/v1/Articles/Top', {
                expand: 1
            })
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