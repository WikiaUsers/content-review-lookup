/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AjaxRC/i18n.code.js', // Кнопка очистки кэша страницы
        'u:dev:DiscordIntegrator/code.js',        // Дискорд
        'w:c:dev:ReferencePopups/code.js', //Для всплывающих ссылок
        'w:c:ru.sword-art-online:MediaWiki:RepeatableTimer.js',
        'MediaWiki:Buttons.js'
    ]
});

/**
* SocialIcons	
* See http://dev.wikia.com/wiki/SocialIcons	
*/
importScriptPage('SocialIcons/code.js','dev');
 
// ============================================================