/**
 * WikiActivity script (sample)
 * version 1.3
 **/
(function(window, $, mw, options) {
	"use strict";
	// Ensures the script is disabled if installed site-wide
	const isDisabled = "disabled" in options && Boolean(options.disabled);
	
	// If the script is disabled, disengage
	if (isDisabled) return false;
	
	// Creates the WikiActivity object
	const wa = {
		_name: "WikiActivity",
		_version: "v1.3b",
		_options: options,
		_conf: mw.config.get()
	};
	
	// Create the Dev object if it doesn't exist
	window.dev = window.dev || {};
	
	// Create the UCX object if it doesn't exist
	window.UCX = window.UCX || {};
	
	// Checks if the script has been ran
	const isRan = "WikiActivity" in window.UCX ||
		("wikiActivityLoaded" in window && Boolean(window.wikiActivityLoaded));
	
	// If the script is ran, exit the script
	if (isRan) return false;
	
	// Double-run protection
	window.wikiActivityLoaded = true;
	
	// Load resources for the WikiActivity script
	$.extend(wa, {
		// Creating a script array
		_scripts: Object.freeze([
			{ hook: "i18n", page: "u:dev:MediaWiki:I18n-js/code.js" },
			{ hook: "wds", page: "u:dev:MediaWiki:WDSIcons/code.js" },
			{ hook: "colors", page: "u:dev:MediaWiki:Colors/code.js" },
			{ hook: "doru.ui", name: "dorui", page: "u:dev:MediaWiki:Dorui.js" }
		]),
		// Creating a stylesheet array
		_styles: Object.freeze([
			"u:dev:MediaWiki:WikiActivity.css"
		]),
		// Creating a dependency array
		_dependencies: Object.freeze([
			"mediawiki.Title",
			"mediawiki.Uri",
			"mediawiki.api",
			"mediawiki.util"
		]),
		// Creating a loader for WikiActivity
		_createLoader: function(resources) {
			const context = this;
			
			return {
				// Loads all scripts
				_loadScripts: function() {
					const scripts = resources.scripts || [];
					if (!Array.isArray(scripts)) return Promise.reject("The list of scripts must be an array.");
					
					const promise = Promise.all(
						scripts.map(function(script) {
							if (typeof script === "string") return importArticle({ type: "script", article: script });
							
							if (!("hook" in script)) return Promise.reject("A script hook is required.");
							
							const name = script.name || script.hook;
							const page = script.page;
							
							if (name in window.dev && window.dev[name]) {
								return Promise.resolve(window.dev[name]);
							}
							
							const parts = script.hook.split(".");
							const isDev = parts.length === 1;
							const hook = isDev ? "dev." + parts.shift() : script.hook;
							
							return new Promise(function(res, rej) {
								return importArticle({ type: "script", article: page })
									.then(function() { mw.hook(hook).add(res); });
							});
						}, context)
					);
					
					return promise;
				},
				// Loads all stylesheets
				_loadStyles: function() {
					const styles = resources.styles || [];
					if (!Array.isArray(styles)) return Promise.reject("The list of stylesheets must be an array.");
					
					const promise = Promise.all(
						styles.map(function(style) {
							return importArticle({ type: "style", article: style });
						}, context)
					);
					
					return promise;
				},
				// Loads all dependencies
				_loadDeps: function() {
					const deps = resources.dependencies || [];
					if (!Array.isArray(deps)) return Promise.reject("The list of MediaWiki dependencies must be an array");
					const promise = mw.loader.using(deps);
					return promise;
				},
				// Initializes the loader
				init: function() {
					return Promise.all([
						this._loadScripts(),
						this._loadStyles(),
						this._loadDeps()
					]);
				}
			};
		},
		// Initializes the loader
		_initLoader: function() {
			const loader = this._createLoader({
				scripts: this._scripts,
				styles: this._styles,
				dependencies: this._dependencies
			});
			
			return loader.init();
		}
	});
	
	function regesc(s) { return s.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&"); }
	
	$.extend(wa, {
		/* Load resources for the WikiActivity script */
		// A list of default configurations
		_defaults: Object.freeze({
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
		// Creating a list of canonical subpages
		_subpages: Object.freeze([
			"main", // The main activity feed
			"recentchanges", // Recent changes
			"watchlist", // Watched pages only
			"feeds", // Discussions/Feeds activity
			"media" // Media activity
		]),
		// Creating a list of supported namespaces
		_supportedNamespaces: Object.freeze([
			0, // article
			1, // talk
			2, // user
			3, // user talk
			4, // project
			5, // projecct talk
			6, // file
			7, // file talk
			110, // forum
			111, // forum talk
			500, // user blog
			501, // user blog comment
			828, // module
			829 // module talk
		]),
		// A list of default limits
		_limits: Object.freeze([ 5, 10, 25, 50, 100, 250, 500 ]),
		// Checks if a user is a member of the selected groups
		_isMember: function(groups) {
			return this._conf.wgUserGroups.some(function(group) {
				return groups.includes(group);
			});
		},
		// Checks if a user can phalanx
		_canPhalanx: function() {
			return this._isMember([
				"staff", 
				"wiki-specialist",
				"soap"
			]);
		},
		// Checks if the user can block
		_canBlock: function() {
			return this._canPhalanx() || this._isMember([
				"global-discussions-moderator",
				"sysop"
			]);
		},
		// Checks if the group has moderator permissions
		_isMod: function(groups) {
			return this._canBlock() || this._isMember([
				"discussion-moderator",
				"threadmoderator"
			]);
		},
		// Checks if the user can rollback edits
		_canRollback: function(groups) {
			return this._canBlock() || this._isMember([
				"rollback"
			]);
		},
		// Checks if the user can patrol pages
		_canPatrol: function(groups) {
			return this._canBlock() || this._isMember([
				"patrol"
			]);
		},
		// Checks if the namespace is a talk namespace
		_isTalk: function(ns) {
			return [3, 5, 111, 829].includes(ns);
		},
		/* Creates the Spinner object */
		_setAttributes: function(el, attributes) {
			Object.getOwnPropertyNames(attributes)
				.forEach(function(property) { 
					return el.setAttribute(property, attributes[property]); 
				});
			return el;
		},
		_createSpinner: function(size) {
			if (typeof size !== "object") {
				if (isNaN(size) || !isFinite(size)) throw new TypeError("The value must either be an object of a number");
				size = { width: Number(size), height: Number(size) };
			}
			
			const attrs = Object.freeze({
				el: Object.freeze({
					width: size.width,
					height: size.height,
					viewBox: [0, 0, 66, 66].join(" "),
					xmlns: "http://www.w3.org/2000/svg"
				}),
				g: Object.freeze({
					transform: "translate(33, 33)"
				}),
				c: Object.freeze({
					fill: "none",
					r: 30,
					"stroke-width": 2,
					"stroke-dasharray": 188.49555921538757,
					"stroke-dashoffset": 188.49555921538757,
					"stroke-linecap": "round"
				})
			});
			
			const spinner = this._setAttributes(document.createElementNS("http://www.w3.org/2000/svg", "svg"), attrs.el);
			spinner.classList.add("wds-spinner", "wds-spinner__block");
			
			const g = this._setAttributes(document.createElementNS("http://www.w3.org/2000/svg", "g"), attrs.g);
			const c = this._setAttributes(document.createElementNS("http://www.w3.org/2000/svg", "g"), attrs.c);
			c.classList.add("wds-spinner__stroke");
			g.append(c);
			spinner.append(g);
			
			return { 
				el: function() { return spinner; }, 
				html: function() { return spinner.outerHTML; }
			};
		},
		/* Preparing for lift-off */
		// Escapes RegExp characters
		_regesc: regesc,
		// Serialize the object
		_serialize: function(o, args) {
			const parsed = Object.getOwnPropertyNames(params).reduce(function(property, obj) {
				const param = params[property];
				
				if (typeof param === "object") obj[property] = JSON.stringify(param);
				
				if (typeof param === "function") {
					const a = [property].concat(Array.from(args));
					obj[property] = param.apply(context, a);
				}
				
				obj[property] = param;
				return obj;
			}, {});
			
			const search = new URLSearchParams(Object.entries(params));
			return search.toString();
		},
		// Fetches the Wikia API url
		_getWikiaApiUrl: function(params, args) {
			const context = this;
			const base = this._conf.wgScriptPath + "/wikia.php";
			const serialized = this._serialize(params, args || []);
			return base + (serialized ? "?" + serialized : "");
		},
		// An array of icon names
		_iconNames: Object.freeze([
			{ icon: "pencil", aliases: ["edit"] },
			{ icon: "add", aliases: ["new"] },
			{ icon: "bubble", aliases: ["talk"] },
			{ icon: "tag", aliases: ["categorize"] },
			{ icon: "clock", aliases: ["diff", "time"] },
			{ icon: "gear", aliases: ["settings", "options"] },
			"comment",
			"more"
		]),
		// Fetches the icon
		_getIcon: function(icon) {
			const finalIcon = this._iconNames.find(function(ic) {
				if (typeof ic !== "string") {
					const iconName = ic.icon;
					const aliases = Array.isArray(ic.aliases) ? 
						ic.aliases : 
						[];
					
					return (icon === iconName) || aliases.includes(icon);
				}
				
				return icon === ic;
			});
			
			if (!finalIcon) return this._wds.icon(icon);
			
			const _ic = typeof finalIcon !== "string" ?
				finalIcon.icon :
				finalIcon;
				
			return this._wds.icon(_ic);
		},
		// A dictionary of type prefixes
		_typePrefixes: Object.freeze({
			"recentchanges": "rc",
			"watchlist": "wl",
			"logevents": "le"
		}),
		// Fetches default params
		_getDefaultParams: function(list) {
			return this._getDefaultParamsFromType(list, {
				action: "query",
				format: "json",
				list: list
			});
		},
		// Fetches default params from type
		_getDefaultParamsFromType: function(list, params) {
			const defs = {
				prop: [
					"comment",
                    "timestamp",
                    "user",
                    "title",
                    "userid",
                    "ids"
				],
				dir: "older",
				show: [],
				limit: this.options.limit,
				namespace: this.options.namespaces
			};
			
			if (!(list in this._typePrefixes)) return params;
			const type = this._typePrefixes[list];
			
			defs[list === "logevents" ? "end" : "start"] = (new Date()).toISOString();
			
			if (!this.options.flags.minor) defs.show.push("!minor");
			if (!this.options.flags.bot) defs.show.push("!bot");
			if (!this.options.flags.anon) defs.show.push("!anon");
			
			return Object.getOwnPropertyNames(defs).reduce(function(def, p) {
				p[type + def] = defs[def];
				return p;
			}, params);
		},
		// Create a list of activity feed types
		_types: Object.freeze({
			// Recent changes activity feed
			recentchanges: function(c) {
				const params = this._getDefaultParams("recentchanges");
				const type = this._typePrefixes["recentchanges"];
				
				params[type + "prop"] = [
					"comment",
					"timestamp",
					"user",
					"title",
					"userid",
					"ids"
				];
				
				params[type + "type"] = ["categorize", "edit", "new"];
				
				if (c) {
					params[type + "continue"] = c;
					delete params[type + "start"];
				}
				
				return (new mw.Api()).post(params);
			},
			// Watchlist activity feed
			watchlist: function(c) {
				const params = this._getDefaultParams("watchlist");
				const type = this._typePrefixes["watchlist"];
				
				params[type + "prop"] = [
					"comment",
                    "timestamp",
                    "user",
                    "title",
                    "userid",
                    "ids"
				];
				
				params[type + "type"] = ["categorize", "edit", "new"];
				
				if (c) {
					params[type + "continue"] = c;
					delete params[type + "start"];
				}
				
				return (new mw.Api()).post(params);
			},
			// Media activity feed
			images: function(c) {
				const params = this._getDefaultParams("logevents");
				const type = this._typePrefixes["logevents"];
				
				params[type + "prop"] = [
					"title",
					"userid",
					"timestamp",
					"comment"
				];
				
				params[type + "type"] = "upload";
				params[type + "action"] = "upload/upload";
				
				if (c) {
					params[type + "continue"] = c;
					delete params[type + "start"];
				}
				
				return (new mw.Api()).post(params);
			},
			// Feeds activity
			feeds: function(c) {
				const req = new XMLHttpRequest();
				const url = this._getWikiaApiUrl({
					controller: "DiscussionsPost",
					method: "getPosts",
					limit: this.options.limit
				});
				
				req.open("GET", url);
				req.setRequestHeader("Accept", "application/hal+json");
				req.withCredentials = true;
				req.timeout = 10000;
				
				req.send();
			},
			// Main activity feed
			main: function(c) {
				return Promise.all([
					this._types.recentchanges(c),
					this._types.feeds(c)
				]);
			}
		}),
		// Checks if the page is a special page
		_isSpecialPage: function() {
			return this._conf.wgNamespaceNumber === -1;
		}
	});
	
	const cache = {
		avatars: []
	}, state = {};
	
	function safeJSONParse(s) {
		try { return JSON.parse(s); }
		catch (e) { console.warn(e); return s; }
	}
	
	function isPlainObject(o) {
		const ts = Object.prototype.toString;
		return ts.call(o) === "[object Object]";
	}
	
	$.extend(wa, {
		// A dictionary of subpage patterns
		_subpagePatterns: {},
		// A directory of subpage aliases
		_subpageAliases: Object.freeze({
			"recentchanges": ["rc"],
			"discussions": ["d", "f", "feeds"],
			"media": ["files", "images", "videos", "m"],
			"watchlist": ["following", "w"]
		}),
		// Parses the Date object
		_parseDateObject: function(x) {
			var d = null;
			return !isNaN((d = (x instanceof Date) ? x : new Date(x))) ? d : null;
		},
		// Safely parses JSON
		_safeJSONParse: safeJSONParse,
		// Creates a storage container
		_createStorage: function(name) {
			const prefix = this._name + (name ? "-" + name : "");
			const context = this;
			const intervalCache = {};
			
			return {
				get: function(key) {
					if (!arguments.length) {
						return Object.getOwnPropertyNames(localStorage)
							.reduce(function(property, obj) {
								if (!property.startsWith(prefix)) return obj;
								obj[property] = localStorage.getItem(property);
								return obj;
							}, {});
					}
					
					const sKey = prefix + "-" + key;
					const value = localStorage.getItem(key);
					const r = context._safeJSONParse(value);
					if (r.__hasExpiry) return r.value;
					return r;
				},
				set: function(k, v, o) {
					if (arguments.length === 1 && typeof k === "object") {
						return Object.keys(k).some(function(key) {
							const value = k[key];
							return this.set(key, value);
						}, this);
					}
					
					const sKey = prefix + "-" + (k || "");
					if (sKey === prefix + "-") return false;
					const stringified = JSON.stringify(v);
					
					if (typeof o === "object" && o.expiry) {
						o.value = stringified;
						return this.__store(sKey, o);
					}
					
					localStorage.setItem(sKey, stringified);
					return true;
				},
				remove: function(k) {
					const key = prefix + "-" + k;
					try {
						if (intervalCache[key]) {
							clearInterval(intervalCache[key]);
							delete intervalCache[key];
						}
						localStorage.removeItem(key);
						return true;
					} catch (e) {
						console.warn(e);
						return false;
					}
				},
				clear: function() {
					const keys = Object.keys(localStorage).filter(function(s) {
						return s.startsWith(prefix);
					});
					
					if (!keys.length) return false;
					
					k.forEach(this.remove);
				},
				__store: function(k, o) {
					if (arguments.length < 2) throw new Error("This function requires two arguments.");
					var d = null;
					const expiry = ("expiry" in o && !isNaN(o.expiry) && isFinite(o.expiry)) ? 
						(Date.now() + Math.abs(parseInt(o.expiry))) : 
						(isNaN((d = context._parseDateObject(o.expiry))) ? 
							Date.now() * (2 * 24 * 3600 * 1000) :
							d);
							
					const expiryDate = context._parseDateObject(expiry);
					o.expiry = expiryDate.toISOString();
					o.__hasExpiry = true;
					const r = this.set(k, o);
					this.__watch(k);
					return r;
				},
				__watch: function(k) {
					if (!localStorage.getItem(k)) return false;
					intervalCache[k] = setInterval(function() {
						const v = context._safeJSONParse(localStorage.getItem(k));
						const expiry = v.expiry;
						const d = context._parseDateObject(expiry).getTime() / 1000;
						const c = Date.now() / 1000;
						const diff = d - c;
						if (diff >= 1) return;
						
						localStorage.removeItem(k);
						clearInterval(intervalCache[k]);
						delete intervalCache[k];
					}, 1000);
					return true;
				}
			};
		},
		// Checks if the object is a plain object
		_isPlainObject: isPlainObject,
		// Prepares the script
		_prepare: function() {
			this._storage = this._createStorage();
			const loader = this._initLoader();
			return loader
				.then(this._loadMessages.bind(this))
				.then(this._init.bind(this));
		},
		// Loads messages from I18n-js
		_loadMessages: function() {
			const ctx = this;
			return new Promise(function(res, rej) {
				window.dev.i18n
					.loadMessages(ctx._name)
					.then(res)
					["catch"](rej);
			});
		},
		// Gets subpage patterns
		_getSubpagePattern: function(type) {
			if (!("i18n" in window.dev) || !this._i18n) return null;
			const subpageName = this._i18n.msg("page-" + type + "-subpage").plain();
			const regexString = "^" + this._regesc(subpageName) + "$";
			return new RegExp(regexString, "i");
		},
		// Starts the script
		_init: function(i18n) {
			this._i18n = i18n;
			const subpageKeys = Object.keys(this._types).filter(function(k) { return k !== "main"; });
			const mt = {};
			 
			subpageKeys.forEach(function(k) { mt[k] = [k]; });
			Object.keys(this._subpageAliases).forEach(function(k) {
				if (!mt[k]) mt[k] = [k];
				const a = this._subpageAliases[k];
				a.forEach(function(ak){ mt[k].push(ak); });
			}, this);
			 
			Object.keys(mt).forEach(function(k) {
			 	const v = mt[k].map(this._getSubpagePattern, this);
			 	this._subpagePatterns[k] = v;
			}, this);
		}
	});
	
	wa._prepare();
	console.log(wa);
})(window, jQuery, mediaWiki, window.rwaOptions || {});