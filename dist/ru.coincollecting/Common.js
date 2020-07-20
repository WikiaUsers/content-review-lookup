/* Размещённый здесь код JavaScript будет загружен всем пользователям при обращении к какой-либо странице */

function addWikifButton(){
 var toolbar = document.getElementById('toolbar')
 var textbox = document.getElementById('wpTextbox1')
 if (!textbox || !toolbar) return
 var i = document.createElement('img')
 i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
 i.alt = i.title = 'Викификатор'
 i.onclick = Wikify
 i.style.cursor = 'pointer'
 toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit'){
 document.write('<script type="text/javascript" src="http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript"><\/script>')
 addOnloadHook(addWikifButton)
}