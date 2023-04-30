// Page protection indicators
;(function($, mw) {
	'use strict';

	const config = mw.config.get([
		'wgRestrictionEdit',
		'wgIsMainPage',
		'wgAction'
	]);
	const protectionLevelData = config.wgRestrictionEdit;
	if (
		// Null on nonexistent or special pages. Avoids a crash there.
		!protectionLevelData ||
		// No need to display the indicator when viewing history or editing the page
		config.wgAction !== 'view') {
		return;
	}

	function getImageThumbnailURL(name, store, size) {
		const encodedName = mw.util.wikiUrlencode(name);
		return 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/' +
			store +
			'/' +
			encodedName +
			'/revision/latest';
	}

	function mimicIndicator(id, link, imgName, imgStore, title) {
		const encodedLink = mw.util.getUrl(link);
		return $('<a style="padding: 5px 12px;height: 36px;margin: 0 3px 0 2px;">')
			.attr({
				'href': encodedLink,
				'title': title
			}).append($('<img>')
				.attr({
				'alt': title,
				'src': getImageThumbnailURL(imgName, imgStore, 25),
				'srcset': getImageThumbnailURL(imgName, imgStore, 38) +
					' 1.5x, ' +
					getImageThumbnailURL(imgName, imgStore, 50) +
					' 2x',
				'width': '25',
				'height': '25'
				})
			);
	}

	const protectionLevel = protectionLevelData[0];
	if (protectionLevel === 'autoconfirmed') {
		mimicIndicator(
			'protection-semi',
			'Minecraft Wiki:Автопідтверджені користувачи',
			'Semi-protected page lock.png',
			'9/9b',
			'Ця сторінка напівзахищена, тому редагувати її можуть лише зареєстровані користувачі.'
		).prependTo($('.page-header__actions'));
	} else if (protectionLevel === 'directoreditprotected') {
		mimicIndicator(
			'protection-director',
			'Minecraft Wiki:Директори',
			'Director-protected page lock.png',
			'8/85',
			'Ця сторінка захищена лише для директорів, тому лише директори можуть її редагувати.'
		).prependTo($('.page-header__actions'));
	} else if (protectionLevel === 'sysop') {
		mimicIndicator(
			'protection-full',
			'Minecraft Wiki:Адміністратори',
			'Fully-protected page lock.png',
			'4/49',
			'Ця сторінка повністю захищена, тому редагувати її можуть лише адміністратори.'
		).prependTo($('.page-header__actions'));
	}
})(window.jQuery, window.mediaWiki);