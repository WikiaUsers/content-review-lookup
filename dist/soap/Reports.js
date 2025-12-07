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
 * @license CC-BY-NC-SA
 */

// <nowiki>
( () => {
	'use strict';

	if ( !mw.config.get( 'wgUserName' ) ||
		!mw.config.get( 'wgPageName' ).match( /^Report:/ ) ) {
		return;
	}

	const rootComponent = {
		name: 'Reports',
		props: {
			button: { type: Object, required: true },
			config: { type: Object, required: true },
			field: { type: Object, required: true },
			id: { type: String, required: true },
			msg: { type: Function, required: true },
			opts: { type: Object, required: true },
			urlparams: { type: Object, required: true }
		},
		data() {
			return {
				showDialog: true,
				disableUI: false,
				errors: [],
				curwikiurl: '',
				linkMessage: {
					error: 'Invalid URL!',
					warning: 'This field is required.'
				},
				wikinameStatus: 'default',
				wikinameMessage: {
					error: 'Wiki not found!',
					warning: 'Loading...',
					success: 'Wiki found!'
				},
				userStatus: 'warning',
				userMessage: {
					error: '',
					warning: 'This field is required.'
				},
				wikipageMessage: {
					error: 'Pagename contains invalid characters',
					warning: 'This field is required.'
				},
				blockidMessage: {
					error: 'Invalid id',
					warning: 'This field is required.'
				},
				sockStatus: 'warning',
				sockMessage: {
					error: '',
					warning: 'This field is required.'
				},
				header: {
					phalanx: 'button-false-positive',
					spam: 'button-spam',
					vandalism: 'button-vandalism',
					wiki: 'button-wiki'
				},
				legalChars: new RegExp( `^[${ this.config.wgLegalTitleChars }]+$` ),
				// Text input
				blockid: '', // phalanx
				comment: '', // all
				sockusers: '', // vandalism
				user: this.urlparams.get( 'user' ) || '', // spam, vandalism
				wikiname: '', // all
				wikipage: '', // phalanx
				wikiurl: this.urlparams.get( 'url' ) || '', // all
				// Toggle switch
				crosswiki: false, // spam, vandalism
				socks: false // vandalism
			};
		},
		computed: {
			submitDisabled() {
				return this.disableUI || (
					( this.field.wikiurl && this.linkStatus !== 'default' ) ||
					( this.field.wikiname && this.wikinameStatus !== 'success' ) ||
					( this.field.user && this.userStatus !== 'default' ) ||
					( this.field.blockid && this.blockidStatus !== 'default' ) ||
					( this.field.wikipage && this.wikipageStatus !== 'default' ) ||
					( this.socks && this.sockStatus !== 'default' )
				);
			},
			guidelinesText() {
				let t = this.msg( 'guidelines-text' ).plain();
				t = t.replace( /\[((?:https?:)?\/\/.+?) (.+?)\]/g, ( _, href, text ) => `<a href="${ href }">${ text }</a>` ); // External links
				t = t.replace( /\[\[(.+?)\|(.+?)\]\]/g, ( _, href, text ) => `<a href="${ mw.util.getUrl( href ) }">${ text }</a>` ); // Internal links
				return t;
			},
			blockidStatus() {
				const b = Number( this.blockid );
				if ( this.blockid.length === 0 ) {
					return 'warning';
				} else if ( b < 1 || b === 12345 ) {
					return 'error';
				} else {
					return 'default';
				}
			},
			wikipageStatus() {
				if ( this.wikipage.length === 0 ) {
					return 'warning';
				} else if ( !this.legalChars.test( this.wikipage ) ) {
					return 'error';
				} else {
					return 'default';
				}
			},
			linkStatus() {
				const fandomDomainRE = /(?:https?:\/\/)?(.*?\.)(fandom\.com)(\/[^/]*?)?(?:\/.*)?$/,
					filteredDomain = this.wikiurl.trim().match( fandomDomainRE );
				if ( this.wikiurl.length === 0 ) {
					return 'warning';
				} else if ( !filteredDomain ) {
					return 'error';
				} else {
					return 'default';
				}
			}
		},
		mounted() {
			this.button.addEventListener( 'click', this.openDialog );
			if ( this.urlparams.get( 'url' ) ) {
				this.validateLink();
			}
			if ( this.urlparams.get( 'user' ) ) {
				this.validateUser();
			}
		},
		unMounted() {
			this.button.removeEventListener( this.openDialog );
		},
		methods: {
			openDialog() {
				this.showDialog = true;
			},
			filterFandomDomain( input ) {
				const fandomDomainRE = /(?:https?:\/\/)?(.*?\.)(fandom\.com)(\/[^/]*?)?(?:\/.*)?$/,
					filteredDomain = input.trim().match( fandomDomainRE );

				if ( !filteredDomain ) {
					return null;
				}

				filteredDomain.splice( 0, 1 );

				if ( [ '/wiki', '/f', '/' ].includes( filteredDomain[ 2 ] ) ) {
					filteredDomain.pop();
				}

				return filteredDomain.join( '' );
			},
			submit() { // Need a rewrite. Is currently a copy of the old script.
				const self = this,
					params = {},
					urlparams = {
						action: 'edit',
						format: 'json',
						tags: 'report-form',
						formatversion: 2,
						token: mw.user.tokens.get( 'csrfToken' )
					};
				let keyedValueCount = 0,
					sockCount = 0,
					submitText = `${ self.opts.submitText }`,
					summary = `${ self.opts.summary }`,
					sectionTitle = `${ self.opts.sectionTitle }`;
				self.disableUI = true;

				for ( const x in self.opts.formParams ) {
					if ( !Object.prototype.hasOwnProperty.call( self.opts.formParams, x ) ) {
						continue;
					}

					const field = self.opts.formParams[ x ];
					let text = self[ field ],
						re,
						domain;

					if ( typeof text === 'boolean' && text ) {
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
							params[ x ] = ( domain[ 2 ] ? ( domain[ 2 ] + '.' ) : '' ) + domain[ 1 ];
							continue;
						}
					}

					// handle multiple users
					if ( field === 'user' && text.includes( '\n' ) ) {
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
						text = sockCount ? ( '\\socks=' + text + '\n' ) : '';
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

				urlparams.title = this.config.wgPageName;
				urlparams.summary = summary;

				if ( self.id === 'wiki' ) {
					urlparams.appendtext = '\n' + submitText;
				} else {
					urlparams.section = 'new';
					urlparams.sectiontitle = sectionTitle;
					urlparams.text = submitText;
				}

				fetch( self.config.wgScriptPath + '/api.php', {
					body: new URLSearchParams( urlparams ),
					method: 'POST',
					credentials: 'include'
				} ).then( ( response ) => response.json() ).then( () => {
					setTimeout( () => {
						document.location.href = self.config.wgArticlePath.replace( '$1', self.config.wgPageName );
					}, 3000 );
				} ).catch( ( error ) => {
					self.errors.push( {
						code: 'submit',
						info: error
					} );
				} );
			},
			validateUsers( sock ) {
				const field = sock ? 'sockusers' : 'user',
					status = sock ? 'sockStatus' : 'userStatus',
					message = sock ? 'sockMessage' : 'userMessage',
					self = this,
					users = self[ field ].split( '\n' ).map( ( a ) => a.trim() ).filter( ( b ) => b.length > 0 ),
					missingUsers = [];
				this[ status ] = 'default';
				self[ field ] = users.join( '\n' );
				if ( users.length === 0 ) {
					self[ status ] = 'warning';
					return;
				}
				fetch( self.config.wgScriptPath + '/api.php?' + new URLSearchParams( {
					action: 'query',
					format: 'json',
					list: 'users',
					formatversion: 2,
					usprop: '',
					ususers: users.join( '|' )
				} ), {
					method: 'GET',
					credentials: 'include'
				} ).then( ( response ) => response.json() ).then( ( data ) => {
					data.query.users.forEach( ( u ) => {
						if ( u.missing || ( u.invalid && !mw.util.isIPAddress( u.name ) ) ) {
							missingUsers.push( u.name );
						}
					} );
					if ( missingUsers.length > 0 ) {
						self[ status ] = 'error';
						if ( missingUsers.length === 1 ) {
							self[ message ].error = `User "${ missingUsers[ 0 ] }" not found.`;
						} else {
							self[ message ].error = `Users "${ missingUsers.join( '", "' ) }" not found.`;
						}
					}
				} ).catch( ( error ) => {
					self[ message ].error = `User check failed: "${ error }".`;
				} );
			},
			validateSocks() {
				this.validateUsers( true );
			},
			validateUser() {
				this.validateUsers( false );
			},
			validateLink() {
				const self = this,
					url = self.filterFandomDomain( self.wikiurl );
				if ( url ) {
					self.wikiurl = `https://${ url }`;
				}
				if ( self.curwikiurl === this.wikiurl ) {
					// do nothing
				} else if ( self.curwikiurl !== this.wikiurl && this.linkStatus === 'default' ) {
					self.wikiname = '';
					self.wikinameStatus = 'warning';

					self.curwikiurl = this.wikiurl;

					fetch( `${ self.wikiurl }/api.php?` + new URLSearchParams( {
						action: 'query',
						meta: 'siteinfo',
						siprop: 'general',
						formatversion: 2,
						format: 'json',
						origin: '*'
					} ), {
						method: 'GET',
						credentials: 'omit'
					} ).then( ( response ) => response.json() ).then( ( data ) => {
						self.wikiname = data.query.general.sitename;
						self.wikinameStatus = 'success';
					} ).catch( () => {
						self.wikinameStatus = 'error';
					} );
				} else {
					self.curwikiurl = this.wikiurl;
					self.wikiname = '';
					self.wikinameStatus = 'default';
				}
			}
		},
		template:
			`<cdx-dialog
				v-model:open="showDialog"
				:title="msg( header[ id ] ).plain()"
				:use-close-button="true"
			>
				<cdx-message v-for="error of errors" type="error">
					<strong>{{ error.code }}</strong><br>
					<template v-if="error.info !== ''">{{ error.info }}</template>
				</cdx-message>
				<cdx-field
					v-if="field.wikiurl"
					:status="linkStatus"
					:messages="linkMessage"
					:disabled="disableUI"
				>
					<template #label>{{ msg( 'wikiurl-header' ).plain() }}</template>
					<template #description>{{ msg( 'wikiurl-label' ).plain() }}</template>
					<cdx-text-input
						@blur="validateLink"
						min="1"
						v-model="wikiurl"
						:placeholder="config.wgServer"
					></cdx-text-input>
				</cdx-field>
				<cdx-field
					v-if="field.wikiname"
					:status="wikinameStatus"
					:messages="wikinameMessage"
					:disabled="disableUI"
				>
					<template #label>{{ msg( 'wikiname-header' ).plain() }}</template>
					<cdx-text-input
						disabled
						min="1"
						v-model="wikiname"
						:placeholder="config.wgSiteName"
					></cdx-text-input>
				</cdx-field>
				<cdx-field
					v-if="field.user"
					:status="userStatus"
					:messages="userMessage"
					:disabled="disableUI"
				>
					<template #label>{{ msg( 'user-header' ).plain() }}</template>
					<template #description>{{ msg( 'user-label' ).plain() }}</template>
					<cdx-text-area
						@blur="validateUser"
						v-model="user"
						:placeholder="msg( 'user-placeholder' ).plain()"
					></cdx-text-area>
				</cdx-field>
				<cdx-field
					v-if="field.wikipage"
					:status="wikipageStatus"
					:messages="wikipageMessage"
					:disabled="disableUI"
				>
					<template #label>{{ msg( 'wikipage-header' ).plain() }}</template>
					<template #description>{{ msg( 'wikipage-label' ).plain() }}</template>
					<cdx-text-input
						min="1"
						v-model="wikipage"
						:placeholder="config.wgPageName"
					></cdx-text-input>
				</cdx-field>
				<cdx-field
					v-if="field.blockid"
					:status="blockidStatus"
					:messages="blockidMessage"
					:disabled="disableUI"
				>
					<template #label>{{ msg( 'blockid-header' ).plain() }}</template>
					<template #description>{{ msg( 'blockid-label' ).plain() }}</template>
					<cdx-text-input
						input-type="number"
						min="1"
						v-model="blockid"
						:placeholder="msg( 'blockid-placeholder' ).plain()"
					></cdx-text-input>
				</cdx-field>
				<cdx-field
					v-if="field.comment"
					:disabled="disableUI"
				>
					<template #label>{{ msg( [ 'phalanx', 'spam' ].includes( id ) ? 'phalanx-header' : 'comment-header' ).plain() }}</template>
					<template #description>{{ msg( 'comment-label' ).plain() }}</template>
					<cdx-text-area
						v-model="comment"
						:placeholder="msg( 'comment-placeholder' ).plain()"
					></cdx-text-area>
				</cdx-field>
				<cdx-field
					v-if="field.crosswiki"
				>
					<cdx-toggle-switch
						:disabled="disableUI"
						:align-switch="true"
						v-model="crosswiki"
					>{{ msg( 'crosswiki-label' ).plain() }}</cdx-toggle-switch>
				</cdx-field>
				<cdx-field
					v-if="field.socks"
				>
					<cdx-toggle-switch
						:disabled="disableUI"
						:align-switch="true"
						v-model="socks"
					>{{ msg( 'socks-label' ).plain() }}</cdx-toggle-switch>
				</cdx-field>
				<cdx-field
					v-if="field.sockusers"
					v-show="socks"
					:status="sockStatus"
					:messages="sockMessage"
					:disabled="disableUI"
				>
					<template #label>{{ msg( 'sockusers-header' ).plain() }}</template>
					<template #description>{{ msg( 'sockusers-label' ).plain() }}</template>
					<cdx-text-area
						@blur="validateSocks"
						v-model="sockusers"
						:placeholder="msg( 'sockusers-placeholder' ).plain()"
					></cdx-text-area>
				</cdx-field>
				<div v-if="field.guidelines"><b>{{ msg( 'guidelines-title' ).plain() }}</b></div>
				<div v-if="field.guidelines" v-html="guidelinesText"></div>
				<template #footer>
					<div style="display: flex; gap: 12px; flex-direction: row-reverse;">
						<cdx-button
							weight="primary"
							@click="submit"
							action="progressive"
							:disabled="submitDisabled"
						>Submit</cdx-button>
					</div>
				</template>
			</cdx-dialog>`
	};

	function setOptions( id, msg, config ) {
		const o = {};
		o.phalanx = {
			buttonText: msg( 'button-false-positive' ).plain(),
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

		o.spam = {
			buttonText: msg( 'button-spam' ).plain(),
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

		o.vandalism = {
			buttonText: msg( 'button-vandalism' ).plain(),
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

		o.wiki = {
			buttonText: msg( 'button-wiki' ).plain(),
			formParams: {
				$1: 'wikiname',
				$2: 'wikiurl',
				$3: 'comment'
			},
			submitText: '{{badwiki|$2|$3}}',
			summary: 'New bad wiki report ([[w:c:$2|$1]], comment: $3)',
			sectionTitle: ''
		};
		return o[ id ] || {};
	}

	function init( $content, i18no ) {
		if ( $content.find( 'div.loaded#reportbutton' ).length ) {
			return;
		}

		const config = mw.config.get( [
				'wgLegalTitleChars',
				'wgArticlePath',
				'wgScriptPath',
				'wgPageName',
				'wgSiteName',
				'wgUserName',
				'wgServer'
			] ),
			urlparams = new URLSearchParams( window.location.search ),
			field = {
				blockid: false,
				comment: false,
				crosswiki: false,
				guidelines: false,
				socks: false,
				sockusers: false,
				user: false,
				wikiname: false,
				wikipage: false,
				wikiurl: false
			},
			ele = $content.find( '#reportbutton' ),
			id = ele.data( 'type' ) || '',
			button = document.createElement( 'button' ),
			msg = i18no.msg,
			opts = setOptions( id, msg, config );

		if ( !ele.length || !id.length ) {
			return;
		}

		for ( const k in opts.formParams ) {
			field[ opts.formParams[ k ] ] = true;
		}

		if ( id === 'wiki' ) {
			field.guidelines = true;
		}

		button.className = 'cdx-button cdx-button--action-progressive cdx-button--weight-primary';
		button.style.cursor = 'pointer';
		button.textContent = opts.buttonText;
		button.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			mw.loader.using( [
				'@wikimedia/codex',
				'mediawiki.util',
				'mediawiki.user'
			] ).then( ( require ) => {
				const Vue = require( 'vue' ),
					Codex = require( '@wikimedia/codex' ),
					mountPoint = document.body.appendChild( document.createElement( 'div' ) );

				Vue.createMwApp( rootComponent, {
					button, config, field, id, msg, opts, urlparams
				} )
					.component( 'cdx-button', Codex.CdxButton )
					.component( 'cdx-dialog', Codex.CdxDialog )
					.component( 'cdx-field', Codex.CdxField )
					.component( 'cdx-message', Codex.CdxMessage )
					.component( 'cdx-text-area', Codex.CdxTextArea )
					.component( 'cdx-text-input', Codex.CdxTextInput )
					.component( 'cdx-toggle-switch', Codex.CdxToggleSwitch )
					.mount( mountPoint );
			} );
		}, { once: true } );

		ele.addClass( 'loaded' );
		ele.empty();
		ele.append( button );

		// Fire hook for scripts that use the button
		mw.hook( 'soap.reports' ).fire( button );
		if ( urlparams.get( 'openmodal' ) ) {
			button.click();
		}
	}

	mw.hook( 'dev.i18n' ).add( ( i18n ) => {
		i18n.loadMessages( 'u:soap:MediaWiki:Custom-Reports/i18n.json' ).done( ( i18no ) => {
			mw.hook( 'wikipage.content' ).add( ( $content ) => init( $content, i18no ) );
		} );
	} );

	mw.loader.using( 'ext.fandom.ContentReview.legacyLoaders.js' ).then( () => {
		window.importArticle( {
			type: 'script',
			article: 'u:dev:MediaWiki:I18n-js/code.js'
		} );
	} );
} )();
// </nowiki>