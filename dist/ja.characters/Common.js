function include(s) {
  document.write("<script type=\"text/javascript\" src=\"http://ja.wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

function localinclude(s) {
  document.write("<script type=\"text/javascript\" src=\"http://ja.characters.wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

localinclude("User:Zeeksphere/js/yomerukana.js");
include("User:Tommy6/js/hatenawithcounter.js");
include("User:Tommy6/js/livedoorclipwithcounter.js");
include("User:Tommy6/js/yahoobookmarkwithcounter.js");
include("User:Tommy6/js/buzzurlwithcounter.js");
importScriptPage('ShowHide/code.js', 'dev');