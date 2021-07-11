/* Any JavaScript here will be loaded for all users on every page load. */
window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 because you have $1.'
};

importArticles({
    type: "script",
    articles: [
        "u:runescape:MediaWiki:Common.js/WLH_edit.js",
    ]
});

// Alert contributors when they are editing with their bot flag set
if (mediaWiki.config.get("wgAction") == "edit" && mediaWiki.config.get("wgUserGroups").indexOf("bot") != -1){
   $("#EditPageHeader").after('<div id="botWarning" style="background-color: darkred; color:silver; display:block; padding: 5px 0; text-align: center; font-weight: bold; font-size: 110%">NOTE: You are currently editing with your bot flag set!!</div>');
}