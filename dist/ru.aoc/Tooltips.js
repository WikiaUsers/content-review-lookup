/*
Derived from http://www.wowwiki.com/index.php?title=User:Pcj/tooltip.js&oldid=1315219

Calls, in order:
*[[MediaWiki:TooltipsCore.js]]
*[[MediaWiki:TooltipsItem.js]]
*[[MediaWiki:TooltipsFeat.js]]
*[[MediaWiki:TooltipsSpell.js]]
*[[MediaWiki:TooltipsMap.js]] -- When it works
*/
// basic JavaScript variable functionality
var tooltipsOn = true;

// individual tooltip controls, defaulted to on
var itemTooltips = true;

function performTooltips() {
if (tooltipsOn && wgCanonicalNamespace != "Special") {
if (itemTooltips) {
loadJS("MediaWiki:TooltipsCore.js");
loadJS("MediaWiki:TooltipsItem.js");
loadJS("MediaWiki:TooltipsFeat.js");
loadJS("MediaWiki:TooltipsSpell.js");
}
}
}

addOnloadHook(performTooltips);