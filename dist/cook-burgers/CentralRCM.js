/* Recent Changes log */
// <nowiki>

(function($, mw) {
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
            $("#PageHeader h1").text("Recent changes – Cook Burgers Wiki");
            history.replaceState({}, '', "/wiki/Special:CentralRecentChanges");
            
            var $content = $("#mw-content-text").empty();
            var $div = $("<div>").appendTo($content).addClass("rc-content-multiple");
            var $wikis = $("<ul>").appendTo($div).hide();
            
            /* Use wikis inducted into the wikis footer */
            $.get(mw.util.wikiScript('load'), {
                mode: 'articles',
                articles: 'u:c:template:CookBurgersWikis',
                only: 'styles'
            }, function(data) {
                data += "[[w:c:roblox|"; // CBW is included on footer slightly differently
                
                var subdomain = /\[\[w:c:([^|]+?)\|/gi, m;
                
                while (m = subdomain.exec(data))
                    $("<li>")
                        .appendTo($wikis)
                        .text(m[1] + ".wikia.com"); // .text() sanitization
            });
            
            /* Use fewfre's RecentChangesMultiple */
            importArticles({ articles:["u:dev:RecentChangesMultiple/code.2.js"], type:"script" });
        }
    }
    
})(jQuery, mediaWiki);