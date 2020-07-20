function onloadhookcustom() {
	if( skin == 'oasis' ) {
                 var replace = document.getElementById("chat");
                    if (null != replace) {
                      replace.innerHTML='<iframe src="http://webchat.freenode.net?channels=wikia-mermaidmelody-es" width="670" height="550"></iframe>';
                    if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
                    else window.onbeforeunload = confirmexitjrchat;

                 }
        } else {
                 var replace = document.getElementById("chat");
                    if (null != replace) {
                      replace.innerHTML='<iframe src="http://webchat.freenode.net?channels=wikia-mermaidmelody-es" width="700" height="550"></iframe>';
                    if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
                    else window.onbeforeunload = confirmexitjrchat;

                    }
        }
  //alert(document.getElementById("chat").innerHTML);

}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);