importArticles({ type: 'script', articles: ['u:dev:MediaWiki:WdsTooltips.js'] });

/* --- Экранный питомец --- */
$(document).ready(function() {
    // Проверка, чтобы питомец не добавлялся дважды
    if ($('#wiki-pet').length) return; 

    // СЮДА ВСТАВЬТЕ ССЫЛКУ НА ВАШУ КАРТИНКУ
    var petImageUrl = 'https://static.wikia.nocookie.net/roblox-seeker-vs-hider/images/2/24/Gato-giovannamagnusjunior.gif/revision/latest?cb=20260406174957';

    // Создаем элемент
    var $pet = $('<div>', {
        id: 'wiki-pet'
    }).css({
        'background-image': 'url(' + petImageUrl + ')'
    });

    // Реакция на клик по питомцу (по желанию)
    $pet.on('click', function() {
        alert('>.<'); 
        // Вместо alert можно вставить ссылку: window.location.href = '/wiki/Секретная_страница';
    });

    // Добавляем питомца на страницу
    $('body').append($pet);
});