/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready(function() {
    // Override default tooltips
    $(".tooltip").children().removeAttr("title")
});

window.onmousemove = function(e) {
    // Position tooltips at bottom-right of cursor
    $(".tooltip span").css("top", e.clientY + 20);
    $(".tooltip span").css("left", e.clientX + 20);
};