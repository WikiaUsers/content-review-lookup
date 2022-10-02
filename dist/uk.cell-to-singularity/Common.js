/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */
$('.Card').click(function() {
    if ($(this).hasClass('toggled')) {
        $(this).find('.card-desc').css({"height": "160px", "opacity": "1"})
        $(this).css({"transform": "scale(100%)"})
        $(this).removeClass('toggled');
    } else {
        $(this).find('.card-desc').css({"height": "0px", "opacity": "0"})
        $(this).css({"transform": "scale(80%)"})
        $(this).addClass('toggled');
    }
});