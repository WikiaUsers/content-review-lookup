importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat', link:'Project:Administrators#Bureaucrats and Administrators' },
                sysop: { u:'Admin', link:'Project:Administrators#Bureaucrats and Administrators' },
                chatmoderator: { link:'Project:Administrators#Rollbacks and Chat Moderators' },
                rollback: { link:'Project:Administrators#Rollbacks and Chat Moderators' },
		inactive: { u: 'Inactive User' }
	}
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.inactive = 30; // 30 days
 
UserTagsJS.modules.inactive = {
	days: 30,
 
 
};
 
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
};