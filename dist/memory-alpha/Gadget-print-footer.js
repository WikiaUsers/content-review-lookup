'use strict';
(() => {
	const config = mw.config.values;
	const api = new mw.Api();
	const msg = 'retrievedfrom';
	const params = Object.fromEntries(new URLSearchParams(location.search));
	delete params.title;
	if (!params.diff && !params.oldid && config.wgCurRevisionId){
		params.oldid = config.wgCurRevisionId;
	}
	const url = config.wgServer + mw.util.getUrl(config.wgPageName, params);
	api.loadMessagesIfMissing(msg).then(() => {
		$('#mw-content-text').append($('<div>', {
			id: 'printfooter',
			class: 'print-only',
			html: mw.message(msg, $('<a>', {
				href: url,
				text: url,
			}).prop('outerHTML')).text(),
		}));
	});
})();

// {{JavaScript category}}