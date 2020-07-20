/*
Any JavaScript here will be loaded for all users on the oasis skin.
See MediaWiki:Common.js for scripts that affect every skin.
*/
 
/* Table of Contents
-----------------------
 * (A00) helperFunctions
 * (B00) navBarChanges
*/

//##############################################################
/* ==helperFunctions== (A00)*/
// Things to make life easier



//##############################################################
/* ==navBarChanges== (B00)*/
// Tweaks appearance / links on the main wiki navbar. See also Special:CSS

// Redirect wiki forum to game's official forum.
$(".wds-community-header__local-navigation [href$='/wiki/Special:Forum']")
.attr("href", "http://atelier801.com/forums")
.attr("target", "_blank")
.addClass("offForum")
.find("span")
.html("Official Forum");