 // Incorpore le modèle [[Modèle:Fichier|Fichier]] en important directement. C'est incorporé par [[MediaWiki:Common.js|Common.js]].

//<nowiki>

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Fichier\n"
                   + "|Description = \n"
                   + "|Date = \n"
                   + "|Auteur = \n"
                   + "|Source = \n"
                   + "|Licence = \n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);
//</nowiki>