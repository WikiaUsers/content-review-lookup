
//********** Ajax Refresh **********
importScriptPage("MediaWiki:Common.js/AjaxRefresh.js");

//****************************************************************************************************
//********** Show/Hide Collapsibles **********
importScriptPage('ShowHide/code.js', 'dev');
var ShowHideConfig = { 
	autoCollapse: 3,
	en: {
		show: "Open",
		hide: "Close",
		showAll: "expand all",
		hideAll: "collapse all"
	}
};
//****************************************************************************************************
//********** Archive Tool **********

var archiveListTemplate = 'Archive'; //The name of the template that will be placed on top of the talk page, linking to the different archives
var archivePageTemplate = 'ArchivePage'; //The name of the template that will be placed on top of the archive page, explaining that it is an archive
importScriptPage('ArchiveTool/code.js', 'dev');

//****************************************************************************************************
//********** Custom User Tags **********
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { u:'Admin', link:'Project:Administrators' },
		'mini-sysop': { u: 'Mini-Admin', link:'Project:Mini Admins' },
		'cleanup': { u: 'Janitor'},
                'semi-active': { u: 'Semi Active', link:'Project:Semi Active Staff' }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
    "Kiramazing": ['cleanup'],
    "Mio-Sakamoto": ['cleanup'],
    "Metal the Rogue": ['cleanup'],
    "HauntedPhantom": ['cleanup'],
    "HS664": ['cleanup'],
    "Awkwarddingo": ['cleanup'],
    "TheDarkMantis15": ['cleanup'],
    "Akrivus": ['cleanup'],
    "Agent-Grail": ['cleanup']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
        days: 5,
        edits: 10
}
UserTagsJS.modules.inactive = {
        days: 30,
        namespaces: [0, 1, 3, 4, 5, 6, 7, 10, 11, 14, 15, 110, 111, 112, 113, 500, 501, 502, 503, 1200, 1201, 2000, 2001, 2002]
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'bot', 'rollback', 'cleanup']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	'vandal-patrol': ['mini-sysop'], // Remove vandal-patrol from mini-sysops
        sysop: ['bot'], // Remove administrator from bots
        chatmoderator: ['bot'] // Remove chat moderator from bots
};
UserTagsJS.modules.userfilter = {
	'SFWBOT': ['inactive'], // SFWBOT is never inactive, even when it is.
        'Maid-chan.sh': ['inactive'] // Maid-chan is never inactive, even when she is.
};
UserTagsJS.modules.implode = {
	'mini-sysop': ['patroller', 'rollback', 'chatmoderator'] // Remove patroller, rollback and chatmoderator, if ALL 3 exist, and replace with 'mini-sysop'
};
UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
//****************************************************************************************************