/* Any JavaScript here will be loaded for all users on every page load. */

// For the Spoiler Template
$('.spoiler').on('click', function() {
    var $spoiler = $(this).siblings('.spoiler-container');
    $spoiler.css('display', ($spoiler.css('display') === 'inline' ? 'none' : 'inline'));
});