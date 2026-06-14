/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*** Хотфикс для сворачиваемых таблиц ***/
$('.collapsible').addClass('mw-collapsible');
$('.collapsed').addClass('mw-collapsed');
 
 mw.hook('wikipage.content').add(function() {
    // Находим второй блок без класса и добавляем его
    const $targetModule = $('.AchievementsModule:not(.rail-module)');
    
    if ($targetModule.length) {
        $targetModule.addClass('rail-module');
        
        // Меняем текст заголовка
        $targetModule.find('.title-challeneges').text('Больше значков впереди!');
    }
});