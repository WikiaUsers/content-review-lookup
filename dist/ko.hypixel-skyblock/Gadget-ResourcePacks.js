(function($){
	var SELECTED_CACHE_KEY = 'hsw-resourcepacks-selected';
	var stylesheetPrefix = mw.config.get('wgServer')+mw.config.get('wgScript')+"?action=raw&ctype=text/css&title=";
	var packDefault = { id:'default', name:"마인크래프트: V1.8.9 (위키 기본값)", author:"Mojang" };
	var packs = [
		{
			id: 'latest',
			name: "마인크래프트: 최신 버전",
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ResourcePacks.js/DefaultLatest.css",
			author: "Mojang"
		},

		{
			id: 'hypixel+',
			name: "Hypixel+",
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ResourcePacks.js/Hypixel%2B.css",
			author: "ic22487",
			packsUrl: "https://hypixel.net/threads/0-16-1-update-hypixel-for-1-8-1-12-and-1-19.4174260/"
		},
		{
			id: 'furfsky',
			name: "FurfSky Reborn",
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ResourcePacks.js/FurfSkyReborn.css",
			author: "FurfSky Reborn Team",
			packsUrl: "https://furfsky.net/"
		},
		{
			id: 'rnbw',
			name: "RNBW+",
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ResourcePacks.js/RNBW%2B.css",
			author: "Rainbowcraft2",
			packsUrl: "https://hypixel.net/threads/rnbw-resource-pack-v0-7-0-update-v0-7-0-dungeons-pt-3-and-crystal-hollows.3470904/"
		},
		{
			id: 'packshq',
			name: "PacksHQ Skyblock Pack",
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ResourcePacks.js/Packs_HQ.css",
			author: "PacksHQ Team",
			packsUrl: "https://hypixel.net/threads/hypixel-skyblock-pack-the-mining-update.2103515/"
		},
		{
			id: 'vanilla+',
			name: "Vanilla+",
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ResourcePacks.js/Vanilla%2B.css",
			author: "TBlazeWarriorT",
			packsUrl: "https://hypixel.net/threads/x16-1-8-x-1-14-x-vanilla-skyblock-resource-pack-v1-441-1-000-textures-added-livid-dagger.2147652/"
		},
		{
			id: 'wandb',
			name: "Worlds and Beyond",
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-ResourcePacks.js/WorldsAndBeyond.css",
			author: "Skeletony",
			packsUrl: "https://hypixel.net/threads/worlds-and-beyond-16x-crystal-hollows-update-version-1-5.3597207/"
		},
	];
	
	var TOOLBAR_ICON = '<svg class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><rect class="hsw-dd-brown" x="1" y="5" width="16" height="12" rx="2" ry="2" /><rect class="hsw-dd-green" x="1" y="1" width="16" height="4" rx="2" ry="2" /><rect class="c" x="1" y="1" width="16" height="16" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" /><polyline class="d" points="1 5 3.19 5 5 4.68 6.82 6.84 8.66 5 11.32 5 13.29 4.01 14.76 6 17 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>';
	
	// Source: https://icons8.com/icon/blk2PNUlJAYt/external-link
	var EXTERNAL_LINK_ICON = '<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="30px" height="30px"><path fill="currentColor" d="M 43 12 C 40.791 12 39 13.791 39 16 C 39 18.209 40.791 20 43 20 L 46.34375 20 L 35.171875 31.171875 C 33.609875 32.733875 33.609875 35.266125 35.171875 36.828125 C 35.951875 37.608125 36.977 38 38 38 C 39.023 38 40.048125 37.608125 40.828125 36.828125 L 52 25.65625 L 52 29 C 52 31.209 53.791 33 56 33 C 58.209 33 60 31.209 60 29 L 60 16 C 60 13.791 58.209 12 56 12 L 43 12 z M 23 14 C 18.037 14 14 18.038 14 23 L 14 49 C 14 53.962 18.037 58 23 58 L 49 58 C 53.963 58 58 53.962 58 49 L 58 41 C 58 38.791 56.209 37 54 37 C 51.791 37 50 38.791 50 41 L 50 49 C 50 49.551 49.552 50 49 50 L 23 50 C 22.448 50 22 49.551 22 49 L 22 23 C 22 22.449 22.448 22 23 22 L 31 22 C 33.209 22 35 20.209 35 18 C 35 15.791 33.209 14 31 14 L 23 14 z"/></svg>';
	// Internal wiki icon
	var TINY_ARROW_ICON = '<svg><use xlink:href="#wds-icons-dropdown-tiny" /></svg>';
	// https://www.svgrepo.com/svg/99553/plus - it's CC0, but doesn't hurt to attribute
	var PLUS_ICON = '<svg class="hsw-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60.364 60.364" xml:space="preserve"><g><path d="M54.454,23.18l-18.609-0.002L35.844,5.91C35.845,2.646,33.198,0,29.934,0c-3.263,0-5.909,2.646-5.909,5.91v17.269L5.91,23.178C2.646,23.179,0,25.825,0,29.088c0.002,3.264,2.646,5.909,5.91,5.909h18.115v19.457c0,3.267,2.646,5.91,5.91,5.91c3.264,0,5.909-2.646,5.91-5.908V34.997h18.611c3.262,0,5.908-2.645,5.908-5.907C60.367,25.824,57.718,23.178,54.454,23.18z" fill="currentColor" /></g></svg>';
	
	// Thanks to https://blog.logrocket.com/complete-guide-using-css-filters-svgs for helping figure the filters out
	// Hiding the svg in anyways seems to break the filter, so instead move it offscreen
	var SVG_FILTER = '<svg style="position:fixed;top:-1000px"><filter id="mcglint"><feImage href="https://static.wikia.nocookie.net/hypixel-skyblock/images/3/32/Mcglint.gif" x="0" y="0" preserveAspectRatio="none" result="IMAGE"/><feBlend in="IMAGE" in2="SourceGraphic" mode="screen" result="BLEND"/><feComposite operator="in" in="BLEND" in2="SourceGraphic"/></filter></svg>';
	// Before Safari 17 filter didn't work and showed nothing; now with Safari 17 it just makes the image vanish. So this is a custom filter that does nothing other than prevent css from breaking. Image with no enchant = better than no image
	var SVG_FILTER_SAFARI = '<svg style="position:fixed;top:-1000px"><filter id="mcglint"></filter></svg>';
	
	var CONTENT_ID = 'hsw-resourcepack-dropdown';
	
	function main() {
		// Not sure why this sometimes doesn't show up on page load; attempting to delay add a bit to try and make it more consitent
		setTimeout(initDropdownHtml, 500);
		
		// we still want to trigger any selected stylesheets right away though
		updateStylesheets();
		
		// Firefox has a weird bug where the css will be overwritten by lazy-loaded images
		// So this code forces firefox to re-trigger the css for them
		if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
			// Only trigger this workaround when resource packs are being used
			var selectedIds = getSelectedIds();
			if(selectedIds.length > 0) {
				$('.lazyload, .lazyloaded').each(function(){
					var $img = $(this);
					// interval as a hacky way to detect when class has changed
					var iid = setInterval(function(){
						// Once the image is no longer being lazy-loaded
						if($img.hasClass('lazyloaded')) {
							clearInterval(iid);
							// set content to none to override our script, then next frame we
							// remove the css var, which forces our css to re-render
							$img.css('content', 'none');
							setTimeout(function(){
								$img.css('content', '');
							}, 500);
						}
					}, 500);
				});
			}
		}
	}
	
	function initDropdownHtml() {
		$('.'+CONTENT_ID).remove();
		var $dropdown = $("<div>").addClass("wds-button wds-is-secondary wds-dropdown "+CONTENT_ID);
		var $toggle = $("<a>").addClass("wds-dropdown__toggle").attr("title", "리소스 팩").html(TOOLBAR_ICON).appendTo($dropdown);
		$("<div>").addClass("wds-dropdown__content wds-is-right-aligned").appendTo($dropdown);
		
		// Safari 3.0+ "[object HTMLElementConstructor]" - https://stackoverflow.com/a/9851769
		var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
		if(isSafari) {
			$(SVG_FILTER_SAFARI).appendTo($toggle);
		} else {
			$(SVG_FILTER).appendTo($toggle);
		}
		
		// Insert dropdown to nav
		$(".wiki-tools > .wds-button:last-of-type").after($dropdown);
		
		update();
	}
	
	function update() {
		updateStylesheets();
		renderPacksList();
	}
	
	function updateStylesheets() {
		clearStylesheets();
		
		getSelectedIds()
		.forEach(function(id){
			const href = packs.find(function(p){ return p.id == id }).stylesheet;
			addStylesheetToHead(href);
		})
	}
	
	function renderPacksList() {
		var selectedIds = getSelectedIds();
		var $content = $("."+CONTENT_ID+" .wds-dropdown__content");
		
		$content.html("");
		// Add header
		$('<div class="hsw-pack-header"><strong>리소스 팩 선택</strong></div>').appendTo($content);
		
		// Add list
		var $list = $("<ul>").addClass("hsw-pack-list").appendTo($content);
		
		// Packs currently added (clicking will remove)
		selectedIds.reverse().forEach(function(selectedId, i){
			var pack = packs.find(function(p){ return p.id == selectedId });
			var $li = $("<li>").html(renderPackBox(pack, true)).addClass('selected '+pack.id).appendTo($list).on('click', function(){
				removeSelectedId(selectedId);
				update();
			});
			// Prevent previous click event firing when we clicking on an anchor inside of it
			$li.find('a').on('click', function(e){ e.stopPropagation(); });
			
			if(selectedIds.length > 1) {
				var nonReversedI = selectedIds.length - 1 - i;
				// arrow down, if needed
				if(i < selectedIds.length-1) {
					$("<span class='pack-down'>"+TINY_ARROW_ICON+"</span>").appendTo($li.find('.check')).on("click", function(e){
						e.stopPropagation();
						var list = arrayMoveItem(getSelectedIds(), nonReversedI, nonReversedI-1); // note that in our array newest items are at bottom of the array, not top
						saveSelectedIds(list);
						update();
					});
				}
				// arrow up, if needed
				if(i !== 0) {
					$("<span class='pack-up'>"+TINY_ARROW_ICON+"</span>").appendTo($li.find('.check')).on("click", function(e){
						e.stopPropagation();
						var list = arrayMoveItem(getSelectedIds(), nonReversedI, nonReversedI+1); // note that in our array oldest items are at top of the array, not bottom
						saveSelectedIds(list);
						update();
					});
				}
			}
		});
		
		// Show default pack, even though you cannot interact with it
		$("<li class='default'>"+renderPackBox(packDefault, 'default')+"</li>").appendTo($list);
		
		var unselectedPacks = packs.filter(function(p){ return selectedIds.indexOf(p.id) == -1 });
		
		if(unselectedPacks.length > 0) $("<hr>").appendTo($list)
		
		// Packs not currently selected (clicking will added)
		unselectedPacks.forEach(function(pack){
			$("<li>").html(renderPackBox(pack, false)).addClass('unselected '+pack.id).appendTo($list).on('click', function(){
				addSelectedId(pack.id);
				update();
			})
			// Prevent previous click event firing when we clicking on an anchor inside of it
			.find('a').on('click', function(e){ e.stopPropagation(); });
		});
	}
	
	function renderPackBox(pack, selected) {
		return [
			"<div class='hsw-pack-box'>",
				"<div class='check'>"+(selected === true ? "<img src='https://static.wikia.nocookie.net/hypixel-skyblock/images/e/eb/Yes.svg' />" : (selected === false ? PLUS_ICON : ''))+"</div>",
				"<div class='pack-title'>"+pack.name+"</div>",
				(pack.packsUrl ? "<a class='pack-site' href='"+pack.packsUrl+"' target='_blank' >"+EXTERNAL_LINK_ICON+"</a>" : "<span></span>"),
				"<div class='pack-author'>by "+pack.author+"</div>",
			"</div>"
		].join("");
	}
	
	function getSelectedIds() {
		return JSON.parse(localStorage.getItem(SELECTED_CACHE_KEY) || '[]')
		// filter out an old now unsupported pack ids
		.filter(function(id){ return packs.findIndex(function(p){ return p.id == id }) > -1 });
	}
	
	function addSelectedId(id) {
		var selectedIds = getSelectedIds();
		selectedIds.push(id);
		saveSelectedIds(selectedIds);
	}
	
	function removeSelectedId(id) {
		saveSelectedIds( getSelectedIds().filter(function(sid){ return sid != id }) );
	}
	
	function saveSelectedIds(list) {
		localStorage.setItem(SELECTED_CACHE_KEY, JSON.stringify(list || []));
	}
	
	var STYLESHEET_CLASS = "hsw-resourcepack-stylesheet";
	function addStylesheetToHead(href) {
		$("head").append("<link rel='stylesheet' href='"+href+"' type='text/css' class='"+STYLESHEET_CLASS+"'>");
	}
	
	function clearStylesheets() {
		$("link."+STYLESHEET_CLASS).remove();
	}
	
	// https://stackoverflow.com/a/17989135
	// Modifies array with moved position
	function arrayMoveItem(arr,from,to){
		arr.splice(to,0,arr.splice(from,1)[0]);
		return arr;
	  };
	
	main();
})(jQuery);