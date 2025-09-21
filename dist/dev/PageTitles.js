'use strict';
(($, mw) => {
	const ns = mw.config.get('wgNamespaceNumber');
	if (window.PageTitlesScriptLoaded || ns === -1){
		return;
	}
	
	window.PageTitlesScriptLoaded = true;
	
	const action = mw.config.get('wgAction');
	const activeEdit = ['edit', 'submit'].indexOf(action) !== -1;
	const articleId = mw.config.get('wgArticleId');
	const id = !articleId ? -1 : articleId;
	const mainPage = mw.config.get('wgIsMainPage');
	const nsFormatted = mw.config.get('wgFormattedNamespaces')[ns];
	const f = new RegExp(`^ *(${nsFormatted}) *: *(.+) *$`, 'i');
	const nsString = '<span class="mw-page-title-namespace">$1</span>';
	const sepString = '<span class="mw-page-title-separator">:</span>';
	const tString = '<span class="mw-page-title-main">$2</span>';
	const messages = [
		'creating',
		'editing',
		'editingcomment',
		'editingsection',
		'page-header-title-prefix-history',
		'page-header-title-prefix-changes',
	];
	
	mw.loader.using(['mediawiki.api'], () => {
		const api = new mw.Api();
		
		api.loadMessagesIfMissing(messages).done(() => {
			api.get({
				prop: 'info',
				titles: mw.config.get('wgPageName'),
				inprop: 'displaytitle',
			}).done(data => {
				const title = data.query.pages[id].title;
				const dt = data.query.pages[id].displaytitle;
				const htmlTitle = dt.replace(f, nsString + sepString + tString);
				const searchParams = new URLSearchParams(location.search);
				
				mw.hook('wikipage.content').add(() => {
					if (activeEdit && id === -1){
						setHeading(title, 'creating');
					} else if (activeEdit && searchParams.get('section') === 'new'){
						setHeading(title, 'editingcomment');
					} else if (activeEdit && searchParams.has('section')){
						setHeading(title, 'editingsection');
					} else if (activeEdit){
						setHeading(title, 'editing');
					} else if (action === 'history'){
						setHeading(title, 'page-header-title-prefix-history');
					} else if (searchParams.has('diff')){
						setHeading(title, 'page-header-title-prefix-changes');
					} else if (!mainPage && nsFormatted){
						$('#firstHeading').html(htmlTitle);
					}
				});
			});
		});
	});
	
	function setHeading(param, msg){
		$('#firstHeading').html(mw.message(msg, param).text());
	}
})(jQuery, mediaWiki);