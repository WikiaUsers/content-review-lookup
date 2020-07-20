/* Allows the entire box on Help:Contents to be clickable */

$('.centralhelpbox').click(function() {
    window.location.href = '/wiki/' + $(this).attr('data-link');
});