/* Any JavaScript here will be loaded for all users on every page load. */

/* https://zh.wikipedia.org/wiki/MediaWiki:Common.js/edit.js */
$( function(){
	if(document.getElementById('no-new-title') && document.editform.wpSection.value=="new") {
		if(summaryinput=document.getElementById("wpSummary")) {
                        summaryinput.disabled=true;
                        summaryinput.value='';
                }
	}
});

( function( $, mw ) { $( function() {
    if ( $( '#editform input[name=wpSection]' ).val() === 'new' ) {
        if ( $( '#no-new-title' ).length ) {
            $( '#wpSummary' ).attr( 'disabled', true );
        }
        return;
    }
    $( '#wpSummaryLabel .mw-summary-preset' ).on( 'click', '.mw-summary-preset-item a', function( e ) {
        e.preventDefault();
        var $this = $( this ), summary = $( '#wpSummary' ).val();
        var $item = $this.parent( '.mw-summary-preset-item' );
        summary = summary.replace( /\s+$/g, '' );
        if ( summary != '' ) {
            summary += ' ';
        }
        summary += $item.attr( 'title' ) || $this.text();
        $this.replaceWith( $this.contents() );
        $( '#wpSummary' ).val( summary );
    } );
} ); } )( jQuery, mediaWiki );