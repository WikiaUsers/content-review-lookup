/* Any JavaScript here will be loaded for all users on every page load. */
/* Chatango Loader */
function onloadhookcustom() {
  var replace = document.getElementById("Chatango");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<iframe name="chatango" src="http://cerberus-age-wiki.chatango.com/?m&js" style="height:500px;width:100%;" seamless frameborder="0" scrolling="no"><a href="http://cerberus-age-wiki.chatango.com/?m">Visit the Wiki Chatroom</a></iframe>';
  }
}


if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}
/* End Chatango Loader */