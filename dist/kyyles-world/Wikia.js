/**
* Append a new element to the oasis contribute button
* @param {string} page The wiki page to link to
* @param {string} text The text of the element
* @param {string} id (optional) Element ID
*/
function appendToContributeButton( page, text, id ) {
'use strict';
// Sanity check parameters
if ( typeof page !== 'string'||
typeof text !== 'string' ) {
throw new Error( 'Bad call to appendToContributeButton' );
}
// create and append the element
var elem = document.createElement( 'a' ), wrapper;
elem.href = '/wiki/' + page;
elem.textContent = text;
 
if ( typeof id === 'string' ) {
elem.id = id;
elem.setAttribute( 'data-id', id );
}
 
wrapper = document.createElement( 'li' );
wrapper.appendChild( elem );
 
document.getElementsByClassName( 'contribute' )[0].getElementsByClassName( 'WikiaMenuElement' )[0].appendChild( wrapper );
}
 
appendToContributeButton( 'Special:MultipleUpload', 'Upload lots of pics!', 'multipleupload' );