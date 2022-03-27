/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/*AddRailModule*/
window.AddRailModule = ['Template:RailModule'];

/*BackToTopButton*/
window.BackToTopModern = true;

/*HeaderLinks*/
window.HeaderLinksCopyOnClick = true

/*LinkPreview*/
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru';
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/dragon-ball-gt-rewritten/images/f/f2/BrakObrazka.png/revision/latest?cb=20211228120603&path-prefix=pl';
window.pPreview.tlen = 360;
window.pPreview.RegExp.iparents = ['.myclass', '#myid', 'div[data-ignore-me=1]'];

/*<tabber> extension req*/
//v2.0, 2017, user:fngplg.//
//set active tab: https://gt-rewritten.fandom.com/page#activeTab
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