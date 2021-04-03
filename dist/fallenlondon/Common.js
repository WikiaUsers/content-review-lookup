/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
    ]
});
// Dynamic Templates
$(function() {
	if ($('.jcConfig').length) {
		importScript('MediaWiki:Common.js/calc.js');
		importStylesheet('MediaWiki:Common.css/calc.css');
	}

    if ($('pre.flTruncateStart').length) {
        importScript('MediaWiki:Common.js/truncate.js');
    }

    importScriptPage('PurgeButton/code.js', 'dev');
});