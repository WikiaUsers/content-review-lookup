/* Funktion für den Forum-Header */
function forumheader() {
    var namespace = mw.config.get('wgNamespaceNumber');
    if (namespace == 1201 || namespace == 2000 || mw.config.get('wgCanonicalSpecialPageName') == 'Forum') {
        mw.loader.using('mediawiki.api', function() {
            api = new mw.Api();
            api.get({
                action:'query',
                prop: 'revisions',
                titles: 'Vorlage:Navigation_Wiki',
                rvprop: 'content',
                rvparse: '',
                format: 'json'
            })
            .done(function (data) {
                $('.WikiaPageHeader').after(
                    $('<div />')
                        .attr('id','forumnavigation')
                        .html(data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*'])
                );
            });
        });
    }
}
$(function() {
    forumheader();
});