;(function (window, $, mw) {
	"use strict";
	window.ImprovedTabbers = window.ImprovedTabbers || {}
	if (typeof window.ImprovedTabbers.Loaded !== 'undefined' || $('body').hasClass('editor')) {
		return; // prevent second load.
	}
    window.ImprovedTabbers.Loaded = true;
    
	var module = $.extend({
		HideHeaderTitle: true,
		HideContentTitle: true,
		HumanReadableAnchor: false,
		SynchroInfoboxes: true,
		SynchroTabbers: true,
	}, window.ImprovedTabbers);

	$(document).ready(function () {
		 function Work() {
			
			$(window).off('hashchange');
			var tabbers = $(".tabber");
			tabbers.each(function() {
				var $this = $(this),
				tabContent = $this.children('.tabbertab'),
				nav = $this.children('.tabbernav');

				// hidding titles in header and content of tabbers
				// on UCP  the title may contain extra unnecessary spaces. they need trim
				nav.find('a').each(function () {
					var title = $(this).attr('title').trim();
					$(this).attr('data-title', title);
					$(this).attr('data-hash', mw.util.escapeIdForAttribute(title));
					if (module.HideHeaderTitle) {
						$(this).attr('title', null);
					}
					else {
						$(this).attr('title', title);
					}
				});

				tabContent.each(function () {
					var title = $(this).attr('title').trim();
					$(this).attr('data-title', title);
					$(this).attr('data-hash', mw.util.escapeIdForAttribute(title));
					$(this).attr('title', null);
					if (module.HideContentTitle) {
						$(this).attr('title', null);
					}
					else {
						$(this).attr('title', title);
					}
				});

				function showContent(datahash) {
					var content = tabContent.filter('[data-hash="' + datahash + '"]');
					if (content.length !== 1) return false;
					tabContent.hide();
					content.show();
					nav.find('.tabberactive').removeClass('tabberactive');
					nav.find('a[data-hash="' + datahash + '"]').parent().addClass('tabberactive');
					$(window).trigger('scroll');
					return true;
				}

				nav.off('click', 'a');
				nav.on('click', 'a', function (e) {
					var datahash = $(this).attr('data-hash');
					// Human readable anchor in address bar
					var title = (module.HumanReadableAnchor) ? $(this).attr('data-title') : datahash;
					e.preventDefault();
					if (history.pushState) {
						history.pushState(null, null, '#' + title);
						if (module.SynchroTabbers) { // open tabs with same name in others tabbers on page
							$(window).trigger('hashchange');
						}
						else {
							showContent(datahash);
						}
					} 
					else {
						location.hash = '#' + title;
					}

				});

				$(window).on('hashchange', function (event) {
					switchTab();
				});
				function switchTab() {
					var title = new mw.Uri(location.href).fragment;
					var datahash = mw.util.escapeIdForAttribute(title);
					if (datahash.length) {
						showContent(datahash);
					}
				}
				switchTab();
			});

			// if tabber contain inside infoboxes with collapsible sections
			// when section on active tab collapsed or expanded
			// then automatically synchronously collapse or expande sections with same name on nonactive tabs
			if (module.SynchroInfoboxes) {
				var collapsibleGroups = $(".tabber .pi-collapse");
				collapsibleGroups.each(function(index) {
					collapsibleGroups.eq(index).find(".pi-header:first").click(function() {
						collapsibleGroups.not($(this).parent()).has(".pi-header:first:contains('" + $(this).text() + "')").toggleClass("pi-collapse-closed");
					});
				});
			}

		} // end Work
		// must be run after ext.Tabber is done their work, that detected by the presence of the '.tabber .tabbernav' element
		var attempt = 10;
		function Test() {
			if ($('.tabber .tabbernav').length > 0) {
				Work();
			}
			else if (--attempt > 0) {
				setTimeout(Test, 500);
			}
		}
		if ($('.tabber').length > 0) {
			Test();
		}
	});
}) (window, jQuery, mediaWiki);