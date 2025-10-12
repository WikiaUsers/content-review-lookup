// Searchbutton ----------------------------------------------------------------
(function($){
	// Prevent double load
	window.xorumwiki = window.xorumwiki || {};
	if (window.xorumwiki.searchButton) return;
	window.xorumwiki.searchButton = true;

	// Magnify icon
	var TOOLBAR_ICON = '<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-magnifying-glass-small"></use></svg>';

	function main() {
		// Delay add to try to make it more consitent
		setTimeout(searchButtonHtml, 500);
	}

	function searchButtonHtml() {
		var $buttonNav = $("<a>")
			.attr("href", mw.util.getUrl("Special:Search"))
			.addClass("wds-button wds-is-secondary is-hidden-on-smaller-breakpoints")
			.attr("title", "Search")
			.attr("data-tracking", "search")
			.html(TOOLBAR_ICON);

		var $buttonSticky = $("<a>")
			.attr("href", mw.util.getUrl("Special:Search"))
			.addClass("wds-button wds-is-text is-hidden-on-smaller-breakpoints")
			.attr("title", "Search")
			.attr("data-tracking", "search")
			.html(TOOLBAR_ICON);

		// Insert to nav
		$(".wiki-tools:has(.wds-is-secondary[title='Discuss']) > .wds-button:not([class*='uwe-']):first-of-type").before($buttonNav);
		$(".wiki-tools:has(.wds-is-text[title='Discuss']) > .wds-button:not([class*='uwe-']):first-of-type").before($buttonSticky);
	}

	main();
})(jQuery);