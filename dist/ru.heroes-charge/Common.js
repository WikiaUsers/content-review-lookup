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

// Слайдер

$(function() {
    if (!$('#slider-body').length) {
        return;
    }
    
    // Просто переменные
    slider_amount = $('.slider-section').length;
    active_slider = 1;
    
    // Скрываем 2, 3, 4 ... элементы и показываем первый
    $('.slider-section').hide();
    $('#slider-1').show();
    
    // Кнопки действия
    $('.slider-button').click(function() {
        $('#slider-' + active_slider).hide();
        if($(this).attr('id') == 'slider-prev') {
            active_slider = (active_slider != 1) ? (active_slider - 1) : slider_amount;
        } else {
            active_slider = (active_slider != slider_amount) ? (active_slider + 1) : 1;
        }
        $('#slider-' + active_slider).show();
    });
});

// Конец слайдера