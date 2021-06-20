/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: 'script',
		articles: [
		'u:justleafy:MediaWiki:ModernLightbox.js',
		'u:justleafy:MediaWiki:HistoryKey.js'
	],
});

if (wgPageName === 'Special:Upload') {
    $('#wpUploadDescription').val('[[Category:Images]]');
}

window.lastEdited = {
    position: 'bottom',
    size: false,
    comment: false,
    time: true
};