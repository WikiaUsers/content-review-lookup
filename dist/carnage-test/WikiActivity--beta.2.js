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
 * Version: v1.2b
 **/
(function(window, $, mw) {
	"use strict";
	// WikiActivity options object
	const options = $.extend(
		{}, 
		window.wikiActivityOptions,
		window.rwaOptions
	);
	
	// Stops the script if it is disabled
	if (options.isDisabled) return;
	
	// Create the Dev object if it does not exist
	window.dev = $.extend({}, window.dev);
	
	// Create the UCX object if it does not exist
	window.UCX = $.extend({}, window.UCX);
	
	// If the WikiActivity object already exists, exit
	if (window.UCX.wikiActivity) return;
	
	// After that, create the WikiActivity object
	window.UCX.wikiActivity = {
		// Default constants
		Name: "WikiActivity",
		Version: "v1.2b",
		Options: options,
		Defaults: Object.freeze({
			// The limit of pages to display on the feed
			limit: 50,
			// A list of namespaces to display
			namespaces: [0, 1, 2, 3, 4, 6, 7, 110, 111, 500, 501],
			// The theme for WikiActivity
			theme: "name",
			// The flags set for the activity feed
			flags: {
				anon: true,
				bot: false,
				minor: false
			},
			// Determines whether to load the right rail
			loadRail: false,
			// Determines whether the RC link should be changed to Wiki Activity
			// Note: This option is set to false by default for sitewide use.
			headerLink: false,
			// Determines whether to refresh the activity feed automatically
			refresh: false,
			// Delay for refreshing the activity feed (default: 5 minutes)
			refreshDelay: 5 * 60 * 1000,
			// The timeout for loading the activity feed
			timeout: 10 * 1000
		}),
		Config: mw.config.get(),
		Patterns: {
			Replacers: [
				{ pattern: /%USER%/gi, value: mw.config.get("wgUserName") },
				{ pattern: /%PAGE%/gi, value: mw.config.get("wgPageName") }
			]
		},
		Rights: {
			canPhalanx: ["staff", "wiki-specialist", "soap"],
			canBlock: {
				isMemberOf: ["global-discussions-moderator", "sysop"],
				includes: "canPhalanx"
			},
			isMod: {
				isMemberOf: ["discussion-moderator", "threadmoderator"],
				includes: "canBlock"
			},
			canRollback: {
				isMemberOf: ["rollback"],
				includes: "isMod"
			},
			canPatrol: {
				isMemberOf: ["patroller"],
				includes: "isMod"
			}
		},
		NamespaceGroups: {
			isTalk: [3, 5, 111, 829]
		},
		// Fetches the option value and set a default if it does not exist
		option: function(key, def) {
			const hasKey = this.Options.hasOwnProperty(key);
			if (!hasKey) return def;
			return this.Options[key];
		},
		// Create an array of scripts
		Scripts: Object.freeze([
			{ hook: "i18n", page: "u:dev:MediaWiki:I18n-js/code.js" },
			{ hook: "wds", page: "u:dev:MediaWiki:WDSIcons/code.js" },
			{ hook: "colors", page: "u:dev:MediaWiki:Colors/code.js" },
			{ hook: "doru.ui", name: "dorui", page: "u:dev:MediaWiki:Dorui.js" },
			"User:%USER%/wikiActivity.js"
		]),
		// Create an array of stylesheets
		Styles: Object.freeze([
			"u:dev:MediaWiki:WikiActivity/beta.css",
			"User:%USER%/wikiActivity.css"
		]),
		// Create an array of MediaWiki dependencies
		Dependencies: Object.freeze([
			"mediawiki.Title",
			"mediawiki.Uri",
			"mediawiki.api",
			"mediawiki.util"
		]),
		// Create a resource loader
		initLoader: function() {
			const context = this;
			
			return Object.freeze({
				loadScripts: function() {
					const scripts = context.Scripts;
					if (!Array.isArray(scripts)) return Promise.reject("The list of scripts provided must be an array.");
					
					return Promise.all(scripts.map(this.parseScript, context));
				},
				parseScript: function(script) { 
					if (typeof script === "string") {
						const scriptName = this.Patterns.Replacers.reduce(function(result, replacer) {
							return result.replace(replacer.pattern, replacer.value);
						}, script);
						
						return importArticle({ type: "script", article: scriptName });
					}
					
					if (!("hook" in script)) return Promise.reject("A script hook is required.");
					
					const name = script.name || script.hook, page = script.page;
					if (name in window.dev && window.dev[name]) return Promise.resolve(window.dev[name]);
					
					const parts = script.hook.split(".");
					const isDev = parts.length === 1;
					
					const hook = isDev ? "dev." + parts.shift() : script.hook;
					
					return new Promise(function(res, rej) {
						return importArticle({
							type: "script",
							article: page
						}).then(function() {
							mw.hook(hook).add(res);
						});
					});
				},
				loadStyles: function() {
					const styles = context.Styles;
					if (!Array.isArray(styles)) return Promise.reject("The list of stylesheets provided must be an array.");
					
					return Promise.all(styles.map(this.parseStyle, context));
				},
				parseStyle: function(style) {
					const styleName = this.Patterns.Replacers.reduce(function(result, replacer) {
							return result.replace(replacer.pattern, replacer.value);
						}, style);
					return importArticle({ type: "script", article: styleName });
				},
				loadDeps: function() {
					const deps = context.Dependencies;
					if (!Array.isArray(deps)) return Promise.reject("The list of MediaWiki dependencies must be an array.");
					
					return mw.loader.using(deps);
				},
				dispatch: function() {
					return Promise.all([
						this.loadScripts(),
						this.loadStyles(),
						this.loadDeps()
					]);
				}
			});
		},
		
	};
	window.UCX.wikiActivity = window.wikiActivity;
})(window, jQuery, mediaWiki);