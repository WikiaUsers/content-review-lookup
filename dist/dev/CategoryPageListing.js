/*************
Title        :   CategoryPageListing
Description  :   Listing pages of a requested category in a bullet-point, in-line block manner.
Author       :   Vastmine1029
Version      :   1.0
*************/

mw.loader.using(['mediawiki.api', 'mediawiki.util'], function () {
	var api = new mw.Api();
	var ns = mw.config.get('wgFormattedNamespaces')[14].replace(/ /g, '_');
	var pattern = new RegExp('^(Category|' + ns + ')_');
	var selector = 'div[id^="Category_"], div[id^="' + ns + '_"]';
	var container = document.getElementById('mw-content-text');
	if (!container) return;
	var categories = container.querySelectorAll(selector);
	for (var i = 0; i < categories.length; i++) {
		main(categories[i]);
	}

	function main(categoryElement) {
		api.get({
			action: 'query',
			list: 'categorymembers',
			cmtitle: categoryElement.id.replace(pattern, '$1:'),
			cmlimit: 'max',
		}).then(function (d) {
			var cm = d.query.categorymembers;
			var the_HTML = document.createDocumentFragment();
			for (var i = 0; i < cm.length; i++) {
				var t = cm[i].title;
				var a = document.createElement('a');
				a.setAttribute('href', mw.util.getUrl(t));
				a.textContent = t;
				the_HTML.appendChild(a);
				if (i < cm.length - 1) {
					the_HTML.appendChild(document.createTextNode(' \u2022 ')); // bullet
				}
			}
			categoryElement.replaceChildren(the_HTML);
		});
	}
});