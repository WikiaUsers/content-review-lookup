alert('verbatim aktiv');
var Verbatim = document.getElementsByClassName("Verbatim");
for (i=0; i<Verbatim.length; i++){
    var Verbatim_Seite = Verbatim[i].innerHTML;
    importScriptURI('http://de.20m61.wikia.com/index.php?title='+Verbatim_Seite+'&action=raw&ctype=text/javascript'); 
}