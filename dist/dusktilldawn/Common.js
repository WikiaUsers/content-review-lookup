/* Any JavaScript here will be loaded for all users on every page load. */

 
/* UserName Replace - Credit to dev.wikia.com */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* Show/Hide - Credit to LiamJaco1998lfc */
var ShowHideConfig = { 
	autoCollapse: 0,
	en: {
		show: "show",
		hide: "hide",
		showAll: "show all",
		hideAll: "hide all"
	}
};
importArticle( {
	type: 'script',
	article: [
		'w:c:dev:ShowHide/code.js'
	]
} );
function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
}

/* Facebook Like Box - Credit to dev.wikia.com */
importArticle({
  type: 'script',
  article: 'u:dev:FacebookLikeBox/code.js'
});