/* Any JavaScript here will be loaded for all users on every page load. */
// Load required scripts
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:ShowHide/code.js",
        "u:dev:MediaWiki:OwlCarousel.js"
    ]
});

// Ensure jQuery is available before running the script
mw.loader.using(['jquery'], function () {
    $(document).ready(function () {
        $(".owl-carousel").owlCarousel({
            items: 1, // Show one image at a time
            loop: true, // Infinite loop
            margin: 10,
            autoplay: true, // Auto switch images
            autoplayTimeout: 3000, // 3 seconds per image
            autoplayHoverPause: true
        });
    });
});