$('span.username').text(mw.config.get('wgUserName'));

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importScriptPage('ShowHide/code.js', 'dev');

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		content-moderator: { u:'Content MOD' },
	}
};

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat', link:'Project:Administrators#Bureaucrats and Administrators' },
                sysop: { u:'Admin', link:'Project:Administrators#Bureaucrats and Administrators' },
                content-moderator: { u:'Content moderator', link:'Project:Administrators#Moderators' },
                chatmoderator: { link:'Project:Administrators#Moderators' },
                rollback: { link:'Project:Administrators#Moderators' },
                inactive: { u: 'At the Bay Window' },
                bots: { u: 'Bot' },
                
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'DatNuttyKid': ['content-moderator']
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
    element.innerHTML=element.innerHTML + "<small><span style=\"color:white;\"><br/>GIRL MEETS WORLD WIKI</span></small>";
}

AjaxRCRefreshText = 'Auto-refresh';  AjaxRCRefreshHoverText = 'Automatically refresh the page';  ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];  importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('DisplayClock/code.js', 'dev');