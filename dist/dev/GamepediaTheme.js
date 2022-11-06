// GamepediaTheme.js, by Sophiedp and Arashiryuu, configured by Aeywoo
// Inspired by Gamepedia's Second to last Footer Design
mw.loader.using(['mediawiki.api']).then(function() {
	// Checks is the Wiki has is-gamepedia in the websites document body class
	if($(document.body).hasClass("is-gamepedia") !== true) {
		return;
	}
	// Prevents double loading
	if ($(document.body).hasClass("gamepedia-footer")) {
		return;
	}
	var footerClass = $(document.body).addClass("gamepedia-footer");
	
    // -- Miscellaneous -- //
    /// https://www.fandom.com links to https://gamepedia.io
    $(".is-gamepedia .global-footer__header a, .is-gamepedia .global-navigation__logo").attr("href", "https://web.archive.org/web/20220312015146/https://www.gamepedia.io");
    // -- Explore Properties Section -- //
    /// Fandom text to Gamepedia text and https://www.fandom.com to https://www.gamepedia.io
    $(".is-gamepedia .global-footer__link[data-tracking-label='explore.fandom']").text("Gamepedia").attr("href", "https://web.archive.org/web/20220312015146/https://www.gamepedia.io");
    
    // -- Overview Section -- //
    /// https://www.fandom.com/about to https://www.gamepedia.io/about
    $(".is-gamepedia .global-footer__link[data-tracking-label='company-overview.about']").attr("href", "https://web.archive.org/web/20220312015146/https://www.gamepedia.io/about");
    /// https://www.fandom.com/careers to https://web.archive.org/web/20190327202749/https://www.curse.com/careers/
    $(".is-gamepedia .global-footer__link[data-tracking-label='company-overview.careers']").attr("href", "https://web.archive.org/web/20190327202749/https://www.curse.com/careers/");
    /// https://www.fandom.com/about#contact to https://help.fandom.com/wiki/How_to_contact_Gamepedia
    $(".is-gamepedia .global-footer__link[data-tracking-label='company-overview.contact']").attr("href", "https://help.fandom.com/wiki/How_to_contact_Gamepedia");
    /// Remove What is Fandom?
    $(".is-gamepedia .global-footer__link[data-tracking-label='company-overview.what-is-fandom']").remove();
    
    // -- Community Section -- //
    /// Community Central text to Wikiconnect text and https://community.fandom.com/wiki/Community_Central to https://www.gamepedia.io/wikiconnect
    $(".is-gamepedia .global-footer__link[data-tracking-label='community.community-central']").text("Wikiconnect").attr("href", "https://web.archive.org/web/20220312015146/https://www.gamepedia.io/wikiconnect");
    /// https://fandom.zendesk.com/ to https://support.gamepedia.com/hc/en-us
    $(".is-gamepedia .global-footer__link[data-tracking-label='community.support']").attr("href", "https://support.gamepedia.com/hc/en-us");
    /// https://community.fandom.com/wiki/Help:Contents to https://help.fandom.com/wiki/
    $(".is-gamepedia .global-footer__link[data-tracking-label='community.help']").attr("href", "https://help.fandom.com/wiki/");
    
    // -- Advertise (Gamepedia Wikis) Section -- //
    /// Change Advertise Section h3 text to Gamepedia Wikis h3 text
    $(".is-gamepedia section.global-footer__section.global-footer__section-advertise h3").text("Gamepedia Wikis");
    /// Media Kit text to Minecraft Wiki text and https://about.fandom.com/mediakit to https://minecraft.fandom.com/wiki/Minecraft_Wiki
    $(".is-gamepedia .global-footer__link[data-tracking-label='advertise.media-kit']").text("Minecraft Wiki").attr("href", "https://minecraft.fandom.com/wiki/Minecraft_Wiki");
    /// Fandomatic text to Terraria Wiki text and https://fandomatic.com to https://terraria.fandom.com/wiki/Terraria_Wiki
    $(".is-gamepedia .global-footer__link[data-tracking-label='advertise.fandomatic']").text("Terraria Wiki").attr("href", "https://terraria.fandom.com/wiki/Terraria_Wiki");
    /// Contact text to Zelda Wiki text and https://about.fandom.com/mediakit#contact to https://zelda.fandom.com/wiki/Main_Page
    $(".is-gamepedia .global-footer__link[data-tracking-label='advertise.contact']").text("Zelda Wiki").attr("href", "https://zelda.fandom.com/wiki/Main_Page");
    
    // -- Fandom Apps (Curse LLC Apps) Section -- //
    /// Fandom Apps text to Curse LLC Apps text and Take your favorite fandoms with you and never miss a beat. text to Take your favorite Gamepedia wikis wherever you go.
    var h3 = document.querySelector(".is-gamepedia .global-footer__section-fandom-apps h3");
    if (h3) {
        h3.textContent = "Curse LLC Apps";
        h3.nextSibling.nodeValue = "Take your favourite Curse applications wherever you go.";
    }
    /// Adding a custom app under the Fandom App, replaces where the D&D; Beyond app used to be.
    var curseforge_app_section = $("<section>")
    	.addClass("global-footer__section")
    	.addClass("global-footer__section-curseforge-stores");
	var curseforge_app_svg = $('<svg class="global-footer__icon"><use xlink:href="#wds-brand-fandom-logo-store"></use></svg>');
	var curseforge_app_stores = $('<ul class="global-footer__links"><li><a href="https://download.curseforge.com/" class="global-footer__link" data-tracking-label="community-apps.macos-app" aria-label="CurseForge\'s MacOS App"><img class="global-footer__link-icon" src="https://static.wikia.nocookie.net/central/images/4/48/Aeywoo_-_Get_It_On_Badge_Windows.png" alt="Get It On Windows"></img></a></li><li><a href="https://download.curseforge.com/" class="global-footer__link" data-tracking="community-apps.google-play" label="community-apps.windows-app" aria-label="CurseForge\'s Windows App"><img class="global-footer__link-icon" src="https://static.wikia.nocookie.net/central/images/b/b3/Aeywoo_-_Get_It_On_Badge_MacOS.png" alt="Get It On MacOS"></img></a></li></ul>');
	// Thanks for having unnamed divs in your footer Fandom.
	var global_footer_content = document.querySelector(".is-gamepedia .global-footer .global-footer__content");
    if (global_footer_content) {
    	$(global_footer_content).children().last().append(curseforge_app_section);
    	$(curseforge_app_section).append(curseforge_app_svg, curseforge_app_stores);
    }
    
    // -- Global Footer Bottom Bar -- //
    /// All Gamepedia Wikis are now represented properly
    $(".is-gamepedia .global-footer__bottom > div:first-child").text(mw.config.get("wgSiteName") + " is a Gamepedia Wiki.");
});