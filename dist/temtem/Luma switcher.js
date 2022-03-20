/* Switch between normal and luma */
/* This is basically a custom tabber, should switch it over, but preserving this for the time being */
$( function() {
	$( "#ttw-show-temtem" ).click( function() {
	    if (!($( "#ttw-show-temtem" ).hasClass( "active" ) || $( "#ttw-show-temtem" ).hasClass( "disabled" ))) {
	        $( "#ttw-temtem" ).show();
	        $( "#ttw-temtem-luma" ).hide();
	
	        $( "#ttw-show-temtem" ).addClass( "active" );
	        $( "#ttw-show-temtem-luma" ).removeClass( "active" );
	    }
	});
	
	$( "#ttw-show-temtem-luma" ).click( function() {
	    if (!($( "#ttw-show-temtem-luma" ).hasClass( "active" ) || $( "#ttw-show-temtem-luma" ).hasClass( "disabled" ))) {
	        $( "#ttw-temtem-luma" ).show();
	        $( "#ttw-temtem" ).hide();
	
	        $( "#ttw-show-temtem-luma" ).addClass( "active" );
	        $( "#ttw-show-temtem" ).removeClass( "active" );
	    }
	});
});
/* End Normal/Luma Switch */