/* Викификатор 
Автоматически заменяет короткое тире на длинное, французские кавычки " " на кавычки-ёлочки « », троеточие из трёх точек ... на единый знак … .
*/
function addWikifButton() {
        var toolbar = document.getElementById('toolbar');
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
        addOnloadHook(addWikifButton);
}

// Script for switching tabs on main page (Табуляция на заглавной)
// Взято из http://ru.summonerswar.wikia.com/wiki/MediaWiki:Common.js
(function($) {
    if (!$('.switchtab').length) {
        return;
    }
 
    $('.switchtab').click(function() {
        if ($(this).hasClass('toggledtab')) {
            return;
        }
 
        to_hide = $('.toggledtab').attr('data-tab');
        to_show = $(this).attr('data-tab');
 
        $('.toggledtab').toggleClass('toggledtab');
        $(this).toggleClass('toggledtab');
 
        $('.tab' + to_hide).hide();
        $('.tab' + to_show).show();
    });
 
})(this.jQuery);