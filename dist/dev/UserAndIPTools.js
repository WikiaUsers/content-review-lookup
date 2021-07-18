/**
 * UserAndIPTools
 * 
 * Script used to get data about users and include quick tools related to them
 * 
 * @author			Thundercraft5 (UCP Re-write)
 * @author  		Rail01 (Original script)
 * @version			0.5
 *
 * Example configuration
 * ```
 * window.UserAndIPTools = {
		enable: {
			MultiLookup: true,
			LookupContribs: true,
			LookupUser: true,
		},
		openInNewPage: true,
		disableDebug: true,
	};
 * ```
 * 
 * Deprecated configuration
 * ```
   window.UserAndIPToolsOpenInNewPage = true;
   window.UserAndIPToolsDisableDebugLog = true;
   window.UserAndIPToolsShowMultiLookup = true;
   window.UserAndIPToolsShowLookupContribs = true;
   window.UserAndIPToolsShowLookupUser = true;
 * ```
 */
/* jshint
	esversion: 5, forin: true, 
	immed: true, indent: 4, 
	latedef: true, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084
*/
/* global mw, UserAndIPTools, importArticles */

mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {
	"use strict";
	if (window.UserAndIPTools && window.UserAndIPTools.loaded) {
		return window.UserAndIPTools.warn('Script double loaded, exiting...');
	}

	/**
	 * Main Script Class
	 * 
	 * @class				UserAndIPTools
	 * @init				hooks()
	 * @loadcondition		canRun()
	 */
	window.UserAndIPTools = $.extend({
		// Variable for double load protection
		loaded: true,

		/**#====================================================================#
		 * Default configuration options
		 * --------------------------------
		 * These fields contain any default configuration variables.
		 **#=====================================================================#
		 */
		enable: {
			MultiLookup: false,
			LookupContribs: false,
			LookupUser: false,
		},
		openInNewPage: false,
		disableDebug: false,
		
		/**#====================================================================#
		 * Global Variables
		 * --------------------------------
		 * These fields contain all data used by this script.
		 **#=====================================================================#
		 */
		wg: mw.config.get([
			'wgPageName',
			'wgArticlePath',
			'wgUserGroups',
			'wgNamespaceNumber',
		]),
		api: new mw.Api(),
		willLoad: true,
		namespaces: mw.config.get('wgFormattedNamespaces'),
		userId: mw.config.get('profileUserId'),
		userName: mw.config.get('profileUserName'),
		exists: !(Number(mw.config.get('profileUserId')) === 0 && !mw.util.isIPAddress(mw.config.get('profileUserName'))),
		isAnon: Number(mw.config.get('profileUserId')) === 0 && mw.util.isIPAddress(mw.config.get('profileUserName')),
		csrfToken: mw.user.tokens.values.csrfToken,
		version: 0.5,
		hooksCount: 0,
		debug: window.UserAndIPToolsDisableDebugLog !== undefined ? window.UserAndIPToolsDisableDebugLog : true,

		/**
		 * Data object for Hooks fired by this script
		 * 
		 * @data		Hooks for this script
		 * @field		hook
		 * @used		
		 */
		hook: Object.freeze({
			loaded: mw.hook('dev.UserAndIPTools.loaded'),
		}),
		/**
		 * Data object for All external dependencies/waitfor's data
		 *
		 * @field		imports
		 * @data		All external dependencies/waitfor's data
		 * @used		import()
		 */
		imports: Object.freeze({
			scripts: Object.freeze([
				'u:dev:MediaWiki:UI-js/code.js',
				'u:dev:MediaWiki:I18n-js/code.js',
			]),
			style: Object.freeze([
				'u:dev:MediaWiki:UserAndIPTools.css',
			]),
			hooks: Object.freeze([
				'dev.i18n',
				'dev.ui',
			]),
			await: Object.freeze([
				'mediawiki.api',
				'mediawiki.notify',
				'mediawiki.util',
			]),
			otherOnloadPromises: [],
		}),

		/**
		 * User rights level object.
		 * Stores data about the necessary rights to preform an action.
		 *
		 * @field				rights
		 * @parent				UserAndIPTools
		 * @used				getRights()
		 */
		rights: Object.freeze({
			"global": Object.freeze([
				'staff',
				'helper',
				'global-discussions-moderator',
				'wiki-representative',
				'soap',
			]),

			"checkuser": Object.freeze([
				'soap',
				'helper',
				'staff',
				'wiki-representative',
				'wiki-specialist',
				'checkuser',
				'util',
			]),

			"block": Object.freeze([
				'sysop',
				'staff',
				'helper',
				'bureaucrat',
				'global-discussions-moderator',
				'wiki-representative',
				'soap',
			]),

			"delete": Object.freeze([
				'content-moderator',
				'threadmoderator',
				'sysop',
				'soap',
				'staff',
				'helper',
				'global-discussions-moderator',
				'wiki-representative',
				'wiki-specialist',
				'util',
			]),

			"move": Object.freeze([
				"user",
			]),
		}),

		/**#====================================================================#
		 * Loader functions
		 * --------------------------------
		 * These functions initialize the script and add the event handlers
		 * to the page.
		 **#=====================================================================#
		 */

		/**
		 * Main initializer script function.
		 * Adds the hooks the imported scripts fire.
		 * Then, it loads them.
		 *
		 * @method		hooks
		 * @class		UserAndIPTools
		 */
		hooks: function() {
			this.import().then(function() {
				this.imports.hooks.forEach(function(v) {
					mw.hook(v).add(this.onHook.bind(this, v));
				}.bind(this));
			}.bind(this));
		},

		/**
		 * Function for when a hook is loaded.
		 * This is function is called 2 times. When the hooks count reach 2, it adds the click event handlers.
		 *
		 * @method		onHook
		 * @class		UserAndIPTools
		 */
		onHook: function(value, arg) {
			// Increment Hook count
			++this.hooksCount;

			// Switch hook value
			switch (value) {
				case ("dev.i18n"):
					this.i18n = arg;
					break;
				
				case ('dev.ui'):
					this.ui = arg;
					break;
			}

			// When hooks count reach 2, load the script
			if (this.hooksCount === 2) {
				$.when.apply($, [
					this.i18n.loadMessages('UserAndIPTools', { language: this.lang })
				].concat(this.imports.otherOnloadPromises)).then(this.init.bind(this)).catch(console.warn);
			} else return;
		},

		/**
		 * Dependency importer.
		 * This method imports any external scripts/data used by this one.
		 * 
		 * @method		import
		 * @class		UserAndIPTools
		 */
		import: function() {
			this.log('importing...');
			var def = new $.Deferred();

			// Import styles/dependencies
			importArticles({
				type: "script",
				articles: this.imports.scripts,
			});		
			importArticles({
				type: "style",
				articles: this.imports.style,
			});
			
			this.imports.otherOnloadPromises.push(
				this.api.get({
					action: 'query',
					list: 'users',
					ususers: this.userName,
					usprop: [
						'groups',
						'gender',
						'registration',
						'editcount'
					].join('|'),
				}).then(function(d) {
					if (!d.query.users || !d.query.users.length) {
						// intercept load event
						this.willLoad = false;
						this.warn('User does not exist, exiting...');
						return;
					}
					this.userData = d.query.users[0];
				}.bind(this), console.warn)
			);

			return def.resolve();
		},

		/**
		 * Actual script initializer.
		 * This function sets up the event handlers on the page 
		 * and sets the variables that cannot be loaded beforehand.
		 *
		 * @method		init
		 * @class		UserAndIPTools
		 */
		init: function(i18n) {
			if (!this.willLoad) return;
			
			this.getLocalUrl = mw.util.getParamValue;
			this.i18n = i18n;
			this.wg.wgArticlePath = this.wg.wgArticlePath.replace('$1', ''),
			this.getParamValue = mw.util.getParamValue;

			Object.freeze(this.wg);
			this.log('Ready');

			// Supprt Deprecated parameters
			var prefix = 'UserAndIPTools';
			var oldConfigProps = {
				ShowMultiLookup: "enable.MultiLookup",
				ShowLookupContribs: "enable.LookupContribs",
				ShowLookupUser: "enable.LookupUser",
				OpenInNewPage: "openInNewPage",
				DisableDebugLog: "disableDebug",
			};
			
			Object.keys(window).forEach(function(key) {
				var oldPrefix = key;
				if (key.startsWith(prefix) && key !== prefix) {
					this.warn('You are using the deprecated configuration parameter window.' + key + '. Please see the documentation at https://dev.fandom.com/wiki/UserAndIPTools to switch to supported parameters.');
					key = key.replace(prefix, '');
					
					if (oldConfigProps[key].match(/\./)) {
						var split = oldConfigProps[key].split(/\./);
						this[split.shift()][split.pop()] = window[oldPrefix];
					} else {
						this[key] = window[oldPrefix];
					}
				}
			}, this);

			// Fire any hooks attached to this script
			this.hook.loaded.fire();
			this.i18n.useUserLang();
			
			var inter = setInterval(function() {
				if ($('#userProfileApp').length) clearInterval(inter), this.appendTools();
			}.bind(this), 1);
			
		},

		/**#====================================================================#
		 * Utility functions
		 * --------------------------------
		 * These functions preform utilities for the script.
		 **#=====================================================================#
		 */

		/**
		 * Rights data function.
		 * Returns an array of user groups for the requested action.
		 * 
		 * @method					getRights
		 * @class					UserAndIPTools
		 * @returns	{Array}			An Array of user groups for the requested action
		 * @param {String} action	The action to request
		 */
		getRights: function(action) {
			action = action.toLowerCase();

			switch (action) {
				case ("global"): return this.rights[action];
				case ("checkuser"): return this.rights[action];
				case ("block"): return this.rights[action];
				case ("protect"):
				case ("delete"): return this.rights["delete"];
				case ("move"): return this.rights[action];
			}
		},

		/**
		 * User groups rights checker function.
		 * Checks if the user has the groups for the requested level.
		 *
		 * @method					hasRights
		 * @class				   UserAndIPTools
		 * @returns {Boolean}		Whether the user has the requested rights
		 * @param {String} level	The action to request
		 */
		hasRights: function(level) {
			var rights = this.getRights(level),
				len = rights.length;

			while (len--) if (~this.wg.wgUserGroups.indexOf(rights[len])) return true;

			return false;
		},

		/**
		 * Function to check whether the script can run.
		 * Used outside the class.
		 * 
		 * @method		canRun
		 * @class		UserAndIPTools
		 */
		canRun: function() {
			return this.hasRights("move") && this.exists;
		},

		/**
		 * Function to load an `i18-js` message.
		 * 
		 * @method				msg
		 * @class				UserAndIPTools
		 * @param {String} 1	the message code
		 * @param {*} arguments arguments to the message
		 * @return {String} 	The message's contents
		 */
		msg: function() {
			return this.i18n.msg.apply(null, arguments).plain();
		},

		/**
		 * Function to check if a value is nullish as this software 
		 * does not support the `??` operator.
		 *
		 * @method				isNullish
		 * @class				UserAndIPTools
		 * @param {*} v 		The value to check 
		 * @returns {Boolean}	Whether not the value is nullish
		 */
		isNullish: function(v) {
			return v === null || v === undefined;
		},

		/**
		 * Function to set up a nullish default as this software 
		 * does not support the `??` operator.
		 * 
		 * @method				nullishDefault
		 * @class				UserAndIPTools
		 * @param {*} v			The value to check and return if it is not nullish
		 * @param {*} _default	The value to return if `v` is nullish
		 * @returns {*} 		`v` if it is not nullish and `` if it is
		 */
		nullishDefault: function(v, _default) {
			return this.isNullish(v) ? _default : v;
		},

		/**
		 * Function to create a logging method in the class
		 * 
		 * @method		  logBuilder
		 * @class		   UserAndIPTools
		 * @param {String} level - The level to log at.
		 * @param {Arguments} args - The function arguments to call the logging function with.
		 * @return {String} - The message that was passed to the logging function.
		 */
		logBuilder: function(level, args) {
			args = Array.from(args);
			console[level.toLowerCase()].apply(null, ['[UserAndIPTools v' + this.version + '] [' + level.toUpperCase() + ']:'].concat(args));
			return args.join(' ');
		},

		/**
		 * Function to log a error message with the script's name.
		 * 
		 * @method		  error
		 * @class		   UserAndIPTools
		 * @param {*} arguments - The arguments to pass to the logging function. 
		 * @return {String} - The message that was passed to the logging function.
		 */
		error: function() {
			return this.logBuilder('warn', arguments);
		},

		/**
		 * Function to log a warning message with the script's name.
		 * 
		 * @method			warn
		 * @class		   UserAndIPTools
		 * @param {*} arguments - The arguments to pass to the logging function. 
		 * @return {String} - The message that was passed to the logging function.
		 */
		warn: function() {
			return this.logBuilder('warn', arguments);
		},

		/**
		 * Function to log a debug message with the script's name.
		 * 
		 * @method			log
		 * @class			 UserAndIPTools
		 * @param {*} arguments - The arguments to pass to the logging function. 
		 * @return {String} - The message that was passed to the logging function.
		 */
		log: function() {
			return !this.disableDebug && this.logBuilder('log', arguments);
		},
		
		/**
		 * Function to make a link.
		 * 
		 * @method				log
		 * @class				UserAndIPTools
		 * @param {String} page - The page/external link to link to.
		 * @param {String} [alt] - The alternate text to display on the link element.
		 * @param {Object} [attrs] - The attributes to use for the link element.
		 * @returns	{Node} - The link element.	
		 */
		makeLink: function(page, alt, attrs) {
			var page = page || this.wg.wgPageName;
			var origPage = page;
			var attrs = attrs || {};
			
			var wiki, specials = {
				'^(m|meta):': '//meta.wikimedia.org/wiki/',
				'^(mw):': '//mediawiki.org/wiki/',
				'^(ucp):': '//ucp.fandom.com/wiki/',
				'^(wp|wikipedia):': '//en.wikipedia.org/wiki/',
				'^(w|wikia):(?!c|community)': '//community.fandom.com/wiki/',
				'^(dev):': '//dev.fandom.com/wiki/',
				'^(?:w|wikia):(?:c|community):([a-z]+)?\\.?([a-z_\\-0-9A-Z]+):': function(match) {
					var community = match[2],
						lang = match[1];
		
					return "https://" + community + ".fandom.com" + lang ? '/' + lang : '';
				}
			};
		
			if ((/^([\w\.\-]+?):/).test(page)) {
				for (var k in specials) {
					if (specials.hasOwnProperty(k)) {
						var v = specials[k];
			
						if (new RegExp(k, 'i').test(page)) {
							if (typeof(v) === "string") {
								wiki = v;
							} else if (typeof(v) === "function") {
								wiki = v(page.match(k));
							}
							page = page.replace(new RegExp(k), '');
							break;
						}
					}
				}
			}
			
			if (typeof(attrs.condition) === 'undefined') attrs.condition = true;
			
			return this.ui({
				type: 'a',
				text: this.string(alt || page) + (attrs && attrs.query && this.objectToQuery(attrs.query) || ''),
				condition: attrs && attrs.condition,
				attr: $.extend(attrs || {}, {
					href: (wiki ? wiki : '') + (page.match(/^[\w\.\-]*:?\/\//) ? page : this.getLocalUrl(page)),
					title: origPage,
				}),
			}) || "";
		},
		/**
		 * 
		 * Function to convert a value into a string.
		 * 
		 * @param {*} value	- The value to convert.
		 * @returns {String} - The converted value
		 * @method			string
		 * @class			UserAndIPTools
		 */
		string: function(value) {
			if (Array.isArray(value)) {
				return value.join('');
			} else {
				return String(value);
			}
		},
		
		/**
		 * Function to create a list of links.
		 *
		 * @param {Object} links - The list of links to be mapped over.
		 * @returns	{Node[]} The list of links.
		 * @method			string
		 * @class			UserAndIPTools
		 */
		 mapLinks: function(links) {
			return Object.keys(links).map(function(key) {
				var value = links[key].replace(/\$\{(.+?)\}/g, function(_, variable) {
					switch (variable) {
						case("id"): return this.userId;
						case("user"): return this.userName;
					}
				}.bind(this));
				
				return this.ui({
					type: "li",
					children: [this.makeLink(value, this.msg(key), { 
						target: this.openInNewPage ? "_blank" : "_self",
					})],
				});
			}, this);
		},
		/**#=====================================================================#
		 * Main functions
		 * --------------------------------
		 * These functions do the main work when running this script.
		 **#=====================================================================#
		 */
		 
		createDropdown: function(data) {
			var held = false,
				shown = false;
				
			return this.ui({
				type: "div",
				attr: {
					class: "USIP-dropdown",
					id: data.id,
				},
				events: {
					mouseleave: function() {
						if (held) return;
						$(this).find('label > div').animate({
							opacity: "hide"
						}, {
							queue: false,
							duration: 300,
							done: function() {
								shown = false;
							},
						});
					},
				},
				children: [{
					type: "input",
					attr: {
						name: data.id + "-toggle",
						id: data.id + "-toggle",
						type: "checkbox",
						style: "display: none !important;",
						class: "USIP-toggle",
					},
					events: {
						change: function() {
							held = !held;
						},
					}
				}, {
					type: "label",
					attr: {
						'for': data.id + "-toggle",	
						style: "cursor: pointer",
					},
					children: [{
						type: "span",
						text: data.label,
						attr: {
							class: "USIP-dropdown-label",
						},
						events: {
							mouseenter: function() {
								if (shown || held) return;

								$(this).parent().parent().find('label > div').animate({
									opacity: "show"
								}, {
									queue: false,
									duration: 300,
									done: function() {
										shown = true;
									},
								});
							},
						},
					}, {
						type: "svg",
						attr: {
							xmlns: "http://www.w3.org/2000/svg",
							"xmlns:xlink": "http://www.w3.org/1999/xlink",
							viewBox: "0 0 12 12",
							class: "wds-icon wds-icon-tiny wds-dropdown__toggle-chevron",
							id: "wds-icons-dropdown-tiny",
						},
						children: [{
							type: "defs", 
							children: [{
								type: "path", 
								id: "dropdown-tiny-a",
								d: "M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z", 
							}],
						}, { 
							type: "use",
							attr: {
								"fill-rule": "evenodd",
								"xlink:href": "#dropdown-tiny-a",
							}
						}],
					}, {
						type: "div",
						attr: {
							class: "USIP-dropdown-content",
							style: "display: none !important;",
						},
						children: data.children,
					}],
				}],
			});
		},
		
		appendTools: function() {
			var dataProps;
			var links = {
				anon: {
					'ip-tool-whois': "//whois.toolforge.org/gateway.py?" + decodeURIComponent($.param({ lookup: true, ip: "${user}" })),
					'ip-tool-torcheck': "//www.xmyip.com/tor-ip-check/${user}",
					'ip-tool-proxy-check': "//iphub.info/?ip=${user}",
					'ip-tool-blacklist-check': "https://cleantalk.org/blacklists/${user}",
					'ip-tool-geolocate': "//db-ip.com/${user}",
				},
				user: {
					'user-tool-js': "//community.fandom.com/wiki/User:${user}/global.js",
					'user-tool-css': "//community.fandom.com/wiki/User:${user}/global.css",
					'user-tool-services': '//services.fandom.com/user-attribute/user/${id}',
					'user-tool-cc_log': "//community.fandom.com/wiki/Special:Log/rights?page=User:${user}",
				},
				restricted: {
					'user-tool-lookupuser': '//community.fandom.com/wiki/Special:LookupUser/${user}',
					'user-tool-lookupcontribs': '//community.fandom.com/wiki/Special:LookupContribs?target=${user}',
					'ip-tool-multilookup': '//community.fandom.com/wiki/Special:MultiLookup?wgtarget=${user}',
				}
			};

			var enableRestrictedProps = {
				MultiLookup: 'user-tool-lookupuser',
				LookupContribs: 'user-tool-lookupcontribs',
				LookupUser: 'ip-tool-multilookup',
			};
			
			for (const prop in enableRestrictedProps) { // jshint ignore:line
				if (!this.enable) break;
				var value = enableRestrictedProps[prop];
				
				if (this.enable[prop] || this.hasRights('global')) links[value === 'ip-tool-multilookup' ? 'anon' : "user"][value] = links.restricted[value];
			}
			
			if (!this.isAnon) {
				dataProps = {
					'id': this.userData.userid,
					'gender': this.userData.gender,
					'registration': new Date(this.userData.registration),
					'editcount': this.userData.editcount,
					'groups': this.userData.groups.join(', '),
				};
	
				dataProps = Object.keys(dataProps).map(function(key) {
					return this.ui({
						type: "li",
						children: [{
							type: "span",
							classes: ["USIP-data-key"],
							text: this.msg('user-' + key) + ': ',
						}, {
							type: "span",
							classes: ["USIP-data-value"],
							text: this.string(dataProps[key]),
						}]
					});
				}, this);
			}
			
			links.user = this.mapLinks(links.user);
			links.anon = this.mapLinks(links.anon);
			
			$('.user-identity-social').after($('<div>', {
				id: "UserAndIPTools",
				html: !this.isAnon ? [
					this.createDropdown({
						id: "USIP-UserData",
						label: this.msg('info-header'),
						children: [{
							type: 'ul',
							children: dataProps,
						}],
					}),
					this.createDropdown({
						id: "USIP-UserTools",
						label: this.msg('tools-header'),
						children: [{
							type: 'ul',
							children: links.user,
						}],
					}),
				] : [
					this.createDropdown({
						id: "USIP-IPTools",
						label: this.msg('tools-header_ip'),
						children: [{
							type: "ul",
							children: links.anon,	
						}],
					}),
				],
			}));
		},
	}, window.UserAndIPTools);

	if (!UserAndIPTools.canRun()) return UserAndIPTools.log('User does not have necessary rights or page is not supported, exiting...');

	UserAndIPTools.hooks();
}).catch(console.warn);