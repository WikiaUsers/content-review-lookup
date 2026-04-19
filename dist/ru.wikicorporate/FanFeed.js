/**
 * Оптимизированный скрипт Новостной ленты 
 */
(() => {
    const articlePath = mw.config.get('wgArticlePath') || '/wiki/$1';
    const dynamicFaviconUrl = articlePath.replace('$1', 'Special:FilePath/Site-favicon.ico');

    const CONFIG = {
        maxTiles: 9, 
        allowedNamespaces: [0], 
        fallbackImage: dynamicFaviconUrl
    };

    // Безопасная проверка ссылок (защита от XSS)
    const sanitizeUrl = (url) => {
        if (typeof url !== 'string') return '#';
        const cleanUrl = url.trim();
        if (cleanUrl.startsWith('/') || cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
            return cleanUrl;
        }
        return '#';
    };

    // Функция запроса к официальному MediaWiki API
    const fetchArticlesAPI = () => {
        return $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                action: 'query',
                format: 'json',
                generator: 'random',
                grnnamespace: 0,
                grnlimit: CONFIG.maxTiles,
                prop: 'pageimages|info',
                inprop: 'url',
                pithumbsize: 400 // Запрашиваем превью для гарантии ответа, но потом очистим URL
            },
            dataType: 'json'
        }).then(data => {
            if (!data || !data.query || !data.query.pages) return [];
            return Object.values(data.query.pages).map(page => ({
                url: page.fullurl,
                article_title: page.title,
                thumbnail_url: page.thumbnail ? page.thumbnail.source : '',
                wiki_title: mw.config.get('wgSiteName')
            }));
        });
    };

    const buildFanFeed = () => {
        const $wrapper = $('<div>', { class: 'fan-feed', id: 'custom-fan-feed' }).append(
            $('<div>', { class: 'fan-feed__container' }).append(
                $('<h2>', { class: 'fan-feed__title' }).append(
                    $('<i>', { class: 'fa-solid fa-newspaper' }),
                    ' Новостная лента'
                ),
                $('<div>', { class: 'fan-feed__grid' })
            )
        );
        const $grid = $wrapper.find('.fan-feed__grid');

        const $target = $('.page.has-right-rail');
        if ($target.length) {
            $target.after($wrapper);
        } else {
            $('body').append($wrapper);
        }

        fetchArticlesAPI()
            .then((items) => {
                if (items.length === 0) {
                    $grid.append($('<p>', { class: 'fan-feed__message', text: 'Рекомендации недоступны' }));
                } else {
                    const tiles = items.map(item => {
                        let imgSrc = item.thumbnail_url ? item.thumbnail_url.trim() : '';

                        if (imgSrc) {
                            imgSrc = imgSrc.replace(/\/(scale-to-width-down|top-crop|smart)\/[a-zA-Z0-9\/]+/g, '');
                        } else {
                            imgSrc = CONFIG.fallbackImage;
                        }

                        const safeHref = sanitizeUrl(item.url);
                        const safeImgSrc = sanitizeUrl(imgSrc);

                        return $('<a>', { class: 'fan-feed__card', href: safeHref }).append(
                            $('<img>', { class: 'fan-feed__image', src: safeImgSrc, alt: item.article_title || 'Изображение статьи' }),
                            $('<div>', { class: 'fan-feed__overlay' }).append(
                                $('<h4>', { class: 'fan-feed__card-title', text: item.article_title }),
                                $('<p>', { class: 'fan-feed__card-subtitle', text: item.wiki_title })
                            )
                        );
                    });

                    $grid.append(tiles);
                }
            })
            .catch((error) => {
                console.warn('Fan Feed error:', error);
                $grid.append($('<p>', { 
                    class: 'fan-feed__message fan-feed__message--error', 
                    text: 'Ошибка при загрузке рекомендаций' 
                }));
            });
    };

    $(() => {
        const ns = mw.config.get('wgNamespaceNumber');
        if (CONFIG.allowedNamespaces.indexOf(ns) !== -1) {
            buildFanFeed();
        }
    });
})();