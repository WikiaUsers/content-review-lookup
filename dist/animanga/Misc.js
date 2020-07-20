/*<pre>*/

//////////////////////////////////
// Misc. JavaScript functions   //
//////////////////////////////////

//Grabs data from query.
//From [[User:Dantman/monobook.js]] from [[w:User:Essjay/monobook.js]]
function queryString(key, dataOnly) {
	var re = RegExp('[&?]'+key+'=([^&]*)');
	var matches;
	matches = re.exec(document.location);
	if( !matches ) matches = re.exec(document.location);
	if( matches ) if( matches.length > 1 ) return decodeURI(matches[1]);
	return ( dataOnly ? '' : null );
};

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * From: Wikipedia:MediaWiki:Common.js
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/*</pre>*/