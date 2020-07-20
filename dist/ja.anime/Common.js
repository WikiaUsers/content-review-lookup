function include(lang,s) {
  document.write("<script type=\"text/javascript\" src=\"http://"+lang+".wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

include("ja","利用者:Tommy6/js/hatenastar.js");
include("ja","利用者:Tommy6/js/hatenawithcounter.js");
include("ja","利用者:Tommy6/js/livedoorclipwithcounter.js");
include("ja","利用者:Tommy6/js/yahoobookmarkwithcounter.js");
include("ja","利用者:Tommy6/js/buzzurlwithcounter.js");