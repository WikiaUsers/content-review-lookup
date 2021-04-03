/* Any JavaScript here will be loaded for all users on every page load. */

// Auto-refresh
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    
];

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Creates additional tabs in Recent changes feed. Special thanks to Sophie for creating this array. */
mw.loader.using('mediawiki.util').then(function () {
	if (!$('.activity-tabs').length) {
	    return;
	}

    function buildTab (text, page) {
		return $('<li>', {
			class: 'wds-tabs__tab',
			append: $('<div>', {
				class: 'wds-tabs__tab-label',
				append: $('<a>', {
					text: text,
					href: mw.util.getUrl(page),
				})
			})
		});
	}
	
	$('.activity-tabs').append([
		buildTab('New Stories', 'Project:New Stories'),
		buildTab('Writers\' Showcase', 'Project: Writers\' Showcase'),
		buildTab('Wiki Blog', 'Blog: Recent posts'),
		buildTab('Writers\' Workshop', 'Forum:Writers\' Workshop')		
	]);
});