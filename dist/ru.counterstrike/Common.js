/* Размещённый здесь код JavaScript будет загружен всем пользователям при обращении к какой-либо странице */

var auto_comment = 0;

/* Для шаблона "Ник" */
if ( mw.config.get('wgUserName') != 'null') {
    $('.insertusername').text(wgUserName);
}
 
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