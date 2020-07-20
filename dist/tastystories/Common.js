(function( $, mw ) {
    if ( !$( '.insertusername' ).length ) return;
    var nick = mw.config.get( 'wgUserName' );
    $( '.insertusername' ).text(nick);
})( this.jQuery, this.mediaWiki );