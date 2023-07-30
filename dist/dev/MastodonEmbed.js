/**
 * [[MastodonEmbed]] – allow wikis to embed Mastodon posts on pages
 *
 * Please note this works ONLY for posts and does not work for timelines due to a missing functionality
 * See https://github.com/mastodon/mastodon/issues/6094 for more on that
 */
$( function() {
	'use strict';

	// Already loaded
	if ( window.mastodonEmbedLoaded ) {
		return;
	}
	window.mastodonEmbedLoaded = true;

	// Define config
	window.mastodonEmbed = ( window.mastodonEmbed || {} );
	var conf = window.mastodonEmbed;
	var i18n;

	// Set default configs
	conf.domainWhitelist = ( conf.domainWhitelist || [] ); // Allow admins to define instance whitelist - none by default
	conf.embedSelector = ( conf.embedSelector || '.mastodon-embed' ); // Allow admins to change embed wrapper selector
	conf.verifiedDomains = new Map(); // Cache result of verifyDomain() requests to avoid duplicate requests when using RSS feeds

	function processEmbed( $embed ) {
		// Sanitize `/` at the end of URL
		const inputUrlPlain = $embed.attr( 'data-url' ).replace( /\/$/, '' );

		// Produce error messages
		function makeError( msg ) {
			var $error = $( '<strong>', {
				class: 'error',
				text: i18n.msg('scriptName').plain() + ': ' + i18n.msg( msg ).plain()
			} );

			$embed.addClass( 'errored' );
			$embed.empty().append( $error );
		}

		// Check if provided input is URL in the first place
		var inputURL;
		try {
			inputURL = new URL( inputUrlPlain );
		} catch( error ) {
			return makeError( 'errorBrokenURL' );
		}

		// Let's get some data out of it
		const inputData = {
			domain: inputURL.hostname,
			path: inputURL.pathname
		};

		// URL doesn't match Mastodon post URL scheme
		const validatePathRegex = ( /^\/@([^\/]+)\/([0-9]+)$/ ).exec( inputData.path );
		if ( validatePathRegex === null ) {
			return makeError( 'errorInvalidURL' );
		}

		// Domain whitelist is set and domain isn't allowed – halt
		if ( conf.domainWhitelist.length !== 0 && !( conf.domainWhitelist.includes( inputData.domain ) || conf.domainWhitelist.includes( '@' + validatePathRegex[1] + '@' + inputData.domain ) ) ) {
			return makeError( 'errorDomainDisallowed' );
		}

		// Call instance API to confirm it's a Mastodon server
		function verifyDomain( domain, callback ) {
			if ( !conf.verifiedDomains.has( domain ) ) {
				conf.verifiedDomains.set( domain, 
					$.ajax( 'https://' + domain + '/api/v2/instance', {
						crossDomain: true,
						dataType: 'json'
					} ).then( function( data ) {
						var isOkay = false;
						if ( data.domain === domain && data.version ) {
							isOkay = true;
						}
						return isOkay;
					}, function() {
						return false;
					} )
				);
			}
			return conf.verifiedDomains.get( domain ).then( function( isOkay ) {
				return callback( isOkay );
			} );
		}

		// Create embed's <iframe> window
		function renderEmbed() {
			const embedData = {
				width: ( $embed.attr( 'data-width' ) || 400 ),
				height: $embed.attr( 'data-height' )
			};

			var $embedFrame = $( '<iframe>', {
				src: inputURL.toString() + '/embed',
				allowfullscreen: 'allowfullscreen',
				sandbox: 'allow-same-origin allow-popups allow-popups-to-escape-sandbox',
				width: embedData.width,
				class: 'mastodon-embed-frame'
			} );

			// Height is optional
			if ( embedData.height ) {
				$embedFrame.attr( 'height', embedData.height );
			}

			// Add rendered embed
			$embed.empty().append( $embedFrame );
		}

		// Check if domain is Mastodon server, then proceed
		verifyDomain( inputData.domain, function( isValid ) {
			if ( isValid === true ) {
				renderEmbed();
			} else {
				// URL is not Mastodon or is unreachable
				return makeError( 'errorURLUnauthorized' );
			}
		} );
	}

	// Run the main function
	function init( i18no ) {
		i18n = i18no;

		mw.hook( 'wikipage.content' ).add( function() {
			const $embeds = $( conf.embedSelector );

			// No embeds found
			if ( !$embeds.length ) {
				return;
			}

			$embeds.each( function() {
				processEmbed( $( this ) );
			} );
		} );
	}

	// Prepare i18n
	mw.hook( 'dev.i18n' ).add( function( i18no ) {
		i18no.loadMessages( 'MastodonEmbed' ).then( init );
	} );

	importArticle( {
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	} );
} );