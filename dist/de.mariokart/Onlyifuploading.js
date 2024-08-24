 /**
  * Lädt die Informationsvorlage beim Hochladen direkt im Beschreibungsfeld
  * wird in [[MediaWiki:Common.js]] eingebunden
  */
 addOnloadHook(function() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "== Beschreibung ==\n"
                   + "{"+"{Bild-Infobox\n"
                   + "|Bildgegenstand=\n"
                   + "|Bildtyp=\n"
                   + "|Herkunft=\n"
                   + "|Inhaber des Nutzungsrechts=\n"
                   + "}"+"}\n"
                   + "== Lizenz ==\n"
                   + "{"+"{Copyright-Nintendo}"+"}\n\n"
 
                   + "["+"[Kategorie:\n"
                   + "["+"[Kategorie:\n"
                   + "["+"[Kategorie:";
 });