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
	window.adoptRetainInternational.requirementsConfig.activityDaysTarget = ( window.adoptRetainInternational.requirementsConfig.activityDaysTarget || 5 );
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
		'la-fille-sans-nom.fandom.com/fr',
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
											//disabled: '',
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
											//disabled: '',
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
						comments: getVal( 'comment' )
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
			//$( '.adoptionRetainPrefill' ).prop( 'disabled', true );

			exception = '';
			const url = filterFandomDomain( $( '#adoptionRetainUrl' ).val() );

			if ( !url ) {
				mw.notify( i18n.msg( 'invalidUrlError' ).plain(), {
					tag: 'adoptionRetain',
					type: 'error'
				} );
				//$( '.adoptionRetainPrefill' ).prop( 'disabled', false );

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
				siprop: 'general',
				list: 'allusers|usercontribs|users',
				uclimit: 'max',
				ucuser: userName,
				ucnamespace: 0,
				ucdir: 'newer',
				ucstart: Math.floor( ( new Date().getTime() - daysToMilliseconds( conf.requirementsConfig.activityDays ) ) / 1000 ), // edits by user in the last x days
				augroup: 'sysop|bureaucrat',
				aulimit: 'max',
				auwitheditsonly: 1, // avoid auactiveusersonly
				usprop: 'groupmemberships',
				ususers: userName
			} ).done( function( data ) {
				if ( !data.query ) {
					mw.notify( i18n.msg( 'automaticQueryError' ).plain(), {
						tag: 'adoptionRetain',
						type: 'error'
					} );
					//$('.adoptionRetainPrefill').prop( 'disabled', false );

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

				var ucDays = 0;
				if ( data.query.usercontribs ) {
					if ( data.query.usercontribs.length === 0 ) {
						mw.notify( i18n.msg( 'noEditsError' ).plain(), {
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
					if ( ucDays < conf.requirementsConfig.activityDaysTarget ) {
						mw.notify( i18n.msg( 'noActivityError' ).plain(), {
							tag: 'adoptionRetain',
							type: 'warn'
						} );
					}
				}

				$( '#numDays' ).val( ucDays );

				/**
				 * Let's verify what permissions user has
				 *
				 * @param userMemberships
				 * @param groupName
				 * @returns {Object}
				 */
				function checkUserGroups( groupName ) {
					const userMemberships = data.query.users[0].groupmemberships;

					var groupData = {
						isMember: false,
						isTemp: false
					};

					const groupMembership = userMemberships.find( function( membership ) {
						if ( membership.group === groupName ) {
							return membership;
						}
					} );

					if ( groupMembership ) {
						groupData.isMember = true;
						groupData.isTemp = ( groupMembership.expiry !== 'infinity' );
					}

					return groupData;
				}

				if ( data.query.users[0] ) {
					const userAdminStatus = checkUserGroups( 'sysop' );
					const userBcratStatus = checkUserGroups( 'bureaucrat' );

					// User is already permanent bureaucrat
					if ( userBcratStatus.isMember && !userBcratStatus.isTemp ) {
						exception = i18n.msg( 'alreadyBureaucratError' ).plain();
						return mw.notify( exception, {
							tag: 'adoptionRetain',
							type: 'error'
						} );
					}

					// User is already permanent admin
					if ( userAdminStatus.isMember && !userAdminStatus.isTemp ) {
						exception = i18n.msg( 'alreadyAdminError' ).plain();
						return mw.notify( exception, {
							tag: 'adoptionRetain',
							type: 'warn'
						} );
					}

				}
			} ).fail( function( data ) {
				mw.notify( i18n.msg( 'automaticQueryError' ).plain(), {
					tag: 'adoptionRetain',
					type: 'error'
				} );
				//$( '.adoptionRetainPrefill' ).prop( 'disabled', false );

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


/* ShowCustomModal
 *
 * $.showCustomModal brought to UCP without polluting the jQuery global
 * QoL updates include:
 * - Let you pass the options as the 2nd argument instead of 3rd, with `content` replacing the content
 * - closeModal functions now properly handle multiple inputs
 * - Buttons don't need an id not to have id="undefined"
 * Pain points not addressed:
 * - Body class .modalShown still unstable if more than one modal shown at once, don't rely on it
 * - Ugly code inside
 *
 * @author Dorumin, kinda
 *
 * Used files: [[File:SCM-icon-close.png]]
 */

(function() {
    if (window.dev && dev.showCustomModal) return;

    var closeModal = function($modals) {
        $modals.each(function(_, modal) {
            var $modal = $(modal);
            $(window).off('.modal' + $modal.attr('id'));
            $modal.animate({
                top: $modal.offset().top + 100,
                opacity: 0
            }, 'fast', function() {
                $modal.remove();
            });

            var $blackout = $modal.data('blackout');
            var settings = $modal.data('settings');
            $blackout.fadeOut('fast', function() {
                $modal.remove();
                $blackout.remove();

                var callback = settings && settings.onAfterClose;
                if ($.isFunction(callback)) {
                    callback();
                }
            });
            $(document.body).removeClass('modalShown');
        });
    };

    var hideModal = function($modals) {
        $modals.each(function(_, modal) {
            var $modal = $(modal);
            var $blackout = $modal.data('blackout');
            var settings = $modal.data('settings');
            $blackout.fadeOut('fast').addClass('blackoutHidden');
            $modal.animate({
                top: $modal.offset().top + 100,
                opacity: 0
            }, 'fast', function() {
                $modal.hide();
                var callback = settings && settings.onAfterClose;
                if ($.isFunction(callback)) {
                    callback();
                }
            });
            $(document.body).removeClass('modalShown');
        });
    };

    var showModal = function($modal) {
        var wrapper = $modal.closest('.modalWrapper');
        var zIndex = 5001101 + ($('body').children('.blackout').length) * 2;
        var $blackout = $modal.data('blackout');
        var blackoutOpacity = $blackout.attr('data-opacity');
        if (!blackoutOpacity) {
            blackoutOpacity = 0.65;
        }
        $blackout.css({
            display: 'block',
            opacity: blackoutOpacity,
            zIndex: zIndex
        }).removeClass('blackoutHidden');
        wrapper.css({
            top: wrapper.getModalTopOffset(),
            zIndex: zIndex + 1,
            opacity: 1,
            display: 'block'
        });
        $(document.body).addClass('modalShown');
    };

    var getModalTopOffset = function($wrapper) {
        var top = Math.max((($(window).height() - $wrapper.outerHeight()) / 2), 20);
        var opts = $wrapper.data('settings');
        if (opts && typeof opts.topMaximum == 'number') {
            top = Math.min(top, opts.topMaximum);
        }
        return $(window).scrollTop() + top;
    };

    var makeModal = function($dialog, options) {
        var settings = {
            showCloseButton: true,
            width: 400,
            height: 'auto',
            tabsOutsideContent: !1,
            topOffset: 50,
            escapeToClose: !0
        }, calculatedZIndex, modalWidth, mainContent;

        if (options) {
            $.extend(settings, options);
        }

        var ts = Math.round(Date.now() / 1000);
        var id = settings.id || ($dialog.attr('id') || ts) + 'Wrapper';
        var wrapper = $('<section>', {
            'class': 'SCMModal modalWrapper',
            'id': id
        }).append($('<section>', {
            'class': 'modalContent'
        }).append($dialog)).appendTo('body');

        if (settings.className) {
            wrapper.addClass(settings.className);
        }

        var zIndex = settings.zIndex ? parseInt(settings.zIndex) : (5001101 + ($('body').children('.blackout').length) * 2);
        calculatedZIndex = zIndex + 1;
        wrapper.data('settings', settings);
        if (!settings.noHeadline) {
            var headline = wrapper.find('h1:first');
            if (headline.length !== 0) {
                headline.remove();
            } else {
                headline = $('<h1>').html($dialog.attr('title') || '');
            }
            headline.prependTo(wrapper);
        }

        var modalTabs = wrapper.find('.modal-tabs');
        if (modalTabs.length !== 0) {
            modalTabs.insertBefore(wrapper.find('.modalContent'));
        }

        if (settings.width !== 'auto') {
            if (settings.width !== undefined) {
                modalWidth = settings.width + 40;
            } else {
                mainContent = $('#WikiaMainContent');
                if (mainContent.length > 0) {
                    modalWidth = mainContent.width();
                }
            }
        } else {
            modalWidth = 'auto';
        }

        wrapper.width(modalWidth).css({
            left: '50%',
            height: settings.height,
            'margin-left': -wrapper.outerWidth(false) / 2,
            top: $(window).scrollTop() + settings.topOffset,
            zIndex: calculatedZIndex
        });

        if (settings.showCloseButton) {
            wrapper.prepend('<button class="close wikia-chiclet-button"><img src="https://images.wikia.com/dev/images/3/31/SCM-icon-close.png"></button>');
        }

        $dialog.removeAttr('title');
        var persistent = (typeof settings.persistent == 'boolean') ? settings.persistent : !1;
        var closeOnBlackoutClick = (typeof settings.closeOnBlackoutClick == 'boolean') ? settings.closeOnBlackoutClick : !0;
        wrapper.find('.close').on('click', function() {
            var wrapper = $dialog.closest('.modalWrapper');
            var settings = wrapper.data('settings');
            if (typeof settings.onClose == 'function') {
                if (settings.onClose({
                    click: 1
                }) === false) {
                    return;
                }
            }

            if (persistent) {
                hideModal(wrapper);
            } else {
                closeModal(wrapper);
            }
        });

        if (settings.escapeToClose) {
            $(window).on('keydown.modal' + id, function(event) {
                if (event.keyCode == 27) {
                    if (typeof settings.onClose == 'function') {
                        if (settings.onClose({
                            keypress: 1
                        }) === false) {
                            return;
                        }
                    }

                    if (persistent) {
                        hideModal(wrapper);
                    } else {
                        closeModal(wrapper);
                    }

                    return false;
                }
            });
        }

        // $(window).on('resize.modal', function() {
        //     if (!settings.resizeModal) {
        //         return;
        //     }

        //     wrapper.css('top', getModalTopOffset(wrapper));
        //     $('.blackout:last').height($(document).height());
        // });

        var blackoutOpacity = 0.65;
        if (settings.blackoutOpacity) {
            blackoutOpacity = settings.blackoutOpacity;
        }

        var blackout = $('<div>').addClass('SCMBlackout blackout').attr('data-opacity', blackoutOpacity);
        blackout.css({
            zIndex: zIndex,
            opacity: 0
        }).fadeTo('fast', blackoutOpacity).on('click', function() {
            if (!closeOnBlackoutClick) {
                return;
            }
            if (typeof settings.onClose == 'function') {
                if (settings.onClose({
                    click: 1
                }) == false) {
                    return;
                }
            }
            if (persistent) {
                hideModal(wrapper);
            } else {
                closeModal(wrapper);
            }
        });

        blackout.appendTo('body');

        wrapper.data('blackout', blackout);
        if (typeof settings.onCreate == 'function') {
            settings.onCreate($dialog, wrapper);
        }
        $(document.body).addClass('modalShown');

        return wrapper;
    };

    var showCustomModal = function(title, content, options) {
        var buttons = '', buttonNo, button, dialog, modal;
        if (typeof options === 'undefined' && typeof content === 'object') {
            options = content;
            content = content.content || '';
            delete options.content;
        }
        if (typeof options !== 'object') {
            options = {};
        }

        if (options.buttons) {
            buttons = $('<div class="neutral modalToolbar"></div>');

            for (buttonNo = 0; buttonNo < options.buttons.length; buttonNo++) {
                var button = options.buttons[buttonNo];
                var $button = $('<a>');
                if (button.id) {
                    $button.attr('id', button.id);
                }

                $button.addClass('wikia-button');
                if (!button.defaultButton) {
                    $button.addClass('secondary');
                }

                $button.html(button.message);
                $button.on('click', button.handler);

                $button.appendTo(buttons);
            }
        }

        dialog = $('<div>').append(content).attr('title', title).append(buttons);
        $('body').append(dialog);

        if (typeof options.callbackBefore === 'function') {
            options.callbackBefore();
        }

        modal = makeModal(dialog, options);

        if (typeof options.callback === 'function') {
            options.callback(modal);
        }

        return modal;
    };

    showCustomModal.makeModal = makeModal;
    showCustomModal.hideModal = hideModal;
    showCustomModal.showModal = showModal;
    showCustomModal.closeModal = closeModal;
    showCustomModal.getModalTopOffset = getModalTopOffset;

    var imported = importArticle({
        type: 'style',
        article: 'w:c:dev:MediaWiki:ShowCustomModal.css'
    });
    var fire = function() {
        mw.hook('dev.showCustomModal').fire(showCustomModal);
    };

    function patchStyles() {
        // Thank u sophie
        var textColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-article-text-color');
        var isDark = textColor === '#e6e6e6';

        if (isDark) {
            mw.util.addCSS('\
.modalWrapper {\
    box-shadow: 0 10px 60px 0 black;\
}');
        }
    }

    imported.then(function() {
        patchStyles();
        fire();
    });

    window.dev = window.dev || {};
    dev.showCustomModal = showCustomModal;
})();


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
		'la-triade.fandom.com/fr',
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