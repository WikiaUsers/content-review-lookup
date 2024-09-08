/* IRC webchat */
function onloadhookcustom() {
  var replace = document.getElementById("chat");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net?channels=%23spongebobia&uio=MTY9bnVsbAe6" width="600" height="550"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;
 
  }
  //alert(document.getElementById("chat").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);