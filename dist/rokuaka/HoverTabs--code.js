
; (function ($) {
    $(".NewHoverTab").click(function(){
        $(this).siblings(".NewHoverTabDefault").removeClass("NewHoverTabDefault");
        $(this).addClass("NewHoverTabDefault");
    });
})(this.jQuery);