// GamepediaTheme.js, by Sophiedp, Arashiryuu0 and Aeywoo
mw.loader.using(["mediawiki.api"]).then(function() {
    if ($(document.body).hasClass("is-gamepedia") !== true) {
        return;
    }
    // Prevents double loading
    if ($(document.body).hasClass("gamepedia-footer")) {
        return;
    }
    var footerClass = $(document.body).addClass("gamepedia-footer");
    
    // -- Internationalization Function -- //
    function init(i18n) {
        var footer_link_gamepedia      = i18n.msg("footer-link-gamepedia").plain();
        var footer_link_wikiconnect    = i18n.msg("footer-link-wikiconnect").plain();
        var footer_gpwikis_header      = i18n.msg("footer-gpwikis-header").plain();
        var footer_gpwikis_minecraft   = i18n.msg("footer-gpwikis-minecraft").plain();
        var footer_gpwikis_terraria    = i18n.msg("footer-gpwikis-terraria").plain();
        var footer_gpwikis_zelda       = i18n.msg("footer-gpwikis-zelda").plain();
        var footer_curse_apps_header   = i18n.msg("footer-curse-apps-header").plain();
        var footer_curse_apps_desc     = i18n.msg("footer-curse-apps-desc").plain();
        var footer_bottom_bar = i18n.msg("footer-bottom-bar", mw.config.get("wgSiteName")).plain();
        
        // -- Explore Properties Section -- //
        $('.is-gamepedia .global-footer__link[data-tracking-label="explore.fandom"]')
            .attr("href", "https://web.archive.org/web/20210901231110/https://www.gamepedia.com/")
            .text(footer_link_gamepedia);
        
        // -- Advertise (Gamepedia Wikis) Section -- //
        $(".is-gamepedia section.global-footer__section.global-footer__section-advertise h3")
            .text(footer_gpwikis_header);
        /// -- Gamepedia Wikis; Minecraft, Terraria and Zelda -- ///
        $('.is-gamepedia .global-footer__link[data-tracking-label="advertise.media-kit"]')
            .attr("href", "https://minecraft.fandom.com/wiki/Minecraft_Wiki")
            .text(footer_gpwikis_minecraft);
        $('.is-gamepedia .global-footer__link[data-tracking-label="advertise.fandomatic"]')
            .attr("href", "https://terraria.fandom.com/wiki/Terraria_Wiki")
            .text(footer_gpwikis_terraria);
        $('.is-gamepedia .global-footer__link[data-tracking-label="advertise.contact"]')
            .attr("href", "https://zelda.fandom.com/wiki/Main_Page")
            .text(footer_gpwikis_zelda);
        
        // -- Fandom Apps (Curse Apps) Section -- //
        var gpFooter = document.querySelector(".is-gamepedia .global-footer__section-fandom-apps h3");
        if (gpFooter) {
            gpFooter.textContent = (footer_curse_apps_header);
            gpFooter.nextSibling.nodeValue = (footer_curse_apps_desc);
        }
        
        // -- Global Footer Bottom Bar -- //
        $(".is-gamepedia .global-footer__bottom > div:first-child").text(footer_bottom_bar);
    
        // -- Community Section -- //
        $('.is-gamepedia .global-footer__link[data-tracking-label="community.community-central"]')
            .text(footer_link_wikiconnect)
            .attr("href", "https://web.archive.org/web/20210803141801/https://www.gamepedia.com/wikiconnect");
        $('.is-gamepedia .global-footer__link[data-tracking-label="community.help"]')
            .attr("href", "https://help.fandom.com/wiki/");
    }
    
    // -- Global Navigation Bar -- //
    /// "Fandom.com" to "Gamepedia.com"
    $(".is-gamepedia .global-footer__header a, .is-gamepedia .global-navigation__logo")
        .attr("href", "https://web.archive.org/web/20210901231110/https://www.gamepedia.com/");
    
    // -- Overview Section -- //
    /// "Fandom.com/about" to "Gamepedia.com/about"
    $('.is-gamepedia .global-footer__link[data-tracking-label="company-overview.about"]').attr("href", "https://web.archive.org/web/20210827172724/https://www.gamepedia.com/about");
    /// "Fandom.com/about#contact" to "Help.fandom.com/wiki/How_to_contact_Gamepedia"
    $('.is-gamepedia .global-footer__link[data-tracking-label="company-overview.contact"]')
        .attr("href", "https://help.fandom.com/wiki/How_to_contact_Gamepedia");
    /// Remove "What is Fandom?"
    $('.is-gamepedia .global-footer__link[data-tracking-label="company-overview.what-is-fandom"]')
        .remove();
    
    // -- Fandom Apps Section -- //
    /// Duplication of the "Fandom Apps" section
    var curseforge_app_section = $("<section>")
        .addClass("global-footer__section")
        .addClass("global-footer__section-curseforge-stores");
    var curseforge_app_svg = $('<svg class="global-footer__icon"><use xlink:href="#wds-brand-fandom-logo-store"></use></svg>');
    var curseforge_app_store = $("<ul>")
        .addClass("global-footer__links");
    var curseforge_app_store_apple = $('<li><a href="https://download.curseforge.com/" class="global-footer__link" data-tracking-label="community-apps.windows-app" aria-label="CurseForge\'s Windows App"><img class="global-footer__link-icon" src="https://static.wikia.nocookie.net/central/images/4/48/Aeywoo_-_Get_It_On_Badge_Windows.png" alt="Get It On Windows"></img></a></li>');
    var curseforge_app_store_google = $('<li><a href="https://download.curseforge.com/" class="global-footer__link" data-tracking-label="community-apps.macos-app" aria-label="CurseForge\'s MacOS App"><img class="global-footer__link-icon" src="https://static.wikia.nocookie.net/central/images/b/b3/Aeywoo_-_Get_It_On_Badge_MacOS.png" alt="Get It On MacOS"></img></a></li>');
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