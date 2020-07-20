/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
   if ((typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace) || wgUserName == null)
      return;
 
   $('span.insertusername').html(wgUserName);
});

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});