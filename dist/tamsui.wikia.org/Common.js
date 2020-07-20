/* 此處的JavaScript將載入於所有使用者每一個頁面。 */
function include(lang,s) {
  document.write("<script type=\"text/javascript\" src=\"http://"+lang+".wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

include("ja","User:Tommy6/js/funp.js");