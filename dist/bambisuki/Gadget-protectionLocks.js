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
	if (protectionLevel === 'autoconfirmed') { // [[File:Semi-protected page lock.png]]
		mimicIndicator(
			'protection-semi',
			'Minecraft Wiki:Autoconfirmed users',
			'Semi-protected page lock.png',
			'9/9b',
			'This page is semi-protected so that only registered users can edit it.'
		).prependTo($('.page-header__actions'));
	} else if (protectionLevel === 'directoreditprotected') { // [[File:Director-protected page lock.png]]
		mimicIndicator(
			'protection-director',
			'Minecraft Wiki:Directors',
			'Director-protected page lock.png',
			'8/85',
			'This page is directors-only protected so that only directors can edit it.'
		).prependTo($('.page-header__actions'));
	} else if (protectionLevel === 'sysop') { // [[File:Fully-protected page lock.png]]
		mimicIndicator(
			'protection-full',
			'Minecraft Wiki:Administrators',
			'Fully-protected page lock.png',
			'4/49',
			'This page is fully protected so that only administrators can edit it.'
		).prependTo($('.page-header__actions'));
	}
})(window.jQuery, window.mediaWiki);