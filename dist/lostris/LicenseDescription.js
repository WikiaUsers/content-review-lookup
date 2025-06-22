'use strict';
mw.loader.using(['mediawiki.api'], () => {
	const api = new mw.Api();
	const msg = 'license-description-with-link';
	const url = 'https://www.fandom.com/licensing';
	const link = $('<a>').attr('href', url).text('CC BY-NC').prop('outerHTML');
	api.loadMessagesIfMissing(msg).done(() => {
		$('.license-description').html(mw.message(msg, link).text());
	});
});