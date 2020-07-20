/* Any JavaScript here will be loaded for all users on every page load. */

//M-rated fanfic alert config
SpoilerAlert = {
    question: 'This fanfiction contains M-rated content. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('M-Rated Fanfictions');
    }
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});
 
/* End of the {{USERNAME}} replacement */
 
//ajax rc config
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];

/* Adds user tags to user pages*/
 
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0, 'Talk', 'User talk', 'Forum', 'Template', 'MediaWiki']
};
UserTagsJS.modules.nonuser = true; // Switch on
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	'chatmoderator': ['sysop', ['patroller', 'rollback']] // Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
};

/* End of adding user tags */

//script imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:UserTags/code.js', 
        'u:dev:YoutubePlayer/code.js',
	"u:dev:IsTyping/code.js",
    ]
});