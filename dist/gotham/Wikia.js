$(function() {
    /* Gallery Button */
    if($('#showgallerybutton').length) {
        $('.wikinav2 .WikiaPageHeader > .comments[data-id]').before('<a class="wikia-button comments secondary" href="/wiki/'+ encodeURIComponent(wgPageName) + "/Gallery" +'" title="Photo gallery"><img src="https://vignette.wikia.nocookie.net/gotham-inc/images/1/15/Gallery_image.png" style="vertical-align:middle;" /> Gallery</a>');
    }
});