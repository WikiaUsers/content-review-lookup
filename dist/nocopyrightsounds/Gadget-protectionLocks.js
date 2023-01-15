// Page protection indicators
// Taken and adapted from the Minecraft wiki: https://minecraft.fandom.com/wiki/MediaWiki:Gadget-protectionLocks.js
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
		return 'https://static.wikia.nocookie.net/nocopyrightsounds/images/' +
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
			'NoCopyrightSounds_Wiki:Autoconfirmed_users',
			'Semi-protected page lock.png',
			'9/9b',
			'This page is semi-protected so that only registered users can edit it.'
		).prependTo($('.page-header__actions'));
	}  else if (protectionLevel === 'sysop') {
		mimicIndicator(
			'protection-full',
			'NoCopyrightSounds Wiki:Staff#Administrators',
			'Fully-protected page lock.png',
			'4/49',
			'This page is fully protected so that only administrators can edit it.'
		).prependTo($('.page-header__actions'));
	}
})(window.jQuery, window.mediaWiki);