/* 此處的JavaScript將載入於所有用戶每一個頁面。 */
function include(lang,s) {
  document.write("<script type=\"text/javascript\" src=\"http://"+lang+".wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

include("ja","User:Tommy6/js/funp.js");



importArticles({
    type: "script",
    articles: [
        "u:dev:AjaxRC/code.js"
    ]
});

// Ajax auto-refresh

var ajaxPages = ['特殊:最近更改','特殊:WikiActivity','特殊:用戶貢獻'];
var AjaxRCRefreshText = 'Auto-refresh';
// END Ajax auto-refresh