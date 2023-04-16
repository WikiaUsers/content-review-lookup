/* __NOWYSIWYG__<syntaxhighlight lang="javascript"> */

/*
 * Ajax batch delete thingy, version [0.0.3] by Grunny
 * Based on: http://en.wikipedia.org/wiki/User:Splarka/ajaxbatchdelete.js
 * Converted to use jQuery
 */

/*jshint forin:true, noempty:true, eqeqeq:true, laxbreak:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true */
/*global mediaWiki */

( function ( mw, $, window, document ) {
	"use strict";
	
	// Prevent double runs
	if ($('#t-ajaxbd').length)
		return;

	var skin = mw.config.get( 'skin' ),
		wgServer = mw.config.get( 'wgServer' ),
		wgScriptPath = mw.config.get( 'wgScriptPath' );
	
	function createAjaxDeleteForm() {
		var	pageHeading = ( skin === 'oasis' ) ? ( $( '.AdminDashboardArticleHeader' ).length ? '.AdminDashboardArticleHeader > h1' : '.WikiaPageHeader > h1' ) : 'h1.firstHeading',
			$bodyId = $( '#mw-content-text > p' ),
			bdelFormHtml = '<form id="ajaxdeleteform" action="javascript:void(0);"><textarea style="height: 20em; width: 50%;" id="abd-textarea">'
				+ '</textarea><p><label for="abd-reason">Delete reason: </label><input type="text" style="width: 20em;" id="abd-reason" />'
				+ '</p><p><input type="button" id="abd-startbutton" value="start" /></p></form><pre id="abd-output"></pre>';
		$( pageHeading ).text( 'Ajax Batch Delete' );
		$bodyId.text( 'List of pages to delete:' );
		$bodyId.after( bdelFormHtml );
		$( '#abd-startbutton' ).click( ajaxDeleteStart );
	}
	
	function ajaxDeleteStart() {
		document.getElementById( 'abd-startbutton' ).setAttribute( 'disabled', 'disabled' );
		var	txt = document.getElementById( 'abd-textarea' ),
			deletes = txt.value.split( '\n' ),
			page = deletes[0],
			reason = document.getElementById( 'abd-reason' ).value,
			badchars = /(\#|<|>|\[|\]|\{|\}|\|)/;
		if( page === '' ) {
			$( '#abd-output' ).append( '* Done! Nothing left to do, or next line is blank.\n' );
			document.getElementById( 'abd-startbutton' ).removeAttribute( 'disabled' );
		} else {
			if( badchars.test( page ) ) {
				$( '#abd-output' ).append( '! Illegal characters detected, skipping:' + page + '\n' );
				setTimeout( ajaxDeleteStart, 1000 );
			} else {
				$( '#abd-output' ).append( '> Attempting to delete [[' + page + ']]\n' );
				ajaxBatchDeleteAPage( page, reason );
			}
		}
		deletes = deletes.slice( 1, deletes.length );
		txt.value = deletes.join( '\n' );
	}

	function ajaxBatchDeleteAPage( title, deleteReason ) {
		var token = mw.user.tokens.get( 'editToken' ),
			url = wgServer + wgScriptPath + '/api.php?action=delete&title=' + window.encodeURIComponent( title ) + '&reason=' + window.encodeURIComponent( deleteReason ) + '&format=json&token=' + window.encodeURIComponent( token );
		
		$.post( url, function( data ) {
			if( data.error  ) {
				$( '#abd-output' ).append( '  > Error: ' + data.error.info + '\n' );
			} else {
				$( '#abd-output' ).append( '  > Deleted\n' );
			}
			setTimeout( ajaxDeleteStart, 1000 );
		} );
	}
	
	$( function () {
		// add link to toolbar/toolbox
		if( skin === 'monobook' ) {
			mw.util.addPortletLink( 'p-tb', wgServer + wgScriptPath + '/index.php?title=Special:BlankPage&blankspecial=ajaxjqbd', 'Batch Delete', 't-ajaxbd' );
		} else {
			$( '#my-tools-menu' ).prepend( '<li class="custom" id="t-ajaxbd"><a href="' + wgServer + wgScriptPath + '/index.php?title=Special:BlankPage&blankspecial=ajaxjqbd" rel="nofollow">Batch Delete</a></li>' );
		}
		
		// create ajax delete form, but only on Special:Blankpage?blankspecial=ajaxjqbd
		if( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Blankpage' && $.getUrlVar( 'blankspecial' ) === 'ajaxjqbd' ) {
			document.title = 'Ajax Batch Delete';
			createAjaxDeleteForm();
		}
	} );
} ( mediaWiki, jQuery, window, document ) );

/* </syntaxhighlight> */