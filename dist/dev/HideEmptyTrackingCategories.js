;(function(window, mw) {
	'use strict';
	
	if (window.HideEmptyTrackingCategoriesLoaded) return;
	window.HideEmptyTrackingCategoriesLoaded = true;
	
	const table = document.getElementById('mw-trackingcategories-table');
	var displayEmptyRows = true;
	var msg;
	
	function init() {
		// add button
		var button = document.createElement('button');
		button.classList = 'wds-button';
		button.innerHTML = msg.labelHide;
		button.title = msg.titleHide;
		table.before(button);
		
		button.addEventListener('click', function() {
			// toggle visibility
			for (var i = 1, row; row = table.rows[i]; i++) {
				if (row.children[0].childElementCount === 0 || // disabled categories
					!/\d/.test(row.children[0].children[1].innerHTML)) { // test if category is empty
					row.style.display = (displayEmptyRows && 'none' || null);
				}
			}
			
			// update button
			button.innerHTML = (displayEmptyRows && msg.labelShow || msg.labelHide);
			button.title = (displayEmptyRows && msg.titleShow || msg.titleHide);
			
			// update state
			displayEmptyRows = !displayEmptyRows;
		});
	}
	
	if (table) {
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
	}
})(window, window.mediaWiki);