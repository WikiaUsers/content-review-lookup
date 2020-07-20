$(function() {
    var rights = {
        'Harry granger'     : ['Admin', 'Bureaucrat'],
        'Hunnie Bunn'       : ['Admin', 'Bureaucrat'],
        'ProfessorTofty'    : ['Wikia Star', 'Admin', 'Bureaucrat']
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