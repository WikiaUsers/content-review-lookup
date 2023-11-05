/*jshint browser:true jquery:true laxbreak:true smarttabs:true trailing:true */
/*global mediaWiki */


// This script uses ReferencePopups to display stuff other than references. It works in
// conjunction with a template to turn arbitrary elements into popables.
;((function(window, $, mw) {
	"use strict";
	// Load the reference popups then wait for the loaded event to fire
	var popups = window.dev && window.dev.ReferencePopups && window.dev.ReferencePopups.Popup;
	if (!popups) {
		popups = $.ajax({
			url: mw.config.get('wgScriptPath') + '/load.php',
			data: {
				mode: 'articles',
				only: 'scripts',
				articles: 'MediaWiki:ReferencePopups.js'
			},
			dataType: 'script',
			cache: true
		}).then(function() {
			// Chain promises
			return window.dev.ReferencePopups.Popup;
		});
	}

	return function(callback) {
		$.when(popups).done(function() {
			$(function($) {
				callback(window, $, mw);
			});
		});
	};
}(window, window.jQuery, window.mediaWiki))(function(window, $, mw) {
	"use strict";
	// Start actual module.
	// This is pretty straightforward, we just find all the relevant elements and
	// convert them to popups. We don't bother doing any of the clever efficiency
	// stuff that the main script does.
	// The extensive use of filter and reconstruction of the jQuerys are memory
	// usage controls to avoid accumulation of garbage.

	var userConfig = window.dev.ReferencePopups.settings || { animate: true };

	var $track = $([]);
	function findPopups() {
		$track = $($track.filter(':Lunarity-referencePopup').add(
		$('.refpopups-custom-element')
		.filter(':not(:Lunarity-referencePopup)')
		.filter(function() {
			var $this = $(this),
				$content = $this.find('> .refpopups-custom-content');

			// This part is somewhat complicated. We allow detached content to
			// be loaded into popups so we need to handle clone/move and prevent
			// reaching outside of the article / comment / message wall post to
			// pull in random crap (like site UI) that shouldn't be moved.
			if (!$content.length) {
				// #mw-content-text stops reaching out of articles.
				// .WikiaArticle stops comments reaching outside of themselves.
				// .msg-body does the same for the message wall posts.
				// NOTE: We don't actually support comments since we aren't hooking the paginate
				var $loadContext = $this.closest('#mw-content-text, .WikiaArticle, .msg-body');
				// Look for a load-from directive to pull from something else
				$content = $this.data('load-from');
				var loadFrom = true;
				if (!$content) {
					loadFrom = false;
					$content = $this.data('move-from');
				}
				if ($content) {
					try {
						$content = $loadContext.find($content);
					} catch(e) { // Invalid selectors, like <HTML>
						if (window.console) {
							window.console.error('Page contains invalid Custom Reference Popup selector: ' + $content);
						}
						return;
					}
				}
				if (!$content || !$content.length) {
					return;
				}
				$content = $content.eq(0);
				if (loadFrom) {
					$content = $content.clone();
					$content.find('*').prop('id', '');
				}
			}

			// Create the popup (Quite easy really, just loading the script is hard)
			$this.referencePopup({
				content: $content.contents(),
				activateBy: userConfig.react,
				hoverDelay: userConfig.hoverDelay,
				animation: false,
				stickyHover: false,
				escapeCloses: false,
				// WikiaArticle is needed for 'b'/'i'/etc crap wikitext stuff to work in Oasis.
				extraClass: $this.data('popup-class') || $content.data('popup-class') || '',
				contentBoxClass: 'WikiaArticle'
			});
			$content.remove();
			return true;
		})));
	}

	// If we're on an edit page then we'll hook the "AJAX Preview is ready" event that is
	// helpfully provided.
	if (mw.config.get('skin') === 'oasis' && mw.config.get('wgAction') === 'edit') {
		// NOTE: /extensions/wikia/EditPageLayout/js/plugins/PageControls.js
		$(window).on('EditPageAfterRenderPreview.ReferencePopupsCustom', function(/*ev, popup*/) {
			findPopups();
		});
	}

	// Initial search
	findPopups();

	$(window).on('dev-ReferencePopups-config', function(ev, newSettings) {
		userConfig = newSettings || { animate: true };
		// Reconfigure the live ones.
		// Selector is auto created by the widget factory (see $.expr[':'])
		$track = $($track.filter(':Lunarity-referencePopup'))
		.referencePopup('option', {
			activateBy: userConfig.react,
			hoverDelay: userConfig.hoverDelay,
			animation: false
		});
	});

	// Register the function so external code can invoke it manually if needed due to weird stuff
	// (Merlin uses it on their dynamically loaded footer)
	window.dev.ReferencePopups.loadCustom = findPopups;
}));