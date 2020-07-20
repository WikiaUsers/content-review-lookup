/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

//********************************************************************************
// Staat je toe om sjablonen te maken die je in/uit kan klappen
//********************************************************************************
importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "weergeef",
	hide: "verberg",
	showAll: "alle weergeven",
	hideAll: "alle verbergen"
    }
};

//********************************************************************************
// Ajax autorefresh door "pcj" van WoWwiki
//********************************************************************************
var ajaxPages = [":Wikia discussies", "Speciaal:Volglijst", "Speciaal:Logboeken", "Speciaal:Bijdragen", "Speciaal:RecenteWijzigingen", "Forum:Index"];
var AjaxRCRefreshText = 'Automatisch herladen';
importScriptPage('AjaxRC/code.js', 'dev');