/* <pre> */
/* Размещённый здесь код JavaScript будет загружен всем пользователям при обращении к какой-либо странице */
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

/**/
importScript('MediaWiki:Common.js/BackToTopButton.js');
importScript('MediaWiki:Common.js/masthead.js');
importScript('MediaWiki:Common.js/DidYouKnow.js');
importScript('MediaWiki:RepeatableTimer.js');

//if (wgAction == 'edit' || wgAction == 'submit') {
        //importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
       // addOnloadHook('[]')
//}

/* </pre> */