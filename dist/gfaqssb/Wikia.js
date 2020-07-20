// RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};
 
// Imports
importArticles({
    type: "script",
    articles: [
         'u:rhythmheaven:MediaWiki:Wikia.js/editCount.js',
         'u:cjrichards-and-applemasterexpert:MediaWiki:Nuke/code.js',
         'u:cjrichards-and-applemasterexpert:MediaWiki:MessageWallBlock/code.js'
         ]

});

 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');
 
// **************************************************************
// RevealAnonIP settings -- MUST be before the script is imported
// **************************************************************
 
window.RevealAnonIP = {
    permissions : ["rollback", "sysop", "bureaucrat", "staff", "helper", "vstf"]
};
 
// ****************************
// End of RevealAnonIP settings 
//