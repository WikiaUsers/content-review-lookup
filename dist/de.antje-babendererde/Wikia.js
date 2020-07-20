function bloggreeting() {
    mw.loader.using('mediawiki.api', function() {
        if (mw.config.get('wgNamespaceNumber') == 500) {
            var infos = mw.config.get('wgTitle').split("/");
            if (infos.length == 1) {
                api = new mw.Api();
                api.get( {
                    action:'query',
                    prop: 'revisions',
                    titles: 'User:' + infos[0] + "/Blogbegrüßung",
                    rvprop: 'content',
                    rvparse: '',
                    format: 'json'
                })
                .done(function(data) {
                    for (var page in data['query']['pages']) {
                        if (mw.config.get('wgUsername') == infos[0]) {
                            $('.UserProfileActionButton').before('<div id="bloggreeting">' + data['query']['pages'][page]['revisions'][0]['*'] + '</div>');
                        } else {
                            $('.WikiaBlogListing').before('<div id="bloggreeting">' + data['query']['pages'][page]['revisions'][0]['*'] + '</div>');
                        }
                        break;
                    }
                })
            }
        }
    })
}