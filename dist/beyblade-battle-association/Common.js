importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:PageRenameAuto-update/code.js',
        'u:dev:AddRailModule/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:MediaWiki:RedirectManagement/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:MediaWiki:PageMakerPro/code.js',
        'u:dev:MediaWiki:PurgeButton/code.js',
        'u:dev:MediaWiki:DupImageList/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:SpoilerAlert/code.2.js',
            ]
});

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

/* SpoilerAlert config */
SpoilerAlert = {
  categories: "Spoiler",
}