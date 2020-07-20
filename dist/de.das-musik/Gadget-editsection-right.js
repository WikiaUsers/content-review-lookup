//================================================================================
//*** moveEditsection: Moving of the editsection links

/*
 * moveEditsection
 * Dieses Script verschiebt die [Bearbeiten]-Buttons vom rechten Fensterrand
 * direkt rechts neben die jeweiligen Überschriften.
 * This script moves the [edit]-buttons from the right border of the window
 * directly right next to the corresponding headings.
 *
 * dbenzhuser (de:Benutzer:Dbenzhuser)
 */
addOnloadHook(function() {
    var spans = document.getElementsByTagName("span");
    for (var i=0; i<spans.length; i++) {
        var span = spans[i];
        if (span.className != "editsection")    continue;
        span.parentNode.appendChild(span);
    }
});