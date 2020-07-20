(function(window, $, mw){
    mw.loader.using(['mediawiki.api']).then(function(){
        var title = 'MediaWiki:Custom-AdminFilter',
            params = {
                format: 'json',
                action: 'query',
                titles: title,
                prop: 'revisions',
                rvprop: 'content',
                indexpageids: true
            };
        (new mw.Api()).get(params).then(function(response){
            
        });
    });
    mw.loader.load(['mediawiki.api']);
}(window, jQuery, mediaWiki));