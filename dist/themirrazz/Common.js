/* Any JavaScript here will be loaded for all users on every page load. */

/*
LIB: Honorifics.js
This is a wrapper for a nyan-standard API used by a browser called Kyōsuke. It
can also be activated on Firefox, Pale Moon, or Floorp using the Web Honorifics
API browser extension (https://github.com/kyosukeweb/webhonorificsext)
*/

// LICENSE https://github.com/kyosukeweb/honorifics.js/blob/main/LICENSE.md
// FandomScript

// Fandom takes a while to load Common.js or Personal JS
// We don't need setInterval here
(function () {
    var query = window.__HonorificsElementContainers__ || '[data-honorific]';
    var all = Array.from(document.querySelectorAll(query));
    for(var i = 0; i < all.length; i++) {
        // Fandom doesn't support <element hidden />
        all[i].style.display = navigator.honorifics ? "" : "none";
    }
})();