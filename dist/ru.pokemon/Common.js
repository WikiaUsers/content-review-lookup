/* == Рельса == */
/* === Кастомные блоки, настройка AddRailModule === */
window.AddRailModule = ['Template:Наш_Discord-сервер', 'Template:Случайная_статья_о_покемоне', 'Template:Новые статьи'];

/* == Кабинет администратора == */
/* === Кнопка ImportJS. Сделано HIHRAIM'ом из AdminDashboard JS-Button === */
(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
        window.AdminDashboardJSButtonLoaded
    ) {
        return;
    }
    window.AdminDashboardImportJSButtonLoaded = true;
    var AdminDashboardJSButton = {
        init: function(i18n) {
            console.log(i18n);
            this.$control = $('<li>', {
                'class': 'control',
                'data-tooltip': ('Управляйте импортом скриптов из Dev Wiki.')
            }).append(
                $('<a>', {
                    'class': 'set',
                    href: mw.util.getUrl('MediaWiki:ImportJS', { action: 'edit' })
                }).append(
                    $('<span>', {
                        'class': 'representation'
                    }).append(
                        $('<span>', {
                            text: 'IJS'
                        })
                    ),
                    i18n.msg('text').plain()
                )
            ).hover($.proxy(this.hover, this), $.proxy(this.unhover, this));
            $('.control a[data-tracking="special-css"]').parent().after(this.$control);
            this.$tooltip = $('.control-section.wiki > header > .dashboard-tooltip');
        },
        hover: function(e) {
            this.$tooltip.text(this.$control.data('tooltip'));
        },
        unhover: function(e) {
            this.$tooltip.text('');
        },
        hook: function(i18n) {
            i18n.loadMessages('AdminDashboard_JS-Button')
                .then($.proxy(this.init, this));
        }
    };
    mw.hook('dev.i18n').add($.proxy(AdminDashboardJSButton.hook, AdminDashboardJSButton));
    importArticle(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:AdminDashboardJSButton.css'
        }
    );
})();

/* == Дополнительное == */
/* === Популярные страницы. Сделано HIHRAIM'ом из TopArticles === */
(function() {
    'use strict';
    var results, i18n;

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
                    $('<h2>', {
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

/* === Предварительный просмотр страницы при наведении на ссылку (изменение для скрипта LinkPreview) === */
/* ==== Изменяет изображение, отображаемое, когда на странице нет изображений (взято с англовики) ==== */
window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);
window.pPreview.defimage = 'https://static.wikia.nocookie.net/pokemon/images/e/e3/No_Image.png';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/pokemon/images/e/e3/No_Image.png';

/* === Фавикон для разных тем === */
const link = document.createElement('link');

link.rel = 'shortcut icon';
if ($('body').hasClass('theme-fandomdesktop-dark')) {
    link.href = 'https://pokemon.fandom.com/ru/wiki/Special:FilePath/Site-favicon-dark.ico';
} else if ($('body').hasClass('theme-fandomdesktop-light')) {
    link.href = 'https://pokemon.fandom.com/ru/wiki/Special:FilePath/Site-favicon-light.ico';
}

const head = document.getElementsByTagName('head')[0];
const existingLink = head.querySelector('link[rel="shortcut icon"]');

if (existingLink) {
  head.removeChild(existingLink);
}

head.appendChild(link);