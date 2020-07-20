/* Any JavaScript here will be loaded for all users on every page load. */
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
    $('#wpUploadDescription').val(window.ImageCategory || '{{Image Attribution\n |Description = \n |Source = \n |Author = \n}}');
})();