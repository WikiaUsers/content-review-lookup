/*См. также MediaWiki:Modes.js, MediaWiki:BG.js, MediaWiki:Chatfilter.js, MediaWiki:ImportJS, MediaWiki:Fantom.js*/

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

/* Запрещает писать в Архиве */

$(function() {
    if (wgPageName == 'Главная_тема:Архив') {
        $('#ForumNewMessage').replaceWith('<blockquote class="message">В архиве писать запрещено.</blockquote>');
    }
});

/*Для импортов*/
window.railWAM = {
    logPage:"Project:WAM Log"
};