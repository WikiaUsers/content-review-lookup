/* Turns last image collection tab into current
 * By: [[User:KettleMeetPot]]
 */
$(document).ready(function() {
    $(".type-character ul.pi-image-collection-tabs > li.current").removeClass("current");
    $(".type-character ul.pi-image-collection-tabs > li:last-child").addClass("current");
    $(".type-character div.pi-image-collection > div.current").removeClass("current");
    $(".type-character div.pi-image-collection > div:last-child").addClass("current");
});