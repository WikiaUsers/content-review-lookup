(function() {
    if ($('#custom_top_notice').length || window.CustomTopNoticeLoaded) return;
    window.CustomTopNoticeLoaded = true;

    // Imports
    importArticle({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Fetch.js'
        ]
    });

    // Ajouter la notice au dessus de l’en-tête
    function init(i18n, customTopNotice) {
        $('<div>', {
            id: 'custom_top_notice'
        }).append(
            $('<span>').html(customTopNotice)
        ).insertBefore('.page-header');
    }

    // Récupérer Custom-TopNotice
    mw.loader.using(['mediawiki.util', 'mediawiki.api']).then(function() {
        var api = new mw.Api();
        api.get({
            action: 'query',
            titles: 'MediaWiki:Custom-TopNotice',
            prop: 'revisions',
            rvprop: 'content',
            format: 'json'
        }).then(function(data) {
            var customTopNotice = data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*'];
            mw.hook('dev.i18n').add(function(i18n) {
                i18n.loadMessages('CustomTopNotice').then(function() {
                    init(i18n, customTopNotice);
                });
            });
        });
    });
})();