/**
 * Scripts placed here are loaded for all skins on the desktop view
 * 
 * Global scripts which should be loaded on both desktop and mobile should go in
 * [[MediaWiki:Gadget-site.js]]
 * Mobile-only scripts should go in [[MediaWiki:Mobile.js]]
 */

( function() {
'use strict';

/* Variables for interface text used throughout the script, for ease of translating */
var i18n = {
	// File upload
	defaultLicense: 'Licença'
};

/**
 * Instead of cluttering up the global scope with
 * variables, they should instead be set as a
 * property of this global variable
 *
 * E.g: Instead of
 *   myVar = 'blah';
 * use
 *   mcw.myVar = 'blah';
 */
var mcw = window.mcw = {};

/* Fires when DOM is ready */
$( function() {


/**
 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
 *
 * This is so people have a chance to look at the image and click on pages they want to view.
 */
$( '#mw-content-text' ).on( 'mouseenter mouseleave', '.animated-container, .mcui', function( e ) {
	$( this ).find( '.animated' ).toggleClass( 'animated-paused', e.type === 'mouseenter' );
} );


/** 
 * Fix edit summary prompt for undo
 *
 * Fixes the fact that the undo function combined with the "no edit summary prompter"
 * causes problems if leaving the edit summary unchanged.
 * Added by [[wikipedia:User:Deskana]], code by [[wikipedia:User:Tra]].
 * See https://bugzilla.wikimedia.org/show_bug.cgi?id=8912
 */
if ( document.location.search.indexOf( "undo=" ) !== -1 && document.getElementsByName( 'wpAutoSummary' )[0] ) {
	document.getElementsByName( 'wpAutoSummary' )[0].value='1';
}


/**
 * Make simple search suggestions box separately styled
 */
mw.loader.using( 'mediawiki.searchSuggest', function() {
	setTimeout( function() {
		$( '.suggestions:first' ).addClass( 'searchbar' );
	} );
} );


/**
 * Set unlicensed as the default license on file pages
 *
 * That way the file will be categorised so someone can find a license for the file
 */
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
	var $license = $( '#wpLicense' );
	if ( $license.length ) {
		if ( $license.val() === '' ) {
			$license.val( i18n.defaultLicense );
		}
		
		mw.loader.using( 'mediawiki.special.upload', function() {
			$license.change();
		} );
	}
}


/**
 * Creates minecraft style tooltips
 *
 * Replaces normal tooltips. Supports minecraft [[formatting codes]] (except k), and a description with line breaks (/).
 */
( function() {
	var escapeChars = { '\\&': '&#38;', '<': '&#60;', '>': '&#62;' };
	var escape = function( text ) {
		// "\" must be escaped first
		return text.replace( /\\\\/g, '&#92;' )
			.replace( /\\&|[<>]/g, function( char ) { return escapeChars[char]; } );
	};
	var $tooltip = $();
	var $win = $( window ), winWidth, winHeight, width, height;
	
	$( '#mw-content-text' ).on( {
		'mouseenter.minetip': function( e ) {
			$tooltip.remove();
			
			var $elem = $( this ), title = $elem.attr( 'data-minetip-title' );
			if ( title === undefined ) {
				title = $elem.attr( 'title' );
				if ( title !== undefined ) {
					title = $.trim( title.replace( /&/g, '\\&' ) );
					$elem.attr( 'data-minetip-title', title );
				}
			}
			
			// No title or title only contains formatting codes
			if ( title === undefined || title !== '' && title.replace( /&([0-9a-fl-or])/g, '' ) === '' ) {
				// Find deepest child title
				var childElem = $elem[0], childTitle;
				do {
					if ( childElem.hasAttribute( 'title' ) ) {
						childTitle = childElem.title;
					}
					childElem = childElem.firstChild;
				} while( childElem && childElem.nodeType === 1 );
				if ( childTitle === undefined ) {
					return;
				}
				
				// Append child title as title may contain formatting codes
				if ( !title ) {
					title = '';
				}
				title += $.trim( childTitle.replace( /&/g, '\\&' ) );
				
				// Set the retrieved title as data for future use
				$elem.attr( 'data-minetip-title', title );
			}
			
			if ( !$elem.data( 'minetip-ready' ) ) {
				// Remove title attributes so the native tooltip doesn't get in the way
				$elem.find( '[title]' ).addBack().removeAttr( 'title' );
				$elem.data( 'minetip-ready', true );
			}
			
			if ( title === '' ) {
				return;
			}
			
			var content = '<span class="minetip-title">' + escape( title ) + '&r</span>';
			
			var description = $.trim( $elem.attr( 'data-minetip-text' ) );
			if ( description ) {
				// Apply normal escaping plus "/"
				description = escape( description ).replace( /\\\//g, '&#47;' );
				content += '<span class="minetip-description">' + description.replace( /\//g, '<br>' ) + '&r</span>';
			}
			
			// Add classes for minecraft formatting codes
			while ( content.search( /&[0-9a-fl-o]/ ) > -1 ) {
				content = content.replace( /&([0-9a-fl-o])(.*?)(&r|$)/g, '<span class="format-$1">$2</span>&r' );
			}
			// Remove reset formatting
			content = content.replace( /&r/g, '' );
			
			$tooltip = $( '<div id="minetip-tooltip">' );
			$tooltip.html( content ).appendTo( 'body' );
			
			// Cache current window and tooltip size
			winWidth = $win.width();
			winHeight = $win.height();
			width = $tooltip.outerWidth( true );
			height = $tooltip.outerHeight( true );
			
			// Trigger a mouse movement to position the tooltip
			$elem.trigger( 'mousemove', e );
		},
		'mousemove.minetip': function( e, trigger ) {
			if ( !$tooltip.length ) {
				$( this ).trigger( 'mouseenter' );
				return;
			}
			
			// Get event data from remote trigger
			e = trigger || e;
			
			// Get mouse position and add default offsets
			var top = e.clientY - 34;
			var left = e.clientX + 14;
			
			// If going off the right of the screen, go to the left of the cursor
			if ( left + width > winWidth ) {
				left -= width + 36;
			}
			
			// If now going off to the left of the screen, resort to going above the cursor
			if ( left < 0 ) {
				left = 0;
				top -= height - 22;
				
				// Go below the cursor if too high
				if ( top < 0 ) {
					top += height + 47;
				}
			// Don't go off the top of the screen
			} else if ( top < 0 ) {
				top = 0;
			// Don't go off the bottom of the screen
			} else if ( top + height > winHeight ) {
				top = winHeight - height;
			}
			
			// Apply the positions
			$tooltip.css( { top: top, left: left } );
		},
		'mouseleave.minetip': function() {
			if ( !$tooltip.length ) {
				return;
			}
			
			$tooltip.remove();
			$tooltip = $();
		}
	}, '.minetip, .invslot-item' );
}() );

} );
/* End DOM ready */

}() );

/*
 * Adds custom module to the Wikia Rail
 */
(function () {
    /*
     * @returns validated and normalized list of rail module configurations
     */
    function getConfiguredMods() {
        var numPrependedMods = 0;
        return (window.AddRailModule || (function () {
            // Interpret deprecated settings (for backwards compatibility)
            var usesDeprecatedARMModules = ((typeof(window.ARMModules) !== 'undefined') &&
                                            $.isArray(window.ARMModules) &&
                                            window.ARMModules.every(function (e) { return (typeof(e) === 'string'); })),
                usesDeprecatedARMPrepend = (typeof(window.ARMPrepend) !== 'undefined');
            if (usesDeprecatedARMModules && usesDeprecatedARMPrepend) {
                return window.ARMModules.map(function (e) { return {page: e, prepend: Boolean(window.ARMPrepend)}; });
            } else if (usesDeprecatedARMModules) {
                return window.ARMModules;
            } else if (usesDeprecatedARMPrepend) {
                return [{prepend: Boolean(window.ARMPrepend)}];
            }
        }()) || [{}]).map(function (mod) {
            // Expand shorthand syntax and validate config
            if (typeof(mod) === 'string') {
                mod = {page: mod};
            }
            return {
                page: (typeof(mod.page) === 'string') ? mod.page : 'Template:RailModule',
                prepend: (typeof(mod.prepend) === 'boolean') ? (mod.prepend && (++numPrependedMods <= 2)) : false,
                maxAge: (typeof(mod.maxAge) === 'number') ? Math.min(Math.max(0, Math.round(mod.maxAge)), 86400) : 300,
            };
        });
    }

    function fetchPages(context, pages) {
        var deferred = $.Deferred(),
            mangledIdsToPage = {},
            pagesToHTML = {},
            markup = '';

        pages.forEach(function (page) {
            var mangledId = 'arm:' + btoa(encodeURIComponent(page)).replace(/\+/g, '-')
                                                                   .replace(/\//g, '_')
                                                                   .replace(/=/g, '');
            mangledIdsToPage[mangledId] = page;
            // Set a default if (for some reason) we fail to fetch/parse HTML for this page
            pagesToHTML[page] = '';
        });

        // We don't want the order in which pages are specified to affect the "canonical" form of the `text` param.
        Object.keys(mangledIdsToPage).sort().forEach(function (mangledId) {
            markup += '<div id="' + mangledId + '">{' + '{' + mangledIdsToPage[mangledId] + '}}</div>';
        });

        $.getJSON(mw.util.wikiScript('api'), {
            format: 'json',
            action: 'parse',
            title: context.mwConfig.wgPageName,
            text: markup,
            prop: 'text',
            uselang: context.mwConfig.wgUserLanguage,
            disablepp: '',
        }).done(function (response) {
            var tempContainer = document.createElement('div');
            tempContainer.innerHTML = response.parse.text['*'];
            var $tempContainer = $(tempContainer);
            if ($tempContainer.children().length === 1) {
                var $child = $($tempContainer.children()[0]);
                if ($child.hasClass('mw-parser-output')) {
                    $tempContainer = $child;
                }
            }
            var $renderedMods = $tempContainer.children().filter('div[id^="arm:"]');
            $renderedMods.each(function (i, elem) {
                if (mangledIdsToPage.hasOwnProperty(elem.id)) {
                    pagesToHTML[mangledIdsToPage[elem.id]] = elem.innerHTML;
                }
            });
            deferred.resolve(pagesToHTML);
        }).fail(deferred.reject.bind(deferred));

        return deferred;
    }

    function getPages(context, pagesToMaxAge) {
        // Out of Wikia's set of supported browsers, only IE11 doesn't support the Cache API.
        // Since the Cache API is built on promises, we won't explicitly test for `'Promise' in window`.
        if (!('caches' in window)) {
            return fetchPages(context, Object.keys(pagesToMaxAge));
        }

        var deferred = $.Deferred();

        function fallback() {
            fetchPages(context, Object.keys(pagesToMaxAge))
                .done(deferred.resolve.bind(deferred))
                .fail(deferred.reject.bind(deferred));
            caches['delete']('AddRailModule-v0');
        }

        caches.open('AddRailModule-v0').then(function (cache) {
            var pagesToHTML = {},
                pagesToFetch = [];

            function toCacheRequest(context, page) {
                return new Request(mw.util.wikiScript('AddRailModule') + '?' + $.param({
                    text: '{' + '{' + page + '}}',
                    uselang: context.mwConfig.wgUserLanguage,
                    user: context.mwConfig.wgUserName,
                }));
            }

            function purgeCache() {
                // Purge stale or invalid entries
                return cache.keys().then(function (requests) {
                    return Promise.all(requests.map(function (request) {
                        if (!request.url.startsWith(window.location.origin)) {
                            return cache['delete'](request);
                        }
                        return cache.match(request).then(function (response) {
                            if (!(response && response.ok && (Date.parse(response.headers.get('Expires')) > context.now))) {
                                return cache['delete'](request);
                            }
                        });
                    }));
                });
            }

            function fetchFromCache() {
                // Populate results from cache
                return Promise.all(Object.keys(pagesToMaxAge).map(function (page) {
                    return cache.match(toCacheRequest(context, page)).then(function (response) {
                        if (response) {
                            return response.text().then(function (html) {
                                pagesToHTML[page] = html;
                            });
                        } else {
                            pagesToFetch.push(page);
                        }
                    });
                }));
            }

            function fetchMissingFromOriginAndResolve() {
                if (!pagesToFetch.length) {
                    deferred.resolve(pagesToHTML);
                } else {
                    // Fetch cache misses
                    fetchPages(context, pagesToFetch).done(function (fetchedPagesToHTML) {
                        $.each(fetchedPagesToHTML, function (page, html) {
                            pagesToHTML[page] = html;
                            if (pagesToMaxAge[page]) {
                                cache.put(toCacheRequest(context, page), new Response(html, {headers: {
                                    'Expires': (new Date(context.now + (pagesToMaxAge[page] * 1000))).toUTCString(),
                                }}));
                            }
                        });
                        deferred.resolve(pagesToHTML);
                    }).fail(deferred.reject.bind(deferred));
                }
            }

            purgeCache()
                .then(fetchFromCache, fallback)
                .then(fetchMissingFromOriginAndResolve, fallback);
        });

        return deferred;
    }

    function prepareMods(context, mods) {
        var deferred = $.Deferred(),
            pagesToMods = {},
            pagesToMaxAge = {};

        mods.forEach(function (mod) {
            if (!pagesToMods.hasOwnProperty(mod.page)) {
                // Account for the remote possibility that we'll encounter multiple rail modules backed by the same page.
                pagesToMods[mod.page] = [mod];
                pagesToMaxAge[mod.page] = mod.maxAge;
            } else {
                pagesToMods[mod.page].push(mod);
                if (mod.maxAge < pagesToMaxAge[mod.page]) {
                    pagesToMaxAge[mod.page] = mod.maxAge;
                }
            }
        });

        getPages(context, pagesToMaxAge).done(function (pagesToHTML) {
            $.each(pagesToHTML, function (page, html) {
                pagesToMods[page].forEach(function (mod) {
                    mod.section = document.createElement('section');
                    mod.section.className = 'railModule rail-module';
                    mod.section.innerHTML = html;
                    // Per <https://html.spec.whatwg.org/commit-snapshots/f476180797e6124074b3cfeaf1973ea39eb6c499/#the-script-element>,
                    // script tags generated via innerHTML don't execute when inserted into the DOM.
                    // Since we want these inline scripts (generated by parser tags like gallery/poll/rss/tabview
                    // and typically comprising invocations of `JSSnippetsStack.push`) to execute, we'll have to
                    // swap out the tainted script tags with pristine ones. Note that we're trusting no other scripts
                    // have maliciously tampered with our cache.
                    var taintedScripts = mod.section.getElementsByTagName('script');
                    for (var i = 0; i < taintedScripts.length; ++i) {
                        var taintedScript = taintedScripts[i];
                        var untaintedScript = document.createElement('script');
                        untaintedScript.innerHTML = taintedScript.innerHTML;
                        taintedScript.parentNode.replaceChild(untaintedScript, taintedScript);
                    }
                });
            });
            deferred.resolve();
        }).fail(deferred.reject.bind(deferred));

        return deferred;
    }

    function attachMods(mods, attachFragment) {
        var fragment = document.createDocumentFragment();
        mods.forEach(function (mod) { fragment.appendChild(mod.section); });
        // If [[Rewire]] is loaded, perform ID collision mitigations against the detached trees prior to insertion.
        if (window.dev && window.dev.rewire) {
            window.dev.rewire.prepare(fragment);
        }
        attachFragment(fragment);
        mods.forEach(function (mod) {
            mw.hook('wikipage.content').fire($(mod.section));
            mw.hook('AddRailModule.module').fire(mod.page);
        });
    }

    function bootstrap() {
        var $rail, railLoaded,
            mods, modsToPrepend, modsToAppend,
            context, modsPrepared;

        $rail = $('#WikiaRail');
        if (!$rail[0]) { return; }
        railLoaded = $.Deferred();
        if ($rail.filter('.loaded, .is-ready')[0]) {
            railLoaded.resolve();
        } else {
            $rail.on('afterLoad.rail', function () { railLoaded.resolve(); });
        }

        mods = getConfiguredMods();
        if (!mods.length) { return; }
        modsToPrepend = [];
        modsToAppend = [];
        mods.forEach(function (mod) {
            (mod.prepend ? modsToPrepend : modsToAppend).push(mod);
        });

        context = {
            mwConfig: mw.config.get([
                'wgPageName',
                'wgUserLanguage',
                'wgUserName',
            ]),
            now: Date.now(),
        };
        modsPrepared = prepareMods(context, mods);

        $.when(railLoaded, modsPrepared).done(function () {
            var $ads;
            if (modsToPrepend.length) {
                $ads = $rail.find('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last();
                attachMods(modsToPrepend, $ads[0] ? function (fragment) {
                    $rail[0].insertBefore(fragment, $ads[0].nextSibling);
                } : function (fragment) {
                    $rail[0].insertBefore(fragment, $rail[0].firstChild);
                });
            }
            if (modsToAppend.length) {
                $ads = $rail.find('.rail-sticky-module').first();
                attachMods(modsToAppend, $ads[0] ? function (fragment) {
                    $rail[0].insertBefore(fragment, $ads[0]);
                } : function (fragment) {
                    $rail[0].appendChild(fragment);
                });
            }
        });
    }

    bootstrap();
}());

window.AddRailModule = [{prepend: true}];

mw.hook('AddRailModule.module').add(function() {
  mw.hook('dev.wds').add(function(wds) {
    $('.railModule.rail-module h2.has-icon').prepend(
      wds.icon('discord', {'class': 'wds-icon-small'})
    );
    wds.render('h2.has-icon');
  });
});