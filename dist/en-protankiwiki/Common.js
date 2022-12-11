/* Any JavaScript here will be loaded for all users on every page load. */

var unset_background = ["ProTanki_Wiki"];

if (unset_background.includes(window.location.search.replace("?title=", "")))
   document.querySelector(".mw-parser-output").style.backgroundColor = "transparent";