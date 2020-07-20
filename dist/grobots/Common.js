/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/*Adds a "Refresh" button to the edit menu. Purges the page. Copied from http://dev.wikia.com/wiki/PurgeButton */
importScriptPage('PurgeButton/code.js', 'dev');

/* Import Show-Hide JS */
importScriptPage('ShowHide/code.js', 'dev');