/* 此处的JavaScript将载入于所有用户每一个页面。 */
function include(lang,s) {
  document.write("<script type=\"text/javascript\" src=\"http://"+lang+".wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

include("ja","User:Tommy6/js/funp.js");