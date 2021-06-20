(function($) {
    $('.spoiler').css({"background": "black", "color": "black"});
 
    $('.spoiler').mouseenter(function() {
        $(this).css({"background": "transparent", "color": "inherit"});
    });
 
    $('.spoiler').mouseout(function() {
        $(this).css({"background": "black", "color": "black"});
    });
}(this.jQuery));