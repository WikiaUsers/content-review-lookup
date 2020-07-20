(function () {
 
"use strict";
if (window.andrewds1021 && window.andrewds1021.list_slider
    && window.andrewds1021.list_slider.has_run) return;
if (!window.andrewds1021) {
    window.andrewds1021 = {
        list_slider: {
            delays: {}
        }
    };
} else if (!window.andrewds1021.list_slider) {
    window.andrewds1021.list_slider = {
        delays: {}
    };
}
window.andrewds1021.list_slider.has_run = true;
 
var delays = window.andrewds1021.list_slider.delays;
if (!delays.start) delays.start = 2500;
if (!delays.change) delays.change = 0;
if (!delays.stop) delays.stop = 2500;
var styles = window.andrewds1021.list_slider.styles;
 
if (styles) importArticles({
    type: "style",
    articles: styles
});
 
var sliders = jQuery(".ListSlider > ul, .ListSlider > ol");
 
if (sliders.length === 0) return;
 
sliders.filter(function (index, element) {
    return element.childElementCount;
});
sliders.each(function (index, element) {
    var parent = element.parentElement;
    if (parent.className.search(/\bactive\b/) === -1)
        parent.className = parent.className + " active";
    var currents = jQuery(element).children(".current");
    if (currents.length === 0) {
        element.firstElementChild.className = element.firstElementChild.className + " current";
    } else {
        for (var i = 1; i < currents.length; i++) {
            currents[i].className = currents[i].className.replace(/(\s+|\b)current\b/g, "");
        }
    }
});
sliders.filter(function (index, element) {
    return element.childElementCount > 1;
});
 
setTimeout(start_transition, delays.start);
 
function start_transition() {
    sliders.each(function (index, element) {
        var current = jQuery(element).children(".current")[0];
        current.className = current.className + " transition-out";
        var next = current.nextElementSibling;
        if (!next) next = element.firstElementChild;
        next.className = next.className + " transition-in";
    });
    setTimeout(change_current, delays.change);
}
 
function change_current() {
    sliders.each(function (index, element) {
        var outgoing = jQuery(element).children(".transition-out")[0];
        outgoing.className = outgoing.className.replace(/(\s+|\b)current\b/g, "");
        var incoming = jQuery(element).children(".transition-in")[0];
        incoming.className = incoming.className + " current";
    });
    setTimeout(stop_transition, delays.stop)
}
 
function stop_transition() {
    sliders.each(function (index, element) {
        var outgoing = jQuery(element).children(".transition-out")[0];
        outgoing.className = outgoing.className.replace(/(\s+|\b)transition-out\b/g, "");
        var incoming = jQuery(element).children(".transition-in")[0];
        incoming.className = incoming.className.replace(/(\s+|\b)transition-in\b/g, "");
    });
    setTimeout(start_transition, delays.start)
}
 
})();