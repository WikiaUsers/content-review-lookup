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