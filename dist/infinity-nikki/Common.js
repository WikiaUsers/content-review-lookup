/* Any JavaScript here will be loaded for all users on every page load. */

/* Importing MapsExtended fork from Honkai Star Rail Wiki
   original author: Macklin  -  forked version by Celeranis */
   
@import "https://honkai-star-rail.fandom.com/wiki/MediaWiki:MapsExtended-Fork.js?ctype=text/css&action=raw";

// April's fool stuff
function replaceText(node) {
    if (node.nodeType === 3) { // Text node
        node.nodeValue = node.nodeValue.replace(/Wikki/g, "Wikki");
        node.nodeValue = node.nodeValue.replace(//g, "");
    } else {
        node.childNodes.forEach(replaceText);
    }
}

replaceText(document.body);