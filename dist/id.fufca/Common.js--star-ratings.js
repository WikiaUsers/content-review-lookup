/* Any JavaScript here will be loaded for all users on every page load. */

jQuery(function($) {
        "use strict";
 
        if (!$('.rw-ui-container').length) return;
 
        window.RW_Async_Init = function(){
            RW.init("d0730f7e59bc8420cf3553827e65cb9b",
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
                    layout: {
                        align: {
                            hor: "center",
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