(function(mw) {
	'use strict';
	var cacheName = 'ARKData';

    // Internal implementation
    function fetchDataPagesInternal(pages, cache, forceRecacheId, expiryTime) {
        var results = {};
        function fetchDataPageInternal(pageName) {
            // Construct a URL of the page.
            // On translations if prefixed with "en:", this'll slice off the script path.
            var isRequestingMain = pageName.startsWith('en:') && mw.config.get('wgContentLanguage') !== 'en';
            var scriptPath = mw.config.get('wgScriptPath');
            var url = mw.util.getUrl((isRequestingMain ? pageName.slice(3) : pageName), {
                action: 'raw',
                ctype: 'application/json'
            });
            if (isRequestingMain && url.startsWith(scriptPath)) {
                url = url.slice(scriptPath.length);
            }

            var request = new Request(url);

            if (cache !== null) {
                // Cache is available
                var timeNow = new Date().getTime();
                return cache.match(request).then(function (response) {
                    // Check if cache entry is recent and valid
                    if (response && response.ok &&
                        (Date.parse(response.headers.get('Expires')) > timeNow) &&
                        (parseInt(response.headers.get('X-ARK-Cache-Index')) === forceRecacheId)) {
                        return response;
                    }

                    // Fetch the page from API
                    return fetch(request).then(function (response) {
                        response.clone().blob().then(function(body) {
                            cache.put(request, new Response(body, { headers: {
                                'Expires': (new Date(timeNow + expiryTime)).toUTCString(),
                                'X-ARK-Cache-Index': forceRecacheId,
                            }}));
                        });
                        return response;
                    });
                }).then(function (response) {
                    return response.json().then(function(data) {
                        results[pageName] = data;
                    });
                });
            } else {
                // Cache is unavailable
                return fetch(request).then(function (response) {
                    return response.json().then(function(data) {
                        results[pageName] = data;
                    });
                });
            }
        }

        // Create a fetch request for every page, and wait for each to be resolved (or one to fail), then return the results
        // object.
        return Promise.all(pages.map(function (page) {
            return fetchDataPageInternal(page);
        })).then(function () {
            return Promise.resolve(results);
        });
    }

    // Public entrypoint
	window.fetchDataPagesARK = function(pages, forceRecacheId, expiryTime) {
		return caches.open(cacheName).then(function (cache) {
            // Cache successfully opened
            return fetchDataPagesInternal(pages, cache, forceRecacheId, expiryTime);
		}, function() {
            // Cache not opened. Most likely rejected by browser's privacy settings (e.g. Firefox's incognito mode).
            return fetchDataPagesInternal(pages, null, null, null);
        });
	};
	
})(window.mediaWiki);