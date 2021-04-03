/* Any JavaScript here will be loaded for all users on every page load. */

/*
    Replaces Template:USERNAME with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername() {
	$('.insertusername').html(wgUserName);
}

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');

importScriptPage('PurgeButton/code.js', 'dev');

importScriptPage('FixWantedFiles/code.js', 'dev');

importScriptPage('InactiveUsers/code.js', 'dev');

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/ben10fanfiction/images/3/3c/NoImageAvailable.png/revision/latest?cb=20140628133635';
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/ben10fanfiction/images/3/3c/NoImageAvailable.png/revision/latest?cb=20140628133635';