/*
 * This will append certain elements for the new wiki style :)
 * Including the new cranes
 * And scrolling clouds
 */

/* Scrolling Clouds Function */
var offset = 0;
function scrollClouds() {
    offset++;
    $('.craneClouds').css("background-position",  + offset + "px 0");
    var cloudBg = setTimeout("scrollClouds();", 100);
}

/* Run when the document is ready */
$(document).ready(function() {
    /* Scrolling Clouds */
    $('body').prepend('<div class="craneClouds"></div>');
    scrollClouds();
});