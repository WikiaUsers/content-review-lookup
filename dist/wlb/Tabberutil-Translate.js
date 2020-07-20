/**
 * Prepend or append text to tabber(s)
 * @param {string} id The id of the element that contains the tabbers to be manipulated
 * @param {string} text The text to be appended or prepended
 * @param {boolean} isAppend (optional) Whether to append
 * By TK-999
 */
mw.util.addTabberText = function ( id, text, isAppend ) {
	'use strict';
	if ( typeof id !== 'string' ||
		typeof text !== 'string' ) {
		throw new Error( 'tabberutils: prependText expects string type mandatory parameters' );
	}
 
	var i, idNode = document.getElementById( id ), prepText, tabbers;
 
	if ( idNode === undefined || ( idNode.getElementsByClassName &&
		idNode.getElementsByClassName( 'tabbernav' ).length === 0
		) ) {
		return;
	}
 
	prepText = document.createElement( 'span' );
	prepText.className = 'tabber-intro';
	prepText.textContent = text;
 
	tabbers = idNode.getElementsByClassName( 'tabbernav' );
 
	if ( !isAppend ) {
		for ( i = 0; i < tabbers.length; i++ ) {
			idNode.getElementsByClassName( 'tabbernav' )[i].insertBefore( prepText, document.getElementsByClassName( 'tabbernav' )[i].childNodes[0] );
		}
	} else {
		for ( i = 0; i < tabbers.length; i++ ) {
			idNode.getElementsByClassName( 'tabbernav' )[i].appendChild( prepText );
		}
	}
}
 
/**
 * Create a line break in a tabber
 * @param {string} id The id of the element that contains the tabber(s)
 * @param {number} tabberIndex Which tabber to break in there (0 = first)
 * @param {array} whereToBreak Array of integers denoting 
 * the index of the element(s) before which the tabber is broken
 * @param {array} rowLabel (optional) Array of strings to display before each row
 */
mw.util.breakTabber = function ( id, tabberIndex, whereToBreak, rowLabel ) {
	'use strict';
	if ( typeof id !== 'string'
		|| typeof tabberIndex !== 'number'
		|| typeof whereToBreak !== 'object'
		|| typeof rowLabel !== 'object'
	) {
		throw new Error( 'tabberutils: consult the breakTabber docs with regards to params' );
	}
 
	var i, idNode = document.getElementById( id ), rowText, tabber;
	if ( idNode === undefined || ( idNode.getElementsByClassName &&
		idNode.getElementsByClassName( 'tabbernav' ).length === 0
		) ) {
		return;
	}
 
	tabber = idNode.getElementsByClassName( 'tabbernav' )[tabberIndex];
	rowLabel = ( rowLabel === undefined ? [] : rowLabel );
 
	for ( i = 0; i < whereToBreak.length; i++ ) {
		if ( tabber.childNodes.length <= whereToBreak ) {
			throw new Error( 'tabberutils: breakTabber received a ridiculously large whereToBreak value' );
		}
 
		if ( typeof whereToBreak[i] !== 'number' ) {
			throw new Error( 'tabberutils: breakTabber\'s whereToBreak param should be an array of integers' );
		}
		tabber.insertBefore( document.createElement( 'br' ), tabber.childNodes[whereToBreak[i]] );
 
		if ( typeof rowLabel[i] === 'string' ) {
			rowText = document.createElement( 'span' );
			rowText.textContent = rowLabel[i];
			tabber.insertBefore( rowText, tabber.childNodes[whereToBreak[i] + 1] );
		}
	}		
}
// mw.util.addTabberText, mw.util.breakTabber now avb
window.onload = function () {
if ( mw.config.get( 'wgPageName' ) === 'Translate' ) {
mw.util.addTabberText( 'WikiaArticle','Languages:' );
}
}