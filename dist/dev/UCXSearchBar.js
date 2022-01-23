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
				name: "go",
				value: "Go",
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

	var scroll_index = -1;

	function update_linksuggest(container_selector){
		var search_query = $(container_selector + " .wiki-tools__search-input").val().trim();
		if(!search_query){
			$(container_selector + " .wiki-tools__search-linksuggest-list").attr("style", "display: none !important;");
			scroll_index = -1;
			$(".wiki-tools__search-linksuggest-list-selected").removeClass("wiki-tools__search-linksuggest-list-selected");
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
					"data-search-value": suggestion,
					append: $('<a href="' + ScriptPath + "/wiki/" + suggestion.replaceAll('"', "&quot;") + '">' + suggestion.replace(new RegExp("(" + search_query + ")", "gi"), "<b>$1</b>") + "</a>")
				}));
			});
			$(container_selector + " .wiki-tools__search-linksuggest-list > ul").append($("<li>", {
				"data-search-value": search_query,
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

	function scroll_linksuggest(container_selector, pressed_key){
		var li_array = $(container_selector + " .wiki-tools__search-linksuggest-list > ul > li");
		if(pressed_key == 40){// down arrow key
			scroll_index++;
			if(scroll_index != 0){
				li_array.eq(scroll_index - 1).removeClass("wiki-tools__search-linksuggest-list-selected");
			}
			if(li_array[scroll_index] === undefined){
				scroll_index = 0;
			}
			li_array.eq(scroll_index).addClass("wiki-tools__search-linksuggest-list-selected");
			$(container_selector + " .wiki-tools__search-input").val(li_array.eq(scroll_index).attr("data-search-value"));
		}
		if(pressed_key == 38){// up arrow key
			if(scroll_index == -1){
				scroll_index = li_array.length - 1;
			} else {
				li_array.eq(scroll_index).removeClass("wiki-tools__search-linksuggest-list-selected");
				scroll_index--;
			}
			if(li_array[scroll_index] === undefined){
				scroll_index = li_array.length - 1;
			}
			li_array.eq(scroll_index).addClass("wiki-tools__search-linksuggest-list-selected");
			$(container_selector + " .wiki-tools__search-input").val(li_array.eq(scroll_index).attr("data-search-value"));
		}
	}
	
	$(window).on("keydown", function(event){
		if($(".fandom-community-header__top-container .wiki-tools__search-linksuggest-list").attr("style") == "display: block !important;"){
			scroll_linksuggest(".fandom-community-header__top-container", event.which);
		}
		if($(".fandom-sticky-header .wiki-tools__search-linksuggest-list").attr("style") == "display: block !important;"){
			scroll_linksuggest(".fandom-sticky-header", event.which);
		}
	});

	$(window).on("click", function(event){
		if($(".fandom-community-header__top-container .wiki-tools__search-linksuggest-list").attr("style") == "display: block !important;"){
			if(!$(".fandom-community-header__top-container .wiki-tools__search-container").get(0).contains(event.target)){
				$(".fandom-community-header__top-container .wiki-tools__search-linksuggest-list").attr("style", "display: none !important;");
				scroll_index = -1;
				$(".wiki-tools__search-linksuggest-list-selected").removeClass("wiki-tools__search-linksuggest-list-selected");
			}
		}
		if($(".fandom-sticky-header .wiki-tools__search-linksuggest-list").attr("style") == "display: block !important;"){
			if(!$(".fandom-sticky-header .wiki-tools__search-container").get(0).contains(event.target)){
				$(".fandom-sticky-header .wiki-tools__search-linksuggest-list").attr("style", "display: none !important;");
				scroll_index = -1;
				$(".wiki-tools__search-linksuggest-list-selected").removeClass("wiki-tools__search-linksuggest-list-selected");
			}
		}
	});
});