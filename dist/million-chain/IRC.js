/*** Slightly modified code from http://dev.wikia.com/wiki/Freenode_IRC ***/
function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null !== replace) {
		replace.innerHTML='<iframe src="https://qchat.rizon.net/?channels=#millionchain" width="800" height="600"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);