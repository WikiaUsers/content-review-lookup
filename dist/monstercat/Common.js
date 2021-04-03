/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

//* Countdown timer */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/* WAM Score */
window.railWAM = {
    logPage:"Project:WAM Log"
};

//*Category Rename */
importArticles({
	type: "script",
	articles: [
        "u:dev:MediaWiki:CategoryRenameAuto-update/code.js",
    ]
	
});