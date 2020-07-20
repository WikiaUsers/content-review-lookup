/* IRC webchat */
function onloadhookcustom() {
  var replace = document.getElementById("chat");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net?channels=wlb&uio=ND10cnVlJjExPTIxNSYxNT10cnVlf5" width="630" height="550"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;
 
  }
  //alert(document.getElementById("chat").innerHTML);
 
}