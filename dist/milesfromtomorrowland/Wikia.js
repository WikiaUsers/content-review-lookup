/* Any JavaScript here will be loaded for all users on every page load. */

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
/// Title Rewrite ///

function showEras(className)
{
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;

    var titleDiv = document.getElementById(className);

    if(titleDiv == null || titleDiv == undefined)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}
// END JavaScript title rewrite

/*Keep favicon as correct PF logo instead of reverting to Wikia logo*/

document.write('<link REL="shortcut icon" HREF="/images/6/64/Favicon.ico" />')

// Chat statement
var statement = 'Before joining, please read the <a href="http://milesfromtomorrowland.wikia.com/wiki/Miles_From_Tomorrowland_Wiki:Chat">chat rules</a>.'

function chatStatement() {
    if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != statement) {
        $('p.chat-name').html(statement);
        setTimeout(chatStatement, 1);
    }
};

$(chatStatement);

// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
importScript('MediaWiki:Wikia.js/accountNavigation.js');
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin


//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://milesfromtomorrowland.wikia.com/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Edit count</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});