//Kick function
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!kick/code.js',
        // ...
    ]
} );
//Moderator в чате? Функция
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        // ...
    ]
} );
importScriptPage('ChatOptions/code.js', 'dev');
importArticles( {
    type: 'script',
    articles: [
     /*Дорогие, ... если вы зайдёте на следующую сраницу, вы увидите мат разных языков. Она используется дл помощи к скрипту запретных константов*/   "http://ru.magia.wikia.com/wiki/WordFilter/code.js" /*удалено*/
    ]
} );
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});

var arrOrigWords = ['scripts', 'lua', 'developers', 'wikia', 'lifestyle', 'entertainment', 'games', 'java', 'jedi'];
importArticles( {
    type: 'script',
    articles: [
        "http://dev.wikia.com/wiki/Jumbles/startup.js"
    ]
} );