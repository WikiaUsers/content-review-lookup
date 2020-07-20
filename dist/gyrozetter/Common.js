/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

/* Discourage/disable the editing of talk page archives */
importScriptPage('DisableArchiveEdit/code.js', 'dev');

importScriptPage('DupImageList/code.js', 'dev');

importStylesheet("Template:Ambox/code.css");

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

/* Inactive users get an "inactive" tag on their profile headers */
InactiveUsers = {months: 2};
importScriptPage('InactiveUsers/code.js', 'dev');

/* Ability to change full page title */
importScript('MediaWiki:Common.js/displaytitle.js');

/* Add a tag for "rollback" to profile header when category present */
importScript('MediaWiki:Common.js/rollbacktag.js');

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');

// <syntax type="javascript">

// </syntax>

importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('OasisToolbarButtons/code.js', 'dev');
importScriptPage('AutoEditDropdown/code.js', 'dev');

// ******************************************************
// * SearchGoButton - Version 1.2			*
// *							*
// * Script by Eladkse					*
// ******************************************************
//
 
PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('DisplayClock/code.js', 'dev');

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
	if((wgPageName == 'Special:Upload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
}
addOnloadHook(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******

define("NS_INFOBOX", 100);
define("NS_INFOBOX_TALK", 101);
 
$wgExtraNamespaces[NS_INFOBOX] = "Infobox";
$wgExtraNamespaces[NS_INFOBOX_TALK] = "Infobox_talk";