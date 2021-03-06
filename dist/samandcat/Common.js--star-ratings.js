/* Credits to Merlin Wiki. Thanks! */

/* 
 * WARNING: THIS CODE IS SPECIFIC TO SAM & CAT WIKI. 
 * IF COPIED, IT WILL RESULT IN OUR RATINGS MIXING.
 * If you want to use it for your own wiki, please contact one of the admins here
 * and we will gladly help you generate your own user ID.
 */

jQuery(function($) {
        "use strict";
 
        if (!$('.rw-ui-container').length) return;
 
        window.RW_Async_Init = function(){
            RW.init("442ADB6E26DD0009DE4DA829F3CB4BE2",
            {
                advanced: {
                    star: {
                        stars: 10
                    },
                    font: {
                        color: "#000",
                        size: "10px",
                        type: "arial"
                    },
                    text: {
                        rateThis: "Rate this episode"
                    },
                    layout: {
                        align: {
                            hor: "center",
                            ver: "top"
                        },
                        dir: "ltr"
                    }
                },
                size: "medium",
                color: "yellow",
                type: "star"
            });
            RW.render();
        };
 
        if (typeof(window.RW) === "undefined"){
            // <div class="rw-js-container"> (Part of the interface contract)
            var rw = document.createElement('div');
            rw.className = 'rw-js-container';
            var rw2 = document.createElement("script");
            rw2.type = "text/javascript";
            rw2.src = "http://js.rating-widget.com/external.min.js?t=js";
            rw.appendChild(rw2);
            document.body.appendChild(rw);
        }
});