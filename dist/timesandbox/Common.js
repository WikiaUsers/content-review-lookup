/* Any JavaScript here will be loaded for all users on every page load. */
jQuery(document).ready(function($) {
    $(".dc-table td").click(function() {
        window.document.location = $(this).data("href");
    });
});