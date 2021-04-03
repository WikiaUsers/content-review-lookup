// <nowiki>
(function() {
	var page = mw.config.get('wgCanonicalSpecialPageName');
	if (
		window.ImageCategoryLoaded ||
		!(/Upload|MultipleUpload/g.test(page))
	) {
        return;
	}
	window.ImageCategoryLoaded = true;
	
	var queryString = window.location.search;
	var urlParams = new URLSearchParams(queryString);

	if (urlParams.get('wpForReUpload') != 1) {
		$('#wpUploadDescription').val(window.ImageCategory || '[[Category:Images]]');
	}
})();