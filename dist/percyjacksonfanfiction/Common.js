/* Any JavaScript here will be loaded for all users on every page load. */
 // If you do not know what you are doing, do not edit this page.
// <source lang="JavaScript">

// Clock for both skins
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

// Signature check
importArticle({type:'script', article:'w:c:dev:SignatureCheck/code.js'});

// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 30,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
	tags: {
		bureaucrat: { link:'Percy Jackson Fanfiction Wiki:Administrators' },
		sysop: { link:'Percy Jackson Fanfiction Wiki:Administrators' },
		chatmoderator: { link:'Percy Jackson Fanfiction Wiki:Administrators' },
		rollback: { u:'Rollback', link:'Percy Jackson Fanfiction Wiki:Administrators' },
		css: { u:'CSS', order: 101 },
		javascript: { u:'JavaScript', order: 102 }
	}
};
UserTagsJS.modules.custom = {
	'Hazelcats': ['bureaucrat'],
	'MattShadow': ['bureaucrat'],
        'Capn Rin Scotts': ['bureaucrat'],
	'Leafwhisker': ['rollback'],
	'Daughter of Poseidon118': ['rollback'],
	'Josh-Son of Hyperion': ['rollback'],
	'Ersason219': ['rollback'],
        'Hermione6720': ['rollback'],
        'Albus Chase': ['rollback']
};
UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// Lock Old Blogs -- dev wiki
 importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
}); 

// RevealAnonIP -- dev wiki
window.RevealAnonIP = {
    permissions : ['user']
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

// Hide edit button on Exchange pages for wcs
function AnonMessage() {
	if(wgUserGroups == null) {
		$('.anonmessage').css('display', 'inline');
	}
}

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

// Collapsibles 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;

// AntiUnicruft
importArticle({type:'script', article:'w:c:dev:AntiUnicruft/code.js'}); 

// AjaxBatchDelete
importScriptPage('AjaxBatchDelete/code.js', 'dev');
 
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');

// Countdown code
importScriptPage('Countdown/code.js', 'dev');
 
// Adds PURGE button for both skins
var PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
 
// Add "Edit Intro" Button/Tab
importScriptPage('EditIntroButton/code.js', 'dev');

// Display Comments w/ Local Times
importScript('MediaWiki:Common.js/localTimeComments.js');

//</source>