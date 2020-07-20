/* Any JavaScript here will be loaded for all users on every page load. */
var MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 because you have $1.'
};

importArticles({
    type: "script",
    articles: [
        "u:runescape:MediaWiki:Common.js/WLH_edit.js",
        "u:onceuponatime:MediaWiki:Common.js/Summaries.js",
        "u:dev:PurgeButton/code.js",
        "u:dev:MessageBlock/code.js",
        "u:dev:FileUsageAuto-update/code.js",
        "u:dev:AllPagesHideRedirect/code.js",
        "u:dev:FixMultipleUpload/code.js",
        "u:dev:WallGreetingButton/code.js",
        "u:dev:ShowHide/code.js",
        "u:dev:BackToTopButton/code.js",
        "u:dev:ReferencePopups/code.js",
        "u:dev:FloatingToc/code.js"
    ]
});

// Alert contributors when they are editing with their bot flag set
if (mediaWiki.config.get("wgAction") == "edit" && mediaWiki.config.get("wgUserGroups").indexOf("bot") != -1){
   $("#EditPageHeader").after('<div id="botWarning" style="background-color: darkred; color:silver; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">NOTE: You are currently editing with your bot flag set!!</div>')
}