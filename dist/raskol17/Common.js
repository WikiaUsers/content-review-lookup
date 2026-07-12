//* ==========================
   RASKOL 17 WIKI JAVASCRIPT
   ========================== */

document.addEventListener("DOMContentLoaded", function() {

    console.log("RASKOL 17 Wiki JS loaded.");

    // Add fade-in effect to article content
    const content = document.querySelector(".mw-parser-output");

    if (content) {
        content.style.opacity = "0";

        setTimeout(function() {
            content.style.transition = "opacity .5s ease";
            content.style.opacity = "1";
        }, 100);
    }

});* Any JavaScript here will be loaded for all users on every page load. */

/* RASKOL 17 - Smooth Page Reveal */

document.addEventListener("DOMContentLoaded", function () {

    const article = document.querySelector(".mw-parser-output");

    if (!article) return;

    article.classList.add("r17-loaded");

});


function r17RandomPage(){

let pages=[
"ALL_CHARACTERS",
"RASKOL_17",
"VIPER_6",
"THE_BLOOD_KINGDOM_(FORMERLY_BELGIUM)"
];

let page=pages[Math.floor(Math.random()*pages.length)];

window.location.href="/wiki/"+page;

}