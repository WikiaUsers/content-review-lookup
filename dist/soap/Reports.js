// Please use https://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript for development.

/**
 * Flexible form script for SOAP Wiki reports
 *
 * @author Lil' Miss Rarity - original author
 * @author Joeytje50        - i18n fixes and dropdown
 * @author Jr Mime          - pop-up layout, variables
 * @author VegaDark         - soap adaption
 * @author Cqm              - Major cleanup/rewrite
 * @author TK-999           - wds buttons
 * @author Noreplyz         - i18n fixes, template, design
 * @author Magiczocker      - update UI design
 *
 * @license: CC-BY-NC-SA
 */

// <nowiki>
( ( mw ) => {
	'use strict';

	const config = mw.config.get( [
			'wgArticlePath',
			'wgScriptPath',
			'wgPageName',
			'wgSiteName',
			'wgUserName',
			'wgServer'
		] ),
		urlparams = new URLSearchParams( window.location.search ),
		options = {},
		csrfToken = mw.user.tokens.get( 'csrfToken' );
	let msg,
		opts,
		dialogExist = false;

	if ( !config.wgUserName || !config.wgPageName.match( /^Report:/ ) ) {
		return;
	}

	/**
	 * Checks if the domain is a valid fandom url
	 * @param {string} input - Domain to check for
	 * @return {string} Filtered domain
	 */
	function filterFandomDomain( input ) {
		const fandomDomainRE = /(?:https?:\/\/)?(.*?\.)(fandom\.com)(\/[^/]*?)?(?:\/.*)?$/,
			filteredDomain = input.match( fandomDomainRE );

		if ( !filteredDomain ) {
			return null;
		}

		filteredDomain.splice( 0, 1 );

		if ( Array.prototype.includes.call( [ '/wiki', '/f', '/ ' ], filteredDomain[ 2 ] ) ) {
			filteredDomain.pop();
		}

		return filteredDomain.join( '' );
	}

	function addDialog( label ) {
		return '<cdx-dialog' +
			' v-model:open="showDialog"' +
			` title="${ label }"` +
			' :use-close-button="true"' +
		'>';
	}

	function addToggleSwitch( value, data ) {
		return '<cdx-field>' +
			'<cdx-toggle-switch' +
				' :align-switch="true"' +
				` v-model="${ value }"` +
				`>${ data.label }</cdx-toggle-switch>` +
		'</cdx-field>';
	}

	function addTextInput( value, data ) {
		return '<cdx-field' +
			( data.status ? ` :status=${ data.status }` : '' ) +
			( data.message ? ` :messages=${ data.message }` : '' ) +
		'>' +
			`<template #label>${ data.label }</template>` +
			( data.description ? `<template #description>${ data.description }</template>` : '' ) +
			'<cdx-text-input' +
				( data.blur ? ` @blur="${ data.blur }"` : '' ) +
				( data.type ? ` input-type="${ data.type }"` : '' ) +
				( data.disabled ? ' disabled' : '' ) +
				` v-model="${ value }"` +
				` placeholder="${ data.placeholder }"` +
			'></cdx-text-input>' +
		'</cdx-field>';
	}

	function addTextArea( value, data ) {
		return '<cdx-field' +
			( data.show ? ` v-show="${ data.show }"` : '' ) +
			( data.status ? ` :status="${ data.status }"` : '' ) +
			( data.message ? ` :messages="${ data.message }"` : '' ) +
		'>' +
			`<template #label>${ data.label }</template>` +
			`<template #description>${ data.description }</template>` +
			'<cdx-text-area' +
				( data.blur ? ` @blur=${ data.blur }` : '' ) +
				` v-model="${ value }"` +
				` placeholder="${ data.placeholder }"` +
			'></cdx-text-area>' +
		'</cdx-field>';
	}

	function addFooter() {
		return '<template #footer>' +
			'<div style="text-align: center;">' +
				'<cdx-button' +
					' weight="primary"' +
					' @click="submit"' +
					' action="progressive"' +
				'>Submit</cdx-button>' +
			'</div>' +
		'</template></cdx-dialog>';
	}

	function addWikiInput() {
		return [
			addTextInput( 'wikiurl', {
				label: msg( 'wikiurl-header' ).escape(),
				description: msg( 'wikiurl-label' ).escape(),
				placeholder: config.wgServer,
				blur: 'validateLink',
				status: 'linkStatus',
				message: 'linkMessage'
			} ),
			addTextInput( 'wikiname', {
				label: msg( 'wikiname-header' ).escape(),
				placeholder: config.wgSiteName,
				disabled: true
			} )
		].join( '' );
	}

	function createWindow( button ) {
		mw.loader.using( [
			'@wikimedia/codex',
			'mediawiki.util'
		] ).then( ( require ) => {
			const Vue = require( 'vue' ),
				Codex = require( '@wikimedia/codex' ),
				mountPoint = document.body.appendChild( document.createElement( 'div' ) );

			Vue.createMwApp( {
				compatConfig: {
					MODE: 3
				},
				compilerOptions: {
					whitespace: 'condense'
				},
				data: function () {
					return {
						showDialog: true,
						linkStatus: 'default',
						linkMessage: {
							error: 'Invalid URL!',
							warning: 'This field is required.'
						},
						userStatus: 'default',
						userMessage: {
							error: '',
							warning: 'This field is required.'
						},
						// Text input
						blockid: '', // phalanx
						comment: '', // all
						sockusers: '', // vandalism
						user: urlparams.get( 'user' ) || '', // spam, vandalism
						wikiname: '', // all
						wikipage: '', // phalanx
						wikiurl: urlparams.get( 'url' ) || '', // all
						// Toggle switch
						crosswiki: false, // spam, vandalism
						socks: false // vandalism
					};
				},
				template: opts.form,
				methods: {
					openDialog() {
						this.showDialog = true;
					},
					submit() { // Need a rewrite. Is currently a copy of the old script.
						const self = this,
							params = {},
							urlparams = {
								action: 'edit',
								format: 'json',
								tags: 'report-form',
								token: csrfToken
							};
						let canSave = true,
							keyedValueCount = 0,
							sockCount = 0,
							submitText = `${ opts.submitText }`,
							summary = `${ opts.summary }`,
							sectionTitle = `${ opts.sectionTitle }`;

						opts.required.forEach( ( i ) => {
							if ( self[ i ].length === 0 ) {
								canSave = false;
							}
						} );

						if ( self.linkStatus !== 'default' || self.userStatus !== 'default' ) {
							canSave = false;
						}

						if ( !canSave ) {
							// eslint-disable-next-line no-alert
							alert( 'One or more required fields are missing or contain invalid data. Please check your submission and try again.' );
							return;
						}

						for ( const x in opts.formParams ) {
							if ( !Object.prototype.hasOwnProperty.call( opts.formParams, x ) ) {
								continue;
							}

							const field = opts.formParams[ x ];
							let text = self[ field ],
								re,
								domain;

							if ( typeof ( text ) === 'boolean' && text ) {
								text = toString( text );
							}
							if ( text.length > 0 ) {
								text = text.trim();
							}

							/* Specific customisations for each form output */
							// default wikiname
							if ( field === 'wikiurl' ) {
								re = /\/\/(.*)\.fandom\.com\/?(.*)\/?/;
								domain = re.exec( text );
								if ( domain !== null ) {
									// for non-EN wikis, add the lang code (es.community)
									params[ x ] = ( domain[ 3 ] ? ( domain[ 3 ] + '.' ) : '' ) + domain[ 1 ];
									continue;
								}
							}

							// handle multiple users
							if ( field === 'user' && text.indexOf( '\n' ) !== -1 ) {
								if ( x === '$5' ) {
									text = ( text.match( /(?:\r\n|\r|\n)/g ) || [] ).length + 1 + ' users';
								} else {
									text = text.replace( /\n$/g, '' ); // fix blank last user
									text = text.replace( /(?:\r\n|\r|\n)/g, '\n|' );
								}
							}

							// handle checkboxes
							if ( field === 'crosswiki' ) {
								if ( text ) {
									text = '\\crosswiki=yes\n';
									keyedValueCount++;
								} else {
									text = '';
								}
							}
							if ( field === 'socks' ) {
								if ( text ) {
									sockCount = 1;
									keyedValueCount++;
								}
								text = '';
							}

							// handle socks
							if ( field === 'sockusers' ) {
								if ( text === '' && sockCount ) {
									// eslint-disable-next-line no-alert
									alert( 'One or more required fields are missing. Please check your submission and try again.' );
									return;
								} else if ( sockCount ) {
									text = '\\socks=' + text + '\n';
								} else {
									text = '';
								}
							}

							// patch | in reason
							if ( field === 'comment' ) {
								text = text.replace( /\|/g, '\\\\' );
							}

							params[ x ] = text;
						}
						for ( const x in params ) {
							if ( !Object.prototype.hasOwnProperty.call( params, x ) ) {
								continue;
							}
							// convert to regex to use the same parameter multiple times
							const y = new RegExp( x.replace( /\$/, '\\$' ), 'g' );
							submitText = submitText.replace( y, params[ x ] );
							summary = summary.replace( y, params[ x ] );
							sectionTitle = sectionTitle.replace( y, params[ x ] );
						}

						// Fix when template thinks = is a key
						if ( submitText.match( /=/g ) !== null && submitText.match( /=/g ).length > keyedValueCount ) {
							let templateParam = 0;
							submitText = submitText.replace( /\|/g, () => { // match, i, original
								templateParam++;
								return '|' + templateParam + '=';
							} );
						}
						if ( keyedValueCount ) {
							submitText = submitText.replace( /\\crosswiki/g, '|crosswiki' );
							submitText = submitText.replace( /\\socks/g, '|socks' );
						}

						// eslint-disable-next-line no-console
						console.log( '[SOAP Report]', submitText, summary );

						urlparams.title = opts.page;
						urlparams.summary = summary;

						if ( opts.page === 'Report:Wiki' ) {
							urlparams.appendtext = '\n' + submitText;
						} else {
							urlparams.section = 'new';
							urlparams.sectiontitle = sectionTitle;
							urlparams.text = submitText;
						}

						fetch( config.wgScriptPath + '/api.php', {
							body: new URLSearchParams( urlparams ),
							method: 'POST',
							credentials: 'include'
						} ).then( ( response ) => {
							return response.json();
						} ).then( () => {
							setTimeout( function () {
								window.location.reload();
							}, 3000 );
						} );
					},
					validateUsers() {
						this.userStatus = 'default';
						const self = this,
							users = self.user.split( '\n' ).map( function ( a ) {
								return a.trim();
							} ).filter( function ( b ) {
								return b.length > 0;
							} ),
							missingUsers = [];
						self.user = users.join( '\n' );
						if ( users.length === 0 ) {
							self.userStatus = 'warning';
							return;
						}
						fetch( config.wgScriptPath + '/api.php?' + new URLSearchParams( {
							action: 'query',
							format: 'json',
							list: 'users',
							formatversion: 2,
							usprop: '',
							ususers: users.join( '|' )
						} ) ).then( function ( response ) {
							return response.json();
						} ).then( function ( data ) {
							data.query.users.forEach( function ( user ) {
								if ( user.missing || ( user.invalid && !mw.util.isIPAddress( user.name ) ) ) {
									missingUsers.push( user.name );
								}
							} );
							if ( missingUsers.length > 0 ) {
								self.userStatus = 'error';
								if ( missingUsers.length === 1 ) {
									self.userMessage.error = `User "${ missingUsers[ 0 ] }" not found.`;
								} else {
									self.userMessage.error = `Users "${ missingUsers.join( '", "' ) }" not found.`;
								}
							}
						} );
					},
					validateLink() {
						this.linkStatus = 'default';
						this.wikiname = '';
						const url = filterFandomDomain( this.wikiurl );

						if ( !url ) {
							this.linkStatus = this.wikiurl.length > 0 ? 'error' : 'warning';
							return;
						}

						this.wikiurl = `https://${ url }`;

						fetch( `https://${ url }/api.php?` + new URLSearchParams( {
							action: 'query',
							meta: 'siteinfo',
							siprop: 'general',
							formatversion: 2,
							format: 'json',
							origin: '*'
						} ), {
							method: 'GET'
						} ).then( ( response ) => {
							return response.json();
						} ).then( ( data ) => {
							this.wikiname = data.query.general.sitename;
						} ).catch( () => {
							this.linkStatus = 'error';
						} );
					}
				},
				mounted() {
					button.addEventListener( 'click', this.openDialog );
					if ( urlparams.get( 'url' ) ) {
						this.validateLink();
					}
					if ( urlparams.get( 'user' ) ) {
						this.validateUsers();
					}
				},
				unMounted() {
					button.removeEventListener( this.openDialog );
				}
			} )
				.component( 'cdx-button', Codex.CdxButton )
				.component( 'cdx-field', Codex.CdxField )
				.component( 'cdx-text-input', Codex.CdxTextInput )
				.component( 'cdx-text-area', Codex.CdxTextArea )
				.component( 'cdx-toggle-switch', Codex.CdxToggleSwitch )
				.component( 'cdx-dialog', Codex.CdxDialog )
				.mount( mountPoint );
		} );
	}

	function setOptions() {
		options.phalanx = {
			page: 'Report:Spam_filter_problems',
			buttonText: msg( 'button-false-positive' ).escape(),
			form: [
				addDialog( msg( 'button-false-positive' ).escape() ),
				addWikiInput(),
				addTextInput( 'wikipage', {
					label: msg( 'wikipage-header' ).escape(),
					description: msg( 'wikipage-label' ).escape(),
					placeholder: config.wgPageName
				} ),
				addTextInput( 'blockid', {
					label: msg( 'blockid-header' ).escape(),
					description: msg( 'blockid-label' ).escape(),
					placeholder: msg( 'blockid-placeholder' ).escape(),
					type: 'number'
				} ),
				addTextArea( 'comment', {
					label: msg( 'phalanx-header' ).escape(),
					description: msg( 'comment-label' ).escape(),
					placeholder: msg( 'comment-placeholder' ).escape()
				} ),
				addFooter()
			].join( '' ),
			required: [
				'wikiurl',
				'wikipage',
				'blockid'
			],
			formParams: {
				$1: 'wikiurl',
				$2: 'wikiname',
				$5: 'wikipage',
				$3: 'blockid',
				$4: 'comment'
			},
			submitText: '{{Report filter|$1\n' +
				'|$5\n' +
				'|$3\n' +
				'|$4\n' +
				'|' + config.wgUserName + '|~~~~~}}',
			summary: 'New filter report ($2, #$3)',
			sectionTitle: 'Block #$3 on $2'
		};

		options.spam = {
			page: 'Report:Spam',
			buttonText: msg( 'button-spam' ).escape(),
			form: [
				addDialog( msg( 'button-spam' ).escape() ),
				addWikiInput(),
				addTextArea( 'user', {
					label: msg( 'user-header' ).escape(),
					description: msg( 'user-label' ).escape(),
					placeholder: msg( 'user-placeholder' ).escape(),
					blur: 'validateUsers',
					status: 'userStatus',
					message: 'userMessage'
				} ),
				addTextArea( 'comment', {
					label: msg( 'phalanx-header' ).escape(),
					description: msg( 'comment-label' ).escape(),
					placeholder: msg( 'comment-placeholder' ).escape()
				} ),
				addToggleSwitch( 'crosswiki', {
					label: msg( 'crosswiki-label' ).escape()
				} ),
				addFooter()
			].join( '' ),
			required: [
				'wikiurl',
				'user'
			],
			formParams: {
				$1: 'wikiurl',
				$2: 'wikiname',
				$3: 'user',
				$4: 'comment',
				$5: 'user', // for different styling
				$6: 'crosswiki'
			},
			submitText: '{{Report spam|$1\n' +
				'|$4\n' +
				'|$3\n' +
				'$6' +
				'|' + config.wgUserName + '|~~~~~}}',
			summary: 'New spam report ($1, $5)',
			sectionTitle: '$5 at $2'
		};

		options.vandalism = {
			page: 'Report:Vandalism',
			buttonText: msg( 'button-vandalism' ).escape(),
			form: [
				addDialog( msg( 'button-vandalism' ).escape() ),
				addWikiInput(),
				addTextArea( 'user', {
					label: msg( 'user-header' ).escape(),
					description: msg( 'user-label' ).escape(),
					placeholder: msg( 'user-placeholder' ).escape(),
					blur: 'validateUsers',
					status: 'userStatus',
					message: 'userMessage'
				} ),
				addTextArea( 'comment', {
					label: msg( 'comment-header' ).escape(),
					description: msg( 'comment-label' ).escape(),
					placeholder: msg( 'comment-placeholder' ).escape()
				} ),
				addToggleSwitch( 'crosswiki', {
					label: msg( 'crosswiki-label' ).escape()
				} ),
				addToggleSwitch( 'socks', {
					label: msg( 'socks-label' ).escape()
				} ),
				addTextArea( 'sockusers', {
					label: msg( 'sockusers-header' ).escape(),
					description: msg( 'sockusers-label' ).escape(),
					placeholder: msg( 'sockusers-placeholder' ).escape(),
					show: 'socks'
				} ),
				addFooter()
			].join( '' ),
			required: [
				'wikiurl',
				'user'
			],
			formParams: {
				$1: 'wikiurl',
				$2: 'wikiname',
				$3: 'user',
				$4: 'comment',
				$5: 'user', // for different styling
				$6: 'crosswiki',
				$7: 'socks',
				$8: 'sockusers'
			},
			submitText: '{{Report vandalism|$1\n' +
				'|$4\n' +
				'|$3\n' +
				'$6$7$8' +
				'|' + config.wgUserName + '|~~~~~}}',
			summary: 'New vandalism report ($1, $5)',
			sectionTitle: '$5 at $2'
		};

		options.wiki = {
			page: 'Report:Wiki',
			buttonText: msg( 'button-wiki' ).escape(),
			form: [
				addDialog( msg( 'button-wiki' ).escape() ),
				addWikiInput(),
				addTextArea( 'comment', {
					label: msg( 'comment-header' ).escape(),
					description: msg( 'comment-label' ).escape(),
					placeholder: msg( 'comment-placeholder' ).escape()
				} ),
				`<div><b>${ msg( 'guidelines-title' ).escape() }</b></div>`,
				`<div>${ msg( 'guidelines-text' ).plain() }</div>`,
				addFooter()
			].join( '' ),
			required: [
				'wikiurl'
			],
			formParams: {
				$1: 'wikiname',
				$2: 'wikiurl',
				$3: 'comment'
			},
			submitText: '{{badwiki|$2|$3}}',
			summary: 'New bad wiki report ([[w:c:$2|$1]], comment: $3)',
			sectionTitle: ''
		};
	}

	/**
	 * Loads the report form button
	 * @param {Object} ele
	 */
	function loadButton( ele ) {
		const button = document.createElement( 'button' );
		button.className = 'cdx-button';
		button.style.cursor = 'pointer';
		button.textContent = opts.buttonText;
		button.addEventListener( 'click', () => {
			if ( !dialogExist ) {
				dialogExist = true;
				createWindow( button );
			}
		} );

		ele.innerHTML = '';
		ele.appendChild( button );

		// Fire hook for scripts that use the button
		mw.hook( 'soap.reports' ).fire( button );
		if ( urlparams.get( 'openmodal' ) ) {
			createWindow( button );
		}
	}

	function init() {
		setOptions();
		for ( const key in options ) {
			const option = options[ key ],
				ele = document.getElementsByClassName( `rb-${ key }` );
			if ( ele.length > 0 ) {
				opts = option;
				loadButton( ele[ 0 ] );
			}
		}
	}

	mw.hook( 'dev.i18n' ).add( ( i18n ) => {
		i18n.loadMessages( 'u:soap:MediaWiki:Custom-Reports/i18n.json' ).done( ( i18no ) => {
			msg = i18no.msg;
			init();
		} );
	} );

	mw.loader.using( 'ext.fandom.ContentReview.legacyLoaders.js' ).then( () => {
		window.importArticle( {
			type: 'script',
			article: 'u:dev:MediaWiki:I18n-js/code.js'
		} );
	} );
} )( window.mediaWiki );
// </nowiki>