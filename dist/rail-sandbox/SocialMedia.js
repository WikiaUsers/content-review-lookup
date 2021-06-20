/**
 * Customizable Social Media Right Rail Module
 * @author  Rail
 * @version Barely works-0.1
 *
 * Configuration: SocialMedia.json
 * Styles:        SocialMedia.css
 */
mw.loader.using( [ 'custom.righRailHook', 'mediawiki.api', 'mediawiki.template.mustache' ], function() {
	'use strict';

	// Rail does not exist or module has been loaded already
	if ( !document.querySelector( '.page__right-rail' ) || window.smRailLoaded ) {
		return;
	}

	const smRail = {
		/**
		 * This function calls MediaWiki API to obtain JSON configuration for
		 * social media module stored in MediaWiki:SocialMedia.json page.
		 */
		getJsonConfig: function( callback ) {
			var jsonConfig;

			new mw.Api().get( {
				formatversion: 2,
				action: 'query',
				titles: 'MediaWiki:SocialMedia.json',
				prop: 'revisions',
				rvprop: [
					'content',
					'contentmodel'
				],
				rvslots: 'main',
				rvlimit: 1
			} ).done( function( resp ) {
				// Catch ApiErrors
				if ( resp.error ) {
					return console.error( 'SocialMedia: ApiErrorException', resp.error );
				}

				const apiResp = resp.query.pages[0].revisions[0].slots.main;

				// Catch content model other than JSON
				if ( apiResp.contentmodel !== 'json' ) {
					return console.error( 'SocialMedia: InvalidConfigContentModelException' );
				}

				// Try parsing JSON
				try {
					jsonConfig = JSON.parse( apiResp.content );
				} catch ( error ) {
					throw new Error( 'SocialMedia: InvalidJsonConfigSyntaxException' );
				}

				// Return config
				return callback( jsonConfig );
			} ).fail( function() {
				console.error( 'SocialMedia: AjaxErrorException' );
			} );
		},
		/**
		 * Render right rail module and append it after default sticky modules
		 * @uses Mustache.js
		 */
		renderModule: function() {
			// Find sticky rail
			const stickyRail = smRail.rightRail.querySelector( '.sticky-modules-wrapper' );

			// Create wrapper node and give it properities
			const moduleWrapper = document.createElement( 'section' );
			moduleWrapper.classList.add( 'rail-module' );
			moduleWrapper.classList.add( 'socialMediaModule' );

			// Use Mustache.js to generate module HTML
			const wrapperTemplate = '<h2 class="rail-module__header socialMediaHeader">{{headerText}}</h2>' +
				'<p class="socialMediaDesc">{{descText}}</p>' +
				'<div class="socialMediaLinks">' +
					'{{#listElements}}' +
						'<a class="listItem" data-site="{{label}}" href="{{link}}" rel="nofollow" target="_blank">' +
							'<div class="listItem-image">' +
								'<img src="{{image}}" alt="{{alt}}" />' +
							'</div>' +
							'<div class="listItem-label">' +
								'<strong>{{label}}</strong>' +
							'</div>' +
						'</a>' +
					'{{/listElements}}' +
				'</div>';

			const wrapperData = {
				headerText: smRail.conf.headerText,
				descText: smRail.conf.descText,
				listElements: smRail.conf.links
			};

			// Append module to right rail
			moduleWrapper.innerHTML = Mustache.render(
				wrapperTemplate,
				wrapperData
			);
			stickyRail.appendChild( moduleWrapper );
		},
		init: function() {
			// Load CSS
			importArticle( {
				type: 'style',
				article: 'MediaWiki:SocialMedia.css'
			} );

			// Load JSON config
			smRail.getJsonConfig( function( conf ) {
				// Make config global
				smRail.conf = conf;

				// Wait for right rail to load
				mw.hook( 'custom.rightRail.loaded' ).add( function( rightRail ) {
					// Make rail state global
					smRail.rightRail = rightRail;

					// Render module
					smRail.renderModule();
				} );
			} );

			// Mark script as executed
			window.smRailLoaded = true;
		}
	};

	smRail.init();
} );