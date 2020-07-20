$('span.username').text(mw.config.get('wgUserName'));

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importScriptPage('ShowHide/code.js', 'dev');
 
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Head Admin', link:'Project:Administrators#Bureaucrats and Administrators' },
                sysop: { u:'Admin', link:'Project:Administrators#Bureaucrats and Administrators' },
                chatmoderator: { link:'Project:Administrators#Rollbacks and Chat Moderators' },
                rollback: { link:'Project:Administrators#Rollbacks and Chat Moderators' },
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

importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});
 
var index;
var element;
var a = document.getElementsByClassName("thumbcaption");
for (index = 0; index < a.length; ++index) {
    element = a[index];
    element.innerHTML=element.innerHTML + "<small><span style=\"color:white;\"><br/>FOTM WIKI</span></small>";
}