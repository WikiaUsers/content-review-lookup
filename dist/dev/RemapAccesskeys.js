/**
 * Remap existing accesskey attributions or register new accesskeys
 * for fully personalized keyboard shortcuts experience on Fandom
 *
 * @author Rail
 */
;( function() {
	'use strict';

	const customShortcuts = window.customKeyboardShortcuts;

	// Kill bad configuration and prevent double loading
	if ( !customShortcuts || typeof customShortcuts !== 'object' || window.remapAccesskeysLoaded ) {
		return;
	}
	window.remapAccesskeysLoaded = true;

	customShortcuts.forEach( function( i ) {
		/**
		 * Handle accesskeys that should run when hook is fired
		 *
		 * This is not my most preferable implementation, but I'm not
		 * aware of any other possibility to do what I'm doing here
		 */
		if ( !!i.hook ) {
			mw.hook( i.hook ).add( processKeys );
		} else {
			processKeys();
		}

		/**
		 * Main script function – process configuration and reassign or create accesskeys
		 * by adding accesskey attribute to the first element matching specified selector
		 */
		function processKeys() {
			// Check if the condition is being met
			if ( typeof i.condition === 'boolean' ) {
				if ( !i.condition ) return;
			}

			/**
			 * Catch DOM elements before doing anything.
			 *
			 * This way it should be possible to catch elements by
			 * [accesskey="xyz"] selector and still remap them
			 */
			const accesskeyHolders = document.querySelectorAll( '[accesskey="' + i.accesskey + '"]' );
			const keyElement = document.querySelector( i.selector );

			/**
			 * First, unset the accesskey from all existing elements
			 * This is necessary to overwrite default accesskeys if needed
			 */
			if ( !!accesskeyHolders ) {
				Array.from( accesskeyHolders ).forEach( function( e ) {
					e.removeAttribute( 'accesskey' );
				} );
			}

			// Set the new accesskey or remap previously existing one
			if ( !!keyElement ) {
				keyElement.setAttribute( 'accesskey', i.accesskey );
			}
		}
	} );
} )();