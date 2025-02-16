// __NOWYSIWYG__
/**
 * TabViewEditLinks
 *
 * @version 2.0.1
 *
 * @author ©TriMoon™ <https://community.fandom.com/wiki/User:©TriMoon™>
 *
 * Version 1 authors:
 * - Comunity discussion <https://community.fandom.com/wiki/Thread:1517804#7>
 * - Pera Pisar <https://community.fandom.com/wiki/User:KockaAdmiralac>
 * - ©TriMoon™ <https://community.fandom.com/wiki/User:©TriMoon™>
 *
 * documentation and examples at:
 * <https://dev.fandom.com/wiki/TabViewEditLinks>
 */

/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */

(function (mw, $) {
	'use strict';
	
	var i18n, wds, loaded = false, preloads = 2;

	function click(e) {
		e.preventDefault();
		window.location.href = e.target.parentElement.dataset.url;
	}

	function doEach(index, tab) {
		if (tab.classList.contains('tvel_handled')) return;
		tab.classList.add('tvel_handled');

		var link = tab.querySelector('a'),
			url = new URL(link.href);
		url.searchParams.set('action', 'edit');

		$(link).append(
			$('<span>', {
				'class': 'editsection',
				'click': click,
				'data-url': url.href
			}).append(
				$('<a>', {
					'href': url.href,
					'css': {
						'border': 'none',
						'cursor': 'pointer',
						'padding': '0',
						'font-size': 'x-small'
					},
					'title': i18n.msg('title').plain()
				}).append(wds.icon('pencil-small', {
					class: 'wds-icon-tiny',
					alt: i18n.msg('text').escape(),
					style: 'margin-left:1em;pointer-events:none'
				}))
			)
		);
	}

	function init() {
		var $tabs = mw.util.$content.find('[id^="flytabs_"] > ul.tabs > li[data-tab]:not(.tvel_handled)');

		if (!$tabs.length) return;

		function preload() {
			if (--preloads>0) return;
			$tabs.each(doEach);
		}

		if (loaded) {
			$tabs.each(doEach);
		} else {
			loaded = true;
			mw.hook('dev.i18n').add(function(i18no) {
				i18no.loadMessages('TabViewEditLinks').then(function(i18nData) {
					i18n = i18nData;
					preload();
				});
			});
			mw.hook('dev.wds').add(function(wdsData) {
				wds = wdsData;
				preload();
			});
			window.importArticle({
				type: 'script',
				articles: [
					'u:dev:MediaWiki:I18n-js/code.js',
					'u:dev:MediaWiki:WDSIcons/code.js'
				]
			});
		}
	}
	mw.hook('wikipage.content').add(init);
	// Debug
	window.TabViewEditLinks = window.TabViewEditLinks || {};
	window.TabViewEditLinks.init = init;
}(window.mediaWiki, window.jQuery));