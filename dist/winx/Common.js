// Any JavaScript here will be loaded for all users on every page load. 

//Get names
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

//Old blog comments
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it has not been commented on in over <expiryDays> days. There is no need to comment!"
};

//Featured
$( function () {
    if ( $( '#icons' ).length ) {
        if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
            $( '.page-header__actions' ).prepend( $( '#icons' ).show() );
        } else {
            $( '.page-header__contribution > div' ).first().append( $( '#icons' ).show() );
        }
    }
} );