/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

window.ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"]; 
window.AjaxRCRefreshText = 'Автообновление';




/* === Раздел обычного кода === */

/* Метод для отображения ника */
//insertusername
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:TopEditors/code.js'
    ]
});

/* Шаблон:AnimationViewer */
var lpj_api;

function log_page_json(name) {
    lpj_api.get({
        action: 'query',
        prop: 'revisions',
        titles: name,
        rvprop: 'content',
        rvslots: 'main',
        formatversion: '2'
    }).done(function (data) {
        var content = data.query.pages[0].revisions[0].slots.main.content
        var unspaced_content = JSON.stringify(JSON.parse(content))
        console.log(unspaced_content)
    })
}

mw.loader.using('mediawiki.api').then(function () {
    lpj_api = new mw.Api();
})