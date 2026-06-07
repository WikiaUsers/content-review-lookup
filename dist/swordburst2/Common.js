
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
            Pyrixil: ["trusted-market-editor", "Price Sheet Owner"],
            "Mustache.17": ["trusted-market-editor", "Price Sheet Co-Owner"],
            BGMMasterYT: ["Game-Developer"],
            "1pinto": ["Game-Contributor"],
            AtomicStriker3: ["Game-Contributor", "trusted-market-editor"],
            P47TB: ["trusted-market-editor"],
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
        "Game-Contributor": { u: "Game Contributor", link: "Developers", order: 1/0 },
        "Game-Developer": { u: "Game Developer", link: "Developers", order: 1/0 },
        "Price Sheet Owner": { u: "Price Sheet Owner", link: "Project:Staff#Market Editor", order: 1/0 },
        "Price Sheet Co-Owner": { u: "Price Sheet Co-Owner", link: "Project:Staff#Market Editor", order: 1/0 },

        
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

// Main Page Slider

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.mini-box');

const left = document.querySelector('.slider-arrow.left');
const right = document.querySelector('.slider-arrow.right');

const container = document.querySelector('.event-box-house');

if (slider && left && right && container) {

    let current = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${current * 100}%)`;
    }

    function nextSlide() {
        current++;
        if (current >= slides.length) current = 0;
        updateSlider();
    }

    function prevSlide() {
        current--;
        if (current < 0) current = slides.length - 1;
        updateSlider();
    }

    right.addEventListener('click', nextSlide);
    left.addEventListener('click', prevSlide);

    if (slides.length <= 1) {

        left.style.display = 'none';
        right.style.display = 'none';

    } else {

        let autoSlide = setInterval(nextSlide, 4000);

        container.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });

        container.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 4000);
        });
    }
}

// Hitbox Table

$(function () {

    if (!$('#hitbox').length) {
        return;
    }

    const weapons = [];
    let selected = [];

    $('.hitbox-table').each(function () {

        $(this).find('tr').each(function () {

            const cells = $(this).find('td');

            if (cells.length < 2) return;

            const name = cells.eq(0).find('a').first().text().trim();

            const length = parseFloat(
                cells.eq(1).text().trim()
            );

            if (!name || isNaN(length)) return;

            weapons.push({
                name,
                length
            });

            cells.eq(0).append(
                ` <button class="hitbox-com-a"
                    data-weapon="${name}">
                    Compare
                </button>`
            );
        });

    });

    const maxLength = Math.max(
        ...weapons.map(w => w.length)
    );

    $('body').append(`
        <div id="hitbox-box-a">
            <div id="hitbox-box-b">
                Comparator
            </div>

            <div id="hitbox-box-c">
                Select 2 weapons...
            </div>
        </div>
    `);

    $(document).on(
        'click',
        '.hitbox-com-a',
        function () {

            const name = $(this).data('weapon');

            if (selected.includes(name))
                return;

            if (selected.length >= 2)
                selected.shift();

            selected.push(name);

            updateComparison();
        }
    );

    function updateComparison() {

        if (selected.length < 2) {

            $('#hitbox-box-c').html(`
                <div>
                    Selected:
                    ${selected.join(' vs ')}
                </div>
            `);

            return;
        }

        const a = weapons.find(
            w => w.name === selected[0]
        );

        const b = weapons.find(
            w => w.name === selected[1]
        );

        const diff =
            Math.abs(a.length - b.length);

        const larger =
            a.length > b.length ? a : b;

        const smaller =
            a.length > b.length ? b : a;

        const percent =
            ((larger.length / smaller.length) - 1)
            * 100;

        const multiplier =
            larger.length / smaller.length;

        const barA =
            (a.length / maxLength) * 100;

        const barB =
            (b.length / maxLength) * 100;

        $('#hitbox-box-c').html(`

            <div class="weapon-block">
                <strong>${a.name}</strong>
                (${a.length})

                <div class="hitbox-box-d">
                    <div
                        style="width:${barA}%">
                    </div>
                </div>
            </div>

            <div class="weapon-block">
                <strong>${b.name}</strong>
                (${b.length})

                <div class="hitbox-box-d">
                    <div
                        style="width:${barB}%">
                    </div>
                </div>
            </div>

            <hr>

            <div>
                <b>${larger.name}</b>
                is
                <b>${percent.toFixed(2)}%</b>
                longer.
            </div>

            <div>
                Difference:
                <b>${diff.toFixed(3)}</b>
                studs
            </div>

            <div>
                Multiplier:
                <b>${multiplier.toFixed(2)}x</b>
            </div>

        `);
    }

});