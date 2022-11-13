/**
 * HideEmptyTrackingCategories.js
 * Adds a toggle to hide tracking categories if they are empty.
 * @summary Hide empty categories.
 * @see https://dev.fandom.com/wiki/HideEmptyTrackingCategories
 * @author BryghtShadow
 * @author Magiczocker
 */

;(function ($, mw) {
	'use strict';

	if (window.HideEmptyTrackingCategoriesLoaded ||
		mw.config.get('wgCanonicalSpecialPageName') !== 'TrackingCategories') return;
	window.HideEmptyTrackingCategoriesLoaded = true;

	var table = document.getElementById('mw-trackingcategories-table');
	if (!table) return;

	var displayEmptyRows = true;
	var emptyText, disabledText, OO;

	/**
	 * Initializes the script.
	 * @param {object} i18n - Messages from I18n-js dev script.
	 */
	function init(i18n) {
		var msg = i18n.msg;
		// add button
		var button = new OO.ui.ButtonWidget( { 
			label: msg('labelHide').plain(),
			title: msg('titleHide').plain(),
			flags: ['primary', 'progressive']
		} );
		$(table).before(button.$element);

		var rows = table.querySelectorAll('.mw-trackingcategories-name');

		button.on('click', function () {
			// toggle visibility
			for (var i = 0; i < rows.length; i++) {
				var td = rows[i],
					span = td.querySelector('span');
				if (td.textContent === disabledText ||
					span && span.textContent === emptyText) {
					td.parentNode.style.display = (displayEmptyRows ? 'none' : null);
				}
			}

			// update button
			button.setLabel(msg(displayEmptyRows ? 'labelShow' : 'labelHide').plain())
				  .setTitle(msg(displayEmptyRows ? 'titleShow' : 'titleHide').plain());

			// update state
			displayEmptyRows = !displayEmptyRows;
		});
	}

	mw.loader.using(['mediawiki.api', 'jquery', 'oojs-ui', 'oojs-ui-core', 'oojs-ui-widgets']).then(function(require) {
		OO = require('oojs');
		return;
	}).then(function () {
		return new mw.Api().loadMessagesIfMissing([
			'categorytree-member-num',
			'categorytree-num-empty',
			'trackingcategories-disabled'
		]);
	}).then(function () {
		emptyText = mw.msg('categorytree-member-num', 0, 0, 0, 0, mw.msg('categorytree-num-empty')); // "(empty)"
		disabledText = mw.msg('trackingcategories-disabled'); // "Category is disabled"
		mw.hook('dev.i18n').add(function (i18n) {
			i18n.loadMessages('HideEmptyTrackingCategories').done(init);
		});
		if (!(window.dev && window.dev.i18n && window.dev.i18n.loadMessages)) {
			mw.loader.load('https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js&*');
		}
	});
})(window.jQuery, window.mediaWiki);