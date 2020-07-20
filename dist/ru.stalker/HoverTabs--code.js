; (function ($) {
    $(".HoverTab").click(function(){
        $(this).siblings(".HoverTabDefault").removeClass("HoverTabDefault");
        $(this).addClass("HoverTabDefault");
    });
})(this.jQuery);