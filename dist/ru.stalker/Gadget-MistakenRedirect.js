/*
	Shows specific message box if the article
	was reached from the right redirect
*/
(function mistakenRedirect() {
	document
		.querySelectorAll('.mistaken-redirect')
		.forEach(function (messageBox) {
			messageBox
				.dataset.redirect.split('|')
				.forEach(function (redirectName) {
					var redirectLink = document
						.querySelector('.mw-redirectedfrom a');
					if (!redirectLink) return;
					if (redirectLink.title == redirectName) {
						messageBox.style.display = 'block';
					}
				});
		});
})();


/*
	Changes links in search modal and search page to their redirects
*/
(function changeRedirectLinks() {
	function setLinkHref(link, page) {
		link.href = mw.config.get('wgServer') +
			'/ru/wiki/' +
			encodeURI(page);
	}

	// on search modal
	var observer = new MutationObserver(function (mutations) {
  		mutations.forEach(function (mutation) {
    		if (
    			mutation.type != 'childList' ||
    			mutation.addedNodes.length == 0 ||
    			mutation.addedNodes[0].classList != 'search-modal'
    		) return;

    		var searchModal = mutation.addedNodes[0];
    		searchModal.addEventListener('mouseover', function (event) {
    			searchModal
    				.querySelectorAll('.wds-list a')
    				.forEach(function (link) {
    					if (!link.innerText.includes('Redirected')) return;
    					setLinkHref(
    						link,
    						link.querySelector('span > span').innerText
    					);
    				});
    		})
  		});
	});
	var config = { childList: true, subtree: true };
	observer.observe(document.body, config);

	// on Special:Search
	if (document.body.classList.contains('mw-special-Search')) {
		var request = document
			.querySelector('.unified-search__input__query').value;
		document
			.querySelectorAll('.unified-search__result__title')
			.forEach(function (link) {
				fetch(
					mw.config.get('wgServer') +
					'/ru/api.php?action=query&prop=redirects&titles=' +
					encodeURI(link.innerText) +
					'&formatversion=2&format=json'
				)
        			.then(function (response) {
            			return response.json();
        			})
        			.then(function (json) {
        				if (!json.query.pages[0].redirects) return;
        				var redirects = json.query.pages[0].redirects
        					.map(function (r) {
    							return r.title;
							});
        				redirects.forEach(function (redirect) {
        					if (
        						redirect.toLowerCase()
        							.match(request.toLowerCase())
        					) {
        						setLinkHref(link, redirect);
        					}
        				});
            		});
		});
	}
})();