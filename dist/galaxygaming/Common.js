/* Any JavaScript here will be loaded for all users on every page load. */
 
// Report Forms
importScript("MediaWiki:ReportV.js");
importScript("MediaWiki:ReportS.js");
importScript("MediaWiki:ReportF.js");
 
/* IRC webchat */
function onloadhookcustom() {
  var replace = document.getElementById("chat");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.esper.net/?nick=GGWebuser...&channels=galaxygaming&prompt=0" width="700" height="400"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;
 
  }
  //alert(document.getElementById("chat").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);