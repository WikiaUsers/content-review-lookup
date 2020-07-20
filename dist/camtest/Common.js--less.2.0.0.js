// __NOWYSIWYG__ <syntaxhighlight lang="javascript">
/**
 * LESS GUI for Wikia wikis
 *
 * Adds support for using LESS on MediaWiki and an interface for compiling LESS to CSS
 *
 * This script uses a modified version of less.js
 * @link <https://github.com/less/less.js> less.js source (original)
 * @link <http://lesscss.org/> less.js documentation
 * @link <http://dev.wikia.com/wiki/Less/less.js> less.js source (modified)
 *
 * @author Cqm
 * @version 2.0.0
 * @copyright (C) Cqm 2014 <cqm.fwd@gmail.com>
 * @license GPLv3 <http://www.gnu.org/licenses/gpl-3.0.html>
 * @link <http://dev.wikia.com/wiki/Less> Documentation
 */

/*jshint */
/*global less:true */

;( function ( window, document, $, mw, undefined ) {

	'use strict';
	
	// Example config used for testing
	window.lessOptions = [ {
		target: 'MediaWiki:Common.css',
		source: 'MediaWiki:Common.less',
		load: [
			'MediaWiki:Common.css',
			'MediaWiki:Common.less'
		],
		header: 'MediaWiki:Css-header/common'
	} ];

	/**
	 * Polyfills
	 */
	if ( !Array.prototype.indexOf ) {
		// polyfill
	}

	if ( !Array.isArray ) {
		// polyfill
	}

		/**
		 * Messages
		 */
	var	i18n = {
			// English (English)
			en: {
				// ui
				'update-css': 'Update CSS',
				'less-title': 'LESS Interface',
				'less-close': 'Close',

				// status
				'debug-enabled': 'Debug mode enabled',
				'getting-source': 'Getting source file: [[$1]]',

				// edit summary
				'edit-summary': 'Updating CSS',

				// errors
				'internal-error': 'Internal error', // thrown during util.addline
				'page-not-found': '', // hit when looking up source page
			}
		},

		/**
		 * Cache mw.config values
		 */
		conf = mw.config.get( [
			'skin',
			'wgPageName',
			'wgUserGroups',
			'wgUserLanguage'
		] ),

		/**
		 * Copy of script configuration
		 */
		opts = window.lessOptions,
		
		/**
		 * Reusable library functions
		 */
		util = {
			/**
			 * Attempts to return a message in the users language
			 * and substitutes any parameters into the message
			 *
			 * @param {string} msg
			 * @param {array} args
			 * @returns {string}
			 */
			msg: function ( msg, args ) {

				var	message = false,
					i;
				
				args = args || [];
				console.log( '3' );
				console.log( i18n, conf.wgUserLanguage, msg );
				console.log( '3.5' );
				console.log( i18n[conf.wgUserLanguage], i18n[conf.wgUserLanguage][msg] );

				if ( i18n[conf.wgUserLanguage] && i18n[conf.wgUserLanguage][msg] ) {
					// we have the translated message
					console.log( '4' );
					message = i18n[conf.wgUserLanguage][msg];
				}

				if ( i18n.en[msg] ) {
					// we have the english message
					console.log( '5' );
					message = i18n.en[msg];
				}

				if ( !message ) {
					// the message key does not exist
					console.log( '6' );
					return mw.html.escape( msg );
				}

				// replace params in message
				for ( i = 0; i < args.length; i += 1 ) {
					message.replace( '$' + ( i + 1 ), args[i] );
				}
				
				console.log( message );

				return util.parselinks( message );

			},

			/**
			 * Parses wikitext links with regex
			 *
			 * @param {string} linktext Wikitext to parse
			 * @returns {string} Parsed wikitext
			 */
			parselinks: function ( linktext ) {

				var	text = mw.html.escape( linktext ),
					match = text.match( /\[\[[\s\S]+?\]\]/g ),
					replace,
					i;

				console.log( match )
				if ( !match ) {
					return text;
				}

				for ( i = 0; i < match.length; i += 1 ) {
					// strip brackets
					replace = match[i].replace( /(\[\[|\]\])/g, '' );

					if ( replace.indexOf( '|' ) ) {
						// href is different to text of anchor tag
						replace = replace.split( '|' );
						text = text.replace(
							match[i],
							'<a href="/wiki/' + encodeURIComponent( replace[0] ) + '" title="' + replace[1] + '" target="_blank">' + replace[1] + '</a>'
						);
					} else {
						// href and text are the same
						text = text.replace(
							match[i],
							'<a href="/wiki/' + encodeURIComponent( replace ) + '" title="' + replace + '" target="_blank">' + replace + '</a>'
						);
					}
				}

				return text;

			},

			/**
			 * Inserts a line into the interface content area
			 *
			 * If there is an overflow in the content area
			 * this will also scroll the content down
			 *
			 * @param {object} ob An object with the following keys:
			 *        - text {string} A text string to be inserted to the interface
			 *        - msg {string} A translatable message to be inserted into the interface
			 *        - args {array} Any arguments for msg
			 *        - error {boolean} True if the message is for an error
			 * @notes text and msg are mutually exclusive
			 *        they should not both exist in ob
			 *        text takes precedence over msg
			 */
			addline: function ( ob ) {

				var	$content = $( '#less-content' ),
					$p = $( '<p>' ),
					text;

				if ( !!ob.text ) {
					// plain text
					text = mw.html.escape( ob.text );
				} else if ( !!ob.msg ) {
					// translatable message
					// pass an empty array to .msg()
					// to stop errors when args does not exist
					text = util.msg( ob.msg, ob.args || [] );
				} else {
					// neither are defined
					// and we need to fix our code
					text = util.msg( 'internal-error' );
					ob.error = true;
				}

				if ( ob.error === true ) {
					// add error class
					$p.attr( 'class', 'error' );
				}

				$p.html( text );
				$content.append( $p );

				if ( $content.prop( 'scrollHeight' ) > $content.prop( 'clientHeight' ) ) {
					// the text is longer than the content
					// so scroll down to the bottom
					$content.scrollTop( $content.prop( 'scrollHeight' ) );
				}
			
			},

			/**
			 * Checks for debug mode enabled by user
			 *
			 * This won't catch debug mode set server side
			 * but that should never be set on a live wiki anyway
			 *
			 * Debug mode can be set by adding ?debug=true to the url
			 * or by setting the cookie "resourceLoaderDebug=true"
			 *
			 * @returns {boolean} true if debug mode is enabled
			 *                    false if not enabled
			 */
			debug: function () {

				if (
					mw.util.getParamValue( 'debug' ) === 'true' ||
					$.cookie( 'resourceLoaderDebug' ) === 'true'
				) {
					return true;
				}

				return false;

			}
		},

		/**
		 * Functions for parsing the LESS files and updating the target CSS file
		 *
		 * These are typically used once per 'cycle'
		 * Reusable functions are under util
		 */
		self = {
			/**
			 * Loading function
			 *
			 * - Validates configuration
			 * - Checks if the user can edit MediaWiki pages if applicable
			 * - Checks for debug mode (skips user checks)
			 */
			init: function () {

				var	run = false,
					// usergroups that can edit mediawiki pages
					// @todo make this configurable
					allowed = ['sysop', 'vstf', 'helper', 'staff'],
					i;
				
				console.log( opts );

				if ( opts === undefined || !Array.isArray( opts ) ) {
					// incorrect configuration
					return;
				}

				// check if this page is added to the options.load array
				for ( i = 0; i < opts.length; i += 1 ) {
					if ( opts[i].load.indexOf( conf.wgPageName ) > -1 ) {
						run = true;
						opts = opts[i];
						break;
					}
				}

				if ( !run ) {
					return;
				}

				if ( util.debug() ) {
					console.log( 'debug enabled' );
					self.addupdate();
					return;
				}

				// if we're trying to update a mediawiki page
				// check the user can edit them
				// this needs translating :|
				if ( opts.target.indexOf( 'MediaWiki:' ) === 0 ) {
					run = false;

					for ( i = 0;i < allowed.length; i += 1 ) {
						if ( conf.wgUserGroups.indexOf( allowed[i] ) > -1 ) {
							run = true;
							break;
						}
					}

					if ( !run ) {
						return;
					}
				}

				self.addupdate();

			},

			/**
			 * Inserts update button
			 */
			addupdate: function () {
			
				console.log( '1' );
			
				var	text = util.msg( 'update-css' ),
					$a = $( '<a>' )
						.attr( {
							title: text,
							href: '#'
						} )
						.text( text )
						.on( 'click', self.modal ),
					$append,
					nbsp = '';
				
			
				if ( ['oasis', 'wikia'].indexOf( conf.skin ) > -1 ) {

					$append = $( '#WikiaPageHeader' );
					$a.addClass( 'wikia-button' );
					nbsp = '&nbsp;';
				
				} else if ( ['monobook', 'uncyclopedia', 'wowwiki'].indexOf( conf.skin ) > -1 ) {

					$a = $( '<li>' ).attr( 'id', 't-updateless' ).append( $a );
					$append = $( '#p-tb .pBody ul' );

				
				} else {

					mw.log( 'Unknown skin' );
					$a = undefined;
					return;

				}

				console.log( '2' );
				console.log( $append );
				$append.append( $a, nbsp );

			},

			/**
			 * Build the GUI
			 */
			modal: function () {

				var modal;

				if ( !$( '#less-overlay' ).length ) {

					// create modal
					modal = '<div id="less-overlay"><div id="less-modal">' +
						'<div id="less-header">' + 
							'<span id="less-title">' + util.msg( {
								msg: 'less-interface'
							} ) + '</span>' +
							'<span id="less-close">' + util.msg( {
								msg: 'less-close'
							} ) + '</span>' +
						'</div>' +
						'<div id="less-content"></div>' +
						'</div></div>';

					// insert CSS
					mw.util.addCSS(
						'#less-overlay{position:fixed;height:1000px;background-color:rgba(255,255,255,0.6);width:100%;top:0;left:0;z-index:20000002;}' +
						'#less-modal{position:relative;background-color:#87ceeb;height:400px;width:60%;margin:auto;border:5px solid #87ceeb;border-radius:15px;overflow:hidden;}' +
						'#less-header{height:50px;width:100%;position:relative;}' +
						'#less-title{font-size:25px;font-family:"Lucida Console",monospace;font-weight:bold;line-height:53px;padding-left:10px;}' +
						'#less-header-close{background:url("/resources/wikia/ui_components/modal/images/close-dark.svg");height:25px;width:25px;display:block;top:10px;right:10px;position:absolute;cursor:pointer;}' +
						'#less-content{padding:10px;overflow-y:auto;background-color:#fff;color:#3a3a3a;height:330px;font-size:14px;}' +
						'#less-content>p{font-family:monospace;margin:0}' +
						'#less-content>.error{color:red;font-size:initial;}' +
						'#less-content>.error>a{color:red;text-decoration:underline;}'
					);

					// insert into DOM
					$( 'body' ).append( modal );

					// add event listeners
					$( '#less-close, #less-overlay' ).on( 'click', self.closemodal );
					$( '#less-modal' ).on( 'click', function () {
						// stop click events bubbling down to overlay
						return false;
					} );

				} else {
					$( '#less-content' ).empty();
					$( '#less-overlay' ).show();
				}

				// set modal height
				$( '#less-modal' ).css( 'margin-top', ( ( $( window ).height() - 400 ) / 3 ) );

				self.getsource();

				return false;

			},

			/**
			 * Closes the GUI
			 *
			 * @param {boolean} refresh (optional) Reload the page if true
			 */
			closemodal: function ( refresh ) {
			
				$( '#less-overlay' ).hide();
				
				// refresh the page on close
				if ( refresh === true ) {
					document.location.reload();
				}
				
				return false;
			
			},
			
			/**
			 *
			 */
			getsource: function () {
			
				if ( util.debug() ) {
					util.addline( { msg: 'debug-enabled' } );
				}
			
				util.addline( {
					msg: 'getting-source',
					args: [opts.source]
				} );
				
				// check if less module has been defined
				if ( !mw.loader.getState( 'less' ) ) {
					mw.loader.implement(
						'less',
						['http://dev.wikia.com/wiki/Less/less.js?action=raw&ctype=text/javascript'],
						// objects for styles and messages
						// mw.loader doesn't handle these being undefined
						{}, {}
					);
				}
				
				$.ajax( {
					data: {
					
					},
					dataType: 'text',
					error: function ( xhr, error, status ) {
						if ( status === 'Not Found' ) {
							util.addline( {
								msg: 'page-not-found',
								error: true
							} );
						} else {
							// @todo output error to gui
							mw.log( error, status );
						}
					},
					success: function ( data ) {
						mw.loader.using( 'less', function () {
							self.parseless( data );
						} );
					},
					type: 'GET',
					url: conf.wgScriptPath + conf.wgScript
				} );
			
			},
			
			/**
			 * Attempts to parse content of source file
			 *
			 * @param {string} toparse Content to parse
			 */
			parseless: function ( toparse ) {
			
				// attempt to parse less
				
				// we want to track what files are throwing 404's when being imported and which are succeeding
				// and log those results
				// will require alterations to the less.js source (doxhr?)
				
					// if we can parse the less without errors
						// send it to formatcss
					
					// else
						// if there's any 404's
							// this will be a TypeError
							// we should be modifying less to fire an event when it encounters these
							// and an error message "cannot parse undefined"
							// (something like that)

						// if there's a parse error
							// we can access the filename
							// the line
							// and an extract of the broken code
							
							// perhaps we can use a custom pre tag class
							// to add numbers to lines to help with debugging this
							// will need to be a separate script
						
						// else
							// unknown error
							// please report if it persists
							// mw.log( e );
			
			},
			
			/**
			 *
			 *
			 * @param {string} css CSS to format
			 */
			formatcss: function ( css ) {

				// add uniform newlines between rules
				// need to account for at-rules
				// <https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule>
				
				// strip block comments
				// after parsing, these comments are rarely where they were originally
				// and have the potential to confuse anyone reading the target file
				// so just remove them
				
				// indent with 4 spaces
					// perhaps make this configurable?
					// 2 spaces (default)
					// tabs
					// 8 spaces
					
				// if there's an id in a selector
				// cut out everything before it
				// as there's no need for specificity before ids in a selector
				// bad practice
			
			},
			
			/**
			 *
			 *
			 * @param {string} css CSS to prepend header too
			 */
			addheader: function () {
			
				// check opts.header is defined
				// can be defined optionally
					// go look for it
					// get it
					// prepend to the css
				
				// post result
			
			},
			
			/**
			 * 
			 *
			 * @param {string} text Content to update the target page with
			 */
			postcss: function ( text ) {
			
				var	token = mw.user.tokens.get( 'editToken' ),
					summary = util.msg( 'edit-summary', [opts.source] ),
					params = {
						action: 'edit',
						summary: summary,
						token: token,
						title: opts.target,
						text: text
					};
				
				// safe guard for debugging
				// as mw.Api isn't loaded for anons
				if ( !conf.wgUserName ) {
					mw.log( 'User is not logged in' );
					return;
				}
				
				// use mw.Api() as it escapes all out params for us as required
				new mw.Api()
					.post( params )
					// success
					.done( function ( data ) {
					
						// handle api error
							// output to interface
							// not so much for the end user, but for me if I need to debug it
						
						// else check for success
							// output success message

							// if on target page
								// self.closemodal( true );
					
					} )
					// ajax error
					// @todo check docs on this form correct params
					.error( function ( xhr, status, error ) {
					
					} );

			}
		};

	$( self.init );
	
}( this, this.document, this.jQuery, this.mediaWiki ) );

// </syntaxhighlight>