/*
 * Fork of https://memory-alpha.fandom.com/wiki/MediaWiki:PageTitles.js
 * [[w:c:memory-alpha:MediaWiki:PageTitles.js]]
 *
 * This script ensures that the namespace of a wiki page is shown in
 * the top-level heading (HTML tag <h1>) of of pages on the wiki.
 */

// doc: [[mw:ResourceLoader/Core modules#mw.loader]] // https://www.mediawiki.org/wiki/ResourceLoader/Core_modules#mw.loader
mw.loader.using(['mediawiki.api'], () => {
	// doc: [[mw:ResourceLoader/Core modules#mw.config]] // https://www.mediawiki.org/wiki/ResourceLoader/Core_modules#mw.config
	// doc: [[mw:Manual:Interface/JavaScript#mw.config]] // https://www.mediawiki.org/wiki/Manual:Interface/JavaScript#mw.config
	if (mw.config.get('wgNamespaceNumber') === -1) {
		// do nothing on special pages, which have custom headings
		return;
	}
	
	// doc: [[mw:ResourceLoader/Core modules#mediawiki.api]]
	const api = new mw.Api();
	const action = mw.config.get('wgAction');
	const articleId = mw.config.get('wgArticleId');
	const id = !articleId ? -1 : articleId;
	const messages = [
		'creating', // [[MediaWiki:Creating]]
		'editing', // [[MediaWiki:Editing]]
		'page-header-title-prefix-history', // [[MediaWiki:Page-header-title-prefix-history]]
		'page-header-title-prefix-changes', // [[MediaWiki:Page-header-title-prefix-changes]]
	];

	// https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#loadMessagesIfMissing
	api.loadMessagesIfMissing(messages).done(() => {
		// https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#get
		api.get({
			action: 'query', // see also https://en.wikipedia.org/w/api.php?action=help&modules=query
			prop: 'info',
			titles: mw.config.get('wgPageName'),
			inprop: 'displaytitle',
			format: 'json',
		}).done((data) => {
			const title = data.query.pages[id].displaytitle;
			const activeEdit = ['edit', 'submit'].indexOf(action) !== -1;
			
			if (activeEdit && id === -1) {
				setPageHeading('creating', title);
			} else if (activeEdit) {
				setPageHeading('editing', title);
			} else if (action === 'history') {
				setPageHeading('page-header-title-prefix-history', title);
			} else if (new URLSearchParams(location.search).has('diff')) {
				setPageHeading('page-header-title-prefix-changes', title);
			} else if (mw.config.get('wgIsMainPage')) {
				/* do nothing on the main page */
			} else {
				setFirstHeading(title);
			}
		});
	});
});

function setPageHeading(msg, param) {
	// doc: [[mw:ResourceLoader/Core modules#mw.message]]
	setFirstHeading(mw.message(msg, param).text());
}

function setFirstHeading(newTitle) {
	const pageTitleElement = document.querySelector('#firstHeading');
	pageTitleElement.replaceChildren(document.createTextNode(newTitle));
}