// From http://dev.wikia.com/wiki/QuickCreateUserPage (modified by AmonFatalis)
 
( function( $, mw, window ) {
	'use strict';
 
	var QuickCreateUserPage = {
 
		init: function() {
			var $qcLink = $( '<li />' ).attr( 'class', 'quick-cup' ).html( $( '<a />' ).attr( 'title', QuickCreateUserPage.langMsg( 'button-tooltip', true ) )
				.attr( 'style', 'cursor: pointer' ).text( QuickCreateUserPage.langMsg( 'button-link-text', true ) )
				.click( QuickCreateUserPage.createUserPage ) );
			if ( mw.config.get( 'skin' ) === 'oasis' ) {
				$( '.wds-global-navigation__user-menu .wds-list > li:last' ).prepend( $qcLink );
			} else {
				$( '#column-one' ).find( '#p-personal > .pBody > ul' ).prepend( $qcLink );
			}
		},
 
		langConfig: {
			//Lang
			en: {
				'button-link-text': 'ConVol',
				'button-tooltip': 'ConVol',
				'buttontalk-link-text': 'Create user talk page',
				'buttontalk-tooltip': 'Create your user talk page',
				'cup-reason': 'Erstellen der Benutzerseite',
				'cup-success-text': 'Benutzerseite erfolgreich erstellt!',
				'cup-error-exists': 'Benutzerseite existiert bereits!',
				'cup-error-failed': 'Benutzerseite konnte nicht erstellt werden!'
			}
		},
 
		langMsg: function ( name, userLang ) {
			if ( userLang && mw.config.get( 'wgUserLanguage' ) in QuickCreateUserPage.langConfig && name in QuickCreateUserPage.langConfig[mw.config.get( 'wgUserLanguage' )] ) {
				return QuickCreateUserPage.langConfig[mw.config.get( 'wgUserLanguage' )][name];
			}
			if ( !userLang && mw.config.get( 'wgContentLanguage' ) in QuickCreateUserPage.langConfig && name in QuickCreateUserPage.langConfig[mw.config.get( 'wgContentLanguage' )] ) {
				return QuickCreateUserPage.langConfig[mw.config.get( 'wgContentLanguage' )][name];
			}
			return QuickCreateUserPage.langConfig.en[name];
		},
 
		createUserPage: function() {
			var	userPageContent = window.qtUserPageTemplate || '{{w:User:RainA/de}}',
				pageName = 'User:' + mw.config.get( 'wgUserName' ),
				overwriteUserPage = window.qtEnableUserPageOverwrite || true;
			if ( overwriteUserPage === true ) {
				QuickCreateUserPage.makeEdit( pageName, userPageContent );
				return;
			}
			$.getJSON( mw.util.wikiScript( 'api' ), {
				action: 'query',
				prop: 'revisions',
				titles: pageName,
				format: 'json'
			} ).done( function ( data ) {
				var	pageIds = Object.keys( data.query.pages ),
					pageId = pageIds[0];
				if ( pageId !== '-1' ) {
					QuickCreateUserPage.showResult( 'ok', 'cup-error-exists' );
				} else {
					QuickCreateUserPage.makeEdit( pageName, userPageContent );
				}
			} );
		},
 
		makeEdit: function( pageName, pageContent ) {
			$.ajax( {
				type: 'POST',
				url: mw.util.wikiScript( 'api' ),
				dataType: 'json',
				data: {
					action: 'edit',
					title: pageName,
					summary: QuickCreateUserPage.langMsg( 'cup-reason', false ),
					text: pageContent,
					format: 'json',
					token: mw.user.tokens.get( 'editToken' )
				}
			} ).done( function ( data ) {
				if ( data.edit.result === 'Success' ) {
					QuickCreateUserPage.showResult( 'ok', 'cup-success-text' );
				} else {
					QuickCreateUserPage.showResult( 'error', 'cup-error-failed' );
				}
			} ).fail( function ( data ) {
				QuickCreateUserPage.showResult( 'error', 'cup-error-failed' );
			} );
		},
 
		showResult: function( result, message ) {
			if ( mw.config.get( 'skin' ) === 'monobook' ) {
				mw.util.$content.prepend(
					'<div class="' + ( result === 'error' ? 'errorbox' : 'successbox' ) + '"><p class="plainlinks"><img src="' +
					mw.config.get( 'wgBlankImgUrl' ) + '" class="sprite ' + result + '"> ' + QuickCreateUserPage.langMsg( message, true ) + '</p></div>' +
					'<div class="visualClear"></div>'
				);
			} else {
				var resultClass = ( result === 'error' ? 'error' : 'confirm' );
				window.GlobalNotification.show( QuickCreateUserPage.langMsg( message, true ), resultClass );
			}
		}
	};
 
	$( QuickCreateUserPage.init );
}( jQuery, mediaWiki, this ) );

// From http://dev.wikia.com/wiki/QuickCreateUserPage (modified by AmonFatalis)
 
( function( $, mw, window ) {
	'use strict';
 
	var QuickCreateUserPage = {
 
		init: function() {
			var $qcLink = $( '<li />' ).attr( 'class', 'quick-cup' ).html( $( '<a />' ).attr( 'title', QuickCreateUserPage.langMsg( 'button-tooltip', true ) )
				.attr( 'style', 'cursor: pointer' ).text( QuickCreateUserPage.langMsg( 'button-link-text', true ) )
				.click( QuickCreateUserPage.createUserPage ) );
			if ( mw.config.get( 'skin' ) === 'oasis' ) {
				$( '.wds-global-navigation__user-menu .wds-list > li:last' ).prepend( $qcLink );
			} else {
				$( '#column-one' ).find( '#p-personal > .pBody > ul' ).prepend( $qcLink );
			}
		},
 
		langConfig: {
			//Lang
			en: {
				'button-link-text': 'Benutzerseite',
				'button-tooltip': 'Benutzerseite',
				'buttontalk-link-text': 'Create user talk page',
				'buttontalk-tooltip': 'Create your user talk page',
				'cup-reason': 'Erstellen der Benutzerseite',
				'cup-success-text': 'Benutzerseite erfolgreich erstellt!',
				'cup-error-exists': 'Benutzerseite existiert bereits!',
				'cup-error-failed': 'Benutzerseite konnte nicht erstellt werden!'
			}
		},
 
		langMsg: function ( name, userLang ) {
			if ( userLang && mw.config.get( 'wgUserLanguage' ) in QuickCreateUserPage.langConfig && name in QuickCreateUserPage.langConfig[mw.config.get( 'wgUserLanguage' )] ) {
				return QuickCreateUserPage.langConfig[mw.config.get( 'wgUserLanguage' )][name];
			}
			if ( !userLang && mw.config.get( 'wgContentLanguage' ) in QuickCreateUserPage.langConfig && name in QuickCreateUserPage.langConfig[mw.config.get( 'wgContentLanguage' )] ) {
				return QuickCreateUserPage.langConfig[mw.config.get( 'wgContentLanguage' )][name];
			}
			return QuickCreateUserPage.langConfig.en[name];
		},
 
		createUserPage: function() {
			var	userPageContent = window.qtUserPageTemplate || '{{w:User:RainA/nicht-aktiv}}',
				pageName = 'User:' + mw.config.get( 'wgUserName' ),
				overwriteUserPage = window.qtEnableUserPageOverwrite || true;
			if ( overwriteUserPage === true ) {
				QuickCreateUserPage.makeEdit( pageName, userPageContent );
				return;
			}
			$.getJSON( mw.util.wikiScript( 'api' ), {
				action: 'query',
				prop: 'revisions',
				titles: pageName,
				format: 'json'
			} ).done( function ( data ) {
				var	pageIds = Object.keys( data.query.pages ),
					pageId = pageIds[0];
				if ( pageId !== '-1' ) {
					QuickCreateUserPage.showResult( 'ok', 'cup-error-exists' );
				} else {
					QuickCreateUserPage.makeEdit( pageName, userPageContent );
				}
			} );
		},
 
		makeEdit: function( pageName, pageContent ) {
			$.ajax( {
				type: 'POST',
				url: mw.util.wikiScript( 'api' ),
				dataType: 'json',
				data: {
					action: 'edit',
					title: pageName,
					summary: QuickCreateUserPage.langMsg( 'cup-reason', false ),
					text: pageContent,
					format: 'json',
					token: mw.user.tokens.get( 'editToken' )
				}
			} ).done( function ( data ) {
				if ( data.edit.result === 'Success' ) {
					QuickCreateUserPage.showResult( 'ok', 'cup-success-text' );
				} else {
					QuickCreateUserPage.showResult( 'error', 'cup-error-failed' );
				}
			} ).fail( function ( data ) {
				QuickCreateUserPage.showResult( 'error', 'cup-error-failed' );
			} );
		},
 
		showResult: function( result, message ) {
			if ( mw.config.get( 'skin' ) === 'monobook' ) {
				mw.util.$content.prepend(
					'<div class="' + ( result === 'error' ? 'errorbox' : 'successbox' ) + '"><p class="plainlinks"><img src="' +
					mw.config.get( 'wgBlankImgUrl' ) + '" class="sprite ' + result + '"> ' + QuickCreateUserPage.langMsg( message, true ) + '</p></div>' +
					'<div class="visualClear"></div>'
				);
			} else {
				var resultClass = ( result === 'error' ? 'error' : 'confirm' );
				window.GlobalNotification.show( QuickCreateUserPage.langMsg( message, true ), resultClass );
			}
		}
	};
 
	$( QuickCreateUserPage.init );
}( jQuery, mediaWiki, this ) );
// From http://dev.wikia.com/wiki/QuickCreateUserPage (modified by AmonFatalis)
 
( function( $, mw, window ) {
	'use strict';
 
	var QuickCreateUserPage = {
 
		init: function() {
			var $qcLink = $( '<li />' ).attr( 'class', 'quick-cup' ).html( $( '<a />' ).attr( 'title', QuickCreateUserPage.langMsg( 'button-tooltip', true ) )
				.attr( 'style', 'cursor: pointer' ).text( QuickCreateUserPage.langMsg( 'button-link-text', true ) )
				.click( QuickCreateUserPage.createUserPage ) );
			if ( mw.config.get( 'skin' ) === 'oasis' ) {
				$( '.wds-global-navigation__user-menu .wds-list > li:last' ).prepend( $qcLink );
			} else {
				$( '#column-one' ).find( '#p-personal > .pBody > ul' ).prepend( $qcLink );
			}
		},
 
		langConfig: {
			//Lang
			en: {
				'button-link-text': 'User page',
				'button-tooltip': 'User page',
				'buttontalk-link-text': 'Create user talk page',
				'buttontalk-tooltip': 'Create your user talk page',
				'cup-reason': 'Creating user page',
				'cup-success-text': 'Successfully created page!',
				'cup-error-exists': 'Page already exists!',
				'cup-error-failed': 'Creating page failed!'
			}
		},
 
		langMsg: function ( name, userLang ) {
			if ( userLang && mw.config.get( 'wgUserLanguage' ) in QuickCreateUserPage.langConfig && name in QuickCreateUserPage.langConfig[mw.config.get( 'wgUserLanguage' )] ) {
				return QuickCreateUserPage.langConfig[mw.config.get( 'wgUserLanguage' )][name];
			}
			if ( !userLang && mw.config.get( 'wgContentLanguage' ) in QuickCreateUserPage.langConfig && name in QuickCreateUserPage.langConfig[mw.config.get( 'wgContentLanguage' )] ) {
				return QuickCreateUserPage.langConfig[mw.config.get( 'wgContentLanguage' )][name];
			}
			return QuickCreateUserPage.langConfig.en[name];
		},
 
		createUserPage: function() {
			var	userPageContent = window.qtUserPageTemplate || '{{w:User:RainA}}',
				pageName = 'User:' + mw.config.get( 'wgUserName' ),
				overwriteUserPage = window.qtEnableUserPageOverwrite || true;
			if ( overwriteUserPage === true ) {
				QuickCreateUserPage.makeEdit( pageName, userPageContent );
				return;
			}
			$.getJSON( mw.util.wikiScript( 'api' ), {
				action: 'query',
				prop: 'revisions',
				titles: pageName,
				format: 'json'
			} ).done( function ( data ) {
				var	pageIds = Object.keys( data.query.pages ),
					pageId = pageIds[0];
				if ( pageId !== '-1' ) {
					QuickCreateUserPage.showResult( 'ok', 'cup-error-exists' );
				} else {
					QuickCreateUserPage.makeEdit( pageName, userPageContent );
				}
			} );
		},
 
		makeEdit: function( pageName, pageContent ) {
			$.ajax( {
				type: 'POST',
				url: mw.util.wikiScript( 'api' ),
				dataType: 'json',
				data: {
					action: 'edit',
					title: pageName,
					summary: QuickCreateUserPage.langMsg( 'cup-reason', false ),
					text: pageContent,
					format: 'json',
					token: mw.user.tokens.get( 'editToken' )
				}
			} ).done( function ( data ) {
				if ( data.edit.result === 'Success' ) {
					QuickCreateUserPage.showResult( 'ok', 'cup-success-text' );
				} else {
					QuickCreateUserPage.showResult( 'error', 'cup-error-failed' );
				}
			} ).fail( function ( data ) {
				QuickCreateUserPage.showResult( 'error', 'cup-error-failed' );
			} );
		},
 
		showResult: function( result, message ) {
			if ( mw.config.get( 'skin' ) === 'monobook' ) {
				mw.util.$content.prepend(
					'<div class="' + ( result === 'error' ? 'errorbox' : 'successbox' ) + '"><p class="plainlinks"><img src="' +
					mw.config.get( 'wgBlankImgUrl' ) + '" class="sprite ' + result + '"> ' + QuickCreateUserPage.langMsg( message, true ) + '</p></div>' +
					'<div class="visualClear"></div>'
				);
			} else {
				var resultClass = ( result === 'error' ? 'error' : 'confirm' );
				window.GlobalNotification.show( QuickCreateUserPage.langMsg( message, true ), resultClass );
			}
		}
	};
 
	$( QuickCreateUserPage.init );
}( jQuery, mediaWiki, this ) );