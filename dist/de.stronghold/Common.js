window.UserTagsJS = {
	modules: {},
	tags: {
                bannedfromchat: { u:'Vom Chat ausgeschlossen', order: 1 },
                bureaucrat: { u:'Bürokrat', order: 2 },
                sysop: { u:'Admin', order: 3 },
                chatmoderator: { u:'Chat-Moderator', order: 4 },
                threadmoderator: { u:'Foren-Moderator', order: 5 }
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bannedfromchat', 'chatmoderator', 'threadmoderator'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});









cacheSkip = [];
cacheSkipLimit = 1000;
importArticles({
    type: 'script',
    articles: [
        'u:dev:CacheCheck/code.js'
    ]
});