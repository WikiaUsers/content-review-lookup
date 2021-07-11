/**************
 * Countdown  *
**************/

/* Any JavaScript here will be loaded for all users on every page load. */

/**
 * Countdown
 *
 * @version 2.1
 *
 * @author Pecoes <https://c.wikia.com/wiki/User:Pecoes>
 * @author Asaba <https://dev.wikia.com/wiki/User:Asaba>
 *
 * Version 1 authors:
 * - Splarka <https://c.wikia.com/wiki/User:Splarka>
 * - Eladkse <https://c.wikia.com/wiki/User:Eladkse>
 *
 * documentation and examples at:
 * <https://dev.wikia.com/wiki/Countdown>
 */
 
/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/
 
;(function (module, mw, $, undefined) {
 
	'use strict';
 
	var translations = $.extend(true, {
		// English (English)
		en: {
			and: 'and',
			second: 'second',
			seconds: 'seconds',
			minute: 'minute',
			minutes: 'minutes',
			hour: 'hour',
			hours: 'hours',
			day: 'day',
			days: 'days'
		}
	}, module.translations || {}),
	i18n = translations[
		mw.config.get('wgContentLanguage')
	] || translations.en;
 
	var countdowns = [];
 
	var NO_LEADING_ZEROS = 1,
	SHORT_FORMAT = 2,
	NO_ZEROS = 4;
 
	function output (i, diff) {
		/*jshint bitwise:false*/
		var delta, result, parts = [];
		delta = diff % 60;
		result = ' ' + i18n[delta === 1 ? 'second' : 'seconds'];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		result = ' ' + i18n[delta === 1 ? 'minute' : 'minutes'];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		result = ' ' + i18n[delta === 1 ? 'hour'   : 'hours'  ];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 24);
		result = ' ' + i18n[diff  === 1 ? 'day'    : 'days'   ];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(diff  + result);
		result = parts.pop();
		if (countdowns[i].opts & NO_LEADING_ZEROS) {
			while (parts.length && parts[0][0] === '0') {
				parts.shift();
			}
		}
		if (countdowns[i].opts & NO_ZEROS) {
			parts = parts.filter(function(part) {
				return part[0] !== '0';
			});
		}
		if (parts.length) {
			if (countdowns[i].opts & SHORT_FORMAT) {
				result = parts.join(' ') + ' ' + result;
			} else {
				result = parts.join(', ') + ' ' + i18n.and + ' ' + result;
			}
		}
		countdowns[i].node.text(result);
	}
 
	function end(i) {
		var c = countdowns[i].node.parent();
		switch (c.attr('data-end')) {
		case 'remove':
			c.remove();
			return true;
		case 'stop':
			output(i, 0);
			return true;
		case 'toggle':
			var toggle = c.attr('data-toggle');
			if (toggle && toggle == 'next') {
				c.next().css('display', 'inline');
				c.css('display', 'none');
				return true;
			}
			if (toggle && $(toggle).length) {
				$(toggle).css('display', 'inline');
				c.css('display', 'none');
				return true;
			}
			break;
		case 'callback':
			var callback = c.attr('data-callback');
			if (callback && $.isFunction(module[callback])) {
				output(i, 0);
				module[callback].call(c);
				return true;
			}
			break;
		}
		countdowns[i].countup = true;
		output(i, 0);
		return false;
	}
 
	function update () {
		var now = Date.now();
		var countdownsToRemove = [];
		$.each(countdowns.slice(0), function (i, countdown) {
			var diff = Math.floor((countdown.date - now) / 1000);
			if (diff <= 0 && !countdown.countup) {
				if (end(i)) countdownsToRemove.push(i);
			} else {
				output(i, Math.abs(diff));
			}
		});
		var x;
		while((x = countdownsToRemove.pop()) !== undefined) {
			countdowns.splice(x, 1);
		}
		if (countdowns.length) {
			window.setTimeout(function () {
				update();
			}, 1000);
		}
	}
 
	function getOptions (node) {
		/*jshint bitwise:false*/
		var text = node.parent().attr('data-options'),
			opts = 0;
		if (text) {
			if (/no-leading-zeros/.test(text)) {
				opts |= NO_LEADING_ZEROS;
			}
			if (/short-format/.test(text)) {
				opts |= SHORT_FORMAT;
			}
			if (/no-zeros/.test(text)) {
				opts |= NO_ZEROS;
			}
		}
		return opts;
	}
 
	function init() {
		var countdown = $('.countdown:not(.handled)');
		if (!countdown.length) return;
		$('.nocountdown').css('display', 'none');
		countdown
		.css('display', 'inline')
		.find('.countdowndate')
		.each(function () {
			var $this = $(this),
				date = (new Date($this.text())).valueOf();
			if (isNaN(date)) {
				$this.text('BAD DATE');
				return;
			}
			countdowns.push({
				node: $this,
				opts: getOptions($this),
				date: date,
			});
		});
		countdown.addClass('handled');
		if (countdowns.length) {
			update();
		}
	}
 
	mw.hook('wikipage.content').add(init);
 
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));

// End Countdown

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

// END Rail Module //