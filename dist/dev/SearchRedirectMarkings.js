$.when(
	mw.loader.using(['mediawiki.api', 'mediawiki.util']),
	mw.hook('wikipage.content').add(function(){ return true; })
).then(function(){
	return new mw.Api().loadMessagesIfMissing(['redirectedfrom']);
}).then(function(){
	mw.util.addCSS(
		'.search-app__suggestions-box {'+
			'resize: vertical;'+
			'overflow: hidden;'+
		'}'+
		'.search-app__suggestion {'+
			'height: unset;'+
			'min-height: 32px;'+
			'margin-top: 5px;'+
			'> a {'+
				'-webkit-line-clamp: none;'+
				'word-break: break-word !important;'+
			'}'+
		'}'
	);
	var config = mw.config.values;
	var checkRedirects = function (s) {
		$('.search-app__suggestions-list:first-child:last-child .search-app__suggestion:not(.search-redirectChecked) > a').each(function(_, el) {
			el.parentNode.classList.add('search-redirectChecked');
			var name = el.textContent;
			var keyword = new RegExp(el.closest('.search-app__wrapper').querySelector('input').getAttribute('value').replace(/(^\s*|\s*$)/g, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
			Object.keys(s.redirects).forEach(function(k) {
				if (name == s.redirects[k]) {
					el.setAttribute('href', mw.util.getUrl(k));
					$(el).append(' <small><i>'+mw.msg('redirectedfrom', k.replace(keyword, '<b>$&</b>'))+'</i></small>');
					name = '_'; // Max 1 redirect listed
				}
			});
		});
	};
	
	
	// set up the mutation observer
	var observer = new MutationObserver(function (mutations, me) {
		var targetNode = document.querySelector('.search-app__suggestions-list:first-child:last-child .search-app__suggestion:not(.search-redirectChecked)');
		if (targetNode) {
			fetch('https://'+config.wgServerName+config.wgScriptPath+'/wikia.php?controller=UnifiedSearchSuggestions&method=getSuggestions&format=json&scope=internal&query='+encodeURIComponent(targetNode.closest('.search-app__wrapper').querySelector('.search-app__input').getAttribute('value')))
			.then(function(e){return e.json();})
			.then(checkRedirects);
			return;
		}
	});
	// start observing
	observer.observe(document, { childList: true, subtree: true });
});