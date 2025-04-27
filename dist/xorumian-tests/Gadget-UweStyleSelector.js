(function($){
	var SELECTED_CACHE_KEY = 'uwe-resourcepacks-selected';
	var stylesheetPrefix = mw.config.get('wgServer')+mw.config.get('wgScript')+"?action=raw&ctype=text/css&title=";
	var packDefault = { id:'default', name:"Minecraft (Default)", author:"Xorum Team" };
	var packs = [
		{
			id: 'artwork',
			name: "ArtWork",
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-UweStyleSelector.js/ArtWork.css",
			author: "Xorum Team"
		},
		{
			id: 'realistic',
			name: "Realistic",
			stylesheet: stylesheetPrefix+"MediaWiki:Gadget-UweStyleSelector.js/Realistic.css",
			author: "Uwe",
		},
	];

	// Source: https://www.svgrepo.com/svg/310023/style-guide
	var TOOLBAR_ICON = '<svg class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg" viewBox="3 2.5 18 18"><path d="M14.0358344,2.77749671 C15.5028662,2.38440673 17.0107928,3.25500857 17.4038828,4.72204036 L20.1214828,14.8642615 C20.5145728,16.3312933 19.6439709,17.8392199 18.1769391,18.2323099 L11.8984213,19.9146337 C10.4313895,20.3077237 8.92346284,19.4371219 8.53037286,17.9700901 L5.81277289,7.8278689 C5.41968291,6.36083711 6.29028475,4.85291048 7.75731654,4.4598205 L14.0358344,2.77749671 Z M5.80276379,11.6579669 L7.56444704,18.2289091 C7.74541549,18.9042926 8.09965838,19.4869754 8.56653105,19.9419445 L8.12368161,19.9181345 C6.60697998,19.8386475 5.4418873,18.544681 5.52137427,17.0279794 L5.80276379,11.6579669 Z M14.424063,4.22638545 L8.1455451,5.90870924 C7.47871248,6.08738651 7.08298436,6.7728077 7.26166163,7.43964033 L9.9792616,17.5818615 C10.1579389,18.2486941 10.8433601,18.6444222 11.5101927,18.465745 L17.7887106,16.7834212 C18.4555432,16.6047439 18.8512713,15.9193227 18.672594,15.2524901 L15.9549941,5.11026892 C15.7763168,4.44343629 15.0908956,4.04770818 14.424063,4.22638545 Z M4.87817105,10.1797973 L4.52274473,16.9756434 C4.4861276,17.6743399 4.64319766,18.3383733 4.94700819,18.915604 L4.53260907,18.7550052 C3.11470293,18.210722 2.40649159,16.6200533 2.95077476,15.2021471 L4.87817105,10.1797973 Z M9.74118095,7.03407417 C10.2746471,6.89113236 10.822984,7.20771485 10.9659258,7.74118095 C11.1088676,8.27464706 10.7922851,8.82298401 10.258819,8.96592583 C9.72535294,9.10886764 9.17701599,8.79228515 9.03407417,8.25881905 C8.89113236,7.72535294 9.20771485,7.17701599 9.74118095,7.03407417 Z" id="🎨-Color"> </path></svg>';

	// Internal wiki icon
	var TINY_ARROW_ICON = '<svg><use xlink:href="#wds-icons-dropdown-tiny" /></svg>';
	// https://www.svgrepo.com/svg/99553/plus - it's CC0, but doesn't hurt to attribute
	var PLUS_ICON = '<svg class="uwe-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60.364 60.364" xml:space="preserve"><g><path d="M54.454,23.18l-18.609-0.002L35.844,5.91C35.845,2.646,33.198,0,29.934,0c-3.263,0-5.909,2.646-5.909,5.91v17.269L5.91,23.178C2.646,23.179,0,25.825,0,29.088c0.002,3.264,2.646,5.909,5.91,5.909h18.115v19.457c0,3.267,2.646,5.91,5.91,5.91c3.264,0,5.909-2.646,5.91-5.908V34.997h18.611c3.262,0,5.908-2.645,5.908-5.907C60.367,25.824,57.718,23.178,54.454,23.18z" fill="currentColor" /></g></svg>';
	
	// https://www.svgrepo.com/svg/91946/checked
	var CHECK_ICON = '<svg class="uwe-check" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60.364 60.364" xml:space="preserve"><g><path d="M58.968,12.734c-2.193-2.423-5.936-2.608-8.359-0.415L24.481,35.975L9.991,22.218c-2.371-2.25-6.117-2.152-8.366,0.218 c-2.249,2.37-2.152,6.115,0.218,8.365l18.208,17.283c1.145,1.088,2.609,1.627,4.072,1.627c0.822,0,1.643-0.176,2.406-0.516 c0.885-0.232,1.729-0.674,2.455-1.332l29.568-26.771C60.976,18.899,61.161,15.157,58.968,12.734z" fill="currentColor" /></g></svg>';

	// Thanks to https://blog.logrocket.com/complete-guide-using-css-filters-svgs for helping figure the filters out
	// Hiding the svg in anyways seems to break the filter, so instead move it offscreen
	var SVG_FILTER = '<svg style="position:fixed;top:-1000px"><filter id="mcglint"><feImage href="https://static.wikia.nocookie.net/hypixel-skyblock/images/3/32/Mcglint.gif" x="0" y="0" preserveAspectRatio="none" result="IMAGE"/><feBlend in="IMAGE" in2="SourceGraphic" mode="screen" result="BLEND"/><feComposite operator="in" in="BLEND" in2="SourceGraphic"/></filter></svg>';
	// Before Safari 17 filter didn't work and showed nothing; now with Safari 17 it just makes the image vanish. So this is a custom filter that does nothing other than prevent css from breaking. Image with no enchant = better than no image
	var SVG_FILTER_SAFARI = '<svg style="position:fixed;top:-1000px"><filter id="mcglint"></filter></svg>';

	var CONTENT_ID = 'uwe-resourcepack-dropdown';

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
		var $toggle = $("<a>").addClass("wds-dropdown__toggle").attr("title", "Resource Packs").html(TOOLBAR_ICON).appendTo($dropdown);
		$("<div>").addClass("wds-dropdown__content wds-is-right-aligned").appendTo($dropdown);

		// Safari 3.0+ "[object HTMLElementConstructor]" - https://stackoverflow.com/a/9851769
		var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || (typeof safari !== 'undefined' && window.safari.pushNotification));
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
			var href = packs.find(function(p){ return p.id == id; }).stylesheet;
			addStylesheetToHead(href);
		});
	}

	function renderPacksList() {
		var selectedIds = getSelectedIds();
		var $content = $("."+CONTENT_ID+" .wds-dropdown__content");

		$content.html("");
		// Add header
		$('<div class="uwe-pack-header"><strong>Wiki Style Selector</strong></div>').appendTo($content);

		// Add list
		var $list = $("<ul>").addClass("uwe-pack-list").appendTo($content);

		// Packs currently added (clicking will remove)
		selectedIds.reverse().forEach(function(selectedId, i){
			var pack = packs.find(function(p){ return p.id == selectedId; });
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

		var unselectedPacks = packs.filter(function(p){ return selectedIds.indexOf(p.id) == -1; });

		if(unselectedPacks.length > 0) $("<hr>").appendTo($list);

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
			"<div class='uwe-pack-box'>",
				"<div class='check'>"+(selected === true ? CHECK_ICON : (selected === false ? PLUS_ICON : ''))+"</div>",
				"<div class='pack-title'>"+pack.name+"</div>",
				(pack.packsUrl ? "<a class='pack-site' href='"+pack.packsUrl+"' target='_blank' >"+EXTERNAL_LINK_ICON+"</a>" : "<span></span>"),
				"<div class='pack-author'>by "+pack.author+"</div>",
			"</div>"
		].join("");
	}

	function getSelectedIds() {
		return JSON.parse(localStorage.getItem(SELECTED_CACHE_KEY) || '[]')
		// filter out an old now unsupported pack ids
		.filter(function(id){ return packs.findIndex(function(p){ return p.id == id; }) > -1; });
	}

	function addSelectedId(id) {
		var selectedIds = getSelectedIds();
		selectedIds.push(id);
		saveSelectedIds(selectedIds);
	}

	function removeSelectedId(id) {
		saveSelectedIds( getSelectedIds().filter(function(sid){ return sid != id; }) );
	}

	function saveSelectedIds(list) {
		localStorage.setItem(SELECTED_CACHE_KEY, JSON.stringify(list || []));
	}

	var STYLESHEET_CLASS = "uwe-resourcepack-stylesheet";
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
	}

	main();
})(jQuery);