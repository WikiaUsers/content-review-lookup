// Создайте пространство "dev", если его ещё нет:
window.dev = window.dev || {};

// Создайте подпространство для этого дополнения и установите настройки:
window.dev.editSummaries = {
	css: '#stdSummaries { ... }',
	select: 'MediaWiki:Custom-StandardEditSummaries'
};

// Настройки должны вписываться перед импортом, иначе они не заработают!
importArticles({ type: 'script', articles: [ 
	'u:dev:MediaWiki:Standard Edit Summary/code.js'
]});

// блокировка комментариев через время
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

// тест
const user1EditsElement = document.querySelector('li.has-ripple a strong');
const user1Edits = user1EditsElement ? parseInt(user1EditsElement.textContent) : 0;
if (user1Edits === 376) {
  console.log('Количество правок user1 равно 376');
} else {
  console.log('Количество правок user1 не равно 376');
}

// список админов
(function() {
    // Название страницы, на которой нужно вывести список администраторов
    const targetPage = 'Эпизоды';
    const sysopGroup = 'sysop';

    // Проверяем, находимся ли мы на нужной странице
    if (mw.config.get('wgPageName') !== targetPage.replace(/ /g, '_')) {
        return;
    }

    // Выполняем запрос к API для получения списка администраторов
    $.get(mw.util.wikiScript('api'), {
        action: 'query',
        list: 'allusers',
        augroup: sysopGroup,
        aulimit: 'max',
        format: 'json'
    }, function(response) {
        if (response && response.query && response.query.allusers) {
            const admins = response.query.allusers.map(user => `[[User:${user.name}|${user.name}]]`);
            const adminListHtml = `<ul>${admins.map(admin => `<li>${admin}</li>`).join('')}</ul>`;

            // Добавляем список администраторов на страницу
            $('#mw-content-text').prepend(`<h2>Список администраторов</h2>${adminListHtml}`);
        }
    });
})();