/**
 * Оптимизированный скрипт Новостной ленты 
 */
(() => {
    const articlePath = mw.config.get('wgArticlePath') || '/wiki/$1';
    const dynamicFaviconUrl = articlePath.replace('$1', 'Special:FilePath/Site-favicon.ico');

    const CONFIG = {
        maxTiles: 9, 
        allowedNamespaces: [0], 
        fallbackImage: dynamicFaviconUrl,
        apiUrl: 'https://services.fandom.com/recommendations/recommendations'
    };

    const shuffleArray = (array) => {
        const arr = [...array]; 
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        }
        return arr;
    };

    const buildFanFeed = () => {
        const wikiId = mw.config.get('wgCityId');
        const articleId = mw.config.get('wgArticleId');

        if (!wikiId || !articleId) return;

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

        fetch(`${CONFIG.apiUrl}?wikiId=${wikiId}&articleId=${articleId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }
                return response.json();
            })
            .then((data) => {
                const rawItems = data.article_recommendation || [];
                const items = shuffleArray(rawItems).slice(0, CONFIG.maxTiles);

                if (items.length === 0) {
                    $grid.append('<p class="fan-feed__message">Рекомендации недоступны</p>');
                } else {
                    const tiles = items.map(item => {
                        let imgSrc = (item.thumbnail_url && item.thumbnail_url.trim()) 
                            ? item.thumbnail_url.trim() 
                            : '';
                        
                        if (imgSrc) {
                            imgSrc = imgSrc.replace(/\/top-crop\/width\/\d+\/height\/\d+/g, '');
                        } else {
                            imgSrc = CONFIG.fallbackImage;
                        }

                        return $('<a>', { class: 'fan-feed__card', href: item.url }).append(
                            $('<img>', { class: 'fan-feed__image', src: imgSrc, alt: item.article_title }),
                            $('<div>', { class: 'fan-feed__overlay' }).append(
                                $('<h4>', { class: 'fan-feed__card-title' }).text(item.article_title),
                                $('<p>', { class: 'fan-feed__card-subtitle' }).text(item.wiki_title)
                            )
                        );
                    });

                    $grid.append(tiles);
                }
            })
            .catch((error) => {
                console.warn('Fan Feed error:', error);

                $grid.append('<p class="fan-feed__message fan-feed__message--error">Ошибка при загрузке рекомендаций</p>');
            });
    };

    $(() => {
        const ns = mw.config.get('wgNamespaceNumber');
        if (CONFIG.allowedNamespaces.indexOf(ns) !== -1) {
            buildFanFeed();
        }
    });
})();