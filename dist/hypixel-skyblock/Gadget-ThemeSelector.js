(function($){
	// prevent double load
	window.hsbwiki = window.hsbwiki || {};
	if (window.hsbwiki.themeSelectorLoaded) return;
	window.hsbwiki.themeSelectorLoaded = true;
	
	var SELECTED_CACHE_KEY = 'hsw-themeselector-selected';
	var stylesheetPrefix = "https://hypixel-skyblock.fandom.com/index.php?action=raw&ctype=text/css&title=";
	var themes = [
		{
			id: 'default',
			name: 'Default',
			note: 'Light & Dark',
		},
		{
			id: 'crimson-isle',
			name: "The Crimson Isle",
			note: 'Light & Dark',
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ThemeSelector.js/TheCrimsonIsle.css",
			image: "https://static.wikia.nocookie.net/hypixel-skyblock/images/5/59/Sitebanner-02-0.png/revision/latest?cb=20221226174049"
		},
		{
			id: 'village',
			name: 'Village',
			note: 'Light & Dark',
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ThemeSelector.js/Village.css",
			image: "https://static.wikia.nocookie.net/hypixel-skyblock/images/a/a4/Sitebanner-01-0.png/revision/latest?cb=20221226172132&format=orginal"
		},
		{
			id: 'winter',
			name: "Winter",
			note: 'Light & Dark',
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ThemeSelector.js/Winter.css",
			image: "https://static.wikia.nocookie.net/hypixel-skyblock/images/1/1e/Sitebanner-03-0.png/revision/latest?cb=20221226173630"
		},
		{
			id: 'garden',
			name: "Garden",
			note: 'Light & Dark',
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ThemeSelector.js/Garden.css",
			image: "https://static.wikia.nocookie.net/hypixel-skyblock/images/7/7f/Sitebanner-04-0.jpg/revision/latest?cb=20230422175519"
		},
		{
			id: 'easter',
			name: "Easter",
			note: 'Light mode banner image only',
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ThemeSelector.js/Easter.css",
			image: "https://static.wikia.nocookie.net/hypixel-skyblock/images/b/be/Sitebanner-05-0.png/revision/latest?cb=20230429194454"
		},
	];
	
	// <a href="https://www.flaticon.com/free-icons/color-palette" title="color palette icons">Color palette icons created by Pixel perfect - Flaticon</a>
	var TOOLBAR_ICON = '<svg class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg" width="682.7" height="682.7" version="1.0" viewBox="0 0 512 512"><path d="M203 15.2c-2.8.7-21.4 18.8-89.6 87.1l-86.2 86.2-4.1 8.5a61.4 61.4 0 0 0 0 57c4.1 8.5 4.4 8.8 67.8 72.3 67.1 67.3 70.7 70.6 84.4 75.6 6.4 2.3 8.7 2.6 20.2 2.6 10.2 0 14.2-.4 18.5-1.9a66.8 66.8 0 0 0 21.5-11.7c3.3-2.6 42.5-41.4 87.2-86.1 56.8-56.8 81.7-82.4 82.8-85a25.4 25.4 0 0 0-.5-18.2c-1.3-2.8-31.4-33.5-92.7-94.8C233.9 28.5 221 16 217.5 15.1a26.5 26.5 0 0 0-14.5.1zm80.8 123.1c57 57 72 72.5 71 73.5-.9.9-33.2 1.2-146 1.2-79.6 0-144.8-.3-144.8-.7C64 211.1 209.4 66 210.5 66c.6 0 33.5 32.5 73.3 72.3zM412.1 257c-5.5 1.3-8.2 4.1-16.3 17.1-15.6 24.8-28.1 50.6-31.4 64.4a53.3 53.3 0 0 0 15 51.1A48.7 48.7 0 0 0 416 405c14.6 0 25.9-4.8 36.6-15.4 16.2-16.1 20.3-36.2 12.3-59.6a356.9 356.9 0 0 0-34.1-64.5c-4.9-7.3-11.2-10.1-18.7-8.5zM53.9 429.3a27.3 27.3 0 0 0-7.4 6.6c-2.7 3.9-3 5-3 12 0 6.8.3 8.2 2.7 11.7 1.5 2.1 4.4 5 6.5 6.4l3.7 2.5h399.2l3.7-2.5c2.1-1.4 5-4.3 6.5-6.4 2.4-3.5 2.7-4.9 2.7-11.6 0-6.7-.3-8.1-2.7-11.6-1.5-2.1-4.4-5-6.5-6.4l-3.7-2.5-198.6-.3-198.7-.2-4.4 2.3z"/></svg>';
	
	var CONTENT_ID = 'hsw-themeselector-dropdown';
	
	function main() {
		// Not sure why this sometimes doesn't show up on page load; attempting to delay add a bit to try and make it more consitent
		setTimeout(initDropdownHtml, 600);
		
		// we still want to trigger any selected stylesheets right away though
		updateStylesheets();
	}
	
	function initDropdownHtml() {
		$('.'+CONTENT_ID).remove();
		var $dropdown = $("<div>").addClass("wds-button wds-is-secondary wds-dropdown "+CONTENT_ID);
		var $toggle = $("<a>").addClass("wds-dropdown__toggle").attr("title", "Wiki Theme Selector").html(TOOLBAR_ICON).appendTo($dropdown);
		$("<div>").addClass("wds-dropdown__content wds-is-right-aligned").appendTo($dropdown);
		
		// Insert dropdown to nav
		$(".wiki-tools > .wds-button:not([class*='hsw-']):last-of-type").after($dropdown);
		
		update();
	}
	
	function update() {
		updateStylesheets();
		renderThemesList();
	}
	
	function updateStylesheets() {
		clearStylesheets();
		
		var id = getSelectedId();
		if(id) {
			var href = themes.find(function(t){ return t.id == id; }).stylesheet;
			addStylesheetToHead(href);
		}
	}
	
	function renderThemesList() {
		var selectedId = getSelectedId();
		var $content = $("."+CONTENT_ID+" .wds-dropdown__content");
		
		$content.html("");
		// Add header
		$('<div class="hsw-theme-header"><strong>Wiki Theme Selector</strong></div>').appendTo($content);
		
		// Add list
		var $list = $("<ul>").addClass("hsw-theme-list").appendTo($content);
		
		themes.forEach(function(theme, i){
			var $li = $("<li>").html(renderThemeBox(theme)).addClass(theme.id+(theme.id == selectedId ? ' selected' : '')).appendTo($list).on('click', function(){
				selectThemeId(theme.id);
				update();
			});
		});
	}
	
	function renderThemeBox(theme) {
		return [
			"<div class='hsw-theme-box' "+(theme.image ? "style='background-image:url("+theme.image+");'" : "")+">",
				"<div class='theme-title'>"+theme.name+"</div>",
				(theme.note ? "<div class='theme-note'>"+theme.note+"</div>" : ""),
			"</div>"
		].join("");
	}
	
	function getSelectedId() {
		var id = localStorage.getItem(SELECTED_CACHE_KEY);
		if(!id || !themes.find(function(t){ return t.id == id; })){ id = 'default'; }
		return id;
	}
	
	function selectThemeId(id) {
		saveSelectedId(id == 'default' ? null : id);
	}
	
	function saveSelectedId(id) {
		if(id) {
			localStorage.setItem(SELECTED_CACHE_KEY, id);
		} else {
			localStorage.removeItem(SELECTED_CACHE_KEY);
		}
	}
	
	var STYLESHEET_CLASS = "hsw-themeselector-stylesheet";
	function addStylesheetToHead(href) {
		$("head").append("<link rel='stylesheet' href='"+href+"' type='text/css' class='"+STYLESHEET_CLASS+"'>");
	}
	
	function clearStylesheets() {
		$("link."+STYLESHEET_CLASS).remove();
	}
	
	main();
})(jQuery);