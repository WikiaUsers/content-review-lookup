(function($) {
    $('.spoiler').css({"background": "white", "color": "white"});
 
    $('.spoiler').mouseenter(function() {
        $(this).css({"background": "transparent", "color": "inherit"});
    });
 
    $('.spoiler').mouseout(function() {
        $(this).css({"background": "white", "color": "white"});
    });
}(this.jQuery));