$('.centralhelpbox').click(function(){
    window.location = $(this).find('a').get(0).href;
});

//=================================
// Configuration for unified CC form
//===================================
// Configuration for adoptions form
window.adoptInternational = {
    unsupportedLanguages: [
        'de',
        'en',
        'es',
        'id',
        'it',
        'ja',
        'nl',
        'pl',
        'pt',
        'pt-br',
        'ru',
        'zh',
        'zh-tw',
        'zh-hk'
    ],
    adoptionConfig: {
        activityDays: 14,
        adminsDays: 60,
        permissionTypes: [
            'sysop',
            'bureaucrat'
        ]
    },
    pageConfig: {
        namespace: 'Wiki_La_triade',
        namespaceId: 4,
        adoptionsPage: 'Wiki_La_triade:Adoption'
    },
    wikitextSchema: "{{bStart}}Demande adoption\n" +
        "| 0-Statut            = \n" +
        "| 1-Utilisateur       = {{userName}}\n" +
        "| 2-Lien              = {{{wikiURL}}}\n" +
        "| 3-Type              = {{permissionsType}}\n" +
        "| 4-Votre_activité    = {{numDays}}\n" +
        "| 5-Activité_admin    = {{numAdmins}}\n" +
        "| 6-Raisons           = {{comments}}\n" +
        "| 7-Discussion        = {{{communityVote}}}\n" +
    "{{bEnd}}"
};

//Configuration interwiki
window.interwikiInternational = {
        namespace: 'Demande_interwiki',
    	namespaceId: 120,
    	mainPage: 'Centre_des_communautés:Interwiki',
	interwikiSchema: '{{bStart}}LienInterwiki|{{from}}|{{to}}{{bEnd}}',
	pageSchema: '{{bStart}}Demande|interwiki{{bEnd}}\n\n' +
			'{{interwikis}}\n\n' +
			'~~' + '~~',
};

window.botFlagInternational = {
	pageConfig: {
		namespace: 'Wiki_La_triade',
		namespaceId: 4,
		requestsPage: 'Wiki_La_triade:Bot'
	},
	titleSchema: '$1 sur $2',
	wikitextSchema: '{{bStart}}Demande|bot{{bEnd}}\n\n' +
		'{{bStart}}Demande bot\n' +
		'| 0-Statut        = \n' +
		'| 1-Nom_wiki      = {{wikiName}}\n' +
		'| 2-Lien_bot      = {{{botUrl}}}\n' +
		'| 3-Nom_bot       = {{botName}}\n' +
		'| 4-Nom_demandeur = {{requesterName}}\n' +
		'| 5-Discussion    = {{{communityVote}}}\n' +
		'| 6-Raisons       = {{comments}}\n' +
	'{{bEnd}}'
};

importArticles({
    type: "script",
    articles: [ 
       'MediaWiki:Common.js/Requests.js'
    ]
});

/** <pre>
 * @name: Adoptions International
 * @description: Forked form for adoptions tweaked for international wikis
 * @author: Pcj (based on work by Unai01, Lil' Miss Rarity, Jr Mime and bola) - original
 * @author: Rail, bitomic, MtaÄ - fork
 */
mw.loader.using( [
	'jquery.client',
	'mediawiki.base',
	'mediawiki.api',
	'mediawiki.template.mustache'
] ).then( function() {
	// Export global configuration
	window.adoptInternational = ( window.adoptInternational || {} );

	// Wikis in those languages will *error* when user tries to adopt them
	window.adoptInternational.unsupportedLanguages = ( window.adoptInternational.unsupportedLanguages || [
		'de',
		'en',
		'es',
		'fr',
		'it',
		'pl',
		'pt',
		'pt-br',
		'ru',
		// Waiting IWR-zh onboarding
		// 'zh',
		// 'zh-tw',
		// 'zh-hk'
	] );

	window.adoptInternational.adoptionConfig = ( window.adoptInternational.adoptionConfig || {} );
	window.adoptInternational.adoptionConfig.activityDays = ( window.adoptInternational.adoptionConfig.activityDays || 10 );
	window.adoptInternational.adoptionConfig.adminsDays = ( window.adoptInternational.adoptionConfig.adminsDays || 60 );
	window.adoptInternational.adoptionConfig.permissionTypes = ( window.adoptInternational.adoptionConfig.permissionTypes || [
		'bureaucrat',
		'sysop',
		'content-moderator'
	] );

	// Configuration for adopts mainpage and namespace
	window.adoptInternational.pageConfig = ( window.adoptInternational.pageConfig || {} );
	window.adoptInternational.pageConfig.namespace = ( window.adoptInternational.pageConfig.namespace || 'Adoption' );
	window.adoptInternational.pageConfig.namespaceId = ( window.adoptInternational.pageConfig.namespaceId || 118 );
	window.adoptInternational.pageConfig.adoptionsPage = ( window.adoptInternational.pageConfig.adoptionsPage || 'Adoption:Requests' );

	/**
	 * Wikitext schema for adoption request's page
	 *
	 * Available variables:
	 * {{userName}} - Currently logged user
	 * {{wikiName}} - name of the wiki they want to adopt
	 * {{{wikiURL}}} - URL of the wiki they want to adopt
	 * {{permissionsType}} - Type of permissions they request
	 * {{numDays}} - Number of days they were active in within last 10 days
	 * {{numAdmins}} - Number of admins active in last 60 days
	 * {{comments}} - Their comments and rationale for adoption
	 * {{{communityVote}}} - URL to Discussions post with community vote for their request
	 *
	 * Technical:
	 * - {{bStart}} - replaced with "{{"
	 * - {{bEnd}} - replaced with "}}"
	 * Above are used because Mustache.js syntax collided with wikitext templates
	 */
	window.adoptInternational.wikitextSchema = ( window.adoptInternational.wikitextSchema || "{{bStart}}Forumheader/Adoption requests{{bEnd}}\n\n'''What is your username?'''\n{{userName}}\n\n'''Please link to the wiki here:'''\n{{{wikiURL}}}\n\n'''How many days have you edited the wiki in the past 10 days?'''\n{{numDays}}\n\n'''On the Special Pages  → Special:ListAdmins, how many admins have been active in the past 60 days?'''\n{{numAdmins}}\n\n'''Comments/Reasons for adoption:'''\n<nowiki>{{comments}}</nowiki>\n\n\n[[Category:Adoption requests|{{bStart}}PAGENAME{{bEnd}}]]" );

	// Officially supported language central wikis
	const languageAdoptForms = {
		'de': 'https://community.fandom.com/de/wiki/Wiki-Adoptionen',
		'en': 'https://community.fandom.com/wiki/Adoption:Requests',
		'es': 'https://comunidad.fandom.com/wiki/Comunidad_Central:Adopciones',
		'fr': 'https://communaute.fandom.com/fr/wiki/Centre_des_communaut%C3%A9s:Adoption',
		'it': 'https://community.fandom.com/it/wiki/Wiki_della_Community:Richieste_di_diritti',
		'pl': 'https://spolecznosc.fandom.com/wiki/Centrum_Spo%C5%82eczno%C5%9Bci:Adoptuj_wiki',
		'pt': 'https://comunidade.fandom.com/wiki/Ado%C3%A7%C3%A3o:Pedidos',
		'pt-br': 'https://comunidade.fandom.com/wiki/Ado%C3%A7%C3%A3o:Pedidos', // fallback
		'ru': 'https://community.fandom.com/ru/wiki/%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D1%8B_%D0%BD%D0%B0_%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81_%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0/%D0%B1%D1%8E%D1%80%D0%BE%D0%BA%D1%80%D0%B0%D1%82%D0%B0'
	};

	// All Fandom-branded wikis
	const fandomWikis = [
		// CCs
		'community.fandom.com/de',
		'community.fandom.com',
		'comunidad.fandom.com',
		'yhteiso.fandom.com',
		'communaute.fandom.com/fr',
		'community.fandom.com/it',
		'community.fandom.com/ja',
		'community.fandom.com/ko',
		'community.fandom.com/nl',
		'spolecznosc.fandom.com',
		'comunidade.fandom.com',
		'community.fandom.com/ru',
		'community.fandom.com/vi',
		'community.fandom.com/zh',

		'community.fandom.com/ar',
		'community.fandom.com/bg',
		'community.fandom.com/ca',
		'community.fandom.com/cs',
		'community.fandom.com/da',
		'community.fandom.com/de',
		'community.fandom.com/el',

		'community.fandom.com/en',
		'community.fandom.com/es',
		'community.fandom.com/et',
		'community.fandom.com/fa',
		'community.fandom.com/fi',
		'community.fandom.com/fr',
		'community.fandom.com/he',
		'community.fandom.com/hi',
		'community.fandom.com/hr',
		'community.fandom.com/hu',
		'community.fandom.com/id',
		'community.fandom.com/it',
		'community.fandom.com/ja',
		'community.fandom.com/ko',
		'community.fandom.com/ms',
		'community.fandom.com/nl',
		'community.fandom.com/no',
		'community.fandom.com/pl',
		'community.fandom.com/pt',
		'community.fandom.com/pt-br',
		'community.fandom.com/ro',
		'community.fandom.com/ru',
		'community.fandom.com/sr',
		'community.fandom.com/sv',
		'community.fandom.com/th',
		'community.fandom.com/tl',
		'community.fandom.com/tr',
		'community.fandom.com/uk',
		'community.fandom.com/vi',
		'community.fandom.com/zh',
		'community.fandom.com/zh',
		// Other
		'dev.fandom.com',
		'la-triade.fandom.com/fr',
		'connect.fandom.com',
		'soap.fandom.com',
		'fandom-stars.fandom.com'
	];

	const conf = window.adoptInternational;
	const userName = mw.config.get( 'wgUserName' );
	const api = new mw.Api();

	if (
		mw.config.get( 'wgPageName' ) !== conf.pageConfig.adoptionsPage ||
		window.adoptInternationalLoaded ||
		!userName
	) {
		return;
	}
	window.adoptInternationalLoaded = true;

	/**
	 * Preload mechanism shamelessly stolen from AjaxBatchDelete.js
	 */
	var preloads = 3;
	function preload() {
		if ( --preloads === 0 ) {
			const mwMessages = conf.adoptionConfig.permissionTypes.map( function( group ) {
				return 'group-' + group + '-member';
			} );

			$.when(
				window.dev.i18n.loadMessages( 'Adoptions_International' ),
				api.loadMessagesIfMissing( mwMessages )
			).then( init );
		}
	}

	function init( i18n ) {
		var exception = '';

		function filterFandomDomain( input ) {
			const fandomDomainRE = /(?:https?:\/\/)?(.*?\.)(fandom\.com)(\/[^\/]*?)?(?:\/.*)?$/;
			var filteredDomain = input.match( fandomDomainRE );

			if ( !filteredDomain ) {
				return null;
			}

			filteredDomain.splice( 0, 1 );

			if ( filteredDomain[2] === '/wiki' || filteredDomain[2] === '/f' || filteredDomain[2] === '/' ) {
				filteredDomain.pop();
			}

			return filteredDomain.join( '' );
		}

		function daysToMilliseconds( days ) {
			return days * 86400000;
		}
		function capitalize( text ) {
			return text.charAt( 0 ).toUpperCase() + text.slice( 1 );
		}

		const availableGroups = conf.adoptionConfig.permissionTypes.map( function( group ) {
			return {
				type: 'option',
				text: capitalize(
					mw.message( 'group-' + group + '-member' ).parse( userName )
				),
				attr: {
					'value': group
				}
			};
		} );

		const adoptionModal = new window.dev.modal.Modal( {
			title: i18n.msg( 'modalTitle' ).plain(),
			id: 'requestWindow',
			size: 'large',
			buttons: [
				{
					id: 'submitButton',
					text: i18n.msg( 'submitLabel' ).plain(),
					primary: true,
					event: 'submitForm'
				}
			],
			closeTitle: i18n.msg( 'closeLabel' ).plain(),
			content: {
				type: 'form',
				classes: ['adoptionForm', 'fandomCCForm'],
				attr: {
					method: '',
					name: '',
					id: 'adoptionForm'
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
										text: i18n.msg( 'linkHeader' ).plain()
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
											for: 'adoptionUrl'
										},
										text: i18n.msg( 'linkLabel' ).plain()
									},
									{
										type: 'input',
										classes: ['formInput'],
										attr: {
											id: 'adoptionUrl',
											name: 'adoptionUrl',
											type: 'text',
											required: '',
											placeholder: i18n.inContentLang().msg( 'placeholderUrl' ).plain()
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
										text: i18n.msg( 'nameHeader' ).plain()
									}
								]
							},
							{
								type: 'div',
								classes: ['sectionContent'],
								children: [
									{
										type: 'input',
										classes: ['formInput', 'adoptionPrefill'],
										attr: {
											id: 'wikiname',
											name: 'wikiname',
											type: 'text',
											disabled: '',
											required: '',
											placeholder: i18n.msg( 'nameHeader' ).plain()
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
										text: i18n.msg( 'permissionHeader' ).plain()
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
										text: i18n.msg( 'permissionLabel' ).plain()
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
										text: i18n.msg( 'userActivityHeader', conf.adoptionConfig.activityDays ).plain()
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
											for: 'numDays'
										},
										text: i18n.msg( 'userActivityLabel' ).plain()
									},
									{
										type: 'input',
										classes: ['formInput', 'adoptionPrefill'],
										attr: {
											id: 'numDays',
											name: 'numDays',
											type: 'number',
											value: '0',
											disabled: '',
											required: ''
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
										text: i18n.msg( 'adminsActivityHeader', conf.adoptionConfig.adminsDays ).plain()
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
											for: 'numAdmins'
										},
										text: i18n.msg( 'adminsActivityLabel' ).plain()
									},
									{
										type: 'input',
										classes: ['formInput', 'adoptionPrefill'],
										attr: {
											id: 'numAdmins',
											name: 'numAdmins',
											type: 'number',
											value: '0',
											disabled: '',
											required: ''
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
											for: 'communityvote'
										},
										text: i18n.msg( 'communityVoteLabel' ).plain()
									},
									{
										type: 'input',
										classes: ['formInput'],
										attr: {
											id: 'communityvote',
											name: 'communityvote',
											type: 'text',
											placeholder: i18n.msg( 'placeholderCommunityVote' ).plain()
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
											for: 'comment'
										},
										text: i18n.msg( 'commentsLabel' ).plain()
									},
									{
										type: 'textarea',
										classes: ['formInput'],
										attr: {
											id: 'comment',
											name: 'comment',
											placeholder: i18n.msg( 'placeholderComments' ).plain()
										}
									}
								]
							}
						]
					},
				]
			},
			events: {
				submitForm: function () {
					function getVal( id ) {
						return $( '#adoptionForm' ).find( '#' + id ).val().trim();
					}

					const formValues = {
						wikiName: getVal( 'wikiname' ),
						wikiUrl: 'https://' + filterFandomDomain( getVal( 'adoptionUrl' ) ),
						permissionsType: ( getVal( 'permissionstype' ) || 'bureaucrat' ),
						numDays: ( getVal( 'numDays' ) || 0 ),
						numAdmins: ( getVal( 'numAdmins' ) || 0 ),
						comments: getVal( 'comment' ),
						communityVote: getVal( 'communityvote' )
					};

					if ( exception !== '' ) {
						// Pass a jQuery object to allow HTML in notification
						return mw.notify( $( '<span>', { html: exception } ), {
							tag: 'adoption',
							type: 'error'
						} );
					}

					if ( formValues.wikiUrl === '' ) {
						return mw.notify( i18n.msg( 'noUrlError' ).plain(), {
							tag: 'adoption',
							type: 'warn'
						} );
					}

					if ( formValues.wikiName === '' ) {
						return mw.notify( i18n.msg( 'noNameError' ).plain(), {
							tag: 'adoption',
							type: 'warn'
						} );
					}

					if ( formValues.comments === '' ) {
						return mw.notify( i18n.msg( 'noCommentsError' ).plain(), {
							tag: 'adoption',
							type: 'warn'
						} );
					}

					const pageContent = Mustache.render( conf.wikitextSchema, {
						userName: userName,
						wikiName: formValues.wikiName,
						wikiURL: formValues.wikiUrl,
						permissionsType: formValues.permissionsType,
						numDays: formValues.numDays,
						numAdmins: formValues.numAdmins,
						comments: formValues.comments,
						communityVote: formValues.communityVote,
						// Don't ask
						bStart: '{{',
						bEnd: '}}'
					} );

					adoptionModal.hide();

					// @todo formatversion: 2
					api.get( {
						action: 'query',
						list: 'allpages',
						apnamespace: conf.pageConfig.namespaceId,
						apprefix: formValues.wikiName,
						aplimit: 'max'
					} ).done( function( data ) {
						const suffixRE = /.*\((\d+)\)/;

						var suffix = '';
						var highestAdoption = 0;

						if ( data.query ) {
							if ( data.query.allpages.length > 0 ) {
								highestAdoption = 1;
							}

							for ( var p in data.query.allpages ) {
								if ( data.query.allpages[p].title === undefined ) {
									continue;
								}

								const match = data.query.allpages[p].title.match( suffixRE );

								if ( !match ) {
									continue;
								}

								if ( parseInt( match[1] ) > highestAdoption ) {
									highestAdoption = parseInt( match[1] );
								}
							}

							if ( highestAdoption > 0 ) {
								suffix = ' (' + ( highestAdoption + 1 ) + ')';
							}
						}

						const pageTitle = conf.pageConfig.namespace + ':' + formValues.wikiName + suffix;

						// @todo formatversion: 2
						api.postWithEditToken( {
							action: 'edit',
							title: pageTitle,
							text: pageContent,
							summary: i18n.inContentLang().msg( 'editSummary', formValues.wikiName ).plain()
						} ).done( function( data ) {
							if ( data.edit ) {
								if ( data.edit.warnings ) {
									return mw.notify( data.edit.warnings.main['*'], {
										tag: 'adoption',
										type: 'error'
									} );
								}
							}

							location.href = mw.util.getUrl( pageTitle );
						} ).fail( function () {
							mw.notify( i18n.msg( 'processFailError' ).plain(), {
								tag: 'adoption',
								type: 'error'
							} );
						} );
					} ).fail( function () {
						mw.notify( i18n.msg( 'submitError' ).plain(), {
							tag: 'adoption',
							type: 'error'
						} );
					} );
				}
			}
		} );

		adoptionModal.create();

		$( '#adoption-form' )
			.attr( 'class', 'wds-button btn-large' )
			.text( i18n.msg( 'adoptionButtonLabel' ).plain() )
			.wrap( $( '<div>' ).css( 'text-align', 'center' ) )
			.css( 'cursor', 'pointer' )
			.on( 'click', function() {
				adoptionModal.show();
			} );

		$( 'body' ).off( 'change.adoptionURL' ).on( 'change.adoptionURL', '#adoptionUrl', function() {
			$( '.adoptionPrefill' ).prop( 'disabled', true );

			exception = '';
			const url = filterFandomDomain( $( '#adoptionUrl' ).val() );

			if ( !url ) {
				mw.notify( i18n.msg( 'invalidUrlError' ).plain(), {
					tag: 'adoption',
					type: 'error'
				} );
				$( '.adoptionPrefill' ).prop( 'disabled', false );

				return;
			}

			if ( fandomWikis.includes( url ) ) {
				exception = i18n.msg( 'ccError' ).plain();

				return mw.notify( exception, {
					tag: 'adoption',
					type:'error'
				} );
			}

			// @todo formatversion: 2
			$.getJSON( '//' + url + '/api.php?format=json&callback=?', {
				action: 'query',
				meta: 'siteinfo',
				siprop: 'general|statistics',
				list: 'allusers|usercontribs|users',
				uclimit: 'max',
				ucuser: userName,
				ucnamespace: 0,
				ucdir: 'newer',
				ucstart: Math.floor( ( new Date().getTime() - daysToMilliseconds( conf.adoptionConfig.activityDays ) ) / 1000 ), // edits by user in the last x days
				augroup: 'sysop|bureaucrat',
				aulimit: 'max',
				auwitheditsonly: 1, // avoid auactiveusersonly
				usprop: 'groups',
				ususers: userName
			} ).done( function( data ) {
				if ( !data.query ) {
					mw.notify( i18n.msg( 'automaticQueryError' ).plain(), {
						tag: 'adoption',
						type: 'error'
					} );
					$('.adoptionPrefill').prop( 'disabled', false );

					return;
				}

				// Handle wikis in unsupported languages
				if ( data.query.general ) {
					const wikiLanguage = data.query.general.lang;
					
					if ( conf.unsupportedLanguages.includes( wikiLanguage ) ) {
						// Point to adoption form if wiki is oficially supported by Fandom as of 2022 (does not include Helper program)
						if ( Object.keys( languageAdoptForms ).includes( wikiLanguage ) ) {
							exception = i18n.msg( 'invalidLanguageError_supported', languageAdoptForms[wikiLanguage] ).parse();
						} else {
							exception = i18n.msg( 'invalidLanguageError' ).plain();
						}

						// Pass a jQuery object to allow HTML in notification
						return mw.notify( $( '<span>', { html: exception } ), {
							tag: 'adoption',
							type: 'warn'
						} );
					}

					$( '#wikiname' ).val( data.query.general.sitename );
				}

				if ( data.query.statistics ) {
					if ( $( '#communityvote' ).val() === '' && data.query.statistics.activeusers > 3 ) {
						mw.notify( i18n.msg( 'provideCommunityVote' ).plain(), {
							tag: 'adoption',
							type: 'warn'
						} );
					}
				}

				var ucDays = 0;
				if ( data.query.usercontribs ) {
					if ( data.query.usercontribs.length === 0 ) {
						exception = i18n.msg( 'noEditsError' ).plain();

						return mw.notify( exception, {
							tag: 'adoption',
							type: 'warn'
						} );
					}

					var ucDArr = [];
					for ( var u in data.query.usercontribs ) {
						var ucDay = data.query.usercontribs[u].timestamp.slice( 0, 10 );
						if ( ucDArr.indexOf( ucDay ) === -1 ) {
							ucDArr.push(ucDay);
						}
					}

					ucDays = ucDArr.length;
					if ( ucDays < 5)  {
						mw.notify( i18n.msg( 'noActivityError' ).plain(), {
							tag: 'adoption',
							type: 'warn'
						} );
					}
				}

				$( '#numDays' ).val( ucDays );

				// @todo nested ifs
				if ( data.query.users ) {
					if ( data.query.users[0] ) {
						if ( data.query.users[0].groups ) {
							if ( data.query.users[0].groups.indexOf( 'bureaucrat' ) > -1 ) {
								exception = i18n.msg( 'alreadyBureaucratError' ).plain();

								return mw.notify( exception, {
									tag: 'adoption',
									type: 'error'
								} );
							}

							if ( data.query.users[0].groups.indexOf( 'sysop' ) > -1 ) {
								return mw.notify( i18n.msg( 'alreadyAdminError' ).plain(), {
									tag: 'adoption',
									type: 'warn'
								} );
							}
						}
					}
				}

				if ( data.query.allusers ) {
					var usProm = [];
					for ( var us in data.query.allusers ) {
						usProm.push(
							// @todo formatversion: 2
							$.getJSON( '//' + url + '/api.php?format=json&callback=?', {
								action: 'query',
								list: 'usercontribs',
								uclimit: 1,
								ucuserids: data.query.allusers[us].userid,
								ucend: Math.floor( ( new Date().getTime() - daysToMilliseconds( conf.adoptionConfig.adminsDays ) ) / 1000 )
							} )
						);
					}

					Promise.allSettled( usProm ).then( function( usdata ) {
						var numAdmins = 0;
						for ( var d in usdata ) {
							if ( usdata[d].value.query ) {
								if ( usdata[d].value.query.usercontribs.length > 0 ) {
									numAdmins++;
								}
							}
						}

						if ( numAdmins > 0 ) {
							mw.notify( i18n.msg( 'activeAdminsError' ).plain(), {
								tag: 'adoption',
								type: 'warn'
							} );
						}

						$('#numAdmins').val( numAdmins );
					} );
				}
			} ).fail( function( data ) {
				mw.notify( i18n.msg( 'automaticQueryError' ).plain(), {
					tag: 'adoption',
					type: 'error'
				} );
				$( '.adoptionPrefill' ).prop( 'disabled', false );

				return;
			} );
		} );
	}

	importArticles(
		{
			type: 'script',
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
// </pre>


/**
 * <nowiki>
 */
mw.loader.using( ['jquery.client', 'mediawiki.base', 'mediawiki.api', 'mediawiki.template.mustache'] ).then( function() {
	// Export global configuration
	window.interwikiInternational = ( window.interwikiInternational || {} );
	window.interwikiInternational.namespace = ( window.interwikiInternational.namespace || 'Interwiki' );
	window.interwikiInternational.namespaceId = ( window.interwikiInternational.namespaceId || 0 );
	window.interwikiInternational.mainPage = ( window.interwikiInternational.mainPage || 'Interlanguage_requests' );
	window.interwikiInternational.interwikiSchema = ( window.interwikiInternational.interwikiSchema || '{{bStart}}Interwiki request|{{from}}|{{to}}{{bEnd}}' );
	window.interwikiInternational.pageSchema = ( window.interwikiInternational.pageSchema ||
		'{{bStart}}Interwiki request header{{bEnd}}\n\n' +
		'{{interwikis}}\n\n' +
		'~~' + '~~'
	);

	const conf = window.interwikiInternational;

	const userName = mw.config.get( 'wgUserName' );
	if (
		mw.config.get( 'wgPageName' ) !== conf.mainPage ||
		window.interwikiInternationalLoaded ||
		!userName
	) {
		return;
	}
	window.interwikiInternationalLoaded = true;

	var preloads = 3;
	function preload() {
		if ( --preloads === 0 ) {
			window.dev.i18n.loadMessages( 'Interwikis_International' ).then( init );
		}
	}

	function init( i18n ) {
		const modal = new window.dev.modal.Modal( {
			title: i18n.msg( 'title' ).plain(),
			id: 'requestWindow',
			size: 'large',
			buttons: [
				{
					id: 'submitButton',
					text: i18n.msg( 'submitLabel' ).plain(),
					primary: true,
					event: 'submitForm'
				}
			],
			closeTitle: i18n.msg( 'closeLabel' ).plain(),
			content: {
				type: 'div',
				classes: ['formWrapper'],
				children: [
					{
						type: 'div',
						classes: ['formDescription'],
						html: i18n.msg( 'description' ).plain()
					},
					{
						type: 'form',
						classes: ['interwikiForm', 'fandomCCForm'],
						attr: {
							method: '',
							name: '',
							id: 'interwikiForm'
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
												text: i18n.msg( 'nameLabel' ).plain()
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
													id: 'wikiname',
													required: '',
													type: 'text',
													placeholder: i18n.msg( 'namePlaceholder' ).plain()
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
												text: i18n.msg( 'interwikisLabel' ).plain()
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
													id: 'interwikisLines',
													required: '',
													type: 'text',
													placeholder: i18n.msg( 'interwikisPlaceholder' ).plain()
												}
											}
										]
									}
								]
							},
							
						]
					}
				]
			},
			events: {
				submitForm: function () {
					function getVal( id ) {
						return $( '#interwikiForm' ).find( '#' + id ).val().trim();
					}

					const formValues = {
						wikiName: getVal( 'wikiname' ),
						lines: getVal( 'interwikisLines' )
					};
					
					if ( formValues.wikiName === '' ) {
						return mw.notify( i18n.msg( 'noNameError' ).plain(), {
							tag: 'interwiki',
							type: 'warn'
						} );
					}

					if ( formValues.lines === '' ) {
						return mw.notify( i18n.msg( 'noLinesError' ).plain(), {
							tag: 'interwiki',
							type: 'warn'
						} );
					}

					const splitLines = formValues.lines.split( '\n' );
					const interwikis = [];

					function shortUrl( url ) {
						if ( !url ) {
							return;
						}
						var sUrl = '';
				
						// Delete protocol and not main community url
						url = url.replace( /https?:\/{2}/g, '' ).replace( /\/wiki\/(.*)/g, '' );
				
						// Find parts: community name + language code
						var linkParts = /([\w.-]*)\.(?:wikia|fandom)?(?:\.(?:com|org)\/?)([\w-]{0,})/g.exec( url );
				
						// No parts found, maybe already short form, e.g. "fr.community"
						if ( !linkParts ) {
							linkParts = /([\w.-]*)/.exec(url);
						}
						if ( linkParts[2] ) {
							sUrl = linkParts[2] + '.';
						}
				
						sUrl += linkParts[1];
				
						return sUrl;
					}

					for ( var i = 0; i < splitLines.length; i++ ) {
						const line = splitLines[i];
						const items = line.trim().split( ' ' );
						const first = shortUrl( items.shift() );
						const last = shortUrl( items.pop() );

						if ( !first || !last ) {
							continue;
						}

						interwikis.push( [first, last] );
					}

					const linesCount = formValues.lines.split( '\n' ).length;
					const interwikisCount = interwikis.length;

					if ( linesCount !== interwikisCount ) {
						return mw.notify( i18n.msg( 'interwikisCountError', linesCount, interwikisCount ).plain(), {
							tag: 'interwiki',
							type: 'warn'
						} );
					}

					const interwikiLines = [];
					for ( var i = 0; i < interwikis.length; i++ ) {
						const interwiki = interwikis[i];
						const line = Mustache.render( conf.interwikiSchema, {
							bStart: '{{',
							bEnd: '}}',
							from: interwiki[0],
							to: interwiki[1]
						} );

						interwikiLines.push( line );
					}

					const wikitext = Mustache.render( conf.pageSchema, {
						bStart: '{{',
						bEnd: '}}',
						interwikis: interwikiLines.join( '\n' )
					} );
					const api = new mw.Api();

					modal.hide();

					api.get( {
						action: 'query',
						list: 'allpages',
						apnamespace: conf.namespaceId,
						apprefix: formValues.wikiName,
						aplimit: 'max'
					} ).done( function( data ) {
						const suffixRE = /.*\((\d+)\)/;

						var suffix = '';
						var highestIWRequest = 0;

						if ( data.query ) {
							if ( data.query.allpages.length > 0 ) {
								highestIWRequest = 1;
							}

							for ( var p in data.query.allpages ) {
								if ( data.query.allpages[p].title === undefined ) {
									continue;
								}

								const match = data.query.allpages[p].title.match( suffixRE );

								if ( !match ) {
									continue;
								}

								if ( parseInt( match[1] ) > highestIWRequest ) {
									highestIWRequest = parseInt( match[1] );
								}
							}

							if ( highestIWRequest > 0 ) {
								suffix = ' (' + ( highestIWRequest + 1 ) + ')';
							}
						}

						const pageName =  conf.namespace + ':' + formValues.wikiName + suffix;

						api.postWithEditToken( {
							action: 'edit',
							title: pageName,
							text: wikitext,
							createonly: true
						} ).done( function( data ) {
							if ( data.edit && data.edit.warnings ) {
								return mw.notify( data.edit.warnings.main['*'], {
									tag: 'interwiki',
									type: 'error'
								} );
							}

							location.href = mw.util.getUrl( pageName );
						} ).fail( function () {
							mw.notify( i18n.msg( 'error' ).plain(), {
								tag: 'interwiki',
								type: 'error'
							} );
						} );
					}).fail( function () {
						mw.notify( i18n.msg( 'error' ).plain(), {
							tag: 'interwiki',
							type: 'error'
						} );
					} );
				}
			}
		} );

		modal.create();
		
		$( '#interwiki-form' )
			.attr( 'class', 'wds-button btn-large' )
			.text( i18n.msg( 'buttonLabel' ).plain() )
			.wrap( $( '<div>' ).css( 'text-align', 'center' ) )
			.css( 'cursor', 'pointer' )
			.on( 'click', function() {
				modal.show();
			} );
	}

	importArticles(
		{
			type: 'script',
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
/**
 * </nowiki>
 */