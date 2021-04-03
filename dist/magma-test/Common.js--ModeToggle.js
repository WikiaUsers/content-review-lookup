/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    if (!$('table.mode-toggle-mode-2')[0]) // If 2nd mode is not used, there should only be one mode, and the button does nothing
        return;
    else if (!$('table.mode-toggle-mode-3')[0]) { // If only 2 modes are used
    	$('table.mode-toggle-mode-2')[0].classList = "mode-toggle-mode-2 mode-toggle-hidden";
    	$('.mode-toggle-button').on('click', function() {
        	$('table.mode-toggle-mode-1').toggleClass("mode-toggle-hidden");
        	$('table.mode-toggle-mode-2').toggleClass("mode-toggle-hidden");
    	});
    }
    else if (!$('table.mode-toggle-mode-4')[0]) { // If 3 modes are used
    	$('table.mode-toggle-mode-2')[0].classList = "mode-toggle-mode-2 mode-toggle-hidden";
    	$('table.mode-toggle-mode-3')[0].classList = "mode-toggle-mode-3 mode-toggle-hidden";
    	var currentMode = 1;
    	$('.mode-toggle-button').on('click', function() {
        	switch(currentMode) {
        		case 1:
        			currentMode++;
        			$('table.mode-toggle-mode-1').toggleClass("mode-toggle-hidden");
        			$('table.mode-toggle-mode-2').toggleClass("mode-toggle-hidden");
        			break;
        		case 2:
        			currentMode++;
        			$('table.mode-toggle-mode-2').toggleClass("mode-toggle-hidden");
        			$('table.mode-toggle-mode-3').toggleClass("mode-toggle-hidden");
        			break;
        		case 3:
        			currentMode = 1;
        			$('table.mode-toggle-mode-3').toggleClass("mode-toggle-hidden");
        			$('table.mode-toggle-mode-1').toggleClass("mode-toggle-hidden");
        			break;
        	}
    	});
    }
    else { // If 4 modes are used
    	$('table.mode-toggle-mode-2')[0].classList = "mode-toggle-mode-2 mode-toggle-hidden";
    	$('table.mode-toggle-mode-3')[0].classList = "mode-toggle-mode-3 mode-toggle-hidden";
    	$('table.mode-toggle-mode-4')[0].classList = "mode-toggle-mode-4 mode-toggle-hidden";
    	var currentMode = 1;
    	$('.mode-toggle-button').on('click', function() {
        	switch(currentMode) {
        		case 1:
        			currentMode++;
        			$('table.mode-toggle-mode-1').toggleClass("mode-toggle-hidden");
        			$('table.mode-toggle-mode-2').toggleClass("mode-toggle-hidden");
        			break;
        		case 2:
        			currentMode++;
        			$('table.mode-toggle-mode-2').toggleClass("mode-toggle-hidden");
        			$('table.mode-toggle-mode-3').toggleClass("mode-toggle-hidden");
        			break;
        		case 3:
        			currentMode++;
        			$('table.mode-toggle-mode-3').toggleClass("mode-toggle-hidden");
        			$('table.mode-toggle-mode-4').toggleClass("mode-toggle-hidden");
        			break;
        		case 4:
        			currentMode = 1;
        			$('table.mode-toggle-mode-4').toggleClass("mode-toggle-hidden");
        			$('table.mode-toggle-mode-1').toggleClass("mode-toggle-hidden");
        	}
    	});
    }
});

!function( $ ) {
    if ( !$( '.mode-toggle-button' ).length ) return;
 
    $( 'table[class*="mode-toggle-mode"]' ).each(function() {
        $( this ).find( 'img' ).each(function() {
            if ( !$( this ).hasClass( 'lzyLoaded' ) ) {
                var src = $( this ).attr( 'data-src' );
                $( this ).attr( 'src', src );
            }
        });
    });
}( jQuery );