//------------------------------------//
// Добавление кнопки викификатора
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
if (wgAction == 'edit' || wgAction == 'submit') {
        importScript('MediaWiki:Wikificator.js');
        addOnloadHook(addWikifButton);
}
Medals/code.js
}

//------------------------------------//