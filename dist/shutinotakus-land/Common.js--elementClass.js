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
 
 
function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	 }
	return array;
 }
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};
 
 
function getElementsByName (name, root) {
 if (root == undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}
 
 
 function getText (e) {
	 if (e.textContent) return e.textContent;
	  else if (e.innerText) return e.innerText;
	  else return null;
  }
 
 function setText (e, t) {
	 if (e.textContent) e.textContent = t;
	  else if (e.innerText) e.innerText = t;
	  else { e.textContent = t; e.innerText = t; } // entrambi nulli, non si può discriminare
	 return;
  }
 
 function appendText (e, t) {
	 if (e.textContent) e.textContent += t;
	  else if (e.innerText) e.innerText += t;
	  else { e.textContent = t; e.innerText = t; }
	 return;
  }