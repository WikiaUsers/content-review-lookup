/* Any JavaScript here will be loaded for all users on every page load. */
//USERNAME template is by Annabeth And Percy. Kudos!
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

//This is the Medals module. Don't touch it! - Green Galaxy
//Made by Kopcap94. Check them out at http://dev.wikia.com/wiki/User:Kopcap94

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});
/*End of the Medal import*/