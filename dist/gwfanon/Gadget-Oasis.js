// Copied from https://dev.fandom.com/wiki/MediaWiki:OasisRevived.js?action=edit&oldid=183753
$.when($.ready, mw.loader.using(["mediawiki.api", "mediawiki.jqueryMsg"])).then(function(){
	return new mw.Api().loadMessagesIfMissing(["global-navigation-search-placeholder-inactive", "global-navigation-search-placeholder-in-wiki", "recentchanges","mediastatistics-header-video", "images"]);
}).then(function(){
	//prevent double loading
	if( $(document.body).hasClass("oasis-is-revived") ) {
		return;
	}

	var oasisRevivedClass = $(document.body).addClass("oasis-is-revived");

	//Search bar in global nav
	var search_container = $("<form>", {
		class: "global-navigation__search-container",
		action: mw.config.get("wgScriptPath") + "/wiki/Special:Search",
	});

	$(".global-navigation__search").remove();
	$(".global-navigation__bottom").append(search_container);

	var search_mainDiv = $("<div>").addClass("global-navigation__search");
	
	var search_toggle = $("<div>").addClass("global-navigation__search-toggle");
	
	var search_toggleIconSmall = $('<svg class="wds-icon wds-icon-small global-navigation__search-toggle-icon"><use xlink:href="#wds-icons-magnifying-glass-small"></use></svg>');
	
	var search_toggleIcon = $('<svg class="wds-icon wds-global-navigation__search-toggle-icon"><use xlink:href="#wds-icons-magnifying-glass"></use></svg>');
	
	var search_toggleText = $("<span>", {
		class: "global-navigation__search-toggle-text",
		text: mw.msg("global-navigation-search-placeholder-inactive"),
	});
	
	var search_inputWrapper = $("<div>").addClass("global-navigation__search-input-wrapper");
	
	var search_boxDiv = $("<div>")
		.addClass("wds-dropdown")
		.addClass("global-navigation__suggestions-anchor")
		.addClass("wds-no-chevron");
	
	var search_box = $("<input>", {
		type: "search",
		class: "global-navigation__search-input",
		name: "query",
		autocomplete: "off",
		"data-suggestions-param-name": "query",
		"data-suggestions-tracking-label": "search-suggestion",
		placeholder: mw.msg("global-navigation-search-placeholder-in-wiki").replace("$1", mw.config.get("wgSiteName") ),
	});
	
	var search_boxHidden = $("<input>", {
		type: "hidden",
		name: "navigationSearch",
		value: "true",
	});
	
	$(search_container).append(search_mainDiv);
	$(search_mainDiv).append(search_toggle, search_inputWrapper);
	$(search_toggle).append(search_toggleIconSmall, search_toggleIcon, search_toggleText);
	$(search_inputWrapper).append(search_boxDiv);
	$(search_boxDiv).append(search_box, search_boxHidden);
});