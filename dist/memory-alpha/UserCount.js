mw.loader.using(['mediawiki.api'], () => {
	if (!$('.number-of-users').length){
		return;
	}
	
	const api = new mw.Api();
	api.get({
		action: 'listuserssearchuser',
		contributed: '1',
		limit: '0',
		order: 'ts_edit',
		sort: 'desc',
		offset: '0',
	}).done(result => $('.number-of-users').text(result.listuserssearchuser.result_count));
});