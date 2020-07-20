$(function() {
    var rights = {
        'Weichpelz'       :['Admin', 'Bürokrat'],
    },
        newrights = rights[wgTitle];
 
    if ( typeof newrights != 'undefined' ) {
        // remove old rights
        $( '.UserProfileMasthead .masthead-info span.tag' ).remove();
 
        for ( var i in newrights ) {
            // add new rights
            $( '<span class="tag" style="margin-left:10px;">' + newrights[i] + '</span>' ).appendTo( '.masthead-info hgroup' );
        }
    }
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:SexyUserPage/code.js'
    ]
});