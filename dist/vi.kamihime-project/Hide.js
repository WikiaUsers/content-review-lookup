(function($){
    "use strict";
    $(window).load(function(){
        if($("div.hide").length > 0){
            $("div.hide").css('display','none');
            $('<div><input type="button" class="hide-btn" value="Hiện" style="width: 75px; margin: 0px; padding: 0px;"></div>').insertBefore("div.hide");
            $(".hide-btn").click(function(){
                $(this).parent("div").next("div.hide").toggle(500);
                if ($(this).attr("value") == "Hiện") {
                            $(this).attr("value", "Ẩn")
                } else {
                       $(this).attr("value", "Hiện")
                       }
                });
        }
    });
}(jQuery));