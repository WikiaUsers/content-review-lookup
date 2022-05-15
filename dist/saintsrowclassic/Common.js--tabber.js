// https://www.mediawiki.org/wiki/Extension:Tabber

$(function() {
  window.tabberInit = function() {
	$.fn.tabber = function() {
		return this.each(function() {
			var $this = $(this),
				tabContent = $this.children('.tabbertab'),
				nav = $('<ul>').addClass('tabbernav'),
				loc;

			/**
			 * @param  {string} title to show, matching only 1 tab
			 * @return {bool} true if matching tab could be shown
			 * 
			 * note from 452: - it's not the title attribute, it's the data-hash attribute. The title attribute has spaces, the data-hash attribute has underscores.  In addition to writing misleading documentation and using misleading variable names, the people who wrote this extension omitting the options/callback present in a previous version of the extension, and introducing several bugs - including not rendering wikitext within tabbers correctly.
			 */

			function showContent(title) {
				var content = tabContent.filter('[data-hash="' + title + '"]');
				if (content.length !== 1) { return false; }
				tabContent.hide();
				content.show();
				nav.find('.tabberactive').removeClass('tabberactive');
				nav.find('a[data-hash="' + title + '"]').parent().addClass('tabberactive');
				return true;
			}
			function switchTab() {
				var tab = new mw.Uri(location.href).fragment;
				if (!tab.length) {
					showContent(tabContent.first().attr('data-hash'));
				}
				if (nav.find('a[data-hash="'+tab+'"]').length) {
					showContent(tab);
				}
			}
			// Respond to clicks on the nav tabs
			nav.on('click', 'a', function(e) {
				var title = $(this).attr('data-hash');
				e.preventDefault();
				if (typeof history.pushState == "function") {
					history.pushState(null, null, '#' + title);
					switchTab();
				} else {
					location.hash = '#' + title;
				}
			});
			$(window).on('hashchange', function(event) {
				switchTab();
			});

			// create tabs
			tabContent.each(function() {
				$(this).attr('data-hash', mw.util.escapeIdForAttribute(this.title));
				var anchor = $('<a>').text(this.title).attr('title',this.title).attr('data-hash', $(this).attr('data-hash')).attr('href', '#');
				$('<li>').append(anchor).appendTo(nav);

				// Append a manual word break point after each tab
				nav.append($('<wbr>'));
			});

			$this.prepend(nav);

			// setup initial state
			var tab = new mw.Uri(location.href).fragment;
			if (tab === '' || !showContent(tab)) {
				tab = tabContent.first().attr('data-hash');
				if (tab == "Male_1") {
					tab = $($("li a", $this)[Math.floor(Math.random()*$("li a", $this).length)]).attr("data-hash");
				}
				showContent(tab);
			}

			$this.addClass('tabberlive');
			$this.removeClass('tabber');
		});
	};

	if ($(".tabber.tabberlive").length) {
//		$(".tabber.tabberlive>div").attr("style","");
		$(".tabber.tabberlive .tabbernav").remove(); 
		$(".tabber.tabberlive").removeClass("tabberlive"); 
	}
	if ($(".tabber").length) $('.tabber').tabber();
  };
  if ($(".tabber").length) tabberInit();
});