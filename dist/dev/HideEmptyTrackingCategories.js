;(function (window, mw) {
	'use strict';

	if (window.HideEmptyTrackingCategoriesLoaded ||
		mw.config.get('wgCanonicalSpecialPageName') !== 'TrackingCategories') return;
	window.HideEmptyTrackingCategoriesLoaded = true;

	const table = document.getElementById('mw-trackingcategories-table');
	if (!table) return;

	var displayEmptyRows = true;
	var msg, emptyText, disabledText;

	function init() {
		// add button
		var button = document.createElement('button');
		button.className = 'wds-button';
		button.textContent = msg('labelHide').plain();
		button.title = msg('titleHide').plain();
		table.before(button);

		var rows = table.querySelectorAll('.mw-trackingcategories-name');

		button.addEventListener('click', function () {
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
			button.textContent = msg(displayEmptyRows ? 'labelShow' : 'labelHide').plain();
			button.title = msg(displayEmptyRows ? 'titleShow' : 'titleHide').plain();

			// update state
			displayEmptyRows = !displayEmptyRows;
		});
	}

	mw.loader.using(['mediawiki.api']).then(function () {
		return new mw.Api().loadMessagesIfMissing([
			'categorytree-member-num',
			'categorytree-num-empty',
			'trackingcategories-disabled'
		]);
	}).then(function () {
		emptyText = mw.msg('categorytree-member-num', 0, 0, 0, 0, mw.msg('categorytree-num-empty')); // "(empty)"
		disabledText = mw.msg('trackingcategories-disabled'); // "Category is disabled"
		mw.hook('dev.i18n').add(function (i18n) {
			i18n.loadMessages('HideEmptyTrackingCategories').done(function (i18no) {
				msg = i18no.msg;
				init();
			});
		});
		importArticles({
			type: 'script',
			articles: 'u:dev:MediaWiki:I18n-js/code.js'
		});
	});
})(window, window.mediaWiki);