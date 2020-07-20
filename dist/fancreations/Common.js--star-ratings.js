// Credits to the Merlin and Sam & Cat wikis. Thanks!
// 
// WARNING: THIS CODE IS SPECIFIC TO FAN CREATIONS WIKI.
// IF COPIED, IT WILL RESULT IN OUR RATINGS MIXING.
// If you want to use it for your own wiki, please contact one of the admins here
// and we will gladly help you generate your own user ID.

jQuery(function($) {
        "use strict";
 
        if (!$('.rw-ui-container').length) return;
 
        window.RW_Async_Init = function(){
        RW.init({
            huid: "222986",
            uid: "f988935f44c7f8cd6ac56b8d1c0b1567",
            source: "website",
            options: {
                "advanced": {
                    "layout": {
                        "align": {
                            "hor": "center",
                            "ver": "bottom"
                        }
                    },
                    "font": {
                        "size": "14px"
                    }
                },
                "size": "large",
                "style": "oxygen",
                "forceSync": false
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
            rw2.src = "http://js.rating-widget.com/external.min.js?t=js";
            rw.appendChild(rw2);
            document.body.appendChild(rw);
        }
});