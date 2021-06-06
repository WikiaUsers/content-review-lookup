/* Turns last image collection tab into current
 * Old (By: [[User:KettleMeetPot]]) */
$(document).ready(function() {
    $(".pi-theme-last ul.pi-image-collection-tabs > li.current").removeClass("current");
    $(".pi-theme-last ul.pi-image-collection-tabs > li:last-child").addClass("current");
    $(".pi-theme-last div.pi-image-collection > div.current").removeClass("current");
    $(".pi-theme-last div.pi-image-collection > div:last-child").addClass("current");
});
/* Replacement code for UCX */
$(document).ready(function() {
    $(".pi-theme-last ul.wds-tabs > li.wds-is-current").removeClass("wds-is-current");
    $(".pi-theme-last ul.wds-tabs > li:last-child").addClass("wds-is-current");
    $(".pi-theme-last div.pi-image-collection.wds-tabber > div.wds-is-current").removeClass("wds-is-current");
    $(".pi-theme-last div.pi-image-collection.wds-tabber > div:last-child").addClass("wds-is-current");
});