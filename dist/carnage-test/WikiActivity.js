/**
 * WikiActivity v2.0.0
 * -------------------
 * This script recreates the legacy Special:WikiActivity page for the Unified Community
 * Platform (UCP) with a modernized appearance, updates, and new features.
 * 
 * This is a high-traffic script and is a community project. If you feel the need to
 * make changes to the script, you are welcome to.
 * 
 * Author: Ultimate Dark Carnage
 **/
( function( window, $, mw, rwaOptions ) { 
	"use strict";
	if ( rwaOptions.noop || window.rwaLoaded ) return;
	window.rwaLoaded = true;
	
	const mwc = mw.config.get( );
	
	const WikiActivity = {
		// Dependency objects
		dependencies: Object.freeze( [
			"mediawiki.util",
			"mediawiki.api",
			"mediawiki.Title"
		] ),
		devScripts: Object.freeze( [
			{ name: "i18n",  source: "MediaWiki:I18n-js/code.js" },
			{ name: "colors", source: "MediaWiki:Colors/code.js" },
			{ name: "wds", source: "MediaWiki:WDSIcons/code.js" },
			{ name: "dorui", source: "MediaWiki:Dorui.js" }
		] ),
		scripts: Object.freeze( [
			mwc.wgUserName + "/wikiactivity.js"
		] ),
		stylesheets: Object.freeze( [
			"u:dev:MediaWiki:WikiActivity.css",
			mwc.wgUserName + "/wikiactivity.css"
		] ),
		// State objects
		state: {
			loaded: false,
			isActivityPage: false,
			currentSubpage: ""
		},
		// Default configurations
		defaults: Object.freeze( { 
			limit: 50, // The maximum number of pages to show
			theme: "main", // The theme to display
			showBotEdits: false, // Determines whether to show bot edits
			loadModule: false, // Determines whether to load the activity feed module
			headerLink: false, // Determines whether to change the RC link to Wiki Activity (set to false by default for sitewide use)
			refresh: false, // Determines whether to refresh the activity feed
			refreshDelay: 5 * 60 * 1000, // Delay for refreshing the activity feed
			timeout: 10 * 1000 // The timeout for loading the activity feed
		} ),
		// Canonical subpages
		subpages: Object.freeze( [ 
			"main", // The main activity page
			"watchlist", // Watched (followed) pages and posts only
			"feeds", // Feeds activity only
			"media" // Media activity only
		] ),
		// Conditions
		conditions: Object.freeze( {
			can_phalanx: Object.freeze( [ 
				"staff",
				"helper",
				"wiki-representative",
				"wiki-specialist",
				"soap"
			] ),
			can_block: Object.freeze( [ 
				"staff",
				"helper",
				"wiki-representative",
				"wiki-specialist",
				"soap",
				"global-discussions-moderator",
				"sysop"
			] ),
			is_mod: Object.freeze( [
				"staff",
				"helper",
				"wiki-representative",
				"wiki-specialist",
				"soap",
				"global-discussions-moderator",
				"sysop",
				"discussion-moderator",
				"threadmoderator"
			] ),
			can_rollback: Object.freeze( [
				"staff",
				"helper",
				"wiki-representative",
				"wiki-specialist",
				"soap",
				"global-discussions-moderator",
				"sysop",
				"discussion-moderator",
				"threadmoderator",
				"rollback"
			] ),
			can_patrol: Object.freeze( [
				"staff",
				"helper",
				"wiki-representative",
				"wiki-specialist",
				"soap",
				"global-discussions-moderator",
				"sysop",
				"discussion-moderator",
				"threadmoderator",
				"patroller"
			] )
		} ),
		iconNames: Object.freeze( { 
			edit: "pencil",
			"new": "add",
			comment: "comment",
			talk: "bubble",
			categorize: "tag",
			diff: "clock",
			options: "gear",
			more: "more"
		} ),
		avatarCache: new Map( ),
		feedItems: [ ],
		init: function( ) {
			// If the namespace is not a special page, skip to loading the header link
			if ( mwc.wgCanonicalNamespace !== -1 ) return this.loadHeaderLink( );
			// Fetches the current subpage (if it is defined)
			const subpage = mwc.wgTitle.split( "/" ).length > 1 ? mwc.wgTitle.split( "/" )[ 1 ] : "";
			
			
		}
	};
}( window, jQuery, mediaWiki, $.extend( { }, window.rwaOptions ) ) );