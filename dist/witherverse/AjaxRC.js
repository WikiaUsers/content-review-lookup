/********************************************************************************
This is a version of w:c:dev:AjaxRC, with several options already defined. 
This allows one to import the 'full' AjaxRC into their wiki without having to
set any customization options. This takes up less space in one's JS file, too.
You are free to import this anywhere you want. You can do so through one of the
following codes:
-----------------------------------------------------------------------------
importArticles({
    type: 'script',
    articles: [
    'u:witherverse:MediaWiki:AjaxRC.js'
  ]
});
-----------------------------------------------------------------------------
importArticle({
  type: 'script',
  article: "u:witherverse:MediaWiki:AjaxRC.js"
})
-----------------------------------------------------------------------------
importScriptPage('MediaWiki:AjaxRC.js', 'witherverse');
-----------------------------------------------------------------------------
importScriptURI("https://witherverse.wikia.com/wiki/MediaWiki:AjaxRC.js");
-----------------------------------------------------------------------------
$.getScript("https://witherverse.wikia.com/wiki/MediaWiki:AjaxRC.js");
-----------------------------------------------------------------------------
It must be in MediaWiki:Common.js or MediaWiki:Wikia.js to work.
Importing it in another JS file and importing that file elsewhere is not
recommended.


COMPATIBLE WITH THE FOLLOWING DEV WIKI SCRIPTS
# ListFiles (sitewide and personal)

FORMERLY COMPATIBLE WITH
# RevealAnonIP
# HighlightUsers

The features regarding these scripts have been disabled as they broke other
JavaScript addons.

MISC. FEATURES
# Detects if ListFiles is present on other pages and enables AjaxRC on them
# Auto-refresh all Forum pages, talk pages, Forums and Message Walls
********************************************************************************/
 
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Log",
    "Special:Images",
    "Special:ListFiles",
    "Special:Contributions",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:DoubleRedirects",
    "Special:WhatLinksHere",
    "Special:Categories",
    "Special:Videos",
    "Special:Watchlist",
    "Special:LonelyPages",
    "Special:BrokenRedirects",
    "Special:DeadendPages",
    "Special:Disambiguation",
    "Special:Withoutimages",
    //"Project:ListFiles", See below
    "Blog:Recent posts"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';
/* seems to break other JavaScript - disabled to prevent bugs after installation
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain = [RevealAnonIP.reveal];
window.ajaxCallAgain.push(highlightUsers);*/

if($("#ListFiles-container").length > 0 ||
   //Prevent redundant adding of Project:ListFiles to ajaxPages array
   //---------------------------------------------------------------
   //If user is on any talk/Forum namespace or Message Wall
   wgNamespaceNumber == 110 || 
   wgNamespaceNumber == 111 ||
   wgNamespaceNumber == 3 ||
   wgNamespaceNumber == 1 ||
   wgNamespaceNumber == 5 ||
   wgNamespaceNumber == 7 ||
   wgNamespaceNumber == 9 ||
   wgNamespaceNumber == 11 ||
   wgNamespaceNumber == 13 ||
   wgNamespaceNumber == 15 ||
   wgNamespaceNumber == 503 ||
   wgNamespaceNumber == 829 ||
   wgNamespaceNumber == 1200 ||
   wgNamespaceNumber == 1201 ||
   wgNamespaceNumber == 2000 ||
   wgNamespaceNumber == 2001)
{window.ajaxPages.push(wgPageName);}


importScriptPage('MediaWiki:AjaxRC.js', 'dev');