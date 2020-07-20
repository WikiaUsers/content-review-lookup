/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Автообновление страниц */
window.ajaxPages = [
    "Служебная:WikiActivity",
    "Служебная:RecentChanges",
    "Служебная:Watchlist",
    "Служебная:Log",
    "Служебная:Contributions"
];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Автоматически обновляет страницу каждые '+ajaxRefresh/1000+' секунд';

/* Inactive Users */
InactiveUsers = {
    text: 'НЕАКТИВЕН'
};

/* Template button */
 if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
    "speedTip": "Шаблон",
    "tagOpen": "{{",
    "tagClose": "}}",
    "sampleText": "Название шаблона"}
    }
    
/* Викификатор */
    function addWikifButton() {
        var toolbar = document.getElementById('toolbar')
        if (!toolbar) return
        var i = document.createElement('img')
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
        i.alt = i.title = 'викификатор'
        i.onclick = Wikify
        i.style.cursor = 'pointer'
        toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
        addOnloadHook(addWikifButton)
}