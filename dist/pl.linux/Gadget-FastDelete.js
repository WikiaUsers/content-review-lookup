/*
 * Ajax Fast Delete
 * @author Grunny
 * @version 2.1
 * @notes Original FastDelete code was written by Splarka, and later modified by uberfuzzy and Grunny.
 *
*/
 
var fdButtons = [];
fdButtons[fdButtons.length] = {
	'summary': 'Wandalizm',
	'label': 'Usuń: wandalizm'
};
fdButtons[fdButtons.length] = {
	'summary': 'Mało',
	'label': 'Usuń: mało'
};
 
( function( $ ) {
	"use strict";
 
	// Don't load twice...
	if ( typeof window.wkAjaxFastDelete !== 'undefined' ) {
		return false;
	}
 
	window.wkAjaxFastDelete = {
		version: '2.1',
 
		init: function() {
 
			if ( wgNamespaceNumber === -1 || !window.fdButtons ) {
				return;
			}
			var deleteButtons = '';
			switch( skin ) {
				case 'awesome': /* you really shouldnt even have this value... */
				case 'monaco_old': /* really, where are you getting these skin settings from... */
				case 'monaco':
					if( !$( '#ca-delete' ).length ) {
						return;
					}
					for( var i = 0; i < fdButtons.length; i++ ) {
						deleteButtons += '<li><img src="https://images.wikia.nocookie.net/common/skins/common/blank.gif" class="sprite delete fastdelete" /><a style="cursor: pointer;" rel="nofollow" title="Ajax delete: ' + fdButtons[i].summary + '" data-summary="' + fdButtons[i].summary + '" data-id="fastdelete">'+ fdButtons[i].label + '</a></li>';
					}
					$( '#page_controls' ).append( deleteButtons );
					break;
 
				case 'uncyclopedia':
				case 'wowwiki':
				case 'lostbook':
				case 'monobook':
					if( !$( '#ca-delete' ).length ) {
						return;
					}
					for( var i = 0; i < fdButtons.length; i++ ) {
						deleteButtons += '<li><a style="cursor: pointer;" title="Ajax delete: ' + fdButtons[i].summary + '" data-summary="' + fdButtons[i].summary + '" data-id="fastdelete">' + fdButtons[i].label + '</a></li>';
					}
					$( '#p-cactions > .pBody > ul' ).append( deleteButtons );
					break;
 
				case 'oasis':
				case 'wikia':
					if( !$( 'a[data-id="delete"]' ).length ) {
						return;
					}
					for( var i = 0; i < fdButtons.length; i++ ) {
						deleteButtons += '<a class="wikia-button" title="one-click delete: ' + fdButtons[i].summary + '" data-summary="' + fdButtons[i].summary + '" data-id="fastdelete">' + fdButtons[i].label + '</a>&nbsp;';
					}
					switch( wgNamespaceNumber ) {
						case 1:
						case 5:
						case 7:
						case 9:
						case 11:
						case 13:
						case 14:
						case 15:
						case 111:
						case 401:
							$( 'header.WikiaPageHeader > h2' ).before( deleteButtons );
							break;
						case 2:
						case 3:
							if( $( '#UserProfileMasthead' ).length ) {
								$( 'div.UserProfileActionButton' ).append( deleteButtons );
							} else {
								$( 'div.WikiaUserPagesHeader > ul.wikia-avatar' ).after( deleteButtons );
							}
							break;
						case 500:
						case 502:
							$( 'div.WikiaUserPagesHeader > h1' ).after( deleteButtons );
							break;
						default:
							$( 'header.WikiaPageHeader' ).append( deleteButtons );
							break;
					}
					break;
			}
			if( $( 'a[data-id="fastdelete"]' ).length ) {
				$( 'a[data-id="fastdelete"]' ).click( function () {
					wkAjaxFastDelete.ajaxDeleteAPage( $( this ).attr( 'data-summary' ) );
				} );
			}
		},
 
		ajaxDeleteAPage: function ( deleteReason ) {
			var url =  wgServer + wgScriptPath + '/api.php?action=query&prop=info&intoken=delete&titles=' + encodeURIComponent( wgPageName ) + '&format=json';
			$.getJSON( url, function( data ) {
				var	editToken = data.query.pages[wgArticleId].deletetoken,
					url = wgServer + wgScriptPath + '/api.php?action=delete&title=' + encodeURIComponent( wgPageName ) + '&reason=' + encodeURIComponent( deleteReason ) + '&format=json&token=' + encodeURIComponent( editToken );
				$.post( url, function() {
					document.location.reload();
				} );
			} );
		}
	};
 
	$(document).ready( wkAjaxFastDelete.init );
 
}( jQuery ) );