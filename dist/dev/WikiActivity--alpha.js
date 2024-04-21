/**
 * WikiActivity
 *
 * Recreates the legacy Special:WikiActivity page on the Unified
 * Community platform with a modernized appearance and a few
 * upgrades.
 *
 * Note: This script is a community project and is high-traffic.
 * If you know what you're doing and need to make any changes
 * that will impact the users of the script, you are welcome
 *
 * Author: Ultimate Dark Carnage
 * Version: v1.5a
 **/
( function( window, $, mw ) { 
	"use strict";

	// Sets the configuration object to an empty object if it does not exist
	window.wikiActivity = window.wikiActivity || window.rwaOptions || { };

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
	
	// Creates a script logger
	function Logger( name, checker ) { 
		if ( arguments.length === 1 ) { 
			checker = name;
			name = "Logger";
		} else if ( arguments.length === 0 ) { 
			name = "Logger";
			checker = true;
		}
		
		const logger = this;
		
		const canCheck = ( typeof checker === "boolean" ) ?
			checker : ( typeof checker === "function" ? 
				checker.call( logger ) : String( checker ) );
		
		const authors = Object.freeze( [ 
			"Ultimate Dark Carnage",
			"Mercer The Dark Lord"
		] );
		
		const adminGroups = Object.freeze( [ 
			"staff",
			"soap",
			"wiki-specialist",
			"bureaucrat",
			"sysop"
		] );
		
		if ( canCheck === "author" ) { 
			logger.canCheck = authors.includes( mw.config.get( "wgUserName" ) );
		} else if ( canCheck === "admin" ) { 
			logger.canCheck = mw.config.get( "wgUserGroups" ).some( function( group ) { 
				return adminGroups.includes( group );
			} );
		} else { 
			logger.canCheck = Boolean( canCheck );
		}
		
		const logTypes = Object.freeze( [ 
			"log",
			"warn",
			"error"
		] );
		
		logTypes.forEach( function( type ) { 
			logger[ type ] = function( value ) {
				const logString = name + ": " + value;
				return logger.canCheck ? console[ type ]( logString ) : false;
			};
		} );
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

						if ( window.dev && window.dev[ name ] ) { 
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

	// The main WikiActivity object
	function WikiActivity( opts ) { 
		// Sets the current instance to a variable
		const wka = this;
		
		// The current version of the script
		wka.VERSION = "v1.5";
		
		// The current script name
		wka.NAME = "WikiActivity";
		
		// Scripts dependent on running WikiActivity
		wka.SCRIPTS = Object.freeze( { 
			"i18n": "u:dev:MediaWiki:I18n-js/code.js",
			"wds": "u:dev:MediaWiki:WDSIcons/code.js",
			"dorui": "u:dev:MediaWiki:Dorui.js",
			"colors": "u:dev:MediaWiki:Colors/code.js"
		} );
		
		// Stylesheets for the WikiActivity script
		wka.STYLESHEETS = Object.freeze( [
			"u:dev:MediaWiki:WikiActivity.css", // Root stylesheet
			"u:dev:MediaWiki:WikiActivity/legacy.css"
		] );
		
		// MediaWiki modules to check for
		wka.MODULES = Object.freeze( [ 
			"mediawiki.api",
			"mediawiki.Title",
			"mediawiki.Uri"
		] );
		
		// The setters object
		wka.SETTERS = Object.freeze( { 
			// Determines whether to debug the script
			debug: "DEBUG",
			// The current theme name for the script
			themeName: "THEME_NAME",
			// Determines whether to show bot edits
			showBotEdits: "SHOW_BOT_EDITS",
			// Determines whether the Recent Changes link should be changed to WikiActivity
			headerLink: "HEADER_LINK",
			// Determines whether the activity feed should be loaded on a module
			loadModule: "LOAD_MODULE",
			// Allows for custom rendering when a theme is set
			customRendering: function( value ) { 
				Object
					.getOwnPropertyNames( value )
					.forEach( function( property ) { 
						wka.CUSTOM_RENDERING[ property ] = value[ property ];
					} );
			},
			// Determines whether the activity feed should automatically refresh
			refresh: "REFRESH",
			// The delay for refreshing the activity feed (in minutes)
			refreshDelay: function( v ) { 
				if ( isNaN( v ) || !isFinite( v ) ) { 
					wka.REFRESH_DELAY = 300000;
					return;
				}
				
				wka.REFRESH_DELAY = v * 60000;
			}
		} );
		
		// Default configuration object
		wka.DEFAULTS = Object.freeze( { } );
		
		// Create the logger object
		wka.LOGGER = new Logger( wka.NAME, wka.DEBUG );
		
		// The main loader for the WikiActivity script
		wka.LOADER = new Loader( { 
			SCRIPTS: wka.SCRIPTS,
			STYLESHEETS: wka.STYLESHEETS,
			MODULES: wka.MODULES
		}, wka.init, wka );
		
		// Initializes the loader
		wka.LOADER.init( );
		
		return wka;
	}
} )( window, jQuery, mediaWiki );