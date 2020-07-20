/* N’importe quel JavaScript ici sera chargé pour n’importe quel utilisateur et pour chaque page accédée. */


importScriptPage('Purgetab/code.js', 'dev'); 
importScriptPage('SkinSwitchButton/code.js', 'dev');
var ShowHideConfig = { autoCollapse: Infinity, userLang: true };
importScriptPage('ShowHide/code.js', 'dev');

$($.getJSON("/api.php?action=query&list=wkdomains&wkcountonly=1&wkto=500000&format=json", function(json){$('.numberofwikis').text(json.query.wkdomains.count);}));void(0);


 /** Title rewrite ********************************************************
  * Rewrites the page's title, used by [[Template:Titre]]
  * By [http://www.uncyclopedia.org/wiki/User:Sikon Sikon]
  */
 
 
 function rewriteTitle()
 {
    if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
        return;
 
    var titleDiv = document.getElementById('title-meta');
 
    if(titleDiv == null || titleDiv == undefined)
        return;
 
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = YAHOO.util.Dom.getElementsByClassName('firstHeading', 'h1', document.getElementById('content') )[0];
    var node = firstHeading.childNodes[0];
 
    // new, then old!
    firstHeading.replaceChild(cloneNode, node);
    cloneNode.style.display = "inline";
 
    var titleAlign = document.getElementById('title-align');
    firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
 }
 
 addOnloadHook(rewriteTitle, false);

$(document).ready(function () {
   $("a.external").attr("target", "_blank");
});