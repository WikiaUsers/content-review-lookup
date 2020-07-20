//<tabber> extension req
//set active tab: https://wikia.wikia.com/page#activeTab
//v1.0, 2017, user:fngplg.
(function ($){
    var nstarget = window.location.hash.replace('#', '');
    if (nstarget === '') return;
    //convert wiki-utf 2 ansi
    nstarget=nstarget.replace(/\./g, '%').replace(/_/g, ' ');
    nstarget = decodeURI(nstarget);
    //console.log('trgt:'+nstarget);
    var nw84i = 0;
    //tbb w8ing block
    var nw84tabber = setInterval(function(){
            nw84i++;
            if (nw84i > 100) {
                clearInterval(nw84tabber);
            }
            if (window.tabberObj) {
                clearInterval(nw84tabber);
                //console.log('tabber:'+window.tabberObj.length);
                setTimeout(function() {
                    var $nt2a = $('.tabberlive>.tabbernav>li>a[title="'+nstarget+'"]');
                    $nt2a.click();
                }, 100);//settimeout
            }
        }, 100); //nw84tabber interval
})(jQuery);