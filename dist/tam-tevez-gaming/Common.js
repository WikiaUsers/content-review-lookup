switch (mw.config.get('wgPageName')) {
    case 'page name':
        // JS here will be applied to "page name"
        break;
    case 'some other page':
        // JS here will be applied to "some other page"
        break;
}/* Any JavaScript here will be loaded for all users on every page load. */
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});