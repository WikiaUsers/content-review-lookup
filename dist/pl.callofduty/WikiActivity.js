/**
 * Skrypt uzupełnia działanie skryptu dev:WikiActivity, dodając link do aktywności na wiki
 * w rozwijanym menu Eksploruj w nawigacji wiki.
 * 
 * @author  MGRINZ
 */

$(function () {
	var api = new mw.Api();
	var config = mw.config.get(["wgServer", "wgArticlePath"]);
	var wikiActivityHref = config.wgServer + config.wgArticlePath.slice(0, -2) + "Specjalna:Aktywność_na_wiki";
	var $exploreDropdown = $('.wds-dropdown li > a[href$="Specjalna:RecentChanges"]').parents("ul").eq(0);
	var $wikiActivityItem = $("<a>")
		.attr("href", wikiActivityHref);

	api.getMessages(["activity-wiki-activity-tab-label"]).then(function (result) {
		$wikiActivityItem.text(result["activity-wiki-activity-tab-label"]);
		$exploreDropdown.prepend($wikiActivityItem);
		$wikiActivityItem.wrap("<li></li>");		
	});
});