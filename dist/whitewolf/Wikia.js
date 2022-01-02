//Spoiler Blackout:
// Via Princess Platinum in this thread: https://community.fandom.com/f/p/2028398608121858155
(function($) {
    $('.spoiler').css({"background": "black", "color": "black"});
    $('.spoiler a').css({"background": "black", "color": "black"});
 
    $('.spoiler').mouseenter(function() {
        $(this).css({"background": "transparent", "color": ""});
        $(this).find("a").css({"background": "transparent", "color": ""});
    });
 
    $('.spoiler').mouseout(function() {
        $(this).css({"background": "black", "color": "black"});
        $(this).find("a").css({"background": "transparent", "color": "inherit"});
    });
}(this.jQuery));