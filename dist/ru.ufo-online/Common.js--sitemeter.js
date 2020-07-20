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

        var comboString = "<br /><h5>Счётчик</h5>";
        comboString += "<div class='pBody'><div style='margin-top:2px; margin-bottom:5px;'><table><tr><td><a href='http://s41.sitemeter.com/stats.asp?site=s41UFO-Wiki' target='_top'><img src='http://s41.sitemeter.com/meter.asp?site=s41UFO-Wiki' alt='Site Meter' border=0 /></a></td></tr></table></div></div>";

        sidebar.innerHTML += comboString;
    }

    if(skin == "monaco") {
        var sidebar = document.getElementById("widget_101");

        if(sidebar == null)
            return;

        var comboString = "<dt class='color1 widget_title'><div class='widgetToolbox'></div>Wiki Site Meter</dt>";
        comboString += "<dd class='shadow widget_contents'><div style='margin-left:10px; margin-top:2px; margin-bottom:5px;'><table><tr><td><a href='http://s41.sitemeter.com/stats.asp?site=s41UFO-Wiki' target='_top'><img src='http://s41.sitemeter.com/meter.asp?site=s41UFO-Wiki' alt='Site Meter' border=0 /></a></td></tr></table></div></dd>";

        sidebar.innerHTML += comboString;
    }
}
addOnloadHook(wikiSiteMeter);

// ============================================================
// End of wikiSiteMeter
// ============================================================