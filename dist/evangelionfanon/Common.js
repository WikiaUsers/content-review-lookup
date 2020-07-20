/* Add UTC clock above articles */
importScript('MediaWiki:Common.js/displayTimer.js');
 
/* Auto-refresh the Recentchanges and Wikiactivity */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Added by CarlosIXA';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Początek Common.js */

/* Eksperymentalny licznik odliczający czas - by Splarka) */
importScript('MediaWiki:Common.js/countdown.js');
/* END Eksperymentalny licznik odliczający czas - by Splarka) */

/* Opisy grup userów w nowym profilu użytkownika */ 
importScript('MediaWiki:Common.js/userRightsIcons.js');
/* END Opisy grup userów w nowym profilu użytkownika */

/* Licznik wizyt (by SiteMeter) */
importScript('MediaWiki:Common.js/licznikWizyt.js');
/* END Licznik wizyt (by SiteMeter) */

/* Extra Rollback Buttons - by Monchoman45 */ 
importScript('MediaWiki:Common.js/extraRollbacks.js');
/* END Extra Rollback Buttons */
 
/* other */ 
importScript('MediaWiki:Common.js/other.js');
/* END other*/ 

/* Standard edit summaries*/
importScript('MediaWiki:Common.js/es.js');
/* END Standard edit summaries */

/* Sliders using jquery - by Tierrie */
importScript('MediaWiki:Common.js/sliders.js');
/* END Sliders using jquery - by Tierrie */

/* Dodatkowe przyciski w trybie źródła */
importScript('MediaWiki:Common.js/sourceButtons.js');
/* END Dodatkowe przyciski w trybie źródła */

/* Skrypt odpowiadający za system zgłaszania wandali - oryginał by RuneScape Wiki */
importScript('MediaWiki:Common.js/wandalizm.js');
/* END Skrypt odpowiadający za system zgłaszania wandali*/

/********************/
/* Koniec Common.js */
/********************/