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
$(function() {
    if ( mw.config.get( 'wgVersion' ) !== '1.19.24' && $( '#title-featured' ).length ) {
        $( '.page-header__contribution > div' ).first().append( $( '#title-featured' ).show() );
    } else if ( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#featured' ).attr( 'style', 'position: absolute; right: 300px;' )
        );
    } else {
        $( '.WikiaPageHeader' ).append( $( '#featured' ) );
        $( '#featured' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
    }
});