/** <nowiki>
 * @name Bot Flag Form
 * @description Script for universal bot flag request modals on Community Central wikis
 * @author Rail
 */
mw.loader.using( ['jquery.client', 'mediawiki.base', 'mediawiki.api', 'mediawiki.template.mustache'] ).then( function() {
	/**
	 * Export global config
	 */
	window.botFlagInternational = ( window.botFlagInternational || {} );

	window.botFlagInternational.pageConfig = ( window.botFlagInternational.pageConfig || {} );
	window.botFlagInternational.pageConfig.namespace = ( window.botFlagInternational.pageConfig.namespace || 'Bot_flag' );
	window.botFlagInternational.pageConfig.namespaceId = ( window.botFlagInternational.pageConfig.namespaceId || 120 );
	window.botFlagInternational.pageConfig.requestsPage = ( window.botFlagInternational.pageConfig.requestsPage || 'Project:Bot_flags' );

	window.botFlagInternational.titleSchema = ( window.botFlagInternational.titleSchema || '$1 at $2' );
	window.botFlagInternational.wikitextSchema = ( window.botFlagInternational.wikitextSchema ||
		'{{bStart}}Bot Flag Request\n' +
		'|1-Wiki name      = {{wikiName}}\n' +
		'|2-Bot URL        = {{{botUrl}}}\n' +
		'|3-Bot name       = {{botName}}\n' +
		'|4-Requester      = {{requesterName}}\n' +
		'|5-Community vote = {{{communityVote}}}\n' +
		'|6-Comments       = {{comments}}\n' +
		'{{bEnd}}'
	);

	const conf = window.botFlagInternational;
	const userName = mw.config.get( 'wgUserName' );

	/**
	 * Do not run when not necessary:
	 * - Wrong page name
	 * - Form already loaded
	 * - User not logged in
	 */
	if (
		mw.config.get( 'wgPageName' ) !== conf.pageConfig.requestsPage ||
		window.botFlagFormLoaded ||
		!userName
	) {
		return;
	}
	window.botFlagFormLoaded = true;

	/**
	 * Preload mechanism shamelessly stolen from AjaxBatchDelete.js
	 */
	var preloads = 3;
	function preload() {
		if ( --preloads === 0 ) {
			window.dev.i18n.loadMessages( 'Bot_Flags_International' ).then( init );
		}
	}

	function init( i18n ) {
		const api = new mw.Api();
		const botFlagModal = new window.dev.modal.Modal( {
			title: i18n.msg( 'modalTitle' ).plain(),
			id: 'requestWindow',
			size: 'large',
			buttons: [
				{
					id: 'submitButton',
					primary: true,
					event: 'submitForm',
					text: i18n.msg( 'submitLabel' ).plain()
				}
			],
			closeTitle: i18n.msg( 'closeLabel' ).plain(),
			content: {
				type: 'form',
				classes: ['botFlagForm', 'fandomCCForm'],
				attr: {
					method: '',
					name: '',
					id: 'botFlagForm'
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
										text: i18n.msg( 'wikiNameHeader' ).plain()
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
											placeholder: i18n.msg( 'wikiNamePlaceholder' ).plain()
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
										text: i18n.msg( 'botUrlHeader' ).plain()
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
											id: 'botUrl',
											name: 'botUrl',
											placeholder: i18n.msg( 'botUrlPlaceholder' ).plain()
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
										text: i18n.msg( 'communityVoteHeader' ).plain()
									},
									{
										type: 'div',
										classes: ['sectionHeaderOptional'],
										text: i18n.msg( 'headerOptional' ).plain()
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
											placeholder: i18n.msg( 'communityVotePlaceholder' ).plain()
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
										text: i18n.msg( 'commentsHeader' ).plain()
									},
									{
										type: 'div',
										classes: ['sectionHeaderOptional'],
										text: i18n.msg( 'headerOptional' ).plain()
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
											placeholder: i18n.msg( 'commentsPlaceholder' ).plain()
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
						return $( '#botFlagForm' ).find( '#' + id ).val().trim();
					}
					const formValues = {
						wikiName: getVal( 'wikiName'),
						botUrl: getVal( 'botUrl' ),
						communityVote: getVal( 'communityVote' ),
						comments: getVal( 'comments' )
					};

					const botNameRE = /^(.+\/wiki\/.+?\:)/;
					const botAccountName = formValues.botUrl.replace( botNameRE, '' );

					/**
					 * Catch missing values and halt the script if necessary
					 */
					if ( formValues.wikiName === '' ) {
						return mw.notify( i18n.msg( 'noWikiNameError' ).plain(), {
							tag: 'botFlag',
							type: 'warn'
						} );
					}

					if ( formValues.botUrl === '' ) {
						return mw.notify( i18n.msg( 'noBotUrlError' ).plain(), {
							tag: 'botFlag',
							type: 'warn'
						} );
					}

					if ( !botAccountName || botAccountName === formValues.botUrl ) {
						return mw.notify( i18n.msg( 'noBotNameError' ).plain(), {
							tag: 'botFlag',
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
						botUrl: formValues.botUrl,
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
										tag: 'botFlag',
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
								tag: 'botFlag',
								type: 'error'
							} );
						} );
					} ).fail( function() {
						mw.notify( i18n.msg( 'submitError' ).plain(), {
							tag: 'botFlag',
							type: 'error'
						} );
					} );
				}
			}
		} );

		botFlagModal.create();

		/**
		 * This will create button triggering the form
		 */
		$( '#botFlag-form' )
			.attr( 'class', 'wds-button btn-large' )
			.text( i18n.msg( 'botFlagButtonLabel' ).plain() )
			.wrap( $( '<div>' ).css( 'text-align', 'center' ) )
			.css( 'cursor', 'pointer' )
			.on( 'click', function() {
				botFlagModal.show();
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