/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Подвальный отдел сколково Subnautica вики */
$(function() {
    var d = new Date();
    if (d.getHours() < 4) {
        document.body.className += ' BG1';
    } else if (d.getHours() < 6) {
        document.body.className += ' BG2';
    } else if (d.getHours() < 10) {
        document.body.className += ' BG3';
    } else if (d.getHours() < 16) {
        document.body.className += ' BG4';
    } else if (d.getHours() < 20) {
        document.body.className += ' BG5';
    } else if (d.getHours() < 22) {
        document.body.className += ' BG6';
    } else if (d.getHours() < 24) {
        document.body.className += ' BG1';
    }
});

// AJAX-обновление некоторых страниц(выбор страниц)
var ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
var AjaxRCRefreshText = 'автообновление страницы'; //Отображаемое название
 
var PurgeButtonText = 'Обновить'; //Отображаемое название
 
/*Показ IP анонимов в комментариях*/
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};