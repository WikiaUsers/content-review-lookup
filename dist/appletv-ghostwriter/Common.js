/* Any JavaScript here will be loaded for all users on every page load. */
//Add border color to infoboxes
//Credits to Steven Universe Wiki
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});