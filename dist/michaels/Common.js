/* Any JavaScript here will be loaded for all users on every page load. */
;(function() {
    $('.mpd-item').click(function(e) {
        e.preventDefault();
        $('.mpd-item-container').hide();
        $('.mpd-content-container')
            .show()
            .append('<img class="loading" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" />');
        $('.mpd-content').load('/wiki/Template:' + $(this).data('load') + ' #mw-content-text', function() {
            $('.mpd-content-container .loading').remove();
            $(this).slideDown();
            $('.mpd-content-container #mw-content-text h3:first-of-type').prepend(
                $('<a class="back">⬅</a>').click(function() {
                    $('.mpd-content-container, .mpd-content').hide();
                    $('.mpd-item-container').fadeIn();
                    $(this).remove();
                })
            );
        });
    });
})();