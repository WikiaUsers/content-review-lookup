// ✓ Format checked! Intro, ToC, notes, sections, headings, lines, and tabs.
 
// This script imports and configures [[w:c:dev:SnowStorm]] into "Emberfall".
 
/*************************************************/
/*************** TABLE OF CONTENTS ***************/
/**************************************************
TABLE OF CONTENTS
MAIN CODE
    IMPORTS
    CONFIGURATIONS
NOTES
 
/*************************************************/
/******************* MAIN CODE *******************/
/*************************************************/
// IMPORTS
importArticles({
    type: "script",
    articles: [
        "u:dev:SnowStorm.js",
    ]
});

// CONFIGURATIONS
window.snowColor = "#f05e1b";
window.flakesMax = 60;
window.flakesMaxActive = 40;
window.animationInterval = 60;
window.className = "emberfall";
window.followMouse = false;
window.snowStick = false;
window.useTwinkleEffect = true;
window.freezeOnBlur = false;
window.flakeLeftOffset = 0;
window.flakeWidth = 6;
window.flakeHeight = 6;
window.vMaxX = 0;
window.vMaxY = 0.1;
window.windOffset = 0;
window.windMultiplier = 0;

/*************************************************/
/********************* NOTES *********************/
/**************************************************
    * Idea and many variables are from [[w:c:diepio:MediaWiki:Gadget-Emberfall.js]] by Ursuul.
        * Used with [[Thread:177428|permission]].
*/