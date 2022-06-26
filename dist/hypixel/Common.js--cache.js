// <nowiki>

/***
 * Taken from the Hypixel SkyBlock Wiki.
 * https://hypixel-skyblock.fandom.com/wiki/MediaWiki:Gadget-refreshLuaCache.js
 */

$(function () {
    // Note: mainModule must contain a `local PREFIX = prefixname_01_`
    var supportedCaches = {
            slot_aliases: {
                type: "simple",
                dataModule: "Invslot/Aliases",
                mainModule: "Cache",
                prefixVar: "SLOT_ALIASES_PREFIX"
            },
        },
        BUTTON_ID = ".refresh-lua-cache";

    // Don't run script unless a button for it to run exists
    if (!$(BUTTON_ID).length) return;

    $(BUTTON_ID).show().click(function () {
        var $bttn = $(this),
            cacheId = $bttn.data('cache-id');
        if (!cacheId || !supportedCaches[cacheId]) {
            mw.notify("Refresh button is missing a valid cache id", {
                title: "Cache ID Missing or Invalid",
                type: "error"
            });
            $bttn.attr("disabled", true).text('Please fix cache ID');
        }
        var cacheInfo = supportedCaches[cacheId];

        $bttn.attr("disabled", true).text("Refreshing cache for '" + cacheInfo.dataModule + "'...");

        function reEnableButton() {
            $bttn.attr("disabled", false).text("Try Again");
        }

        function errorHandler(err) {
            mw.notify("See the web console for details", {
                title: "Uncaught Error",
                type: "error"
            });
            console.error(err);
            reEnableButton();
        }

        var api = new mw.Api();
        console.log('Starting...');
        api.get({
            action: 'query',
            prop: 'revisions',
            titles: 'Module:' + cacheInfo.mainModule,
            rvprop: 'content'
        }).then(function (data) {
            for (var p in data.query.pages) {
                content = data.query.pages[p].revisions[0]["*"];
            }
            var prefix = content.match(new RegExp((cacheInfo.prefixVar || 'PREFIX') + " = '(.+?)'"));
            if (!prefix) {
                mw.notify("'Module:" + cacheInfo.mainModule + "' is missing variable " + (cacheInfo.prefixVar || 'PREFIX'), {
                    title: "Prefix Missing",
                    type: "error"
                });
                reEnableButton();
                return;
            }
            prefix = prefix[1];
            console.log(prefix);

            api.get({
                action: 'parse',
                text: cacheInfo.type === "simple" ?
                    '{{#invoke:CacheUtil|resetAllSimple|' + cacheInfo.dataModule + '|prefix=' + prefix + '}}' :
                    '{{#invoke:CacheUtil|resetAll|' + cacheInfo.dataModule + '|module=' + cacheInfo.mainModule + '|f=' + cacheInfo.f + '|prefix=' + prefix + '}}'
            }).then(function (data) {
                console.log('Done!', data);
                mw.notify("Cache has been updated", {
                    title: "Cache Refreshed Successfully!",
                    type: "info"
                });
                $bttn.attr("disabled", true).text("Success!");
            })
            // Fandom doesn't like catch as a method name
            ["catch"](errorHandler);
        })
        // Fandom doesn't like catch as a method name
        ["catch"](errorHandler);
    });
});
// </nowiki>