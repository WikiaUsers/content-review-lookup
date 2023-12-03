/**
 * Loading UserTags from a page with JSON
 */
mw.loader.using('mediawiki.api').then(function() {
    new mw.Api().get({
        action: 'query',
        formatversion: 2,
        titles: 'MediaWiki:Custom-user-tags.json',
        prop: 'revisions',
        rvprop: 'content',
        rvslots: 'main'
    }).then(function(data) {
        window.UserTagsJS = JSON.parse(data.query.pages[0].revisions[0].slots.main.content);
    });
});