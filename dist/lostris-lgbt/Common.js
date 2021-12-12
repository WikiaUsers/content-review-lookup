/* Any JavaScript here will be loaded for all users on every page load. */

/* Main page - Content portals (from Lucifer Wiki) */

jQuery(document).ready(function($) {
    $(".mpcontent-js-click td").click(function() {
        window.document.location = $(this).data("href");
    });
});


jQuery(document).ready(function($) {
    $(".mpcontent-js-click .mp-character-portal").click(function() {
        window.document.location = $(this).data("href");
    });
});