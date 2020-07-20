addOnloadHook(function () {
    "use strict";
    var a = window,
        b = "";
    if (!a.KonamiLoaded && !a.disableKonami) {
        document.onkeydown = function (d) {
            b += d.keyCode.toString();
            if (b === "3838404037393739666513") {
                a.open("http://boards.4chan.org/b/", "_self", null, false);
            }
        };
        a.KonamiLoaded = true;
    }
});