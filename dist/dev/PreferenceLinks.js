/**
 * @name            PreferenceLinks
 * @version         v1.1
 * @author          TheGoldenPatrik1
 * @description     Creates a WDS dropdown menu with links to Preferences.
 */
mw.loader.using([
	'mediawiki.api',
	'mediawiki.util'
]).then(function () {
	'use strict';
	var config = mw.config.get([
		'wgUserName',
		'wgUserLanguage',
		'wgVersion'
	]);
	if (
		window.PreferenceLinksLoaded ||
		config.wgUserName === null
	) {
		return;
	}
	window.PreferenceLinksLoaded = true;
	/**
	 * @class PreferenceLinks
	 * @classdesc Main PreferenceLinks class
	 */
	var PreferenceLinks = {};
	/**
	 * @type {Array}.{String}
	 * @description System messages to get
	 */
	PreferenceLinks.messages = [
		'prefs-personal',
		'prefs-emailv2',
		'prefs-rendering',
		'prefs-editing',
		'prefs-rc',
		'prefs-watchlist',
		'prefs-auth',
		'prefs-gadgets',
		'fd-global-navigation-user-my-preferences'
	];
	/**
	 * @type {Array}.{String}
	 * @description Buttons to create
	 */
	PreferenceLinks.buttons = [
		'personal',
		'emailv2',
		'rendering',
		'editing',
		'rc',
		'watchlist',
		'auth',
		'gadgets'
	];
	/**
	 * @method init
	 * @description Initiates the script
	 * @returns {void}
	 */
	PreferenceLinks.init = function () {
		mw.hook('dev.wds').add(
			$.proxy(this.lang, this)
		);
		importArticle({
			type: 'script',
			article: 'u:dev:MediaWiki:WDSIcons/code.js'
		});
	};
	/**
	 * @method lang
	 * @description Loads the system messages
	 * @returns {void}
	 */
	PreferenceLinks.lang = function () {
		new mw.Api().get({
			action: 'query',
			meta: 'allmessages',
			ammessages: this.messages.join('|'),
			amlang: config.wgUserLanguage,
			list: 'gadgets'
		}).done(
			$.proxy(this.done, this)
		);
	};
	/**
	 * @method done
	 * @description Handles the API data
	 * @param {JSON} d - Data returned from preload
	 * @returns {void}
	 */
	PreferenceLinks.done = function (d) {
		this.i18n = function (m) {
			return d.query.allmessages[m]['*'];
		};
		this.warnings = d.warnings;
		this.main();
	};
	/**
	 * @method main
	 * @description Creates the dropdown
	 * @returns {void}
	 */
	PreferenceLinks.main = function () {
		var $list = $('<ul>', {'class': 'wds-list wds-is-linked'});
		var place = '.global-navigation__bottom .wds-list > li > a[data-tracking-label="account.preferences"]';
		$.each(this.buttons, $.proxy(function (k, v) {
			if (v === 'gadgets' && this.warnings) {
				return;
			}
			$list.append(
				$('<li>').append(
					$('<a>', {
						'href': mw.util.getUrl('Special:Preferences') + '#mw-prefsection-' + v,
						'text': this.i18n(k)
					})
				)
			);
		}, this));
		var $parent = $(place).parent();
		$('.global-navigation__bottom > .wds-dropdown .wds-dropdown__content').addClass('wds-is-not-scrollable');
		$parent.after(
			$('<li>', {
				'id': 'preference-links-dropdown',
				'class': 'wds-dropdown-level-nested'
			}).append(
				$('<a>', {
					'href': mw.util.getUrl('Special:Preferences'),
					'class': 'wds-dropdown-level-nested__toggle preference-links',
					'data-tracking-label': 'account.preferences'
				}).append(
					$('<span>', {
						'text': this.i18n(this.messages.length - 1)
					}),
					window.dev.wds.icon('menu-control-tiny', {
						'class': 'wds-dropdown-chevron'
					})
				),
				$('<div>', {
					'class': 'wds-dropdown-level-nested__content wds-is-not-scrollable preference-links-menu',
					'css': {
						'bottom': '-8px',
						'top': 'unset'
					},
					'append': $list
				})
			)
		).remove();
	};
	PreferenceLinks.init();
});