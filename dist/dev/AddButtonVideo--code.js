// Button for adding a video
// Made by User:JustLeafy
(function () {
    if (window.AddButtonVideo) {
        return;
    }
    window.AddButtonVideo = true;

    function videoButton(i18n) {
        var msg = i18n.msg('add').plain();
        $('<a>', {
            'class': 'wds-button wds-is-squished wds-is-secondary',
            href: mw.util.getUrl('Special:WikiaVideoAdd'),
            text: msg,
            title: msg
        }).appendTo('.page-header__contribution-buttons');
    }
 
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('AddButtonVideo').then(videoButton);
    });
 
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();