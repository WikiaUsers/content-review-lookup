/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
/*
alert('verbatim aktiv');
var Verbatim = document.getElementsByClassName("Verbatim");
for (i=0; i<Verbatim.length; i++){
    var Verbatim_Seite = Verbatim[i].innerHTML;
    importScriptURI('http://de.20m61.wikia.com/index.php?title='+Verbatim_Seite+'&action=raw&ctype=text/javascript'); 
}
*/

importArticles({
    debug: "true",
    type: "script",
    articles: [
/*        "MediaWiki:Chat.js",    */
/*        "MediaWiki:AjaxSaveEdit.js", */
/*        "MediaWiki:Auszeichnung.js",
/*        "MediaWiki:Verbatim.js" */
/*        "MediaWiki:Quiz.js",    */
/*        "MediaWiki:MultiMediaBox.js", */
/*        "MediaWiki:Chat.js",  wird doppelt eingebunden */
/*        "MediaWiki:Bewertung.js" */
          "MediaWiki:ShortMessage.js"
    ]
});