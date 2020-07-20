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
/*global mediaWiki:true*/

;(function (module, mw, $, undefined) {
	'use strict';
	
	var i18n, $tabs;

	function click(e) {
		e.preventDefault();
		window.location.href = $(this).data('url');
	}

	function doEach() {
		var $that,$link,$url;

		$that = $(this);
		$link = $that.find('> a').first();
		$url = new mw.Uri(
							$link.attr('href')
						)
						.extend({
							action: 'edit'
						})
						.toString();

		$link.append(
			$('<span>', {
				'class': 'editsection'
				,'click': click
				,'data-url': $url
			})
			.append(
				$('<a>', {
					'href': $url
					,'css': {
						'border': 'none'
						,'cursor': 'pointer'
						,'padding': '0'
						,'font-size': 'x-small'
					},
					'title': i18n.msg('title').plain()
				})
				.append(
					$('<img>', {
						'class': "sprite edit-pencil"
						,'src': "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"
					})
				)
				.append(i18n.msg('text').plain())
			)
		);
	}
	
	function hook(i18nData) {
        i18n = i18nData;
        $tabs.each(doEach);
		$tabs.addClass('tvel_handled');
	}

	function init() {
		$tabs = mw.util.$content.find(
			'[id^="flytabs_"] > ul.tabs > li[data-tab]:not(.tvel_handled)'
		);

		if ($tabs.length) {
			mw.hook('dev.i18n').add(function(i18no) {
                i18no.loadMessages('TabViewEditLinks').then(hook);
            });
            importArticle({
                type: 'script',
                article: 'u:dev:MediaWiki:I18n-js/code.js'
            });
		}
	}

	module.init = init;
	mw.hook('wikipage.content').add(init);
}(window.TabViewEditLinks = window.TabViewEditLinks || {}, mediaWiki, jQuery));