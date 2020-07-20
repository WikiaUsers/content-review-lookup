///////////////////////////////////////////////////////////////////////////
/*************************************************************************/
/***************************** Miscellaneous *****************************/
/*************************************************************************/
///////////////////////////////////////////////////////////////////////////
/* Replaces {{USERNAME}} with the name of the user browsing the page */
function UserNameReplace() {
if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
$("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);//End {{USERNAME}} replacement*/
/* Imports */
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});