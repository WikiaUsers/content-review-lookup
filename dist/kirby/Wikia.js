(function ($) {

    /**
     * Adds link to image criteria on Wikia rail image module
     */
    function modalUploadImageMessage() {
        var seeMore = $('.LatestPhotosModule').find('a.more');
        $(seeMore).wrap('<span />');
        $('<a href=\"http://kirby.wikia.com/wiki/Kirby Wiki:Editor\'s Manual\#Image_policies\" title=\"Kirby Wiki:Editor\'s Manual\#Image policies\" class=\"more\" style=\"margin-right: 5px\">(Image policy)</a>').insertAfter(seeMore);
    }

    addOnloadHook(modalUploadImageMessage);

    function removeTouchScreenScssOverride() {
        var element = $('link[rel="stylesheet"][href*="skins/oasis/css/touchScreen.scss"]');
        element.remove();
    }
    
    addOnloadHook(removeTouchScreenScssOverride);

}(jQuery));