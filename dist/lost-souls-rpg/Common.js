$(function() {
    
    $('.tabberlive .tabbertab').each(function() {
        $(this).show(); 
        mw.hook('wikipage.content').fire($(this)); 
        $(this).hide(); 
    });
});