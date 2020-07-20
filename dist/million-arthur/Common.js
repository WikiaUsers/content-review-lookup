importScriptPage('MediaWiki:Common.js/displayTimer.js', 'million-arthur');


window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
                graphichelper: { u: 'Graphic', order: 103 },
                uploadhelper: { u: 'Upload', order: 104 },
		bureaucrat: { link:'Project:Bureaucrats', order: 1 },
                rollback: { order: 4 },
                sysop: { link:'Project:Administrators' }
	}
};
UserTagsJS.modules.custom = {
	'Gedelgo': ['templatehelper', 'graphichelper'],
	'Xuanyem': ['csshelper', 'templatehelper', 'jshelper', 'uploadhelper'],
        'FZFalzar': ['graphichelper']
};
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] 
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
	days: 5, 
	edits: 10, 
	namespace: 0 
};
UserTagsJS.modules.nonuser = true; 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/*****/
importScriptPage('ListAdmins/code.js', 'dev');

/*aaaaa*/
highlight = {
    selectAll: false,
    rollback: 'purple'
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js'
    ]
});