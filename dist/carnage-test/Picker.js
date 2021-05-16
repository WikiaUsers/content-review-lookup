( function( mw ) { 
	"use strict";
	
	function ColorPicker( opts ) { 
		// Sets the current instance to a variable
		const colorPicker = this;
		
		// An array of color swatches
		colorPicker.SWATCHES = [ ];
		
		// The color picker container
		colorPicker.CONTAINER = document.createElement( "div" );
	}
} )( mediaWiki );