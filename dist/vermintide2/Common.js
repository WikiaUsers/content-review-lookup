/*************************
 * JQuery Random  Plugin *
 *************************/
/**
 * Adds a 'random' filter to jQuery, which selects 1 or more elements at random for the current jQuery set.
 * Defaults to 1 element if a amount isn't given.
 */
jQuery.fn.random = function(count) {
	count = (typeof count !== 'undefined') ?  count : 1;
	// Return the current set if an invalid count is asked for.
	if ( count < 1 || count >= this.length || ! Number.isInteger(Number(count)) ) {
		return jQuery(this);
	}

	var indexes = [];
	var resultset = [];
	while ( indexes.length < count ) {
		// Generate a random index
		var index = Math.floor(Math.random() * this.length);
		
		// reroll the random index if it's already present
		var reroll = false;
		for (var i = 0; i < indexes.length; i++) {
			if ( indexes[i] == index ) {
				reroll = true;
			}
		}
		if (reroll) {
			continue;
		}

		// Add the index/element to the result set
		indexes.push(index);
		resultset.push(this[index]);
	}
	return jQuery(resultset);
};

/*****************
 * Random subset *
 *****************/
/**
 * A random subset of list elements within elements with the 'random-subset' class are show, while the rest are hidden.
 * The 'data-random-subset-count' attribute can be used to specify the number of elements to be displayed.
 */
$('.random-subset').each(function() {
	var count = 1;
	// If the data-random-subset-count attribute is present use that count
	if ($(this).attr('data-random-subset-count')) {
		count = $(this).attr('data-random-subset-count');
	}
	var entries = $(this).find('li');
	$(entries).random(entries.length - count).remove();
	// show the root element in case it was hidden while waiting for JS.
	$(this).show();
});


/*****************************************
/* Lazy-Loading Tabber Content *
/*****************************************/
/** This script enables lazy-loading for Fandom's WDS Tabber extension.
* Instead of parsing all tab content on page load (which slows down the page),
* it uses the MediaWiki API to fetch the content of a tab only when 
* the user clicks on it, or when an anchor link requires it.
* It also automatically handles deep-linking (e.g., Page#Anchor) by searching 
* through the tabs in the background and scrolling to the target element.
*/
var LAZY_TABS_DEBUG = false;
function debugLog() {
    if (LAZY_TABS_DEBUG) console.log.apply(console, arguments);
}
function debugError() {
    if (LAZY_TABS_DEBUG) console.error.apply(console, arguments);
}
// Manual trigger for testing in the browser console: runLazyTabs()
window.runLazyTabs = function() {
	initializeLazyTabs(0);
};
// Prevent the script from re-initializing itself when it fires the wikipage.content hook
var lazyTabsInitialized = false;
// Wait for Fandom's page content (and the Tabber extension) to be fully ready
mw.hook('wikipage.content').add(function() {
	if (lazyTabsInitialized) return;
	lazyTabsInitialized = true;
	// Give Tabber a brief moment to transform the DOM
	setTimeout(function() { initializeLazyTabs(0); }, 500);
});
function initializeLazyTabs(retryCount) {
	retryCount = retryCount || 0;
	if (retryCount === 0 && !document.querySelector('.lazy-tab')) {
		return; 
	}
	// Prevent infinite spam
	if (retryCount > 4) {
		debugError("[LazyTabs] Gave up waiting for Tabber to initialize after 5 seconds.");
		return;
	}
	// Target Fandom's WDS Tabber classes
	var $tabbers = $('.wds-tabber, .tabber');
	debugLog("[LazyTabs] Attempt " + (retryCount + 1) + " - Found WDS tabbers:", $tabbers.length);
	// If Tabber hasn't built the DOM yet, wait and try again
	if (!$tabbers.length) {
		setTimeout(function() { initializeLazyTabs(retryCount + 1); }, 500);
		return;
	}
	// Check if the user arrived via an anchor link
	var hash = window.location.hash;
	var targetId = hash ? decodeURIComponent(hash.substring(1)) : null;
	// Function to fetch tab content via MediaWiki API
	function loadTabContent($lazyDiv) {
		return new Promise(function(resolve, reject) {
			// If already loaded, resolve immediately
			if ($lazyDiv.data('loaded')) { resolve(); return; }
			var pageName = $lazyDiv.data('page');
			if (!pageName) { resolve(); return; }
			debugLog("[LazyTabs] Loading:", pageName);
			new mw.Api().get({
				action: 'parse',
				page: pageName,
				prop: 'text',
				format: 'json'
			}).done(function(data) {
				if (data.parse && data.parse.text) {
					// Parse the API response into a temporary container
					var $content = $('<div>').html(data.parse.text['*']);
					// Remove any nested tabbers or leftover loading divs
					// (e.g., from transcluded navigation templates)
					$content.find('.wds-tabber, .tabber, .tabbernav').remove();
					// cleaned HTML
					$lazyDiv.html($content.html());
					$lazyDiv.data('loaded', true);
					debugLog("[LazyTabs] Loaded:", pageName);
					// correct initialization
					if (typeof mw.hook !== 'undefined') {
						mw.hook('wikipage.content').fire($lazyDiv);
					}
					resolve();
				} else { 
					debugError("[LazyTabs] No text for:", pageName);
					reject(); 
				}
			}).fail(function(err) {
				debugError("[LazyTabs] API failed:", pageName, err);
				$lazyDiv.html('<p style="color:red;">Failed to load. Check console (F12).</p>');
				reject();
			});
		});
	}
	// Helper to find the target element by ID (handles space/underscore variations)
	function findTarget() {
		if (!targetId) return null;
		return document.getElementById(targetId) || document.getElementById(targetId.replace(/ /g, '_'));
	}
	// Helper to activate a specific tab and scroll to the target element
	function activateAndScroll($tabber, tabIndex) {
		var $tabLi = $tabber.find('ul.wds-tabs li.wds-tabs__tab').eq(tabIndex);
		if ($tabLi.length) {
			$tabLi[0].click(); // Click the WDS tab button to make it visible
		}
		setTimeout(function() {
			// Restore the URL hash
			if (hash) {
				history.replaceState(null, null, hash);
			}
			var el = findTarget();
			if (el) {
				el.classList.add('lazy-tab-target');
				// If the target is a table row (<tr>), apply the class to its cells (<td>) too
				if (el.tagName === 'TR') {
					el.querySelectorAll('td').forEach(function(td) {
						td.classList.add('lazy-tab-target');
					});
				}
				var pos = el.getBoundingClientRect().top + window.scrollY - 100;
				window.scrollTo({ top: pos, behavior: 'smooth' });
			}
		}, 300);
	}
	/* Listen for in-page anchor clicks (hash changes) to clear the manual JS highlight.
	* This ensures that when a user clicks a new in-page link, the manual highlight is removed
	  and the browser's native CSS :target takes over for the newly clicked element. */
	window.addEventListener('hashchange', function() {
		document.querySelectorAll('.lazy-tab-target').forEach(function(el) {
			el.classList.remove('lazy-tab-target');
		});
	});
	// Process each tabber found on the page
	$tabbers.each(function() {
		var $tabber = $(this);
		// Find the content panels (Fandom's WDS uses .tabbertab or direct child divs)
		var $panels = $tabber.find('.tabbertab');
		if (!$panels.length) {
			$panels = $tabber.children('div').not('.wds-tabs__wrapper');
		}
		debugLog("[LazyTabs] Processing tabber with", $panels.length, "panels.");
		// User arrived using anchor link
		if (targetId) {
			var currentPanelIndex = 0;
			// to satisfy the linter's rule against functions inside blocks.
			var searchPanel = function() {
				if (currentPanelIndex >= $panels.length) return; // Target not found in any tab
				var $lazyDiv = $panels.eq(currentPanelIndex).find('.lazy-tab');
				
				// If already loaded, just check if the target is there
				if ($lazyDiv.data('loaded')) {
					if (findTarget()) {
						activateAndScroll($tabber, currentPanelIndex);
						return;
					} else {
						currentPanelIndex++;
						searchPanel();
					}
				} 
				// If not loaded, load it and then check
				else if ($lazyDiv.length) {
					loadTabContent($lazyDiv).then(function() {
						if (findTarget()) {
							activateAndScroll($tabber, currentPanelIndex);
							return;
						} else {
							currentPanelIndex++;
							searchPanel();
						}
					}).catch(function() {
						currentPanelIndex++;
						searchPanel();
					});
				} else {
					currentPanelIndex++;
					searchPanel();
				}
			};
			searchPanel();
		}  
		// Normal page load
		else {
			var $firstLazyDiv = $panels.first().find('.lazy-tab');
			if ($firstLazyDiv.length) {
				debugLog("[LazyTabs] Loading first panel by default.");
				loadTabContent($firstLazyDiv);
			}
		}
		// User manually clicks a WDS tab
		$tabber.on('click', 'ul.wds-tabs li.wds-tabs__tab', function() {
			var index = $(this).index();
			var $content = $panels.eq(index);
			var $lazyDiv = $content.find('.lazy-tab');
			if ($lazyDiv.length && !$lazyDiv.data('loaded')) {
				loadTabContent($lazyDiv);
			}
		});
	});
}