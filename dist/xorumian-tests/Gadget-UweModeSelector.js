(function($){
	// prevent double load
	window.xorumwiki = window.xorumwiki || {};
	if (window.xorumwiki.modeSelectorLoaded) return;
	window.xorumwiki.modeSelectorLoaded = true;
	
	var SELECTED_CACHE_KEY = 'uwe-themeselector-selected';
	var stylesheetPrefix = "https://xorumian-tests.fandom.com/index.php?action=raw&ctype=text/css&title=";
	var themes = [
		{
			id: 'default',
			name: 'Standard',
			note: 'Light & Dark',
			image: "https://static.wikia.nocookie.net/xorumian-things/images/5/5c/BackgroundLight.png/revision/latest/scale-to-width-down/480?path-prefix=de"
		},
		{
			id: 'german',
			name: "German",
			note: 'Light & Dark',
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-UweModeSelector.js/German.css",
			image: "https://static.wikia.nocookie.net/xorumian-things/images/0/09/TeamAkun.png/revision/latest/scale-to-width-down/480?path-prefix=de"
		},
		{
			id: 'developer',
			name: "Developer",
			note: 'Inspection Mode',
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-UweModeSelector.js/Developer.css",
			image: "https://static.wikia.nocookie.net/xorumian-things-pt/images/b/b1/BackgroundDeveloper.png/revision/latest/scale-to-width-down/480"
		},
	];
	
	// <a href="https://www.svgrepo.com/svg/487218/code">Icon created by Neuicons - Flaticon</a>
	var TOOLBAR_ICON = '<svg class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg" width="682.7" height="682.7" version="1.0" viewBox="3 3 18 18"><path d="M1.293,11.293l4-4A1,1,0,1,1,6.707,8.707L3.414,12l3.293,3.293a1,1,0,1,1-1.414,1.414l-4-4A1,1,0,0,1,1.293,11.293Zm17.414-4a1,1,0,1,0-1.414,1.414L20.586,12l-3.293,3.293a1,1,0,1,0,1.414,1.414l4-4a1,1,0,0,0,0-1.414ZM13.039,4.726l-4,14a1,1,0,0,0,.686,1.236A1.053,1.053,0,0,0,10,20a1,1,0,0,0,.961-.726l4-14a1,1,0,1,0-1.922-.548Z"></path></svg>';
	
	var CONTENT_ID = 'uwe-themeselector-dropdown';
	
	function main() {
		// Not sure why this sometimes doesn't show up on page load; attempting to delay add a bit to try and make it more consitent
		setTimeout(initDropdownHtml, 500);
		
		// we still want to trigger any selected stylesheets right away though
		updateStylesheets();
	}
	
	function initDropdownHtml() {
		$('.'+CONTENT_ID).remove();
		var $dropdown = $("<div>").addClass("wds-button wds-is-secondary wds-dropdown "+CONTENT_ID);
		var $toggle = $("<div>").addClass("wds-dropdown__toggle").attr("title", "Wiki Mode Selector").html(TOOLBAR_ICON).appendTo($dropdown);
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
		$('<div class="uwe-theme-header"><strong>Wiki Mode Selector</strong></div>').appendTo($content);
		
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