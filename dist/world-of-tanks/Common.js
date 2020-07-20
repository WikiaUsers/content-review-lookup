/* Any JavaScript here will be loaded for all users on every page load. */
function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe width="600" height="500" scrolling="no" src="http://widget.mibbit.com?channel=%23wotwikia&server=irc.mibbit.net"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);


importArticles({
	type:'script',
	articles: [
                'MediaWiki:User_Tags.js',
		'w:c:dev:UserTags/code.js'
	]
});