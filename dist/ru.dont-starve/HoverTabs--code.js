; (function ($) {
    $(".DSWHoverTab").click(function(){
        $(this).siblings(".DSWHoverTabDefault").removeClass("DSWHoverTabDefault");
        $(this).addClass("DSWHoverTabDefault");
    });
})(this.jQuery);