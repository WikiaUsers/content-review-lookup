/* fusion-search.js
 * Client for the fusion-tree search widget.
 *
 * Server side (Module:FusionSearch) emits, per .fusion-search-app:
 *   data-familiars            : JSON array of { id, name } for every familiar
 *                               (drives suggestions + name->id resolution)
 *   .fusion-search-controls   : reserved-height box containing a no-JS
 *                               fallback line; we remove the fallback and
 *                               inject the input + <datalist> + Search button
 *   .fusion-search-result     : empty; we inject the rendered tree
 *
 * On search we resolve the typed value to a familiar id CLIENT-SIDE (exact
 * name, then prefix). If it doesn't resolve, we show "not found" with no
 * network call. If it does, we ask the parse API to run
 *   {{#invoke:FusionTable|render|<id>}}
 * and inject the returned HTML. The id is numeric and comes from our own
 * data, so there is no wikitext-injection surface. Module:FusionTable stays
 * the one and only tree renderer.
 *
 * Suggestions: the <datalist> starts empty and is refilled on every keystroke
 * with only the matching names (capped), and only once the user has typed
 * MIN_CHARS. Population is synchronous on the 'input' event -- a native
 * datalist decides whether to open its popup at keystroke time, so options
 * must already be present then; deferring them (e.g. via debounce) makes the
 * popup lag a keystroke or not appear at all. The list is small, so filtering
 * every keystroke is cheap.
 *
 * Install: test via Special:MyPage/common.js; production via MediaWiki:Common.js
 * (requires custom-JS enablement + JS review; desktop skin only).
 */
( function () {
	'use strict';

	var MIN_CHARS = 3;          // don't suggest until this many characters typed
	var MAX_SUGGESTIONS = 10;   // cap the dropdown length

	function init( content ) {
		var root = ( content && content[ 0 ] ) || document;
		var apps = root.querySelectorAll( '.fusion-search-app' );
		Array.prototype.forEach.call( apps, function ( app ) {
			if ( app.getAttribute( 'data-fs-init' ) ) {
				return;                       // guard against double-init
			}
			app.setAttribute( 'data-fs-init', '1' );
			setupApp( app );
		} );
	}

	function msg( container, text, cls ) {
		container.innerHTML = '';
		var div = document.createElement( 'div' );
		div.className = 'fusion-search-msg' + ( cls ? ' ' + cls : '' );
		div.textContent = text;
		container.appendChild( div );
	}

	function setupApp( app ) {
		var controls = app.querySelector( '.fusion-search-controls' );
		var result = app.querySelector( '.fusion-search-result' );
		if ( !controls || !result ) {
			return;
		}

		// JS is running, so drop the no-JS fallback line.
		var fallback = app.querySelector( '.fusion-search-fallback' );
		if ( fallback && fallback.parentNode ) {
			fallback.parentNode.removeChild( fallback );
		}

		var familiars;
		try {
			familiars = JSON.parse( app.getAttribute( 'data-familiars' ) || '[]' );
		} catch ( e ) {
			msg( result, 'Could not load the familiar list (malformed data).', 'fusion-search-error' );
			return;
		}

		// Index by lower-cased name for exact resolution.
		var byName = {};
		familiars.forEach( function ( f ) {
			if ( f && f.name ) {
				byName[ f.name.toLowerCase() ] = f;
			}
		} );

		// Build controls: input + native datalist + Search button.
		var listId = 'fs-list-' + Math.random().toString( 36 ).slice( 2 );

		var datalist = document.createElement( 'datalist' );
		datalist.id = listId;
		// Starts empty; options are injected on input by refreshSuggestions().

		var input = document.createElement( 'input' );
		input.type = 'text';
		input.className = 'fusion-search-input';
		input.setAttribute( 'list', listId );
		input.setAttribute( 'placeholder', 'Search a familiar\u2026' );

		var button = document.createElement( 'button' );
		button.type = 'button';
		button.className = 'fusion-search-button';
		button.textContent = 'Search';

		controls.appendChild( input );
		controls.appendChild( document.createTextNode( ' ' ) );
		controls.appendChild( button );
		controls.appendChild( datalist );

		// Refill the datalist with up to MAX_SUGGESTIONS names matching the
		// current input, once at least MIN_CHARS have been typed. Below the
		// threshold the list is left empty so no dropdown shows.
		function refreshSuggestions() {
			var key = input.value.trim().toLowerCase();

			while ( datalist.firstChild ) {
				datalist.removeChild( datalist.firstChild );
			}

			if ( key.length < MIN_CHARS ) {
				return;
			}

			var shown = 0;
			for ( var i = 0; i < familiars.length && shown < MAX_SUGGESTIONS; i++ ) {
				var name = familiars[ i ].name || '';
				if ( name.toLowerCase().indexOf( key ) !== -1 ) {   // substring match
					var opt = document.createElement( 'option' );
					opt.value = name;
					datalist.appendChild( opt );
					shown++;
				}
			}
		}

		function resolve( value ) {
			if ( !value ) {
				return null;
			}
			var key = value.trim().toLowerCase();
			if ( !key ) {
				return null;
			}
			if ( byName[ key ] ) {
				return byName[ key ];            // exact (case-insensitive)
			}
			for ( var i = 0; i < familiars.length; i++ ) {   // prefix fallback
				var n = ( familiars[ i ].name || '' ).toLowerCase();
				if ( n.indexOf( key ) === 0 ) {
					return familiars[ i ];
				}
			}
			return null;
		}

		function search() {
			var rec = resolve( input.value );
			if ( !rec ) {
				msg( result, 'No familiar found matching "' + input.value + '".', 'fusion-search-notfound' );
				return;
			}
			// id is from our own data; require it to be numeric before use.
			var id = String( rec.id );
			if ( !/^\d+$/.test( id ) ) {
				msg( result, 'That familiar has an invalid id.', 'fusion-search-error' );
				return;
			}
			renderTree( id );
		}

		function renderTree( id ) {
			msg( result, 'Loading fusion tree\u2026', 'fusion-search-loading' );

			if ( !( window.mw && mw.loader && mw.loader.using ) ) {
				msg( result, 'MediaWiki JS API is unavailable on this page.', 'fusion-search-error' );
				return;
			}

			mw.loader.using( [ 'mediawiki.api' ] ).then( function () {
				return new mw.Api().parse(
					'{{#invoke:FusionTable|render|' + id + '}}',
					{ disablelimitreport: 1 }
				);
			} ).then( function ( html ) {
				// mw.Api().parse resolves with the HTML string; coerce defensively.
				if ( html && typeof html === 'object' ) {
					html = ( html.parse && html.parse.text &&
						( html.parse.text[ '*' ] || html.parse.text ) ) || '';
				}
				if ( !html ) {
					msg( result, 'The fusion tree came back empty (is Module:FusionTable installed?).', 'fusion-search-error' );
					return;
				}
				result.innerHTML = String( html );

				// The injected tree is taller than the empty result box, so nudge
				// any height-managing gadget (e.g. Collapse Header) to re-measure.
				if ( window.requestAnimationFrame ) {
					requestAnimationFrame( function () {
						window.dispatchEvent( new Event( 'resize' ) );
					} );
				}

				// Let MediaWiki post-process the injected content (links, etc.).
				if ( window.jQuery && mw.hook ) {
					mw.hook( 'wikipage.content' ).fire( jQuery( result ) );
				}
			} ).catch( function ( code, res ) {
				// mw.Api rejects with (errorCode, details); show whatever we got.
				var detail = code;
				if ( res && res.error && res.error.info ) {
					detail = res.error.info;
				} else if ( code && code.message ) {
					detail = code.message;
				}
				msg( result, 'Could not load the fusion tree: ' + ( detail || 'unknown error' ) + '.', 'fusion-search-error' );
			} );
		}

		button.addEventListener( 'click', search );
		input.addEventListener( 'input', refreshSuggestions );   // synchronous: see header note
		input.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Enter' || e.keyCode === 13 ) {
				e.preventDefault();
				search();
			}
		} );
	}

	// Bind via the MediaWiki content hook, with a DOM-ready fallback.
	if ( window.mw && mw.hook ) {
		mw.hook( 'wikipage.content' ).add( function ( $content ) {
			init( $content );
		} );
	} else if ( document.readyState !== 'loading' ) {
		init( [ document ] );
	} else {
		document.addEventListener( 'DOMContentLoaded', function () {
			init( [ document ] );
		} );
	}
}() );