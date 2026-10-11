mw.loader.getScript(
    'https://swordburst2.fandom.com/wiki/MediaWiki:ItemDatabase2.js?action=raw&ctype=text/javascript'
).then(function () {
    return mw.loader.getScript(
        'https://swordburst2.fandom.com/wiki/MediaWiki:ItemDatabaseUI.js?action=raw&ctype=text/javascript&v=2'
    );
});

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

            const hitboxLength = parseFloat(
                cells.eq(1).text().trim()
            );

            if (!name || isNaN(hitboxLength)) return;

let weaponLength = null;

for (let i = 2; i < cells.length; i++) {

    const value = parseFloat(
        cells.eq(i).text().trim()
    );

    if (!isNaN(value)) {
        weaponLength = value;
        break;
    }
}

            weapons.push({
                name,
                hitboxLength,
                weaponLength
            });

            cells.eq(0).append(
                ` <button class="hitbox-com-a"
                    data-weapon="${mw.html.escape(name)}">
                    Compare
                </button>`
            );
        });

    });

    if (!weapons.length) {
        return;
    }

    const maxHitboxLength = Math.max(
        ...weapons.map(w => w.hitboxLength)
    );

    const registeredWeaponLengths = weapons
        .filter(w => w.weaponLength !== null)
        .map(w => w.weaponLength);

    const maxWeaponLength = registeredWeaponLengths.length
        ? Math.max(...registeredWeaponLengths)
        : 0;

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

            if (selected.includes(name)) {
                return;
            }

            if (selected.length >= 2) {
                selected.shift();
            }

            selected.push(name);

            updateComparison();
        }
    );

    function updateComparison() {

    if (selected.length < 2) {

        $('#hitbox-box-c').html(`
            <div>
                Selected:
                ${selected.map(s => mw.html.escape(s)).join(' vs ')}
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

const allLengths = [
    a.hitboxLength,
    b.hitboxLength,
    a.weaponLength,
    b.weaponLength
].filter(v => v !== null);

const maxLength = Math.max(...allLengths);

    const hitboxLarger =
        a.hitboxLength > b.hitboxLength ? a : b;

    const hitboxSmaller =
        a.hitboxLength > b.hitboxLength ? b : a;

    const hitboxDiff =
        Math.abs(
            a.hitboxLength -
            b.hitboxLength
        );

    const hitboxPercent =
        ((hitboxLarger.hitboxLength /
            hitboxSmaller.hitboxLength) - 1) * 100;

    const hitboxMultiplier =
        hitboxLarger.hitboxLength /
        hitboxSmaller.hitboxLength;

    let weaponResult = '';

    if (
        a.weaponLength !== null &&
        b.weaponLength !== null
    ) {

        const weaponLarger =
            a.weaponLength > b.weaponLength ? a : b;

        const weaponSmaller =
            a.weaponLength > b.weaponLength ? b : a;

        const weaponDiff =
            Math.abs(
                a.weaponLength -
                b.weaponLength
            );

        const weaponPercent =
            ((weaponLarger.weaponLength /
                weaponSmaller.weaponLength) - 1) * 100;

        const weaponMultiplier =
            weaponLarger.weaponLength /
            weaponSmaller.weaponLength;

        weaponResult = `
            <div class="comparison-result weapon-result">
                <div>
                    <span>Weapon Length</span>
                    <strong>
                        ${mw.html.escape(weaponLarger.name)}
                    </strong>
                    is
                    <b>${weaponPercent.toFixed(2)}%</b>
                    longer
                </div>

                <div class="comparison-result-sub">
                    +${weaponDiff.toFixed(3)} studs
                    · ${weaponMultiplier.toFixed(2)}x
                </div>
            </div>
        `;

    } else {

        weaponResult = `
            <div class="weapon-length-not-registered">
                Weapon length is not registered for one or both weapons.
            </div>
        `;
    }

const hitboxBarA =
    (a.hitboxLength / maxLength) * 100;

const hitboxBarB =
    (b.hitboxLength / maxLength) * 100;

const weaponBarA =
    a.weaponLength !== null
        ? (a.weaponLength / maxLength) * 100
        : 0;

const weaponBarB =
    b.weaponLength !== null
        ? (b.weaponLength / maxLength) * 100
        : 0;

    $('#hitbox-box-c').html(`

        <div class="com-legend">
            <span class="legend-hitbox">
                <i></i> Hitbox
            </span>

            <span class="legend-weapon">
                <i></i> Weapon
            </span>
        </div>

        <div class="weapon-comparison">

            <div class="comparison-weapon">

                <div class="comparison-name">
                    ${mw.html.escape(a.name)}
                </div>

                <div class="measurement">
                    <span class="measurement-label">
                        🔴
                    </span>

                    <div class="measurement-line">
                        <div
                            class="measurement-hitbox"
                            style="width:${hitboxBarA}%">
                        </div>
                    </div>

                    <span class="measurement-value">
                        ${a.hitboxLength}
                    </span>
                </div>

                <div class="measurement">
                    <span class="measurement-label">
                        🟢
                    </span>

                    <div class="measurement-line">
                        ${
                            a.weaponLength !== null
                                ? `
                                    <div
                                        class="measurement-weapon"
                                        style="width:${weaponBarA}%">
                                    </div>
                                `
                                : ''
                        }
                    </div>

                    <span class="measurement-value">
                        ${
                            a.weaponLength !== null
                                ? a.weaponLength
                                : '—'
                        }
                    </span>
                </div>

            </div>

            <div class="measurement-divider"></div>

            <div class="comparison-weapon">

                <div class="comparison-name">
                    ${mw.html.escape(b.name)}
                </div>

                <div class="measurement">
                    <span class="measurement-label">
                        🔴
                    </span>

                    <div class="measurement-line">
                        <div
                            class="measurement-hitbox"
                            style="width:${hitboxBarB}%">
                        </div>
                    </div>

                    <span class="measurement-value">
                        ${b.hitboxLength}
                    </span>
                </div>

                <div class="measurement">
                    <span class="measurement-label">
                        🟢
                    </span>

                    <div class="measurement-line">
                        ${
                            b.weaponLength !== null
                                ? `
                                    <div
                                        class="measurement-weapon"
                                        style="width:${weaponBarB}%">
                                    </div>
                                `
                                : ''
                        }
                    </div>

                    <span class="measurement-value">
                        ${
                            b.weaponLength !== null
                                ? b.weaponLength
                                : '—'
                        }
                    </span>
                </div>

            </div>

        </div>

        <div class="comparison-result hitbox-result">

            <div>
                <span>Hitbox Length</span>
                <strong>
                    ${mw.html.escape(hitboxLarger.name)}
                </strong>
                is
                <b>${hitboxPercent.toFixed(2)}%</b>
                longer
            </div>

            <div class="comparison-result-sub">
                +${hitboxDiff.toFixed(3)} studs
                · ${hitboxMultiplier.toFixed(2)}x
            </div>

        </div>

        ${weaponResult}

    `);
}

});

// Global Boss Timer

function BossTimer() {
    const timer = document.getElementById("boss-timer");
    const spawned = document.getElementById("boss-spawned");
    if (!timer || !spawned) return;
    const now = new Date();
    let remaining =
        3600 -
        (now.getMinutes() * 60 + now.getSeconds());
    if (remaining === 3600) {
        remaining = 0;
    }
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    if (now.getMinutes() === 0 && now.getSeconds() < 20) {
        spawned.style.display = "block";
    } else {
        spawned.style.display = "none";
    }
    if (remaining <= 60) {
        timer.style.color = "#FF0000";
    } else if (remaining <= 300) {
        timer.style.color = "#ffcc00";
    } else {
        timer.style.color = "#6EBD1E";
    }
}
BossTimer();
setInterval(BossTimer, 1000);

// Tier List Data

$(document).ready(function() {

    $('.list-main-box').each(function() {

        var $wrapper = $(this);
        var $inspector = $wrapper.find('.item-data');
        var $icon = $inspector.find('.data-icon');
        var $title = $inspector.find('.data-title');
        var $desc = $inspector.find('.data-descrip');

        var defaultIconHTML = '';
        var defaultTitleText = 'Select a Skill/Item';
        var defaultDescText = 'Click/tap for more information';

        function resetInspector() {
            $icon.html(defaultIconHTML);
            $title.html(defaultTitleText);
            $desc.html(defaultDescText);

            $wrapper.find('.list-mini-box').removeClass('active');
        }

        function updateInspector($item) {

            var $data = $item.find('.data1');

            if (!$data.length) {
                return;
            }

            var imgSrc = $item.find('img').attr('src');
            var titleText = $data.find('.data-title').html();
            var descText = $data.find('.data-descrip').html();

            $icon.html('<img src="' + imgSrc + '">');
            $title.html(titleText);
            $desc.html(descText);

            $wrapper.find('.list-mini-box').removeClass('active');
            $item.addClass('active');
        }

        function handleSelection(element, e) {

            e.stopPropagation();

            if (e.type === 'touchend') {
                e.preventDefault();
            }

            var $item = $(element);

            if ($item.hasClass('active')) {
                resetInspector();
            } else {
                updateInspector($item);
            }
        }

        $wrapper.find('.list-mini-box').on('click touchend', function(e) {
            handleSelection(this, e);
        });

        $inspector.on('click touchend', function(e) {
            e.stopPropagation();
        });

        $(document).on('click touchend', function(e) {
            resetInspector();
        });

    });

});

// Cosmetic Tags Cards

(function () {

    function initCard(card) {

        var variantSlides =
            card.querySelectorAll(".ct-variant-slide");

        var variantPrev =
            card.querySelector(".ct-variant-prev");

        var variantNext =
            card.querySelector(".ct-variant-next");

        var imageSlides =
            card.querySelectorAll(".ct-slide");

        var imagePrev =
            card.querySelector(".ct-prev");

        var imageNext =
            card.querySelector(".ct-next");

        var obtainBox =
            card.querySelector(".ct-obtain");

        if (!variantSlides.length) {
            return;
        }

        var currentVariant = 0;
        var currentImage = 0;
        var changingVariant = false;

        function updateVariant(index) {

            if (index < 0) {
                index = variantSlides.length - 1;
            }

            if (index >= variantSlides.length) {
                index = 0;
            }

            currentVariant = index;

            var variant =
                variantSlides[currentVariant];

            var color =
                variant.getAttribute("data-color");

            var titleColor =
                variant.getAttribute("data-title-color");

            var obtain =
                variant.getAttribute("data-obtain");

            if (color) {
                card.setAttribute(
                    "data-color",
                    color.trim()
                );
            }

            if (titleColor) {
                card.setAttribute(
                    "data-title-color",
                    titleColor.trim()
                );
            }

            if (
                obtain &&
                obtain.trim() &&
                obtain.trim() !== "{{{variant" 
            ) {

                obtainBox.innerHTML =
                    '<div class="ct-variant-obtain">' +
                    mw.html.escape(obtain) +
                    '</div>';

            } else {

                var defaultObtain =
                    card.querySelector(".ct-default-obtain");

                if (defaultObtain) {

                    obtainBox.innerHTML =
                        '<div class="ct-default-obtain">' +
                        defaultObtain.innerHTML +
                        '</div>';
                }
            }
        }

        function getFileName(slide) {

            var image =
                slide.querySelector(".mw-file-element");

            if (!image) {
                return "";
            }

            var alt =
                image.getAttribute("alt") || "";

            var src =
                image.getAttribute("src") || "";

            if (alt) {
                return alt;
            }

            return src;
        }

        function showImageByVariant(index) {

            var variant =
                variantSlides[index];

            if (!variant) {
                return;
            }

            var imageName =
                variant.getAttribute("data-image");

            if (!imageName || !imageName.trim()) {
                return;
            }

            var target =
                imageName
                    .trim()
                    .toLowerCase();

            for (var i = 0; i < imageSlides.length; i++) {

                var fileName =
                    getFileName(imageSlides[i])
                        .toLowerCase();

                if (
                    fileName.indexOf(target) !== -1 ||
                    target.indexOf(fileName) !== -1
                ) {

                    showImage(i, false);
                    return;
                }
            }
        }

        function showVariant(index) {

            updateVariant(index);

            changingVariant = true;

            showImageByVariant(
                currentVariant
            );

            changingVariant = false;
        }

        function showImage(index, updateTitle) {

            if (!imageSlides.length) {
                return;
            }

            if (index < 0) {
                index = imageSlides.length - 1;
            }

            if (index >= imageSlides.length) {
                index = 0;
            }

            currentImage = index;

            for (var i = 0; i < imageSlides.length; i++) {

                imageSlides[i].style.display =
                    i === currentImage ? "flex" : "none";
            }

            fitImages();

            if (updateTitle === false || changingVariant) {
                return;
            }

            var variantIndex =
                imageSlides[currentImage]
                    .getAttribute("data-variant");

            if (!variantIndex) {
                return;
            }

            var foundVariant = -1;

            for (var j = 0; j < variantSlides.length; j++) {

                if (
                    variantSlides[j]
                        .getAttribute("data-index") ===
                    variantIndex
                ) {

                    foundVariant = j;
                    break;
                }
            }

            if (foundVariant !== -1) {
                updateVariant(foundVariant);
            }
        }

        function fitImages() {

            var slidesBox =
                card.querySelector(".ct-slides");

            if (!slidesBox) {
                return;
            }

            var maxWidth =
                slidesBox.clientWidth;

            var maxHeight =
                slidesBox.clientHeight;

            for (var i = 0; i < imageSlides.length; i++) {

                var image =
                    imageSlides[i]
                        .querySelector(".mw-file-element");

                if (!image) {
                    continue;
                }

                var naturalWidth =
                    image.naturalWidth;

                var naturalHeight =
                    image.naturalHeight;

                if (!naturalWidth || !naturalHeight) {
                    continue;
                }

                var scale =
                    Math.min(
                        maxWidth / naturalWidth,
                        maxHeight / naturalHeight
                    );

                image.style.width =
                    (naturalWidth * scale) + "px";

                image.style.height =
                    (naturalHeight * scale) + "px";
            }
        }

        if (variantPrev && variantNext) {

            variantPrev.addEventListener(
                "click",
                function () {
                    showVariant(
                        currentVariant - 1
                    );
                }
            );

            variantNext.addEventListener(
                "click",
                function () {
                    showVariant(
                        currentVariant + 1
                    );
                }
            );

            if (variantSlides.length <= 1) {

                variantPrev.style.display = "none";
                variantNext.style.display = "none";

            } else {

                variantPrev.style.display = "flex";
                variantNext.style.display = "flex";
            }
        }

        if (imagePrev && imageNext) {

            imagePrev.addEventListener(
                "click",
                function () {
                    showImage(
                        currentImage - 1,
                        true
                    );
                }
            );

            imageNext.addEventListener(
                "click",
                function () {
                    showImage(
                        currentImage + 1,
                        true
                    );
                }
            );

            if (imageSlides.length <= 1) {

                imagePrev.style.display = "none";
                imageNext.style.display = "none";
            }
        }

        var images =
            card.querySelectorAll(".mw-file-element");

        for (var i = 0; i < images.length; i++) {

            images[i].addEventListener(
                "load",
                fitImages
            );
        }

        updateVariant(0);

        if (imageSlides.length) {
            showImage(0, true);
        }
    }

    function initCosmeticTags() {

        var cards =
            document.querySelectorAll(".ct-card");

        for (var i = 0; i < cards.length; i++) {
            initCard(cards[i]);
        }
    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initCosmeticTags
        );

    } else {

        initCosmeticTags();
    }

})();