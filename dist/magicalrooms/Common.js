/* Any JavaScript here will be loaded for all users on every page load. */


// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================

function wikiSiteMeter() {
    if(skin == "monobook") {
        var sidebar = document.getElementById("p-wikicities-nav");

        if(sidebar == null)
            return;

        var comboString = "<br /><h5>wiki site meter</h5>";
        comboString += "<div class='pBody'><div style='margin-top:2px; margin-bottom:5px;'><table><tr><td><a href='http://s49.sitemeter.com/stats.asp?site=s49MRwiki' target='_top'><img src='http://s49.sitemeter.com/meter.asp?site=s49MRwiki' alt='Site Meter' border=0 /></a></td></tr></table></div></div>";

        sidebar.innerHTML += comboString;
    }

    if(skin == "monaco") {
        var sidebar = document.getElementById("widget_101");

        if(sidebar == null)
            return;

        var comboString = "<dt class='color1 widget_title'><div class='widgetToolbox'></div>Wiki Site Meter</dt>";
        comboString += "<dd class='shadow widget_contents'><div style='margin-left:10px; margin-top:2px; margin-bottom:5px;'><table><tr><td><a href='http://s49.sitemeter.com/stats.asp?site=s49MRwiki' target='_top'><img src='http://s49.sitemeter.com/meter.asp?site=s49MRwiki' alt='Site Meter' border=0 /></a></td></tr></table></div></dd>";

        sidebar.innerHTML += comboString;
    }
}
addOnloadHook(wikiSiteMeter);