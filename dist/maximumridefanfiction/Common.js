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
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */


 
//lock old blogs config
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days.",
    nonexpiryCategory: "Never archived blogs"
};
 
//Usertags config
window.UserTagsJS = {
	modules: {},
	tags: {
sysop: { link:'Project:Administrators ' },
bot: { link:'Help:Bots' },
}
};
 
UserTagsJS.modules.mwGroups = ['bot', 'bot-global', 'bureaucrat',];
 


UserTagsJS.modules.inactive = {
	days: 60,
	zeroIsInactive: true
};


UserTagsJS.modules.userfilter = {
	'Rider ranger47': ['inactive'], 
	
};
 
 
//lock forums config 
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This forum is considered archived because it hasn\'t been commented on in over <expiryDays> days.",
    forumName: "Forum Board" 
};
 
//ajax rc config
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];



//script imports
window.importArticles( {
    type: 'script',
    articles: [
 
        'u:dev:LockOldBlogs/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:UserTags/code.js', 
        'u:dev:BackToTopButton/code.js',
        "w:c:dev:LockForums/code.js",
        'u:dev:AjaxRC/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:YoutubePlayer/code.js',
       
        
    ]
} );