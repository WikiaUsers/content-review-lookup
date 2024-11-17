/**
 * ListGroupMembers
 * 
 * A script that loads a list of all users
 * within canonical (and custom) user groups
 * 
 * Author: Ultimate Dark Carnage
 * Version: 3.0
 **/
( function( window, $, mw ) {
	"use strict";
	
	// Double-run prevention
	if ( window.ListGroupMembers && window.ListGroupMembers.loaded ) return console.warn( '[ListGroupMembers] This script has been double-loaded. Exiting now.' );
	
	// Initialize the configuration object if it does not exist
	window.lgmConfig = $.extend( { }, window.lgmConfig );
	
	// Prevents the script from running when it is disabled
	if ( window.lgmConfig.disabled ) return console.warn( '[ListGroupMembers] This script has been disabled. Exiting now.' );
	
	// Initialize the Dev object if it does not exist
	window.dev = $.extend( { }, window.dev );
	
	// Create the main script object
	window.ListGroupMembers = $.extend( {
		// Set the loading state to 'true' to prevent double-running
		loaded: true,
		// Fandom's founding date
		foundingDate: 'October 18, 2004',
		// The user cache
		cache: new Map( ),
		// The user object
		users: { },
		// MediaWiki configuration variables
		mwc: Object.freeze( mw.config.get( [
			'wgCityId',
			'wgCanonicalNamespace',
			'wgCanonicalSpecialPageName', 
			'wgNamespaceNumber',
			'wgTitle',
			'wgSiteName',
			'wgServer',
			'wgUserName',
			'wgUserGroups',
			'wgScriptPath'
		] ) ),
		// MediaWiki dependencies
		dependencies: Object.freeze( [
			'mediawiki.util',
			'mediawiki.api',
			'mediawiki.Title'
		] ),
		// A list of formatted namespaces
		namespaces: mw.config.get( 'wgFormattedNamespaces' ),
		// The current user group order
		order: Object.freeze( [
			'staff',
			'wiki-representative',
			'soap',
			'global-discussions-moderator',
			'global-edit-reviewer',
			'voldev',
			'bureaucrat',
			'sysop',
			'threadmoderator',
			'content-moderator',
			'rollback',
			'patroller',
			'bot'
		] ),
		// The current user group registry
		registry: Object.freeze( {
			global: Object.freeze( [
				'staff',
				'wiki-representative',
				'soap',
				'global-discussions-moderator',
				'global-edit-reviewer',
				'voldev'
			] ),
			local: Object.freeze( [
				'bureaucrat',
				'sysop',
				'threadmoderator',
				'content-moderator',
				'rollback',
				'patroller',
				'bot'
			] )
		} ),
		// User group aliases
		aliases: Object.freeze( {
			"staff": Object.freeze( [ "fandom-staff" ] ),
			"wiki-specialist": Object.freeze( [ "content-team-member" ] ),
			"soap": Object.freeze( [ "grasp", "vstf" ] ),
			"bureaucrat": Object.freeze( [ "bcrat", "crat" ] ),
			"sysop": Object.freeze( [ "admin" ] ),
			"rollback": Object.freeze( [ "rollbacker" ] ),
			"patroller": Object.freeze( [ "patrol" ] ),
			"threadmoderator": Object.freeze( [ "discussions-moderator", "discussion-moderator" ] )
		} ),
		// Sorting algorithms
		sort: Object.freeze( {
			ALPHA_ASCENDING: function( a, b ) {
				return a.name.localeCompare( b.name );
			},
			ALPHA_DESCENDING: function( a, b ) {
				return -a.name.localeCompare( b.name );
			},
			ALPHA: 'ALPHA_ASCENDING',
			ALPHAA: 'ALPHA_ASCENDING',
			ALPHAD: 'ALPHA_DESCENDING',
			ALPHA_ASC: 'ALPHA_ASCENDING',
			ALPHA_DESC: 'ALPHA_DESCENDING',
			REGISTRATION_ASCENDING: function( a, b ) {
				return a.registration - b.registration;
			},
			REGISTRATION_DESCENDING: function( a, b ) { 
				return b.registration - a.registration;
			},
			REGA: 'REGISTRATION_ASCENDING',
			REGD: 'REGISTRATION_DESCENDING',
			REG_ASC: 'REGISTRATION_ASCENDING',
			REG_DESC: 'REGISTRATION_DESCENDING',
			REGISTRATION: 'REGISTRATION_ASCENDING',
			REGISTRATION_ASC: 'REGISTRATION_ASCENDING',
			REGISTRATION_DESC: 'REGISTRATION_DESCENDING',
			GROUP_ASCENDING: function( a, b ) {
				const aGroup = this.order.indexOf( a.group );
				const bGroup = this.order.indexOf( b.group );
				return this.options.grouped ?
					this.getSort( 'alpha' ) :
					aGroup - bGroup;
			},
			GROUP_DESCENDING: function( a, b ) {
				const aGroup = this.order.indexOf( a.group );
				const bGroup = this.order.indexOf( b.group );
				return this.options.grouped ?
					this.getSort( 'alpha' ) :
					bGroup - aGroup;
			},
			RANDOM: function( ) {
				return ( Math.random( ) - 0.5 ) * 2;
			},
			SEED: function( args ) {
				const seed = this.seed( parseFloat( args[ 0 ] || 0 ) );
				return ( seed( ) - 0.5 ) * 2;
			},
			DEFAULT: 'ALPHA_ASCENDING'
		} ),
		// Create a utility seed function
		seed: function( s ) { 
			const m = 0xffffffff;
 
	        var w = ( 123456789 + s ) & m, z = ( 987654321 - s ) & m;
	        return function h( ) { 
	            z = ( 36969 * ( z & 65535 ) + ( z >>> 16 ) ) & m;
	            w = ( 18000 * ( w & 65535 ) + ( w >>> 16 ) ) & m;
	 
	            var r = ( ( z << 16 ) + ( w & 65535 ) ) >>> 0;
	            r /= 4294967296;
	            return r;
			};
		},
		// A list of scripts and its hooks
		scripts: Object.freeze( [
			{
				hook: 'dev.i18n',
				script: 'u:dev:MediaWiki:I18n-js/code.js'
			},
			{
				hook: 'dev.colors',
				script: 'u:dev:MediaWiki:Colors/code.js'
			},
			{
				hook: 'dev.wds',
				script: 'u:dev:MediaWiki:WDSIcons/code.js'
			},
			{
				hook: 'doru.ui',
				script: 'u:dev:MediaWiki:UI-js/code.js'
			},
			'MediaWiki:ListGroupMembers.js', // Wiki-wide
			mw.config.get( 'wgUserName' ) + '/lgm.js' // Personal
		] ),
		// A list of stylesheets
		stylesheets: Object.freeze( [
			'u:dev:MediaWiki:ListGroupMembers/code.css',
			'MediaWiki:ListGroupMembers.css', // Wiki-wide
			mw.config.get( 'wgUserName' ) + '/lgm.css' // Personal
		] )
	}, window.ListGroupMembers );
} )( window, jQuery, mediaWiki );