importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:HydraRevived.js',
    ]
});
setTimeout(function() {
	var tabs = document.getElementsByClassName("wds-collapsible-panel");
	for (var elem in tabs) {
		tabs[elem].className += (" wds-is-collapsed");
	}
}, 840)