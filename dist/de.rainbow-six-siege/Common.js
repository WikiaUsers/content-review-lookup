/* JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */

// [[Vorlage:Dateiinfo]] in [[Spezial:Hochladen]] eingef�gt.
function setSpecialUploadTemplate() {
  if (window.location.href == "https://rainbow-six-siege.fandom.com/de/wiki/Spezial:Hochladen") {
  var editbox = document.getElementById('wpUploadDescription');
  if(editbox.value == '') {
    editbox.value = "{"+"{Dateiinfo\n"
                 + "|Beschreibung=\n"
                 + "|Quelle=\n"
                 + "|K�nstler=\n"
                 + "|Kategorien=\n"
                 + "}"+"}";
    }
  }
} 
addOnloadHook(setSpecialUploadTemplate);