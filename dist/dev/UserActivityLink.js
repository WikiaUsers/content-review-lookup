/**
 * @name			UserActivityLink
 * @version			v1.0
 * @author			TheGoldenPatrik1
 * @description		Adds a Special:UserActivity global nav link.
 */
(function () {
	if (window.UserActivityLinkLoaded) {
		return;
	}
	window.UserActivityLinkLoaded = true;
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
	mw.hook('dev.i18n').add(function (i18n) {
		i18n.loadMessages('UserActivityLink').then(init);
	});
	function init (i18n) {
		$('.global-action__user .global-action__button').click(i18n, checkForList);
	}
	function checkForList (i18n) {
		var prefItem = $('.user-tab__list .user-tab__list-item:nth-child(1)');
		if (prefItem.length) {
			addActivityLink(prefItem, i18n.data);
		} else {
			setTimeout(checkForList, 100, i18n);
		}
	}
	function addActivityLink (nextItem, i18n) {
		nextItem.before(
			$('<li>', {
				'class': 'user-tab__list-item',
				'dir': 'auto',
			}).append(
				$('<a>', {
					'href': 'https://community.fandom.com/wiki/Special:UserActivity',
					'data-label': 'account.activity',
					'text': i18n.msg('activity').plain()
				})
			)
		);
	}
})();