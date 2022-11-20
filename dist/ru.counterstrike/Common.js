/* Размещённый здесь код JavaScript будет загружен всем пользователям при обращении к какой-либо странице */
/* Для шаблона "Ник" */
var username = mw.config.get("wgUserName");
if (username) $('.insertusername').text(username);
 
function addWikifButton() {
        var toolbar = document.getElementById('toolbar');
        if (!toolbar) return;
        var i = document.createElement('img');
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
        i.alt = i.title = 'викификатор';
        i.onclick = Wikify;
        i.style.cursor = 'pointer';
        toolbar.appendChild(i);
}

if (mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
        $(addWikifButton);
}