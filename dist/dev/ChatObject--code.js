// <syntaxhighlight lang="javascript">
/* global console, mediaWiki */
/**
 * Easily manipulate Chat
 *
 * @class Chat
 * @singleton
 */
Chat = ( function ( mw ) {
	'use strict';
	
	var config = mw.config,	    
	/**
	 * Logging module
	 * @author Kangaroopower
	 */
	log = ( window.console && function () {
		var args = Array.prototype.slice.call( arguments );
		args.unshift( 'ChatObj: ' );
		return window.console.log.apply( window.console, args );
	}) || function () {};
	
	if ( config.get( 'wgCanonicalSpecialPageName' ) !== 'Chat' ) {
		return;
	}
	
	document.head.appendChild( document.createElement( 'style' ) );
	document.getElementsByTagName( 'style' )[3].appendChild(
		document.createTextNode( '.wordmark button { display: inline-block; margin-top: 12px; vertical-align: top; }' )
	);
	
	return {
	
		/**
		 * Map of the chat's color scheme
		 */
		colorScheme: {},
		
		/**
		 * Append a button to the chat's header
		 * @param {string} label The button's label
		 * @param {Function} callback Function to be run upon the button being clicked
		*/
		addToolbarButton: function ( label, callback ) {
			var button;
			if ( typeof label !== 'string' ||
				typeof callback !== 'function'
			) {
				log( 'Invalid button setup' );
				return;
			}
			
			button = document.createElement( 'button' );
			button.textContent = label;
			button.addEventListener( 'click', callback );
			document.getElementsByClassName( 'wordmark' )[0].appendChild( button );
		},
		
		/**
		 * Append CSS to a preset <style> element
		 * @param {string} selector A CSS selector
		 * @param {Object} properties An object mapping CSS property names to values
		 */
		appendStyle: function ( selector, properties ) {
			var css = selector, prop;
			
			if ( typeof selector !== 'string' ||
				properties !== Object( properties )
			) {
				log( 'Invalid CSS' );
				return;
			}
			
			css += ' {\n';
			
			for ( prop in properties ) {
				css += prop + ': ' + properties[prop] + ';';
			}

			css += '}\n';
			
			document.getElementsByTagName( 'style' )[3].appendChild(
				document.createTextNode( css )
			);

		},
		
		/**
		 * Import a script or stylesheet from the given URI
		 * @param {string} uri An URI pointing to the resource
		 */
		importResource: function ( uri ) {
			var loader;
			if ( typeof uri !== 'string'	) {
				log( 'Invalid URI' );
				return;
			}
			
			if ( uri.indexOf( '.css' ) !== -1  ) {
				loader = document.createElement( 'link' );
				loader.rel = 'stylesheet';
				loader.href = uri;
				document.head.appendChild( loader );
			} else if ( uri.indexOf( '.js' ) !== -1 ) {
				loader = document.createElement( 'script' );
				loader.src = uri;
				document.head.appendChild( loader );
			} else {
				log( 'Unsupported resource' );
			}
		},
		
		/**
		 * Change the callback function and text of a button
		 * @param {number} index Which button to change (first button is 0)
		 * @param {Function} callback (optional) The new callback
		 * @param {string} The button's new label
		 */
		modifyToolbarButton: function ( index, callback, label ) {
			if ( typeof index !== 'number'
				|| ( typeof callback !== 'function' && typeof callback !== undefined )
				|| typeof label !== 'string'
				|| document.getElementById( 'ChatHeader' ).getElementsByTagName( 'button' ).length < index
			) {
				log( 'Cannot modify button' );
				return;
			}
			
			document.getElementById( 'ChatHeader' ).getElementsByTagName( 'button' )[index].addEventListener(
				'click', callback
			);
			document.getElementById( 'ChatHeader' ).getElementsByTagName( 'button' )[index].textContent = label;
		},

		/**
		 * Modify the icons used to denote users in groups
		 * @param {Object} newGraphics An object mapping 'chat-mod' and/or 'staff' to the URI of their new icon
		 */
		setUserIcons: function ( newGraphics ) {
			var i, logo, userGroup, users;
			if ( newGraphics !== Object( newGraphics ) ) {
				log( 'Invalid new gaphics' );
				return;
			}
	
			for ( userGroup in newGraphics ) {
				if ( ( userGroup !== 'chat-mod'
					&& userGroup !== 'staff' )
					|| newGraphics[userGroup].indexOf( 'http' ) === -1
				) {
					log( 'Skipped invalid property' + prop );
					continue;
				}
		
				this.appendStyle( 'li.User.' + userGroup + ' .username:after', {
					background: 'none'
				});
		
				users = document.getElementById( 'Rail' ).getElementsByClassName( userGroup );
				for ( i = 0; i < users.length; i++ ) {
					if ( users[i].nodeName === 'LI' ) {
						logo = document.createElement( 'img' );
						logo.alt = 'This user is a ' + userGroup;
						logo.src = newGraphics[userGroup];
						logo.className = 'logo ' + userGroup;
						
						users[i].getElementsByClassName( 'username' )[0].appendChild( logo );
					}
				}
			}
	
			this.appendStyle( 'img.logo', {
				border: '0 none',
				margin: '1px 1px 0 96px',
				height: '20px',
				width: '20px'
			});	

		}
	};
}( mediaWiki ) );
// </syntaxhighlight>