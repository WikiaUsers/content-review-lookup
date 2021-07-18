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
 * Version: v2.1
 **/

( function( window, $, mw ) { 
	"use strict";
	
	// Creating the options object
	const options = $.extend( { }, window.waOptions, window.wikiActivityOptions );
	
	// Prevent double-running
	if ( 
		window.WikiActivity ||
		options.disabled 
	) return;
	
	// Fetching MediaWiki variables
	const mwc = mw.config.get( );
	
	// Setting the WikiActivity object
	function WAController( ) { 
		// Allows instantiation without using the "new" keyword
		if ( !( this instanceof WAController ) ) return new WAController( );
		
		// Sets the current instance as a variable
		const wa = this;

		// Helper function to escape regex strings
		function regesc( s ) { 
			return s.replace( /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&" );
		}

		// Helper function to check if a user is a member of a group
		function isMember( groups ) { 
			const g = Array.isArray( groups ) ? groups : [ groups ];
			return g.some( function( group ) { 
				return mwc.wgUserGroups.includes( group );
			} );
		}

		// Dispatches the loader
		function dispatchLoader( options ) { 
			function load( modules ) { 
				const loader = { };
				
				loader.scripts = typeof options.scripts === "string" ?
					[ options.scripts ] : 
					( Array.isArray( options.scripts ) ? 
						options.scripts : [ ] );
				
				loader.stylesheets = typeof options.stylesheets === "string" ?
					[ options.stylesheets ] : 
					( Array.isArray( options.stylesheets ) ? 
						options.stylesheets : [ ] );
				
				loader.modules = modules;
				
				loader.loadedScripts = [ ];
				
				loader.loadedStylesheets = [ ];

				loader.objects = new Proxy( { }, { 
					get: function( target, property ) { 
						return typeof target[ property ] !== "undefined" ? 
							target[ property ] : 
							null; 
					}
				} );
				
				Array.from( loader.stylesheets ).forEach( function( stylesheet ) { 
					importArticle( { 
						type: "style",
						article: stylesheet
					} ).then( function( ) { 
						loader.loadedStylesheets.push( stylesheet );
					} );
				} );
				
				return Promise.all( loader.scripts.map( function( script ) { 
					if ( typeof script === "string" ) script = { page: script };
					
					const baseObject = script.baseObject || { };
					const prop = script.id || null, hook = script.hook || null, page = script.page;
					
					if ( 
						baseObject && 
						baseObject.hasOwnProperty( prop ) 
					) { 
						loader.objects[ prop ] = baseObject[ prop ];
						loader.loadedScripts.push( page );
						return Promise.resolve( );
					}
					
					return importArticle( { 
						type: "script",
						article: page
					} ).then( function( ) { 
						return new Promise( function( resolve ) {
							if ( hook ) {
								mw.hook( hook ).add( function( ) { 
									const args = Array.from( arguments );
									if ( prop ) loader.objects[ prop ] = args.length === 1 ? args[ 0 ] : args;
									resolve.apply( null, args );
								} );
							} else {
								if ( prop ) loader.objects[ prop ] = baseObject[ prop ];
								resolve( );
							}
						} );
					} );
				} ) )
				.then( function( ) {
					return new Proxy( loader, { 
						get: function( obj, prop ) { 
							return obj[ prop ] || null;
						}
					} );
				} );
			}
			
			return new Promise( function( resolve, reject ) { 
				if ( 
					( "modules" in options && Array.isArray( options.modules ) ) ||
					( "module" in options && typeof options.module === "string" )
				) {
					const modules = "module" in options ? [ options.module ] : options.modules;
					mw.loader.using( modules ).then( function( ) { 
						load( modules ).then( resolve );
					} );
				} else { 
					load( [ ] ).then( resolve );
				}
			} );
		}

		// Timeago function
		function timeago( epoch ) { 
			const delta = Math.round( ( Date.now( ) - new Date( epoch * 1000 ) ) / 1000 );
			const absDelta = Math.abs( delta );

			if ( isNaN( delta ) ) return "";

			const minutes = Math.round( delta / 60 ), hours = Math.round( minutes / 60 );
			const days = Math.round( hours / 24 ), months = Math.round( days / 30 ), years = Math.round( months / 12 );

			const props = Object.freeze( { 
				ago: function( ) { 
					return delta > 5;
				},
				justnow: function( ) { 
					return absDelta < 5;
				},
				time: function( ) { 
					return delta < -5;
				}
			} );

			const type = Object.getOwnPropertyNames( props )
				.find( function( prop ) { 
					const condition = props[ prop ];
					return condition( );
				} );
			
			if ( !type ) return "";

			if ( type === "justnow" ) return wa.msg( "timeago-justnow" ).parse( );
			
			const units = new Map( [ 
				[ "seconds", function( ) { 
					return absDelta < 60;
				} ],
				[ "minute", function( ) { 
					return absDelta >= 60 && Math.abs( minutes ) < 2;
				} ],
				[ "minutes", function( ) { 
					return Math.abs( minutes ) >= 2 && Math.abs( minutes ) < 60;
				} ],
				[ "hour", function( ) { 
					return Math.abs( minutes ) >= 60 && Math.abs( hours ) < 2;
				} ],
				[ "hours", function( ) { 
					return Math.abs( hours ) >= 2 && Math.abs( hours ) < 24;
				} ],
				[ "day", function( ) { 
					return Math.abs( hours ) >= 24 && Math.abs( days ) < 2;
				} ],
				[ "days", function( ) { 
					return Math.abs( days ) >= 2 && Math.abs( days ) < 30;
				} ],
				[ "month", function( ) { 
					return Math.abs( days ) >= 30 && Math.abs( months ) < 2;
				} ],
				[ "months", function( ) { 
					return Math.abs( months ) >= 2 && Math.abs( months ) < 12;
				} ],
				[ "year", function( ) { 
					return Math.abs( months ) >= 12 && Math.abs( years ) < 2;
				} ],
				[ "years", function( ) { 
					return Math.abs( years ) >= 2;
				} ]
			] );

			const unit = Array.from( units.keys( ) )
				.find( function( key ) { 
					const condition = units.get( key );
					return condition( );
				} );

			if ( !unit ) return "";

			const values = new Map( [ 
				[ "seconds", delta ],
				[ "minutes", minutes ],
				[ "hour", false ],
				[ "hours", hours ],
				[ "day", false ],
				[ "days", days ],
				[ "month", false ],
				[ "months", months ],
				[ "year", false ],
				[ "years", years ]
			] );

			if ( !values.has( unit ) ) return "";

			const value = values.get( unit );
			
			const instance = typeof value === "number" ?
				wa.msg( "timeago-" + unit + "-" + type, value ) : 
				wa.msg( "timeago-" + unit + "-" + type );
			
			if ( !instance.exists ) return "";

			return instance.parse( );
		}

		// Member check
		const CAN_BLOCK = Object.freeze( [ "sysop", "staff", "wiki-manager", "helper", "soap", "global-discussions-moderator" ] );
		wa.canBlock = isMember( CAN_BLOCK );

		const CAN_DELETE = Object.freeze( CAN_BLOCK.concat( [ "discussion-moderator", "threadmoderator" ] ) );
		wa.isMod = wa.canDelete = isMember( CAN_DELETE );

		const CAN_ROLLBACK = Object.freeze( CAN_DELETE.concat( "rollback" ) );
		wa.canRollback = isMember( CAN_ROLLBACK );
		
		const CAN_PATROL = Object.freeze( CAN_DELETE.concat( "patroller" ) );
		wa.canPatrol = isMember( CAN_PATROL );

		// Setting the configuration object
		wa.options = $.extend( { }, options );

		// Default configurations
		wa.defaults = Object.freeze( { 
			// The limit of pages to show on the activity feed at one time
			limit: 50,
			// Sets the WikiActivity theme
			theme: "main",
			// A list of namespaces to exclude
			excludedNamespaces: [ ],
			// Determines whether to show bot edits
			showBotEdits: false,
			// Determines whether the activity feed should be loaded on a module
			loadModule: false,
			// Allows for custom rendering
			customRendering: { },
			// Determines whether the RC button on the
			// header can be changed back to Wiki Activity.
			headerLink: false,
			// Timeout for loading the activity feed
			timeout: 15000,
			// Determines whether the activity feed is infinitely scrolling
			autoScroll: true
		} );

		// A list of supported namespaces
		wa.supportedNamespaces = Object.freeze( [ 
			0, // Article
			1, // Article talk
			2, // User
			3, // User talk
			4, // Project ({{SITENAME}})
			5, // Project talk ({{SITENAME}} talk)
			6, // File
			7, // File talk
			110, // Forum
			111, // Forum talk
			500, // User blog
			501, // User blog comment
			828, // Module
			829, // Module talk
		] );

		// Setting the configurations
		Object
			.getOwnPropertyNames( wa.defaults )
			.forEach( function( property ) { 
				const def = wa.defaults[ property ];
				wa.options[ property ] = typeof wa.options[ property ] !== "undefined" ? 
					wa.options[ property ] : def;
			} );

		// Selected namespaces
		wa.namespaces = wa.supportedNamespaces.filter( function( namespace ) { 
			const excludeNamespaces = Array.isArray( wa.options.excludeNamespaces ) ? wa.options.excludeNamespaces : [ ];
			return !excludeNamespaces.includes( namespace );
		} );

		// A list of namespaces that qualify as a talk namespace
		wa.isTalk = Object.freeze( [ 3, 5, 111, 829 ] );

		// Function to check the current URL
		wa.matchesUrl = function( ) { 
			if ( mwc.wgNamespaceNumber !== -1 ) return false;
			
			// The current page title
			const pageTitle = 
				wa.i18n
					.inContentLang( )
					.msg( "page-title" )
					.plain( );
			
			// Separate the page title by parts
			const parts = mwc.wgTitle.split( "/" );

			// The main title 
			const mainTitle = parts[ 0 ];

			return ( pageTitle === mainTitle || "WikiActivity" === mainTitle );
		};

		// Fetches the WikiActivity URL
		wa.getURL = function( ) { 
			// The Special namespace
			const ns = mwc.wgCanonicalNamespaces[ -1 ];

			// The WikiActivity title
			const title = wa.i18n
				.inContentLang( )
				.msg( "page-title" )
				.plain( );
			
			// Returns the WikiActivity URL
			return mw.util.getUrl( ns + ":" + title );
		};

		// Initializes all subpages
		wa.initPages = function( ) { 
			// Creating the title parts
			const parts = mwc.wgTitle.split( "/" );

			// Fetches the main title
			wa.mainTitle = parts.shift( );

			// Fetches the subpage
			wa.subpage = parts.length && parts[ 0 ] ? parts[ 0 ] : "";

			// Sets all canonical activity types
			wa.types = Object.freeze( { 
				social: [ "feeds", "discussions", "d", "f" ],
				files: [ "file", "image", "images", "videos" ],
				following: [ "watchlist", "w" ],
				main: "*"
			} );

			// Creates all subpages
			wa.subpages = Object.getOwnPropertyNames( wa.types )
				.reduce( function( object, property ) { 
					const value = wa.types[ property ];

					function makePattern( subpage ) { 
						const msg = wa.i18n
							.msg( "page-" + subpage + "-subpage" );
						
						if ( !msg.exists ) return subpage;

						const name = msg.plain( );
						return new RegExp( "^" + regesc( name ) + "$", "i" );
					} 

					if ( Array.isArray( value ) ) { 
						if ( !value.includes( "*" ) ) object[ property ] = [ property ].concat( value ).map( makePattern );
						else object[ property ] = true;
					} else { 
						if ( value === "*" ) object[ property ] = true;
						else if ( typeof value === "boolean" ) object[ property ] = value;
						else object[ property ] = [ property, value ].map( makePattern );
					}

					return object;
				}, { } );

			wa.getType = function( subpage ) { 
				const booleanFound = [ ];
				const subpages = Object.getOwnPropertyNames( wa.subpages )
					.sort( function( aProp, bProp ) { 
						const a = wa.subpages[ aProp ], b = wa.subpages[ bProp ];
						if ( typeof a === "boolean" && typeof b === "boolean" ) return 0;
						if ( typeof a === "boolean" && typeof b !== "boolean" ) return 1;
						if ( typeof a !== "boolean" && typeof b === "boolean" ) return -1;
						return 0;
					} )
					.filter( function( prop ) { 
						const value = wa.subpages[ prop ];
						if ( booleanFound.length === 1 && typeof value === "boolean" && value ) return false;
						if ( typeof value === "boolean" && value ) booleanFound.push( value );
						return true;
					} );

				checkSubpages: for ( var i = 0; i < subpages.length; i++ ) { 
					const target = subpages[ i ];
					const value = wa.subpages[ target ];

					if ( Array.isArray( value ) ) { 
						for ( var j = 0; j < value.length; j++ ) { 
							const checker = value[ j ];
							if ( checker instanceof RegExp && checker.test( subpage ) ) return target;
							if ( typeof checker === "string" && checker === subpage ) return target;
						}
					}
				}

				return "main";
			};
		};

		wa.icons = Object.freeze( { 
			edit: "pencil",
			"new": "add",
			comment: "comment",
			talk: "bubble",
			categorize: "tag",
			diff: "clock",
			options: "gear",
			more: "more"
		} );

		wa.entries = [ ];

		wa.avatarCache = { };

		wa.loadedd = false;

		wa.loading = false;

		dispatchLoader( { 
			modules: [ "mediawiki.Title", "mediawiki.Uri", "mediawiki.util" ],
			stylesheets: [ "u:dev:MediaWiki:WikiActivity.css" ],
			scripts: [ { 
				
			} ]
		} );
	}
} )( window, jQuery, mediaWiki );