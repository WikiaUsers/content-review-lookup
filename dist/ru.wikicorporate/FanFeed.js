/**
 * Оптимизированный скрипт Новостной ленты 
 * (9 рекомендаций + оригинальные картинки без обрезки + динамический фавикон)
 */
(() => {
    // Получаем базовый путь текущей вики (например, /ru/wiki/$1)
    const articlePath = mw.config.get('wgArticlePath') || '/wiki/$1';
    const dynamicFaviconUrl = articlePath.replace('$1', 'Special:FilePath/Site-favicon.ico');

    // БЛОК НАСТРОЕК
    const CONFIG = {
        maxTiles: 9, 
        allowedNamespaces: [0], 
        fallbackImage: dynamicFaviconUrl,
        apiUrl: 'https://services.fandom.com/recommendations/recommendations'
    };

    // Вспомогательная функция для перемешивания (Fisher-Yates)
    const shuffleArray = (array) => {
        const arr = [...array]; 
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        }
        return arr;
    };

    // Основная функция построения блока
    const buildFanFeed = async () => {
        const wikiId = mw.config.get('wgCityId');
        const articleId = mw.config.get('wgArticleId');

        if (!wikiId || !articleId) return;

        // Создаем "скелет" блока
        const $wrapper = $('<div>', { class: 'fan-feed-wrapper' }).append(
            $('<div>', { class: 'fan-feed' }).append(
                $('<h2>').text('Новостная лента'),
                $('<div>', { class: 'fan-feed-grid' })
            )
        );
        const $grid = $wrapper.find('.fan-feed-grid');

        try {
            const response = await fetch(`${CONFIG.apiUrl}?wikiId=${wikiId}&articleId=${articleId}`);
            
            if (!response.ok) throw new Error('Ошибка сети');
            
            const data = await response.json();
            
            const rawItems = data.article_recommendation || [];
            const items = shuffleArray(rawItems).slice(0, CONFIG.maxTiles);

            if (items.length === 0) {
                $grid.append('<p>Рекомендации недоступны</p>');
            } else {
                // Собираем плитки
                const tiles = items.map(item => {
                    let imgSrc = item.thumbnail_url?.trim();
                    
                    if (imgSrc) {
                        // Удаляем параметры обрезки (любые цифры ширины и высоты)
                        imgSrc = imgSrc.replace(/\/top-crop\/width\/\d+\/height\/\d+/g, '');
                    } else {
                        // Если картинки нет, ставим фавикон проекта
                        imgSrc = CONFIG.fallbackImage;
                    }

                    return $('<a>', { class: 'fan-feed-tile', href: item.url }).append(
                        $('<img>', { src: imgSrc, alt: item.article_title }),
                        $('<div>', { class: 'overlay' }).append(
                            $('<h4>').text(item.article_title),
                            $('<p>').text(item.wiki_title)
                        )
                    );
                });

                // Вставляем все плитки разом (оптимизация)
                $grid.append(tiles);
            }

        } catch (error) {
            console.warn('Fan Feed error:', error);
            $grid.append('<p>Ошибка при загрузке рекомендаций</p>');
        }

        // Выводим готовый блок на страницу
        const $target = $('.page.has-right-rail');
        if ($target.length) {
            $target.after($wrapper);
        } else {
            $('body').append($wrapper);
        }
    };

    // Запуск после готовности страницы
    $(() => {
        const ns = mw.config.get('wgNamespaceNumber');
        if (CONFIG.allowedNamespaces.includes(ns)) {
            buildFanFeed();
        }
    });
})();