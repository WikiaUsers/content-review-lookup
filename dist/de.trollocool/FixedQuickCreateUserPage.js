/* <syntaxhighlight lang="javascript"> */
/**
 * Ajax User Page Creation
 * Attempts to create a user page if it does not already exist
 *
 * @author Grunny
 * @license GPLv2+
 * @notes Modified from
 *        https://github.com/Wikia/app/blob/dev/extensions/wikia/QuickTools/modules/ext.createUserPage.js
 */
/*global jQuery, mediaWiki */
( function( $, mw, window ) {
	'use strict';
 
	var QuickCreateUserPage = {
 
		init: function() {
			var $qcLink = $( '<li />' ).attr( 'id', 'quick-cup' ).html( $( '<a />' ).attr( 'class', 'wds-global-navigation__dropdown-link').attr( 'title', QuickCreateUserPage.langMsg( 'button-tooltip', true ) )
				.attr( 'style', 'cursor: pointer' ).text( QuickCreateUserPage.langMsg( 'button-link-text', true ) )
				.click( QuickCreateUserPage.createUserPage ) );
			if ( mw.config.get( 'skin' ) === 'oasis' ) {
				$( '.wds-global-navigation__user-menu .wds-list' ).find( 'li:first' ).insertBefore( $qcLink );
			} else {
				$( '#column-one' ).find( '#p-personal > .pBody > ul' ).prepend( $qcLink );
			}
		},
 
		langConfig: {
			//English
			en: {
				'button-link-text': 'Create user page',
				'button-tooltip': 'Create your user page on this wiki automagically',
				'buttontalk-link-text': 'Create user talk page',
				'buttontalk-tooltip': 'Create your user talk page on this wiki automagically',
				'cup-reason': 'Creating user page',
				'cup-success-text': 'Successfully created page!',
				'cup-error-exists': 'Page already exists!',
				'cup-error-failed': 'Creating page failed!'
			},
			// German
			de: {
				'button-link-text': 'Benutzerseite erstellen',
				'button-tooltip': 'Erstelle deine Benutzerseite in diesem Wikia automatisch',
				'buttontalk-link-text': 'Benutzer-Diskussionsseite erstellen',
				'buttontalk-tooltip': 'Erstelle deine Benutzer-Diskussionsseite in diesem Wikia automatisch',
				'cup-reason': 'Benutzerseite erstellt',
				'cup-success-text': 'Erfolgreich erstellt worden!',
				'cup-error-exists': 'Seite existiert bereits!',
				'cup-error-failed': 'Erstellung fehlgeschlagen!'
			},
			// Spanish
			es: {
				'button-link-text': 'Crear página de usuario',
				'button-tooltip': 'Crea tu página de usuario en este wiki',
				'buttontalk-link-text': 'Crear página de discusión',
				'buttontalk-tooltip': 'Crea tu página de discusión en este wiki',
				'cup-reason': 'Creando página de usuario',
				'cup-success-text': '¡Página creada exitosamente!',
				'cup-error-exists': '¡Ya existe la página!',
				'cup-error-failed': '¡Error al crear la página!'
			},
			//French
			fr: {
				'button-link-text': 'Créer page utilisateur',
				'button-tooltip': 'Créer votre page utilisateur sur ce wiki automatiquement',
				'buttontalk-link-text': 'Créer page de discussion utilisateur',
				'buttontalk-tooltip': 'Créer votre page de discussion utilisateur sur ce wiki automatiquement',
				'cup-reason': 'Création page utilisateur',
				'cup-success-text': 'La création de la page a réussi !',
				'cup-error-exists': 'La page existe déjà !',
				'cup-error-failed': 'La création de la page a échoué !'
			},
			//Hungarian
			hu: {
				'button-link-text': 'Felhasználói lap létrehozása',
				'button-tooltip': 'Felhasználói lap automatikus létrehozása ezen a wikin',
				'buttontalk-link-text': 'Felhasználói vitalap létrehozása',
				'buttontalk-tooltip': 'Felhasználói vitalap automatikus létrehozása ezen a wikin',
				'cup-reason': 'Felhasználói lap létrehozása',
				'cup-success-text': 'Siekrült létrehozni a lapot!',
				'cup-error-exists': 'A lap már létezik!',
				'cup-error-failed': 'Nem sikerült létrehozni a lapot!'
			},
			//Dutch
			nl: {
				'button-link-text': 'Maak gebruikerspagina aan',
				'button-tooltip': 'Maak gebruikerspagina op deze wiki automagisch aan',
				'buttontalk-link-text': 'Maak gebruikersoverlegpagina aan',
				'buttontalk-tooltip': 'Maak gebruikersoverlegspagina op deze wiki automagisch aan',
				'cup-reason': 'Gebruikerspagina aanmaken',
				'cup-success-text': 'Pagina succesvol aangemaakt!',
				'cup-error-exists': 'Pagina bestaat al!',
				'cup-error-failed': 'Pagina aanmaken mislukt!'
			},
			// Polish
			pl: {
				'button-link-text': 'Utwórz stronę użytkownika',
				'button-tooltip': 'Utwórz automatycznie stronę użytkownika na tej Wiki',
				'buttontalk-link-text': 'Utwórz stronę dyskusji',
				'buttontalk-tooltip': 'Utwórz automatycznie stronę dyskusji na tej Wiki',
				'cup-reason': 'Tworzenie strony użytkownika',
				'cup-success-text': 'Zakończono tworzenie strony!',
				'cup-error-exists': 'Strona już istnieje',
				'cup-error-failed': 'Niepowodzenie!'
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
			var	userPageContent = window.qtUserPageTemplate || '{{w:User:' + mw.config.get( 'wgUserName' ) + '}}',
				pageName = 'User:' + mw.config.get( 'wgUserName' ),
				overwriteUserPage = window.qtEnableUserPageOverwrite || false;
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
					QuickCreateUserPage.showResult( 'error', 'cup-error-exists' );
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
			var resultClass = ( result === 'error' ? 'error' : 'confirm' );
			new BannerNotification( QuickCreateUserPage.langMsg( message, true ), resultClass ).show();
		}
	};
 
	$( QuickCreateUserPage.init );
}( jQuery, mediaWiki, this ) );
/* </syntaxhighlight> */