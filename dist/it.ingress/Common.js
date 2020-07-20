/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */
/*******************************************************************************
** "Articletype positioning" script; by [[User:Bp]]
*******************************************************************************/
 
function moveArticletypeDiv() {
  var fooel = document.getElementById('ma-article-type');
  if (fooel!=null) {
    var artel = document.getElementById('article');
    var wphel = document.getElementById('WikiaPageHeader');
    var titel = document.getElementById('top');
    fooel = fooel.parentNode.removeChild(fooel);
    if (artel!=null) {
      artel.parentNode.insertBefore(fooel,artel);
    } else if (wphel!=null) {
      wphel.parentNode.insertBefore(fooel,wphel);
    } else {
      //fall back to a position before H1 - useful for monobook skin
      titel.parentNode.insertBefore(fooel,titel);
    }
  }
}
 
hookEvent("load", moveArticletypeDiv);