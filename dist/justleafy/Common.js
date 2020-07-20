//CopyText's JS
mw.hook('dev.i18n').add(function (i18n) {
    i18n.loadMessages('CopyText').done(function (i18n) {
        $('body').on('click', '.copy-to-clipboard-button', function(e){
            var text = $(this).data('text'),
            $input = $('<textarea>', { type: 'text' })
                .val($('.copy-to-clipboard-text').filter(function() {
                    return $(this).data('text') == text;
                }).first().text())
                .appendTo('body')
                .select();
            document.execCommand('Copy');
            $input.remove();
            new BannerNotification(i18n.msg('success').escape(), 'confirm').show();
        });
    });
});
importArticle({ type: 'script', article: 'u:dev:I18n-js/code.js' });

// Add [[ Category: Images]] @ images aytomatically

if(wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') {
$('#wpUploadDescription').val('[[Category:Images]]');
}

//JS for Modern Lightbox
//bug fixes
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

//Configuration for AjaxRC
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'AJAX',
    'ajaxrc-refresh-hover': 'Enable page auto-refresh',
}}}}});