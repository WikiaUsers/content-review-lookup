/* Any JavaScript here will be loaded for all users on every page load. */
//Imports
importScriptPage('PowerPageMaker/code.js', 'dev');
importScriptPage('Voice_Output/code.js', 'dev');
importScriptPage("PageRenameAuto-update/code.js", "dev");
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('WallGreetingButton/code.js', 'dev');
importScriptPage("PageMakerPro/code.js", "dev");
/*** Auto-refreshing recent changes ***/ 
AjaxRCRefreshText = 'Auto-refresh'; AjaxRCRefreshHoverText = 'Automatically refresh the page'; ajaxPages = ["Special:RecentChanges","Special:WikiActivity""];
//End
importArticles({
    type: "script",
    articles: [
        "w:c:dev:AnswersAskAutocomplete/code.js",
	"u:dev:DynamicImages/code.js",
        "u:dev:ListFiles/code.js",
        'u:dev:HeaderLinks/code.js',
// ...
		'u:dev:DisplayClock/code.js',
		// ...
        "w:c:dev:Voice_Dictation/voice.js",
        "w:c:dev:RevealAnonIP/code.js",
    ]
});
//Archive Tool
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivepage',
   archiveSubpage: 'Archive',
   userLang: true
};
importScriptPage('ArchiveTool/code.js', 'dev');