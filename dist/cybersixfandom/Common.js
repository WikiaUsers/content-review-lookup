/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});

// {{USERNAME}}
$(function() {
    if ( mw.config.get( 'wgUserName' ) !== null )
        $( '.insertusername' ).text( mw.config.get( 'wgUserName' ) );
});
// END {{USERNAME}}