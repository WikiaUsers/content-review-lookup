(function (mw, $) {
	'use strict';
 
	var full = '.UserProfileActionButton .wikia-menu-button, #WikiaPageHeader .wikia-menu-button, #WikiaUserPagesHeader .wikia-menu-button { box-shadow: 0 0 1px 2px gold; }';
	var semi = '.UserProfileActionButton .wikia-menu-button, #WikiaPageHeader .wikia-menu-button, #WikiaUserPagesHeader .wikia-menu-button { box-shadow: 0 0 1px 2px silver; }';
 
	$.getJSON('/api.php', {
		format: 'json',
		action: 'query',
		prop: 'info',
		inprop: 'protection',
		titles: mw.config.get('wgPageName')
	}, function (data) {
		var
			i, j, b;
 
		b = false;
		if (data.query && data.query.pages) {
			for (i in data.query.pages) {
				if (data.query.pages.hasOwnProperty(i) && data.query.pages[i].protection) {
					for (j = 0; j < data.query.pages[i].protection.length; ++j) {
						if (data.query.pages[i].protection[j].type === 'edit') {
							b = data.query.pages[i].protection[j].level;
						}
					}
				}
			}
		}
		if (b === 'sysop') {
			$(function () {
				mw.util.addCSS(full);
				$('.UserProfileActionButton .wikia-menu-button > a, #WikiaPageHeader .wikia-menu-button > a, #WikiaUserPagesHeader .wikia-menu-button > a').attr("title","This page has been protected for administrators.");
			});
		} else if (b === 'autoconfirmed') {
			$(function () {
				mw.util.addCSS(semi);
				$('.UserProfileActionButton .wikia-menu-button > a, #WikiaPageHeader .wikia-menu-button > a, #WikiaUserPagesHeader .wikia-menu-button > a').attr("title","This page has been protected for autoconfirmed users.");
			});
		}
	});
}(mediaWiki, jQuery));