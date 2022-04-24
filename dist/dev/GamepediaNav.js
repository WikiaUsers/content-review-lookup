(function () {
	// Default configs, runOnFandom is false and replaceLinks is true.
	var config = $.extend({
		replaceLinks: true
	}, window.GamepediaNav);
	// Checks if replaceLinks is set to false, if so it doesn't run the JS.
	if (config.replaceLinks) {
		/// https://www.fandom.com links to https://gamepedia.io
		$(".is-gamepedia .global-footer__header a, .is-gamepedia .global-navigation__logo").attr("href", "https://web.archive.org/web/20220312015146/https://www.gamepedia.io");
		/// Fandom text to Gamepedia text and https://www.fandom.com to https://www.gamepedia.io
		$('.is-gamepedia .global-footer__link[data-tracking-label="explore.fandom"]').text('Gamepedia').attr("href", "https://web.archive.org/web/20220312015146/https://www.gamepedia.io");
		/// https://community.fandom.com/wiki/Help:Contents to https://help.fandom.com/wiki/
		$('.is-gamepedia .global-footer__link[data-tracking-label="community.help"]').attr("href", "https://help.fandom.com/wiki/");
		/// https://www.fandom.com/about to https://www.gamepedia.io/about
		$('.is-gamepedia .global-footer__link[data-tracking-label="company-overview.about"]').attr("href", "https://web.archive.org/web/20220312015146/https://www.gamepedia.io/about");
		/// https://fandom.zendesk.com/ to https://support.gamepedia.com/hc/en-us
		$('.is-gamepedia .global-footer__link[data-tracking-label="community.support"]').attr("href", "https://support.gamepedia.com/hc/en-us");
		/// https://www.fandom.com/about#contact to https://help.fandom.com/wiki/How_to_contact_Gamepedia
		$('.is-gamepedia .global-footer__link[data-tracking-label="company-overview.contact"]').attr("href", "https://help.fandom.com/wiki/How_to_contact_Gamepedia");
		/// Change Advertise Section h3 text to Gamepedia Wikis h3 text
		$(".is-gamepedia section.global-footer__section.global-footer__section-advertise h3").text("Gamepedia Wikis");
		/// Media Kit text to Minecraft Wiki text and https://about.fandom.com/mediakit to https://minecraft.fandom.com/wiki/Minecraft_Wiki
		$('.is-gamepedia .global-footer__link[data-tracking-label="advertise.media-kit"]').text("Minecraft Wiki").attr("href", "https://minecraft.fandom.com/wiki/Minecraft_Wiki");
		/// Fandomatic text to Terraria Wiki text and https://fandomatic.com to https://terraria.fandom.com/wiki/Terraria_Wiki
		$('.is-gamepedia .global-footer__link[data-tracking-label="advertise.fandomatic"]').text("Terraria Wiki").attr("href", "https://terraria.fandom.com/wiki/Terraria_Wiki");
		/// Contact text to Zelda Wiki text and https://about.fandom.com/mediakit#contact to https://zelda.fandom.com/wiki/Main_Page
		$('.is-gamepedia .global-footer__link[data-tracking-label="advertise.contact"]').text("Zelda Wiki").attr("href", "https://zelda.fandom.com/wiki/Main_Page");
		/// Community Central text to Wikiconnect text and https://community.fandom.com/wiki/Community_Central to https://www.gamepedia.io/wikiconnect
		$('.is-gamepedia .global-footer__link[data-tracking-label="community.community-central"]').text("Wikiconnect").attr("href", "https://web.archive.org/web/20220312015146/https://www.gamepedia.io/wikiconnect");
		/// Remove What is Fandom?
		$('.is-gamepedia .global-footer__link[data-tracking-label="company-overview.what-is-fandom"]').remove();
		/// Fandom Apps text to Curse LLC Apps text and Take your favorite fandoms with you and never miss a beat. text to Take your favorite Gamepedia wikis wherever you go.
		var h3 = document.querySelector(".is-gamepedia .global-footer__section-fandom-apps h3");
			h3.textContent = "Gamepedia LLC Apps";
			h3.nextSibling.nodeValue = "Take your favourite Gamepedia Wikis wherever you go.";
		/// All Gamepedia Wikis are now represented properly
		$(".is-gamepedia .global-footer__bottom > div:first-child").text(mw.config.get("wgSiteName") + " is a Gamepedia Wiki.");
	}
})();