/*
 * CentralRCM
 * @description Recent Changes log for all wikis on [[w:Template:RobloxWikis]].
 * @author The JoTS
 * @author Fewfre
 */

mw.loader.using(["mediawiki.api"], function(require) {
    var config = mw.config.get([
        "wgCanonicalNamespace",
        "wgTitle",
        "wgSiteName",
        "wgUserGroups",
        "wgServer"
    ]);

    if(config.wgCanonicalNamespace == "Special" &&
        config.wgUserGroups.includes("autoconfirmed")) {
        if(config.wgTitle.toLowerCase() == "centralrecentchanges")
            location.replace(config.wgServer + "/wiki/Special:BlankPage/CentralRecentChanges");
        else if(config.wgTitle == "BlankPage/CentralRecentChanges") {
            var api = new mw.Api({
                ajax: {
                    url: 'https://community.fandom.com/api.php',
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "JSONP",
                    crossDomain: true
                }
            });

            document.title = "Interwiki Recent Changes | " + config.wgSiteName;
            $("#PageHeader h1").text("Recent changes – Roblox wikis");
            history.replaceState({}, '', "/wiki/Special:CentralRecentChanges");

            var $content = $("#mw-content-text").empty();
            var $div = $("<div>").appendTo($content).addClass("rc-content-multiple");
            var $wikis = $("<ul>").appendTo($div).hide();

            /* Use wikis inducted into the Roblox wikis footer */
            api.get({
                action: "parse",
                prop: "wikitext",
                formatversion: "2",
                page: "Template:RobloxWikis"
            }).then(function(data) {
                if(data.parse) {
                    var wikitext = data.parse.wikitext + "[[w:c:roblox|"; // Roblox Wiki is included on footer slightly differently
                    var subdomain = /\[\[w:c:([^|]+?)\|/gi,
                        m;

                    while(m = subdomain.exec(wikitext))
                        $("<li>")
                        .appendTo($wikis)
                        .text(m[1] + ".fandom.com"); // .text() sanitization

                    /* Use Fewfre's RecentChangesMultiple */
                    importArticles({
                        articles: ["u:dev:MediaWiki:RecentChangesMultiple/code.2.js"],
                        type: "script"
                    });
                }
            });
        }
    }
});