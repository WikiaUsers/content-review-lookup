/* Any JavaScript here will be loaded for all users on every page load. */
// Automatical refreshing 
window.ajaxPages = 
["Special:RecentChanges","Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';
importScriptPage('AjaxRC/code.js', 'dev');
 
// {{USERNAME}}
// Autorzy: Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]], this (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
if (wgUserName != 'null') {
	$('.insertusername').text(wgUserName);
}