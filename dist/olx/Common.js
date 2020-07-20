/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		wikimod: { u: 'Wiki Moderator', link:'Wiki Moderator', order: 100, },
		chatmod: { u: 'Chat Moderator', link:'Chat Moderator', order: 100, },
		rollback: { u: 'Rollback', link:'Rollback', order: 100, },
		admin2: { u: 'Administrator', link:'Administrator', order: 100, },
	}
};
UserTagsJS.modules.custom = {
	'NemiS': ['wikimod', 'chatmod', 'rollback', 'admin2'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* UserTagsJS.modules.metafilter = {
        'founder': ['founder']
        'bureaucrat': ['bureaucrat']
}; */

UserTagsJS.modules.userfilter = {
	'NemiS': ['bureaucrat', 'founder', 'sysop', 'admin']
};


/* */

importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
});




var tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: false,
    events: ['CustomEvent'],
}

// countdown
importScriptPage('MediaWiki:Common.js/Countdown/code.js');