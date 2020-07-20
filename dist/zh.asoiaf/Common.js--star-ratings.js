// Credits to the Merlin and Munkapedia wikis. Thanks!
// 
// WARNING: THIS CODE IS SPECIFIC TO A SONG OF ICE AND FIRE WIKI.
// IF COPIED, IT WILL RESULT IN OUR RATINGS MIXING.
// If you want to use it for your own wiki, please contact one of the admins here
// and we will gladly help you generate your own user ID.
 
jQuery(function($) {
        "use strict";
 
        if (!$('.rw-ui-container').length) return;
 
        window.RW_Async_Init = function(){
            RW.init("8d13adad45c98f364c0fd493168fa2ab",
            {
                advanced: {
                    star: {
                        stars: 10
                    },
                    font: {
                        color: "#000",
                        size: "14px",
                        type: "arial"
                    },
                    text: {
                        rateThis: ""
                    },
                    layout: {
                        align: {
                            hor: "center",
                            ver: "bottom"
                        },
                        dir: "ltr"
                    }
                },
                size: "medium",
                color: "yellow",
                type: "star",
                lng: "ch"
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