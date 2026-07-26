/* EventRewards.js
 * Client for the event-reward table widget.
 *
 * Server side (Module:EventRewards|app) emits, per .event-rewards-app:
 *   data-tiers                 : JSON array of the tiers that have a data module
 *                                (from Module:EventRewardsData, the manifest);
 *                                falls back to the tiers named in EVENTS
 *   .event-rewards-controls    : reserved-height box holding a no-JS fallback
 *                                line; we remove it and inject the selects +
 *                                Search button (the sanitizer strips form
 *                                controls from wikitext, so they must be built
 *                                here)
 *   .event-rewards-result      : empty; we inject the rendered table
 *
 * WHERE THE DATA COMES FROM
 * Each tier is its own Lua module (Module:EventRewardsData/T10) because the
 * whole book is ~3.5 MB, over MediaWiki's 2 MB per-page publish limit. JS cannot
 * mw.loadData, so Module:EventRewards|json is the bridge: we hand it the tier
 * and the exact reward links we want and it returns just those columns as JSON.
 * That keeps the response ~2 KB instead of shipping a whole tier.
 *
 * We call action=expandtemplates, NOT action=parse: expandtemplates returns the
 * module's return value verbatim, while parse would wrap the JSON in <p> tags
 * and entity-escape its quotes.
 *
 * WHAT LIVES WHERE
 * The Lua modules hold the relation only -- one record per reward link, bands
 * flattened, nothing combined. Everything below the fetch is this file's job:
 * cutting the row axis into segments, choosing headers, labelling rows,
 * ordering them. That is deliberate -- which links form a table changes week to
 * week, so EVENTS below is the config you edit, not the data modules.
 *
 * Install: test via Special:MyPage/common.js; production via MediaWiki:Common.js
 * (requires custom-JS enablement + JS review; desktop skin only).
 */
( function () {
	'use strict';

	/* ---- config: the per-event column lists (edit this weekly) ---------- */
	/* An event names, per table type, the reward links that make up that table,
	 * in column order. These are exactly the keys of the tier data modules. */
	var EVENTS = {
		pvp: {
			label: 'PvP',
			tiers: [ 10 ],
			points: [
				'points_column1_t21_pvp_chests',
				'points_column2_t21_pvp_gearChests',
				'points_column3_t21_pvp_legendaryMaterial',
				'points_column4_t21_pvp_gems',
				'points_column5_t21_pvp_fusionMaterial'
			],
			rank: []
		}
	};

	/* How each table type reads. This is the display config that was
	 * deliberately kept OUT of the Lua modules. */
	var TYPES = {
		points: { label: 'Point Rewards', rowHeader: 'Points', order: 'desc', openTop: true },
		rank: { label: 'Rank Rewards', rowHeader: 'Rank', order: 'asc', openTop: false }
	};

	var BRIDGE_MODULE = 'EventRewards';   // {{#invoke:EventRewards|json|<tier>|<links>}}
	var OPEN_SUFFIX = '+';                // top points band has no ceiling
	var RANGE_SEP = ' - ';

	var cache = {};                       // "tier|link,link" -> columns array

	/* ================================================================== */
	/* Pure logic -- no DOM, no network. Ported from the Python generator   */
	/* (format_leaderboard_rewards.py), which stays the reference.          */
	/* ================================================================== */

	/* A band's upper bound. `max` is omitted in the data when it equals `min`
	 * (a bare threshold like 240000), so it defaults back to min. */
	function bandMax( band ) {
		return ( band.max === undefined || band.max === null ) ? band.min : band.max;
	}

	/* `qty` is omitted in the data when it is 1. */
	function bandQty( band ) {
		return ( band.qty === undefined || band.qty === null ) ? 1 : band.qty;
	}

	function covers( band, seg ) {
		return band.min <= seg[ 0 ] && seg[ 1 ] <= bandMax( band );
	}

	/* Cut the row axis at every band boundary across ALL columns, so columns
	 * banded differently still line up. Columns banded identically (the usual
	 * case) come out as their own bands. */
	function segments( columns ) {
		var points = {};
		columns.forEach( function ( col ) {
			( col.bands || [] ).forEach( function ( band ) {
				points[ band.min ] = true;
				points[ bandMax( band ) + 1 ] = true;
			} );
		} );

		var edges = Object.keys( points ).map( Number ).sort( function ( a, b ) {
			return a - b;
		} );

		var segs = [];
		for ( var i = 0; i < edges.length - 1; i++ ) {
			var seg = [ edges[ i ], edges[ i + 1 ] - 1 ];
			var covered = columns.some( function ( col ) {
				return ( col.bands || [] ).some( function ( band ) {
					return covers( band, seg );
				} );
			} );
			if ( covered ) {
				segs.push( seg );
			}
		}
		return segs;
	}

	/* A column awarding the same pool in every band carries `header` (the pool
	 * link); its cells then hold bare quantities. One whose pool varies has no
	 * header, so it is titled by its short name and each cell names its pool. */
	function headerOf( col ) {
		return col.header || col.name || col.link;
	}

	/* ALL bands covering the segment, not just the first: a band awarding
	 * several pools is stored as one row per pool with identical bounds. */
	function cellParts( col, seg ) {
		var out = [];
		( col.bands || [] ).forEach( function ( band ) {
			if ( !covers( band, seg ) ) {
				return;
			}
			var qty = bandQty( band );
			if ( col.header ) {
				out.push( String( qty ) );                       // header names the pool
			} else {
				out.push( band.link + ( qty > 1 ? ' x' + qty : '' ) );
			}
		} );
		return out;
	}

	function rowLabel( seg, topMax, openTop ) {
		if ( openTop && seg[ 1 ] === topMax ) {
			return seg[ 0 ] + OPEN_SUFFIX;
		}
		if ( seg[ 0 ] === seg[ 1 ] ) {
			return String( seg[ 0 ] );
		}
		return seg[ 0 ] + RANGE_SEP + seg[ 1 ];
	}

	/* columns + type meta -> { headers, rows: [ { label, cells: [ [part,...] ] } ] }
	 * Kept separate from the DOM so it can be diffed against the Python output. */
	function tableModel( columns, meta ) {
		var live = columns.filter( function ( col ) {
			return col && col.bands && col.bands.length;
		} );
		if ( !live.length ) {
			return null;
		}

		var segs = segments( live );
		var topMax = 0;
		live.forEach( function ( col ) {
			col.bands.forEach( function ( band ) {
				topMax = Math.max( topMax, bandMax( band ) );
			} );
		} );

		if ( meta.order === 'desc' ) {
			segs.reverse();
		}

		return {
			headers: live.map( headerOf ),
			// A column headed by its pool link holds bare numbers, so the cells
			// get a class the CSS right-aligns in monospace.
			qtyOnly: live.map( function ( col ) {
				return !!col.header;
			} ),
			rows: segs.map( function ( seg ) {
				return {
					label: rowLabel( seg, topMax, meta.openTop ),
					cells: live.map( function ( col ) {
						return cellParts( col, seg );
					} )
				};
			} )
		};
	}

	/* ================================================================== */
	/* DOM                                                                 */
	/* ================================================================== */

	function msg( container, text, cls ) {
		container.innerHTML = '';
		var div = document.createElement( 'div' );
		div.className = 'event-rewards-msg' + ( cls ? ' ' + cls : '' );
		div.textContent = text;
		container.appendChild( div );
	}

	/* Cells are built as text nodes (never innerHTML): a multi-pool band puts
	 * two values in one cell, separated by a <br>. */
	function fillCell( td, parts ) {
		parts.forEach( function ( part, i ) {
			if ( i ) {
				td.appendChild( document.createElement( 'br' ) );
			}
			td.appendChild( document.createTextNode( part ) );
		} );
	}

	function renderTable( model, caption, rowHeader ) {
		var table = document.createElement( 'table' );
		table.className = 'event-rewards-table';

		if ( caption ) {
			var cap = document.createElement( 'caption' );
			cap.textContent = caption;
			table.appendChild( cap );
		}

		var thead = document.createElement( 'thead' );
		var htr = document.createElement( 'tr' );
		[ rowHeader ].concat( model.headers ).forEach( function ( text ) {
			var th = document.createElement( 'th' );
			th.scope = 'col';
			th.textContent = text;
			htr.appendChild( th );
		} );
		thead.appendChild( htr );
		table.appendChild( thead );

		var tbody = document.createElement( 'tbody' );
		model.rows.forEach( function ( row ) {
			var tr = document.createElement( 'tr' );
			var th = document.createElement( 'th' );
			th.scope = 'row';
			th.textContent = row.label;
			tr.appendChild( th );
			row.cells.forEach( function ( parts, i ) {
				var td = document.createElement( 'td' );
				if ( model.qtyOnly[ i ] ) {
					td.className = 'event-rewards-qty';
				}
				fillCell( td, parts );
				tr.appendChild( td );
			} );
			tbody.appendChild( tr );
		} );
		table.appendChild( tbody );
		return table;
	}

	/* ================================================================== */
	/* Data access                                                         */
	/* ================================================================== */

	/* Ask the bridge module for exactly the links we need at this tier.
	 * Resolves with an array of column records, in the order requested. */
	function fetchColumns( tier, links ) {
		var key = tier + '|' + links.join( ',' );
		if ( cache[ key ] ) {
			return Promise.resolve( cache[ key ] );
		}
		if ( !( window.mw && mw.loader && mw.loader.using ) ) {
			return Promise.reject( new Error( 'MediaWiki JS API is unavailable on this page.' ) );
		}

		var wikitext = '{{#invoke:' + BRIDGE_MODULE + '|json|' + tier + '|' +
			links.join( ',' ) + '}}';

		return mw.loader.using( [ 'mediawiki.api' ] ).then( function () {
			return new mw.Api().get( {
				action: 'expandtemplates',
				text: wikitext,
				prop: 'wikitext',
				formatversion: 2
			} );
		} ).then( function ( res ) {
			var et = res && res.expandtemplates;
			// formatversion 2 -> .wikitext ; formatversion 1 -> ['*']
			var raw = et && ( et.wikitext || et[ '*' ] );
			if ( !raw ) {
				throw new Error( 'The data request came back empty (is Module:' +
					BRIDGE_MODULE + ' installed?).' );
			}
			var data = JSON.parse( raw );
			if ( data && data.error ) {
				throw new Error( data.error );
			}
			var cols = [];
			links.forEach( function ( link ) {
				if ( data[ link ] ) {
					cols.push( data[ link ] );
				}
			} );
			if ( !cols.length ) {
				throw new Error( 'No reward data for tier ' + tier +
					' (check the link names in EVENTS).' );
			}
			cache[ key ] = cols;
			return cols;
		} );
	}

	/* ================================================================== */
	/* Wiring                                                              */
	/* ================================================================== */

	function option( value, text ) {
		var o = document.createElement( 'option' );
		o.value = String( value );
		o.textContent = text;
		return o;
	}

	function labelled( text, control ) {
		var wrap = document.createElement( 'label' );
		wrap.className = 'event-rewards-field';
		var span = document.createElement( 'span' );
		span.className = 'event-rewards-field-label';
		span.textContent = text;
		wrap.appendChild( span );
		wrap.appendChild( control );
		return wrap;
	}

	function setupApp( app ) {
		var controls = app.querySelector( '.event-rewards-controls' );
		var result = app.querySelector( '.event-rewards-result' );
		if ( !controls || !result ) {
			return;
		}

		// JS is running, so drop the no-JS fallback line.
		var fallback = app.querySelector( '.event-rewards-fallback' );
		if ( fallback && fallback.parentNode ) {
			fallback.parentNode.removeChild( fallback );
		}

		// Tiers that actually have a data module, published by the shell from the
		// manifest. If it's missing or malformed we fall back to the event's own
		// list rather than breaking the widget.
		var tiers;
		try {
			tiers = JSON.parse( app.getAttribute( 'data-tiers' ) || '[]' );
		} catch ( e ) {
			tiers = [];
		}

		var eventSelect = document.createElement( 'select' );
		eventSelect.className = 'event-rewards-select';
		Object.keys( EVENTS ).forEach( function ( key ) {
			eventSelect.appendChild( option( key, EVENTS[ key ].label || key ) );
		} );

		var typeSelect = document.createElement( 'select' );
		typeSelect.className = 'event-rewards-select';

		var tierSelect = document.createElement( 'select' );
		tierSelect.className = 'event-rewards-select';

		var button = document.createElement( 'button' );
		button.type = 'button';
		button.className = 'event-rewards-button';
		button.textContent = 'Search';

		controls.appendChild( labelled( 'Event', eventSelect ) );
		controls.appendChild( labelled( 'Table', typeSelect ) );
		controls.appendChild( labelled( 'Tier', tierSelect ) );
		controls.appendChild( button );

		// Only offer the table types this event actually defines, and only the
		// tiers it names that also have a data module.
		function refreshForEvent() {
			var cfg = EVENTS[ eventSelect.value ] || {};

			typeSelect.innerHTML = '';
			Object.keys( TYPES ).forEach( function ( kind ) {
				if ( cfg[ kind ] && cfg[ kind ].length ) {
					typeSelect.appendChild( option( kind, TYPES[ kind ].label ) );
				}
			} );

			tierSelect.innerHTML = '';
			( cfg.tiers || [] ).forEach( function ( t ) {
				if ( !tiers.length || tiers.indexOf( t ) !== -1 ) {
					tierSelect.appendChild( option( t, 'Tier ' + t ) );
				}
			} );
		}

		function search() {
			var eventKey = eventSelect.value;
			var kind = typeSelect.value;
			var tier = tierSelect.value;
			var cfg = EVENTS[ eventKey ] || {};
			var links = cfg[ kind ] || [];
			var meta = TYPES[ kind ];

			if ( !links.length || !meta ) {
				msg( result, 'That event has no ' + kind + ' table configured.',
					'event-rewards-notfound' );
				return;
			}
			if ( !/^\d+$/.test( String( tier ) ) ) {
				msg( result, 'Pick a tier first.', 'event-rewards-notfound' );
				return;
			}

			msg( result, 'Loading\u2026', 'event-rewards-loading' );

			fetchColumns( tier, links ).then( function ( columns ) {
				var model = tableModel( columns, meta );
				if ( !model ) {
					msg( result, 'No bands for tier ' + tier + '.', 'event-rewards-notfound' );
					return;
				}
				var caption = ( cfg.label || eventKey ) + ' \u2014 ' + meta.label +
					' (Tier ' + tier + ')';
				result.innerHTML = '';
				result.appendChild( renderTable( model, caption, meta.rowHeader ) );

				// The injected table is taller than the empty result box, so nudge
				// any height-managing gadget (e.g. Collapse Header) to re-measure.
				if ( window.requestAnimationFrame ) {
					requestAnimationFrame( function () {
						window.dispatchEvent( new Event( 'resize' ) );
					} );
				}
			} ).catch( function ( err ) {
				var detail = String( ( err && err.message ) || err || 'unknown error' );
				if ( !/[.!?]$/.test( detail ) ) {
					detail += '.';
				}
				msg( result, 'Could not load the table: ' + detail,
					'event-rewards-error' );
			} );
		}

		eventSelect.addEventListener( 'change', refreshForEvent );
		button.addEventListener( 'click', search );
		refreshForEvent();
	}

	function init( content ) {
		var root = ( content && content[ 0 ] ) || document;
		var apps = root.querySelectorAll( '.event-rewards-app' );
		Array.prototype.forEach.call( apps, function ( app ) {
			if ( app.getAttribute( 'data-er-init' ) ) {
				return;                       // guard against double-init
			}
			app.setAttribute( 'data-er-init', '1' );
			setupApp( app );
		} );
	}

	// Exposed for debugging on-wiki and for the offline test harness that diffs
	// the model against the Python generator's output.
	if ( window.mw ) {
		mw.libs = mw.libs || {};
		mw.libs.eventRewards = {
			segments: segments,
			tableModel: tableModel,
			EVENTS: EVENTS,
			TYPES: TYPES
		};
	}
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = { segments: segments, tableModel: tableModel, TYPES: TYPES };
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