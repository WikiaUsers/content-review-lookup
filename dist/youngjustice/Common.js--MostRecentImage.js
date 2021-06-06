/* Turns last image collection tab into current
 * By: [[User:KettleMeetPot]]
 */
$(document).ready(function() {
    $(".pi-theme-MostRecentImage ul.wds-tabs_wrapper > li.current").removeClass("current");
    $(".pi-theme-MostRecentImage ul.wds-tabs_wrapper > li:last-child").addClass("current");
    $(".pi-theme-MostRecentImage div.pi-image-collection > div.current").removeClass("current");
    $(".pi-theme-MostRecentImage div.pi-image-collection > div:last-child").addClass("current");
});
/* Replacement code for UCX */
$(document).ready(function() {
    $(".pi-theme-MostRecentImage ul.wds-tabs_wrapper > li.wds-is-current").removeClass("wds-is-current");
    $(".pi-theme-MostRecentImage ul.wds-tabs_wrapper > li:last-child").addClass("wds-is-current");
    $(".pi-theme-MostRecentImage div.pi-image-collection.wds-tabber > div.wds-is-current").removeClass("wds-is-current");
    $(".pi-theme-MostRecentImage div.pi-image-collection.wds-tabber > div:last-child").addClass("wds-is-current");
});