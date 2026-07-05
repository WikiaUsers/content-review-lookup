/* fusion-search.js
 * Client for the fusion-tree search widget.
 *
 * Server side (Module:FusionSearch) emits, per .fusion-search-app:
 *   data-familiars            : JSON array of { id, name } for every familiar
 *   data-materials            : JSON array of { id, name } for every material
 *                               (both drive suggestions + name->id resolution)
 *   .fusion-search-controls   : reserved-height box containing a no-JS
 *                               fallback line; we remove the fallback and
 *                               inject the input + <datalist> + Search button
 *   .fusion-search-result     : empty; we inject the rendered tree
 *
 * On search we resolve the typed value CLIENT-SIDE to a { type, id } pair --
 * exact name (familiars, then materials), then prefix. If it doesn't resolve we
 * show "not found" with no network call. If it does, we ask the parse API to run
 *   {{#invoke:FusionTable|render|<id>|<type>}}
 * and inject the returned HTML. A familiar renders a tree + shopping list;
 * a material renders only its "Used In" table (materials have no recipe).
 * Both id and type are validated (numeric id; type whitelisted) before use, and
 * both come from our own data, so there's no wikitext-injection surface.
 * Module:FusionTable stays the one and only renderer.
 *
 * Suggestions: the <datalist> starts empty and is refilled on every keystroke
 * with only the matching names (capped), once the user has typed MIN_CHARS.
 * Familiars are listed first, then materials, and each <option> carries a
 * `label` naming its category. Native datalists ignore <optgroup>, so ordering +
 * label is the most separation a native control allows. Population is
 * synchronous on the 'input' event -- a native datalist decides whether to open
 * its popup at keystroke time, so options must already be present then.
 *
 * Install: test via Special:MyPage/common.js; production via MediaWiki:Common.js
 * (requires custom-JS enablement + JS review; desktop skin only).
 */
( function () {
	'use strict';

	var MIN_CHARS = 3;          // don't suggest until this many characters typed
	var MAX_SUGGESTIONS = 10;   // cap the dropdown length, PER category

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

		// Materials are optional: if absent or malformed, degrade to familiars-only
		// rather than breaking the whole widget.
		var materials;
		try {
			materials = JSON.parse( app.getAttribute( 'data-materials' ) || '[]' );
		} catch ( e ) {
			materials = [];
		}

		// Index each book by lower-cased name -> { type, id, name } for exact
		// resolution. Familiars take precedence on a (rare) name clash.
		function indexByName( list, type ) {
			var map = {};
			list.forEach( function ( r ) {
				if ( r && r.name ) {
					map[ r.name.toLowerCase() ] = { type: type, id: r.id, name: r.name };
				}
			} );
			return map;
		}
		var byNameFam = indexByName( familiars, 'familiar' );
		var byNameMat = indexByName( materials, 'material' );

		// Build controls: input + native datalist + Search button.
		var listId = 'fs-list-' + Math.random().toString( 36 ).slice( 2 );

		var datalist = document.createElement( 'datalist' );
		datalist.id = listId;
		// Starts empty; options are injected on input by refreshSuggestions().

		var input = document.createElement( 'input' );
		input.type = 'text';
		input.className = 'fusion-search-input';
		input.setAttribute( 'list', listId );
		input.setAttribute( 'placeholder', 'Search a familiar or material\u2026' );

		var button = document.createElement( 'button' );
		button.type = 'button';
		button.className = 'fusion-search-button';
		button.textContent = 'Search';

		controls.appendChild( input );
		controls.appendChild( document.createTextNode( ' ' ) );
		controls.appendChild( button );
		controls.appendChild( datalist );

		// Append up to MAX_SUGGESTIONS substring matches from one list, tagging
		// each option with a category label. Capped per-list so both familiars
		// and materials can appear even when one group has many matches.
		function appendMatches( list, key, typeLabel ) {
			var shown = 0;
			for ( var i = 0; i < list.length && shown < MAX_SUGGESTIONS; i++ ) {
				var name = list[ i ].name || '';
				if ( name.toLowerCase().indexOf( key ) !== -1 ) {   // substring match
					var opt = document.createElement( 'option' );
					opt.value = name;
					opt.label = typeLabel;   // category hint (shown where supported)
					datalist.appendChild( opt );
					shown++;
				}
			}
		}

		// Refill the datalist once at least MIN_CHARS have been typed: familiars
		// first, then materials. Below the threshold it's left empty (no popup).
		function refreshSuggestions() {
			var key = input.value.trim().toLowerCase();

			while ( datalist.firstChild ) {
				datalist.removeChild( datalist.firstChild );
			}

			if ( key.length < MIN_CHARS ) {
				return;
			}

			appendMatches( familiars, key, 'Familiar' );
			appendMatches( materials, key, 'Material' );
		}

		function prefixHit( list, key, type ) {
			for ( var i = 0; i < list.length; i++ ) {
				var n = ( list[ i ].name || '' ).toLowerCase();
				if ( n.indexOf( key ) === 0 ) {
					return { type: type, id: list[ i ].id, name: list[ i ].name };
				}
			}
			return null;
		}

		function resolve( value ) {
			if ( !value ) {
				return null;
			}
			var key = value.trim().toLowerCase();
			if ( !key ) {
				return null;
			}
			if ( byNameFam[ key ] ) {
				return byNameFam[ key ];             // exact familiar (wins on clash)
			}
			if ( byNameMat[ key ] ) {
				return byNameMat[ key ];             // exact material
			}
			var hit = prefixHit( familiars, key, 'familiar' );   // prefix: familiars first
			if ( hit ) {
				return hit;
			}
			return prefixHit( materials, key, 'material' );
		}

		function search() {
			var rec = resolve( input.value );
			if ( !rec ) {
				msg( result, 'Nothing found matching "' + input.value + '".', 'fusion-search-notfound' );
				return;
			}
			// id is from our own data; require it to be numeric before use.
			var id = String( rec.id );
			if ( !/^\d+$/.test( id ) ) {
				msg( result, 'That entry has an invalid id.', 'fusion-search-error' );
				return;
			}
			// type is whitelisted -- only these two reach the invoke.
			var type = ( rec.type === 'material' ) ? 'material' : 'familiar';
			renderResult( id, type );
		}

		function renderResult( id, type ) {
			msg( result, ( type === 'material' ? 'Loading\u2026' : 'Loading fusion tree\u2026' ),
				'fusion-search-loading' );

			if ( !( window.mw && mw.loader && mw.loader.using ) ) {
				msg( result, 'MediaWiki JS API is unavailable on this page.', 'fusion-search-error' );
				return;
			}

			mw.loader.using( [ 'mediawiki.api' ] ).then( function () {
				return new mw.Api().parse(
					'{{#invoke:FusionTable|render|' + id + '|' + type + '}}',
					{ disablelimitreport: 1 }
				);
			} ).then( function ( html ) {
				// mw.Api().parse resolves with the HTML string; coerce defensively.
				if ( html && typeof html === 'object' ) {
					html = ( html.parse && html.parse.text &&
						( html.parse.text[ '*' ] || html.parse.text ) ) || '';
				}
				if ( !html ) {
					msg( result, 'The result came back empty (is Module:FusionTable installed?).', 'fusion-search-error' );
					return;
				}
				result.innerHTML = String( html );

				// The injected content is taller than the empty result box, so nudge
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
				msg( result, 'Could not load the result: ' + ( detail || 'unknown error' ) + '.', 'fusion-search-error' );
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