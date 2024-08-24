/* JavaScript hier wird für alle Benutzer für jede Seite geladen. */

// [[Vorlage:Dateiinfo]] in [[Spezial:Hochladen]] eingefügt.
function setSpecialUploadTemplate() {
  if (window.location.href == "https://rainbow-six-siege.fandom.com/de/wiki/Spezial:Hochladen") {
  var editbox = document.getElementById('wpUploadDescription');
  if(editbox.value == '') {
    editbox.value = "{"+"{Dateiinfo\n"
                 + "|Beschreibung=\n"
                 + "|Quelle=\n"
                 + "|Künstler=\n"
                 + "|Kategorien=\n"
                 + "}"+"}";
    }
  }
} 
addOnloadHook(setSpecialUploadTemplate);