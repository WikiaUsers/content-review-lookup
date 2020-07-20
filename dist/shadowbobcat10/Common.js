PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/* Script Imports*/
//script imports
window.importArticles( {
    type: 'script',
    articles: [
 
 
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:BackToTopButton/code.js',
        "w:c:dev:MediaWiki:LockForums/code.js",
        'u:dev:AjaxRC/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:MessageBlock/code.js',
        'u:dev:UnsafeScripts/code.js',
        'w:c:dev:AntiUnicruft/code.js',
        'u:dev:YoutubePlayer/code.js',
        'u:admintools:MediaWiki:Common.js/profileRedesign.js',
        'u:admintools:MediaWiki:Common.js/sitenotice.js',
        'u:admintools:MediaWiki:Common.js/extraRollbacks.js',
        'u:admintools:MediaWiki:Common.js/ajaxRollback.js',
        'u:admintools:MediaWiki:Common.js/SvgToPng.js',
        'w:c:dev:ClearSandbox/code.js',
  
     ]
} );

/* Adds user tags to user pages*/

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0, 'Talk', 'User talk', 'Forum', 'Template', 'MediaWiki']
};
UserTagsJS.modules.nonuser = true; // Switch on
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	'chatmoderator': ['sysop', ['patroller', 'rollback']]// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
};
/* End of adding user tags */