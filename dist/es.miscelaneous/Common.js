
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="250" height="360" id="obj_1335044975772"><param name="movie" value="http://miscelaneouswiki.chatango.com/group"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1335044975772&a=666666&b=100&c=FFFFFF&d=FFFFFF&k=666666&l=999999&p=10&s=1"/><embed id="emb_1335044975772" src="http://miscelaneouswiki.chatango.com/group" width="250" height="360" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1335044975772&a=666666&b=100&c=FFFFFF&d=FFFFFF&k=666666&l=999999&p=10&s=1"></embed></object><br>[ <a href="http://miscelaneouswiki.chatango.com/clonegroup?ts=1335044975772">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1335044975772">Start New</a> | <a href="http://miscelaneouswiki.chatango.com">Full Size</a> ]';
  }
}


if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}