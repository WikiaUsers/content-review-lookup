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
            // Cache rail module contents on the CDN for 10 minutes for anonymous users
            maxage: 600,
            smaxage: 600
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
        }, fallback);

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
                    mod.section.dataset.addRailModulePage = mod.page;
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
        attachFragment(fragment);
        mods.forEach(function (mod) {
            var $section = $(mod.section);
            mw.hook('wikipage.content').fire($section);
            mw.hook('AddRailModule.module').fire(mod.page, $section);
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
            if (modsToPrepend.length) {
                // Top ads live in `#rail-boxad-wrapper`, which is `#WikiaRail`'s previous sibling.
                attachMods(modsToPrepend, $rail[0].prepend.bind($rail[0]));
            }
            if (modsToAppend.length) {
                // Bottom ads live in `.sticky-modules-wrapper > #WikiaAdInContentPlaceHolder`, which is `#WikiaRail`'s sibling.
                attachMods(modsToAppend, $rail[0].appendChild.bind($rail[0]));
            }
        });
    }

    bootstrap();
}());