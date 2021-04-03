/*См. также MediaWiki:Modes.js, MediaWiki:BG.js, MediaWiki:Chatfilter.js, MediaWiki:ImportJS, MediaWiki:Fantom.js*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserAccountAge/code2.js',
    ]
});

/** Настройки скриптов **/
/**** AJAX RC ****/
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "Доступ к комментариям закрыт, так как блог не комментировали <expiryDays> дней"
};

/*Викификатор*/
function addWikifButton() { 
    var toolbar = (document.getElementById('cke_toolbar_source_1') || document.getElementById('toolbar') ); // Monobook+Modern 

    if (!toolbar) return;

    var i = document.createElement('img');
    i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
    i.alt = i.title = 'викификатор';
    i.onclick = Wikify;
    i.style.cursor = 'pointer';
    toolbar.appendChild(i);
} 

if (wgAction == 'edit' || wgAction == 'submit') {
    importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
    addOnloadHook(addWikifButton);
}

/*Для импортов*/
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* DiscussionTemplates */
window.DiscussionTemplates = {
    templates: {
        /* Предупреждения */
        'Оскорбление': {
            name: 'Шаблон:Предупреждение/оскорбление',
            title: 'Оскорбление'
        },
        'Троллинг': {
            name: 'Шаблон:Предупреждение/троллинг',
            title: 'Троллинг'
        },
        'Спор': {
            name: 'Шаблон:Предупреждение/спор',
            title: 'Спор'
        },
        'Агрессия': {
            name: 'Шаблон:Предупреждение/агрессия',
            title: 'Агрессия'
        },
        'Субкритика': {
            name: 'Шаблон:Предупреждение/субкритика',
            title: 'Субкритика'
        },
        'Маты': {
            name: 'Шаблон:Предупреждение/маты',
            title: 'Маты'
        },
        'Оффтоп': {
            name: 'Шаблон:Предупреждение/оффтоп',
            title: 'оффтоп'
        },
        'Флуд': {
            name: 'Шаблон:Предупреждение/флуд',
            title: 'Флуд'
        },
        'Капс': {
            name: 'Шаблон:Предупреждение/капс',
            title: 'Капс'
        },
        'Спам': {
            name: 'Шаблон:Предупреждение/спам',
            title: 'Спам'
        },
        'Реклама': {
            name: 'Шаблон:Предупреждение/реклама',
            title: 'Реклама'
        },
        'Вандализм': {
            name: 'Шаблон:Предупреждение/вандализм',
            title: 'Вандализм'
        },
        'Статпад': {
            name: 'Шаблон:Предупреждение/статпад',
            title: 'Статпад'
        },
        'Плохие правки': {
            name: 'Шаблон:Предупреждение/плохиеправки',
            title: 'Плохие правки'
        },
        '18+': {
            name: 'Шаблон:Предупреждение/18',
            title: '18+'
        },
        'Твинк': {
            name: 'Шаблон:Предупреждение/твинк',
            title: 'Твинк'
        },
        'Плохие блоги': {
            name: 'Шаблон:Предупреждение/плохиеблоги',
            title: 'Плохие блоги'
        },
        'Вне ценза': {
            name: 'Шаблон:Предупреждение/внеценза',
            title: 'Вне ценза'
        },
        'Плохие игры': {
            name: 'Шаблон:Предупреждение/плохиеигры',
            title: 'Плохие игры'
        },
        'Бессмыслица': {
            name: 'Шаблон:Предупреждение/бессмыслица',
            title: 'Бессмыслица'
        },
    }
};