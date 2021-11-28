
/*Викификатор*/
 
function addWikifButton() {
        var toolbar = (document.getElementById('cke_toolbar_source_1') || document.getElementById('toolbar') ) // Monobook+Modern
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