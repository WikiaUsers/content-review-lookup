$(function() {
    var rights = {};
/*Quelle: http://candybox.wikia.com/wiki/MediaWiki:Wikia.js */ 
    rights["Sonic775"]           = ["Fondateur", "Propriétaire du parc et designer de manèges"],
    rights["Sébastien M"]           = ["Administrateur"],
    rights["Avoue72"]             = ["APBW Staff"];
 
     if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
/* Icônes sociales (Facebook, Twitter, Google+) */
var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: '20px'
};
importScriptPage('SocialIcons/code.js','dev');
 
/**** Plus de bouton "ajouter une image à cette galerie" ****/
 
$( "li:last" ).removeClass(function() {
  return $( this ).prev().attr( "wikia-photogallery-add wikia-button noprint" );
});
 
/*===================
 * Scripts importés *
 ===================*/
 
/* Collapsible tables (désormais inutile, présent par défaut avec "mw-collapsible")
===================================================================================*/
importScriptPage('ShowHide/code.js', 'dev');
 
/* Compte à rebours
=========================================*/
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
 
/* Lien ancré pour les titres de section
=========================================*/
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/HeaderLinks.js"
    ]
});
 
/**
 * Boîtes déroulantes
 *
 * Pour [[Modèle:Méta palette de navigation]]
 */
 
var Palette_Enrouler = '[masquer]';
var Palette_Derouler  = '[afficher]';
 
var Palette_max = 1;
var Palette_index = -1;
 
function Palette_toggle(indexPalette){
  var Button = document.getElementById( "collapseButton" + indexPalette);
  var Table = document.getElementById( "collapsibleTable" + indexPalette);
  if (!Table || !Button) return false;
 
  var Rows = Table.rows;
  var RowDisplay = "none";
  if (Button.firstChild.data == Palette_Derouler) {
    Button.firstChild.data = Palette_Enrouler;
    RowDisplay = Rows[0].style.display;
  } else {
    Button.firstChild.data = Palette_Derouler;
  }
  for (var i = 1; i < Rows.length; i++) {
    Rows[i].style.display = RowDisplay
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
        ButtonLink.setAttribute( "href", "javascript:;" );
        $(ButtonLink).click(new Function( "evt", "Palette_toggle(" + Palette_index + " ); evt.preventDefault();") );
        ButtonLink.appendChild( ButtonText );
        Button.appendChild( document.createTextNode("\u00a0"));  //ajout d'un espace insécable pour décoller ce bouton du texte de la celulle
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
 
 
/**
 * Pour [[Modèle:Boîte déroulante]]
 */
 
var BoiteDeroulante_Enrouler = '[masquer]';
var BoiteDeroulante_Derouler  = '[afficher]';
var BoiteDeroulante_max = 0;
var BoiteDeroulante_index = -1;
 
function BoiteDeroulante_toggle(indexBoiteDeroulante){
      var NavFrame = document.getElementById("NavFrame" + indexBoiteDeroulante);
      var NavToggle = document.getElementById("NavToggle" + indexBoiteDeroulante);
      var CaptionContainer = document.getElementById("NavCaption" + indexBoiteDeroulante);
      if (!NavFrame || !NavToggle || !CaptionContainer) return;
      var caption = new Array();
      var CaptionSpans = CaptionContainer.getElementsByTagName('span');
      caption[0] = CaptionSpans[0].innerHTML;
      caption[1] = CaptionSpans[1].innerHTML;
 
      var Contents = NavFrame.getElementsByTagName('div');
      if (NavToggle.innerHTML == caption[1]) {
            NavToggle.innerHTML = caption[0];
            for(var a=0,m=Contents.length;a<m;a++){
                  if(hasClass(Contents[a], "NavContent")){
                        Contents[a].style.display = 'none';
                        return;
                  }
            }
      }else{
            NavToggle.innerHTML = caption[1];
            for(var a=0,m=Contents.length;a<m;a++){
                  if(hasClass(Contents[a], "NavContent")){
                        Contents[a].style.display = 'block';
                        return;
                  }
            }
      }
}
 
function BoiteDeroulante(Element){
      if(!Element) Element = document;
      var NavFrameCount = -1;
      var NavFrames = Element.getElementsByTagName("div");
      for(var i=0,l=NavFrames.length;i<l;i++){
            if(hasClass(NavFrames[i], "NavFrame")){
                  var NavFrame = NavFrames[i];
                  NavFrameCount++;
                  BoiteDeroulante_index++;
 
                  if (NavFrame.title && NavFrame.title.indexOf("/")!=-1) {
                        var Enrouler = NavFrame.title.HTMLize().split("/")[1];
                        var Derouler = NavFrame.title.HTMLize().split("/")[0];
                  }else{
                        var Enrouler = BoiteDeroulante_Enrouler;
                        var Derouler = BoiteDeroulante_Derouler;
                  }
                  NavFrame.title='';
                  var CaptionContainer = document.createElement('span');
                  CaptionContainer.id = 'NavCaption' + BoiteDeroulante_index;
                  CaptionContainer.style.display = "none";
                  CaptionContainer.innerHTML = '<span>' + Derouler + '</span><span>' + Enrouler + '</span>';
                  NavFrame.appendChild(CaptionContainer);
 
                  var NavToggle = document.createElement("a");
                  NavToggle.className = 'NavToggle';
                  NavToggle.id = 'NavToggle' + BoiteDeroulante_index;
                  NavToggle.href = 'javascript:BoiteDeroulante_toggle(' + BoiteDeroulante_index + ');';
                  var NavToggleText = document.createTextNode(Enrouler);
                  NavToggle.appendChild(NavToggleText);
 
                  NavFrame.insertBefore( NavToggle, NavFrame.firstChild );
                  NavFrame.id = 'NavFrame' + BoiteDeroulante_index;
                  if (BoiteDeroulante_max <= NavFrameCount) {
                        BoiteDeroulante_toggle(BoiteDeroulante_index);
                  }
            }
      }
 
}
addOnloadHook(BoiteDeroulante);