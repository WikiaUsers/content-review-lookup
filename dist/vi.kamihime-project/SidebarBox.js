(function($){
    "use strict";
    $(window).load(function(){
        if($("div.move").length > 0){
            $("div.move").insertAfter("section.WikiaActivityModule");
            $("div.move").show();
        }
    });
 
}(jQuery));