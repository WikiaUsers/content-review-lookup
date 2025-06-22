/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		// current staff
		founder: { u:'Founder', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff', order: 0 },
		bureaucrat: { u:'O5-Council Member', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff', order: 1 },
		sysop: { u:'A-Class Personnel', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff', order: 2 },
		threadmoderator: { u:'B-Class Personnel', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff', order: 3 },
		"content-moderator": { u:'Scientific Department', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff', order: 3 },
		rollback: { u:'D-Class Personnel', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff', order: 9 },

		// former staff
		formerbureaucrat: { u:'Former O5-Council Member', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff', order: 100 },
		formersysop: { u:'Former A-Class Personnel', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff', order: 101 },
		formermod: { u:'Former B-Class Personnel', link: 'SCP Foundation Wikia:Rules and Guidelines/Staff',  order: 102 },

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