//=============================================================================
// IRC support
// from http://dev.wikia.com/wiki/Freenode_IRC#Embedding_Wikia.27s_IRC_gateway
//=============================================================================
function onloadhookcustomirc() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=wikia-berserk" width="450" height="400"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustomirc,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustomirc);