/**
 * PortableCSSPad
 * 
 * Creates a module that allows you to write or paste CSS rules.
 * The primary script provides a simple API
 **/
( function( window, $, mw ) { 
	"use strict";
	
	function insertAtCaret( el, text ) { 
		text = text || "";
		
		if ( el.selectionStart || el.selectionStart === 9 ) { 
			const start = el.selectionStart, end = el.selectionEnd;
			el.value = el.value.substring( 0, start ) + 
				text + el.value.substring( end, el.value.length );
			
			el.selectionStart = start + text.length;
			el.selectionEnd = end + text.length;
		} else {
			el.value += text;
		}
	}
	
	// Creates a spinner constructor
	function Spinner( size ) {
		// Set the size to an object if the size is a number
		if ( typeof size !== "object" ) { 
			if ( !isNaN( size ) && isFinite( size ) ) { 
				size = { width: Number( size ), height: Number( size ) };
			} else { 
				throw new TypeError( "The value must either be an object or a finite number." );
			}
		}

		// The current spinner instance
		const sp = this;

		// The spinner element
		const spinner = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );
		spinner.classList.add( "wds-spinner", "wds-spinner__block" );

		const spinnerAttr = Object.freeze( { 
			width: size.width,
			height: size.height,
			viewBox: [ 0, 0, 66, 66 ].join( " " ),
			xmlns: "http://www.w3.org/2000/svg"
		} );

		Object.getOwnPropertyNames( spinnerAttr )
			.forEach( function( property ) { 
				const value = spinnerAttr[ property ];
				spinner.setAttribute( property, value );
			} );

		// The grouping element
		const g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
		g.setAttribute( "transform", "translate(33, 33)" );

		// The circle element
		const c = document.createElementNS( "http://www.w3.org/2000/svg", "circle" );
		c.classList.add( "wds-spinner__stroke" );

		const cAttr = Object.freeze( { 
			fill: "none",
			r: 30,
			"stroke-width": 2,
			"stroke-dasharray": 188.49555921538757,
			"stroke-dashoffset": 188.49555921538757,
			"stroke-linecap": "round"
		} );

		Object.getOwnPropertyNames( cAttr )
			.forEach( function( property ) { 
				const value = cAttr[ property ];
				c.setAttribute( property, value );
			} );
		
		// Creates the spinner element
		g.append( c );
		spinner.append( g );

		// Returns the actual element
		sp.el = function( ) { 
			return spinner;
		};

		// Returns the outer html
		sp.html = function( ) { 
			return spinner.outerHTML;
		};
	}

	// Creates a script loader constructor
	function Loader( resources, callback, thisArg ) { 
		// Sets the current instance in a variable
		const al = this;
		
		// If there are less than three arguments, set the context to the current instance
		if ( arguments.length < 3 ) thisArg = this;

		// An array of loaded scripts
		al.loadedScripts = [ ];

		// An array of MediaWiki modules
		al.modules = resources.MODULES || [ ];

		// An object of scripts to load
		al.scripts = resources.SCRIPTS || { };

		// An array of stylesheets to load
		al.stylesheets = resources.STYLESHEETS || [ ];

		// Initializes the loader
		al.init = function( ) { 
			if ( Array.isArray( al.modules ) && al.modules.length ) { 
				return mw.loader
					.using( al.modules )
					.then( al.loadScripts.bind( al ) );
			}

			al.loadScripts( );
		};

		// Loads all scripts and stylesheets if they are not loaded
		al.loadScripts = function( ) { 
			if ( Array.isArray( al.stylesheets ) && al.stylesheets.length ) { 
				importArticles( { type: "style", articles: al.stylesheets } );
			}

			const promises = Promise.all( 
				Object
					.getOwnPropertyNames( al.scripts )
					.map( function( name ) { 
						const script = al.scripts[ name ];

						if ( window.dev[ name ] ) { 
							al.loadedScripts.push( script );
							return Promise.resolve( );
						}

						return new Promise( function( resolve, reject ) { 
							importArticle( { 
								type: "script",
								article: script
							} ).then( function( ) { 
								al.loadedScripts.push( script );
							} ).then( resolve )[ "catch" ]( reject );
						} );
					} )
			);

			return promises.then( function( ) { 
				al.loaded = true;
				return callback.apply( thisArg, al );
			} );
		};

		return al;
	}
	
	function PortableCSSPad( opts ) { 
		const pad = this;
		
		pad.init = function( ) { 
			pad.ui = window.dev.dorui;
			pad.wds = window.dev.wds;
			
			mw.hook( "dev.i18n" ).add( function( i18no ) { 
				pad.i18no = i18no;
				i18no
					.loadMessages( pad.NAME )
					.then( pad.loadMessages );
			} );
		};
		
		pad.loadMessages = function( i18n ) { 
			pad.i18n = i18n;
			
			function getInstance( name, args ) { 
				if ( typeof args === "undefined" ) return pad.i18n.msg( name );
				args = Array.from( args );
				args.unshift( name );
				return pad.i18n.msg.apply( pad.i18n, args );
			}
			
			pad.msg = function( name ) { 
				return Object.freeze( { 
					parse: function( ) { 
						return getInstance( name, arguments ).parse( );
					},
					escape: function( ) { 
						return getInstance( name, arguments ).escape( );
					},
					plain: function( ) { 
						return getInstance( name, arguments ).plain( );
					},
					encode: function( ) { 
						return encodeURIComponent( this.plain( ) );
					},
					decode: function( ) { 
						return decodeURIComponent( this.plain( ) );
					},
					exists: getInstance( name ).exists,
					toString: function( ) { 
						return this.escape( );
					}
				} );
			};
		};
		
		pad.LOADER = new Loader( { }, pad.init, pad );
		
		pad.LOADER.init( );
	}
	
	window.Pad = new PortableCSSPad( );
} )( window, jQuery, mediaWiki );