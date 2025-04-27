'use strict';
mw.loader.using(['mediawiki.api'], () => {
	const api = new mw.Api();
	const msg = 'retrievedfrom';
	const server = mw.config.get('wgServer');
	const pageName = mw.config.get('wgPageName');
	const attributes = {'id': 'printfooter', 'class': 'print-only'};
	const params = Object.fromEntries(new URLSearchParams(location.search));
	delete params.title;
	
	if (!params.diff && !params.oldid && mw.config.get('wgCurRevisionId')){
		params.oldid = mw.config.get('wgCurRevisionId');
	}
	
	const permalink = server + mw.util.getUrl(pageName, params);
	const link = $('<a>').attr('href', permalink).text(permalink);
	
	api.loadMessagesIfMissing(msg).done(() => {
		const text = mw.message(msg, link.prop('outerHTML')).text();
		const printFooter = $('<div>').attr(attributes).html(text);
		$('#mw-content-text').append(printFooter);
	});
});