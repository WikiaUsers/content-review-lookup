/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 )
{
  var script  = document.createElement( 'script' );
  script.src  = '/w/index.php?title=User:KidProdigy/CollapsibleTables.js&action=raw&ctype=text/javascript&smaxage=18000&action=raw&maxage=18000';
  script.type = 'text/javascript';
  document.getElementsByTagName( 'head' )[0].appendChild( script );
  
  addOnloadHook(function () { new CollapsibleTables(); });
}

importArticles({
	type: "script",
	articles: [
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"w:dev:PurgeButton/code.js", /* Add "purge" option to page controls */
		"w:dev:DisableArchiveEdit/code.js", /* Discourage/disable the editing of talk page archives */
		"w:dev:Countdown/code.js", /* Countdown clock */
                "w:c:dev:ReferencePopups/code.js", /* Reference Popups */
		"w:runescape:MediaWiki:Common.js/standardeditsummaries.js", /* Standard edit summaries */
		"MediaWiki:Common.js/imports.js", /* UserTags and AjaxRC */
		"MediaWiki:Common.js/randompagelink.js", /* Special:Random > Special:Random/main in navigation */
		"MediaWiki:Common.js/insertusername.js", /* User name replace for Template:USERNAME */
		"MediaWiki:Common.js/disableforumedit.js", /* Discourage/disable the editing of forum archives */
		"MediaWiki:Common.js/disablecommentsblogs.js", /* Disable blog comments on old blog posts */
		"MediaWiki:Common.js/disablecomments.js", /* Disable comments for specified pages at discretion */
		"MediaWiki:Common.js/wallgreetingbutton.js", /* Add a button to edit Message Wall Greeting */
		"MediaWiki:Common.js/socialmedia.js", /* Add social media buttons to blog posts */
		"MediaWiki:Common.js/addnavlinks.js", /* Add "about us" and IRC links to "On the Wiki" menu */
		"MediaWiki:Common.js/icons.js", /* Adds icons to page header bottom border */
		"MediaWiki:Common.js/filluploadform.js", /* Fills the summary field in upload form with imagebox */
		"MediaWiki:Common.js/hubfix.js", /* Temporary fix for Wikia hubs: Gaming > Entertainment */
		"MediaWiki:Common.js/customizeforums.js", /* Wikia forum feature changes (possibly more to come) */
		"MediaWiki:Common.js/talkbutton.js", /* Talk page buttons to article headers */
		"MediaWiki:Common.js/fanonmodule.js", /* Create WikiaRail element to advertise the fanon portal */
                "MediaWiki:Common.js/communitydiscussionpages.js", /* Javascript for community discussion pages, including VfD. */
                "MediaWiki:Common.js/fanonsubscriptionmodule.js", /* Tool used to automate mass-posting on message walls with an easy UI. */
	]
});

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