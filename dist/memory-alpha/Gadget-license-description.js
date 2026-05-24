'use strict';
(() => {
	const api = new mw.Api();
	const msg = 'custom-license-description'; // [[MediaWiki:Custom-license-description]]
	api.loadMessagesIfMissing(msg).then(() => {
		$('.license-description').html(mw.message(msg).parse());
	});
})();

// {{JavaScript category}}