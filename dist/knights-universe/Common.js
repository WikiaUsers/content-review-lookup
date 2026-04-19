/* Preload extension */
preloadTemplates_subpage = "case-by-case";

/* Toggle spolier button text */
$(function () {
    var button = $('.mw-customtoggle-PreSpoiler');
    if (button.length !== 1) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Show spoilers');
        } else {
            $(this).addClass('shown');
            $(this).text('Hide spoilers');
        }
    }

    button.text('Show spoilers');

	button.click(toggleText);
});