/* Any JavaScript here will be loaded for all users on every page load. */

// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
       modules: {},
       tags: {
	       writer: { u:'Writer' },
               sysop: { u:'Administrator' },
               newuser: { u:'New User' }
       }
};
UserTagsJS.modules.custom = {
               'Mgc26133': ['writer']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator'];
UserTagsJS.modules.newuser = { days: 5 };
UserTagsJS.modules.inactive = { days: 31, namespaces: [0, 4, 8, 10] };
UserTagsJS.modules.userfilter = { 'Mgc26133': ['bureaucrat'] };
UserTagsJS.modules.metafilter = { 
               'chatmoderator': ['sysop'],
               'sysop': ['bureaucrat'],
               'newuser': ['inactive', 'staff'], 
               'inactive': ['staff']
};

// *****************************
// Beginning of Script importing
// *****************************

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/standardeditsummaries.js',
        'MediaWiki:Common.js/displayTimer.js',
        'u:dev:DupImageList/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:UserTags/code.js'
           
    ]
});

// ******************************************************************
//  Replaces {{USERNAME}} with the name of the user browsing the page
//  Requires copying Template:USERNAME
// ******************************************************************

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);