/* Any JavaScript here will be loaded for all users on every page load. */

function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="280" height="600" id="obj_1282908748578"><param name="movie" value="http://atomipedia-shoutbox.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1282908748578&a=666666&b=51&c=006666&d=009900&e=996666&f=50&g=660000&h=CCFFCC&k=000000&l=999999&m=FFFF66&n=666600&q=0066CC&r=58&s=1&w=0"/><embed id="emb_1282908748578" src="http://atomipedia-shoutbox.chatango.com/group" width="280" height="600" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1282908748578&a=666666&b=51&c=006666&d=009900&e=996666&f=50&g=660000&h=CCFFCC&k=000000&l=999999&m=FFFF66&n=666600&q=0066CC&r=58&s=1&w=0"></embed></object><br>[ <a href="http://atomipedia-shoutbox.chatango.com/clonegroup?ts=1282908748578">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1282908748578">Start New</a> | <a href="http://atomipedia-shoutbox.chatango.com">Full Size</a> ]';
  }
}


if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}