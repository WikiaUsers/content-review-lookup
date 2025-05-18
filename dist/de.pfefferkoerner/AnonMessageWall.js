/**
 * @param string url
 * @param string key
 * @param string value
 */
function setUrlQueryParam(url, key, value) {
	const newUrl = new URL(url);
	newUrl.searchParams.set(key, value);
	return newUrl.href;
}

mw.hook( 'wikipage.content' ).add(function() {
	const config = mw.config.get([
	  'wgNamespaceNumber',
	  'wgContentLanguage',
	  'wgTitle',
	]);
	
	const redirectMap = {
		2: { page: 'Special:Contributions/{ipAddress}' }, // Profile
		1200: { page: 'User Talk:{ipAddress}', redirect: 'no' }, // Message wall
	};

	if (!mw.util.isIPAddress(config.wgTitle)) return;

	if (typeof redirectMap[config.wgNamespaceNumber] !== 'undefined') {
		const mapped = redirectMap[config.wgNamespaceNumber];
		document.location = mw.util.getUrl(mapped.page.replace('{ipAddress}', config.wgTitle), typeof mapped.redirect !== 'undefined' ? mapped.redirect : {});
	}

	if (config.wgNamespaceNumber === 3) {
		const addSectionActionEl = document.getElementById('ca-addsection');
		addSectionActionEl.href = setUrlQueryParam(addSectionActionEl.href, 'redirect', 'no');
		
		actions = document.querySelectorAll('#p-cactions > ul > li');
		
		for (var action of actions) {
			const actionEl = action.querySelector('a');
			actionEl.href = setUrlQueryParam(actionEl.href, 'redirect', 'no');
		}
	}
});