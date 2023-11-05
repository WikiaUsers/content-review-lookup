// 08:17, October 18, 2011 (UTC)
// <source lang="JavaScript">
/* add contribs to user menu - 2/1/11 */
 
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);
 
// </source>

// Opens chat in a new window for homepage 
$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});


/* Some Imports */
importArticles({
    type: "script",
    articles: [
	"MediaWiki:Wikia.js/editCount.js" // Add EditCount tab to user namespace
    ]
});