/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

/* Das folgende JavaScript wird für alle Benutzer geladen. */

//================================================================================
//*** import Onlyifuploading-functions
// SEE ALSO [[MediaWiki:Onlyifuploading.js]]

if (wgCanonicalSpecialPageName == "Upload") {
 addOnloadHook(function() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{FileInfo\n"
                   + "|Description=\n"
                   + "|Author=\n"
                   + "|Season=\n"
                   + "|Source=\n"
                   + "|Copyright=\n"
                   + "}"+"}";
 });
}