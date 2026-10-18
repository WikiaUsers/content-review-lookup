/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */

$(function () {
    $('.character-grid-item[data-character-page]').each(function () {
        var card = $(this);
        var page = card.attr('data-character-page');
        var url = mw.util.getUrl(page);

        card.find('.pi-image a').attr('href', url);
    });
});