// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
	modules: {},
	tags: {
                sysop: { link:'Project:Admins' }
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator', 'rollback'];
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = { 
           namespace: 0, 
	   computation: function(days, edits) {
		return days < 7 && edits < 10;
           }
};
UserTagsJS.modules.inactive = { 
           days: 30, 
           namespaces: [0, 'Talk', 'User talk', 'Board Thread'] 
}; 
UserTagsJS.modules.metafilter = { 
           'newuser': ['inactive', 'staff'], 
           'inactive': ['staff'], 
           'chatmoderator': ['sysop'],
           'rollback': ['sysop'] 
};

// *****************************
// Beginning of Script importing
// *****************************
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:UserTags/code.js",
        "w:c:dev:DisplayClock/code.js", 
        "MediaWiki:Common.js/countdownclock.js"
    ]
});