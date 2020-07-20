(function () {
    if (window.HideClearCacheLoaded || !$('#mw-clearyourcache').length) {
        return;
    }
    window.HideClearCacheLoaded = true;

    function init (i18n) {
        //Hide most of the message
        $('#mw-clearyourcache > ul').hide();

        //Add the show text
        $('#mw-clearyourcache > p').append(
            $('<span>', {
                id: 'showmore',
                append: [
                    '[',
                    $('<a>', {
                        style: 'cursor: pointer;',
                        text: i18n.msg('show').escape()
                    }),
                    ']'
                ]
            })
        );

        //When the show text is clicked...
        $('#mw-clearyourcache > p > #showmore > a').click(function () {
            //...remove the show text...
            $('#mw-clearyourcache > p > #showmore').remove();
    
            //...and show the rest of the message
            $('#mw-clearyourcache > ul').fadeIn('slow');
        });
    }

    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('HideClearCache').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();