/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*** Хотфикс для сворачиваемых таблиц ***/
$('.collapsible').addClass('mw-collapsible');
$('.collapsed').addClass('mw-collapsed');

mw.hook('wikipage.content').add(function() {
    // Находим второй блок без класса и добавляем его
    const $targetModule = $('.AchievementsModule:not(.rail-module)');

    if ($targetModule.length > 0) {
        $targetModule.addClass('rail-module');

        // Меняем текст заголовка
        const $titleElement = $targetModule.find('.title-challenges');
        if ($titleElement.length > 0) {
            $titleElement.text('Больше значков впереди!');
        }
    }
});

/*** popups корректировка для вертикальных картинок чтобы не было секир башка ***/
(function() {
    'use strict';

    const applyStyle = (img) => {
        // Проверка на случай, если картинка еще не загрузилась
        if (img.naturalWidth === 0) {
            img.onload = () => applyStyle(img);
            return;
        }
        
        // Логика: если шире, чем выше — cover, иначе contain
        img.style.objectFit = (img.naturalWidth > img.naturalHeight) ? 'cover' : 'contain';
    };

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;

                // Ищем .mwe-popups-thumbnail внутри добавленного узла
                const img = node.matches('.mwe-popups-thumbnail') 
                    ? node 
                    : node.querySelector('.mwe-popups-thumbnail');
                
                if (img) {
                    applyStyle(img);
                }
            }
        }
    });

    // Начинаем следить за всем документом
    observer.observe(document.body, { childList: true, subtree: true });

    // Инициализация для уже существующих на странице картинок
    document.querySelectorAll('.mwe-popups-thumbnail').forEach(applyStyle);
})();