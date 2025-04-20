mw.loader.using(['mediawiki.api'], () => {
	if (mw.config.get('wgNamespaceNumber') === -1){
		return;
	}
	
	const api = new mw.Api();
	const action = mw.config.get('wgAction');
	const articleId = mw.config.get('wgArticleId');
	const id = !articleId ? -1 : articleId;
	const messages = [
		'creating',
		'editing',
		'page-header-title-prefix-history',
		'page-header-title-prefix-changes',
		'page-header-home',
	];
	
	api.loadMessagesIfMissing(messages).done(() => {
		api.get({
			action: 'query',
			prop: 'info',
			titles: mw.config.get('wgPageName'),
			inprop: 'displaytitle',
			format: 'json',
		}).done((data) => {
			const title = data.query.pages[id].displaytitle;
			const activeEdit = ['edit', 'submit'].indexOf(action) !== -1;
			
			if (activeEdit && id === -1){
				setPageHeading('creating', title);
			} else if (activeEdit){
				setPageHeading('editing', title);
			} else if (action === 'history'){
				setPageHeading('page-header-title-prefix-history', title);
			} else if (new URLSearchParams(location.search).has('diff')){
				setPageHeading('page-header-title-prefix-changes', title);
			} else if (mw.config.get('wgIsMainPage')){
				setPageHeading('page-header-home');
			} else {
				$('#firstHeading').html(title);
			}
		});
	});
});

function setPageHeading(msg, param){
	if (msg === 'page-header-home'){
		$('.mainpage #firstHeading').html(mw.message(msg).text());
	} else {
		$('#firstHeading').html(mw.message(msg, param).text());
	}
}