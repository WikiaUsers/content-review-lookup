/* von: http://fr.wikipedia.org/wiki/MediaWiki:Gadget-FlecheHaut.js */

function PageHomeArrows()
{
        var c = document.getElementById("bodyContent") || document.getElementById("mw_content") || document.getElementById("article");
        if (!c) return;
        for (var level = 1; level <= 6; ++level) {
                var h = c.getElementsByTagName("h" + level);
                for (var i = 0; i < h.length; ++i) {
                        var mwh = h[i].lastChild; // moveEditsection not run yet
                        if (mwh && mwh.className == "mw-headline") {
                                var arrow = document.createElement("a");
                                arrow.className = "toparrow noprint";
                                arrow.appendChild(document.createTextNode("↑ "));
                                arrow.href = "javascript:window.scrollTo(0,0); void 0;";
                                mwh.insertBefore(arrow, mwh.firstChild);
                        }
                }
        }
}
addOnloadHook(PageHomeArrows);