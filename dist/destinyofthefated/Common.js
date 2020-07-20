function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="500" height="426" id="obj_1269477335322"><param name="movie" value="http://destinyofthefated.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1276490265742&v=0&w=0"/><embed id="emb_1276490265742" src="http://destinyofthefated.chatango.com/group" width="500" height="426" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1276490265742&v=0&w=0"></embed></object><br>[ <a href="http://destinyofthefated.chatango.com/clonegroup?ts=1276490265742">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1276490265742">Start New</a> | <a href="http://destinyofthefated.chatango.com">Full Size</a> ]';
  }
}


if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}