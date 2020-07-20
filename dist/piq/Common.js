/* Any JavaScript here will be loaded for all users on every page load. */

$('.switch').mouseover(function() {
    $(this).fadeOut("slow");
});

$('.switch').mouseout(function() {
    $(this).fadeIn("slow");
});