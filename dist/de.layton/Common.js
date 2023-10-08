window.PurgeButtonText = 'Auffrischen';

/**
 * Script for making tabbers pre-select a tab.
 * 
 * The tabber must be wrapped inside a table or
 * div with a data-opentab attribute and the
 * tabs must contain a div with a data-tabname
 * attribute for the script to work.
 * However, if data-tabname is set to "auto",
 * The pre-selected tab will be the first one
 * that includes a link to the current page.
 * 
 * @author	Professor Hershel Theodore Layton
 * @version	2021-03-26
 */
(function() {
	function tabberPreselectTab(wrappers) {
		var autoTabname = 'auto';
	
		wrappers.forEach(function(wrapper) {
			var tabname = wrapper.getAttribute('data-opentab');
			var tabber = wrapper.querySelector('.tabber.tabberlive');
			if (!tabber) return;
	
			var selector = tabname == autoTabname
				? 'strong.mw-selflink'
				: 'div[data-tabname="' + tabname + '"]'
			;
	
			var hash = $(tabber).find(selector).parents('.tabbertab').attr('data-hash');
			if (!hash) return;
	
			$(tabber).find('.tabbernav a[data-hash="' + hash + '"]').click();
		});
	}
	mw.hook('wikipage.content').add(function($content) {
		var maxNumOfAttempts = 30;
		var retryWait = 0.3e3; // 0.3 seconds
	
		var wrappers = $content[0].querySelectorAll('table[data-opentab], div[data-opentab]');
		if (!wrappers.length) return;
	
		var countAttempts = 0; // Limit tries to find the wrapped tabber to <maxNumOfAttempts>
		var interval = setInterval(function() {
			if ($('.tabber.tabberlive').length || countAttempts >= maxNumOfAttempts) {
				clearInterval(interval);
				tabberPreselectTab(wrappers);
			}
			countAttempts++;
		}, retryWait);
	});
})();