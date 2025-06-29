/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {

		// former staff
		formerbureaucrat: { u:'Former Bereaucrat', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff', order: 100 },
		formersysop: { u:'Former Administrator', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff', order: 101 },
		formermod: { u:'Former Moderator', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff',  order: 102 },

		// former staff reasons
		retired: { u:'Retired Staff', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff', order: 103 },
		fired: { u:'Hall of Shame', order: 104 },

		// other
		inactive: {u:'Dormant', order: 1001 },
	}
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'content-moderator', 'sysop', 'bot', 'bot-global'];

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};

UserTagsJS.modules.custom = {
	'CJDakotaraptor': ['founder'],
};

window.enableReadProgressBarOnArticles = true;

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
    ]
});

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});