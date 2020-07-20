/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемая подсказка
 
importArticles({
    type: "script",
    articles: [
        // ...
        //'u:dev:MediaWiki:DiscordIntegrator/code.js'
        'w:c:dev:TopEditors/code.js'        
        // ...
    ]
});
 
/*делаем скрытие меню при прокрутке вниз и уходе мышки из верхней области*/
addEventListener("mousemove" , upmenu);
function upmenu(e) {
        e = e || window.event;
        if (e.clientY > 60) {
			document.getElementById("globalNavigation").style.position = "absolute";
    } else {
        document.getElementById("globalNavigation").style.position = "fixed";
    }
}