/* IRC Chat */
function onloadhookcustom() {
  var replace = document.getElementById("chat");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=##vegadark" width="990" height="550"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("chat").innerHTML);

}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);

/* IRC Java Chat */
function onloadhookcustom() {
  var replace = document.getElementById("yugichat");
  if (null != replace) {

    replace.innerHTML='<applet width="990" height="550" code="IRCApplet.class" archive="irc.jar,pixx.jar"  codebase="http://java.freenode.net/freenode/pjirc"><param name="nick" value="Yugipedista"/><param name="alternatenick" value="Yugi???"/><param name="name" value="Chat Yu-Gi-Oh!"/><param name="host" value="irc.freenode.net"/><param name="gui" value="pixx"/><param name="command1" value="/join ##vegadark"/><param name="command2" value="/clear"/><param name="quitmessage" value="¡HORA DEL DUELO!"/><param name="pixx:timestamp" value="true"/><param name="pixx:nickfield" value="true"/><param name="style:highlightlinks" value="true"/><param name="pixx:setfontonstyle" value="true"/><param name="pixx:styleselector" value="true"/><param name="style:link" value=":link: http://img148.imageshack.us/img148/6707/copyoflinkkm3.png)"> <h1>No java support</h1><p><font color="green">Lo sentimos, pero necesitas Java 1.4.x-activado en tu navegador para usar el Chat de Yu-Gi-Oh!</font></p></applet>';
  }
}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);