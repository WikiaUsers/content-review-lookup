/**
* Create a navbar
*
* @class MononavParser
*/
function MononavParser ( mw ) {
'use strict';
var config = mw.config, parsedText;
 
/**
* Auxiliary function that parses the input wikitext using the API
*
* @private
* @param {String} The wikitext to be parsed
*/
 
function wikitext( text ) {
var xhr = new XMLHttpRequest();
 
xhr.open( 'POST', config.get( 'wgServer' ) + '/api.php', false );
xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
xhr.onload = function () {
parsedText = JSON.parse( this.responseText ).parse.text['*'];
};
 
xhr.send( 'action=parse&format=json&text=' + encodeURIComponent( text ) );
}
 
/**
* Create the navigation using a config page
*
* @param {String} The config page's textual content
*/
 
this.parse = function ( data ) {
var i, j, k, lines = data.split( '\n' ), mainNav,
nav, subNav, subNavBar, dropDown, dropDownLink;
 
mainNav = document.createElement( 'ul' );
mainNav.id = 'site-navigation';
 
for ( i = 0, j = 0, k = 0; i < lines.length; i++ ) {
if ( lines[i].indexOf( '*' ) === 0 &&
lines[i].indexOf( '**' ) !== 0
) {
subNav = document.createElement( 'li' );
subNav.id = 'subnav-' + ( j++ );
subNav.className = 'subnav';
wikitext( lines[i].split( '*' )[1] );
subNav.innerHTML = parsedText;
mainNav.appendChild( subNav );
} else if ( lines[i].indexOf( '**' ) === 0 &&
lines[i].indexOf( '***' ) !== 0
) {
wikitext( lines[i].split( '**' )[1] );
 
subNavBar = document.createElement( 'li' );
subNavBar.id = 'subnavbar-' + ( k++ );
subNavBar.className = 'subnavbar';
subNavBar.innerHTML = parsedText;
 
mainNav.getElementsByClassName( 'subnav' )[j-1].appendChild( subNavBar );
} else if ( lines[i].indexOf( '***' ) === 0 ) {
wikitext( lines[i].split( '***' )[1] );
if (
mainNav.getElementsClassName( 'dropdown' ).length === 0
) {
dropDown = document.createElement( 'ul' );
dropDown.id = 'dropdown-' + (k++);
dropDown.className = 'dropdown';
mainNav.getElementsByClassName( 'subnavbar' )[k-1].appendChild ( dropDown );
}
 
dropDownLink = document.createElement( 'li' );
dropDownLink.className = 'dropdown-link';
dropDownLink.innerHTML = parsedText;
mainNav.getElementsByClassName( 'dropdown' )[k-1].appendChild( dropDownLink );
}
}
 
nav = document.createElement( 'nav' );
nav.id = 'navigation-wrapper';
nav.appendChild( mainNav );
document.body.insertBefore( nav, document.getElementById( 'globalWrapper' ) );
};
}
 
( function ( mw ) {
'use strict';
var config = mw.config,
parser = new MononavParser( mw ),
xhr = new XMLHttpRequest();
 
xhr.open( 'GET', config.get( 'wgServer' ) + config.get( 'wgScript' ) +
'?title=MediaWiki:Mononav&action=raw' );
xhr.onload = function () {
parser.parse( this.responseText );
};
xhr.send();
} ( mediaWiki ) );