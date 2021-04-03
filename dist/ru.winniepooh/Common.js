importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SyntaxHighlight.js',
    ]
});

//===================================
// Переключатель стилей работающий с [[Шаблон:Версия]]
// Стили записаны в MediaWiki:Styles.css
// Скрипт by АУИ Вики
// Автор Maxwell Winters
// 
 
$(function() {
if($('#changestyle').length > 0) {
var cl = $($('#changestyle').get(0)).data('bg');
if(cl) {
cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
$(document.body).addClass('version-' + cl);
}
}
});


window.UserTagsJS = {
        modules: {},
        tags: {
                участникгода: { u:'Участник года' },

        }
};
 
UserTagsJS.modules.custom = {
        'Никнейм_участника_года': ['участникгода'],

};