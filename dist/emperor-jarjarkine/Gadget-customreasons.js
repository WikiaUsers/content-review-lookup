/**
 * Allows users to define custom reason pages for deletes,
 * file deletes, protects and blocks
 *
 * Pages:
 *     File deletes: User:ExampleUser/Filedelete-reason-dropdown
 *     Deletes: User:ExampleUser/Deletereason-dropdown
 *     Blocks: User:ExampleUser/Ipbreason-dropdown
 *     Protects: User:ExampleUser/Protect-dropdown
 *
 * @author grunny
 */
/*globals jQuery, mediaWiki */
( function ( $, mw ) {
	'use strict';

	var CustomReasons = {

		init: function () {
			if ( mw.config.get( 'wgAction' ) === 'delete' && $( '#wpDeleteReasonList' ).length ) {
				if ( mw.config.get( 'wgNamespaceNumber' ) === 6 ) {
					CustomReasons.getReasonList( 'User:' + mw.config.get( 'wgUserName' ) + '/Filedelete-reason-dropdown', '#wpDeleteReasonList' );
				} else {
					CustomReasons.getReasonList( 'User:' + mw.config.get( 'wgUserName' ) + '/Deletereason-dropdown', '#wpDeleteReasonList' );
				}
			} else if ( ( mw.config.get( 'wgAction' ) === 'protect' || mw.config.get( 'wgAction' ) === 'unprotect' ) && $( '#wpProtectReasonSelection' ).length ) {
				CustomReasons.getReasonList( 'User:' + mw.config.get( 'wgUserName' ) + '/Protect-dropdown', '#wpProtectReasonSelection' );
			} else if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Block' && $( '#mw-input-wpReason' ).length ) {
				// Block form validates options in the dropdown on submit, so no option outside of those in the actual MW message
				// can be selected, so for now, just add another dropdown next to the input box...
				CustomReasons.addCustomDropdown( 'User:' + mw.config.get( 'wgUserName' ) + '/Ipbreason-dropdown', '#mw-input-wpReason-other' );
			}
		},

		getReasonList: function ( pageName, container ) {
			$.get( mw.config.get( 'wgScript' ), { title: pageName, action: 'raw', ctype: 'text/plain' } ).done( function ( data ) {
				var	summaryOptionsHtml = '<option value="other">Other reason</option>',
					i,
					lines = data.split( '\n' ),
					value,
					optgroup = false;
				if ( data === '' ) {
					// Page has no content
					return false;
				}
				for ( i in lines ) {
					if ( lines.hasOwnProperty( i ) ) {
						value = $.trim( lines[i] );
						if ( value === '' ) {
							continue;
						} else if ( value.substr( 0, 1 ) === '*' && value.substr( 1, 1 ) !== '*' ) {
							// A new group is starting ...
							value = $.trim( value.substr( 1 ) );
							if ( optgroup ) {
								summaryOptionsHtml += '</optgroup>';
							}
							summaryOptionsHtml += '<optgroup label="' + value +'">';
							optgroup = true;
						} else if ( value.substr( 0, 2 ) === '**' ) {
							// groupmember
							value = $.trim( value.substr( 2 ) );
							summaryOptionsHtml += '<option value="' + value + '">' + value + '</option>';
						} else {
							// groupless reason list
							if ( optgroup ) {
								summaryOptionsHtml += '</optgroup>';
							}
							summaryOptionsHtml += '<option value="' + value + '">' + value + '</option>';
							optgroup = false;
						}
					}
				}
				if ( optgroup ) {
					summaryOptionsHtml += '</optgroup>';
				}
				$( container ).html( summaryOptionsHtml );
			} ).fail( function () {
				// Page doesn't exist or other error
				return false;
			} );
		},

		addCustomDropdown: function( pageName, container ) {
			var $customSelectList = $( '<select />' ).attr( 'id', 'wkCustomDropdown' ).change( function () {
				var value = $( this ).val();
				if ( value !== 'other' ) {
					$( container ).val( value );
				}
			} );
			$( container ).after( $customSelectList );
			CustomReasons.getReasonList( pageName, '#wkCustomDropdown' );
		}
	};
	$( CustomReasons.init );
}( jQuery, mediaWiki ) );