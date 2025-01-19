/* On-Wiki calculator script. See [[Template:Calculator]]. Created by [[User:Bawolff]]
 *
 * This script is designed with security in mind. Possible security risks:
 *  * Having a formula that executes JS
 *  ** To prevent this we do not use eval(). Instead we parse the formula with our own parser into an abstract tree that we evaluate by walking through it
 *  ** Form submission & DOM clobbering - we prefix the name (and id) attribute of all fields to prevent conflicts
 *  ** Style injection - we take the style attribute from an existing element that was sanitized by MW. We do not take style from a data attribute.
 *  ** Client-side DoS - Formulas aren't evaluated without user interaction. Formulas have a max length. Max number of widgets per page. Ultimately, easy to revert slow formulas just like any other vandalism.
 *
 * Essentially the code works by replacing certain <span> tags with <input>, parsing a custom formula language, setting up a dependency graph based on identifiers, and re-evaluating formulas on change.
 */
(function () {

	var mathFuncs = [ 'abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'cos', 'cosh', 'exp', 'floor', 'hypot',
		'log', 'log10', 'log2', 'max', 'min', 'pow', 'random', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc' ];
	var otherFuncs = [ 'ifzero', 'coalesce', 'iffinite', 'ifnan', 'ifpositive', 'ifequal', 'round', 'jsround', 'not', 'and', 'or', 'bool', 'ifless', 'iflessorequal', 'ifgreater', 'ifgreaterorequal', 'ifbetween', 'xor' ];
	var allFuncs = mathFuncs.concat(otherFuncs);

	var convertFloat = function ( f ) {
		f = f.replace( /×\s?10/, 'e' );
		return f.replace( /[×⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, function (m) {
			return ({'⁰': 0,'¹': 1,'²': 2,'³': 3,'⁴': 4,'⁵': 5,'⁶': 6,'⁷': 7,'⁸': 8,'⁹': 9, '⁻': "-", "×": "e"})[m];
		} );
	};

	// Start parser code.
	var Numb = function(n) {
		if ( typeof n === 'number' ) {
			this.value = n;
		}
		this.value = parseFloat(n);
	}
	Numb.prototype.toString = function () { return 'Number<' + this.value + '>'; }

	var Ident = function(n) {
		this.value = n;
	}
	Ident.prototype.toString = function () { return 'IDENT<' + this.value + '>'; }

	var Operator = function(val, args) {
		this.op = val;
		this.args = args;
	}
	
	var Null = function() { }

	var Parser = function( text ) {
		this.text = text;
	};

	var terminals = {
		'IDENT': /^[a-zA-Z_][a-zA-Z0-9_]*/,
		'NUMBER': /^-?[0-9]+(?:\.[0-9]+)?(?:[eE][0-9]+|×10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)*/,
		'WS': /^\s*/,
		'PLUSMINUS': /^[+-]/,
		'pi': /^(?:pi|π)(?![A-z_0-9-])/i,
		'epsilon': /^EPSILON(?![A-z_0-9-])/,
		'Infinity': /^Infinity(?![A-z_0-9-])/i,
		'-Infinity': /^Infinity(?![A-z_0-9-])/i,
		'NaN': /^NaN(?![A-z_0-9-])/i,
		'MULTIPLYDIV': /^[*\/%×÷]/i,
	};

	Parser.prototype = {
		check: function(id) {
			if ( terminals[id] ) {
				return !!(this.text.match(terminals[id]))	
			}
			return this.text.startsWith( id )
		},
		consume: function(id) {
			if ( terminals[id] ) {
				var res = this.text.match(terminals[id]);
				this.text = this.text.substring( res[0].length );
				return res[0];
			}
			if ( this.text.startsWith( id ) ) {
				this.text = this.text.substring(id.length);
				return id;
			}
			throw new Error( "Expected " + id);
		},

		parse: function () {
			if ( this.text === undefined || this.text === '' ) return new Null();
			this.consume( 'WS' );
			res = this.expression();
			if( this.text.length !== 0 ) {
				throw new Error( "Unexpected end of text" );
			}
			return res;
		},

		expression: function () {
			var text2, res, res2;
			res = this.term();
			this.consume( 'WS' );
			while ( this.check( "PLUSMINUS" )) {
				var op = this.consume( "PLUSMINUS" );
				res2 = this.term();
				res = new Operator( op, [ res, res2 ] );
			}
			return res;
		},

		argList: function () {
			var args = [];
			this.consume( 'WS' );
			if ( this.check( ')' ) ) {
				this.consume( ')' );
				return args;
			}
			args[args.length] = this.expression();
			this.consume( 'WS' );

			while ( this.check( ',' ) ) {
				this.consume( ',' );
				this.consume( 'WS' );
				args[args.length] = this.expression();
			}
			this.consume( 'WS' );
			this.consume( ')' );
			return args;
		},
		term: function () {
			var text2, res, res2;
			res = this.factor();
			this.consume( 'WS' );
			while ( this.check( "MULTIPLYDIV" )) {
				var op = this.consume( "MULTIPLYDIV" );
				if ( op === '×' ) op = '*';
				if ( op === '÷' ) op = '/';
				res2 = this.term();
				res = new Operator( op, [ res, res2 ] );
			}
			return res;
		},
		factor: function () {
			if ( this.check( 'pi' ) ) {
				this.consume( 'pi' );
				return new Numb( Math.PI )
			}
			if ( this.check( 'Infinity' ) ) {
				this.consume( 'Infinity'  );
				return new Numb( Infinity );
			}
			if ( this.check( '-Infinity' ) ) {
				this.consume( '-Infinity'  );
				return new Numb( -Infinity );
			}
			if ( this.check( 'NaN' ) ) {
				this.consume( 'NaN'  );
				return new Numb( NaN );
			}
			if ( this.check( 'epsilon' ) ) {
				this.consume( 'epsilon' );
				return new Numb( Number.EPSILON );
			}

			for ( var i in allFuncs ) {
				if ( this.check( allFuncs[i] + '(' ) ) {
					this.consume(allFuncs[i] + '(');
					var argList = this.argList()
					return new Operator( allFuncs[i], argList );
				}
			}

			if ( this.check( 'IDENT' ) ) {
				return new Ident( this.consume( 'IDENT' ) );
			}
			if ( this.check( 'NUMBER' ) ) {
				return new Numb( convertFloat( this.consume( 'NUMBER' ) ) );
			}

			if ( this.check( '(' ) ) {
				this.consume( '(' );
				res = this.expression();
				this.consume( ')' );
				return res;
			}
			throw new Error( "Expected term");
		},
	};
	// End parser code.

	// Based on https://floating-point-gui.de/errors/comparison/
	var almostEquals = function( a, b ) {
		var absA = Math.abs(a);
		var absB = Math.abs(b);
		var diff = Math.abs(a-b);
		var epsilon = Number.EPSILON; /// Not sure if this is a good value for epsilon
		var minNormal = Math.pow( 2, -1022 );
		if ( a===b) {
			return true;
		}
		// Min normal of double = 2^-1022
		if ( a==0 || b==0 || absA+absB < minNormal ) {
			return diff < epsilon * minNormal;
		}

		return diff / Math.min((absA + absB), Number.MAX_VALUE) < epsilon;
	}

	var getValueOfElm = function (elm) {
		if ( elm.tagName === 'INPUT' ) {
			if ( elm.type === 'radio' || elm.type === 'checkbox' ) {
				return elm.checked ? 1 : 0;
			}
			return parseFloat( convertFloat( elm.value ) );
		} else {
			return parseFloat( convertFloat( elm.textContent ) );
		}
	}

	// Evaluate the value of an AST at runtime.
	var evaluate = function( ast, elmList ) {
		var i;
		if ( ast instanceof Numb ) {
			return ast.value;
		}
		if ( ast instanceof Ident ) {
			var elm = elmList[ast.value];
			return getValueOfElm( elm )
		}
		if ( ast instanceof Operator ) {
			evaledArgs = ast.args.map( function (i) { return evaluate( i, elmList ) } );
			if ( mathFuncs.indexOf(ast.op) !== -1 ) {
				return Math[ast.op].apply( Math, evaledArgs );
			}
			if ( 'coalesce' === ast.op ) {
				for ( var k = 0; k < evaledArgs.length; k++ ) {
					if ( !isNaN( evaledArgs[k] ) ) {
						return evaledArgs[k];
					}
				}
				return NaN;
			}
			if ( 'ifzero' === ast.op ) {
				if ( evaledArgs.length !== 3 ) {
					return NaN;
				}
				return almostEquals( evaledArgs[0], 0 ) ? evaledArgs[1] : evaledArgs[2];
			}
			if ( 'ifequal' === ast.op ) {
				if ( evaledArgs.length !== 4 ) {
					return NaN;
				}
				return almostEquals( evaledArgs[0], evaledArgs[1] ) ? evaledArgs[2] : evaledArgs[3];
			}
			if ( 'iffinite' === ast.op ) {
				if ( evaledArgs.length !== 3 ) {
					return NaN;
				}
				return isFinite( evaledArgs[0] ) ? evaledArgs[1] : evaledArgs[2];
			}
			if ( 'ifnan' === ast.op ) {
				if ( evaledArgs.length !== 3 ) {
					return NaN;
				}
				return isNaN( evaledArgs[0] ) ? evaledArgs[1] : evaledArgs[2];
			}
			if ( 'ifpositive' === ast.op ) {
				if ( evaledArgs.length !== 3 ) {
					return NaN;
				}
				return evaledArgs[0] >= 0 ? evaledArgs[1] : evaledArgs[2]
			}

			// I am a bit unsure what the proper thing to do about floating point rounding issues here
			// These will err on the side of returning true given rounding error. People can use ifpositive() if they
			// need precise.
			if ( 'ifless' === ast.op ) {
				if ( evaledArgs.length !== 4 ) {
					return NaN;
				}
				return evaledArgs[0] < evaledArgs[1] && !almostEquals( evaledArgs[0], evaledArgs[1] ) ? evaledArgs[2] : evaledArgs[3];
			}
			if ( 'ifgreater' === ast.op ) {
				if ( evaledArgs.length !== 4 ) {
					return NaN;
				}
				return evaledArgs[0] > evaledArgs[1] && !almostEquals( evaledArgs[0], evaledArgs[1] ) ? evaledArgs[2] : evaledArgs[3];
			}
			if ( 'iflessorequal' === ast.op ) {
				if ( evaledArgs.length !== 4 ) {
					return NaN;
				}
				return evaledArgs[0] <= evaledArgs[1] || almostEquals( evaledArgs[0], evaledArgs[1] ) ? evaledArgs[2] : evaledArgs[3];
			}
			if ( 'ifgreaterorequal' === ast.op ) {
				if ( evaledArgs.length !== 4 ) {
					return NaN;
				}
				return evaledArgs[0] >= evaledArgs[1] || almostEquals( evaledArgs[0], evaledArgs[1] ) ? evaledArgs[2] : evaledArgs[3];
			}
			// Should this use almostEquals???
			if ( 'ifbetween' === ast.op ) {
				if ( evaledArgs.length !== 5 ) {
					return NaN;
				}
				return evaledArgs[0] >= evaledArgs[1] && evaledArgs[0] <= evaledArgs[2] ? evaledArgs[3] : evaledArgs[4];
			}
			if ( 'bool' === ast.op ) {
				if ( evaledArgs.length !== 1 ) {
					return NaN;
				}
				return isNaN( evaledArgs[0] ) || almostEquals( evaledArgs[0], 0.0 ) ? 0 : 1;
			}
			if ( 'not' === ast.op ) {
				if ( evaledArgs.length !== 1 ) {
					return NaN;
				}
				return isNaN( evaledArgs[0] ) || almostEquals( evaledArgs[0], 0.0 ) ? 1 : 0;
			}
			if ( 'xor' === ast.op ) {
				if ( evaledArgs.length !== 2 ) {
					return NaN;
				}
				if (
					( ( isNaN( evaledArgs[0] ) || almostEquals( evaledArgs[0], 0.0 ) ) && !( isNaN( evaledArgs[1] ) || almostEquals( evaledArgs[1], 0.0 ) ) ) ||
					( ( isNaN( evaledArgs[1] ) || almostEquals( evaledArgs[1], 0.0 ) ) && !( isNaN( evaledArgs[0] ) || almostEquals( evaledArgs[0], 0.0 ) ) )
				) {
					return 1;
				} else {
					return 0;
				}
			}
			// Short circuit like in lua
			if ( 'and' === ast.op ) {
				for ( i = 0; i < evaledArgs.length; i++ ) {
					if ( isNaN( evaledArgs[i] ) || almostEquals( evaledArgs[i], 0.0 ) ) {
						return evaledArgs[i];
					}
				}
				return evaledArgs.length >= 1 ? evaledArgs[evaledArgs.length-1] : 1;
			}
			if ( 'or' === ast.op ) {
				for ( i = 0; i < evaledArgs.length; i++ ) {
					if ( !isNaN( evaledArgs[i] ) && !almostEquals( evaledArgs[i], 0.0 ) ) {
						return evaledArgs[i];
					}
				}
				return evaledArgs.length >= 1 ? evaledArgs[evaledArgs.length-1] : 0;
			}

			// js Math.round is weird. Do our own version. Based on https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
			// This does round-half away from zero, with floating point error correction.
			if ( 'round' === ast.op ) {
				var decimals = evaledArgs.length >= 2 ? evaledArgs[2] : 0;
				var p = Math.pow( 10,  decimals );
				var n = (evaledArgs[0] * p) * (1 + Number.EPSILON);
				return Math.round(n)/p;
			}

			// In case anyone wants normal js round.
			if ( ast.op === 'jsround' ) {
				return Math.round.apply( Math, evaledArgs );
			}

			if ( evaledArgs.length !== 2 ) {
				throw new Error( "Unexpected number of args for " + ast.op );
			}
			if ( ast.op === '*' ) return evaledArgs[0]*evaledArgs[1];
			if ( ast.op === '/' ) return evaledArgs[0]/evaledArgs[1];
			if ( ast.op === '+' ) return evaledArgs[0]+evaledArgs[1];
			if ( ast.op === '-' ) return evaledArgs[0]-evaledArgs[1];
			if ( ast.op === '%' ) return evaledArgs[0]%evaledArgs[1];
			throw new Error( "Unrecognized operator " + ast.op );
		}
		return NaN;
	}

	// Start dependency graph code

	var getIdentifiers = function( tree ) {
		if ( tree instanceof Ident ) {
			return new Set([tree.value]);
		}
		if ( tree instanceof Operator ) {
			var res = new Set([]);
			for ( var i = 0; i < tree.args.length; i++ ) {
				getIdentifiers( tree.args[i] ).forEach( function (x) { res.add(x) } );
			}
			return res;
		}
		return new Set();
	}

	// e.g. if a=foo+1 then backlinks['foo'] = ['a',...]
	var buildBacklinks = function (items) {
		var backlinks = {};
		for ( var item in items ) {
			var idents = getIdentifiers( items[item] );
			// Set does not do for..in loops, and this version MW forbids for..of
			idents.forEach( function (ident) {
				if ( !backlinks[ident] ) {
						backlinks[ident] = [];
				}
				backlinks[ident].push( item );
			} );
		}
		return backlinks;
	};

	// End dependency graph code

	// Start code that does setup and HTML interaction.

	var setup = function ( $content ) {
		// We allow users to group calculator widgets inside a <div class="calculator-container"> to scope
		// ids just to that group. That way you can use a specific template multiple times on the same page.
		// (Perhaps we should turn it into a <fieldset>?).
		var containers = Array.from( $content.find( '.calculator-container' ) );
		for ( var i = 0; i < containers.length; i++ ) {
			new CalculatorWidgets( Array.from( containers[i].getElementsByClassName( 'calculator-field' ) ), containers[i] );
		}
		// Anything not in a container is scoped to the page.
		var elms = Array.from( $content.find( '.calculator-field' ) );
		new CalculatorWidgets( elms, $content[0] );

		$content.find( '.calculator-field-label[data-for]').replaceWith( function() {
			var l = $( '<label>' );
			if ( !this.dataset.for || !this.dataset.for.match( /^calculator-field-[a-zA-Z_][a-zA-Z0-9_]*$/ ) || !$content.find( '#' + $.escapeSelector( this.dataset.for ) ) ) {
				return this;
			}
			l.attr( 'for', this.dataset.for );
			if ( this.id ) {
				l.attr( 'id', this.id );
			}
			if ( this.title ) {
				l.attr( 'title', this.title );
			}
			if ( this.style.cssText ) {
				l.attr( 'style', this.style.cssText );
			}
			if ( this.classList.contains( 'cdx-label__label' ) ) {
				mw.loader.load( '@wikimedia/codex' );
			}
			if ( this.className !== 'calculator-field-label' ) {
				l.attr( 'class', this.className.replace( /(^| )calculator-field-label( |$)/g, ' ' ) );
			}
			l.html( this.innerHTML );
			return l;
		} );
	}

	var doStats = function () {
		if ( window.calculatorStatsAlreadyDone !== true ) {
			window.calculatorStatsAlreadyDone = true;
			mw.track( 'counter.gadget_calculator._all' );
			mw.track( 'counter.gadget_calculator.' + mw.config.get( 'wgDBname' ) + '_all' );
			var statName = mw.config.get( 'wgDBname' ) + '_' + mw.config.get( 'wgPageName' );
			statName = encodeURIComponent( statName );
			// Symbols don't seem to work.
			statName = statName.replace( /[^a-zA-Z0-9_]/g, '_' );
			mw.track( 'counter.gadget_calculator.' + statName );
		}
	}

	var CalculatorWidgets = function( elms, parent ) {
		this.parent = parent;
		this.itemList = {};
		this.elmList = {};
		this.backlinks = {};
		this.inProgressRefresh = undefined;

		if (elms.length > 200) {
			console.log( "Too many calculator widgets on page" );
			return;
		}
		for ( var i in elms ) {
			var elm = elms[i];
			var formula = elm.dataset.calculatorFormula;
			if ( formula && formula.length > 2000 ) {
				console.log( "Skipping element with too long formula" );
				continue;
			}
			var type = elm.dataset.calculatorType;
			var readonly = !!elm.dataset.calculatorReadonly;
			var id = elm.id;
			if ( !id ) {
				id = 'calculator-field-auto' + Math.floor( Math.random()*10000000 );
			}
			var defaultVal = elm.textContent;
			if ( type === undefined || !id.match( /^calculator-field-[a-zA-Z_][a-zA-Z0-9_]*$/ ) ) {
				console.log( "Skipping " + id );
				continue;
			}

			try {
				var formulaAST = (new Parser( formula )).parse();
			} catch( e ) {
				console.log( "Error parsing formula of " + id + ": " + e.message );
				continue;
			}
			if ( elm.className.match( /(^| )cdx-/ ) || ( elm.dataset.calculatorClass && elm.dataset.calculatorClass.match( /(^| )cdx-/ ) ) ) {
				// The input is using CSS-only codex modules. Unfortunately i think we have to load the whole thing.
				// we are going to have a flash of unstyled content no matter what we do since we are converting elements at load time, so don't worry about that.
				mw.loader.load( '@wikimedia/codex' );
			}
			if ( type !== 'plain' && type !== 'passthru' ) {
				var input = document.createElement( 'input' );
				input.className = 'calculator-field-live';
				if ( elm.className !== 'calculator-field' ) input.className += ' ' + elm.className.replace( /(^| )calculator-field($| )/g, ' ' );
				input.readOnly = readonly
				input.value = parseFloat(defaultVal);
				input.style.cssText = elm.style.cssText; // This should be safe because elm's css was sanitized by MW
				if ( elm.dataset.calculatorSize ) {
					var size = parseInt( elm.dataset.calculatorSize );
					input.size = size
					// Browsers are pretty inconsistent so also set as css
					// Firefox shows a number selector that seems to always be 20px wide regardless of font.
					// Chrome shows the selector only on hover.
					input.style.width = type === 'number' ? "calc( " + size + 'ch' + ' + 20px)': size + 'ch';
				}
				// Add css class, but only if the gadget is enabled.
				if ( elm.dataset.calculatorClass ) input.className += ' ' + elm.dataset.calculatorClass;
				if ( elm.dataset.calculatorSize ) input.size = elm.dataset.calculatorSize;
				if ( elm.dataset.calculatorMax ) input.max = elm.dataset.calculatorMax;
				if ( elm.dataset.calculatorMin ) input.min = elm.dataset.calculatorMin;
				if ( elm.dataset.calculatorPlaceholder ) input.placeholder = elm.dataset.calculatorPlaceholder;
				if ( elm.dataset.calculatorStep ) input.step = elm.dataset.calculatorStep;
				if ( elm.dataset.calculatorPrecision ) input.dataset.calculatorPrecision = elm.dataset.calculatorPrecision;
				if ( elm.dataset.calculatorExponentialPrecision ) input.dataset.calculatorExponentialPrecision = elm.dataset.calculatorExponentialPrecision;
				if ( elm.dataset.calculatorDecimals ) input.dataset.calculatorDecimals = elm.dataset.calculatorDecimals;
				if ( elm.dataset.calculatorNanText ) input.dataset.calculatorNanText = elm.dataset.calculatorNanText;
				// Name is primarily for radio groups. Prefix to prevent dom clobbering or in case it ends up in a form somehow.
				if ( elm.dataset.calculatorName ) input.name = 'calcgadget-' + elm.dataset.calculatorName;
				if ( type === 'number' || type === 'text' || type === 'radio' || type === 'checkbox' || type === "hidden" || type === "range" ) {
					input.type = type;
				}
				if ( type === 'radio' || type === 'checkbox' ) {
					input.onchange = this.changeHandler.bind(this); // some browsers dont fire oninput for checkboxrs/radio
					if ( !isNaN( defaultVal ) && !almostEquals( defaultVal, 0 ) ) {
						input.checked = true;
					}
				}
				input.id = id;
				elm.replaceWith( input );
				elm = input;
				input.oninput = this.changeHandler.bind(this);
			} else {
				elm.classList.remove( 'calculator-field' );
				elm.classList.add( 'calculator-field-live' );
				if ( elm.dataset.calculatorClass ) elm.className += ' ' + elm.dataset.calculatorClass;
				if ( formula && type !== 'passthru' ) {
					// Tell screen reader to announce changes right away.
					// unclear if this is too assertive. It is also unclear if we should also do this for <input>'s.
					elm.setAttribute( 'role', 'alert' );
				}
			}
			var itemId = id.replace( /^calculator-field-/, '' );
			this.itemList[itemId] = formulaAST;
			this.elmList[itemId] = elm;
		}
		this.backlinks = buildBacklinks( this.itemList );
		if ( this.parent.dataset.calculatorRefreshOnLoad && this.parent.dataset.calculatorRefreshOnLoad === 'true' ) {
			this.inProgressRefresh = {};
			this.refresh( Object.keys( this.itemList ) );
			this.inProgressRefresh = undefined;
		}
	}

	CalculatorWidgets.prototype.changeHandler = function(e) {
		this.inProgressRefresh = {};
		doStats();
		var itemId = e.target.id.replace( /^calculator-field-/, '' );
		this.inProgressRefresh[itemId] = true;
		this.setValueProperties( e.target, getValueOfElm( e.target ) );
		this.refresh( this.backlinks[itemId] );

		if ( e.target.type === 'radio' ) {
			// when a radio element gets checked, others get unchecked.
			// Note: This is a bit sketchy if multiple wikipage contents are added with overlapping names
			// It should work in the live preview case, since hopefully older elements with conflicting
			// names would no longer be live, but might not work fully correctly in the general case.
			var otherElms = document.getElementsByName( e.target.name );
			for ( var l = 0; l < otherElms.length; l++ ) {
				if ( otherElms[l].id === e.target.id ) {
					continue;
				}
				var oElmId = otherElms[l].id.replace( /^calculator-field-/, '' );
				if ( this.backlinks[oElmId] ) {
					this.refresh( this.backlinks[oElmId] );
				}
			}
		}
		this.inProgressRefresh = undefined;
	}

	var format = function ( n, options ) {
		var res = n.toString();
		if ( typeof n !== "number" ) {
			return res;
		}
		if ( isNaN( n ) && options.calculatorNanText ) {
			return options.calculatorNanText;
		}
		if ( !isNaN( parseInt( options.calculatorDecimals ) ) ) {
			res = n.toFixed( parseInt( options.calculatorDecimals ) );
		}
		if ( !isNaN( parseInt( options.calculatorPrecision ) ) ) {
			res = n.toPrecision( parseInt( options.calculatorPrecision ) );
		}
		if ( !isNaN( parseInt( options.calculatorExponentialPrecision ) ) ) {
			res = n.toExponential( parseInt( options.calculatorExponentialPrecision ) );
		}

		res = res.replace( /e([+-])([0-9]+)$/, function (m, sign, exp) {
			var tmp = "×10";
			if ( sign === '-' ) {
				tmp += '⁻';
			}
			tmp += exp.replace( /[0-9]/g, function (m) {
				return [ '⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹' ][m];
			} );
			return tmp;
		} );
		return res;
	};

	// Set a data attribute, classes, etc. For ease of targeting via CSS.
	CalculatorWidgets.prototype.setValueProperties = function ( elm, value ) {
			var itemId = elm.id.replace( /^calculator-field-/, '' );
			elm.dataset.calculatorFieldValue = value.toFixed(5);
			this.parent.style.setProperty( '--calculator-' + itemId, value );
			if ( !isNaN( value ) && !almostEquals( value, 0 ) ) {
				elm.classList.remove( 'calculator-value-false' );
				elm.classList.add( 'calculator-value-true' );
			} else {
				elm.classList.remove( 'calculator-value-true' );
				elm.classList.add( 'calculator-value-false' );
			}
	}

	CalculatorWidgets.prototype.refresh = function (itemIds) {
		var i;
		// Based on https://en.wikipedia.org/wiki/Topological_sorting#Depth-first_search
		var permMarks = Object.create(null);
		var tempMarks =  Object.create(null);
		var topList = [];
		var that = this;
		if ( !itemIds ) {
			return;
		}
		var visit = function( item ) {
			if ( permMarks[item] ) {
				return;
			}
			if ( tempMarks[item] ) {
				console.log( "Loop detected in calculator. '" + item + "' may not be updated properly" );
				return;
			}
			tempMarks[item] = true;
			for ( var i = 0; that.backlinks[item] && i < that.backlinks[item].length; i++ ) {
				visit(that.backlinks[item][i]);
			}
			permMarks[item] = true;
			topList.push(item); // later we iterate backwards through this list.
		};
		for ( i = 0; i < itemIds.length; i++ ) {
			visit( itemIds[i] );
		}

		for ( i = topList.length - 1; i >= 0; i-- ) {
			var itemId = topList[i];
			if ( this.inProgressRefresh[itemId] ) {
				console.log( "Loop Detected! Skipping " + itemId );
				continue;
			}
			if ( !this.itemList[itemId] || this.itemList[itemId] instanceof Null ) {
				// This should not happen.
				console.log( "Tried to refresh field with no formula" );
				continue;
			}
			this.inProgressRefresh[itemId] = true;
			var res = evaluate( this.itemList[itemId], this.elmList );
			var elm = this.elmList[itemId];

			this.setValueProperties( elm, res );
			if ( elm.tagName === 'INPUT' ) {
				elm.value = elm.type === "number" || elm.type === "range" ? res : format( res, elm.dataset );
				if ( elm.type === 'radio' || elm.type === 'checkbox' ) {
					elm.checked = !isNaN( res ) && !almostEquals( res, 0 );
				}
			} else if ( elm.dataset.calculatorType !== 'passthru' ) {
				// plain type.
				elm.textContent = format( res, elm.dataset );
			}
		}
	};

	mw.hook( 'wikipage.content' ).add( setup );
} )();