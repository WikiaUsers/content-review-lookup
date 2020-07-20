/* Any JavaScript here will be loaded for all users on every page load. */

var ShowHideConfig = { 
    brackets: '[[]]'
};
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev'); //for examples on [[CollapsibleInfobox]]

var archiveListTemplate = 'ArchiveList'; //The name of the template that will be placed on top of the talk page, linking to the different archives
var archivePageTemplate = 'ArchivePage'; //The name of the template that will be placed on top of the archive page, explaining that it is an archive
importScriptPage('ArchiveTool/code.js', 'dev');

importStylesheet("Template:Ambox/code.css");

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');

/* Spoiler Alert */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');