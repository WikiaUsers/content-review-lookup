importArticles({
    type: "script",
    articles: [
        'u:dev:ReferencePopups/code.js',
        'u:dev:ReferencePopups/custom.js',
        'u:dev:HeaderLinks/code.js',
        'u:dev:VisualSpellCheck/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:TwittWidget/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:AjaxEmoticons/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:MiniComplete/code.js',
        'u:dev:GalleryButtonCustomText/code.js',
        'u:dev:View_Source/code.js',
        'u:dev:CacheCheck/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:DisableArchiveEdit/code.js', /* Discourage/disable the editing of talk page archives */
        'u:dev:Countdown/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:SkinSwitchButton/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:ArchiveTool/code.js',
        'u:dev:DisableArchiveEdit/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:FixWantedFiles/code.js',
        'u:dev:RevealAnonIP/code.js',
    ]
});
 
//</pre>
 
/* Standard edit summaries */
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'MediaWiki:Stdsummaries'
};
importArticle({type: 'script', article:'w:dev:Standard_Edit_Summary/code.js'});