/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="300" height="400" id="obj_0010000035720404777"><param name="movie" value="http://k-on-wiki.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=0010000035720404777&a=000000&b=60&c=FFFFFF&d=FFFFFF&f=50&l=999999&q=000000&r=100&s=1&aa=1"/><embed id="emb_0010000035720404777" src="http://k-on-wiki.chatango.com/group" width="420" height="400" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=0010000035720404777&a=000000&b=60&c=FFFFFF&d=FFFFFF&f=50&l=999999&q=000000&r=100&s=1&aa=1"></embed></object>';
  }
}


if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}