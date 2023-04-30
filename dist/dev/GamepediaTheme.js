// GamepediaTheme.js, by Sophiedp, Arashiryuu0 and Aeywoo
mw.loader.using(["mediawiki.api"]).then(function() {
    // Checks if the wiki is a Gamepedia Wiki
    if ($(document.body).hasClass("is-gamepedia") !== true) {
        return;
    }
    // Since the footer doesn't exist in edit or submit mode, return
    if ($(document.body).hasClass("action-edit") || $(document.body).hasClass("action-submit")) {
        return;
    }
    // Prevents double loading
    if ($(document.body).hasClass("gamepedia-footer")) {
        return;
    }
    var footerClass = $(document.body).addClass("gamepedia-footer");
    
    // -- Internationalization Function -- //
    function init(i18n) {
        var footer_link_curse          = i18n.msg("footer-link-curse").plain();
        var footer_link_gamepedia      = i18n.msg("footer-link-gamepedia").plain();
        var footer_link_wikiconnect    = i18n.msg("footer-link-wikiconnect").plain();
        var footer_gpwikis_header      = i18n.msg("footer-gpwikis-header").plain();
        var footer_gpwikis_minecraft   = i18n.msg("footer-gpwikis-minecraft").plain();
        var footer_gpwikis_terraria    = i18n.msg("footer-gpwikis-terraria").plain();
        var footer_gpwikis_zelda       = i18n.msg("footer-gpwikis-zelda").plain();
        var footer_curse_apps_header   = i18n.msg("footer-curse-apps-header").plain();
        var footer_curse_apps_desc     = i18n.msg("footer-curse-apps-desc").plain();
        var footer_bottom_bar = i18n.msg("footer-bottom-bar", mw.config.get("wgSiteName")).plain();
        var special_search_title       = i18n.msg("special-search-title").plain();
        
        // -- Global Navigation Icons/Logos -- //
        /// "Fandom.com" to "Curse.com"
        $(".is-gamepedia h2.global-footer__header a")
            .attr("href", "http://www.curse.com/")
            .attr("title", (footer_link_curse))
            .attr("aria-label", (footer_link_curse));
        /// "Fandom.com" to "Gamepedia.com"
        $(".is-gamepedia .global-navigation__logo")
            .attr("href", "https://www.gamepedia.com/")
            .attr("title", (footer_link_gamepedia))
            .attr("aria-label", (footer_link_gamepedia));
        
        // -- Explore Properties Section -- //
        $(".is-gamepedia .global-footer__link[data-tracking-label=\"explore.fandom\"]")
            .attr("href", "https://www.gamepedia.com/")
            .attr("data-tracking-label", "explore.gamepedia")
            .attr("aria-label", (footer_link_gamepedia))
            .text(footer_link_gamepedia);
        
        // -- Gamepedia Wikis Section -- //
        $(".is-gamepedia section.global-footer__section.global-footer__section-advertise").remove();
        var gpWikisSection = $("<section>")
            .addClass("global-footer__section")
            .addClass("global-footer__section-gamepedia-wikis");
        var gpWikisHeader = $("<h3>")
            .addClass("global-footer__section-header")
            .text(footer_gpwikis_header);
        var gpWikisList = $("<ul>")
            .addClass("global-footer__links");
        var gpWikisListItem1 = $("<a>")
            .attr("href","https://minecraft.gamepedia.com/wiki/Minecraft_Wiki")
            .addClass("global-footer__link")
            .attr("data-tracking-label","gampedia-wikis.minecraft")
            .attr("aria-label", (footer_gpwikis_minecraft))
            .text(footer_gpwikis_minecraft);
        var gpWikisListItem2 = $("<a>")
            .attr("href","https://terraria.gamepedia.com/wiki/Terraria Wiki")
            .addClass("global-footer__link")
            .attr("data-tracking-label","gampedia-wikis.terraria")
            .attr("aria-label", (footer_gpwikis_terraria))
            .text(footer_gpwikis_terraria);
        var gpWikisListItem3 = $("<a>")
            .attr("href","https://zelda.gamepedia.com/wiki/Main_Page")
            .addClass("global-footer__link")
            .attr("data-tracking-label","gampedia-wikis.zelda")
            .attr("aria-label", (footer_gpwikis_zelda))
            .text(footer_gpwikis_zelda);
        
        var footerThirdDiv = document.querySelector(".is-gamepedia footer.global-footer .global-footer__content div:nth-child(3)");
        $(footerThirdDiv).append(gpWikisSection);
        $(gpWikisSection).append(gpWikisHeader,gpWikisList);
        $(gpWikisList).append($("<li>"),$("<li>"),$("<li>"));
        $(".is-gamepedia section.global-footer__section.global-footer__section-gamepedia-wikis > ul > li:nth-child(1)").append(gpWikisListItem1);
        $(".is-gamepedia section.global-footer__section.global-footer__section-gamepedia-wikis > ul > li:nth-child(2)").append(gpWikisListItem2);
        $(".is-gamepedia section.global-footer__section.global-footer__section-gamepedia-wikis > ul > li:nth-child(3)").append(gpWikisListItem3);
        
        // -- Fandom Apps (Curse Apps) Section -- //
        var gpFooter = document.querySelector(".is-gamepedia .global-footer__section-fandom-apps h3");
        if (gpFooter) {
            gpFooter.textContent = (footer_curse_apps_header);
            gpFooter.nextSibling.nodeValue = (footer_curse_apps_desc);
        }
        
        // -- Global Footer Bottom Bar -- //
        $(".is-gamepedia .global-footer__bottom > div:first-child").text(footer_bottom_bar);
        
        // -- Community Section -- //
        $(".is-gamepedia .global-footer__link[data-tracking-label=\"community.community-central\"]")
            .attr("href", "https://web.archive.org/web/20210803141801/https://www.gamepedia.com/wikiconnect")
            .attr("data-tracking-label", "community.wikiconnect")
            .attr("aria-label", (footer_link_wikiconnect))
            .text(footer_link_wikiconnect);
        $(".is-gamepedia .global-footer__link[data-tracking-label=\"community.help\"]")
            .attr("href", "https://help.gamepedia.com/wiki/Gamepedia_Help_Wiki");
        
        var title_special_search = document.querySelector(".rootpage-Special_Search.is-gamepedia .page-header__title-wrapper h1.page-header__title");
        if ((title_special_search) !== true) {
            // -- Special:Search -- //
            $(".rootpage-Special_Search.is-gamepedia .page-header__title-wrapper h1.page-header__title").text(special_search_title);
        }
        var title_special_search_community = document.querySelector(".rootpage-Special_SearchCommunity.is-gamepedia .page-header__title-wrapper h1.page-header__title");
        if ((title_special_search_community) !== true ) {
            // -- Special:SearchCommunity -- //
            $(".rootpage-Special_SearchCommunity.is-gamepedia .page-header__title-wrapper h1.page-header__title").text(special_search_title);
        }
    }
    
    // -- Overview Section -- //
    /// "Fandom.com/about" to "Gamepedia.com/about"
    $(".is-gamepedia .global-footer__link[data-tracking-label=\"company-overview.about\"]")
        .attr("href", "https://www.gamepedia.com/about");
    /// "Fandom.com/about#contact" to "Help.fandom.com/wiki/How_to_contact_Gamepedia"
    $(".is-gamepedia .global-footer__link[data-tracking-label=\"company-overview.contact\"]")
        .attr("href", "https://help.fandom.com/wiki/How_to_contact_Gamepedia");
    /// Remove "What is Fandom?"
    $(".is-gamepedia .global-footer__link[data-tracking-label=\"company-overview.what-is-fandom\"]")
        .remove();
    
    // -- Fandom Apps Section -- //
    /// Duplication of the "Fandom Apps" section
    var curseforge_app_section = $("<section>")
        .addClass("global-footer__section")
        .addClass("global-footer__section-curseforge-stores");
    var curseforge_app_svg = $("<svg class=\"global-footer__icon\"><use xlink:href=\"#wds-brand-fandom-logo-store\"></use></svg>");
    var curseforge_app_store = $("<ul>")
        .addClass("global-footer__links");
    var curseforge_app_store_apple = $("<li><a href=\"https://download.curseforge.com/\" class=\"global-footer__link\" data-tracking-label=\"community-apps.windows-app\" aria-label=\"CurseForge\'s Windows App\"><img class=\"global-footer__link-icon\" src=\"https://static.wikia.nocookie.net/central/images/4/48/Aeywoo_-_Get_It_On_Badge_Windows.png\" alt=\"Get It On Windows\"></img></a></li>");
    var curseforge_app_store_google = $("<li><a href=\"https://download.curseforge.com/\" class=\"global-footer__link\" data-tracking-label=\"community-apps.macos-app\" aria-label=\"CurseForge\'s MacOS App\"><img class=\"global-footer__link-icon\" src=\"https://static.wikia.nocookie.net/central/images/b/b3/Aeywoo_-_Get_It_On_Badge_MacOS.png\" alt=\"Get It On MacOS\"></img></a></li>");
    // Extra defining for unnamed divisions
    var global_footer_content = document.querySelector(".is-gamepedia .global-footer .global-footer__content");
    if (global_footer_content) {
        $(global_footer_content).children().last().append(curseforge_app_section);
        $(curseforge_app_section).append(curseforge_app_svg, curseforge_app_store);
        $(curseforge_app_store).append(curseforge_app_store_apple, curseforge_app_store_google);
    }
    
    // -- Internationalization -- //
    mw.hook("dev.i18n").add(function(i18n) {
        i18n.loadMessages("GamepediaTheme").done(init);
    });
    importArticles({
        type: "script",
        article: "u:dev:MediaWiki:I18n-js/code.js"
    });
});