window.gadgetFlagInternational = {
	pageConfig: {
		namespace: 'Wiki_La_triade',
		namespaceId: 4,
		requestsPage: 'Wiki_La_triade:Gadgets'
	},
//	titleSchema: '$1 sur $2',
//	wikitextSchema: //'{{bStart}}Demande/gadget{{bEnd}}\n\n' +
//		'{{bStart}}Demande/gadget\n' +
//		'|1-Wiki name      = {{wikiName}}\n' +
//		'|2-Bot URL        = {{{gadgetUrl}}}\n' +
//		'|3-Bot name       = {{botName}}\n' +
//		'|4-Requester      = {{requesterName}}\n' +
//		'|5-Community vote = {{{communityVote}}}\n' +
//		'|6-Comments       = {{comments}}\n' +
//		'{{bEnd}}'
//	};
//		'{{bStart}}Demande gadget\n' +
//		'| 0-Statut        = \n' +
//		'| 1-Nom_wiki      = {{wikiName}}\n' +
//		'| 2-Lien_bot      = {{{gadgetUrl}}}\n' +
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
	window.gadgetFlagInternational = ( window.gadgetFlagInternational || {} );

	window.gadgetFlagInternational.pageConfig = ( window.gadgetFlagInternational.pageConfig || {} );
//	window.gadgetFlagInternational = {
//	pageConfig: {
//		namespace: 'Wiki_La_triade',
//		namespaceId: 4,
//		requestsPage: 'Wiki_La_triade:gadget',
//	},
	window.gadgetFlagInternational.pageConfig.namespace = ( window.gadgetFlagInternational.pageConfig.namespace || 'Wiki_La_triade' );
	window.gadgetFlagInternational.pageConfig.namespaceId = ( window.gadgetFlagInternational.pageConfig.namespaceId || 4 );
	window.gadgetFlagInternational.pageConfig.requestsPage = ( window.gadgetFlagInternational.pageConfig.requestsPage || 'Wiki_La_triade:Gadgets' );
	window.gadgetFlagInternational.pageConfig.permissionType = ([
            'sysop',
            'bureaucrat'
            ] );
	window.gadgetFlagInternational.titleSchema = ( window.gadgetFlagInternational.titleSchema || '$1 sur $2' );
	window.gadgetFlagInternational.wikitextSchema = ( window.gadgetFlagInternational.wikitextSchema ||
		'{{bStart}}Demande/gadget\n' +
		'|1-Wiki name      = {{wikiName}}\n' +
		'|2-Bot URL        = {{{gadgetUrl}}}{{{permissionstype}}}\n' +
		'|3-Bot name       = {{botName}}\n' +
		'|4-Requester      = {{requesterName}}\n' +
		'|5-Community vote = {{{communityVote}}}\n' +
		'|6-Comments       = {{comments}}\n' +
		'{{bEnd}}'
	);

	const conf = window.gadgetFlagInternational;
	const userName = mw.config.get( 'wgUserName' );

	/**
	 * Do not run when not necessary:
	 * - Wrong page name
	 * - Form already loaded
	 * - User not logged in
	 */
	if (
		mw.config.get( 'wgPageName' ) !== conf.pageConfig.requestsPage ||
		window.gadgetFlagFormLoaded ||
		!userName
	) {
		return;
	}
	window.gadgetFlagFormLoaded = true;


	/**
	 * Preload mechanism shamelessly stolen from AjaxBatchDelete.js
	 */
	var preloads = 3;
	function preload() {
		if ( --preloads === 0 ) {
			const mwMessages = conf.adoptionConfig.permissionTypes.map( function( group ) {
				return 'group-' + group + '-member';
			} );
	}
	}
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
		const gadgetFlagModal = new window.dev.modal.Modal( {
			title: 'Demande gadget',//i18n.msg( 'modalTitle' ).plain()
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
				classes: ['gadgetFlagForm', 'fandomCCForm'],
				attr: {
					method: '',
					name: '',
					id: 'gadgetFlagForm'
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
										text: 'Page du robot'//i18n.msg( 'gadgetUrlHeader' ).plain()
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
											id: 'gadgetUrl',
											name: 'gadgetUrl',
											placeholder: 'https://wiki.fandom.com/fr/wiki/Utilisateur:CompteDeVotreRobot'//i18n.msg( 'gadgetUrlPlaceholder' ).plain()
										}
									}
								]
							}
						]
					},
////////////////////////////////////////////////////////////////////
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
										text: 'Permission Header'//i18n.msg( 'permissionHeader' ).plain()
									}
								]
							},
							{
								type: 'div',
								classes: ['sectionContent'],
								children: [
									{
										type: 'label',
										attr: {
											for: 'permissionstype'
										},
										text: 'Permission Label'//i18n.msg( 'permissionLabel' ).plain()
									},
									{
										type: 'select',
										classes: ['formInput'],
										attr: {
											id: 'permissionstype',
											name: 'permissionstype',
											required: ''
										},
										children: availableGroups
									}
								]
							}
						]
					},
//////////////////////////////////////////////					
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
						return $( '#gadgetFlagForm' ).find( '#' + id ).val().trim();
					}
					const formValues = {
						wikiName: getVal( 'wikiName'),
						gadgetUrl: getVal( 'gadgetUrl' ),
						permissionsType: ( getVal( 'permissionstype' ) || 'bureaucrat' ),						
						communityVote: getVal( 'communityVote' ),
						comments: getVal( 'comments' )
					};

					const botNameRE = /^(.+\/wiki\/.+?\:)/;
					const botAccountName = formValues.gadgetUrl.replace( botNameRE, '' );

					/**
					 * Catch missing values and halt the script if necessary
					 */
					if ( formValues.wikiName === '' ) {
						return mw.notify( 'Vous devez fournir le nom du wiki !', { //i18n.msg( 'noWikiNameError' ).plain()
							tag: 'gadgetFlag',
							type: 'warn'
						} );
					}

					if ( formValues.gadgetUrl === '' ) {
						return mw.notify( 'Vouos devez fournir l\'URL de la page de profil du robot !', {//i18n.msg( 'nogadgetUrlError' ).plain()
							tag: 'gadgetFlag',
							type: 'warn'
						} );
					}

					if ( !botAccountName || botAccountName === formValues.gadgetUrl ) {
						return mw.notify( 'Nous n\'avons pas pu détecter le nom du robot en se basant sur l\'URL fournie. Veuillez vous assurez que l\'URL est valide.', {//i18n.msg( 'noBotNameError' ).plain()
							tag: 'gadgetFlag',
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
						gadgetUrl: formValues.gadgetUrl,
						botName: botAccountName,
						permissionsType: formValues.permissionsType,
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
										tag: 'gadgetFlag',
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
								tag: 'gadgetFlag',
								type: 'error'
							} );
						} );
					} ).fail( function() {
						mw.notify( i18n.msg( 'submitError' ).plain(), {
							tag: 'gadgetFlag',
							type: 'error'
						} );
					} );
				}
			}
		} );

		gadgetFlagModal.create();

		/**
		 * This will create button triggering the form
		 */
		$( '#gadgetform' )
			.attr( 'class', 'wds-button btn-large' )
			.text( 'Demander' ) //i18n.msg( 'gadgetFlagButtonLabel' ).plain()
			.wrap( $( '<div>' ).css( 'text-align', 'center' ) )
			.css( 'cursor', 'pointer' )
			.on( 'click', function() {
				gadgetFlagModal.show();
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