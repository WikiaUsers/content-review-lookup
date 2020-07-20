// Import MediaWiki:Onlyifuploading.js (http://de.community.wikia.com/wiki/MediaWiki:Common.js)
if (wgCanonicalSpecialPageName == 'Upload') {
  document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

/* Details automatisch ausfüllen 
 * Autor: AmonFatals
 * Taken from: de.monsterhunter.wikia.com/wiki/MediaWiki:Common.js
 */
function preloadUploadDesc() {
    if (wgPageName.toLowerCase() != 'Upload') {
        return;
    }
 
    document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Dateiinfo \r|Beschreibung= \r|Datum= \r|Autor= \r|Quelle= \r|Lizenz= \r}}"));
 
}
addOnloadHook(preloadUploadDesc);