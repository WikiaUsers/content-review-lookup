/* Any JavaScript here will be loaded for all users on every page load. */

function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="750" height="500" id="obj_1295013029473"><param name="movie" value="http://superpoweredacademy.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1295013029473&v=0&w=0"/><embed id="emb_1295013029473" src="http://superpoweredacademy.chatango.com/group" width="950" height="500" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1295013029473&v=0&w=0"></embed></object><br>[ <a href="http://superpoweredacademy.chatango.com/clonegroup?ts=1295013029473">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1295013029473">Start New</a> | <a href="http://superpoweredacademy.chatango.com">Full Size</a> ]';
  }
}


if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}