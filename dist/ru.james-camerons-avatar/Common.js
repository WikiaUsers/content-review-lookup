/* <pre> */
/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*Викификатор*/

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

/* Виджеты соцсетей */
var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: '21px'
};
importScriptPage('SocialIcons/code.js','dev');
if (typeof(wgIsMainPage) !== 'undefined') {
    $('.socialmedia-share').remove();
}

/* </pre> */