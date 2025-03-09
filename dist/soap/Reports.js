// Please use https://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript for development.

/** <nowiki>
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
 * TODO check if this script is needed before loading i18n
 * @license: CC-BY-NC-SA
 */

( function ( $, mw ) {
	'use strict';

	if ( window.SOAPReportsLoaded ) {
		return;
	}
	window.SOAPReportsLoaded = true;

	const csrfToken = mw.user.tokens.get( 'csrfToken' ),
		config = mw.config.get( [
			'wgArticlePath',
			'wgScriptPath',
			'wgUserName',
			'wgSiteName',
			'wgPageName',
			'wgServer'
		] ),
		params = new URLSearchParams( window.location.search ),
		options = {},
		modal = {};
	let reportDropdown,
		msg,
		opts;

	/**
	 * Return header html code for UI generation
	 * @param {Object} name - Name for the header
	 * @return {string} Generated html code
	 */
	function addHeader( name ) {
		return '<div class="sectionHeaderWrapper">' +
			'<h3 class="sectionHeader">' + name + '</h3>' +
		'</div>';
	}

	/**
	 * Return label html code for UI generation
	 * @param {Object} data - Label, placeholder and id for the label
	 * @return {string} Generated html code
	 */
	function addLabel( data ) {
		return '<div class="sectionContent">' +
			( data.label ? '<label for="' + data.id + '">' + data.label + '</label>' : '' ) +
			'<input value="' + ( typeof ( data.content ) === 'string' ? mw.html.escape( data.content ) : '' ) + '" id="' + data.id + '" name="' + data.id + '" type="text" placeholder="' + data.placeholder + '" class="formInput" ' + ( data.disabled ? 'disabled' : '' ) + '>' +
		'</div>';
	}

	/**
	 * Return textarea html code for UI generation
	 * @param {Object} data - Label, placeholder and id for the textarea
	 * @return {string} Generated html code
	 */
	function addTextarea( data ) {
		return '<div class="sectionContent">' +
			( data.label ? '<label for="' + data.id + '">' + data.label + '</label>' : '' ) +
			'<textarea id="' + data.id + '" name="' + data.id + '" placeholder="' + data.placeholder + '" class="formInput ' + ( data.optional ? 'optional' : '' ) + '">' + ( typeof ( data.content ) === 'string' ? mw.html.escape( data.content ) : '' ) + '</textarea>' +
		'</div>';
	}

	/**
	 * Return checkbox html code for UI generation
	 * @param {Object} data - Label and id for the checkbox
	 * @return {string} Generated html code
	 */
	function addCheckbox( data ) {
		return '<div class="sectionContent">' +
			'<input id="' + data.id + '" type="checkbox" class="wds-toggle__input ' + ( data.optional ? 'optional' : '' ) + '">' +
			'<label for="' + data.id + '" class="wds-toggle__label">' + data.label + '</label>' +
		'</div>';
	}

	/**
	 * Checks if the domain is a valid fandom url
	 * @param {string} input - Domain to check for
	 * @return {string} Filtered domain
	 */
	function filterFandomDomain( input ) {
		const fandomDomainRE = /(?:https?:\/\/)?(.*?\.)(fandom\.com)(\/[^/]*?)?(?:\/.*)?$/;
		let filteredDomain = input.match( fandomDomainRE );

		if ( !filteredDomain ) {
			return null;
		}

		filteredDomain.splice( 0, 1 );

		if ( filteredDomain[ 2 ] === '/wiki' || filteredDomain[ 2 ] === '/f' || filteredDomain[ 2 ] === '/' ) {
			filteredDomain.pop();
		}

		return filteredDomain.join( '' );
	}

	/**
	 * Set up options for use in forms, buttons
	 */
	function setOptions() {
		/*
		//BEGIN EXAMPLE
		example: {
			page: 'Page name the form is for',
			buttonText: 'Text for button to open form',
			form: 'HTML form for reporting users. Each input/textarea should have an id. any optional inputs should be marked with the `optional` class. If any attributes need URI encoding, the relevant inputs should have the `data-encode` attribute set to `true`.',
			// this is where the input ids in the form are matched to numbers
			// for use in the summary/submitted text
			formParams: {
				'$1': 'foo',
				'$2': 'bar'
			},
			submitText: 'Text to submit to the page. Any form parameters can be inserted via the key names in `formParams`',
			summary: 'Text used for the edit summary. Any form parameters can be inserted via the key names in `formParams`',
			sectionTitle: 'Text used as the section title. Any form parameters can be inserted via the key names in `formParams`'
		},
		// END EXAMPLE
		*/

		options.profile = {
			page: 'Report:User_profile_headers',
			buttonText: msg( 'button-profile' ).escape(),
			form: '<form class="fandomSOAPForm" method="" name="" id="profile">' +
				'<div style="color:#F00; font-size:16px; display:none;" id="formAnon"><b>' + msg( 'form-anon' ).escape() + '</b></div>' +
					'<div style="color:#F00;font-size:16px;"><b>' + msg( 'form-profile' ).escape() + '</b></div>' +
					'<div class="formSection">' +
						addHeader( msg( 'wikiurl-header' ).escape() ) +
						addLabel( {
							id: 'wikiurl',
							label: msg( 'wikiurl-label' ).escape(),
							placeholder: config.wgServer
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'wikiname-header' ).escape() ) +
						addLabel( {
							id: 'wikiname',
							placeholder: config.wgSiteName,
							disabled: true
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'user-header' ).escape() ) +
						addTextarea( {
							id: 'user',
							label: msg( 'user-label' ).escape(),
							placeholder: msg( 'user-placeholder' ).escape()
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'comment-header' ).escape() ) +
						addTextarea( {
							id: 'comment',
							label: msg( 'comment-label' ).escape(),
							placeholder: msg( 'comment-placeholder' ).escape(),
							optional: true
						} ) +
					'</div>' +
					addCheckbox( {
						id: 'socks',
						label: msg( 'socks-label' ).escape(),
						optional: true
					} ) +
					'<div class="formSection" style="display:none" id="formSocksBox">' +
						addHeader( msg( 'sockusers-header' ).escape() ) +
						addTextarea( {
							id: 'sockusers',
							label: msg( 'sockusers-label' ).escape(),
							placeholder: 'Rappy 4187\nDucksoup',
							optional: true
						} ) +
					'</div>' +
				'</form>',
			formParams: {
				$1: 'wikiurl',
				$2: 'wikiname',
				$3: 'user',
				$4: 'comment',
				$5: 'user', // for different styling
				$7: 'socks',
				$8: 'sockusers'
			},
			submitText: '{{Report profile|$1\n' +
				'|$4\n' +
				'|$3\n' +
				'$7$8' +
				'|' + config.wgUserName + '|~~~~~}}',
			summary: 'New profile report ($2, $5)',
			sectionTitle: '$2'
		};
		options.vandalism = {
			page: 'Report:Vandalism',
			buttonText: msg( 'button-vandalism' ).escape(),
			form: '<form class="fandomSOAPForm" method="" name="" id="vandalism">' +
				'<div style="color:#F00; font-size:16px; display:none;" id="formAnon"><b>' + msg( 'form-anon' ).escape() + '</b></div>' +
					'<div class="formSection">' +
						addHeader( msg( 'wikiurl-header' ).escape() ) +
						addLabel( {
							id: 'wikiurl',
							label: msg( 'wikiurl-label' ).escape(),
							placeholder: config.wgServer,
							content: params.get( 'url' )
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'wikiname-header' ).escape() ) +
						addLabel( {
							id: 'wikiname',
							placeholder: config.wgSiteName,
							disabled: true,
							content: params.get( 'name' )
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'user-header' ).escape() ) +
						addTextarea( {
							id: 'user',
							label: msg( 'user-label' ).escape(),
							placeholder: msg( 'user-placeholder' ).escape(),
							content: params.get( 'user' )
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'comment-header' ).escape() ) +
						addTextarea( {
							id: 'comment',
							label: msg( 'comment-label' ).escape(),
							placeholder: msg( 'comment-placeholder' ).escape(),
							optional: true
						} ) +
					'</div>' +
					addCheckbox( {
						id: 'crosswiki',
						label: msg( 'crosswiki-label' ).escape(),
						optional: true
					} ) +
					addCheckbox( {
						id: 'socks',
						label: msg( 'socks-label' ).escape(),
						optional: true
					} ) +
					'<div class="formSection" style="display:none" id="formSocksBox">' +
						addHeader( msg( 'sockusers-header' ).escape() ) +
						addTextarea( {
							id: 'sockusers',
							label: msg( 'sockusers-label' ).escape(),
							placeholder: msg( 'sockusers-placeholder' ).escape(),
							optional: true
						} ) +
					'</div>' +
				'</form>',
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
		options.spam = {
			page: 'Report:Spam',
			buttonText: msg( 'button-spam' ).escape(),
			form: '<form class="fandomSOAPForm" method="" name="" id="spam">' +
				'<div style="color:#F00; font-size:16px; display:none;" id="formAnon"><b>' + msg( 'form-anon' ).escape() + '</b></div>' +
					'<div class="formSection">' +
						addHeader( msg( 'wikiurl-header' ).escape() ) +
						addLabel( {
							id: 'wikiurl',
							label: msg( 'wikiurl-label' ).escape(),
							placeholder: config.wgServer,
							content: params.get( 'url' )
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'wikiname-header' ).escape() ) +
						addLabel( {
							id: 'wikiname',
							placeholder: config.wgSiteName,
							disabled: true,
							content: params.get( 'name' )
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'user-header' ).escape() ) +
						addTextarea( {
							id: 'user',
							label: msg( 'user-label' ).escape(),
							placeholder: msg( 'user-placeholder' ).escape(),
							content: params.get( 'user' )
						} ) +
					'</div>' +
					'<div class="formSection">' +
					addHeader( msg( 'comment-header' ).escape() ) +
						addTextarea( {
							id: 'comment',
							label: msg( 'comment-label' ).escape(),
							placeholder: msg( 'comment-placeholder' ).escape(),
							optional: true
						} ) +
					'</div>' +
					addCheckbox( {
						id: 'crosswiki',
						label: msg( 'crosswiki-label' ).escape(),
						optional: true
					} ) +
				'</form>',
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
		options.phalanx = {
			page: 'Report:Spam_filter_problems',
			buttonText: msg( 'button-false-positive' ).escape(),
			form: '<form class="fandomSOAPForm" method="" name="" id="phalanx">' +
				'<div style="color:#F00; font-size:16px; display:none;" id="formAnon"><b>' + msg( 'form-anon' ).escape() + '</b></div>' +
					'<div class="formSection">' +
						addHeader( msg( 'wikiurl-header' ).escape() ) +
						addLabel( {
							id: 'wikiurl',
							label: msg( 'wikiurl-label' ).escape(),
							placeholder: config.wgServer
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'wikiname-header' ).escape() ) +
						addLabel( {
							id: 'wikiname',
							placeholder: config.wgSiteName,
							disabled: true
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'wikipage-header' ).escape() ) +
						addLabel( {
							id: 'wikipage',
							label: msg( 'wikipage-label' ).escape(),
							placeholder: config.wgPageName
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'blockid-header' ).escape() ) +
						addLabel( {
							id: 'blockid',
							label: msg( 'blockid-label' ).escape(),
							placeholder: msg( 'blockid-placeholder' ).escape()
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'phalanx-header' ).escape() ) +
						addTextarea( {
							id: 'comment',
							label: msg( 'comment-label' ).escape(),
							placeholder: msg( 'comment-placeholder' ).escape(),
							optional: true
						} ) +
					'</div>' +
				'</form>',
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
		options.wiki = {
			page: 'Report:Wiki',
			buttonText: msg( 'button-wiki' ).escape(),
			form: '<form class="fandomSOAPForm" method="" name="" id="wiki">' +
				'<div style="color:#F00; font-size:16px; display:none;" id="formAnon"><b>' + msg( 'form-anon' ).escape() + '</b></div>' +
					'<div class="formSection">' +
						addHeader( msg( 'wikiurl-header' ).escape() ) +
						addLabel( {
							id: 'wikiurl',
							label: msg( 'wikiurl-label' ).escape(),
							placeholder: config.wgServer
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'wikiname-header' ).escape() ) +
						addLabel( {
							id: 'wikiname',
							placeholder: config.wgSiteName,
							disabled: true
						} ) +
					'</div>' +
					'<div class="formSection">' +
						addHeader( msg( 'comment-header' ).escape() ) +
						addTextarea( {
							id: 'comment',
							label: msg( 'comment-label' ).escape(),
							placeholder: msg( 'comment-placeholder' ).escape(),
							optional: true
						} ) +
					'</div>' +
					'<div><b>' + msg( 'guidelines-title' ).escape() + '</b></div>' +
						msg( 'guidelines-text' ).plain() +
					'</div>' +
				'</form>',
			formParams: {
				$1: 'wikiname',
				$2: 'wikiurl',
				$3: 'comment'
			},
			submitText: '{{badwiki|$2|$3}}',
			summary: 'New bad wiki report ([[w:c:$2|$1]], comment: $3)',
			sectionTitle: ''
		};
		reportDropdown = '<div class="wds-dropdown">' +
			'<div class="wds-dropdown__toggle wds-button">' +
				'<span>' + msg( 'button-report' ).escape() + '</span>' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><path d="M1 3h10L6 9z"></path></svg>' +
			'</div>' +
			'<div class="wds-dropdown__content">' +
				'<ul class="wds-list wds-is-linked" id="rf-dropdown-list">' +
				'</ul>' +
			'</div>' +
		'</div>';
	}

	/**
	 * Report form submission handler
	 * @param {Object} opts
	 * @return {null}
	 */
	function submitForm( opts ) {
		const $form = $( '.soap-reports form' ),
			$inputs = $form.find( 'input, textarea' ),
			$button = $( '.soap-reports #submit' ),
			params = {},
			urlparams = {
				action: 'edit',
				format: 'json',
				tags: 'report-form',
				token: csrfToken
			};
		let x, y, $input, text,
			keyedValueCount = 0,
			sockCount = 0;

		if ( ( $button ).attr( 'disabled' ) === 'disabled' ) {
			return;
		}

		$button.attr( 'disabled', true );

		for ( x in opts.formParams ) {
			if ( !Object.prototype.hasOwnProperty.call( opts.formParams, x ) ) {
				continue;
			}
			$input = $inputs.filter( '#' + opts.formParams[ x ] );

			if ( !$input.length ) {
				console.log( '[SOAP Report]', 'An error has been found in the form config. Please check the formParams and input ids.' );
				$button.attr( 'disabled', false );
				return $.Deferred().resolve();
			}

			text = $input.val();
			if ( $input.is( ':checkbox' ) ) {
				text = $input.prop( 'checked' );
			}
			if ( text.length > 0 ) {
				text = text.trim();
			}

			if ( !text && !$input.hasClass( 'optional' ) ) {
				console.log( '[SOAP Report]', $input );
				alert( 'One or more required fields are missing. Please check your submission and try again.' );
				$button.attr( 'disabled', false );
				return $.Deferred().resolve();
			}

			/* Specific customisations for each form output */

			if ( $input.attr( 'data-encode' ) === 'true' ) {
				text = encodeURIComponent( text );
			}
			let re, domain;
			// default wikiname
			if ( $input.attr( 'id' ) === 'wikiurl' ) {
				re = /\/\/(.*)\.(wikia|fandom|gamepedia)\.com\/?(.*)\/?/;
				domain = re.exec( text );
				if ( domain !== null ) {
					// for non-EN wikis, add the lang code (es.community)
					params[ x ] = domain[ 3 ] + ( domain[ 3 ] ? '.' : '' ) + domain[ 1 ];
					continue;
				}
			} else if ( $input.attr( 'id' ) === 'wikiname' ) {
				if ( !text ) {
					text = $inputs.filter( '#wikiurl' ).val();
				}
				re = /\/\/(.*)\.(wikia|fandom|gamepedia)\./;
				domain = re.exec( text );
				if ( domain !== null ) {
					params[ x ] = domain[ 1 ].charAt( 0 ).toUpperCase() + domain[ 1 ].slice( 1 ) + ' Wiki';

					continue;
				}
			}

			// handle multiple users
			if ( $input.attr( 'id' ) === 'user' && text.indexOf( '\n' ) !== -1 ) {
				if ( x === '$5' ) {
					text = ( text.match( /(?:\r\n|\r|\n)/g ) || [] ).length + 1 + ' users';
				} else {
					text = text.replace( /\n$/g, '' ); // fix blank last user
					text = text.replace( /(?:\r\n|\r|\n)/g, '\n|' );
				}
			}

			// handle checkboxes
			if ( $input.attr( 'id' ) === 'crosswiki' ) {
				if ( text ) {
					text = '\\crosswiki=yes\n';
					keyedValueCount++;
				} else {
					text = '';
				}
			}
			if ( $input.attr( 'id' ) === 'socks' ) {
				if ( text ) {
					sockCount = 1;
					keyedValueCount++;
				}
				text = '';
			}

			// handle socks
			if ( $input.attr( 'id' ) === 'sockusers' ) {
				if ( text === '' && sockCount ) {
					alert( 'One or more required fields are missing. Please check your submission and try again.' );
					$button.attr( 'disabled', false );
					return $.Deferred().resolve();
				} else if ( sockCount ) {
					text = '\\socks=' + text + '\n';
				} else {
					text = '';
				}
			}

			// patch | in reason
			if ( $input.attr( 'id' ) === 'comment' ) {
				text = text.replace( /\|/g, '\\\\' );
			}

			params[ x ] = text;
		}

		for ( x in params ) {
			if ( !Object.prototype.hasOwnProperty.call( params, x ) ) {
				continue;
			}
			// convert to regex so the same parameter can be used multiple times in each string
			y = new RegExp( x.replace( /\$/, '\\$' ), 'g' );
			opts.submitText = opts.submitText.replace( y, params[ x ] );
			opts.summary = opts.summary.replace( y, params[ x ] );
			opts.sectionTitle = opts.sectionTitle.replace( y, params[ x ] );
		}

		// Fix when template thinks = is a key
		if ( opts.submitText.match( /=/g ) !== null && opts.submitText.match( /=/g ).length > keyedValueCount ) {
			let templateParam = 0;
			opts.submitText = opts.submitText.replace( /\|/g, function () { // match, i, original
				templateParam++;
				return '|' + templateParam + '=';
			} );
		}
		if ( keyedValueCount ) {
			opts.submitText = opts.submitText.replace( /\\crosswiki/g, '|crosswiki' );
			opts.submitText = opts.submitText.replace( /\\socks/g, '|socks' );
		}

		console.log( '[SOAP Report]', opts.submitText, opts.summary );

		urlparams.title = opts.page;
		urlparams.summary = opts.summary;

		if ( opts.page === 'Report:Wiki' ) {
			urlparams.appendtext = '\n' + opts.submitText;
		} else {
			urlparams.section = 'new';
			urlparams.sectiontitle = opts.sectionTitle;
			urlparams.text = opts.submitText;
		}
		return fetch( config.wgScriptPath + '/api.php', {
			body: new URLSearchParams( urlparams ),
			method: 'POST',
			credentials: 'include'
		} ).then( function () {
			window.location.href = config.wgArticlePath.replace( '$1', opts.page );
		} );
	}

	/**
	 * Create modal.
	 */
	function createWindow() {
		mw.loader.using( [
			'mediawiki.notification',
			'oojs-ui-windows'
		] ).then( function ( require ) {
			const OO = require( 'oojs' );

			function ReportDialog( config ) {
				ReportDialog.super.call( this, config );
			}
			OO.inheritClass( ReportDialog, OO.ui.ProcessDialog );

			ReportDialog.static.name = 'report-dialog';
			ReportDialog.static.title = opts.buttonText;
			ReportDialog.static.actions = [
				{ label: 'Cancel', flags: [ 'safe', 'close' ] },
				{ label: 'Submit', action: 'submit', flags: [ 'secondary' ] }
			];

			// initialise dialog, append content
			ReportDialog.prototype.initialize = function () {
				ReportDialog.super.prototype.initialize.apply( this, arguments );
				this.content = new OO.ui.PanelLayout( {
					padded: true,
					expanded: true
				} );
				this.content.$element.append( opts.form );
				this.$body.append( this.content.$element );
				this.$content.addClass( 'vstf-ui-Dialog' );
				this.$content.addClass( 'soap-reports' );
			};

			// Handle actions
			ReportDialog.prototype.getActionProcess = function ( action ) {
				if ( action === 'submit' ) {
					const dialog = this;
					dialog.pushPending();
					dialog.actions.others[ 0 ].pushPending();
					submitForm( opts ).then( function () {
						dialog.popPending();
						dialog.actions.others[ 0 ].popPending();
					} ); // disable the Submit button
				}
				return ReportDialog.super.prototype.getActionProcess.call( this, action );
			};

			// Create the Dialog and add the window manager.
			modal.windowManager = new OO.ui.WindowManager( {
				classes: [ 'vstf-windowManager' ]
			} );
			$( document.body ).append( modal.windowManager.$element );
			// Create a new dialog window.
			modal.reportDialog = new ReportDialog( {
				size: 'larger'
			} );
			// Add window and open
			modal.windowManager.addWindows( [ modal.reportDialog ] );
			modal.windowManager.openWindow( modal.reportDialog );

			// Close dialog when clicked outside the dialog
			modal.reportDialog.$frame.parent().on( 'click', function ( e ) {
				if ( !$( e.target ).closest( '.vstf-ui-Dialog' ).length ) {
					modal.reportDialog.close();
				}
			} );

			// Expand dialog when socks is clicked
			$( '#socks, label[for=socks]' ).on( 'click', function () {
				setTimeout( function () {
					modal.reportDialog.updateSize();
				}, 600 );
			} );

			mw.hook( 'soap.reportsform' ).fire();

			if ( !config.wgUserName ) {
				document.getElementById( 'formAnon' ).style.display = '';
			}
			let socks = document.getElementById( 'socks' );
			if ( socks ) {
				document.getElementById( 'socks' ).addEventListener( 'click', function () {
					const formSocksBox = document.getElementById( 'formSocksBox' );
					if ( socks.checked ) {
						formSocksBox.style.display = '';
					} else {
						formSocksBox.style.display = 'none';
					}
				} );
			}
			document.getElementById( 'wikiurl' ).addEventListener( 'blur', function () {
				const url = filterFandomDomain( $( '#wikiurl' ).val() );

				if ( !url ) {
					mw.notify( 'Invalid URL!', {
						tag: 'adoption',
						type: 'error'
					} );

					return;
				}

				// remove stuff like .../wiki/User:Vandal, so the subsequent regex expressions that use the wikiurl field can safely ignore them
				document.getElementById( 'wikiurl' ).value = 'https://' + url;

				fetch( 'https://' + url + '/api.php?' + new URLSearchParams( {
					action: 'query',
					meta: 'siteinfo',
					siprop: 'general',
					formatversion: 2,
					format: 'json',
					origin: '*'
				} ), {
					method: 'GET'
				} ).then( function ( response ) {
					return response.json();
				} ).then( function ( data ) {
					if ( data.query && data.query.general ) {
						document.getElementById( 'wikiname' ).value = data.query.general.sitename;
					}
				} );
			} );
		} );
	}

	/**
	 * Loads the report form button
	 * @param {string} type
	 */
	function loadButton( type ) {
		opts = options[ type ];
		const newButton = document.createElement( 'button' );
		newButton.className = 'cdx-button';
		newButton.style.cursor = 'pointer';
		newButton.textContent = opts.buttonText;
		newButton.addEventListener( 'click', function () {
			if ( modal.windowManager ) {
				type = this.id.split( '-' )[ 2 ];
				modal.windowManager.openWindow( modal.reportDialog );
			} else {
				createWindow();
			}
		} );

		$( '.rb-' + type )
			.empty()
			.append( newButton );
		// Fire hook for scripts that use the button
		mw.hook( 'soap.reports' ).fire( newButton );
		if ( params.get( 'openmodal' ) === '1' ) {
			newButton.click();
		}
	}

	/**
	 * Loads dropdown of all report possibilities
	 */
	function loadDropdown() {
		$( '.rf-dropdown' )
			.empty()
			.append( reportDropdown );

		Object.keys( options ).forEach( function ( option ) {
			$( '#rf-dropdown-list' ).append(
				$( '<li>' )
					.attr( 'id', 'soap-report-' + option )
					.attr( 'class', 'wds-global-navigation__dropdown-link' )
					.on( 'click', createWindow )
					.text( options[ option ].buttonText )
			);
		} );
	}

	/**
	 * Initializes the script.
	 */
	function init() {
		setOptions();
		Object.keys( options ).forEach( function ( option ) {
			if ( document.getElementsByClassName( 'rb-' + option ).length > 0 ) {
				loadButton( option );
			}

		} );
		if ( document.getElementsByClassName( 'rf-dropdown' ).length > 0 ) {
			loadDropdown();
		}
	}

	mw.hook( 'dev.i18n' ).add( function ( i18n ) {
		i18n.loadMessages( 'u:soap:MediaWiki:Custom-Reports/i18n.json' ).done( function ( i18no ) {
			msg = i18no.msg;
			init();
		} );
	} );

	window.importArticles( {
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	}, {
		type: 'style',
		article: 'u:soap:MediaWiki:Reports.css'
	} );
}( window.jQuery, window.mediaWiki ) );
// </nowiki>