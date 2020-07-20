/* Any JavaScript here will be loaded for all users on every page load. */
// <source lang="JavaScript">
 
// Test if an Element has a Certain Class
// Description: Uses regular expressions and caching for better performance.
// Maintainers: [[wikipedia:User:Mike Dillon]], [[wikipedia:User:R. Koot]], [[wikipedia:User:SG]]
 
var hasClass = ( function() {
	var reCache = {};
	return function( element, className ) {
		return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
	};
})();
 
// END Test if an Element has a Certain Class
 
// </source>