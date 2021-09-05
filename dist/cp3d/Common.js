/* Any JavaScript here will be loaded for all users on every page load. */

/* ====================================================================== *\
	# stuff taken from club penguin wiki, made by people smarter than me
\* ====================================================================== */

/* ====================================================================== *\
	# importArticles - import codes from other wiki pages
	# before adding, it's recommended to move the pages to a subpage of
	  Common.js
	# also, make sure that you separate each page from the
	  array with a comma (,)
\* ====================================================================== */

/* Plok floating across the screen every hour */
importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/plok.js",
	]
});

/* Visitor's name showing up on a user page */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
 });