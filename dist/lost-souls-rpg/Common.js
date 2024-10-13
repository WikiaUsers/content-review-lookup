$(function() {
    
    $('.tabberlive .tabbertab').each(function() {
        $(this).show(); 
        mw.hook('wikipage.content').fire($(this)); 
        $(this).hide(); 
    });
});

window.tooltips_config = {
    events: ['mouseover'],
    noCSS: true,
    offsetX: 5,
    offsetY: 10,
    waitForImages: true,
}