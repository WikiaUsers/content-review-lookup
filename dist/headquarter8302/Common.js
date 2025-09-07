/**
 * 
 * Welcome to Headquarter8302 Wiki's Common.js
 * 
 * Here you will find the JavaScript code that gets applied to the entire wiki.
 * This file is formatted in such a way so that each "sub-script" is neatly
 * isolated into their own IIFEs, making it easier to modify and copy them.
 * 
 * The formatting of each sub-script is noted in:
 * P:P/2025-08-Commonjs-1
 * 
 * = Wiki-wide configuration
 * = Redirect P: prefix
 * = importArticles
 * 
 * <nowiki>
 */

/**
 * @title Wiki-wide configuration
 * @description Window objects/properties that are applied to the entire wiki
 * @author User:Headquarter8302
 * 2025-08
 */
;(function (window) {
	window.wiki = window.wiki ||  {
		config: {
			styleBgTypes: ["animatedLinearGradient", "staticRadialGradient"],
		},
		pageName: window.mediaWiki.config.get('wgPageName'),
	};
	
	window.user = window.user || {};
})(this);

/**
 * @title Redirect P: prefix
 * @description Redirect main namespace pages with a P: prefix to their
 * respective pages in the Project namespace. This sub-script only runs when
 * the destination page exists.
 * @author User:Headquarter8302
 * @requires dev:Fetch
 * 2025-08
 */
;((window, mw) => {
	if (!window.wiki.pageName.startsWith("P:")) return;
	
	mw.hook('dev.fetch').add((fetch) => {
		fetch({
			name: "page-exists",
			request: (resolve, reject) => {
				new mw.Api().get({
					action: 'query',
					titles: "Project:".concat(window.wiki.pageName.slice(2))
				}).done((data) => {
					if (data.error)
						reject(data.error.code);

					resolve(data.query.normalized[0].to);
				}).fail(() => { reject() });
			}
		}).then((targetPage) => {
			this.document.getElementById("mw-content-text")
				.innerText = "Redirecting to ".concat(targetPage);

			this.location.replace(
				this.location.origin.concat("/wiki/").concat(targetPage)
			);
		});
	});
})(this, this.mediaWiki);

/**
 * @title importArticles
 * @description importArticle declaration
 */
importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:Fetch.js',
	]
});