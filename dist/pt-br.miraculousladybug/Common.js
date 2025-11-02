
/* Toggle spolier button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (button.length !== 1) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Mostrar spoilers');
        } else {
            $(this).addClass('shown');
            $(this).text('Esconder spoilers');
        }
    }

    button.text('Mostrar spoilers');

	button.click(toggleText);
});