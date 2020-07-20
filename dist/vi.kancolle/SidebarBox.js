(function($){
    "use strict";
    $(window).load(function(){
        if($("div.move").length > 0){
            $("div.move").insertAfter("section.activity-module");
            $("div.move").show();
        }
    });
 
}(jQuery));