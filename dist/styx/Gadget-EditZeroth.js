/**
 * AddEditSection0
 */
/* global mw, $ */
/* eslint-env browser */

if ( mw.config.get( 'wgNamespaceNumber' ) >= 0 ) {
	mw.loader.using( [ 'user', 'mediawiki.util' ], function () {
		$( function ( $ ) {
			var lang = mw.config.get( 'wgUserLanguage' ),
				messages = {
					fr: {
						'editZeroth-portlet-name': 'En-tête',
						'editZeroth-summary-prefix': '/* Introduction */ ',
						'editZeroth-portlet-description': 'Modifier l’en-tête de la page'
					},
					en: {
						'editZeroth-portlet-name': 'Lead',
						'editZeroth-summary-prefix': '/* Lead section */ ',
						'editZeroth-portlet-description': 'Edit the lead section of this page'
					}
				},
				$editPortlet = $( '#ca-edit' ),
				skin = mw.config.get( 'skin' ),
				summaryPrefix,
				portletLink,
				$editZeroPortlet;

			mw.messages.set( messages.en );
			if ( lang !== 'en' && lang in messages ) {
				mw.messages.set( messages[ lang ] );
			}

			if ( !mw.config.get( 'wgIsProbablyEditable' ) ) {
				return;
			}

			if ( typeof window.EditZeroth_summary !== 'undefined' ) {
				summaryPrefix = window.EditZeroth_summary;
			} else {
				summaryPrefix = mw.msg( 'editZeroth-summary-prefix' );
			}

			portletLink = mw.util.addPortletLink(
				( skin === 'vector' || skin === 'timeless' ) ? 'p-views' : 'p-cactions',
				mw.util.getUrl( null, { action: 'edit', section: 0, summary: summaryPrefix } ),
				mw.msg( 'editZeroth-portlet-name' ),
				'ca-edit-0',
				mw.msg( 'editZeroth-portlet-description' ),
				'',
				( $editPortlet.length > 0 && $editPortlet.next().length > 0 ) ? $editPortlet.next() : null
			);
			$editZeroPortlet = $( portletLink );

			if ( skin === 'monobook' ) {
				$editZeroPortlet.after( ' ' );
			}

			if ( $editPortlet.hasClass( 'istalk' ) ) {
				$editZeroPortlet.addClass( 'istalk' );
			}

			if ( $editPortlet.hasClass( 'selected' ) ) {
				if ( mw.util.getParamValue( 'section' ) === '0' ) {
					$editPortlet.removeClass( 'selected' );
					$editZeroPortlet.addClass( 'selected' );
				}
			}

		} );
	} );
}