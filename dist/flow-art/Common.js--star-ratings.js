/* Any JavaScript here will be loaded for all users on every page load. */
/* Credits to Merlin Wiki and Sam & Cat Wiki. Thanks! */
 
/* 
 * WARNING: THIS CODE IS SPECIFIC TO JARLEY WIKI. 
 * IF COPIED, IT WILL RESULT IN OUR RATINGS MIXING.
 * If you want to use it for your own wiki, please contact one of the admins here
 * and we will gladly help you generate your own user ID.
 */
 
 /* Found for Flow-Art via this thread:
  * http://community.wikia.com/wiki/Thread:623572
  */
 
jQuery(function($) {
        "use strict";
 
        if (!$('.rw-ui-container').length) return;
 
        window.RW_Async_Init = function(){
            RW.init({
            huid: "301175",
            uid: "2dd41d60898e6eee336d46da387ba8bf",
            source: "website",
            options: {
                "advanced": {
                    "layout": {
                        "lineHeight": "12px"
                    },
                    "font": {
                        "size": "11px"
                    }
                },
                "style": "oxygen1_red",
                "isDummy": false
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