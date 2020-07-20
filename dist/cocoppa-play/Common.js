/* Any JavaScript here will be loaded for all users on every page load. */

//<tabber> extension req
//set active tab: https://wikia.wikia.com/page#activeTab
//v2.0, 2017, user:fngplg.
/* credit http://ru.borderlands.wikia.com/wiki/MediaWiki:Common.js/setActiveTab.js*/
(function ($){
    var nstarget = window.location.hash.replace('#', '');
    if (nstarget === '') return;
    //convert wiki-utf 2 ansi
    nstarget = nstarget.replace(/\./g, '%');
    nstarget = decodeURIComponent(nstarget).replace(/_/g, ' ');
    //console.log('trgt:'+nstarget);
    $(function(){
        setTimeout(function() {
            var $nt2a = $('.tabberlive>.tabbernav>Li>a[title="' + nstarget + '"]');
            $nt2a.click();
        }, 100);//settimeout
    });//doc.rdy    
})(jQuery);