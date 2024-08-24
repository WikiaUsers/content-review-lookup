/* Das folgende JavaScript wird für alle Benutzer geladen. */
$(function() {
    var rights = {
        'Klap Trap'    : ['Gründer', 'Admin', 'Bürokrat'],
 
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