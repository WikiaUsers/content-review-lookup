importScriptPage('MediaWiki:Wikia.js/AdminNotify.js');
importScriptPage('http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js');

$(function() {
    var rights = {
        'Blaze fire12'     : ['Gründer', 'Admin', 'Bürokrat'],
        'Harry granger'    : ['Admin', 'Bürokratin']
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