/* Any JavaScript here will be loaded for all users on every page load. */
window.enableReadProgressBarOnArticles = true
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
    ]
});

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

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
    ]
});

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		montheditor: { u:'Editor of the Month' },
		featured: { u:'Featured' },
		templates: { u:'Templates Guru' }
	}
};
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] // Edits must be to articles or talk pages or user talk pages or the forum to count, others don't count
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback'];
UserTagsJS.modules.nonuser = true; // Switch on
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.newuser = {
	namespace: 0, // [Optional] Edits must be made to articles to count
	computation: function(days, edits) {
		// If the expression is true then they will be marked as a new user
		// If the expression is false then they won't
		// In this example, newuser is removed as soon as the user gets 30 edits, OR as soon as they have been present for 10 days, whichever happens first
		return days < 10 && edits < 30;
	}
};
UserTagsJS.modules.custom = {
	'UserName 1': ['montheditor', 'featured'], // Add Editor of the Month + Featured
	'UserName 2': ['featured'], // Add featured
	'UserName 3': ['featured', 'templates'], // Add Featured + Templates Guru
	'UserName 4': ['inactive'] // Always Inactive
};
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Lunarity': ['csshelper', 'templatehelper', 'jshelper'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];