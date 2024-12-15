$(function(){
	var api = new mw.Api();
	var action = mw.config.get('wgAction');
	var id = (mw.config.get('wgArticleId') === 0) ? '-1' : mw.config.get('wgArticleId');
	var messages = [
		'page-header-title-prefix-changes',
		'page-header-title-prefix-history',
		'page-header-title-prefix-preview',
	];
	
	api.loadMessagesIfMissing(messages).done(function(){
		api.get({
			action:'query',
			prop:'info',
			titles:mw.config.get('wgPageName'),
			inprop:'displaytitle',
			format:'json',
		}).done(function(data){
			var dt = data.query.pages[id].displaytitle;
			
			if (action === 'history'){
				$('#firstHeading').html(mw.message('page-header-title-prefix-history', dt).text());
			} else if (action === 'submit'){
				$('#firstHeading').html(mw.message('page-header-title-prefix-preview', dt).text());
			} else if (new URLSearchParams(location.search).has('diff')){
				$('#firstHeading').html(mw.message('page-header-title-prefix-changes', dt).text());
			} else {
				$('#firstHeading').html(dt);
				$('.ns-102.page-Portal_Main #firstHeading').html('Welcome to Memory Alpha');
			}
		});
	});
});