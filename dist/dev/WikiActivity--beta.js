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
 * Version: v1.5b
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
		//
		const wka = this;
		
		//
		const SUPPORTED_NAMESPACES = Object.freeze( [ 
			0, // Article
			1, // Talk
			2, // User
			3, // User Talk
			4, // Project (SITENAME)
			5, // Project (SITENAME) Talk
			6, // File
			7, // File Talk
			110, // Forum
			111, // Forum Talk
			500, // User blog
			501, // User blog comment
			828, // Module
			829 // Module Talk
		] );
		
		//
		const IS_TALK = Object.freeze( [ 3, 5, 111, 829 ] );
		
		//
		const CAN_BLOCK = Object.freeze( [ 
			"staff",
			"helper",
			"wiki-representative",
			"wiki-specialist",
			"soap",
			"global-discussions-moderator",
			"sysop"
		] );
		
		// 
		const IS_MOD = Object.freeze( CAN_BLOCK.concat( "discussion-moderator", "threadmoderator" ) );
		
		//
		const CAN_PATROL = Object.freeze( CAN_BLOCK.concat( "patroller" ) );
		
		//
		const CAN_ROLLBACK = Object.freeze( CAN_BLOCK.concat( "rollback" ) );
		
		//
		const SCRIPTS = Object.freeze( { 
			i18n: "u:dev:MediaWiki:I18n-js/code.js",
			colors: "u:dev:MediaWiki:Colors/code.js",
			wds: "u:dev:MediaWiki:WDSIcons/code.js",
			ui: "u:dev:MediaWiki:UI-js/code.js"
		} );
		
		// 
		
		// 
		wka.HEADER_LINK = false;
		
		// 
		wka.SHOW_BOT_EDITS = false;
		
		// 
		wka.LOAD_MODULE = false;
		
		//
		wka.REFRESH = false;
		
		// 
		wka.REFRESH_DELAY = 300000;
		
		//
		wka.TIMEOUT = 10000;
		
		//
		wka.LIMIT = 50;
		
		//
		wka.DEFAULTS = Object.freeze( { } );
		
		//
		wka.CAN_BLOCK = mw.config.get( "wgUserGroups" ).some( function( group ) { 
			return CAN_BLOCK.includes( group );
		} );
		
		//
		wka.IS_MOD = mw.config.get( "wgUserGroups" ).some( function( group ) { 
			return IS_MOD.includes( group );
		} );
		
		//
		wka.CAN_PATROL = mw.config.get( "wgUserGroups" ).some( function( group ) { 
			return CAN_PATROL.includes( group );
		} );
		
		//
		wka.CAN_ROLLBACK = mw.config.get( "wgUserGroups" ).some( function( group ) { 
			return CAN_ROLLBACK.includes( group );
		} );
		
		
		//
		wka.AVATAR_CACHE = { };
	}
} )( window, jQuery, mediaWiki );