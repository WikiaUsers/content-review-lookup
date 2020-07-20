/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});

window.LockForums = {
    expiryDays: 150,
    expiryMessage: "This forum hasn\'t been commented on for over <expiryDays> days. There is no need to comment.",
    warningDays: 150,
    warningMessage: "This forum hasn\'t been commented on for over <warningDays> days. Please reply ONLY if a response is really needed.",
    ignoreDeletes: true,
    banners: true,
    expiryBannerMessage: "Note: This topic has been unedited for <actualDays> days. It is considered archived - the discussion is over. If you feel this forum needs additional information, contact an administrator.",
    warningBannerMessage: "Note: This topic has been unedited for <actualDays> days. It is considered archived - the discussion is over. Do not add to unless it really needs a response.",
    warningPopup: true,
    warningPopupMessage: "This forum has not had a response for over <actualDays> days; are you sure you want to reply?"
};

importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js',
    'u:dev:LockForums/code.js'
]});

 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

window.UserTagsJS = {
	modules: {},
	tags: {
		uotm: { u:'User Of The Month' },
		uoty: { u:'User Of The Year' },
	}
};
UserTagsJS.modules.custom = {
	'Mateusz11113': ['uoty'] 
};