//<pre><nowiki>
 
//Delete all script written [v 0.11] by Grunny
//adds two buttons to contrib pages
//"delify" will allow you to provide a delete summary
//"delete all" will open all the delete links in new tabs
//This will only affect pages created by the user that are also the only edit to the page
 
$( function (){
	if( wgCanonicalSpecialPageName === 'Contributions' ) {
		var ug = wgUserGroups.join(' ');
		if( ug.indexOf('staff') + ug.indexOf('helper') + ug.indexOf('vstf') > -3 ) {
			insertContentSubContribLink('javascript:contribDeleteLinksSV(\'[[w:Help:Spam|spam]]\')','delify-s');
			insertContentSubContribLink('javascript:contribDeleteLinksSV(\'[[w:Help:Vandalism|vandalism]]\')','delify-v');
			insertContentSubContribLink('javascript:deleteEverything()','delete all');
		}
	}
} );
 
function contribDeleteLinksSV( defreason ) {
	var reason = prompt('Enter default delete reason', defreason);
	if( !reason ) {
		return;
	}
	$( 'li .newpage ~ a' ).each( function () {
		var parentHTML = $( this ).parent().html();
		if( parentHTML.match( /span class=\"mw-uctop\"/ ) ) {
			var title = $( this ).html();
			$( this ).parent().append( ' (<a href="' + $( this ).attr( 'href' ) + '?redirect=no&action=delete&submitdelete=true&wpReason=' + encodeURIComponent( reason ) + '" title="delete ' + title + '">del</a>)' );
		}
	} );
}
 
$( function (){
	if( wgCanonicalSpecialPageName === 'Multiwikifinder' ) {
		if( skin === 'oasis' ) {
			var mwfLinkId = ( $( '#AdminDashboardHeader' ).length ) ? 'article.WikiaMainContent > header.AdminDashboardHeader > h1 > a' : 'article.WikiaMainContent > header.WikiaPageHeader > h1';
			$( mwfLinkId ).after( '(<a href="javascript:mwfdeleteLinkify()">deletify</a> / <a href="javascript:deleteEverything()">delete all</a> / <a href="javascript:mwfContribify()">contribify</a> / <a href="javascript:mwfNukify()">nukify</a>)' );
		} else {
			$( '#contentSub' ).html( '(<a href="javascript:mwfdeleteLinkify()">deletify</a> / <a href="javascript:deleteEverything()">delete all</a> / <a href="javascript:mwfContribify()">contribify</a> / <a href="javascript:mwfNukify()">nukify</a>)' );
		}
	}
} );
 
function mwfdeleteLinkify() {
	var reason = prompt('Enter default delete reason', '[[w:Help:Spam|spam]]');
	if( !reason ) {
		return;
	}
	var $mwfDeleteId = $( '#mw-content-text' ).find( '.mw-spcontent > ol > li > a' );
	$mwfDeleteId.each( function () {
		$( this ).attr( 'href', $( this ).attr( 'href' ) + '?action=delete&submitdelete=true&wpReason=' + encodeURIComponent( reason ) );
		$( this ).text( $( this ).text() + ' (delete)' );
	} );
}
 
function mwfContribify() {
	var $mwfDeleteId = $( '#mw-content-text' ).find( '.mw-spcontent > ol > li > a' );
	$mwfDeleteId.each( function () {
		$( this ).attr( 'href', $( this ).attr( 'href' ).replace( 'User_talk:', 'Special:Contributions/' ).replace( 'User:', 'Special:Contributions/' ).replace( 'Message_Wall:', 'Special:Contributions/' ) );
		$( this ).text( $( this ).text().replace( 'User_talk:', 'Special:Contributions/' ).replace( 'User:', 'Special:Contributions/' ).replace( 'Message_Wall:', 'Special:Contributions/' ) );
	} );
}
 
function mwfNukify() {
	var $mwfDeleteId = $( '#mw-content-text' ).find( '.mw-spcontent > ol > li > a' );
	$mwfDeleteId.each( function () {
		$( this ).attr( 'href', $( this ).attr( 'href' ).replace( 'User_talk:', 'Special:Nuke/' ).replace( 'User:', 'Special:Nuke/' ).replace( 'Message_Wall:', 'Special:Nuke/' ) );
		$( this ).text( $( this ).text().replace( 'User_talk:', 'Special:Nuke/' ).replace( 'User:', 'Special:Nuke/' ).replace( 'Message_Wall:', 'Special:Nuke/' ) );
	} );
}
 
$( function (){
	if( wgCanonicalSpecialPageName === 'Prefixindex' ) {
		if( skin === 'oasis' ) {
			$( '#WikiaPageHeader > h1' ).after( ' (<a href="javascript:prefIndexDeleteLinks(\'[[w:Help:Spam|spam]]\')">deletify-s</a> / <a href="javascript:prefIndexDeleteLinks(\'[[w:Help:Vandalism|vandalism]]\')">deletify-v</a> / <a href="javascript:deleteEverything()">delete all</a>) ' );
		} else {
			$( '#contentSub' ).html( '(<a href="javascript:prefIndexDeleteLinks(\'[[w:Help:Spam|spam]]\')">deletify-s</a> | <a href="javascript:prefIndexDeleteLinks(\'[[w:Help:Vandalism|vandalism]]\')">deletify-v</a> | <a href="javascript:deleteEverything()">delete all</a>)' );
		}
	}
} );
 
function prefIndexDeleteLinks(defreason) {
	$( '#mw-prefixindex-list-table a' ).each( function () {
		$( this ).attr( 'href', $( this ).attr( 'href' ) + '?redirect=no&action=delete&submitdelete=true&wpReason=' + encodeURIComponent( defreason ) );
		$( this ).text( $( this ).text() + '  (delete)' );
	} );
}
 
$( checkdelete );
function checkdelete() {
	if( queryString( 'autocloseit' ) === 'true' && document.getElementById( 'deleteconfirm' ) ) { 
		document.getElementById('deleteconfirm').action += '&autocloseit=now';
		document.getElementById('deleteconfirm').target = '_top';
	}
	if( queryString( 'submitdelete' ) === 'true' ) { 
		var btn = ( document.getElementById( 'mw-filedelete-submit' ) ) ? document.getElementById( 'mw-filedelete-submit' ) : document.getElementById( 'wpConfirmB' );
		btn.click();
	}
	if( queryString( 'autocloseit' ) === 'now' || $('div.WikiaConfirmation').length !== 0 ) {
		try {
			window.close();
		} catch( e ) {
			// not a JS-created window
		}
	}
}
 
function deleteEverything() {
	for ( var i in document.links ) {
		if ( document.links[i].href.indexOf('action=delete') !== -1 ) {
			window.open( document.links[i].href );
		}
	}
}
 
function queryString( p ) {
	var	re = RegExp('[&?]' + p + '=([^&]*)'),
		matches;
	if ( matches = re.exec( document.location ) ) {
		try { 
			return decodeURI(matches[1]);
		} catch ( e ) {
		}
	}
	return null;
}
 
//</pre></nowiki>