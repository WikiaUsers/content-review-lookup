/*This one is for unused video files */
if (mediaWiki.config.get("wgPageName") === "Special:UnusedVideos") {
    $(function () {
        var str = "";
        $('.gallerytext > a').each(function () {
            str += decodeURIComponent(this.href.substring(this.href.indexOf("File"))) + "\n";
        });
        var $textarea = $('<textarea style="width: 95%; height: 100px"></textarea>');
        $textarea.val(str);
        $('.gallery').before($textarea);
    });
}

/*This one is for category files */
if (mediaWiki.config.get("wgPageName") === "Category%3ADiorama_Photos") {
    $(function () {
        var str = "";
        $('.gallerytext > a').each(function () {
            str += decodeURIComponent(this.href.substring(this.href.indexOf("File"))) + "\n";
        });
        var $textarea = $('<textarea style="width: 95%; height: 100px"></textarea>');
        $textarea.val(str);
        $('.gallery').before($textarea);
    });
}

// Temporary fix for Slideshow Gallery not being able to be clicked on and activate Lightbox
$(".wikia-slideshow-images-wrapper img.thumbimage").wrap("<a class='image lightbox'></a>");
$(".wikia-slideshow-images-wrapper a.wikia-slideshow-image" ).remove();