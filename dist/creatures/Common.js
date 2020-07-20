/* Any JavaScript here will be loaded for all users on every page load. */

function confirmexitjrchat() {
  return "Are you sure you want to exit JRChat?";
}

function onloadhookcustom() {
  var replace = document.getElementById("JRChatReplace");
  if (null != replace) {
    replace.innerHTML='<applet codebase="http://lummoxjr.byondhome.com/chat" code="JRchatClient" align="baseline" width="100%" height="400"><param name="room" value="Creatures"></applet>';
    if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("JRChatReplace").innerHTML);
}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);