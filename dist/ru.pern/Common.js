/* Викификатор 
Автоматически заменяет короткое тире на длинное, французские кавычки " " на кавычки-ёлочки « », троеточие из трёх точек ... на единый знак … .
*/
function addWikifButton() {
        var toolbar = document.querySelector('.wikia-bar .toolbar');
        if (!toolbar) return;
        var i = document.createElement('img');
        i.src = '//upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
        i.alt = i.title = 'викификатор';
        i.onclick = Wikify;
        i.style.cursor = 'pointer';
        toolbar.appendChild(i);
}

if (wgAction == 'edit' || wgAction == 'submit') {
        importScript('MediaWiki:Wikificator.js');
        $(addWikifButton);
}