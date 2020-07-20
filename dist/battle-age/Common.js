importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
importScriptPage('ArchiveTool/code.js', 'dev');

window.UserTagsJS = {
	modules: {},
	tags: {
senior: { u: 'Senior User', order: 100 },
coder: { u: 'WikiCoder', order: 101 },
bureaucrat: { u: 'Elder', order: 1 },
	}
};
UserTagsJS.modules.custom = {
	'Wolfy112': ['senior', 'coder']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});
importArticles({
    type: 'script',
    articles: [
        'w:dev:TopEditors/code.js'
    ]
});