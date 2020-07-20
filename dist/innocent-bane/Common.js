/* Any JavaScript here will be loaded for all users on every page load. */

/* Allow direct link to Tabber 
 
tabberOptions = {
  onLoad: function() {
    if (window.location.hash) {
      var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ');
      var currentTabber = this;
      $(".tabbernav li a", this.div).each(function(i) { 
        if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
      });
      delete currentTabber;
    }
  }
}; */

(function ($){
    function activateTab () {
        var nstarget = window.location.hash.replace('#', '');
        //convert wiki-utf 2 ansi
        nstarget=nstarget.replace(/\./g, '%').replace(/_/g, ' ');
        nstarget = decodeURIComponent(nstarget);
        if (nstarget === '') return;
        var $nt2a = $('.tabberlive>.tabbernav>li>a[title="' + nstarget + '"]');
        if (!$nt2a.length) return;
        $nt2a.click();
        //scroll to tab
        $nt2a.get(0).scrollIntoView();
    }//activateTab
 
    var nw84i = 0;
    //tbb w8ing block
    var nw84tabber = setInterval(function(){
            nw84i++;
            if (nw84i > 100) {
                clearInterval(nw84tabber);
            }
            if (window.tabberObj) {
                clearInterval(nw84tabber);
                //let tabber do job
                setTimeout(function() {
                    activateTab();
                    $(window).on('hashchange', activateTab);
                }, 100); //settimeout
            }
        }, 100); //nw84tabber interval
})(jQuery);