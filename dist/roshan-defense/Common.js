/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
    if ($('.cell-link').length) {
        $('.cell-link').each(function() {
            $(this)
                .css('cursor', 'pointer')
                .on({
                    click: function() {
                        window.location = $(this).find('a').attr('href');
                    }
                
                });
        });
    }
});