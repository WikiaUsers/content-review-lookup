// Auto-fill the inputbox form on [[Project:Image Bases]] with the user's username.
mw.hook('wikipage.content').add(function ($content) {
	// edit to configure where the script will run
	const PAGE_NAME = "Wings_of_Fire_Fanon_Wiki:Image_Bases";

	const wikiConfig = mw.config.get(["wgPageName", "wgUserName"]);

	if (!wikiConfig.wgUserName || wikiConfig.wgPageName !== PAGE_NAME) return;

	const form = $content.find("#new-base-page-form");

	if (!form) return;

	$content.find(".mw-inputbox-createbox")[0].value = wikiConfig.wgUserName;
	$content.find("input[name='preloadparams[]'")[0].value = wikiConfig.wgUserName;
});