$(document).ready(function() {
    $('.random-button').click(function() {
        var container = $(this).closest('.random-container');
        var urls = container.data('urls').split('|');
        var randomIndex = Math.floor(Math.random() * urls.length);
        window.location.href = urls[randomIndex];
    });
});