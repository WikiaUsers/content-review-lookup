
/** Username replace function ([[Template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by User:Splarka
  * New version by User:Spang
  * Fixed with JS provided by User:Grunny, thanks!
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('.insertusername').html(wgUserName); }
 addOnloadHook(UserNameReplace);
 
 
// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';
importArticles({
	type: "script",
	articles: [
	"u:pl.tes:MediaWiki:AjaxRC.js"
	]
});