/* 此处的JavaScript将加载于所有用户每一个页面。 */

//Reference Popups
importArticles({
    type: "script",
    articles: [
        "w:c:dev:ReferencePopups/code.js"
    ]
});

//Open external links in new tabs
mw.hook('wikipage.content').add(function($content) {
	// Second selector is for external links in Parsoid HTML+RDFa output (bug 65243).
	$content.find('a.external, a[rel="mw:ExtLink"]').each(function () {
		// Can't use wgServer because it can be protocol relative
		// Use this.href property instead of this.getAttribute('href')  because the property
		// is converted to a full URL (including protocol)
		if (this.href.indexOf(location.protocol + '//' + location.hostname) !== 0) {
			this.target = '_blank';
		}
	});
});