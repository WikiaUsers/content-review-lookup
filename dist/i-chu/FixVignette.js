(function($){
    "use strict";
    console.log("FixVignette.js v010");
 
    window.applyVignetteFix = function(){
         $(".sm2_button").each(function(index){
            var AudioLink = $(this).attr("href");
            AudioLink = AudioLink.substr(0, AudioLink.indexOf(".ogg")+4);
            $(this).attr("href", AudioLink);
        });
    }
 
}(jQuery));