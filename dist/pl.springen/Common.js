//===============================================================================
//			Common.js Ski Jump Wiki by Vuh
//===============================================================================
// Umieszczony tutaj kod JavaScript zostanie załadowany
// przez każdego użytkownika, podczas każdego ładowania strony.
//===============================================================================

// Konfiguracja dla AutoEditDropdown
var	AutoEditDropdownConfig = {
	expandedAreaContribute: true,
	expandedAreaEdit: false
};

// RevealAnonIP
window.RevealAnonIP = {
	permissions : ['sysop']
};

// AjaxRC
ajaxPages = ["Specjalna:Aktywność_na_wiki","Specjalna:Ostatnie_zmiany","Specjalna:Rejestr","Specjalna:Nowe_pliki","Specjalna:Nowe_strony"];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje zawartość tej strony'

// UserTag
window.UserTagsJS = {
	modules: {},
	tags: {
		moder:		{ u:'Moderator', m:'Moderator', f:'Moderatorka' },
		moderfb:	{ u:'Moderator FB', m:'Moderator FB', f:'Moderatorka FB', order:2 },
		tech:		{ u:'Administrator tech.', m:'Administrator tech.', f:'Administratorka tech.' },
		cofounder:	{ u:'Współzałożyciel', m:'Współzałożyciel', f:'Współzałożycielka', order:-1 },
		exarticle:	{ u:'Ekspert Od Artykułów', m:'Ekspert Od Artykułów', f:'Ekspertka Od Artykułów' }
	}
};
UserTagsJS.modules.custom = {
	'Vuh': ['tech'],
	'Kubusiek24': ['cofounder','moderfb'],
	'Gothicfan94': ['cofounder','moderfb'],
	'Partyzantka': ['moder']
};
UserTagsJS.modules.mwGroups = ['bureaucrat','chatmoderator'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'],
	founder: ['bureaucrat']
};

importArticles({
    type: "script",
    articles: [
	"MediaWiki:Summaries.js",		// Summaries
	"MediaWiki:Chatango.js",		// Chatango
	"MediaWiki:Wandalizm.js",
	"u:dev:FixWantedFiles/code.js",		// FixWantedFiles
	"u:dev:AjaxRC/code.js",			// AjaxRC
	"u:dev:UserTags/code.js",		// UserTag
	"u:dev:WallGreetingButton/code.js",	// WallGreetingButton
	"u:dev:AutoEditDropdown/code.js"	// AutoEditDropdown
	"u:dev:SearchSuggest/code.js",		// SearchSuggest
	"u:dev:RevealAnonIP/code.js"		// RevealAnonIP
   ]
});