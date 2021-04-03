/********************************************************
*   Image Tabber
*   Code credited to the League of Legends Wiki
********************************************************/
/* Skinviewer: loading fix */
$(window).load(function() {
    $('.lazyimg-wrapper img').trigger("onload");
});
 
/* Skinviewer: Skinselektor onclick */
$(document).on("click", "span.show", function () {
    $(this).closest('.content-wrapper').find('> div').hide();
    $('#item-' + this.id).fadeIn();
});