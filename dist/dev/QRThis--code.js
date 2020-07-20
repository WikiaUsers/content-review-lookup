/**
 * @name: QRThis
 * @description: Adds a QR
 * @author: Unai01
 *
 * PS: Thanks Kocka for helping me with the code! ^^
 */
(function ($, mw) {
	'use strict';
	if (!$('.activity-module').exists() || $('.QRThis').exists()) {
		return;
	}
	var URL = 'https://api.qrserver.com/v1/create-qr-code/?' + $.param({
		size: '222x222',
		data: window.location.href,
	});
	$('<section>', {
		class: 'QRThis rail-module'
	})
		.append(
			$('<h2>', {
				text: 'QRThis'
			}),
			$('<div>', {
				style: 'text-align: center;'
			}),
			$('<img>', {
				src: URL,
				alt: 'QR Code'
			})
		)
		.insertAfter('.activity-module');
}(jQuery, mediaWiki));