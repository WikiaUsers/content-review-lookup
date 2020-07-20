/* Any JavaScript here will be loaded for all users on every page load. */

/* USERNAME template. Credit to Creepypasta Wiki.*/
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* Ajax-refresh button config options */
ajaxPages = ["Special:Contributions","Special:Log","Special:RecentChanges","Special:WikiActivity","Special:Watchlist"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
/* End */

/* SocialMediaButtons */
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark"
};
/* End  SocialMediaButtons */

importArticles({
    type: "script",
    articles: [
	"w:c:dev:AjaxRC/code.js",			// Auto-refresh
        "w:c:dev:SocialIcons/code.js"			// Social Media Buttons 
    ]
});