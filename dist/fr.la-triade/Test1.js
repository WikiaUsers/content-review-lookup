window.testFlagInternational = {
	pageConfig: {
		namespace: 'Wiki_La_triade',
		namespaceId: 4,
		requestsPage: 'Wiki_La_triade:Test'
	},
//	titleSchema: '$1 sur $2',
//	wikitextSchema: //'{{bStart}}Demande/test{{bEnd}}\n\n' +
//		'{{bStart}}Demande/test\n' +
//		'|1-Wiki name      = {{wikiName}}\n' +
//		'|2-Bot URL        = {{{testUrl}}}\n' +
//		'|3-Bot name       = {{botName}}\n' +
//		'|4-Requester      = {{requesterName}}\n' +
//		'|5-Community vote = {{{communityVote}}}\n' +
//		'|6-Comments       = {{comments}}\n' +
//		'{{bEnd}}'
//	};
//		'{{bStart}}Demande test\n' +
//		'| 0-Statut        = \n' +
//		'| 1-Nom_wiki      = {{wikiName}}\n' +
//		'| 2-Lien_bot      = {{{testUrl}}}\n' +
//		'| 3-Nom_bot       = {{botName}}\n' +
//		'| 4-Nom_demandeur = {{requesterName}}\n' +
//		'| 5-Discussion    = {{{communityVote}}}\n' +
//		'| 6-Raisons       = {{comments}}\n' +
//	'{{bEnd}}'
};
/** <nowiki>
 * @name Bot Flag Form
 * @description Script for universal bot flag request modals on Community Central wikis
 * @author Rail
 */
mw.loader.using( ['jquery.client', 'mediawiki.base', 'mediawiki.api', 'mediawiki.template.mustache'] ).then( function() {
	/**
	 * Export global config
	 */
	window.testFlagInternational = ( window.testFlagInternational || {} );

	window.testFlagInternational.pageConfig = ( window.testFlagInternational.pageConfig || {} );
//	window.testFlagInternational = {
//	pageConfig: {
//		namespace: 'Wiki_La_triade',
//		namespaceId: 4,
//		requestsPage: 'Wiki_La_triade:Test',
//	},
	window.testFlagInternational.pageConfig.namespace = ( window.testFlagInternational.pageConfig.namespace || 'Wiki_La_triade' );
	window.testFlagInternational.pageConfig.namespaceId = ( window.testFlagInternational.pageConfig.namespaceId || 4 );
	window.testFlagInternational.pageConfig.requestsPage = ( window.testFlagInternational.pageConfig.requestsPage || 'Wiki_La_triade:Test' );

	window.testFlagInternational.titleSchema = ( window.testFlagInternational.titleSchema || '$1 sur $2' );
	window.testFlagInternational.wikitextSchema = ( window.testFlagInternational.wikitextSchema ||
		'{{bStart}}Demande/test\n' +
		'|1-Wiki name      = {{wikiName}}\n' +
		'|2-Bot URL        = {{{testUrl}}}\n' +
		'|3-Bot name       = {{botName}}\n' +
		'|4-Requester      = {{requesterName}}\n' +
		'|5-Community vote = {{{communityVote}}}\n' +
		'|6-Comments       = {{comments}}\n' +
		'{{bEnd}}'
	);

	const conf = window.testFlagInternational;
	const userName = mw.config.get( 'wgUserName' );

	/**
	 * Do not run when not necessary:
	 * - Wrong page name
	 * - Form already loaded
	 * - User not logged in
	 */
	if (
		mw.config.get( 'wgPageName' ) !== conf.pageConfig.requestsPage ||
		window.testFlagFormLoaded ||
		!userName
	) {
		return;
	}
	window.testFlagFormLoaded = true;

	/**
	 * Preload mechanism shamelessly stolen from AjaxBatchDelete.js
	 */
	var preloads = 3;
	function preload() {
		if ( --preloads === 0 ) {
			window.dev.i18n.loadMessages( 'BotFlag_International' ).then( init );
		}
	}

	function init( i18n ) {
		const api = new mw.Api();
		const testFlagModal = new window.dev.modal.Modal( {
			title: 'Demande test',//i18n.msg( 'modalTitle' ).plain()
			id: 'requestWindow',
			size: 'large',
			buttons: [
				{
					id: 'submitButton',
					primary: true,
					event: 'submitForm',
					text: 'Soumettre'//i18n.msg( 'submitLabel' ).plain()
				}
			],
			closeTitle: i18n.msg( 'closeLabel' ).plain(),
			content: {
				type: 'form',
				classes: ['testFlagForm', 'fandomCCForm'],
				attr: {
					method: '',
					name: '',
					id: 'testFlagForm'
				},
				children: [
					{
						type: 'div',
						classes: ['formSection'],
						children: [
							{
								type: 'div',
								classes: ['sectionHeaderWrapper'],
								children: [
									{
										type: 'h3',
										classes: ['sectionHeader'],
										text: 'Nom du wiki',//i18n.msg( 'wikiNameHeader' ).plain()
									}
								]
							},
							{
								type: 'div',
								classes: ['sectionContent'],
								children: [
									{
										type: 'input',
										classes: ['formInput'],
										attr: {
											id: 'wikiName',
											name: 'wikiName',
											placeholder: 'Le nom de votre wiki'//i18n.msg( 'wikiNamePlaceholder' ).plain()
										}
									}
								]
							}
						]
					},
					{
						type: 'div',
						classes: ['formSection'],
						children: [
							{
								type: 'div',
								classes: ['sectionHeaderWrapper'],
								children: [
									{
										type: 'h3',
										classes: ['sectionHeader'],
										text: 'Page du robot'//i18n.msg( 'testUrlHeader' ).plain()
									}
								]
							},
							{
								type: 'div',
								classes: ['sectionContent'],
								children: [
									{
										type: 'input',
										classes: ['formInput'],
										attr: {
											id: 'testUrl',
											name: 'testUrl',
											placeholder: 'https://wiki.fandom.com/fr/wiki/Utilisateur:CompteDeVotreRobot'//i18n.msg( 'testUrlPlaceholder' ).plain()
										}
									}
								]
							}
						]
					},
					{
						type: 'div',
						classes: ['formSection'],
						children: [
							{
								type: 'div',
								classes: ['sectionHeaderWrapper'],
								children: [
									{
										type: 'h3',
										classes: ['sectionHeader'],
										text: 'Vote de la communauté'//i18n.msg( 'communityVoteHeader' ).plain()
									},
									{
										type: 'div',
										classes: ['sectionHeaderOptional'],
										text: 'Option'//i18n.msg( 'headerOptional' ).plain()
									}
								]
							},
							{
								type: 'div',
								classes: ['sectionContent'],
								children: [
									{
										type: 'input',
										classes: ['formInput'],
										attr: {
											id: 'communityVote',
											name: 'communityVote',
											placeholder: 'Approbation de la communauté sur l\'obtention de l\'étiquette de votre robot'//i18n.msg( 'communityVotePlaceholder' ).plain()
										}
									}
								]
							}
						]
					},
					{
						type: 'div',
						classes: ['formSection'],
						children: [
							{
								type: 'div',
								classes: ['sectionHeaderWrapper'],
								children: [
									{
										type: 'h3',
										classes: ['sectionHeader'],
										text: 'Commentaires'//i18n.msg( 'commentsHeader' ).plain()
									},
									{
										type: 'div',
										classes: ['sectionHeaderOptional'],
										text: 'Option'//i18n.msg( 'headerOptional' ).plain()
									}
								]
							},
							{
								type: 'div',
								classes: ['sectionContent'],
								children: [
									{
										type: 'textarea',
										classes: ['formInput'],
										attr: {
											id: 'comments',
											name: 'comments',
											placeholder: 'Expliquez la demande'//i18n.msg( 'commentsPlaceholder' ).plain()
										}
									}
								]
							}
						]
					}
				]
			},
			events: {
				submitForm: function() {
					function getVal( id ) {
						return $( '#testFlagForm' ).find( '#' + id ).val().trim();
					}
					const formValues = {
						wikiName: getVal( 'wikiName'),
						testUrl: getVal( 'testUrl' ),
						communityVote: getVal( 'communityVote' ),
						comments: getVal( 'comments' )
					};

					const botNameRE = /^(.+\/wiki\/.+?\:)/;
					const botAccountName = formValues.testUrl.replace( botNameRE, '' );

					/**
					 * Catch missing values and halt the script if necessary
					 */
					if ( formValues.wikiName === '' ) {
						return mw.notify( 'Vous devez fournir le nom du wiki !', { //i18n.msg( 'noWikiNameError' ).plain()
							tag: 'testFlag',
							type: 'warn'
						} );
					}

					if ( formValues.testUrl === '' ) {
						return mw.notify( 'Vouos devez fournir l\'URL de la page de profil du robot !', {//i18n.msg( 'notestUrlError' ).plain()
							tag: 'testFlag',
							type: 'warn'
						} );
					}

					if ( !botAccountName || botAccountName === formValues.testUrl ) {
						return mw.notify( 'Nous n\'avons pas pu détecter le nom du robot en se basant sur l\'URL fournie. Veuillez vous assurez que l\'URL est valide.', {//i18n.msg( 'noBotNameError' ).plain()
							tag: 'testFlag',
							type: 'warn'
						} );
					}

					const pageTitle = conf.titleSchema
						.replace( /\$1/g, botAccountName )
						.replace( /\$2/g, formValues.wikiName );

					/**
					 * Render Mustache.js template to be used as w wikitext schema for new request page
					 */
					const pageContent = Mustache.render( conf.wikitextSchema, {
						wikiName: formValues.wikiName,
						testUrl: formValues.testUrl,
						botName: botAccountName,
						requesterName: userName,
						communityVote: formValues.communityVote,
						comments: formValues.comments,
						// Technical - for wikitext
						bStart: '{{',
						bEnd: '}}'
					} );

					/**
					 * Check for already existing requests matching the name
					 */
					api.get( {
						action: 'query',
						list: 'allpages',
						apnamespace: conf.pageConfig.namespaceId,
						apprefix: pageTitle,
						aplimit: 'max'
					} ).done( function( resp ) {
						/**
						 * Create suffix string if there are already existing requests
						 * We don't want to override existing request page by accident
						 */
						const suffixRE = /.*\((\d+)\)/;
						var suffix = '';
						var highestRequest = 0;

						if ( resp.query ) {
							if ( resp.query.allpages.length > 0 ) {
								highestRequest = 1;
							}

							for ( var p in resp.query.allpages ) {
								if ( resp.query.allpages[p].title === undefined ) {
									continue;
								}

								const match = resp.query.allpages[p].title.match( suffixRE );

								if ( !match ) {
									continue;
								}

								if ( parseInt( match[1] ) > highestRequest ) {
									highestRequest = parseInt( match[1] );
								}
							}

							if ( highestRequest > 0 ) {
								suffix = ' (' + ( highestRequest + 1 ) + ')';
							}
						}

						const createPageName = conf.pageConfig.namespace + ':' + pageTitle + suffix;

						api.postWithEditToken( {
							action: 'edit',
							title: createPageName,
							text: pageContent,
							createonly: true
						} ).done( function( data ) {
							if ( data.edit ) {
								if ( data.edit.warnings ) {
									return mw.notify( data.edit.warnings.main['*'], {
										tag: 'testFlag',
										type: 'error'
									} );
								}
							}

							/**
							 * Take user to their newly created request page
							 */
							location.href = mw.util.getUrl( createPageName );
						} ).fail( function() {
							mw.notify( i18n.msg( 'submitError' ).plain(), {
								tag: 'testFlag',
								type: 'error'
							} );
						} );
					} ).fail( function() {
						mw.notify( i18n.msg( 'submitError' ).plain(), {
							tag: 'testFlag',
							type: 'error'
						} );
					} );
				}
			}
		} );

		testFlagModal.create();

		/**
		 * This will create button triggering the form
		 */
		$( '#test-form' )
			.attr( 'class', 'wds-button btn-large' )
			.text( 'Demander' ) //i18n.msg( 'testFlagButtonLabel' ).plain()
			.wrap( $( '<div>' ).css( 'text-align', 'center' ) )
			.css( 'cursor', 'pointer' )
			.on( 'click', function() {
				testFlagModal.show();
			} );
	}

	importArticles(
		{
			type: 'scripts',
			articles: [
				'u:dev:MediaWiki:Modal.js',
				'u:dev:MediaWiki:UI-js/code.js',
				'u:dev:MediaWiki:I18n-js/code.js'
			]
		},
		{
			type: 'styles',
			articles: [
				'u:dev:MediaWiki:International_Requests.css'
			]
		}
	);

	mw.hook( 'dev.i18n' ).add( preload );
	mw.hook( 'dev.modal' ).add( preload );
	mw.hook( 'dev.ui' ).add( preload );
} );
/*
 * </nowiki>
 */