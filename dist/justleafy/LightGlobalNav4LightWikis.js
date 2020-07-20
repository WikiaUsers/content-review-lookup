//JavaScript for LightGlobalNav4LightWikis

//Add functioning to hiding the global nav when scrolling (credit: Grudgeholderr)
var didScroll;
var lastScrollTop = 0;
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
    if (st > lastScrollTop && st > 55) {	// Scroll Down
        $("#globalNavigation").removeClass("nav-down").addClass("nav-up");
    } else {								// Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $("#globalNavigation").removeClass("nav-up").addClass("nav-down");
        }
    }
    lastScrollTop = st;
}

//Add the main stylesheet along for consistent notifications (stylesheet credit: JustLeafy, script credit: Speedit)
importArticles({
    type: 'style',
    articles: [
        'MediaWiki:LightGlobalNav4LightWikis.css',
    ]
}, {
    type: 'script',
    articles: [
        'dev:MediaWiki:ConsistentNotifications.js'
    ]
});