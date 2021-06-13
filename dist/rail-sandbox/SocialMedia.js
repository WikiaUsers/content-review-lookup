// Proof of concept customizable and scalable social media right module
mw.loader.uing( [ 'custom.righRailHook', 'custom.parseJsonPage', 'mediawiki.api', 'mediawiki.util', 'jquery.client' ], function() {
	'use strict';

	if ( !document.querySelector( 'page__right-rail' ) || window.smRailLoaded ) {
		return;
	}

	const smRail = {
		getJsonConfig: function() {
			// @todo
		},
		getCachedConfig: function() {
			// @todo
		},
		renderModule: function() {
			// @todo
		},
		init: function() {
			// @todo
			window.smRailLoaded = true;
		}
	};

	smRail.init();
} );