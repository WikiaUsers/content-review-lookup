var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/// Title Rewrite ///
function showEras(className) {
    if (typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;

    var titleDiv = document.getElementById(className);

    if (titleDiv === null || titleDiv === undefined)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}

// Chat statement
var statement = 'Before entering, please read the <a href="http://mario.wikia.com/wiki/Help:Chat">help page for chat</a>.';

$(function chatStatement() {
    if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != statement) {
        $('p.chat-name').html(statement);
        setTimeout(chatStatement, 1);
    }
});

window.AjaxRCRefreshText = 'Automatically refresh this page';
window.AjaxRCRefreshHoverText = 'Enable auto-refreshing page loads';
/*################################/
/##### SeeMoreActivityButton #####/
/################################*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
    ]
});