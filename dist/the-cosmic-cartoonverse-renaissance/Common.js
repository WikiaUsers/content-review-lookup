/* organization */
if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
$('#wpUploadDescription').val('[[Category:Images]]');
}


window.rwaOptions = {
	limit: 50,
	namespaces: [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
	autoInit: true 
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WikiActivity.js',
    ]
});