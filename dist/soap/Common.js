/* Any JavaScript here will be loaded for all users on every page load. */

// Report Forms
//importScript("MediaWiki:ReportV.js");
//importScript("MediaWiki:ReportS.js");
//importScript("MediaWiki:ReportF.js");
//importScript("MediaWiki:ReportP.js");
importScript("MediaWiki:Reports.js");

/* IRC webchat */
function onloadhookcustom() {
  var replace = document.getElementById("chat");
  if (null != replace) {
    replace.innerHTML='<iframe src="https://webchat.freenode.net/?channels=wikia-vstf&uio=OT10cnVlJjExPTQxJjEyPXRydWUf7" width="630" height="550"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("chat").innerHTML);
}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);