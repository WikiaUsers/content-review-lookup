/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
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

importScriptPage('User:Wildream/FluidImage/code.js', 'ru.community');

/* Виджеты соцсетей */
var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: '21px'
};
importScriptPage('SocialIcons/code.js','dev');

function removeSocialIcons() {
    if (typeof (wgIsMainPage) !== 'undefined') {
        if ($('.socialmedia-share').length) {
            $('.socialmedia-share').remove();
        } else {
            setTimeout(removeSocialIcons, 100);
        }
    }
}
removeSocialIcons();