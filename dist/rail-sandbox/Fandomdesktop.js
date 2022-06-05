window.adoptInternational = {
	unsupportedLanguages: [],
	adoptionConfig: {
		activityDays: 10,
		adminsDays: 60,
		permissionTypes: [
			'bureaucrat',
			'sysop',
			'content-moderator'
		]
	},
	pageConfig: {
		namespace: 'Zwierzyniec',
		namespaceId: 112,
		adoptionsPage: 'Request'
	}
};

/** <nowiki>
 * @name: Adoptions International
 * @description: Forked form for adoptions tweaked for international wikis
 * @author: Pcj (based on work by Unai01, Lil' Miss Rarity, Jr Mime and bola) - original
 * @author: Rail, bitomic, MtaÄ - fork
 */
mw.loader.using( ['jquery.client', 'mediawiki.base', 'mediawiki.api', 'mediawiki.template.mustache'] ).then( function() {
	// Export global configuration
	window.adoptInternational = ( window.adoptInternational || {} );

	// Wikis in those languages will *error* when user tries to adopt them
	window.adoptInternational.unsupportedLanguages = ( window.adoptInternational.unsupportedLanguages || [
		'en', 'es', 'de', 'fr', 'ru', 'it', 'nl', 'pl', 'pt', 'pt-br', 'zh'
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
		'soap.fandom.com'
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
			// @todo Fandom 2.0 design
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
										text: i18n.msg( 'linkLabel' ).plain()
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
										text: 'Wiki URL' // @todo i18n
									},
									{
										type: 'input',
										classes: ['formInput'],
										attr: {
											id: 'adoptionUrl',
											name: 'adoptionUrl',
											type: 'text',
											required: '',
											placeholder: i18n.msg( 'placeholderUrl' ).plain()
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
										text: i18n.msg( 'nameLabel' ).plain()
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
											for: 'wikiname'
										},
										text: 'Wiki name' // @todo i18n
									},
									{
										type: 'input',
										classes: ['formInput', 'adoptionPrefill'],
										attr: {
											id: 'wikiname',
											name: 'wikiname',
											type: 'text',
											disabled: '',
											required: '',
											placeholder: i18n.msg( 'nameLabel' ).plain()
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
										text: i18n.msg( 'permissionLabel' ).plain()
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
										text: 'Permissions' // @todo i18n
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
										text: i18n.msg( 'userActivityLabel', conf.adoptionConfig.activityDays ).plain()
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
										text: 'Days active' // @todo i18n
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
										text: i18n.msg( 'adminsActivityLabel', conf.adoptionConfig.adminsDays ).plain()
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
										text: 'Admins active' // @todo i18n
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
										text: i18n.msg( 'communityVoteLabel' ).plain()
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
										text: 'Discussion' // @todo i18n
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
										text: i18n.msg( 'commentsLabel' ).plain()
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
										text: 'Notes' // @todo i18n
									},
									{
										type: 'textarea',
										classes: ['formInput'],
										attr: {
											id: 'comment',
											name: 'comment',
											name: '',
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
						return mw.notify( exception, {
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
							text: pageContent
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
					$('.adoptionPrefill').prop('disabled',false);

					return;
				}

				if ( data.query.general ) {
					if ( conf.unsupportedLanguages.indexOf( data.query.general.lang ) !== -1 ) {
						mw.notify( i18n.msg( 'invalidLanguageError' ).plain(), {
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