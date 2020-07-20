/*
 * Ajax batch delete thingy, version [0.0.3] by Grunny
 * Based on: http://en.wikipedia.org/wiki/User:Splarka/ajaxbatchdelete.js
 * Converted to use jQuery
 */
$( function () {
	if( skin === 'monobook' ) {
		addPortletLink( 'p-tb', wgServer + wgScriptPath + '/index.php?title=Special:BlankPage&blankspecial=ajaxjqbd', 'Delete more files');
	} else {
		$( '#my-tools-menu' ).prepend( '<li class="custom"><a href="' + wgServer + wgScriptPath + '/index.php?title=Special:BlankPage&blankspecial=ajaxjqbd" rel="nofollow">Delete many files</a></li>' );
	}
} );

if( wgCanonicalSpecialPageName === 'Blankpage' && $.getUrlVar( 'blankspecial' ) === 'ajaxjqbd' ) {
	document.title = 'Ajax Batch Delete';
	$( createAjaxDeleteForm );
}

function createAjaxDeleteForm() {
	var	pageHeading = ( skin === 'oasis' ) ? ( $( '.AdminDashboardArticleHeader' ).length ? '.AdminDashboardArticleHeader > h1' : '.WikiaPageHeader > h1' ) : 'h1.firstHeading',
		$bodyId = $( '#mw-content-text > p' ),
		bdelFormHtml = '<form id="ajaxdeleteform" action="javascript:void(0);"><textarea style="height: 20em; width: 50%;" id="abd-textarea">'
			+ '</textarea><p><label for="abd-reason">Reason of deletion: </label><input type="text" style="width: 20em;" id="abd-reason" />'
			+ '</p><p><input type="button" id="abd-startbutton" value="start" onclick="ajaxDeleteStart()" /></p></form><pre id="abd-output"></pre>';
	$( pageHeading ).text( 'Ajax Batch Delete' );
	$bodyId.text( 'Pages to delete:' );
	$bodyId.after( bdelFormHtml );
}

function ajaxDeleteStart() {
	document.getElementById( 'abd-startbutton' ).setAttribute( 'disabled', 'disabled' );
	var	txt = document.getElementById( 'abd-textarea' ),
		deletes = txt.value.split( '\n' ),
		page = deletes[0],
		reason = document.getElementById( 'abd-reason' ).value,
		badchars = /(\#|\<|\>|\[|\]|\{|\}|\|)/;
	if( page === '' ) {
		$( '#abd-output' ).append( '* Complete! Files have been deleted or the next line is empty.\n' );
		document.getElementById( 'abd-startbutton' ).removeAttribute( 'disabled');
	} else {
		if( badchars.test( page ) ) {
			$( '#abd-output' ).append( '! Detected invaild symbols:' + page + '\n' );
			setTimeout( ajaxDeleteStart, 1000 );
		} else {
			$( '#abd-output' ).append( '> Attempt to remove [[' + page + ']]\n' );
			ajaxBatchDeleteAPage( page, reason );
		}
	}
	deletes = deletes.slice(1,deletes.length);
	txt.value = deletes.join( '\n' );
}

function ajaxBatchDeleteAPage( title, deleteReason ) {
	var url =  wgServer + wgScriptPath + '/api.php?action=query&prop=info&intoken=delete&titles=' + encodeURIComponent( title ) + '&format=json';
	$.getJSON( url, function( data ) {
		for ( var p in data.query.pages ) {
			break;
		}
		var	ET = data.query.pages[p].deletetoken,
			url = wgServer + wgScriptPath + '/api.php?action=delete&title=' + encodeURIComponent( title ) + '&reason=' + encodeURIComponent( deleteReason ) + '&format=json&token=' + encodeURIComponent( ET );
		$.post( url, function() {
			$( '#abd-output' ).append( '  > Deleted\n' );
			setTimeout( ajaxDeleteStart, 1000 );