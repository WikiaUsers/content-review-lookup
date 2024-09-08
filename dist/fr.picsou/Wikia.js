/** 
 * Diverses fonctions manipulant les classes
 * Utilise des expressions régulières et un cache pour de meilleures perfs
 * isClass et whichClass depuis http://fr.wikibooks.org/w/index.php?title=MediaWiki:Common.js&oldid=140211
 * hasClass, addClass, removeClass et eregReplace depuis http://drupal.org.in/doc/misc/drupal.js.source.html
 * surveiller l'implémentation de .classList http://www.w3.org/TR/2008/WD-html5-diff-20080122/#htmlelement-extensions
 *
 * (provient du common.js de wikipedia.fr)
 */

function hasClass(node, className) {
    var haystack = node.className;
    if(!haystack) return false;
    if (className === haystack) {
        return true;
    }
    return (" " + haystack + " ").indexOf(" " + className + " ") > -1;
}


/** 
 * Boîtes déroulantes
 *
 * Pour [[Modèle:Méta palette de navigation]]
 *
 * (vient du common.js de wikipedia.fr)
 */
 
var Palette_Enrouler = '[enrouler]';
var Palette_Derouler  = '[dérouler]';
 
var Palette_max = 1; 
var Palette_index = -1;
 
function Palette_toggle(indexPalette){
  var Button = document.getElementById( "collapseButton" + indexPalette );
  var Table = document.getElementById( "collapsibleTable" + indexPalette );
  if ( !Table || !Button ) return false; 
  var FirstRow = Table.getElementsByTagName("tr")[0];
  var RowDisplay; 
  if ( Button.firstChild.data == Palette_Enrouler ) {
    RowDisplay = "none"
    Button.firstChild.data = Palette_Derouler;
  }else{
    RowDisplay = FirstRow.style.display;
    Button.firstChild.data = Palette_Enrouler;
  } 
  var Row = FirstRow.nextSibling;
  while(Row){
    if(Row.tagName && Row.tagName.toLowerCase() === "tr"){
      Row.style.display = RowDisplay;
    }
    Row = Row.nextSibling;
  }
} 
 
function Palette(Element){
  if(!Element) Element = document;
  var TableIndex = 0;
  var TableIndexes = new Array();
  var Tables = Element.getElementsByTagName( "table" ); 
  for ( var i = 0; i < Tables.length; i++ ) {
    if ( hasClass( Tables[i], "collapsible" ) ) {
      var Table = Tables[i];
      var Header = Table.getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
      /* only add button and increment count if there is a header row to work with */
      if (Header) {
        TableIndex++
        Palette_index++;
        TableIndexes[Palette_index] = Table;
        Table.setAttribute( "id", "collapsibleTable" + Palette_index ); 
        var Button     = document.createElement( "span" );
        var ButtonLink = document.createElement( "a" );
        var ButtonText = document.createTextNode( Palette_Enrouler ); 
        Button.className = "navboxToggle";
        ButtonLink.setAttribute( "id", "collapseButton" + Palette_index );
        ButtonLink.setAttribute( "href", "javascript:Palette_toggle(" + Palette_index + ");" );
        ButtonLink.appendChild( ButtonText ); 
        Button.appendChild( ButtonLink ); 
        Header.insertBefore( Button, Header.childNodes[0] ); 
      }
    }
  } 
  for(var index in TableIndexes){
    var Table = TableIndexes[index];
    if(hasClass(Table,"collapsed")||(TableIndex>Palette_max && hasClass(Table,"autocollapse")))
    Palette_toggle(index); 
  }
}
addOnloadHook(Palette);

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});