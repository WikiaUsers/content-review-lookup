 // Incorpore le mod�le [[Mod�le:Fichier|Fichier]] en important directement. C'est incorpor� par [[MediaWiki:Common.js|Common.js]].

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