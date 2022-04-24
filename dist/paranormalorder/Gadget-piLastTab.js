/* Set the last tab as open by default in specific infoboxes */
mw.hook("wikipage.content").add(function() {
	if (!$(".portable-infobox.type-last-tab").length) return;
	switch (mw.config.get("skin")) {
	case "fandomdesktop":
		var pi_wdsTabs = $(".type-last-tab .pi-image-collection .wds-tabs");
		$(pi_wdsTabs).animate({ scrollLeft: pi_wdsTabs.width() }, 200);
		$(".type-last-tab .pi-image-collection.wds-tabber .wds-tabs__tab").last().click();
		break;
	case "oasis":
		$(".type-last-tab ul.pi-image-collection-tabs > li").last().click();
		break;
	}
});