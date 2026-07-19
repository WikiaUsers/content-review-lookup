/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});
$("section#UploadPhotosWrapper").load(function() {
        $('select[name="wpLicense"]#wpLicense > option:contains(None selected - this file may be deleted)').attr("value","Delete");
});

/* Category Rename Auto-update Script */
importArticles({ type: 'script', articles: [ 'u:dev:MediaWiki:CategoryRenameAuto-update/code.js' ] });