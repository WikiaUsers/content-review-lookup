/**
 * BlockLookup
 * 
 * Adds a custom special page which allows users to view block information.
 * @author Thundercraft5 <https://dev.fandom.com/wiki/User:Thundercraft5>
 * @license BSD-3 clause <https://opensource.org/licenses/BSD-3-Clause>
 * @doc https://dev.fandom.com/wiki/BlockLookup
 * @version 1.0
 */
/*jshint
	esversion: 5, forin: true, immed: true, indent: 4, 
	latedef: false, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true,
*/

/* global mw, importArticles, BlockLookup, OO */
(function() {
	"use strict";
	if (window.BlockLookup && window.BlockLookup.loaded) {
		return window.BlockLookup.warn('Script double loaded, exiting...');
	}

	if (mw.config.get('wgPageName').startsWith('Special:Blocklookup')) {
		window.location.replace(window.location.href.replace('Special:Blocklookup', 'Special:BlockLookup'));
	}

	window.dev = window.dev || {};

	/**
	 * Main Script Class
	 * 
	 * @class				BlockLookup
	 * @init				hooks()
	 * @loadcondition		canRun()
	 */
	window.BlockLookup = $.extend({
		// Variable for double load protection
		loaded: true,

		// Configuration
		doDebug: false,

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
			'wgSiteName',
			'wgContentLanguage',
			'wgServerName',
			'wgServer',
		]),
		sep: ' <b>•</b> ',
		sep2: ' | ',
		sep3: ' – ',
		namespaces: mw.config.get('wgFormattedNamespaces'),
		version: 0.3,
		hooksCount: 0,
		toggled: true,
		pending: false,
		prevFocused: null,
		noAbuseLog: false,
		elements: {},
		cachedInputs: null,
		$content: $('#mw-content-text'),

		/**
		 * Data object for Hooks fired by this script
		 * 
		 * @data		Hooks for this script
		 * @field		hook
		 * @used		
		 */
		hook: [
			'loaded',
			'submit',
			'load-start',
			'load-end',
			'result-reject',
			'result-success',
			'input-change',
		],
		/**
		 * Data object for All external dependencies/waitfor's data
		 *
		 * @field		imports
		 * @data		All external dependencies/waitfor's data
		 * @used		import()
		 */
		imports: Object.freeze({
			scripts: [
				'u:dev:MediaWiki:UI-js/code.js',
				'u:dev:MediaWiki:I18n-js/code.js',
			],
			style: Object.freeze([
				'u:dev:MediaWiki:BlockLookup.css',
			]),
			hooks: Object.freeze([
				'dev.i18n',
				'dev.qdmodal',
				'dev.ui',
			]),
			await: [
				'mediawiki.api',
				'mediawiki.util',
				'mediawiki.user',
				'oojs-ui',
				'mediawiki.widgets.UserInputWidget',
				'mediawiki.interface.helpers.styles',
			],
			otherOnloadPromises: [],
		}),

		/**
		 * User rights level object.
		 * Stores data about the necessary rights to preform an action.
		 *
		 * @field				rights
		 * @parent				BlockLookup
		 * @used				getRights()
		 */
		groups: Object.freeze({
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
				'global-discussions-moderator',
			]),

			"block": Object.freeze([
				'sysop',
				'staff',
				'helper',
				'bureaucrat',
				'global-discussions-moderator',
				'wiki-representative',
				'soap',
				'wiki-specialist',
			]),

			"delete": Object.freeze([
				'content-moderator',
				'threadmoderator',
				'sysop',
				'soap',
				'staff',
				'helper',
				'wiki-representative',
				'wiki-specialist',
			]),

			"move": Object.freeze([
				"user",
			]),

			"*": Object.freeze([
				"*",
			]),
		}),

		inputSelectors: Object.freeze([
			'wpTarget',
			'limit',
			'nsInvert',
			'mw-blocklookup-namespace',
			'associated',
			'tagfilter',
			'wpSearchTitle',
			'wpSearchFilter',
			'mw-blocklookup-submit',
		]),

		specialElements: Object.freeze({
			'wpTarget': 1,			
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
		 * @class		BlockLookup
		 */
		hooks: function() {
			this.imports.hooks.forEach(function(v) {
				mw.hook(v).add(this.onHook.bind(this, v));
			}, this);
			if (this.wg.wgPageName.match(/^Special:BlockLookup/i)) this.setPreloading();
			this.import();
		},

		/**
		 * Function when the script is loading it's UI.
		 *
		 * @method		setPreloading
		 * @class		BlockLookup
		 */
		 setPreloading: function() {
			document.getElementsByClassName('page-header__title')[0].innerHTML = 'Block Lookup';
			document.title = 'Block Lookup | ' + this.wg.wgSiteName + ' | Fandom';

			this.$content.text('Loading...');
		 },

		/**
		 * Function for when a hook is loaded.
		 * This is function is called 2 times. When the hooks count reach 2, it adds the click event handlers.
		 *
		 * @method		onHook
		 * @class		BlockLookup
		 */
		onHook: function(hook, value) {
			// Increment Hook count
			++this.hooksCount;

			// Switch hook value
			switch (hook) {
				case ("dev.i18n"):
					this.i18n = value;
					break;

				case ('dev.ui'):
					this.ui = value;
					break;
			}

			if (this.hooksCount === 2) {
				// Load all imports
				$.when.apply($, this.imports.otherOnloadPromises.concat(mw.loader.using(this.imports.await))).then(function() {
					$.when(mw.user.getRights(), this.i18n.loadMessages('BlockLookup', { language: this.lang }))
						.then(function() {
							this.init.apply(this, arguments);
						}.bind(this))
						.catch(function(e) {
							this.warn(e);
						}.bind(this));
				}.bind(this)).catch(function(e) {
					this.warn(e);
				}.bind(this));
			}
		},

		/**
		 * Function to check for previously loaded libraries to save time.
		 *
		 * @method		checkForPreviousImports
		 * @class		BlockLookup
		 */
		checkForPreviousImports: function(libs) {
			Object.entries(libs).forEach(function(data) {
				var hookName = data[0];
				var devLib = data[1];

				if (window.dev[devLib]) {
					this.onHook(hookName, window.dev[devLib]);
					this.imports.scripts.splice(1, 0);
				}
			}, this);
		},

		/**
		 * Dependency importer.
		 * This method imports any external scripts used by this one.
		 * 
		 * @method		import
		 * @class		BlockLookup
		 */
		import: function() {
			this.log('importing...');

			// Check for previous imports
			this.checkForPreviousImports({
				'dev.ui': 'ui',
				'dev.i18n': 'i18n',
			});

			if (this.imports.scripts.length) importArticles({
				type: "script",
				articles: this.imports.scripts,
			});
			if (this.wg.wgPageName.match(/^Special:BlockLookup/i)) importArticles({
				type: "style",
				articles: this.imports.style,
			});
		},

		/**
		 * Actual script initializer.
		 * This function sets up the event handlers on the page 
		 * and sets the variables that cannot be loaded beforehand.
		 *
		 * @method		init
		 * @class		BlockLookup
		 */
		init: function(userRights, i18n) {
			// Variables
			this.api = new mw.Api();
			this.userRights = userRights;
			this.i18n = i18n;
			this.wg.wgArticlePath = this.wg.wgArticlePath.replace('$1', ''),
			this.urlVar = mw.util.getParamValue;
			this.getLocalUrl = mw.util.getUrl,
			this.urlVars = this.getUrlVars() || {};
			this.MWui = OO.ui;
			this.saveInputs = this.saveInputs.bind(this);

			// Hooks
			Object.values(this.hook).forEach(function(value, i) {
				delete this.hook[i];
				this.hook[value] = mw.hook('BlockLookup.' + value);
			}, this);

			// Previous Inputs
			var cachedInputs = mw.storage.get('dev-script-BlockLookup-inputsCache');
			this.cachedInputs = cachedInputs ? JSON.parse(cachedInputs) : {};

			// User rights variables
			var userChecks = {
				canBlock: 'block',
				canCheckUser: 'checkuser',
				canDelete: 'delete',
				isGlobal: 'global',	
			};

			Object.keys(userChecks).forEach(function(k) {
				this[k] = this.doDebug ? true : (k === 'isGlobal' ? this.hasGroup : this.hasRight).call(this, userChecks[k]);
			}, this);

			// Url state variables
			var state = this.getUrlState();
			Object.keys(state).forEach(function(k) {
				this[k] = state[k] || "";
			}, this);

			// Freeze data objects
			this.freeze([
				this.wg,
				this.urlVars,
				this.namespaces,
				this.hook,
			]);

			// Fire any hooks attached to this script
			this.hook.loaded.fire();
			this.i18n.useUserLang();

			// Rights checks
			this.levels = {
				hasGlobalRights: 'global',
				canBlock: 'block',
				canCheckUser: 'checkuser',
				canDelete: 'delete',
			};

			Object.keys(this.levels).forEach(function(key) {
				this.levels[key] = this.doDebug ? true : (key === 'hasGlobalRights' ? this.hasGroup : this.hasRight).call(this, this.levels[key]);
			}, this);
			Object.freeze(this.levels);

			// Input Selectors
			var inputSelectors = {};
			this.inputSelectors.forEach(function(v) {
				inputSelectors[v] = '#' + v;
			});
			this.inputSelectors = inputSelectors;

			// OOUI Elements
			this.elements.wpTarget = new mw.widgets.UserInputWidget({
				id: "wpTarget",
			});
			this.elements.wpTarget.$element
				.find('input')
					.css({
						height: '20px',
						padding: '5px',
						display: 'inline',
						'max-width': '20%',
					})
				.end()
				.css({ display: 'inline' });

			this.elements.progressBar = new this.MWui.ProgressBarWidget({
				id: "mw-blocklookup-progressbar",
			}).toggle();

			// Load actual interface
			switch (this.wg.wgPageName.split('/').shift()) {
				case('Special:BlockLookup'): this.initInterface(); break;
				case('Special:BlockList'): this.initBlockList(); break;
			}

			this.log('Ready');
		},

		/**#====================================================================#
		 * Utility functions
		 * --------------------------------
		 * These functions preform utilities for the script.
		 **#=====================================================================#
		 */

		/**
		 * Function to freeze multiple objects.
		 *
		 * @method			freeze
		 * @class			BlockLookup
		 * @returns {Object[]} The frozen objects.
		 * @param {Object[]} objects - The objects to freeze
		 */
		 freeze: function(objects) {
			return objects.map(function(v) {
				return Object.freeze(v);
			});
		 },

		/**
		 * Rights data function.
		 * Returns an array of user groups for the requested action.
		 * 
		 * @method					getRights
		 * @class					BlockLookup
		 * @returns	{Array}			An Array of user groups for the requested action
		 * @param {String} action	The action to request
		 */
		getRights: function(action) {
			action = action.toLowerCase();

			switch (action) {
				case ("global"):
					return this.groups[action];
				case ("checkuser"):
					return this.groups[action];
				case ("block"):
					return this.groups[action];
				case ("protect"):
				case ("delete"):
					return this.groups[action];
				case ("move"):
					return this.groups[action];
				case("*"):
					return this.groups[action];
				default: return [];
			}
		},

		/**
		 * User groups checker function.
		 * Checks if the user has the groups for the requested level.
		 *
		 * @method					hasGroup
		 * @class				   BlockLookup
		 * @returns {Boolean}		Whether the user has the requested rights
		 * @param {String} level	The action to request
		 */
		hasGroup: function(level) {
			var rights = this.getRights(level),
				len = rights.length;

			while (len--) {
				if (this.wg.wgUserGroups.indexOf(rights[len]) !== -1) {
					return true;
				}
			}

			return false;
		},

		/**
		 * User Rights checker function.
		 * Checks if the user has the right requested.
		 *
		 * @method					hasRight
		 * @class				   BlockLookup
		 * @returns {Boolean}		Whether the user has the requested right
		 * @param {String} level	The right to request
		 */
		hasRight: function(right) {
			return this.userRights.includes(right.toLowerCase());
		},

		/**
		 * Function to check whether the script can run.
		 * Used outside the class.
		 * 
		 * @method		canRun
		 * @class		BlockLookup
		 */
		canRun: function() {
			return this.hasGroup("*");
		},

		/**
		 * Function to load an `i18-js` message.
		 * 
		 * @method				msg
		 * @class				BlockLookup
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
		 * @class				BlockLookup
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
		 * @class				BlockLookup
		 * @param {*} v			The value to check and return if it is not nullish
		 * @param {*} _default	The value to return if `v` is nullish
		 * @returns {*} 		`v` if it is not nullish and `default` if it is
		 */
		nullishDefault: function(v, _default) {
			return this.isNullish(v) ? _default : v;
		},

		/**
		 * Function to create a logging method in the class
		 * 
		 * @method		  logBuilder
		 * @class		   BlockLookup
		 * @param {String} level - The level to log at.
		 * @param {Arguments} args - The function arguments to call the logging function with.
		 * @return {String} - The message that was passed to the logging function.
		 */
		logBuilder: function(level, args) {
			level = level.toLowerCase();
			args = Array.from(args);
			args.unshift('[BlockLookup v' + this.version + ']', '[' + level.toUpperCase() + ']:');

			console[level === 'debug' ? 'info' : level].apply(null, args);
			return args.join(' ');
		},

		/**
		 * Function to log a error message with the script's name.
		 * 
		 * @method			error
		 * @class			BlockLookup
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
		 * @class			BlockLookup
		 * @param {*} arguments - The arguments to pass to the logging function. 
		 * @return {String} - The message that was passed to the logging function.
		 */
		warn: function() {
			return this.logBuilder('warn', arguments);
		},

		/**
		 * Function to log a standard message with the script's name.
		 * 
		 * @method			log
		 * @class			BlockLookup
		 * @param {*} arguments - The arguments to pass to the logging function. 
		 * @return {String} - The message that was passed to the logging function.
		 */
		log: function() {
			return this.logBuilder('log', arguments);
		},

		/**
		 * Function to log a verbose message with the script's name.
		 * 
		 * @method			debug
		 * @class			BlockLookup
		 * @param {*} arguments - The arguments to pass to the logging function. 
		 * @return {String} - The message that was passed to the logging function.
		 */
		debug: function() {
			return this.doDebug ? this.logBuilder('debug', arguments) : undefined;
		},

		/**
		 * Function to generate the namespaces input select.
		 *
		 * @method		generateNamespaces
		 * @class		BlockLookup
		 * @returns {Void}
		 */
		generateNamespaces: function() {
			var o = this.namespaces,
				ret = [];

			Object.keys(o).forEach(function(key) {
				var value = o[key];

				ret.push({
					type: 'option',
					value: key,
					text: value,
				});
			});

			ret[0] = {
				type: 'option',
				value: "",
				selected: true,
				text: this.msg('all'),
			};

			ret.splice(1, 0, {
				type: 'option',
				value: 0,
				selected: true,
				text: '(Main)',
			});

			return $(this.ui({
				type: 'select',
				attr: {
					id: "mw-blocklookup-namespace",
				},
				children: ret,
			})).val(this.namespace)[0];
		},

		/**
		 * Function to create a link.
		 *
		 * @method		makeLink
		 * @class		BlockLookup
		 * @param {String} page - The page to link to, can be an external URL or wiki page.
		 * @param {String} [alt] - Alternate text to display
		 * @param {Object} [options={}] - The extra options for the link element, also reperents the link element attributes
		 * @param {Boolean} [options.condition=true] - Whether to show the link element
		 * @param {Boolean} [options.query] - The URL query
		 * @param {Boolean} [options.fragment] - The URL fragment
		 * @returns {Node} - The link element
		 */
		makeLink: function(page, alt, options) {
			page = page || this.wg.wgPageName;
			var origPage = page;
			options = options || {};

			var wiki, specials = {
				'^(m|meta):': 'meta.wikimedia.org',
				'^(mw):': 'mediawiki.org',
				'^(wp|wikipedia):': 'en.wikipedia.org',
				'^(w|wikia):(?!c|community)': 'community.fandom.com',
				'^(dev):': 'dev.fandom.com',
				'^(?:w|wikia):(?:c|community):([a-z]+)?\\.([a-z_\\-0-9A-Z]+):': function(match) {
					var community = match[2],
						lang = match[1];

					return "https://" + community + ".fandom.com" + lang ? '/' + lang : '';
				}
			};

			if ((/^(.+?):/).test(page)) {
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

			if (typeof(options.condition) === 'undefined') options.condition = true;

			return this.ui({
				type: 'a',
				text: this.string(alt || page),
				condition: options && options.condition,
				attr: $.extend(options || {}, {
					href: (wiki ? '//' + wiki : '') + (page.match(/:?\/{2}/) ? page : this.getLocalUrl(page)) + (options && options.query ? '?' + $.param(options.query) : '') + (options.fragment ? '#' + options.fragment : ""),
					title: origPage,
				}),
			}) || "";
		},

		/**
		 * Function to convert an element into a string.
		 *
		 * @method		makeLink
		 * @class		BlockLookup
		 * @param {*} value - The page to link to, can be an external URL or wiki page.
		 * @returns {String} - `value` converted to a string
		 */
		string: function(value) {
			if (Array.isArray(value)) {
				return value.join('');
			} else {
				return String(value);
			}
		},


		/**
		 * Function to get the parametrs of the current URL.
		 *
		 * @method		getUrlState
		 * @class		BlockLookup
		 * @returns {Object} - The url parameters found
		 */
		getUrlState: function() {
			var ret = {
					users: this.urlVars.users || this.urlVars.wpTarget || this.wg.wgPageName.split('/').slice(1).join('/') || '',
					limit: this.urlVars.limit || this.urlVars.loglimit || this.cachedInputs.limit || 15,
				},
				keys = {
					'nsInvert': false,
					'associated': false,
					'tagfilter': null,
					'wpSearchTitle': null,
					'wpSearchFilter': null,
					'namespace': null,
				};

			for (var i in keys) {
				if (keys.hasOwnProperty(i)) {
					var v = keys[i];
					ret[i] = this.urlVars[i] || this.cachedInputs[i] || (!this.isNullish(v) ? v : "");
				}
			}

			ret.users = ret.users.replace(/[\+_]/g, ' ');

			return ret;
		},

		/**
		 * Function to get the parametrs of a URL.
		 *
		 * @method		getUrlVars
		 * @class		BlockLookup
		 * @param {String} url - The url to search for
		 * @returns {Object} - The url parameters found
		 */
		getUrlVars: function(url) {
			url = url || window.location.href;

			var query = url.match(/\?([^#]*?)(?:#.*?)?$/),
				ret = {};

			if (!query || !query[1]) return null;

			function _evalParam(v) {
				if ("null undefined true false NaN Infinity".split(' ').includes(v)) {
					switch(v) {
						case("null"): return null;
						case("undefined"): return undefined;
						case("true"): return true;
						case("false"): return false;
						case("NaN"): return NaN;
						case("Infinity"): return Infinity;					
					}
				} else if (new RegExp('^\\d+$').test(v)) {
					return Number(v);
				} else {
					return v;
				}
			}

			query = query[1].split('&');
			query.forEach(function(v) {
				v = v.match(/^([^=]*?)\=(.*?)$/);

				if (!v) return;

				ret[v[1]] = _evalParam(v[2]);
			});

			return ret;
		},


		/**
		 * Function to get format the flags of blocks.
		 *
		 * @method		formatFlags
		 * @class		BlockLookup
		 * @param {String} v - The value to format
		 * @returns {String} - the formatted value of `v`
		 */
		formatFlags: function(v) {
			switch (v) {
				case ("autoBlockDisabled"): return 'Autoblock disabled';
				case ("anonOnly"): return 'Anonymous users only';
				case ("noCreate"): return "Account creation disabled";
				case ("noEmail"): return 'Email disabled';
				case ("wallDisabled"): return 'Cannot edit own talk page';
				default: return null;
			}
		},

		/**
		 * Function to test the type of the target provided.
		 *
		 * @method		testInput
		 * @class		BlockLookup
		 * @param {String} value - The value to test
		 * @returns {String} - the checks run on `value`
		 */
		testInput: function(value) {
			value = value.toString();

			var isId = value.match(/^\#?\d+$/gi),
				isIp = value ? mw.util.isIPAddress(value, true) : false;

			return {
				isIPv4: mw.util.isIPv4Address(value, true),
				isIPv6: mw.util.isIPv6Address(value, true),
				isId: isId,
				isIp: isIp,
				isUser: !isIp && !isId,
			};
		},

		/**
		 * Function to format a date.
		 *
		 * @method		formatDate
		 * @class		BlockLookup
		 * @param {String} value - The value to test
		 * @returns {String} - the checks run on `value`
		 */
		formatDate: function(timestamp, showCurrentTimeZone) {
			var dateOptions = {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
					hour12: true,
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				},
				dateFormatter = Intl.DateTimeFormat(this.wg.wgContentLanguage, dateOptions).format;

			timestamp = String(timestamp || new Date().toGMTString()).toLowerCase();

			return (['infinite', 'infinity', 'indefinite'].includes(timestamp)) 
				? 'Infinite'
				: dateFormatter(new Date(timestamp.toUpperCase())) + (showCurrentTimeZone ? ' ' + Date().match(/\((.+?)\)$/)[0] : "");
		},

		/**
		 * Function to parse wikitext.
		 *
		 * @method		parse
		 * @class		BlockLookup
		 * @param {String} wikitext - The value to parse
		 * @returns {Promise<String>} - the parsed value of `wikitext`
		 */
		parse: function(wikitext, parseOptions) {
			var defer = new $.Deferred();

			this.api
				.get({ 
					action: 'parse', 
					text: wikitext,
					disablelimitreport: true,
					prop: parseOptions 
						? Object.entries(parseOptions)
							.filter(function(d) { return d[1] })
							.map(function(d) { return d[0] })
							.join('|')
						: null,
				})
				.then(function(data) {
					defer.resolve(data.parse.text["*"]);
				})
				.catch(defer.reject);

			return defer;
		},

		/**
		 * Function to toggle the script's pending state.
		 *
		 * @method		togglePending
		 * @class		BlockLookup
		 * @param {Boolean} [state] - The pending state
		 * @returns {*} - the value of `state`
		 */
		togglePending: function(state) {
			var pending = this.nullishDefault(state, !this.pending);

			$('#mw-blocklookup-output').toggle(!pending);
			this.elements.progressBar.toggle(pending);
			this.toggleInputs(pending);

			this.pending = pending;

			return pending;
		},

		/**
		 * Function to toggle the script's input's disabled status.
		 *
		 * @method		toggleInputs
		 * @class		BlockLookup
		 * @param {Boolean} [state] - The disabled state
		 * @returns {*} - the value of `state`
		 */
		toggleInputs: function(state) {
			var toggled = this.nullishDefault(state, !this.toggled);
			this.$content.find('input:not(.mw-blocklookup__toggle-checkbox), select, checkbox, button').attr('disabled', toggled);
			this.toggled = toggled;

			if (toggled) $(this.inputSelectors['mw-blocklookup-submit']).text('Loading...');
			else $(this.inputSelectors['mw-blocklookup-submit']).text('Look up block information');

			return toggled;
		},

		/**
		 * Function to gather the script's inputs.
		 *
		 * @method		gatherInputs
		 * @class		BlockLookup
		 * @param {Boolean} [skipCache] - Wether to skip checking for cached inputs
		 * @returns {Object} - the inputs found
		 */
		gatherInputs: function(skipCache) {
			this.inputs = {};

			Object.entries(this.inputSelectors).forEach(function(d) {
				var k = d[0];
				var v = d[1];
				var value;

				if (this.elements[k]) {
					value = this.elements[k].getValue();
				} else if (this.cachedInputs[k] && !skipCache) {
					value = this.cachedInputs[k];	
				} else {
					var el = $(v);

					if (el.prop('type') === 'checkbox') {
						value = el.prop('checked');
					} else {
						value = el.val();
					}
				}

				this.inputs[k === 'mw-blocklookup-namespace' ? 'namespace' : k] = k === 'wpTarget' ? decodeURIComponent(value) : value;	
			}, this);

			return this.inputs;
		},

		/**
		 * Function to cache the script's inputs.
		 *
		 * @method		saveInputs
		 * @class		BlockLookup
		 * @emits		BlockLookup#input-change
		 * @returns {Object} - the inputs found
		 */
		saveInputs: function() {
			var inputs = this.gatherInputs(true);
			this.cachedInputs = inputs;

			this.hook['input-change'].fire(inputs);

			return mw.storage.set('dev-script-BlockLookup-inputsCache', JSON.stringify(inputs));
		},

		/**
		 * Function to create a checkbox.
		 *
		 * @method		makeCheckbox
		 * @class		BlockLookup
		 * @param {Object} d - The data for the checkbox/label combo
		 * @param {Object} d.label - The data for the checkbox label
		 * @param {Object} d.label.style - The CSS data for the label
		 * @param {Object} d.checkbox - The data for the checkbox
		 * @param {Object} d.checkbox.style - The CSS data for the checkbox
		 * @param {String} d.checkbox.name - The name for the checkbox
		 * @param {Boolean} d.checkbox.checked - Whether the checkbox is checked
		 * @returns {Node} - the checkbox
		 */
		makeCheckbox: function(d) {
			var text = d.label.text,
				o = {
					type: 'span',
					attr: {
						class: 'mw-blocklookup-checkbox',
					},
					children: [],
					style: {
						"white-space": "nowrap",
					},
				};

			if (d.id) o.attr.id = d.id;
			delete d.label.text;

			var elements = [{
				type: 'input',
				style: $.extend(d.checkbox.style || {}, {

				}),
				attr: $.extend(d.checkbox, {
					id: d.checkbox.name,
					name: d.checkbox.name,
					type: "checkbox",
					class: "mw-input",
					title: d.title || d.checkbox.title,
				}),
			}, {
				type: 'label',
				text: text,
				style: $.extend(d.label.style || {}, {

				}),
				attr: $.extend(d.label, {
					'for': d.checkbox.name,
					class: "mw-label",
					title: d.title || d.label.title,
				}),
			}];

			if (!d.checkbox.checked) delete elements[0].attr.checked;

			o.children.push.apply(o.children, elements);

			return this.ui(o);			
		},

		/**
		 * Function to convert an empty value to a boolean value.
		 *
		 * @method		emptyToBool
		 * @class		BlockLookup
		 * @param {*} value - The value to convert
		 * @returns {Boolean} - `value` converted to `Boolean`
		 */
		emptyToBool: function(v) {
			if (v === "") return true;
			else if (!v) return false;
		},

		/**
		 * Function to create a seperator.
		 *
		 * @method		createSep
		 * @class		BlockLookup
		 * @param {Number} type - The type of seperator to create
		 * @param {Boolean} [cond] - Whether to show the seperator
		 * @returns {Object} - seperator parameters to use with `BlockLookup.ui()`
		 */
		createSep: function(type, cond) {
			switch(type) {
				case(1): return {
					type: "b",
					html: " &bull; ",
					condition: this.nullishDefault(cond, true),
				};

				case(2): return {
					type: "span",
					text: " | ",
					condition: this.nullishDefault(cond, true),
				};

				case(3): return {
					type: "span",
					text: this.sep3,
					condition: this.nullishDefault(cond, true),
				};
				default: return "";
			}
		},

		/**#=====================================================================#
		 * Main functions
		 * --------------------------------
		 * These functions do the main work when running this script.
		 **#=====================================================================#
		 */

		 /**
		 * Initiates the main interface.
		 *
		 * @method		initInterface
		 * @class		BlockLookup
		 * @returns {Node} - The generated UI
		 */
		initInterface: function() {
			var o = {
				type: 'div',
				children: [{
					type: 'div',					
					attr: {
						id: "mw-blocklookup-toplinks",
					},
					children: [{
						type: 'b',
						text: 'Links: ',
					},
					this.makeLink("Special:RecentChanges", "Recent Changes", { target: "_blank" }),
					this.sep3, 
					this.makeLink("Special:Log/block", 'Block log', { target: "_blank" }),
					this.sep3, 
					this.makeLink("Special:AbuseLog", 'Abuse Log', { target: "_blank", }),
					this.sep3,
					this.makeLink("Special:BlockList", 'Block List', { target: "_blank" }), 
					{
						type: 'span',
						classes: ["mw-blocklookup-doc-link"],
						children: [
							this.makeLink('dev:BlockLookup', 'BlockLookup on dev wiki', {
								title: 'BlockLookup on dev wiki',
								target: '_blank',
							})
						],
					}],
				}, {
					type: 'form',
					children: [],
				}],
			};

			o.children[o.children.length-1].children.push(
				{
					type: "span",
					attr: {
						id: "mw-blocklookup-welcomemsg",
					},
					html: 'Use the form below to get information about a user\'s or IP adresses\'s block.\n\
You may enter an IP address, Username, or Block ID to begin. For IP\'s, IPv6 and CIDR ranges are allowed. For Block ID\'s, enter <code>#ID</code>.',
				},
				{
					type: 'fieldset',
					children: [
						{
							type: "legend",
							text: "Block Lookup",	
						},
						{
							text: 'IP address, username, or Block ID: ',
						}, 
						this.elements.wpTarget.$element[0],
						{ 
							type: 'br' 
						}, 
						'Log display limit: ', 
						{
							type: 'input',
							attr: {
								size: 20,
								type: "number",
								min: 1,
								value: this.limit,
								id: "limit",
								name: "limit",
							},
						}, 
						{ 
							type: 'br' 
						}, 
						'Contributions namespace: ',
						this.generateNamespaces(), 
						this.makeCheckbox({
							title: "Check this box to hide changes to pages within the selected namespace (and the associated namespace if checked)",
							checkbox: {
								checked: !!this.nsInvert,
								name: "nsInvert",
							},
							label: {
								text: "Exclude namespace",
							},
						}),
						this.makeCheckbox({
							title: "Check this box to also include the talk or subject namespace associated with the snamespace",
							checkbox: {
								name: "associated",
								checked: !!this.associated,
							},
							label: {
								text: "Associated namespace",
							}
						}),
						{ 
							type: 'br'
						}, 
						this.makeLink('Special:Tags', 'Tag'), 
						' filter: ', 
						{
							type: 'input',
							attr: {
								id: "tagfilter",
								name: "tagfilter",
								value: this.tagfilter,
							}
						}, 
						{ 
							type: 'br' 
						}, 
						'Abuse Log Page Title: ', 
						{
							type: 'input',
							attr: {
								id: "wpSearchTitle",
								name: "wpSearchTitle",
								value: this.wpSearchTitle,
							}
						}, 
						{ 
							type: 'br'
						}, 
						{ 
							condition: this.canBlock,
							text: 'Abuse Log Filter ID: ', 
						},
						{
							condition: this.canBlock,
							type: 'input',
							attr: {
								id: "wpSearchFilter",
								name: "wpSearchFilter",
								value: this.wpSearchFilter,
							},
						},
						{
							type: 'div',
							children: [{
								type: 'button', 
								text: 'Look up block information',
								attr: {
									id: "mw-blocklookup-submit",
									title: "[enter]",
									accesskey: "enter",
									tabindex: 0,
								},
								events: {
									click: this.onSubmit.bind(this),
								}
							}],
						},
					],
				},
				{
					type: 'div',
					text: "Enter a Username, IP address, or Block ID to begin.",
					attr: {
						id: "mw-blocklookup-output",
					},
				}
			);

			var ret = this.ui(o);
			this.elements.wpTarget.setValue(decodeURIComponent(this.users) || this.cachedInputs.wpTarget);

			this.$content.html(
				$(ret).find('#mw-blocklookup-output')
					.after(this.elements.progressBar.$element)
					.end()
			);
			this.addFocusListeners();
			this.addInputListeners();
			var val = this.elements.wpTarget.getValue();
			if (val !== "" && val !== this.cachedInputs.wpTarget) this.onSubmit();

			return ret;
		},

		 /**
		 * Initiates the interface on Special:BlockList.
		 *
		 * @method		initBlockList
		 * @class		BlockLookup
		 * @returns {Node} - The generated UI
		 */
		initBlockList: function() {
			return this.$content.find('div.mw-htmlform-ooui-wrapper').before(this.ui({
				type: "div",
				style: {
					'border': '2px solid #e9e9e9',
					'padding': '0 0.5em',
					'margin-bottom': '1em',
				},
				attr: {
					id: "mw-blocklist-toplinks",
				},
				children: [{
					type: "b",
					text: 'Tools: ',
				}, this.makeLink('Special:BlockLookup', 'Block lookup'), {
					type: 'hr', 
					id: "mw-blocklist-toplinks__seperator",
				}, {
					type: "b",
					text: "Links: ",
				}, this.makeLink("Special:RecentChanges", 'Recent Changes', {
						target: "_blank",
					}), 
					this.sep3,
					this.makeLink("Special:Log/block", 'Block log', {
						target: "_blank",
					}),
					this.sep3,
					this.makeLink("Special:AbuseLog", "Abuse Log", {
						target: "_blank",
					}),
				]
			}));
		},

		 /**
		 * Fetches block data for several cases.
		 *
		 * @method		getData
		 * @class		BlockLookup
		 * @param {String} type - The type of data to request
		 * @param {Object} params - The parameters to pass to the API
		 * @returns {Promise<Object, jQuery.fn.init>} - The requested data
		 */
		getData: function(type, params) {
			function readyHtml(html) {
				var $html = $(html);
				var globallyBlocked;

				if (type === 'contribs' && $html.find('#mw-content-text > .userprofile.mw-warning-with-logexcerpt').length) globallyBlocked = true;

				$html = $html.find('#mw-content-text > ul:first-of-type, #mw-content-text > form > ul:first-of-type');
				$html.find('input').remove();

				if (globallyBlocked) {
					$html.addClass('global-blocked');
				}

				return $html;
			}

			switch (type.toLowerCase()) {
				case('block'): 
					params.user = params.user.replace(/^User:/i, '');
					var test = this.testInput(params.user);

					params.user = params.user.match(/^#\d+$/gi) ? params.user.replace('#', '') : params.user;

					return this.api.get({
						action: 'query',
						list: 'blocks',
						bkprop: 'id|user|by|timestamp|expiry|reason|flags',
						bkids: test.isId && !test.isUser && !test.isIp ? params.user : undefined,
						bkusers: test.isUser ? params.user : undefined,
						bkip: test.isIp && !test.isId && !test.isUser ? params.user : undefined,
						bklimit: 1,
					});

				case('abuselog'): return $.get(mw.util.getUrl('Special:AbuseLog') + '?' + $.param({
					wpSearchUser: params.user,
					wpSearchTitle: params.wpSearchTitle,
					limit: params.limit,
					namespace: params.namespace,
				})).then(readyHtml);

				case('contribs'): return $.get(mw.util.getUrl('Special:Contributions/' + params.user) + '?' + $.param({
					limit: params.limit,
					namespace: params.namespace,
					nsInvert: Number(params.nsInvert),
					newOnly: Number(params.newOnly),
					associated: Number(params.associated),
					tagfilter: params.tagfilter,
				})).then(readyHtml);

				case('blocklog'): return $.get(mw.util.getUrl('Special:Log/block') + '?' + $.param({
					limit: params.limit,
					tagfilter: params.tagfilter,
					page: 'User:' + params.user,
				})).then(readyHtml);

				case('userdata'): return this.api.get({
					action: 'query',
					list: 'users',
					ususers: params.user,
					usprop: [
						'groups',
						'gender',
						'registration',
						'editcount'
					].join('|'),
				}).then(function(data) {
					return data.query.users[0];
				});

				default: return null;
			}
		},

		 /**
		 * Adds event listeners for input focuses.
		 *
		 * @method		addFocusListeners
		 * @class		BlockLookup
		 * @returns {Void}
		 */
		addFocusListeners: function() {
			this.$content.find('select, input, button').focus(function(e) {
				this.prevFocused = e.target;
			}.bind(this));
		},

		/**
		 * Adds event listeners for input changes.
		 *
		 * @method		addInputListeners
		 * @class		BlockLookup
		 * @returns {Void}
		 */
		addInputListeners: function() {
			this.$content.find('select, input').on('change', this.saveInputs);
			this.elements.wpTarget.on('change', this.saveInputs);
		},

		/**
		 * Adds event listeners for input changes.
		 *
		 * @method		addInputListeners
		 * @class		BlockLookup
		 * @emits		BlockLookup#result-reject
		 * @param {String} [message] - The rejection message.
		 * @returns {Void}
		 */
		reject: function(message) {
			message = message || 'The Username, IP address, or Block ID provided is not blocked.';

			this.togglePending();
			this.hook['result-reject'].fire(message);
			$('#mw-blocklookup-output').text(message);
		},

		/**
		 * Adds event listeners for the specified event.
		 *
		 * @method		on
		 * @class		BlockLookup
		 * @param {String} event - The event to listen to
		 * @param {Function} callback - The event callback
		 * @returns {Void}
		 */
		on: function(event, callback) {
			this.hook[event].add(function(data) {
				callback.call(this, {
					data: data,
					timestamp: Date.now(),
					type: event,
					inputs: this.inputs,
					pending: this.pending,
				});
			}.bind(this));

			return callback;
		},

		/**
		 * Prepares block data for rendering.
		 *
		 * @method		addInputListeners
		 * @class		BlockLookup
		 * @returns {Void}
		 */
		prepareData: function(data) {
			if (!data.query.blocks[0]) return null;

			var block = data.query.blocks[0];
			var test = this.testInput(block.user || block.id);

			var flags = {
				anonOnly: this.emptyToBool(block.anononly),
				noCreate: this.emptyToBool(block.nocreate),
				autoBlockDisabled: !this.emptyToBool(block.autoblock) && test.isUser,
				noEmail: this.emptyToBool(block.noemail),
				wallDisabled: !this.emptyToBool(block.allowusertalk),
			};

			var params = {
				blocker: block.by,
				expiry: block.expiry,
				id: block.id,
				reason: block.reason ? block.reason : 'No reason given',
				timestamp: block.timestamp,
				target: block.user,
				automatic: this.emptyToBool(block.automatic),
				inputTests: test,

				flags: [],
			};

			$.extend(params, flags);

			params.flags = Object.keys(flags).filter(function(v) {
				return params[v];
			}).map(this.formatFlags);

			return params;
		},

		/**
		 * Main event handler for when the submit button is pressed.
		 *
		 * @method		onSubmit
		 * @class		BlockLookup
		 * @param {EventTarget} [e] - The event object passed to the callback
		 * @callback
		 * @returns {Void}
		 */
		onSubmit: function(e) {
			if (e) e.preventDefault();

			this.log('Getting block data...');
			this.gatherInputs();			

			$('#mw-blocklookup-output').empty();
			this.togglePending();

			this.hook.submit.fire(this.inputs);
			this.hook['load-start'].fire();

			this.getData('block', {
				user: this.inputs.wpTarget,
				limit: this.inputs.limit,
			}).then(function(data) {
				this.debug(data);
				data = this.prepareData(data);

				if (!data) return this.reject();

				$.when(
					this.parse(data.reason, {
						text: 1,
						links: 1,
						iwlinks: 1,
					}),
					this.getData('blocklog', {
						user: data.target,
						limit: this.inputs.limit,
					}),
					this.getData('abuselog', {
						user: data.target,
						limit: this.inputs.limit,
						wpSearchTitle: this.inputs.wpSearchTitle
					}).catch(function() {
						if (!this.noAbuseLog) {
							this.warn('Special:AbuseLog does not exist on this wiki.');
							this.noAbuseLog = true;
						}
						return null;
					}.bind(this)),
					this.getData('contribs', {
						user: data.target,
						limit: this.inputs.limit,
						nsInvert: this.inputs.nsInvert,
						tagfilter: this.inputs.tagfilter,
						namespace: this.inputs.namespace,
					}),
					data.inputTests.isUser ? this.getData('userdata', {
						user: data.target,
					}) : null
				).then(function() {
					var arr = [data, false].concat(Array.from(arguments));
					$('#mw-blocklookup-output').html(this.loadData.apply(this, arr));

					this.togglePending();
					$(this.prevFocused).focus();
					this.hook['result-success'].fire(arr);
				}.bind(this)).catch(this.warn);

			}.bind(this)).catch(function(code, error) {
				this.warn.call(this, 'API Error in fetching lookup data:', error.error.info, '(' + code + ')');

				switch(code) {
					case('baduser_bkusers'): this.reject('Invalid lookup target provided: "' + this.inputs.wpTarget + '"'); break;
					case('http'): this.reject('An API error occured in fetching user data, please try again.'); break;
				}
			}.bind(this)).always(function() {
				this.hook['load-end'].fire();
			}.bind(this));
		},

		/**
		 * Renders the block data.
		 *
		 * @method		loadData
		 * @class		BlockLookup
		 * @param {Object} data - The block data
		 * @param {Boolean} [collapse] - Whether to collapse the rendered data
		 * @param {Node} blockReason - The block reason
		 * @param {Node} blockHtml - The block log HTML
		 * @param {Node} abuseLogHtml - The abuse log HTML
		 * @param {Node} contribsHtml - The contributions list HTML
		 * @param {Object} userData - The data of the blocked user
		 * @returns {Node} - The rendered data
		 */
		loadData: function(data, collapse, blockReason, blockHtml, abuseLogHtml, contribsHtml, userData) {
			var test = this.testInput(data.target || data.id);
			var id = Math.random().toString().replace(/^0\./gmi, '');

			this.debug.apply(this, arguments);

			return this.ui({
				type: 'fieldset',
				attr: {
					class: "mw-blocklookup-info__result",
				},
				children: [$('<input>', {
					class: "mw-blocklookup__toggle-checkbox",
					name: "collapse" + id,
					id: "collapse" + id,
					type: "checkbox",
					checked: collapse,
				})[0], {
					type: "legend",
					attr: {
						class: "mw-blocklookup__toggle-legend",
					},
					children: [{
						type: "label",
						attr: {
							'for': "collapse" + id,
							class: "mw-blocklookup__toggle-label",
						},
						children: [
							'Lookup Results for ', 
							test.isId ? "Block " : "",
							this.makeLink(
								test.isId 
									? "Special:BlockList" 
								: test.isIp
									? "Special:Contributions/" + data.target
								: 'User:' + data.target, 
								test.isId 
									? '#' + data.id 
									: data.target, { 
								class: "mw-blocklookup-info__blocker__user",
								query: test.isId ? {
									wpTarget: '#' + data.id,
								} : null,
							}), {
								type: 'span',
								classes: ["mw-contributions-usertools"],
								condition: test.isUser,
								children: [
									' (',
									this.makeLink('Message Wall:' + data.target, 'wall', { class: "mw-blocklookup-info__blocker__user" }),
									this.sep2,
									this.makeLink('Special:Contributions/' + data.target, 'contribs', { class: "mw-blocklookup-info__blocker__contribs" }),
									')',
								],
							}
						],
					}],
				}, {
					type: "span",
					attr: {
						class: "mw-blocklookup__toggle-content",	
					},
					children: [{
						type: 'h2', 
						text: "Block information", 
						attr: {
							class: "mw-blocklookup-info__header" 
						},
					}, {
						type: 'ul',
						attr: {
							class: "mw-blocklookup-result__list",
						},
						children: [{
							type: 'li',
							attr: {
								class: "mw-blocklookup-info__blocker",
							},
							children: [{
								type: 'b',
								text: 'Blocking Admin: ',
							}, this.makeLink('User:' + data.blocker, data.blocker, { class: "mw-blocklookup-info__blocker__user" }), {
								type: 'span',
								classes: ["mw-contributions-usertools"],
								children: [
									' (',
									this.makeLink('Message Wall:' + data.blocker, 'wall', { class: "mw-blocklookup-info__blocker__user" }),
									this.sep2,
									this.makeLink('Special:Contributions/' + data.blocker, 'contribs', { class: "mw-blocklookup-info__blocker__contribs" }),
									this.createSep(2, this.levels.canBlock),
									this.makeLink('Special:Block/' + data.blocker, 'block', { class: "mw-blocklookup-info__blocker__block", }),
									')',
								],
							}],
						}, {
							type: 'li',
							attr: {
								class: "mw-blocklookup-info__expiry",
							},
							children: [{
								type: 'b', 
								text: 'Block Expiry: ',
							}, this.formatDate(data.expiry, true)],
						}, {
							type: 'li',
							attr: {
								class: "mw-blocklookup-info__timestamp",
							},
							children: [{
								type: 'b', 
								text: 'Block Timestamp: ',
							}, this.formatDate(data.timestamp, true)],
						}, {
							type: 'li',
							attr: {
								class: "mw-blocklookup-info__blockid",
							},
							children: [{
								type: 'b', 
								text: 'Block ID: ',
							}, {
								type: 'big',
								text: '#' + data.id,
							}, ' (', 
							this.makeLink("Special:Unblock", "unblock", { 
								class: "mw-blocklookup__target__id-unblock",
								query: { 
									wpTarget: '#' + data.id
								},
								condition: this.levels.canBlock,
							}),
							this.createSep(1, this.levels.canBlock),
							this.makeLink("Special:BlockList", "view in block list", { 
								class: "mw-blocklookup__target__id-unblock",
								query: { 
									wpTarget: '#' + data.id
								} 
							}), ')', {
								type: "span",
								classes: ['mw-blocklookup-info__block-type'],
								html: " (Autoblock of a user\'s IP address)",
								condition: test.isId,
							}]
						}, {
							type: 'li',
							attr: {
								class: "mw-blocklookup-info__reason",
							},
							children: [{
								type: 'b', 
								text: 'Block Reason: ',
							}, {
								type: 'i', 
								html: blockReason,
							}],
						}, data.target !== undefined ? {
							type: 'li', 
							condition: data.target !== undefined,
							attr: {
								class: "mw-blocklookup-info__target",
							},
							children: [{
								type: 'b', 
								text: 'Block Target: ',
							}, this.makeLink((test.isIp ? 'Special:Contributions/' : 'User:') + data.target, data.target, { class: "mw-blocklookup__target__user" }), {
								type: 'span', 
								children: [
									' (',
									this.makeLink('Message_Wall:' + data.target, 'wall', { class: "mw-blocklookup__target__wall", condition: test.isUser }),
									this.createSep(1, test.isUser),
									this.makeLink('Special:Contribs/' + data.target, 'contribs', { 
										class: "mw-blocklookup__target__contribs",
										condition: !test.isIp,
									}),
									this.createSep(1, test.isUser),
									this.makeLink('Special:UserProfileActivity/' + data.target, 'posts', { 
										class: "mw-blocklookup__target__posts",
									}),
									this.createSep(1, this.levels.canDelete),
									this.makeLink('Special:DeletedContributions/' + data.target, 'del. contribs', {
										class: "mw-blocklookup-tools__local-links__del-contribs",
										condition: this.levels.canDelete,
									}),
									this.createSep(1),
									this.makeLink('Special:Log/block', 'block log', { 
										class: "mw-blocklookup-tools__local-links__block-log",
										query: {
											page: 'User:' + data.target,
										},
									}),
									this.createSep(1),
									this.makeLink('Special:Log/' + data.target, 'logs', { class: "mw-blocklookup-tools__local-links__logs" }),
									this.createSep(1, !test.isIp),
									this.makeLink('Special:Log/upload/' + data.target, 'uploads', { 
										class: "mw-blocklookup-tools__local-links__uploads",
										condition: !test.isIp,
									}),
									this.createSep(1),
									this.makeLink('Special:AbuseLog', 'abuse log', { 
										class: "mw-blocklookup-tools__local-links__abuse-log",
										title: 'Abuse Log for ' + data.target,
										query: {
											wpSearchUser: data.target,
										},
									}),
									this.createSep(1, this.levels.canBlock),
									this.makeLink('Special:Block/' + data.target, 'block', { 
										class: "mw-blocklookup-tools__local-links__block",
										condition: this.levels.canBlock,
									}),
									this.createSep(1, this.levels.canBlock),
									this.makeLink('Special:Unblock/' + data.target, 'unblock', { 
										class: "mw-blocklookup-tools__local-links__unblock",
										condition: this.levels.canBlock,
									}),
									this.createSep(1, this.levels.canDelete),
									this.makeLink('Special:BlankPage', 'nuke', { 
										class: "mw-blocklookup-tools__local-links__nuke",
										condition: this.levels.canDelete,
										query: {
											blankspecial: 'nuke',
											nukeuser: data.target,
											returnto: "Special:BlockLookup/" + encodeURI(data.target),
											returntoparams: encodeURI(location.search),
										},
									}),
									this.createSep(1, this.levels.canCheckUser),
									this.makeLink('Special:CheckUser', 'checkuser', { 
										class: "mw-blocklookup__target__checkuser",
										condition: this.levels.canCheckUser,
										query: {
											user: data.target,
										}
									}),
									')', {
										type: 'span',
										condition: test.isIP,
										html: " <small>(" +
											(test.isIPv6 ? "IPv6" : "IPv4") +
											(test.isIp ? ', CIDR range ' + data.target.match(/^(?:(?:\d{1,3}\.){3}\d{1,3}|(?:[0-9A-F]{0,4}:){1,7}[0-9A-F]{0,4})(\/\d{2})?$/i)[1] : "") 
											+ ")</small>",
									}],
								}],
							} : "", {
								type: 'li',
								attr: {
									class: 'mw-blocklookup-info__params',
								},
								children: [{
									type: 'b',
									text: 'Block Parameters:',
								}, ' ', data.flags.join(', ')],
							}, {
								type: "li",
								condition: !test.isId,
								attr: {
									class: "mw-blocklookup-info__global-blocked",
								},
								children: [{
									type: "b",
									text: "Globally Blocked: ",
								}, {
									type: "span",
									text: contribsHtml.hasClass('global-blocked') ? "Yes" : "No",
								}],
							}],
						}, {
							type: 'h3',
							text: "Tools, Actions, and Links",
							condition: !test.isId,
							attr: {
								class: "mw-blocklookup-tools__header",
							},
						}, {
							type: 'ul',
							condition: !test.isId,
							children: [ test.isIp ? {
								type: 'li',
								condition: test.isIp,
								attr: {
									class: "mw-blocklookup-tools__ip-tools",
								},
								children: [{
									type: "b",
									text: 'IP Tools: ',

								}, {
									children: [
										this.makeLink("https://cleantalk.org/blacklists/" + data.target, "Spam blacklist check", {
											class: "mw-blocklookup-tools__ip-tools__spam-blacklist",
										}), 
										this.createSep(1),
										this.makeLink("https://whois.toolforge.org/gateway.py", "Proxy check", {
											class: "mw-blocklookup-tools__ip-tools__proxy-check",
											query: {
												lookup: true,
												ip: data.target,
											},
										}),
										this.createSep(1),
										this.makeLink("https://iphub.info/", "Proxy check", {
											class: "mw-blocklookup-tools__ip-tools__proxy-check",
											query: {
												ip: data.target,
											},
										}),
										this.createSep(1),
										this.makeLink("https://www.xmyip.com/tor-ip-check/" + data.target, "TOR check", {
											class: "mw-blocklookup-tools__ip-tools__tor-check",
										}),
										this.createSep(1),
										this.makeLink('https://www.robtex.com/ip-lookup/' + data.target, "rDNS", {
											class: "mw-blocklookup-tools__ip-tools__rdns",
											fragment: "whois",
										}),
										this.createSep(1),
										this.makeLink("https://tools.keycdn.com/geo", "Geolocate", {
											class: "mw-blocklookup-tools__ip-tools__geolocate",
											query: {
												 host: data.target,
											},
										}), 
									],
								}],
							} : "", {
								type: 'li',
								condition: this.levels.hasGlobalRights,
								children: [{ 
									type: "b",
									text: 'Gobal Actions: ',
								}, {
									type: 'span',
									children: [
										this.makeLink('https://community.fandom.com/wiki/Special:Phalanx', "Global block", {
											class: "mw-blocklookup-tools__global-actions__gblock",
											query: {
												type: 8,
												target: data.target,
												wpPhalanxCheckBlocker: data.target,
											},
										}),
										this.createSep(1),
										this.makeLink('https://community.fandom.com/wiki/Special:MultiLookup', "Multi Lookup", {
											class: "mw-blocklookup-tools__global-actions__multi-lookup",
											query: {
												wptarget:  data.target,
											}
										}),
										this.createSep(1),
										this.makeLink('https://internal-soap.fandom.com/wiki/G', "Gladius", {
											class: "mw-blocklookup-tools__global-actions__gladius",
											query: {
												users: data.target,
												wiki: this.wg.wgServerName,
												useskin: 'oasis',
											}
										}),
										this.createSep(1),
										this.makeLink('https://internal-soap.fandom.com/wiki/GN', "Global Nuke", {
											class: "mw-blocklookup-tools__global-actions__gnuke",
											query: {
												user: data.target,
												useskin: 'oasis',
											},
										}),
										this.createSep(1),
										this.makeLink('https://internal-soap.fandom.com/wiki/' + (mw.util.isIPAddress(data.target, true) ? "LC" : "ML"), "LC or ML", {
											class: "mw-blocklookup-tools__global-actions__lc-ml",
											query: {
												 user: data.target,
												 useskin: 'oasis',
											},
										}),
									],
								}],
							}, {
								type: 'li', 
								attr: {
									class: "mw-blocklookup-tools__global-links",
								},
								children: [{
									text: 'Community Central Links: ',
									type: 'b',
								}, this.makeLink('w:' + (test.isIp ? 'Special:Contributions/' : 'User:') + data.target, data.target, {
									class: "mw-blocklookup-tools__global-links__cc-user",
								}), {
									type: 'span',
									children: [
										' (',
										this.makeLink('w:c:Message Wall:' + data.target, 'CC Wall', {
											class: "mw-blocklookup-tools__global-links__cc-wall",
											condition: test.isUser,
										}),
										this.createSep(1, test.isUser),
										this.makeLink('w:Special:Contribs/' + data.target, 'CC Contribs', {
											class: "mw-blocklookup-tools__global-links__cc-contribs",
										}), 
										this.createSep(1),
										this.makeLink('w:Special:Log/' + data.target, 'CC Logs', {
											class: "mw-blocklookup-tools__global-links__cc-logs",
										}),
										this.createSep(1),
										this.makeLink('w:Special:AbuseLog', 'CC Abuse Log', {
											title: 'Community central abuse log for ' + data.target,
											class: "mw-blocklookup-tools__global-links__cc-abuse-log",
											query: {
												wpSearchUser: data.target,
											},
										}),
										')',
									]
								}],
							}, test.isUser ? {
								type: "li",
								attr: {
									class: "mw-blocklookup-tools__user-info",
								},
								children: [{
									type: "b",
									text: "User Info: ",
								}, {
									type: "div",
									children: [{
										type: 'div',
										style: {
											margin: '7px',
										},
										condition: test.isUser,
										children: [{
											type: "div",
											children: [{
												type: "b",
												text: "ID: ",
											}, {
												type: "span",
												text: userData.userid.toString(),
												classes: ["mw-blocklookup__user-info-id", "mw-blocklookup__user-info__field"],
											}]
										}, {
											type: "div",
											children: [{
												type: "b",
												text: "Gender: ",
											}, {
												type: "span",
												text: userData.gender,
												classes: ["mw-blocklookup__user-info__gender", "mw-blocklookup__user-info__field"],
											}]
										}, {
											type: "div",
											children: [{
												type: "b",
												text: "Editcount: ",
											}, {
												type: "span",
												text: userData.editcount.toString(),
												classes: ["mw-blocklookup__user__info-editcount", "mw-blocklookup__user-info__field"],
											}]
										}, {
											type: "div",
											children: [{
												type: "b",
												text: "Groups: ",
											}, {
												type: "span",
												text: userData.groups.join(', '),
												classes: ["mw-blocklookup__user-info__groups", "mw-blocklookup__user-info__field"],
											}]
										}, {
											type: "div",
											children: [{
												type: "b",
												text: "Registration Date: ",
											}, {
												type: "span",
												text: Date(userData.registration),
												classes: ["mw-blocklookup__user-info__registration", "mw-blocklookup__user-info__field"],
											}]
										}],
									}],
								}]
							} : ""],
						}, {
							type: 'h3',
							text: "Block log",
							attr: {
								class: "mw-blocklookup-block-log__header",
							},
							condition: !test.isId,
						}, {
							type: 'div',
							attr: {
								class: "mw-blocklookup-block-log__container",
							},
							children: [blockHtml[0]],
							condition: !test.isId,
						}, {
							type: 'h3',
							condition: !this.noAbuseLog && !test.isId,
							text: "Abuse log",
							attr: {
								class: "mw-blocklookup-abuse-log__header",
							},
						}, !this.noAbuseLog ? {
							type: "div",
							attr: {
								class: "mw-blocklookup-abuse-log__container",	
							},
							children: [abuseLogHtml[0] || { type: "span", text: 'No abuse log found for this user.'}],
							condition: !test.isId,
						} : "", {
							type: "h3",
							text: "Recent User Contributions",
							attr: {
								class: "mw-blocklookup-contribs__header",
							},
							condition: !test.isId,
						},  {
							type: "div",
							attr: {
								class: "mw-blocklookup-contribs__container",
							},
							condition: !test.isId,
							children: [contribsHtml[0] || { type: "span", text: 'No changes were found matching these criteria.'}]
						}],
					}],
				});
		},
	}, window.BlockLookup);

	if (!BlockLookup.canRun()) return BlockLookup.log('User does not have necessary rights, exiting...');

	BlockLookup.hooks();
}());