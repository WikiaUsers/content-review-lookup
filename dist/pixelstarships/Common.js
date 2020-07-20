/* Any JavaScript here will be loaded for all users on every page load. */

/* Articles are interwiki links so that other wikis can use them. */
articles = [
    'u:spottra:MediaWiki:Common.js/Storage.js',
    'u:spottra:MediaWiki:Common.js/Numeral.js',
    'u:dev:ExtendedNavigation/code.js',
    'u:clashroyale:MediaWiki:Common.js/KDcollapsibleTables.js',
    'u:clashofclans:MediaWiki:Common.js/Sliders.js',
    'u:boombeach:MediaWiki:Common.js/calc.js',
    'u:boombeach:MediaWiki:Common.js/Protection.js'
];
 
// Use Wikia's importArticles() function to load JavaScript files
importArticles({
    type: 'script',
    articles: articles
});

/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 *
 * Element.prototypes added based on code by Om Shankar via StackOverflow.
 */
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] :
            (reCache[className] = new RegExp( "(?:\\s|^)" + className +
            "(?:\\s|$)"))).test(element.className);
        };
})();
 
Element.prototype.hasClassName = function(name) {
    return hasClass(this, name);
};
 
Element.prototype.addClassName = function(name) {
    if (!this.hasClassName(name)) {
        this.className = this.className ? [this.className, name].join(' ') : name;
    }
};
 
Element.prototype.removeClassName = function(name) {
    if (this.hasClassName(name)) {
        var c = this.className;
        this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "").trim();
    }
};
 
/* For internal compatibility -- older defined method, now uses new method */
function hasClassTest(element, className) {
   return hasClass(element, className);
}

$(function () {
	var myElement = document.getElementById('mw-PixelStarships-AutomatedStatistics');
	myElement.innerHTML = 'Template:Automated Statistics';
}());