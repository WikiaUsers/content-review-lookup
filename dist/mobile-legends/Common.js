/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready(function() {
    $(".tooltip-trigger").hover(
        function() {
            $(this).siblings(".tooltip").stop().animate({ left: '+=50px' }, 'fast');
        },
        function() {
            $(this).siblings(".tooltip").stop().animate({ left: '-=50px' }, 'fast');
        }
    );
});