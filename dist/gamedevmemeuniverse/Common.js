/* Any JavaScript here will be loaded for all users on every page load. */
/* Reveal spoiler on click and keep it revealed */
$(function() {
    $('.spoilerblur').on('click', function() {
        $(this).addClass('revealed');
    });
});