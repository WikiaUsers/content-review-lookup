/**
 * WikiActivity.js
 * 
 * @description Recreates the legacy Special:WikiActivity page on the
 *				FandomDesktop skin with a modernized appearance and
 *				allows the WikiActivity page to be configurable.
 * 
 * @author Ultimate Dark Carnage <dev.fandom.com/wiki/User:Ultimate_Dark_Carnage>
 * @version 1.4.0b
 * @license CC-BY-SA 4.0
 * @external "mediawiki.api"
 * @external "mediawiki.util"
 * @external "mediawiki.Title"
 **/
( function( window, $, mw, wa, options ) { 
	"use strict";
	
	// Double-run prevention and prevents the script from running when disabled
	if ( !window || !$ || !mw || wa.loaded || options.disabled ) return;
	
	// Sets the loading state to true
	wa.loaded = true;
	
	// Sets all protected values
	Object.defineProperties( wa, { 
		// The current WikiActivity version
		VERSION: {
			enumerable: false,
			writable: false,
			configurable: false,
			value: "1.4.0b"
		},
		// Core MediaWiki dependencies to use
		DEPENDENCIES: {
			enumerable: false,
			writable: false,
			configurable: false,
			value: Object.freeze( [ 
				"mediawiki.util",
				"mediawiki.api",
				"mediawiki.Title"
			] )
		},
		// MediaWiki configurations
		MWCONF: {
			enumerable: false,
			writable: false,
			configurable: false,
			value: Object.freeze( mw.config.get( [
				"isGamepedia",
				"wgCityId",
				"wgNamespaceNumber",
				"wgTitle",
				"wgSiteName",
				"wgServer",
				"wgUserName",
				"wgUserGroups",
				"wgScriptPath"
			] ) )
		},
		// Activity types
		ACTIVITY_TYPES: {
			enumerable: false,
			configurable: false,
			writable: false,
			value: Object.freeze( { 
				recentchanges: 'rc',
				watchlist: 'wl',
				logevents: 'le'
			} )
		},
		// Keywords to use
		KEYWORDS: {
			enumerable: false,
			configurable: false,
			writable: false,
			value: Object.freeze( { 
				USER: "wgUserName",
				TITLE: "wgTitle",
				NAMESPACE: { handler: "getNamespace" }
			} )
		},
		// Core scripts to load
		SCRIPTS: {
			enumerable: false,
			writable: false,
			configurable: false,
			value: Object.freeze( [
				Object.freeze( { 
					script: "u:dev:MediaWiki:I18n-js/code.js",
					hookName: "i18n"
				} ),
				Object.freeze( { 
					script: "u:dev:MediaWiki:Colors/code.js",
					hookName: "colors"
				} ),
				Object.freeze( { 
					script: "u:dev:MediaWiki:WDSIcons/code.js",
					hookName: "wds"
				} ),
				Object.freeze( { 
					script: "u:dev:MediaWiki:Dorui.js",
					hookName: "doru.ui"
				} ),
				Object.freeze( {
					script: "MediaWiki:WikiActivity.js/admin.js",
					condition: "isAdmin"
				} ),
				"User:__USER__/wikiactivity.js",
				"MediaWiki:WikiActivity.js"
			] )
		},
		// Stylesheets to load
		STYLESHEETS: {
			enumerable: false,
			writable: false,
			configurable: false,
			value: Object.freeze( [
				"u:dev:MediaWiki:WikiActivity.css",
				"MediaWiki:WikiActivity.css",
				"User:__USER__/wikiactivity.css",
				Object.freeze( { 
					script: "MediaWiki:WikiActivity.css/admin.css",
					condition: "isAdmin"
				} )
			] )
		},
		// A list of supported namespaces
		SUPPORTED_NAMESPACES: {
			enumerable: false,
			writable: false,
			configurable: false,
			value: Object.freeze( {
				MAIN: 0,
				TALK: 1,
				USER: 2,
				USER_TALK: 3,
				PROJECT: 4,
				PROJECT_TALK: 5,
				FILE: 6,
				FILE_TALK: 7,
				FORUM: 110,
				FORUM_TALK: 111,
				USER_BLOG: 500,
				MODULE: 828,
				MODULE_TALK: 829
			} )
		},
		// A list of talk namespaces
		IS_TALK: {
			enumerable: false,
			configurable: false,
			writable: false,
			value: Object.freeze( [
				'TALK',
				'PROJECT_TALK',
				'USER_TALK',
				'MODULE_TALK'
			] )
		},
		// A list of canonical subpages
		SUBPAGES: {
			enumerable: false,
			configurable: false,
			writable: false,
			value: Object.freeze( [ 
				'watchlist', // Watched pages
				'feeds', // Feeds activity
				'media' // Media activity
			] )
		},
		// A group of canonical icon names
		ICON_NAMES: {
			enumerable: false,
			configurable: false,
			writable: false,
			value: Object.freeze( { 
				pencil: Object.freeze( [ "edit" ] ),
				add: Object.freeze( [ "new" ] ),
				comment: Object.freeze( [ "comment", "blog" ] ),
				bubble: Object.freeze( [ "talk" ] ),
				tag: Object.freeze( [ "tag", "categorize" ] ),
				clock: Object.freeze( [ "diff", "history" ] ),
				gear: Object.freeze( [ "options" ] ),
				more: Object.freeze( [ "more" ] )
			} )
		}
	} );
	
	// Create the avatar cache
	wa.avatarCache = new Map( );
	
	// Create the RegExp escape function
	wa.regesc = function( s ) { 
		return s.replace( /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&" );
	};
	
	// Fetches all default params
	wa.fetchActivityParams = function( list, props ) { 
		const params = { action: "query", format: "json" };
		const key = this.ACTIVITY_TYPES.hasOwnProperty( list ) ?
			list :
			"recentchanges";
		const abbr = this.ACTIVITY_TYPES[ key ];

		params.list = key;
		
		return Object.keys( props ).reduce( function( obj, prop ) {
			obj[ abbr + prop ] = props[ prop ];
			return obj;
		}, params );
	};
	
	// Fetches the main activity feed
	wa.fetchMain = function( options, rccontinue ) {
		const params = this.fetchActivityParams( "recentchanges", { 
			props: [
				"comment",
				"timestamp",
				"user",
				"title",
				"userid",
				"ids"
			],
			type: [
				"categorize",
				"edit",
				"name"
			],
			start: ( new Date( ) ).toISOString( ),
			dir: "older",
			show: [],
			rclimit: parseInt( options.limit )
		} );
		
		return ( new mw.Api( ) ).post( params );
	};
} )( this, this.jQuery, this.mediaWiki, 
	( this.WikiActivity = $.extend( { }, this.WikiActivity ) ), 
	this.jQuery.extend( 
		{},
		this.wikiActivityOptions,
		this.waOptions,
		this.rwaOptions
	)
);