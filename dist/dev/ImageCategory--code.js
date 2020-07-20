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
    $('#wpUploadDescription').val(window.ImageCategory || '[[Category:Images]]');
})();