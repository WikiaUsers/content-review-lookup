/**
 * GameFiles Universal Data Viewer for Baldur's Gate fandom
 * Parses URL hash parameters and forwards them to Lua modules.
 * More details can be found in the [[GameFiles/Technical_description|technical description]] of the project.
 * Author: [[https://baldursgate.fandom.com/wiki/User:Jeremy_James_33|Jeremy_James_33]]
 */
(function(mw, $) {
    // Ensure required MediaWiki modules are loaded
    mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {

        var pageName = mw.config.get('wgPageName') || '';

        // Only run on GameFiles/* pages
        if (!pageName || pageName.indexOf('GameFiles/') !== 0) {
			return;
		} else {
			console.warn("GameFiles: pagename is " + pageName); // Debug
		}

        // Extract display type (e.g., "DisplayItem")
        var displayType = pageName.replace(/^GameFiles\//, '').split('/')[0];
	    console.warn("displayType: " + displayType); // Debug

        var loadGameData = function() {
			var $container = $('#GameFiles-Viewer');
			if (!$container.length) {
			    console.warn("GameFiles: container not found.");
			    return;
			} else {
				console.warn("GameFiles: container is " + $container); // Debug
			}

            // Parse hash parameters
            var hash = window.location.hash.replace(/^#/, '');
            var params = {};
            console.warn("GameFiles: hash: " + hash); // Debug

            if (hash.includes('=')) {
                // Multi-parameter mode: key=value&key2=value2
                hash.split('&').forEach(function (pair) {
                    var parts = pair.split('=');
                    if (parts[0]) {
                        // Decode the params to be able to manipulate them
                        params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
                    }
                });
            } else if (hash) {
                // Single raw parameter
                params.param = decodeURIComponent(hash);
            }

            // Build Lua parameter string, format: |key=value
            // Escape sensitive characters
            var luaParams = Object.keys(params)
                .map(function (key) {
                    var cleanKey = key.replace(/[|}=]/g, ''); // Basic cleanup
                    var cleanVal = params[key].replace(/[|}]/g, function(m) {
                        return (m === '|' ? '{{!}}' : '&#125;'); // Escape Wikitext
                    });
                    return cleanKey + '=' + cleanVal;
                })
                .join('|');
                console.warn("GameFiles: luaParams built"); // Debug
                console.warn("GameFiles: luaParams: " + luaParams); // Debug

            // Loading UI
            $container.html(
                '<div style="text-align:center; padding:20px;">' +
                '<div class="mw-ajax-loader"></div><br>' +
                'Fetching data...</div>');

            // Choose Lua function
            var luaFunction = hash ? 'param' : 'noparam';

            // Safe built of wikitext
            var wikitext = '{{#invoke:GameFiles/' + displayType + '|' + luaFunction;
            if (luaParams) wikitext += '|' + luaParams;
            wikitext += '}}';
            console.warn("GameFiles: wikitext: " + wikitext); // Debug

            // Call Lua
            new mw.Api().get({
                action: 'parse',
                text: wikitext,
                prop: 'text',
                disablelimitreport: true,
                pst: true // Pre-save transform to manage signatures/pipes
            }).done(function (data) {
                if (data && data.parse && data.parse.text) {
                    $container.html(data.parse.text['*']);
                    // Optional : trigger MediaWiki hooks for other scripts (ex: tooltips)
                    mw.hook('wikipage.content').fire($container);
                }
            }).fail(function () {
                $container.html('<div class="errorbox">Error: Could not communicate with the Lua module.</div>');
            });
        };

        // Execute on page load
        $(document).ready(loadGameData); // Previous code, probably not working because it is executed too early in the page load sequence
        //mw.hook('wikipage.content').add(loadGameData);
        // Execute when the URL hash changes (navigation without refresh)
        $(window).on('hashchange', loadGameData);
    });
})(window.mediaWiki, window.jQuery);