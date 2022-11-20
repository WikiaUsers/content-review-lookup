// CategoryCSS
window.categoryCSS = {
    "Market": "MediaWiki:Market.css",
    "Shop Item": "MediaWiki:Shop_Item.css",
    "Virhst Woodlands": "MediaWiki:Virhst_Woodlands.css",
    "Redveil Grove": "MediaWiki:Redveil_Grove.css",
    "Avalanche Expanse": "MediaWiki:Avalanche_Expanse.css",
    "Hidden Wilds": "MediaWiki:Hidden_Wilds.css",
    "Desolate Dunes": "MediaWiki:Desolate_Dunes.css",
    "Entoloma Gloomlands": "MediaWiki:Entoloma_Gloomlands.css",
    "Blooming Plateau": "MediaWiki:Blooming_Plateau.css",
    "Va' Rok": "MediaWiki:Va'_Rok.css"
};

// UserTags
window.UserTagsJS = {
    modules: {
        mwGroups: ["bureaucrat", "sysop", "threadmoderator", "content-moderator", "rollback"],
        
        metafilter: {
            inactive: ["bureaucrat", "sysop", "moderator", "threadmoderator", "content-moderator"],
            rollback: ["sysop"],
            moderator: ["sysop"],
            threadmoderator: ["sysop"],
            "content-moderator": ["sysop"],
        },
        
        implode: {
            moderator: ["content-moderator", "threadmoderator"]
        },
        
        inactive: {
            days: 30,
            zeroIsInactive: false
        },
        
        newuser: {
            days: 4,
            edits: 10,
            namespace: 0,
        },
        
        custom: {
            Blupo: ["cookie"],
            Ethicz: ["guild-relations-manager", "market-editor", "wiki-committee"],
            Natercrawford: ["wiki-organizer"],
            
            NightcoreRayRay: ["trusted-market-editor", "wiki-committee"],
            LanceTheRabbit: ["trusted-market-editor", "wiki-committee"],
            Pulllemons: ["trusted-market-editor", "wiki-committee"],
            LucidR: ["wiki-committee"],
            Blockadepro: ["wiki-committee"],
        },
        
        userfilter: {
            Blupo: ["bureaucrat", "sysop"]
        }
    },
    
    tags: {
        "wiki-organizer": { u: "Wiki Organizer", link: "Project:Staff", order: -2 },
        "guild-relations-manager": { u: "Guild Relations Manager", link: "Project:Staff", order: -1 },
        
        bureaucrat: { link: "Project:Staff#Bureaucrat", order: 0 },
        sysop: { link: "Project:Staff#Administrator", order: 1 },
        moderator: { u: "Moderator", link: "Project:Staff#Moderator", order: 2 },
        rollback: { u: "Rollbacker", link: "Project:Staff#Rollback", order: 3 },
        
        "wiki-committee": { u: "Wiki Committee", link: "Project:Staff#Wiki Committee", order: 4 },
        "trusted-market-editor": { u: "Trusted Market Editor", link: "Project:Staff#Market Editor", order: 1/0 },
        
        cookie: { u: "Cookie", link: "User:Blupo" }
    },
};

// usergroup scripts

var usergroups = mw.config.get("wgUserGroups").join(" ");
var scriptImports = [];

if (/sysop/.test(usergroups) || /bureaucrat/.test(usergroups)) {
    // TopicBlockLog
    TBL_GROUP = "roblox-en";
 
    // MessageBlock
    var MessageBlock = {
        title : "Blocked",
        message : "{" + "{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}" + "}"
    };
    
    scriptImports.push("u:dev:MessageBlock/code.js", "u:dev:TopicBlockLog/code.js");
}

if (/sysop/.test(usergroups) || /content\-moderator/.test(usergroups)) {
    scriptImports.push("u:dev:QuickDiff/code.js", "u:dev:AjaxUndo/code.js");
}
 
if (/sysop/.test(usergroups) || /content\-moderator/.test(usergroups) || /threadmoderator/.test(usergroups)) {
    // AbuseLogRC
    abuseLogRC_showTo = "all";
    abuseLogRC_interval = (typeof abuseLogRC_interval === "number") ? abuseLogRC_interval : 10;
    abuseLogRC_entries = (typeof abuseLogRC_entries === "number") ? abuseLogRC_entries : 6;
    abuseLogRC_collapsible = (typeof abuseLogRC_collapsible === "boolean") ? abuseLogRC_collapsible : true;
    abuseLogRC_userInfo = (typeof abuseLogRC_userInfo === "boolean") ? abuseLogRC_userInfo : true;
 
    // AjaxRC
    window.ajaxRefresh = window.ajaxRefresh || 10000;
    window.AjaxRCRefreshText = window.AjaxRCRefreshText || "Auto-refresh";
    window.ajaxPages = window.ajaxPages || ["Special:RecentChanges", "Blog:Recent_posts", "Special:RecentChangesLinked"];
    window.ajaxSpecialPages = window.ajaxSpecialPages || ["WikiActivity", "Log", "Contributions"];
    
    scriptImports.push("u:dev:AbuseLogRC.js", "u:dev:AjaxRC/code.js");
}

importArticles({
    type: "script",
    articles: scriptImports
});

// MarketPrices
// Lets you view the Market price of items without having to visit the Market page
// localStorage might be for caching the Market page so we don't have to request it on every page load
(function() {
    "use strict";
 
    var mwData = mw.config.get([
        "wgNamespaceNumber",
        "wgTitle"
    ]);
//    if (mwData.wgNamespaceNumber !== 0) { return; }
 
    mw.loader.using(["mediawiki.api", "mediawiki.util"], function() {
        var Api = new mw.Api();
        var util = mw.util;
 
        function getMarketSource() {
            return Api.get({
                action: "parse",
                format: "json",
                prop: "wikitext",
                page: "Market",
                // Cache this page for a short while for anonymous users
                maxage: 300,
                smaxage: 300
            });
        }
 
        var marketPriceContainers = $(".market-price");
        if (!marketPriceContainers) { return; }
 
        getMarketSource().done(function(response) {
            if (!response.error) {
                var wikitext = response.parse.wikitext["*"];
 
                marketPriceContainers.each(function(index) {
                    var marketPriceContainer = $(this);
                    var itemNameElement = marketPriceContainer.find("#itemname");
                    var itemName = itemNameElement.text() || mwData.wgTitle;
                    itemNameElement.remove();
                    marketPriceContainer.empty();
 
                    var itemPrices = [];
                    var itemPriceRegex = new RegExp("\\|" + itemName + "\\s*\\(?(Clean|Max)?\\)?\\s*=\\s*(.+?)[\\n|\\}\\}|\\|]", "gi");
                    var itemPriceMatch;
 
                    while ((itemPriceMatch = itemPriceRegex.exec(wikitext)) !== null) {
                        itemPrices.push([itemPriceMatch[1], itemPriceMatch[2]]);
                    }
 
                    var marketLink = "<span id='market-link'>(See <a target='_blank' href='" + mw.html.escape(util.getUrl("Market#" + itemName)) + "' title='Market'>Market</a>)</span>";
                    var priceText;
 
                    switch (itemPrices.length) {
                        case 1:
                            priceText = "<span id='price'>" + mw.html.escape(itemPrices[0][1]) + "</span>";
                            break;
                        case 2:
                            // Clean & Max
                            priceText = "<ul id='price'><li>Clean: " + mw.html.escape(itemPrices[0][1]) + "</li><li>Max: " + mw.html.escape(itemPrices[1][1]) + "</li></ul>";
                            break;
                        default:
                            marketPriceContainer.text("No price found");
                            return;
                    }
 
                    marketPriceContainer.append(priceText).append(marketLink);
                });
            }
        });
    });
})();
 



// PriceBrowser
// Search Market prices - Credits: Cookie Lord Blupo
(function() {
    "use strict";
 
    var searchField = "<label id='marketSearch-label' for='marketSearch-input'>Item name: </label><input type='text' id='marketSearch-input' name='marketSearch-input'>" +
        "<br/>" +
        "<input type='button' id='marketSearch-submit' value='Search'>";
    var searchOutputField = "<div id='marketSearch-output'></div>";
 
    var marketSearch = $(".market-search");
    marketSearch.css("margin-top", "10px").append(searchField).append(searchOutputField);
 
    var searchInput = marketSearch.find("#marketSearch-input");
    var searchOutput = marketSearch.find("#marketSearch-output");
 
    var wikitext;
 
    $("#marketSearch-submit").click(function() {
        if (!wikitext) {
            searchOutput.text("Source has not loaded yet, try again in a little bit");
            return;
        }
        var itemName = searchInput.val();
        if (!itemName) {
            searchOutput.text("Please enter an item name");
            return;
        }
 
        var itemPrices = [];
        var itemPriceRegex = new RegExp("\\|" + itemName + "\\s*\\(?(Clean|Max)?\\)?\\s*=\\s*(.+?)[\\n|\\}\\}|\\|]", "gi");
        var itemPriceMatch;
 
        while ((itemPriceMatch = itemPriceRegex.exec(wikitext)) !== null) {
            itemPrices.push([itemPriceMatch[1], itemPriceMatch[2]]);
        }
 
        var priceText;
 
        switch (itemPrices.length) {
            case 1:
                priceText = "<span id='price'>" + mw.html.escape(itemPrices[0][1]) + " </span>";
                break;
            case 2:
                // Clean & Max
                priceText = "<ul id='price'><li>Clean: " + mw.html.escape(itemPrices[0][1]) + "</li><li>Max: " + mw.html.escape(itemPrices[1][1]) + "</li></ul>";
                break;
            default:
                searchOutput.text("No price found");
                return;
        }
 
        searchOutput.empty();
        searchOutput.append(priceText);
    });
 
    mw.loader.using("mediawiki.api", function() {
        var Api = new mw.Api();
 
        Api.get({
            action: "parse",
            format: "json",
            prop: "wikitext",
            page: "Market",
            // Cache this page for a short while for anonymous users
            maxage: 300,
            smaxage: 300
        }).done(function(response) {
            if (!response.error) {
                wikitext = response.parse.wikitext["*"];
            }
        });
    });
})();