$('.pi-section-tab').click(function() {
    setTimeout(function() {
        $(window).scroll();
    }, 100);
});

/* Allow direct link to Tabber */
 
(function ($){
    var hash = window.location.hash.replace('#', '').replace(/_/g, ' ');
    if (hash === '') return;
    $(function(){
        setTimeout(function() {
            var currentTabber = $('.tabbernav > li > a[title="' + hash + '"]');
            currentTabber.click();
        }, 100);
    });    
})(jQuery);