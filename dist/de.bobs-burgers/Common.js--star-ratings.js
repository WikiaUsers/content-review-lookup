/* Any JavaScript here will be loaded for all users on every page load. */
/* Credits to Merlin Wiki,Sam & Cat Wiki, MarkvA and Minion stuart. Thanks! */
 
/* 
 * ACHTUNG. Dieser Code wurde speziell für das Bob's Burgers Wiki angepasst. 
 * Copy & Paste funktioniert nur, wenn eine neue User ID erstellt wird.
 * Hilfe geben die admins des deutschen Bob's Burgers Wiki.
 */
 
jQuery(function($) {
        "use strict";
 
        if (!$('.rw-ui-container').length) return;
 
        window.RW_Async_Init = function(){
            RW.init("7c53faeaf0e93af049ec2a20584c9e5e",
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
                        rateThis: "Bewertung"
                    },                    
                    layout: {
                        align: {
                            hor: "left",
                            ver: "top"
                        },
 
                    dir: "ltr"
                    }
                },
                lng: "de",
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