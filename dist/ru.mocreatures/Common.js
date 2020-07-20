/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Template:USERNAME */
var username = wgUserName;
if (username) {$('.InsertUsername').text(username);}
 
/***************************/
/** Script Configuration ***/
/***************************/
 
/* StandardEditSummary */
window.dev = window.dev || {};
window.dev.editSummaries = {
    css: '#stdSummaries',
    select: [
        '(нажмите для просмотра)',
        '1. Общие изменения', [
            'Обновление информации',
            'Исправление грамматики/пунктуации',
            'Переработка содержимого',
            'Добавление медиа-файлов'
        ],
        '2. Удаление/отмена', [
            'Удаление содержимого',
            'Отмена вандализма',
            'Откат к предыдущей версии'
        ],
        '3. Техническое обслуживание', [
            'Обновление категорий',
            'Добавление/удаление шаблонов',
            'Добавление/удаление ссылок',
            'Добавление/удаление файлов'
        ]
    ]
};
 
/* UserTags */
window.UserTagsJS = {
    modules: {},
    tags: {
       'content-moderator': { u: 'Модератор контента' },
       threadmoderator: {u: 'Модератор обсуждений' }
    }
};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.metafilter = {'sysop': ['bureaucrat']};
UserTagsJS.modules.newuser = {
    days: 7,
    edits: 10
};
 
/* AjaxRC */
window.ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"]; 
window.AjaxRCRefreshText = 'Автообновление';
 
/***************************/
/***** Script Imports ******/
/***************************/
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:CacheCheck/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:HighlightUsers/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:ThreadIndicator/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:UserRightsRecord/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js'
    ]
});