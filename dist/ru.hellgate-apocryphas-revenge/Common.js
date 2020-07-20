/* Автомат. плашки за правки  */
!function( $ ) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount > 1 && editCount <= 100) {
            title = "Сталкер-новичок";
        } else if (editCount > 100 && editCount <= 300) {
            title = "Исследователь Апокрифы";
        } else if (editCount > 300 && editCount <= 600) {
            title = "Опытный сталкер";
        } else if (editCount > 600 && editCount <= 900) {
            title = "Смотрящий во Тьму";
        } else if (editCount > 1200 && editCount <= 2000) {
            title = "Автоматон";
        } else if (editCount > 2000 && editCount <= 3000) {
            title = "Опытный участник";
        } else if (editCount > 3000 && editCount <= 5000) {
            title = "Профи";
        } else if (editCount > 5000 && editCount <= 10000) {
            title = "Всезнающий";
        } else if (editCount > 10000 && editCount <= 50000) {
            title = "Почётный участник";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
}( this.jQuery );

/*Прокрутка*/
$('.ArrowLeft').click(function () {
    scroll = $('#Carousel').scrollLeft();
    $('#Carousel').animate({'scrollLeft': scroll-540},1000);
});
$('.ArrowRight').click(function () {
    scroll = $('#Carousel').scrollLeft();
    $('#Carousel').animate({'scrollLeft': scroll+540},1000);
});