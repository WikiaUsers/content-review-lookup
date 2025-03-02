// jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, eqeqeq:true, esversion: 5, forin:true, freeze:true, immed:true, latedef:true, leanswitch:true, newcap:true, noarg:true, regexp:true, strict:true, trailing:false, undef:true, unused:true
/**
 * HideEmptyTrackingCategories.js
 * Adds a toggle to hide tracking categories if they are empty.
 * @summary Hide empty categories.
 * @see https://dev.fandom.com/wiki/HideEmptyTrackingCategories
 * @author BryghtShadow
 * @author Magiczocker
 */

(function ($, mw) {
	'use strict';

	if (window.HideEmptyTrackingCategoriesLoaded ||
		mw.config.get('wgCanonicalSpecialPageName') !== 'TrackingCategories') return;
	window.HideEmptyTrackingCategoriesLoaded = true;

	var table = $('#mw-trackingcategories-table'),
		msg,
		button,
		OO,
		preloads = 2;

	if (!table) return;

	function update() {
		var hidden = table.hasClass('categories-hidden');
		button.setLabel(msg(hidden ? 'labelHide' : 'labelShow').plain());
		button.setTitle(msg(hidden ? 'titleHide' : 'titleShow').plain());
		button.setIcon(hidden ? 'eye' : 'eyeClosed');
		table.toggleClass('categories-hidden');
	}

	function init() {
		if (--preloads > 0) return;
		var emptyText = mw.msg('categorytree-member-num', 0, 0, 0, 0, mw.msg('categorytree-num-empty')), // "(empty)"
		disabledText = mw.msg('trackingcategories-disabled'), // "Category is disabled"
		rows = table.find('.mw-trackingcategories-name');

		for (var i = 0; i < rows.length; i++) {
			var td = rows[i],
			span = td.querySelector('span');
			if (td.textContent === disabledText ||
				span && span.textContent === emptyText) {
				td.parentNode.classList.add('empty-category');
			}
		}

		button = new OO.ui.ButtonWidget( {
			icon: 'eye',
			label: msg('labelHide').plain(),
			title: msg('titleHide').plain(),
			flags: ['primary', 'progressive']
		} );
		button.on('click', update);

		table.before(button.$element);

		mw.util.addCSS('.categories-hidden .empty-category{display:none;}');
	}

	mw.loader.using([
		'mediawiki.api',
		'mediawiki.util',
		'oojs-ui-widgets',
		'oojs-ui.styles.icons-accessibility' // eye, eyeClosed
	]).then(function(require) {
		OO = require('oojs');
		new mw.Api().loadMessagesIfMissing([
			'categorytree-member-num',
			'categorytree-num-empty',
			'trackingcategories-disabled'
		]).then(init);
	});
	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('HideEmptyTrackingCategories').done(function(i18no) {
			msg = i18no.msg;
			init();
		});
	});
	mw.loader.load('https://dev.fandom.com/load.php?articles=MediaWiki:I18n-js/code.js&only=scripts&mode=articles');
})(window.jQuery, window.mediaWiki);