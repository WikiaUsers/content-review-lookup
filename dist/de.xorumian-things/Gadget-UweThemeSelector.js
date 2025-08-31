(function($){
	// prevent double load
	window.xorumwiki = window.xorumwiki || {};
	if (window.xorumwiki.themeSelectorLoaded) return;
	window.xorumwiki.themeSelectorLoaded = true;
	
	var SELECTED_CACHE_KEY = 'uwe-themeselector-selected';
	var stylesheetPrefix = "https://xorumian-things.fandom.com/de/index.php?action=raw&ctype=text/css&title=";
	var themes = [
		{
			id: 'default',
			name: 'Standard',
			note: 'Light & Dark',
			image: "https://static.wikia.nocookie.net/xorumian-things/images/5/5c/BackgroundLight.png/revision/latest/scale-to-width-down/480?path-prefix=de"
		},
		{
			id: 'winter',
			name: "Winter",
			note: 'Light & Dark',
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-UweThemeSelector.js/Winter.css",
			image: "https://static.wikia.nocookie.net/xorumian-things/images/4/4d/BackgroundLightWinter.png/revision/latest/scale-to-width-down/480?path-prefix=de"
		},
	];
	
	// "https://www.svgrepo.com/svg/334028/landscape" By boxicons - CC Attribution License - slightly changed
	var TOOLBAR_ICON = '<svg class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg" width="682.7" height="682.7" version="1.0" viewBox="2 1 20 20"><path d="M3 20h18a1 1 0 0 0 .864-1.504l-7-12c-.359-.615-1.369-.613-1.729 0L9.866 12.1l-1.02-1.632A.998.998 0 0 0 8 10h-.001a1 1 0 0 0-.847.47l-5 8A1 1 0 0 0 3 20zM14 8.985 19.259 18h-5.704l-2.486-3.987L14 8.985zm-5.999 3.9L11.197 18H4.805l3.196-5.115zM6 8c1.654 0 3-1.346 3-3S7.654 2 6 2 3 3.346 3 5s1.346 3 3 3zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>';
	
	var CONTENT_ID = 'uwe-themeselector-dropdown';
	
	function main() {
		// Not sure why this sometimes doesn't show up on page load; attempting to delay add a bit to try and make it more consitent
		setTimeout(initDropdownHtml, 600);
		
		// we still want to trigger any selected stylesheets right away though
		updateStylesheets();
	}
	
	function initDropdownHtml() {
		$('.'+CONTENT_ID).remove();
		var $dropdown = $("<div>").addClass("wds-button wds-is-secondary wds-dropdown "+CONTENT_ID);
		var $toggle = $("<div>").addClass("wds-dropdown__toggle").attr("title", "Wiki Theme Selector").html(TOOLBAR_ICON).appendTo($dropdown);
		$("<div>").addClass("wds-dropdown__content wds-is-right-aligned").appendTo($dropdown);
		
		// Insert dropdown to nav
		$(".wiki-tools > .wds-button:not([class*='uwe-']):last-of-type").after($dropdown);
		
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
		$('<div class="uwe-theme-header"><strong>Wiki Theme Selector</strong></div>').appendTo($content);
		
		// Add list
		var $list = $("<ul>").addClass("uwe-theme-list").appendTo($content);
		
		themes.forEach(function(theme, i){
			var $li = $("<li>").html(renderThemeBox(theme)).addClass(theme.id+(theme.id == selectedId ? ' selected' : '')).appendTo($list).on('click', function(){
				selectThemeId(theme.id);
				update();
			});
		});
	}
	
	function renderThemeBox(theme) {
		return [
			"<div class='uwe-theme-box' "+(theme.image ? "style='background-image:url("+theme.image+");'" : "")+">",
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
	
	var STYLESHEET_CLASS = "uwe-themeselector-stylesheet";
	function addStylesheetToHead(href) {
		$("head").append("<link rel='stylesheet' href='"+href+"' type='text/css' class='"+STYLESHEET_CLASS+"'>");
	}
	
	function clearStylesheets() {
		$("link."+STYLESHEET_CLASS).remove();
	}
	
	main();
})(jQuery);