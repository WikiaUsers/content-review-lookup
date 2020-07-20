// **************************************************************
// Allow For Entire Cell To Link To Page - Template:CharacterTabs
// ***
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