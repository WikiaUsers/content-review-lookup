/**
 * Ajax Wookieepedia Cloak Request
 * 
 * Creates a form to submit cloak requests
 *
 * Please let me know of any suggested improvements
 * 
 * @author Grunny
 * @version 0.0.2
 * 
 */

( function( $ ) {

	// Don't load twice...
	if ( typeof window.AjaxCloakRequestScript !== 'undefined' ) {
		return false;
	}

	window.AjaxCloakRequestScript = {
		version: '0.0.1',

		/* Initialize the script */
		init: function () {

			if ( wgPageName === 'Wookieepedia:IRC/Cloak_requests' || wgPageName === 'User:Darth_Culator/cloaksignupprototype' ) {

				$( '<a />' ).text( 'Make Request' ).attr( 'href', '#' ).click( function () {

					AjaxCloakRequestScript.createPopUpForm();

				} ).appendTo( '#request-button' );
			}

		},

		/* Create the pop-up form */
		createPopUpForm: function () {
			var popupHTML = '<section style="left: 50%; top: 50px; width: 1000px; z-index: 20000002; margin-left: -520px;" class="modalWrapper">' +
				'<button class="close wikia-chiclet-button" id="acr-closebutt"><img src="/skins/oasis/images/icon_close.png"></button>' +
				'<h1>Wookieepedia Cloak Request</h1>' +
				'<section class="modalContent">' +
				'<div class="AjaxCloakRequestBox" id="AjaxCloakRequestBox">' +
				'<form class="AjaxCloakRequestForm">' +
				'<fieldset>' +
				'<p><label for="acr-abbrusername"><span style="border-bottom: 1px dotted black; cursor: help;" title="If no formatting change is necessary or desired, just repeat your username.">' +
				'Format or abbreviate username as:</span> </label><input type="text" style="width: 20em;" name="acr-abbrusername" id="acr-abbrusername" /></p>' +
				'<p><label for="acr-nick">IRC nick: </label><input type="text" style="width: 20em;" name="acr-nick" id="acr-nick" /></p>' +
				'<p><label for="acr-kor">Existing cloak to be kept or replaced: </label><select id="acr-kor" style="width: 20em;">' +
				'<option value="none">None</option><option value="keep">Keep</option><option value="replace">Replace</option></select></p>' +
				'<p><label for="acr-type">Cloak type: </label><select id="acr-type" style="width: 20em;">' +
				'<option value="plain">Plain</option><option value="administrator">administrator</option><option value="bureaucrat">bureaucrat</option></select></p>' +
				'</fieldset>' +
				'<input type="button" id="acr-startbutton" value="Submit" />' +
				'</form>' +
				'</div>' +
				'</section>' +
				'</section>' +
				'<div class="blackout" style="height: 6702px; z-index: 20000001; opacity: 0.65;"></div>';
			$( 'body' ).append( popupHTML );
			if ( skin !== 'oasis' ) {
				appendCSS( '.modalWrapper { -moz-box-shadow: 0 10px 60px #7F7F7F; background: none repeat scroll 0 0 white; border: 5px solid #BACDD8; padding: 25px 15px; position: absolute; }' +
							'section { display: block; }' +
							'.blackout { background: none repeat scroll 0 0 white; left: 0; opacity: 0.8; position: absolute; top: 0; width: 100%; }' +
							'.modalWrapper .close { float: right; margin: 0 18px 0 0; }' );
			}
			$( '#acr-kor' ).change( function () {
				if ( $( this ).val() === 'keep' || $( this ).val() === 'replace' ) {
					if ( !$( '#acr-oldc' ).length ) {
						$( this ).parent().after( '<p><label for="acr-oldc">Your current cloak: </label><input type="text" style="width: 20em;" id="acr-oldc" /></p>' );
					}
					if ( $( this ).val() === 'replace' && $( '#acr-otherc' ).length ) {
						$( '#acr-otherc' ).parent().remove();
					}
					if ( $( this ).val() === 'keep' && !$( '#acr-otherc' ).length ) {
						$( '#acr-oldc' ).after( '<p><label for="acr-otherc">New cloak format: </label><input type="text" style="width: 20em;" id="acr-otherc" /> (e.g. @wookieepedia/wikipedia.Grunny)</p>' );
					}
				}
			} );
			$( '#acr-closebutt' ).click( function () {
				AjaxCloakRequestScript.closePopUpForm();
			} );
			$( '#acr-startbutton' ).click( function () {
				AjaxCloakRequestScript.getEditToken();
			} );
		},

		closePopUpForm: function () {
			$( 'section.modalWrapper' ).remove();
			$( 'div.blackout' ).remove();
		},

		/* API Edit functions */
		getEditToken: function () {
			var	nick = $( '#acr-nick' ).val();
			if( !nick ) {
				return;
			}
			var url = wgServer + wgScriptPath + '/api.php?action=query&prop=info|revisions&intoken=edit&titles=Main%20Page&format=json';
			$.getJSON( url, function ( data ) {
				for ( var p in data.query.pages ) {
					break;
				}
				var editToken = data.query.pages[p].edittoken;
				AjaxCloakRequestScript.getPageText( editToken );
			} );
		},

		getPageText: function ( editToken ) {
			var	abbrUserName = $( '#acr-abbrusername' ).val(),
				nick = $( '#acr-nick' ).val(),
				keepOrReplace = $( '#acr-kor' ).val(),
				oldCFormat = 'uncloaked',
				newCFormat = '',
				cloakType = $( '#acr-type' ).val(),
				requestText = '',
				summary = 'Requesting Wookieepedia cloak';

			if ( keepOrReplace === 'keep' || keepOrReplace === 'replace' ) {
				oldCFormat = $( '#acr-oldc' ).val();
				if ( keepOrReplace === 'keep' ) {
					newCFormat = $( '#acr-otherc' ).val();
				}
			}

			requestText = '\n*{{U|' + wgUserName + '}}\n**Format or abbreviate username as: ' + ( ( abbrUserName === '' ) ? wgUserName : abbrUserName ) +
				'\n**IRC nick: ' + nick + '\n***Existing cloak to be ' + ( keepOrReplace === 'keep' ? 'kept' : 'replaced' ) + ': "' + oldCFormat + ( newCFormat !== '' ? '" replace with "' + newCFormat : '"' ) +
				'\n**Cloak type: ' + cloakType + '\n**~~' + '~~';

			AjaxCloakRequestScript.makeAPIEdit( summary, requestText, editToken );
		},

		makeAPIEdit: function ( summary, content, editToken ) {
			$.ajax( {
				url: wgScriptPath + '/api.php?',
				data: 'action=edit&title=' + encodeURIComponent( wgPageName ) + '&summary=' + encodeURIComponent( summary ) + '&section=1&appendtext=' + encodeURIComponent( content ) + '&format=json&token=' + encodeURIComponent( editToken ),
				dataType: 'json',
				type: 'POST',
				success: function( data ) {
					if ( data.edit.result === "Success" ) {
						window.location.reload(); // reload page if edit was successful
					} else {
						alert( 'Error: Unknown result from API.' );
					}
				},
				error: function( xhr ) {
					alert( 'Error: Edit failed.' );
				}
			} );
		}

	};

	$(document).ready( AjaxCloakRequestScript.init );

} )( jQuery );