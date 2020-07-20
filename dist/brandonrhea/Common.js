/** New and improved, downsized version 
* Reports of functionality loss or bugs should go to User talk:TK-999
* Active from 2012-04-25 (April 25, 2012)
**/

importArticles({
	type: "script",
	articles: [
		"u:dev:AjaxRC/code.js",
		"u:dev:ShowHide/code.js",
	]
});
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log"];

/**
 * Adds Template:Information to the information box on Special:Upload
 * @author Jack Phoenix <jack@countervandalism.net>
 * @date June 7, 2010
 * @modified TK-999 2012-04-25
 **/
 
if( wgCanonicalSpecialPageName == 'Upload' ) {
$(function(){ $('#wpUploadDescription').val('\=\=Summary\=\=\n'); });
}
 
/** IRC webchat
*@source http://vstf.wikia.com/wiki/MediaWiki:Common.js
*@contributors http://vstf.wikia.com/wiki/MediaWiki:Common.js?action=history
 **/

function onloadhookcustom() {
  var replace = document.getElementById("irc-portal");
  if (replace != null) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=swfanon&uio=OT10cnVlJjExPTQxJjEyPXRydWUf7" width="630" height="550"></iframe>';
     if (window.attachEvent) { window.attachEvent("onbeforeunload",confirmexitjrchat); }
    else { window.onbeforeunload = confirmexitjrchat; }
 
  }
 
}

window.onload = onloadhookcustom();

// Dies Irae
$(function(){
var bomb = document.getElementById("exitus_lethalis");
if (bomb) { document.getElementById("WikiaArticleComments").style.display="none"; document.getElementsByClassName("article-comm-form").removeAttribute("action"); }});