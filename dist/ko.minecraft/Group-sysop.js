/* 이 자바스크립트 설정은 관리자에만 적용됩니다 */
/**
 * Blank the "Other/additional reason" field when deleting pages,
 * and insert the reason from the delete template instead
 * 
 * This is so we don't get stupid vandalism and spam and
 * whatnot preserved for posterity in the delete log
 */
$.when( $.ready, mw.loader.using( 'mediawiki.util' ) ).done( function() {
	'use strict';
	/**
	 * Part 1: Add the deletion reason from the delete template to the delete button
	 */
	var $deleteReason = $( '.delete-reason' );
	if ( $deleteReason.length ) {
		// A parent node is required for $().replaceWith to work
		var $reasonNodes = $( '<i>' ).append( $( '.delete-reason' ).contents().clone() );
		$reasonNodes.find( 'a' ).each( function() {
			var $link = $( this );
			// Only allow internal links
			var classes = $link.attr( 'class' );
			if ( classes && classes !== 'new' && classes !== 'mw-redirect' ) {
				return;
			}
			
			var href = $link.attr( 'href' );
			var page = mw.util.getParamValue( 'title', href ) || ( href.match( /\/wiki\/([^?]+)/ || [] )[1] );
			if ( page ) {
				page = decodeURIComponent( page ).replace( /_/g, ' ' );
				var wikiLink = $link.text();
				if ( page !== wikiLink[0].toUpperCase() + wikiLink.slice( 1 ) ) {
					wikiLink = page + '|' + wikiLink;
				}
				$link.replaceWith( '[' + '[' + wikiLink + ']]' );
			}
		} );
		
		var reasonText = $reasonNodes.text();
		if ( reasonText ) {
			$( '#ca-delete a, a#ca-delete' ).prop( 'href', function() {
				// Purposly not using wpReason, so the auto-generated reason is still there initially
				// so the user can press undo to get it back if they want it instead of this one
				return this.href += '&deleteReason=' + encodeURIComponent( reasonText );
			} );
		}
	}
	
	/**
	 * Part 2: Get the previously added reason from the URL, or try to extract it from the "content was" summary.
	 * Then if it partially matches one of the pre-defined deletion reasons, select that and blank the summary,
	 * otherwise just replace the summary with it
	 */
	if ( mw.config.get( 'wgAction' ) === 'delete' && !mw.util.getParamValue( 'wpReason' ) ) {
		var $reason = $( '#wpReason' ), autoReason = $reason.prop( 'value' );
		var deleteReason = mw.util.getParamValue( 'deleteReason' );
		
		if ( !deleteReason ) {
			var contentDeleteReason = autoReason.match(
				/\{\{\s*(?:template:\s*)?delete\s*\|\s*([^\}]+?)\s*(?:\|[^\]\}]*)?(?:\}\}|\.\.\.$)/i
			);
			if ( contentDeleteReason ) {
				deleteReason = contentDeleteReason[1];
			}
		}
		
		if ( deleteReason ) {
			var lcReason = deleteReason.toLowerCase();
			$( '#wpDeleteReasonList option' ).each( function() {
				var $option = $( this );
				if ( $option.text().toLowerCase() === lcReason ) {
					deleteReason = null;
					$option.prop( 'selected', true );
					return false;
				}
			} );
			
			if ( deleteReason && deleteReason.length > 255 ) {
				deleteReason = deleteReason.slice( 0, 252 ) + '...';
			}
		}
		
		$reason.prop( 'value', deleteReason || '' );
	}
} );