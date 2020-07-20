/* Credits to Merlin Wiki and Sam & Cat Wiki. Thanks! */
 
/* 
 * WARNING: THIS CODE IS SPECIFIC TO JARLEY WIKI. 
 * IF COPIED, IT WILL RESULT IN OUR RATINGS MIXING.
 * If you want to use it for your own wiki, please contact one of the admins here
 * and we will gladly help you generate your own user ID.
 */
 
jQuery(function($) {
        "use strict";
 
        if (!$('.rw-ui-container').length) return;
 
        window.RW_Async_Init = function(){
            RW.init("4ecc4dda108e4a9c9efc67f2ccdb3e11",
{
                advanced: {
                    star: {
                        stars: 5
                    },
                    font: {
                        color: "#000",
                        size: "10px",
                        type: "arial"
                    },
                    text: {
                        rateThis: "Rate this resource"
                    },                    
                    layout: {
                        align: {
                            hor: "right",
                            ver: "top"
                        },

                    dir: "ltr"
                    }
                },

                size: "small",
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