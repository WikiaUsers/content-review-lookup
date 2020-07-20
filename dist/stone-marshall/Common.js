/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready( function () {
   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
   $('span.insertusername').each(function() {
       $(this).text(wgUserName);
   });
});
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});