/* Any JavaScript here will be loaded for all users on every page load. */

/* Articles imported from other wikis */
importArticles({
    type: 'script',
    articles: [
        'u:boombeach:MediaWiki:Common.js/Protection.js'
   ]
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