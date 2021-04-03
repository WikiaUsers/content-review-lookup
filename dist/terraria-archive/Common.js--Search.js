/**
 * Adds a "Mods" section in Special:Search so users can more
 * easily find content, but searches the main namespace by default
 * 
 * For OASIS SKIN ONLY
 * 
 * Designed for Terraria Wiki, will not work properly on other wikis
 */

/*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true */
/*global mediaWiki */

if (!window.TerrariaSearch) {
	window.TerrariaSearch = true;

	(function (mw, $) {
		"use strict";

		// code to run on Special:Search page only
		function pageSpecialSearchOnload() {
			var fadeInMilliseconds = 600;

			// make "Articles" tab search main namespace only
			var tabs = $('ul.search-tabs').children(),
				articles = tabs.first(),
				link = articles.children('a'),
				href = link.attr('href');
			link.attr('href', href.replace("&ns114=1", ""));
			link.attr('title', "Search in (Main)");

			// add "Mods" tab after "Articles"
			articles.after('<li id="mods-tab" class="normal" style="display: none;"><a href="' + href.replace("&ns0=1", "") + '" title="Search in Mod">Mods</a></li>');
			$('#mods-tab').fadeIn(fadeInMilliseconds);
 
			// make sure that the "Articles" and "Mods" tabs are "selected" properly
			// without this, the Advanced tab would be selected instead
			var loc = window.location.href,
				index = loc.indexOf('ns');
			if (loc.indexOf('advanced=1') === -1 && loc.lastIndexOf('ns') === index) {
				if (loc.indexOf('ns0') === index) {
					tabs.removeClass('selected');
					tabs.first().removeClass('normal').addClass('selected');
				} else if (loc.indexOf('ns114') === index) {
					tabs.removeClass('selected');
					tabs.first().next().removeClass('normal').addClass('selected');
				}
			}

			// Make search bar search the main namespace only -- for Special:Search page
			if (articles.hasClass('selected')) {
				var searchBar = $('.WikiaSearch');
				searchBar.children('input[name="ns114"]').remove();
				if (searchBar.children('input[name="ns0"]').length === 0) {
					searchBar.prepend('<input type="hidden" class="default-tab-value" name="ns0" value="1">');
				}
			}
		}

		// code to run for the search bar on other pages
		function pageOtherOnload() {
			// Make search bar search the main namespace only -- for non-Special:Search pages
			$('#WikiaSearch input[type="submit"]').before('<input type="hidden" name="ns0" value="1">');
		}

		// add onload handler
		if ("Search" === mw.config.get('wgCanonicalSpecialPageName')) {
			$(pageSpecialSearchOnload);
		} else {
			$(pageOtherOnload);
		}
	}(mediaWiki, jQuery));
}