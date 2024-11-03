/**
 * AjaxRename
 * 
 * Allows the user to quickly rename a page without having to load Special:MovePage.
 * Uses a modal to complete this.
 * 
 * @author			Thundercraft5 (https://dev.fandom.com/wiki/User:Thundercraft5)
 * @author			Cörey (https://community.fandom.com/wiki/User:Cörey)
 * @author			KockaAdmiralac (https://dev.fandom.com/wiki/User:KockaAdmiralac)
 * @version			0.5
 * @license			CC BY-SA 3.0
 * @creation October 8, 2014 Cörey
 * @update	June 16, 2017 KockaAdmiralac	
 *			Made the script work in Monobook, implemented i18n, made 
 *			it not get appended to every single dropdown in the whole document, 
 *			prevented double loading
 * @update November 4, 2020 Thundercraft5
 *			Total overhaul of the script using OOP from the ground up, implement better loader, 
 *			use a modal instead of a dropdown button,
 *			Make it activate on all links that have `Special:MovePage` in them, other script support (hooks),
 *			add some features
 * 
 * 
 * @configurations: {
		renameReasons: {
			<field>: {String|Object: {
				<field>: {String}
			} }
		},
		check: {
			leaveredirect: {Boolean},
			watch: {Boolean},
			movetalk: {Boolean},
			movesubpages: {Boolean},
			deletetargets: {Boolean},
			ignorewarnings: {Boolean},
		},
		lang: {String},
		doKeybind: {Boolean},
	}
 */

mw.loader.using('mediawiki.api').then(function() {
	"use strict";
	if (window.AjaxRename && window.AjaxRename.loaded) return window.AjaxRename.logMessage({ type: 'warn', message: 'Script double loaded, exiting...' });

	/**
	 * Main Script Class
	 * 
	 * @class			AjaxRename
	 * @init			hooks()
	 * @loadcondition	canRun()
	 */
	window.AjaxRename = $.extend({
		// Variable for double load protection
		loaded: true,

		/**#====================================================================#
		 * Default configuration options
		 * --------------------------------
		 * These fields contain any default configuration variables.
		 **#=====================================================================#
		 */
		renameReasons: null,
		doKeybind: true,
		check: {},

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
		namespaces: mw.config.get('wgFormattedNamespaces'),
		csrfToken: mw.user.tokens.values.csrfToken,
		version: 0.5,
		hooksCount: 0,
		currentModal: null,
		lang: null,
		$modalContent: '#AjaxRenameModal > section',
		$modal: '#AjaxRenameModal',
		$modalTitle: '#AjaxRenameModal > header > h3',

		/**
		 * Data object for Hooks fired by this script
		 * 
		 * @data		Hooks for this script
		 * @field	   hook
		 * @used		generateModalForm()
		 */
		hook: Object.freeze({
			loaded: mw.hook('dev.ajaxrename.loaded'),
			modalLoading: mw.hook('dev.ajaxrename.modal.loading'),
			modalLoaded: mw.hook('dev.ajaxrename.modal.loaded'),
			modalClosed: mw.hook('dev.ajaxrename.modal.closed'),
			modalCancelled: mw.hook('dev.ajaxrename.modal.cancelled'),
		}),

		/**
		 * Data object for Checkbox conversions from element ids to internal ids
		 * The documentation label `@requirement` repersents
		 * the user rights requirement to use the option.
		 * 
		 * @field	   checkboxList
		 * @data		Element ID, internal id
		 * @used		onDocumentClick()
		 */
		checkboxList: Object.freeze({
			'SuppressRedirect': 'option-suppress-redirect',
			'MoveSubpages': 'option-move-subpages',
			'MoveTalk': 'option-move-talk',
			'DeleteTargets': 'option-delete-targets',
			'Watch': 'option-watch',
			'IgnoreWarnings': 'option-ignore-warnings',
		}),

		/**
		 * Data object for Checkbox Data
		 * 
		 * @field	   checkboxConversions
		 * @data		Alternate configuration parameter, Default checked, user rights requirement, actual configuration field
		 * @used		getCheckConfigValue()
		 */
		checkboxConversions: Object.freeze({
			/**
			 * Suppress redirect option data object
			 * 
			 * @parent		  checkboxConversions
			 * @field		   suppress-redirect
			 * @configfield	 leaveredirect
			 * @requirement	 Suppress redirects
			 */ 
			'suppress-redirect': Object.freeze({
				alt: 'leaveredirect',
				value: 'leaveRedirect',
				'default': true,
				requirement: 'move',
			}),

			/**
			 * Watch source/target page option data object
			 * 
			 * @parent		   checkboxConversions
			 * @field			watch
			 * @configfield	  watch
			 * @requirement	  Rename Pages
			 */ 
			'watch': Object.freeze({
				alt: 'watch',
				value: 'watch',
				'default': true,
				requirement: 'move',
			}),

			/**
			 * Move talk page option data object
			 * 
			 * @parent		   checkboxConversions
			 * @field			move-talk
			 * @configfield	  movetalk   
			 * @requirement	  Rename Pages
			 */ 
			'move-talk': Object.freeze({
				alt: 'movetalk',
				value: 'talk',
				'default': false,
				requirement: 'move',
			}),

			/**
			 * Rename Subpages option data object
			 * 
			 * @parent		   checkboxConversions
			 * @field			move-subpages
			 * @configfield	  movesubpages
			 * @requirement	  Rename Pages && Move Subpaes
			 */
			'move-subpages': Object.freeze({
				alt: 'movesubpages',
				value: 'subpages',
				'default': false,
				requirement: 'move',
			}),

			/**
			 * Delete targets option data object
			 * 
			 * @parent		   checkboxConversions
			 * @field			delete-targets
			 * @configfield	  deletetargets
			 * @requirement	  Delete pages
			 */
			'delete-targets': Object.freeze({
				alt: 'deletetargets',
				value: 'deleteTargets',
				'default': false,
				requirement: 'delete',
			}),

			/**
			 * Ignore warnings option data object
			 * 
			 * @parent		   checkboxConversions
			 * @field			ignore-warnings
			 * @configfield	  ignorewarnings
			 * @requirement	  Rename pages
			 */
			'ignore-warnings': Object.freeze({
				alt: "ignorewarnings",
				value: 'ignore',
				'default': false,
				requirement: 'move',
			}),
		}),

		/**
		 * Data object for All external dependancies/waitfor's data
		 *
		 * @field	   imports
		 * @data		All external dependancies/waitfor's data
		 * @used		import()
		 */
		imports: Object.freeze({
			scripts: Object.freeze([
				'u:dev:MediaWiki:UI-js/code.js',
				'u:dev:MediaWiki:I18n-js/code.js',
			]),
			style: Object.freeze([
				'u:dev:MediaWiki:AjaxRename.css',
			]),
			hooks: Object.freeze([
				'dev.i18n',
				'dev.qdmodal',
				'dev.ui',
			]),
			await: [
				'mediawiki.api',
				'mediawiki.util',
			],
			otherOnloadPromises: [
				$.ajax({
					cache: true,
					dataType: "script",
					url: "https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:QDmodal.js"
				}),
			],
		}),

		/**
		 * User rights level object.
		 * Stores data about the necessary rights to preform an action.
		 *
		 * @field	   rights
		 * @parent	  AjaxRename
		 * @used		getRights()
		 */
		rights: Object.freeze({
			"global": Object.freeze([
				'staff',
				'global-discussions-moderator',
				'wiki-specialist',				
				'soap',	
			]),

			"checkuser": Object.freeze([
				'soap',
				'staff',
				'global-discussions-moderator',				
				'wiki-specialist',
				'checkuser',
				'util',
			]),

			"block": Object.freeze([
				'sysop',
				'staff',
				'bureaucrat',
				'global-discussions-moderator',
				'wiki-specialist',				
				'soap',
			]),

			"delete": Object.freeze([
				'content-moderator',
				'sysop',
				'soap',
				'staff',
				'wiki-specialist',
				'global-edit-reviewer',
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
		 * @method	   hooks
		 * @class		AjaxRename
		 */
		hooks: function() {
			this.imports.hooks.forEach(function(v) {
				mw.hook(v).add(this.onHook.bind(this, v));
			}.bind(this));
			this['import']();
		},

		/**
		 * Function for when a hook is loaded.
		 * This is function is called 3 times. When the hooks count reach 3, it adds the click event handlers.
		 *
		 * @method	   onHook
		 * @class		AjaxRename
		 */
		onHook: function(value, arg) {
			// Increment Hook count
			++this.hooksCount;

			// Switch hook value
			switch (value) {
				case("dev.i18n"): 
					this.i18n = arg;
					break;

				case('dev.qdmodal'):
					this.Modal = mw.libs.QDmodal;
					break;

				case('dev.ui'): 
					this.ui = arg;
					break;
			}

			// When hooks count reach 3, load the script
			if (this.hooksCount === 3) {
				this.i18n.loadMessages('AjaxRename', { language: this.lang })
					.then(this.init.bind(this))
					.catch(function(e) {
						console.warn(e);		
					});
			} else return;
		},

		loadSpecialPageAliases: function() {
			return this.api.get({
				action: 'query',
				meta: 'siteinfo',
				siprop: 'specialpagealiases',
			});
		},

		/**
		 * Dependancy importer.
		 * This method imports any external scripts used by this one.
		 * 
		 * @method		import
		 * @class		AjaxRename
		 */
		'import': function() {
			mw.loader.using('mediawiki.api').always(function() {
				this.logMessage({ message: 'importing...' });

				this.api = new mw.Api();
				Object.freeze(this.imports.await);

				this.loadSpecialPageAliases().always(function(res) {
					this.parseSpecialPageAliases(res);

					// Add necessary imports ontop of other promises
					this.imports.otherOnloadPromises.push(
						mw.loader.using(this.imports.await),
						importArticles({
							type: "script",
							articles: this.imports.scripts,
						}),
						importArticles({
							type: "style",
							articles: this.imports.style,	
						})
					);

				}.bind(this));
			}.bind(this)).catch(function(e) {
				console.warn(e);
			});
		},

		/**
		 * Actual script initializer.
		 * This function sets up the event handlers on the page 
		 * and sets the variables that cannot be loaded beforehand.
		 *
		 * @method	   init
		 * @class		AjaxRename
		 */
		init: function(i18n) {
			// Set variables
			this.i18n = i18n;
			this.wg.wgArticlePath = this.wg.wgArticlePath.replace('$1', ''),
			this.getParamValue = mw.util.getParamValue;

			Object.freeze(this.wg);
			this.logMessage({ message: 'Ready' });

			// Fire any hooks attached to this script
			this.hook.loaded.fire();
			this.i18n.useUserLang();

			// Add event handlers
			$(document).on('click', 'a[href]', this.onDocumentClick.bind(this));
			this.addKeydownEvents();
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
		 * @method				   getRights
		 * @class					AjaxRename
		 * @returns	{Array}	   An Array of user groups for the requested action
		 * @param {String} action	The action to request
		 */
		getRights: function(action) {
			action = action.toLowerCase();

			switch(action.toLowerCase()) {
				case("global"): return this.rights[action];
				case("checkuser"): return this.rights[action];
				case("block"): return this.rights[action];
				case("protect"):
				case("delete"):	return this.rights["delete"];
				case("move"): return this.rights[action];
			}
		},

		/**
		 * User groups rights checker function.
		 * Checks if the user has the groups for the requested level.
		 *
		 * @method				  hasRights
		 * @returns {Boolean}	   Whether the user has the requested rights
		 * @param {String} level	The action to request
		 */
		hasRights: function(level) {
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
		 * Function to check whether the script can run.
		 * Used outside the class.
		 * 
		 * @method	   canRun
		 * @class		AjaxRename
		 */
		canRun: function() {
			return this.hasRights("move");
		},

		parseSpecialPageAliases: function(d) {
			var data = d.query.specialpagealiases.filter(function(page) {
					return page.realname === "Movepage";
				})[0],
				specialpages = [data.realname].concat(data.aliases);			 

			this.specialPageAliases = specialpages;
			return specialpages;
		},

		/**
		 * Function to delete a page.
		 *
		 * @method				   deletePage
		 * @class					AjaxRename
		 * @param {Object} data	  The data for the function
		 * @returns {Promise}		Promise with a data value of the response of the API
		 */
		deletePage: function(data, cb, cbCond) {
			return this.apiPost({
				action: 'delete',
				reason: data.reason,
				title: data.title,
			});
		},

		/**
		 * Function to rename a page.
		 * 
		 * @method				  movePage
		 * @class				   AjaxRename
		 * @param {Object} data	 The data for the function
		 * @returns {Promise}	   Promise with a data value of the response of the API
		 */
		movePage: function(data, cb, cbCond) {
			return this.apiPost({
				action: 'move',
				reason: data.reason,
				from: data.from,
				to: data.to,
				movetalk: data.movetalk,
				movesubpages: data.movesubpages,
				noredirect: data.noredirect,
				watchlist: this.isNullish(data.watchlist, 'nochange')
			});
		},

		/**
		 * Function to shorten the syntax for a API request.
		 *
		 * @method				  apiPost
		 * @class				   AjaxRename
		 * @returns {Promise}	   A promise with the API's reponse
		 * @param {Object} data	 The api parameters to pass to the API function
		 */
		apiPost: function(data) {
			var defaultParams = {
				watchlist: 'preferences',
				token: mw.user.tokens.values.csrfToken,
				bot: true,
				title: data.title || ((data.action === 'delete') ? this.wg.wgPageName : undefined),
			};

			var params = $.extend(data, defaultParams);

			return this.api.post(params);
		},

		/**
		 * Function to log the response of an API request.
		 * 
		 * @method				  logPromiseResponse
		 * @class				   AjaxRename
		 * @returns {String}		The API's response message
		 * @param {Object} data	 The response data to pass to the function
		 */
		logPromiseResponse: function(data) {
			var success = data.success,
				fail = data.fail;

			fail.notification = fail.notification || {};
			success.notification = success.notification || {};

			if (typeof(data.res) === "object") {
				return this.logMessage({ 
					type: success.type || 'success', 
					message: success.message.replace(/"\[+|\]+"/g, ''),
					showNotification: success.showNotification,
				});
			} else {
				return this.logMessage({
					type: fail.type || 'warn', 
					message: fail.message.replace(/"\[+|\]+"/g, ''),
					showNotification: fail.showNotification,
				});
			}
		},

		/**
		 * Function to log a message with the script's name.
		 * 
		 * @method				  logMessage
		 * @class				   AjaxRename
		 * @returns {String}		The message passed to the function
		 * @param {Object} data	 The data to pass to the function
		 */
		logMessage: function(data){
			var funcKeys = {
					'notify': console.log,
					'confirm': console.log,
					'success': console.log,
					'warn': console.warn,
					'error': console.error,

					// Defualt
					undefined: console.log,
				},
				logKeys = {
					'notify': 'LOG',
					'confirm': 'LOG',
					'success': 'LOG',
					'warn': 'WARN',
					'error': 'ERROR',

					// Defualt
					undefined: 'LOG',
				};

			data.type = (data.type || 'success').toLowerCase();
			data.message = Array.isArray(data.message) ? data.message : [ data.message ];

			data.message.unshift('[AjaxRename: v' + this.version + '] [' + logKeys[data.type] + ']:');

			funcKeys[data.type].apply(window.console, data.message);

			var notificationMessage = Array.from(data.message);
			notificationMessage.shift();
			notificationMessage = notificationMessage.join(' ');

			data.message = data.message.join(' ');

			if (data.showNotification) {
				mw.notify(notificationMessage, { type: data.type });
			}

			return data.message;
		},

		/**
		 * Function to load an `i18-js` messsage.
		 * 
		 * @method			  msg
		 * @class			   AjaxRename
		 * @param {String} 1	the message code
		 * @arguments {*}	   The arguments to the message
		 * @return {String}	 The message's contents
		 */
		msg: function() {
			return this.i18n.msg.apply(null, arguments).plain();	
		},

		/**
		 * Function to get the page to rename/move to from the url.
		 * 
		 * @method						getPage
		 * @class						AjaxRename
		 * @param {String} url			The url to search for the page on
		 * @param {'from'|'to'} type	The type of search to preform
		 * @returns {String}			The page from the searched url
		 */
		getPage: function(url, type) {
			type = type || 'from';

			if (!this.isValidLink(url)) return;

			if (type.toLowerCase() === 'from') {
				return this.getParamValue('wpOldTitle', url) || (url.match(/\/wiki\/.+?\/([^\n\?]+)/) || [])[1];
			} else if (type.toLowerCase() === 'to') {
				return this.getParamValue('wpNewTitle', url);
			}
		},

		isValidLink: function(url) {
			var isMoveable = this.specialPageAliases.some(function(alias) {
				return new RegExp(alias, 'i').test(decodeURI(url));
			});

			return isMoveable;
		},


		/**
		 * Function to get a boolean url parameter. This works as the same as `findUrlParam` but it
		 * converts the return value to a boolean value.
		 *
		 * @method			   getBooleanUrlParam
		 * @class				AjaxRename
		 * @param {String} url   The url to search on
		 * @param {*} param	  The parameter to search for
		 * @returns {Boolean}	Search parameter value converted to a boolean value
		 */
		getBooleanUrlParam: function(url, param) {
			return Boolean(this.findUrlParam(url, param));
		},

		/**
		 * Function to get data on a checkbox.
		 * This can be it's default value, rights requirement, alias, or its config value.
		 * It returns by default the config value.
		 *
		 * @method				  getCheckConfigValue
		 * @class				   AjaxRename
		 * @param {String} name	 The checkbox ID
		 * @param {type} [type]	 The type of data to get
		 */
		getCheckConfigValue: function(name, type) {
			var checkboxData = this.modalOptions.check,
				conversions = this.checkboxConversions,
				name = name.toLowerCase().replace('option-', ''),
				data = conversions[name],
				alt = data.alt,
				configVal = data.value,
				defaultRet = this.nullishDefault(this.check[configVal] || this.check[alt], data['default']);

			if (!this.isNullish(type)) {
				return data[type];
			} else {
				return defaultRet !== undefined ? defaultRet : false;
			}
		},

		/**
		 * Function to get the states of all checkboxes.
		 * 
		 * @method		   getCheckboxStates
		 * @class			AjaxRename
		 * @return {Object}  The States of all checkboxes
		 */
		getCheckboxStates: function() {
			var result = {};

			Object.keys(this.checkboxList).forEach(function(id) {
				var name = this.checkboxList[id],
					name = name.toLowerCase().replace('option-', '');

				result[name] = $('#AjaxRename-Checkbox-' + id).prop('checked');
			}.bind(this));

			return result;
		},

		/**
		 * Function to get the url params from the clicked link.
		 * 
		 * @method			  getUrlParams
		 * @class			   AjaxRename
		 * @param {String} url  The url search on
		 * @returns {Object}	The found url parameters
		 */
		getUrlParams: function(url) {
			var booleanKeys = {
					'move-talk': 'wpMovetalk',
					'move-subpages': 'wpMovesubpages',
					'suppress-redirect': 'wpLeaveRedirect',
					'delete-targets': 'wpDeleteTargets',
					'watch': 'wpWatch',
					'ignore-warnings': 'wpIgnore',
				},
				ret = {};

			ret.check = {};

			Object.keys(booleanKeys).forEach(function(k) {
				var v = booleanKeys[k],
					urlParam = this.getParamValue(v, url);

				ret.check[k] = !this.isNullish(urlParam) ? Boolean(Number(urlParam)) : urlParam;
			}.bind(this));

			ret.reason = this.getParamValue('wpReason', url);
			return ret;
		},

		/**
		 * Function to get the rename reason.
		 * 
		 * @method			  getInputReason
		 * @class			   AjaxRename
		 * @returns {String}	The rename reason
		 */
		getInputReason: function() {
			var dropdownValue = $('#AjaxRename-InputFieldOptions-RenameReasons').val(),
				otherValue = $('#AjaxRename-InputFieldOther-OtherRenameReason').val(),
				ret = 
					dropdownValue
						? dropdownValue + (otherValue ? ': ' + otherValue : '')
						: otherValue;

			this.renameReason = ret;
			return ret;
		},

		/**
		 * Function to generate a checkbox and label set.
		 * 
		 * @method				  generateCheckbox
		 * @class				   AjaxRename
		 * @param {Object} data	 The data for the function
		 * @returns {Object}		An object to parse for `UI-js`
		 */
		generateCheckbox: function(data) {
			var name = 'AjaxRename-Checkbox-' + data.id,
				ret = {
					type: 'div',
					attr: {
						id: name + '-Wrapper',
					},
					condition: data.requirement,
					children: [{
						type: 'input',
						attr: {
							type: "checkbox",
							name: name,
							id: name,
							checked: data.checked ? data.checked : undefined,
						},
					}, {
						type: "label",
						text: this.msg(data.label),
						attr: {
							id: name + '-Label',
							'for': name,
							'class': 'AjaxRename-CheckboxLabel',
						},
					}],
				};

			if (!data.checked) delete ret.children[0].attr.checked;
			return ret;
		},

		/**
		 * Function to check if a value is nullish as this software 
		 * does not support the `??` operator.
		 *
		 * @method				isNullish
		 * @class				AjaxRename
		 * @param {*} v		 The value to check 
		 * @returns {Boolean}	Whether not the value is nullish
		 */
		isNullish: function(v) {
			return v === null || v === undefined;
		},

		/**
		 * Function to set up a nullish default as this software 
		 * does not support the `??` operator.
		 * 
		 * @method			   nullishDefault
		 * @class				AjaxRename
		 * @param {*} v		  The value to check and return if it is not nullish
		 * @param {*} $default   The value to return if `v` is nullish
		 * @returns {*}		 `v` if it is not nullish and `$default` if it is
		 */
		nullishDefault: function(v, $default) {
			return this.isNullish(v) ? $default : v;	
		},

		/**
		 * Function to build a dropdown with options.
		 *
		 * @method				   buildOptionsDropdown
		 * @class					AjaxRename
		 * @param {Object} data	  The data for the function
		 * @returns {null|Object}	A `<select>` object for `UI-js` to parse, null if `data` is undefined
		 */
		buildOptionsDropdown: function(data) {
			if (!data) return null;

			var arr = [],
				objData = Object.entries(data);

			for (var i1 in objData) {
				var entries = objData[i1],
					key = entries[0],
					value = entries[1],
					subObjData = Object.entries(value);

				if (typeof(value) === "object") {
					var tmpObj = {
						type: "optgroup",
						children: [],
						attr: {
							label: key,
						},
					};

					for (var i2 in subObjData) {
						var entrs = subObjData[i2],
							k = entrs[0],
							v = entrs[1];

						tmpObj.children.push({
							type: "option",
							text: k,
							attr: {
								value: v,
							}
						});
					}

					arr.push(tmpObj);
				} else {
					arr.push({
						type: "option",
						text: key,
						attr: {
							value: value,
						},
					});
				}
			}

			arr.unshift({
				type: 'option',
				value: '',
				text: 'Other',	
			});

			return arr;
		},

		/**
		 * Function to add button(s) to the modal.
		 * 
		 * @method			   addButton
		 * @class				AjaxRename
		 * @arguments {Object}   The button objects to add to the modal
		 */
		addButton: function() {
			function _addButton(data) {
				var $obj = {
					'class': "qdmodal-button",
					html: data.text,
					click: data.click,
				};

				$obj = $.extend($obj, data.attrs);

				$('#AjaxRenameModal > footer').append($('<span>', $obj));
			}

			if (arguments.length > 1) {
				Array.prototype.forEach.call(arguments, function(v) {
					_addButton(v);
				});
			} else {
				_addButton(arguments[0]);
			}
		},

		/**#=====================================================================#
		 * Main functions
		 * --------------------------------
		 * These functions do the main work when running this script.
		 **#=====================================================================#
		 */

		/**
		 * Function to generate the modal HTML.
		 * 
		 * @method				   generateModalForm
		 * @class					AjaxRename
		 * @param {Object} data	  The UI data to pass to the function
		 * @returns {Object}		 The UI object to be parsed by `UI-js`
		 */
		generateModalForm: function(data) {
			var arr = [];

			function _generateHeader(data) {
				return {
					type: 'div',
					style: {
						'margin-bottom': '1.3em', 
						'margin-top': '0.5em',
						'border-bottom': '1.5px solid lightgray',
					},
					text: data.text,
				};
			}

			Object.keys(this.checkboxList).forEach(function(k, i) {
				var v = this.checkboxList[k],
					getCheckData = this.getCheckConfigValue.bind(this),
					checked = !this.isNullish(data.check[v.replace('options-', '')]) ? data.check[v.replace('options-', '')] : getCheckData(v),
					subpageExists;

				if (i === 1 || i === 2) {
					subpageExists = 
						i === 1 
							? !!data.subpages
							: !!data.talkSubpages;

				} else {
					subpageExists = true;
				}

				arr.push(this.generateCheckbox({
					id: k,
					label: v,
					checked: checked,
					requirement: this.hasRights(getCheckData(v, 'requirement') || 'move') && subpageExists,
				}));

				if (i === 3) {
					arr.push(_generateHeader({
						text: this.msg('extra-options'),
					}));					
				}
			}.bind(this));

			arr.unshift(_generateHeader({
				text: this.msg('rename-options'),
			}));

			var modalForm = this.ui({
				type: "div",
				children: [{
					type: 'p',
					html: this.i18n.msg('modal-text', data.from, this.msg('option-suppress-redirect')).parse(),
				}, { 
					type: 'div',
					html: data.warning,
					condition: data.warning,
					classes: [ "mw-warning-with-logexcerpt" ],
				}, {
					type: "div",
					html: this.i18n.msg('file-warning', data.from).parse(),
					classes: [ "mw-warning-with-logexcerpt" ],
					condition: this.wg.wgNamespaceNumber === 6,
				}, {
					type: "fieldset",
					style: {
						"margin": "none !important",
					},
					children: [{
						type: 'legend',
						children: [ this.msg('modal-title', data.from) ]
					}, {
						type: 'form',
						attr: {
							method: '',
							name: '',
						},
						classes: ['WikiaForm'],
						children: [
							{
								type: 'span',
								attr: {
									id: "AjaxRename-Inputs"
								},
								children: [
									this.generateInputField({
										fieldLabel: this.msg('input-new-title'),
										otherInput: {
											id: "NewTitle",
											value: data.to,
										},
										optionsDropdown: {},
									}),
									this.generateInputField({
										fieldLabel: this.msg('reason-prompt'),
										optionsDropdown: {
											id: "RenameReasons",
											select: this.renameReasons,
										},
										otherInput: {
											id: "OtherRenameReason",
											value: data.reason,
										}
									}),
								],
							},
							{
								type: 'div'	,
								children: arr,
							},
							{
								type: 'div',
								id: 'AjaxRenameExtraPages',
								html: data.logHtml,
							}
						],
					}],
				}],
			});

			this.modalForm = modalForm;
			return modalForm;
		},

		/**
		 * Function to generate the reasons input field.
		 *
		 * @method				  generateInputField
		 * @class				   AjaxRename
		 * @param {Object} data	 The data object to pass to the function
		 * @returns {Object}		The object repersenting the input field HTML to be parsed by `UI-js`
		 */
		generateInputField: function(data) {
			var ret = {
				type: "div",
				children: [
					{
						type: 'span',
						html: data.fieldLabel + ':&nbsp;',
					},
					{
						type: 'select',
						attr: {
							id: 'AjaxRename-InputFieldOptions-' + data.optionsDropdown.id,
						},
						children: this.buildOptionsDropdown(data.optionsDropdown.select) || [],
						condition: !!data.optionsDropdown.select,
					},
					{
						type: data.optionsDropdown.select ? 'div' : 'span',
						children: [{
							type: "input",
							attr: {
								id: 'AjaxRename-InputFieldOther-' + data.otherInput.id,
								value: data.otherInput.value,
							},
						}],
					},
				],
			};

			if (this.isNullish((data.otherInput || {}).value)) delete ret.children[2].children[0].attr.value;
			return ret;
		},

		/**
		 * Function to AJAX GET request the move data for the page.
		 *
		 * @method				  requestMoveData
		 * @class				   AjaxRename
		 * @param {String} page	 The page to request the move data on
		 * @return {Promise}		The page response with the value of the move data object
		 */
		requestMoveData: function(page) {
			return $
				.get(this.wg.wgArticlePath + 'Special:MovePage/' + (page || this.wg.wgPageName))
				.then(function(res) {
					var $document = $(res),
						$content = $document.find('#mw-content-text'),
						data = {};

					if (!$document.find('#mw-returnto').length) { 

					var $sel = $document.find('.movepage-wrapper')
								.first()
								.nextUntil(),
						$htmlText = function() {
							var arr = ['<div>'];

							$sel.each(function() {
								arr.push($(this).prop('outerHTML'));
							});

							arr.push('</div>'); 
							return arr.join('');
						}(),
						$html = $($htmlText),
						noLog = !!$html.find('.mw-warning-logempty').length;

					function _findSubpages(num, arr) {

						$html.find('ul:nth-of-type(' + num + ') > li > a').each(function(a, b, c) {
							arr.push($(this).html());	
						});

						return $html.find('ul:nth-of-type(' + num + ')').length ? arr : null;
					}

					var subpages = _findSubpages(noLog ? 1 : 2, []),
						talkSubpages = _findSubpages(noLog && subpages ? 2 : !subpages && noLog ? 1 : 3, []),
						$warning = $content.find('[class^="mw-warning"]').first();

					var ret = {
						warning: $warning.html(),
						content: $htmlText,
						subpages: subpages,
						talkSubpages: talkSubpages, 
					};

					this.moveData = ret;
					return ret;

					} else {
						return false;
					}
				}.bind(this))
				.catch(function(e) {
					console.warn(e);	
				});
		},

		/**
		 * Main function to show the modal. This function is bound to `onDocumentClick` and a keydown handler to `document`.
		 * It may also be used externally.
		 * 
		 * @method				  showModal
		 * @class				   AjaxRename
		 * @param {Object} options  The options for the modal
		 * @return {Object}		 The object repersenting the current modal instance
		 */
		showModal: function(options) {
			if ($(this.$modal).length) {
				$(this.$modal).parent().remove();
			}

			var modal = new this.Modal('AjaxRenameModal');

			this.hideModal = function() {
				try {
					modal.hide();
				} catch(ignore) {}

				this.currentModal = null;
				this.hook.modalClosed.fire();
			};

			// Show Modal, but loading
			modal.show({
				content: '',
				title: this.msg('loading') + '...',
				buttons: [],
				onHide: function() {
					this.currentModal = null;
					this.hook.modalClosed.fire();
				}.bind(this),
			});

			// Attach modal instance to object
			this.currentModal = modal;

			// Add spinner
			$(this.$modalContent).addClass('mw-ajax-loader').css({ width: '900px', height: '500px' });
			// Remove modal instance handlers if the modal is closed
			$('#AjaxRename .qdmodal-button, .qdmodal-close').click(this.hideModal.bind(this));

			this.requestMoveData(options.from).then(function(moveData) {
				// If page does not exist, exit
				if (!moveData) {
					$(this.$modalContent).removeClass('mw-ajax-loader');
					$(this.$modalTitle).html(this.msg('title-noexist-header'));
					$(this.$modalContent).html(this.i18n.msg('title-noexist', options.from).parse());

					this.addButton({
						text: this.msg('button-cancel'),
						click: this.hideModal.bind(this),
					});

					this.logMessage({ message: 'Page does not exist, exiting...' });

					return;
				}

				// Finish Loading
				$(this.$modalContent).html(this.currentModal = this.generateModalForm({ 
					title: options.modalTitle,
					check: options.check,
					warning: moveData.warning,
					logHtml: moveData.content,
					reason: options.reason,
					from: options.from,
					to: options.to,
					subpages: moveData.subpages,
					talkSubpages: moveData.talkSubpages,
				}));

				this.addButton({
					text: this.msg('button-rename'),
					click: this.renameHandler.bind(this, moveData, {
						normal: moveData.subpages,
						talk: moveData.talkSubpages, 
					}),
				}, {
					text: this.msg('button-cancel'),
					click: this.hideModal.bind(this),
				});

				$(this.$modalTitle).html(options.modalTitle);
				$(this.$modalContent).removeClass('mw-ajax-loader').css({ width: 'fit-content', height: 'fit-content', });

				// Focus on input as the user would likely want that
				$('#AjaxRename-InputFieldOther-NewTitle').focus();

				// Set value to current page name
				$('#AjaxRename-InputFieldOther-NewTitle').val(options.from);

				// Add event listners when the enter key is pressed
				$('#AjaxRename-InputFieldOther-OtherRenameReason, #AjaxRename-InputFieldOther-NewTitle')
					.keydown(function(event) {
						if (event.key.toLowerCase() === 'enter') {
							$('.qdmodal-button').first().click();
						}	
					});

				this.logMessage({ message: 'Successfully showed the modal!' });

				// Fire any hooks attached to the modal loaded hook
				this.hook.modalLoaded.fire();
			}.bind(this)).catch(function(e) {
				this.logMessage({ message: e, type: 'error' });
			}.bind(this));

			return modal;
		},

		/**
		 * Function to handle the rename and any extra options selected.
		 * 
		 * @method					 renameHandler
		 * @class					  AjaxRename
		 * @param {Object} moveData	The data returned by `requestMoveData()`
		 * @param {Object} subpages	The suboages data passed to `showModal()` by `requestMoveData()`
		 * @param {Object} event	The event object that is passed to the function when the event is triggered
		 * @callback
		 */
		renameHandler: function(moveData, subpages, event) {
			// Get inputs
			moveData.from = this.modalOptions.from;
			moveData.to = $('[id$="NewTitle"]').first().val();

			var check = this.getCheckboxStates(),
				watch = check.watch ? 'watch' : "preferences",
				reason = this.getInputReason();

			var ext1 = moveData.from.match(/\.([a-z]+)$/) || [],
				ext2 = moveData.to.match(/\.([a-z]+)$/) || [];

			// Check inputs
			if (!$('#AjaxRename-InputFieldOther-NewTitle').val()) {
				alert(this.msg('no-title', this.modalOptions.from));
				this.logMessage({ message: 'Failed to rename' + moveData.from + ': No title to rename to', type: 'warn' });

				return;
			}
			
			if (moveData.from === $('#AjaxRename-InputFieldOther-NewTitle').val()) {
				alert(this.msg('selfmove', this.modalOptions.from));
				this.logMessage({ message: 'Failed to rename' + moveData.from + ': Old title is same as new title', type: 'warn' });

				return;
			}

			if ((
				ext1[1] !== ext2[1] 
				|| !moveData.to.match(/^File:/)
			) && this.wg.wgNamespaceNumber === 6) {
				alert(this.msg('file-cannot-move', moveData.from, moveData.to));
				this.logMessage({ message: this.msg('file-cannot-move', moveData.from, moveData.to), type: 'warn' });
				return;
			}

			// Close Modal
			this.hideModal.call(this);

			// Handle page lists
			function _mergePagesList(replaceNew) {
				var arr = new Array();

				if (!subpages.normal) subpages.normal = [];
				if (!subpages.talk) subpages.talk = [];

				// Helper function to iterate
				function _iter(a) {
					a.forEach(function(v) {
						arr.push(replaceNew ? v.replace(moveData.from, moveData.to) : v);
					});
				}

				// Add main title to deletion query
				subpages.normal.unshift(moveData.from);
				// If subpages are not checked, delete them from the que
				if (!check['move-subpages']) {
					subpages.normal.splice(1);
				}
				_iter(subpages.normal);

				// Same for here
				if (check['move-talk']) {
					var talkPage,
						// If not to rename subpages and talk rename is checked, only add talk page to rename and not subpages
						temp = check['move-subpages'] ? subpages.talk : [];

					// Handle main talk page name (if it does not have a namespace, add it)
					if (moveData.to.match(':')) {
						talkPage = moveData.to.replace('^([^:]+):', function(_, $1) {
							return $1 + ' Talk';	
						});
					} else {
						talkPage = 'Talk:' + moveData.to;
					}

					// Add talk page to page list
					temp.unshift(talkPage);
					_iter(temp);
				}

				return arr;
			}

			// Get page listings
			var newPages = _mergePagesList(true),
				oldPages = _mergePagesList(false);

			// Action functions/data
			var _delete = function(newPage) {
					promises.deletions.push(this.deletePage({
						title: newPage,
						reason: this.msg('move-delete-reason', newPage.replace(moveData.to, moveData.from)),
						watch: watch,
					}));
				}.bind(this),
				promises = {},
				pages = {},
				_move = function() {
					return this.movePage({
						reason: reason,
						from: moveData.from,
						to: moveData.to,
						noredirect: !check['suppress-redirect'],
						movesubpages: check['move-subpages'],
						movetalk: check['move-talk'],
						ignorewarnings: check['ignore-warnings'],
						watchlist: watch,
					});
				}.bind(this);

			// More variables
			promises.deletions = [];
			pages.deletions = [];

			// If delete box is checked, delete pages
			if (check['delete-targets']) {
				for (var i in newPages) {
					var v = newPages[i];

					_delete(v);
					pages.deletions.push(v);
				}
			}

			// Function to finish promises and move to next
			function _finishPromises(promises, responseCallback) {
				return $.when.apply($, promises).always(function() {
					$.each(arguments, responseCallback)	;
				});
			}

			// Wait for deletions if the box is checked (If the checkbox is empty, the `$.when()` is called with no arguments), then move page
			_finishPromises(promises.deletions, function(i, res) {
				// Log responses
				this.logPromiseResponse({
					res: res,
					success: {
						message: this.msg('log-success-delete', pages.deletions[i]),
						showNotification: false,
					},
					fail: {
						message: this.msg('log-fail-delete', pages.deletions[i], res),
						showNotification: false,
					},
				});	
			}.bind(this)).always(function() {				
				// Actually move the page, and log response
				_move()
					.always(function(res) {
						// Log responses
						this.logPromiseResponse({
							res: res,
							success: {
								message: this.msg('log-success-move', moveData.from, moveData.to, reason),
								showNotification: true,
							},
							fail: {
								message: this.msg('log-fail-move', moveData.from, moveData.to, res),
								showNotification: true,
							},
						});	
					}.bind(this));
			}.bind(this));
		},

		/**
		 * Modal initializer for event handlers.
		 * Takes a link, and extracts any useful data for the modal function.
		 * then, it shows the modal.
		 * 
		 * @method				  fireModal
		 * @class				   AjaxRename
		 * @param {String} link	 The link to fire the modal with
		 */
		fireModal: function(link) {
			var query = (link || '').match(/\?(\S+)$/),
				modalOptions = {
					id: "AjaxRenameModal",
					modalTitle: decodeURI(this.msg('modal-title', this.getPage(link))),
				};

			// Just a regular `Special:Move` Link
			if (!this.isValidLink(decodeURI(link))) return;

			// Find Url Parameters
			// Titles
			modalOptions.from = this.getPage(decodeURI(link));
			modalOptions.to = this.getPage(decodeURI(link), 'to');

			// Merge URL parameters
			$.extend(modalOptions, this.getUrlParams(decodeURI(link)));

			// Store modal options as a reference variable for other uses
			this.modalOptions = modalOptions;

			// Replace '+' and '_' with ' '
			this.modalOptions.from = this.modalOptions.from.replace(/[_\+]/g, ' ');

			// Show modal			
			this.showModal(modalOptions);

			// Fire any hooks attached hook to load the modal
			this.hook.modalLoading.fire();
		},

		/**
		 * Main event handler for this script. Loads the modal with the URL data when clicked.
		 *
		 * @method				  onDocumentClick
		 * @class				   AjaxRename
		 * @param {Object} event	The event object that is passed to the function when it is called
		 * @callback
		 */
		onDocumentClick: function(event) {
			var $clickedElem = $(event.target),
				clickedLink = $clickedElem ? $clickedElem.prop('href'): null;

			// Exit if meta keys are pressed
			if (event.shiftKey || event.ctrlKey) return;
			if (!this.isValidLink(decodeURI(clickedLink))) return;

			event.preventDefault();
			this.fireModal(clickedLink);
		},

		/**
		 * Secondary event handler for this script when the "m" key is pressed.
		 * Can be disabled through the `doKeybind` config parameter.
		 * 
		 * @method				  addKeydownEvents
		 * @class				   AjaxRename
		 * @param {Object} event	The event object that is passed to the function when it is called
		 * @callback
		 */
		addKeydownEvents: function() {
			if (!this.doKeybind) return;

			function _addEvent(Mousetrap) {
				Mousetrap.bind('m', function() {
					this.fireModal(
						window.location.href
							.replace(this.wg.wgArticlePath, this.wg.wgArticlePath + 'Special:MovePage/')
					);
				}.bind(this));
			}

			_addEvent.call(this, window.Mousetrap);
		},
	}, window.AjaxRename);

	if (!AjaxRename.canRun()) return AjaxRename.logMessage({ message: 'User does not have neccessary rights to run, exiting...' });

	AjaxRename.hooks();

}).fail(function(e) {
	console.warn(e);
});