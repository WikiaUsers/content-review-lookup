/* Any JavaScript here will be loaded for all users on every page load. */

jQuery(document).ready(function($) {
    $(".j100-js-click td").click(function() {
        window.document.location = $(this).data("href");
    });
});


jQuery(document).ready(function($) {
    $(".j100-js-click .mp-character-portal").click(function() {
        window.document.location = $(this).data("href");
    });
});