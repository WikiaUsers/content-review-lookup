/* Turns last image collection tab into current */
$(document).ready(function() {
    $(".pi-theme-last ul.wds-tabs > li.wds-is-current").removeClass("wds-is-current");
    $(".pi-theme-last ul.wds-tabs > li:last-child").addClass("wds-is-current");
    $(".pi-theme-last div.pi-image-collection.wds-tabber > div.wds-is-current").removeClass("wds-is-current");
    $(".pi-theme-last div.pi-image-collection.wds-tabber > div:last-child").addClass("wds-is-current");
});