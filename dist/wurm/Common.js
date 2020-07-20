/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function(){
    /* fence_slope_calculator section */
    var fence_slope_pages = ['Fence_slope_calculator', 'Wooden_fence'];
    var index;
    var sliderpage = false;
    for	(index = 0; index < fence_slope_pages.length; index++) {
        if ( fence_slope_pages[index] == wgPageName ) {
            sliderpage = true;
            break;
        }
    }
    if (sliderpage) {
        mw.loader.load('http://wurm-almanac.wikia.com/wiki/MediaWiki%3AFence_slope_css.js?title=MediaWiki:Fence_slope_css.js&action=raw&ctype=text/javascript');
        mw.loader.using('jquery.ui.slider', function () {
            mw.loader.load('http://wurm-almanac.wikia.com/wiki/MediaWiki%3AFence_slope.js?title=MediaWiki:Fence_slope.js&action=raw&ctype=text/javascript' );
        });
    }
    
    
});