'use strict';
(($, mw) => {
	const config = mw.config.values;
	const ns = config.wgNamespaceNumber;
	if (window.PageTitlesScriptLoaded || ns === -1){
		return;
	}
	window.PageTitlesScriptLoaded = true;
	const action = config.wgAction;
	const activeEdit = ['edit', 'submit'].indexOf(action) !== -1;
	const articleId = config.wgArticleId;
	const id = !articleId ? -1 : articleId;
	const mainPage = config.wgIsMainPage;
	const nsFormatted = config.wgFormattedNamespaces[ns];
	const f = new RegExp(`^ *(${nsFormatted}) *: *(.+) *$`, 'i');
	const nsString = '<span class="mw-page-title-namespace">$1</span>';
	const sepString = '<span class="mw-page-title-separator">:</span>';
	const tString = '<span class="mw-page-title-main">$2</span>';
	const messages = [
		'creating',
		'delete-confirm',
		'difference-title',
		'editing',
		'editingcomment',
		'editingsection',
		'history-title',
		'pageinfo-title',
		'protect-title',
	];
	
	mw.loader.using(['mediawiki.api'], () => {
		const api = new mw.Api();
		api.loadMessagesIfMissing(messages).done(() => {
			api.get({
				prop: 'info',
				titles: config.wgPageName,
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
						setHeading(title, 'history-title');
					} else if (action === 'info'){
						setHeading(title, 'pageinfo-title');
					} else if (action === 'protect' || action === 'unprotect'){
						setHeading(title, 'protect-title');
					} else if (action === 'delete'){
						setHeading(title, 'delete-confirm');
					} else if (searchParams.has('diff')){
						setHeading(title, 'difference-title');
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