/**
 * WikiActivity
 * 
 * Recreates the legacy Special:WikiActivity page on the Unified
 * Community Platform with a modernized appearance and some upgrades.
 * 
 * Author: Ultimate Dark Carnage
 * Version: v1.1a
 **/
( function( window, $, mw ) { 
	"use strict";
	
	function regesc( s ) { 
		return s.replace( /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&" );
	}
	
	function truncate( s, l ) { 
		return ( s.length >= l ) ? 
			s.substr( 0, l ).replace( /.$/gi, "..." ) :
			s;
	}
	
	function pad( n ) { 
		return ( Math.abs( n ) < 10 ) ?
			( n >= 0 ? "0" + n : "-0" + Math.abs( n ) ) :
			n;
	}
	
	function isPlainObject( o ) { 
		const ts = Object.prototype.toString;
        return ts.call( o ) === "[object Object]";
	}
	
	// Creates the UCX object (if it does not exist)
	window.UCX = $.extend( { }, window.UCX );
	
	// Creates the Dev object (if it does not exist)
	window.dev = $.extend( { }, window.dev );
	
	const WikiActivity = Object.create( { 
		// Current script name/i18n key
		NAME: "WikiActivity",
		// MediaWiki configuration values
		MWC: mw.config.values,
		// Current script version
		VERSION: "v1.1a",
		// WikiActivity script options
		OPTIONS: $.extend( { 
			// A list of namespaces to include
			includeNamespaces: [ ],
			// A list of namespaces to exclude
			excludeNamespaces: [ ],
			// Determines whether to show bot edits
			showBotEdits: false,
			// Determines whether to show minor edits
			showMinorEdits: false,
			// Determines whether to show anon edits
			showAnonEdits: false,
			// Determines whether to load the right rail
			loadRail: false,
			// Limit of entries to show
			limit: 50,
			// Determines whether to automatically load newer entries
			ajaxRefresh: false,
			// The timeout for loading new entries
			timeout: 20000,
			// Changes the RC link back to WikiActivity.
			// This option has been set to false by default for sitewide use.
			headerLink: false
		}, window.rwaOptions, window.wikiActivityOptions ),
		// A list of default namespaces
		DEFAULT_NAMESPACES: Object.freeze( [
			0, // Main/Article namespace
			1, // Talk namespace
			2, // User namespace
			3, // User talk namespace
			4, // Project (site name) namespace
			5, // Project (site name) talk namespace
			6, // File namespace
			7, // File talk namespace
			10, // Template namespace
			11, // Template talk namespace
			110, // Forum namespace
			111, // Forum talk namespacce
			500, // User blog namesapce
			501, // User blog comment
			828, // Module namespace
			829, // Module talk namespace
			2900, // Map namespace
			2901 // Map talk namespace
		] ),
		// A list of talk namespaces
		TALK_NAMESPACES: Object.freeze( [ 1, 3, 5, 7, 11, 111, 829, 2901 ] ),
		// A list of canonical subpages
		SUBPAGES: Object.freeze( [
			// The main activity feed
			"main",
			// Followed pages only
			"watchlist",
			// Feeds activity
			"feeds"
		] ),
		// A group of icon names
		ICON_NAMES: Object.freeze( { 
			"pencil": Object.freeze( [ "edit" ] ),
			"add": Object.freeze( [ "new" ] ),
			"comment": Object.freeze( [ "comment" ] ),
			"bubble": Object.freeze( [ "talk" ] ),
			"tag": Object.freeze( [ "categorize", "tag" ] ),
			"clock": Object.freeze( [ "diff", "history" ] ),
			"gear": Object.freeze( [ "options", "settings" ] ),
			"more": Object.freeze( [ "more" ] )
		} ),
		// A group of default query parameters
		DEFAULT_QUERY_PARAMS: Object.freeze( { 
			recentchanges: Object.freeze( { 
				action: "query",
				list: "recentchanges",
				rcprop: [ "comment", "timestamp", "user", "title", "userid", "ids" ],
				rctype: [ "categorize", "edit", "new" ],
				rcdir: "older",
				rcshow: [ ],
				format: "json"
			} ),
			watchlist: Object.freeze( { 
				action: "query",
				list: "watchlist",
				wlprop: [ "comment", "timestamp", "user", "title", "userid", "ids" ],
				wltype: [ "categorize", "edit", "new" ],
				wldir: "older",
				wlshow: [ ],
				format: "json"
			} ),
			feeds: Object.freeze( { 
				page: 0,
				responseGroup: "small",
				reported: false,
				sortBy: "descending",
				sortKey: "creation_date"
			} )
		} ),
		// Activity type aliases
		ALIASES: Object.freeze( { 
			watchlist: Object.freeze( [ "following" ] )
		} ),
		// MediaWiki dependencies
		MW_DEPENDENCIES: Object.freeze( [ 
			"mediawiki.Title",
			"mediawiki.api",
			"mediawiki.Uri",
			"skin.fandomdesktop.rail.toggle.js"
		] ),
		// Local scripts to load
		LOCAL_SCRIPTS: Object.freeze( [
			// User script
			"User:" + mw.config.values.wgUserName + "/wikiactivity.js",
			// Community-wide script
			"MediaWiki:Fandomdesktop.js/wikiactivity.js"
		] ),
		// Dev scripts
		DEV_SCRIPTS: Object.freeze( [ 
			{ name: "dev.i18n", article: "MediaWiki:I18n-js/code.js" },
			{ name: "dev.colors", article: "MediaWiki:Colors/code.js" },
			{ name: "dev.wds", article: "MediaWiki:WDSIcons/code.js" },
			{ name: "doru.ui", article: "MediaWiki:Dorui.js" }
		] ),
		// Stylesheets to load
		STYLESHEETS: Object.freeze( [ 
			// The required stylesheet to load
			"u:dev:MediaWiki:WikiActivity.css",
			// User stylesheet
			"User:" + mw.config.values.wgUserName + "/wikiactivity.css",
			// Local stylesheet
			"MediaWiki:Fandomdesktop.css/wikiactivity.css"
		] ),
		// Checks if a user is a member of a list of user groups
		isMember: function( groups ) { 
			groups = Array.isArray( groups ) ? groups : [ groups ];
			return groups.some( function( group ) { 
				return mw.config.values.wgUserGroups.includes( group );
			} );
		},
		// Sets up the WikiActivity script
		setup: function( ) { 
			// Initializes the beforeload hook
			mw.hook( "wikiactivity.beforeload" ).fire( this );
			
			// Checks if the user is a staff member
			this.isStaff = this.isMember( "staff" );
			
			// Checks if the user can block
			this.canBlock = this.isStaff || this.isMember( [
				"helper",
				"wiki-representative",
				"wiki-specialist",
				"soap",
				"global-discussions-moderator",
				"sysop"
			] );
			
			// Checks if the user has moderator rights
			this.isMod = this.canBlock || this.isMember( [
				"discussions-moderator",
				"threadmoderator"
			] );
			
			// Checks if the user can rollback
			this.canRollback = this.isMod || this.isMember( "rollback" );
			
			// Checks if the user can patrol
			this.canPatrol = this.isMod || this.isMember( "patrol" );
			
			// Loads all resources
			this.loadMwDependencies( )
				.then( this.loadLocalScripts.bind( this ) )
				.then( this.loadResources.bind( this ) )
				.then( this.initialize.bind( this ) );
		},
		// Loads all MediaWiki dependencies
		loadMwDependencies: function( ) { 
			return mw.loader.using( this.MW_DEPENDENCIES );
		},
		// Loads all local scripts
		loadLocalScripts: function( ) { 
			return window.importArticles( { 
				type: "script",
				articles: this.LOCAL_SCRIPTS
			} );
		},
		// Loads all other resources
		loadResources: function( ) {
			function initPromiseFromScript( script ) { 
				return function( resolve, reject ) { 
					const params = Object.freeze( { 
						type: "script", 
						article: script.article 
					} );
					
					importArticle( params )
						.then( function( ) { 
							mw.hook( script.name ).add( resolve );
						} )
						[ "catch" ]( reject );
				};
			}
			
			return Promise.all( this.DEV_SCRIPTS.map( function( script ) {
				return new Promise( initPromiseFromScript( script ).bind( this ) );
			}, this ) );
		},
		// Initializes the script
		initialize: function( resources ) { 
			this.i18no = resources[ 0 ];
			this.colors = resources[ 1 ];
			this.wds = resources[ 2 ];
			this.ui = resources[ 3 ];
			
			mw.hook( "wikiactivity.init" ).fire( this );
			
			this.i18no.loadMessages( this.NAME )
				.then( this.start.bind( this ) );
		},
		// Starts the script
		start: function( i18n ) { 
			this.i18n = i18n;
			
			this.msg = function( ) { 
				const args = Array.from( arguments );
				return this.i18n.msg.apply( this.i18n, args );
			};
			
			this.msgFromContentLang = function( ) { 
				const args = Array.from( arguments );
				return this.i18n
					.inContentLang( )
					.msg.apply( this.i18n, args );
			};
			
			this.matchesPage = function( ) { 
				// The main page title
				const title = this.msgFromContentLang( "page-title" ).plain( );
				// Returns false if the page is not a special page
				if ( mw.config.values.wgNamespaceNumber !== -1 ) return false;
				// Splits the title into parts
				const parts = mw.config.values.wgTitle.split( "/" );
				// The main canonical title
				const pageTitle = parts.shift( );
				return ( title === mainTitle || mainTitle === "WikiActivity" );
			};
			
			mw.hook( "wikiactivity.msgload" ).fire( this );
			
			if ( this.matchesPage( ) ) return this.initActivityFeed( );
			return this.fallback( );
		},
		fallback: function( ) { 
			if ( this.matchesPage( ) ) return false;
			
			// Adds a link to the toolbar
			this.addToolbarLink( );
			
			// Converts the header link
			this.convertHeaderLink( );
		},
		addToolbarLink: function( ) { 
			const pageSuffix = this.msgFromContentLang( "page-title" ).plain( );
			
			const pageTitle = mw.config.values.wgFormattedNamespaces[ -1 ] + pageSuffix;
			
			const link = this.ui.li( { 
				"class": "overflow",
				"id": "wikiactivity-link",
				 child: this.ui.a( { 
				 	href: mw.util.getUrl( pageTitle ),
				 	text: this.msg( "link-title" ).plain( )
				 } )
			} );
			
			const tools = document.querySelector( "#WikiaBarWrapper .tools" );
			
			tools.insertAdjacentElement( "afterbegin", link );
		},
		convertHeaderLink: function( ) { }
	} );
	
	window.WikiActivity = WikiActivity;
	
	mw.hook( "wikiactivity.init" ).fire( window.WikiActivity );
} )( window, jQuery, mediaWiki );