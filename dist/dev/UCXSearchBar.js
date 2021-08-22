$.when(mw.loader.using(["mediawiki.api", "mediawiki.jqueryMsg"])).then(function(){
    return new mw.Api().loadMessagesIfMissing(["searchsuggest-search", "tooltip-search", "tooltip-search-go", "search-modal-see-all-results"]);
}).then(function(){
	if(window.UCXSEARCHBARLoaded || mw.config.get("skin") !== "fandomdesktop"){
		return;
	}
	window.UCXSEARCHBARLoaded = true;
	
	var ScriptPath = mw.config.get("wgScriptPath");

	var search_form = $("<form>", {
		class: "wiki-tools__search-container wds-dropdown",
		action: ScriptPath + "/wiki/Special:Search",
		append: [
			$("<input>", {
				class: "wiki-tools__search-input",
				type: "search",
				name: "search",
				placeholder: mw.msg("searchsuggest-search"),
				title: mw.msg("tooltip-search"),
				autocomplete: "off"
			}),
			$("<input>", {
				type: "hidden",
				name: "title",
				value: "Special:Search"
			}),
			$("<button>", {
				class: "wiki-tools__search-button wds-button wds-is-secondary",
				type: "submit",
				title: mw.msg("tooltip-search-go"),
				append: $('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-magnifying-glass-small"></use></svg>')
			}),
			$("<div>", {
				class: "wiki-tools__search-linksuggest-list wds-dropdown__content wds-is-not-scrollable",
				style: "display: none !important;",
				append: $("<ul>", {
					class: "wds-list wds-is-linked"
				})
			})
		]
	});

	$(".wiki-tools").addClass("wiki-tools__ucxsearch"); // trigger hiding of fake search box to prevent content shift
	$(".wiki-tools__search").replaceWith(search_form);

	function update_linksuggest(container_selector){
		var search_query = $(container_selector + " .wiki-tools__search-input").val().trim();
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
				$(container_selector + " .wiki-tools__search-linksuggest-list > ul").append($("<li>", {
					title: suggestion,
					append: $('<a href="' + ScriptPath + "/wiki/" + suggestion + '">' + suggestion.replace(new RegExp("(" + search_query + ")", "gi"), "<b>$1</b>") + "</a>")
				}));
			});
			$(container_selector + " .wiki-tools__search-linksuggest-list > ul").append($("<li>", {
				append: $("<a>", {
					class: "wiki-tools__search-linksuggest-list-see-all",
					href: ScriptPath + "/wiki/Special:Search?query=" + search_query,
					text: mw.msg("search-modal-see-all-results", search_query)
				})
			}));
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