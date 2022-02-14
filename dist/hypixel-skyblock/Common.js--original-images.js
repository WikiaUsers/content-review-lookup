/**
 * This script is a modified version of https://dev.fandom.com/wiki/OriginalImages:
 * From https://tibia.fandom.com/wiki/MediaWiki:Common.js?oldid=859037 (lines 826-856)
 * and https://lotrminecraftmod.fandom.com/wiki/MediaWiki:Common.js?oldid=630207 (lines 176-200)
 */

(function (window, $) {
    if (window.imagesReplaced) {
        return;
    }

    window.imagesReplaced = true;

    // Infobox images
    // Disabled due to this wiki's setting of removing all srcset attributes
    // $(".pi-image-thumbnail").each(function () {
    //     var srcsetvar = $(this).attr("srcset");
    //     var srcarray = srcsetvar.split(" ");
    //     $(this).attr("srcset", srcarray[0] + "&format=original");
    // });

    //Other images
    function reload_imgs(target) {
        var $target = $(target);
        var srcvar = $target.attr("src");
        var pattern = /(?:static|vignette|images)\.wikia\.nocookie\.net/;
        if (srcvar && !srcvar.endsWith("format=original") && pattern.exec(srcvar)) {
            if ($target.attr("width") || $target.attr("height"))
                srcvar = srcvar.replace(/\/scale\-to\-width\-down\/\d+/g, "");

            if (srcvar.includes("?"))
                $target.attr("src", srcvar + "&format=original");
            else
                $target.attr("src", srcvar + "?format=original");
        }
        return;
    }
    document.body.addEventListener("load", function (event) {
        const target = event.target;
        if ($(target).is("img")) {
            reload_imgs(target);
        }
    }, true);
    $(".page__main img").each(function () {
        if (this.complete) {
            reload_imgs(this);
        }
    });
})(this, jQuery);