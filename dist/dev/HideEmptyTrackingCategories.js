/**
 * HideEmptyTrackingCategories.js
 * Adds a toggle to hide tracking categories if they are empty.
 * @summary Hide empty categories.
 * @see https://dev.fandom.com/wiki/HideEmptyTrackingCategories
 * @author BryghtShadow
 * @author Magiczocker
 */

(function (mw) {
	'use strict';

	if (window.HideEmptyTrackingCategoriesLoaded ||
		mw.config.get('wgCanonicalSpecialPageName') !== 'TrackingCategories') return;
	window.HideEmptyTrackingCategoriesLoaded = true;

	const table = document.getElementById('mw-trackingcategories-table');
	if (!table) return;

	var msg;
	var preloads = 2;

	/**
	 * Update button text and category visibility.
	 */
	function update(ele) {
		const hidden = table.classList.contains('categories-hidden'),
		btn = ele.srcElement;
		btn.textContent = msg(hidden ? 'labelHide' : 'labelShow').plain();
		btn.title = msg(hidden ? 'titleHide' : 'titleShow').plain();
		table.classList.toggle('categories-hidden');
	}

	/**
	 * Initializes the script.
	 */
	function init() {
		if (--preloads > 0) return;
		const emptyText = mw.msg('categorytree-member-num', 0, 0, 0, 0, mw.msg('categorytree-num-empty')), // "(empty)"
		disabledText = mw.msg('trackingcategories-disabled'), // "Category is disabled"
		rows = table.querySelectorAll('.mw-trackingcategories-name');

		for (var i = 0; i < rows.length; i++) {
			const td = rows[i],
			span = td.querySelector('span');
			if (td.textContent === disabledText ||
				span && span.textContent === emptyText) {
				td.parentNode.classList.add('empty-category');
			}
		}

		const button = document.createElement('button');
		button.className = 'wds-button';
		button.textContent = msg('labelHide').plain();
		button.title = msg('titleHide').plain();
		button.addEventListener('click', update);

		table.before(button);

		mw.util.addCSS('.categories-hidden .empty-category{display:none;}');
	}

	mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {
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
	window.importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.mediaWiki);