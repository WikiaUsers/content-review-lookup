var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('div#globalNavigation').outerHeight();
 
$(window).scroll(function(event){
    didScroll = true;
});
 
setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);
 
function hasScrolled() {
    var st = $(this).scrollTop();
 
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
 
    if (st > lastScrollTop && st > navbarHeight){
        $('div#globalNavigation').removeClass('wds-global-navigation').addClass('wds-global-navigation-up');
    } else {
        if(st + $(window).height() < $(document).height()) {
            $('div#globalNavigation').removeClass('wds-global-navigation-up').addClass('wds-global-navigation');
        }
    }
 
    lastScrollTop = st;
}

importArticles({
    type: 'style',
    articles: [
        'u:justleafy:MediaWiki:2017GlobalNav.css',
    ]
});