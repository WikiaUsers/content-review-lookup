/* Scripts which are imported via [[MediaWiki:ImportJS]]
Mediawiki:Common.js/Banner.js
*/

$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});