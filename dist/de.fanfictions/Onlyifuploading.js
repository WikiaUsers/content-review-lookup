// Lädt die [[Vorlage:Dateiinfo|Dateiinfovorlage]] beim Hochladen direkt im Beschreibungsfeld. Ist über [[MediaWiki:Common.js|Common.js]] eingebunden.
//<pre><nowiki>
 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Dateiinfo\n"
                   + "|Beschreibung = \n"
                   + "|Kategorie =\n"
                   + "|Datum = ~~~~~ \n"
                   + "|Zeichner = ~~~ \n"
                   + "|Idee =\n"
                   + "|Autor = ~~~ \n"
                   + "|Quelle =\n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);
//</pre></nowiki>