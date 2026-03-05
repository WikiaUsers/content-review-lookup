'use strict';
(($, mw) => {
	const config = mw.config.values;
	const namespaceNumber = config.wgNamespaceNumber;
	if (window.PageTitlesScriptLoaded || namespaceNumber === -1){
		return;
	}
	window.PageTitlesScriptLoaded = true;
	const searchParams = new URLSearchParams(location.search);
	const isDiffView = searchParams.has('diff');
	const isRevView = searchParams.has('oldid');
	const isFile = namespaceNumber === 6;
	const titleRegExp = /^\(pagetitle = fandom-pagetitle: (.+)\)$/;
	const pageName = config.wgPageName.replaceAll('_', ' ');
	const namespaceName = config.wgFormattedNamespaces[namespaceNumber];
	const ns = `<span class="mw-page-title-namespace">${namespaceName}</span>`;
	const sep = '<span class="mw-page-title-separator">:</span>';
	const title = `<span class="mw-page-title-main">${config.wgTitle}</span>`;
	const talkPage = namespaceNumber % 2;
	const unprefixedNamespace = [
		6,
		8,
		10,
		14,
		502,
		2000,
	].includes(namespaceNumber);
	
	if (config.wgAction !== 'view' || ((isDiffView || isRevView) && !isFile)){
		if (config.wgUserLanguage === 'qqx'){
			$('#firstHeading').html(document.title.replace(titleRegExp, '$1'));
		} else {
			$('#firstHeading').html(document.title.split(' | ')[0]);
		}
		return;
	}
	
	if ((!talkPage && !unprefixedNamespace) || config.wgIsMainPage){
		return;
	}
	
	if (!isDiffView && !isRevView){
		$('#firstHeading').html(ns + sep + title);
	}
	
	mw.loader.using(['mediawiki.api', 'mediawiki.jqueryMsg'], () => {
		const api = new mw.Api({'parameters': {
			'action': 'query',
			'format': 'json',
			'formatversion': 2,
			'errorformat': 'plaintext',
			'uselang': config.wgUserLanguage,
		}});
		
		if (isFile){
			api.loadMessagesIfMissing([
				'pagetitle',
				'difference-title',
			]).done(() => {
				let titleText = pageName;
				if (isDiffView){
					titleText = mw.message('difference-title', pageName).text();
				}
				document.title = mw.message('pagetitle', titleText).text();
				if (isDiffView || isRevView){
					$('#firstHeading').html(titleText);
				}
			});
		}
		
		if (isDiffView || isRevView){
			return;
		}
		
		api.get({
			'prop': 'info',
			'titles': pageName,
			'inprop': 'displaytitle',
		}).done(data => {
			if (data.query.pages[0].displaytitle !== pageName){
				$('#firstHeading').html(data.query.pages[0].displaytitle);
			}
		});
	});
})(jQuery, mediaWiki);