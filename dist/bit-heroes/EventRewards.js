/* Event reward tables.
 *
 * The wiki page emits an inert shell ({{#invoke:EventRewards|app}}); this file
 * builds the controls, asks Module:EventRewards|json for exactly the reward
 * links it needs at the chosen tier, and renders the tables client-side.
 *
 * Two axes, and they are NOT the same axis:
 *   POINTS rewards belong to the EVENT   -- fixed, never rotate.
 *   RANK   rewards belong to the WEEK    -- every event running that week hands
 *                                           out the same rank table.
 * Event + Week + Tier together determine both tables, so there is no table-type
 * choice to make: a search renders the rank table then the points table.
 *
 * The two axes are independent in CONTENT but not in AVAILABILITY: an event
 * only runs in some of the twelve weeks (see `weeks` in EVENTS). That restricts
 * which weeks the dropdown offers; it never changes what a week's rank table
 * contains, because the table still belongs to the week.
 *
 * Loading: this page does not auto-execute. It runs from MediaWiki:Common.js or
 * User:<name>/common.js, or via an explicit mw.loader.load. Desktop only.
 */
( function () {
	'use strict';

	/* ================================================================== */
	/* Config                                                              */
	/* ================================================================== */

	/* Every event runs T1..T21. The shell's data-tiers (from the manifest) is
	 * intersected with this, so a tier with no published module drops out. */
	var ALL_TIERS = [];
	for ( var t = 1; t <= 21; t++ ) {
		ALL_TIERS.push( t );
	}

	/* Point columns are the same five slots in every mode, so the link list is
	 * built from the mode string. NOTE: the `t21` in the link is PART OF THE
	 * NAME, not the tier -- the tier is the module, so one list serves all 21. */
	function pointCols( mode, names ) {
		return names.map( function ( name, i ) {
			return 'points_column' + ( i + 1 ) + '_t21_' + mode + '_' + name;
		} );
	}

	var STANDARD_COLS =
		[ 'chests', 'gearChests', 'legendaryMaterial', 'gems', 'fusionMaterial' ];
	var GVG_COLS =
		[ 'chests', 'goldCoins', 'silverCoins', 'gems', 'gold' ];

	/* `mode` is the token inside the link, which does NOT always match the
	 * event's display name: Expedition is `gve`, and Trials/Gauntlet is `tg`.
	 *
	 * `weeks` is the OPTIONAL list of weeks this event runs in. Each token is a
	 * week KEY or a whole FAMILY (see weeksFor). Omit it and the event runs in
	 * every week. It is a whitelist of availability only: it never carries rank
	 * links, because the rank table belongs to the week.
	 *
	 * Five of the six events share one list -- every week except Mount -- and
	 * GvG is the sole event running Mount and nothing else. */
	var ALL_BUT_MOUNT = [ 'rune', 'augment', 'mysteryPet', 'mysteryAccessory' ];

	var EVENTS = {
		pvp: {
			label: 'PvP',
			tiers: ALL_TIERS,
			weeks: ALL_BUT_MOUNT,
			points: pointCols( 'pvp', STANDARD_COLS )
		},
		gvg: {
			label: 'GvG',
			tiers: ALL_TIERS,
			weeks: [ 'mount' ],
			points: pointCols( 'gvg', GVG_COLS )
		},
		invasion: {
			label: 'Invasion',
			tiers: ALL_TIERS,
			weeks: [ 'rune' ],
			points: pointCols( 'invasion', STANDARD_COLS )
		},
		expedition: {
			label: 'Expedition',
			tiers: ALL_TIERS,
			weeks: [ 'augment' ],
			points: pointCols( 'gve', STANDARD_COLS )
		},
		tg: {
			// ONE event in game under two community names, always said
			// Trials-first -- which is also what the `tg` mode token and the
			// T/G abbreviation are. It was two entries whose only difference
			// was the caption: same points table (byte-identical), same weeks,
			// same tiers. Merged, so the widget stops implying a choice that
			// changes nothing.
			label: 'Trials / Gauntlet',
			// Table captions use `short` when present: the dropdown has room to
			// spell both names out, a caption reads better as the in-game
			// abbreviation.
			short: 'T/G',
			tiers: ALL_TIERS,
			weeks: ALL_BUT_MOUNT,
			points: pointCols( 'tg', STANDARD_COLS )
		}
	};

	/* RANK REWARDS ARE PER WEEK, NOT PER EVENT. PvP and Invasion running in the
	 * same week hand out the same rank table, so the event is not part of this
	 * choice at all -- only the week and the tier are.
	 *
	 * These links are off the <kind>_column<N>_t<NN>_<mode>_<name> pattern, so
	 * the generator emits them with the full link as the name and lists them in
	 * its "off the naming pattern" report. That is expected -- nothing here
	 * relies on the name being parsed. */
	/* Every week falls into one of three FAMILIES, and only COLUMN 1 -- the
	 * headline prize -- varies within a family. Columns 3-5 are fixed per family
	 * and column 2 is the same legendary material in all twelve weeks, so a week is
	 * fully described by (family, prize). */
	var RANK_TAILS = {
		rune: [ 't21_ancientFragment', 't21_elementalFragment', 't21_runeFragment' ],
		augment: [ 't21_materials_regulators', 't21_materials_brainstem',
			't21_materials_micronchipo' ],
		character: [ 't21_componentCream', 't21_critterJelly', 't21_mountGuts' ]
	};

	function rankCols( family, prize ) {
		return [
			'rank_column1_' + family + '_' + prize + '_t21_2',
			'rank_column2_material_t21_legendary'
		].concat( RANK_TAILS[ family ].map( function ( tail, i ) {
			return 'rank_column' + ( i + 3 ) + '_' + tail;
		} ) );
	}

	/* A week is fully described by (family, prize), so build the record from
	 * those two. `family` is stored on the record because EVENTS whitelists
	 * weeks by family as often as by key -- see weeksFor(). Write an entry
	 * longhand if it ever needs something else, e.g. a short tier range. */
	function week( label, family, prize ) {
		return {
			label: label,
			family: family,
			tiers: ALL_TIERS,
			rank: rankCols( family, prize )
		};
	}

	/* Grouped by family, which is also the dropdown order -- weeksFor() returns
	 * a subset in THIS order, so the Week list never reshuffles between events.
	 * The labels are the community names for these weeks -- they are not stated
	 * anywhere in the XML, they are read off the column-1 prize. */
	var WEEKS = {
		// Runes
		minorRune: week( 'Minor Rune', 'rune', 'minor' ),
		majorRune: week( 'Major Rune', 'rune', 'major' ),
		artifactRune: week( 'Artifact Rune', 'rune', 'artifact' ),
		metaRune: week( 'Meta Rune', 'rune', 'meta' ),
		relicRune: week( 'Relic Rune', 'rune', 'relic' ),

		// Augments
		augmentBone: week( 'Augment Bone', 'augment', 'bone' ),
		augmentPump: week( 'Augment Pump', 'augment', 'pump' ),
		augmentBrain: week( 'Augment Brain', 'augment', 'brain' ),
		augmentChip: week( 'Augment Chip', 'augment', 'chip' ),

		// Character (note the plural prize tokens: pets / accessories / mounts)
		mysteryPet: week( 'Mystery Pet', 'character', 'pets' ),
		mysteryAccessory: week( 'Mystery Accessory', 'character', 'accessories' ),
		mount: week( 'Mount', 'character', 'mounts' )
	};

	/* How each table type reads. This is the display config that was
	 * deliberately kept OUT of the Lua modules. */
	var TYPES = {
		points: { label: 'Point Rewards', rowHeader: 'Points', order: 'desc', openTop: true },
		rank: { label: 'Rank Rewards', rowHeader: 'Rank', order: 'asc', openTop: false }
	};

	/* Render order. Ranks first: they are the week's headline prize and the
	 * shorter table. NOT the key order of TYPES -- state it explicitly. */
	var TABLE_ORDER = [ 'rank', 'points' ];

	var BRIDGE_MODULE = 'EventRewards';   // {{#invoke:EventRewards|json|<tier>|<links>}}
	var OPEN_SUFFIX = '+';                // top points band has no ceiling
	var RANGE_SEP = ' - ';

	var cache = {};                       // "tier|link,link" -> columns array

	/* Which config owns a table type: points -> the event, rank -> the week. */
	function sourceFor( kind, eventKey, weekKey ) {
		return ( kind === 'rank' ? WEEKS[ weekKey ] : EVENTS[ eventKey ] ) || {};
	}

	/* The week keys an event offers, in canonical WEEKS order (never the order
	 * they were written in EVENTS, so the dropdown does not reshuffle between
	 * events). A token is either a week KEY (`mount`) or a FAMILY (`rune`,
	 * meaning every rune week); no `weeks` list at all means every week.
	 *
	 * A family token is a standing subscription, not shorthand for today's
	 * members: add a sixth rune week to WEEKS and every event listing `rune`
	 * picks it up with no edit here. That is the intent -- if an event should
	 * run only SOME runes, list those weeks by key instead.
	 *
	 * A token matching neither is dropped and warned about, so a typo costs one
	 * entry loudly rather than silently narrowing the dropdown. */
	function weeksFor( eventKey ) {
		var tokens = ( EVENTS[ eventKey ] || {} ).weeks;
		if ( !tokens ) {
			return Object.keys( WEEKS );
		}

		var want = {};
		tokens.forEach( function ( token ) {
			if ( WEEKS[ token ] ) {
				want[ token ] = true;
				return;
			}
			var hit = false;
			Object.keys( WEEKS ).forEach( function ( key ) {
				if ( WEEKS[ key ].family === token ) {
					want[ key ] = true;
					hit = true;
				}
			} );
			if ( !hit && window.console ) {
				console.warn( 'EventRewards: event "' + eventKey + '" lists "' + token +
					'", which is neither a week key nor a family; ignoring it.' );
			}
		} );

		return Object.keys( WEEKS ).filter( function ( key ) {
			return want[ key ];
		} );
	}

	/* ================================================================== */
	/* Display names                                                       */
	/* ================================================================== */

	/* Raw links are what the data speaks; these turn them into what a reader
	 * wants. Three rules, tried in order, because your five examples are not
	 * five lookups -- they are three rules:
	 *
	 *   1. WEEK_PRIZE   rank column 1 IS the week's headline prize, so its
	 *                   header is the week's own label. Built from WEEKS, so
	 *                   "Minor Rune" comes from the dropdown and can never
	 *                   drift from it.
	 *   2. LABELS       hand overrides, for names no rule can guess.
	 *   3. prettify()   split, drop the tier noise, title-case.
	 *
	 * Only rule 2 needs maintaining, and only for genuinely irregular pools. */

	/* Reward link (rank column 1) -> week label. */
	var WEEK_PRIZE = {};
	Object.keys( WEEKS ).forEach( function ( key ) {
		WEEK_PRIZE[ WEEKS[ key ].rank[ 0 ] ] = WEEKS[ key ].label;
	} );

	/* Overrides keyed by REWARD LINK (a whole column), for columns whose link
	 * name prettifies into something wrong or useless. Beats every rule below,
	 * including the pool header, so this is the escape hatch when the data's
	 * own names read badly. Note the keyspace: LABELS below is keyed by POOL
	 * link, this by reward link.
	 *
	 *   'rank_column2_material_t21_legendary': 'Familiar Chest',
	 */
	var LINK_LABELS = {};

	var LABELS = {
		crubble: 'Crubble'                 // a proper noun; nothing to split
	};

	/* `minor_legendary` / `minor_epic` / `minor_rare` are one rule, not three:
	 * a pool whose LAST word is a rarity is displayed as just that rarity. The
	 * prize is already named by the column header, so repeating it in every
	 * cell is noise. */
	var RARITIES = [ 'common', 'uncommon', 'rare', 'epic', 'legendary',
		'mythic', 'set' ];

	/* Words the game glues together with no separator: `ancientfragment`,
	 * `goldcoin`, `mythicmaterial`. Split on a known TAIL so all three rune
	 * fragments and both GvG coins are handled by one list instead of six
	 * LABELS entries. Longest tails first so `material` never loses to a
	 * shorter match. */
	var GLUED_TAILS = [ 'fragment', 'material', 'chest', 'shard', 'coin' ];

	function unglue( word ) {
		for ( var i = 0; i < GLUED_TAILS.length; i++ ) {
			var tail = GLUED_TAILS[ i ];
			if ( word.length > tail.length &&
				word.slice( -tail.length ) === tail ) {
				return unglue( word.slice( 0, -tail.length ) ) + ' ' + tail;
			}
		}
		return word;
	}

	function titleCase( text ) {
		return text.replace( /\b[a-z]/g, function ( ch ) {
			return ch.toUpperCase();
		} );
	}

	/* `points_column2_t21_pvp_gearChests` -> `Gear Chests`
	 * `t10_rare_item_chest`               -> `Rare Item Chest`
	 * `ancientfragment`                   -> `Ancient Fragment`
	 * `minor_epic`                        -> `Epic` */
	function prettify( token ) {
		if ( LABELS[ token ] ) {
			return LABELS[ token ];
		}

		// camelCase -> two words, then split on underscores.
		var parts = String( token )
			.replace( /([a-z0-9])([A-Z])/g, '$1 $2' )
			.split( /[_\s]+/ )
			.filter( function ( part ) {
				// Tier noise: `t10`, `t21`, and the bare `2` on rank links.
				return part && !/^t\d+$/i.test( part ) && !/^\d+$/.test( part );
			} );

		if ( !parts.length ) {
			return String( token );
		}

		var last = parts[ parts.length - 1 ].toLowerCase();
		if ( parts.length > 1 && RARITIES.indexOf( last ) !== -1 ) {
			return titleCase( last );
		}

		return titleCase( parts.map( function ( part ) {
			return unglue( part.toLowerCase() );
		} ).join( ' ' ) );
	}

	/* The display function handed to tableModel. `link` is the reward link,
	 * which is what the two link-keyed maps above are keyed on; `token` is
	 * whatever the model was about to print (a pool link, or a column's short
	 * name). `poolHeader` says the token IS the column's pool.
	 *
	 * WEEK_PRIZE is a guess -- "rank column 1 is the week's headline prize" --
	 * and it is only safe when the column has no header. A column WITH a header
	 * awards one pool in every band, so its cells are bare quantities that mean
	 * nothing unless the header names that pool: in the Relic Rune week column 1
	 * is `gold`, and heading a column of 50000s "Relic Rune" would read as
	 * fifty thousand runes. The pool always wins; the caption still says which
	 * week you are looking at. */
	function displayName( token, link, poolHeader ) {
		if ( link && LINK_LABELS[ link ] ) {
			return LINK_LABELS[ link ];
		}
		if ( !poolHeader && link && WEEK_PRIZE[ link ] ) {
			return WEEK_PRIZE[ link ];
		}
		return prettify( token );
	}

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
	function headerOf( col, nameFn ) {
		if ( col.header ) {
			return nameFn( col.header, col.link, true );
		}
		return nameFn( col.name || col.link, col.link, false );
	}

	/* ALL bands covering the segment, not just the first: a band awarding
	 * several pools is stored as one row per pool with identical bounds. */
	function cellParts( col, seg, nameFn ) {
		var out = [];
		( col.bands || [] ).forEach( function ( band ) {
			if ( !covers( band, seg ) ) {
				return;
			}
			var qty = bandQty( band );
			if ( col.header ) {
				out.push( String( qty ) );                       // header names the pool
			} else {
				out.push( nameFn( band.link ) + ( qty > 1 ? ' x' + qty : '' ) );
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
	 * Kept separate from the DOM so it can be diffed against the Python output.
	 *
	 * `nameFn` is OPTIONAL and defaults to the identity: call it with two
	 * arguments and you get raw links out, which is what the Python generator
	 * emits and therefore what the harness diffs. The wiki passes displayName. */
	function tableModel( columns, meta, nameFn ) {
		var name = nameFn || function ( token ) {
			return token;
		};

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
			headers: live.map( function ( col ) {
				return headerOf( col, name );
			} ),
			// A column headed by its pool link holds bare numbers, so the cells
			// get a class the CSS right-aligns in monospace.
			qtyOnly: live.map( function ( col ) {
				return !!col.header;
			} ),
			rows: segs.map( function ( seg ) {
				return {
					label: rowLabel( seg, topMax, meta.openTop ),
					cells: live.map( function ( col ) {
						return cellParts( col, seg, name );
					} )
				};
			} )
		};
	}

	/* ================================================================== */
	/* DOM                                                                 */
	/* ================================================================== */

	function msgEl( text, cls ) {
		var div = document.createElement( 'div' );
		div.className = 'event-rewards-msg' + ( cls ? ' ' + cls : '' );
		div.textContent = text;
		return div;
	}

	/* Replaces the whole result box -- for the loading line and for a failure
	 * that killed both tables. A failure that killed only one is appended
	 * in place, so the surviving table still renders. */
	function msg( container, text, cls ) {
		container.innerHTML = '';
		container.appendChild( msgEl( text, cls ) );
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
	 * Resolves with an array of column records, in the order requested.
	 * Cached per tier|links, so the rank table of every event running the same
	 * week is fetched once, however many events offer that week. */
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
					' (check the link names in EVENTS/WEEKS).' );
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
			// Fail loudly: every silent bail we wrote came back to bite us.
			if ( window.console ) {
				console.warn( 'EventRewards: shell is missing .event-rewards-controls ' +
					'or .event-rewards-result; setup aborted.' );
			}
			return;
		}

		// JS is running, so drop the no-JS fallback line.
		var fallback = app.querySelector( '.event-rewards-fallback' );
		if ( fallback && fallback.parentNode ) {
			fallback.parentNode.removeChild( fallback );
		}

		// Tiers that actually have a data module, published by the shell from the
		// manifest. If it's missing or malformed we fall back to the config's own
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

		// Filled by refreshWeeks() -- the option list depends on the event.
		var weekSelect = document.createElement( 'select' );
		weekSelect.className = 'event-rewards-select';

		var tierSelect = document.createElement( 'select' );
		tierSelect.className = 'event-rewards-select';

		var button = document.createElement( 'button' );
		button.type = 'button';
		button.className = 'event-rewards-button';
		button.textContent = 'Search';

		controls.appendChild( labelled( 'Event', eventSelect ) );
		controls.appendChild( labelled( 'Week', weekSelect ) );
		controls.appendChild( labelled( 'Tier', tierSelect ) );
		controls.appendChild( button );

		/* Only the weeks this event runs in. The selection survives an event
		 * switch when the new event also runs that week; otherwise the browser
		 * lands on the first option, which is the earliest week it does run. */
		function refreshWeeks() {
			var keys = weeksFor( eventSelect.value );
			var keep = weekSelect.value;

			weekSelect.innerHTML = '';
			keys.forEach( function ( key ) {
				weekSelect.appendChild( option( key, WEEKS[ key ].label || key ) );
			} );
			if ( keep && keys.indexOf( keep ) !== -1 ) {
				weekSelect.value = keep;
			}
		}

		/* Only tiers BOTH the event and the week run, and only ones with a
		 * published module. Today every list is T1..T21, so this is a no-op --
		 * it exists so a week that runs a short tier range can't offer a tier
		 * whose rank table doesn't exist. */
		function refreshTiers() {
			var evTiers = ( EVENTS[ eventSelect.value ] || {} ).tiers || ALL_TIERS;
			var wkTiers = ( WEEKS[ weekSelect.value ] || {} ).tiers || ALL_TIERS;
			var keep = tierSelect.value;

			tierSelect.innerHTML = '';
			evTiers.forEach( function ( t ) {
				if ( wkTiers.indexOf( t ) === -1 ) {
					return;
				}
				if ( tiers.length && tiers.indexOf( t ) === -1 ) {
					return;
				}
				tierSelect.appendChild( option( t, 'Tier ' + t ) );
			} );
			if ( keep ) {
				tierSelect.value = keep;      // survives an event/week switch when valid
			}
		}

		/* Weeks first: the tier list is filtered by the week, so it has to be
		 * recomputed against the week we just landed on. */
		function refreshEvent() {
			refreshWeeks();
			refreshTiers();
		}

		/* Both tables, in TABLE_ORDER. Each job carries everything the render
		 * needs, so a job that fails only costs its own table. */
		function jobsFor( tier ) {
			return TABLE_ORDER.map( function ( kind ) {
				var cfg = sourceFor( kind, eventSelect.value, weekSelect.value );
				return {
					kind: kind,
					meta: TYPES[ kind ],
					links: cfg[ kind ] || [],
					// Rank tables are captioned by week, points by event -- naming
					// the event on a rank table would imply it changes the rewards.
					caption: ( cfg.short || cfg.label || '' ) + ' \u2014 ' +
						TYPES[ kind ].label + ' (Tier ' + tier + ')'
				};
			} );
		}

		function search() {
			var tier = tierSelect.value;

			if ( !/^\d+$/.test( String( tier ) ) ) {
				msg( result, 'No tier is available for that event and week.',
					'event-rewards-notfound' );
				return;
			}

			var jobs = jobsFor( tier );
			var configured = jobs.filter( function ( job ) {
				return job.links.length;
			} );
			if ( !configured.length ) {
				msg( result, 'No reward tables are configured for that event and week.',
					'event-rewards-notfound' );
				return;
			}

			msg( result, 'Loading\u2026', 'event-rewards-loading' );

			// Both fetches run together; a rejection is caught per job so one
			// missing table never hides the other.
			Promise.all( configured.map( function ( job ) {
				return fetchColumns( tier, job.links ).then( function ( columns ) {
					job.model = tableModel( columns, job.meta, displayName );
					return job;
				} ).catch( function ( err ) {
					job.error = String( ( err && err.message ) || err || 'unknown error' );
					if ( !/[.!?]$/.test( job.error ) ) {
						job.error += '.';
					}
					return job;
				} );
			} ) ).then( function ( done ) {
				result.innerHTML = '';
				done.forEach( function ( job ) {
					if ( job.error ) {
						result.appendChild( msgEl(
							'Could not load the ' + job.meta.label.toLowerCase() +
								': ' + job.error,
							'event-rewards-error' ) );
					} else if ( !job.model ) {
						result.appendChild( msgEl(
							'No ' + job.meta.label.toLowerCase() + ' for tier ' +
								tier + '.',
							'event-rewards-notfound' ) );
					} else {
						result.appendChild( renderTable( job.model, job.caption,
							job.meta.rowHeader ) );
					}
				} );

				// The injected tables are taller than the empty result box, so
				// nudge any height-managing gadget (e.g. Collapse Header) to
				// re-measure.
				if ( window.requestAnimationFrame ) {
					requestAnimationFrame( function () {
						window.dispatchEvent( new Event( 'resize' ) );
					} );
				}
			} );
		}

		eventSelect.addEventListener( 'change', refreshEvent );
		weekSelect.addEventListener( 'change', refreshTiers );
		button.addEventListener( 'click', search );
		refreshEvent();
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
	// the model against the Python generator's output. init() re-runs setup by
	// hand from the console.
	if ( window.mw ) {
		mw.libs = mw.libs || {};
		mw.libs.eventRewards = {
			segments: segments,
			tableModel: tableModel,
			weeksFor: weeksFor,
			displayName: displayName,
			prettify: prettify,
			EVENTS: EVENTS,
			WEEKS: WEEKS,
			TYPES: TYPES,
			TABLE_ORDER: TABLE_ORDER,
			init: function () {
				init( [ document ] );
			}
		};
	}
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = {
			segments: segments,
			tableModel: tableModel,
			weeksFor: weeksFor,
			displayName: displayName,
			prettify: prettify,
			EVENTS: EVENTS,
			WEEKS: WEEKS,
			TYPES: TYPES,
			TABLE_ORDER: TABLE_ORDER
		};
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