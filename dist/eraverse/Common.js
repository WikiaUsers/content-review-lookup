/* Any JavaScript here will be loaded for all users on every page load. */

/* Add UTC clock above articles */ importScript('MediaWiki:Common.js/displayTimer.js');

importScriptPage('Voice_Dictation/voice.js', 'dev');
importScriptPage('PowerPageMaker/en.js', 'dev');
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
importScriptPage('ShowAdsButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

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
		bureaucrat: { link:'EraVerse Wiki:Administrators' },
		sysop: { link:'EraVerse Wiki:Administrators' },
		chatmoderator: { link:'EraVerse Wiki:Administrators' },
		rollback: { u:'Rollback', link:'EraVerse Wiki:Administrators' },
		css: { u:'CSS', order: 101 },
		javascript: { u:'JavaScript', order: 102 }
	}
};
UserTagsJS.modules.custom = {
	'MattShadow': ['bureaucrat']
};
UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

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

// Collapsibles 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;

// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');