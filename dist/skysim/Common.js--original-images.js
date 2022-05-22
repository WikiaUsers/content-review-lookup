$(function () {
    if (window.imagesReplaced) {
        return;
    }

    window.imagesReplaced = true;
    window.wikiImageRenderOpts = window.wikiImageRenderOpts || {};

    // Infobox images
    // Disabled due to this wiki's setting of removing all srcset attributes
    // $(".pi-image-thumbnail").each(function () {
    //     var srcsetvar = $(this).attr("srcset");
    //     var srcarray = srcsetvar.split(" ");
    //     $(this).attr("srcset", srcarray[0] + "&format=original");
    // });

    //Other images
    function reload_imgs(target) {
        var $target = $(target), srcvar0, srcvar;
        srcvar0 = srcvar = $target.attr("src");
        var pattern = /(?:static|vignette|images)\.wikia\.nocookie\.net/;
        if (srcvar && pattern.exec(srcvar)) {
            if (!window.wikiImageRenderOpts.allowDownscaling)
                if (($target.attr("width") || $target.attr("height") || $target.parents(".wikia-gallery-item").length > 0) && !/\.svg/.test(srcvar))
                    srcvar = srcvar.replace(/\/scale\-to\-width\-down\/\d+/g, "");

            if (window.wikiImageRenderOpts.formatOriginal && !/format=original/.test(srcvar)) {
                if (srcvar.includes("?"))
                    srcvar = srcvar + "&format=original";
                else
                    srcvar = srcvar + "?format=original";
            }

            if (srcvar !== srcvar0)
                $target.attr("src", srcvar);
        }
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
});