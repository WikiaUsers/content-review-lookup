// Page protection indicators
;(function($, mw) {
	'use strict';
	var batchConv = require('ext.gadget.HanAssist').batchConv;
	var i18n = batchConv({
		semiProtected: {
			cn: '此页面被半保护，只有自动确认用户可以编辑。',
			tw: '此頁面被半保護，只有自動確認的使用者可以編輯。',
			hk: '此頁面被半保護，只有自動確認用戶可以編輯。',
		},
		fullProtected: {
			hans: '此页面被全保护，只有管理员可以编辑。',
			hant: '此頁面被全保護，只有管理員可以編輯。',
		},
		fullProtectedUpload: {
			cn: '此文件被全保护，只有管理员可以上传。',
			tw: '此檔案被全保護，只有管理員可以上傳。',
			hk: '此檔案被全保護，只有管理員可以上載。',
		},
	});

	var config = mw.config.get([
		'wgRestrictionEdit',
		'wgIsMainPage',
		'wgAction'
	]);
	var protectionLevelData = config.wgRestrictionEdit;
	if (
		// Null on nonexistent or special pages. Avoids a crash there.
		!protectionLevelData || config.wgIsMainPage ||
		// No need to display the indicator when viewing history or editing the page
		config.wgAction !== 'view') {
		return;
	}

	function getImageThumbnailURL(name) {
		var encodedName = mw.util.wikiUrlencode(name);
		return '/images/' +
			encodedName;
	}

	function mimicIndicator(id, link, imgName, title) {
		var encodedLink = mw.util.getUrl(link);
		return $('<div class="mw-indicator">').attr({
				'id': 'mw-indicator-' + id
			}).append($('<div class="mw-parser-output">')
			.append($('<span typeof="mw:File">')
			.append($('<a>')
			.attr({
				href: encodedLink,
				title: title
			}).append($('<img>')
				.attr({
				alt: title,
				src: getImageThumbnailURL(imgName),
				width: '25',
				height: '25'
				})
			))));
	}

	var protectionLevel = protectionLevelData[0];
    var namespaceNumber = mw.config.get("wgNamespaceNumber");
	if (protectionLevel === 'autoconfirmed') { // [[File:Semi-protected page lock.svg]]
		mimicIndicator(
			'protection-semi',
			'无限暖暖 Wiki:自动确认用户',
			'Semi-protected page lock.svg',
			i18n.semiProtected
		).appendTo($('.mw-indicators'));
	} else if (protectionLevel === 'sysop') { // [[File:Fully-protected page lock.svg]] [[File:Upload protected page lock.svg]]
        if (namespaceNumber == 6) {
            mimicIndicator(
                'protection-full',
                '无限暖暖 Wiki:管理员',
                'Upload protected page lock.svg',
                i18n.fullProtectedUpload
            ).appendTo($('.mw-indicators'));
        } else {
            mimicIndicator(
                'protection-full',
                '无限暖暖 Wiki:管理员',
                'Fully-protected page lock.svg',
                i18n.fullProtected
            ).appendTo($('.mw-indicators'));
        }
	}
})(window.jQuery, window.mediaWiki);