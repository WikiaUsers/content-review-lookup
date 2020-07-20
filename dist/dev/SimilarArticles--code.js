mw.loader.using([
    'mediawiki.api',
    'mediawiki.util'
]).then(function() {
    if (!$('.js-similar-articles').exists()) {
        return;
    }
    new mw.Api().get({
        action: 'opensearch',
        search: mw.config.get('wgPageName'),
        format: 'json'
    }).done(function(res) {
        // First result is page itself
        if (res[1].length) {
            res[0] = res[1].shift();
        }
        // Test if no results again because it could have been diminished by one
        if (res[1].length) {
            $('.js-similar-articles').empty();
            ul = $('<ul />').appendTo('.js-similar-articles');
            res[1].forEach(function(article) {
                $('<li />').appendTo(ul).append(
                    $('<a />', { text: article, href: mw.util.getUrl(article) })
                );
            });
        }
    });
});