/**
 * Ajax Wookieepedia Quick Warning
 * 
 * @author Grunny
 * @version 0.1
 * Shamelessly stolen from [[w:c:firefly:User:Grunny/diffWook.js]]
 *
 */
/*globals AjaxWookWarningScript, jQuery, window, alert, mediaWiki */
 
( function( $, mw, window ) {
	'use strict';
 
	// Don't load twice...
	if ( typeof window.AjaxWookWarningScript !== 'undefined' ) {
		return false;
	}
 
	window.AjaxWookWarningScript = {
		version: '0.0.1',
		warnings: $.extend( {
			test1: {
				linkText: 'Test1',
				heading: 'Warning',
				warningText: '{' + '{sub'+'st:Test1}} ~~'+'~~'
			},
			test2: {
				linkText: 'Test2',
				heading: 'Warning',
				warningText: '{' + '{sub'+'st:Test2}} ~~'+'~~'
			},
			'msg-vandalism': {
				linkText: 'Msg-vandalism',
				heading: 'Warning',
				warningText: '{' + '{sub'+'st:Msg-vandalism|~~'+'~~}}'
			},
			'msg-fanon': {
				linkText: 'Msg-fanon',
				heading: 'Fanon warning',
				warningText: '{' + '{sub'+'st:Msg-fanon|~~'+'~~}}'
			},
			rc2: {
				linkText: 'Rc2',
				heading: 'Removing content',
				warningText: '{' + '{sub'+'st:Rc2}} ~~'+'~~'
			},
			'msg-verify': {
				linkText: 'Msg-verify',
				heading: 'Unverified info',
				warningText: '{' + '{sub'+'st:Msg-verify}} ~~'+'~~'
			},
			'msg-3RR': {
				linkText: 'Msg-3RR',
				heading: 'Warning',
				warningText: '{' + '{sub'+'st:Msg-3RR|~~'+'~~}}'
			},
			W: {
				linkText: 'Welcome',
				heading: '',
				warningText: '{' + '{sub'+'st:W|'+mw.config.get('wgUserName')+'|~~'+'~~}}'
			},
			anon: {
				linkText: 'Anon',
				heading: '',
				warningText: '{' + '{sub'+'st:Anon|~~'+'~~}}'
			}
		}, window.WookWarnings || {} ),
 
		/* Initialize the script */
		init: function () {
 
			var	i,
				$curLink,
				$container,
				$warningLinks;
 
			if ( typeof $.getUrlVar( 'diff' ) !== 'undefined' ) {
				if ( mw.config.get( 'skin' ) === 'oasis' ) {
					$container = $('#PageHeader').find('.page-header__subtitle');
				} else {
					$container = $( '#contentSub' );
				}
 
				$container.append( ' (<span id="warning-links">Warnings: </span>)' );
				$warningLinks = $container.find( '#warning-links' );
				for ( i in AjaxWookWarningScript.warnings ) {
					if ( AjaxWookWarningScript.warnings.hasOwnProperty( i ) ) {
						$curLink = AjaxWookWarningScript.createLink( i );
						$warningLinks.append( ' &bull; ', $curLink, ' &bull; ' );
					}
				}
			}
 
		},
 
		createLink: function ( key ) {
			var $linkObj;
			if ( AjaxWookWarningScript.warnings.hasOwnProperty( key ) ) {
				$linkObj = $( '<a />' ).text( AjaxWookWarningScript.warnings[key].linkText ).attr( 'href', '#' ).attr( 'data-warning', key ).click( function () {
 
					AjaxWookWarningScript.getEditToken( $( this ) );
 
				} );
				return $linkObj;
			}
			alert( 'Error in warnings list' );
			return '';
		},
 
		/* API Edit functions */
		getEditToken: function ( e ) {
			var url = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/api.php?action=query&prop=info|revisions&intoken=edit&titles=' + encodeURIComponent( mw.config.get( 'wgPageName' ) ) + '&format=json';
			$.getJSON( url, function ( data ) {
				var editToken = data.query.pages[mw.config.get( 'wgArticleId' )].edittoken;
				AjaxWookWarningScript.getPageText( editToken, e );
			} );
		},
 
		getPageText: function ( editToken, e ) {
			var	bodyId = ( mw.config.get( 'skin' ) === 'oasis' ? '#WikiaArticle' : '#bodyContent' ),
				diffUserName = $( bodyId ).find( '#mw-diff-ntitle2 > .mw-userlink' ).text(),
				pageTitle = 'User talk:' + diffUserName,
				warningType = e.attr( 'data-warning' ),
				warningHeading = AjaxWookWarningScript.warnings[warningType].heading,
				warningText = AjaxWookWarningScript.warnings[warningType].warningText;
 
			AjaxWookWarningScript.makeAPIEdit( pageTitle, warningHeading, warningText, editToken );
		},
 
		makeAPIEdit: function ( page, summary, content, editToken ) {
			$.ajax( {
				url: mw.config.get( 'wgScriptPath' ) + '/api.php?',
				data: 'action=edit&title=' + encodeURIComponent( page ) + '&summary=' + encodeURIComponent( summary ) + '&section=new&text=' + encodeURIComponent( content ) + '&format=json&token=' + encodeURIComponent( editToken ),
				dataType: 'json',
				type: 'POST',
				success: function( data ) {
					if ( data.edit.result === "Success" ) {
						alert( 'Warned user!' );
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
 
	$( AjaxWookWarningScript.init );
 
}( jQuery, mediaWiki, window ) );