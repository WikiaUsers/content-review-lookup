
/* Recent Changes log */
/* Content originally from roblox.fandom.com/wiki/MediaWiki:CentralRCM.js */
// <nowiki>

mw.loader.using(["mediawiki.util"], function(require) {
    var mwutil = require("mediawiki.util");
    var config = mw.config.get([
        "wgCanonicalNamespace",
        "wgTitle",
        "wgSitename",
        "wgUserGroups",
        "wgServer"
    ]);
    
    if (config.wgCanonicalNamespace == "Special"
            && config.wgUserGroups.includes("autoconfirmed"))
    {
        if (config.wgTitle.toLowerCase() == "centralrecentchanges")
            location.replace(config.wgServer + "/wiki/Special:BlankPage/CentralRecentChanges");
        else if (config.wgTitle == "BlankPage/CentralRecentChanges")
        {
            document.title = "Interwiki Recent Changes | " + config.wgSitename;
            $("#PageHeader h1").text("Recent changes – Roblox wikis");
            history.replaceState({}, '', "/wiki/Special:CentralRecentChanges");
            
            var $content = $("#mw-content-text").empty();
            var $div = $("<div>").appendTo($content).addClass("rc-content-multiple");
            var $wikis = $("<ul>").appendTo($div).hide();
            
            /* Use fewfre's RecentChangesMultiple */
            importArticles({ articles:["u:dev:MediaWiki:RecentChangesMultiple/code.2.js"], type:"script" });
        }
    }
})