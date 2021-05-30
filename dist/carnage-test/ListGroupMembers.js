/**
 * ListGroupMembers
 * 
 * A script that loads a list of all users
 * within canonical (and custom) user groups
 * 
 * Author: Ultimate Dark Carnage
 * Version: 2.0
 **/
( function( window, $, mw ) { 
	"use strict";
	
	// Sets the configuration object to an empty object if it does not exist
	window.listGroupMembers = window.listGroupMembers || window.LGM || { };
	
	// URL variables for the current page
	const urlVars = new URLSearchParams( location.search );
	
	// If debug is enabled, automatically set the value to true
	if ( urlVars.get( "debug" ) ) window.listGroupMembers.debug = true;
	
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
	
	// Creates the ListGroupMembers constructor
	function ListGroupMembers( opts ) { 
		// Sets the current instance to a variable
		const lgm = this;
		
		// 
		const GLOBAL_GROUPS = Object.freeze( [ 
			"staff",
			"helper",
			"wiki-manager",
			"content-team-member",
			"soap",
			"global-discussions-moderator",
			"vanguard",
			"councilor"
		] );
		
		//
		const LOCAL_GROUPS = Object.freeze( [ 
			"bureaucrat",
			"sysop",
			"discusssions-moderator",
			"content-moderator",
			"rollback",
			"codeeditor",
			"patroller",
			"bot"
		] );
		
		//
		const ALL_GROUPS = GLOBAL_GROUPS.concat( LOCAL_GROUPS );
		
		//
		const ALIASES = Object.freeze( { 
			staff: [ "fandom-staff", "staffer" ],
			helper: [ "fandom-helper" ],
			soap: [ "grasp", "vstf" ],
			voldev: [ "volunteer-developer" ],
			councilor: [ "council" ],
			bureaucrat: [ "crat" ],
			sysop: [ "admin" ],
			rollback: [ "rollbacker" ]
		} );
		
		// The script name
		lgm.NAME = "ListGroupMembers";
		
		// 
		lgm.VERSION = "v2.0";
		
		// 
		lgm.GROUP_CACHE = { };
		
		// 
		lgm.USER_CACHE = [ ];
		
		//
		lgm.EXCLUDE = [ ];
		
		// 
		lgm.REGISTRY = { 
			global: Object.freeze( GLOBAL_GROUPS ),
			local: Object.freeze( LOCAL_GROUPS ),
			other: [ ]
		};
		
		// 
		lgm.GROUP_ORDER = Object.freeze( ALL_GROUPS );
		
		//
		lgm.SORTS = Object.freeze( { 
			alpha: function( a, b ) { 
				const aname = a.get( "name" ), bname = b.get( "name" );
				return aname.localeCompare( bname );
			},
			alphadesc: function( a, b ) { 
				const aname = a.get( "name" ), bname = b.get( "name" );
				return -aname.localeCompare( bname );
			},
			alphabetical: "alpha",
			desc: "alphadesc",
			reg: function( a, b ) { 
				const areg = a.get( "registration" ), breg = b.get( "registration" );
				return areg - breg;
			},
			regdesc: function( a, b ) { 
				const areg = a.get( "registration" ), breg = b.get( "registration" );
				return breg - areg;
			},
			registration: "reg",
			registrationdesc: "regdesc",
			group: function( a, b ) { 
				if ( lgm.GROUPED ) return lgm.sort( "alpha", a, b );
				const ag = lgm.GROUP_ORDER.indexOf( a );
				const bg = lgm.GROUP_ORDER.indexOf( b );
				return ag - bg;
			},
			groupdesc: function( a, b ) { 
				if ( lgm.GROUPED ) return lgm.sort( "alpha", a, b );
				const ag = lgm.GROUP_ORDER.indexOf( a );
				const bg = lgm.GROUP_ORDER.indexOf( b );
				return bg - ag;
			},
			random: function( ) { 
				return ( Math.random( ) - 0.5 ) * 2;
			},
			__default: "alpha"
		} );
		
		//
		lgm.FOUNDING = "2004-10-18T04:00:00.000Z";
		
		//
		lgm.I18N_FALLBACKS = Object.freeze( { 
	        en : Object.freeze( { 
	            loading : "Loading essential resources...",
	            "resources-loaded" : "Resources have been loaded. Waiting to fetch users..."
	        } )
	    } );
	    
	    //
	    lgm.DEFAULT_AVATAR = "https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/";
	    
	    //
	    lgm.TARGET = document.querySelector( "#mw-content-text" );
	    
	    //
	    lgm.LOADED = false;
	    
	    // 
	    lgm.RENDERED = false;
	    
	    //
	    lgm.TYPE = "";
	    
	    //
	    lgm.GROUPED = false;
	    
	    //
	    lgm.SEARCH = false;
	    
	    //
	    lgm.USE_REGISTRY = false;
	    
	    //
	    lgm.ENABLE_ACTIONS = false;
	    
	    //
	    lgm.RENDER_DELAY = false;
	    
	    //
	    lgm.GROUPS = [ ];
	    
	    //
	    lgm.SORT = null;
	    
	    //
	    lgm.inRegistry = function( group ) { 
	    	return Object
	    		.getOwnPropertyNames( lgm.REGISTRY )
	    		.some( function( type ) { 
		    		const groups = lgm.REGISTRY[ type ];
		    		return groups.includes( group );
		    	} );
	    };
	    
	    //
	    lgm.getType = function( group ) { 
	    	return Object
	    		.getOwnPropertyNames( lgm.REGISTRY )
	    		.find( function( type ) { 
	    			return lgm.REGISTRY[ type ].includes( group );
	    		} );
	    };
	    
	    //
	    lgm.generateUsers = function( ) { 
	    	lgm.GROUPS.forEach( function( group ) { 
	    		if ( lgm.USE_REGISTRY ) { 
	    			const type = lgm.getType( group );
	    			if ( !type ) return;
	    			lgm.GROUP_CACHE[ type ] = lgm.GROUP_CACHE[ type ] || { };
	    			lgm.GROUP_CACHE[ type ][ group ] = [ ];
	    		} else { 
	    			lgm.GROUP_CACHE[ group ] = [ ];
	    		}
	    	} );
	    };
	    
	    //
	    lgm.sort = function( name, a, b ) { 
	    	
	    	return null;
	    };
	}
} )( window, jQuery, mediaWiki );