/* Turns last image collection tab into current
 * By: [[User:KettleMeetPot]]
 */
$(document).ready(function() {
    $(".pi-theme-character ul.pi-image-collection-tabs > li.current").removeClass("current");
    $(".pi-theme-character ul.pi-image-collection-tabs > li:last-child").addClass("current");
    $(".pi-theme-character div.pi-image-collection > div.current").removeClass("current");
    $(".pi-theme-character div.pi-image-collection > div:last-child").addClass("current");
});