/** Creates a Top 10 with the most viewed articles
** © BlackZetsu, 2015
** License: https://creativecommons.org/licenses/by-sa/3.0/
* this is a simplified version made to suit the wiki's usage
**/
(function() {
    'use strict';
    console.log('Script Loaded');
    var results, i18n;

    function searchMap(article) {
        return $('<div>', {
            attr: {
                'data-title': article.title,
                'data-id': article.id
            },
            'class': 'toparticle'
        }).append(
            $('<div>', {
                'class': 'toparticle__thumbnail'
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
                'class': 'toparticle__text'
            }).append(
                $('<a>', {
                    href: article.url,
                    text: article.title
                })
            )
        );
    }

    function each(_, el) {
        console.log('Each function called');
        var $this = $(el),
            data = $this.data(),
            limit = Number(data.limit) || 5,
            namespace = (data.namespace || '0').split(',').map(Number),
            category = String(data.category || '');

        $.get(mw.config.get('wgScriptPath') + '/api/v1/Articles/Top', {
            expand: 1,
            category: category
        }).done(function(data) {
            results = data.items;
        
            var res = results.filter(function(r) {
                return (
                    namespace.indexOf(r.ns) !== -1 &&
                    r.thumbnail
                );
            }).slice(0, limit);

            $this.html(
                $('<div>', {
                    'class': 'toparticles'
                }).append(
                    res.map(searchMap)
                )
            );
        });
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
            i18no.loadMessages('TopArticles')
        ).then(init);
    });

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();