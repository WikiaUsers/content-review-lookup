/**
 * Ajax Undo links
 *
 * Adds an Ajax undo link next to the normal undo link on page histories
 * and on diff pages
 *
 * @author Grunny
 * @version 0.2
 *
 */
 
jQuery(document).ready( function ( $ ) {
	"use strict";
 
	function createUndoLink( diffUndoUrl ) {
		var $ajaxUndoLink = $( '<a />' ).text( 'AJAX Undo' ).attr( 'href', '#' ).click( function () {
			var	$ajaxUndoLinkob = $( this ),
				undoIdRegex = /&undo=([^&]*)/,
				undoId = undoIdRegex.exec( diffUndoUrl )[1],
				editToken,
				etUrl = wgServer + wgScriptPath + '/api.php?action=query&prop=info|revisions&intoken=edit&titles=' + encodeURIComponent( wgPageName ) + '&format=json';
			$ajaxUndoLinkob.html( ' <img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Undoing..." />' );
			$.getJSON( etUrl, function ( data ) {
				editToken = data.query.pages[wgArticleId].edittoken;
				$.ajax( {
					url: wgScriptPath + '/api.php?',
					data: 'action=edit&format=json&title=' + encodeURIComponent( wgPageName ) + '&undo=' + encodeURIComponent( undoId ) + '&bot=1&token=' + encodeURIComponent( editToken ),
					dataType: 'json',
					type: 'POST',
					success: function ( data ) {
						if ( data.edit && data.edit.result === 'Success' ) {
							$ajaxUndoLinkob.text( '(undone)' );
						} else if ( data.error && data.error.code === 'undofailure' ) {
							$ajaxUndoLinkob.text( '(error)' );
							alert( data.error.info );
						} else {
							$ajaxUndoLinkob.text( '(error)' );
							alert( 'Error: Unknown result from API.' );
						}
					},
					error: function () {
						$ajaxUndoLinkob.text( '(error)' );
					}
				} );
			} );
		} );
		return $ajaxUndoLink;
	}
 
	if ( $( '.mw-history-undo > a' ).length && wgAction === 'history' ) {
		$( '.mw-history-undo > a' ).each( function () {
			var	diffUndoUrl = $( this ).attr( 'href' ),
				$ajaxUndoLink = createUndoLink( diffUndoUrl );
			$( this ).parent().after( ' | ', $ajaxUndoLink );
		} );
	} else if ( $( 'table.diff' ).length && typeof $.getUrlVar( 'diff' ) !== 'undefined' ) {
		var	$diffUndoLink = $( 'table.diff' ).find( '.diff-ntitle > #mw-diff-ntitle1 a:last' ),
			diffUndoUrl = $diffUndoLink.attr( 'href' ),
			$ajaxDiffUndoLink = createUndoLink( diffUndoUrl );
		$diffUndoLink.parent().append( ' (', $ajaxDiffUndoLink, ')' );
	}
} );