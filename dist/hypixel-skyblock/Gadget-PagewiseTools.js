/* Loader for scripts that only loads for selected pages
*/
/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/

/* global mw, importArticles */

mw.loader.using(["mediawiki.api"]).then(function() {
	"use strict";
    var loadScripts = [
        { script: { ns: 8, name: "Gadget-TooltipsEditor.js" }, pages: [{ns: 828, name: "Inventory slot/Tooltips"}] },
        { script: { ns: 8, name: "Gadget-PagewiseTools/Cliptools.js" }, pages: [ "Bingo/Events" ] },
    ];
    var conf = mw.config.get([
        "wgPageName",
        "wgFormattedNamespaces"
    ]);
    var importList = [];
    function resolvePagename(pg) {
        var name;
        if (typeof pg !== "string" && pg.ns)
            name = (conf.wgFormattedNamespaces[pg.ns] || "") + ":" + pg.name;
        else
            name = pg;
        return name.replaceAll(" ", "_");
    }
    for (var index in loadScripts) {
        var allowedPages = loadScripts[index].pages.map(resolvePagename);
        if (!allowedPages.includes(conf.wgPageName))
            continue;
        importList.push(resolvePagename(loadScripts[index].script));
    }
    if (importList.length > 0)
        importArticles({
            type: "script",
            articles: Array.from(new Set(importList))
        });
});