// Minimale Rechtschreibprüfung: Version 2
// Siehe Wikipedia:Helferlein/Rechtschreibprüfung
//
// Der Text eines Artikels (in der normalen Artikelansicht, nicht beim Bearbeiten) wird an den
// Toolserver geschickt, gegen eine Wortliste geprüft und fehlerhafte Wörter werden dann im
// Text rot hervorgehoben.

function spellcheck()
{
  // Anfrage an Toolserver senden
  var scJS = document.createElement('script');
  scJS.type = 'text/javascript';
  scJS.src = 'http://toolserver.org/~apper/sc/checkArticle.php?pageName=' + escape(wgPageName);
  document.getElementsByTagName('head')[0].appendChild(scJS);
}
 
function markWordStart(text, hint)
{
  if (typeof bodyContent == 'undefined' && !(bodyContent = document.getElementById('bodyContent')))
    bodyContent = document.getElementById('article');
 
  markWord(bodyContent, text, hint);
}
 
function markWord(node, text, hint)
{
  var pos, len, newnodes = 0;
  var newnode, middlenode, endnode;
 
  // textnode - search for word
  if (node.nodeType == 3)
  { 
    pos = node.data.search(text);
    if(pos >= 0)
    {
      // create new span-element
      newnode = document.createElement("span");
      newnode.style.backgroundColor = "#FF9191";
      newnode.title = hint;
 
      // get length of the matching part
      len = node.data.match(text)[0].length;
 
      // splits content in three parts: begin, middle and end
      middlenode = node.splitText(pos);
      endnode = middlenode.splitText(len);
 
      // appends a copy of the middle to the new span-node
      newnode.appendChild(middlenode.cloneNode(true));
      // replace middlenode with the new span-node
      middlenode.parentNode.replaceChild(newnode, middlenode);
 
      newnodes = 1;
    }
  }
  else if ((node.nodeType == 1)  // element node
           && (node.hasChildNodes()) // with child nodes
           && (node.tagName.toLowerCase() != "script") // no script, style and form
           && (node.tagName.toLowerCase() != "style")
           && (node.tagName.toLowerCase() != "form"))
  {
    var this_child;
    for (this_child = 0; this_child < node.childNodes.length; this_child++)
    {
      this_child = this_child + markWord(node.childNodes[this_child], text, hint);
    }
  }
  return newnodes;
}
 
function RP_load()
{
  // Variablenabfrage, ob '''keine''' automatische RP bei jedem Aufruf eines Artikels gewünscht ist.
  // wenn automatische RP nicht gewünscht ist, dann einfach "'''var DontAutorunRP = true;'''" vor die Einbindung schreiben
  // ansonsten einfach weg lassen.
  if ( typeof DontAutorunRP == 'undefined' || DontAutorunRP == false )
  {
    // Nur beim Betrachten, aber nicht auch unnötigerweise beim Bearbeiten, auf der Versionsgschichte
    // etc. laden: spart Wartezeit beim Benutzer und Ressourcen auf dem Toolserver
    // Standardmäßig RP nur auf Artikelseiten, wenn RPonAllPages "true" RP in allen Seiten
    if (wgAction == 'view' && (wgNamespaceNumber == 0 || (typeof RPonAllPages != 'undefined' && RPonAllPages == true)))
    {
      spellcheck();
    }
  }
}
 
addOnloadHook( RP_load );