mw.loader.using('mediawiki.api').then(function() {
    if (mw.config.get('wgNamespaceNumber') !== 0) return;
 
    function getHeader() {
        return $.Deferred(function(def) {
            var cached = sessionStorage.getItem('CachedCommentsHeader');
 
            if (cached !== null) {
                def.resolve(cached);
                return;
            }
 
            new mw.Api().get({
                action: 'parse',
                page: 'MediaWiki:Custom-comments-header'
            }).then(function(res) {
                if (res.error) {
                    sessionStorage.setItem('CachedCommentsHeader', '');
                    def.resolve('');
                    return;
                }
 
                var html = res.parse.text['*'];
 
                sessionStorage.setItem('CachedCommentsHeader', html);
                def.resolve(html);
            });
        });
    }
 
    getHeader().then(function(html) {
        var $container = $('<div>');
 
        $container.html(html);
 
        $('#WikiaMainContentContainer').append($container);
 
        mw.hook('wikipage.content').fire($container);
    });
});