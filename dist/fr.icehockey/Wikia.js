/**
* IMPORTANT: There is a re-writing/jquerization of this page in [[Projet:JavaScript/Refonte Common.js avec jQuery]], but has not been tested.
* Il y a une ré-écriture de cette page en utilisant jQuery sur [[Projet:JavaScript/Refonte Common.js avec jQuery]], mais n'a pas été testé.
*/

/**
* N'importe quel JavaScript ici sera chargé pour n'importe quel utilisateur et pour chaque page accédée.
*
* ATTENTION : Avant de modifier cette page, veuillez tester vos changements avec votre propre
* vector.js. Une erreur sur cette page peut faire bugger le site entier (et gêner l'ensemble des
* visiteurs), même plusieurs heures après la modification !
*
* Prière de ranger les nouvelles fonctions dans les sections adaptées :
* - Fonctions JavaScript
* - Fonctions spécifiques pour MediaWiki
* - Applications spécifiques à la fenêtre d'édition
* - Applications qui peuvent être utilisées sur toute page
* - Applications spécifiques à un espace de nom ou une page
*
* <nowiki> /!\ Ne pas retirer cette balise
*/



/*************************************************************/
/* Fonctions JavaScript : pallient les limites de JavaScript */
/* Surveiller : http://www.ecmascript.org/                   */
/*************************************************************/

/**
* insertAfter : insérer un élément dans une page
*/
function insertAfter(parent, node, referenceNode) {
parent.insertBefore(node, referenceNode.nextSibling);
}

/**
* getElementsByClass : rechercher les éléments de la page dont le paramètre "class" est celui recherché
*/
function getElementsByClass(searchClass, node, tag) {
if (node == null) node = document;
if (tag == null) tag = '*';
return getElementsByClassName(node, tag, searchClass);
}

/**
* Diverses fonctions manipulant les classes
* Utilise des expressions régulières et un cache pour de meilleures perfs
* isClass et whichClass depuis http://fr.wikibooks.org/w/index.php?title=MediaWiki:Common.js&oldid=140211
* hasClass, addClass, removeClass et eregReplace depuis http://drupal.org.in/doc/misc/drupal.js.source.html
* surveiller l'implémentation de .classList http://www.w3.org/TR/2008/WD-html5-diff-20080122/#htmlelement-extensions
*/
function isClass(element, classe) {
return hasClass(element, classe);
}

function whichClass(element, classes) {
var s=" "+element.className+" ";
for(var i=0;i<classes.length;i++)
if (s.indexOf(" "+classes[i]+" ")>=0) return i;
return -1;
}

function hasClass(node, className) {
var haystack = node.className;
if(!haystack) return false;
if (className === haystack) {
return true;
}
return (" " + haystack + " ").indexOf(" " + className + " ") > -1;
}

function addClass(node, className) {
if (hasClass(node, className)) {
return false;
}
var cache = node.className;
if (cache) {
node.className = cache + ' ' + className;
} else {
node.className = className;
}
return true;
}

function removeClass(node, className) {
if (!hasClass(node, className)) {
return false;
}
node.className = eregReplace('(^|\\s+)'+ className +'($|\\s+)', ' ', node.className);
return true;
}

function eregReplace(search, replace, subject) {
return subject.replace(new RegExp(search,'g'), replace);
}


/**
* Récupère la valeur du cookie
*/
function getCookieVal(name) {
var cookiePos = document.cookie.indexOf(name + "=");
var cookieValue = false;
if (cookiePos > -1) {
cookiePos += name.length + 1;
var endPos = document.cookie.indexOf(";", cookiePos);
if (endPos > -1)
cookieValue = document.cookie.substring(cookiePos, endPos);
else
cookieValue = document.cookie.substring(cookiePos);
}
return cookieValue;
}

// Récupère proprement le contenu textuel d'un noeud et de ses noeuds descendants
// Copyright Harmen Christophe, http://openweb.eu.org/articles/validation_avancee, CC
function getTextContent(oNode) {
if(!oNode) return null;
if (typeof(oNode.textContent)!="undefined") {return oNode.textContent;}
switch (oNode.nodeType) {
case 3: // TEXT_NODE
case 4: // CDATA_SECTION_NODE
return oNode.nodeValue;
break;
case 7: // PROCESSING_INSTRUCTION_NODE
case 8: // COMMENT_NODE
if (getTextContent.caller!=getTextContent) {
return oNode.nodeValue;
}
break;
case 9: // DOCUMENT_NODE
case 10: // DOCUMENT_TYPE_NODE
case 12: // NOTATION_NODE
return null;
break;
}
var _textContent = "";
oNode = oNode.firstChild;
while (oNode) {
_textContent += getTextContent(oNode);
oNode = oNode.nextSibling;
}
return _textContent;
}

// Array.indexOf : recherche un élément dans un tableau

if(!Array.indexOf){
Array.prototype.indexOf = function(obj){
    for(var i=0; i<this.length; i++){
        if(this[i]==obj){
            return i;
        }
    }
    return -1;
}
}

if(!String.HTMLize){
String.prototype.HTMLize = function() {
var chars = new Array('&','<','>','"');
var entities = new Array('amp','lt','gt','quot');
var string = this;
for (var i=0; i<chars.length; i++) {
var regex = new RegExp(chars[i], "g");
string = string.replace(regex, '&' + entities[i] + ';');
}
return string;
}
}


/**********************************************************************************************************/
/* Fonctions générales MediaWiki (pallient les limitations du logiciel)                                   */
/* Surveiller : http://svn.wikimedia.org/viewvc/mediawiki/trunk/phase3/skins/common/wikibits.js?view=log  */
/**********************************************************************************************************/

/*
* Fonction générales de lancement de fonctions ou de script
* DÉPRÉCIÉ : utiliser addOnloadHook simplement
*/
function addLoadEvent(func) {
addOnloadHook(func);
}

/**
* Insérer un JavaScript d'une page particulière, idée de Mickachu
* DÉPRÉCIÉ : utiliser importScript qui fait partie du logiciel
*/
function loadJs(page) {
importScript(page);
}

/**
* Projet JavaScript
*/
function obtenir(name) {
importScript('MediaWiki:Gadget-' + name + '.js');
}

/**
* Transformer les pages du Bistro, du BA et les pages spécifiées en page de discussion
*/
function TransformeEnDiscussion() {
if(  (wgPageName.search('Wikipédia:Le_Bistro') != -1)
|| (wgPageName.search('Wikipédia:Bulletin_des_administrateurs') != -1)
|| document.getElementById('transformeEnPageDeDiscussion')) {
removeClass(document.body, 'ns-subject');
addClass(document.body, 'ns-talk');
}
}
addOnloadHook(TransformeEnDiscussion);

/**
* Transformer certaines pages en pseudo-article
* c'est raisonnable ? --Tavernier
*/
function TransformeEnArticle() {
var transformeEnA = document.getElementById("transformeEnArticle");
if(transformeEnA) document.body.className = "ns-0";
}
addOnloadHook(TransformeEnArticle);

/**
* Ajouter un bouton à la fin de la barre d'outils
*/
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText, imageId) {
mwCustomEditButtons[mwCustomEditButtons.length] =
{"imageId": imageId,
"imageFile": imageFile,
"speedTip": speedTip,
"tagOpen": tagOpen,
"tagClose": tagClose,
"sampleText": sampleText};
}



/****************************************/
/* Applications pour l'ensemble du site */
/****************************************/

/**
* Tout ce qui concerne la page d'édition
* Voir MediaWiki:Common.js/edit.js pour ces fonctions
*/
if( mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit' ) {
importScript( 'MediaWiki:Common.js/edit.js' );
}

/**
* Liens d'accès directs pour la navigation au clavier
*/
function showSkipLinks() {
var jump_to_nav = document.getElementById('jump-to-nav');
if( !jump_to_nav ) return;
var skip_links = jump_to_nav.getElementsByTagName('A')[0];
jump_to_nav.className='hidden';
skip_links.onfocus=function() {
jump_to_nav.className='';
}
}
addOnloadHook(showSkipLinks);

/**
* Réécriture des titres
*
* Fonction utilisée par [[Modèle:Titre incorrect]]
*
* La fonction cherche un bandeau de la forme
* <div id="RealTitleBanner">
*   <span id="RealTitle">titre</span>
* </div>
*
* Un élément comportant id="DisableRealTitle" désactive la fonction
*/
function rewritePageH1() {
var realTitleBanner = document.getElementById('RealTitleBanner');
if (realTitleBanner) {
if (!document.getElementById('DisableRealTitle')) {
var realTitle = document.getElementById('RealTitle');
var h1 = document.getElementById('firstHeading');
if(!h1) h1 = document.getElementsByTagName('h1')[0]; // Nostalgia, Standard
var realH1 = getTextContent(h1);    
if (realTitle && h1) {
var titleText = realTitle.innerHTML;
if (titleText == '') h1.style.display = 'none';
else h1.innerHTML = titleText;
realTitleBanner.style.display = 'none';
if( mw.config.get('wgNamespaceNumber')==0 || mw.config.get('wgNamespaceNumber')==10) {
var avert = document.createElement('p')
avert.style.fontSize = '90%';
avert.innerHTML = 'Titre à utiliser pour créer un lien interne : <b>'+realH1+'</b>';
insertAfter(document.getElementById('content'),avert,h1);
}

}
}
}
}
addOnloadHook(rewritePageH1);

/**
* Icônes de titre
*
* Cherche les icônes de titre (class="icone_de_titre") et les
* déplace à droite du titre de la page.
* Doit être exécuté après une éventuelle correction de titre.
*/
function IconesDeTitre() {
var h1 = document.getElementById('firstHeading');
if(!h1) h1 = document.getElementsByTagName('h1')[0]; // Nostalgia, Standard
if(!h1) return;
var icones = getElementsByClass( "icone_de_titre", document, "div" );
for( var j = icones.length; j > 0; --j ){
icones[j-1].style.display = "block"; /* annule display:none par défaut */
if(( skin == "modern" )||( skin == "vector" )){
icones[j-1].style.marginTop = "0em";
}
h1.parentNode.insertBefore(icones[j-1], h1); /* déplacement de l'élément */
}
}
addOnloadHook(IconesDeTitre);

/**
* Déplacement de coordonnées qui apparaissent en haut de la page
*/
function moveCoord() {
var h1 = document.getElementById('firstHeading');
if(!h1) h1 = document.getElementsByTagName('h1')[0]; // Nostalgia, Standard
var coord = document.getElementById('coordinates');
if ( !coord || !h1 ) return;
coord.id = "coordinates-title";
h1.parentNode.insertBefore(coord, h1); /* déplacement de l'élément */
}
addOnloadHook(moveCoord);

// Verwendung von OpenStreetMap in Wikipedia.
// (c) 2008 by Magnus Manske
// Released under GPL
// Modifié pour marcher après moveCoord() ci-dessus

if(typeof(MoveResizeAbsolute_AddMoveArea)!="function") obtenir('MoveResizeAbsolute');

function openStreetMap_Init () {
var c = document.getElementById ( 'coordinates-title' ) ;
if ( !c ) return ;

var a = c.getElementsByTagName ( 'a' ) ;
var geohack = false;
for ( var i = 0 ; i < a.length ; i++ ) {
var h = a[i].href ;
if ( !h.match(/geohack/) ) continue ;
geohack = true ;
break ;
}
if ( !geohack ) return ;

var na = document.createElement ( 'a' ) ;
na.href = 'javascript:openStreetMap_Toggle();' ;
na.title = 'Afficher/Masquer la carte' ;
na.appendChild ( document.createTextNode ( 'carte' ) ) ;
c.appendChild ( document.createTextNode ( ' (' ) ) ;
c.appendChild ( na ) ;
c.appendChild ( document.createTextNode ( ')   ' ) ) ;
}

function openStreetMap_Toggle () {
var c = document.getElementById ( 'coordinates-title' ) ;
if ( !c) return ;
var osm = document.getElementById ( 'OpenStreetMap' ) ;

if (osm) {
if ( osm.style.display == 'none' ) {
osm.style.display = 'block' ;
} else {
osm.style.display = 'none' ;
}
return;
}

var found_link = false ;
var a = c.getElementsByTagName ( 'a' ) ;
var h;
for ( var i = 0 ; i < a.length ; i++ ) {
h = a[i].href ;
if ( !h.match(/geohack/) ) continue ;
found_link = true ;
break ;
}
if ( !found_link ) return ; // No geohack link found

h = h.split('params=')[1] ;

var LargeurEcran = MoveResizeAbsolute_GetScreenWidth();
var HauteurEcran = MoveResizeAbsolute_GetScreenHeight();

var OSMDiv = document.createElement('div');
OSMDiv.id = 'OpenStreetMap' ;
OSMDiv.style.position = "absolute";
OSMDiv.style.zIndex = 5000;
OSMDiv.style.top = (HauteurEcran*10/100) + "px";
OSMDiv.style.left = (LargeurEcran*15/100) + "px";
OSMDiv.style.width = "70%";
OSMDiv.style.height = (HauteurEcran*80/100) + "px";
OSMDiv.style.border = "2px solid black";
OSMDiv.style.backgroundColor = "white";
OSMDiv.style.overflow = "hidden";

var MoveArea = document.createElement('div');
MoveArea.style.position = "relative";
MoveArea.style.top = "0";
MoveArea.style.width = "100%";
MoveArea.style.height = "50px";
MoveArea.title = "Cliquer et glisser pour déplacer la carte";

var CloseLink = document.createElement('a');
CloseLink.setAttribute("style", "float:right;margin:10px;");
CloseLink.innerHTML = "Masquer";
CloseLink.title = "Cliquer pour masquer la carte";
CloseLink.href = "javascript:openStreetMap_Toggle();";
MoveArea.appendChild(CloseLink);

var iFrame = document.createElement ( 'iframe' ) ;
var url = 'http://toolserver.org/~kolossos/openlayers/kml-on-ol.php?lang=' + mw.config.get('wgUserLanguage') + '&params=' + h ;
iFrame.style.width = '100%' ;
iFrame.style.height = ((HauteurEcran*80/100)-100) + 'px' ;
iFrame.style.clear = 'both' ;
iFrame.src = url ;

var ResizeArea = document.createElement('div');
ResizeArea.style.position = "relative";
ResizeArea.style.top = "0";
ResizeArea.style.width = "100%";
ResizeArea.style.height = "50px";
ResizeArea.title = "Cliquer et glisser pour redimensionner la carte";

OSMDiv.appendChild(MoveArea);
OSMDiv.appendChild(iFrame);
OSMDiv.appendChild(ResizeArea);

document.body.appendChild ( OSMDiv ) ;

var ElementsToMove = new Array(OSMDiv);
var ElementsToResize = new Array(OSMDiv, iFrame);
var ElementsMinWidth = new Array(150, 150);
var ElementsMinHeights = new Array(200, 100);

MoveResizeAbsolute_AddMoveArea(MoveArea, ElementsToMove);
MoveResizeAbsolute_AddResizeArea(ResizeArea, ElementsToResize, ElementsMinWidth, ElementsMinHeights);
}

addOnloadHook(openStreetMap_Init);

/**
* Ajout d'un sous-titre
*
* Fonction utilisée par [[Modèle:Sous-titre]]
*
* La fonction cherche un élément de la forme
* <span id="sous_titre_h1">Sous-titre</span>
*
* Doit être exécutée après les fonctions d'icônes de titre
*/

function sousTitreH1() {
var span= document.getElementById('sous_titre_h1');
var title=document.getElementById('firstHeading');
if(!title) title = document.getElementsByTagName('h1')[0]; // Nostalgia, Standard
if (span && title) {
var subtitle=span.cloneNode(true);
title.appendChild(document.createTextNode(' '));
title.appendChild(subtitle);
span.parentNode.removeChild(span);
}
}
addOnloadHook(sousTitreH1);

/**
* Déplacement des [modifier]
*
* Correction des titres qui s'affichent mal en raison de limitations dues à MediaWiki.
* Ce script devrait pouvoir être supprimé lorsque le [[bugzilla:11555]] sera résolu (comportement équivalent)
*
* Copyright 2006, Marc Mongenet. Licence GPL et GFDL.
*
* The function looks for <span class="editsection">, and move them
* at the end of their parent and display them inline in small font.
* var oldEditsectionLinks=true disables the function.
*/
function setModifySectionStyle(element) {

if (typeof oldEditsectionLinks !== 'undefined' && oldEditsectionLinks) {
return;
}

var racine = element ? element : document;

try {
for (var sections = ["h1", "h2", "h3", "h4", "h5", "h6"], i = 0; i < 6; i++) {
var list = racine.getElementsByTagName(sections[i]);
for (var j = 0, l = list.length; j < l; j++) {
var parent = list[j];
var span = parent.firstChild;
if (span.className === "editsection") {
addClass(parent, "modifiedSectionTitle");
parent.appendChild(span);
}
}
}
}
catch (e) { }
}

addOnloadHook(setModifySectionStyle);


/**
* Boîtes déroulantes
*
* Pour [[Modèle:Méta palette de navigation]]
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


/**
* Pour [[Modèle:Boîte déroulante]]
*/

var BoiteDeroulante_Enrouler = '[enrouler]';
var BoiteDeroulante_Derouler  = '[dérouler]';
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

/**
* WikiMiniAtlas
*
* voir WP:WMA
*/
if ( mw.config.get('wgServer') == "https://secure.wikimedia.org") {
var metaBase = "https://secure.wikimedia.org/wikipedia/meta";
} else {
var metaBase = "http://meta.wikimedia.org";
}
importScriptURI(metaBase+"/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400")

var wma_settings = {
buttonImage: 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Geographylogo.svg/18px-Geographylogo.svg.png'
}

/**
* Utilisation du modèle Modèle:Images
*/
function toggleImage(group, remindex, shwindex) {
document.getElementById("ImageGroupsGr"+group+"Im"+remindex).style.display="none";
document.getElementById("ImageGroupsGr"+group+"Im"+shwindex).style.display="inline";
}

function imageGroup(bc){
if (document.URL.match(/printable/g)) return;
if(!bc){
var bc=document.getElementById("bodyContent");
if( !bc ) bc = document.getElementById("mw_contentholder");
if( !bc ) bc = document.getElementById("article");
if( !bc ) return;
}
var divs=bc.getElementsByTagName("div");
var i = 0, j = 0;
var units, search;
var currentimage;
var UnitNode;
for (i = 0; i < divs.length ; i++) {
if (divs[i].className != "ImageGroup") continue;
UnitNode=undefined;
search=divs[i].getElementsByTagName("div");
for (j = 0; j < search.length ; j++) {
if (search[j].className != "ImageGroupUnits") continue;
UnitNode=search[j];
break;
}
if (UnitNode==undefined) continue;
units=Array();
for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
var temp = UnitNode.childNodes[j];
if (temp.className=="center") units.push(temp);
}
for (j = 0 ; j < units.length ; j++) {
currentimage=units[j];
currentimage.id="ImageGroupsGr"+i+"Im"+j;
var imghead = document.createElement("div");
var leftlink;
var rightlink;
if (j != 0) {
leftlink = document.createElement("a");
leftlink.href = "javascript:toggleImage("+i+","+j+","+(j-1)+");";
leftlink.innerHTML="◀";
leftlink.title="Image précédente";
} else {
leftlink = document.createElement("span");
leftlink.innerHTML="&nbsp;";
}
if (j != units.length - 1) {
rightlink = document.createElement("a");
rightlink.href = "javascript:toggleImage("+i+","+j+","+(j+1)+");";
rightlink.innerHTML="▶";
rightlink.title="Image suivante";
} else {
rightlink = document.createElement("span");
rightlink.innerHTML="&nbsp;";
}
var comment = document.createElement("tt");
comment.innerHTML = "("+ (j+1) + "/" + units.length + ")";
with(imghead) {
style.fontSize="110%";
style.fontweight="bold";
appendChild(leftlink);
appendChild(comment);
appendChild(rightlink);
}
currentimage.insertBefore(imghead,currentimage.childNodes[0]);
if (j != 0) currentimage.style.display="none";
}
}
}
addOnloadHook(imageGroup);

/**
* Ajout d'un style particulier aux liens interlangues vers un bon article ou
* un article de qualité
*/
function lienAdQouBAouPdQ() {

if ( document.getElementById( "p-lang" ) ) {
var InterwikiLinks = document.getElementById( "p-lang" ).getElementsByTagName( "li" );

for ( var i = 0; i < InterwikiLinks.length; i++ ) {
if ( document.getElementById( InterwikiLinks[i].className + "-adq" ) ) {
InterwikiLinks[i].className += " AdQ"
InterwikiLinks[i].title = "Lien vers un article de qualité.";
}
else if ( document.getElementById( InterwikiLinks[i].className + "-ba" ) ) {
InterwikiLinks[i].className += " BA"
InterwikiLinks[i].title = "Lien vers un bon article.";
}
else if ( document.getElementById( InterwikiLinks[i].className + "-pdq" ) ) {
InterwikiLinks[i].className += " PdQ"
InterwikiLinks[i].title = "Lien vers un portail de qualité.";
}
}
}
}
addOnloadHook(lienAdQouBAouPdQ);

/**
* Redirect vers wikibooks etc.
*
*/
var redirectedFromArticleDatas = new Array(
new Array('Wikipédia:Redirect_vers_Wikibooks', 'wikibooks'),
new Array('Wikipédia:Redirect_vers_Wikisource', 'wikisource'),
new Array('Wikipédia:Redirect_vers_Wikiversité', 'wikiversity'),
new Array('Wikipédia:Redirect_vers_Wikiquote', 'wikiquote'),
new Array('Wikipédia:Redirect_vers_Wikinews', 'wikinews'),
new Array('Wikipédia:Redirect_vers_Wiktionnaire', 'wiktionary')
);

function redirectedFromArticle() {
if ( mw.config.get('wgIsArticle') == false)
return;
for (var i = 0; i < redirectedFromArticleDatas.length; ++i) {
var page_match = redirectedFromArticleDatas[i];
var index = mw.config.get('wgPageName').indexOf(page_match[0]);
if (index == 0) {
var div = document.getElementById('contentSub');
var span = document.getElementById('redirected_from');
// real target is always encoded in the anchor.
target = window.location.hash;
if (!div || !span || target == '')
break;

target = target.slice(1);
// Konqueror 3.5 work around
if (target.indexOf('#') == 0)
target = target.slice(1);
target = target.split('.23');
target[0] = target[0].replace(/\.([0-9A-Z][0-9A-Z])/g, '%$1');
var quoted = target[0]
if (target[1].length)
quoted += '#' + target[1]
quoted = quoted.replace(/%2F/g, '/');
var display = target[2]
display = display.replace(/\.([0-9A-Z][0-9A-Z])/g, '%$1');
display = decodeURI(display);
display = display.replace(/_/g, ' ');

var e = document.createElement('A');
e.href = 'http://fr.' + page_match[1] + '.org/wiki/' + quoted;
e.innerHTML = display;
span.replaceChild(e, span.firstChild);
break;
}
}
}
addOnloadHook(redirectedFromArticle);

/**
* Déplace les liens portails vers la boite de catégorie
*
* Copyright 2007, fr:user:Aoineko. Licence GFDL et GPL.
*/
var gUseMovePortalToCategoryBox = 1;

function movePortalToCategoryBox() {
if(!gUseMovePortalToCategoryBox)
return;

// search for portails
var div_portal = document.getElementById('portallinks');
if(div_portal && (div_portal.className == 'movable')) {
div_portal.style.display = 'none'; // hide the portail div
var div_cat = document.getElementById('catlinks'); // get cat div
if(!div_cat) { // no category box ? then create it
var div_foot;
var divs = document.getElementsByTagName('div');
for(var i = 0; i < divs.length ; i++)
if(divs[i].className == 'printfooter')
div_foot = divs[i];
div_cat = document.createElement("div");
div_cat.setAttribute('id', 'catlinks');
div_foot.parentNode.insertBefore(div_cat, div_foot);
}
div_cat.innerHTML = div_portal.innerHTML + '<hr/>' + div_cat.innerHTML;
}
}
addOnloadHook(movePortalToCategoryBox);

/**
* Permet d'afficher les catégories cachées pour les contributeurs enregistrés, en ajoutant un (+) à la manière des boîtes déroulantes
*/
function hiddencat(){
if(document.URL.indexOf("printable=yes")!=-1) return;
var cl = document.getElementById('catlinks'); if(!cl) return;
if( !(hc = document.getElementById('mw-hidden-catlinks')) ) return;
if( hasClass(hc, 'mw-hidden-cats-user-shown') ) return;
if( hasClass(hc, 'mw-hidden-cats-ns-shown') )   addClass(hc, 'mw-hidden-cats-hidden');
var nc = document.getElementById('mw-normal-catlinks');
if( !nc ) {
var catline = document.createElement('div');
catline.id = 'mw-normal-catlinks';
var a = document.createElement('a');
a.href = '/wiki/Catégorie:Accueil';
a.title = 'Catégorie:Accueil';
a.appendChild(document.createTextNode('Catégories'));
catline.appendChild(a);
catline.appendChild(document.createTextNode(' : '));
nc = cl.insertBefore(catline, cl.firstChild);
}
else nc.appendChild(document.createTextNode(' | '));
var lnk = document.createElement('a');
lnk.id = 'mw-hidden-cats-link';
lnk.title = 'Cet article contient des catégories cachées';
lnk.style.cursor = 'pointer';
lnk.style.color = 'black';
lnk.onclick = toggleHiddenCats;
lnk.appendChild(document.createTextNode('[+]'));
hclink = nc.appendChild(lnk);
}
function toggleHiddenCats(){
if( hasClass(hc, 'mw-hidden-cats-hidden') ) {
removeClass(hc, 'mw-hidden-cats-hidden');
addClass(hc, 'mw-hidden-cat-user-shown');
changeText(hclink, '[–]');
} else {
removeClass(hc, 'mw-hidden-cat-user-shown');
addClass(hc, 'mw-hidden-cats-hidden');
changeText(hclink, '[+]');
}
}
addOnloadHook(hiddencat);

/**
* Script pour alterner entre plusieurs cartes de géolocalisation
*/

if(( mw.config.get('wgAction')=="view" || mw.config.get('wgAction')=="purge" || mw.config.get('wgAction')=="submit")) addOnloadHook(GeoBox_Init);

function GeoBox_Init(Element){
if(!Element) Element = document.body;
var cont = getElementsByClass('img_toogle', Element, 'div');
if(cont.length==0) return;
for (var i = 0,m=cont.length; i < m ; i++) {
cont[i].id = 'img_toogle_' + i;
var Boxes = getElementsByClass('geobox',cont[i]);
var ToggleLinksDiv = document.createElement('ul');
ToggleLinksDiv.id = 'geoboxToggleLinks_' + i;
for(var a=0,l=Boxes.length;a<l;a++){
var ThisBox = Boxes[a];
ThisBox.id = 'geobox_' + i + "_" + a;
ThisBox.style.borderTop='0';
var ThisAlt = ThisBox.getElementsByTagName('img')[0].alt
var toggle = document.createElement('a');
toggle.id = 'geoboxToggle_' + i + "_" + a;
toggle.appendChild(document.createTextNode(ThisAlt));
toggle.href='javascript:;';
toggle.onclick = function(){
GeoBox_Toggle(this);
return false;
}
var Li = document.createElement('li');
Li.appendChild(toggle);
ToggleLinksDiv.appendChild(Li);
if(a==(l-1)){
Li.style.display = "none";
}else{
ThisBox.style.display = "none";
}
}
cont[i].appendChild(ToggleLinksDiv);
}
}

function GeoBox_Toggle(link){
var ImgToggleIndex = link.id.split('geoboxToggle_').join('').replace(/_.*/g, "");
var GeoBoxIndex = link.id.replace(/.*_/g, "");
var ImageToggle = document.getElementById('img_toogle_' + ImgToggleIndex);
var Links = document.getElementById('geoboxToggleLinks_' + ImgToggleIndex);
var Geobox = document.getElementById('geobox_' + ImgToggleIndex + "_" + GeoBoxIndex);
var Link = document.getElementById('geoboxToggle_' + ImgToggleIndex + "_" + GeoBoxIndex);
if( (!ImageToggle) || (!Links) || (!Geobox) || (!Link) ) return;
var AllGeoboxes = getElementsByClass('geobox',ImageToggle);
for(var a=0,l=AllGeoboxes.length;a<l;a++){
if(AllGeoboxes[a] == Geobox){
AllGeoboxes[a].style.display = "";
}else{
AllGeoboxes[a].style.display = "none";
}
}
var AllToggleLinks = Links.getElementsByTagName('a');
for(var a=0,l=AllToggleLinks.length;a<l;a++){
if(AllToggleLinks[a] == Link){
AllToggleLinks[a].parentNode.style.display = "none";
}else{
AllToggleLinks[a].parentNode.style.display = "";
}
}
}

/**
* permet d'ajouter un petit lien (par exemple d'aide) à la fin du titre d'une page.
* known bug : conflit avec le changement de titre classique.
* Pour les commentaires, merci de contacter [[user:Plyd|Plyd]].
*/
function rewritePageH1bis() {
try {
var helpPage = document.getElementById("helpPage");
if (helpPage) {
var helpPageURL = document.getElementById("helpPageURL");
var h1 = document.getElementById('firstHeading');
if (helpPageURL && h1) {
h1.innerHTML = h1.innerHTML + '<span id="h1-helpPage">' + helpPageURL.innerHTML + '</span>';
helpPage.style.display = "none";
}
}
} catch (e) {
/* Something went wrong. */
}
}
addOnloadHook(rewritePageH1bis);

/**
* application de [[Wikipédia:Prise de décision/Système de cache]]
* un <span class="noarchive"> autour du lien l'empêche d'être pris en compte
* pour celui-ci uniquement
* un no_external_cache=true dans un monobook personnel désactive le script
*/

function addcache(element) {

if (typeof no_external_cache !== "undefined" && no_external_cache) {
return;
}

var liens = element ? $j(element + ' ol.references a.external') : $j('ol.references a.external');
for (var i = 0, l = liens.length; i < l; i++) {
var lien_en_cours = liens[i];
var chemin = lien_en_cours.href;
if (chemin.indexOf("http://wikiwix.com/cache/") > -1 || chemin.indexOf("http://web.archive.org/web/") > -1 || chemin.indexOf("wikipedia.org") > -1 || chemin.indexOf("wikimedia.org") > -1 || chemin.indexOf("stable.toolserver.org") > -1) {
continue;
}
var element_parent = lien_en_cours.parentNode;
if (hasClass(element_parent, "noarchive")) {
continue;
}
var titre = getTextContent(lien_en_cours);
var last = document.createElement("small");
last.className = "cachelinks";
last.appendChild(document.createTextNode("\u00a0["));

var link = document.createElement("a");
link.setAttribute("href", "http://wikiwix.com/cache/?url=" + chemin.replace(/%/g, "%25").replace(/&/g, "%26") + "&title=" + encodeURIComponent(titre));
link.setAttribute("title", "archive de " + titre);
link.appendChild(document.createTextNode("archive"));

last.appendChild(link);
last.appendChild(document.createTextNode("]"));

element_parent.insertBefore(last, lien_en_cours.nextSibling);
}
}

if ( mw.config.get('wgNamespaceNumber') === 0) {
addOnloadHook(addcache);
}


/**
* Application de [[Wikipédia:Prise de décision/Lien interprojet]]
* Copie les liens interprojets du modèle {{Autres projets}}
* dans le menu en colonne de gauche.
* remove_other_projects = true; dans le monobook personnel pour activer
* en plus la suppression du modèle {{Autres projets}} en bas des articles.
* no_other_projects = true; dans le monobook personnel pour désactiver
* entièrement le script et l'ajout dans la colonne de gauche.
*/

function autresProjets() {
if ((typeof no_other_projects != "undefined") && (no_other_projects)) return;
if(!( mw.config.get('wgNamespaceNumber')==0)) return;
if(!( mw.config.get('wgAction') =="view")) return;
var div = document.getElementById('autres_projets');
if(!div) return;

if((skin=="monobook")||(skin=="chick")||(skin=="myskin")||(skin=="simple")){
var Portlet_ClassName = "portlet";
var PBody_ClassName = "pBody";
var Column_Id = 'column-one';
}else if(skin=="modern"){
var Portlet_ClassName = "portlet";
var PBody_ClassName = "pBody";
var Column_Id = 'mw_portlets';
}else if(skin=="vector"){
var Portlet_ClassName = "portal collapsed";
var PBody_ClassName = "body";
var Column_Id = 'mw-panel'
}else{
var Portlet_ClassName = false;
}
if(!Portlet_ClassName) return;

var list = div.getElementsByTagName('li');
var newlist = document.createElement("ul");
for (var i = 0; i < list.length ; i++) {
list.link = list[i].getElementsByTagName('a')[0];
list.text = list.link.getElementsByTagName('span')[0];
var newlistitem = document.createElement("li");
var newlink = document.createElement("a");
var newlinktext = document.createTextNode(getTextContent(list.text));
newlink.appendChild(newlinktext);
newlink.title=getTextContent(list.link);
newlink.href=list.link.href;
newlistitem.appendChild(newlink);
newlist.appendChild(newlistitem);
}
var interProject = document.createElement("div");
interProject.className = Portlet_ClassName;
interProject.id = 'p-projects';
interProject.innerHTML = '<h5>Autres projets<\/h5><div class="'+PBody_ClassName+'"><ul>'+newlist.innerHTML+'</ul></div>';
insertAfter(document.getElementById(Column_Id),interProject,document.getElementById('p-tb'));
if ((typeof remove_other_projects != "undefined") && (remove_other_projects)) {
document = div.parentNode.removeChild(div);
}
}

addOnloadHook(autresProjets);

/**
* Classe sur les lignes de tableaux
* pour permettre l'alternance des couleurs de ligne
* (compatible avec les tableaux triables)
*/

jQuery(document).ready(function($){
$('#content table.alternance tr:nth-child(odd)').addClass('odd');
$('#content table.sortable.alternance th a.sortheader').click(function(){
$('#content table.sortable.alternance tr').removeClass('odd');
$('#content table.sortable.alternance tr:nth-child(odd)').addClass('odd');
});
});



/************************************************************/
/* Function Strictement spécifiques à un espace de nom ou à une page */
/************************************************************/

// PAGE D'ACCUEIL
if( mw.config.get('wgFormattedNamespaces')[ mw.config.get('wgNamespaceNumber') ]+":"+mw.config.get('wgTitle') == mw.config.get('wgMainPageTitle') ) {

/**
* changement de l'onglet et lien vers la liste complète des Wikipédias depuis l'accueil
*/
function mainPageTransform(){
$('#ca-nstab-project a').text('Accueil');
addPortletLink('p-lang', 'http://www.wikipedia.org/', 'Liste complète', 'interwiki-listecomplete', 'Liste complète des Wikipédias');
}
addOnloadHook(mainPageTransform);

} // FIN DU IF page d'accueil






// ESPACE DE NOM 'SPECIAL'
if( mw.config.get('wgNamespaceNumber') == -1 ) {

/**
* Afficher une explication au nombre d'octets dans la liste de suivi
*/
function toolTipPlusMinus() {
if( mw.config.get('wgCanonicalSpecialPageName') != "Watchlist") return
var tt = "Nombre d'octets d'écart entre les deux dernières versions de la page";
var elmts = document.getElementsByTagName("span");
for(var cpt = 0; cpt < elmts.length; cpt++) {
if (/mw-plusminus-(pos|neg|null)/.test(elmts[cpt].className) || /mw-plusminus-(pos|neg|null)/.test(elmts[cpt].getAttribute("class")))
elmts[cpt].title = tt;
}
}
addOnloadHook(toolTipPlusMinus);




/**
* Modifie Special:Search pour pouvoir utiliser différents moteurs de recherche,
* disponibles dans une boîte déroulante.
* Auteurs : Jakob Voss, Guillaume, importé depuis la Wiki allemande
* <pre><nowiki>
*/

function externalSearchEngines() {
if (typeof SpecialSearchEnhanced2Disabled != 'undefined') return;
if ( mw.config.get('wgCanonicalSpecialPageName') != "Search") return;

var mainNode = document.getElementById("powersearch");
if (!mainNode) mainNode = document.getElementById("search");
if (!mainNode) return;

var beforeNode = document.getElementById("mw-search-top-table");
if (!beforeNode) return;
beforeNode = beforeNode.nextSibling;
if (!beforeNode) return;

var firstEngine = "mediawiki";

var choices = document.createElement("div");
choices.setAttribute("id","searchengineChoices");
choices.style.textAlign = "center";

var lsearchbox = document.getElementById("searchText");
if (!lsearchbox) return;
var initValue = lsearchbox.value;

var space = "";

for (var id in searchEngines) {
var engine = searchEngines[id];
if(engine.ShortName)
{
if (space) choices.appendChild(space);
space = document.createTextNode(" ");

var attr = {
type: "radio",
name: "searchengineselect",
value: id,
onFocus: "changeSearchEngine(this.value)",
id: "searchengineRadio-"+id
};

var html = "<input";
for (var a in attr) html += " " + a + "='" + attr[a] + "'";
html += " />";
var span = document.createElement("span");
span.innerHTML = html;

choices.appendChild( span );
var label = document.createElement("label");
label.htmlFor = "searchengineRadio-"+id;
if (engine.Template.indexOf('http') == 0) {
var lienMoteur = document.createElement("a");
lienMoteur.href = engine.Template.replace("{searchTerms}", initValue).replace("{language}", "fr");
lienMoteur.appendChild( document.createTextNode( engine.ShortName ) );
label.appendChild(lienMoteur);
} else {
label.appendChild( document.createTextNode( engine.ShortName ) );
}

choices.appendChild( label );
}
}
mainNode.insertBefore(choices, beforeNode);

var input = document.createElement("input");
input.id = "searchengineextraparam";
input.type = "hidden";

mainNode.insertBefore(input, beforeNode);

changeSearchEngine(firstEngine, initValue);
}

function changeSearchEngine(selectedId, searchTerms) {

var currentId = document.getElementById("searchengineChoices").currentChoice;
if (selectedId == currentId) return;

document.getElementById("searchengineChoices").currentChoice = selectedId;
var radio = document.getElementById('searchengineRadio-'  + selectedId);
radio.checked = "checked";

var engine = searchEngines[selectedId];
var p = engine.Template.indexOf('?');
var params = engine.Template.substr(p+1);

var form;
if (document.forms["search"]) {
form = document.forms["search"];
} else {
form = document.getElementById("powersearch");
}
form.setAttribute("action", engine.Template.substr(0,p));

var l = ("" + params).split("&");
for (var idx = 0;idx < l.length;idx++) {
var p = l[idx].split("=");
var pValue = p[1];

if (pValue == "{language}") {
} else if (pValue == "{searchTerms}") {
var input;
input = document.getElementById("searchText");

input.name = p[0];
} else {
var input = document.getElementById("searchengineextraparam");

input.name = p[0];
input.value = pValue;
}
}
}



if ( mw.config.get('wgCanonicalSpecialPageName') == "Search") {
var searchEngines = {
mediawiki: {
ShortName: "Recherche interne",
Template: mw.config.get('wgScript') + "?search={searchTerms}"
},
exalead: {
ShortName: "Exalead",
Template: "http://www.exalead.com/search/wikipedia/results/?q={searchTerms}&language=fr"
},
google: {
ShortName: "Google",
Template: "http://www.google.fr/search?as_sitesearch=fr.wikipedia.org&hl={language}&q={searchTerms}"
},
wikiwix: {
ShortName: "Wikiwix",
Template: "http://fr.wikiwix.com/index.php?action={searchTerms}&lang={language}"
},

wlive: {
ShortName: "Bing",
Template: "http://www.bing.com/search?q={searchTerms}&q1=site:http://fr.wikipedia.org"
},
yahoo: {
ShortName: "Yahoo!",
Template: "http://fr.search.yahoo.com/search?p={searchTerms}&vs=fr.wikipedia.org"
},
globalwpsearch: {
ShortName: "Global WP",
Template: "http://vs.aka-online.de/cgi-bin/globalwpsearch.pl?timeout=120&search={searchTerms}"
}
};
addOnloadHook(externalSearchEngines);
}



/**
* Affiche un modèle Information sur la page de téléchargement de fichiers [[Spécial:Téléchargement]]
* Voir aussi [[MediaWiki:Onlyifuploading.js]]
*/
if( mw.config.get('wgCanonicalSpecialPageName') == "Upload" ) {
importScript("MediaWiki:Onlyifuploading.js");
}

} // Fin du code concernant l'espace de nom 'Special'


// ESPACE DE NOM 'UTILISATEUR'
if( mw.config.get('wgNamespaceNumber') == 2 ) {

/* En phase de test */
/* DÉBUT DU CODE JAVASCRIPT DE "CADRE À ONGLETS"
Fonctionnement du [[Modèle:Cadre à onglets]]
Modèle implanté par User:Peleguer de http://ca.wikipedia.org
Actualisé par User:Joanjoc de http://ca.wikipedia.org
Traduction et adaptation User:Antaya de http://fr.wikipedia.org
*/
function CadreOngletInit(){
// retour si ailleurs que sur l'espace utilisateur,
// sachant que c'est une horreur au niveau de l'accessibilité
// et qu'il est impossible de "récupérer" ou de recycler ce script
// (celui-ci fonctionnant par inclusion de sous pages)
if ( mw.config.get('wgCanonicalNamespace') != 'User') return; 
var i=0      
for (i=0;i<=9;i++){
var vMb = document.getElementById("mb"+i);
if (!vMb) break;

var j=1   
var vOgIni = 0 
for (j=1;j<=9;j++){
var vBt = document.getElementById("mb"+i+"bt"+j);
if (!vBt) break;
vBt.onclick = CadreOngletVoirOnglet;         
if (vBt.className=="mbBoutonSel") vOgIni=j; 
}

if (vOgIni == 0) {
vOgIni = 1+Math.floor((j-1)*Math.random()) ;
document.getElementById("mb"+i+"og"+vOgIni).style.display = "block";
document.getElementById("mb"+i+"og"+vOgIni).style.visibility = "visible";
document.getElementById("mb"+i+"bt"+vOgIni).className="mbBoutonSel";
}
}
}

function CadreOngletVoirOnglet(){
var vMbNom = this.id.substr(0,3);
var vIndex = this.id.substr(5,1);

var i=1
for (i=1;i<=9;i++){       
var vOgElem = document.getElementById(vMbNom+"og"+i);
if (!vOgElem) break;
if (vIndex==i){
vOgElem.style.display = "block";
vOgElem.style.visibility = "visible";
document.getElementById(vMbNom+"bt"+i).className="mbBoutonSel";
} else {            
vOgElem.style.display = "none";
vOgElem.style.visibility = "hidden";
document.getElementById(vMbNom+"bt"+i).className="mbBouton";
}
}
return false;
}
addOnloadHook(CadreOngletInit);
/*FIN DU CODE JAVASCRIPT DE "CADRE À ONGLETS"*/
} // Fin du code concernant l'espace de nom 'Utilisateur'


// ESPACE DE NOM 'RÉFÉRENCE'
if( mw.config.get('wgNamespaceNumber') == 104 ) {

/*
* Choix du mode d'affichage des références
* Devraient en principe se trouver côté serveur
* @note L'ordre de cette liste doit correspondre a celui de Modèle:Édition !
*/

function addBibSubsetMenu() {
var specialBib = document.getElementById('specialBib');
if (!specialBib) return;

specialBib.style.display = 'block';
menu = '<select style="display:inline;" onChange="chooseBibSubset(selectedIndex)">'
+ '<option>Liste</option>'
+ '<option>WikiNorme</option>'
+ '<option>BibTeX</option>'
+ '<option>ISBD</option>'
+ '<option>ISO690</option>'
+ '</select>';
specialBib.innerHTML = specialBib.innerHTML + menu;

/* default subset - try to use a cookie some day */
chooseBibSubset(0);
}

// select subsection of special characters
function chooseBibSubset(s) {
var l = document.getElementsByTagName('div');
for (var i = 0; i < l.length ; i++) {
if(l[i].className == 'BibList')   l[i].style.display = s == 0 ? 'block' : 'none';
else if(l[i].className == 'WikiNorme') l[i].style.display = s == 1 ? 'block' : 'none';
else if(l[i].className == 'BibTeX')    l[i].style.display = s == 2 ? 'block' : 'none';
else if(l[i].className == 'ISBD')      l[i].style.display = s == 3 ? 'block' : 'none';
else if(l[i].className == 'ISO690')    l[i].style.display = s == 4 ? 'block' : 'none';
}
}
addOnloadHook(addBibSubsetMenu);
} // Fin du code concernant l'espace de nom 'Référence'


/* Permet d'afficher un compte à rebours sur une page avec le modèle [[Modèle:Compte à rebours]] */
/* Plyd - 3 février 2009 */
function Rebours() {
if( mw.config.get('wgNamespaceNumber') ==0) return;
try {
if (document.getElementById("rebours")) {
destime = document.getElementById("rebours").title.split(";;");
Maintenant = (new Date).getTime();
Future = new Date(Date.UTC(destime[0], (destime[1]-1), destime[2], destime[3], destime[4], destime[5])).getTime();
Diff = (Future-Maintenant);
if (Diff < 0) {Diff = 0}
TempsRestantJ = Math.floor(Diff/(24*3600*1000));
TempsRestantH = Math.floor(Diff/(3600*1000)) % 24;
TempsRestantM = Math.floor(Diff/(60*1000)) % 60;
TempsRestantS = Math.floor(Diff/1000) % 60;
TempsRestant = "" + destime[6] + " ";
if (TempsRestantJ == 1) {
TempsRestant = TempsRestant + TempsRestantJ + " jour ";
} else if (TempsRestantJ > 1) {
TempsRestant = TempsRestant + TempsRestantJ + " jours ";
}
TempsRestant = TempsRestant + TempsRestantH + " h " + TempsRestantM  + " min " + TempsRestantS + " s";
document.getElementById("rebours").innerHTML = TempsRestant;
setTimeout("Rebours()", 1000)
}
} catch (e) {}
}
addOnloadHook(Rebours);


/* Ajoute la date de dernière modification sur le bandeau événement récent */
/* Plyd - 12 juin 2009 */
function LastModCopy() {
var LastModSpan = document.getElementById('lastmod');                          // Monobook et affiliés, Modern
if(!LastModSpan) LastModSpan = document.getElementById('footer-info-lastmod'); // Vector
var LastModBandeau = document.getElementById("lastmodcopy");
if((!LastModSpan)||(!LastModBandeau)) return;
LastModBandeau.innerHTML = LastModSpan.innerHTML;

}
addOnloadHook(LastModCopy);


/*********************************/
/* Autres fonctions non classées */
/*********************************/

/*
* Fonction
*
* Récupère la valeur d'une variable globale en gérant le cas lorsque cette variable n'existe pas
* @param nom_variable Nom de la variable dont on veut connaître la valeur
* @param val_defaut Valeur par défaut si la variable n'existe pas
* @return La valeur de la variable, ou val_defaut si la variable n'existe pas
*
* Auteur : Sanao
* Dernière révision : 22 novembre 2007
*/
function getVarValue(nom_variable, val_defaut)
{
var result = null;

try {
    result = eval(nom_variable.toString());
} catch (e) {
    result = val_defaut;
}

return(result);
}

/*
* Fonction
*
* Retourne une chaîne de caractères de la date courante selon dans un certain format
* @param format Format de la date "j" pour le jour, "m" pour le mois et "a" pour l'année. Ainsi si l'on est le 21 novembre 2007 et l'on passe en paramètre cette chaîne "a_m_d", la chaîne retournée sera "2007_novembre_21"
* Auteur : Sanao
* Dernière révision : 21 novembre 2007
*/
function getStrDateToday(format)
{
var str_mois = new Array();
with (str_mois)
{
push("janvier");
push("février");
push("mars");
push("avril");
push("mai");
push("juin");
push("juillet");
push("août");
push("septembre");
push("octobre");
push("novembre");
push("décembre");
}
var today = new Date();
var day = today.getDate();
var year = today.getYear();
if (year < 2000)
{
year = year + 1900;
}
var str_date = format;

//Création de la chaîne
var regex = /j/gi;
str_date = str_date.replace(regex, day.toString());
regex = /a/gi;
str_date = str_date.replace(regex, year.toString());
regex = /m/gi;
str_date = str_date.replace(regex, str_mois[today.getMonth()]);

return (str_date);
}

/*
Outil pour permettre l'affichage immédiat d'un javascript pour tous les utilisateurs en même temps.
Même s'ils ne rechargent pas Wikipédia avec CTRL+R.
Utile initialement pour prévoir une bonne réactivité et un lancement général du [[Projet:Impression]].
Plyd - 12 octobre 2008
tag urgentsynchronejs inclus (pas encore) dans [[MediaWiki:Copyright]]
*/
function urgentSynchroneJsLoad() {
if (document.getElementById('urgentsynchronejs')) {
jsname = "MediaWiki:Common.js/"+document.getElementById('urgentsynchronejs').title;
importScript(jsname);
}
}
addOnloadHook(urgentSynchroneJsLoad);


/* WikiForm pour la génération facilité de modèles */
/* Plyd - 10/02/2008 */
if (document.getElementById("WikiForm")) {
importScript("MediaWiki:Gadget-WikiForm.js");
}


/* petites fonctions pratiques  - Darkoneko, 09/01/2008 */

//créé un lien et le retourne.
//le parametre onclick est facultatif.
function createAdressNode(href, texte, onclick) {
var a = document.createElement('a')
a.href = href
a.appendChild(document.createTextNode( texte ) )
if(arguments.length == 3) {   a.setAttribute("onclick", onclick )  }

return a
}

//Créé un cookie. il n'existais qu'une version dédiée à l'accueil. Celle ci est plus générique
//le parametre duree est en jours
function setCookie(nom, valeur, duree ) {
var expDate = new Date()
expDate.setTime(expDate.getTime() + ( duree * 24 * 60 * 60 * 1000))
document.cookie = nom + "=" + escape(valeur) + ";expires=" + expDate.toGMTString() + ";path=/"
}

/* /petites fonctions pratiques */

/** For sysops and accountcreators *****************************************
* Repris depuis Common.js @ enwiki - Crée le common.js réservé aux admins.
*
*  Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]],
*               and accountcreator-specific CSS at [[MediaWiki:Accountcreator.css]].
*/
if ( mw.config.get('wgUserGroups') ) {
for ( var g = 0; g < mw.config.get('wgUserGroups').length; ++g ) {
if ( mw.config.get('wgUserGroups')[g] == "sysop" ) {
importStylesheet("MediaWiki:Sysop.css");
addOnloadHook( function() {
if ( !window.disableSysopJS ) {
importScript("MediaWiki:Sysop.js");
}
} );
}
}
}

/**
* Lien vers secure.wikimedia.org quand on y est déjà.
* Repris depuis enwiki.
*/
if ( mw.config.get( 'wgServer' ) == 'https://secure.wikimedia.org' ) {
importScript( 'MediaWiki:Common.js/secure.js' );
}