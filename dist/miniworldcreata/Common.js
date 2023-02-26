/* Any JavaScript here will be loaded for users using the 2 column main page layout */
/*****************************************
/* Front Page column height equalization *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2015-Feb-12
// License: CC-BY 3.0
// Version: beta

var fp = fp || {
  equalizeColumns : function() {
    $( '.fpcontent' ).each( function () {
      fp.resetSectionBoxHeights( $( this ).find( '#fptopsection, #fpflexsection, #fpbottomsection' ) );
    } );
    var excludeSel = '';
    if ( $( window ).width() > 1539 ) {
      excludeSel = '.fpmaybercol'; // at this width, it's necessary to hit those boxes in a separate pass after .fpcontent
    }
    if ( $( window ).width() > 889 ) {
      fp.equalizeColumnsOfBlock( '.fpcontent',
                                 '#fptopsection, #fpbottomsection',
                                 '#fpbottomsection',
                                 '#fpflexsection',
                                 '#fpflexsection',
                                 excludeSel
                               );
    }
    if ( $( window ).width() > 1539 ) {
      fp.equalizeColumnsOfBlock( '.fpmaybecols',
                                 '.fpmaybelcol',
                                 '.fpmaybelcol',
                                 '.fpmaybercol',
                                 '.fpmaybercol',
                                 ''
                               );
    }
  },

  equalizeColumnsOfBlock : function( blockSel, leftSel, leftBottomSel, rightSel, rightBottomSel, excludeSel ) {
    $( blockSel ).each( function ( index ) {
      var tryCount = 0;
      do {
        var leftBottom = $( this ).find( leftBottomSel ).offset().top + $( this ).find( leftBottomSel ).height();
        var rightBottom = $( this ).find( rightBottomSel ).offset().top + $( this ).find( rightBottomSel ).height();

        var difference = Math.round( Math.abs( rightBottom - leftBottom ) );
        
        if ( leftBottom < rightBottom ) {
          fp.adjustSectionBoxHeights( difference, $( this ).find( leftSel ).not( excludeSel ) );
        } else if ( rightBottom < leftBottom ) {
          fp.adjustSectionBoxHeights( difference, $( this ).find( rightSel ).not( excludeSel ) );
        }
        ++tryCount;
      } while ( Math.round( leftBottom ) != Math.round( rightBottom ) && tryCount < 4 );
    } );
  },

  resetSectionBoxHeights : function ( sections ) {
    sections.each( function () {
      $( this ).find( '.fpbox' ).each( function () {
        $( this ).height( 'auto' );
      } );
    } );
  },

  adjustSectionBoxHeights : function ( heightToAdd, sections ) {
    var boxCount = 0;
    sections.each( function() {
      boxCount += $( this ).find( '.fpbox' ).length;
    } );

    var avgHeightToAdd = heightToAdd / boxCount;
    var decimalPortion = 0.0;
    var boxes, heightToAdd;
    sections.each( function() {
      boxes = $( this ).find( '.fpbox' );

      boxes.each( function() {
        heightToAdd = Math.round( decimalPortion + avgHeightToAdd ); /* should iron out rounding error */
        decimalPortion += avgHeightToAdd - heightToAdd;
        $( this ).height( $( this ).height() + heightToAdd );
      } );
    } );
  }
};

$( document ).ready( fp.equalizeColumns );
$( window ).resize( fp.equalizeColumns );
/*********************************************
/* End Front Page column height equalization *
/*********************************************/

( function() {
'use strict';

/* Variables for interface text used throughout the script, for ease of translating */
var i18n = {

	// File upload
	defaultLicense: 'Copyright game'
};
} );

// Change the side rail variable data
var root = document.querySelector(':root');
root.style.setProperty('--theme-page-background-color--secondary', '#282828');
root.style.setProperty('--theme-link-color--hover', '#46799c');

// Back To Top Button
function hideFade () {
	// hide #backtotop first
	$("#backtotop").hide ();
	// fade in #backtotop
	$(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop() > ButtonStart) {
				$('#backtotop').fadeIn();
			} else {
				$('#backtotop').fadeOut();
			}
		});
	});
}
 
function addBackToTop() {
	if(skin == 'fandomdesktop') {
		$('<div id="backtotop"><div style="background: var(--theme-accent-color);color: var(--theme-accent-label-color);right: 55px;bottom: 40px;"><svg data-id="wds-icons-menu-control" height="24" width="24" viewBox="0 0 24 24" class="wds-icon" xmlns="http://www.w3.org/2000/svg"><svg id="wds-icons-menu-control" viewBox="0 0 24 24"><path d="M12 19a.997.997 0 0 1-.707-.293l-11-11a.999.999 0 1 1 1.414-1.414L12 16.586 22.293 6.293a.999.999 0 1 1 1.414 1.414l-11 11A.997.997 0 0 1 12 19"></path></svg></svg></div></div>').appendTo(document.body);
		document.getElementById("backtotop").onclick = function() {goToTop()};
		hideFade();
	}	
}

function goToTop(){
	// scroll body to 0px on click
	$('body,html').animate ({
		scrollTop: 0
	}, ScrollSpeed);
	return false;
}
 
var ButtonStart = 600;
var ScrollSpeed = 600;
 
if(!window.BackToTop ) {
	$(document).ready(function () {
		addBackToTop(); 
	});
}
var BackToTop = true; // prevent duplication

// Clock
var clockNode;
var updateClockInterval;

var msg = {
    purge: 'Clearing server cache for the page…',
    purgefail: 'Clearing server cache failed',
    purgesuccess: 'Clearing server cache successful',
    nulledit: 'Editing the page…',
    nulleditfail: 'Edit failed',
    nulleditsuccess: 'Edit successful',
    tooltip: 'Clear the server cache for this page \nShift + Click: Edit this page without making any changes'
};
    
function updateClock() {
    clockNode.textContent = new Date().toUTCString().slice(5, -3) + '(UTC)';
}

function stopClock(cancel) {
    if (cancel || clockNode.isConnected === false) {
        document.removeEventListener('visibilitychange', startClock);
    }

    clearInterval(updateClockInterval);
}

function startClock() {
    stopClock();

    if (document.visibilityState === 'visible') {
        updateClock();
        updateClockInterval = setInterval(updateClock, 1000);
    }
}

function nullEditPage() {
    clockNode.textContent = msg.nulledit;

    $.post(mw.util.wikiScript('api'), {
        action: 'edit',
        format: 'json',
        title: mw.config.get('wgPageName'),
        token: mw.user.tokens.get('csrfToken'),
        prependtext: ''
    }).always(function (data) {
        if (data.edit && data.edit.result === 'Success') {
            clockNode.textContent = msg.nulleditsuccess;
            location.reload(true);
        } else {
            clockNode.textContent = msg.nulleditfail;
        }
    });
}

function purgePage() {
    clockNode.textContent = msg.purge;

    $.post(mw.util.wikiScript('api'), {
        titles: mw.config.get('wgPageName'),
        action: 'purge',
        format: 'json'
    }).always(function (data) {
        if (data.purge && data.purge[0].purged === '') {
            clockNode.textContent = msg.purgesuccess;
            location.reload(true);
        } else {
            clockNode.textContent = msg.purgefail;
        }
    });
}

function clockClick(event) {
    event.preventDefault();

    if (!wgIsArticle) {
        // can't purge/edit if we're not on an article page
        return;
    }

    stopClock(true);

    if (event.shiftKey) {
        mw.loader.using('mediawiki.util', nullEditPage);
    } else {
        mw.loader.using('mediawiki.util', purgePage);
    }
}

function addClock() {
    var $container = $('<li>').attr('id', 'displayTimer').css('direction', 'ltr');
    var $clock = $('<a>').on('click', clockClick).attr({
        title: msg.tooltip,
        href: '?action=purge'
    });

    clockNode = $clock[0];

    // remove any existing clock
    $(document.querySelectorAll('#displayTimer')).remove();

    switch (skin) {
    case 'oasis':
        $container.css({
            border: 0,
            marginInlineStart: 'auto',
            order: 1
        }).appendTo('.toolbar > .tools');
        break;
    case 'fandomdesktop':
        $container.css({
            minWidth: '15em',
            order: 1
        }).appendTo('.toolbar > .tools');
        $clock.css('margin', '0 auto');
        break;
    case 'hydra':
    case 'hydradark':
        $container = $('<div>').addClass('netbar-box right').insertAfter('#netbar .netbar-spacer');
        break;
    default: // vector, monobook, etc.
        $container.css('text-transform', 'none').prependTo('#p-personal ul');
    }

    $container.append($clock);

    startClock();
    document.addEventListener('visibilitychange', startClock);
}

$(document).ready(function () {
	addClock(); 
});

// Right rail module
window.AddRailModule = [{prepend: true}];
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

$(document).ready(function () {
	bootstrap();
});