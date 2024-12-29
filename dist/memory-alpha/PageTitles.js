$(function(){
	if (mw.config.get('wgNamespaceNumber') === -1){
		return;
	}
	
	var api = new mw.Api();
	var action = mw.config.get('wgAction');
	var id = (mw.config.get('wgArticleId') === 0) ? '-1' : mw.config.get('wgArticleId');
	var messages = [
		'page-header-title-prefix-changes',
		'page-header-title-prefix-history',
		'page-header-title-prefix-preview',
		'page-header-home',
	];
	
	api.loadMessagesIfMissing(messages).done(function(){
		api.get({
			action: 'query',
			prop: 'info',
			titles: mw.config.get('wgPageName'),
			inprop: 'displaytitle',
			format: 'json',
		}).done(function(data){
			var title = data.query.pages[id].displaytitle;
			
			if (action === 'history'){
				$('#firstHeading').html(mw.message('page-header-title-prefix-history', title).text());
			} else if (action === 'submit'){
				$('#firstHeading').html(mw.message('page-header-title-prefix-preview', title).text());
			} else if (new URLSearchParams(location.search).has('diff')){
				$('#firstHeading').html(mw.message('page-header-title-prefix-changes', title).text());
			} else if (mw.config.get('wgIsMainPage')){
				$('.mainpage #firstHeading').html(mw.message('page-header-home').text());
			} else {
				$('#firstHeading').html(title);
			}
		});
	});
});