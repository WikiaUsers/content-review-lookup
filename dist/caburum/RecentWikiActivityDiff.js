/**
 * Name:        RecentWikiActivityDiff
 * Version:     v1.0
 * Author:      Caburum
 * Description: Adds a link to view the latest diff of pages shown in the "Recent Wiki Activity" rail module
 *              Useful in conjunction with [[w:c:dev:QuickDiff]] to view recent activity without leaving the current page
**/

$(function() {
	if (window.RecentWikiActivityDiffLoaded) return;
	window.RecentWikiActivityDiffLoaded = true;

	// Make text display on one line
	mw.util.addCSS('.recent-wiki-activity__page-title { display: initial }');

	function init() {
		$('.rail-module.recent-wiki-activity li.activity-item > .page-title').each(function(i, parent) {
			var pageUrl = $(parent).find('.recent-wiki-activity__page-title.page-title-link').attr('href');
			if (!pageUrl) return;

			$('<a>', {
				'text': '±',
				'title': 'Diff',
				'class': 'recent-wiki-activity__page-diff',
				'href': new mw.Uri(pageUrl).extend({ 'diff': 'latest' }),
				'prependTo': $(parent)
			});
		});
	}

	if (document.querySelector('.rail-module.recent-wiki-activity') !== null) init(); // The module already exists
	else $('#WikiaRail').on('afterLoad.rail', init); // Wait for the module to be lazy loaded via "skin.fandomdesktop.rail.lazyRail.js"
});