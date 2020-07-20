/***************************/
/** Script Configuration ***/
/***************************/

/* ChatStatus */
window.ChatStatus = {
    statuses: {
        shortafk: 'Отошёл ненадолго;',
        longafk: 'Отошёл от клавиатуры;',
        waiting: 'В ожидании;',
        editing: 'Редактирует;',
        distracted: 'Отвлечён;',
        frustrated: 'Расстроен;',
        mobile: 'На телефоне;',
        tablet: 'На планшете;',
        pc: 'На ПК;',
        sleep: 'Спит;',
        busy: 'Занят;',
        game: 'Играет;',
        happy: 'Счастлив;'
    },
};

/*ChatTags*/

var chatags = { images: false, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

/***************************/
/***** Script Imports ******/
/***************************/

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code/ru.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatStatus/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:ChatSendButton.js'
    ]
});