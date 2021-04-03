(function () {
    if (window.HideClearCacheLoaded || !$('#mw-clearyourcache').length) {
        return;
    }
    window.HideClearCacheLoaded = true;
    
    function click () {
        //Hide "show more"
        $(this).parent().hide();
        
        //Show the rest of the message
        $('#mw-clearyourcache > ul').fadeIn('slow');
    }

    function init (i18n) {
        //Hide most of the message
        $('#mw-clearyourcache > ul').hide();

        //Add the show text
        $('#mw-clearyourcache > p').append(
            $('<span>', {
                append: [
                    '[',
                    $('<a>', {
                        click: click,
                        style: 'cursor: pointer;',
                        text: i18n.msg('show').escape()
                    }),
                    ']'
                ]
            })
        );
    }

    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('HideClearCache').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();