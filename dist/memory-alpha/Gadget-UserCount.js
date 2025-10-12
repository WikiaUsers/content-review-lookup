'use strict';
mw.loader.using(['mediawiki.api'], () => {
	const api = new mw.Api();
	mw.hook('wikipage.content').add(content => {
		const counts = content.find('.number-of-users');
		if (!counts.length){
			return;
		}
		api.get({
			action: 'listuserssearchuser',
			contributed: '1',
			limit: '0',
			order: 'ts_edit',
			sort: 'desc',
			offset: '0',
		}).done(result => counts.text(result.listuserssearchuser.result_count));
	});
});