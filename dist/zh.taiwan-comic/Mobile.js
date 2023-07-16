const url = new URL(window.location.href);
console.log("MediaWiki:Mobile.js Loaded");

// Check if this page is the page we'd like to redirect
const params = Array.from(url.searchParams);
if (url.pathname.startsWith("/zh/wiki/") &&                                         // It's not a forum page
    (params.length == 0 || (params.length == 1 && params[0][0] == "variant")) &&    // It's an article page
    $(".page-header__variants").length != 0) {                                      // Variant button exists

    const customVariant = localStorage.getItem("custom-var") || "";
    const currentPageVariant = url.searchParams.get("variant") || "";
    const userVariant = navigator.language && navigator.language.toLowerCase() || "";

    if (!customVariant) {           // User doesn't specify variant
        if (currentPageVariant) {   // User opens a page with a variant
            // Switch to equivalent language
            var newUrl = "https://" + url.hostname + url.pathname;
            if (["zh-cn", "zh-hk", "zh-mo", "zh-my", "zh-sg", "zh-tw"].includes(userVariant)) {
                newUrl += "?variant=" + userVariant;
                localStorage.setItem("custom-var", userVariant);
            }
            window.location.replace(newUrl);
        }
    } else if (["zh-hans", "zh-hant", "zh-cn", "zh-hk", "zh-mo",
        "zh-my", "zh-sg", "zh-tw"].includes(customVariant)) { // User opens this community other than first time

        // User opens a page with a variant that different from his custom variant
        if (currentPageVariant != customVariant) {
            var newUrl = "https://" + url.hostname + url.pathname;
            newUrl += "?variant=" + customVariant;
            window.location.replace(newUrl);
        }
    }

    // Do something after page load
    $(document).ready(function () {

        const customVar = localStorage.getItem("custom-var");

        // Shows the current variant at the variant dropdown button
        var langLabel = "不轉換";
        switch (customVar) {
            case "zh-hans": langLabel = "简体"; break;
            case "zh-hant": langLabel = "繁體"; break;
            case "zh-cn": langLabel = "大陆简体"; break;
            case "zh-hk": langLabel = "香港繁體"; break;
            case "zh-mo": langLabel = "澳門繁體"; break;
            case "zh-my": langLabel = "大马简体"; break;
            case "zh-sg": langLabel = "新加坡简体"; break;
            case "zh-tw": langLabel = "臺灣正體"; break;
        }
        $(".page-header__variants .wds-dropdown__toggle").html(langLabel + ' <svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>');

        // Add "no translate" button in the variant dropdown list
        const variantList = $(".page-header__variants .wds-list.wds-is-linked");
        variantList.prepend('<li><a href="' + url.pathname + '">不轉換</a></li>');

        $(".popular-pages .rail-module__header").text("熱門頁面");

        // Redirect user to different variant link with `href.replace` when clicking the variant dropdown list
        variantList.each(function() {
            const link = $(this).find("a");
            link.on('click', function (e) {
                e.preventDefault();

                const href = $(this).attr("href");
                window.location.replace(href);
            });
        });

        // Add variant parameter to link in article and other sections
        if (customVar) {
            $(".page-header__categories a , #content a , .page-footer__categories a , .mcf-content a").each(updateLinkWithVariant);

            // Some elements don't load immediately, just try it multiple times
            tryUpdateLinkWithVariant(".recent-wiki-activity");
            tryUpdateLinkWithVariant(".popular-pages");

            // Update link of <a> tag with cutsom variant
            function updateLinkWithVariant() {
                const href = $(this).attr("href");
                var url;

                if (!href || href.includes("#")) return;
                if (href.startsWith("/")) {
                    url = new URL("https://taiwan-comic.fandom.com" + href);
                } else {
                    url = new URL(href);
                }

                if (url.hostname == "taiwan-comic.fandom.com" &&        // It's our domain
                    Array.from(url.searchParams).length == 0 &&         // It's an article page
                    url.pathname.startsWith("/zh/wiki/") &&             // Not a link to forum
                    !url.pathname.startsWith("/zh/wiki/Special:") &&    // Not a link to Special page
                    !url.pathname.startsWith("/zh/wiki/MediaWiki:")     // Not a link to MediaWiki page
                ) {
                    url.searchParams.set("variant", customVar);
                    $(this).attr("href", url.toString());
                }
            }

            // Try `updateLinkWithVariant` for multiple times
            function tryUpdateLinkWithVariant(cssSelector) {
                var itrvCnt = 0;
                const itrv = setInterval(function () {
                    if ($(cssSelector).length != 0) {
                        clearInterval(itrv);
                        $(cssSelector + " a").each(updateLinkWithVariant);
                    }
                    if (itrvCnt > 10) clearInterval(itrv);
                    itrvCnt++;
                }, 500);
            }
        }
    });
}

// Store user's custom variant to local storage
$(document).on("click", ".page-header__variants a", function () {
    const variantLabel = $(this).attr("data-tracking-label") || "";

    var customVar = "";
    switch (variantLabel) {
        case "variant-zh-Hans": customVar = "zh-hans"; break;
        case "variant-zh-Hant": customVar = "zh-hant"; break;
        case "variant-zh-Hans-CN": customVar = "zh-cn"; break;
        case "variant-zh-Hant-HK": customVar = "zh-hk"; break;
        case "variant-zh-Hant-MO": customVar = "zh-mo"; break;
        case "variant-zh-Hans-MY": customVar = "zh-my"; break;
        case "variant-zh-Hans-SG": customVar = "zh-sg"; break;
        case "variant-zh-Hant-TW": customVar = "zh-tw"; break;
        default: customVar = ""; break;
    }
    localStorage.setItem("custom-var", customVar);
});