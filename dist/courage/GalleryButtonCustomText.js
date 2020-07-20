(function ($) {
    var galleryButtonText = window.galleryButtonText || 'Add photo / Edit gallery',
        galleryButtonIcon = window.galleryButtonIcon || 'https://images.wikia.nocookie.net/dev/images/a/af/Gallery-add-photo.gif',
        galleryButtonIconHidden = window.galleryButtonIconHidden || false;
    if (galleryButtonIconHidden) {
        $('.wikia-photogallery-add').text(galleryButtonText);
    } else {
        $('.wikia-photogallery-add').html('<img src="' + galleryButtonIcon + '" />&nbsp;' + galleryButtonText);
    }
}(jQuery));