//From dev.wikia.com/wiki/Freenode_IRC
function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null !== replace) {
		replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=wikia-animaljam" width="450" height="400"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);