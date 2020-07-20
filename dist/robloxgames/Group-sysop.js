/* Any JavaScript here will be loaded for sysops only */
$( function() {
'use strict';


/**
 * Blank the "Other/additional reason" field when deleting pages
 *
 * This is so we don't get stupid vandalism and
 * spam and whatnot preserved for posterity in the
 * delete log
 *
 * Disable by adding window.mcw.deleteBlanking = false; to [[Special:MyPage/common.js]]
 */
if ( ( window.mcw.deleteBlanking === undefined || window.mcw.deleteBlanking ) && mw.config.get( 'wgAction' ) == 'delete' ) {
    var summary = $( '#wpReason' ), summaryVal = summary.prop( 'value' );
    
    if ( summaryVal.match( /content (?:before blanking )?was:/ ) ) {
        var deleteReason = summaryVal.match( /\{\{(?:template:)?delete\|([^}]*)(\}\})?/i );
        
        if ( deleteReason ) {
            if ( deleteReason[2] ) {
                summary.prop( 'value', deleteReason[1] );
            } else {
                summary.prop( 'value', deleteReason[1].slice( 0, -1 ) );
            }
        } else {
            summary.prop( 'value', '' );
        }
    }
}


/**
 * Deletes and undeletes corrupted pages
 *
 * Adds a button to the missing article page which shows up
 * on corrupted pages. Clicking it opens a dialog giving you
 * the option to delete and undelete the page, or only delete it
 * so you can manually select which revisions to restore
 */
var loading;

if ( $( '#corrupt-fix' ).length ) {
	$( '#netbar' ).after( '<div id="corrupt-fix-dialog" />' );
	$( '#corrupt-fix' ).show().click( function( e ) {
		if ( loading ) {
			return;
		}
		
		if ( $( e.target ).hasClass( 'delete-and-restore' ) ) {
			getToken( true );
		} else {
			getToken( false );
		}
	} );
}

function getToken( restore ) {
	var token, page = mw.config.get( 'wgPageName' );
	
	loading = true;
	$( 'body' ).css( 'cursor', 'progress' );
	$.ajax( {
		url: window.mcw.baseURL + 'api.php?format=json&action=query&prop=info&intoken=delete&titles=' + page,
		timeout: 30000
	} ).done( function( data ) {
		if ( data.error ) {
			loading = false;
			$( 'body' ).css( 'cursor', 'auto' );
			
			errorDiag( data.error.info, getToken, restore );
			return;
		}
		$.each( data.query.pages, function() {
			token = this.deletetoken.slice( 0, -2 ) + '%2B%5C';
		} );
		
		deletePage( token, restore );
	} ).fail( function( error ) {
		loading = false;
		$( 'body' ).css( 'cursor', 'auto' );
		
		if ( !error.responseText ){
			errorDiag( 'No response from the server', getToken, restore );
		} else {
			errorDiag( error.responseText, getToken, restore );
		}
	} );
}

function deletePage( token, restore ) {
	var page = mw.config.get( 'wgPageName' );
	
	loading = true;
	$( 'body' ).css( 'cursor', 'progress' );
	$.ajax( {
		type: 'POST',
		url: window.mcw.baseURL + 'api.php?format=json&action=delete&reason=Fixing corrupted page&title=' + page + '&token=' + token,
		timeout: 30000
	} ).done( function( data ) {
		if ( data.error ) {
			loading = false;
			$( 'body' ).css( 'cursor', 'auto' );
			
			errorDiag( data.error.info, deletePage, token, restore );
			return;
		}
		
		if ( restore ) {
			restorePage( token, page );
		} else {
			window.location = window.mcw.baseURL + 'index.php?title=Special:Undelete&target=' + page;
		}
	} ).fail( function( error ) {
		loading = false;
		$( 'body' ).css( 'cursor', 'auto' );
		
		if ( !error.responseText ){
			errorDiag( 'No response from the server', deletePage, token, restore );
		} else {
			errorDiag( error.responseText, deletePage, token, restore );
		}
	} );
}

function restorePage( token, page ) {
	loading = true;
	$( 'body' ).css( 'cursor', 'progress' );
	$.ajax( {
		type: 'POST',
		url: window.mcw.baseURL + 'api.php?format=json&action=undelete&title=' + page + '&token=' + token,
		timeout: 30000
	} ).done( function( data ) {
		if ( data.error ) {
			loading = false;
			$( 'body' ).css( 'cursor', 'auto' );
			
			errorDiag( data.error.info, restorePage, token, page );
			return;
		}
		
		window.location = window.mcw.wikiURL + page;
	} ).fail( function( error ) {
		loading = false;
		$( 'body' ).css( 'cursor', 'auto' );
		
		if ( !error.responseText ){
			errorDiag( 'No response from the server', restorePage, token, page );
		} else {
			errorDiag( error.responseText, restorePage, token, page );
		}
	} );
}

function errorDiag( msg, retryFunc, p1, p2 ) {
	mw.loader.using( 'jquery.ui.dialog', function() {
		$( '#corrupt-fix-dialog' ).dialog( {
			autoOpen: false,
			resizable: false,
			width: 400,
			modal: true
		} ).html( '<p><strong>Error:</strong> ' + msg + '</p>' ).dialog( 'option', {
			title: 'Hey! Listen!',
			buttons: {
				'Retry': function() {
					retryFunc( p1, p2 );
					$( this ).dialog( 'close' );
				},
				Cancel: function() {
					$( this ).dialog( 'close' );
					return;
				}
			}
		} ).dialog( 'open' );
	} );
}


/**
 * Allow moved pages to be patrolled
 * 
 * Adds the rcid to the link in the log to the new page
 * for pages that are moved without redirect, so they are patrollable
 */
var rcid = mw.util.getParamValue( 'rcid' );
if ( rcid && !$( '.patrollink' ).length ) {
	$( '.mw-warning-with-logexcerpt li > a:last' ).prop( 'href', function() {
		return this.href += '?redirect=no&rcid=' + rcid;
	} );
}


} );