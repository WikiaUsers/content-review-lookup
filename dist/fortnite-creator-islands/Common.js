/**
 * Fish for Brainrots — value calculator, trade calculator and My collection
 *
 * Three features in one script, sharing one set of formula functions so
 * they can never disagree with each other or with Module:Brainrot.
 *
 * Value calculator (.brainrot-calculator)
 *   Lets a reader pick a mutation, any traits, an evolution stage and a
 *   level, and shows what that exact brainrot earns. The page already
 *   renders tables for the common cases; this is for the combination the
 *   reader actually has.
 *
 * Trade calculator (.ffb-trade)
 *   "Is this trade fair?" A reader lists up to six brainrots on each side,
 *   exactly as they are, and sees what each side earns today and fully
 *   upgraded, a verdict, and plain-language reasons to take or pass.
 *   Other items (potions, rods) can be listed but are never valued.
 *   A reader's saved brainrots can be added to the "You give" side, and
 *   their collection's total stands in for "your total income now".
 *
 * My collection (.ffb-collection)
 *   A reader lists the brainrots they own (up to 600) and sees each one's
 *   income, value and ceiling, with totals, the strongest, the highest
 *   ceiling and which are ready to evolve.
 *
 * Network and storage
 *   The ONLY request this script makes is saving My collection for a
 *   logged-in reader: one call to this wiki's own API (action=options,
 *   via mw.Api().saveOption) under the key userjs-ffb-collection, sent
 *   1.5 s after the reader edits their own list. Nothing is fetched. A
 *   logged-out reader's list stays in this browser's localStorage.
 *
 * How it works
 *   Module:Brainrot renders an empty container with the figures in a hidden
 *   element beside it (calculatorMount, tradeMount, collectionMount). This script reads
 *   that element and builds the controls inside the container. Nothing is
 *   fetched and nothing outside the container is touched, so with the
 *   script absent the page simply shows the tables or the no-JS note.
 *
 * The rule it implements, which is the same one the Lua module uses:
 *   total  = (mutation + traits) * evolution    (each part 1 if none apply)
 *   income = base * total * growth(level)
 *   value  = displayed income * 20
 * Mutation and traits are added to each other; the evolution stage then
 * multiplies that sum. growth(level) is 1.3 per level up to level 175 and
 * only 1.03 per level after that (the game caps growth above 175).
 *
 * Upgrade costs are not shown anywhere: the cost curve is only measured up
 * to level 150 (costKnownTo in the payload), and a wrong price is worse
 * than none.
 */
( function () {
	'use strict';

	/* ================================================================
	 * Shared formula code
	 * ================================================================ */

	var SUFFIXES = [
		[ 1e36, 'Ud' ], [ 1e33, 'Dc' ], [ 1e30, 'No' ], [ 1e27, 'Oc' ],
		[ 1e24, 'Sp' ], [ 1e21, 'Sx' ], [ 1e18, 'Qi' ], [ 1e15, 'Qa' ],
		[ 1e12, 'T' ], [ 1e9, 'B' ], [ 1e6, 'M' ], [ 1e3, 'K' ]
	];

	/**
	 * Round to a whole number, halves to the even neighbour (6.5 -> 6,
	 * 7.5 -> 8). This is what the game shows and what Lua's %.0f does;
	 * Math.round and toFixed( 0 ) would both give 7 for 6.5.
	 */
	function roundHalfEven( n ) {
		var whole = Math.floor( n );
		var rest = n - whole;
		if ( rest > 0.5 ) {
			return whole + 1;
		}
		if ( rest < 0.5 ) {
			return whole;
		}
		return whole % 2 === 0 ? whole : whole + 1;
	}

	/**
	 * The game's own number format: whole numbers below a thousand, otherwise
	 * divided down and truncated to one decimal with a trailing ".0" dropped.
	 * Matches Module:Brainrot so the calculators and the tables never disagree.
	 */
	function money( n ) {
		var i, unit, v;
		if ( n === null || n === undefined || isNaN( n ) ) {
			return '—';
		}
		for ( i = 0; i < SUFFIXES.length; i++ ) {
			unit = SUFFIXES[ i ];
			if ( Math.abs( n ) >= unit[ 0 ] ) {
				v = Math.floor( n / unit[ 0 ] * 10 ) / 10;
				return '$' + v.toFixed( 1 ).replace( /\.0$/, '' ) + unit[ 1 ];
			}
		}
		return '$' + roundHalfEven( n ).toFixed( 0 );
	}

	/**
	 * Reads an amount typed the game's way ("2.5Qa", "$40No/s", "370") back
	 * into a number. Returns null for anything it does not recognise.
	 */
	function parseMoney( text ) {
		var m = String( text || '' ).trim().replace( /^\$/, '' )
			.match( /^([0-9]*\.?[0-9]+)\s*([A-Za-z]*)\/?s?$/ );
		var n, i;
		if ( !m ) {
			return null;
		}
		n = parseFloat( m[ 1 ] );
		if ( !m[ 2 ] ) {
			return n;
		}
		for ( i = 0; i < SUFFIXES.length; i++ ) {
			if ( SUFFIXES[ i ][ 1 ] === m[ 2 ] ) {
				return n * SUFFIXES[ i ][ 0 ];
			}
		}
		for ( i = 0; i < SUFFIXES.length; i++ ) {
			if ( SUFFIXES[ i ][ 1 ].toLowerCase() === m[ 2 ].toLowerCase() ) {
				return n * SUFFIXES[ i ][ 0 ];
			}
		}
		return null;
	}

	/** "Default" is the absence of a mutation, not a mutation worth 1. */
	function isDefault( mutationName ) {
		return String( mutationName ).toLowerCase() === 'default';
	}

	/**
	 * The sum rule for the permanent part: parts are the mutation (unless
	 * Default) and trait multipliers, which are added. Nothing at all is 1.
	 */
	function sumRule( parts ) {
		var sum = 0;
		var i;
		for ( i = 0; i < parts.length; i++ ) {
			sum += parts[ i ];
		}
		return parts.length ? sum : 1;
	}

	/**
	 * The whole multiplier: the mutation + traits sum, multiplied by the
	 * evolution factor (1 when unevolved).
	 */
	function totalMultiplier( parts, evolutionFactor ) {
		return sumRule( parts ) * ( evolutionFactor || 1 );
	}

	/**
	 * How much income has grown from level 1 to this level. c is either
	 * payload: growth per level before highGrowthFrom, highGrowth after.
	 * Same as Module:Brainrot's _growth.
	 */
	function growthFactor( level, c ) {
		var from = c.highGrowthFrom || c.maxLevel + 1;
		if ( level < from ) {
			return Math.pow( c.growth, level - 1 );
		}
		return Math.pow( c.growth, from - 2 ) * Math.pow( c.highGrowth, level - from + 1 );
	}

	/** Income per second. An unmeasured brainrot (base null) stays null. */
	function income( base, total, level, c ) {
		if ( base === null || base === undefined ) {
			return null;
		}
		return base * total * growthFactor( level, c );
	}

	/** Sale value: the DISPLAYED (rounded) rate times the value multiplier. */
	function saleValue( rate, valueMult ) {
		if ( rate === null || rate === undefined ) {
			return null;
		}
		return roundHalfEven( rate ) * valueMult;
	}

	/**
	 * "🎲 Golden Dice": a trait's name with its emoji in front, as the game
	 * shows traits. Only a short string with no markup characters counts as
	 * an emoji (it comes from the data, and is only ever set as text anyway).
	 */
	function emojiName( emoji, name ) {
		return typeof emoji === 'string' && emoji.length > 0 && emoji.length <= 8 && !/[<>&"]/.test( emoji ) ?
			emoji + ' ' + name : name;
	}

	function traitLabel( cat, name ) {
		return name ? emojiName( ( cat.traitEmoji || {} )[ name ], name ) : name;
	}

	function el( tag, className, text ) {
		var node = document.createElement( tag );
		if ( className ) {
			node.className = className;
		}
		if ( text !== undefined ) {
			node.textContent = text;
		}
		return node;
	}

	function clear( node ) {
		while ( node.firstChild ) {
			node.removeChild( node.firstChild );
		}
	}

	/* ================================================================
	 * Value calculator
	 * ================================================================ */

	function buildValueCalculator( container, data ) {
		var state = { mutation: 0, traits: [], evolution: 0, level: data.maxLevel };

		var root = el( 'div', 'ffb-calc' );
		var controls = el( 'div', 'ffb-calc-controls' );

		// ---- evolution, listed first to match the wiki's ordering ----------
		var evoRow = el( 'div', 'ffb-calc-row' );
		evoRow.appendChild( el( 'span', 'ffb-calc-label', 'Evolution' ) );
		var evoButtons = el( 'div', 'ffb-calc-chips' );
		var evoNodes = [];
		for ( var e = 0; e <= data.evolutions.length; e++ ) {
			( function ( stage ) {
				var b = el( 'button', 'ffb-calc-chip', stage === 0 ? 'None' : 'E' + stage );
				b.type = 'button';
				b.setAttribute( 'aria-pressed', stage === 0 ? 'true' : 'false' );
				b.addEventListener( 'click', function () {
					state.evolution = stage;
					refresh();
				} );
				evoNodes.push( b );
				evoButtons.appendChild( b );
			}( e ) );
		}
		evoRow.appendChild( evoButtons );
		controls.appendChild( evoRow );

		// ---- mutation ------------------------------------------------------
		var mutRow = el( 'div', 'ffb-calc-row' );
		var mutLabel = el( 'label', 'ffb-calc-label', 'Mutation' );
		mutLabel.htmlFor = 'ffb-calc-mutation';
		// searchable like the trade calculator's; values stay catalog indexes
		var mutOrder = data.mutations.map( function ( m, i ) {
			return i;
		} ).sort( function ( a, b ) {
			return data.mutations[ b ].m - data.mutations[ a ].m || a - b;
		} );
		var mutPicker = buildSearchPicker( {
			id: 'ffb-calc-mutation',
			current: String( state.mutation ),
			inputClass: 'ffb-calc-select',
			placeholder: 'Type a mutation',
			noun: 'mutation',
			label: function ( v ) {
				return data.mutations[ Number( v ) ].n;
			},
			search: function ( q ) {
				var sq = squash( q || '' );
				return mutOrder.filter( function ( i ) {
					return sq === '' || squash( data.mutations[ i ].n ).indexOf( sq ) !== -1;
				} ).map( function ( i ) {
					return { value: String( i ), color: safeColor( data.mutations[ i ].c ), right: '+' + data.mutations[ i ].m.toFixed( 2 ) };
				} );
			},
			exact: function ( text ) {
				var t = squash( text );
				var i;
				for ( i = 0; i < data.mutations.length; i++ ) {
					if ( squash( data.mutations[ i ].n ) === t && t !== '' ) {
						return String( i );
					}
				}
				return null;
			},
			onPick: function ( v ) {
				state.mutation = Number( v );
				refresh();
			}
		} );
		var mutSelect = mutPicker.input;
		mutSelect.id = 'ffb-calc-mutation';
		mutRow.appendChild( mutLabel );
		mutRow.appendChild( mutPicker.node );
		controls.appendChild( mutRow );

		// ---- level ---------------------------------------------------------
		var lvlRow = el( 'div', 'ffb-calc-row' );
		var lvlLabel = el( 'label', 'ffb-calc-label', 'Level' );
		lvlLabel.htmlFor = 'ffb-calc-level';
		var lvlInput = el( 'input', 'ffb-calc-slider' );
		lvlInput.type = 'range';
		lvlInput.id = 'ffb-calc-level';
		lvlInput.min = '1';
		lvlInput.max = String( data.maxLevel );
		lvlInput.value = String( state.level );
		var lvlOut = el( 'output', 'ffb-calc-level-value', String( state.level ) );
		lvlInput.addEventListener( 'input', function () {
			state.level = parseInt( lvlInput.value, 10 );
			refresh();
		} );
		lvlRow.appendChild( lvlLabel );
		lvlRow.appendChild( lvlInput );
		lvlRow.appendChild( lvlOut );
		controls.appendChild( lvlRow );

		// ---- traits ---------------------------------------------------------
		var trRow = el( 'div', 'ffb-calc-row ffb-calc-row-traits' );
		trRow.appendChild( el( 'span', 'ffb-calc-label', 'Traits' ) );
		var trChips = el( 'div', 'ffb-calc-chips ffb-calc-chips-traits' );
		var trNodes = [];
		data.traits.forEach( function ( t, i ) {
			var b = el( 'button', 'ffb-calc-chip', emojiName( t.e, t.n ) + ' +' + t.m.toFixed( 2 ) );
			b.type = 'button';
			b.setAttribute( 'aria-pressed', 'false' );
			b.addEventListener( 'click', function () {
				var at = state.traits.indexOf( i );
				if ( at === -1 ) {
					state.traits.push( i );
				} else {
					state.traits.splice( at, 1 );
				}
				refresh();
			} );
			trNodes.push( b );
			trChips.appendChild( b );
		} );
		trRow.appendChild( trChips );
		controls.appendChild( trRow );

		var reset = el( 'button', 'ffb-calc-reset', 'Reset' );
		reset.type = 'button';
		reset.addEventListener( 'click', function () {
			state = { mutation: 0, traits: [], evolution: 0, level: data.maxLevel };
			mutPicker.set( '0' );
			lvlInput.value = String( data.maxLevel );
			refresh();
		} );
		controls.appendChild( reset );

		// ---- output ---------------------------------------------------------
		var result = el( 'div', 'ffb-calc-result' );
		var incomeOut = el( 'div', 'ffb-calc-figure' );
		var valueOut = el( 'div', 'ffb-calc-figure' );
		var working = el( 'div', 'ffb-calc-working' );
		result.appendChild( incomeOut );
		result.appendChild( valueOut );
		result.appendChild( working );
		result.appendChild( suffixLegend() );

		function refresh() {
			var terms = [];
			var parts = [];
			var evoFactor = state.evolution > 0 ? data.evolutions[ state.evolution - 1 ] : 1;

			var mut = data.mutations[ state.mutation ];
			if ( mut && !isDefault( mut.n ) ) {
				parts.push( mut.m );
				terms.push( mut.n + ' ' + mut.m.toFixed( 2 ) );
			}
			state.traits.slice().sort( function ( a, b ) {
				return a - b;
			} ).forEach( function ( i ) {
				parts.push( data.traits[ i ].m );
				terms.push( emojiName( data.traits[ i ].e, data.traits[ i ].n ) + ' ' + data.traits[ i ].m.toFixed( 2 ) );
			} );

			var total = totalMultiplier( parts, evoFactor );
			var rate = income( data.base, total, state.level, data );

			clear( incomeOut );
			incomeOut.appendChild( el( 'span', 'ffb-calc-figure-label', 'Income' ) );
			incomeOut.appendChild( el( 'strong', 'ffb-calc-figure-value', money( rate ) + '/sec' ) );

			clear( valueOut );
			valueOut.appendChild( el( 'span', 'ffb-calc-figure-label', 'Value' ) );
			valueOut.appendChild( el( 'strong', 'ffb-calc-figure-value',
				money( saleValue( rate, data.valueMult ) ) ) );

			// e.g. "(Ruby 7.00  +  Evil 5.00)  ×  Evolution 7 5.01  =  ×60.12   × 1.3^174 × 1.03^25"
			var sumText = terms.length ? terms.join( '  +  ' ) : 'nothing applied';
			if ( state.evolution > 0 ) {
				sumText = ( terms.length > 1 ? '(' + sumText + ')' : sumText ) +
					'  ×  Evolution ' + state.evolution + ' ' + evoFactor.toFixed( 2 );
			}
			var from = data.highGrowthFrom || data.maxLevel + 1;
			var growthText = state.level < from ?
				data.growth + '^' + ( state.level - 1 ) :
				data.growth + '^' + ( from - 2 ) + ' × ' + data.highGrowth + '^' + ( state.level - from + 1 );
			working.textContent = sumText + '  =  ×' + total.toFixed( 2 ) + '   × ' + growthText;

			lvlOut.textContent = String( state.level );
			evoNodes.forEach( function ( b, i ) {
				b.setAttribute( 'aria-pressed', i === state.evolution ? 'true' : 'false' );
			} );
			trNodes.forEach( function ( b, i ) {
				b.setAttribute( 'aria-pressed', state.traits.indexOf( i ) !== -1 ? 'true' : 'false' );
			} );
		}

		root.appendChild( el( 'div', 'ffb-calc-title', 'Value calculator' ) );
		root.appendChild( controls );
		root.appendChild( result );
		refresh();

		clear( container );
		container.appendChild( root );
	}

	/* ================================================================
	 * Trade calculator — the numbers and the wording
	 *
	 * Everything in this section is plain data in, plain data out, so it
	 * can be tested without a browser. A brainrot on a side is a "row":
	 *   { name, mutation, evolution, level, traits: [ '', '', '' ] }
	 * with one traits slot per trait the game allows ('' when empty).
	 * ================================================================ */

	function has( obj, key ) {
		return Object.prototype.hasOwnProperty.call( obj, key );
	}

	/** Indexes the tradeMount payload by name. */
	function buildCatalog( data ) {
		var cat = { data: data, brainrots: {}, groups: [], mutations: {}, traits: {} };
		var groupAt = {};
		data.brainrots.forEach( function ( b ) {
			cat.brainrots[ b[ 0 ] ] = { name: b[ 0 ], rarity: b[ 1 ], base: b[ 2 ] };
			if ( !has( groupAt, b[ 1 ] ) ) {
				groupAt[ b[ 1 ] ] = cat.groups.length;
				cat.groups.push( { label: b[ 1 ], names: [] } );
			}
			cat.groups[ groupAt[ b[ 1 ] ] ].names.push( b[ 0 ] );
		} );
		data.mutations.forEach( function ( m ) {
			cat.mutations[ m[ 0 ] ] = m[ 1 ];
		} );
		data.traits.forEach( function ( t ) {
			cat.traits[ t[ 0 ] ] = t[ 1 ];
		} );
		// rods and potions a trade can include, as [name, kind]; an older
		// payload without them leaves the item field free text
		cat.items = ( data.items || [] ).map( function ( it ) {
			return { name: it[ 0 ], kind: it[ 1 ] };
		} );
		// each rarity's colour for the pickers' squares; anything but a plain
		// #rrggbb is ignored, since it ends up in a style attribute
		cat.rarityColor = {};
		Object.keys( data.rarityColors || {} ).forEach( function ( r ) {
			var c = data.rarityColors[ r ];
			if ( typeof c === 'string' && /^#[0-9a-f]{6}$/i.test( c ) ) {
				cat.rarityColor[ r ] = c;
			}
		} );
		cat.traitEmoji = data.traitEmoji && typeof data.traitEmoji === 'object' ? data.traitEmoji : {};
		cat.mutationColor = {};
		Object.keys( data.mutationColors || {} ).forEach( function ( m ) {
			var c = safeColor( data.mutationColors[ m ] );
			if ( c ) {
				cat.mutationColor[ m ] = c;
			}
		} );
		cat.defaultMutation = data.mutations[ 0 ][ 0 ];
		data.mutations.forEach( function ( m ) {
			if ( isDefault( m[ 0 ] ) ) {
				cat.defaultMutation = m[ 0 ];
			}
		} );
		// a new row starts as the plainest measured brainrot there is
		cat.defaultBrainrot = has( cat.brainrots, 'Tim Cheese' ) ? 'Tim Cheese' : data.brainrots[ 0 ][ 0 ];
		return cat;
	}

	/**
	 * The catalog item a typed name means (ignoring case and spacing), or
	 * null. With no item list at all, any non-empty text is kept as typed.
	 */
	function matchItem( cat, text ) {
		var t = String( text || '' ).replace( /\s+/g, ' ' ).trim().toLowerCase();
		var i;
		if ( t === '' ) {
			return null;
		}
		if ( !cat.items.length ) {
			return String( text ).trim();
		}
		for ( i = 0; i < cat.items.length; i++ ) {
			if ( cat.items[ i ].name.toLowerCase() === t ) {
				return cat.items[ i ].name;
			}
		}
		return null;
	}

	function newRow( cat, name ) {
		var traits = [];
		var i;
		for ( i = 0; i < cat.data.maxTraits; i++ ) {
			traits.push( '' );
		}
		return {
			name: name && has( cat.brainrots, name ) ? name : cat.defaultBrainrot,
			mutation: cat.defaultMutation,
			evolution: 0,
			level: 1,
			traits: traits
		};
	}

	/** Adds a row unless the side already holds as many as a trade can. */
	function addRow( cat, rows, row ) {
		if ( rows.length >= cat.data.maxPerSide ) {
			return false;
		}
		rows.push( row );
		return true;
	}

	/**
	 * Puts a trait in one slot. Refuses slots past the game's cap, unknown
	 * traits, and a trait already in another slot. '' empties the slot.
	 */
	function setTrait( cat, row, slot, name ) {
		var i;
		if ( slot < 0 || slot >= cat.data.maxTraits ) {
			return false;
		}
		if ( name !== '' ) {
			if ( !has( cat.traits, name ) ) {
				return false;
			}
			for ( i = 0; i < row.traits.length; i++ ) {
				if ( i !== slot && row.traits[ i ] === name ) {
					return false;
				}
			}
		}
		row.traits[ slot ] = name;
		return true;
	}

	/** The traits that count: known, filled, and within the cap. */
	function chosenTraits( cat, row ) {
		var out = [];
		var i;
		for ( i = 0; i < row.traits.length && i < cat.data.maxTraits; i++ ) {
			if ( row.traits[ i ] && has( cat.traits, row.traits[ i ] ) ) {
				out.push( row.traits[ i ] );
			}
		}
		return out;
	}

	/** The whole multiplier for a row at a given evolution stage. */
	function rowTotal( cat, row, evolution ) {
		var parts = [];
		if ( !isDefault( row.mutation ) && has( cat.mutations, row.mutation ) ) {
			parts.push( cat.mutations[ row.mutation ] );
		}
		chosenTraits( cat, row ).forEach( function ( t ) {
			parts.push( cat.traits[ t ] );
		} );
		return totalMultiplier( parts, evolution > 0 ? cat.data.evolutions[ evolution ] : 1 );
	}

	/**
	 * Mutation and traits can't be changed after the fact, so this part of
	 * the total is what a trade really hands over. Evolution multiplies it.
	 * mult is the sum as a multiplier: 1 when there is nothing in it.
	 */
	function fixedParts( cat, row ) {
		var mut = isDefault( row.mutation ) || !has( cat.mutations, row.mutation ) ?
			0 : cat.mutations[ row.mutation ];
		var list = chosenTraits( cat, row );
		var tr = 0;
		list.forEach( function ( t ) {
			tr += cat.traits[ t ];
		} );
		return { mut: mut, tr: tr, both: mut + tr, mult: ( mut + tr ) || 1, traitCount: list.length };
	}

	function rowStats( cat, row ) {
		var d = cat.data;
		var entry = has( cat.brainrots, row.name ) ? cat.brainrots[ row.name ] : null;
		var base = entry ? entry.base : null;
		var measured = base !== null && base !== undefined;
		var tot = rowTotal( cat, row, row.evolution );
		var now = measured ? income( base, tot, row.level, d ) : null;
		return {
			measured: measured,
			tot: tot,
			now: now,
			value: saleValue( now, d.valueMult ),
			max: measured ? income( base, tot, d.maxLevel, d ) : null,
			maxValue: measured ? saleValue( income( base, tot, d.maxLevel, d ), d.valueMult ) : null,
			ceil: measured ? income( base, rowTotal( cat, row, d.maxEvolution ), d.maxLevel, d ) : null,
			lvLeft: d.maxLevel - row.level,
			evoLeft: d.maxEvolution - row.evolution,
			maxed: row.level === d.maxLevel && row.evolution === d.maxEvolution,
			canEvolve: row.level === d.maxLevel && row.evolution < d.maxEvolution
		};
	}

	function plus( n ) {
		return '+' + n.toFixed( 2 );
	}

	function times( n ) {
		return '×' + n.toFixed( 2 );
	}

	/** Option lists for a row's selects: { value, label }. */
	/**
	 * The brainrot picker's matches for what the reader typed: any part of a
	 * name, ignoring case, spaces and punctuation, in brainrotOptions' order
	 * (most valuable first). An empty query lists everything.
	 */
	/** Text for matching: lower case, letters and digits only. */
	function squash( t ) {
		return String( t ).toLowerCase().replace( /[^a-z0-9]/g, '' );
	}

	/**
	 * The rarities a query names: "admin" or "admin secret" is Admin Secret,
	 * "secret" is Secret (a rarity whose whole name starts with the query
	 * wins), and "god" reaches Brainrot God through its last word.
	 */
	function raritiesFor( cat, q ) {
		var names = cat.groups.map( function ( g ) {
			return g.label;
		} );
		var whole = names.filter( function ( r ) {
			return squash( r ).indexOf( q ) === 0;
		} );
		if ( q === '' || whole.length ) {
			return q === '' ? [] : whole;
		}
		return names.filter( function ( r ) {
			var words = r.split( ' ' );
			return words.length > 1 && q.length >= 3 && squash( words[ words.length - 1 ] ).indexOf( q ) === 0;
		} );
	}

	function searchBrainrots( cat, query ) {
		var q = squash( query || '' );
		var rarities = raritiesFor( cat, q );
		return brainrotOptions( cat ).filter( function ( o ) {
			return q === '' || squash( o.value ).indexOf( q ) !== -1 ||
				rarities.indexOf( cat.brainrots[ o.value ].rarity ) !== -1;
		} ).map( function ( o ) {
			var b = cat.brainrots[ o.value ];
			return {
				value: o.value,
				rarity: b.rarity,
				color: cat.rarityColor ? cat.rarityColor[ b.rarity ] || null : null,
				base: b.base === null || b.base === undefined ? null : money( b.base ) + '/s'
			};
		} );
	}

	/** Mutations matching a query, best first: { value, right }. */
	function searchMutations( cat, query ) {
		var q = squash( query || '' );
		return mutationOptions( cat ).filter( function ( o ) {
			return q === '' || squash( o.value ).indexOf( q ) !== -1;
		} ).map( function ( o ) {
			return { value: o.value, color: cat.mutationColor[ o.value ] || null, right: plus( cat.mutations[ o.value ] ) };
		} );
	}

	/**
	 * Traits a slot can take that match a query, best first, with "No trait"
	 * (value '') leading an empty query: { value, right }.
	 */
	function searchTraits( cat, row, slot, query ) {
		var q = squash( query || '' );
		return traitOptions( cat, row, slot ).filter( function ( o ) {
			return o.value === '' ? q === '' || squash( 'no trait' ).indexOf( q ) === 0 :
				q === '' || squash( o.value ).indexOf( q ) !== -1;
		} ).map( function ( o ) {
			return {
				value: o.value,
				name: o.value === '' ? 'No trait' : traitLabel( cat, o.value ),
				right: o.value === '' ? '' : plus( cat.traits[ o.value ] )
			};
		} );
	}

	/** The catalog's spelling of a typed name in a { name: … } map, or null. */
	function exactName( map, text ) {
		var t = String( text || '' ).replace( /\s+/g, ' ' ).trim().toLowerCase();
		var name;
		for ( name in map ) {
			if ( has( map, name ) && name.toLowerCase() === t ) {
				return name;
			}
		}
		return null;
	}

	/** The catalog's spelling of a typed brainrot name, or null. */
	function exactBrainrot( cat, text ) {
		var t = String( text || '' ).replace( /\s+/g, ' ' ).trim().toLowerCase();
		var name;
		for ( name in cat.brainrots ) {
			if ( has( cat.brainrots, name ) && name.toLowerCase() === t ) {
				return name;
			}
		}
		return null;
	}

	function mutationOptions( cat ) {
		// best first (ties keep the catalog order), like the trait lists
		return cat.data.mutations.map( function ( m, i ) {
			return { m: m, i: i };
		} ).sort( function ( a, b ) {
			return b.m[ 1 ] - a.m[ 1 ] || a.i - b.i;
		} ).map( function ( x ) {
			var m = x.m;
			return { value: m[ 0 ], label: isDefault( m[ 0 ] ) ? m[ 0 ] : m[ 0 ] + ' ' + plus( m[ 1 ] ) };
		} );
	}

	/**
	 * The brainrot picker: one list by base income, most valuable first,
	 * not grouped by rarity (user, 2026-09-24). Brainrots with no measured
	 * base come last, by name.
	 */
	function brainrotOptions( cat ) {
		return cat.data.brainrots.map( function ( b ) {
			return { name: b[ 0 ], base: b[ 2 ] };
		} ).sort( function ( x, y ) {
			if ( ( x.base === null ) !== ( y.base === null ) ) {
				return x.base === null ? 1 : -1;
			}
			if ( x.base !== null && x.base !== y.base ) {
				return y.base - x.base;
			}
			return x.name < y.name ? -1 : x.name > y.name ? 1 : 0;
		} ).map( function ( x ) {
			return {
				value: x.name,
				label: x.name + ( x.base === null ? ' · no base yet' : ' · ' + money( x.base ) + '/s' )
			};
		} );
	}

	function evolutionOptions( cat ) {
		var out = [];
		var i;
		for ( i = 0; i <= cat.data.maxEvolution; i++ ) {
			out.push( {
				value: String( i ),
				label: i === 0 ? 'Unevolved' : 'Evo ' + i + ' ' + times( cat.data.evolutions[ i ] )
			} );
		}
		return out;
	}

	/**
	 * A trait slot offers every trait not already in another slot, best
	 * first (ties keep the catalog order).
	 */
	function traitOptions( cat, row, slot ) {
		var out = [ { value: '', label: 'No trait' } ];
		var sorted = cat.data.traits.map( function ( t, i ) {
			return { t: t, i: i };
		} ).sort( function ( a, b ) {
			return b.t[ 1 ] - a.t[ 1 ] || a.i - b.i;
		} ).map( function ( x ) {
			return x.t;
		} );
		sorted.forEach( function ( t ) {
			var taken = false;
			var i;
			for ( i = 0; i < row.traits.length; i++ ) {
				if ( i !== slot && row.traits[ i ] === t[ 0 ] ) {
					taken = true;
				}
			}
			if ( !taken ) {
				out.push( { value: t[ 0 ], label: t[ 0 ] + ' ' + plus( t[ 1 ] ) } );
			}
		} );
		return out;
	}

	/** A typed level, or null if it is not a whole level the game has. */
	function parseLevel( cat, text ) {
		var s = String( text ).trim();
		var n = Math.round( Number( s ) );
		if ( s === '' || isNaN( n ) || n < 1 || n > cat.data.maxLevel ) {
			return null;
		}
		return n;
	}

	/** What a card shows about its own brainrot. */
	function rowView( cat, row, s ) {
		var fx = fixedParts( cat, row );
		var entry = has( cat.brainrots, row.name ) ? cat.brainrots[ row.name ] : null;
		var badge;
		if ( s.maxed ) {
			badge = 'Fully maxed';
		} else if ( s.canEvolve ) {
			badge = 'Ready to evolve';
		} else {
			badge = 'Level ' + row.level + ' · ' + ( row.evolution ? 'Evo ' + row.evolution : 'unevolved' );
		}
		return {
			name: row.name,
			rarity: entry ? entry.rarity : '',
			measured: s.measured,
			mult: '×' + s.tot.toFixed( 2 ) + ' total',
			mutPart: isDefault( row.mutation ) ? 'none' : row.mutation + ' ' + plus( fx.mut ),
			traitPart: fx.traitCount ? plus( fx.tr ) + ' (' + fx.traitCount + ')' : 'none',
			bothPart: times( fx.mult ),
			now: money( s.now ) + '/s',
			value: money( s.value ),
			ceil: money( s.ceil ) + '/s',
			badge: badge,
			badgeTone: s.maxed ? 'maxed' : ( s.canEvolve ? 'evolve' : 'plain' )
		};
	}

	/**
	 * A big ratio, readable: two significant figures with thousands
	 * separators. 118091.7 -> "120,000", 26.3 -> "26", 10.4 -> "10".
	 */
	function roughRatio( r ) {
		// from a million up, the game's own suffixes ("700Qi") read better
		// than a run of zeros, and match the legend
		if ( r >= 1e6 ) {
			return money( r ).replace( /^\$/, '' );
		}
		var step = Math.pow( 10, Math.floor( Math.log( r ) / Math.LN10 ) - 1 );
		var n = step >= 1 ? Math.round( r / step ) * step : Math.round( r );
		return String( n ).replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
	}

	/** get relative to give: "+160%", "−90%", or "×26" / "÷120,000" for big gaps */
	function diff( give, get ) {
		var r, pct;
		if ( !give && !get ) {
			return { text: '—', tone: 'flat' };
		}
		if ( !give ) {
			return { text: 'new', tone: 'good' };
		}
		r = get / give;
		if ( r >= 10 ) {
			return { text: '×' + roughRatio( r ), tone: 'good' };
		}
		if ( r <= 0.1 && r > 0 ) {
			return { text: '÷' + roughRatio( 1 / r ), tone: 'bad' };
		}
		pct = ( r - 1 ) * 100;
		return {
			text: ( pct >= 0 ? '+' : '−' ) + Math.abs( pct ).toFixed( 0 ) + '%',
			tone: Math.abs( pct ) < 10 ? 'flat' : ( pct > 0 ? 'good' : 'bad' )
		};
	}

	/** The ±10% Fair band. */
	function band( r ) {
		if ( r > 1.1 ) {
			return 'up';
		}
		return r < 0.9 ? 'down' : 'even';
	}

	var VERDICTS = {
		'up|up': [ 'Good trade for you', 'You come out ahead today and when everything is fully upgraded.', 'good' ],
		'down|down': [ 'Bad trade for you', 'You lose out today and when everything is fully upgraded.', 'bad' ],
		'even|even': [ 'Fair trade', 'Both sides are within 10% today and fully upgraded.', 'flat' ],
		'down|up': [ 'Worse today, better long-term', 'Take it if you will keep upgrading. Pass if you need the income now.', 'mixed' ],
		'up|down': [ 'Better today, worse long-term', 'Take it if you want income right away. Pass if you plan to max everything.', 'mixed' ],
		'even|up': [ 'Fair today, better long-term', 'Even now, and what you get has more room to grow.', 'good' ],
		'even|down': [ 'Fair today, worse long-term', 'Even now, but what you give has more room to grow.', 'mixed' ],
		'up|even': [ 'Better today, fair long-term', 'You earn more right away, and it evens out when fully upgraded.', 'good' ],
		'down|even': [ 'Worse today, fair long-term', 'You earn less right away, and it evens out when fully upgraded.', 'mixed' ]
	};

	/** "A", "A and B", "A, B and C" */
	function joinNames( names ) {
		if ( names.length < 2 ) {
			return names.join( '' );
		}
		return names.slice( 0, -1 ).join( ', ' ) + ' and ' + names[ names.length - 1 ];
	}

	/** Totals over one side, counting only brainrots with a measured income. */
	function summarise( cat, key, title, rows ) {
		var stats = rows.map( function ( r ) {
			return rowStats( cat, r );
		} );
		var side = {
			key: key,
			title: title,
			stats: stats,
			rows: rows.map( function ( r, i ) {
				return rowView( cat, r, stats[ i ] );
			} ),
			now: 0, value: 0, max: 0, maxValue: 0, ceil: 0, evoLeft: 0, lvLeft: 0,
			evolved: rows.some( function ( r ) {
				return r.evolution > 0;
			} ),
			measured: 0,
			unmeasured: []
		};
		stats.forEach( function ( s, i ) {
			side.evoLeft += s.evoLeft;
			side.lvLeft += s.lvLeft;
			if ( s.measured ) {
				side.measured++;
				side.now += s.now;
				side.value += s.value;
				side.max += s.max;
				side.maxValue += s.maxValue;
				side.ceil += s.ceil;
			} else if ( side.unmeasured.indexOf( rows[ i ].name ) === -1 ) {
				side.unmeasured.push( rows[ i ].name );
			}
		} );
		side.partial = side.unmeasured.length > 0;
		// the side's best and weakest brainrot by income now (measured only)
		side.best = side.weakest = null;
		stats.forEach( function ( s, i ) {
			if ( !s.measured ) {
				return;
			}
			var it = { row: rows[ i ], now: s.now };
			if ( !side.best || s.now > side.best.now ) {
				side.best = it;
			}
			if ( !side.weakest || s.now < side.weakest.now ) {
				side.weakest = it;
			}
		} );
		return side;
	}

	/**
	 * A side's total as text. Unmeasured brainrots are never guessed: a side
	 * with some of them reads "at least", a side with only them reads "—".
	 */
	function sideMoney( side, n, unit ) {
		if ( side.stats.length && !side.measured ) {
			return '—';
		}
		return ( side.partial ? 'at least ' : '' ) + money( n ) + unit;
	}

	/** The mutation + traits winner on one side, or null for an empty side. */
	function bestFixed( cat, rows ) {
		var top = null;
		rows.forEach( function ( r ) {
			var f = fixedParts( cat, r ).mult;
			if ( !top || f > top.f ) {
				top = { f: f, r: r };
			}
		} );
		return top;
	}

	/**
	 * The traits worth fusing for: every trait holding one of the three
	 * highest values (Golden Dice, Evil, and Bat and Purple Star tied at
	 * 4.00), best first.
	 */
	function topTraits( cat ) {
		var values = [];
		Object.keys( cat.traits ).forEach( function ( n ) {
			if ( values.indexOf( cat.traits[ n ] ) === -1 ) {
				values.push( cat.traits[ n ] );
			}
		} );
		values.sort( function ( a, b ) {
			return b - a;
		} );
		values = values.slice( 0, 3 );
		return Object.keys( cat.traits ).filter( function ( n ) {
			return values.indexOf( cat.traits[ n ] ) !== -1;
		} ).sort( function ( a, b ) {
			return cat.traits[ b ] - cat.traits[ a ] || ( a < b ? -1 : 1 );
		} );
	}

	/**
	 * Reasons a trade can be worth it (or not) for the machines, which the
	 * income figures can't show (user, 2026-09-24): a brainrot carrying top
	 * traits is a good Fuse Machine input (Brainrot God or higher only), and
	 * a better mutation of a brainrot the reader already owns can be paired
	 * in the Mutation Machine. owned: the reader's saved collection, or [].
	 * Returns { take: [], pass: [] }. Figures from the wiki's Machines page.
	 */
	function machineReasons( cat, giveRows, getRows, owned ) {
		var out = { take: [], pass: [] };
		var top = topTraits( cat );
		var labels = cat.groups.map( function ( g ) {
			return g.label;
		} );
		// groups run strongest first: God and everything above it can fuse
		var godAt = labels.indexOf( 'Brainrot God' );
		var fusable = function ( r ) {
			var b = cat.brainrots[ r.name ];
			return !!b && godAt !== -1 && labels.indexOf( b.rarity ) !== -1 && labels.indexOf( b.rarity ) <= godAt;
		};
		var topsOf = function ( r ) {
			return chosenTraits( cat, r ).filter( function ( t ) {
				return top.indexOf( t ) !== -1;
			} ).sort( function ( a, b ) {
				return cat.traits[ b ] - cat.traits[ a ];
			} );
		};
		var named = function ( ts ) {
			return joinNames( ts.map( function ( t ) {
				return traitLabel( cat, t );
			} ) );
		};
		getRows.forEach( function ( r ) {
			var ts = fusable( r ) ? topsOf( r ) : [];
			if ( ts.length > 1 ) {
				out.take.push( 'Great for fusing: ' + r.name + ' carries ' + named( ts ) + ', ' +
					( ts.length === 2 ? 'two' : 'three' ) + ' of the best traits. A fuse passes on about 1.8 traits ' +
					'on average, so it could carry them into a stronger brainrot.' );
			} else if ( ts.length === 1 ) {
				out.take.push( 'Good for fusing: ' + r.name + ' carries ' + named( ts ) + ', one of the best traits. ' +
					'A fuse passes a trait on about half the time (51% from a single input), so it could carry it into a stronger brainrot.' );
			}
		} );
		giveRows.forEach( function ( r ) {
			var ts = fusable( r ) ? topsOf( r ) : [];
			if ( ts.length ) {
				out.pass.push( 'You’d give up ' + r.name + '’s ' + named( ts ) + ', ' +
					( ts.length > 1 ? ( ts.length === 2 ? 'two' : 'three' ) + ' of the best traits' : 'one of the best traits' ) + ' for fusing.' );
			}
		} );
		// the Mutation Machine: two of the same brainrot, never worse than the stronger
		var rank = function ( m ) {
			var i;
			for ( i = 0; i < cat.data.mutations.length; i++ ) {
				if ( cat.data.mutations[ i ][ 0 ] === m ) {
					return i;
				}
			}
			return -1;
		};
		getRows.forEach( function ( r ) {
			var mine = ( owned || [] ).filter( function ( o ) {
				return o.name === r.name;
			} ).sort( function ( a, b ) {
				return rank( b.mutation ) - rank( a.mutation );
			} )[ 0 ];
			if ( mine && rank( r.mutation ) > rank( mine.mutation ) ) {
				out.take.push( 'For the Mutation Machine: you already own a ' + r.name + ' (' + mine.mutation + '). ' +
					'Paired with this ' + r.mutation + ' one, the result can only come out ' + r.mutation + ' or better.' );
			}
		} );
		return out;
	}

	function describeBest( cat, b ) {
		var list = chosenTraits( cat, b.r );
		var bits = [];
		if ( !isDefault( b.r.mutation ) ) {
			bits.push( b.r.mutation );
		}
		if ( list.length ) {
			bits.push( list.length === 1 ? traitLabel( cat, list[ 0 ] ) : list.length + ' traits' );
		}
		return b.r.name + ( bits.length ?
			' (' + bits.join( ' + ' ) + ', ' + times( b.f ) + ')' :
			' (' + times( b.f ) + ')' );
	}

	/**
	 * The whole comparison. trade is
	 *   { give: [ rows ], get: [ rows ], items: { give: [ text ], get: [ text ] },
	 *     myIncome: text }
	 * and the result holds every string the page shows below the two sides.
	 */
	function compareTrade( cat, trade ) {
		var d = cat.data;
		var giveRows = trade.give;
		var getRows = trade.get;
		var items = trade.items || { give: [], get: [] };
		var give = summarise( cat, 'give', 'You give', giveRows );
		var get = summarise( cat, 'get', 'You get', getRows );
		var noTrade = !giveRows.length || !getRows.length;
		var judge = !noTrade && give.measured > 0 && get.measured > 0;
		var none = { text: '', tone: 'flat' };
		var bg = bestFixed( cat, giveRows );
		var bt = bestFixed( cat, getRows );
		var take = [];
		var pass = [];
		var notes = [];
		var warnings = [];
		var rNow, rCeil, v, verdict, pct, evo, lv, gf, tf, mine, mineOut, after, ch, typed, fromCollection;

		[ give, get ].forEach( function ( side ) {
			side.count = side.stats.length + ' of ' + d.maxPerSide + ' brainrots';
			side.nowTotal = sideMoney( side, side.now, '/s' );
			side.valueTotal = sideMoney( side, side.value, '' );
			side.canAdd = side.stats.length < d.maxPerSide;
			side.full = !side.canAdd;
		} );

		/** "Name (Mutation) · $X/s" for one side's pick, or a dash. */
		function pickText( side, it ) {
			if ( !it ) {
				return '—';
			}
			var r = it.row;
			return r.name + ( isDefault( r.mutation ) ? '' : ' (' + r.mutation + ')' ) + ' · ' + money( it.now ) + '/s';
		}

		function bestText( b ) {
			return b ? times( b.f ) + ' · ' + b.r.name : '—';
		}

		var table = [
			{
				label: 'Income now', hint: 'as they are today',
				give: give.nowTotal, get: get.nowTotal,
				d: judge ? diff( give.now, get.now ) : none
			},
			// every row is $/s: players compare what brainrots earn, not
			// what they sell for (user, 2026-09-24). This one only shows when
			// nothing on either side is evolved: each side levelled to the cap.
			give.evolved || get.evolved ? null : {
				label: 'Income at level ' + d.maxLevel, hint: 'no evolutions',
				give: sideMoney( give, give.max, '/s' ), get: sideMoney( get, get.max, '/s' ),
				d: judge ? diff( give.max, get.max ) : none
			},
			{
				label: 'Fully upgraded', hint: 'level ' + d.maxLevel + ' and Evo ' + d.maxEvolution,
				give: sideMoney( give, give.ceil, '/s' ), get: sideMoney( get, get.ceil, '/s' ),
				d: judge ? diff( give.ceil, get.ceil ) : none
			},
			// with several brainrots on a side, which one is doing the work
			// and which is the filler (user, 2026-09-24)
			give.measured > 1 || get.measured > 1 ? {
				label: 'Best brainrot', hint: 'highest income now',
				give: pickText( give, give.best ), get: pickText( get, get.best ), d: none
			} : null,
			give.measured > 1 || get.measured > 1 ? {
				label: 'Weakest brainrot', hint: 'lowest income now',
				give: give.measured > 1 ? pickText( give, give.weakest ) : '—',
				get: get.measured > 1 ? pickText( get, get.weakest ) : '—', d: none
			} : null,
			{
				label: 'Best mutation + traits', hint: 'these never change',
				give: bestText( bg ), get: bestText( bt ),
				d: bg && bt ? diff( bg.f, bt.f ) : none
			},
			{
				label: 'Evolutions left', hint: 'each one resets to level 1',
				give: String( give.evoLeft ), get: String( get.evoLeft ),
				d: none
			}
		].filter( function ( c ) {
			return c !== null;
		} ).map( function ( c ) {
			return { label: c.label, hint: c.hint, give: c.give, get: c.get, diff: c.d.text, tone: c.d.tone };
		} );

		// the verdict: today vs fully upgraded, never one number
		rNow = give.now ? get.now / give.now : 0;
		rCeil = give.ceil ? get.ceil / give.ceil : 0;
		if ( noTrade ) {
			v = [ 'Add brainrots to both sides', 'The comparison appears once each side has at least one brainrot.', 'flat' ];
		} else if ( !judge ) {
			v = [ 'Can’t compare yet',
				'Nothing you ' + ( give.measured ? 'get' : 'give' ) + ' has a measured income yet, so there is nothing to weigh it against.',
				'flat' ];
		} else {
			v = VERDICTS[ band( rNow ) + '|' + band( rCeil ) ];
			if ( give.partial || get.partial ) {
				v = [ v[ 0 ], v[ 1 ] + ' Only brainrots with a measured income are counted.', v[ 2 ] ];
			}
		}
		verdict = { title: v[ 0 ], sub: v[ 1 ], tone: v[ 2 ] };

		// unmeasured brainrots are never guessed; say which side is incomplete
		[ give, get ].forEach( function ( side ) {
			if ( side.partial ) {
				warnings.push( joinNames( side.unmeasured ) +
					( side.unmeasured.length === 1 ? ' has' : ' have' ) +
					' no measured income yet, so this side is incomplete.' );
			}
		} );

		// reasons, written from the side of the person deciding
		if ( !noTrade ) {
			pct = function ( x ) {
				return Math.abs( ( x - 1 ) * 100 ).toFixed( 0 ) + '%';
			};
			if ( judge ) {
				if ( rNow > 1.1 ) {
					take.push( 'You would earn ' + ( rNow >= 10 ? 'about ' + roughRatio( rNow ) + '× as much' : pct( rNow ) + ' more' ) +
						' per second right away (' + money( get.now ) + '/s instead of ' + money( give.now ) + '/s).' );
				}
				if ( rNow < 0.9 ) {
					pass.push( 'You would earn ' + ( rNow <= 0.1 ? 'under a tenth' : pct( rNow ) + ' less' ) +
						' per second right away (' + money( get.now ) + '/s instead of ' + money( give.now ) + '/s).' );
				}
				if ( rCeil > 1.1 ) {
					take.push( 'Fully upgraded, what you get reaches ' + money( get.ceil ) + '/s: ' +
						( rCeil >= 10 ? 'about ' + roughRatio( rCeil ) + '× as much as' : pct( rCeil ) + ' more than' ) + ' what you give ever can.' );
				}
				if ( rCeil < 0.9 ) {
					pass.push( 'Fully upgraded, what you give reaches ' + money( give.ceil ) + '/s, ' +
						( 1 / rCeil >= 10 ? 'about ' + roughRatio( 1 / rCeil ) + '× as much as' : pct( 1 / rCeil ) + ' more than' ) +
						' what you get ever can.' );
				}
			}
			giveRows.forEach( function ( r, i ) {
				if ( give.stats[ i ].maxed ) {
					take.push( r.name + ' is already fully maxed (level ' + d.maxLevel + ', Evo ' + d.maxEvolution +
						'). It will never earn more than it does now.' );
				}
			} );
			getRows.forEach( function ( r, i ) {
				if ( get.stats[ i ].maxed ) {
					pass.push( r.name + ' is already fully maxed, so it has no room left to grow.' );
				}
			} );
			evo = get.evoLeft;
			lv = get.lvLeft;
			if ( evo > 0 ) {
				pass.push( 'Reaching that ceiling takes ' + evo + ( evo === 1 ? ' evolution' : ' evolutions' ) +
					( getRows.length > 1 ? ' across ' + getRows.length + ' brainrots' : '' ) +
					'. Each one sends a brainrot back to level 1, and it has to climb to ' + d.maxLevel +
					' again before the next.' );
			} else if ( lv > 0 ) {
				// the mockup quoted the upgrade cost here; it stays out until
				// the level-199 cost is verified in game (see the plan)
				pass.push( 'What you get still needs ' + lv + ' levels of upgrades to reach its max.' );
			}
			if ( getRows.length > giveRows.length ) {
				take.push( 'You get ' + getRows.length + ' brainrots for ' + giveRows.length + '.' );
			}
			if ( giveRows.length > getRows.length ) {
				pass.push( 'You give ' + giveRows.length + ' brainrots for ' + getRows.length + '.' );
			}
			if ( bg && bt ) {
				gf = bg.f;
				tf = bt.f;
				if ( tf > gf * 1.1 ) {
					take.push( 'Better mutation and traits: ' + describeBest( cat, bt ) +
						' beats anything you give (best ' + times( bg.f ) + '). They can’t be changed later, so this is permanent.' );
				}
				if ( gf > tf * 1.1 ) {
					pass.push( 'Better mutation and traits on your side: ' + describeBest( cat, bg ) +
						' beats anything you get (best ' + times( bt.f ) + '). They can’t be changed later, so you’d give that up for good.' );
				}
			}
			var machines = machineReasons( cat, giveRows, getRows, trade.owned || [] );
			machines.take.forEach( function ( t ) {
				take.push( t );
			} );
			machines.pass.forEach( function ( t ) {
				pass.push( t );
			} );
			if ( machines.take.length || machines.pass.length ) {
				notes.push( 'The verdict counts income only. What these brainrots could pass on in the Fuse or Mutation Machine isn’t priced in.' );
			}
		}

		// other items are listed, never valued
		[ 'give', 'get' ].forEach( function ( key ) {
			var xs = ( items[ key ] || [] ).map( function ( t ) {
				return String( t ).trim();
			} ).filter( function ( t ) {
				return t !== '';
			} );
			if ( xs.length ) {
				notes.push( ( key === 'give' ? 'You also give ' : 'You also get ' ) + xs.join( ', ' ) +
					'. Items are listed but not valued.' );
			}
		} );

		// what the trade does to this player's whole income; when nothing is
		// typed, the total of the reader's saved collection stands in for it
		typed = String( trade.myIncome || '' ).trim() !== '';
		fromCollection = !typed && trade.collectionIncome > 0;
		mine = fromCollection ? trade.collectionIncome : parseMoney( trade.myIncome );
		mineOut = { text: 'Enter your total $/s, like 2.5Qa or 40No, to see what this trade does to it.', tone: 'flat' };
		if ( typed && mine === null ) {
			mineOut = { text: 'That doesn’t look like an amount. Try a number with the game’s suffix, like 2.5Qa.', tone: 'bad' };
		} else if ( mine !== null && judge ) {
			if ( mine < give.now ) {
				mineOut = {
					text: fromCollection ?
						'Your collection’s total is less than what you give earns alone. Add what you give to your collection, or type your total.' :
						'That is less than what you give earns alone. Your total should include it.',
					tone: 'bad'
				};
			} else {
				after = mine - give.now + get.now;
				ch = ( after / mine - 1 ) * 100;
				mineOut = {
					text: 'Your income goes from ' + money( mine ) + '/s to ' + money( after ) + '/s right away: ' +
						( ch >= 0 ? '+' : '−' ) + Math.abs( ch ).toFixed( 1 ) + '%.',
					tone: ch >= 0 ? 'good' : 'bad'
				};
			}
		}
		mineOut.source = fromCollection ? 'collection' : ( typed ? 'typed' : 'none' );

		return {
			sides: [ give, get ],
			table: table,
			verdict: verdict,
			today: judge ? diff( give.now, get.now ) : { text: '—', tone: 'flat' },
			ceiling: judge ? diff( give.ceil, get.ceil ) : { text: '—', tone: 'flat' },
			take: take,
			pass: pass,
			notes: notes,
			warnings: warnings,
			mine: mineOut
		};
	}

	/* ================================================================
	 * My collection — the list, its summary, and where it is kept
	 *
	 * A saved brainrot is the same row the trade calculator uses, plus a
	 * list of notes on anything that was corrected when it was read back.
	 * Stored as compact, versioned JSON:
	 *   {"v":1,"r":[[name, mutation, [traits], evolution, level], ...]}
	 *
	 * Where it is kept:
	 *   - logged in: privately in the reader's own account preferences,
	 *     under userjs-ffb-collection. Saving it is the ONLY request this
	 *     script ever makes: one call to this wiki's own API (options),
	 *     made only after the reader edits their list, 1.5 s after they
	 *     stop, and never for anyone else's data.
	 *   - logged out: localStorage in this browser (ffb-collection).
	 *   - neither available: kept for this visit only, and the page says so.
	 * ================================================================ */

	var COLLECTION_VERSION = 1;
	var COLLECTION_MAX = 600;
	// A full 600-brainrot list is about 60,000 characters and the longest
	// real name is 23: anything far past these is not a list, and could
	// only slow the reader's own page down or fill their storage.
	var MAX_PASTE_CHARS = 200000;
	var MAX_NAME_CHARS = 60;
	var OPTION_KEY = 'userjs-ffb-collection';
	var BROWSER_KEY = 'ffb-collection';
	var OFFERED_KEY = 'ffb-collection-offered';
	var SAVE_DELAY = 1500;

	/** A saved list as the compact JSON text that is stored. */
	function serializeCollection( rows ) {
		return JSON.stringify( {
			v: COLLECTION_VERSION,
			r: rows.map( function ( r ) {
				return [
					r.name,
					r.mutation,
					r.traits.filter( function ( t ) {
						return t !== '';
					} ),
					r.evolution,
					r.level
				];
			} )
		} );
	}

	function wholeNumber( x, lo, hi ) {
		return typeof x === 'number' && x === Math.floor( x ) && x >= lo && x <= hi;
	}

	/**
	 * One stored entry back into a row. Anything odd is kept, or corrected
	 * and noted in row.notes, rather than dropped. Returns null only for an
	 * entry with no name at all, which cannot be shown as a brainrot.
	 * Names the catalog doesn't know are kept as they are; catalogIssues()
	 * lists them.
	 */
	function parseSavedRow( item, cat ) {
		var d = cat.data;
		var row, traits, i, t;
		if ( !Array.isArray( item ) || typeof item[ 0 ] !== 'string' || item[ 0 ].trim() === '' ||
			item[ 0 ].trim().length > MAX_NAME_CHARS ) {
			return null;
		}
		row = {
			name: item[ 0 ].trim(),
			mutation: typeof item[ 1 ] === 'string' && item[ 1 ] !== '' && item[ 1 ].length <= MAX_NAME_CHARS ?
				item[ 1 ] : cat.defaultMutation,
			traits: [],
			evolution: 0,
			level: 1,
			notes: []
		};
		for ( i = 0; i < d.maxTraits; i++ ) {
			row.traits.push( '' );
		}
		traits = Array.isArray( item[ 2 ] ) ? item[ 2 ] : [];
		for ( i = 0; i < traits.length; i++ ) {
			t = traits[ i ];
			if ( typeof t !== 'string' || t === '' || t.length > MAX_NAME_CHARS || row.traits.indexOf( t ) !== -1 ) {
				continue;
			}
			if ( i >= d.maxTraits ) {
				row.notes.push( 'more than ' + d.maxTraits + ' traits; “' + t + '” was left off' );
				continue;
			}
			row.traits[ i ] = t;
		}
		if ( wholeNumber( item[ 3 ], 0, d.maxEvolution ) ) {
			row.evolution = item[ 3 ];
		} else if ( item[ 3 ] !== undefined ) {
			row.notes.push( 'evolution “' + item[ 3 ] + '” not understood, shown as unevolved' );
		}
		if ( wholeNumber( item[ 4 ], 1, d.maxLevel ) ) {
			row.level = item[ 4 ];
		} else if ( item[ 4 ] !== undefined ) {
			row.notes.push( 'level “' + item[ 4 ] + '” not understood, shown as level 1' );
		}
		return row;
	}

	/**
	 * Stored text back into rows. Never throws. The result says what went
	 * wrong, if anything:
	 *   error: null, 'unreadable' (not our JSON at all) or 'newer' (saved by
	 *          a later version of this script, so it is left untouched)
	 *   skipped: entries that could not be read as a brainrot
	 * A bare array of rows is read as version 0 (no wrapper).
	 */
	function parseCollection( text, cat ) {
		var result = { rows: [], error: null, skipped: 0 };
		var parsed, list;
		if ( text === null || text === undefined || String( text ).trim() === '' ) {
			return result;
		}
		try {
			parsed = JSON.parse( String( text ) );
		} catch ( err ) {
			result.error = 'unreadable';
			return result;
		}
		if ( Array.isArray( parsed ) ) {
			list = parsed;
		} else if ( parsed && typeof parsed === 'object' && parsed.v === COLLECTION_VERSION && Array.isArray( parsed.r ) ) {
			list = parsed.r;
		} else if ( parsed && typeof parsed === 'object' && typeof parsed.v === 'number' && parsed.v > COLLECTION_VERSION ) {
			result.error = 'newer';
			return result;
		} else {
			result.error = 'unreadable';
			return result;
		}
		list.forEach( function ( item ) {
			var row = parseSavedRow( item, cat );
			if ( row ) {
				result.rows.push( row );
			} else {
				result.skipped++;
			}
		} );
		return result;
	}

	/* ================================================================
	 * A trade as text: remembered in this browser, and in share links
	 * ================================================================ */

	var TRADE_KEY = 'ffb-trade';
	var TRADE_VERSION = 1;
	var CALC_SITE = 'https://aleseea.github.io/fish-for-brainrots/';

	/** The trade on screen as compact JSON: the collection's row format per side. */
	function serializeTrade( state ) {
		var side = function ( rows ) {
			return JSON.parse( serializeCollection( rows ) ).r;
		};
		var names = function ( items ) {
			return items.map( function ( it ) {
				return typeof it === 'string' ? it : it.text;
			} ).filter( function ( t ) {
				return t;
			} );
		};
		return JSON.stringify( {
			v: TRADE_VERSION,
			g: side( state.give ),
			t: side( state.get ),
			ig: names( state.items.give ),
			it: names( state.items.get ),
			m: String( state.myIncome || '' ).slice( 0, 40 )
		} );
	}

	/**
	 * Text back into a trade, or null when it isn't one. Never throws. The
	 * same limits as a pasted list apply: the size, each side's brainrot
	 * count, name lengths, and items only from the catalog's list.
	 */
	function parseTrade( text, cat ) {
		var t, max, side, items;
		if ( typeof text !== 'string' || text.length === 0 || text.length > MAX_PASTE_CHARS ) {
			return null;
		}
		try {
			t = JSON.parse( text );
		} catch ( err ) {
			return null;
		}
		if ( !t || typeof t !== 'object' || t.v !== TRADE_VERSION ) {
			return null;
		}
		max = cat.data.maxPerSide;
		side = function ( list ) {
			return ( Array.isArray( list ) ? list : [] ).slice( 0, max ).map( function ( item ) {
				return parseSavedRow( item, cat );
			} ).filter( function ( r ) {
				return r;
			} );
		};
		items = function ( list ) {
			return ( Array.isArray( list ) ? list : [] ).slice( 0, max ).map( function ( x ) {
				return typeof x === 'string' && x.length <= MAX_NAME_CHARS ? matchItem( cat, x ) : null;
			} ).filter( function ( x ) {
				return x;
			} );
		};
		return {
			give: side( t.g ),
			get: side( t.t ),
			items: { give: items( t.ig ), get: items( t.it ) },
			myIncome: typeof t.m === 'string' ? t.m.slice( 0, 40 ) : ''
		};
	}

	/** A trade for a link's #fragment: base64url of the JSON's UTF-8 bytes. */
	function tradeToFragment( state ) {
		var json = serializeTrade( state );
		var bin = unescape( encodeURIComponent( json ) );
		return 'trade=' + btoa( bin ).replace( /\+/g, '-' ).replace( /\//g, '_' ).replace( /=+$/, '' );
	}

	/** A #fragment (with or without the #) back into a trade, or null. */
	function tradeFromFragment( fragment, cat ) {
		var m = /(?:^#?|&)trade=([A-Za-z0-9_-]+)/.exec( String( fragment || '' ) );
		var b64, json;
		if ( !m || m[ 1 ].length > MAX_PASTE_CHARS ) {
			return null;
		}
		b64 = m[ 1 ].replace( /-/g, '+' ).replace( /_/g, '/' );
		while ( b64.length % 4 ) {
			b64 += '=';
		}
		try {
			json = decodeURIComponent( escape( atob( b64 ) ) );
		} catch ( err ) {
			return null;
		}
		return parseTrade( json, cat );
	}

	/** The share link for a trade: the calculator page, which works on phones too. */
	function tradeLink( state ) {
		return CALC_SITE + '#' + tradeToFragment( state );
	}

	/** The number suffixes, smallest first, with their names, for the legend. */
	var SUFFIX_NAMES = {
		K: 'thousand', M: 'million', B: 'billion', T: 'trillion', Qa: 'quadrillion',
		Qi: 'quintillion', Sx: 'sextillion', Sp: 'septillion', Oc: 'octillion',
		No: 'nonillion', Dc: 'decillion', Ud: 'undecillion'
	};
	function suffixRows() {
		return SUFFIXES.slice().reverse().map( function ( u ) {
			return { suffix: u[ 1 ], name: SUFFIX_NAMES[ u[ 1 ] ] || '', zeros: Math.round( Math.log( u[ 0 ] ) / Math.LN10 ) };
		} );
	}

	/** Adds rows up to the cap. Returns how many did not fit. */
	function addToCollection( rows, more ) {
		var left = 0;
		more.forEach( function ( r ) {
			if ( rows.length < COLLECTION_MAX ) {
				rows.push( r );
			} else {
				left++;
			}
		} );
		return left;
	}

	/** What in a row the catalog doesn't recognise, as short phrases. */
	function catalogIssues( cat, row ) {
		var out = [];
		if ( !has( cat.brainrots, row.name ) ) {
			out.push( 'not in the catalog' );
		}
		if ( !isDefault( row.mutation ) && !has( cat.mutations, row.mutation ) ) {
			out.push( 'mutation “' + row.mutation + '” is not in the catalog' );
		}
		row.traits.forEach( function ( t ) {
			if ( t !== '' && !has( cat.traits, t ) ) {
				out.push( 'trait “' + t + '” is not in the catalog' );
			}
		} );
		return out;
	}

	/** A row the catalog fully recognises: its figures can be trusted. */
	function catalogOk( cat, row ) {
		return catalogIssues( cat, row ).length === 0;
	}

	/**
	 * rowStats for a saved brainrot, except that a row with something the
	 * catalog doesn't know counts as unmeasured rather than being computed
	 * without it (which would understate it).
	 */
	function collectionStats( cat, row ) {
		var s = rowStats( cat, row );
		if ( !catalogOk( cat, row ) ) {
			s.measured = false;
			s.now = s.value = s.max = s.ceil = null;
		}
		return s;
	}

	/** "Hydra Dragon (Ruby + Evil, Evo 3, level 185)" */
	function describeSaved( cat, row ) {
		var bits = [];
		var traits = row.traits.filter( function ( t ) {
			return t !== '';
		} );
		var perm = [];
		if ( !isDefault( row.mutation ) ) {
			perm.push( row.mutation );
		}
		if ( traits.length ) {
			perm.push( traits.map( function ( t ) {
				return traitLabel( cat, t );
			} ).join( ', ' ) );
		}
		if ( perm.length ) {
			bits.push( perm.join( ' + ' ) );
		}
		bits.push( row.evolution ? 'Evo ' + row.evolution : 'unevolved' );
		bits.push( 'level ' + row.level );
		return row.name + ' (' + bits.join( ', ' ) + ')';
	}

	function plural( n, one, many ) {
		return n + ' ' + ( n === 1 ? one : many );
	}

	/**
	 * The facts shown above the list. Only figures from the formula; the
	 * one pointer it gives is which brainrot has the highest ceiling.
	 */
	function collectionSummary( cat, rows ) {
		var stats = rows.map( function ( r ) {
			return collectionStats( cat, r );
		} );
		var sum = {
			count: rows.length,
			countText: plural( rows.length, 'brainrot', 'brainrots' ),
			totalNow: 0,
			totalValue: 0,
			measured: 0,
			unmeasured: 0,
			unknown: 0,
			strongest: null,
			highestCeiling: null,
			ready: [],
			maxed: 0,
			byRarity: [],
			full: rows.length >= COLLECTION_MAX
		};
		var rarityAt = {};
		cat.groups.forEach( function ( g ) {
			rarityAt[ g.label ] = { label: g.label, count: 0 };
		} );
		var notInCatalog = { label: 'Not in the catalog', count: 0 };

		rows.forEach( function ( r, i ) {
			var s = stats[ i ];
			var entry = has( cat.brainrots, r.name ) ? cat.brainrots[ r.name ] : null;
			if ( entry ) {
				rarityAt[ entry.rarity ].count++;
			} else {
				notInCatalog.count++;
			}
			if ( s.maxed ) {
				sum.maxed++;
			}
			if ( s.canEvolve ) {
				sum.ready.push( r );
			}
			if ( !s.measured ) {
				if ( catalogOk( cat, r ) ) {
					sum.unmeasured++;
				} else {
					sum.unknown++;
				}
				return;
			}
			sum.measured++;
			sum.totalNow += s.now;
			sum.totalValue += s.value;
			if ( !sum.strongest || s.now > sum.strongest.now ) {
				sum.strongest = { row: r, now: s.now };
			}
			if ( !sum.highestCeiling || s.ceil > sum.highestCeiling.ceil ) {
				sum.highestCeiling = { row: r, ceil: s.ceil };
			}
		} );

		cat.groups.forEach( function ( g ) {
			if ( rarityAt[ g.label ].count ) {
				sum.byRarity.push( rarityAt[ g.label ] );
			}
		} );
		if ( notInCatalog.count ) {
			sum.byRarity.push( notInCatalog );
		}

		sum.totalNowText = money( sum.totalNow ) + '/s';
		sum.totalValueText = money( sum.totalValue );
		var out = [];
		if ( sum.unmeasured ) {
			out.push( sum.unmeasured + ' with no measured income' );
		}
		if ( sum.unknown ) {
			out.push( sum.unknown + ' not in the catalog' );
		}
		sum.leftOutText = out.length ? 'Left out of the totals: ' + out.join( ', ' ) + '.' : '';
		sum.strongestText = sum.strongest ?
			describeSaved( cat, sum.strongest.row ) + ' · ' + money( sum.strongest.now ) + '/s' : '—';
		sum.highestCeilingText = sum.highestCeiling ?
			describeSaved( cat, sum.highestCeiling.row ) + ' · ' + money( sum.highestCeiling.ceil ) + '/s fully upgraded' : '—';
		sum.readyText = sum.ready.length ? sum.ready.map( function ( r ) {
			return r.name + ' (' + ( r.evolution ? 'Evo ' + r.evolution : 'unevolved' ) + ')';
		} ).join( ', ' ) : 'None at level ' + cat.data.maxLevel + ' yet.';
		sum.byRarityText = sum.byRarity.map( function ( g ) {
			return g.label + ' ' + g.count;
		} ).join( ' · ' );
		return sum;
	}

	var SORTS = [
		{ value: 'income', label: 'Income now' },
		{ value: 'ceiling', label: 'Fully upgraded' },
		{ value: 'rarity', label: 'Rarity' },
		{ value: 'name', label: 'Name' }
	];

	/**
	 * A sorted copy. Income and ceiling go highest first with unmeasured
	 * brainrots last; rarity follows the catalog (rarest first), then
	 * income. Ties keep the saved order, so the sort is stable everywhere.
	 */
	function sortCollection( cat, rows, key ) {
		var rarityRank = {};
		cat.groups.forEach( function ( g, i ) {
			rarityRank[ g.label ] = i;
		} );
		var keyed = rows.map( function ( r, i ) {
			var s = collectionStats( cat, r );
			var entry = has( cat.brainrots, r.name ) ? cat.brainrots[ r.name ] : null;
			return {
				row: r,
				at: i,
				now: s.measured ? s.now : -1,
				ceil: s.measured ? s.ceil : -1,
				rarity: entry ? rarityRank[ entry.rarity ] : cat.groups.length,
				name: r.name.toLowerCase()
			};
		} );
		keyed.sort( function ( a, b ) {
			var d = 0;
			if ( key === 'ceiling' ) {
				d = b.ceil - a.ceil;
			} else if ( key === 'rarity' ) {
				d = a.rarity - b.rarity || b.now - a.now;
			} else if ( key === 'name' ) {
				d = a.name < b.name ? -1 : ( a.name > b.name ? 1 : 0 );
			} else {
				d = b.now - a.now;
			}
			return d || a.at - b.at;
		} );
		return keyed.map( function ( k ) {
			return k.row;
		} );
	}

	/** Saved brainrots the trade calculator can use, strongest first. */
	function collectionPicks( cat, rows ) {
		return sortCollection( cat, rows, 'income' ).filter( function ( r ) {
			return catalogOk( cat, r );
		} ).map( function ( r ) {
			var s = collectionStats( cat, r );
			var bits = [ r.name ];
			if ( !isDefault( r.mutation ) ) {
				bits.push( r.mutation );
			}
			bits.push( 'level ' + r.level );
			bits.push( r.evolution ? 'Evo ' + r.evolution : 'unevolved' );
			bits.push( s.measured ? money( s.now ) + '/s' : 'no measured income' );
			return { row: r, label: bits.join( ' · ' ) };
		} );
	}

	/** A trade row with exactly the saved brainrot's stats. */
	function tradeRowFromSaved( cat, saved ) {
		var r = newRow( cat, saved.name );
		r.mutation = saved.mutation;
		r.evolution = saved.evolution;
		r.level = saved.level;
		r.traits = saved.traits.slice( 0, cat.data.maxTraits );
		while ( r.traits.length < cat.data.maxTraits ) {
			r.traits.push( '' );
		}
		return r;
	}

	/** Total income of the measured, recognised part of a collection. */
	function collectionIncome( cat, rows ) {
		return collectionSummary( cat, rows ).totalNow;
	}

	// ---- where the list is kept --------------------------------------------

	/** localStorage, if this browser lets the page use it at all. */
	function workingStorage( storage ) {
		try {
			if ( !storage ) {
				return null;
			}
			storage.setItem( BROWSER_KEY + '-test', '1' );
			storage.removeItem( BROWSER_KEY + '-test' );
			return storage;
		} catch ( err ) {
			return null;
		}
	}

	function readStorage( storage, key ) {
		try {
			return storage ? storage.getItem( key ) : null;
		} catch ( err ) {
			return null;
		}
	}

	function writeStorage( storage, key, value ) {
		try {
			storage.setItem( key, value );
			return true;
		} catch ( err ) {
			return false;
		}
	}

	/**
	 * Picks where the list lives. env is { mw, storage }: the page's mw (or
	 * null) and its localStorage (or null). Each store has
	 *   kind: 'account' | 'browser' | 'none'
	 *   load(): the stored text, or null
	 *   save( text, done ): done( null ) or done( 'what went wrong' )
	 */
	function chooseStore( env ) {
		var m = env.mw;
		var storage = workingStorage( env.storage );
		if ( m && m.user && m.user.isAnon && !m.user.isAnon() && m.user.options && m.loader && m.Api ) {
			return {
				kind: 'account',
				load: function () {
					var v = m.user.options.get( OPTION_KEY );
					return typeof v === 'string' ? v : null;
				},
				save: function ( text, done ) {
					m.loader.using( 'mediawiki.api' ).then( function () {
						return new m.Api().saveOption( OPTION_KEY, text );
					} ).then( function () {
						// keep this page's copy in step with the account
						m.user.options.set( OPTION_KEY, text );
						done( null );
					}, function ( code ) {
						done( typeof code === 'string' && code ? code : 'the wiki did not accept it' );
					} );
				}
			};
		}
		if ( storage ) {
			return {
				kind: 'browser',
				load: function () {
					return readStorage( storage, BROWSER_KEY );
				},
				save: function ( text, done ) {
					done( writeStorage( storage, BROWSER_KEY, text ) ? null : 'this browser would not store it' );
				}
			};
		}
		return {
			kind: 'none',
			load: function () {
				return null;
			},
			save: function ( text, done ) {
				done( 'this browser won’t let the page remember it' );
			}
		};
	}

	/**
	 * A logged-in reader with an empty account list but a list saved in
	 * this browser is offered, once, to move it over. Returns the rows to
	 * offer, or null.
	 */
	function browserListOffer( store, accountRows, storage, cat ) {
		var text, parsed;
		if ( store.kind !== 'account' || accountRows.length ) {
			return null;
		}
		if ( readStorage( storage, OFFERED_KEY ) ) {
			return null;
		}
		text = readStorage( storage, BROWSER_KEY );
		parsed = parseCollection( text, cat );
		return parsed.rows.length ? parsed.rows : null;
	}

	/** The page's own mw and localStorage, when there are any. */
	function pageEnv() {
		var env = { mw: typeof mw !== 'undefined' ? mw : null, storage: null };
		try {
			env.storage = window.localStorage;
		} catch ( err ) {
			env.storage = null;
		}
		return env;
	}

	/* ================================================================
	 * Trade calculator — the page
	 * ================================================================ */

	var tradeCount = 0;

	/** ?brainrot=Tim_Cheese puts that brainrot on the "You get" side. */
	function prefillName( cat ) {
		var m = /[?&]brainrot=([^&#]*)/.exec( window.location.search );
		var name;
		if ( !m ) {
			return null;
		}
		try {
			name = decodeURIComponent( m[ 1 ].replace( /\+/g, ' ' ) ).replace( /_/g, ' ' );
		} catch ( err ) {
			return null;
		}
		return has( cat.brainrots, name ) ? name : null;
	}

	/** A label above its control, sharing an id. */
	function field( id, labelText, control, className ) {
		var wrap = el( 'div', 'ffb-trade-field' + ( className ? ' ' + className : '' ) );
		var label = el( 'label', 'ffb-trade-label', labelText );
		label.htmlFor = id;
		control.id = id;
		wrap.appendChild( label );
		wrap.appendChild( control );
		return { node: wrap, label: label };
	}

	function removeButton( ariaLabel ) {
		var b = el( 'button', 'ffb-trade-remove', '×' );
		b.type = 'button';
		b.setAttribute( 'aria-label', ariaLabel );
		return b;
	}

	/**
	 * A searchable picker (an ARIA combobox) for the calculators' lists:
	 * brainrots, mutations and traits. The reader types any part of a name
	 * and taps a match. cfg:
	 *   id, current: the field id and the value now chosen
	 *   inputClass, placeholder: extra classes and the empty-box hint
	 *   label( value ): what the box shows for a chosen value
	 *   search( query ): [ { value, name?, meta?, right? } ] in display order
	 *   exact( text ): the value typed text means, or null for none
	 *   onPick( value ): runs when a value is chosen
	 * Anything that isn't a match is put back when the box is left, so the
	 * row always holds a real value. Returns { node, input, set( value ) }.
	 */
	// the colour blends a mutation may have instead of one colour; the Lua
	// module (Module:Brainrot, BLENDS) draws the same ones
	var BLENDS = {
		rainbow: 'linear-gradient(135deg, #ef4444, #f59e0b, #eab308, #22c55e, #3b82f6, #a855f7)',
		'fire-ice': 'linear-gradient(135deg, #ef4444 50%, #60a5fa 50%)',
		party: 'linear-gradient(135deg, #ec4899, #f59e0b, #22c55e, #3b82f6)'
	};

	/** A colour the squares may use: #rrggbb or a blend's name, else null. */
	function safeColor( c ) {
		return typeof c === 'string' && ( /^#[0-9a-f]{6}$/i.test( c ) || has( BLENDS, c ) ) ? c : null;
	}

	/** A small square in a rarity's or mutation's colour (see safeColor). */
	function swatch( color ) {
		var sq = el( 'span', 'ffb-swatch' );
		sq.setAttribute( 'style', has( BLENDS, color ) ?
			'background-image: ' + BLENDS[ color ] + ';' : 'background-color: ' + color + ';' );
		sq.setAttribute( 'aria-hidden', 'true' );
		return sq;
	}

	/**
	 * "What do K, M, B… mean?": a closed-by-default list of the number
	 * suffixes, smallest first, since 5Sp vs 3Oc isn't obvious to everyone.
	 */
	function suffixLegend() {
		var box = el( 'details', 'ffb-legend' );
		box.appendChild( el( 'summary', 'ffb-legend-summary', 'What do K, M, B… mean?' ) );
		var list = el( 'ul', 'ffb-legend-list' );
		suffixRows().forEach( function ( r ) {
			var li = el( 'li', 'ffb-legend-row' );
			li.appendChild( el( 'strong', 'ffb-legend-suffix', r.suffix ) );
			li.appendChild( el( 'span', 'ffb-legend-name', r.name ) );
			li.appendChild( el( 'span', 'ffb-legend-zeros', '1 and ' + r.zeros + ' zeros' ) );
			list.appendChild( li );
		} );
		box.appendChild( list );
		box.appendChild( el( 'p', 'ffb-legend-note', 'Each step is 1,000 times the one before it, so 1Oc is 1,000Sp.' ) );
		return box;
	}

	var PICK_SHOWN = 60;
	var pickCount = 0;
	function buildSearchPicker( cfg ) {
		var listId = cfg.id + '-list-' + ( ++pickCount );
		var wrap = el( 'div', 'ffb-pick' );
		var input = el( 'input', 'ffb-pick-input' + ( cfg.inputClass ? ' ' + cfg.inputClass : '' ) );
		var list = el( 'ul', 'ffb-pick-list' );
		var label = cfg.label || function ( v ) {
			return v;
		};
		var matches = [];
		var active = -1;
		var chosen = cfg.current;
		// list-only (short fixed lists): tapping opens the list, and no
		// keyboard pops up on a phone because the box can't be typed in
		var searchable = cfg.searchable !== false;
		if ( !searchable ) {
			wrap.className += ' ffb-pick-listonly';
			input.readOnly = true;
		}
		input.type = 'text';
		input.value = label( chosen );
		input.autocomplete = 'off';
		input.setAttribute( 'role', 'combobox' );
		input.setAttribute( 'aria-autocomplete', 'list' );
		input.setAttribute( 'aria-expanded', 'false' );
		input.setAttribute( 'aria-controls', listId );
		input.setAttribute( 'spellcheck', 'false' );
		input.setAttribute( 'autocapitalize', 'off' );
		input.placeholder = searchable ? cfg.placeholder || 'Type to search' : '';
		list.id = listId;
		list.setAttribute( 'role', 'listbox' );
		list.hidden = true;
		wrap.appendChild( input );
		wrap.appendChild( list );

		function setActive( i ) {
			active = i;
			Array.prototype.forEach.call( list.childNodes, mark );
			function mark( li, k ) {
				if ( k >= matches.length ) {
					return;
				}
				li.setAttribute( 'aria-selected', k === i ? 'true' : 'false' );
				li.className = 'ffb-pick-option' + ( k === i ? ' ffb-pick-option-active' : '' );
			}
			if ( i >= 0 && list.childNodes[ i ] ) {
				input.setAttribute( 'aria-activedescendant', list.childNodes[ i ].id );
				if ( list.childNodes[ i ].scrollIntoView ) {
					list.childNodes[ i ].scrollIntoView( { block: 'nearest' } );
				}
			} else {
				input.setAttribute( 'aria-activedescendant', '' );
			}
		}
		function open( query ) {
			var all = cfg.search( query );
			matches = all.slice( 0, PICK_SHOWN );
			clear( list );
			matches.forEach( function ( m, k ) {
				var li = el( 'li', 'ffb-pick-option' );
				li.id = listId + '-' + k;
				li.setAttribute( 'role', 'option' );
				var nameCell = el( 'span', 'ffb-pick-name' );
				if ( m.color ) {
					nameCell.appendChild( swatch( m.color ) );
				}
				nameCell.appendChild( el( 'span', null, m.name || label( m.value ) ) );
				li.appendChild( nameCell );
				if ( m.meta ) {
					li.appendChild( el( 'span', 'ffb-pick-meta', m.meta ) );
				}
				if ( m.right ) {
					li.appendChild( el( 'span', 'ffb-pick-base', m.right ) );
				}
				// mousedown, not click: it lands before the input loses focus
				li.addEventListener( 'mousedown', function ( e ) {
					if ( e && e.preventDefault ) {
						e.preventDefault();
					}
					pick( m.value );
				} );
				list.appendChild( li );
			} );
			if ( !matches.length ) {
				list.appendChild( el( 'li', 'ffb-pick-none', 'No ' + ( cfg.noun || 'match' ) + ' matches “' + query + '”.' ) );
			} else if ( all.length > matches.length ) {
				list.appendChild( el( 'li', 'ffb-pick-none', ( all.length - matches.length ) + ' more: keep typing to narrow it down.' ) );
			}
			list.hidden = false;
			input.setAttribute( 'aria-expanded', 'true' );
			setActive( matches.length ? 0 : -1 );
		}
		function close() {
			list.hidden = true;
			input.setAttribute( 'aria-expanded', 'false' );
			input.setAttribute( 'aria-activedescendant', '' );
			active = -1;
		}
		function pick( value ) {
			chosen = value;
			input.value = label( value );
			close();
			cfg.onPick( value );
		}
		function settle() {
			var v = cfg.exact( input.value );
			if ( v !== null && v !== chosen ) {
				pick( v );
			} else {
				input.value = label( chosen );
				close();
			}
		}

		input.addEventListener( 'focus', function () {
			if ( searchable && input.select ) {
				input.select();
			}
			open( '' );
		} );
		// a second tap reopens the list after a pick (focus doesn't fire again)
		input.addEventListener( 'click', function () {
			if ( list.hidden ) {
				open( '' );
			}
		} );
		input.addEventListener( 'input', function () {
			open( input.value );
		} );
		input.addEventListener( 'keydown', function ( e ) {
			var key = e && e.key;
			if ( key === 'ArrowDown' || key === 'ArrowUp' ) {
				if ( list.hidden ) {
					open( input.value === label( chosen ) ? '' : input.value );
				} else if ( matches.length ) {
					setActive( ( active + ( key === 'ArrowDown' ? 1 : matches.length - 1 ) ) % matches.length );
				}
				e.preventDefault();
			} else if ( key === 'Enter' ) {
				if ( !list.hidden && active >= 0 && matches[ active ] ) {
					pick( matches[ active ].value );
					e.preventDefault();
				}
			} else if ( key === 'Escape' ) {
				input.value = label( chosen );
				close();
			}
		} );
		input.addEventListener( 'blur', settle );
		input.addEventListener( 'change', settle );

		return {
			node: wrap,
			input: input,
			set: function ( value ) {
				chosen = value;
				input.value = label( value );
			}
		};
	}

	/** The brainrot picker: 161 names are too many to scroll on a phone. */
	function buildNamePicker( cat, id, current, onPick ) {
		return buildSearchPicker( {
			id: id,
			current: current,
			inputClass: 'ffb-trade-input ffb-trade-select-name',
			placeholder: 'Type a name',
			noun: 'brainrot',
			search: function ( q ) {
				return searchBrainrots( cat, q ).map( function ( m ) {
					return { value: m.value, meta: m.rarity, color: m.color, right: m.base || 'no base yet' };
				} );
			},
			exact: function ( text ) {
				return exactBrainrot( cat, text );
			},
			onPick: onPick
		} );
	}

	/**
	 * The picker for a short fixed list of { value, label } (evolution, sort
	 * order, a saved brainrot): the same look, list-only. The box shows the
	 * chosen label; a value or a label typed into it (by a test or an
	 * assistive tool) picks that option.
	 */
	function buildListPicker( id, options, current, inputClass, onPick ) {
		var labelOf = function ( v ) {
			var i;
			for ( i = 0; i < options.length; i++ ) {
				if ( options[ i ].value === v ) {
					return options[ i ].label;
				}
			}
			return v;
		};
		return buildSearchPicker( {
			id: id,
			current: current,
			searchable: false,
			inputClass: inputClass,
			label: labelOf,
			search: function () {
				return options.map( function ( o ) {
					return { value: o.value, name: o.label };
				} );
			},
			exact: function ( text ) {
				var t = String( text || '' ).trim().toLowerCase();
				var i;
				for ( i = 0; i < options.length; i++ ) {
					if ( options[ i ].value.toLowerCase() === t || options[ i ].label.toLowerCase() === t ) {
						return options[ i ].value;
					}
				}
				return null;
			},
			onPick: onPick
		} );
	}

	/**
	 * Puts a picker into a field made by field(): the label stays on the
	 * input, which goes back into the picker ahead of its list.
	 */
	function pickerField( id, labelText, picker, className ) {
		var f = field( id, labelText, picker.input, className );
		picker.node.insertBefore( picker.input, picker.node.firstChild );
		f.node.appendChild( picker.node );
		return f;
	}

	/**
	 * One brainrot's controls and figures: the card both the trade
	 * calculator and the collection use. hooks.onChange runs after any
	 * edit to row; hooks.onRemove when its remove button is pressed.
	 * options.showCeiling adds the fully upgraded figure.
	 */
	function buildRowCard( cat, idp, row, hooks, options ) {
	var data = cat.data;
		var card = el( 'div', 'ffb-trade-card' );
		var i;

		var top = el( 'div', 'ffb-trade-card-top' );
		// searchable: 161 names are too many to scroll on a phone
		var namePicker = buildNamePicker( cat, idp + 'b', row.name, function ( name ) {
			row.name = name;
			hooks.onChange();
		} );
		var nameSelect = namePicker.input;
		var nameField = pickerField( idp + 'b', 'Brainrot', namePicker, 'ffb-trade-field-name' );
		var rarity = el( 'span', 'ffb-trade-rarity' );
		nameField.label.appendChild( rarity );
		var remove = removeButton( 'Remove ' + row.name );
		top.appendChild( nameField.node );
		// a copy of this card, for trades with several of the same brainrot
		var dup = null;
		if ( hooks.onDuplicate ) {
			dup = el( 'button', 'ffb-trade-dup', '⧉' );
			dup.type = 'button';
			dup.setAttribute( 'aria-label', 'Duplicate ' + row.name );
			dup.title = 'Duplicate';
			dup.addEventListener( 'click', function () {
				hooks.onDuplicate();
			} );
			top.appendChild( dup );
		}
		top.appendChild( remove );
		card.appendChild( top );

		// evolution, mutation, level: the wiki's order
		var fields = el( 'div', 'ffb-trade-fields' );
		var evoPicker = buildListPicker( idp + 'e', evolutionOptions( cat ), String( row.evolution ),
			'ffb-trade-input ffb-trade-select-evo', function ( v ) {
				row.evolution = parseInt( v, 10 );
				hooks.onChange();
			} );
		var mutPicker = buildSearchPicker( {
			id: idp + 'm',
			current: row.mutation,
			inputClass: 'ffb-trade-input ffb-trade-select-mut',
			placeholder: 'Type a mutation',
			noun: 'mutation',
			search: function ( q ) {
				return searchMutations( cat, q );
			},
			exact: function ( text ) {
				return exactName( cat.mutations, text );
			},
			onPick: function ( m ) {
				row.mutation = m;
				hooks.onChange();
			}
		} );
		var lvlInput = el( 'input', 'ffb-trade-input ffb-trade-input-level' );
		lvlInput.type = 'number';
		lvlInput.min = '1';
		lvlInput.max = String( data.maxLevel );
		lvlInput.step = '1';
		lvlInput.setAttribute( 'inputmode', 'numeric' );
		lvlInput.value = String( row.level );
		fields.appendChild( pickerField( idp + 'e', 'Evolution', evoPicker, 'ffb-trade-field-evo' ).node );
		fields.appendChild( pickerField( idp + 'm', 'Mutation', mutPicker, 'ffb-trade-field-mut' ).node );
		fields.appendChild( field( idp + 'l', 'Level', lvlInput, 'ffb-trade-field-level' ).node );
		card.appendChild( fields );

		// the levels people actually check, and "Max" (level cap and the last
		// evolution), without typing on a phone keyboard
		var quick = el( 'div', 'ffb-trade-quick' );
		quick.setAttribute( 'role', 'group' );
		quick.setAttribute( 'aria-label', 'Quick level' );
		function setLevel( level, evolution ) {
			row.level = level;
			lvlInput.value = String( level );
			if ( evolution !== undefined ) {
				row.evolution = evolution;
				evoPicker.set( String( evolution ) );
			}
			hooks.onChange();
		}
		[ 1, 100, 175, data.maxLevel ].forEach( function ( lv ) {
			var b = el( 'button', 'ffb-trade-quick-btn', 'Lv ' + lv );
			b.type = 'button';
			b.addEventListener( 'click', function () {
				setLevel( lv );
			} );
			quick.appendChild( b );
		} );
		var maxBtn = el( 'button', 'ffb-trade-quick-btn ffb-trade-quick-max', 'Max' );
		maxBtn.type = 'button';
		maxBtn.title = 'Level ' + data.maxLevel + ', Evo ' + data.maxEvolution;
		maxBtn.setAttribute( 'aria-label', 'Max: level ' + data.maxLevel + ' and Evo ' + data.maxEvolution );
		maxBtn.addEventListener( 'click', function () {
			setLevel( data.maxLevel, data.maxEvolution );
		} );
		quick.appendChild( maxBtn );
		card.appendChild( quick );

		var traitGrid = el( 'div', 'ffb-trade-traits' );
		// one searchable picker per slot; each offers only traits no other
		// slot holds, worked out when it opens
		var traitPickers = [];
		function traitPicker( slot ) {
			return buildSearchPicker( {
				id: idp + 't' + slot,
				current: row.traits[ slot ],
				inputClass: 'ffb-trade-input ffb-trade-select-trait',
				placeholder: 'No trait',
				noun: 'trait',
				label: function ( v ) {
					return traitLabel( cat, v );
				},
				search: function ( q ) {
					return searchTraits( cat, row, slot, q );
				},
				exact: function ( text ) {
					var t = String( text || '' ).trim();
					if ( t === '' || squash( t ) === 'notrait' ) {
						return '';
					}
					var name = null;
					Object.keys( cat.traits ).forEach( function ( n ) {
						if ( squash( n ) === squash( t ) ) {
							name = n;
						}
					} );
					return name && searchTraits( cat, row, slot, name ).some( function ( m ) {
						return m.value === name;
					} ) ? name : null;
				},
				onPick: function ( t ) {
					setTrait( cat, row, slot, t );
					hooks.onChange();
				}
			} );
		}
		for ( i = 0; i < data.maxTraits; i++ ) {
			traitPickers.push( traitPicker( i ) );
			traitGrid.appendChild( pickerField( idp + 't' + i, 'Trait ' + ( i + 1 ), traitPickers[ i ] ).node );
		}
		card.appendChild( traitGrid );

		// the permanent part, broken down
		var parts = el( 'div', 'ffb-trade-parts' );
		function part( labelText, extra ) {
			var cell = el( 'div', 'ffb-trade-part' + ( extra ? ' ' + extra : '' ) );
			var out = el( 'span', 'ffb-trade-part-value' );
			cell.appendChild( el( 'span', 'ffb-trade-part-label', labelText ) );
			cell.appendChild( out );
			parts.appendChild( cell );
			return out;
		}
		var mutOut = part( 'Mutation' );
		var traitOut = part( 'Traits' );
		var bothOut = part( 'Together', 'ffb-trade-part-both' );
		// on phones the breakdown folds away behind this, so a full trade
		// isn't a long scroll; wider screens always show it (CSS)
		var detailsBtn = el( 'button', 'ffb-trade-details', 'Details' );
		detailsBtn.type = 'button';
		detailsBtn.setAttribute( 'aria-expanded', 'false' );
		detailsBtn.addEventListener( 'click', function () {
			var open = detailsBtn.getAttribute( 'aria-expanded' ) !== 'true';
			detailsBtn.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
			card.className = card.className.replace( / ffb-trade-card-open/g, '' ) + ( open ? ' ffb-trade-card-open' : '' );
		} );
		card.appendChild( detailsBtn );
		card.appendChild( parts );

		var foot = el( 'div', 'ffb-trade-card-foot' );
		var badge = el( 'span', 'ffb-trade-badge' );
		var figures = el( 'span', 'ffb-trade-card-figures' );
		var multOut = el( 'span', 'ffb-trade-card-mult' );
		var nowOut = el( 'span', 'ffb-trade-card-now' );
		figures.appendChild( multOut );
		figures.appendChild( nowOut );
		var ceilOut = null;
		if ( options && options.showCeiling ) {
			ceilOut = el( 'span', 'ffb-trade-card-ceil' );
			figures.appendChild( ceilOut );
		}
		foot.appendChild( badge );
		foot.appendChild( figures );
		card.appendChild( foot );

		var saveOut = null;
		if ( hooks.onSave ) {
			var tools = el( 'div', 'ffb-trade-card-tools' );
			var saveBtn = el( 'button', 'ffb-trade-save', 'Save to my collection' );
			saveBtn.type = 'button';
			saveOut = el( 'span', 'ffb-trade-save-out' );
			saveOut.setAttribute( 'aria-live', 'polite' );
			saveBtn.addEventListener( 'click', function () {
				hooks.onSave( function ( text ) {
					saveOut.textContent = text;
				} );
			} );
			tools.appendChild( saveBtn );
			tools.appendChild( saveOut );
			card.appendChild( tools );
		}

		// ---- events ---------------------------------------------------
		lvlInput.addEventListener( 'input', function () {
			var n = parseLevel( cat, lvlInput.value );
			if ( n !== null ) {
				row.level = n;
				hooks.onChange();
			}
		} );
		lvlInput.addEventListener( 'change', function () {
			// show the level actually in use once the reader leaves the box
			lvlInput.value = String( row.level );
		} );
		remove.addEventListener( 'click', function () {
			hooks.onRemove();
		} );

		return {
			node: card,
			focus: function () {
				nameSelect.focus();
			},
			update: function ( view ) {
				// " · ■ Rarity": the square sits with the rarity it stands for
				clear( rarity );
				if ( view.rarity ) {
					rarity.appendChild( el( 'span', null, ' · ' ) );
					if ( cat.rarityColor[ view.rarity ] ) {
						rarity.appendChild( swatch( cat.rarityColor[ view.rarity ] ) );
					}
					rarity.appendChild( el( 'span', null, view.rarity ) );
				}
				remove.setAttribute( 'aria-label', 'Remove ' + view.name );
				if ( dup ) {
					dup.setAttribute( 'aria-label', 'Duplicate ' + view.name );
				}
				mutOut.textContent = view.mutPart;
				if ( cat.mutationColor[ row.mutation ] ) {
					mutOut.insertBefore( swatch( cat.mutationColor[ row.mutation ] ), mutOut.firstChild );
				}
				traitOut.textContent = view.traitPart;
				bothOut.textContent = view.bothPart;
				badge.textContent = view.badge;
				badge.className = 'ffb-trade-badge ffb-trade-badge-' + view.badgeTone;
				multOut.textContent = view.mult;
				nowOut.textContent = view.measured ? view.now : 'no measured income';
				if ( ceilOut ) {
					ceilOut.textContent = view.measured ? 'fully upgraded ' + view.ceil : '';
				}
			}
		};
	}

	function buildTrade( container, data, env ) {
		var cat = buildCatalog( data );
		// the reader's saved collection, read only: for "Add from my
		// collection" and as the default for "your total income now"
		var saved = parseCollection( chooseStore( env ).load(), cat ).rows;
		var picks = collectionPicks( cat, saved );
		var savedIncome = collectionIncome( cat, saved );
		var uid = 'ffb-trade-' + ( ++tradeCount ) + '-';
		var nextId = 1;
		var state = { give: [], get: [], items: { give: [], get: [] }, myIncome: '' };
		var ui = {};
		// the calculator page uses ?brainrot= for its own Value tab
		var first = typeof window !== 'undefined' && window.ffbStandalone && window.ffbStandalone.noPrefill ?
			null : prefillName( cat );

		// rows carry an id so each control gets a unique id for its label
		function withId( row ) {
			row.id = nextId++;
			return row;
		}

		// where the trade starts: a shared link wins, then a brainrot named in
		// the address (a page's "compare" link), then the trade this browser
		// remembers from last time
		var storage = workingStorage( env.storage );
		var loc = typeof window !== 'undefined' && window.location ? window.location : {};
		var shared = tradeFromFragment( loc.hash, cat );
		var remembered = !shared && !first && storage ? parseTrade( readStorage( storage, TRADE_KEY ), cat ) : null;
		function load( t ) {
			state.give = [];
			state.get = [];
			t.give.forEach( function ( r ) {
				addRow( cat, state.give, withId( r ) );
			} );
			t.get.forEach( function ( r ) {
				addRow( cat, state.get, withId( r ) );
			} );
			state.items = {
				give: t.items.give.map( function ( x ) {
					return { id: nextId++, text: x };
				} ),
				get: t.items.get.map( function ( x ) {
					return { id: nextId++, text: x };
				} )
			};
			state.myIncome = t.myIncome;
		}
		if ( shared || remembered ) {
			load( shared || remembered );
		} else if ( first ) {
			addRow( cat, state.get, withId( newRow( cat, first ) ) );
		}
		function remember() {
			if ( storage ) {
				writeStorage( storage, TRADE_KEY, serializeTrade( state ) );
			}
		}

		// ---- one brainrot card -------------------------------------------
		function buildCard( key, row ) {
			return buildRowCard( cat, uid + key + row.id, row, {
				onChange: refresh,
				onRemove: function () {
					var at = state[ key ].indexOf( row );
					if ( at !== -1 ) {
						state[ key ].splice( at, 1 );
					}
					renderSide( key );
					showUndo( key, row, at );
					refresh();
					ui[ key ].addButton.focus();
				},
				onDuplicate: function () {
					var copy = parseSavedRow( JSON.parse( serializeCollection( [ row ] ) ).r[ 0 ], cat );
					var at = state[ key ].indexOf( row );
					if ( copy && state[ key ].length < data.maxPerSide ) {
						withId( copy );
						state[ key ].splice( at + 1, 0, copy );
						renderSide( key );
						refresh();
						ui[ key ].cards[ at + 1 ].focus();
					}
				},
				onSave: function ( done ) {
					var store = chooseStore( env );
					var list;
					if ( store.kind === 'none' ) {
						done( 'This browser can’t keep a collection.' );
						return;
					}
					list = parseCollection( store.load(), cat ).rows;
					if ( list.length >= COLLECTION_MAX ) {
						done( 'Your collection is full (' + COLLECTION_MAX + ').' );
						return;
					}
					list.push( parseSavedRow( JSON.parse( serializeCollection( [ row ] ) ).r[ 0 ], cat ) );
					store.save( serializeCollection( list ), function ( err ) {
						done( err ? 'Couldn’t save: ' + err + '.' : 'Saved to My collection.' );
					} );
				}
			} );
		}

		// ---- one other item: a rod or potion picked from a searchable list --
		function buildItem( key, item ) {
			var wrap = el( 'div', 'ffb-trade-item' );
			var id = uid + key + 'i' + item.id;
			var input = el( 'input', 'ffb-trade-input' );
			var picking = cat.items.length > 0;
			var hint = el( 'p', 'ffb-trade-item-hint', 'Pick a rod or potion from the list.' );
			input.type = 'text';
			input.value = item.text;
			input.autocomplete = 'off';
			input.placeholder = picking ? 'Search rods and potions' : 'e.g. Luck potion ×2, a rod';
			hint.hidden = true;
			if ( picking ) {
				var list = el( 'datalist' );
				list.id = id + 'l';
				cat.items.forEach( function ( it ) {
					var o = el( 'option' );
					o.value = it.name;
					o.label = it.kind;
					list.appendChild( o );
				} );
				input.setAttribute( 'list', list.id );
				wrap.appendChild( list );
			}
			var f = field( id, 'Item', input, 'ffb-trade-field-item' );
			f.node.appendChild( hint );
			var remove = removeButton( 'Remove item' );
			// only a name from the list counts; anything else is shown as
			// unfinished once the reader leaves the field
			var settle = function ( leaving ) {
				var name = matchItem( cat, input.value );
				item.text = name || '';
				var bad = picking && name === null && input.value.trim() !== '';
				if ( leaving ) {
					if ( name && picking ) {
						input.value = name;
					}
					hint.hidden = !bad;
					input.className = 'ffb-trade-input' + ( bad ? ' ffb-trade-input-invalid' : '' );
					input.setAttribute( 'aria-invalid', bad ? 'true' : 'false' );
				} else if ( !bad ) {
					hint.hidden = true;
					input.className = 'ffb-trade-input';
					input.setAttribute( 'aria-invalid', 'false' );
				}
				refresh();
			};
			input.addEventListener( 'input', function () {
				settle( false );
			} );
			input.addEventListener( 'change', function () {
				settle( true );
			} );
			remove.addEventListener( 'click', function () {
				var at = state.items[ key ].indexOf( item );
				if ( at !== -1 ) {
					state.items[ key ].splice( at, 1 );
				}
				renderSide( key );
				refresh();
				ui[ key ].itemButton.focus();
			} );
			wrap.appendChild( f.node );
			wrap.appendChild( remove );
			return { node: wrap, focus: function () {
				input.focus();
			} };
		}

		// ---- one side -------------------------------------------------------
		function buildSide( key, title ) {
			var section = el( 'section', 'ffb-trade-side ffb-trade-side-' + key );
			var head = el( 'div', 'ffb-trade-side-head' );
			var count = el( 'span', 'ffb-trade-count' );
			head.appendChild( el( 'h3', 'ffb-trade-side-title', title ) );
			head.appendChild( count );
			section.appendChild( head );

			var totals = el( 'div', 'ffb-trade-side-totals' );
			var nowTotal = el( 'strong', 'ffb-trade-total-now' );
			var nowWrap = el( 'span', null, 'Income now ' );
			nowWrap.appendChild( nowTotal );
			totals.appendChild( nowWrap );
			section.appendChild( totals );

			var list = el( 'div', 'ffb-trade-cards' );
			var undo = el( 'div', 'ffb-trade-undo' );
			undo.setAttribute( 'aria-live', 'polite' );
			undo.hidden = true;
			var itemList = el( 'div', 'ffb-trade-items' );
			section.appendChild( list );
			section.appendChild( undo );
			section.appendChild( itemList );

			var actions = el( 'div', 'ffb-trade-actions' );
			var addButton = el( 'button', 'ffb-trade-add', '+ Add brainrot' );
			addButton.type = 'button';
			var fullNote = el( 'span', 'ffb-trade-full', data.maxPerSide + ' is the most a trade can hold.' );
			var itemButton = el( 'button', 'ffb-trade-add', '+ Add other item' );
			itemButton.type = 'button';
			actions.appendChild( addButton );
			actions.appendChild( fullNote );
			actions.appendChild( itemButton );
			section.appendChild( actions );

			// the reader's own brainrots, exactly as saved (the give side only)
			var fromCollection = null;
			if ( key === 'give' && picks.length ) {
				fromCollection = el( 'div', 'ffb-trade-from-collection' );
				var pickChoice = '0';
				var pickPicker = buildListPicker( uid + 'pick', picks.map( function ( p, i ) {
					return { value: String( i ), label: p.label };
				} ), '0', 'ffb-trade-input ffb-trade-select-pick', function ( v ) {
					pickChoice = v;
				} );
				var pickButton = el( 'button', 'ffb-trade-add', 'Add' );
				pickButton.type = 'button';
				fromCollection.appendChild( pickerField( uid + 'pick', 'Add from my collection', pickPicker, 'ffb-trade-field-pick' ).node );
				fromCollection.appendChild( pickButton );
				section.appendChild( fromCollection );
				pickButton.addEventListener( 'click', function () {
					var pick = picks[ parseInt( pickChoice, 10 ) ];
					if ( pick && addRow( cat, state[ key ], withId( tradeRowFromSaved( cat, pick.row ) ) ) ) {
						renderSide( key );
						refresh();
						ui[ key ].cards[ ui[ key ].cards.length - 1 ].focus();
					}
				} );
			}

			addButton.addEventListener( 'click', function () {
				if ( addRow( cat, state[ key ], withId( newRow( cat ) ) ) ) {
					renderSide( key );
					refresh();
					ui[ key ].cards[ ui[ key ].cards.length - 1 ].focus();
				}
			} );
			itemButton.addEventListener( 'click', function () {
				state.items[ key ].push( { id: nextId++, text: '' } );
				renderSide( key );
				refresh();
				ui[ key ].items[ ui[ key ].items.length - 1 ].focus();
			} );

			ui[ key ] = {
				section: section, count: count, nowTotal: nowTotal,
				list: list, itemList: itemList, addButton: addButton, fullNote: fullNote,
				itemButton: itemButton, fromCollection: fromCollection, cards: [], items: [], undo: undo
			};
			return section;
		}

		/** "Removed Hydra Dragon · Undo": puts it back where it was. */
		function showUndo( key, row, at ) {
			var box = ui[ key ].undo;
			clear( box );
			box.appendChild( el( 'span', null, 'Removed ' + row.name + '. ' ) );
			var again = el( 'button', 'ffb-trade-undo-btn', 'Undo' );
			again.type = 'button';
			again.addEventListener( 'click', function () {
				if ( state[ key ].length < data.maxPerSide ) {
					state[ key ].splice( Math.min( at, state[ key ].length ), 0, row );
					renderSide( key );
					refresh();
					ui[ key ].cards[ state[ key ].indexOf( row ) ].focus();
				}
			} );
			box.appendChild( again );
			box.hidden = false;
		}

		/** Rebuilds a side's cards and items after one is added or removed. */
		function renderSide( key ) {
			var side = ui[ key ];
			side.undo.hidden = true;
			clear( side.list );
			clear( side.itemList );
			side.cards = state[ key ].map( function ( row ) {
				var card = buildCard( key, row );
				side.list.appendChild( card.node );
				return card;
			} );
			if ( !state[ key ].length ) {
				side.list.appendChild( el( 'div', 'ffb-trade-empty', 'Nothing on this side yet.' ) );
			}
			side.items = state.items[ key ].map( function ( item ) {
				var row = buildItem( key, item );
				side.itemList.appendChild( row.node );
				return row;
			} );
		}

		// ---- the comparison -------------------------------------------------
		var compare = el( 'div', 'ffb-trade-compare' );
		compare.appendChild( el( 'h3', 'ffb-trade-heading', 'Comparison' ) );

		var verdictBox = el( 'div', 'ffb-trade-verdict' );
		var verdictMain = el( 'div', 'ffb-trade-verdict-main' );
		var verdictTitle = el( 'div', 'ffb-trade-verdict-title' );
		var verdictSub = el( 'p', 'ffb-trade-verdict-sub' );
		verdictMain.appendChild( el( 'span', 'ffb-trade-label', 'Verdict' ) );
		verdictMain.appendChild( verdictTitle );
		verdictMain.appendChild( verdictSub );
		verdictMain.setAttribute( 'aria-live', 'polite' );
		var stats = el( 'div', 'ffb-trade-verdict-stats' );
		function stat( labelText, note ) {
			var box = el( 'div', 'ffb-trade-stat' );
			var out = el( 'span', 'ffb-trade-stat-value' );
			box.appendChild( el( 'span', 'ffb-trade-label', labelText ) );
			box.appendChild( out );
			box.appendChild( el( 'span', 'ffb-trade-stat-note', note ) );
			stats.appendChild( box );
			return out;
		}
		var todayOut = stat( 'Today', 'income, you get vs give' );
		var ceilOut = stat( 'Fully upgraded', 'level ' + data.maxLevel + ', Evo ' + data.maxEvolution );
		verdictBox.appendChild( verdictMain );
		verdictBox.appendChild( stats );
		compare.appendChild( verdictBox );

		var warningList = el( 'div', 'ffb-trade-warnings' );
		compare.appendChild( warningList );

		var tableWrap = el( 'div', 'ffb-trade-table-wrap' );
		compare.appendChild( tableWrap );

		var mineBox = el( 'div', 'ffb-trade-mine' );
		var mineInput = el( 'input', 'ffb-trade-input ffb-trade-input-mine' );
		mineInput.type = 'text';
		mineInput.placeholder = 'e.g. 2.5Qa';
		var mineField = field( uid + 'mine', 'Your total income now', mineInput, 'ffb-trade-field-mine' );
		mineField.label.appendChild( el( 'span', 'ffb-trade-optional', ' · optional' ) );
		var mineOut = el( 'p', 'ffb-trade-mine-text' );
		mineOut.setAttribute( 'aria-live', 'polite' );
		var mineSource = el( 'span', 'ffb-trade-mine-source' );
		if ( savedIncome > 0 ) {
			mineInput.placeholder = money( savedIncome ) + ' from your collection';
			mineField.node.appendChild( mineSource );
		}
		mineBox.appendChild( mineField.node );
		mineBox.appendChild( mineOut );
		mineInput.addEventListener( 'input', function () {
			state.myIncome = mineInput.value;
			refresh();
		} );
		compare.appendChild( mineBox );

		var reasons = el( 'div', 'ffb-trade-reasons' );
		compare.appendChild( reasons );
		var noteList = el( 'div', 'ffb-trade-notes' );
		compare.appendChild( noteList );

		function renderTable( rows ) {
			var table = el( 'table', 'ffb-trade-table' );
			var thead = el( 'thead' );
			var headRow = el( 'tr' );
			[ 'Compared', 'You give', 'You get', 'Difference' ].forEach( function ( h, i ) {
				var th = el( 'th', 'ffb-trade-col-' + [ 'label', 'give', 'get', 'diff' ][ i ], h );
				th.scope = 'col';
				headRow.appendChild( th );
			} );
			thead.appendChild( headRow );
			table.appendChild( thead );
			var tbody = el( 'tbody' );
			rows.forEach( function ( c ) {
				var tr = el( 'tr' );
				var th = el( 'th', 'ffb-trade-col-label' );
				th.scope = 'row';
				th.appendChild( el( 'span', 'ffb-trade-row-label', c.label ) );
				th.appendChild( el( 'span', 'ffb-trade-row-hint', c.hint ) );
				tr.appendChild( th );
				tr.appendChild( el( 'td', 'ffb-trade-col-give', c.give ) );
				tr.appendChild( el( 'td', 'ffb-trade-col-get', c.get ) );
				tr.appendChild( el( 'td', 'ffb-trade-col-diff ffb-trade-tone-' + c.tone, c.diff ) );
				tbody.appendChild( tr );
			} );
			table.appendChild( tbody );
			clear( tableWrap );
			tableWrap.appendChild( table );
		}

		function reasonPanel( title, tone, lines ) {
			var panel = el( 'div', 'ffb-trade-reason ffb-trade-reason-' + tone );
			var list;
			panel.appendChild( el( 'h4', 'ffb-trade-reason-title', title ) );
			if ( !lines.length ) {
				panel.appendChild( el( 'p', 'ffb-trade-reason-none', 'None stand out.' ) );
			} else {
				list = el( 'ul', 'ffb-trade-reason-list' );
				lines.forEach( function ( t ) {
					list.appendChild( el( 'li', null, t ) );
				} );
				panel.appendChild( list );
			}
			return panel;
		}

		function refresh() {
			var result = compareTrade( cat, {
				give: state.give,
				get: state.get,
				items: {
					give: state.items.give.map( function ( it ) {
						return it.text;
					} ),
					get: state.items.get.map( function ( it ) {
						return it.text;
					} )
				},
				myIncome: state.myIncome,
				collectionIncome: savedIncome,
				owned: saved
			} );

			result.sides.forEach( function ( side ) {
				var u = ui[ side.key ];
				u.count.textContent = side.count;
				u.nowTotal.textContent = side.nowTotal;
				u.addButton.hidden = !side.canAdd;
				u.fullNote.hidden = !side.full;
				if ( u.fromCollection ) {
					u.fromCollection.hidden = !side.canAdd;
				}
				side.rows.forEach( function ( view, i ) {
					u.cards[ i ].update( view );
				} );
			} );

			verdictTitle.textContent = result.verdict.title;
			verdictTitle.className = 'ffb-trade-verdict-title ffb-trade-tone-' + result.verdict.tone;
			verdictSub.textContent = result.verdict.sub;
			todayOut.textContent = result.today.text;
			todayOut.className = 'ffb-trade-stat-value ffb-trade-tone-' + result.today.tone;
			ceilOut.textContent = result.ceiling.text;
			ceilOut.className = 'ffb-trade-stat-value ffb-trade-tone-' + result.ceiling.tone;

			clear( warningList );
			result.warnings.forEach( function ( t ) {
				warningList.appendChild( el( 'p', 'ffb-trade-warning', t ) );
			} );

			renderTable( result.table );

			stickyTitle.textContent = result.verdict.title;
			stickyTitle.className = 'ffb-trade-sticky-title ffb-trade-tone-' + result.verdict.tone;
			stickyFigs.textContent = 'Today ' + result.today.text + ' · Fully upgraded ' + result.ceiling.text;
			remember();

			mineOut.textContent = result.mine.text;
			mineOut.className = 'ffb-trade-mine-text ffb-trade-tone-' + result.mine.tone;
			mineSource.textContent = result.mine.source === 'collection' ?
				'From your collection: ' + money( savedIncome ) + '/s. Type an amount to use a different one.' :
				'Clear the box to use your collection’s total (' + money( savedIncome ) + '/s).';

			clear( reasons );
			reasons.appendChild( reasonPanel( 'Reasons to take it', 'take', result.take ) );
			reasons.appendChild( reasonPanel( 'Reasons to pass', 'pass', result.pass ) );

			clear( noteList );
			result.notes.forEach( function ( t ) {
				noteList.appendChild( el( 'p', 'ffb-trade-note', t ) );
			} );
		}

		// ---- toolbar: swap sides, share, clear -------------------------------
		var toolbar = el( 'div', 'ffb-trade-toolbar' );
		var swapBtn = el( 'button', 'ffb-trade-tool', '⇄ Swap sides' );
		swapBtn.type = 'button';
		swapBtn.title = 'See the trade from the other player’s side';
		var shareBtn = el( 'button', 'ffb-trade-tool', 'Share' );
		shareBtn.type = 'button';
		var clearBtn = el( 'button', 'ffb-trade-tool', 'Clear trade' );
		clearBtn.type = 'button';
		var toolOut = el( 'span', 'ffb-trade-tool-out' );
		toolOut.setAttribute( 'aria-live', 'polite' );
		toolbar.appendChild( swapBtn );
		toolbar.appendChild( shareBtn );
		toolbar.appendChild( clearBtn );
		toolbar.appendChild( toolOut );

		swapBtn.addEventListener( 'click', function () {
			var t = state.give;
			state.give = state.get;
			state.get = t;
			t = state.items.give;
			state.items.give = state.items.get;
			state.items.get = t;
			renderSide( 'give' );
			renderSide( 'get' );
			refresh();
			toolOut.textContent = 'Swapped: you’re now looking from the other side.';
		} );
		clearBtn.addEventListener( 'click', function () {
			state.give = [];
			state.get = [];
			state.items = { give: [], get: [] };
			state.myIncome = '';
			mineInput.value = '';
			renderSide( 'give' );
			renderSide( 'get' );
			refresh();
			toolOut.textContent = 'Cleared.';
		} );
		/** A link to this exact trade: the phone's share sheet, else the clipboard. */
		function share( out ) {
			var link = tradeLink( state );
			var nav = typeof navigator !== 'undefined' ? navigator : null;
			if ( nav && nav.share ) {
				nav.share( { title: 'Fish for Brainrots trade', url: link } ).then( function () {
					out.textContent = 'Shared.';
				}, function () {} );
			} else if ( nav && nav.clipboard && nav.clipboard.writeText ) {
				nav.clipboard.writeText( link ).then( function () {
					out.textContent = 'Link copied: paste it anywhere to show this trade.';
				}, function () {
					out.textContent = link;
				} );
			} else {
				out.textContent = link;
			}
		}
		shareBtn.addEventListener( 'click', function () {
			share( toolOut );
		} );

		// ---- the verdict, pinned to the bottom of a phone screen ------------
		var sticky = el( 'div', 'ffb-trade-sticky' );
		var stickyText = el( 'div', 'ffb-trade-sticky-text' );
		var stickyTitle = el( 'span', 'ffb-trade-sticky-title' );
		var stickyFigs = el( 'span', 'ffb-trade-sticky-figs' );
		stickyText.appendChild( stickyTitle );
		stickyText.appendChild( stickyFigs );
		var stickyShare = el( 'button', 'ffb-trade-sticky-share', 'Share' );
		stickyShare.type = 'button';
		stickyShare.addEventListener( 'click', function () {
			share( toolOut );
		} );
		sticky.appendChild( stickyText );
		sticky.appendChild( stickyShare );

		var root = el( 'div', 'ffb-trade-calc' );
		var sides = el( 'div', 'ffb-trade-sides' );
		sides.appendChild( buildSide( 'give', 'You give' ) );
		sides.appendChild( buildSide( 'get', 'You get' ) );
		root.appendChild( toolbar );
		root.appendChild( sides );
		root.appendChild( sticky );
		root.appendChild( compare );
		compare.appendChild( suffixLegend() );
		mineInput.value = state.myIncome;
		renderSide( 'give' );
		renderSide( 'get' );
		refresh();

		container.appendChild( root );
	}

	/* ================================================================
	 * My collection — the page
	 * ================================================================ */

	var collectionCount = 0;

	/**
	 * env is pageEnv(), plus optional timers { set, clear } (the tests use
	 * fake ones). Everything the reader sees is built here; the numbers
	 * all come from collectionSummary, collectionStats and rowView.
	 */
	function buildCollection( container, data, env ) {
		var cat = buildCatalog( data );
		var uid = 'ffb-coll-' + ( ++collectionCount ) + '-';
		var timers = env.timers || {
			set: function ( fn, ms ) {
				return window.setTimeout( fn, ms );
			},
			clear: function ( t ) {
				window.clearTimeout( t );
			}
		};
		var store = chooseStore( env );
		var storage = workingStorage( env.storage );
		var loaded = parseCollection( store.load(), cat );
		var nextId = 1;
		var rows = loaded.rows;
		var sortKey = 'income';
		var order;
		var editing = null;
		var editorCard = null;
		var saveTimer = null;
		// a list saved by a newer version is never overwritten from here
		var blocked = loaded.error === 'newer';

		function withId( row ) {
			row.id = nextId++;
			return row;
		}
		rows.forEach( withId );

		var root = el( 'div', 'ffb-collection-calc' );

		// ---- where it is saved -------------------------------------------
		var status = el( 'p', 'ffb-collection-status' );
		status.setAttribute( 'aria-live', 'polite' );
		root.appendChild( status );

		var SAVED = {
			account: 'Saved to your account',
			browser: 'Saved in this browser'
		};
		function setStatus( text, tone ) {
			status.textContent = text;
			status.className = 'ffb-collection-status ffb-trade-tone-' + ( tone || 'flat' );
		}
		function initialStatus() {
			if ( blocked ) {
				setStatus( 'This list was saved by a newer version of this page, so changes here won’t be saved.', 'bad' );
			} else if ( store.kind === 'account' ) {
				setStatus( 'Your list is saved privately in your account. Changes save by themselves.' );
			} else if ( store.kind === 'browser' ) {
				// off the wiki (the standalone calculator page) there is no
				// account to log in to
				setStatus( env.mw ?
					'Your list is saved in this browser only. Log in to keep it in your account.' :
					'Your list is saved in this browser on this device only.' );
			} else {
				setStatus( 'This browser won’t let the page remember your list, so it will be gone when you leave. Use “Copy as text” to keep a copy.', 'bad' );
			}
		}

		function saveNow() {
			saveTimer = null;
			store.save( serializeCollection( rows ), function ( err ) {
				if ( err ) {
					setStatus( 'Couldn’t save: ' + err + '. Your changes are still on this page.', 'bad' );
				} else {
					setStatus( SAVED[ store.kind ], 'good' );
				}
			} );
		}

		/** Saves after an edit: at once in the browser, 1.5 s after the last edit to the account. */
		function scheduleSave() {
			if ( blocked ) {
				initialStatus();
				return;
			}
			if ( store.kind === 'none' ) {
				initialStatus();
				return;
			}
			if ( store.kind === 'browser' ) {
				saveNow();
				return;
			}
			setStatus( 'Saving…' );
			if ( saveTimer !== null ) {
				timers.clear( saveTimer );
			}
			saveTimer = timers.set( saveNow, SAVE_DELAY );
		}

		// leaving the page with a save still waiting: send it now
		if ( typeof window !== 'undefined' && window.addEventListener ) {
			window.addEventListener( 'pagehide', function () {
				if ( saveTimer !== null ) {
					timers.clear( saveTimer );
					saveNow();
				}
			} );
		}

		// ---- notices about what was read back ------------------------------
		var notices = el( 'div', 'ffb-collection-notices' );
		root.appendChild( notices );
		function notice( text ) {
			var p = el( 'p', 'ffb-trade-warning', text );
			notices.appendChild( p );
			return p;
		}
		if ( loaded.error === 'unreadable' ) {
			notice( 'Your saved list couldn’t be read, so the page starts empty. Its text is in “Paste a list” below ' +
				'in case you want to keep it. It will be replaced the next time you change your list.' );
		} else if ( loaded.error === 'newer' ) {
			notice( 'Your list was saved by a newer version of this page and can’t be shown here. It is left untouched.' );
		}
		if ( loaded.skipped ) {
			notice( plural( loaded.skipped, 'saved entry has', 'saved entries have' ) +
				' no brainrot name and couldn’t be shown. They will be left out the next time the list is saved.' );
		}

		// once: a list saved in this browser before logging in
		var offer = loaded.error ? null : browserListOffer( store, rows, storage, cat );
		if ( offer ) {
			var offerBox = el( 'div', 'ffb-collection-offer' );
			offerBox.appendChild( el( 'p', null, 'This browser has ' + plural( offer.length, 'brainrot', 'brainrots' ) +
				' saved from before you logged in. Move ' + ( offer.length === 1 ? 'it' : 'them' ) + ' to your account?' ) );
			var moveButton = el( 'button', 'ffb-trade-add', 'Move to my account' );
			moveButton.type = 'button';
			var laterButton = el( 'button', 'ffb-collection-button', 'Not now' );
			laterButton.type = 'button';
			offerBox.appendChild( moveButton );
			offerBox.appendChild( laterButton );
			notices.appendChild( offerBox );
			var closeOffer = function () {
				writeStorage( storage, OFFERED_KEY, '1' );
				notices.removeChild( offerBox );
			};
			moveButton.addEventListener( 'click', function () {
				addToCollection( rows, offer.map( withId ) );
				closeOffer();
				resort();
				render();
				scheduleSave();
				addButton.focus();
			} );
			laterButton.addEventListener( 'click', function () {
				closeOffer();
				addButton.focus();
			} );
		}

		// ---- the summary ----------------------------------------------------
		var summaryBox = el( 'div', 'ffb-collection-summary' );
		root.appendChild( summaryBox );
		function tile( labelText, wide ) {
			var box = el( 'div', 'ffb-collection-tile' + ( wide ? ' ffb-collection-tile-wide' : '' ) );
			var value = el( 'span', 'ffb-collection-tile-value' );
			var sub = el( 'span', 'ffb-collection-tile-sub' );
			box.appendChild( el( 'span', 'ffb-trade-label', labelText ) );
			box.appendChild( value );
			box.appendChild( sub );
			summaryBox.appendChild( box );
			return { value: value, sub: sub };
		}
		var tCount = tile( 'Brainrots' );
		var tIncome = tile( 'Income now' );
		var tMaxed = tile( 'Fully maxed' );
		var tStrong = tile( 'Strongest now', true );
		var tCeil = tile( 'Highest ceiling', true );
		var tReady = tile( 'Ready to evolve', true );

		// ---- the toolbar ----------------------------------------------------
		var toolbar = el( 'div', 'ffb-collection-toolbar' );
		var addButton = el( 'button', 'ffb-trade-add', '+ Add brainrot' );
		addButton.type = 'button';
		var fullNote = el( 'span', 'ffb-trade-full', COLLECTION_MAX + ' is the most a collection can hold.' );
		var sortPicker = buildListPicker( uid + 'sort', SORTS, sortKey, 'ffb-trade-input ffb-collection-sort', function ( v ) {
			sortKey = v;
			onSort();
		} );
		var sortField = pickerField( uid + 'sort', 'Sort by', sortPicker, 'ffb-collection-field-sort' );
		toolbar.appendChild( addButton );
		toolbar.appendChild( fullNote );
		toolbar.appendChild( sortField.node );
		root.appendChild( toolbar );

		var undoBox = el( 'div', 'ffb-trade-undo ffb-collection-undo' );
		undoBox.setAttribute( 'aria-live', 'polite' );
		undoBox.hidden = true;
		root.appendChild( undoBox );
		var list = el( 'div', 'ffb-collection-list' );
		root.appendChild( list );
		root.appendChild( suffixLegend() );

		function resort() {
			order = sortCollection( cat, rows, sortKey );
		}

		function onSort() {
			resort();
			render();
		}

		function removeRow( row ) {
			var at = rows.indexOf( row );
			if ( at !== -1 ) {
				rows.splice( at, 1 );
			}
			if ( editing === row ) {
				editing = null;
				editorCard = null;
			}
			resort();
			render();
			scheduleSave();
			// "Removed Hydra Dragon · Undo", until the next removal
			clear( undoBox );
			undoBox.appendChild( el( 'span', null, 'Removed ' + row.name + '. ' ) );
			var again = el( 'button', 'ffb-trade-undo-btn', 'Undo' );
			again.type = 'button';
			again.addEventListener( 'click', function () {
				undoBox.hidden = true;
				if ( rows.length < COLLECTION_MAX && rows.indexOf( row ) === -1 ) {
					rows.push( row );
					resort();
					render();
					scheduleSave();
				}
			} );
			undoBox.appendChild( again );
			undoBox.hidden = false;
			addButton.focus();
		}

		function openEditor( row ) {
			editing = row;
			render();
			editorCard.focus();
		}

		function closeEditor() {
			var row = editing;
			editing = null;
			editorCard = null;
			resort();
			render();
			var again = list.querySelector( '.ffb-collection-edit-' + row.id );
			if ( again ) {
				again.focus();
			}
		}

		/** The editor: the trade calculator's card, plus a Done button. */
		function buildEditor( row ) {
			editorCard = buildRowCard( cat, uid + 'r' + row.id, row, {
				onChange: function () {
					row.notes = [];
					editorCard.update( rowView( cat, row, collectionStats( cat, row ) ) );
					renderSummary();
					scheduleSave();
				},
				onRemove: function () {
					removeRow( row );
				}
			}, { showCeiling: true } );
			editorCard.update( rowView( cat, row, collectionStats( cat, row ) ) );
			var done = el( 'button', 'ffb-trade-add ffb-collection-done', 'Done' );
			done.type = 'button';
			done.addEventListener( 'click', closeEditor );
			editorCard.node.appendChild( done );
			editorCard.node.className += ' ffb-collection-editor';
			return editorCard.node;
		}

		/** One saved brainrot, read-only, with Edit and Remove. */
		function buildEntry( row, summary ) {
			var s = collectionStats( cat, row );
			var view = rowView( cat, row, s );
			var fx = fixedParts( cat, row );
			var entry = el( 'div', 'ffb-collection-row' );

			var head = el( 'div', 'ffb-collection-row-head' );
			var name = el( 'span', 'ffb-collection-row-name', row.name );
			head.appendChild( name );
			if ( view.rarity ) {
				head.appendChild( el( 'span', 'ffb-trade-rarity', view.rarity ) );
			}
			var tags = el( 'span', 'ffb-collection-tags' );
			if ( s.canEvolve ) {
				tags.appendChild( el( 'span', 'ffb-trade-badge ffb-trade-badge-evolve', 'Ready to evolve' ) );
			} else if ( s.maxed ) {
				tags.appendChild( el( 'span', 'ffb-trade-badge ffb-trade-badge-maxed', 'Fully maxed' ) );
			}
			if ( summary.highestCeiling && summary.highestCeiling.row === row && summary.measured > 1 ) {
				tags.appendChild( el( 'span', 'ffb-trade-badge ffb-collection-badge-ceiling', 'Highest ceiling' ) );
			}
			head.appendChild( tags );
			entry.appendChild( head );

			var perm = [];
			if ( !isDefault( row.mutation ) ) {
				perm.push( row.mutation );
			}
			row.traits.forEach( function ( t ) {
				if ( t ) {
					perm.push( t );
				}
			} );
			entry.appendChild( el( 'div', 'ffb-collection-row-detail',
				( perm.length ? perm.join( ' + ' ) : 'No mutation or traits' ) +
				' · mutation + traits ' + times( fx.mult ) +
				' · ' + ( row.evolution ? 'Evo ' + row.evolution : 'unevolved' ) +
				' · level ' + row.level + ' · ' + view.mult ) );

			catalogIssues( cat, row ).concat( row.notes || [] ).forEach( function ( t ) {
				entry.appendChild( el( 'div', 'ffb-collection-row-issue', t ) );
			} );

			var figs = el( 'div', 'ffb-collection-row-figures' );
			function fig( labelText, value, extra ) {
				var f = el( 'span', 'ffb-collection-fig' + ( extra ? ' ' + extra : '' ) );
				f.appendChild( el( 'span', 'ffb-collection-fig-label', labelText ) );
				f.appendChild( el( 'span', 'ffb-collection-fig-value', value ) );
				figs.appendChild( f );
			}
			if ( s.measured ) {
				fig( 'Income now', view.now, 'ffb-collection-fig-now' );
				fig( 'Fully upgraded', view.ceil );
			} else {
				figs.appendChild( el( 'span', 'ffb-collection-fig-none',
					catalogOk( cat, row ) ? 'no measured income' : 'not counted: something here isn’t in the catalog' ) );
			}
			entry.appendChild( figs );

			var actions = el( 'div', 'ffb-collection-row-actions' );
			var edit = el( 'button', 'ffb-collection-button ffb-collection-edit-' + row.id, 'Edit' );
			edit.type = 'button';
			edit.setAttribute( 'aria-label', 'Edit ' + row.name );
			var remove = removeButton( 'Remove ' + row.name );
			edit.addEventListener( 'click', function () {
				openEditor( row );
			} );
			remove.addEventListener( 'click', function () {
				removeRow( row );
			} );
			actions.appendChild( edit );
			actions.appendChild( remove );
			entry.appendChild( actions );
			return entry;
		}

		function renderSummary() {
			var sum = collectionSummary( cat, rows );
			tCount.value.textContent = String( sum.count );
			tCount.sub.textContent = sum.byRarityText;
			tIncome.value.textContent = sum.totalNowText;
			tIncome.sub.textContent = sum.leftOutText || '';
			tMaxed.value.textContent = String( sum.maxed );
			tMaxed.sub.textContent = 'level ' + data.maxLevel + ' and Evo ' + data.maxEvolution;
			tStrong.value.textContent = sum.strongestText;
			tCeil.value.textContent = sum.highestCeilingText;
			tCeil.sub.textContent = sum.highestCeiling ? 'the best long-term pick: its mutation and traits can’t change' : '';
			tReady.value.textContent = sum.readyText;
			tReady.sub.textContent = sum.ready.length ? 'level ' + data.maxLevel + ' and not yet Evo ' + data.maxEvolution : '';
			addButton.hidden = sum.full;
			fullNote.hidden = !sum.full;
			return sum;
		}

		function render() {
			var sum = renderSummary();
			clear( list );
			if ( !rows.length ) {
				list.appendChild( el( 'div', 'ffb-trade-empty', 'Nothing saved yet. Add the brainrots you own to see their totals.' ) );
			}
			order.forEach( function ( row ) {
				list.appendChild( row === editing ? buildEditor( row ) : buildEntry( row, sum ) );
			} );
		}

		addButton.addEventListener( 'click', function () {
			var row;
			if ( rows.length >= COLLECTION_MAX ) {
				return;
			}
			row = withId( newRow( cat ) );
			row.notes = [];
			rows.push( row );
			// a new brainrot opens at the top, ready to fill in
			order.unshift( row );
			editing = row;
			render();
			editorCard.focus();
			scheduleSave();
		} );

		// ---- moving the list ------------------------------------------------
		var transfer = el( 'div', 'ffb-collection-transfer' );
		transfer.appendChild( el( 'h4', 'ffb-trade-reason-title', 'Move your list' ) );
		transfer.appendChild( el( 'p', 'ffb-collection-help',
			'Copy your list as text to keep it or move it to another browser or account, then paste it in there.' ) );
		var copyButton = el( 'button', 'ffb-collection-button', 'Copy as text' );
		copyButton.type = 'button';
		var copyBox = el( 'textarea', 'ffb-collection-text' );
		copyBox.readOnly = true;
		copyBox.rows = 3;
		var copyField = field( uid + 'copy', 'Your list as text', copyBox, 'ffb-collection-field-text' );
		copyField.node.hidden = true;
		var pasteBox = el( 'textarea', 'ffb-collection-text' );
		pasteBox.rows = 3;
		pasteBox.placeholder = '{"v":1,"r":[…]}';
		var pasteField = field( uid + 'paste', 'Paste a list', pasteBox, 'ffb-collection-field-text' );
		var pasteButton = el( 'button', 'ffb-collection-button', 'Add to my list' );
		pasteButton.type = 'button';
		var transferOut = el( 'p', 'ffb-collection-help' );
		transferOut.setAttribute( 'aria-live', 'polite' );
		transfer.appendChild( copyButton );
		transfer.appendChild( copyField.node );
		transfer.appendChild( pasteField.node );
		transfer.appendChild( pasteButton );
		transfer.appendChild( transferOut );
		if ( loaded.error === 'unreadable' ) {
			pasteBox.value = String( store.load() );
		}

		copyButton.addEventListener( 'click', function () {
			var text = serializeCollection( rows );
			copyBox.value = text;
			copyField.node.hidden = false;
			copyBox.focus();
			copyBox.select();
			if ( typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText ) {
				navigator.clipboard.writeText( text ).then( function () {
					transferOut.textContent = 'Copied. Paste it into “Paste a list” wherever you want it.';
				}, function () {
					transferOut.textContent = 'Select the text above and copy it.';
				} );
			} else {
				transferOut.textContent = 'Select the text above and copy it.';
			}
		} );
		pasteButton.addEventListener( 'click', function () {
			var parsed, left, msg;
			if ( pasteBox.value.length > MAX_PASTE_CHARS ) {
				transferOut.textContent = 'That’s far too long to be a saved list, so nothing was added.';
				return;
			}
			parsed = parseCollection( pasteBox.value, cat );
			if ( parsed.error === 'newer' ) {
				transferOut.textContent = 'That list was saved by a newer version of this page.';
				return;
			}
			if ( parsed.error ) {
				transferOut.textContent = 'That doesn’t look like a saved list. It should start with {"v":1.';
				return;
			}
			if ( !parsed.rows.length ) {
				transferOut.textContent = 'There are no brainrots in that list.';
				return;
			}
			left = addToCollection( rows, parsed.rows.map( withId ) );
			msg = 'Added ' + plural( parsed.rows.length - left, 'brainrot', 'brainrots' ) + '.';
			if ( left ) {
				msg += ' ' + left + ' didn’t fit: ' + COLLECTION_MAX + ' is the most a collection can hold.';
			}
			if ( parsed.skipped ) {
				msg += ' ' + plural( parsed.skipped, 'entry', 'entries' ) + ' had no usable brainrot name and were left out.';
			}
			transferOut.textContent = msg;
			pasteBox.value = '';
			resort();
			render();
			scheduleSave();
		} );
		root.appendChild( transfer );

		initialStatus();
		resort();
		render();
		container.appendChild( root );
	}

	/* ================================================================
	 * Start-up
	 * ================================================================ */

	/** Reads a hidden JSON payload, or null if it is missing or broken. */
	function readPayload( holder ) {
		if ( !holder ) {
			return null;
		}
		try {
			return JSON.parse( holder.textContent );
		} catch ( err ) {
			return null;
		}
	}

	function init() {
		var env = pageEnv();
		var calcs = document.querySelectorAll( '.brainrot-calculator' );
		Array.prototype.forEach.call( calcs, function ( container ) {
			var data = readPayload( container.querySelector( '.brainrot-calculator-data' ) );
			// with no data, leave the page exactly as it was rather than
			// showing a broken widget
			if ( data ) {
				buildValueCalculator( container, data );
			}
		} );

		var trades = document.querySelectorAll( '.ffb-trade' );
		Array.prototype.forEach.call( trades, function ( container ) {
			var data = readPayload( container.querySelector( '.ffb-trade-data' ) );
			var note = container.querySelector( '.ffb-trade-nojs' );
			if ( !data ) {
				return;
			}
			if ( note ) {
				note.parentNode.removeChild( note );
			}
			buildTrade( container, data, env );
		} );

		var collections = document.querySelectorAll( '.ffb-collection' );
		Array.prototype.forEach.call( collections, function ( container ) {
			var data = readPayload( container.querySelector( '.ffb-collection-data' ) );
			var note = container.querySelector( '.ffb-collection-nojs' );
			if ( !data ) {
				return;
			}
			if ( note ) {
				note.parentNode.removeChild( note );
			}
			buildCollection( container, data, env );
		} );
	}

	/**
	 * On the wiki, wait for mw.user and the reader's saved options before
	 * reading the collection; if that fails, start anyway (the collection
	 * then falls back to this browser).
	 */
	function start() {
		var m = typeof mw !== 'undefined' ? mw : null;
		if ( m && m.loader && m.loader.using ) {
			m.loader.using( [ 'mediawiki.user', 'user.options' ] ).then( init, init );
		} else {
			init();
		}
	}

	// The formula and verdict functions, for the offline tests (Node). In a
	// browser nothing is exported and no global is created.
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = {
			roundHalfEven: roundHalfEven,
			money: money,
			parseMoney: parseMoney,
			sumRule: sumRule,
			totalMultiplier: totalMultiplier,
			growthFactor: growthFactor,
			income: income,
			saleValue: saleValue,
			buildCatalog: buildCatalog,
			newRow: newRow,
			addRow: addRow,
			setTrait: setTrait,
			rowTotal: rowTotal,
			fixedParts: fixedParts,
			rowStats: rowStats,
			rowView: rowView,
			mutationOptions: mutationOptions,
			evolutionOptions: evolutionOptions,
			traitOptions: traitOptions,
			matchItem: matchItem,
			brainrotOptions: brainrotOptions,
			searchBrainrots: searchBrainrots,
			raritiesFor: raritiesFor,
			searchMutations: searchMutations,
			searchTraits: searchTraits,
			exactName: exactName,
			exactBrainrot: exactBrainrot,
			parseLevel: parseLevel,
			diff: diff,
			roughRatio: roughRatio,
			band: band,
			compareTrade: compareTrade,
			topTraits: topTraits,
			machineReasons: machineReasons,
			COLLECTION_MAX: COLLECTION_MAX,
			MAX_PASTE_CHARS: MAX_PASTE_CHARS,
			MAX_NAME_CHARS: MAX_NAME_CHARS,
			serializeCollection: serializeCollection,
			parseCollection: parseCollection,
			addToCollection: addToCollection,
			catalogIssues: catalogIssues,
			collectionStats: collectionStats,
			collectionSummary: collectionSummary,
			sortCollection: sortCollection,
			collectionPicks: collectionPicks,
			serializeTrade: serializeTrade,
			parseTrade: parseTrade,
			tradeToFragment: tradeToFragment,
			tradeFromFragment: tradeFromFragment,
			tradeLink: tradeLink,
			suffixRows: suffixRows,
			tradeRowFromSaved: tradeRowFromSaved,
			collectionIncome: collectionIncome,
			chooseStore: chooseStore,
			browserListOffer: browserListOffer
		};
	}

	if ( typeof document === 'undefined' ) {
		return;
	}
	// The standalone calculator page asks for the picker for its own brainrot
	// choice (it sets window.ffbStandalone first). On the wiki nothing is added.
	if ( typeof window !== 'undefined' && window.ffbStandalone && typeof window.ffbStandalone === 'object' ) {
		window.ffbStandalone.namePicker = function ( data, id, current, onPick ) {
			return buildNamePicker( buildCatalog( data ), id, current, onPick );
		};
	}
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', start );
	} else {
		start();
	}
}() );