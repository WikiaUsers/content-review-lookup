//===============================================================================
//			Common.js Beelzebub Wiki
//===============================================================================
// Umieszczony tutaj kod JavaScript zostanie załadowany
// przez każdego użytkownika, podczas każdego ładowania strony.
//===============================================================================

// Konfiguracja dla AutoEditDropdown
var AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
// AjaxRC
ajaxPages = ["Specjalna:Aktywność_na_wiki","Specjalna:Ostatnie_zmiany","Specjalna:Rejestr","Specjalna:Nowe_pliki","Specjalna:Nowe_strony"];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';


importArticles({
    type: "script",
    articles: [
	"MediaWiki:Common.js/userRightsIcons.js",	// Import uprawnień
	"MediaWiki:Common.js/DupImageList.js",		// DupImageList
	"MediaWiki:Common.js/license.js",		// Licencje plików
	"MediaWiki:Common.js/summaries.js",		// Summaries
	"MediaWiki:Common.js/module.js",		// Nowe moduły
	"MediaWiki:Common.js/AjaxRC.js",		// AjaxRC
	"MediaWiki:Common.js/LockOldBlogs.js"		// LockOldBlogs
   ]
});

$(".wikia-gallery-item .thumbimage").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
	});
	$(".wikia-gallery-item .image").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
	});