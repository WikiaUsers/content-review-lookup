/* Any JavaScript here will be loaded for all users on every page load. */

/*
 * boring legal copyright stuff should go here, but seeing how i didnt write this, meh. dont be dumb, do no evil, etc
 * 
 * originally written by User:Splarka many moons ago, originally located at w:User:Splarka/fastdelete.js
 * re-written in 2009 by User:Uberfuzzy, using code ganked from PurgeButton, for which jQuery code credit goes to User:Dantman
 * Oasis and Answers support added by User:Grunny
 * 
 * warning to editors, many people will be using this code (transference off of splarka's version),
 * so do your testing else where, and be sure of your edits to this page.
 * 
 * todo: fd_checkdelete and fd_queryString could use some love, if not rewritten entirely
 * 
 */
if( wgNamespaceNumber != -1 && !window.FDeleteButtonsLoaded )
	addOnloadHook( addFastDeleteButtons );
var FDeleteButtonsLoaded = true; // prevent duplication

function addFastDeleteButtons() {
	if( !window.fdButtons )
		return;

	switch( skin ) {
		case 'answers': /* new skin */
			if( !document.getElementById( 'qa_ca-delete' ) ) {
				return;
			}
			for( var i = 0; i < fdButtons.length; i++ ) {
				$('#qa_toolbox_advancedtools_wrapper').append('<div id="qa_toolbox_advancedtools_delete"></div>');
				$('#qa_toolbox_advancedtools_delete').append('<span><img src="https://images.wikia.nocookie.net/common/skins/common/blank.gif" class="sprite delete fastdelete" /><a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&action=delete&submitdelete=true&wpReason=' + encodeURIComponent(fdButtons[i].summary) + '" rel="nofollow" title="Borrado rápido ' + fdButtons[i].summary + '">'+ fdButtons[i].label + '</a></span>');
			}
			break;


		case 'awesome': /* you really shouldnt even have this value... */
		case 'monaco_old': /* really, where are you getting these skin settings from... */
		case 'monaco':
			if( !document.getElementById( 'ca-delete' ) ) {
				return;
			}
			for( var i = 0; i < fdButtons.length; i++ ) {
				$('#page_controls').append('<li><img src="https://images.wikia.nocookie.net/common/skins/common/blank.gif" class="sprite delete fastdelete" /><a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&action=delete&submitdelete=true&wpReason=' + encodeURIComponent(fdButtons[i].summary) + '" rel="nofollow" title="Borrado rápido: ' + fdButtons[i].summary + '">'+ fdButtons[i].label + '</a></li>');
			}
			break;


		case 'uncyclopedia': /* monobook clone, pass to monobook */
		case 'wowwiki': /* monobook clone, pass to monobook */
		case 'lostbook': /* monobook clone, pass to monobook */
		case 'monobook':
			if( !document.getElementById( 'ca-delete' ) )
				return;
			for( var i = 0; i < fdButtons.length; i++ ) {
				$('#p-cactions > .pBody > ul').append('<li id="ca-delete"><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=delete&submitdelete=true&wpReason=' + encodeURIComponent(fdButtons[i].summary) + '" accesskey="'+ fdButtons[i].accesskey + '" title="Borrado rápido: ' + fdButtons[i].summary+' ['+ fdButtons[i].accesskey + ']">'+ fdButtons[i].label + '</a></li>');
			}
			break;
		
		case 'oasis':
		case 'wikia':
			if( $('a[data-id="delete"]').length == 0 ) {
				return;
			}
			for( var i = 0; i < fdButtons.length; i++ ) {
				afd = '<a style="margin-bottom:3px !important;" class="wikia-button" href="/index.php?title=' + encodeURIComponent(wgPageName) + '&action=delete&submitdelete=true&wpReason=' + encodeURIComponent(fdButtons[i].summary) + '" accesskey="'+ fdButtons[i].accesskey + '" title="Borrado rápido: ' + fdButtons[i].summary+' ['+ fdButtons[i].accesskey + ']" data-id="delete">'+ fdButtons[i].label + '</a>';
				switch( wgNamespaceNumber ) {
					default:
						$('#WikiaSearch').before(afd);
						break;
				}
			}
			break;

	}
}

addOnloadHook( fd_checkdelete );
function fd_checkdelete() {
	if( fd_queryString( 'autoclose' ) == 'true' && document.getElementById( 'deleteconfirm' ) ) { 
		document.getElementById('deleteconfirm').action += '&autoclose=now';
		document.getElementById('deleteconfirm').target = '_top';
	}
	if( fd_queryString( 'submitdelete' ) == 'true' ) { 
		var btn = ( document.getElementById( 'mw-filedelete-submit' ) ) ? document.getElementById( 'mw-filedelete-submit' ) : document.getElementById( 'wpConfirmB' );
		btn.click();
	}
	if( fd_queryString( 'autoclose' ) == 'now' ) {
		try {
			window.close();
		} catch( e ) {
			// not a JS-created window.
		}
	}
}

function fd_queryString( p ) {
	var re = RegExp('[&?]' + p + '=([^&]*)');
	var matches;
	if( matches = re.exec( document.location ) ) {
		try { 
			return decodeURI( matches[1] );
		} catch( e ) {
		}
	}
	return null;
}

//