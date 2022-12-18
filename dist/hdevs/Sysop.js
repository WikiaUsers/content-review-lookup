//Thread:1780848
(function () {
 
    "use strict";
    if (window.andrewds1021 && window.andrewds1021.sysop_show
        && window.andrewds1021.sysop_show.has_run) return;
    if (!window.andrewds1021) {
        window.andrewds1021 = {
            sysop_show: {}
        };
    } else if (!window.andrewds1021.sysop_show) {
        window.andrewds1021.sysop_show = {};
    }
    window.andrewds1021.sysop_show.has_run = true;
 
    var groups = mw.config.get("wgUserGroups");
 
    if (!groups || (groups.indexOf("sysop") === -1)) return;
 
    var elems = document.querySelectorAll(".sysop-show");
    var num = elems.length;
 
    for (var i = 0; i < num; i++) {
        elems[i].style.display = "initial";
    }
    
    /*Inverse code to *hide* text from sysops*/
    var elems2 = document.querySelectorAll(".sysop-hide");
    var num2 = elems2.length;
 
    for (var x = 0; x < num; x++) {
        elems2[x].style.display = "none";
    }
 
})();