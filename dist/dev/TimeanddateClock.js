/********************* this comment is 80 characters long *********************/

(function () {
    
    "use strict";
    if (window.andrewds1021 && window.andrewds1021.timeanddate_clock
        && window.andrewds1021.timeanddate_clock.has_run) return;
    if (!window.andrewds1021) {
        window.andrewds1021 = {
            timeanddate_clock: {
                defaults: {}
            }
        };
    } else if (!window.andrewds1021.timeanddate_clock) {
        window.andrewds1021.timeanddate_clock = {
            defaults: {}
        };
    } else if (!window.andrewds1021.timeanddate_clock.defaults) {
        window.andrewds1021.timeanddate_clock.defaults = {};
    }
    window.andrewds1021.timeanddate_clock.has_run = true;
    
/* retrieve and set default values */
    var defaults = window.andrewds1021.timeanddate_clock.defaults;
    if (!defaults.source) defaults.source = "i71tro3z/tt0/th1/tb2";
    
/* get elements to replace */
    var clocks = document.getElementsByClassName("TimeanddateClock");
    
/* setup variables */
    var url = "https://free.timeanddate.com/";
    var style = "border-style: none;";
    var has = {};
    var plchld, iframe;
    
/* construct and insert iframe tags */
    while (clocks.length > 0) {
        plchld = clocks[0];
/* check for binary attributes */
        if (plchld.hasAttribute("data-timeanddateclock-iscountdown"))
            has.countdown = true;
        if (plchld.hasAttribute("data-timeanddateclock-isclock"))
            has.clock = true;
        if (plchld.hasAttribute("data-timeanddateclock-allowtransparency"))
            has.allow = true;
        if (plchld.hasAttribute("data-timeanddateclock-preventtransparency"))
            has.prevent = true;
/* create iframe tag */
        iframe = document.createElement("iframe");
/* determine and set clock versus countdown */
        if (has.countdown && !has.clock) {
            url = url + "countdown/";
        } else if (!has.countdown && has.clock) {
            url = url + "clock/";
        } else if (defaults.is_countdown) {
            url = url + "countdown/";
        } else {
            url = url + "clock/";
        }
/* determine and set source */
        if (plchld.hasAttribute("data-timeanddateclock-source")) {
            url = url + plchld.getAttribute("data-timeanddateclock-source");
        } else {
            url = url + defaults.source;
        }
        iframe.setAttribute("src", url);
/* determine and set "allowtransparency" */
        if (has.allow && !has.prevent) {
            iframe.setAttribute("allowtransparency", "");
        } else if (!has.allow && has.prevent) {
            // pass
        } else if (defaults.allow_transparency) {
            iframe.setAttribute("allowtransparency", "");
        }
/* determine and set dimensions */
        if (plchld.hasAttribute("data-timeanddateclock-width")) {
            style = style + " width: "
                + plchld.getAttribute("data-timeanddateclock-width") + ";";
        } else if (defaults.width) {
            style = style + " width: " + defaults.width + ";";
        }
        if (plchld.hasAttribute("data-timeanddateclock-height")) {
            style = style + " height: "
                + plchld.getAttribute("data-timeanddateclock-height") + ";";
        } else if (defaults.height) {
            style = style + " height: " + defaults.height + ";";
        }
        iframe.setAttribute("style", style);
/* replace placeholder */
        plchld.parentElement.replaceChild(iframe, plchld);
        url = "https://free.timeanddate.com/";
        style = "border-style: none;";
        has = {};
    }
    
})();