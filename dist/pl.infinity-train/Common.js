// Automatyczne odświeżanie 
window.ajaxPages = 
["Special:RecentChanges","Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';
importScriptPage('AjaxRC/code.js', 'dev');
 
// {{USERNAME}}
// Autorzy: Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]], this (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}