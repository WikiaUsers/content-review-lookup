/* Any JavaScript here will be loaded for all users on every page load. */

/* Countdown - Credit to LiamJaco1998lfc */
importArticles({ type: "script", articles: [ "w:c:dev:Countdown/code.js" ] });

/* Usertags */
window.UserTagsJS = {
	modules: {},
	tags: {
		fanofgallowshill: { u: 'Fan of Gallows Hill', order: 100 },
                writer: { u: 'Writer', order: 101 }
	}
};
UserTagsJS.modules.custom = {
	'LiamJaco1998lfc': ['fanofgallowshill', 'writer'],
        'Icedancer487': ['writer'],
        'Cori11': ['writer'],
        'OldOneX': ['writer'],
        'VampireFan1996': ['writer'] // NOTE: order of list here does NOT matter
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
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

/* UserName Replace - Credit to dev.wikia.com */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* Facebook Widget - Credit to dev.wikia.com */
importArticle({
  type: 'script',
  article: 'u:dev:FacebookLikeBox/code.js'
});