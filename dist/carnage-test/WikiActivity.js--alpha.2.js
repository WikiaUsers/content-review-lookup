/**
 * WikiActivity
 * 
 * A script that recreates the legacy Special:WikiActivity page
 * on the FandomDesktop skin with a modernized appearance.
 * 
 * Author: Ultimate Dark Carnage
 * Version: v1.0a
 **/
(function(window, $, mw){
	"use strict";
	
	const __NAME__ = "WikiActivity";
	const __VERSION__ = "v1.1a";
	const __OPTIONS__ = $.extend({}, window.wikiActivityOptions, window.rwaOptions);
	const __DEPS__ = Object.freeze([
		"mediawiki.Title",
		"mediawiki.api",
		"mediawiki.Uri",
		"skin.fandomdesktop.rail.toggle.js"
	]);
	
	window.dev = $.extend({}, window.dev);
	window.UCP = $.extend({}, window.UCP);
	
	window.WikiActivity = {
		__NAME__: "WikiActivity",
		__VERSION__: "v1.1a",
		__DEPS__: Object.freeze([
			"mediawiki.Title",
			"mediawiki.api",
			"mediawiki.Uri",
			"skin.fandomdesktop.rail.toggle.js"
		]),
		__DEFAULTS__: Object.freeze({
			include: [],
			exclude: [],
			botEdits: false,
			minorEdits: false,
			anonEdits: false,
			loadRail: false,
			limit: 50
		}),
		namespaces: Object.freeze([
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
		]),
		talkNamespaces: Object.freeze([
			1, 3, 5, 7, 11, 111, 829, 2901
		]),
		subpageCategories: Object.freeze([
			"main",
			"watchlist",
			"feeds",
			"media"
		]),
		iconNames: new Map([
			["pencil", "edit"],
			["add", "new"],
			["comment", "comment"],
			["bubble", "talk"],
			["tag", ["categorize", "tag"]],
			["clock", ["diff", "history"]],
			["gear", ["options", "settings"]],
			["more", "more"]
		]),
		aliases: new Map([
			["watchlist", ["following", "w", "fl"]],
			["feeds", ["discussions", "discussion", "d", "f"]],
			["media", ["image", "video"]]
		]),
		localScripts: new Set([
			"User:" + mw.config.get("wgUserName") + "/wikiactivity.js",
			"MediaWiki:Fandomdesktop.js/wikiactivity.js"
		]),
		devScripts: new Map([
			["dev.i18n", "MediaWiki:I18n-js/code.js"],
			["dev.colors", "MediaWiki:Colors/code.js"],
			["dev.wds", "MediaWiki:WDSIcons/code.js"],
			["doru.ui", "MediaWiki:Dorui.js"]
		]),
		stylesheets: new Set([
			"u:dev:MediaWiki:WikiActivity.css",
			"User:" + mw.config.get("wgUserName") + "/wikiactivity.css",
			"MediaWiki:Fandomdesktop.css/wikiactivity.css"
		]),
		isMemberOfGroup: function( group ) {
			
		},
		isMember: function( groupOrGroups ) {
			
		}
	};
}(window, jQuery, mediawiki));