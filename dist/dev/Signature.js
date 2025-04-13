(($, mw) => {
	'use strict';
	const sigs = $('.signature');
	if (window.SignatureLoaded || !sigs.length){
		return;
	}
	
	window.SignatureLoaded = true;
	mw.loader.using(['mediawiki.api'], () => {
		const api = new mw.Api();
		api.loadMessagesIfMissing(['signature', 'signature-anon']).done(() => {
			api.get({meta: 'userinfo'}).done(currentUser => {
				const username = currentUser.query.userinfo.name;
				const msg = !currentUser.query.userinfo.id ? 'signature-anon' : 'signature';
				sigs.html(mw.message(msg, username, username).parse());
			});
		});
	});
})(jQuery, mediaWiki);