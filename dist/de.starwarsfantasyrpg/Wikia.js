// <pre>
/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */
// ================================================================================
/** CSS einbinden */
 function addCSS(title) {
     document.write(
                '<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=' + 
                encodeURIComponent(title) + '&action=raw&ctype=text/css"; /*]]>*/</style>');
 }
 
 /** JS einbinden */
 function addJS(title) {
     document.write(
                '<scr'+'ipt type="text/javascript" src="/index.php?title=' +
                encodeURIComponent(title) + '&action=raw&ctype=text/javascript"></scr'+'ipt>');
 }

 
//-------------------------------------------------------------------------------------
//F�gt Vorlage:Dateiinfo auf Spezial:Hochladen ein....Zum Testen
 
function setSpecialUploadTemplate() {
  if (wgPageName=="Spezial:Hochladen") {
    var editbox=document.getElementById("wpUploadDescription");
    if (editbox.value == '') {
      editbox.value = "{"+"{Dateiinfo\n"
                 + "|Beschreibung=\n"
                 + "|Lizenz=\n"
                 + "|Quelle=\n"
                 + "|K�nstler=\n"
                 + "|Kategorien=\n"
                 + "}"+"}";
    }
  }
} 
addOnloadHook(setSpecialUploadTemplate);
 
hookEvent( 'load', function() {
//currentFocused ist eine Variable von [[MediaWiki:Edittools]], siehe /w/skins/common/edit.js
currentFocused=document.getElementById("wpUploadDescription");
});



//<pre>