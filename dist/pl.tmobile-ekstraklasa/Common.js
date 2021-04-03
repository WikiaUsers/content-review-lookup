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

importArticles({
    type: "script",
    articles: [
	"MediaWiki:Summaries.js",		// Summaries
	"MediaWiki:Chatango.js",		// Chatango
	"MediaWiki:Wandalizm.js",		// CVU
	"u:dev:FixWantedFiles/code.js",		// FixWantedFiles
	"u:dev:AjaxRC/code.js",			// AjaxRC
	"u:dev:UserTags/code.js",		// UserTag
	"u:dev:WallGreetingButton/code.js",	// WallGreetingButton
	"u:dev:AutoEditDropdown/code.js"	// AutoEditDropdown
	"u:dev:SearchSuggest/code.js",		// SearchSuggest
	"u:dev:RevealAnonIP/code.js"		// RevealAnonIP
   ]
});