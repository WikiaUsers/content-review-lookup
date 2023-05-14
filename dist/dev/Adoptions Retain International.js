/** <pre>
 * @name: Adoptions Retain International
 * 
 * This is a near-identical copy of `MediaWiki:Adoptions_International.js` as of right now.
 * That is not intended long-term solution, and it will be dealt with at some point.
 */
mw.loader.using( [
	'jquery.client',
	'mediawiki.base',
	'mediawiki.api',
	'mediawiki.template.mustache'
] ).then( function() {
	// Export global configuration
	window.adoptRetainInternational = ( window.adoptRetainInternational || {} );

	// Wikis in those languages will *error* when user tries to adopt them
	window.adoptRetainInternational.unsupportedLanguages = ( window.adoptRetainInternational.unsupportedLanguages || [
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

	window.adoptRetainInternational.requirementsConfig = ( window.adoptRetainInternational.requirementsConfig || {} );
	window.adoptRetainInternational.requirementsConfig.activityDays = ( window.adoptRetainInternational.requirementsConfig.activityDays || 10 );
	window.adoptRetainInternational.requirementsConfig.permissionTypes = ( window.adoptRetainInternational.requirementsConfig.permissionTypes || [
		'bureaucrat',
		'sysop',
		'content-moderator'
	] );

	// Configuration for adopts mainpage and namespace
	window.adoptRetainInternational.pageConfig = ( window.adoptRetainInternational.pageConfig || {} );
	window.adoptRetainInternational.pageConfig.namespace = ( window.adoptRetainInternational.pageConfig.namespace || 'Adoption' );
	window.adoptRetainInternational.pageConfig.namespaceId = ( window.adoptRetainInternational.pageConfig.namespaceId || 118 );
	window.adoptRetainInternational.pageConfig.requestsPage = ( window.adoptRetainInternational.pageConfig.requestsPage || 'Adoption:Requests' );

	/**
	 * Wikitext schema for adoption request's page
	 *
	 * Available variables:
	 * {{userName}} - Currently logged user
	 * {{wikiName}} - name of the wiki they want to adopt
	 * {{{wikiURL}}} - URL of the wiki they want to adopt
	 * {{permissionsType}} - Type of permissions they request
	 * {{numDays}} - Number of days they were active in within last 10 days
	 * {{comments}} - Their comments and rationale for adoption
	 * {{{communityVote}}} - URL to Discussions post with community vote for their request
	 *
	 * Technical:
	 * - {{bStart}} - replaced with "{{"
	 * - {{bEnd}} - replaced with "}}"
	 * Above are used because Mustache.js syntax collided with wikitext templates
	 */
	window.adoptRetainInternational.wikitextSchema = ( window.adoptRetainInternational.wikitextSchema || '' );

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
		'connect.fandom.com',
		'soap.fandom.com',
		'fandom-stars.fandom.com'
	];

	const conf = window.adoptRetainInternational;
	const userName = mw.config.get( 'wgUserName' );
	const api = new mw.Api();

	if (
		mw.config.get( 'wgPageName' ) !== conf.pageConfig.requestsPage ||
		window.adoptRetainInternationalLoaded ||
		!userName
	) {
		return;
	}
	window.adoptRetainInternationalLoaded = true;

	/**
	 * Preload mechanism shamelessly stolen from AjaxBatchDelete.js
	 */
	var preloads = 3;
	function preload() {
		if ( --preloads === 0 ) {
			const mwMessages = conf.requirementsConfig.permissionTypes.map( function( group ) {
				return 'group-' + group + '-member';
			} );

			$.when(
				window.dev.i18n.loadMessages( 'Adoptions_Retain_International' ),
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

		const availableGroups = conf.requirementsConfig.permissionTypes.map( function( group ) {
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

		const adoptionRetainModal = new window.dev.modal.Modal( {
			title: i18n.msg( 'modalTitle' ).plain(),
			id: 'adoptionRetainWindow',
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
				classes: ['adoptionRetainForm', 'fandomCCForm'],
				attr: {
					method: '',
					name: '',
					id: 'adoptionRetainForm'
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
											for: 'adoptionRetainUrl'
										},
										text: i18n.msg( 'linkLabel' ).plain()
									},
									{
										type: 'input',
										classes: ['formInput'],
										attr: {
											id: 'adoptionRetainUrl',
											name: 'adoptionRetainUrl',
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
										classes: ['formInput', 'adoptionRetainPrefill'],
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
										text: i18n.msg( 'userActivityHeader', conf.requirementsConfig.activityDays ).plain()
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
										classes: ['formInput', 'adoptionRetainPrefill'],
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
						return $( '#adoptionRetainForm' ).find( '#' + id ).val().trim();
					}

					const formValues = {
						wikiName: getVal( 'wikiname' ),
						wikiUrl: 'https://' + filterFandomDomain( getVal( 'adoptionRetainUrl' ) ),
						permissionsType: ( getVal( 'permissionstype' ) || 'bureaucrat' ),
						numDays: ( getVal( 'numDays' ) || 0 ),
						comments: getVal( 'comment' ),
						communityVote: getVal( 'communityvote' )
					};

					if ( exception !== '' ) {
						// Pass a jQuery object to allow HTML in notification
						return mw.notify( $( '<span>', { html: exception } ), {
							tag: 'adoptionRetain',
							type: 'error'
						} );
					}

					if ( formValues.wikiUrl === '' ) {
						return mw.notify( i18n.msg( 'noUrlError' ).plain(), {
							tag: 'adoptionRetain',
							type: 'warn'
						} );
					}

					if ( formValues.wikiName === '' ) {
						return mw.notify( i18n.msg( 'noNameError' ).plain(), {
							tag: 'adoptionRetain',
							type: 'warn'
						} );
					}

					if ( formValues.comments === '' ) {
						return mw.notify( i18n.msg( 'noCommentsError' ).plain(), {
							tag: 'adoptionRetain',
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

					adoptionRetainModal.hide();

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
										tag: 'adoptionRetain',
										type: 'error'
									} );
								}
							}

							location.href = mw.util.getUrl( pageTitle );
						} ).fail( function () {
							mw.notify( i18n.msg( 'processFailError' ).plain(), {
								tag: 'adoptionRetain',
								type: 'error'
							} );
						} );
					} ).fail( function () {
						mw.notify( i18n.msg( 'submitError' ).plain(), {
							tag: 'adoptionRetain',
							type: 'error'
						} );
					} );
				}
			}
		} );

		adoptionRetainModal.create();

		$( '#adoption-retain-form' )
			.attr( 'class', 'wds-button btn-large' )
			.text( i18n.msg( 'adoptionRetainButtonLabel' ).plain() )
			.wrap( $( '<div>' ).css( 'text-align', 'center' ) )
			.css( 'cursor', 'pointer' )
			.on( 'click', function() {
				adoptionRetainModal.show();
			} );

		$( 'body' ).off( 'change.adoptionRetainURL' ).on( 'change.adoptionRetainURL', '#adoptionRetainUrl', function() {
			$( '.adoptionRetainPrefill' ).prop( 'disabled', true );

			exception = '';
			const url = filterFandomDomain( $( '#adoptionRetainUrl' ).val() );

			if ( !url ) {
				mw.notify( i18n.msg( 'invalidUrlError' ).plain(), {
					tag: 'adoptionRetain',
					type: 'error'
				} );
				$( '.adoptionRetainPrefill' ).prop( 'disabled', false );

				return;
			}

			if ( fandomWikis.includes( url ) ) {
				exception = i18n.msg( 'ccError' ).plain();

				return mw.notify( exception, {
					tag: 'adoptionRetain',
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
				ucstart: Math.floor( ( new Date().getTime() - daysToMilliseconds( conf.requirementsConfig.activityDays ) ) / 1000 ), // edits by user in the last x days
				augroup: 'sysop|bureaucrat',
				aulimit: 'max',
				auwitheditsonly: 1, // avoid auactiveusersonly
				usprop: 'groups',
				ususers: userName
			} ).done( function( data ) {
				if ( !data.query ) {
					mw.notify( i18n.msg( 'automaticQueryError' ).plain(), {
						tag: 'adoptionRetain',
						type: 'error'
					} );
					$('.adoptionRetainPrefill').prop( 'disabled', false );

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
							tag: 'adoptionRetain',
							type: 'warn'
						} );
					}

					$( '#wikiname' ).val( data.query.general.sitename );
				}

				if ( data.query.statistics ) {
					if ( $( '#communityvote' ).val() === '' && data.query.statistics.activeusers >= 2 ) {
						mw.notify( i18n.msg( 'provideCommunityVote' ).plain(), {
							tag: 'adoptionRetain',
							type: 'warn'
						} );
					}
				}

				var ucDays = 0;
				if ( data.query.usercontribs ) {
					if ( data.query.usercontribs.length === 0 ) {
						exception = i18n.msg( 'noEditsError' ).plain();

						return mw.notify( exception, {
							tag: 'adoptionRetain',
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
							tag: 'adoptionRetain',
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
									tag: 'adoptionRetain',
									type: 'error'
								} );
							}

							if ( data.query.users[0].groups.indexOf( 'sysop' ) > -1 ) {
								return mw.notify( i18n.msg( 'alreadyAdminError' ).plain(), {
									tag: 'adoptionRetain',
									type: 'warn'
								} );
							}
						}
					}
				}
			} ).fail( function( data ) {
				mw.notify( i18n.msg( 'automaticQueryError' ).plain(), {
					tag: 'adoptionRetain',
					type: 'error'
				} );
				$( '.adoptionRetainPrefill' ).prop( 'disabled', false );

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