// Funktion zur Änderung von Hintergrund und Galerie-Inhalt basierend auf dem Datum
function updateChristmasDesign() {
    // Heutiges Datum
    var today = new Date();

    // Angepasster Zeitraum: 28. Oktober bis 1. Januar
    var startDate = new Date(today.getFullYear(), 9, 28); // 28. Oktober (Monat 9, da JavaScript 0-basiert zählt)
    var endDate = new Date(today.getFullYear() + 1, 0, 1); // 1. Januar

    // Galerie-Element auswählen
    var gallery = document.getElementById("christmas-gallery");
    var body = document.body;

    // Prüfen, ob das helle oder dunkle Design aktiv ist
    var isLightTheme = body.classList.contains("theme-fandomdesktop-light");
    var isDarkTheme = body.classList.contains("theme-fandomdesktop-dark");
    
    // Funktion zur Erstellung eines Bild-Tags im Wiki-Format
    function createImageWithLinks(fileName, imageLink, captionText, captionLink) {
        // Verwendung von String-Verkettung anstelle von Template Literals
        return "[[" + imageLink + "|Datei:" + fileName + "|[[" + captionLink + "|" + captionText + "]]]]";
    }

    // Design anwenden, wenn im definierten Zeitraum
    if (today >= startDate && today < endDate) {
        // Winter-Hintergrund aktivieren
        body.classList.add("winter-background");
        body.classList.remove("default-background");

        // Winter-Galeriebilder hinzufügen
        if (gallery) {
            gallery.innerHTML = ""; // Galerie leeren
            gallery.innerHTML += createImageWithLinks("ItslgdChristmas.png", "Benutzer:Itslgd", "[Admin]", "Colour:Admin") + "\n";
            gallery.innerHTML += createImageWithLinks("ZøvinChristmas.png", "Benutzer:Zøvin", "[Admin]", "Colour:Admin") + "\n";
            gallery.innerHTML += createImageWithLinks("LunaChristmas.png", "Benutzer:Luna706", "[Moderator]", "Colour:Moderator") + "\n";
        }
    } else {
        // Standard-Hintergrund aktivieren
        body.classList.add("default-background");
        body.classList.remove("winter-background");

        // Standard-Galeriebilder hinzufügen
        if (gallery) {
            gallery.innerHTML = ""; // Galerie leeren
            gallery.innerHTML += createImageWithLinks("Itslgd.png", "Benutzer:Itslgd", "[Admin]", "Colour:Admin") + "\n";
            gallery.innerHTML += createImageWithLinks("FrenchZovin.png", "Benutzer:Zøvin", "[Admin]", "Colour:Admin") + "\n";
            gallery.innerHTML += createImageWithLinks("Luna.png", "Benutzer:Luna706", "[Moderator]", "Colour:Moderator") + "\n";
        }
    }
}

// Funktion beim Laden der Seite ausführen
document.addEventListener("DOMContentLoaded", updateChristmasDesign);