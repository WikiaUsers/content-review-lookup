/* Any JavaScript here will be loaded for all users on every page load. */
/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');
 
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
}
addOnloadHook(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******
 
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');
 
/* Add UTC clock above articles */
importScript('MediaWiki:Common.js/displayTimer.js');
 
/* Signature Reminder */
importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});
 
/* Countdown */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});
 
/* UserTag code */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
                administrator: { u: 'Administrator', order:-1/0 },
		bureaucrat: { u: 'Bureaucrat', order:-1/0 },
                chatmoderator: { u: 'Chat Moderator', order:-1/0 }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
        'MasterLau': ['rollback', 'chatmoderator', 'eventhost'],
	'Michee': ['rollback', 'chatmoderator', 'ambassador'], // Add Ambassador
};
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 40, // And have at least 40 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'], // Remove administrator group from bureaucrats
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
// ============================================================
//                       Imports
// ============================================================
importArticles({
	type: 'script',
	articles: [
		// ...
        'u:dev:BackToTopButton/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:VisualSpellCheck/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:TwittWidget/code.js',
        'MediaWiki:Common.js/Toggle.js',
        'MediaWiki:Common.js/CEB.js'
	// ...
	]
});