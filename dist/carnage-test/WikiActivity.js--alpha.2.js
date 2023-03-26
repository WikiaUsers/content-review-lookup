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
	
	const options = $.extend(
		{}, 
		window.waOptions,
		window.rwaOptions,
		window.wikiActivityOptions
	);
	
	if (options.disabled || window.WikiActivity) return;
	
	window.dev = $.extend({}, window.dev);
	window.UCP = $.extend({}, window.UCP);
	
	function partition(array, fn, ctx) {
		if (typeof fn !== "function") return array;
		return [array.filter(fn, ctx), array.filter(function(value, index, arr) {
			return !fn.apply(this, [value, index, arr]);
		}, ctx)];
	}
	
	function pad(n) {
		return (Math.abs(n) < 10) ? (n >= 0 ? "0" + n : "-0" + Math.abs(n)) : n;
	}
	
	function regesc(s) {
		return s.replace( /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&" );
	}
	
	function truncate(s, l) {
		return (s.length < l) ? s : s.substring(0, l).replace(/.$/gi, "...");
	}
	
	window.WikiActivity = {
		__NAME__: "WikiActivity",
		__VERSION__: "v1.1a",
		__DEFAULTS__: Object.freeze({
			include: [],
			exclude: [],
			flags: { 
				bot: false, 
				minor: false, 
				anon: false, 
				viewReported: false 
			},
			loadRail: false,
			limit: 50,
			headerLink: false,
			theme: "default",
			delay: 1250
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
			"recentchanges",
			"watchlist",
			"feeds",
			"media"
		]),
		subpageAliases: new Map([
			["recentchanges", ["rc", "r"]],
			["watchlist", ["following", "wl", "followed"]],
			["feeds", ["f", "d", "social", "discussions"]],
			["media", "m"]
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
		resources: Object.freeze({
			deps: new Set([
				"mediawiki.Title",
				"mediawiki.api",
				"mediawiki.Uri",
				"skin.fandomdesktop.rail.toggle.js"
			]),
			scripts: new Set([
				"User:" + mw.config.get("wgUserName") + "/wikiactivity.js",
				"MediaWiki:Fandomdesktop.js/wikiactivity.js",
				{ flag: "canPhalanx", name: "MediaWiki:Fandomdesktop.js/wikiactivity-canPhalanx.js" },
				{ flag: "canBlock", name: "MediaWiki:Fandomdesktop.js/wikiactivity-admin.js" },
				{ hook: "dev.i18n", name: "MediaWiki:I18n-js/code.js" },
				{ hook: "dev.colors", name: "MediaWiki:Colors/code.js" },
				{ hook: "dev.wds", name: "MediaWiki:WDSIcons/code.js" },
				{ hook: "doru.ui", name: "MediaWiki:Dorui.js" }
			]),
			stylesheets: new Set([
				"u:dev:MediaWiki:WikiActivity.css",
				"User:" + mw.config.get("wgUserName") + "/wikiactivity.css",
				"MediaWiki:Fandomdesktop.css/wikiactivity.css"
			])
		}),
		userConstraints: new Map([
			["isStaff", Object.freeze({ 
				userGroups: "staff" 
			})],
			["canPhalanx", Object.freeze({ 
				userGroups: Object.freeze([
					"helper", 
					"soap", 
					"wiki-specialist", 
					"wiki-representative"
				]),
				include: "staff"
			})],
			["canBlock", Object.freeze({
				userGroups: Object.freeze([
					"global-discussions-moderator",
					"sysop"
				]),
				include: "canPhalanx"
			})],
			["isMod", Object.freeze({
				userGroups: Object.freeze([
					"discussions-moderator",
					"forummoderator"
				]),
				include: "canBlock"
			})],
			["canRollback", Object.freeze({
				userGroups: "rollback",
				include: "isMod"
			})],
			["canPatrol", Object.freeze({
				userGroups: "patroller",
				include: "isMod"
			})]
		]),
		replacers: new Map([
			[/\[\[([^\[\]\|]+)\|([^\[\]]+)\]\]/g, function(_, title, text) { 
				return this.ui.a({
					href: mw.util.getUrl(title),
					text: text
				}).outerHTML;
			}],
			[/\[\[([^\[\]]+)\]\]/g, function(_, title) {
				return this.ui.a({
					href: mw.util.getUrl(title),
					text: title
				}).outerHTML;
			}],
			[/\'{5}([^\']+)\'{5}/g, function(_, text) {
				return this.ui.strong({
					style: { "font-style": "italic" },
					text: text
				});
			}],
			[/\'{3}([^\']+)\'{3}/g, function(_, text) {
				return this.ui.strong({
					text: text
				});
			}],
			[/\'{2}([^\']+)\'{2}/g, function(_, text) {
				return this.ui.i({
					text: text
				});
			}]
		]),
		isMemberOfGroup: function(group) {
			return this.wgUserGroups.includes(group);
		},
		isMember: function(groupOrGroups) {
			if (typeof groupOrGroups === "string")
				return this.isMemberOfGroup(groupOrGroups);
			if (groupOrGroups instanceof Set)
				groupOrGroups = Array.from(groupOrGroups);
			return groupOrGroups.some(this.isMemberOfGroup, this);
		},
		matches: function(flag) {
			if (!this.userConstraints.has(flag)) return false;
			const restriction = this.userConstraints.get(flag);
			const userGroups = restriction.userGroups;
			
			const include = restriction.include || null;
			const exclude = restriction.exclude || null;
			
			if (this.isMember(userGroups)) return true;
			if (exclude && this.matches(exclude)) return false;
			if (include && this.matches(include)) return true;
			
			return false;
		},
		hook: function(hookIDs) {
			if (typeof hookIDs === "string")
				return mw.hook(hookIDs);
			if (hookIDs instanceof Set)
				hookIDs = Array.from(hookIDs);
			
			var hooks = hookIDs.map(function(hookID){
				return mw.hook(hookID);
			});
			
			const fns = Object.freeze(["add", "remove", "fire"]);
			
			function performHookCallback(name, obj) {
				return fns.include(name) ? function() {
					const a = Array.from(arguments);
					hooks = hooks.map(function(hook){
						return hook[name](a);
					});
					return handlers;
				} : function( ) { return handlers };
			}
			
			const handlers = fns.reduce(function(obj, key){
				obj[key] = performHookCallback(key);
				return obj;
			}, {});
			
			return handlers;
		},
		setup: function() { 
			this.hook(["wikiactivity.beforeload", "wa.beforeload"])
				.fire(this);
				
			this.loadDeps()
				.then(this.loadScripts.bind(this))
				.then(this.loadResources.bind(this))
				.then(this.init.bind(this));
		},
		loadDeps: function() {
			return mw.loader.using(this.__DEPS__);
		},
		isLocalScript: function(resource) {
			const resourceName = typeof resource !== "string" ?
				resource.name :
				resource;
			
			return !/^u:dev:/i.test(resourceName);
		},
		checkResource: function(resource) {
			return resource.flag ? 
				this.matches(resource.flag) :
				true;
		},
		initPromiseFromScript: function(hook, script) {
			return (function(resolve, reject) {
				const scriptName = typeof item === "string" ?
					item : script.name;
				
				if (!this.checkResource(item)) return resolve();
				
				const params = Object.freeze({
					type: "script",
					articles: scriptName
				});
				
				importArticles(params)
					.then(function() { mw.hook(hook).add(resolve); })
					["catch"](reject);
			}).bind(this);
		},
		loadResources: function() {
			const localStylesheets = Array.from(this.resources.stylesheets)
				.filter(function(item) { 
					return this.checkResource(item);
				}, this);
				
			const scripts = partition(
				Array.from(this.resources.scripts).filter(function(item) {
					return this.checkResource(item);
				}, this), 
				function(item){ return this.isLocalScript(item) }, 
				this
			);
			
			const promises = [window.importArticles({
				type: "style",
				articles: localStylesheets
			}, {
				type: "script",
				articles: localScripts
			})];
			
			return Promise.all(devScripts.reduce(function(list, item){
				return list.push(this.initPromiseFromScript(item)), list;
			}, promises));
		},
		init: function(resources) {
			this.i18no = resources[1];
			this.colors = resources[2];
			this.wds = resources[3];
			this.ui = resources[4];
			
			this.hook(["wa.init", "wikiactivity.init"]).fire(this);
			
			this.i18no.loadMessages(this.__NAME__)
				.then(this.start.bind(this));
		},
		start: function(i18n) {
			this.i18n = i18n;
			this.hook(["wa.msg.load", "wikiactivity.msg.load"])
				.fire(this);
				
			return this.matchesPage() ? this.initActivity() : this.fallback();
		},
		msg: function() {
			const args = Array.from(arguments);
			const options = args.at(-1);
			
			if (typeof options === "string") return this.i18n.msg.apply(this.i18n, args);
			
			const target = options.fromContentLang ?
				this.i18n.inContentLang() :
				this.i18n;
				
			return target.msg.apply(this.i18n, args.slice(0, -1));
		},
		matchesPage: function() {
			if (!this.i18n) return false;
			
			const title = this.msg("page-title", { 
				fromContentLang: true
			}).plain();
			
			if (this.mwc.wgNamespaceNumber !== -1) return false;
			
			const parts = this.mwc.wgTitle.split("/");
			const pageTitle = parts.shift( );
			
			return [title, "WikiActivity"].includes(pageTitle);
		},
		initActivity: function() {
			if (!this.matchesPage()) return this.fallback();
			mw.config.get("wgCanonicalSpecialPageName", "WikiActivity");
			this.hook(["wa.start", "wikiactivity.start"])
				.fire(this);
				
			this.entries = {};
			this.avatarCache = new Map();
			this.currentURI = new mw.Uri();
			this.namespaces = Array.from(this.defaultNamespaces);
			
			
		}
	};
}(window, jQuery, mediawiki));