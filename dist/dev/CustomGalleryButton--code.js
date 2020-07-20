/**
 * CustomGalleryButton * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 * Last update: 20:23, January 22, 2019 (UTC)
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 * Attribution:
 *     Creator: RyaNayR
 *     Editors: Cqm, Prince(ss) Platinum, Bobogoobo, AnimatedCartoons,
 *              Rappy 4187, KockaAdmiralac, Quentum
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 * Description: Allows customization of the button shown below image galleries
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */
(function ($) {
    function init (i18n) {
        var $gallery = $('.wikia-photogallery-add');
        if ($gallery.length) {
            $gallery.text(
                window.galleryButtonText ||
                i18n.msg('text').plain()
            );
            if (!window.galleryButtonIconHidden) {
                $gallery.prepend(
                    $('<img>', {
                        src: window.galleryButtonIcon || 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D',
                        'class': 'sprite photo'
                    })
                );
            }
        }
    }
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('CustomGalleryButton').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})(jQuery);