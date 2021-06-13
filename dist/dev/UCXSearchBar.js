$.when($.ready, mw.loader.using(["mediawiki.api", "mediawiki.jqueryMsg"])).then(function(){
    return new mw.Api().loadMessagesIfMissing(["search-modal-see-all-results", "tooltip-search", "tooltip-search-go"]);
}).then(function(){
	if (mw.config.get("skin") !== "fandomdesktop"){
		return;
	}
	
	var search_icon = $('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-magnifying-glass-small"></use></svg>');

	var search_form = $("<form>")
		.addClass("wiki-tools__search-container")
		.addClass("wds-dropdown")
		.attr("action", "/wiki/Special:Search");

	var search_box = $("<input>")
		.addClass("wiki-tools__search-input")
		.attr("type", "search")
		.attr("name", "search")
		.attr("placeholder", mw.msg("tooltip-search"))
		.attr("title", mw.msg("tooltip-search"))
		.attr("autocomplete", "off");

	var search_hidden = $("<input>")
		.attr("type", "hidden")
		.attr("name", "title")
		.attr("value", "Special:Search");

	var search_button = $("<button>")
		.addClass("wiki-tools__search-button")
		.addClass("wds-button")
		.addClass("wds-is-secondary")
		.attr("type", "submit")
		.attr("name", "go")
		.attr("value", "Go")
		.attr("title", mw.msg("tooltip-search-go"))
		.append(search_icon);

	var search_linksuggest_box = $("<ul>")
		.addClass("wds-list")
		.addClass("wds-is-linked");

	var search_linksuggest_box_div = $("<div>")
		.addClass("wiki-tools__search-linksuggest-list")
		.addClass("wds-dropdown__content")
		.addClass("wds-is-not-scrollable")
		.attr("style", "display: none !important;")
		.append(search_linksuggest_box);

	search_form.append(search_box, search_hidden, search_button, search_linksuggest_box_div);

	$("div.wiki-tools.wds-button-group").prepend(search_form);

	function update_linksuggest(container_selector){
		var search_query = $(container_selector +" .wiki-tools__search-input").val().trim();
		if(!search_query){
			$(container_selector + " .wiki-tools__search-linksuggest-list").attr("style", "display: none !important;");
			return;
		}
		new mw.Api().get({
			action: "linksuggest",
			get: "suggestions",
			query: search_query,
			format: "json"
		}).then(function(data){
			$(container_selector + " .wiki-tools__search-linksuggest-list > ul").empty();
			data.linksuggest.result.suggestions.forEach(function(suggestion){
				$(container_selector + " .wiki-tools__search-linksuggest-list  > ul").append($("<li>")
					.attr("title", suggestion)
					.append($('<a href="/wiki/' + suggestion + '">' + suggestion.replace(new RegExp("(" + search_query + ")", "gi"), "<b>$1</b>") + "</a>"))
				);
			});
			$(container_selector + " .wiki-tools__search-linksuggest-list  > ul").append($("<li>")
				.append($('<a class="wiki-tools__search-linksuggest-list-see-all" href="/wiki/Special:Search?query=' + search_query + '&scope=internal&navigationSearch=true">' + mw.msg("search-modal-see-all-results", search_query) + "</a>"))
			);
			$(container_selector + " .wiki-tools__search-linksuggest-list").attr("style", "display: block !important;");
		});
	}

	$(".fandom-community-header__top-container .wiki-tools__search-input").on("input paste", function(){
		update_linksuggest(".fandom-community-header__top-container");
	});

	$(".fandom-sticky-header .wiki-tools__search-input").on("input paste", function(){
		update_linksuggest(".fandom-sticky-header");
	});

	$(window).on("click", function(event){
		if($(".fandom-community-header__top-container .wiki-tools__search-linksuggest-list").attr("style") == "display: block !important;"){
			if(!$(".fandom-community-header__top-container .wiki-tools__search-container").get(0).contains(event.target)){
				$(".fandom-community-header__top-container .wiki-tools__search-linksuggest-list").attr("style", "display: none !important;");
			}
		}
		if($(".fandom-sticky-header .wiki-tools__search-linksuggest-list").attr("style") == "display: block !important;"){
			if(!$(".fandom-sticky-header .wiki-tools__search-container").get(0).contains(event.target)){
				$(".fandom-sticky-header .wiki-tools__search-linksuggest-list").attr("style", "display: none !important;");
			}
		}
	});
});