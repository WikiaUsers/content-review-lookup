(function() {
    var $list = $('.page-header__contribution-buttons .wds-list'),
    config = mw.config.get([
        'wgArticleId',
        'wgNamespaceNumber',
        'wgPageName',
        'wgUserLanguage'
    ]);
    
        // AJAX refresh
    $('a#num2').on("click", function refreshArticle() {
        var $temp = $('<div>');
        $temp.load(window.location.href + ' #mw-content-text', function() {
                var $newContent = $temp.children('#mw-content-text');
                if ($newContent.length) {
                    $('#mw-content-text').replaceWith($newContent);
                    mw.util.$content = $newContent;
 
                }
            }
 
        );
        $temp.remove();
        new BannerNotification(elementContent.contentRefreshed, 'success').show();
    });
})();