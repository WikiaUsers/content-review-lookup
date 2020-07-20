// ============================================================
//                       Imports
// ============================================================
importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		'w:c:dev:RevealAnonIP/code.js',
		'w:c:dev:View_Source/code.js',
		'w:c:dev:EditIntroButton/code.js',
		'w:c:dev:Thread Inspection/code.js',
		'w:c:dev:FixWantedFiles/code.js',
		'w:c:dev:CacheCheck/code.js',
                'w:c:dev:WallGreetingButton/code.js',
		'w:c:dev:MiniComplete/code.js',
		'w:c:dev:UserTags/code.js'
		// ...
	]
});
 
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically Refreshing This Page.';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* InactiveUsers */
InactiveUsers = { months: 1 };
 
importScriptPage('InactiveUsers/code.js', 'dev');

//File Links AutoUpdate
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js", "dev");
}

window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'staff', 'helper', 'vstf'];
UserTagsJS.modules.metafilter = {
	sysop: ['founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};