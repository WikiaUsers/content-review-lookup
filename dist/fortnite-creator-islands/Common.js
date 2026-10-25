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
 * What can I catch? (.ffb-catch)
 *   Fishing Skill, rod, potion and any server/event luck -> the chance of
 *   each rarity per catch (exact at measured skill levels, "approximate"
 *   between them).
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
 * Upgrade prices (upgradePrice) follow the old x1.5 curve to level 150 and
 * the cheaper curve the game switched to from level 151 (newCost* and
 * lateCost* in the payload, fitted to in-game readings up to level 189).
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

	/**
	 * The whole figure with thousands separators: 15 significant digits
	 * (all a double holds), then zeros. Module:Brainrot's _fullNumber.
	 */
	function fullNumber( n ) {
		var e, digits;
		function commas( t ) {
			return t.replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
		}
		function at( exp ) {
			return Math.round( n / Math.pow( 10, exp - 14 ) ).toFixed( 0 );
		}
		if ( n < 1e15 ) {
			return commas( roundHalfEven( n ).toFixed( 0 ) );
		}
		e = Math.floor( Math.log( n ) / Math.LN10 );
		digits = at( e );
		if ( digits.length > 15 ) {
			e++;
			digits = at( e );
		} else if ( digits.length < 15 ) {
			e--;
			digits = at( e );
		}
		return commas( digits + new Array( e - 13 ).join( '0' ) );
	}

	/** "10.9 nonillion": a figure read out, truncated like money(); '' under 1,000. */
	function numberName( n ) {
		var i, v;
		for ( i = 0; i < SUFFIXES.length; i++ ) {
			if ( n >= SUFFIXES[ i ][ 0 ] ) {
				v = Math.floor( n / SUFFIXES[ i ][ 0 ] * 10 ) / 10;
				return v.toFixed( 1 ).replace( /\.0$/, '' ) + ' ' + SUFFIX_NAMES[ SUFFIXES[ i ][ 1 ] ];
			}
		}
		return '';
	}

	/**
	 * Lets a $ figure show itself in full: hovering (or focusing, which is a
	 * tap on a phone) for a moment shows the whole number and its name, drawn
	 * by Common.css (.ffb-num) from data-full and data-name, as on the
	 * wiki's own tables. perSecond adds "per second"; focusable gives it a
	 * tab stop (not for figures inside a button). Returns the node.
	 */
	function fullTip( node, n, perSecond, focusable ) {
		if ( !node || typeof n !== 'number' || !isFinite( n ) || n < 1000 ) {
			return node;
		}
		node.className = ( node.className ? node.className + ' ' : '' ) + 'ffb-num';
		node.setAttribute( 'data-full', '$' + fullNumber( n ) );
		node.setAttribute( 'data-name', numberName( n ) + ( perSecond ? ' per second' : '' ) );
		if ( focusable ) {
			node.setAttribute( 'tabindex', '0' );
		}
		return node;
	}

	/**
	 * A ratio as a signed percentage that never rounds a real change away:
	 * "+12%", "+2%", "+0.4%", "+<0.1%". Under 1% gets a decimal, so a small
	 * gain still reads as a gain (user, 2026-10-08).
	 */
	function pctText( r ) {
		var p = ( r - 1 ) * 100;
		var a = Math.abs( p );
		return ( p >= 0 ? '+' : '−' ) + ( a >= 1 ? a.toFixed( 0 ) : a >= 0.1 ? a.toFixed( 1 ) : '<0.1' ) + '%';
	}

	/** Two totals that are the same for every purpose (floating-point noise aside). */
	function sameSize( r ) {
		return Math.abs( r - 1 ) < 1e-9;
	}

	/**
	 * A sentence with its $ figures made hoverable, like fullTip: tips maps
	 * each figure as written ("$496.8No") to the number behind it, or to
	 * null when two different numbers print the same (then no tip, rather
	 * than a wrong one).
	 */
	function richText( tag, className, text, tips ) {
		var node = el( tag, className );
		String( text ).split( /(\$[0-9][0-9.]*[A-Za-z]*)/ ).forEach( function ( part, i, all ) {
			if ( i % 2 && tips && typeof tips[ part ] === 'number' ) {
				node.appendChild( fullTip( el( 'span', null, part ), tips[ part ], /^\/s/.test( all[ i + 1 ] || '' ), true ) );
			} else if ( part ) {
				node.appendChild( el( 'span', null, part ) );
			}
		} );
		return node;
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

	/** A trait's name for a picker, whose icon stands in for the emoji. */
	function traitPickLabel( cat, name ) {
		return name && cat.traitIcon && cat.traitIcon[ name ] ? name : traitLabel( cat, name );
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

	/**
	 * Just enough of a catalog, from the value calculator's own payload (one
	 * brainrot), to read and write the saved list and draw the picture.
	 */
	function valueCatalog( data ) {
		var evos = [ 0 ].concat( data.evolutions );
		var cat = {
			data: { maxTraits: data.maxTraits || 3, maxEvolution: data.maxEvolution || data.evolutions.length,
				maxLevel: data.maxLevel, evolutions: evos,
				// [ name, multiplier ], as the trade catalog has them (for its pickers)
				mutations: data.mutations.map( function ( m ) {
					return [ m.n, m.m ];
				} ),
				traits: data.traits.map( function ( t ) {
					return [ t.n, t.m ];
				} ) },
			evolutionIcon: [ null ].concat( ( Array.isArray( data.evoIcons ) ? data.evoIcons : [] ).map( function ( u ) {
				return safeIconUrl( u ) || null;
			} ) ),
			traitEmoji: {},
			brainrots: {}, mutations: {}, traits: {},
			rarityColor: {}, rarityColor2: {}, spinRarity: {},
			brainrotIcon: {}, mutationIcon: {}, mutationColor: {}, traitIcon: {},
			defaultMutation: data.mutations[ 0 ].n
		};
		var r = typeof data.rarity === 'string' ? data.rarity : '';
		cat.brainrots[ data.name ] = { name: data.name, rarity: r, base: data.base };
		if ( r && typeof data.rarityColor === 'string' && /^#[0-9a-f]{6}$/i.test( data.rarityColor ) ) {
			cat.rarityColor[ r ] = data.rarityColor;
			if ( typeof data.rarityColor2 === 'string' && /^#[0-9a-f]{6}$/i.test( data.rarityColor2 ) ) {
				cat.rarityColor2[ r ] = data.rarityColor2;
			}
			cat.spinRarity[ r ] = data.spin === true;
		}
		if ( safeIconUrl( data.image ) ) {
			cat.brainrotIcon[ data.name ] = safeIconUrl( data.image );
		}
		data.mutations.forEach( function ( m ) {
			cat.mutations[ m.n ] = m.m;
			if ( isDefault( m.n ) ) {
				cat.defaultMutation = m.n;
			}
			if ( safeIconUrl( m.i ) ) {
				cat.mutationIcon[ m.n ] = safeIconUrl( m.i );
			}
			if ( safeColor( m.c ) ) {
				cat.mutationColor[ m.n ] = safeColor( m.c );
			}
		} );
		data.traits.forEach( function ( t ) {
			cat.traits[ t.n ] = t.m;
			if ( t.e ) {
				cat.traitEmoji[ t.n ] = t.e;
			}
			if ( safeIconUrl( t.i ) ) {
				cat.traitIcon[ t.n ] = safeIconUrl( t.i );
			}
		} );
		return cat;
	}

	/**
	 * Where a signed-out reader would see a save button (decided 2026-10-06:
	 * the wiki saves only to a Fandom account, never to the browser).
	 */
	function signinPrompt( env ) {
		var box = el( 'section', 'ffb-signin' );
		var m = env && env.mw;
		var page = m && m.config && m.config.get ? String( m.config.get( 'wgPageName' ) || '' ) : '';
		var back = page ? '?returnto=' + encodeURIComponent( page ) : '';
		box.appendChild( el( 'div', 'ffb-signin-title', 'Sign in to save your brainrots.' ) );
		box.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', 'Your base is saved to your Fandom account, so it’s there on any device.' ) );
		var acts = el( 'div', 'ffb-signin-acts' );
		var a = el( 'a', 'ffb-signin-go', 'Sign in' );
		a.setAttribute( 'href', '/wiki/Special:UserLogin' + back );
		acts.appendChild( a );
		a = el( 'a', 'ffb-signin-new', 'Create an account' );
		a.setAttribute( 'href', '/wiki/Special:CreateAccount' + back );
		acts.appendChild( a );
		box.appendChild( acts );
		return box;
	}

	/** "Saved · Undo": a small note instead of a confirm dialog. */
	function savedToast( holder, text, onUndo ) {
		var t = el( 'div', 'ffb-toast' );
		t.setAttribute( 'role', 'status' );
		t.appendChild( el( 'span', 'ffb-toast-tick', '✓' ) );
		t.appendChild( el( 'span', 'ffb-toast-text', text ) );
		if ( onUndo ) {
			var u = el( 'button', 'ffb-toast-undo', 'Undo' );
			u.type = 'button';
			u.addEventListener( 'click', function () {
				clear( holder );
				onUndo();
			} );
			t.appendChild( u );
		}
		clear( holder );
		holder.appendChild( t );
		if ( typeof setTimeout === 'function' ) {
			setTimeout( function () {
				if ( t.parentNode === holder ) {
					holder.removeChild( t );
				}
			}, 9000 );
		}
	}

	var valueCount = 0;

	/**
	 * Every mutation + trait version a brainrot can have, grouped by the
	 * multiplier it earns (mutation and traits add up; Default adds nothing;
	 * nothing at all is x1). The same for every brainrot in the game: level
	 * and evolution only scale the $/s. Returns { vals: [sorted multipliers],
	 * by: { multiplier: [ { m: mutation index, t: [trait indexes] } ] } }.
	 */
	function incomeTies( data ) {
		var sets = [ [] ], by = {}, vals = [];
		function grow( from, picked ) {
			var i, next;
			for ( i = from; i < data.traits.length; i++ ) {
				next = picked.concat( [ i ] );
				sets.push( next );
				if ( next.length < data.maxTraits ) {
					grow( i + 1, next );
				}
			}
		}
		grow( 0, [] );
		data.mutations.forEach( function ( m, mi ) {
			var base = isDefault( m.n ) ? 0 : m.m;
			sets.forEach( function ( t ) {
				var v = base;
				t.forEach( function ( i ) {
					v += data.traits[ i ].m;
				} );
				v = Math.round( ( v || 1 ) * 100 ) / 100;
				if ( !by[ v ] ) {
					by[ v ] = [];
					vals.push( v );
				}
				by[ v ].push( { m: mi, t: t } );
			} );
		} );
		vals.sort( function ( a, b ) {
			return a - b;
		} );
		return { vals: vals, by: by };
	}

	function buildValueCalculator( container, data, env ) {
		var cat = valueCatalog( data );
		var uid = 'ffb-calc-' + ( ++valueCount ) + '-';
		var maxTraits = cat.data.maxTraits;
		// the phone site starts (and resets) at level 1: the brainrot as
		// caught (user, 2026-10-08); the wiki's pages start fully levelled
		var fresh = function () {
			return { mutation: mutIndex( 'Default' ), traits: [], evolution: 0, level: env && env.planner ? 1 : data.maxLevel };
		};
		var state = fresh();
		var store = env ? chooseStore( env ) : { kind: 'none', load: function () {
			return null;
		} };
		// the reader's own copy loaded from My base: its place in the list and
		// what it was when loaded, to find it again when saving
		var loaded = null;

		function mutIndex( name ) {
			var i;
			for ( i = 0; i < data.mutations.length; i++ ) {
				if ( data.mutations[ i ].n === name ) {
					return i;
				}
			}
			return 0;
		}
		function traitIndex( name ) {
			var i;
			for ( i = 0; i < data.traits.length; i++ ) {
				if ( data.traits[ i ].n === name ) {
					return i;
				}
			}
			return -1;
		}
		function savedRows() {
			return store.kind === 'account' || store.kind === 'browser' ?
				parseCollection( store.load(), cat ).rows : [];
		}
		function stateRow() {
			var row = { name: data.name, mutation: data.mutations[ state.mutation ].n, traits: [], evolution: state.evolution, level: state.level };
			var i;
			for ( i = 0; i < maxTraits; i++ ) {
				row.traits.push( state.traits[ i ] !== undefined ? data.traits[ state.traits[ i ] ].n : '' );
			}
			return row;
		}
		function describe( r ) {
			return ( isDefault( r.mutation ) ? 'Default' : r.mutation ) + ', L' + r.level + ( r.evolution ? ', Evo ' + r.evolution : '' );
		}

		/**
		 * The trade card's fields for this one brainrot: evolution, mutation
		 * and level in a row, then a searchable picker per trait slot. They
		 * edit state; set() puts state back into them after a load or reset.
		 */
		function buildDropdowns() {
			var box = el( 'div', 'ffb-trade-card ffb-v2-dd' );
			var fields = el( 'div', 'ffb-trade-fields' );
			var row = stateRow();
			var evo = buildListPicker( uid + 'e', evolutionOptions( cat ), String( state.evolution ),
				'ffb-trade-input ffb-trade-select-evo', function ( v ) {
					state.evolution = parseInt( v, 10 );
					refresh();
				} );
			var mut = buildSearchPicker( {
				id: uid + 'mutation',
				current: row.mutation,
				inputClass: 'ffb-trade-input ffb-trade-select-mut',
				placeholder: 'Type a mutation',
				noun: 'mutation',
				search: function ( q ) {
					return searchMutations( cat, q );
				},
				lead: function ( v ) {
					return cat.mutationIcon[ v ] || cat.mutationColor[ v ] ?
						{ icon: cat.mutationIcon[ v ] || null, color: cat.mutationColor[ v ] || null } : null;
				},
				exact: function ( text ) {
					return exactName( cat.mutations, text );
				},
				onPick: function ( m ) {
					state.mutation = mutIndex( m );
					refresh();
				}
			} );
			var lvl = el( 'input', 'ffb-trade-input ffb-trade-input-level' );
			lvl.type = 'number';
			lvl.min = '1';
			lvl.max = String( data.maxLevel );
			lvl.step = '1';
			lvl.setAttribute( 'inputmode', 'numeric' );
			lvl.value = String( state.level );
			lvl.addEventListener( 'input', function () {
				var n = parseInt( lvl.value, 10 );
				if ( n >= 1 && n <= data.maxLevel ) {
					state.level = n;
					refresh();
				}
			} );
			lvl.addEventListener( 'change', function () {
				lvl.value = String( state.level );
			} );
			// mutation | evolution | level, as in the trade page's add box
			fields.appendChild( pickerField( uid + 'mutation', 'Mutation', mut, 'ffb-trade-field-mut' ).node );
			fields.appendChild( pickerField( uid + 'e', 'Evolution', evo, 'ffb-trade-field-evo' ).node );
			fields.appendChild( field( uid + 'level', 'Level', lvl, 'ffb-trade-field-level' ).node );
			box.appendChild( fields );
			var quickHost = el( 'div', 'ffb-v2-dd-quick' );
			box.appendChild( quickHost );
			var traitGrid = el( 'div', 'ffb-trade-traits' );
			var traits = [];
			// the slots as shown (an empty one in the middle stays put);
			// state.traits is the same traits without the gaps
			var slots = { traits: row.traits.slice() };
			var i;
			function traitPicker( slot ) {
				return buildSearchPicker( {
					id: uid + 't' + slot,
					current: row.traits[ slot ],
					inputClass: 'ffb-trade-input ffb-trade-select-trait',
					placeholder: 'No trait',
					noun: 'trait',
					label: function ( v ) {
						return traitPickLabel( cat, v );
					},
					lead: function ( v ) {
						return v && cat.traitIcon[ v ] ? { icon: cat.traitIcon[ v ] } : null;
					},
					search: function ( q ) {
						return searchTraits( cat, slots, slot, q );
					},
					exact: function ( text ) {
						var t = String( text || '' ).trim();
						if ( t === '' || squash( t ) === 'notrait' ) {
							return '';
						}
						var name = exactName( cat.traits, t );
						return name && searchTraits( cat, slots, slot, name ).some( function ( m ) {
							return m.value === name;
						} ) ? name : null;
					},
					onPick: function ( t ) {
						if ( setTrait( cat, slots, slot, t ) ) {
							state.traits = slots.traits.filter( function ( n ) {
								return n;
							} ).map( traitIndex );
							refresh();
						}
					}
				} );
			}
			for ( i = 0; i < maxTraits; i++ ) {
				traits.push( traitPicker( i ) );
				traitGrid.appendChild( pickerField( uid + 't' + i, 'Trait ' + ( i + 1 ), traits[ i ] ).node );
			}
			box.appendChild( traitGrid );
			controls.appendChild( box );
			return {
				quickHost: quickHost,
				set: function () {
					var r = stateRow();
					evo.set( String( state.evolution ) );
					mut.set( r.mutation );
					lvl.value = String( state.level );
					slots.traits = r.traits.slice();
					traits.forEach( function ( p, k ) {
						p.set( r.traits[ k ] );
					} );
				}
			};
		}

		/** Puts state back into whichever controls this page has. */
		function syncControls() {
			if ( dd ) {
				dd.set();
				return;
			}
			mutPicker.set( String( state.mutation ) );
			lvlInput.value = String( state.level );
		}

		// the phone site picks with the trade card's dropdowns (user,
		// 2026-10-08); the wiki keeps its chips (redesign canvas)
		var dropdowns = !!( env && env.planner );
		var dd = null;
		var root = el( 'div', 'ffb-calc ffb-v2' + ( dropdowns ? ' ffb-v2-dropdowns' : '' ) );

		// ---- In My base: the reader's own copies of this brainrot ----------
		var strip = el( 'div', 'ffb-v2-strip' );
		root.appendChild( strip );

		var grid = el( 'div', 'ffb-v2-grid' );
		var controls = el( 'div', 'ffb-calc-controls' );
		var side = el( 'div', 'ffb-v2-side' );
		grid.appendChild( controls );
		grid.appendChild( side );
		root.appendChild( grid );

		function ctl( label, forId ) {
			var row = el( 'div', 'ffb-calc-row' );
			var lab = el( forId ? 'label' : 'span', 'ffb-calc-label', label );
			if ( forId ) {
				lab.htmlFor = forId;
			}
			row.appendChild( lab );
			var body = el( 'div', 'ffb-v2-ctl' );
			row.appendChild( body );
			controls.appendChild( row );
			return body;
		}

		var mutPicker, mutChipNodes, trNodes, evoNodes, lvlInput, lvlOut, lvlBody;
		if ( dropdowns ) {
			dd = buildDropdowns();
			lvlBody = dd.quickHost;
		} else {
			// ---- mutation: the strongest as chips, any of them by search -------
			var mutBody = ctl( 'Mutation', uid + 'mutation' );
			var mutOrder = data.mutations.map( function ( m, i ) {
				return i;
			} ).sort( function ( a, b ) {
				return data.mutations[ b ].m - data.mutations[ a ].m || a - b;
			} );
			var mutChips = el( 'div', 'ffb-calc-chips' );
			var mutChipNodes = [];
			mutOrder.slice( 0, 6 ).concat( [ 0 ] ).forEach( function ( i ) {
				var m = data.mutations[ i ];
				var b = el( 'button', 'ffb-calc-chip ffb-v2-mut', m.n );
				var mk = mark( safeColor( m.c ), safeIconUrl( m.i ) );
				if ( mk ) {
					b.insertBefore( mk, b.firstChild );
				}
				b.type = 'button';
				b.addEventListener( 'click', function () {
					state.mutation = i;
					mutPicker.set( String( i ) );
					refresh();
				} );
				mutChipNodes.push( { i: i, b: b } );
				mutChips.appendChild( b );
			} );
			mutBody.appendChild( mutChips );
			var mutPicker = buildSearchPicker( {
				id: uid + 'mutation',
				current: String( state.mutation ),
				inputClass: 'ffb-calc-select',
				placeholder: 'Type any mutation',
				noun: 'mutation',
				label: function ( v ) {
					return data.mutations[ Number( v ) ].n;
				},
				lead: function ( v ) {
					var m = data.mutations[ Number( v ) ];
					var icon = m && safeIconUrl( m.i );
					var color = m && safeColor( m.c );
					return icon || color ? { icon: icon, color: color } : null;
				},
				search: function ( q ) {
					var sq = squash( q || '' );
					return mutOrder.filter( function ( i ) {
						return sq === '' || squash( data.mutations[ i ].n ).indexOf( sq ) !== -1;
					} ).map( function ( i ) {
						return { value: String( i ), color: safeColor( data.mutations[ i ].c ), icon: safeIconUrl( data.mutations[ i ].i ), right: '+' + data.mutations[ i ].m.toFixed( 2 ) };
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
			mutPicker.input.id = uid + 'mutation';
			mutBody.appendChild( mutPicker.node );

			// ---- traits: up to the game's three ---------------------------------
			var trBody = ctl( 'Traits' );
			var trChips = el( 'div', 'ffb-calc-chips ffb-calc-chips-traits' );
			var trNodes = [];
			var trNote = el( 'div', 'ffb-base-muted ffb-base-small', 'Up to ' + maxTraits + '.' );
			trNote.setAttribute( 'aria-live', 'polite' );
			data.traits.map( function ( t, i ) {
				return i;
			} ).sort( function ( a, b ) {
				return data.traits[ b ].m - data.traits[ a ].m || a - b;
			} ).forEach( function ( i ) {
				var t = data.traits[ i ];
				var tIcon = safeIconUrl( t.i );
				var b = el( 'button', 'ffb-calc-chip ffb-v2-trait', ( tIcon ? t.n : emojiName( t.e, t.n ) ) + ' +' + t.m.toFixed( 2 ) );
				if ( tIcon ) {
					b.insertBefore( mark( null, tIcon ), b.firstChild );
				}
				b.type = 'button';
				b.setAttribute( 'aria-pressed', 'false' );
				b.addEventListener( 'click', function () {
					var at = state.traits.indexOf( i );
					if ( at !== -1 ) {
						state.traits.splice( at, 1 );
					} else if ( state.traits.length >= maxTraits ) {
						trNote.textContent = 'A brainrot can have ' + maxTraits + ' traits at most: take one off first.';
						return;
					} else {
						state.traits.push( i );
					}
					trNote.textContent = 'Up to ' + maxTraits + '.';
					refresh();
				} );
				trNodes[ i ] = b;
				trChips.appendChild( b );
			} );
			trBody.appendChild( trChips );
			trBody.appendChild( trNote );

			// ---- evolution --------------------------------------------------------
			var evoBody = ctl( 'Evolution' );
			var evoButtons = el( 'div', 'ffb-calc-chips ffb-v2-seg' );
			var evoNodes = [];
			var e;
			for ( e = 0; e <= data.evolutions.length; e++ ) {
				( function ( stage ) {
					var b = el( 'button', 'ffb-calc-chip ffb-v2-evo', stage === 0 ? 'None' : 'E' + stage );
					var badge = stage > 0 && Array.isArray( data.evoIcons ) ? mark( null, safeIconUrl( data.evoIcons[ stage - 1 ] ) ) : null;
					if ( badge ) {
						b.insertBefore( badge, b.firstChild );
					}
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
			evoBody.appendChild( evoButtons );

			// ---- level ------------------------------------------------------------
			var lvlBody = ctl( 'Level', uid + 'level' );
			var lvlLine = el( 'div', 'ffb-v2-level' );
			var lvlInput = el( 'input', 'ffb-calc-slider' );
			lvlInput.type = 'range';
			lvlInput.id = uid + 'level';
			lvlInput.min = '1';
			lvlInput.max = String( data.maxLevel );
			lvlInput.value = String( state.level );
			var lvlOut = el( 'output', 'ffb-calc-level-value', String( state.level ) );
			lvlInput.addEventListener( 'input', function () {
				state.level = parseInt( lvlInput.value, 10 );
				refresh();
			} );
			lvlLine.appendChild( lvlInput );
			lvlLine.appendChild( lvlOut );
			lvlBody.appendChild( lvlLine );
		}
		var quick = el( 'div', 'ffb-v2-quick' );
		[ 1, 100, 150, 175, data.maxLevel ].forEach( function ( q ) {
			var b = el( 'button', 'ffb-calc-reset', 'Lv ' + q );
			b.type = 'button';
			b.addEventListener( 'click', function () {
				state.level = q;
				syncControls();
				refresh();
			} );
			quick.appendChild( b );
		} );
		var maxBtn = el( 'button', 'ffb-calc-reset ffb-v2-max', 'Fully upgraded' );
		maxBtn.type = 'button';
		maxBtn.addEventListener( 'click', function () {
			state.level = data.maxLevel;
			state.evolution = data.evolutions.length;
			syncControls();
			refresh();
		} );
		quick.appendChild( maxBtn );
		var reset = el( 'button', 'ffb-calc-reset', 'Reset' );
		reset.type = 'button';
		reset.addEventListener( 'click', function () {
			state = fresh();
			loaded = null;
			syncControls();
			refresh();
		} );
		quick.appendChild( reset );
		lvlBody.appendChild( quick );

		// ---- the answer --------------------------------------------------------
		var result = el( 'div', 'ffb-calc-result' );
		var incomeOut = el( 'div', 'ffb-calc-figure ffb-v2-income' );
		var valueOut = el( 'div', 'ffb-calc-figure' );
		var ceilOut = el( 'div', 'ffb-calc-figure ffb-v2-ceil' );
		var costOut = el( 'div', 'ffb-calc-figure ffb-v2-cost' );
		var fullCostOut = el( 'div', 'ffb-calc-figure ffb-v2-cost' );
		var working = el( 'div', 'ffb-calc-working' );
		result.appendChild( incomeOut );
		result.appendChild( valueOut );
		result.appendChild( ceilOut );
		result.appendChild( costOut );
		result.appendChild( fullCostOut );

		// ---- cost to reach any evolution and level, from where this is set;
		// the last target is remembered (user, 2026-10-09)
		var TARGET_KEY = 'ffb-value-target';
		var storage = env && env.storage;
		var target = ( function () {
			var t = null;
			try {
				t = JSON.parse( readStorage( storage, TARGET_KEY ) || 'null' );
			} catch ( err ) {}
			return t && t.e >= 0 && t.e <= data.maxEvolution && t.l >= 1 && t.l <= data.maxLevel ?
				{ e: Math.floor( t.e ), l: Math.floor( t.l ) } : { e: 1, l: data.maxLevel };
		}() );
		var targetBox = el( 'div', 'ffb-calc-figure ffb-v2-target' );
		targetBox.appendChild( el( 'span', 'ffb-calc-figure-label', 'Cost to reach' ) );
		var targetFields = el( 'div', 'ffb-v2-target-fields' );
		var targetEvo = buildListPicker( uid + 'te', evolutionOptions( cat ), String( target.e ),
			'ffb-trade-input ffb-trade-select-evo', function ( v ) {
				target.e = parseInt( v, 10 );
				keepTarget();
			} );
		var targetLvl = el( 'input', 'ffb-trade-input ffb-trade-input-level' );
		targetLvl.type = 'number';
		targetLvl.min = '1';
		targetLvl.max = String( data.maxLevel );
		targetLvl.step = '1';
		targetLvl.setAttribute( 'inputmode', 'numeric' );
		targetLvl.value = String( target.l );
		targetLvl.addEventListener( 'input', function () {
			var n = parseInt( targetLvl.value, 10 );
			if ( n >= 1 && n <= data.maxLevel ) {
				target.l = n;
				keepTarget();
			}
		} );
		targetLvl.addEventListener( 'change', function () {
			targetLvl.value = String( target.l );
		} );
		targetFields.appendChild( pickerField( uid + 'te', 'Evolution', targetEvo, 'ffb-trade-field-evo' ).node );
		targetFields.appendChild( field( uid + 'tl', 'Level', targetLvl, 'ffb-trade-field-level' ).node );
		targetBox.appendChild( targetFields );
		var targetOut = el( 'div', 'ffb-v2-target-out' );
		targetBox.appendChild( targetOut );
		result.appendChild( targetBox );

		function keepTarget() {
			if ( storage ) {
				writeStorage( storage, TARGET_KEY, JSON.stringify( target ) );
			}
			renderTarget();
		}

		function evoOf( e ) {
			return e > 0 ? data.evolutions[ e - 1 ] : 1;
		}

		/** "unevolved, level 200", "Evo 3, level 150" */
		function where( evolution, level ) {
			return ( evolution ? 'Evo ' + evolution : 'unevolved' ) + ', level ' + level;
		}

		function renderTarget() {
			var tc = data.base === null || data.base === undefined ? null :
				targetCost( data, data.base * totalFor( 0 ), state.evolution, state.level, target.e, target.l, evoOf );
			var steps;
			clear( targetOut );
			if ( !tc || tc.there || tc.behind ) {
				targetOut.appendChild( el( 'strong', 'ffb-calc-figure-value ffb-v2-cost-done',
					!tc ? 'Not known yet' : tc.there ? 'Already there' : 'Already past it' ) );
				if ( tc ) {
					targetOut.appendChild( el( 'span', 'ffb-base-muted ffb-base-small ffb-base-block', tc.there ?
						'The calculator is set to ' + where( target.e, target.l ) + ' already.' :
						'This ' + data.name + ' is at ' + where( state.evolution, state.level ) + ', beyond ' +
							where( target.e, target.l ) + '. Pick a later evolution or a higher level.' ) );
				}
				return;
			}
			targetOut.appendChild( fullTip( el( 'strong', 'ffb-calc-figure-value', money( tc.cost ) ), tc.cost, false, true ) );
			if ( !tc.evolves ) {
				steps = 'levels ' + state.level + ' → ' + target.l + ', no evolving.';
			} else {
				steps = ( tc.finish ? 'levels ' + state.level + ' → ' + data.maxLevel + ', ' : '' ) +
					'evolve ' + ( tc.evolves === 1 ? 'once' : tc.evolves + ' times' ) + ' (free), ' +
					( tc.between.length ? 'a full climb at ' + joinNames( tc.between.map( function ( e ) {
						return 'Evo ' + e;
					} ) ) + ', ' : '' ) +
					'then level 1 → ' + target.l + ' at Evo ' + target.e + '.';
			}
			targetOut.appendChild( el( 'span', 'ffb-base-muted ffb-base-small ffb-base-block',
				'From ' + where( state.evolution, state.level ) + ': ' + steps ) );
		}
		// ---- What can my cash do? How far a sum takes this brainrot (user,
		// 2026-10-20); the sum is remembered like the target
		var CASH_KEY = 'ffb-value-cash';
		var cashEvolve = false;
		var cashBox = el( 'div', 'ffb-calc-figure ffb-v2-cash' );
		cashBox.appendChild( el( 'span', 'ffb-calc-figure-label', 'What can my cash do?' ) );
		var cashIn = el( 'input', 'ffb-trade-input' );
		cashIn.type = 'text';
		cashIn.placeholder = 'e.g. 2.5Qa';
		cashIn.setAttribute( 'inputmode', 'decimal' );
		cashIn.value = readStorage( storage, CASH_KEY ) || '';
		cashBox.appendChild( field( uid + 'cash', 'Cash to spend', cashIn, 'ffb-v2-cash-field' ).node );
		var cashTog = el( 'label', 'ffb-base-check' );
		var cashCheck = el( 'input' );
		cashCheck.type = 'checkbox';
		cashTog.appendChild( cashCheck );
		cashTog.appendChild( el( 'span', null, ' Keep evolving past level ' + data.maxLevel ) );
		cashBox.appendChild( cashTog );
		var cashOut = el( 'div', 'ffb-v2-cash-out' );
		cashBox.appendChild( cashOut );
		result.appendChild( cashBox );
		cashIn.addEventListener( 'input', function () {
			if ( storage ) {
				writeStorage( storage, CASH_KEY, cashIn.value );
			}
			renderCash();
		} );
		cashCheck.addEventListener( 'change', function () {
			cashEvolve = cashCheck.checked;
			renderCash();
		} );

		function renderCash() {
			clear( cashOut );
			var cash = parseMoney( cashIn.value );
			if ( data.base === null || data.base === undefined ) {
				cashOut.appendChild( el( 'span', 'ffb-base-muted ffb-base-small ffb-base-block', 'Not known yet: this brainrot’s income hasn’t been measured.' ) );
				return;
			}
			if ( cash === null || !( cash > 0 ) ) {
				cashOut.appendChild( el( 'span', 'ffb-base-muted ffb-base-small ffb-base-block',
					'Type how much you have (or want to spend on this brainrot) to see how far it takes it.' ) );
				return;
			}
			var strength = data.base * totalFor( 0 );
			var price = function ( e, L ) {
				return strength * Math.sqrt( evoOf( e ) ) * priceCurve( data, L );
			};
			var rateAt = function ( e, L ) {
				return income( data.base, totalFor( e ), L, data );
			};
			var r = cashClimb( price, data.maxLevel, data.maxEvolution, state.evolution, state.level, cash, cashEvolve );
			if ( r.evo === state.evolution && r.level === state.level ) {
				cashOut.appendChild( el( 'span', 'ffb-base-small ffb-base-block', r.next === null ? 'Nothing left to buy at this evolution.' :
					'Not enough for the next level yet: it costs ' + money( r.next ) + '.' ) );
				return;
			}
			var head = el( 'span', 'ffb-base-block' );
			head.appendChild( document.createTextNode( 'Takes it from ' + where( state.evolution, state.level ) + ' to ' ) );
			head.appendChild( el( 'strong', 'ffb-base-accent', where( r.evo, r.level ) ) );
			head.appendChild( document.createTextNode( ( r.evo === state.evolution ? ' (+' + ( r.level - state.level ) + ' levels)' : '' ) + '.' ) );
			cashOut.appendChild( head );
			var facts = el( 'ul', 'ffb-v2-cash-facts' );
			facts.appendChild( el( 'li', null, 'Costs ' + money( r.spent ) + ' · ' + money( r.left ) + ' left over' ) );
			if ( r.next !== null && isFinite( r.next ) ) {
				facts.appendChild( el( 'li', null, 'The next level would cost ' + money( r.next ) ) );
			}
			facts.appendChild( el( 'li', null, 'Earns ' + money( rateAt( state.evolution, state.level ) ) + '/s now → ' +
				money( rateAt( r.evo, r.level ) ) + '/s, before your base’s multiplier' ) );
			if ( !cashEvolve && r.level >= data.maxLevel && r.evo < data.maxEvolution ) {
				var more = cashClimb( price, data.maxLevel, data.maxEvolution, r.evo, r.level, r.left, true );
				facts.appendChild( el( 'li', 'ffb-base-muted', 'Level ' + data.maxLevel + ' with cash to spare. Evolving is free but starts again at level 1, ' +
					'so only evolve when you can buy it straight back up: the rest would take it to ' + where( more.evo, more.level ) + '.' ) );
			}
			cashOut.appendChild( facts );
		}

		result.appendChild( working );
		result.appendChild( suffixLegend() );
		side.appendChild( result );
		var saveBox = el( 'div', 'ffb-v2-save' );
		var toastBox = el( 'div', 'ffb-v2-toast' );
		toastBox.setAttribute( 'aria-live', 'polite' );
		side.appendChild( saveBox );
		side.appendChild( toastBox );

		function figure( box, label, n, text ) {
			clear( box );
			box.appendChild( el( 'span', 'ffb-calc-figure-label', label ) );
			box.appendChild( fullTip( el( 'strong', 'ffb-calc-figure-value', text ), n, /\/sec$/.test( text ), true ) );
		}

		/** A cash figure with a line under it; done replaces the figure once there's nothing left to pay. */
		function costFigure( box, label, n, done, hint ) {
			clear( box );
			box.appendChild( el( 'span', 'ffb-calc-figure-label', label ) );
			box.appendChild( done ? el( 'strong', 'ffb-calc-figure-value ffb-v2-cost-done', done ) :
				fullTip( el( 'strong', 'ffb-calc-figure-value', money( n ) ), n, false, true ) );
			if ( hint ) {
				box.appendChild( el( 'span', 'ffb-base-muted ffb-base-small ffb-base-block', hint ) );
			}
		}

		function totalFor( evolution ) {
			var parts = [];
			var mut = data.mutations[ state.mutation ];
			if ( mut && !isDefault( mut.n ) ) {
				parts.push( mut.m );
			}
			state.traits.forEach( function ( i ) {
				parts.push( data.traits[ i ].m );
			} );
			return totalMultiplier( parts, evolution > 0 ? data.evolutions[ evolution - 1 ] : 1 );
		}

		function load( r, at ) {
			state = { mutation: mutIndex( r.mutation ), traits: [], evolution: r.evolution, level: r.level };
			r.traits.forEach( function ( t ) {
				var k = traitIndex( t );
				if ( t && k !== -1 && state.traits.length < maxTraits ) {
					state.traits.push( k );
				}
			} );
			loaded = { at: at, key: savedKey( r ), was: describe( r ) };
			syncControls();
			clear( toastBox );
			refresh();
		}

		function renderStrip() {
			var mine = [];
			clear( strip );
			if ( store.kind !== 'account' && store.kind !== 'browser' ) {
				strip.hidden = true;
				return;
			}
			savedRows().forEach( function ( r, i ) {
				if ( r.name === data.name ) {
					mine.push( { r: r, at: i } );
				}
			} );
			strip.hidden = !mine.length;
			if ( !mine.length ) {
				return;
			}
			strip.appendChild( el( 'span', 'ffb-v2-strip-title', 'In My base' ) );
			strip.appendChild( el( 'span', 'ffb-base-small', 'You have ' + mine.length + ' ' + data.name + ':' ) );
			mine.forEach( function ( x ) {
				var on = loaded && loaded.at === x.at;
				var b = el( 'button', 'ffb-v2-mine' + ( on ? ' ffb-v2-mine-on' : '' ) );
				b.type = 'button';
				b.setAttribute( 'aria-pressed', on ? 'true' : 'false' );
				var mk = isDefault( x.r.mutation ) ? null : mark( cat.mutationColor[ x.r.mutation ] || null, cat.mutationIcon[ x.r.mutation ] || null );
				if ( mk ) {
					b.appendChild( mk );
				}
				b.appendChild( el( 'span', null, describe( x.r ) ) );
				var rate = income( data.base, rowTotal( cat, x.r, x.r.evolution ), x.r.level, data );
				b.appendChild( fullTip( el( 'span', 'ffb-v2-mine-fig', money( rate ) + '/s' ), rate, true ) );
				if ( on ) {
					b.appendChild( el( 'span', 'ffb-v2-mine-tag', '· loaded' ) );
				}
				b.addEventListener( 'click', function () {
					load( x.r, x.at );
				} );
				strip.appendChild( b );
			} );
			strip.appendChild( el( 'span', 'ffb-base-muted ffb-base-small ffb-v2-strip-hint', loaded ? 'loaded into the calculator' : 'click one to load it' ) );
		}

		function save( mode ) {
			var before = store.load();
			var list = parseCollection( before, cat ).rows;
			var row = parseSavedRow( JSON.parse( serializeCollection( [ stateRow() ] ) ).r[ 0 ], cat );
			var at = -1;
			var said;
			if ( mode === 'update' && loaded ) {
				// the copy loaded, if it's still where it was; else the first exact match
				if ( list[ loaded.at ] && savedKey( list[ loaded.at ] ) === loaded.key ) {
					at = loaded.at;
				} else {
					list.some( function ( r, i ) {
						if ( savedKey( r ) === loaded.key ) {
							at = i;
							return true;
						}
						return false;
					} );
				}
			}
			if ( at !== -1 ) {
				row.inBase = list[ at ].inBase;
				list[ at ] = row;
				said = 'Saved. Your ' + data.name + ' is now ' + describe( row ) + ' in My base.';
			} else {
				if ( list.length >= COLLECTION_MAX ) {
					savedToast( toastBox, 'My base is full (' + COLLECTION_MAX + '). Remove some there first.', null );
					return;
				}
				list.push( row );
				at = list.length - 1;
				said = 'Added to My base: ' + data.name + ' (' + describe( row ) + ').';
			}
			store.save( serializeCollection( list ), function ( err ) {
				if ( err ) {
					savedToast( toastBox, 'Couldn’t save: ' + err + '.', null );
					return;
				}
				loaded = { at: at, key: savedKey( row ), was: describe( row ) };
				refresh();
				savedToast( toastBox, said, function () {
					store.save( before === null ? serializeCollection( [] ) : before, function () {
						loaded = null;
						refresh();
					} );
				} );
			} );
		}

		function useInTrade() {
			var a;
			if ( !env || !env.wiki ) {
				return;
			}
			a = el( 'a', 'ffb-v2-trade', 'Use in a trade ›' );
			a.setAttribute( 'href', wikiLink( 'Fish for Brainrots - Trading' ) + '?brainrot=' + encodeURIComponent( data.name.replace( / /g, '_' ) ) );
			saveBox.appendChild( a );
		}

		function renderSave() {
			var b;
			clear( saveBox );
			if ( store.kind === 'signin' ) {
				saveBox.appendChild( signinPrompt( env ) );
				useInTrade();
				return;
			}
			if ( store.kind !== 'account' && store.kind !== 'browser' ) {
				useInTrade();
				return;
			}
			if ( loaded ) {
				b = el( 'button', 'ffb-trade-add ffb-v2-save-main', 'Update my ' + data.name + ' (' + loaded.was + ')' );
				b.type = 'button';
				b.addEventListener( 'click', function () {
					save( 'update' );
				} );
				saveBox.appendChild( b );
				b = el( 'button', 'ffb-collection-button', 'Add as a new one' );
				b.type = 'button';
				b.addEventListener( 'click', function () {
					save( 'add' );
				} );
				saveBox.appendChild( b );
			} else {
				b = el( 'button', 'ffb-trade-add ffb-v2-save-main', '+ Add to My base' );
				b.type = 'button';
				b.addEventListener( 'click', function () {
					save( 'add' );
				} );
				saveBox.appendChild( b );
				saveBox.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', 'Adds a ' + data.name + ' with these settings.' ) );
			}
			useInTrade();
		}

		function refresh() {
			var terms = [];
			var evoFactor = state.evolution > 0 ? data.evolutions[ state.evolution - 1 ] : 1;
			var mut = data.mutations[ state.mutation ];
			if ( mut && !isDefault( mut.n ) ) {
				terms.push( mut.n + ' ' + mut.m.toFixed( 2 ) );
			}
			state.traits.slice().sort( function ( a, b ) {
				return a - b;
			} ).forEach( function ( i ) {
				terms.push( emojiName( data.traits[ i ].e, data.traits[ i ].n ) + ' ' + data.traits[ i ].m.toFixed( 2 ) );
			} );
			var total = totalFor( state.evolution );
			var rate = income( data.base, total, state.level, data );
			var ceil = income( data.base, totalFor( data.evolutions.length ), data.maxLevel, data );

			figure( incomeOut, 'Income', rate, money( rate ) + '/sec' );
			figure( valueOut, 'Value', saleValue( rate, data.valueMult ), money( saleValue( rate, data.valueMult ) ) );
			figure( ceilOut, 'Fully upgraded (level ' + data.maxLevel + ', Evo ' + data.evolutions.length + ')', ceil, money( ceil ) + '/sec' );

			// what the climb still costs: the next step (to level 200, or at
			// level 200 the next evolution), and all the way to Evo 7
			var cc = data.base === null || data.base === undefined ? null :
				climbCost( data, data.base * totalFor( 0 ), state.evolution, state.level, evoOf );
			var estimate = 'An estimate: some upgrade prices are fitted to a few readings, not read level by level.';
			var evolving = cc && cc.next.evolution > state.evolution;
			var done = cc && state.level >= data.maxLevel && !cc.climbsLeft;
			var after = cc ? data.maxEvolution - cc.next.evolution : 0;
			costFigure( costOut, evolving || done ?
				'Upgrade cost to Evo ' + ( done ? state.evolution : cc.next.evolution ) + ', level ' + data.maxLevel :
				'Upgrade cost to level ' + data.maxLevel + ' (' + ( state.evolution ? 'Evo ' + state.evolution : 'unevolved' ) + ')',
				cc && cc.next.cost, cc ? ( done ? 'Already fully upgraded' : null ) : 'Not known yet',
				cc && !done ? ( evolving ? 'Evolve (free), then level 1 → ' + data.maxLevel + ' at Evo ' + cc.next.evolution + '. ' :
					'From level ' + state.level + '. ' ) + estimate : '' );
			renderTarget();
			renderCash();
			// once the next step already ends at Evo 7, level 200, the same figure twice says nothing
			fullCostOut.hidden = !!( cc && ( done || cc.next.evolution >= data.maxEvolution ) );
			if ( fullCostOut.hidden ) {
				clear( fullCostOut );
			} else {
				costFigure( fullCostOut, 'Upgrade cost to Evo ' + data.maxEvolution + ', level ' + data.maxLevel,
					cc && cc.toFull, cc ? null : 'Not known yet',
					cc ? 'The step above, then ' + after + ' more climb' + ( after === 1 ? '' : 's' ) +
						' from level 1 to ' + data.maxLevel + ': evolving is free but resets the level.' : '' );
			}

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

			if ( !dd ) {
				lvlOut.textContent = String( state.level );
				evoNodes.forEach( function ( b, i ) {
					b.setAttribute( 'aria-pressed', i === state.evolution ? 'true' : 'false' );
				} );
				mutChipNodes.forEach( function ( x ) {
					x.b.setAttribute( 'aria-pressed', x.i === state.mutation ? 'true' : 'false' );
				} );
				trNodes.forEach( function ( b, i ) {
					if ( b ) {
						b.setAttribute( 'aria-pressed', state.traits.indexOf( i ) !== -1 ? 'true' : 'false' );
					}
				} );
			}
			renderStrip();
			renderSave();
			// a change in the calculator moves the Same income view with it
			tiePicked = null;
			renderSameLine();
			renderSame();
		}

		// ---- Same income: which versions earn exactly what this one does --
		// (user, 2026-10-20). A switch above the calculator; no inputs of its
		// own, it follows whatever the calculator is set to.
		var ties = incomeTies( data );
		var tieMax = 0;
		ties.vals.forEach( function ( v ) {
			tieMax = Math.max( tieMax, ties.by[ v ].length );
		} );
		var sameView = el( 'div', 'ffb-calc ffb-same' );
		sameView.hidden = true;
		var sameLine = el( 'p', 'ffb-same-line' );
		var sw = el( 'div', 'ffb-same-switch' );
		sw.setAttribute( 'role', 'tablist' );
		sw.setAttribute( 'aria-label', 'Value calculator views' );
		var swValue = el( 'button', 'ffb-calc-chip', 'Value' );
		var swSame = el( 'button', 'ffb-calc-chip', 'Same income' );
		swSame.appendChild( el( 'span', 'ffb-same-new', 'new' ) );
		var tiePicked = null, tieAll = false;
		[ swValue, swSame ].forEach( function ( b ) {
			b.type = 'button';
			b.setAttribute( 'role', 'tab' );
			sw.appendChild( b );
		} );
		function showSame( on ) {
			swValue.setAttribute( 'aria-selected', on ? 'false' : 'true' );
			swValue.setAttribute( 'aria-pressed', on ? 'false' : 'true' );
			swSame.setAttribute( 'aria-selected', on ? 'true' : 'false' );
			swSame.setAttribute( 'aria-pressed', on ? 'true' : 'false' );
			root.hidden = on;
			sameView.hidden = !on;
			if ( on ) {
				renderSame();
			}
		}
		swValue.addEventListener( 'click', function () {
			showSame( false );
		} );
		swSame.addEventListener( 'click', function () {
			showSame( true );
		} );
		function myTotal() {
			var mut = data.mutations[ state.mutation ];
			var v = mut && !isDefault( mut.n ) ? mut.m : 0;
			state.traits.forEach( function ( i ) {
				v += data.traits[ i ].m;
			} );
			return Math.round( ( v || 1 ) * 100 ) / 100;
		}
		function tieRate( v ) {
			if ( data.base === null || data.base === undefined ) {
				return null;
			}
			var evo = state.evolution > 0 ? data.evolutions[ state.evolution - 1 ] : 1;
			return data.base * v * evo * growthFactor( state.level, data );
		}
		function tieRateText( v ) {
			var r = tieRate( v );
			return r === null ? '' : money( r ) + '/s';
		}
		function versions( n ) {
			return n.toLocaleString() + ( n === 1 ? ' version' : ' versions' );
		}
		function renderSameLine() {
			// refresh() can run while the calculator is still being built
			if ( !sameLine ) {
				return;
			}
			var n = ties.by[ myTotal() ].length;
			clear( sameLine );
			sameLine.appendChild( document.createTextNode( n > 1 ?
				( n - 1 ).toLocaleString() + ' other mutation and trait ' + ( n === 2 ? 'version earns' : 'versions earn' ) + ' exactly the same as this one. ' :
				'No other mutation and trait version earns exactly this. ' ) );
			var go = el( 'button', 'ffb-same-link', 'See who earns the same' );
			go.type = 'button';
			go.addEventListener( 'click', function () {
				showSame( true );
			} );
			sameLine.appendChild( go );
		}
		var SVGNS = 'http://www.w3.org/2000/svg';
		function svgEl( tag, attrs, parent ) {
			var n = document.createElementNS( SVGNS, tag ), k;
			for ( k in attrs ) {
				n.setAttribute( k, attrs[ k ] );
			}
			parent.appendChild( n );
			return n;
		}
		function tieChart( mine, shown, tip ) {
			var W = 760, H = 290, L = 40, R = 10, T = 10, B = 44;
			var lo = ties.vals[ 0 ], hi = ties.vals[ ties.vals.length - 1 ];
			var pw = W - L - R, ph = H - T - B, step = pw / ( ( hi - lo ) / 0.25 + 1 ), bw = Math.max( 2, step - 1.5 );
			var svg = document.createElementNS( SVGNS, 'svg' );
			svg.setAttribute( 'viewBox', '0 0 ' + W + ' ' + H );
			svg.setAttribute( 'role', 'img' );
			svg.setAttribute( 'aria-label', 'How many mutation and trait versions earn each multiplier' );
			function xOf( v ) {
				return L + ( v - lo ) / 0.25 * step;
			}
			function yOf( n ) {
				return T + ph - n / tieMax * ph;
			}
			var axis = svgEl( 'g', { 'class': 'ffb-same-axis' }, svg );
			[ 0, 100, 200, 300 ].forEach( function ( n ) {
				if ( n > tieMax ) {
					return;
				}
				svgEl( 'line', { x1: L, x2: W - R, y1: yOf( n ), y2: yOf( n ) }, axis );
				svgEl( 'text', { x: L - 6, y: yOf( n ) + 4, 'text-anchor': 'end' }, axis ).textContent = String( n );
			} );
			[ 1, 4, 7, 10, 13, 16, 19, 22 ].forEach( function ( v ) {
				if ( v > hi ) {
					return;
				}
				var x = xOf( v ) + bw / 2;
				svgEl( 'text', { x: x, y: T + ph + 16, 'text-anchor': 'middle' }, axis ).textContent = '×' + v;
				svgEl( 'text', { x: x, y: T + ph + 31, 'text-anchor': 'middle' }, axis ).textContent = tieRate( v ) === null ? '' : money( tieRate( v ) );
			} );
			ties.vals.forEach( function ( v ) {
				var list = ties.by[ v ], counts = [ 0, 0, 0, 0 ], y = T + ph;
				list.forEach( function ( c ) {
					counts[ Math.min( 3, c.t.length ) ]++;
				} );
				var g = svgEl( 'g', { 'class': 'ffb-same-bar', tabindex: '0', role: 'button',
					'aria-label': '×' + v.toFixed( 2 ) + ', ' + versions( list.length ) }, svg );
				counts.forEach( function ( n, k ) {
					if ( !n ) {
						return;
					}
					var h = n / tieMax * ph;
					y -= h;
					svgEl( 'rect', { x: xOf( v ), y: y, width: bw, height: h,
						'class': v === mine ? 'ffb-same-mine' : 'ffb-same-t' + k + ( v !== shown && tiePicked !== null ? ' ffb-same-dim' : '' ) }, g );
				} );
				if ( v === shown && v !== mine ) {
					svgEl( 'rect', { x: xOf( v ) - 1, y: yOf( list.length ) - 1, width: bw + 2, height: list.length / tieMax * ph + 2, 'class': 'ffb-same-ring' }, g );
				}
				svgEl( 'rect', { x: xOf( v ), y: T, width: Math.max( bw, step ), height: ph, 'class': 'ffb-same-hit' }, g );
				function pick() {
					tiePicked = v === mine ? null : v;
					tieAll = false;
					renderSame();
				}
				g.addEventListener( 'click', pick );
				g.addEventListener( 'keydown', function ( e ) {
					if ( e.key === 'Enter' || e.key === ' ' ) {
						e.preventDefault();
						pick();
					}
				} );
				g.addEventListener( 'mouseenter', function () {
					tip( v );
				} );
			} );
			svgEl( 'line', { x1: L, x2: W - R, y1: T + ph, y2: T + ph, 'class': 'ffb-same-base' }, svg );
			return svg;
		}
		function tieSet( c, mine ) {
			var span = el( 'span', 'ffb-same-set' + ( c.t.length ? '' : ' ffb-same-none' ) + ( mine ? ' ffb-same-yours' : '' ) );
			var names = c.t.map( function ( i ) {
				return data.traits[ i ].n;
			} );
			span.title = names.length ? names.join( ', ' ) : 'no traits';
			if ( !c.t.length ) {
				span.textContent = 'no traits';
			}
			names.forEach( function ( n ) {
				var url = cat.traitIcon[ n ];
				if ( url ) {
					var img = el( 'img', 'ffb-icon' );
					img.src = url;
					img.alt = n;
					img.referrerPolicy = 'no-referrer';
					img.setAttribute( 'referrerpolicy', 'no-referrer' );
					span.appendChild( img );
				} else {
					span.appendChild( el( 'span', 'ffb-same-tname', traitLabel( cat, n ) ) );
				}
			} );
			return span;
		}
		function renderSame() {
			if ( !sameView || sameView.hidden ) {
				return;
			}
			var mine = myTotal(), shown = tiePicked !== null ? tiePicked : mine, list = ties.by[ shown ];
			var mut = data.mutations[ state.mutation ];
			var mineKey = state.traits.slice().sort( function ( a, b ) {
				return a - b;
			} ).join();
			clear( sameView );
			var sum = el( 'p', 'ffb-same-sum' );
			var names = state.traits.map( function ( i ) {
				return data.traits[ i ].n;
			} );
			sum.appendChild( document.createTextNode( ( mut ? mut.n : 'Default' ) + ( names.length ? ' + ' + names.join( ', ' ) : '' ) + ' ' + data.name + ', ' +
				( state.evolution ? 'Evo ' + state.evolution + ', ' : '' ) + 'level ' + state.level + ': ' ) );
			sum.appendChild( el( 'b', null, '×' + mine.toFixed( 2 ) + ( tieRate( mine ) === null ? '' : ' · ' + tieRateText( mine ) ) ) );
			var n = ties.by[ mine ].length;
			sum.appendChild( document.createTextNode( n > 1 ? '. ' + ( n - 1 ).toLocaleString() + ' other ' + ( n === 2 ? 'version earns' : 'versions earn' ) + ' exactly the same.' : '. No other version earns exactly this.' ) );
			sameView.appendChild( sum );
			sameView.appendChild( el( 'p', 'ffb-same-note', 'Every brainrot has the same ' + Object.keys( ties.by ).reduce( function ( t, k ) {
				return t + ties.by[ k ].length;
			}, 0 ).toLocaleString() + ' mutation and trait versions. Each bar is one income; its height is how many versions earn it. The gold bar is the brainrot above, and the $/s under the bars are for it at its level and evolution.' ) );
			var legend = el( 'div', 'ffb-same-legend' );
			legend.setAttribute( 'aria-hidden', 'true' );
			[ [ 't0', 'no traits' ], [ 't1', '1 trait' ], [ 't2', '2 traits' ], [ 't3', '3 traits' ], [ 'mine', 'this one' ] ].forEach( function ( x ) {
				var s = el( 'span' );
				s.appendChild( el( 'i', 'ffb-same-key ffb-same-key-' + x[ 0 ] ) );
				s.appendChild( document.createTextNode( x[ 1 ] ) );
				legend.appendChild( s );
			} );
			sameView.appendChild( legend );
			var tipBox = el( 'p', 'ffb-same-tip' );
			tipBox.setAttribute( 'aria-live', 'polite' );
			function tip( v ) {
				clear( tipBox );
				tipBox.appendChild( el( 'strong', null, '×' + v.toFixed( 2 ) + ( tieRate( v ) === null ? '' : ' · ' + tieRateText( v ) ) ) );
				tipBox.appendChild( document.createTextNode( ' · ' + versions( ties.by[ v ].length ) + ( v === mine ? ' (this one)' : '' ) + '. Tap a bar to list them.' ) );
			}
			var chart = el( 'div', 'ffb-same-chart' );
			chart.appendChild( tieChart( mine, shown, tip ) );
			sameView.appendChild( chart );
			tip( shown );
			sameView.appendChild( tipBox );
			sameView.appendChild( el( 'h3', 'ffb-same-h', tiePicked !== null ?
				'Every version at ×' + shown.toFixed( 2 ) + ( tieRate( shown ) === null ? '' : ' (' + tieRateText( shown ) + ')' ) + ': ' + list.length :
				'Earns the same as this one: ' + versions( list.length ) ) );
			var groups = {}, order = [];
			list.forEach( function ( c ) {
				if ( !groups[ c.m ] ) {
					groups[ c.m ] = [];
					order.push( c.m );
				}
				groups[ c.m ].push( c );
			} );
			order.sort( function ( a, b ) {
				return data.mutations[ b ].m - data.mutations[ a ].m;
			} );
			var box = el( 'div', 'ffb-same-ties' );
			( tieAll ? order : order.slice( 0, 5 ) ).forEach( function ( mi ) {
				var row = el( 'div', 'ffb-same-row' );
				var head = el( 'div', 'ffb-same-mut' );
				var mn = data.mutations[ mi ].n;
				var mk = isDefault( mn ) ? null : mark( cat.mutationColor[ mn ] || null, cat.mutationIcon[ mn ] || null );
				if ( mk ) {
					head.appendChild( mk );
				}
				head.appendChild( el( 'span', null, mn ) );
				var sets = el( 'div', 'ffb-same-sets' );
				groups[ mi ].forEach( function ( c ) {
					sets.appendChild( tieSet( c, c.m === state.mutation && c.t.join() === mineKey ) );
				} );
				row.appendChild( head );
				row.appendChild( sets );
				box.appendChild( row );
			} );
			if ( order.length > 5 ) {
				var more = el( 'button', 'ffb-same-link', tieAll ? 'Show fewer' : 'Show all ' + order.length + ' mutations' );
				more.type = 'button';
				more.addEventListener( 'click', function () {
					tieAll = !tieAll;
					renderSame();
				} );
				box.appendChild( more );
			}
			sameView.appendChild( box );
			var links = el( 'div', 'ffb-same-links' );
			if ( tiePicked !== null ) {
				var back = el( 'button', 'ffb-same-link', 'Back to this brainrot' );
				back.type = 'button';
				back.addEventListener( 'click', function () {
					tiePicked = null;
					renderSame();
				} );
				links.appendChild( back );
			}
			var edit = el( 'button', 'ffb-same-link', 'Change mutation, traits, evolution or level' );
			edit.type = 'button';
			edit.addEventListener( 'click', function () {
				showSame( false );
			} );
			links.appendChild( edit );
			sameView.appendChild( links );
		}

		root.appendChild( sameLine );
		refresh();
		clear( container );
		container.appendChild( sw );
		container.appendChild( root );
		container.appendChild( sameView );
		showSame( false );
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
		cat.rarityColor2 = {};
		Object.keys( data.rarityColors2 || {} ).forEach( function ( r ) {
			var c = data.rarityColors2[ r ];
			if ( typeof c === 'string' && /^#[0-9a-f]{6}$/i.test( c ) ) {
				cat.rarityColor2[ r ] = c;
			}
		} );
		cat.spinRarity = {};
		( Array.isArray( data.spinRarities ) ? data.spinRarities : [] ).forEach( function ( r ) {
			cat.spinRarity[ r ] = true;
		} );
		cat.traitEmoji = data.traitEmoji && typeof data.traitEmoji === 'object' ? data.traitEmoji : {};
		cat.lookWords = data.lookWords && typeof data.lookWords === 'object' ? data.lookWords : {};
		cat.brainrotIcon = {};
		Object.keys( data.brainrotIcons || {} ).forEach( function ( b ) {
			var u = safeIconUrl( data.brainrotIcons[ b ] );
			if ( u ) {
				cat.brainrotIcon[ b ] = u;
			}
		} );
		cat.traitIcon = {};
		Object.keys( data.traitIcons || {} ).forEach( function ( t ) {
			var u = safeIconUrl( data.traitIcons[ t ] );
			if ( u ) {
				cat.traitIcon[ t ] = u;
			}
		} );
		// index = evolution stage (0, unevolved, has none)
		cat.evolutionIcon = ( Array.isArray( data.evolutionIcons ) ? data.evolutionIcons : [] ).map( safeIconUrl );
		cat.evolutionIcon.unshift( null );
		cat.mutationIcon = {};
		Object.keys( data.mutationIcons || {} ).forEach( function ( m ) {
			var u = safeIconUrl( data.mutationIcons[ m ] );
			if ( u ) {
				cat.mutationIcon[ m ] = u;
			}
		} );
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

	/**
	 * The first of a brainrot's look words (what it looks like: "shark",
	 * "three heads") that starts with a query of 3+ letters, or null.
	 */
	function lookMatch( cat, name, q ) {
		var words = cat.lookWords && has( cat.lookWords, name ) ? cat.lookWords[ name ] : null;
		var i;
		if ( q.length < 3 || !words || !words.length ) {
			return null;
		}
		for ( i = 0; i < words.length; i++ ) {
			if ( squash( words[ i ] ).indexOf( q ) === 0 ) {
				return String( words[ i ] );
			}
		}
		return null;
	}

	function searchBrainrots( cat, query ) {
		var q = squash( query || '' );
		var rarities = raritiesFor( cat, q );
		var out = [];
		brainrotOptions( cat ).forEach( function ( o ) {
			var b = cat.brainrots[ o.value ];
			var byName = q === '' || squash( o.value ).indexOf( q ) !== -1 ||
				rarities.indexOf( b.rarity ) !== -1;
			// a query that names a rarity ("god", "admin") is a rarity search,
			// not a look ("god" is not "godzilla")
			var look = byName || rarities.length ? null : lookMatch( cat, o.value, q );
			if ( !byName && look === null ) {
				return;
			}
			var m = {
				value: o.value,
				rarity: b.rarity,
				color: cat.rarityColor ? cat.rarityColor[ b.rarity ] || null : null,
				base: b.base === null || b.base === undefined ? null : money( b.base ) + '/s'
			};
			if ( look !== null ) {
				// found by what it looks like, not its name: say why it's listed
				m.look = look;
			}
			out.push( m );
		} );
		return out;
	}

	/** Mutations matching a query, best first: { value, right }. */
	function searchMutations( cat, query ) {
		var q = squash( query || '' );
		return mutationOptions( cat ).filter( function ( o ) {
			return q === '' || squash( o.value ).indexOf( q ) !== -1;
		} ).map( function ( o ) {
			return { value: o.value, color: cat.mutationColor[ o.value ] || null, icon: cat.mutationIcon[ o.value ] || null, right: plus( cat.mutations[ o.value ] ) };
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
				name: o.value === '' ? 'No trait' : traitPickLabel( cat, o.value ),
				icon: o.value === '' ? null : cat.traitIcon[ o.value ] || null,
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
				label: i === 0 ? 'Unevolved' : 'Evo ' + i + ' ' + times( cat.data.evolutions[ i ] ),
				icon: cat.evolutionIcon && cat.evolutionIcon[ i ] || null
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
		if ( sameSize( r ) ) {
			return { text: 'same', tone: 'flat' };
		}
		// any change shows its direction, however small (user, 2026-10-08)
		return { text: pctText( r ), tone: r > 1 ? 'good' : 'bad' };
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

	/**
	 * Inside the ±10% Fair band long-term, which way it still leans:
	 * [ title, sub, tone ] for a small gain, then for a small loss. An exact
	 * tie keeps the plain VERDICTS line.
	 */
	var LEANS = {
		'even|even': [
			[ 'Fair trade, slightly in your favor', 'Within 10% today and fully upgraded, and what you get still comes out a little ahead long-term.', 'good' ],
			[ 'Fair trade, slightly against you', 'Within 10% today and fully upgraded, but what you give comes out a little ahead long-term.', 'mixed' ]
		],
		'up|even': [
			[ 'Better today, slightly better long-term', 'You earn more right away, and you still come out a little ahead fully upgraded.', 'good' ],
			[ 'Better today, slightly worse long-term', 'You earn more right away, but fully upgraded what you give comes out a little ahead.', 'mixed' ]
		],
		'down|even': [
			[ 'Worse today, slightly better long-term', 'You earn less right away, but fully upgraded you come out a little ahead.', 'mixed' ],
			[ 'Worse today, slightly worse long-term', 'You earn less right away, and a little less fully upgraded too.', 'bad' ]
		]
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
		// every $ figure the result prints, so the page can show it in full
		var tips = {};
		function say( n ) {
			var t = money( n );
			if ( typeof n === 'number' && isFinite( n ) && n >= 1000 ) {
				tips[ t ] = t in tips && tips[ t ] !== n ? null : n;
			}
			return t;
		}

		[ give, get ].forEach( function ( side ) {
			[ side.now, side.max, side.ceil, side.value ].forEach( say );
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
			return r.name + ( isDefault( r.mutation ) ? '' : ' (' + r.mutation + ')' ) + ' · ' + say( it.now ) + '/s';
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
			if ( LEANS[ band( rNow ) + '|' + band( rCeil ) ] && !sameSize( rCeil ) ) {
				v = LEANS[ band( rNow ) + '|' + band( rCeil ) ][ rCeil > 1 ? 0 : 1 ];
			}
			if ( give.partial || get.partial ) {
				v = [ v[ 0 ], v[ 1 ] + ' Only brainrots with a measured income are counted.', v[ 2 ] ];
			}
		}
		verdict = { title: v[ 0 ], sub: v[ 1 ], tone: v[ 2 ], longTerm: null };
		// the long-term answer in one line, with its direction spelled out
		// even when the gap is small (user, 2026-10-08)
		if ( judge && !noTrade ) {
			if ( sameSize( rCeil ) ) {
				verdict.longTerm = { text: '= Long term: exactly even. Fully upgraded, both sides earn ' + say( get.ceil ) + '/s.', tone: 'flat' };
			} else if ( rCeil > 1 ) {
				verdict.longTerm = {
					text: '▲ Long term: in your favor. Fully upgraded, what you get earns ' +
						( rCeil >= 10 ? 'about ' + roughRatio( rCeil ) + '× as much as' : pctText( rCeil ).slice( 1 ) + ' more than' ) +
						' what you give (' + say( get.ceil ) + '/s instead of ' + say( give.ceil ) + '/s).' +
						( rCeil <= 1.1 ? ' A small gain, but a gain.' : '' ),
					tone: 'good'
				};
			} else {
				verdict.longTerm = {
					text: '▼ Long term: against you. Fully upgraded, what you get earns ' +
						( rCeil <= 0.1 ? 'under a tenth of' : pctText( rCeil ).slice( 1 ) + ' less than' ) +
						' what you give (' + say( get.ceil ) + '/s instead of ' + say( give.ceil ) + '/s).' +
						( rCeil >= 0.9 ? ' A small loss, but a loss.' : '' ),
					tone: 'bad'
				};
			}
		}

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
						' per second right away (' + say( get.now ) + '/s instead of ' + say( give.now ) + '/s).' );
				}
				if ( rNow < 0.9 ) {
					pass.push( 'You would earn ' + ( rNow <= 0.1 ? 'under a tenth' : pct( rNow ) + ' less' ) +
						' per second right away (' + say( get.now ) + '/s instead of ' + say( give.now ) + '/s).' );
				}
				// inside the Fair band, a small change still counts
				if ( rNow > 1 && rNow <= 1.1 && !sameSize( rNow ) ) {
					take.push( 'You would earn a little more per second right away: ' + pctText( rNow ) +
						' (' + say( get.now ) + '/s instead of ' + say( give.now ) + '/s).' );
				}
				if ( rNow < 1 && rNow >= 0.9 && !sameSize( rNow ) ) {
					pass.push( 'You would earn a little less per second right away: ' + pctText( rNow ) +
						' (' + say( get.now ) + '/s instead of ' + say( give.now ) + '/s).' );
				}
				if ( rCeil > 1 && rCeil <= 1.1 && !sameSize( rCeil ) ) {
					take.push( 'Fully upgraded, what you get earns a little more than what you give ever can: ' + pctText( rCeil ) +
						' (' + say( get.ceil ) + '/s instead of ' + say( give.ceil ) + '/s).' );
				}
				if ( rCeil < 1 && rCeil >= 0.9 && !sameSize( rCeil ) ) {
					pass.push( 'Fully upgraded, what you give earns a little more than what you get ever can: ' + pctText( 1 / rCeil ) +
						' (' + say( give.ceil ) + '/s instead of ' + say( get.ceil ) + '/s).' );
				}
				if ( rCeil > 1.1 ) {
					take.push( 'Fully upgraded, what you get reaches ' + say( get.ceil ) + '/s: ' +
						( rCeil >= 10 ? 'about ' + roughRatio( rCeil ) + '× as much as' : pct( rCeil ) + ' more than' ) + ' what you give ever can.' );
				}
				if ( rCeil < 0.9 ) {
					pass.push( 'Fully upgraded, what you give reaches ' + say( give.ceil ) + '/s, ' +
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
			// base space is limited, so the counts matter by how the
			// brainrots compare one by one, $/s today (user, 2026-10-09):
			// fewer for more is a pro when what you get beats your best
			// one (a great one when it beats them all put together) and a con
			// when it doesn't; more for fewer is a con when every one you
			// get is worse than your best one, else only good to know
			var extra = Math.abs( giveRows.length - getRows.length );
			var slotsText = plural( extra, 'base slot', 'base slots' );
			var bestName = function ( it ) {
				return ( isDefault( it.row.mutation ) ? '' : it.row.mutation + ' ' ) + it.row.name;
			};
			if ( giveRows.length > getRows.length && judge && !give.partial && !get.partial ) {
				if ( get.best.now > give.now ) {
					take.push( ( getRows.length === 1 ? bestName( get.best ) + ' alone' : 'Your strongest new one, ' + bestName( get.best ) + ', alone' ) +
						' earns more than all ' + giveRows.length + ' you give put together (' + say( get.best.now ) + '/s against ' +
						say( give.now ) + '/s), and it frees ' + slotsText + '. A great trade when space is tight.' );
				} else if ( get.best.now > give.best.now ) {
					take.push( bestName( get.best ) + ' earns more than any one brainrot you give (' + say( get.best.now ) + '/s against ' +
						bestName( give.best ) + '’s ' + say( give.best.now ) + '/s), and it frees ' + slotsText + '.' );
				} else {
					pass.push( 'You give ' + giveRows.length + ' brainrots for ' + getRows.length + ', but nothing you get earns more than your ' +
						bestName( give.best ) + ' alone (' + say( give.best.now ) + '/s). Fewer brainrots, and none of them better.' );
				}
			}
			if ( getRows.length > giveRows.length && judge && !give.partial && !get.partial ) {
				if ( get.best.now < give.best.now ) {
					pass.push( 'You get ' + getRows.length + ' brainrots for ' + giveRows.length + ', and each earns less than ' +
						( giveRows.length === 1 ? '' : 'your best one, ' ) + bestName( give.best ) + ' (' + say( give.best.now ) +
						'/s): they’d fill ' + plural( getRows.length, 'base slot', 'base slots' ) + ' with weaker brainrots.' );
				} else {
					notes.push( 'Takes ' + plural( extra, 'more base slot', 'more base slots' ) + ': you get ' +
						getRows.length + ' brainrots for ' + giveRows.length + '. That helps if they out-earn what they push out of your base, and hurts if your base is already full of stronger ones.' );
				}
			}
			// with My base saved: what the trade does to the brainrots that
			// actually earn, your strongest `slots` (as Suggest an offer counts)
			if ( judge && trade.slots && trade.owned && trade.owned.length ) {
				var base = baseAfterTrade( cat, trade.owned, giveRows, getRows, trade.slots );
				if ( !base ) {
					notes.push( 'Something you give isn’t in My base, so what this trade does to your strongest ' + trade.slots +
						' can’t be worked out. Add it to My base to see.' );
				} else if ( base.before > 0 && sameSize( base.after / base.before ) ) {
					notes.push( 'Your base: your strongest ' + base.slots + ' earn the same after this trade, ' + say( base.after ) + '/s.' );
				} else if ( base.before > 0 ) {
					( base.after > base.before ? take : pass ).push( 'Your base: your strongest ' + base.slots + ' earn ' + say( base.before ) +
						'/s now and ' + say( base.after ) + '/s after this trade (' + pctText( base.after / base.before ) + ').' );
				}
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
					text: 'Your income goes from ' + say( mine ) + '/s to ' + say( after ) + '/s right away: ' +
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
			tips: tips,
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
	// traits renamed after lists and links were saved with the old name:
	// Snow Flake became Snow on 2026-09-25 (the name the game uses)
	var RENAMED_TRAITS = { 'Snow Flake': 'Snow' };
	// brainrots renamed the same way: Los Tralalalitos became Los Tralaleritos
	// on 2026-10-20 (the Index's spelling)
	var RENAMED_BRAINROTS = { 'Los Tralalalitos': 'Los Tralaleritos' };
	var MAX_NAME_CHARS = 60;
	var COLLECTION_OPTION_KEY = 'userjs-ffb-collection';
	var PROFILE_OPTION_KEY = 'userjs-ffb-profile';
	var COLLECTION_BROWSER_KEY = 'ffb-collection';
	var BROWSER_KEY = COLLECTION_BROWSER_KEY;
	var OFFERED_KEY = 'ffb-collection-offered';

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
				].concat( r.inBase ? [ 1 ] : [] );
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
			name: has( RENAMED_BRAINROTS, item[ 0 ].trim() ) ? RENAMED_BRAINROTS[ item[ 0 ].trim() ] : item[ 0 ].trim(),
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
			// a list or link saved before a trait was renamed still loads
			if ( typeof t === 'string' && has( RENAMED_TRAITS, t ) ) {
				t = RENAMED_TRAITS[ t ];
			}
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
		if ( item[ 5 ] === 1 || item[ 5 ] === true ) {
			row.inBase = true;
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
				strength: s.measured ? rowStrength( cat, r ) : -1,
				rarity: entry ? rarityRank[ entry.rarity ] : cat.groups.length,
				name: r.name.toLowerCase()
			};
		} );
		keyed.sort( function ( a, b ) {
			var d = 0;
			if ( key === 'ceiling' ) {
				d = b.ceil - a.ceil;
			} else if ( key === 'strength' ) {
				d = b.strength - a.strength;
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

	/**
	 * A brainrot's strength: what it earns per second at level 1, with its
	 * mutation, traits and evolution (all permanent). It doesn't depend on
	 * level, so it's the fair way to compare brainrots; null if unmeasured.
	 */
	function rowStrength( cat, row ) {
		var s = collectionStats( cat, row );
		var entry = cat.brainrots[ row.name ];
		return s.measured ? entry.base * s.tot : null;
	}

	/**
	 * The strength upgrade prices follow: like rowStrength, but evolution
	 * counts as the SQUARE ROOT of its multiplier (2026-10-05: all 21 level-1
	 * prices of the user's Tim Cheese at every evolution stage fit this).
	 */
	function priceStrength( cat, row ) {
		var s = rowStrength( cat, row );
		var evo = row.evolution > 0 ? cat.data.evolutions[ row.evolution ] : 1;
		return s === null ? null : s / Math.sqrt( evo );
	}

	/** Base slots, as the collection page remembers them. */
	var BASE_SLOTS_KEY = 'ffb-base-slots';
	var BASE_SLOTS_DEFAULT = 24;
	var BASE_SLOTS_MAX = 60;

	/**
	 * Which saved brainrots belong in a base of `slots`: the strongest ones.
	 * Returns { ranked, picks (Set-like map by id), weakest, spare, marked,
	 * moveIn, swapOut, need(level) }. moveIn and swapOut are only filled when
	 * some brainrots are ticked "in my base". need(level) is the card $/s a
	 * brainrot must beat at that level to out-earn the weakest pick.
	 */
	function planBase( cat, rows, slots ) {
		var ranked = rows.filter( function ( r ) {
			return rowStrength( cat, r ) !== null;
		} ).map( function ( r, i ) {
			return { row: r, at: i, strength: rowStrength( cat, r ) };
		} );
		ranked.sort( function ( a, b ) {
			return b.strength - a.strength || a.at - b.at;
		} );
		var picks = ranked.slice( 0, slots );
		var isPick = function ( r ) {
			return picks.some( function ( p ) {
				return p.row === r;
			} );
		};
		var marked = rows.filter( function ( r ) {
			return r.inBase;
		} );
		var over = ranked.length > slots;
		var weakest = over ? picks[ picks.length - 1 ] : null;
		return {
			ranked: ranked,
			over: over,
			isPick: isPick,
			weakest: weakest,
			spare: Math.max( 0, slots - ranked.length ),
			marked: marked.length,
			moveIn: marked.length ? picks.filter( function ( p ) {
				return !p.row.inBase;
			} ).map( function ( p ) {
				return p.row;
			} ) : [],
			swapOut: marked.filter( function ( r ) {
				return !isPick( r );
			} ),
			need: function ( level ) {
				return weakest ? weakest.strength * growthFactor( level, cat.data ) : null;
			}
		};
	}

	/* ---- My base: the profile and the plans built from it ---------------- */

	var PROFILE_KEY = 'ffb-profile';
	var REBIRTH_MAX = 45;
	// a server holds 4 players, so up to 3 friends (user, 2026-10-12)
	var FRIENDS_MAX = 3;
	// play sessions the Your base card can count earnings over; brainrots
	// only earn while you play (user, 2026-10-19)
	var PLAY_HOURS = [ 0.25, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12 ];

	/** A stored profile, cleaned: { slots, rebirth, indexes: [names], vip, friends, hours, price }. */
	function readProfile( cat, text ) {
		var p = {};
		var out = { slots: BASE_SLOTS_DEFAULT, rebirth: 0, indexes: [], vip: false, friends: 0, hours: 1, price: null };
		try {
			p = JSON.parse( String( text || '' ) ) || {};
		} catch ( err ) {
			p = {};
		}
		if ( wholeNumber( p.slots, 1, BASE_SLOTS_MAX ) ) {
			out.slots = p.slots;
		}
		if ( wholeNumber( p.rebirth, 0, REBIRTH_MAX ) ) {
			out.rebirth = p.rebirth;
		}
		if ( Array.isArray( p.indexes ) ) {
			out.indexes = p.indexes.filter( function ( m, i ) {
				return typeof m === 'string' && has( cat.mutations, m ) && p.indexes.indexOf( m ) === i;
			} );
		}
		out.vip = p.vip === true;
		if ( wholeNumber( p.friends, 0, FRIENDS_MAX ) ) {
			out.friends = p.friends;
		}
		if ( PLAY_HOURS.indexOf( p.hours ) !== -1 ) {
			out.hours = p.hours;
		}
		if ( p.price && typeof p.price === 'object' && typeof p.price.cost === 'number' && p.price.cost > 0 &&
			typeof p.price.strength === 'number' && p.price.strength > 0 && wholeNumber( p.price.level, 1, cat.data.maxLevel ) ) {
			out.price = { cost: p.price.cost, strength: p.price.strength, level: p.price.level,
				name: typeof p.price.name === 'string' ? p.price.name.slice( 0, MAX_NAME_CHARS ) : '' };
		}
		return out;
	}

	/**
	 * Your base's cash multiplier: rebirths 1-35 add +0.5x each and 36-45
	 * +0.25x each (rebirth 45 is 21x), each finished mutation index +0.5x and
	 * each friend in your server +0.5x (user, 2026-10-12). VIP doubles the
	 * total (user, 2026-10-19: rebirth 45 + 4 indexes + VIP shows x46 on the
	 * base). ASSUMED: friends are inside what VIP doubles.
	 */
	function baseMultiplier( profile ) {
		var r = profile.rebirth;
		var fromRebirth = r <= 35 ? 1 + 0.5 * r : 18.5 + 0.25 * ( r - 35 );
		return ( fromRebirth + 0.5 * profile.indexes.length + 0.5 * ( profile.friends || 0 ) ) * ( profile.vip ? 2 : 1 );
	}

	/** "rebirth ×21 + indexes +2x + friends +1x, then ×2 VIP" */
	function multiplierParts( profile ) {
		var bits = [ 'rebirth ×' + rebirthMultiplier( profile.rebirth ) ];
		if ( profile.indexes.length ) {
			bits.push( 'indexes +' + 0.5 * profile.indexes.length + 'x' );
		}
		if ( profile.friends ) {
			bits.push( 'friends +' + 0.5 * profile.friends + 'x' );
		}
		return bits.join( ' + ' ) + ( profile.vip ? ', then ×2 VIP' : '' );
	}

	/** "15 min", "1 hour", "3 hours" */
	function hoursLabel( h ) {
		return h < 1 ? Math.round( h * 60 ) + ' min' : h + ( h === 1 ? ' hour' : ' hours' );
	}

	function rebirthMultiplier( r ) {
		return r <= 35 ? 1 + 0.5 * r : 18.5 + 0.25 * ( r - 35 );
	}

	/**
	 * The price of the +1 upgrade bought AT `level`, per unit of strength
	 * (base x total): costGrowth per level up to midCostFrom - 1, then
	 * midCostGrowth per level to newCostFrom - 1, then the cheaper curve from level 151 (newCostStart x newCostGrowth per level,
	 * and from lateCostFrom the level before x lateCostStep, then
	 * lateCostGrowth per level). Same as Module:Brainrot's p._price.
	 */
	function priceCurve( d, level ) {
		var from = d.newCostFrom || d.maxLevel + 1;
		var late = d.lateCostFrom || d.maxLevel + 1;
		var mid = d.midCostFrom || from;
		var g = d.costGrowth;
		if ( level < mid ) {
			return Math.pow( g, level - 1 );
		}
		if ( level < from ) {
			// x1.5 to level 90, then about x1.33 (an interim fit, 2026-10-07)
			return Math.pow( g, mid - 2 ) * Math.pow( d.midCostGrowth, level - mid + 1 );
		}
		if ( level < late ) {
			return d.newCostStart * Math.pow( d.newCostGrowth, level - from );
		}
		return d.newCostStart * Math.pow( d.newCostGrowth, late - 1 - from ) *
			d.lateCostStep * Math.pow( d.lateCostGrowth, level - late );
	}

	/**
	 * What the upgrades still cost in cash, for the value calculator (user,
	 * 2026-10-08): toMax = from `level` to maxLevel at the current
	 * evolution; toFull = that, then a climb from level 1 for every
	 * evolution left (evolving is free but resets to level 1). strength is
	 * base x (mutation + traits), unevolved; prices follow the square root
	 * of the evolution multiplier (priceStrength). evoMult( e ) is stage e's
	 * multiplier (1 for 0). Null when the price curve doesn't reach maxLevel.
	 */
	function climbCost( d, strength, evolution, level, evoMult ) {
		var full, e;
		if ( typeof strength !== 'number' || !isFinite( strength ) || ( d.costKnownTo || d.maxLevel ) < d.maxLevel - 1 ) {
			return null;
		}
		function climb( stage, from ) {
			var sum = 0;
			var L;
			for ( L = from; L < d.maxLevel; L++ ) {
				sum += priceCurve( d, L );
			}
			return strength * Math.sqrt( evoMult( stage ) ) * sum;
		}
		full = climb( evolution, level );
		var toMax = full;
		for ( e = evolution + 1; e <= d.maxEvolution; e++ ) {
			full += climb( e, 1 );
		}
		// the next step: this climb, or once at maxLevel the next evolution's
		// whole climb (user, 2026-10-08); nothing after the last one
		var next = level < d.maxLevel || evolution >= d.maxEvolution ?
			{ evolution: evolution, cost: toMax } : { evolution: evolution + 1, cost: climb( evolution + 1, 1 ) };
		return { toMax: toMax, toFull: full, climbsLeft: d.maxEvolution - evolution, next: next };
	}

	/**
	 * What getting from (evolution, level) to (toEvo, toLevel) costs, for the
	 * value calculator's "Cost to reach" (user, 2026-10-09): the rest of this
	 * climb, a full climb at every evolution in between, then level 1 to
	 * toLevel at toEvo; each climb priced as climbCost prices it. Returns
	 * { cost, evolves, between: [ stages ], finish } or { there } / { behind }
	 * for a target already reached; null when prices aren't known.
	 */
	function targetCost( d, strength, evolution, level, toEvo, toLevel, evoMult ) {
		var cost, between, e;
		if ( typeof strength !== 'number' || !isFinite( strength ) || ( d.costKnownTo || d.maxLevel ) < d.maxLevel - 1 ) {
			return null;
		}
		if ( toEvo === evolution && toLevel === level ) {
			return { there: true };
		}
		if ( toEvo < evolution || ( toEvo === evolution && toLevel < level ) ) {
			return { behind: true };
		}
		function climb( stage, from, to ) {
			var sum = 0;
			var L;
			for ( L = from; L < to; L++ ) {
				sum += priceCurve( d, L );
			}
			return strength * Math.sqrt( evoMult( stage ) ) * sum;
		}
		if ( toEvo === evolution ) {
			return { cost: climb( evolution, level, toLevel ), evolves: 0, between: [], finish: false };
		}
		cost = climb( evolution, level, d.maxLevel );
		between = [];
		for ( e = evolution + 1; e < toEvo; e++ ) {
			cost += climb( e, 1, d.maxLevel );
			between.push( e );
		}
		cost += climb( toEvo, 1, toLevel );
		return { cost: cost, evolves: toEvo - evolution, between: between, finish: level < d.maxLevel };
	}

	/**
	 * The price of the +1 upgrade bought AT `level`, for a brainrot of this
	 * strength, or null when it isn't known: the curve is modelled to
	 * costKnownTo; above that (an older payload) only a price the player saw
	 * in game (profile.price) lets us estimate it.
	 */
	function upgradePrice( cat, strength, level, profile ) {
		var d = cat.data;
		var known = d.costKnownTo || d.maxLevel;
		var raw = strength * priceCurve( d, level );
		if ( level <= known ) {
			return raw;
		}
		if ( profile && profile.price && profile.price.level > known ) {
			return raw * profile.price.cost / ( profile.price.strength * priceCurve( d, profile.price.level ) );
		}
		return null;
	}

	/**
	 * The upgrade plan (the Upgrading guide): the brainrots worth keeping,
	 * lowest level first, each up to `goal`. Each step says what reaching
	 * the goal costs where prices are known, and roughly how long that takes
	 * at the base's income times its multiplier.
	 */
	function upgradePlan( cat, rows, profile, goal ) {
		var plan = planBase( cat, rows, profile.slots );
		var keepers = plan.ranked.slice( 0, profile.slots );
		var marked = rows.filter( function ( r ) {
			return r.inBase && rowStrength( cat, r ) !== null;
		} );
		var earning = marked.length ? marked : keepers.map( function ( k ) {
			return k.row;
		} );
		var income = earning.reduce( function ( sum, r ) {
			return sum + collectionStats( cat, r ).now;
		}, 0 );
		var perSecond = income * baseMultiplier( profile );
		var steps = keepers.filter( function ( k ) {
			return k.row.level < goal;
		} ).map( function ( k ) {
			var known = 0;
			var unknown = 0;
			var L, price;
			for ( L = k.row.level; L < goal; L++ ) {
				price = upgradePrice( cat, priceStrength( cat, k.row ), L, profile );
				if ( price === null ) {
					unknown++;
				} else {
					known += price;
				}
			}
			return {
				row: k.row,
				strength: k.strength,
				from: k.row.level,
				to: goal,
				cost: known,
				unknownLevels: unknown,
				seconds: known > 0 && perSecond > 0 ? known / perSecond : null
			};
		} );
		steps.sort( function ( a, b ) {
			return a.from - b.from || b.strength - a.strength;
		} );
		return { steps: steps, income: income, perSecond: perSecond, multiplier: baseMultiplier( profile ) };
	}

	/* ---- The best-value upgrade plan (user, 2026-10-20) -----------------
	 * Every buy in the order it pays for itself fastest: below level 90
	 * that's the lowest level, but levels 151-174 (cheaper prices) and
	 * evolved brainrots (prices follow only the square root of the
	 * evolution) can jump the queue, and an evolution is one buy among the
	 * rest: the whole climb back to the top level, which only pays at the
	 * end (see the Upgrading guide and wiki/analysis/). */
	var PLAN_SLOW_HOURS = 100;

	/** "under a minute", "12 min", "4.5 h", "77 h", "1,200 h" of play */
	function playTime( sec ) {
		if ( sec === null || sec === undefined || !isFinite( sec ) ) {
			return '—';
		}
		if ( sec < 60 ) {
			return 'under a minute';
		}
		if ( sec < 3600 ) {
			return Math.round( sec / 60 ) + ' min';
		}
		var h = sec / 3600;
		return ( h < 10 ? h.toFixed( 1 ) : Math.round( h ).toLocaleString( 'en-US' ) ) + ' h';
	}

	/** A saved row at another evolution and level. */
	function rowAt( r, evolution, level ) {
		return { name: r.name, mutation: r.mutation, traits: r.traits, evolution: evolution, level: level, inBase: r.inBase };
	}

	/**
	 * The plan's maths for a profile, cached: income( row, evo, level ) in
	 * $/s with the base multiplier, price( row, evo, level ) of the upgrade
	 * bought at that level, and climb( row, evo ), level 1 back to the top.
	 */
	function planMaths( cat, profile, mult ) {
		var d = cat.data;
		var sCache = {};
		var cCache = {};
		function key( r, e ) {
			return r.name + '|' + r.mutation + '|' + ( r.traits || [] ).join( ',' ) + '|' + e;
		}
		function strength( r, e ) {
			var k = key( r, e );
			if ( !has( sCache, k ) ) {
				sCache[ k ] = rowStrength( cat, rowAt( r, e, 1 ) );
			}
			return sCache[ k ];
		}
		var m = {
			income: function ( r, e, L ) {
				var s = strength( r, e );
				return s === null ? null : s * growthFactor( L, d ) * mult;
			},
			price: function ( r, e, L ) {
				var ps = priceStrength( cat, rowAt( r, e, L ) );
				return ps === null ? null : upgradePrice( cat, ps, L, profile );
			},
			climb: function ( r, e ) {
				var k = key( r, e );
				var sum = 0;
				var L, p;
				if ( !has( cCache, k ) ) {
					for ( L = 1; L < d.maxLevel && sum !== null; L++ ) {
						p = m.price( r, e, L );
						sum = p === null ? null : sum + p;
					}
					cCache[ k ] = sum;
				}
				return cCache[ k ];
			}
		};
		return m;
	}

	/**
	 * One brainrot's next buy, or null: a level up to the goal, or at the
	 * top level its next evolution. { kind: 'lv'|'evo', it, evo, from, cost,
	 * gain ($/s added), pay (seconds of play it takes to pay for itself) }
	 */
	function planOption( cat, m, it, goal ) {
		var d = cat.data;
		var cost, gain;
		if ( it.level < Math.min( goal, d.maxLevel ) ) {
			cost = m.price( it.row, it.evo, it.level );
			gain = m.income( it.row, it.evo, it.level + 1 ) - m.income( it.row, it.evo, it.level );
			return cost === null || !( gain > 0 ) ? null :
				{ kind: 'lv', it: it, evo: it.evo, from: it.level, cost: cost, gain: gain, pay: cost / gain };
		}
		if ( it.level >= d.maxLevel && it.evo < d.maxEvolution ) {
			cost = m.climb( it.row, it.evo + 1 );
			gain = m.income( it.row, it.evo + 1, d.maxLevel ) - m.income( it.row, it.evo, d.maxLevel );
			return cost === null || !( gain > 0 ) ? null :
				{ kind: 'evo', it: it, evo: it.evo, from: it.level, cost: cost, gain: gain, pay: cost / gain };
		}
		return null;
	}

	/** The cheapest-to-pay-back buy across items, or null. */
	function planBest( cat, m, items, goal ) {
		var best = null;
		items.forEach( function ( it ) {
			var o = planOption( cat, m, it, goal );
			if ( o && ( !best || o.pay < best.pay ) ) {
				best = o;
			}
		} );
		return best;
	}

	function planItems( keepers ) {
		return keepers.map( function ( r ) {
			return { row: r, evo: r.evolution, level: r.level };
		} );
	}

	function planBuy( o ) {
		if ( o.kind === 'lv' ) {
			o.it.level++;
		} else {
			o.it.evo++;
		}
	}

	/**
	 * The plan as steps: buys grouped until the payback doubles (an
	 * evolution is a step of its own), each brainrot's levels in a step
	 * merged into one part, and back-to-back steps on the same single
	 * brainrot merged. Levelling evenly shows up as one step bringing
	 * several brainrots up together. Each part says whether it jumps ahead
	 * of a lower-level brainrot.
	 */
	function planSteps( cat, m, keepers, goal, limit ) {
		var items = planItems( keepers );
		var steps = [];
		var buys = 0;
		var cur = null;
		var base = null;
		function lowerThan( it ) {
			return items.some( function ( o ) {
				return o !== it && o.level < it.level && o.level < goal;
			} );
		}
		while ( buys < limit ) {
			var best = planBest( cat, m, items, goal );
			if ( !best ) {
				break;
			}
			buys++;
			if ( base === null ) {
				base = best.pay;
			}
			var band = Math.max( 0, Math.floor( Math.log( best.pay / base ) / Math.LN2 ) );
			if ( best.kind === 'evo' || !cur || cur.evolve || band > cur.band ) {
				cur = { band: Math.max( band, cur && !cur.evolve ? cur.band : 0 ), evolve: best.kind === 'evo', parts: [],
					cost: 0, gain: 0, firstPay: best.pay, lastPay: best.pay };
				steps.push( cur );
			}
			var part = null;
			cur.parts.forEach( function ( x ) {
				if ( x.it === best.it ) {
					part = x;
				}
			} );
			if ( !part ) {
				part = { it: best.it, row: best.it.row, evo: best.evo, from: best.from, to: best.from, cost: 0, gain: 0,
					lastPay: best.pay, jumps: lowerThan( best.it ) };
				cur.parts.push( part );
			}
			part.cost += best.cost;
			part.gain += best.gain;
			part.lastPay = Math.max( part.lastPay, best.pay );
			cur.cost += best.cost;
			cur.gain += best.gain;
			cur.firstPay = Math.min( cur.firstPay, best.pay );
			cur.lastPay = Math.max( cur.lastPay, best.pay );
			planBuy( best );
			if ( best.kind === 'lv' ) {
				part.to = best.it.level;
			}
		}
		var merged = [];
		steps.forEach( function ( st ) {
			var prev = merged[ merged.length - 1 ];
			if ( prev && !prev.evolve && !st.evolve && prev.parts.length === 1 && st.parts.length === 1 &&
				prev.parts[ 0 ].it === st.parts[ 0 ].it ) {
				var a = prev.parts[ 0 ];
				var b = st.parts[ 0 ];
				a.to = b.to;
				a.cost += b.cost;
				a.gain += b.gain;
				a.lastPay = Math.max( a.lastPay, b.lastPay );
				prev.cost += st.cost;
				prev.gain += st.gain;
				prev.lastPay = Math.max( prev.lastPay, st.lastPay );
				return;
			}
			merged.push( st );
		} );
		return merged;
	}

	/**
	 * Spend `cash` in the plan's order, stopping at the first buy it can't
	 * afford: an evolution waits until the whole climb back is affordable,
	 * so a brainrot is never left earning less (user, 2026-10-20).
	 * { items: [ { row, evo, level } ], spent, left, stop }
	 */
	function spendPlan( cat, m, keepers, goal, cash ) {
		var items = planItems( keepers );
		var left = cash;
		var spent = 0;
		var stop = null;
		var guard = 0;
		while ( guard++ < 50000 ) {
			var best = planBest( cat, m, items, goal );
			if ( !best ) {
				break;
			}
			if ( best.cost > left ) {
				stop = best;
				break;
			}
			left -= best.cost;
			spent += best.cost;
			planBuy( best );
		}
		return { items: items, spent: spent, left: left, stop: stop };
	}

	/**
	 * The value calculator's "What can my cash do?": buy +1 levels with
	 * `cash` until the next is too dear. price( evo, L ) is the upgrade
	 * bought AT level L. With evolve, a brainrot at the top level evolves
	 * (free, back to level 1) and keeps climbing.
	 */
	function cashClimb( price, maxLevel, maxEvo, evo, level, cash, evolve ) {
		var spent = 0;
		var p;
		while ( true ) {
			if ( level >= maxLevel ) {
				if ( evolve && evo < maxEvo ) {
					evo++;
					level = 1;
					continue;
				}
				return { evo: evo, level: level, spent: spent, left: cash, next: null };
			}
			p = price( evo, level );
			if ( p === null || !isFinite( p ) || p > cash ) {
				return { evo: evo, level: level, spent: spent, left: cash, next: p };
			}
			cash -= p;
			spent += p;
			level++;
		}
	}

	/**
	 * A pair from the list that shows rarity isn't everything: a rarer
	 * brainrot that earns less than a less rare one, the biggest gap first.
	 * { rare, common, times } or null.
	 */
	function rarityLesson( cat, rows ) {
		var rank = {};
		var best = null;
		cat.groups.forEach( function ( g, i ) {
			rank[ g.label ] = i;
		} );
		var list = rows.filter( function ( r ) {
			return rowStrength( cat, r ) !== null;
		} );
		list.forEach( function ( a ) {
			list.forEach( function ( b ) {
				var ra = rank[ cat.brainrots[ a.name ].rarity ];
				var rb = rank[ cat.brainrots[ b.name ].rarity ];
				var x = rowStrength( cat, b ) / rowStrength( cat, a );
				if ( ra < rb && x >= 2 && ( !best || x > best.times ) ) {
					best = { rare: a, common: b, times: x };
				}
			} );
		} );
		return best;
	}

	/** "37 s", "12 min", "5.1 h", "3 days", "2 years" */
	function roughTime( sec ) {
		if ( sec === null || sec === undefined ) {
			return '';
		}
		if ( sec < 60 ) {
			return Math.max( 1, Math.round( sec ) ) + ' s';
		}
		if ( sec < 3600 ) {
			return Math.round( sec / 60 ) + ' min';
		}
		if ( sec < 172800 ) {
			return ( sec / 3600 ).toFixed( 1 ) + ' h';
		}
		if ( sec < 3 * 365 * 86400 ) {
			return Math.round( sec / 86400 ) + ' days';
		}
		return Math.round( sec / ( 365 * 86400 ) ) + ' years';
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
	 *   kind: 'account' | 'browser' | 'signin' (the wiki, signed out) | 'none'
	 *   load(): the stored text, or null
	 *   save( text, done ): done( null ) or done( 'what went wrong' )
	 */
	function chooseStore( env, which ) {
		var m = env.mw;
		var storage = workingStorage( env.storage );
		// My base's profile (slots, rebirth, indexes) is kept the same way as
		// the list, under its own key
		var optionKey = which === 'profile' ? PROFILE_OPTION_KEY : COLLECTION_OPTION_KEY;
		var browserKey = which === 'profile' ? PROFILE_KEY : COLLECTION_BROWSER_KEY;
		// on the wiki a signed-out reader saves nothing (decided 2026-10-06:
		// a Fandom account or nothing); the page offers to sign in instead
		if ( m && m.user && m.user.isAnon && m.user.isAnon() ) {
			return {
				kind: 'signin',
				load: function () {
					return null;
				},
				save: function ( text, done ) {
					done( 'sign in to save' );
				}
			};
		}
		if ( m && m.user && m.user.isAnon && !m.user.isAnon() && m.user.options && m.loader && m.Api ) {
			return {
				kind: 'account',
				load: function () {
					var v = m.user.options.get( optionKey );
					return typeof v === 'string' ? v : null;
				},
				save: function ( text, done ) {
					m.loader.using( 'mediawiki.api' ).then( function () {
						return new m.Api().saveOption( optionKey, text );
					} ).then( function () {
						// keep this page's copy in step with the account
						m.user.options.set( optionKey, text );
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
					return readStorage( storage, browserKey );
				},
				save: function ( text, done ) {
					done( writeStorage( storage, browserKey, text ) ? null : 'this browser would not store it' );
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
		var standalone = typeof window !== 'undefined' && !!( window.ffbStandalone && typeof window.ffbStandalone === 'object' );
		var env = { mw: typeof mw !== 'undefined' ? mw : null, storage: null,
			// the phone site (it has its own page around the calculators)
			planner: standalone && !!window.ffbStandalone.planner,
			// the wiki: each calculator in its card, laid out for wide screens
			wiki: !standalone && typeof mw !== 'undefined' && !!mw };
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

	/**
	 * A picture on this wiki from where it sits under images/ ("e/e9/Name.png",
	 * see generate_modules.py), 40px wide; null for anything else. (The ?nr=4
	 * keeps browsers off old copies they may have cached for a year: the
	 * placeholder from before the no-referrer fix, the black-backed trait and
	 * mutation icons replaced on Oct 4-6, 2026, and the small trait icons
	 * replaced on Oct 15, and the mutation icons replaced with the Index's on
	 * Oct 20. Bump it whenever pictures go up under the same names.)
	 */
	function safeIconUrl( path ) {
		return typeof path === 'string' && /^[0-9a-f]\/[0-9a-f]{2}\/[A-Za-z0-9_&.,()'+-]+\.png$/.test( path ) ?
			'https://static.wikia.nocookie.net/fortnite-creator-islands/images/' + path + '/revision/latest/scale-to-width-down/40?nr=4' : null;
	}

	/**
	 * A mutation's mark: its game icon when there is one, else the colour
	 * square. When the icon can't load (offline, say) the square takes its
	 * place.
	 */
	function mark( color, icon ) {
		var img;
		if ( !icon ) {
			return color ? swatch( color ) : null;
		}
		img = el( 'img', 'ffb-icon' );
		img.setAttribute( 'alt', '' );
		img.setAttribute( 'aria-hidden', 'true' );
		img.setAttribute( 'width', '18' );
		img.setAttribute( 'height', '18' );
		img.setAttribute( 'style', 'width: 18px; height: 18px; object-fit: contain; vertical-align: middle; margin-right: 6px; flex-shrink: 0;' );
		function fallBack() {
			if ( img.parentNode ) {
				if ( color ) {
					img.parentNode.replaceChild( swatch( color ), img );
				} else {
					img.parentNode.removeChild( img );
				}
			}
		}
		img.onerror = fallBack;
		// Fandom swaps pictures embedded on other sites (the phone site) for
		// a 300x171 "image" placeholder unless no referrer is sent; if that
		// placeholder turns up anyway, show the square instead
		img.onload = function () {
			if ( img.naturalWidth > 64 ) {
				fallBack();
			}
		};
		img.referrerPolicy = 'no-referrer';
		img.setAttribute( 'referrerpolicy', 'no-referrer' );
		img.src = icon;
		return img;
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
		var optionNodes = [];
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
		// the chosen value's icon (or colour square) inside the box, when the
		// picker has one (cfg.lead returns { color, icon } or null)
		var lead = null;
		function showLead() {
			var want = cfg.lead ? cfg.lead( chosen ) : null;
			var mk = want ? mark( want.color || null, want.icon || null ) : null;
			if ( lead && lead.parentNode ) {
				lead.parentNode.removeChild( lead );
			}
			lead = null;
			if ( mk ) {
				lead = el( 'span', 'ffb-pick-lead' );
				lead.setAttribute( 'style', 'position: absolute; left: 8px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; pointer-events: none;' );
				lead.appendChild( mk );
				if ( wrap.style ) {
					wrap.style.position = 'relative';
				}
				wrap.insertBefore( lead, wrap.firstChild );
				if ( input.style ) {
					input.style.paddingLeft = '32px';
				}
			} else if ( input.style ) {
				input.style.paddingLeft = '';
			}
		}
		showLead();

		function setActive( i ) {
			active = i;
			optionNodes.forEach( function ( li, k ) {
				li.setAttribute( 'aria-selected', k === i ? 'true' : 'false' );
				li.className = 'ffb-pick-option' + ( k === i ? ' ffb-pick-option-active' : '' );
			} );
			if ( i >= 0 && optionNodes[ i ] ) {
				input.setAttribute( 'aria-activedescendant', optionNodes[ i ].id );
				if ( optionNodes[ i ].scrollIntoView ) {
					optionNodes[ i ].scrollIntoView( { block: 'nearest' } );
				}
			} else {
				input.setAttribute( 'aria-activedescendant', '' );
			}
		}
		function open( query ) {
			var all = cfg.search( query );
			var group = null;
			matches = all.slice( 0, cfg.shown || PICK_SHOWN );
			optionNodes = [];
			clear( list );
			matches.forEach( function ( m, k ) {
				var li = el( 'li', 'ffb-pick-option' );
				// a heading over each group ("Your brainrots · 27"), when the
				// search gives one
				if ( m.group && m.group !== group ) {
					group = m.group;
					var gh = el( 'li', 'ffb-pick-group' );
					gh.setAttribute( 'role', 'presentation' );
					gh.appendChild( el( 'span', 'ffb-pick-group-name', m.group ) );
					if ( m.groupHint ) {
						gh.appendChild( el( 'span', 'ffb-pick-group-hint', m.groupHint ) );
					}
					list.appendChild( gh );
				}
				optionNodes.push( li );
				li.id = listId + '-' + k;
				li.setAttribute( 'role', 'option' );
				var nameCell = el( 'span', 'ffb-pick-name' );
				var mk = mark( m.color, m.icon );
				if ( mk ) {
					nameCell.appendChild( mk );
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
				list.appendChild( el( 'li', 'ffb-pick-none', query === '' && cfg.emptyText ? cfg.emptyText :
					'No ' + ( cfg.noun || 'match' ) + ' matches “' + query + '”.' ) );
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
			showLead();
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
				showLead();
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
					return { value: m.value, meta: m.look ? m.rarity + ' · looks like: ' + m.look : m.rarity, color: m.color,
						icon: cat.brainrotIcon[ m.value ] || null, right: m.base || 'no base yet' };
				} );
			},
			// the chosen brainrot's picture inside the box, like the other pickers
			lead: function ( v ) {
				return v && cat.brainrotIcon[ v ] ? { icon: cat.brainrotIcon[ v ] } : null;
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
	/** The evolution picker in the quick-add panels: "No evo" to "Evo 7", with badges. */
	function quickEvoPicker( cat, id, onPick ) {
		var opts = evolutionOptions( cat ).map( function ( o, i ) {
			return { value: o.value, label: i === 0 ? 'No evo' : 'Evo ' + i, icon: o.icon };
		} );
		var pick = buildListPicker( id, opts, '0', 'ffb-trade-input ffb-base-quick-evo', function ( v ) {
			onPick( parseInt( v, 10 ) || 0 );
		} );
		pick.input.setAttribute( 'aria-label', 'Evolution' );
		return pick;
	}

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
					return { value: o.value, name: o.label, icon: o.icon || null };
				} );
			},
			lead: function ( v ) {
				var i;
				for ( i = 0; i < options.length; i++ ) {
					if ( options[ i ].value === v && options[ i ].icon ) {
						return { icon: options[ i ].icon };
					}
				}
				return null;
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
			lead: function ( v ) {
				return cat.mutationIcon[ v ] || cat.mutationColor[ v ] ?
					{ icon: cat.mutationIcon[ v ] || null, color: cat.mutationColor[ v ] || null } : null;
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
					return traitPickLabel( cat, v );
				},
				lead: function ( v ) {
					return v && cat.traitIcon[ v ] ? { icon: cat.traitIcon[ v ] } : null;
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
				if ( cat.mutationColor[ row.mutation ] || cat.mutationIcon[ row.mutation ] ) {
					mutOut.insertBefore( mark( cat.mutationColor[ row.mutation ] || null, cat.mutationIcon[ row.mutation ] || null ), mutOut.firstChild );
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

	/* ================================================================
	 * Trade, redesigned (phone site first): the two sides as compact
	 * lists, then tabs for the verdict, the reasons and the details, so a
	 * phone isn't one endless scroll. Same maths (compareTrade), same
	 * saved trade and share links as the classic page.
	 * ================================================================ */

	/** A brainrot exactly as saved, as one string: name, mutation, traits, evolution, level. */
	function savedKey( r ) {
		return [ r.name, r.mutation, r.traits.filter( function ( t ) {
			return t !== '';
		} ).sort().join( '+' ), r.evolution, r.level ].join( '|' );
	}

	/**
	 * What a trade does to a base whose space is limited (user, 2026-10-09):
	 * before, the strongest `slots` of the saved list earn; after, each
	 * brainrot given comes off (its first exact match) and each one received
	 * goes on, and the strongest `slots` earn again. Null when something
	 * given isn't in the list (its income was never part of "before").
	 * Returns { before, after, slots }.
	 */
	function baseAfterTrade( cat, saved, give, get, slots ) {
		var left = saved.slice();
		var i, k, at;
		function top( rows ) {
			return rows.map( function ( r ) {
				return collectionStats( cat, r );
			} ).filter( function ( st ) {
				return st.measured;
			} ).map( function ( st ) {
				return st.now;
			} ).sort( function ( a, b ) {
				return b - a;
			} ).slice( 0, slots ).reduce( function ( a, b ) {
				return a + b;
			}, 0 );
		}
		for ( i = 0; i < give.length; i++ ) {
			k = savedKey( give[ i ] );
			at = -1;
			left.forEach( function ( r, j ) {
				if ( at === -1 && savedKey( r ) === k ) {
					at = j;
				}
			} );
			if ( at === -1 ) {
				return null;
			}
			left.splice( at, 1 );
		}
		return { before: top( saved ), after: top( left.concat( get ) ), slots: slots };
	}

	/**
	 * A finished trade applied to the saved list: each brainrot given away
	 * comes off (the first exact match: name, mutation, traits, evolution,
	 * level), each one received goes on. A received brainrot takes the base
	 * slot a given-away one had; the rest go to storage. Returns
	 * { rows, removed, added, missing, full } and never changes saved.
	 */
	function applyTrade( cat, saved, give, get ) {
		var rows = saved.slice();
		var removed = [];
		var missing = [];
		var added = [];
		var freed = 0;
		function key( r ) {
			return [ r.name, r.mutation, r.traits.filter( function ( t ) {
				return t !== '';
			} ).sort().join( '+' ), r.evolution, r.level ].join( '|' );
		}
		give.forEach( function ( g ) {
			var k = key( g );
			var at = -1;
			var i;
			// a match that's in the base first, so its slot is the one freed
			for ( i = 0; i < rows.length; i++ ) {
				if ( key( rows[ i ] ) === k && ( at === -1 || ( rows[ i ].inBase && !rows[ at ].inBase ) ) ) {
					at = i;
				}
			}
			if ( at === -1 ) {
				missing.push( g.name );
				return;
			}
			if ( rows[ at ].inBase ) {
				freed++;
			}
			removed.push( g.name );
			rows.splice( at, 1 );
		} );
		if ( rows.length + get.length > COLLECTION_MAX ) {
			return { rows: saved, removed: [], added: [], missing: missing, full: true };
		}
		get.forEach( function ( g ) {
			var r = parseSavedRow( JSON.parse( serializeCollection( [ g ] ) ).r[ 0 ], cat );
			r.inBase = freed > 0;
			if ( r.inBase ) {
				freed--;
			}
			rows.push( r );
			added.push( { name: g.name, inBase: r.inBase } );
		} );
		return { rows: rows, removed: removed, added: added, missing: missing, full: false };
	}

	/**
	 * Suggest an offer (design approved 2026-10-06): sets of up to six of
	 * your saved brainrots that make a fair trade for what's on the Get side,
	 * by the calculator's own Fair band (within 10% today). Order: fair both
	 * today and fully upgraded first, then fair today only; then your base
	 * income after the trade (your strongest `slots` brainrots earn, so
	 * giving several weaker ones for one strong one isn't held against an
	 * offer); then the closest to even. One offer per main brainrot, so the
	 * list isn't five versions of one. A brainrot worth under 2% of the target
	 * both today and fully upgraded is never offered (it adds almost
	 * nothing). The search is capped, so a 600-brainrot list stays quick.
	 * Returns null when the Get side can't be valued, else
	 * { offers: [ { rows, both, before, after, frees } ], target: { now, ceil },
	 *   best: { now, ceil } (your strongest six together) }.
	 */
	function suggestOffers( cat, saved, want, slots, limit ) {
		var tNow = 0;
		var tCeil = 0;
		var valued = true;
		var max = cat.data.maxPerSide || 6;
		var found = [];
		var visits = 0;
		want.forEach( function ( r ) {
			var s = collectionStats( cat, r );
			if ( !s.measured ) {
				valued = false;
				return;
			}
			tNow += s.now;
			tCeil += s.ceil;
		} );
		if ( !valued || !( tNow > 0 ) ) {
			return null;
		}
		var lo = tNow / 1.1;
		var hi = tNow / 0.9;
		var stat = saved.map( function ( r ) {
			var s = collectionStats( cat, r );
			return { row: r, now: s.measured ? s.now : null, ceil: s.measured ? s.ceil : null };
		} ).filter( function ( x ) {
			return x.now !== null;
		} );
		function baseIncome( list ) {
			return list.slice().sort( function ( a, b ) {
				return b - a;
			} ).slice( 0, slots ).reduce( function ( a, b ) {
				return a + b;
			}, 0 );
		}
		var nows = stat.map( function ( x ) {
			return x.now;
		} );
		var before = baseIncome( nows );
		var cand = stat.filter( function ( x ) {
			return x.now <= hi && !( x.now < 0.02 * tNow && x.ceil < 0.02 * tCeil );
		} ).sort( function ( a, b ) {
			return b.now - a.now;
		} ).slice( 0, 60 );
		function rec( start, picked, sn, sc ) {
			var i, nn, reach, k, c;
			if ( ++visits > 200000 || found.length >= 3000 ) {
				return;
			}
			if ( picked.length && sn >= lo ) {
				found.push( { idx: picked.slice(), rn: tNow / sn, rc: tCeil / sc, both: band( tCeil / sc ) === 'even' } );
			}
			if ( picked.length === max ) {
				return;
			}
			for ( i = start; i < cand.length; i++ ) {
				nn = sn + cand[ i ].now;
				if ( nn > hi ) {
					continue;
				}
				// even this one and the next biggest can't reach the band: nor can any after it
				reach = nn;
				for ( k = i + 1, c = picked.length + 1; c < max && k < cand.length; k++, c++ ) {
					reach += cand[ k ].now;
				}
				if ( reach < lo ) {
					break;
				}
				picked.push( i );
				rec( i + 1, picked, nn, sc + cand[ i ].ceil );
				picked.pop();
			}
		}
		rec( 0, [], 0, 0 );
		found.forEach( function ( f ) {
			var gone = f.idx.map( function ( i ) {
				return cand[ i ].row;
			} );
			var left = stat.filter( function ( x ) {
				return gone.indexOf( x.row ) === -1;
			} ).map( function ( x ) {
				return x.now;
			} );
			want.forEach( function ( r ) {
				left.push( collectionStats( cat, r ).now );
			} );
			f.after = baseIncome( left );
			f.even = Math.abs( Math.log( f.rn ) ) + Math.abs( Math.log( f.rc ) );
		} );
		found.sort( function ( a, b ) {
			return ( b.both - a.both ) || ( b.after - a.after ) || ( a.even - b.even );
		} );
		var seen = {};
		var offers = [];
		found.forEach( function ( f ) {
			var main, key;
			if ( offers.length >= limit ) {
				return;
			}
			main = f.idx.slice().sort( function ( a, b ) {
				return cand[ b ].now - cand[ a ].now;
			} )[ 0 ];
			key = cand[ main ].row.name + '|' + cand[ main ].row.mutation;
			if ( seen[ key ] ) {
				return;
			}
			seen[ key ] = true;
			offers.push( {
				rows: f.idx.map( function ( i ) {
					return cand[ i ].row;
				} ),
				both: f.both,
				before: before,
				after: f.after,
				frees: f.idx.length - want.length
			} );
		} );
		var top = stat.slice().sort( function ( a, b ) {
			return b.now - a.now;
		} ).slice( 0, max );
		return {
			offers: offers,
			target: { now: tNow, ceil: tCeil },
			best: {
				now: top.reduce( function ( a, x ) {
					return a + x.now;
				}, 0 ),
				ceil: top.reduce( function ( a, x ) {
					return a + x.ceil;
				}, 0 )
			}
		};
	}

	/** Other brainrots with the same base income: they earn exactly the same. */
	function sameIncomeAs( cat, name ) {
		var b = has( cat.brainrots, name ) ? cat.brainrots[ name ].base : null;
		var out = [];
		if ( b === null || b === undefined ) {
			return out;
		}
		cat.data.brainrots.forEach( function ( x ) {
			if ( x[ 0 ] !== name && x[ 2 ] === b ) {
				out.push( x[ 0 ] );
			}
		} );
		return out;
	}

	var trade2Count = 0;

	/** plainChange's words with its percentage when the words don't carry one: "a little more (+2%)". */
	function changeText( ch ) {
		return ch.words + ( ch.pct && ch.words.indexOf( '%' ) === -1 ? ' (' + ch.pct + ')' : '' );
	}

	/**
	 * How what you get compares with what you give, in plain words:
	 * { words, pct, tone }. pct is '' when the gap is too big for a
	 * percentage to mean much.
	 */
	function plainChange( give, get ) {
		var r, pct;
		if ( !( give > 0 ) && !( get > 0 ) ) {
			return { words: 'nothing either way', pct: '', tone: 'flat' };
		}
		if ( !( give > 0 ) ) {
			return { words: 'something for nothing', pct: '', tone: 'good' };
		}
		r = get / give;
		pct = Math.round( ( r - 1 ) * 100 );
		if ( r >= 1.1 ) {
			if ( r < 2 ) {
				return { words: pctText( r ).slice( 1 ) + ' more', pct: pctText( r ), tone: 'good' };
			}
			if ( r < 10 ) {
				return { words: String( Math.round( r * 10 ) / 10 ) + '× as much', pct: '+' + pct + '%', tone: 'good' };
			}
			if ( r < 100 ) {
				return { words: 'about ' + Math.round( r ) + '× as much', pct: '', tone: 'good' };
			}
			return { words: ( r < 1e3 ? 'hundreds' : r < 1e6 ? 'thousands' : r < 1e9 ? 'millions' : 'billions' ) +
				' of times as much', pct: '', tone: 'good' };
		}
		if ( r > 0.9 ) {
			if ( sameSize( r ) ) {
				return { words: 'exactly the same', pct: '', tone: 'flat' };
			}
			// a small change is still a gain or a loss (user, 2026-10-08)
			return r > 1 ? { words: 'a little more', pct: pctText( r ), tone: 'good' } :
				{ words: 'a little less', pct: pctText( r ), tone: 'bad' };
		}
		if ( r >= 0.5 ) {
			return { words: pctText( r ).slice( 1 ) + ' less', pct: pctText( r ), tone: 'bad' };
		}
		if ( r >= 0.1 ) {
			return { words: 'less than half', pct: '−' + -pct + '%', tone: 'bad' };
		}
		if ( r >= 0.01 ) {
			return { words: 'under a tenth', pct: '', tone: 'bad' };
		}
		return { words: 'almost nothing', pct: '', tone: 'bad' };
	}

	function buildTrade2( container, data, env ) {
		var cat = buildCatalog( data );
		var uid = 'ffb-t2-' + ( ++trade2Count ) + '-';
		var nextId = 1;
		var state = { give: [], get: [], items: { give: [], get: [] }, myIncome: '' };
		var view = { tab: 'sides', editing: null, adding: null, picking: null, itemFor: null };
		var undo = null;
		var storage = workingStorage( env.storage );
		var store = chooseStore( env );
		var wide = !!env.wiki;
		var TITLES = { give: 'You give', get: 'You get' };
		var ARROW = { give: '↑', get: '↓' };

		function savedList() {
			return parseCollection( store.load(), cat ).rows;
		}
		function withId( row ) {
			row.id = nextId++;
			return row;
		}
		function copyRow( row ) {
			return withId( parseSavedRow( JSON.parse( serializeCollection( [ row ] ) ).r[ 0 ], cat ) );
		}

		var loc = typeof window !== 'undefined' && window.location ? window.location : {};
		var shared = tradeFromFragment( loc.hash, cat );
		var remembered = !shared && storage ? parseTrade( readStorage( storage, TRADE_KEY ), cat ) : null;
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
		}
		// ?brainrot=Tim_Cheese (a brainrot page's "Use in a trade") puts it on the Get side
		var wanted = shared ? null : prefillName( cat );
		if ( wanted && state.get.length < data.maxPerSide && !state.get.some( function ( r ) {
			return r.name === wanted;
		} ) ) {
			addRow( cat, state.get, withId( newRow( cat, wanted ) ) );
		}
		function remember() {
			if ( storage ) {
				writeStorage( storage, TRADE_KEY, serializeTrade( state ) );
			}
		}

		function result() {
			var saved = savedList();
			var inBase = saved.filter( function ( r ) {
				return r.inBase;
			} );
			var text = function ( key ) {
				return state.items[ key ].map( function ( i ) {
					return i.text;
				} );
			};
			return compareTrade( cat, {
				give: state.give,
				get: state.get,
				items: { give: text( 'give' ), get: text( 'get' ) },
				myIncome: state.myIncome,
				collectionIncome: saved.length ? collectionIncome( cat, inBase.length ? inBase : saved ) : null,
				owned: saved,
				// base slots from My base's profile, for the slot-aware reason
				slots: saved.length ? readProfile( cat, chooseStore( env, 'profile' ).load() ).slots : null
			} );
		}

		var root = el( 'div', 'ffb-t2' );
		var toolbar = el( 'div', 'ffb-t2-tools' );
		var toolOut = el( 'span', 'ffb-t2-toolout' );
		toolOut.setAttribute( 'aria-live', 'polite' );
		var nav = el( 'div', 'ffb-base-nav' );
		nav.setAttribute( 'role', 'tablist' );
		nav.setAttribute( 'aria-label', 'Trade' );
		var panel = el( 'div', 'ffb-t2-panel' );
		var sticky = el( 'button', 'ffb-t2-sticky' );
		sticky.type = 'button';
		sticky.hidden = true;
		sticky.addEventListener( 'click', function () {
			view.tab = 'verdict';
			render();
		} );
		root.appendChild( toolbar );
		root.appendChild( nav );
		root.appendChild( panel );
		root.appendChild( sticky );

		function tool( label, fn ) {
			var b = el( 'button', 'ffb-t2-tool', label );
			b.type = 'button';
			b.addEventListener( 'click', fn );
			toolbar.appendChild( b );
			return b;
		}
		tool( '⇄ Swap', function () {
			var t = state.give;
			state.give = state.get;
			state.get = t;
			t = state.items.give;
			state.items.give = state.items.get;
			state.items.get = t;
			toolOut.textContent = 'Swapped: you’re now looking from the other side.';
			changed();
		} );
		tool( 'Share', function () {
			var link = tradeLink( state );
			var navr = typeof navigator !== 'undefined' ? navigator : null;
			if ( navr && navr.share ) {
				navr.share( { title: 'Fish for Brainrots trade', url: link } ).then( function () {
					toolOut.textContent = 'Shared.';
				}, function () {} );
			} else if ( navr && navr.clipboard && navr.clipboard.writeText ) {
				navr.clipboard.writeText( link ).then( function () {
					toolOut.textContent = 'Link copied: paste it anywhere to show this trade.';
				}, function () {
					toolOut.textContent = link;
				} );
			} else {
				toolOut.textContent = link;
			}
		} );
		var undoBtn = tool( 'Undo', function () {
			if ( !undo ) {
				return;
			}
			if ( undo.list !== undefined ) {
				store.save( undo.list, function ( err ) {
					toolOut.textContent = err ? 'Couldn’t put My base back: ' + err + '.' : 'Put back, My base too.';
				} );
			}
			if ( undo.all ) {
				state.give = undo.all.give;
				state.get = undo.all.get;
				state.items = undo.all.items;
			} else if ( state[ undo.key ].length < data.maxPerSide ) {
				state[ undo.key ].splice( Math.min( undo.at, state[ undo.key ].length ), 0, undo.row );
			}
			if ( undo.list === undefined ) {
				toolOut.textContent = 'Put back.';
			}
			undo = null;
			changed();
		} );
		tool( 'Clear', function () {
			if ( !state.give.length && !state.get.length && !state.items.give.length && !state.items.get.length ) {
				return;
			}
			undo = { all: { give: state.give, get: state.get, items: state.items } };
			state.give = [];
			state.get = [];
			state.items = { give: [], get: [] };
			view.editing = null;
			toolOut.textContent = 'Cleared. Undo puts it back.';
			changed();
		} );
		toolbar.appendChild( toolOut );

		function changed() {
			remember();
			render();
		}

		function bothFilled() {
			return ( state.give.length || state.items.give.length ) && ( state.get.length || state.items.get.length ) &&
				( state.give.length || state.get.length );
		}

		function tabs( res ) {
			var list = [ { key: 'sides', label: 'Sides' } ];
			if ( bothFilled() ) {
				list.push( { key: 'verdict', label: 'Verdict' } );
				list.push( { key: 'reasons', label: 'Reasons (' + res.take.length + ' · ' + res.pass.length + ')' } );
				list.push( { key: 'details', label: 'Details' } );
			}
			return list;
		}

		/** The wiki, wide: both sides next to each other, the verdict and reasons beside them. */
		function renderWide( res ) {
			var keep = panel;
			nav.hidden = true;
			sticky.hidden = true;
			clear( panel );
			var cols = el( 'div', 'ffb-t2-cols' );
			var main = el( 'div', 'ffb-t2-main' );
			var aside = el( 'div', 'ffb-t2-aside' );
			var sides = el( 'div', 'ffb-t2-sides' );
			cols.appendChild( main );
			cols.appendChild( aside );
			main.appendChild( sides );
			panel.appendChild( cols );
			panel = sides;
			renderSides( res );
			if ( bothFilled() ) {
				var more = el( 'details', 'ffb-t2-details' );
				more.appendChild( el( 'summary', 'ffb-t2-details-sum', 'Details: both sides and each brainrot' ) );
				main.appendChild( more );
				panel = more;
				renderDetails( res );
				panel = aside;
				renderVerdict( res );
			} else {
				aside.appendChild( el( 'div', 'ffb-t2-verdict ffb-t2-verdict-wait', 'The verdict shows here once both sides have something on them.' ) );
			}
			panel = keep;
		}

		function render() {
			var res = result();
			var list = tabs( res );
			undoBtn.disabled = !undo;
			if ( wide ) {
				renderWide( res );
				return;
			}
			if ( !list.some( function ( t ) {
				return t.key === view.tab;
			} ) ) {
				view.tab = 'sides';
			}
			clear( nav );
			list.forEach( function ( t ) {
				var b = el( 'button', 'ffb-base-tab' + ( t.key === view.tab ? ' ffb-base-tab-on' : '' ), t.label );
				b.type = 'button';
				b.setAttribute( 'role', 'tab' );
				b.setAttribute( 'aria-selected', t.key === view.tab ? 'true' : 'false' );
				b.addEventListener( 'click', function () {
					view.tab = t.key;
					render();
				} );
				nav.appendChild( b );
			} );
			nav.hidden = list.length < 2;
			clear( panel );
			( { sides: renderSides, verdict: renderVerdict, reasons: renderReasons, details: renderDetails } )[ view.tab ]( res );
			// the verdict, pinned while you build the trade
			sticky.hidden = !( view.tab === 'sides' && bothFilled() );
			if ( !sticky.hidden ) {
				clear( sticky );
				var today = plainChange( res.sides[ 0 ].now, res.sides[ 1 ].now );
				var ceil = plainChange( res.sides[ 0 ].ceil, res.sides[ 1 ].ceil );
				sticky.appendChild( el( 'span', 'ffb-t2-sticky-title ffb-trade-tone-' + res.verdict.tone, res.verdict.title ) );
				sticky.appendChild( el( 'span', 'ffb-t2-sticky-figs', 'Today: ' + changeText( today ) + ' · Fully upgraded: ' + changeText( ceil ) ) );
				sticky.appendChild( el( 'span', 'ffb-t2-sticky-go', 'See why ›' ) );
			}
		}

		/** One brainrot as a compact row: picture, name, then mutation, icons and level. */
		function rowLine( row, key ) {
			var s = collectionStats( cat, row );
			var box = el( 'div', 'ffb-base-line' );
			box.appendChild( brainrotPic( cat, row.name, 36 ) );
			var mid = el( 'div', 'ffb-base-line-mid' );
			mid.appendChild( el( 'div', 'ffb-base-line-name', row.name ) );
			var meta = el( 'div', 'ffb-base-line-meta' );
			if ( !isDefault( row.mutation ) ) {
				meta.appendChild( el( 'span', 'ffb-base-muted ffb-base-small', row.mutation ) );
			}
			meta.appendChild( permIcons( cat, row ) );
			meta.appendChild( el( 'span', 'ffb-base-lv', ( row.evolution ? 'Evo ' + row.evolution + ' · ' : '' ) + 'Lv ' + row.level ) );
			mid.appendChild( meta );
			box.appendChild( mid );
			var fig = el( 'div', 'ffb-base-line-fig' );
			fig.appendChild( fullTip( el( 'div', 'ffb-base-line-value', s.measured ? money( s.now ) + '/s' : '—' ), s.now, true ) );
			fig.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', s.measured ? 'now' : 'no measured income' ) );
			box.appendChild( fig );
			return box;
		}

		// ---- Sides --------------------------------------------------------------
		function renderSides( res ) {
			if ( !state.give.length && !state.get.length && !state.items.give.length && !state.items.get.length ) {
				panel.appendChild( el( 'h3', 'ffb-base-h', 'Is this trade fair?' ) );
				panel.appendChild( el( 'p', 'ffb-base-muted', 'Put what you give on one side and what you get on the other, exactly as they are. You get two answers: what each side earns today, and what it could earn fully upgraded.' ) );
			}
			[ 'give', 'get' ].forEach( function ( key, i ) {
				panel.appendChild( sideCard( key, res.sides[ i ] ) );
			} );
			if ( !bothFilled() ) {
				var why = el( 'div', 'ffb-base-note ffb-base-small' );
				why.appendChild( el( 'strong', null, 'Why two answers? ' ) );
				why.appendChild( el( 'span', null, 'A brainrot’s mutation and traits never change, but its level and evolution can grow. So a trade can be worse today and better once everything is upgraded. Only you know which matters more.' ) );
				panel.appendChild( why );
			}
		}

		function sideCard( key, side ) {
			var card = el( 'div', 'ffb-t2-side ffb-t2-side-' + key );
			var head = el( 'div', 'ffb-t2-side-head' );
			head.appendChild( el( 'span', 'ffb-t2-arrow ffb-t2-arrow-' + key, ARROW[ key ] ) );
			head.appendChild( el( 'span', 'ffb-t2-side-title', TITLES[ key ] ) );
			head.appendChild( el( 'span', 'ffb-base-muted ffb-base-small', state[ key ].length + ' of ' + data.maxPerSide ) );
			head.appendChild( fullTip( el( 'span', 'ffb-t2-side-total', state[ key ].length ? money( side.now ) + '/s' : '' ), state[ key ].length ? side.now : null, true, true ) );
			card.appendChild( head );
			state[ key ].forEach( function ( row ) {
				var item = el( 'div', 'ffb-base-item' );
				var open = el( 'button', 'ffb-base-item-open' );
				open.type = 'button';
				open.setAttribute( 'aria-expanded', view.editing === row ? 'true' : 'false' );
				open.setAttribute( 'aria-label', 'Edit ' + row.name );
				open.appendChild( rowLine( row, key ) );
				open.addEventListener( 'click', function () {
					view.editing = view.editing === row ? null : row;
					render();
				} );
				item.appendChild( open );
				if ( view.editing === row ) {
					item.appendChild( editor( key, row ) );
				}
				card.appendChild( item );
			} );
			state.items[ key ].forEach( function ( it ) {
				var chip = el( 'div', 'ffb-t2-item' );
				var known = matchItem( cat, it.text );
				chip.appendChild( el( 'span', null, known || it.text ) );
				chip.appendChild( el( 'span', 'ffb-base-muted ffb-base-small', known ? ' · not valued' : ' · not on the list' ) );
				var x = removeButton( 'Remove ' + it.text );
				x.addEventListener( 'click', function () {
					state.items[ key ] = state.items[ key ].filter( function ( y ) {
						return y !== it;
					} );
					changed();
				} );
				chip.appendChild( x );
				card.appendChild( chip );
			} );
			var acts = el( 'div', 'ffb-t2-acts' );
			function act( label, fn, on ) {
				var b = el( 'button', 'ffb-t2-act' + ( on ? ' ffb-t2-act-on' : '' ), label );
				b.type = 'button';
				b.addEventListener( 'click', fn );
				acts.appendChild( b );
				return b;
			}
			var full = state[ key ].length >= data.maxPerSide;
			if ( !full ) {
				act( view.adding === key ? 'Close' : '+ Add brainrot', function () {
					view.adding = view.adding === key ? null : key;
					view.picking = null;
					render();
				}, view.adding === key );
			}
			if ( key === 'give' && state.get.length && savedList().length ) {
				act( view.suggest ? 'Close suggestions' : '✨ Suggest an offer', function () {
					view.suggest = !view.suggest;
					render();
				}, view.suggest );
			}
			act( '+ Item', function () {
				view.itemFor = view.itemFor === key ? null : key;
				render();
			}, view.itemFor === key );
			card.appendChild( acts );
			if ( full ) {
				card.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', data.maxPerSide + ' is the most a side can hold.' ) );
			}
			if ( view.adding === key ) {
				card.appendChild( quickAdd( key ) );
			}
			if ( key === 'give' && view.suggest && state.get.length ) {
				card.appendChild( suggestions() );
			}
			if ( view.itemFor === key ) {
				card.appendChild( itemAdd( key ) );
			}
			return card;
		}

		function editor( key, row ) {
			var wrap = el( 'div', 'ffb-base-editor' );
			var cardUi = buildRowCard( cat, uid + key + row.id, row, {
				onChange: function () {
					cardUi.update( rowView( cat, row, collectionStats( cat, row ) ) );
					remember();
					renderNavAndSticky();
				},
				onRemove: function () {
					var at = state[ key ].indexOf( row );
					if ( at !== -1 ) {
						state[ key ].splice( at, 1 );
					}
					undo = { key: key, row: row, at: at };
					view.editing = null;
					toolOut.textContent = 'Removed ' + row.name + '. Undo puts it back.';
					changed();
				},
				onDuplicate: function () {
					if ( state[ key ].length < data.maxPerSide ) {
						state[ key ].splice( state[ key ].indexOf( row ) + 1, 0, copyRow( row ) );
						changed();
					}
				},
				onSave: function ( done ) {
					var list;
					if ( store.kind === 'none' ) {
						done( 'This browser can’t keep a list.' );
						return;
					}
					list = savedList();
					if ( list.length >= COLLECTION_MAX ) {
						done( 'Your list is full (' + COLLECTION_MAX + ').' );
						return;
					}
					list.push( parseSavedRow( JSON.parse( serializeCollection( [ row ] ) ).r[ 0 ], cat ) );
					store.save( serializeCollection( list ), function ( err ) {
						done( err ? 'Couldn’t save: ' + err + '.' : 'Saved to My base.' );
					} );
				}
			} );
			cardUi.update( rowView( cat, row, collectionStats( cat, row ) ) );
			wrap.appendChild( cardUi.node );
			var foot = el( 'div', 'ffb-base-quick-foot' );
			var other = key === 'give' ? 'get' : 'give';
			var move = el( 'button', 'ffb-collection-button', 'Move to ' + TITLES[ other ] );
			move.type = 'button';
			move.disabled = state[ other ].length >= data.maxPerSide;
			move.addEventListener( 'click', function () {
				state[ key ].splice( state[ key ].indexOf( row ), 1 );
				state[ other ].push( row );
				view.editing = null;
				changed();
			} );
			var done = el( 'button', 'ffb-trade-add', 'Done' );
			done.type = 'button';
			done.addEventListener( 'click', function () {
				view.editing = null;
				render();
			} );
			foot.appendChild( move );
			foot.appendChild( done );
			wrap.appendChild( foot );
			return wrap;
		}

		function renderNavAndSticky() {
			// an edit changes figures but not the list: keep the editor open
			var res = result();
			var heads = panel.querySelectorAll ? panel.querySelectorAll( '.ffb-t2-side-total' ) : [];
			if ( heads.length === 2 ) {
				[ 0, 1 ].forEach( function ( i ) {
					var on = state[ i ? 'get' : 'give' ].length;
					heads[ i ].textContent = on ? money( res.sides[ i ].now ) + '/s' : '';
					heads[ i ].className = 'ffb-t2-side-total';
					fullTip( heads[ i ], on ? res.sides[ i ].now : null, true, true );
				} );
			}
		}

		/** Quick add: your own saved brainrots first (they arrive complete), then the catalog. */
		function quickAdd( key ) {
			var draft = { name: '', mutation: cat.defaultMutation, traits: [], evolution: 0, level: 1 };
			var i;
			for ( i = 0; i < data.maxTraits; i++ ) {
				draft.traits.push( '' );
			}
			var saved = savedList();
			// your saved brainrots, strongest first, minus the copies already
			// on the Give side (only those copies: a second Averino still shows)
			function yours() {
				var inTrade = {};
				var taken = 0;
				state.give.forEach( function ( r ) {
					var k = savedKey( r );
					inTrade[ k ] = ( inTrade[ k ] || 0 ) + 1;
				} );
				var list = saved.map( function ( r, k ) {
					var s = collectionStats( cat, r );
					return { r: r, k: k, now: s.measured ? s.now : null };
				} ).filter( function ( x ) {
					var k = savedKey( x.r );
					if ( inTrade[ k ] ) {
						inTrade[ k ]--;
						taken++;
						return false;
					}
					return true;
				} ).sort( function ( a, b ) {
					return ( b.now === null ? -1 : b.now ) - ( a.now === null ? -1 : a.now ) || a.k - b.k;
				} );
				list.taken = taken;
				return list;
			}
			var box = el( 'div', 'ffb-base-quick' );
			box.appendChild( el( 'div', 'ffb-trade-label', 'Add to ' + TITLES[ key ] ) );
			var said = el( 'p', 'ffb-base-muted ffb-base-small ffb-base-quick-said' );
			said.setAttribute( 'aria-live', 'polite' );
			function addRowNow( row, text ) {
				if ( state[ key ].length >= data.maxPerSide ) {
					said.textContent = data.maxPerSide + ' is the most a side can hold.';
					return false;
				}
				state[ key ].push( withId( row ) );
				remember();
				said.textContent = 'Added ' + text + '.';
				view.adding = key;
				render();
				var again = panel.querySelector ? panel.querySelector( '.ffb-t2-side-' + key + ' .ffb-base-quick-name' ) : null;
				if ( again && again.focus ) {
					again.focus();
				}
				return true;
			}
			var namePick = buildSearchPicker( {
				id: uid + key + 'qn',
				current: '',
				inputClass: 'ffb-trade-input ffb-base-quick-name',
				placeholder: 'Type a brainrot',
				noun: 'brainrot',
				// your own brainrots on the Give side only (the other player's
				// aren't yours): opened empty, your whole list strongest first;
				// typing, all your matches, then every brainrot in the game. A
				// copy already in the trade isn't offered again (user, 2026-10-04).
				shown: COLLECTION_MAX + 60,
				emptyText: 'Type to search every brainrot.',
				search: function ( q ) {
					var sq = squash( q || '' );
					var mine = key === 'give' ? yours() : [];
					var taken = mine.taken;
					mine = mine.filter( function ( x ) {
						return !sq || squash( x.r.name ).indexOf( sq ) !== -1;
					} );
					var mineHead = 'Your brainrots · ' + mine.length;
					var mineHint = sq ? 'every match from My base' : 'strongest first' + ( taken ? ' · ' + taken + ' already in this trade' : '' );
					var out = mine.map( function ( x ) {
						return { value: 'saved:' + x.k, name: x.r.name + ( isDefault( x.r.mutation ) ? '' : ' · ' + x.r.mutation ),
							meta: 'Yours · ' + ( x.r.evolution ? 'Evo ' + x.r.evolution + ' · ' : '' ) + 'Lv ' + x.r.level + ' · fills in everything',
							icon: cat.brainrotIcon[ x.r.name ] || null, group: mineHead, groupHint: mineHint,
							right: x.now !== null ? money( x.now ) + '/s' : '' };
					} );
					if ( !sq && out.length ) {
						return out;
					}
					var all = searchBrainrots( cat, q );
					return out.concat( all.map( function ( m ) {
						return { value: m.value, meta: m.look ? m.rarity + ' · looks like: ' + m.look : m.rarity,
							color: m.color, icon: cat.brainrotIcon[ m.value ] || null, right: m.base || 'no base yet',
							group: out.length ? 'All brainrots · ' + all.length : null, groupHint: 'then set mutation, traits, level' };
					} ) );
				},
				label: function ( v ) {
					return String( v || '' ).indexOf( 'saved:' ) === 0 ? '' : v;
				},
				lead: function ( v ) {
					return v && cat.brainrotIcon[ v ] ? { icon: cat.brainrotIcon[ v ] } : null;
				},
				exact: function ( text ) {
					return exactBrainrot( cat, text );
				},
				onPick: function ( v ) {
					var k;
					if ( String( v ).indexOf( 'saved:' ) === 0 ) {
						k = parseInt( String( v ).slice( 6 ), 10 );
						if ( saved[ k ] ) {
							addRowNow( tradeRowFromSaved( cat, saved[ k ] ), describeSaved( cat, saved[ k ] ) );
						}
						return;
					}
					draft.name = v;
				}
			} );
			box.appendChild( namePick.node );
			var grid = el( 'div', 'ffb-base-quick-grid ffb-base-quick-grid-evo' );
			var mutPick = buildSearchPicker( {
				id: uid + key + 'qm',
				current: draft.mutation,
				inputClass: 'ffb-trade-input',
				placeholder: 'Mutation',
				noun: 'mutation',
				search: function ( q ) {
					return searchMutations( cat, q );
				},
				lead: function ( v ) {
					return cat.mutationIcon[ v ] || cat.mutationColor[ v ] ?
						{ icon: cat.mutationIcon[ v ] || null, color: cat.mutationColor[ v ] || null } : null;
				},
				exact: function ( text ) {
					return exactName( cat.mutations, text );
				},
				onPick: function ( v ) {
					draft.mutation = v;
				}
			} );
			mutPick.input.setAttribute( 'aria-label', 'Mutation' );
			grid.appendChild( mutPick.node );
			function traitPick( slot ) {
				var tp = buildSearchPicker( {
					id: uid + key + 'qt' + slot,
					current: '',
					inputClass: 'ffb-trade-input',
					placeholder: 'Trait ' + ( slot + 1 ),
					noun: 'trait',
					label: function ( v ) {
						return traitPickLabel( cat, v );
					},
					lead: function ( v ) {
						return v && cat.traitIcon[ v ] ? { icon: cat.traitIcon[ v ] } : null;
					},
					search: function ( q ) {
						return searchTraits( cat, draft, slot, q );
					},
					exact: function ( text ) {
						var t = String( text || '' ).trim().replace( /^[^A-Za-z]+/, '' );
						if ( t === '' || squash( t ) === 'notrait' ) {
							return '';
						}
						return exactName( cat.traits, t );
					},
					onPick: function ( v ) {
						draft.traits[ slot ] = v;
					}
				} );
				tp.input.setAttribute( 'aria-label', 'Trait ' + ( slot + 1 ) );
				return tp;
			}
			for ( i = 0; i < data.maxTraits; i++ ) {
				grid.appendChild( traitPick( i ).node );
			}
			var lvl = el( 'input', 'ffb-trade-input ffb-base-quick-level' );
			lvl.type = 'number';
			lvl.min = '1';
			lvl.max = String( data.maxLevel );
			lvl.value = '1';
			lvl.setAttribute( 'inputmode', 'numeric' );
			lvl.setAttribute( 'aria-label', 'Level' );
			grid.appendChild( lvl );
			var evoPick = quickEvoPicker( cat, uid + key + 'qe', function ( v ) {
				draft.evolution = v;
			} );
			grid.appendChild( evoPick.node );
			box.appendChild( grid );
			var foot = el( 'div', 'ffb-base-quick-foot' );
			var addBtn = el( 'button', 'ffb-trade-add ffb-base-quick-add', 'Add to ' + TITLES[ key ] );
			addBtn.type = 'button';
			foot.appendChild( addBtn );
			box.appendChild( foot );
			said.textContent = key === 'give' && saved.length ? 'Your own brainrots from My base come up first and arrive complete.' :
				'Pick a brainrot, then set its mutation, traits, level and evolution.';
			box.appendChild( said );
			function add() {
				var name = draft.name || exactBrainrot( cat, namePick.input.value );
				var n = parseLevel( cat, lvl.value );
				var row;
				if ( !name ) {
					said.textContent = 'Pick a brainrot from the list first.';
					namePick.input.focus();
					return;
				}
				row = newRow( cat, name );
				row.mutation = draft.mutation;
				row.traits = draft.traits.slice();
				row.evolution = draft.evolution;
				row.level = n === null ? 1 : n;
				addRowNow( row, describeSaved( cat, row ) );
			}
			addBtn.addEventListener( 'click', add );
			lvl.addEventListener( 'keydown', function ( e ) {
				if ( e && e.key === 'Enter' ) {
					add();
				}
			} );
			return box;
		}

		/** Suggest an offer: fair sets from your saved list for what's on the Get side. */
		function suggestions() {
			var box = el( 'div', 'ffb-t2-suggest' );
			var profile = readProfile( cat, chooseStore( env, 'profile' ).load() );
			var res = suggestOffers( cat, savedList(), state.get, profile.slots, 5 );
			var max = data.maxPerSide;
			box.appendChild( el( 'div', 'ffb-trade-label', 'Suggested offers from My base' ) );
			if ( !res ) {
				box.appendChild( el( 'p', 'ffb-base-small', 'Something on the Get side has no measured income yet, so there’s nothing to match it against.' ) );
				return box;
			}
			box.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', 'For ' + money( res.target.now ) + '/s today (' + money( res.target.ceil ) +
				'/s fully upgraded). Fair means within 10% by income; some players pay extra for rarity or a new release.' ) );
			if ( !res.offers.length ) {
				var short = 1 - res.best.now / res.target.now;
				box.appendChild( el( 'p', 'ffb-base-note', short > 0 ?
					'Nothing in My base makes a fair offer: your strongest ' + max + ' together earn ' + money( res.best.now ) + '/s, ' +
						Math.round( short * 100 ) + '% short of it.' :
					'Nothing in My base makes a fair offer: whatever would cover it is worth well over 10% more.' ) );
				return box;
			}
			res.offers.forEach( function ( o ) {
				var card = el( 'div', 'ffb-t2-offer' );
				card.appendChild( el( 'span', 'ffb-t2-chip ffb-t2-chip-' + ( o.both ? 'good' : 'flat' ), o.both ? 'Fair today and fully upgraded' : 'Fair today only' ) );
				o.rows.forEach( function ( r ) {
					var line = rowLine( tradeRowFromSaved( cat, r ), 'give' );
					if ( r.level === 1 ) {
						line.appendChild( el( 'span', 'ffb-base-tag ffb-base-tag-store', 'level 1: worth more after upgrading' ) );
					}
					card.appendChild( line );
				} );
				var bits = [ 'Gives ' + o.rows.length, 'gets ' + state.get.length ];
				if ( o.frees > 0 ) {
					bits.push( 'frees ' + plural( o.frees, 'slot', 'slots' ) );
				}
				if ( o.before > 0 ) {
					var ch = o.after / o.before - 1;
					bits.push( 'your base income ' + ( ch >= 0 ? '+' : '−' ) + Math.abs( ch * 100 ).toFixed( 1 ) + '%' );
				}
				card.appendChild( el( 'p', 'ffb-base-small', bits.join( ' · ' ) ) );
				o.rows.forEach( function ( r ) {
					var twins = sameIncomeAs( cat, r.name );
					if ( twins.length ) {
						card.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', r.name + ' earns the same as ' +
							joinNames( twins.slice( 0, 3 ) ) + ( twins.length > 3 ? ' and others' : '' ) + ' with the same mutation, traits, level and evolution.' ) );
					}
				} );
				var use = el( 'button', 'ffb-trade-add', 'Use this offer' );
				use.type = 'button';
				use.addEventListener( 'click', function () {
					state.give = o.rows.map( function ( r ) {
						return withId( tradeRowFromSaved( cat, r ) );
					} );
					view.suggest = false;
					toolOut.textContent = 'Your Give side is now that offer. Undo puts the old one back.';
					changed();
				} );
				card.appendChild( use );
				box.appendChild( card );
			} );
			return box;
		}

		function itemAdd( key ) {
			var box = el( 'div', 'ffb-base-quick' );
			box.appendChild( el( 'div', 'ffb-trade-label', 'A rod or potion (listed, never valued)' ) );
			var pick = buildSearchPicker( {
				id: uid + key + 'item',
				current: '',
				inputClass: 'ffb-trade-input',
				placeholder: 'Search rods and potions',
				noun: 'item',
				search: function ( q ) {
					var sq = squash( q || '' );
					return cat.items.filter( function ( it ) {
						return !sq || squash( it.name ).indexOf( sq ) !== -1;
					} ).map( function ( it ) {
						return { value: it.name, meta: it.kind };
					} );
				},
				exact: function ( text ) {
					return matchItem( cat, text );
				},
				onPick: function ( v ) {
					state.items[ key ].push( { id: nextId++, text: v } );
					view.itemFor = null;
					changed();
				}
			} );
			pick.input.setAttribute( 'aria-label', 'Item' );
			box.appendChild( pick.node );
			return box;
		}

		// ---- Verdict ------------------------------------------------------------
		function tile( label, hint, give, get ) {
			var ch = plainChange( give, get );
			var t = el( 'div', 'ffb-t2-tile' );
			t.appendChild( el( 'div', 'ffb-trade-label', label ) );
			t.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', hint ) );
			t.appendChild( fullTip( el( 'div', 'ffb-t2-tile-big ffb-trade-tone-' + ch.tone, money( get ) + '/s' ), get, true, true ) );
			var was = el( 'div', 'ffb-base-muted ffb-base-small', 'instead of ' );
			was.appendChild( fullTip( el( 'span', null, money( give ) + '/s' ), give, true, true ) );
			t.appendChild( was );
			t.appendChild( el( 'div', 'ffb-t2-chip ffb-t2-chip-' + ch.tone, changeText( ch ) ) );
			return t;
		}

		function renderVerdict( res ) {
			var strip = el( 'div', 'ffb-t2-strip' );
			strip.hidden = wide;
			[ 'give', 'get' ].forEach( function ( key ) {
				var line = el( 'div', 'ffb-t2-strip-side' );
				line.appendChild( el( 'span', 'ffb-t2-arrow ffb-t2-arrow-' + key, ARROW[ key ] ) );
				state[ key ].forEach( function ( r ) {
					line.appendChild( brainrotPic( cat, r.name, 26 ) );
				} );
				line.appendChild( el( 'span', 'ffb-base-muted ffb-base-small', state[ key ].map( function ( r ) {
					return r.name;
				} ).concat( state.items[ key ].map( function ( i ) {
					return i.text;
				} ) ).join( ', ' ) ) );
				strip.appendChild( line );
			} );
			panel.appendChild( strip );
			var card = el( 'div', 'ffb-t2-verdict' );
			card.appendChild( el( 'div', 'ffb-trade-label', 'Verdict' ) );
			card.appendChild( el( 'div', 'ffb-t2-verdict-title ffb-trade-tone-' + res.verdict.tone, res.verdict.title ) );
			card.appendChild( el( 'p', 'ffb-base-small', res.verdict.sub ) );
			if ( res.verdict.longTerm ) {
				card.appendChild( richText( 'div', 'ffb-t2-longterm ffb-t2-longterm-' + res.verdict.longTerm.tone, res.verdict.longTerm.text, res.tips ) );
			}
			var tiles = el( 'div', 'ffb-t2-tiles' );
			tiles.appendChild( tile( 'Today', 'what you get earns now', res.sides[ 0 ].now, res.sides[ 1 ].now ) );
			tiles.appendChild( tile( 'Fully upgraded', 'level ' + data.maxLevel + ', Evo ' + data.maxEvolution, res.sides[ 0 ].ceil, res.sides[ 1 ].ceil ) );
			card.appendChild( tiles );
			panel.appendChild( card );

			var mine = el( 'div', 'ffb-base-card' );
			mine.appendChild( el( 'div', 'ffb-base-row-label', 'Your total income' ) );
			mine.appendChild( richText( 'p', 'ffb-base-small ffb-trade-tone-' + res.mine.tone, res.mine.text, res.tips ) );
			var inp = el( 'input', 'ffb-trade-input' );
			inp.type = 'text';
			inp.value = state.myIncome;
			inp.placeholder = res.mine.source === 'collection' ? 'Using My base · or type a total, e.g. 40No' : 'e.g. 2.5Qa';
			inp.setAttribute( 'aria-label', 'Your total income now' );
			inp.addEventListener( 'change', function () {
				state.myIncome = inp.value;
				changed();
			} );
			mine.appendChild( inp );
			panel.appendChild( mine );

			function reasons( title, list, kind ) {
				var box = el( 'div', 'ffb-t2-reasons ffb-t2-reasons-' + kind );
				box.appendChild( el( 'div', 'ffb-trade-label', title ) );
				if ( !list.length ) {
					box.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', 'None stand out.' ) );
				}
				var ul = el( 'ul', 'ffb-t2-reason-list' );
				// wide: every reason (no Reasons tab to send you to)
				list.slice( 0, wide ? list.length : 2 ).forEach( function ( t ) {
					ul.appendChild( richText( 'li', null, t, res.tips ) );
				} );
				box.appendChild( ul );
				if ( list.length > 2 && !wide ) {
					var more = el( 'button', 'ffb-t2-more', ( list.length - 2 ) + ' more in Reasons ›' );
					more.type = 'button';
					more.addEventListener( 'click', function () {
						view.tab = 'reasons';
						render();
					} );
					box.appendChild( more );
				}
				panel.appendChild( box );
			}
			reasons( 'Reasons to take it', res.take, 'take' );
			reasons( 'Reasons to pass', res.pass, 'pass' );
			if ( store.kind === 'signin' ) {
				panel.appendChild( signinPrompt( env ) );
			} else if ( store.kind !== 'none' ) {
				panel.appendChild( doneCard() );
			}
		}

		/** "Trade accepted": take what you gave off My base and put what you got on. */
		function doneCard() {
			var box = el( 'div', 'ffb-t2-done' );
			box.appendChild( el( 'div', 'ffb-trade-label', 'Did the trade go through?' ) );
			box.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', 'Update My base: what you gave comes off your list, what you got goes on (into the base slots the others leave free). Rods and potions aren’t tracked.' ) );
			var go = el( 'button', 'ffb-trade-add ffb-t2-done-go', 'Trade accepted: update My base' );
			go.type = 'button';
			var said = el( 'p', 'ffb-base-small' );
			said.setAttribute( 'aria-live', 'polite' );
			go.addEventListener( 'click', function () {
				var before = store.load();
				var out = applyTrade( cat, parseCollection( before, cat ).rows, state.give, state.get );
				var tradeBefore = { give: state.give, get: state.get, items: state.items };
				if ( out.full ) {
					said.textContent = 'Your list would go over ' + COLLECTION_MAX + ' brainrots. Remove some in My base first.';
					return;
				}
				go.disabled = true;
				store.save( serializeCollection( out.rows ), function ( err ) {
					var bits = [];
					if ( err ) {
						go.disabled = false;
						said.textContent = 'Couldn’t save: ' + err + '.';
						return;
					}
					if ( out.removed.length ) {
						bits.push( 'Removed ' + out.removed.join( ', ' ) + '.' );
					}
					if ( out.added.length ) {
						bits.push( 'Added ' + out.added.map( function ( a ) {
							return a.name + ( a.inBase ? ' (in your base)' : ' (in storage)' );
						} ).join( ', ' ) + '.' );
					}
					if ( out.missing.length ) {
						bits.push( 'Not on your list, so nothing removed for: ' + out.missing.join( ', ' ) + '.' );
					}
					// the trade is done: clear it so it can't be applied twice
					undo = { list: before, all: tradeBefore };
					state.give = [];
					state.get = [];
					state.items = { give: [], get: [] };
					view.tab = 'sides';
					toolOut.textContent = bits.join( ' ' ) + ' Undo puts it all back.';
					changed();
				} );
			} );
			box.appendChild( go );
			box.appendChild( said );
			return box;
		}

		// ---- Reasons -------------------------------------------------------------
		function renderReasons( res ) {
			var head = el( 'div', 'ffb-t2-verdict ffb-t2-verdict-small' );
			head.appendChild( el( 'span', 'ffb-t2-verdict-title ffb-trade-tone-' + res.verdict.tone, res.verdict.title ) );
			if ( res.verdict.longTerm ) {
				head.appendChild( richText( 'div', 'ffb-t2-longterm ffb-t2-longterm-' + res.verdict.longTerm.tone, res.verdict.longTerm.text, res.tips ) );
			}
			panel.appendChild( head );
			panel.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', 'Only you know which matters more: income now, or what these brainrots can grow into.' ) );
			function block( title, list, kind ) {
				var box = el( 'div', 'ffb-t2-reasons ffb-t2-reasons-' + kind );
				box.appendChild( el( 'div', 'ffb-trade-label', title ) );
				if ( !list.length ) {
					box.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', 'None stand out.' ) );
				}
				var ul = el( 'ul', 'ffb-t2-reason-list' );
				list.forEach( function ( t ) {
					ul.appendChild( richText( 'li', null, t, res.tips ) );
				} );
				box.appendChild( ul );
				panel.appendChild( box );
			}
			block( 'Reasons to take it', res.take, 'take' );
			block( 'Reasons to pass', res.pass, 'pass' );
			var notes = res.notes.concat( res.warnings );
			if ( notes.length ) {
				block( 'Good to know', notes, 'note' );
			}
		}

		// ---- Details -------------------------------------------------------------
		function renderDetails( res ) {
			var tbl = el( 'div', 'ffb-t2-table' );
			var hdr = el( 'div', 'ffb-t2-trow ffb-t2-thead' );
			hdr.appendChild( el( 'span', null, '' ) );
			hdr.appendChild( el( 'span', null, '↑ Give' ) );
			hdr.appendChild( el( 'span', null, '↓ Get' ) );
			tbl.appendChild( hdr );
			res.table.forEach( function ( row, i ) {
				var r = el( 'div', 'ffb-t2-trow' );
				var lab = el( 'span', 'ffb-t2-tlabel' );
				lab.appendChild( el( 'span', null, row.label ) );
				if ( row.hint ) {
					lab.appendChild( el( 'span', 'ffb-base-muted ffb-base-small ffb-base-block', row.hint ) );
				}
				r.appendChild( lab );
				r.appendChild( richText( 'span', 'ffb-t2-tval', row.give, res.tips ) );
				r.appendChild( richText( 'span', 'ffb-t2-tval', row.get, res.tips ) );
				var diff = row.diff;
				var tone = row.tone;
				var ch = row.label === 'Income now' ? plainChange( res.sides[ 0 ].now, res.sides[ 1 ].now ) :
					row.label === 'Fully upgraded' ? plainChange( res.sides[ 0 ].ceil, res.sides[ 1 ].ceil ) :
					row.label.indexOf( 'Income at level' ) === 0 ? plainChange( res.sides[ 0 ].max, res.sides[ 1 ].max ) : null;
				if ( ch ) {
					diff = changeText( ch );
					tone = ch.tone;
				} else if ( diff && diff.charAt( 0 ) === '×' ) {
					diff = 'over 10× as much';
				} else if ( diff && diff.charAt( 0 ) === '÷' ) {
					diff = 'under a tenth';
				}
				if ( diff ) {
					r.appendChild( el( 'span', 'ffb-t2-tdiff ffb-trade-tone-' + ( tone || 'flat' ), diff ) );
				}
				tbl.appendChild( r );
			} );
			panel.appendChild( tbl );
			panel.appendChild( el( 'div', 'ffb-trade-label ffb-base-gap', 'Each brainrot' ) );
			[ 'give', 'get' ].forEach( function ( key ) {
				state[ key ].forEach( function ( row ) {
					var v = rowView( cat, row, collectionStats( cat, row ) );
					var box = el( 'div', 'ffb-base-card' );
					box.appendChild( rowLine( row, key ) );
					box.appendChild( el( 'p', 'ffb-base-small', 'Mutation ' + v.mutPart + ' · traits ' + v.traitPart + ' · together ' + v.bothPart + ' · ' + v.mult ) );
					panel.appendChild( box );
				} );
			} );
			panel.appendChild( suffixLegend() );
		}

		render();
		container.appendChild( root );
		return { root: root };
	}

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

	/* ================================================================
	 * My base: enter your brainrots once, then tabs that each answer one
	 * question (what to upgrade next, which to keep, how they compare at
	 * one level). Only the tabs that have something to say are shown.
	 * Uses the same saved list as My collection.
	 * ================================================================ */

	var baseCount = 0;
	var BASE_SORTS = [
		{ value: 'strength', label: 'Level 1 $/s' },
		{ value: 'income', label: 'Income now' },
		{ value: 'ceiling', label: 'Fully upgraded' },
		{ value: 'level', label: 'Level' },
		{ value: 'rarity', label: 'Rarity' },
		{ value: 'name', label: 'Name' }
	];
	var SAME_LEVELS = [ 1, 100, 175, 200 ];

	/** A brainrot's picture (or its initials when there's no picture yet). */
	/**
	 * A picture in its rarity's frame (user, 2026-10-06): the border in the
	 * rarity's colour; Secret and up spin (Common.css .ffb-rar). The colours
	 * were checked in buildCatalog, since they end up in a style attribute.
	 */
	function rarityFrame( cat, rarity, node ) {
		var c = cat.rarityColor && has( cat.rarityColor, rarity ) ? cat.rarityColor[ rarity ] : null;
		var c2 = cat.rarityColor2 && has( cat.rarityColor2, rarity ) ? cat.rarityColor2[ rarity ] : null;
		var spin = !!( cat.spinRarity && cat.spinRarity[ rarity ] );
		var wrap;
		if ( !c ) {
			return node;
		}
		wrap = el( 'span', 'ffb-rar ffb-rar-' + String( rarity ).toLowerCase().replace( /[^a-z0-9]+/g, '-' ) +
			( spin ? ' ffb-rar-spin' : '' ) );
		wrap.setAttribute( 'style', '--rc:' + c + ';' + ( c2 ? ' --rc2:' + c2 + ';' : '' ) );
		wrap.appendChild( node );
		return wrap;
	}

	function brainrotPic( cat, name, size ) {
		var box = el( 'span', 'ffb-base-pic' );
		var url = cat.brainrotIcon ? cat.brainrotIcon[ name ] : null;
		var img;
		box.setAttribute( 'style', 'width: ' + size + 'px; height: ' + size + 'px;' );
		function initials() {
			clear( box );
			box.className = 'ffb-base-pic ffb-base-pic-none';
			box.textContent = String( name || '?' ).split( ' ' ).slice( 0, 2 ).map( function ( w ) {
				return w.charAt( 0 );
			} ).join( '' );
		}
		if ( !url ) {
			initials();
			return rarityFrame( cat, has( cat.brainrots, name ) ? cat.brainrots[ name ].rarity : null, box );
		}
		img = el( 'img' );
		img.setAttribute( 'alt', '' );
		// Fandom swaps pictures shown on other sites for a placeholder
		// unless no referrer is sent (see mark())
		img.referrerPolicy = 'no-referrer';
		img.setAttribute( 'referrerpolicy', 'no-referrer' );
		img.onerror = initials;
		img.onload = function () {
			if ( img.naturalWidth > 64 ) {
				initials();
			}
		};
		img.src = url;
		box.appendChild( img );
		return rarityFrame( cat, has( cat.brainrots, name ) ? cat.brainrots[ name ].rarity : null, box );
	}

	/** The mutation and trait icons of a saved brainrot, in a row. */
	function permIcons( cat, row ) {
		var box = el( 'span', 'ffb-base-icons' );
		var any = false;
		var mk;
		if ( !isDefault( row.mutation ) ) {
			mk = mark( cat.mutationColor[ row.mutation ] || null, cat.mutationIcon[ row.mutation ] || null );
			if ( mk ) {
				mk.setAttribute( 'title', row.mutation );
				box.appendChild( mk );
				any = true;
			}
		}
		row.traits.forEach( function ( t ) {
			if ( !t ) {
				return;
			}
			mk = cat.traitIcon[ t ] ? mark( null, cat.traitIcon[ t ] ) : el( 'span', null, traitLabel( cat, t ).split( ' ' )[ 0 ] );
			mk.setAttribute( 'title', t );
			box.appendChild( mk );
			any = true;
		} );
		if ( !any ) {
			box.appendChild( el( 'span', 'ffb-base-muted', 'no mutation or traits' ) );
		}
		return box;
	}

	/** My base for a signed-out reader on the wiki: what it does, and sign in. */
	function baseSignedOut( env ) {
		var box = el( 'div', 'ffb-base-out' );
		var main = el( 'div', 'ffb-base-out-main' );
		main.appendChild( el( 'h3', 'ffb-base-h', 'My base keeps your brainrots in one list' ) );
		main.appendChild( el( 'p', 'ffb-base-muted', 'Enter them once and the trade calculator, every brainrot page and the upgrade plan all use them: what to upgrade next, which to keep, and fair offers for a trade.' ) );
		var chips = el( 'div', 'ffb-base-chips' );
		[ 'Upgrade plan', 'Keep or swap', 'Same level', 'Suggest an offer', 'Your brainrots first in every search' ].forEach( function ( t ) {
			chips.appendChild( el( 'span', 'ffb-base-chip', t ) );
		} );
		main.appendChild( chips );
		var still = el( 'p', 'ffb-base-muted ffb-base-small' );
		still.appendChild( el( 'span', null, 'Without signing in you can still use the ' ) );
		var a = el( 'a', null, 'trade calculator' );
		a.setAttribute( 'href', wikiLink( 'Fish for Brainrots - Trading' ) );
		still.appendChild( a );
		still.appendChild( el( 'span', null, ' and the value calculator on every brainrot page; they just can’t remember anything.' ) );
		main.appendChild( still );
		box.appendChild( main );
		box.appendChild( signinPrompt( env ) );
		return box;
	}

	function buildBase( container, data, env ) {
		var cat = buildCatalog( data );
		var uid = 'ffb-base-' + ( ++baseCount ) + '-';
		var store = chooseStore( env );
		var storage = workingStorage( env.storage );
		if ( store.kind === 'signin' ) {
			container.appendChild( baseSignedOut( env ) );
			return { root: null };
		}
		var profileStore = chooseStore( env, 'profile' );
		var wide = !!env.wiki;
		var loaded = parseCollection( store.load(), cat );
		var rows = loaded.rows;
		var blocked = loaded.error === 'newer';
		var nextId = 1;
		var savedProfile = profileStore.load();
		var profile = readProfile( cat, savedProfile );
		var oldSlots = parseInt( readStorage( storage, BASE_SLOTS_KEY ) || '', 10 );
		var view = { tab: 'list', filter: 'all', sort: 'strength', editing: null, level: 175, check: 1, goal: 175, adding: false, cashOn: 'base' };
		var lastInBase = false;

		// the slots set on the old My collection page carry over
		if ( !savedProfile && oldSlots >= 1 && oldSlots <= BASE_SLOTS_MAX ) {
			profile.slots = oldSlots;
		}
		function withId( row ) {
			row.id = nextId++;
			return row;
		}
		rows.forEach( withId );

		var root = el( 'div', 'ffb-base' );
		var status = el( 'p', 'ffb-base-status' );
		status.setAttribute( 'aria-live', 'polite' );
		var nav = el( 'div', 'ffb-base-nav' );
		nav.setAttribute( 'role', 'tablist' );
		nav.setAttribute( 'aria-label', 'My base' );
		var panel = el( 'div', 'ffb-base-panel' );
		root.appendChild( nav );
		root.appendChild( status );
		root.appendChild( panel );
		// the wiki, laid out for wide screens: figures along the top, the
		// list on the left, the plans in a panel beside it
		var stats = el( 'div', 'ffb-base-stats' );
		var listPanel = el( 'div', 'ffb-base-panel ffb-base-main' );
		var sidePanel = el( 'div', 'ffb-base-panel' );
		if ( wide ) {
			root.className += ' ffb-base-wide';
			root.removeChild( nav );
			root.removeChild( panel );
			var cols = el( 'div', 'ffb-base-cols' );
			var sideCol = el( 'div', 'ffb-base-side' );
			sideCol.appendChild( nav );
			sideCol.appendChild( sidePanel );
			cols.appendChild( listPanel );
			cols.appendChild( sideCol );
			root.insertBefore( stats, status );
			root.appendChild( cols );
		}
		var summary = el( 'div', 'ffb-base-sum' );
		summary.hidden = true;
		root.insertBefore( summary, root.firstChild );
		var offer = browserListOffer( store, rows, storage, cat );
		if ( offer ) {
			var offerBox = el( 'div', 'ffb-base-note ffb-base-offer' );
			offerBox.appendChild( el( 'p', null, 'This browser still has a list of ' + plural( offer.length, 'brainrot', 'brainrots' ) +
				' saved on it. Move it to your Fandom account, so it’s here on any device?' ) );
			var moveIt = el( 'button', 'ffb-trade-add', 'Move it to my account' );
			moveIt.type = 'button';
			var noThanks = el( 'button', 'ffb-collection-button', 'No thanks' );
			noThanks.type = 'button';
			moveIt.addEventListener( 'click', function () {
				addToCollection( rows, offer.map( withId ) );
				writeStorage( storage, OFFERED_KEY, '1' );
				root.removeChild( offerBox );
				save();
				render();
			} );
			noThanks.addEventListener( 'click', function () {
				writeStorage( storage, OFFERED_KEY, '1' );
				root.removeChild( offerBox );
			} );
			offerBox.appendChild( moveIt );
			offerBox.appendChild( noThanks );
			root.insertBefore( offerBox, root.firstChild );
		}
		if ( loaded.error === 'unreadable' ) {
			status.textContent = 'Your saved list couldn’t be read, so this starts empty.';
		} else if ( blocked ) {
			status.textContent = 'Your list was saved by a newer version of this page, so changes here won’t be saved.';
		}

		function save() {
			if ( blocked || store.kind === 'none' ) {
				return;
			}
			store.save( serializeCollection( rows ), function ( err ) {
				status.textContent = err ? 'Couldn’t save: ' + err + '.' : '';
			} );
		}
		function saveProfile() {
			profileStore.save( JSON.stringify( profile ), function ( err ) {
				if ( err ) {
					status.textContent = 'Couldn’t save your profile: ' + err + '.';
				}
			} );
		}
		function measured() {
			return rows.filter( function ( r ) {
				return rowStrength( cat, r ) !== null;
			} );
		}
		function tabs() {
			var m = measured().length;
			var list = [ { key: 'list', label: rows.length ? 'Brainrots (' + rows.length + ')' : 'Brainrots' } ];
			if ( m ) {
				list.push( { key: 'plan', label: 'Upgrade plan' } );
			}
			if ( m > profile.slots ) {
				list.push( { key: 'swap', label: 'Keep or swap' } );
			}
			if ( m >= 2 ) {
				list.push( { key: 'level', label: 'Same level' } );
			}
			list.push( { key: 'profile', label: 'Profile' } );
			return list;
		}
		function tabButtons( list ) {
			clear( nav );
			list.forEach( function ( t ) {
				var b = el( 'button', 'ffb-base-tab' + ( t.key === view.tab ? ' ffb-base-tab-on' : '' ), t.label );
				b.type = 'button';
				b.setAttribute( 'role', 'tab' );
				b.setAttribute( 'aria-selected', t.key === view.tab ? 'true' : 'false' );
				b.addEventListener( 'click', function () {
					view.tab = t.key;
					render();
				} );
				nav.appendChild( b );
			} );
		}
		function sideTabs() {
			var list = tabs().filter( function ( t ) {
				return t.key !== 'list';
			} );
			if ( !list.some( function ( t ) {
				return t.key === view.tab;
			} ) ) {
				view.tab = list[ 0 ].key;
			}
			return list;
		}
		function stat( k, v, hint, n ) {
			var t = el( 'div', 'ffb-base-stat' );
			t.appendChild( el( 'div', 'ffb-trade-label', k ) );
			t.appendChild( fullTip( el( 'div', 'ffb-base-stat-v', v ), n, /\/s$/.test( v ), true ) );
			t.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', hint ) );
			stats.appendChild( t );
		}
		function renderStats() {
			var inBase = rows.filter( function ( r ) {
				return r.inBase;
			} ).length;
			var ready = rows.filter( function ( r ) {
				return collectionStats( cat, r ).canEvolve;
			} ).length;
			// the plan's first buy: the same one Upgrade plan puts first
			var step = planSteps( cat, planMaths( cat, profile, baseMultiplier( profile ) ), planKeepers(), view.goal, 400 )[ 0 ];
			var next = step && step.parts[ 0 ];
			clear( stats );
			stats.hidden = !rows.length;
			stat( 'Brainrots', String( rows.length ), inBase + ' in base · ' + ( rows.length - inBase ) + ' in Storage' );
			stat( 'Next upgrade', next ? money( next.cost ) : '—', next ? next.row.name + ' ' + partWhat( next, step.evolve ) +
				' · pays back in ~' + playTime( next.lastPay ) + ' of play' : 'nothing left to buy', next ? next.cost : null );
			stat( 'Ready to evolve', String( ready ), 'at level ' + data.maxLevel );
		}
		/**
		 * The Your base card above the tabs: what the base earns now, over a
		 * play session (brainrots only earn while you play), and a few checks.
		 */
		function renderSummary() {
			clear( summary );
			var plan = planBase( cat, rows, profile.slots );
			var up = upgradePlan( cat, rows, profile, view.goal );
			summary.hidden = !plan.ranked.length;
			if ( summary.hidden ) {
				return;
			}
			var mult = up.multiplier;
			var ticked = rows.filter( function ( r ) {
				return r.inBase && rowStrength( cat, r ) !== null;
			} );
			var earning = ticked.length ? ticked : plan.ranked.slice( 0, profile.slots ).map( function ( k ) {
				return k.row;
			} );
			var sumOf = function ( list, key ) {
				return list.reduce( function ( t, r ) {
					return t + ( collectionStats( cat, r )[ key ] || 0 );
				}, 0 );
			};
			summary.appendChild( el( 'div', 'ffb-trade-label', 'Your base' ) );
			var top = el( 'div', 'ffb-base-sum-top' );
			top.appendChild( fullTip( el( 'span', 'ffb-base-sum-big', money( up.perSecond ) + '/s' ), up.perSecond, true, true ) );
			top.appendChild( el( 'span', 'ffb-base-sum-mult', '×' + mult ) );
			summary.appendChild( top );
			summary.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', money( up.income ) + '/s from your brainrots × ' + mult +
				' (' + multiplierParts( profile ) + ')' ) );

			// over a play session
			var hours = profile.hours;
			var at = PLAY_HOURS.indexOf( hours );
			var sess = el( 'div', 'ffb-base-sum-session' );
			var setHours = function ( h ) {
				profile.hours = h;
				saveProfile();
				renderSummary();
			};
			var step = function ( label, to, name ) {
				var b = el( 'button', 'ffb-base-sum-step', label );
				b.type = 'button';
				b.setAttribute( 'aria-label', name );
				b.disabled = to === undefined;
				b.addEventListener( 'click', function () {
					setHours( to );
				} );
				return b;
			};
			sess.appendChild( el( 'span', null, 'In ' ) );
			sess.appendChild( step( '−', PLAY_HOURS[ at - 1 ], 'Fewer hours' ) );
			sess.appendChild( el( 'span', 'ffb-base-sum-hours', hoursLabel( hours ) ) );
			sess.appendChild( step( '+', PLAY_HOURS[ at + 1 ], 'More hours' ) );
			sess.appendChild( el( 'span', null, ' of play: ' ) );
			var earned = up.perSecond * 3600 * hours;
			sess.appendChild( fullTip( el( 'strong', 'ffb-base-sum-earned', money( earned ) ), earned, false, true ) );
			summary.appendChild( sess );
			var picks = el( 'div', 'ffb-base-sum-picks' );
			[ 0.5, 1, 3, 8 ].forEach( function ( h ) {
				var b = el( 'button', 'ffb-base-sum-pick' + ( h === hours ? ' ffb-base-sum-pick-on' : '' ), hoursLabel( h ) );
				b.type = 'button';
				b.setAttribute( 'aria-pressed', h === hours ? 'true' : 'false' );
				b.addEventListener( 'click', function () {
					setHours( h );
				} );
				picks.appendChild( b );
			} );
			summary.appendChild( picks );

			// what it counts, and the checks
			var facts = el( 'ul', 'ffb-base-sum-facts' );
			var fact = function ( text ) {
				facts.appendChild( el( 'li', null, text ) );
			};
			fact( ticked.length ?
				'Counting the ' + plural( ticked.length, 'brainrot', 'brainrots' ) + ' you ticked “In my base”.' :
				'Counting your best ' + plural( earning.length, 'brainrot', 'brainrots' ) + '. Tick “In my base” on the ones on your base for an exact figure.' );
			if ( ticked.length ) {
				var empty = profile.slots - ticked.length;
				fact( 'Slots used: ' + Math.min( ticked.length, profile.slots ) + ' / ' + profile.slots +
					( empty > 0 ? ' · ' + plural( empty, 'empty slot', 'empty slots' ) + ' earning nothing' : '' ) );
				var gain = ( sumOf( plan.moveIn, 'now' ) - sumOf( plan.swapOut, 'now' ) ) * mult;
				if ( plan.moveIn.length && gain > 0 ) {
					fact( ( plan.swapOut.length ? 'Swapping in ' + plural( plan.moveIn.length, 'stronger one', 'stronger ones' ) :
						'Putting ' + plural( plan.moveIn.length, 'brainrot', 'brainrots' ) + ' on your base' ) + ' from Storage would add +' +
						money( gain ) + '/s (see ' + ( plan.over ? 'Keep or swap' : 'Brainrots' ) + ').' );
				}
			} else {
				fact( 'Slots: ' + profile.slots + ' (set in Profile)' );
			}
			var atMax = sumOf( earning, 'max' ) * mult;
			var atCeil = sumOf( earning, 'ceil' ) * mult;
			if ( atMax > up.perSecond || atCeil > up.perSecond ) {
				fact( 'Fully upgraded: ' + money( atMax ) + '/s at level ' + data.maxLevel +
					( atCeil > atMax ? ', ' + money( atCeil ) + '/s at Evo ' + data.maxEvolution + ', level ' + data.maxLevel : '' ) + '.' );
			}
			summary.appendChild( facts );
		}
		var renderers = { list: renderList, plan: renderPlan, swap: renderSwap, level: renderLevel, profile: renderProfile };
		function render() {
			var list;
			renderSummary();
			if ( wide ) {
				tabButtons( sideTabs() );
				renderStats();
				clear( listPanel );
				clear( sidePanel );
				panel = listPanel;
				renderList();
				panel = sidePanel;
				renderers[ view.tab ]();
				return;
			}
			list = tabs();
			if ( !list.some( function ( t ) {
				return t.key === view.tab;
			} ) ) {
				view.tab = 'list';
			}
			clear( nav );
			list.forEach( function ( t ) {
				var b = el( 'button', 'ffb-base-tab' + ( t.key === view.tab ? ' ffb-base-tab-on' : '' ), t.label );
				b.type = 'button';
				b.setAttribute( 'role', 'tab' );
				b.setAttribute( 'aria-selected', t.key === view.tab ? 'true' : 'false' );
				b.addEventListener( 'click', function () {
					view.tab = t.key;
					render();
				} );
				nav.appendChild( b );
			} );
			clear( panel );
			( { list: renderList, plan: renderPlan, swap: renderSwap, level: renderLevel, profile: renderProfile } )[ view.tab ]();
		}

		/** A brainrot as one line: picture, name, icons, level, a figure. */
		function line( row, right, sub, tag, note ) {
			var box = el( 'div', 'ffb-base-line' );
			box.appendChild( brainrotPic( cat, row.name, 36 ) );
			var mid = el( 'div', 'ffb-base-line-mid' );
			var name = el( 'div', 'ffb-base-line-name', row.name );
			if ( !isDefault( row.mutation ) ) {
				name.appendChild( el( 'span', 'ffb-base-muted', ' · ' + row.mutation ) );
			}
			mid.appendChild( name );
			var meta = el( 'div', 'ffb-base-line-meta' );
			meta.appendChild( permIcons( cat, row ) );
			meta.appendChild( el( 'span', 'ffb-base-lv', ( row.evolution ? 'Evo ' + row.evolution + ' · ' : '' ) + 'Lv ' + row.level ) );
			// one tag, or several side by side
			( Array.isArray( tag ) ? tag : tag ? [ tag ] : [] ).forEach( function ( t ) {
				meta.appendChild( el( 'span', 'ffb-base-tag ffb-base-tag-' + t.kind, t.text ) );
			} );
			mid.appendChild( meta );
			if ( note ) {
				mid.appendChild( el( 'div', 'ffb-base-muted ffb-base-small ffb-base-line-note', note ) );
			}
			box.appendChild( mid );
			var fig = el( 'div', 'ffb-base-line-fig' );
			fig.appendChild( el( 'div', 'ffb-base-line-value', right ) );
			if ( sub ) {
				fig.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', sub ) );
			}
			box.appendChild( fig );
			return box;
		}

		// ---- quick add: built once, so typing isn't lost when the list redraws
		var draft = { name: '', mutation: cat.defaultMutation, traits: [], evolution: 0, level: 1 };
		var quick = null;
		function buildQuick() {
			var i;
			for ( i = 0; i < data.maxTraits; i++ ) {
				draft.traits.push( '' );
			}
			var box = el( 'div', 'ffb-base-quick' );
			box.appendChild( el( 'div', 'ffb-trade-label', 'Quick add' ) );
			var namePick = buildSearchPicker( {
				id: uid + 'qn',
				current: '',
				inputClass: 'ffb-trade-input ffb-base-quick-name',
				placeholder: 'Type a brainrot',
				noun: 'brainrot',
				search: function ( q ) {
					return searchBrainrots( cat, q ).map( function ( m ) {
						return { value: m.value, meta: m.look ? m.rarity + ' · looks like: ' + m.look : m.rarity,
							color: m.color, icon: cat.brainrotIcon[ m.value ] || null, right: m.base || 'no base yet' };
					} );
				},
				lead: function ( v ) {
					return v && cat.brainrotIcon[ v ] ? { icon: cat.brainrotIcon[ v ] } : null;
				},
				exact: function ( text ) {
					return exactBrainrot( cat, text );
				},
				onPick: function ( v ) {
					draft.name = v;
				}
			} );
			box.appendChild( namePick.node );
			var grid = el( 'div', 'ffb-base-quick-grid ffb-base-quick-grid-evo' );
			var mutPick = buildSearchPicker( {
				id: uid + 'qm',
				current: draft.mutation,
				inputClass: 'ffb-trade-input',
				placeholder: 'Mutation',
				noun: 'mutation',
				search: function ( q ) {
					return searchMutations( cat, q );
				},
				lead: function ( v ) {
					return cat.mutationIcon[ v ] || cat.mutationColor[ v ] ?
						{ icon: cat.mutationIcon[ v ] || null, color: cat.mutationColor[ v ] || null } : null;
				},
				exact: function ( text ) {
					return exactName( cat.mutations, text );
				},
				onPick: function ( v ) {
					draft.mutation = v;
				}
			} );
			mutPick.input.setAttribute( 'aria-label', 'Mutation' );
			grid.appendChild( mutPick.node );
			var traitPicks = [];
			function traitPick( slot ) {
				var tp = buildSearchPicker( {
					id: uid + 'qt' + slot,
					current: '',
					inputClass: 'ffb-trade-input',
					placeholder: 'Trait ' + ( slot + 1 ),
					noun: 'trait',
					label: function ( v ) {
						return traitPickLabel( cat, v );
					},
					lead: function ( v ) {
						return v && cat.traitIcon[ v ] ? { icon: cat.traitIcon[ v ] } : null;
					},
					search: function ( q ) {
						return searchTraits( cat, draft, slot, q );
					},
					exact: function ( text ) {
						var t = String( text || '' ).trim().replace( /^[^A-Za-z]+/, '' );
						if ( t === '' || squash( t ) === 'notrait' ) {
							return '';
						}
						return exactName( cat.traits, t );
					},
					onPick: function ( v ) {
						draft.traits[ slot ] = v;
					}
				} );
				tp.input.setAttribute( 'aria-label', 'Trait ' + ( slot + 1 ) );
				return tp;
			}
			for ( i = 0; i < data.maxTraits; i++ ) {
				traitPicks.push( traitPick( i ) );
				grid.appendChild( traitPicks[ i ].node );
			}
			var lvl = el( 'input', 'ffb-trade-input ffb-base-quick-level' );
			lvl.type = 'number';
			lvl.min = '1';
			lvl.max = String( data.maxLevel );
			lvl.value = '1';
			lvl.setAttribute( 'inputmode', 'numeric' );
			lvl.setAttribute( 'aria-label', 'Level' );
			grid.appendChild( lvl );
			var evoPick = quickEvoPicker( cat, uid + 'qe', function ( v ) {
				draft.evolution = v;
			} );
			grid.appendChild( evoPick.node );
			box.appendChild( grid );
			var foot = el( 'div', 'ffb-base-quick-foot' );
			var addBtn = el( 'button', 'ffb-trade-add ffb-base-quick-add', 'Add' );
			addBtn.type = 'button';
			var inBaseLabel = el( 'label', 'ffb-base-check' );
			var inBase = el( 'input' );
			inBase.type = 'checkbox';
			inBaseLabel.appendChild( inBase );
			inBaseLabel.appendChild( el( 'span', null, ' In my base' ) );
			foot.appendChild( addBtn );
			foot.appendChild( inBaseLabel );
			box.appendChild( foot );
			var said = el( 'p', 'ffb-base-muted ffb-base-small ffb-base-quick-said' );
			said.setAttribute( 'aria-live', 'polite' );
			said.textContent = 'Press Enter or Add; the boxes clear for the next one.';
			box.appendChild( said );

			function add() {
				var name = draft.name || exactBrainrot( cat, namePick.input.value );
				var n = parseLevel( cat, lvl.value );
				var row;
				if ( !name ) {
					said.textContent = 'Pick a brainrot from the list first.';
					namePick.input.focus();
					return;
				}
				if ( rows.length >= COLLECTION_MAX ) {
					said.textContent = COLLECTION_MAX + ' is the most a list can hold.';
					return;
				}
				row = withId( {
					name: name,
					mutation: draft.mutation,
					traits: draft.traits.slice(),
					evolution: draft.evolution,
					level: n === null ? 1 : n,
					notes: [],
					inBase: !!inBase.checked
				} );
				rows.push( row );
				lastInBase = row.inBase;
				// the first brainrot turns the start page into the list:
				// keep the quick-add bar open there
				view.adding = true;
				save();
				said.textContent = 'Added ' + describeSaved( cat, row ) + '.';
				draft.name = '';
				draft.mutation = cat.defaultMutation;
				draft.traits = draft.traits.map( function () {
					return '';
				} );
				namePick.set( '' );
				namePick.input.value = '';
				mutPick.set( cat.defaultMutation );
				traitPicks.forEach( function ( tp ) {
					tp.set( '' );
				} );
				draft.evolution = 0;
				evoPick.set( '0' );
				lvl.value = '1';
				renderNavOnly();
				if ( view.tab === 'list' ) {
					renderListBody();
				}
				namePick.input.focus();
			}
			addBtn.addEventListener( 'click', add );
			lvl.addEventListener( 'keydown', function ( e ) {
				if ( e && e.key === 'Enter' ) {
					add();
				}
			} );
			box.addEventListener( 'keydown', function ( e ) {
				// Enter on a closed picker adds; an open list's Enter picks first
				if ( e && e.key === 'Enter' && e.target !== lvl && e.target.getAttribute &&
					e.target.getAttribute( 'aria-expanded' ) === 'false' ) {
					add();
				}
			} );
			inBase.checked = lastInBase;
			return box;
		}

		function renderNavOnly() {
			var t = view.tab;
			renderSummary();
			if ( wide ) {
				tabButtons( sideTabs() );
				renderStats();
				return;
			}
			var list = tabs();
			clear( nav );
			list.forEach( function ( x ) {
				var b = el( 'button', 'ffb-base-tab' + ( x.key === t ? ' ffb-base-tab-on' : '' ), x.label );
				b.type = 'button';
				b.setAttribute( 'role', 'tab' );
				b.setAttribute( 'aria-selected', x.key === t ? 'true' : 'false' );
				b.addEventListener( 'click', function () {
					view.tab = x.key;
					render();
				} );
				nav.appendChild( b );
			} );
		}

		// ---- Brainrots ----------------------------------------------------
		var listBody = null;
		function renderList() {
			if ( !quick ) {
				quick = buildQuick();
			}
			if ( !rows.length ) {
				panel.appendChild( el( 'h3', 'ffb-base-h', 'Plan your base' ) );
				panel.appendChild( el( 'p', 'ffb-base-muted', 'Add your brainrots once. The page then shows what to upgrade next, which to keep, and more. ' +
					( store.kind === 'account' ? 'It’s saved to your Fandom account, so it’s there on any device.' : 'It all stays on this device.' ) ) );
				var steps = el( 'ol', 'ffb-base-steps' );
				[ [ 'Add your brainrots', 'The ones on your base, and any in Storage you might use.' ],
					[ 'Tell us about your base (optional)', 'Slots, rebirth, finished indexes, friends and VIP, in Profile, make the time estimates real.' ],
					[ 'Get your plan', 'New tabs appear as soon as they have something to tell you.' ] ].forEach( function ( s, k ) {
					var li = el( 'li', 'ffb-base-step' + ( k === 0 ? ' ffb-base-step-on' : '' ) );
					li.appendChild( el( 'span', 'ffb-base-step-n', String( k + 1 ) ) );
					var txt = el( 'span' );
					txt.appendChild( el( 'strong', null, s[ 0 ] ) );
					txt.appendChild( el( 'span', 'ffb-base-muted ffb-base-small ffb-base-block', s[ 1 ] ) );
					li.appendChild( txt );
					steps.appendChild( li );
				} );
				panel.appendChild( steps );
				panel.appendChild( quick );
				var moving = el( 'p', 'ffb-base-muted ffb-base-small' );
				moving.textContent = 'Moving from another device? Paste your list in Profile.';
				panel.appendChild( moving );
				listBody = null;
				return;
			}
			var bar = el( 'div', 'ffb-base-bar' );
			var addToggle = el( 'button', 'ffb-trade-add', view.adding ? 'Close quick add' : '+ Add' );
			addToggle.type = 'button';
			addToggle.addEventListener( 'click', function () {
				view.adding = !view.adding;
				render();
			} );
			bar.appendChild( addToggle );
			var sortPick = buildListPicker( uid + 'sort', BASE_SORTS, view.sort, 'ffb-trade-input ffb-base-sort', function ( v ) {
				view.sort = v;
				renderListBody();
			} );
			sortPick.input.setAttribute( 'aria-label', 'Sort by' );
			bar.appendChild( sortPick.node );
			panel.appendChild( bar );
			if ( view.adding ) {
				panel.appendChild( quick );
			}
			listBody = el( 'div', 'ffb-base-list' );
			panel.appendChild( listBody );
			renderListBody();
		}

		function renderListBody() {
			if ( !listBody ) {
				render();
				return;
			}
			clear( listBody );
			var inBaseCount = rows.filter( function ( r ) {
				return r.inBase;
			} ).length;
			var chips = el( 'div', 'ffb-base-chips' );
			[ [ 'all', 'All ' + rows.length ], [ 'base', 'In base ' + inBaseCount ], [ 'storage', 'Storage ' + ( rows.length - inBaseCount ) ] ].forEach( function ( c ) {
				var b = el( 'button', 'ffb-base-chip' + ( view.filter === c[ 0 ] ? ' ffb-base-chip-on' : '' ), c[ 1 ] );
				b.type = 'button';
				b.setAttribute( 'aria-pressed', view.filter === c[ 0 ] ? 'true' : 'false' );
				b.addEventListener( 'click', function () {
					view.filter = c[ 0 ];
					renderListBody();
				} );
				chips.appendChild( b );
			} );
			listBody.appendChild( chips );
			var plan = planBase( cat, rows, profile.slots );
			var order = view.sort === 'level' ? rows.slice().sort( function ( a, b ) {
				return b.level - a.level;
			} ) : sortCollection( cat, rows, view.sort );
			order.filter( function ( r ) {
				return view.filter === 'all' || ( view.filter === 'base' ) === !!r.inBase;
			} ).forEach( function ( row ) {
				var s = collectionStats( cat, row );
				var strength = rowStrength( cat, row );
				var right, sub;
				var tag = row.inBase ? { kind: 'in', text: 'In base' } : { kind: 'store', text: 'Storage' };
				if ( plan.marked && plan.moveIn.indexOf( row ) !== -1 ) {
					tag = { kind: 'movein', text: 'Move in' };
				} else if ( plan.swapOut.indexOf( row ) !== -1 ) {
					tag = { kind: 'out', text: 'Swap out' };
				}
				// level 200 at the last evolution: nothing left to buy (user, 2026-10-20)
				if ( row.level >= data.maxLevel && row.evolution >= data.maxEvolution ) {
					tag = [ tag, { kind: 'max', text: 'Fully upgraded' } ];
				}
				if ( strength === null ) {
					right = '—';
					sub = 'no measured income';
				} else if ( view.sort === 'income' ) {
					right = money( s.now ) + '/s';
					sub = 'now';
				} else if ( view.sort === 'ceiling' ) {
					right = money( s.ceil ) + '/s';
					sub = 'fully upgraded';
				} else {
					right = money( strength ) + '/s';
					sub = 'at level 1';
				}
				var item = el( 'div', 'ffb-base-item' );
				var open = el( 'button', 'ffb-base-item-open' );
				open.type = 'button';
				open.setAttribute( 'aria-expanded', view.editing === row ? 'true' : 'false' );
				open.setAttribute( 'aria-label', 'Edit ' + describeSaved( cat, row ) );
				open.appendChild( line( row, right, sub, tag ) );
				open.addEventListener( 'click', function () {
					view.editing = view.editing === row ? null : row;
					renderListBody();
				} );
				item.appendChild( open );
				if ( view.editing === row ) {
					item.appendChild( editor( row ) );
				}
				listBody.appendChild( item );
			} );
		}

		function editor( row ) {
			var wrap = el( 'div', 'ffb-base-editor' );
			var card = buildRowCard( cat, uid + 'e' + row.id, row, {
				onChange: function () {
					row.notes = [];
					card.update( rowView( cat, row, collectionStats( cat, row ) ) );
					save();
				},
				onRemove: function () {
					var at = rows.indexOf( row );
					if ( at !== -1 ) {
						rows.splice( at, 1 );
					}
					view.editing = null;
					save();
					render();
				}
			}, { showCeiling: true } );
			card.update( rowView( cat, row, collectionStats( cat, row ) ) );
			wrap.appendChild( card.node );
			var foot = el( 'div', 'ffb-base-quick-foot' );
			var lab = el( 'label', 'ffb-base-check' );
			var box = el( 'input' );
			box.type = 'checkbox';
			box.checked = !!row.inBase;
			box.addEventListener( 'change', function () {
				row.inBase = !!box.checked;
				save();
			} );
			lab.appendChild( box );
			lab.appendChild( el( 'span', null, ' In my base' ) );
			var done = el( 'button', 'ffb-trade-add', 'Done' );
			done.type = 'button';
			done.addEventListener( 'click', function () {
				view.editing = null;
				render();
			} );
			foot.appendChild( lab );
			foot.appendChild( done );
			wrap.appendChild( foot );
			return wrap;
		}

		// ---- Upgrade plan: best value first (user, 2026-10-20) ---------------
		var PLAN_SHOW = 6;
		var PLAN_CASH_KEY = 'ffb-plan-cash';

		/** "~19 h" or "1.0 h to 16 h" */
		function payRange( a, b ) {
			var x = playTime( a );
			var y = playTime( b );
			return x === y || b < a * 1.25 ? '~' + y : x + ' to ' + y;
		}

		function partWhat( p, evolve ) {
			return evolve ? 'Evo ' + p.evo + ' → ' + ( p.evo + 1 ) : 'Lv ' + p.from + ' → ' + p.to;
		}

		/** Why a part sits where it does, as a tag, or null. */
		function partTag( p, evolve ) {
			if ( evolve ) {
				return { kind: 'movein', text: 'pays back in ~' + playTime( p.lastPay ) };
			}
			if ( p.lastPay > PLAN_SLOW_HOURS * 3600 ) {
				return { kind: 'out', text: 'slow: a better catch may beat this' };
			}
			if ( p.jumps && p.from >= data.newCostFrom && p.from < data.lateCostFrom ) {
				return { kind: 'in', text: 'cheaper from level ' + data.newCostFrom };
			}
			if ( p.jumps && p.evo > 0 ) {
				return { kind: 'in', text: 'Evo ' + p.evo + ': pays back faster' };
			}
			return null;
		}

		/** The brainrots the plan works on: the ones worth keeping, strongest first. */
		function planKeepers() {
			return planBase( cat, rows, profile.slots ).ranked.slice( 0, profile.slots ).map( function ( k ) {
				return k.row;
			} );
		}

		/** The brainrots earning right now: the ticked ones, else the keepers. */
		function planEarning( keepers ) {
			var marked = rows.filter( function ( r ) {
				return r.inBase && rowStrength( cat, r ) !== null;
			} );
			return marked.length ? marked : keepers;
		}

		function renderPlan() {
			var mult = baseMultiplier( profile );
			var m = planMaths( cat, profile, mult );
			var keepers = planKeepers();
			var goal = view.goal;
			var head = el( 'div', 'ffb-base-bar' );
			var goalPick = buildListPicker( uid + 'goal', [ { value: '175', label: 'Goal: level 175' }, { value: '200', label: 'Goal: level 200' } ],
				String( goal ), 'ffb-trade-input ffb-base-sort', function ( v ) {
					view.goal = parseInt( v, 10 );
					render();
				} );
			goalPick.input.setAttribute( 'aria-label', 'Goal level' );
			head.appendChild( goalPick.node );
			panel.appendChild( head );
			var steps = planSteps( cat, m, keepers, goal, 4000 );
			var now = planEarning( keepers ).reduce( function ( t, r ) {
				return t + ( m.income( r, r.evolution, r.level ) || 0 );
			}, 0 );

			if ( !steps.length ) {
				panel.appendChild( el( 'p', 'ffb-base-note', keepers.length ?
					'Everything you’re keeping is done: level ' + data.maxLevel + ' and evolution ' + data.maxEvolution + '. Nice!' :
					'Add the brainrots you have, and the plan shows what to upgrade first.' ) );
			} else {
				// the first thing to buy: the first brainrot of the first step
				var st0 = steps[ 0 ];
				var first = st0.parts[ 0 ];
				var card = el( 'div', 'ffb-base-next' );
				card.appendChild( el( 'div', 'ffb-trade-label ffb-base-accent', st0.evolve ? 'Evolve next' : 'Upgrade next' ) );
				var who = el( 'div', 'ffb-base-next-who' );
				who.appendChild( brainrotPic( cat, first.row.name, 52 ) );
				var whoText = el( 'div' );
				whoText.appendChild( el( 'div', 'ffb-base-next-name', first.row.name ) );
				var detail = el( 'div', 'ffb-base-line-meta' );
				detail.appendChild( permIcons( cat, first.row ) );
				if ( !first.row.inBase && rows.some( function ( r ) {
					return r.inBase;
				} ) ) {
					detail.appendChild( el( 'span', 'ffb-base-tag ffb-base-tag-store', 'In Storage: place it to upgrade' ) );
				}
				whoText.appendChild( detail );
				who.appendChild( whoText );
				card.appendChild( who );
				var big = el( 'div', 'ffb-base-next-lv' );
				big.appendChild( el( 'span', null, ( first.evo && !st0.evolve ? 'Evo ' + first.evo + ' · ' : '' ) + partWhat( first, st0.evolve ) ) );
				big.appendChild( fullTip( el( 'span', 'ffb-base-muted ffb-base-small', money( first.cost ) ), first.cost, false, true ) );
				card.appendChild( big );
				var why = st0.evolve ? 'Nothing left below your goal pays back faster than this evolution. Save ' + money( first.cost ) +
					' first, then evolve and buy it straight back to level ' + data.maxLevel + ' so it never stops earning. ' :
					first.jumps && first.from >= data.newCostFrom && first.from < data.lateCostFrom ?
						'Upgrades get cheaper from level ' + data.newCostFrom + ', so these pay back faster than your lower-level brainrots’ next levels. ' :
						first.jumps && first.evo > 0 ? 'Evolved brainrots’ upgrades pay back faster, so these beat your lower-level brainrots’ next levels. ' :
							'These pay for themselves faster than any other upgrade in your base. ';
				card.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', why + '+' + money( first.gain ) + '/s · ' +
					( st0.evolve ? 'pays back in ~' + playTime( first.lastPay ) : 'each pays back in ' + payRange( st0.firstPay, first.lastPay ) ) + ' of play.' ) );
				panel.appendChild( card );

				var rest = st0.parts.length > 1 ? [ { parts: st0.parts.slice( 1 ), evolve: false, firstPay: st0.firstPay,
					lastPay: st0.lastPay, cost: st0.cost - first.cost, alongside: true } ] : [];
				rest.concat( steps.slice( 1, PLAN_SHOW ) ).forEach( function ( st ) {
					panel.appendChild( el( 'div', 'ffb-base-muted ffb-base-small ffb-base-gap ffb-base-plan-head',
						( st.alongside ? 'Alongside it' : st.evolve ? 'Then evolve' : 'Then' ) + ' · ' + money( st.cost ) +
						( st.evolve ? '' : ' · each pays back in ' + payRange( st.firstPay, st.lastPay ) ) ) );
					var list = el( 'ol', 'ffb-base-plan' );
					st.parts.forEach( function ( p ) {
						var li = el( 'li', 'ffb-base-plan-step' );
						var note = '+' + money( p.gain ) + '/s';
						if ( st.evolve ) {
							note = 'Save ' + money( p.cost ) + ' first, then evolve and buy it straight back to level ' + data.maxLevel + '. ' + note;
						}
						li.appendChild( line( rowAt( p.row, p.evo, p.from ), partWhat( p, st.evolve ), money( p.cost ), partTag( p, st.evolve ), note ) );
						list.appendChild( li );
					} );
					panel.appendChild( list );
				} );
				if ( steps.length > PLAN_SHOW ) {
					var later = steps.slice( PLAN_SHOW );
					var evos = later.filter( function ( x ) {
						return x.evolve;
					} ).length;
					panel.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', '…then ' + later.length + ' more steps' +
						( evos ? ', including ' + evos + ( evos === 1 ? ' evolution' : ' evolutions' ) : '' ) + ' (' + money( later.reduce( function ( t, x ) {
							return t + x.cost;
						}, 0 ) ) + ').' ) );
				}
				// a brainrot waiting at the top level whose evolution isn't in view yet
				var shownEvo = steps.slice( 0, PLAN_SHOW ).some( function ( x ) {
					return x.evolve;
				} );
				var ready = keepers.filter( function ( r ) {
					return r.level >= data.maxLevel && r.evolution < data.maxEvolution;
				} )[ 0 ];
				var climb = ready ? m.climb( ready, ready.evolution + 1 ) : null;
				if ( ready && !shownEvo && climb !== null ) {
					panel.appendChild( el( 'p', 'ffb-base-note', ready.name + ' is at level ' + data.maxLevel + '. For income, evolving it to Evo ' +
						( ready.evolution + 1 ) + ' comes after the upgrades above, since they pay back faster. When you get there, save ' +
						money( climb ) + ' first so you can buy it straight back to level ' + data.maxLevel + '.' ) );
				}
			}
			var notes = [ goal > 175 ? 'Goal 200: levels above 175 add only 3% each, so they come late.' :
				'Stops at level 175: after that each level adds only 3%.' ];
			notes.push( 'Evolving starts again at level 1; for income it comes last, your best brainrot first, all the way to Evo ' +
				data.maxEvolution + '. Evolved brainrots are also worth more in trades.' );
			notes.push( 'Payback times are hours of play at your base’s income, ' + money( now ) + '/s with your ×' + mult + ' multiplier.' );
			if ( !profile.rebirth && !profile.indexes.length ) {
				notes.push( 'Add your rebirth and finished indexes in Profile for real times.' );
			}
			panel.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', notes.join( ' ' ) ) );
			renderPlanCash( m, keepers, goal );
		}

		/** "What can my cash do?" under the plan: the plan's buys, as far as the cash goes. */
		function renderPlanCash( m, keepers, goal ) {
			if ( !keepers.length ) {
				return;
			}
			var box = el( 'div', 'ffb-base-card ffb-base-cash' );
			box.appendChild( el( 'div', 'ffb-trade-label', 'What can my cash do?' ) );
			var row = el( 'div', 'ffb-base-cash-row' );
			var inp = el( 'input', 'ffb-trade-input' );
			inp.type = 'text';
			inp.placeholder = 'e.g. 2.5Qa';
			inp.setAttribute( 'inputmode', 'decimal' );
			inp.value = readStorage( storage, PLAN_CASH_KEY ) || '';
			row.appendChild( field( uid + 'pc', 'Cash to spend', inp, 'ffb-base-cash-field' ).node );
			var opts = [ { value: 'base', label: 'My base, following the plan' } ].concat( keepers.map( function ( r, i ) {
				return { value: String( i ), label: r.name + ' (' + ( isDefault( r.mutation ) ? '' : r.mutation + ', ' ) +
					( r.evolution ? 'Evo ' + r.evolution + ', ' : '' ) + 'level ' + r.level + ')' };
			} ) );
			if ( view.cashOn !== 'base' && !keepers[ Number( view.cashOn ) ] ) {
				view.cashOn = 'base';
			}
			var on = buildListPicker( uid + 'po', opts, view.cashOn, 'ffb-trade-input', function ( v ) {
				view.cashOn = v;
				show();
			} );
			row.appendChild( pickerField( uid + 'po', 'Spend it on', on, 'ffb-base-cash-field' ).node );
			box.appendChild( row );
			var out = el( 'div', 'ffb-base-cash-out' );
			box.appendChild( out );
			function show() {
				clear( out );
				var cash = parseMoney( inp.value );
				if ( cash === null || !( cash > 0 ) ) {
					out.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', 'Type how much you have to see how far the plan gets, or pick one brainrot.' ) );
					return;
				}
				var whole = view.cashOn === 'base';
				var list = whole ? keepers : [ keepers[ Number( view.cashOn ) ] ];
				var r = spendPlan( cat, m, list, whole ? goal : data.maxLevel, cash );
				var changed = r.items.filter( function ( it ) {
					return it.level !== it.row.level || it.evo !== it.row.evolution;
				} );
				if ( !changed.length ) {
					out.appendChild( el( 'p', null, !r.stop ? 'Nothing left to buy.' : r.stop.kind === 'evo' ?
						'Not enough to evolve ' + r.stop.it.row.name + ' yet: buying it back to level ' + data.maxLevel + ' costs ' +
							money( r.stop.cost ) + '. Save up first so it never stops earning.' :
						'Not enough for the next upgrade yet: ' + r.stop.it.row.name + '’s costs ' + money( r.stop.cost ) + '.' ) );
					return;
				}
				out.appendChild( el( 'p', 'ffb-base-cash-head', 'It buys:' ) );
				var ul = el( 'ul', 'ffb-base-cash-list' );
				changed.forEach( function ( it ) {
					var li = el( 'li' );
					if ( it.evo > it.row.evolution ) {
						li.appendChild( document.createTextNode( it.row.name + ': Evo ' + it.row.evolution + ' → ' ) );
						li.appendChild( el( 'b', 'ffb-base-accent', 'Evo ' + it.evo ) );
						li.appendChild( document.createTextNode( ', bought back to level ' + it.level ) );
					} else {
						li.appendChild( document.createTextNode( it.row.name + ( it.evo ? ' (Evo ' + it.evo + ')' : '' ) + ': level ' + it.row.level + ' → ' ) );
						li.appendChild( el( 'b', 'ffb-base-accent', String( it.level ) ) );
					}
					ul.appendChild( li );
				} );
				out.appendChild( ul );
				var before = 0;
				var after = 0;
				( whole ? planEarning( keepers ) : list ).forEach( function ( row ) {
					var it = r.items.filter( function ( x ) {
						return x.row === row;
					} )[ 0 ];
					before += m.income( row, row.evolution, row.level ) || 0;
					after += m.income( row, it ? it.evo : row.evolution, it ? it.level : row.level ) || 0;
				} );
				var tot = el( 'ul', 'ffb-base-cash-list ffb-base-cash-totals' );
				tot.appendChild( el( 'li', null, 'Costs ' + money( r.spent ) + ' · ' + money( r.left ) + ' left over' ) );
				tot.appendChild( el( 'li', null, ( whole ? 'Your base earns ' : 'It earns ' ) + money( before ) + '/s now → ' +
					money( after ) + '/s (+' + money( after - before ) + '/s)' ) );
				if ( r.stop ) {
					tot.appendChild( el( 'li', 'ffb-base-muted', r.stop.kind === 'evo' ? 'Next: evolving ' + r.stop.it.row.name + '. Save ' +
						money( r.stop.cost ) + ' for the climb back first.' :
						'Next: ' + r.stop.it.row.name + ' level ' + r.stop.from + ' → ' + ( r.stop.from + 1 ) + ' for ' + money( r.stop.cost ) + '.' ) );
				}
				out.appendChild( tot );
			}
			inp.addEventListener( 'input', function () {
				writeStorage( storage, PLAN_CASH_KEY, inp.value );
				show();
			} );
			show();
			panel.appendChild( box );
		}

		// ---- Keep or swap -----------------------------------------------------
		function renderSwap() {
			var plan = planBase( cat, rows, profile.slots );
			var keepers = plan.ranked.slice( 0, profile.slots ).map( function ( p ) {
				return p.row;
			} );
			panel.appendChild( el( 'p', null, 'You’ve added ' + plan.ranked.length + ' brainrots and your base holds ' + profile.slots +
				'. Keep the ' + profile.slots + ' that earn the most per level:' ) );
			function group( title, kind, list ) {
				if ( !list.length ) {
					return;
				}
				panel.appendChild( el( 'div', 'ffb-trade-label ffb-base-' + kind, title + ' · ' + list.length ) );
				list.forEach( function ( r ) {
					var card = el( 'div', 'ffb-base-card' );
					var tagText = cat.brainrots[ r.name ].rarity;
					card.appendChild( line( r, money( rowStrength( cat, r ) ) + '/s', 'at level 1', { kind: 'rarity', text: tagText } ) );
					panel.appendChild( card );
				} );
			}
			if ( plan.marked ) {
				group( 'Move into your base', 'good', plan.moveIn );
				group( 'Swap out', 'bad', plan.swapOut );
				if ( !plan.moveIn.length && !plan.swapOut.length ) {
					panel.appendChild( el( 'p', 'ffb-base-note', 'Your base already holds your strongest brainrots.' ) );
				}
			} else {
				group( 'Leave these in Storage', 'bad', plan.ranked.slice( profile.slots ).map( function ( p ) {
					return p.row;
				} ) );
			}
			var mark2 = el( 'button', 'ffb-base-wide', plan.marked ? 'I’ve swapped them · update my list' : 'Mark my best ' + profile.slots + ' as in my base' );
			mark2.type = 'button';
			mark2.addEventListener( 'click', function () {
				rows.forEach( function ( r ) {
					r.inBase = keepers.indexOf( r ) !== -1;
				} );
				save();
				render();
			} );
			if ( !plan.marked || plan.moveIn.length || plan.swapOut.length ) {
				panel.appendChild( mark2 );
			}
			var lesson = rarityLesson( cat, rows );
			if ( lesson ) {
				var box = el( 'div', 'ffb-base-lesson' );
				box.appendChild( el( 'strong', null, 'Rarity isn’t everything' ) );
				var pair = el( 'div', 'ffb-base-pair' );
				[ [ lesson.rare, 'bad' ], [ lesson.common, 'good' ] ].forEach( function ( x ) {
					var cell = el( 'div', 'ffb-base-pair-cell' );
					cell.appendChild( brainrotPic( cat, x[ 0 ].name, 44 ) );
					cell.appendChild( el( 'div', 'ffb-base-small', x[ 0 ].name ) );
					cell.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', cat.brainrots[ x[ 0 ].name ].rarity ) );
					cell.appendChild( permIcons( cat, x[ 0 ] ) );
					cell.appendChild( el( 'div', 'ffb-base-line-value ffb-base-' + x[ 1 ], money( rowStrength( cat, x[ 0 ] ) ) + '/s' ) );
					pair.appendChild( cell );
				} );
				box.appendChild( pair );
				box.appendChild( el( 'p', 'ffb-base-small', 'The ' + cat.brainrots[ lesson.common.name ].rarity + ' earns ' +
					Math.round( lesson.times ) + ' times as much as the ' + cat.brainrots[ lesson.rare.name ].rarity +
					' at every level: a brainrot’s mutation and traits count for more than its rarity.' ) );
				panel.appendChild( box );
			}
			var w = plan.weakest;
			if ( w ) {
				var check = el( 'div', 'ffb-base-card ffb-base-checkbox' );
				check.appendChild( el( 'p', 'ffb-base-small', 'Your weakest keeper is ' + describeSaved( cat, w.row ) + ', at ' + money( w.strength ) + '/s at level 1.' ) );
				var lvlIn = el( 'input', 'ffb-trade-input ffb-base-num' );
				lvlIn.type = 'number';
				lvlIn.min = '1';
				lvlIn.max = String( data.maxLevel );
				lvlIn.value = String( view.check );
				lvlIn.setAttribute( 'inputmode', 'numeric' );
				var f = field( uid + 'chk', 'Check a card at level', lvlIn, 'ffb-base-field' );
				check.appendChild( f.node );
				var out = el( 'p', 'ffb-base-need' );
				out.setAttribute( 'aria-live', 'polite' );
				function say() {
					out.textContent = 'To make your top ' + profile.slots + ', its card at level ' + view.check + ' must show more than ' +
						money( plan.need( view.check ) ) + '/s.';
				}
				lvlIn.addEventListener( 'input', function () {
					var n = parseLevel( cat, lvlIn.value );
					if ( n !== null ) {
						view.check = n;
						say();
					}
				} );
				say();
				check.appendChild( out );
				panel.appendChild( check );
			}
		}

		// ---- Same level ----------------------------------------------------------
		function renderLevel() {
			var plan = planBase( cat, rows, profile.slots );
			var list = plan.ranked.slice( 0, profile.slots );
			panel.appendChild( el( 'p', null, 'Your ' + ( plan.over ? 'keepers' : 'brainrots' ) + ' side by side at the same level, so you can see which earn the most.' ) );
			var chips = el( 'div', 'ffb-base-chips' );
			SAME_LEVELS.forEach( function ( L ) {
				var b = el( 'button', 'ffb-base-chip' + ( view.level === L ? ' ffb-base-chip-on' : '' ), 'Lv ' + L );
				b.type = 'button';
				b.setAttribute( 'aria-pressed', view.level === L ? 'true' : 'false' );
				b.addEventListener( 'click', function () {
					view.level = L;
					render();
				} );
				chips.appendChild( b );
			} );
			var other = el( 'input', 'ffb-trade-input ffb-base-num' );
			other.type = 'number';
			other.min = '1';
			other.max = String( data.maxLevel );
			other.placeholder = 'Other';
			other.setAttribute( 'aria-label', 'Other level' );
			if ( SAME_LEVELS.indexOf( view.level ) === -1 ) {
				other.value = String( view.level );
			}
			other.addEventListener( 'change', function () {
				var n = parseLevel( cat, other.value );
				if ( n !== null ) {
					view.level = n;
					render();
				}
			} );
			chips.appendChild( other );
			panel.appendChild( chips );
			panel.appendChild( el( 'div', 'ffb-trade-label ffb-base-gap', 'At level ' + view.level ) );
			list.forEach( function ( p ) {
				var s = collectionStats( cat, p.row );
				panel.appendChild( line( p.row, money( p.strength * growthFactor( view.level, data ) ) + '/s',
					p.row.level === view.level ? 'now: same' : 'now ' + money( s.now ) + '/s' ) );
			} );
		}

		// ---- Profile ---------------------------------------------------------------
		function renderProfile() {
			panel.appendChild( el( 'p', 'ffb-base-muted', 'All optional. The more you fill in, the more accurate the upgrade times.' ) );
			function numberRow( label, hint, value, lo, hi, onSet ) {
				var r = el( 'div', 'ffb-base-row' );
				var t = el( 'div' );
				t.appendChild( el( 'div', 'ffb-base-row-label', label ) );
				t.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', hint ) );
				var inp = el( 'input', 'ffb-trade-input ffb-base-num' );
				inp.type = 'number';
				inp.min = String( lo );
				inp.max = String( hi );
				inp.value = String( value );
				inp.setAttribute( 'inputmode', 'numeric' );
				inp.setAttribute( 'aria-label', label );
				inp.addEventListener( 'change', function () {
					var n = parseInt( inp.value, 10 );
					if ( n >= lo && n <= hi ) {
						onSet( n );
						saveProfile();
						render();
					} else {
						inp.value = String( value );
					}
				} );
				r.appendChild( t );
				r.appendChild( inp );
				panel.appendChild( r );
			}
			numberRow( 'Slots in your base', 'How many brainrots your base holds', profile.slots, 1, BASE_SLOTS_MAX, function ( n ) {
				profile.slots = n;
			} );
			numberRow( 'Rebirth', 'Your rebirth multiplier: ×' + rebirthMultiplier( profile.rebirth ), profile.rebirth, 0, REBIRTH_MAX, function ( n ) {
				profile.rebirth = n;
			} );
			numberRow( 'Friends in your server', 'In-game friends you’re playing with: +0.5x each', profile.friends, 0, FRIENDS_MAX, function ( n ) {
				profile.friends = n;
			} );
			var idx = el( 'div', 'ffb-base-row ffb-base-row-block' );
			var idxHead = el( 'div', 'ffb-base-row-head' );
			idxHead.appendChild( el( 'span', 'ffb-base-row-label', 'Finished mutation indexes' ) );
			idxHead.appendChild( el( 'span', 'ffb-base-good ffb-base-small', profile.indexes.length + ' · +' + ( 0.5 * profile.indexes.length ) + 'x' ) );
			idx.appendChild( idxHead );
			idx.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', 'Tap the ones you’ve completed.' ) );
			var grid = el( 'div', 'ffb-base-idx' );
			data.mutations.forEach( function ( m ) {
				// Default has an index too, worth the same +0.5x (Index page)
				var name = m[ 0 ];
				var on = profile.indexes.indexOf( name ) !== -1;
				var b = el( 'button', 'ffb-base-idx-btn' + ( on ? ' ffb-base-idx-on' : '' ) );
				b.type = 'button';
				b.setAttribute( 'aria-pressed', on ? 'true' : 'false' );
				b.setAttribute( 'aria-label', name + ' index' );
				b.setAttribute( 'title', name );
				var mk = mark( cat.mutationColor[ name ] || null, cat.mutationIcon[ name ] || null );
				b.appendChild( mk || el( 'span', null, name.charAt( 0 ) ) );
				b.addEventListener( 'click', function () {
					var at = profile.indexes.indexOf( name );
					if ( at === -1 ) {
						profile.indexes.push( name );
					} else {
						profile.indexes.splice( at, 1 );
					}
					saveProfile();
					render();
				} );
				grid.appendChild( b );
			} );
			idx.appendChild( grid );
			panel.appendChild( idx );
			var vipRow = el( 'div', 'ffb-base-row' );
			var vipText = el( 'div' );
			vipText.appendChild( el( 'div', 'ffb-base-row-label', 'VIP' ) );
			vipText.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', 'VIP doubles your base multiplier' ) );
			var vipLab = el( 'label', 'ffb-base-check' );
			var vipBox = el( 'input' );
			vipBox.type = 'checkbox';
			vipBox.checked = !!profile.vip;
			vipBox.addEventListener( 'change', function () {
				profile.vip = !!vipBox.checked;
				saveProfile();
				render();
			} );
			vipLab.appendChild( vipBox );
			vipLab.appendChild( el( 'span', null, ' I have VIP' ) );
			vipRow.appendChild( vipText );
			vipRow.appendChild( vipLab );
			panel.appendChild( vipRow );
			var sum = el( 'div', 'ffb-base-mult' );
			var sumText = el( 'span' );
			sumText.appendChild( el( 'span', 'ffb-trade-label', 'Your base multiplier' ) );
			sumText.appendChild( el( 'span', 'ffb-base-muted ffb-base-small ffb-base-block', multiplierParts( profile ) ) );
			sum.appendChild( sumText );
			sum.appendChild( el( 'span', 'ffb-base-mult-value', '×' + baseMultiplier( profile ) ) );
			panel.appendChild( sum );

			// a price seen in game: sets the price curve past costKnownTo
			var priceBox = el( 'div', 'ffb-base-card ffb-base-price' );
			priceBox.appendChild( el( 'div', 'ffb-base-row-label', 'An upgrade price you’ve seen' ) );
			priceBox.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', 'Prices above level ' + ( data.costKnownTo || data.maxLevel ) +
				' aren’t known. Pick a brainrot above that level and type the +1 price the game shows.' ) );
			var pickable = rows.filter( function ( r ) {
				return rowStrength( cat, r ) !== null && r.level > ( data.costKnownTo || data.maxLevel ) && r.level < data.maxLevel;
			} );
			if ( profile.price ) {
				priceBox.appendChild( el( 'p', 'ffb-base-small', 'Using: ' + profile.price.name + ' at level ' + profile.price.level + ', +1 costs ' + money( profile.price.cost ) + '.' ) );
			}
			if ( pickable.length ) {
				var choice = String( pickable[ 0 ].id );
				var picker = buildListPicker( uid + 'price', pickable.map( function ( r ) {
					return { value: String( r.id ), label: describeSaved( cat, r ) };
				} ), choice, 'ffb-trade-input', function ( v ) {
					choice = v;
				} );
				picker.input.setAttribute( 'aria-label', 'Brainrot' );
				priceBox.appendChild( picker.node );
				var priceIn = el( 'input', 'ffb-trade-input' );
				priceIn.type = 'text';
				priceIn.placeholder = 'The +1 price, e.g. 4.4Ud';
				priceIn.setAttribute( 'aria-label', 'The +1 price' );
				priceBox.appendChild( priceIn );
				var useBtn = el( 'button', 'ffb-trade-add', 'Use this price' );
				useBtn.type = 'button';
				var msg = el( 'p', 'ffb-base-small' );
				useBtn.addEventListener( 'click', function () {
					var cost = parseMoney( priceIn.value );
					var row = rows.filter( function ( r ) {
						return String( r.id ) === choice;
					} )[ 0 ];
					if ( !row || !( cost > 0 ) ) {
						msg.textContent = 'Type the price like the game shows it, e.g. 4.4Ud.';
						return;
					}
					profile.price = { cost: cost, strength: priceStrength( cat, row ), level: row.level, name: row.name };
					saveProfile();
					render();
				} );
				priceBox.appendChild( useBtn );
				priceBox.appendChild( msg );
			} else if ( !profile.price ) {
				priceBox.appendChild( el( 'p', 'ffb-base-muted ffb-base-small', 'None of your brainrots is between level ' +
					( ( data.costKnownTo || data.maxLevel ) + 1 ) + ' and ' + ( data.maxLevel - 1 ) + ' yet.' ) );
			}
			if ( profile.price ) {
				var forget = el( 'button', 'ffb-collection-button', 'Forget this price' );
				forget.type = 'button';
				forget.addEventListener( 'click', function () {
					profile.price = null;
					saveProfile();
					render();
				} );
				priceBox.appendChild( forget );
			}
			// only while the curve stops short of the cap (an older payload)
			if ( ( data.costKnownTo || data.maxLevel ) < data.maxLevel - 1 ) {
				panel.appendChild( priceBox );
			}

			// moving the list
			var move = el( 'div', 'ffb-base-card' );
			move.appendChild( el( 'div', 'ffb-base-row-label', 'Move your list' ) );
			move.appendChild( el( 'div', 'ffb-base-muted ffb-base-small', store.kind === 'account' ?
				'Your list is saved to your Fandom account. Copy it as text to move it to the phone version, or paste a list from there in here.' :
				'Your list is saved on this device only. Copy it as text to keep it or move it, then paste it in on the other device.' ) );
			var copyBtn = el( 'button', 'ffb-collection-button', 'Copy my list as text' );
			copyBtn.type = 'button';
			var copyBox = el( 'textarea', 'ffb-collection-text' );
			copyBox.readOnly = true;
			copyBox.rows = 3;
			copyBox.hidden = true;
			copyBox.setAttribute( 'aria-label', 'Your list as text' );
			copyBtn.addEventListener( 'click', function () {
				copyBox.value = serializeCollection( rows );
				copyBox.hidden = false;
				copyBox.select();
			} );
			move.appendChild( copyBtn );
			move.appendChild( copyBox );
			var pasteBox = el( 'textarea', 'ffb-collection-text' );
			pasteBox.rows = 3;
			pasteBox.placeholder = 'Paste a list here';
			pasteBox.setAttribute( 'aria-label', 'Paste a list' );
			var pasteBtn = el( 'button', 'ffb-collection-button', 'Add to my list' );
			pasteBtn.type = 'button';
			var pasteSaid = el( 'p', 'ffb-base-small' );
			pasteSaid.setAttribute( 'aria-live', 'polite' );
			pasteBtn.addEventListener( 'click', function () {
				var text = pasteBox.value;
				var got;
				if ( text.length > MAX_PASTE_CHARS ) {
					pasteSaid.textContent = 'That’s too long to be a saved list.';
					return;
				}
				got = parseCollection( text, cat );
				if ( got.error ) {
					pasteSaid.textContent = 'That doesn’t look like a saved list. It should start with {"v":1.';
					return;
				}
				var left = addToCollection( rows, got.rows.map( withId ) );
				save();
				pasteSaid.textContent = 'Added ' + plural( got.rows.length - left, 'brainrot', 'brainrots' ) + '.' +
					( left ? ' ' + left + ' didn’t fit.' : '' );
				pasteBox.value = '';
				renderNavOnly();
			} );
			move.appendChild( pasteBox );
			move.appendChild( pasteBtn );
			move.appendChild( pasteSaid );
			panel.appendChild( move );
		}

		render();
		container.appendChild( root );
		return { root: root };
	}

	/* ================================================================
	 * What can I catch? (.ffb-catch, Module:Brainrot catchMount)
	 *
	 * Fishing Skill sets each rarity's base chance per catch; luck then
	 * tilts those chances toward the rarer rarities the skill already
	 * reaches. It never unlocks a rarity. The game's rules (its data chart):
	 *   luck, base pond   = rod + potion + server + event + catch boost, at least 1
	 *   (catch boost: +5 luck at 500 catches, +10 at 800, +15 with both, 5 min each; user)
	 *   luck, Server Pond = rod + server + event + golden zone (no potion)
	 *   an item with no luck (1x) adds nothing; a 2x rod adds 2
	 *   tilt t = min(1, 0.12 * log2(luck))
	 *   each chance p_i is multiplied by (1 / (1 - t))^rank_i (Common 0 ...
	 *   Eternal 8), then all are scaled back to 100%; at t = 1 every catch
	 *   is the rarest rarity with a chance above 0.
	 * Base chances are exact at measured levels; between them they are
	 * interpolated (and the page says "approximate").
	 * ================================================================ */

	var catchCount = 0;

	/** What one item adds to a catch's luck: nothing for a 1x item. */
	function luckPart( x ) {
		var n = Number( x );
		return isFinite( n ) && n > 1 ? n : 0;
	}

	/** A typed extra (server, event, catch boost, golden zone): 0 if blank or bad. */
	function luckExtra( x ) {
		var n = Number( x );
		return isFinite( n ) && n > 0 ? n : 0;
	}

	/**
	 * Total luck. opts: { pond: 'base' | 'server', rod, potion (multipliers,
	 * 1 = none), server, event, boost, golden (amounts added as they are) }.
	 * The base pond never goes below 1; the Server Pond has no minimum (the
	 * maths treats anything under 1 as 1).
	 */
	function catchLuck( opts ) {
		var o = opts || {};
		var sum = luckPart( o.rod ) + luckExtra( o.server ) + luckExtra( o.event );
		if ( o.pond === 'server' ) {
			return sum + luckExtra( o.golden );
		}
		if ( o.pond === 'admin' ) {
			return Math.max( 1, sum + luckPart( o.potion ) + ADMIN_POND.luck );
		}
		return Math.max( 1, sum + luckPart( o.potion ) + luckExtra( o.boost ) );
	}

	/**
	 * The Admin Pond (user, 2026-10-04): +20 luck on top of rod, potion,
	 * server and event luck (a potion's mutation chance only works at the
	 * base pond), and on every catch separate 1-in-N rolls for these, on top
	 * of the skill odds. Celestials can't be caught anywhere else.
	 */
	var ADMIN_POND = { luck: 20, extra: [ [ 'Eternal', 1000 ], [ 'Celestial', 1500 ], [ 'Admin Secret', 2000 ] ] };

	/** How far luck tilts the odds, 0 (none) to 1 (everything to the rarest). */
	function catchTilt( luck ) {
		var l = Number( luck );
		if ( !isFinite( l ) || l <= 1 ) {
			return 0;
		}
		return Math.min( 1, 0.12 * Math.log( l ) / Math.LN2 );
	}

	/** Scales chances so they add up to 100 (left alone when all are 0). */
	function toHundred( odds ) {
		var sum = 0;
		var i;
		for ( i = 0; i < odds.length; i++ ) {
			sum += odds[ i ];
		}
		return sum > 0 ? odds.map( function ( p ) {
			return p * 100 / sum;
		} ) : odds.slice();
	}

	/**
	 * A smooth curve through (xs, ys) that never overshoots the points
	 * (monotone cubic, Fritsch-Carlson): a hump stays a hump, a rise stays a
	 * rise. xs ascending. Outside the points: the end value.
	 */
	function monotoneAt( xs, ys, x ) {
		var n = xs.length;
		var h = [], dl = [], m = [];
		var i, k, t, t2, t3, w1, w2;
		if ( !n ) {
			return 0;
		}
		if ( n === 1 || x <= xs[ 0 ] ) {
			return ys[ 0 ];
		}
		if ( x >= xs[ n - 1 ] ) {
			return ys[ n - 1 ];
		}
		for ( i = 0; i < n - 1; i++ ) {
			h.push( xs[ i + 1 ] - xs[ i ] );
			dl.push( ( ys[ i + 1 ] - ys[ i ] ) / h[ i ] );
		}
		m[ 0 ] = dl[ 0 ];
		m[ n - 1 ] = dl[ n - 2 ];
		for ( i = 1; i < n - 1; i++ ) {
			if ( dl[ i - 1 ] * dl[ i ] <= 0 ) {
				m[ i ] = 0;
			} else {
				w1 = 2 * h[ i ] + h[ i - 1 ];
				w2 = h[ i ] + 2 * h[ i - 1 ];
				m[ i ] = ( w1 + w2 ) / ( w1 / dl[ i - 1 ] + w2 / dl[ i ] );
			}
		}
		k = 0;
		while ( xs[ k + 1 ] < x ) {
			k++;
		}
		t = ( x - xs[ k ] ) / h[ k ];
		t2 = t * t;
		t3 = t2 * t;
		return ( 2 * t3 - 3 * t2 + 1 ) * ys[ k ] + ( t3 - 2 * t2 + t ) * h[ k ] * m[ k ] +
			( -2 * t3 + 3 * t2 ) * ys[ k + 1 ] + ( t3 - t2 ) * h[ k ] * m[ k + 1 ];
	}

	// up to this Fishing Skill the game draws a rarity from a bell curve over
	// the rarity ladder: the next rarity up is always e^(B - 2j) times as
	// likely (j = how far up the ladder), with one number B that grows with
	// skill. Fitted to the readings, it predicts each hidden one within 1
	// point (user's readings, 2026-10-20). Past it the game changes rules.
	var BELL_TOP = 300;
	// a chance under this is too rounded to fit with
	var BELL_MIN = 0.5;

	/** The bell curve fitted to data.levels up to BELL_TOP: { gaps, xs, tilt } or null. */
	function bellFit( data ) {
		if ( has( data, '_bell' ) ) {
			return data._bell;
		}
		var rows = ( data.levels || [] ).filter( function ( r ) {
			return r[ 0 ] <= BELL_TOP;
		} ).slice().sort( function ( a, b ) {
			return a[ 0 ] - b[ 0 ];
		} );
		var n = ( data.rarities || [] ).length;
		var gaps = [], tilt = {}, it, j, sum, cnt;
		for ( j = 0; j < n - 1; j++ ) {
			gaps.push( 0 );
		}
		function ratio( r, j ) {
			var a = Number( r[ 1 ][ j ] ), b = Number( r[ 1 ][ j + 1 ] );
			return a >= BELL_MIN && b >= BELL_MIN ? Math.log( b / a ) : null;
		}
		// each neighbouring pair's log ratio = its fixed gap + the level's tilt;
		// the first gap is 0, so tilt and gaps are found by turns
		for ( it = 0; it < 50; it++ ) {
			tilt = {};
			rows.forEach( function ( r ) {
				var t = 0, c = 0, k, q;
				for ( k = 0; k < n - 1; k++ ) {
					q = ratio( r, k );
					if ( q !== null ) {
						t += q - gaps[ k ];
						c++;
					}
				}
				if ( c ) {
					tilt[ r[ 0 ] ] = t / c;
				}
			} );
			for ( j = 1; j < n - 1; j++ ) {
				sum = 0;
				cnt = 0;
				rows.forEach( function ( r ) {
					var q = ratio( r, j );
					if ( q !== null && has( tilt, r[ 0 ] ) ) {
						sum += q - tilt[ r[ 0 ] ];
						cnt++;
					}
				} );
				if ( cnt ) {
					gaps[ j ] = sum / cnt;
				} else if ( j > 1 ) {
					// never seen together below the top: carry the ladder's step on
					gaps[ j ] = gaps[ j - 1 ] + ( gaps[ j - 1 ] - gaps[ j - 2 ] );
				}
			}
		}
		var xs = Object.keys( tilt ).map( Number ).sort( function ( a, b ) {
			return a - b;
		} );
		data._bell = xs.length >= 3 ? { gaps: gaps, xs: xs, tilt: xs.map( function ( x ) {
			return tilt[ x ];
		} ) } : null;
		return data._bell;
	}

	/** Base chances at skill s from the bell curve, or null past BELL_TOP / without a fit. */
	function bellOdds( data, s ) {
		var fit = bellFit( data );
		if ( !fit || s > BELL_TOP || s < fit.xs[ 0 ] ) {
			return null;
		}
		var b = monotoneAt( fit.xs, fit.tilt, s );
		var rar = data.rarities || [];
		var lw = 0;
		var w = rar.map( function ( r, j ) {
			if ( j > 0 ) {
				lw += fit.gaps[ j - 1 ] + b;
			}
			var unlock = r[ 2 ];
			return unlock === null || unlock === undefined || s < unlock ? 0 : Math.exp( lw );
		} );
		return toHundred( w );
	}

	/**
	 * Base chances (%) at a Fishing Skill level, before luck, one per rarity
	 * in data.rarities order: { odds, exact, between: [lo, hi] }.
	 * exact: the level was measured, and its chances are passed through as
	 * the game showed them. Otherwise each rarity is interpolated in a
	 * straight line between its nearest known points: every measured level,
	 * the chart's fixed points (anchors), and 0 at the level before it
	 * unlocks. Below its unlock level a rarity is 0, and so is one fishing
	 * never catches. Past its last known point a rarity keeps that value.
	 * The rest is then scaled to 100%, leaving any chance fixed at this
	 * exact level (an anchor, or 0) as it is. between = the nearest
	 * measured levels below and above (hi null past the highest).
	 */
	function baseCatchOdds( data, skill ) {
		var rar = data.rarities || [];
		var levels = data.levels || [];
		var max = data.maxSkill || 500;
		var s = Math.round( Number( skill ) );
		var lo = null;
		var hi = null;
		var odds = [];
		var pinned = [];
		var i, k, row, pts, a, before, after, p, fixed, rest;
		if ( !isFinite( s ) || s < 0 ) {
			s = 0;
		}
		// past the highest skill (only a rod's level boost gets there): an
		// estimate that carries on each rarity's straight line from the
		// highest measured level below the top to the top (user, 2026-10-20)
		if ( s > max ) {
			// rods add at most a few levels: no reading carries a trend further
			s = Math.min( s, max + 10 );
			var top = baseCatchOdds( data, max );
			var from = null;
			levels.forEach( function ( r ) {
				if ( r[ 0 ] < max && ( from === null || r[ 0 ] > from ) ) {
					from = r[ 0 ];
				}
			} );
			if ( from === null ) {
				return top;
			}
			var low = baseCatchOdds( data, from );
			var est = top.odds.map( function ( v, j ) {
				return Math.max( 0, v + ( v - low.odds[ j ] ) / ( max - from ) * ( s - max ) );
			} );
			var total = est.reduce( function ( t, v ) {
				return t + v;
			}, 0 );
			return { odds: total > 0 ? est.map( function ( v ) {
				return v * 100 / total;
			} ) : top.odds, exact: false, between: [ max, null ], skill: s, beyond: true, trendFrom: from };
		}
		for ( k = 0; k < levels.length; k++ ) {
			row = levels[ k ];
			if ( row[ 0 ] === s ) {
				return { odds: rar.map( function ( r, j ) {
					return r[ 2 ] === null || r[ 2 ] === undefined ? 0 : Number( row[ 1 ][ j ] ) || 0;
				} ), exact: true, between: [ s, s ], skill: s };
			}
			if ( row[ 0 ] < s && ( lo === null || row[ 0 ] > lo ) ) {
				lo = row[ 0 ];
			}
			if ( row[ 0 ] > s && ( hi === null || row[ 0 ] < hi ) ) {
				hi = row[ 0 ];
			}
		}
		var bell = bellOdds( data, s );
		if ( bell ) {
			return { odds: bell, exact: false, between: [ lo, hi ], skill: s, bell: true };
		}
		for ( i = 0; i < rar.length; i++ ) {
			var unlock = rar[ i ][ 2 ];
			if ( unlock === null || unlock === undefined || s < unlock ) {
				odds.push( 0 );
				pinned.push( true );
				continue;
			}
			// this rarity's known points, measured levels first so a measured
			// value wins over an anchor at the same level
			pts = {};
			for ( k = 0; k < levels.length; k++ ) {
				pts[ levels[ k ][ 0 ] ] = Number( levels[ k ][ 1 ][ i ] ) || 0;
			}
			( data.anchors || [] ).forEach( function ( an ) {
				if ( an[ 1 ] === rar[ i ][ 0 ] && !has( pts, an[ 0 ] ) ) {
					pts[ an[ 0 ] ] = Number( an[ 2 ] ) || 0;
				}
			} );
			if ( unlock > 0 && !has( pts, unlock - 1 ) ) {
				pts[ unlock - 1 ] = 0;
			}
			before = null;
			after = null;
			for ( a in pts ) {
				if ( has( pts, a ) ) {
					a = Number( a );
					if ( a <= s && ( before === null || a > before ) ) {
						before = a;
					}
					if ( a >= s && ( after === null || a < after ) ) {
						after = a;
					}
				}
			}
			if ( before === null && after === null ) {
				p = 0;
			} else if ( before === null ) {
				p = pts[ after ];
			} else if ( after === null || after === before ) {
				p = pts[ before ];
			} else {
				// a smooth curve through every known point (user, 2026-10-20)
				var pxs = Object.keys( pts ).map( Number ).sort( function ( x, y ) {
					return x - y;
				} );
				p = monotoneAt( pxs, pxs.map( function ( x ) {
					return pts[ x ];
				} ), s );
			}
			odds.push( Math.max( 0, p ) );
			pinned.push( before === s );
		}
		// scale what was interpolated to fill what the fixed chances leave
		fixed = 0;
		rest = 0;
		for ( i = 0; i < odds.length; i++ ) {
			if ( pinned[ i ] ) {
				fixed += odds[ i ];
			} else {
				rest += odds[ i ];
			}
		}
		if ( rest > 0 && fixed < 100 ) {
			odds = odds.map( function ( v, j ) {
				return pinned[ j ] ? v : v * ( 100 - fixed ) / rest;
			} );
		} else {
			odds = toHundred( odds );
		}
		return { odds: odds, exact: false, between: [ lo, hi ], skill: s };
	}

	/**
	 * Chances after luck: each one times (1 / (1 - t))^rank, rank = its
	 * place in the list (Common 0), then scaled to 100%. At t = 1 all of it
	 * goes to the rarest rarity with a chance above 0. A 0 stays 0.
	 */
	function applyLuck( odds, t ) {
		var tilt = Math.max( 0, Math.min( 1, Number( t ) || 0 ) );
		var i, top;
		if ( tilt >= 1 ) {
			top = -1;
			for ( i = 0; i < odds.length; i++ ) {
				if ( odds[ i ] > 0 ) {
					top = i;
				}
			}
			return odds.map( function ( p, j ) {
				return j === top ? 100 : 0;
			} );
		}
		var f = 1 / ( 1 - tilt );
		return toHundred( odds.map( function ( p, j ) {
			return p > 0 ? p * Math.pow( f, j ) : 0;
		} ) );
	}

	/** A chance for the page: "42.5%", "3.07%", "<0.01%". */
	function catchPct( p ) {
		if ( p <= 0 ) {
			return '0%';
		}
		if ( p < 0.01 ) {
			return '<0.01%';
		}
		if ( p >= 99.995 ) {
			return '100%';
		}
		return String( Number( p.toFixed( p >= 10 ? 1 : 2 ) ) ) + '%';
	}

	/** "2x luck" / "no luck" for the rod and potion lists, plus a rod's
	 * Fishing Skill boost: "2x luck, +2 skill". */
	function luckLabel( x, lv ) {
		return ( luckPart( x ) ? String( Number( x ) ) + 'x luck' : 'no luck' ) +
			( Number( lv ) > 0 ? ', +' + Number( lv ) + ' skill' : '' );
	}

	/** Luck shown as a number: 37, 7.5, 1.25. */
	function luckNumber( n ) {
		return String( Number( n.toFixed( 2 ) ) );
	}

	function buildCatch( container, data ) {
		var id = 'ffb-catch-' + ( ++catchCount );
		var rods = Array.isArray( data.rods ) && data.rods.length ? data.rods : [ { n: 'Basic Rod (no luck)', luck: 1 } ];
		var potions = Array.isArray( data.potions ) && data.potions.length ? data.potions : [ { n: 'No potion', luck: 1 } ];
		var max = data.maxSkill || 500;
		var state = { skill: 0, pond: 'base', rod: 0, potion: 0, server: 0, event: 0, boost: 0, golden: 0 };

		var root = el( 'div', 'ffb-catch-calc' );
		var controls = el( 'div', 'ffb-catch-controls' );

		// ---- Fishing Skill ----------------------------------------------
		var skillInput = el( 'input', 'ffb-trade-input ffb-catch-skill' );
		skillInput.type = 'number';
		skillInput.min = '0';
		skillInput.max = String( max );
		skillInput.step = '1';
		skillInput.setAttribute( 'inputmode', 'numeric' );
		skillInput.value = '0';
		skillInput.addEventListener( 'input', function () {
			var n = parseInt( skillInput.value, 10 );
			state.skill = isFinite( n ) ? Math.max( 0, Math.min( max, n ) ) : 0;
			refresh();
		} );
		controls.appendChild( field( id + '-skill', 'Fishing Skill (0-' + max + ')', skillInput, 'ffb-catch-field' ).node );

		// ---- where you fish ---------------------------------------------
		var pondRow = el( 'div', 'ffb-catch-field ffb-catch-ponds' );
		pondRow.appendChild( el( 'span', 'ffb-trade-label', 'Where you fish' ) );
		var pondChips = el( 'div', 'ffb-catch-chips' );
		var pondButtons = [];
		[ [ 'base', 'Base pond' ], [ 'server', 'Server Pond' ], [ 'admin', 'Admin Pond' ] ].forEach( function ( pd ) {
			var b = el( 'button', 'ffb-catch-chip', pd[ 1 ] );
			b.type = 'button';
			b.setAttribute( 'aria-pressed', pd[ 0 ] === state.pond ? 'true' : 'false' );
			b.addEventListener( 'click', function () {
				state.pond = pd[ 0 ];
				refresh();
			} );
			pondButtons.push( { key: pd[ 0 ], node: b } );
			pondChips.appendChild( b );
		} );
		pondRow.appendChild( pondChips );
		controls.appendChild( pondRow );

		// ---- catch luck boost (base pond only) --------------------------
		var boostRow = el( 'div', 'ffb-catch-field ffb-catch-ponds' );
		boostRow.appendChild( el( 'span', 'ffb-trade-label', 'Catch luck boost' ) );
		var boostChips = el( 'div', 'ffb-catch-chips' );
		var boostButtons = [];
		[ [ 0, 'None' ], [ 5, '+5' ], [ 10, '+10' ], [ 15, '+15 (both)' ] ].forEach( function ( bd ) {
			var b = el( 'button', 'ffb-catch-chip', bd[ 1 ] );
			b.type = 'button';
			b.setAttribute( 'aria-pressed', bd[ 0 ] === state.boost ? 'true' : 'false' );
			b.addEventListener( 'click', function () {
				state.boost = bd[ 0 ];
				refresh();
			} );
			boostButtons.push( { key: bd[ 0 ], node: b } );
			boostChips.appendChild( b );
		} );
		boostRow.appendChild( boostChips );
		boostRow.appendChild( el( 'span', 'ffb-trade-optional', ' +5 at 500 catches, +10 at 800; each lasts 5 minutes' ) );

		// ---- rod and potion ---------------------------------------------
		function itemPicker( key, list, label ) {
			var picker = buildSearchPicker( {
				id: id + '-' + key,
				current: '0',
				searchable: false,
				inputClass: 'ffb-trade-input ffb-catch-select',
				label: function ( v ) {
					var it = list[ Number( v ) ];
					return it ? it.n : '';
				},
				lead: function ( v ) {
					var it = list[ Number( v ) ];
					var icon = it && safeIconUrl( it.i );
					return icon ? { icon: icon, color: null } : null;
				},
				search: function () {
					return list.map( function ( it, i ) {
						return { value: String( i ), name: it.n, icon: safeIconUrl( it.i ), right: luckLabel( it.luck, it.lv ) };
					} );
				},
				exact: function ( text ) {
					var t = String( text || '' ).trim().toLowerCase();
					var i;
					for ( i = 0; i < list.length; i++ ) {
						if ( list[ i ].n.toLowerCase() === t ) {
							return String( i );
						}
					}
					return null;
				},
				onPick: function ( v ) {
					state[ key ] = Number( v );
					refresh();
				}
			} );
			var f = pickerField( id + '-' + key, label, picker, 'ffb-catch-field' );
			var luckNote = el( 'span', 'ffb-catch-itemluck' );
			f.node.appendChild( luckNote );
			return { node: f.node, note: luckNote, list: list, key: key };
		}
		var rodField = itemPicker( 'rod', rods, 'Rod' );
		var potionField = itemPicker( 'potion', potions, 'Potion' );
		controls.appendChild( rodField.node );
		controls.appendChild( potionField.node );
		controls.appendChild( boostRow );

		// ---- other luck -------------------------------------------------
		function numberField( key, label, hint ) {
			var input = el( 'input', 'ffb-trade-input ffb-catch-num' );
			input.type = 'number';
			input.min = '0';
			input.step = 'any';
			input.setAttribute( 'inputmode', 'decimal' );
			input.placeholder = '0';
			input.addEventListener( 'input', function () {
				state[ key ] = luckExtra( input.value );
				refresh();
			} );
			var f = field( id + '-' + key, label, input, 'ffb-catch-field' );
			f.label.appendChild( el( 'span', 'ffb-trade-optional', ' ' + hint ) );
			return { node: f.node, input: input };
		}
		var serverField = numberField( 'server', 'Server luck', '(optional: during Admin Abuse, or bought in the shop: +5, +10 or +20)' );
		var eventField = numberField( 'event', 'Event luck', '(optional)' );
		var goldenField = numberField( 'golden', 'Golden zone', '(optional)' );
		controls.appendChild( serverField.node );
		controls.appendChild( eventField.node );
		controls.appendChild( goldenField.node );
		root.appendChild( controls );

		// ---- results ----------------------------------------------------
		var out = el( 'div', 'ffb-catch-out' );
		var luckLine = el( 'p', 'ffb-catch-luck' );
		var bars = el( 'div', 'ffb-catch-bars' );
		var note = el( 'p', 'ffb-catch-note' );
		out.appendChild( luckLine );
		out.appendChild( bars );
		out.appendChild( note );
		var adminBox = el( 'div', 'ffb-catch-admin' );
		adminBox.appendChild( el( 'p', 'ffb-catch-admin-h', 'Also on every Admin Pond catch' ) );
		ADMIN_POND.extra.forEach( function ( x ) {
			adminBox.appendChild( el( 'p', 'ffb-catch-admin-line', x[ 0 ] + ': 1 in ' + x[ 1 ].toLocaleString( 'en-US' ) + ' (' + catchPct( 100 / x[ 1 ] ) + ')' ) );
		} );
		adminBox.appendChild( el( 'p', 'ffb-catch-admin-note', 'These are separate chances on top of the ones above. Celestials can only be caught here. The Admin Pond adds 20 luck; a potion’s luck counts here, but its mutation chance only works at your base pond.' ) );
		out.appendChild( adminBox );
		root.appendChild( out );
		root.appendChild( el( 'p', 'ffb-catch-foot', 'Chances are per catch: a rod with 2× catch brings in two brainrots each cast, each rolled with these chances. Luck only boosts rarities your skill can already catch; it never unlocks one. Celestials and Admin Secrets aren’t in the skill odds: on the Admin Pond they come from separate chances (below).' ) );

		function refresh() {
			var server = state.pond === 'server';
			var admin = state.pond === 'admin';
			var luck, t, base, odds;
			pondButtons.forEach( function ( b ) {
				b.node.setAttribute( 'aria-pressed', b.key === state.pond ? 'true' : 'false' );
			} );
			potionField.node.hidden = server;
			boostRow.hidden = server || admin;
			adminBox.hidden = !admin;
			boostButtons.forEach( function ( b ) {
				b.node.setAttribute( 'aria-pressed', b.key === state.boost ? 'true' : 'false' );
			} );
			goldenField.node.hidden = !server;
			rodField.note.textContent = luckLabel( rods[ state.rod ].luck, rods[ state.rod ].lv );
			potionField.note.textContent = luckLabel( potions[ state.potion ].luck );

			luck = catchLuck( {
				pond: state.pond,
				rod: rods[ state.rod ].luck,
				potion: potions[ state.potion ].luck,
				server: state.server,
				event: state.event,
				boost: state.boost,
				golden: state.golden
			} );
			t = catchTilt( luck );
			// a rod's "level boost" fishes as if your Fishing Skill were that
			// much higher: King's Rod at 500 = skill 502 (user, 2026-10-20)
			var lv = Number( rods[ state.rod ].lv ) || 0;
			var skill = state.skill + lv;
			base = baseCatchOdds( data, skill );
			odds = applyLuck( base.odds, t );

			clear( luckLine );
			luckLine.appendChild( el( 'span', 'ffb-catch-luck-label', 'Total luck ' ) );
			luckLine.appendChild( el( 'strong', 'ffb-catch-luck-value', luckNumber( luck ) ) );
			luckLine.appendChild( el( 'span', 'ffb-catch-luck-label', ' · tilt ' ) );
			luckLine.appendChild( el( 'strong', 'ffb-catch-tilt-value', Math.round( t * 100 ) + '%' ) );
			if ( server && luck < 1 ) {
				luckLine.appendChild( el( 'span', 'ffb-catch-luck-label', ' (counts as 1)' ) );
			}
			if ( lv ) {
				luckLine.appendChild( el( 'span', 'ffb-catch-luck-label', ' · skill ' ) );
				luckLine.appendChild( el( 'strong', 'ffb-catch-luck-value', String( skill ) ) );
				luckLine.appendChild( el( 'span', 'ffb-catch-luck-label', ' (' + state.skill + ' + ' + lv + ' from the ' + rods[ state.rod ].n + ')' +
					( skill > max ? '; an estimate past ' + max : '' ) ) );
			}

			clear( bars );
			( data.rarities || [] ).forEach( function ( r, i ) {
				var unlock = r[ 2 ];
				var line, head, track, fill, color;
				if ( unlock === null || unlock === undefined ) {
					return;
				}
				line = el( 'div', 'ffb-catch-row' );
				head = el( 'div', 'ffb-catch-row-head' );
				color = safeColor( r[ 1 ] );
				if ( color ) {
					head.appendChild( swatch( color ) );
				}
				head.appendChild( el( 'span', 'ffb-catch-name', r[ 0 ] ) );
				if ( base.skill < unlock ) {
					line.className += ' ffb-catch-row-locked';
					head.appendChild( el( 'span', 'ffb-catch-pct ffb-catch-lock', 'unlocks at skill ' + unlock ) );
					line.appendChild( head );
					bars.appendChild( line );
					return;
				}
				if ( !( odds[ i ] > 0 ) ) {
					line.className += ' ffb-catch-row-gone';
					head.appendChild( el( 'span', 'ffb-catch-pct', '0%' ) );
					line.appendChild( head );
					bars.appendChild( line );
					return;
				}
				head.appendChild( el( 'span', 'ffb-catch-pct', catchPct( odds[ i ] ) ) );
				line.appendChild( head );
				track = el( 'div', 'ffb-catch-track' );
				fill = el( 'div', 'ffb-catch-fill' );
				fill.setAttribute( 'style', 'width: ' + Math.max( 0.5, Math.min( 100, odds[ i ] ) ).toFixed( 2 ) + '%;' +
					( color && color.charAt( 0 ) === '#' ? ' background-color: ' + color + ';' : '' ) );
				track.appendChild( fill );
				line.appendChild( track );
				bars.appendChild( line );
			} );

			if ( base.exact ) {
				note.textContent = 'Base chances measured in game at skill ' + base.skill + '.';
				note.className = 'ffb-catch-note';
			} else if ( base.beyond ) {
				note.textContent = 'Estimate: past skill ' + max + ' (only a rod’s level boost gets there), each rarity carries on its trend from skill ' +
					base.trendFrom + ' to ' + max + '.';
				note.className = 'ffb-catch-note ffb-catch-approx';
			} else if ( base.between[ 1 ] === null ) {
				note.textContent = 'Approximate: above the highest measured level (' + base.between[ 0 ] + '), worked out from the game’s schedule to level ' + max + '.';
				note.className = 'ffb-catch-note ffb-catch-approx';
			} else {
				note.textContent = 'Approximate: between measured levels ' + base.between[ 0 ] + ' and ' + base.between[ 1 ] +
					( base.bell ? ', from the game’s bell curve over the rarities.' : '.' );
				note.className = 'ffb-catch-note ffb-catch-approx';
			}
		}

		refresh();
		container.appendChild( root );
		return { root: root, refresh: refresh };
	}

	/* ================================================================
	 * "Coming up": event times in the reader's own time zone
	 *
	 * The same rules as the phone site's bell (mobile-site/app.js): Admin
	 * Abuse runs Saturday 9 PM and reruns Sunday 11 AM Eastern, 45 minutes
	 * each; the Admin Pond runs twice a week for 48 hours (since
	 * 2026-10-06), from Tuesday 4 AM and Friday 4 PM Eastern. An exact start
	 * time in the events data beats the schedule. Eastern time is converted
	 * with the browser's own time-zone data, so daylight saving is handled.
	 * ================================================================ */

	var ET = 'America/New_York';

	/** The moment a wall-clock time in a time zone happens. */
	function zoned( y, mo, d, h, mi, tz ) {
		var guess = Date.UTC( y, mo - 1, d, h, mi );
		var parts = {};
		new Intl.DateTimeFormat( 'en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric',
			day: 'numeric', hour: 'numeric', minute: 'numeric' } ).formatToParts( new Date( guess ) ).forEach( function ( p ) {
			parts[ p.type ] = p.value;
		} );
		var shown = Date.UTC( +parts.year, +parts.month - 1, +parts.day, +parts.hour % 24, +parts.minute );
		return new Date( guess - ( shown - guess ) );
	}

	function isoParts( iso ) {
		var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec( iso || '' );
		return m ? [ +m[ 1 ], +m[ 2 ], +m[ 3 ] ] : null;
	}

	/**
	 * What's on now (ending soonest first), then what's next, up to five:
	 * { name, note, when (Date) or day (Date, time not announced), ends, live }.
	 */
	function upcomingTimes( events, now ) {
		var out = [];
		( Array.isArray( events ) ? events : [] ).forEach( function ( e ) {
			var d, st, to, ends, main, rerun;
			if ( !e || typeof e.name !== 'string' ) {
				return;
			}
			d = isoParts( e.from );
			if ( typeof e.start === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test( e.start ) ) {
				st = new Date( e.start );
				to = isoParts( e.to );
				ends = to ? new Date( Date.UTC( to[ 0 ], to[ 1 ] - 1, to[ 2 ], st.getUTCHours(), st.getUTCMinutes() ) ) : null;
				out.push( { name: e.name, when: st, ends: ends && ends > st ? ends : null, note: '' } );
				return;
			}
			if ( !d ) {
				return;
			}
			if ( e.type === 'abuse' && new Date( Date.UTC( d[ 0 ], d[ 1 ] - 1, d[ 2 ] ) ).getUTCDay() === 6 ) {
				main = zoned( d[ 0 ], d[ 1 ], d[ 2 ], 21, 0, ET );
				rerun = zoned( d[ 0 ], d[ 1 ], d[ 2 ] + 1, 11, 0, ET );
				out.push( { name: e.name, when: main, ends: new Date( main.getTime() + 45 * 60000 ), note: 'main run' } );
				out.push( { name: e.name, when: rerun, ends: new Date( rerun.getTime() + 45 * 60000 ), note: 'rerun' } );
			} else {
				out.push( { name: e.name, day: new Date( Date.UTC( d[ 0 ], d[ 1 ] - 1, d[ 2 ], 12 ) ), note: '' } );
			}
		} );
		[ [ 'Tue', 4, 'Admin Pond (midweek)' ], [ 'Fri', 16, 'Admin Pond (weekend)' ] ].forEach( function ( w ) {
			var i, t, p, start, stop;
			for ( i = -2; i < 8; i++ ) {
				t = new Date( now.getTime() + i * 86400000 );
				p = {};
				new Intl.DateTimeFormat( 'en-US', { timeZone: ET, weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' } ).formatToParts( t ).forEach( function ( x ) {
					p[ x.type ] = x.value;
				} );
				if ( p.weekday === w[ 0 ] ) {
					start = zoned( +p.year, +p.month, +p.day, w[ 1 ], 0, ET );
					stop = new Date( start.getTime() + 2 * 86400000 );
					if ( stop > now ) {
						out.push( { name: w[ 2 ], when: start, ends: stop, note: '48 hours' } );
						return;
					}
				}
			}
		} );
		return out.filter( function ( x ) {
			if ( x.ends ) {
				return x.ends.getTime() > now.getTime();
			}
			return x.when ? x.when.getTime() > now.getTime() - 3600000 : x.day.getTime() > now.getTime() - 86400000;
		} ).map( function ( x ) {
			x.live = !!( x.when && x.ends && x.when <= now );
			return x;
		} ).sort( function ( a, b ) {
			if ( a.live !== b.live ) {
				return a.live ? -1 : 1;
			}
			return a.live ? a.ends - b.ends : ( a.when || a.day ) - ( b.when || b.day );
		} ).slice( 0, 5 );
	}

	/** "in 2d 3h", "in 4h 10m", "in 25m"; "on now" once it's started. */
	function countdown( when, now ) {
		var mins = Math.round( ( when - now ) / 60000 );
		var d, h, m;
		if ( mins <= 0 ) {
			return 'on now';
		}
		d = Math.floor( mins / 1440 );
		h = Math.floor( ( mins % 1440 ) / 60 );
		m = mins % 60;
		return 'in ' + ( d ? d + 'd ' : '' ) + ( d || h ? h + 'h ' : '' ) + ( d ? '' : m + 'm' );
	}

	function whenText( d ) {
		return d.toLocaleString( [], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' } );
	}

	function wikiLink( title ) {
		return '/wiki/' + encodeURIComponent( title.replace( / /g, '_' ) ).replace( /%23/g, '#' ).replace( /%2F/g, '/' );
	}

	/**
	 * The rotating "Coming up" banner: the hub's full one, or the small one
	 * in a calculator card's header (never both on a page; decided
	 * 2026-10-06). About 6 s per item; it pauses while the mouse is over it
	 * or it has keyboard focus; the dots jump to an item; with reduced
	 * motion it doesn't rotate. Returns the node, or null with nothing to show.
	 */
	function buildBanner( events, compact ) {
		var at = 0;
		var paused = false;
		var box = el( 'section', 'ffb-banner-box' + ( compact ? ' ffb-banner-small' : '' ) );
		var link = el( 'a', 'ffb-banner-item' );
		var count = el( 'span', 'ffb-banner-n' );
		var dots = el( 'span', 'ffb-banner-dots' );
		var still = typeof window !== 'undefined' && window.matchMedia &&
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
		var items = upcomingTimes( events, new Date() );
		if ( !items.length ) {
			return null;
		}
		box.setAttribute( 'aria-label', 'Coming up' );
		box.setAttribute( 'aria-roledescription', 'carousel' );
		link.setAttribute( 'href', wikiLink( 'Fish for Brainrots - Events' ) );
		if ( !compact ) {
			box.appendChild( el( 'span', 'ffb-banner-title', '📣 Coming up' ) );
		}
		box.appendChild( link );
		if ( !compact ) {
			box.appendChild( count );
		}
		box.appendChild( dots );
		if ( !compact ) {
			var all = el( 'a', 'ffb-banner-all', 'All events ›' );
			all.setAttribute( 'href', wikiLink( 'Fish for Brainrots - Events' ) );
			box.appendChild( all );
		}
		function render() {
			var now = new Date();
			var x;
			items = upcomingTimes( events, now );
			if ( !items.length ) {
				box.hidden = true;
				return;
			}
			at = at % items.length;
			x = items[ at ];
			clear( link );
			if ( compact ) {
				link.appendChild( el( 'span', 'ffb-banner-icon', '📣' ) );
			}
			if ( x.live ) {
				link.appendChild( el( 'span', 'ffb-banner-live', 'Live now' ) );
			}
			link.appendChild( el( 'strong', null, x.name + ( x.note ? ' (' + x.note + ')' : '' ) ) );
			link.appendChild( el( 'span', null, ' ' ) );
			if ( x.live ) {
				link.appendChild( el( 'span', 'ffb-banner-count', 'ends ' + countdown( x.ends, now ) ) );
			} else if ( x.when ) {
				link.appendChild( el( 'span', 'ffb-banner-count', countdown( x.when, now ) ) );
			}
			link.appendChild( el( 'span', 'ffb-banner-when', ' · ' + ( x.live ? 'until ' + whenText( x.ends ) :
				x.when ? whenText( x.when ) : x.day.toLocaleDateString( [], { weekday: 'short', month: 'short', day: 'numeric' } ) +
					', time not announced' ) + ( compact ? '' : ' your time' ) ) );
			count.textContent = paused ? 'paused' : ( at + 1 ) + ' / ' + items.length;
			clear( dots );
			items.forEach( function ( y, i ) {
				var d = el( 'button', 'ffb-banner-dot' + ( i === at ? ' ffb-banner-dot-on' : '' ) );
				d.type = 'button';
				d.setAttribute( 'aria-label', 'Show item ' + ( i + 1 ) + ' of ' + items.length );
				d.setAttribute( 'aria-pressed', i === at ? 'true' : 'false' );
				d.addEventListener( 'click', function () {
					at = i;
					render();
				} );
				dots.appendChild( d );
			} );
			dots.hidden = items.length < 2;
		}
		box.addEventListener( 'mouseenter', function () {
			paused = true;
			render();
		} );
		box.addEventListener( 'mouseleave', function () {
			paused = false;
			render();
		} );
		box.addEventListener( 'focusin', function () {
			paused = true;
			render();
		} );
		box.addEventListener( 'focusout', function () {
			paused = false;
			render();
		} );
		render();
		if ( typeof setInterval === 'function' ) {
			setInterval( function () {
				if ( !paused && !still ) {
					at++;
				}
				render();
			}, 6000 );
		}
		return box;
	}

	/** The events feed Module:Brainrot puts on the page (eventsJson), or null. */
	function pageEvents( root ) {
		var holder = root && root.querySelectorAll ? root.querySelectorAll( '.ffb-events-data' )[ 0 ] : null;
		var list = holder ? readPayload( holder ) : null;
		return Array.isArray( list ) ? list : null;
	}

	/* ================================================================
	 * The calculators' card on the wiki: the phone site's header and
	 * palette (Trade · Value · My base), following the wiki's theme
	 * ================================================================ */

	var CARD_TABS = [
		[ 'Trade', 'Fish for Brainrots - Trading' ],
		[ 'Value', null ],
		[ 'My base', 'Fish for Brainrots - My base' ]
	];

	/**
	 * Wraps a calculator in the card. active names the tab ('Trade', 'Value',
	 * 'My base', or a title of its own such as 'What can I catch?'). Returns
	 * { body, status }: build the calculator into body; status is the line
	 * that says where My base is kept.
	 */
	function appCard( container, active, env, events ) {
		var card = el( 'section', 'ffb-card' );
		var head = el( 'div', 'ffb-card-head' );
		var title = el( 'div', 'ffb-card-title', 'Fish for Brainrots' );
		title.appendChild( el( 'span', 'ffb-card-sub', 'Calculators' ) );
		head.appendChild( title );
		var nav = el( 'nav', 'ffb-card-tabs' );
		nav.setAttribute( 'aria-label', 'Calculators' );
		CARD_TABS.forEach( function ( t ) {
			var on = t[ 0 ] === active;
			var a = el( on ? 'span' : 'a', 'ffb-card-tab' + ( on ? ' ffb-card-tab-on' : '' ), t[ 0 ] );
			if ( on ) {
				a.setAttribute( 'aria-current', 'page' );
			} else {
				a.setAttribute( 'href', wikiLink( t[ 1 ] || 'Fish for Brainrots#Brainrots' ) );
				if ( !t[ 1 ] ) {
					a.setAttribute( 'title', 'Every brainrot page has the value calculator' );
				}
			}
			nav.appendChild( a );
		} );
		if ( active && !CARD_TABS.some( function ( t ) {
			return t[ 0 ] === active;
		} ) ) {
			nav.appendChild( el( 'span', 'ffb-card-tab ffb-card-tab-on', active ) );
		}
		head.appendChild( nav );
		head.appendChild( el( 'span', 'ffb-card-gap' ) );
		var status = el( 'span', 'ffb-card-status' );
		head.appendChild( status );
		var banner = events ? buildBanner( events, true ) : null;
		if ( banner ) {
			head.appendChild( banner );
		}
		card.appendChild( head );
		var body = el( 'div', 'ffb-card-body' );
		card.appendChild( body );
		var store = chooseStore( env );
		clear( status );
		if ( store.kind === 'signin' ) {
			status.appendChild( el( 'span', 'ffb-card-dot ffb-card-dot-off' ) );
			status.appendChild( el( 'span', null, 'Not signed in' ) );
		} else if ( store.kind === 'account' ) {
			var n = 0;
			try {
				n = ( JSON.parse( store.load() || '{}' ).r || [] ).length;
			} catch ( err ) {
				n = 0;
			}
			status.appendChild( el( 'span', 'ffb-card-dot' ) );
			status.appendChild( el( 'span', null, 'My base: ' ) );
			status.appendChild( el( 'strong', null, n + ( n === 1 ? ' brainrot' : ' brainrots' ) ) );
			status.appendChild( el( 'span', null, ' · saved to your Fandom account' ) );
		}
		container.appendChild( card );
		return { body: body, status: status };
	}

	function init() {
		var env = pageEnv();
		var events = env.wiki ? pageEvents( document ) : null;
		// on the wiki each calculator sits in the card (the phone site has
		// its own page around them)
		function shell( container, active ) {
			return env.wiki ? appCard( container, active, env, events ).body : container;
		}
		function dropNote( container, cls ) {
			var note = container.querySelector( cls );
			if ( note ) {
				note.parentNode.removeChild( note );
			}
		}

		Array.prototype.forEach.call( document.querySelectorAll( '.brainrot-calculator' ), function ( container ) {
			var data = readPayload( container.querySelector( '.brainrot-calculator-data' ) );
			// with no data, leave the page exactly as it was rather than
			// showing a broken widget
			if ( data ) {
				buildValueCalculator( shell( container, 'Value' ), data, env );
			}
		} );

		Array.prototype.forEach.call( document.querySelectorAll( '.ffb-trade' ), function ( container ) {
			var data = readPayload( container.querySelector( '.ffb-trade-data' ) );
			if ( !data ) {
				return;
			}
			dropNote( container, '.ffb-trade-nojs' );
			buildTrade2( shell( container, 'Trade' ), data, env );
		} );

		Array.prototype.forEach.call( document.querySelectorAll( '.ffb-catch' ), function ( container ) {
			var data = readPayload( container.querySelector( '.ffb-catch-data' ) );
			if ( !data || !Array.isArray( data.rarities ) || !Array.isArray( data.levels ) ) {
				return;
			}
			dropNote( container, '.ffb-catch-nojs' );
			buildCatch( shell( container, 'What can I catch?' ), data );
		} );

		Array.prototype.forEach.call( document.querySelectorAll( '.ffb-collection' ), function ( container ) {
			var data = readPayload( container.querySelector( '.ffb-collection-data' ) );
			if ( !data ) {
				return;
			}
			dropNote( container, '.ffb-collection-nojs' );
			buildBase( shell( container, 'My base' ), data, env );
		} );

		// the hub's full-size "Coming up" banner (Module:Brainrot bannerMount)
		Array.prototype.forEach.call( document.querySelectorAll( '.ffb-banner' ), function ( container ) {
			var banner = buildBanner( pageEvents( container ) || events, false );
			if ( banner ) {
				dropNote( container, '.ffb-banner-nojs' );
				container.appendChild( banner );
			}
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
			planMaths: planMaths,
			planSteps: planSteps,
			spendPlan: spendPlan,
			cashClimb: cashClimb,
			playTime: playTime,
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
			planBase: planBase,
			buildBase: buildBase,
			buildTrade2: buildTrade2,
			plainChange: plainChange,
			climbCost: climbCost,
			baseAfterTrade: baseAfterTrade,
			targetCost: targetCost,
			changeText: changeText,
			pctText: pctText,
			sameSize: sameSize,
			richText: richText,
			applyTrade: applyTrade,
			readProfile: readProfile,
			baseMultiplier: baseMultiplier,
			bellFit: bellFit,
			monotoneAt: monotoneAt,
			incomeTies: incomeTies,
			multiplierParts: multiplierParts,
			hoursLabel: hoursLabel,
			upgradePrice: upgradePrice,
			upgradePlan: upgradePlan,
			rarityLesson: rarityLesson,
			roughTime: roughTime,
			rowStrength: rowStrength,
			priceStrength: priceStrength,
			fullNumber: fullNumber,
			numberName: numberName,
			fullTip: fullTip,
			rarityFrame: rarityFrame,
			priceCurve: priceCurve,
			BASE_SLOTS_DEFAULT: BASE_SLOTS_DEFAULT,
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
			browserListOffer: browserListOffer,
			catchLuck: catchLuck,
			catchTilt: catchTilt,
			baseCatchOdds: baseCatchOdds,
			applyLuck: applyLuck,
			catchPct: catchPct,
			buildCatch: buildCatch,
			upcomingTimes: upcomingTimes,
			countdown: countdown,
			buildBanner: buildBanner,
			appCard: appCard,
			suggestOffers: suggestOffers,
			sameIncomeAs: sameIncomeAs,
			signinPrompt: signinPrompt,
			buildValueCalculator: buildValueCalculator
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