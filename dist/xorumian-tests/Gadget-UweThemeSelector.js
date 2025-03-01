(function($){
	// prevent double load
	window.hsbwiki = window.hsbwiki || {};
	if (window.hsbwiki.themeSelectorLoaded) return;
	window.hsbwiki.themeSelectorLoaded = true;
	
	var SELECTED_CACHE_KEY = 'hsw-themeselector-selected';
	var stylesheetPrefix = "https://xorumian-tests.fandom.com/index.php?action=raw&ctype=text/css&title=";
	var themes = [
		{
			id: 'default',
			name: 'Standard',
			note: 'Light & Dark',
			image: "https://static.wikia.nocookie.net/xorumian-things/images/5/5c/BackgroundLight.png/revision/latest/scale-to-width-down/480?cb=20240902162337&path-prefix=de"
		},
		{
			id: 'developer',
			name: "Developer mode",
			note: 'Expand to chage color',
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-UweThemeSelector.js/Developer.css",
			image: "https://static.wikia.nocookie.net/xorumian-things-pt/images/b/b1/BackgroundDeveloper.png/revision/latest/scale-to-width-down/480?cb=20250227200059"
		},
	];
	
	// <a href="https://www.flaticon.com/free-icons/color-palette" title="color palette icons">Color palette icons created by Pixel perfect - Flaticon</a>
	var TOOLBAR_ICON = '<svg class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg" width="682.7" height="682.7" version="1.0" viewBox="0 0 512 512"><svg viewBox="2.5 2.5 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.25,2 C15.6296958,2 15.943491,2.28215388 15.9931534,2.64822944 L16,2.75 L16.0005323,5.07512168 C17.4696877,5.37356725 18.6268557,6.53092479 18.9250232,8.00018117 L21.25,8 C21.6642136,8 22,8.33578644 22,8.75 C22,9.12969577 21.7178461,9.44349096 21.3517706,9.49315338 L21.25,9.5 L19,9.5 L19,11.25 L21.25,11.25 C21.6296958,11.25 21.943491,11.5321539 21.9931534,11.8982294 L22,12 C22,12.3796958 21.7178461,12.693491 21.3517706,12.7431534 L21.25,12.75 L19,12.75 L19,14.5 L21.25,14.5 C21.6296958,14.5 21.943491,14.7821539 21.9931534,15.1482294 L22,15.25 C22,15.6296958 21.7178461,15.943491 21.3517706,15.9931534 L21.25,16 L18.924821,16.0008144 C18.6263329,17.469598 17.4693558,18.6265002 16.0005323,18.9248783 L16,21.25 C16,21.6642136 15.6642136,22 15.25,22 C14.8703042,22 14.556509,21.7178461 14.5068466,21.3517706 L14.5,21.25 L14.5,18.999 L12.749,18.999 L12.75,21.25 C12.75,21.6296958 12.4678461,21.943491 12.1017706,21.9931534 L12,22 C11.6203042,22 11.306509,21.7178461 11.2568466,21.3517706 L11.25,21.25 L11.249,18.999 L9.5,18.999 L9.5,21.25 C9.5,21.6296958 9.21784612,21.943491 8.85177056,21.9931534 L8.75,22 C8.37030423,22 8.05650904,21.7178461 8.00684662,21.3517706 L8,21.25 L8.00046294,18.9250804 C6.53088189,18.6269649 5.37328561,17.4694809 5.07500541,15.9999597 L2.75,16 C2.33578644,16 2,15.6642136 2,15.25 C2,14.8703042 2.28215388,14.556509 2.64822944,14.5068466 L2.75,14.5 L5,14.499 L5,12.749 L2.75,12.75 C2.37030423,12.75 2.05650904,12.4678461 2.00684662,12.1017706 L2,12 C2,11.6203042 2.28215388,11.306509 2.64822944,11.2568466 L2.75,11.25 L5,11.249 L5,9.499 L2.75,9.5 C2.37030423,9.5 2.05650904,9.21784612 2.00684662,8.85177056 L2,8.75 C2,8.37030423 2.28215388,8.05650904 2.64822944,8.00684662 L2.75,8 L5.07520767,7.9990445 C5.3738086,6.52999618 6.53121385,5.37296774 8.00046294,5.07491964 L8,2.75 C8,2.33578644 8.33578644,2 8.75,2 C9.12969577,2 9.44349096,2.28215388 9.49315338,2.64822944 L9.5,2.75 L9.5,4.999 L11.249,4.999 L11.25,2.75 C11.25,2.37030423 11.5321539,2.05650904 11.8982294,2.00684662 L12,2 C12.3796958,2 12.693491,2.28215388 12.7431534,2.64822944 L12.75,2.75 L12.749,4.999 L14.5,4.999 L14.5,2.75 C14.5,2.40482203 14.733185,2.11410734 15.0506203,2.02679072 L15.1482294,2.00684662 L15.25,2 Z M15.25,6.5 L8.75,6.5 C7.50735931,6.5 6.5,7.50735931 6.5,8.75 L6.5,15.25 C6.5,16.4926407 7.50735931,17.5 8.75,17.5 L15.25,17.5 C16.4926407,17.5 17.5,16.4926407 17.5,15.25 L17.5,8.75 C17.5,7.50735931 16.4926407,6.5 15.25,6.5 Z M12.0049285,9.0049285 C13.6617828,9.0049285 15.0049285,10.3480743 15.0049285,12.0049285 C15.0049285,13.6617828 13.6617828,15.0049285 12.0049285,15.0049285 C10.3480743,15.0049285 9.0049285,13.6617828 9.0049285,12.0049285 C9.0049285,10.3480743 10.3480743,9.0049285 12.0049285,9.0049285 Z M12.0049285,10.5049285 C11.1765014,10.5049285 10.5049285,11.1765014 10.5049285,12.0049285 C10.5049285,12.8333556 11.1765014,13.5049285 12.0049285,13.5049285 C12.8333556,13.5049285 13.5049285,12.8333556 13.5049285,12.0049285 C13.5049285,11.1765014 12.8333556,10.5049285 12.0049285,10.5049285 Z"></path></svg></svg>';
	
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
		var $toggle = $("<a>").addClass("wds-dropdown__toggle").attr("title", "Wiki Mode Selector").html(TOOLBAR_ICON).appendTo($dropdown);
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
		$('<div class="hsw-theme-header"><strong>Wiki Mode Selector</strong></div>').appendTo($content);
		
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