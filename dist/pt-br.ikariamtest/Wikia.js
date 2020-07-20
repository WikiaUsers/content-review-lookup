/****************************************************/
/* Additional UserRights Icons in profile mastheads */
/****************************************************/

importScript('MediaWiki:Wikia.js/userRightsIcons.js');

// Patching in changes to table sorting and alt rows
// Courtesy of Pcj from WoWPedia.org
function changeTS() {
window['ts_alternate'] = function (table) {
var tableBodies = table.getElementsByTagName("tbody");
for (var i = 0; i < tableBodies.length; i++) {
var tableRows = tableBodies[i].getElementsByTagName("tr");
for (var j = 0; j < tableRows.length; j++) {
var oldClasses = tableRows[j].className.split(" ");
var newClassName = "";
for (var k = 0; k < oldClasses.length; k++) {
if (oldClasses[k] != "" && oldClasses[k] != "alt") newClassName += oldClasses[k] + " ";
} tableRows[j].className = newClassName + (j%2 == 0?"alt":"");
}
}
}
}
addOnloadHook(changeTS);

/* ShowHide2 function for collabsible tables and navboxes */
var ShowHideConfig = { 
    brackets: '<[{()}]>',
    en: {
	show: "show",
	hide: "hide",
	showAll: "expand all",
	hideAll: "collapse all"
    }
};
importScriptPage('ShowHide2/code.js', 'dev');

/* AJAX Recent Changes auto refresh */
/* Courtesy of Pcj from WoWPedia.org */
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

importScriptPage('AjaxRC/code.js', 'dev');

var indicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
var ajaxRefresh = 60000;

/* Duplicate images list */
/* Courtesy of Pcj from WoWPedia.org */
importScriptPage('DupImageList/code.js', 'dev');


/* DisableArchiveEdit - Disable editing of talk page archives */
/* Courtesy of Porter21 from w:c:fallout */
var DisableArchiveEditConfig = { 
   archiveSubpage: 'Archive',
   disableCompletely: false,
   textColor: '#D9D9D9',
   userLang: true
};
importScriptPage('DisableArchiveEdit/code.js', 'dev');