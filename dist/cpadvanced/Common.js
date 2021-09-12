/* Any JavaScript here will be loaded for all users on every page load. */
/* usernames */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
 });
 /* plok every hour */
 importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/plok.js",
	]
});