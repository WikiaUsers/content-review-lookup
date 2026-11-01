/*****************************************
/* Inject Custom Fonts via <link>
/*****************************************/
// Inject font using <link> tag instead of CSS @import 
(function() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.cdnfonts.com/css/caslon-antique';
    document.head.appendChild(link);
})();

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
function debugLog() { if (LAZY_TABS_DEBUG) console.log.apply(console, arguments); }
function debugError() { if (LAZY_TABS_DEBUG) console.error.apply(console, arguments); }

window.runLazyTabs = function() {
    initializeLazyTabs();
};

// Prevent the script from re-initializing itself
var lazyTabsInitialized = false;

// Polling
var lazyTabsInterval = setInterval(function() {
    var hasLazyTabs = document.querySelector('.lazy-tab');
    var hasTabbers = document.querySelector('.wds-tabber, .tabber');
    
    if (hasLazyTabs && hasTabbers) {
        clearInterval(lazyTabsInterval);
        if (!lazyTabsInitialized) {
            lazyTabsInitialized = true;
            debugLog("[LazyTabs] DOM ready. Initializing...");
            initializeLazyTabs();
        }
    }
}, 300);

// Stop polling after 15 seconds
setTimeout(function() { 
    clearInterval(lazyTabsInterval); 
    if (!lazyTabsInitialized) {
        debugError("[LazyTabs] Failsafe: Tabber did not initialize within 15 seconds.");
    }
}, 15000);

function initializeLazyTabs() {
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
                    // (e.g., from transcluded navigation templates like {{OkriTabs}})
                    $content.find('.wds-tabber, .tabber, .tabbernav, .dynamic-tabs-nav').remove();
                    
                    // Inject the cleaned HTML
                    $lazyDiv.html($content.html());
                    $lazyDiv.data('loaded', true);
                    debugLog("[LazyTabs] Loaded:", pageName);
                    
                    // Fire Fandom hooks so tooltips, collapsibles, and images initialize correctly
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
            $tabLi[0].click();
        }
        
        setTimeout(function() {
            // Restore the URL hash so it looks correct to the user and CSS :target works
            if (hash) {
                history.replaceState(null, null, hash);
            }
            
            var el = findTarget();
            if (el) {
                // Manually apply highlight class because browsers fail to apply CSS :target 
                // to elements that were injected dynamically after page load.
                el.classList.add('lazy-tab-target');
                
                // If the target is a table row (<tr>), apply the class to its cells (<td>) too
                if (el.tagName === 'TR') {
                    el.querySelectorAll('td').forEach(function(td) {
                        td.classList.add('lazy-tab-target');
                    });
                }
                
                var pos = el.getBoundingClientRect().top + window.scrollY - 100; // 100px offset for sticky headers
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        }, 300);
    }

    // Listen for in-page anchor clicks (hash changes) to clear the manual JS highlight
    window.addEventListener('hashchange', function() {
        document.querySelectorAll('.lazy-tab-target').forEach(function(el) {
            el.classList.remove('lazy-tab-target');
        });
    });
    
    // Process each tabber found on the page
    $('.wds-tabber, .tabber').each(function() {
        var $tabber = $(this);
        
        // Prevent double-processing if the interval or hooks fire multiple times
        if ($tabber.data('lazyTabsProcessed')) return;
        $tabber.data('lazyTabsProcessed', true);
        
        // Find the content panels (Fandom's WDS uses .tabbertab or direct child divs)
        var $panels = $tabber.find('.tabbertab');
        if (!$panels.length) {
            $panels = $tabber.children('div').not('.wds-tabs__wrapper');
        }
        if (!$panels.length) return;

        debugLog("[LazyTabs] Processing tabber with", $panels.length, "panels.");

        // User arrived using anchor link
        if (targetId) {
            var currentPanelIndex = 0;
            
            // Recursive function to satisfy the linter's rule against functions inside blocks.
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

(function () {
    'use strict';

    function targetId(hash) {
        if (!hash || hash.charAt(0) !== '#') return null;
        try { return decodeURIComponent(hash.slice(1)); } catch (e) { return hash.slice(1); }
    }

    function flash(el) {
        el.style.transition = 'background-color 0.4s ease';
        el.style.backgroundColor = 'rgba(229, 176, 36, 0.25)';
        setTimeout(function () { el.style.backgroundColor = ''; }, 2500);
    }

    function navLinks(container) {
        var selectors = ['.tabbernav a', '.tabber__tabs .tabber__tab', '[role="tablist"] [role="tab"]'];
        for (var s = 0; s < selectors.length; s++) {
            var found = container.querySelectorAll(selectors[s]);
            if (found.length) return found;
        }
        return [];
    }

    function containerOf(tab) {
        var node = tab;
        while (node && node !== document.body) {
            if (node.classList && node.classList.contains('tabberlive')) return node;
            node = node.parentNode;
        }
        return null;
    }

    function indexOfTab(container, tab) {
        var tabs = container.querySelectorAll('.lazy-tab');
        for (var i = 0; i < tabs.length; i++) if (tabs[i] === tab) return i;
        return -1;
    }

    function isUnloaded(tab) {
        if (tab.getAttribute('data-loaded')) return false;
        return tab.firstElementChild === null;
    }

    function fetchPageHtml(page) {
        var params = [
            'action=parse',
            'prop=text',
            'disableeditsection=1',
            'disabletoc=1',
            'format=json',
            'formatversion=2',
            'page=' + encodeURIComponent(page)
        ].join('&');
        var url = (window.mw && mw.util && mw.util.wikiScript ? mw.util.wikiScript('api') : '/api.php') + '?' + params;
        return fetch(url, { credentials: 'same-origin' }).then(function (r) { return r.json(); });
    }

    var loadPromises = (typeof WeakMap !== 'undefined') ? new WeakMap() : null;

    function loadTab(tab) {
        if (!tab || !isUnloaded(tab)) return Promise.resolve(tab);
        if (loadPromises && loadPromises.has(tab)) return loadPromises.get(tab);

        var page = tab.getAttribute('data-page');
        if (!page) return Promise.resolve(tab);

        var promise = fetchPageHtml(page).then(function (data) {
            var html = data && data.parse && data.parse.text;
            if (html && typeof html === 'object') html = html['*'];
            if (typeof html !== 'string' || html === '') return tab;
            tab.innerHTML = html;
            tab.setAttribute('data-loaded', '1');
            if (window.mw && mw.hook && window.jQuery) {
                mw.hook('wikipage.content').fire(jQuery(tab));
            }
            return tab;
        }).catch(function () { return tab; });

        if (loadPromises) loadPromises.set(tab, promise);
        return promise;
    }

    window.lazyTabberLoadTab = loadTab;

    function waitFor(id, timeout, cb) {
        var start = Date.now();
        (function poll() {
            var el = document.getElementById(id);
            if (el) return cb(el);
            if (Date.now() - start > timeout) return cb(null);
            setTimeout(poll, 120);
        })();
    }

    function resolve(hash) {
        var id = targetId(hash);
        if (!id) return;
        if (document.getElementById(id)) return;

        var tabs = document.querySelectorAll('.lazy-tab[data-anchors]');
        var target = null;
        for (var i = 0; i < tabs.length; i++) {
            var list = (tabs[i].getAttribute('data-anchors') || '').split('|');
            if (list.indexOf(id) !== -1) { target = tabs[i]; break; }
        }
        if (!target) return;

        var container = containerOf(target);
        if (!container) return;
        var idx = indexOfTab(container, target);
        if (idx < 0) return;

        var links = navLinks(container);
        if (links[idx]) links[idx].click();

        loadTab(target).then(function () {
            waitFor(id, 8000, function (el) {
                if (!el) return;
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                flash(el);
            });
        });
    }

    function init() { resolve(location.hash); }

    window.addEventListener('hashchange', function () { resolve(location.hash); });
    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(init);
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();