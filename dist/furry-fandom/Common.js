/* Any JavaScript here will be loaded for all users on every page load. */
 
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
	"w:c:dev:UserTags/code.js",
	"w:c:dev:AjaxRC/code.js",
    ]
});

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();