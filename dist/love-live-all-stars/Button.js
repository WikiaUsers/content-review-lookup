$('.mw-customtoggle-test').click( function() {
    var $this = $( this );
    var toggled = $this.data( 'toggled' );
    $this.data( 'toggled', !toggled );
    $this.find( 'div' ).text( toggled ? 'Unidolized' : 'Idolized' )
} );