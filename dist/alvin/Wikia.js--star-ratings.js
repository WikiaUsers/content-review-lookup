// Credits to the Merlin and Sam & Cat wikis for ORIGINAL code.
// 
// WARNING: THIS CODE IS SPECIFIC TO MUNKAPEDIA.
// IF COPIED, IT WILL RESULT IN OUR RATINGS MIXING.
// If you want to use it for your own wiki, please contact one of the admins here
// and we will gladly help you generate your own user ID.

jQuery(function($) {
        "use strict";
 
        if (!$('.rw-ui-container').length) return;
 
        window.RW_Async_Init = function(){
            RW.init("B17ECAC4A69D1FE754BB4A55514F0D20", {
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
                size: "medium",
                color: "yellow",
                type: "star"
            });
            
            RW.initClass( '1', {
                advanced: {
                    text: {
                        rateThis: "Rate this episode"
                    }
                }
            });
            
            RW.initClass( '2', {
                advanced: {
                    text: {
                        rateThis: "Rate this special"
                    }
                }
            });
            
            RW.initClass( '3', {
                advanced: {
                    text: {
                        rateThis: "Rate this film"
                    }
                }
            });
            
            RW.initClass( '4', {
                advanced: {
                    text: {
                        rateThis: "Rate this album"
                    }
                }
            });
            
            RW.initClass( '5', {
                advanced: {
                    text: {
                        rateThis: "Rate this soundtrack"
                    }
                }
            });
            
            RW.render();
        };
 
        if (typeof(window.RW) === "undefined"){
            // <div class="rw-js-container"> (Part of the interface contract)
            var rw = document.createElement('div');
            rw.className = 'rw-js-container';
            var rw2 = document.createElement("script");
            rw2.type = "text/javascript";
            rw2.src = "https://js.rating-widget.com/external.min.js?t=js";
            rw.appendChild(rw2);
            document.body.appendChild(rw);
        }
});