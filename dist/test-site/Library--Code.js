var array = [];
function loadPages(namespace) {
	mw.loader.using('mediawiki.api').then(function() {
		var api = new mw.Api();
		function apiCall(apfrom) {
			api.get({
				action: "query",
				list: "allpages",
				apnamespace: namespace,
				apfrom: apfrom,
				aplimit: 5000, // if you don't have bot rights this will get interpreted as 500 by the API
// apfilterredir: 'nonredirects' // uncomment this if you don't want to list redirects
			}).done(function(d) {
				if(d.error) {
					// this means an API error happened
					console.log('API error: ' + d.error.code);
				} else {
					// the request was successful, add the pages to the array
					array = array.concat(d.query.allpages.map(function(el) { return el.title; }));
					if(d['query-continue']) {
						// there are more requests to make to get all pages
						apiCall(d['query-continue'].allpages.apfrom);
					} else {
						// all requests finished, your data is now in the array
					}
				}
			}).fail(function() {
				// this is what happens when your internet connection
				// throws up and you can't execute the API request
			});
		}
		// Let the maddness begin!
		apiCall();
	});
}
// continue adding namespace IDs to the array below
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].forEach(function(el) {
    loadPages(el);
});