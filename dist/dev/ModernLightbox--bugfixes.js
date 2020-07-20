//bug fixes
//if you find any remaining bugs for the lightbox, fix them here

//remove lightbox keydown handler when lightbox is closed

$(window).on('lightboxOpened', function() {
    if (window.lightbox_keydown_fix_timer) clearInterval(window.lightbox_keydown_fix_timer);
    window.lightbox_keydown_fix_timer = setInterval(function() {
        if (!$('#LightboxModal').length) {
            $(document).off('keydown.Lightbox');
            clearInterval(window.lightbox_keydown_fix_timer);
            delete(window.lightbox_keydown_fix_timer);
        }
    }, 1000);
});

//add style to fix the position of the loading throbber
importArticles({
    type: 'script',
    articles: [
        'u:justleafy:LightboxThrobberFix.css',
    ]
});
//*******