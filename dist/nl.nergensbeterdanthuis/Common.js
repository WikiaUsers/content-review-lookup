/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

$(window).on('load.tabberhack', function() {
    if ($('.tabberlive').length) {
        $('.tabberlive')[0].tabber.tabShow($('.tabbernav li').length - 1); // Switch to last tab
    }
    $(window).off('load.tabberhack');
});