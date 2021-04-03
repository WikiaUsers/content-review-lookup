/**
* Append an image to a masthead info piece
* @param {number} index Which info piece to append to (first = 0)
* @param {string} image An URL pointing to the image
* @param {string|number} height (optional) Height of the image
*/
function appendMastheadImage( index, image, height ) {
'use strict';
/**
* Logging function
* @author Kangaroopower
*/
var log = ( window.console && function () {
var args = Array.prototype.slice.call( arguments );
args.unshift( 'ChatObj: ' );
return window.console.log.apply( window.console, args );
}) || function () {};
 
try {
if ( image.indexOf( 'http' ) !== 0 ) {
throw new TypeError( 'Please use a http(s) URL for the image' );
}
var node = document.createElement( 'img' );
node.src = image;
node.height = height || '300';
node.alt = '';
document.getElementById( 'UserProfileMasthead' ).getElementsByClassName( 'details' )[0].getElementsByTagName( 'li' )[index].appendChild( node );
} catch ( e if e instanceof TypeError ) {
log( 'Wrong appendMastheadImage parameter: ' + e.message );
} catch ( e if e instanceof ReferenceError ) {
log( 'The element to append the image to does not exist in the masthead: ' + e.message );
}
}
 
appendMastheadImage( 2, 'https://images.wikia.nocookie.net/__cb20140604012941/potcoplayers/images/d/df/1386675954373.gif' );