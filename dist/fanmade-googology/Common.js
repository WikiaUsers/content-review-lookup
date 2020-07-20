// Core
window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'Editor of the Month', order:-1/0 },
		realgoogologist: { u:'Professional'},
		sysop: { u:'ADMIN?'},
		regular: { u:'Active'},
		'sorta-admin': { u: 'Mini-Admin'},
		dedicated: { u: 'Dedicated'},
		dream: { u: 'Dream Dude'},
		navbox: { u: 'NavBox'},
		jshelper: {u: 'JavaScript'},
		csshelper: {u: 'CSS Helper', m: 'CSS Dude', f:'CSS Lady'}
	}
};
//Custom added tags
UserTagsJS.modules.custom = {
	'Alpha-ketoacid': ['realgoogologist','regular'],
	'StillNotOriginal': ['dedicated', 'navbox'],
	'PatrickhhMEME': ['montheditor','dedicated'],
	'SHANG SHANG BANG': ['Dream Dude'],
	'SHANG BANG BANG': ['Dream Dude']
}
//Combine rollback and more to Mini-Admin
UserTagsJS.modules.implode = {
	'sorta-admin': ['rollback', 'content-moderator', 'chatmoderator', 'threadmoderator']
};
UserTagsJS.modules.stopblocked = false; // Manually turn off
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'content-moderator', 'chatmoderator', 'threadmoderator'];
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});

importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
 
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'Template:Stdsummaries'
};
window.railWAM = {
    logPage:"Project:WAM Log"
};
// MathJax is disabled in the Special and MediaWiki namespaces
var enableMathJax = (wgCanonicalNamespace !== "Special") && (wgCanonicalNamespace !== "MediaWiki");
 
// Enable MathJax when viewing deleted revisions
enableMathJax = enableMathJax || (wgCanonicalSpecialPageName === "Undelete");
 
$(function () {
    if (enableMathJax) {
        importScriptURI("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe");
    }
});