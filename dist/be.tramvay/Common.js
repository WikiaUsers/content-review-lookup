/* Ĉiu ajn JavaSkriptaĵo ĉi tie estos ŝarĝita por ĉiu uzanto sur ĉiu paĝo. 
*/
/* <pre> <nowiki> 
iletikedoj kaj rektaj klavoj */   
ta = new Object();  
ta['pt-userpage'] = new Array('.','Mia uzantopaĝo');  
ta['pt-anonuserpage'] = new Array('.','La uzantopaĝo por la IP adreso sub kiu vi estas redaktanta');  
ta['pt-mytalk'] = new Array('n','Mia diskutpaĝo');  ta['pt-anontalk'] = new Array('n','Diskuto pri redaktoj sub tiu ĉi IP adreso');  
ta['pt-preferences'] = new Array('','Miaj preferoj');  
ta['pt-watchlist'] = new Array('l','Listo de paĝoj kies ŝanĝojn vi priatentas.');   
ta['pt-mycontris'] = new Array('y','Listo de miaj kontribuoj');  
ta['pt-login'] = new Array('o','Vi estas invitita ensaluti, tamen ne estas devige.');  
ta['pt-anonlogin'] = new Array('o','Vi estas invitita ensaluti, tamen ne estas devige.');  
ta['pt-logout'] = new Array('o','Elsalutu');  
ta['ca-talk'] = new Array('t','Diskuto pri la artikolo');  
ta['ca-edit'] = new Array('e','Vi povas redakti tiun ĉi paĝon. Bv uzi la antaŭvidbutonon antaŭ ol konservi.'); 
ta['ca-addsection'] = new Array('+','Aldonu komenton al tiu diskuto.');  
ta['ca-viewsource'] = new Array('e','Tiu paĝo estas protektita. Vi povas nur rigardi ties fonton.'); 
ta['ca-history'] = new Array('h','Antaŭaj versioj de tiu ĉi paĝo.'); 
ta['ca-protect'] = new Array('=','Protektu tiun ĉi paĝon'); 
ta['ca-delete'] = new Array('d','Forigu tiun ĉi paĝon'); 
ta['ca-undelete'] = new Array('d','Restarigu la redaktojn faritajn al tiu ĉi paĝo antaŭ ties forigo'); 
ta['ca-move'] = new Array('m','Renomu tiun ĉi paĝon'); 
ta['ca-nomove'] = new Array('','Vi ne rajtas renomi tiun ĉi paĝon');  ta['ca-watch'] = new Array('w','Aldonu tiun ĉi paĝon al via atentaro'); 
ta['ca-unwatch'] = new Array('w','Forigu tiun ĉi paĝon el via atentaro');  ta['search'] = new Array('f','Traserĉu tiun ĉi vikion'); 
ta['p-logo'] = new Array('','Ĉefpaĝo'); 
ta['n-mainpage'] = new Array('z','Vizitu la Ĉefpaĝon'); 
ta['n-portal'] = new Array('','Pri la projekto, kion vi povas fari, kie vi povas trovi ion'); 
ta['n-currentevents'] = new Array('','Trovu fonajn informojn pri nunaj eventoj'); 
ta['n-recentchanges'] = new Array('r','Listo de la lastaj ŝanĝoj en la vikio.'); 
ta['n-randompage'] = new Array('x','Vidu hazardan paĝon');  ta['n-help'] = new Array('','Serĉopaĝo.'); 
ta['n-sitesupport'] = new Array('','Subtenu nin per mono'); 
ta['t-whatlinkshere'] = new Array('j','Listo de ĉiuj vikiaj paĝoj kij ligas ĉi tien'); 
ta['t-recentchangeslinked'] = new Array('k','Lastaj ŝanĝoj en paĝoj kiuj ligas al tiu ĉi paĝo'); 
ta['feed-rss'] = new Array('','RSS-fonto por tiu ĉi paĝo'); 
ta['feed-atom'] = new Array('','Atom-fonto por ĉi paĝo'); 
ta['t-contributions'] = new Array('','Vidu la liston de kontribuoj de tiu ĉi uzanto'); 
ta['t-emailuser'] = new Array('','Sendu retmesaĝon al tiu ĉi uzanto'); 
ta['t-upload'] = new Array('u','Alŝutu bildojn aŭ dosierojn'); 
ta['t-specialpages'] = new Array('q','Listo de ĉiuj specialaj paĝoj'); 
ta['ca-nstab-main'] = new Array('c','Vidu la artikolon'); 
ta['ca-nstab-user'] = new Array('c','Vidu la personan paĝon de la uzanto'); 
ta['ca-nstab-media'] = new Array('c','Vidu la paĝon de la dosiero'); 
ta['ca-nstab-special'] = new Array('','Estas speciala paĝo, vi ne rajtas redakti ĝin.'); 
ta['ca-nstab-wp'] = new Array('a','Vidu la paĝon de la projekto'); 
ta['ca-nstab-image'] = new Array('c','Vidu la paĝon de la bildo'); 
ta['ca-nstab-mediawiki'] = new Array('c','Vidu la sisteman mesaĝon'); 
ta['ca-nstab-template'] = new Array('c','Vidu la ŝablonon'); 
ta['ca-nstab-help'] = new Array('c','Vidu la helppaĝon'); 
ta['ca-nstab-category'] = new Array('c','Vidu la paĝon de kategorioj');
 
// el la sorabaj vikipedioj kaj la franca
/**
 * getElementsByClass : rechercher les éléments de la page dont le paramètre "class" est celui recherché
 */
function getElementsByClass(searchClass, node, tag) {
  if (node == null) node = document;
  if (tag == null) tag = '*';
  return getElementsByClassName(node, tag, searchClass);
}
 
 
// el la suprasoraba vikipedio. Ĝi estas uzata de la kaŝskatolaj funkcioj.
// ============================================================
// BEGIN hasclass
//hasClass, from en.wp and ru.wp
var hasClass = (function (){
var reCache = {}
return function (element, className){
   return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className)
  }
})()
 
 
function addLoadEvent(f) {addOnloadHook(f)} //for backwards compatibility
// END hasclass
// ============================================================
 
// ============================================================
// BEGIN Enable multiple onload functions
 
// setup onload functions this way:
// aOnloadFunctions[aOnloadFunctions.length] = function_name; // without brackets!
 
if (!window.aOnloadFunctions) {
   var aOnloadFunctions = new Array();
}
 
window.onload = function() {
   if (window.aOnloadFunctions) {
     for (var _i=0; _i<aOnloadFunctions.length; _i++) {
       aOnloadFunctions[_i]();
     }
   }
}
 
// END Enable multiple onload functions
// ============================================================
 
 
 
 
//============================================================
//
// KAŜSKATOLOJ
//
// pli fleksebla varianto el la suprasoraba vikipedio
// ============================================================
// BEGIN Dynamic Navigation Bars
// NEEDS Enable multiple onload functions 
// nowa wersija po ruskej wikipediji
//Collapsible Tables and Divs, [[:ru:ВП:СБ]]
 
var autoCollapse = 0
var collapseCaption = 'Xаваць'
var expandCaption = 'Паказваць'
 
function collapsibleTables(){
var Table, HRow, THs, Header, btn, a, tblIdx = 0, colTables = []
var allTables = document.getElementsByTagName('table')
for (var i=0; Table = allTables[i]; i++){
   if (!hasClass(Table, 'collapsible')) continue
   if (!(HRow = Table.rows[0])) continue
   THs = HRow.getElementsByTagName('th') 
   if (THs.length == 0) continue
   Header = THs[THs.length-1] //last TH, not 1st like in en.wp
   Table.id = 'collapsibleTable' + tblIdx
   btn = document.createElement('span')
   btn.style.styleFloat = btn.style.cssFloat = 'right'
   btn.style.fontWeight = 'normal'
   a = document.createElement('a')
   a.id = 'collapseButton' + tblIdx
   a.href = 'javascript:collapseTable(' + tblIdx + ');' 
   a.appendChild(document.createTextNode(collapseCaption))
   btn.appendChild(document.createTextNode('['))
   btn.appendChild(a)
   btn.appendChild(document.createTextNode(']'))
   Header.insertBefore(btn, Header.childNodes[0])
   colTables[tblIdx++] = Table
}
for (var i=0; i < tblIdx; i++)
   if ((tblIdx > autoCollapse && hasClass(colTables[i], 'autocollapse')) || hasClass(colTables[i], 'collapsed'))
     collapseTable(i)
}
 
function collapseTable (idx){
var Table = document.getElementById('collapsibleTable' + idx)
var btn = document.getElementById('collapseButton' + idx)
if (!Table || !btn) return false
var Rows = Table.rows
var isShown = (btn.firstChild.data == collapseCaption)
btn.firstChild.data = isShown ?  expandCaption : collapseCaption
var disp = isShown ? 'none' : Rows[0].style.display
for (var i=1; i < Rows.length; i++) 
    Rows[i].style.display = disp
}
 
var NavigationBarHide = '[' + collapseCaption + ']'
var NavigationBarShow = '[' + expandCaption + ']'
var NavigationBarShowDefault = autoCollapse
 
function collapsibleDivs(){
var navIdx = 0, colNavs = [], i, NavFrame
var divs = document.getElementById('content').getElementsByTagName('div')
for (i=0; NavFrame = divs[i]; i++) {
   if (!hasClass(NavFrame, 'NavFrame')) continue
   NavFrame.id = 'NavFrame' + navIdx
   var a = document.createElement('a')
   a.className = 'NavToggle'
   a.id = 'NavToggle' + navIdx
   a.href = 'javascript:collapseDiv(' + navIdx + ');'
   a.appendChild(document.createTextNode(NavigationBarHide))
   // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
   for (var j=0; j < NavFrame.childNodes.length; j++)
     if (hasClass(NavFrame.childNodes[j], 'NavHead'))
       NavFrame.childNodes[j].appendChild(a)
   colNavs[navIdx++] = NavFrame
}
for (i=0; i < navIdx; i++)
  if ((navIdx > NavigationBarShowDefault && !hasClass(colNavs[i], 'expanded')) || hasClass(colNavs[i], 'collapsed'))
     collapseDiv(i)
}
 
function collapseDiv(idx) {
var div = document.getElementById('NavFrame' + idx)
var btn = document.getElementById('NavToggle' + idx)
if (!div || !btn) return false
var isShown = (btn.firstChild.data == NavigationBarHide)
btn.firstChild.data = isShown ? NavigationBarShow : NavigationBarHide 
var disp = isShown ? 'none' : 'block'
for (var child = div.firstChild;  child != null;  child = child.nextSibling)
   if (hasClass(child, 'NavPic') || hasClass(child, 'NavContent')) 
      child.style.display = disp
}
 
addOnloadHook(collapsibleDivs);
addOnloadHook(collapsibleTables);
 
// END Dynamic Navigation Bars
// ============================================================
 
 
//============================================================
//
// ELSTARAJ KAJ LEGINDAJ ARTIKOLOJ
//
//============================================================
 
/**
* Aldonas apartan signon al interlingvaj ligiloj al elstaraj au legindaj artikoloj 
*/
//=============================================================
//*** Configuration for "star" logo in front of interwiki links to Featured Articles
//*** and green symbol in front of interwiki links to Good Articles
 
/** set to false in Special:Mypage/monobook.js to switch off this "feature" */
 
/** description that is displayed when cursor hovers above FA interwiki links */
var linkFA_description = "Ĉi tiu estas elstara artikolo.";
var linkGA_description = "Ĉi tiu estas leginda artikolo.";
 
// linkFA_bullet/linkGA_bullet and linkFA_style/linkGA_Style werden nur für cologneblue, nostalgia and standard verwendet,
// für monobook, modern und simple siehe [[MediaWiki:Common.css]], vector hat in [[MediaWiki:Vector.css] eigene Definitionen
 
/** image to use instead of the standard bullet (for cologneblue, nostalgia and standard */
var linkFA_bullet = "http://upload.wikimedia.org/wikipedia/commons/d/d0/Monobook-bullet-star-transparent.png";
var linkGA_bullet = "http://upload.wikimedia.org/wikipedia/commons/a/a1/Monobook-bullet-star-gray.png";
 
/** style to use for the linkFA_bullet/LinkGA_bullet img */
var linkFA_style = "margin-right: 0.2em;";
var linkGA_style = "margin-right: 0.2em;";
 
/**
 * star logo for featured articles in other languages,
 * see Template:Link_FA / Template:Link_GA and MediaWiki:Common.css
 */
jQuery( document ).ready(function() {
    // early exit when disabled
    if ((mw.user.options.exists('linkFA_enabled') && !mw.user.options.get('linkFA_enabled'))) return;
 
    // skins that can be handled the CSS class way
    if (skin == "monobook" || skin == "simple" || skin == "modern" || skin== "vector" ) {
        linkFA_CSS();
    }
    else if (skin == "cologneblue" || skin == "nostalgia" || skin == "standard") {
        linkFA_decorate();
    }
 
    /** skin == "monobook" || skin == "simple" || skin="modern" || skin== "vector"*/
    function linkFA_CSS() {
        // links are to replaced in p-lang only
        var pLang = document.getElementById("p-lang");
        if (!pLang) return;
        var lis = pLang.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            // only links with a corresponding Link_FA template are interesting
            if (document.getElementById(li.className + "-fa")) {
              li.className += " FA";         // additional class so the template can be hidden with CSS
              li.title = linkFA_description; // change title
              continue;
            }
            if (document.getElementById(li.className + "-ga")) {
              li.className += " GA";         // additional class so the template can be hidden with CSS
              li.title = linkGA_description; // change title
              continue;
            }
        }
    }
 
    /** skin == "cologneblue" || skin == "nostalgia" || skin == "standard" */
    function linkFA_decorate() {
        // these root elements can contain FA-/GA-links
        var rootIds = new Array("topbar", "footer");
        for (var i=0; i<rootIds.length; i++) {
            var root    = document.getElementById(rootIds[i]);
            if (!root)  continue;
 
            // if the root exists, try to decorate all the links within
            var links   = root.getElementsByTagName("a");
            for (var j=0; j<links.length; j++) {
                decorate(links[j], "-fa", linkFA_bullet, linkFA_description, linkFA_style);
                decorate(links[j], "-ga", linkGA_bullet, linkGA_description, linkGA_style);
            }
        }
    }
 
    /** id necessary, modify a link to show the FA- or GA-star (older) */
    function decorate(link, idSuffix, bullet, description, style) {
        var lang    = link.hostname.split(".")[0];
        var fa      = document.getElementById("interwiki-" + lang + idSuffix);
        if (!fa)	return;
 
		// build an image-node for the FA-star
		var img = document.createElement("img");
		img.setAttribute("src",     bullet);
		img.setAttribute("alt",     description);
		img.setAttribute("style",   style);
		// decorate the link with the image
		link.appendChild(img);
		link.appendChild(link.removeChild(link.firstChild));
		link.setAttribute("title", description);
    }
});
 
//============================================================
//
// ILARO
//
//============================================================
 
//============================================================
// Tabelkreilo
//============================================================
 
/**
*
* English: Generate an array using Mediawiki syntax
*
* @author: fr:user:dake
* @version: 0.1
*/
 
function generateTableau(nbCol, nbRow, border, styleHeader, styleLine)
{
        var code = "\n";
        if (styleHeader==1) {
                code += '{'+'{TabelKapoLaŭĈarta}'+'}\n';
        } else {
                code += '{| border="' + border + '"\n';
                code += '|+ Tabeltitolo\n';
        }
 
        for (var i=0;i<nbCol;i++) code += '! kapo ' + i + '\n'
 
        for (var j=0;j<nbRow;j++) {
                if ((j+1)%2==0 && styleLine==1) {
                        code += '|-{'+'{GrizaLinio}'+'}\n'
                } else {                
                        code += '|-----\n'
                }
 
                for (var i=0;i<nbCol;i++) code += '| elemento\n';
        }
 
        code += '|}';
        insertTags('','', code); 
}
 
/**
*
* English: Open a popup with parameters to generate an array. 
* The number of rows/columns can be modified. Some additional
* parameters are related to templates available on :fr
*
* @author: fr:user:dake
* @version: 0.1
*/
 
function popupTableau()
{
  var popup = window.open('','name','height=400,width=500');
 
  javaCode =  '<script type="text\/javascript">function insertCode(){';
  javaCode += 'var row = parseInt(document.paramForm.inputRow.value); '
  javaCode += 'var col = parseInt(document.paramForm.inputCol.value); '
  javaCode += 'var bord = parseInt(document.paramForm.inputBorder.value); '
  javaCode += 'var styleHeader = document.paramForm.inputHeader.checked; '
  javaCode += 'var styleLine = document.paramForm.inputLine.checked; '
  javaCode += 'window.opener.generateTableau(col,row,bord,styleHeader,styleLine); '
  javaCode += '}<\/script>';
 
    popup.document.write('<html><head><title>Parametroj de la tabelo</title>');
  popup.document.write('<script type="text\/javascript" src="\/skins-1.5\/common\/wikibits.js"><!-- wikibits js --><\/script>');
  popup.document.write('<style type="text\/css" media="screen,projection">/*<![CDATA[*/ @import "\/skins-1.5\/monobook\/main.css?5"; *]]>*/<\/style>');
  popup.document.write(javaCode); 
  popup.document.write('</head><body>');
  popup.document.write('<p>Bonvolu entajpi la parametrojn de la tabelo : </p>');
  popup.document.write('<form name="paramForm">');
  popup.document.write('Lininombro : <input type="text" name="inputRow" value="3" ><p>');
  popup.document.write('Kolumnnombro : <input type="text" name="inputCol" value="3" ><p>');
  popup.document.write('Randolarĝeco  : <input type="text" name="inputBorder" value="1" ><p>');
  popup.document.write('Griza tabelkapo (stilo lauĉarta) : <input type="checkbox" name="inputHeader" checked="1" ><p>');
  popup.document.write('Alternaj grizaj linioj (stilo lauĉarta) : <input type="checkbox" name="inputLine" checked="1" ><p>');
  popup.document.write('</form">');
  popup.document.write('<p><a href="javascript:insertCode()"> Enmetu la kodon en la redaktofenestron</a></p>');
  popup.document.write('<p><a href="javascript:self.close()"> Fermu</a></p>');
  popup.document.write('</body></html>');
  popup.document.close();
}
 
//============================================================
// Enmeto de novaj butonoj en la redaktilarstrio
//============================================================
 
//Ressemble à la fonction de /skins-1.5/commons/wikibits.js pour insérer un autre lien que insertTags
 
 
//Plenigas la variablon mwCustomEditButtons (vidu /skins-1.5/commons/wikibits.js) por aldoni butonojn en la redaktostrio 
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText, imageId) {
  mwCustomEditButtons[mwCustomEditButtons.length] =
    {"imageId": imageId,
     "imageFile": imageFile,
     "speedTip": speedTip,
     "tagOpen": tagOpen,
     "tagClose": tagClose,
     "sampleText": sampleText};
}
 
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/0/04/Button_array.png','Wstaw tabelę','{|\n|-\n|\n|\n|}','','','mw-editbutton-array');
if (wgNamespaceNumber != 0) addCustomButton('http://upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png','Przekreslenie','<s>','</s>','','mw-editbutton-strike');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/8/88/Btn_toolbar_enum.png','Lista numerowana','\n# elemento 1\n# elemento 2\n# elemento 3','','','mw-editbutton-enum');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/1/11/Btn_toolbar_liste.png','Lista','\n* element A\n* element B\n* element C','','','mw-editbutton-liste');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png','Zdjęcia','\n<gallery>\nPlik:M63.jpg|[[M63]]\nPlik:Mona Lisa.jpg|[[La Gioconda]]\nPlik:Truite arc-en-ciel.jpg|[[Fiŝo|Ĉielarka truto]]\n</gallery>','','','mw-editbutton-gallery');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/7/74/Button_comment.png','Komentarz','<!--','-->','','mw-editbutton-comment');
addCustomButton('http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png','Przekierowanie','#REDIRECT [[',']]','nowa_nazwa','mw-editbutton-redir'); 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png','Szablon','{{','}}','nazwa_szablonu','mw-editbutton-template');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/3/37/Button_tl_template.png', '???', '{{ŝ|','}}', 'ŝablono alkiu ligi','mw-editbutton-template');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/7/78/Button_head_A2.png','Nagłówek 2. stopnia','\n===','===','','mw-editbutton-headline'); 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/4b/Button_nbsp.png','Spacja', '&nbsp;','', '', 'mw-editbutton-comment');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/e/ea/Button_align_left.png','Tekst od lewego akapitu', '<div style=\'text-align: left; direction: ltr; margin-left: 1em;\'>\n','\n</div>','tekst', 'mw-editbutton'); 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png', 'Tekst od prawego akapitu','<div style=\'text-align: center;\'>\n','\n</div>','tekst', 'mw-editbutton'); 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png','Umieść pod spodem','<br />','','','mw-editbutton');   
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png','Indeks górny', '<sup>','</sup>', '','mw-editbutton');   
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png','Indeks dolny', '<sub>','</sub>', '','mw-editbutton');   
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/5/58/Button_small.png','Mały tekst', '<small>','</small>', '','mw-editbutton'); 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/b/b6/Vjazyce-button.png','Kolor tekstu', '<span style=\'color: Kolornomo\'>','</span>', '','mw-editbutton'); 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/2/23/Button_code.png','Koduj tekst', '<code>','</code>', '','mw-editbutton'); 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/3/30/Tt_icon.png','Nie formatuj tekstu', '<tt>','</tt>', '','mw-editbutton'); 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/c/c4/Button_ref.png','Dodaj przypis','<ref>','</ref>','reference, citaĵo aŭ ligilo','mw-editbutton-ref'); 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/6/64/Buttonrefvs8.png','Sekcja „Przypisy”','== Przypisy i adnotacje ==\n<references />','','','mw-editbutton-references');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/b/b0/Button_category02.png','Kategoria','[[Kategoria:',']]','Nazwa kategorii','mw-editbutton-category');
var viduAnkau = '\n'
+ '== Adnotacje i referencje ==\n'
+ '<references/>\n'
+ '== Zobacz też ==\n'
+ '=== Wybrane artykuły ===\n'
+ '* [[Nazwa]]\n'
+ '*\n'
+ '=== Inne strony ===\n'
+ '*\n';
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/b/bb/Seealso.png','Sekcja „Zobacz też”',viduAnkau,'','','mw-editbutton-voiraussi');
 
 
 
 
// Ŝanĝi la ligilon de la tabelkrea butono kaj forigas la subskriban butonon el artikolaj paĝoj 
 
function chang_buttons() {
  toolbarArray = document.getElementById('mw-editbutton-array');
  if (toolbarArray) {
    toolbarArray.onclick = function() {
      popupTableau();
      return false;
    }
  }
 
  var btnSigImg = document.getElementById('mw-editbutton-signature');
  if (btnSigImg && wgNamespaceNumber == 0) btnSigImg.style.display = "none";
}
hookEvent('load', chang_buttons);
 
 
 
 
 
 
/** WikiMiniAtlas *******************************************************
   *
   *  Priskribo: WikiMiniAtlas estas ŝprucanta alklakebla kaj tirebla mondmapo. 
   *             La skripto estigas ke ĉiuj viaj koordinataj ligiloj montras la WikiMiniAtlas-ŝprucbutonon. 
   *             La skripto mem estas lokita sur meta ĉar ĝi estas uzata de multaj projektoj. 
   *             Vidu [[Meta:WikiMiniAtlas]] por plia informo. 
   *  Kreita de : [[:en:User:Dschwen]]
   */
 
/* document.write('<script type="text/javascript" src="' 
     + 'http://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js' 
     + '&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400"></script>'); */
 
 
if (wgServer == "https://secure.wikimedia.org") {
  var metaBase = "https://secure.wikimedia.org/wikipedia/meta";
} else {
  var metaBase = "http://meta.wikimedia.org";
}
importScriptURI(metaBase+"/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400")
 
var wma_settings = { 
  buttonImage: 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Geographylogo.svg/18px-Geographylogo.svg.png'
}
 
 
 
 
// Ebligas montri kaŝitajn kategoriojn por enskribitaj uzuloj 
// aldonante (+) kiel ĉe kaŝskatoloj
 
function hiddencat()
{
var cl = document.getElementById('catlinks');           if(!cl) return;
var hc = document.getElementById('mw-hidden-catlinks'); if(!hc) return;
var nc = document.getElementById('mw-normal-catlinks'); if(!nc) return;
if(hc.className == 'mw-hidden-cats-hidden')
{
var ahc = ' | <a onclick="javascript:toggleHiddenCats();" id="mw-hidden-cats-link" style="cursor:pointer; color:black;" title="Ĉi tiu artikolo apartenas al kaŝita(j) kategorio(j)">[+]</a>';
document.getElementById('mw-normal-catlinks').innerHTML += ahc;
}
}
function toggleHiddenCats()
{
var hc = document.getElementById('mw-hidden-catlinks');
if(hc.className == 'mw-hidden-cats-hidden')
{
hc.setAttribute('class', 'mw-hidden-cat-user-shown');
document.getElementById('mw-hidden-cats-link').innerHTML = '[–]';
}
else
{
hc.setAttribute('class', 'mw-hidden-cats-hidden');
document.getElementById('mw-hidden-cats-link').innerHTML = '[+]';
}
}
 
addOnloadHook(hiddencat);
 
/**
 * Por akiri la valoron de kuketo
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
 
/**
 * getElementsByClass : priserĉas la erojn de la paĝo kies parametro "class" estas tiu prioserĉata
 */
function getElementsByClass(searchClass, node, tag) {
  if (node == null) node = document;
  if (tag == null) tag = '*';
  return getElementsByClassName(node, tag, searchClass);
}
 
 
/**
 * Kaŝas la skatolojn de la ĉefpaĝo
 *
 * Aldonas ligilon sur la ĉefpaĝon por facile kaŝi la skatolojn 
 * Memorigita per kuketo
 * Kopirajto 2007, fr:user:Plyd kaj fr:User:IAlex. Licencoj GFDL kaj GPL.
 * Esperantigita de eo:Vikipediisto:ArnoLagrange
 */
var kuketKaŝSkatolNomo = "kaŝSkatolChefpagho";
var KaŝSkatolVal = {};
var sumSkatolChefpagho = 0;
 
function montruSkatolChefpagho(id) {
  videbla = KaŝSkatolVal[id] = (!KaŝSkatolVal[id]);
  getElementsByClass('chefpagh_enteno',null,'div')[id].style.display = videbla ? 'block' : 'none';
  document.getElementById('KaŝSkatolChefpagho' + id).innerHTML = videbla ? 'kaŝi' : 'montri';
  konserviKuketonChefpagho();
}
 
function konserviKuketonChefpagho() {
  var date = new Date();
  date.setTime(date.getTime() + 30*86400*1000);
  var val = 0;
  for ( var i=0; i< sumSkatolChefpagho ; i++ ) {
    if (!KaŝSkatolVal[i]) val = val | Math.pow(2,i);
  }
  document.cookie = kuketKaŝSkatolNomo + "=" + val + "; expires="+date.toGMTString() + "; path=/";
}
 
function LigilojSkatolChefpagho() {
  var videbla = {};
//  if (wgPageName != "Ĉefpaĝo") return;
  kuketSkatolChefpagho = getCookieVal(kuketKaŝSkatolNomo);
  for ( var i=0; i<11; i++) { 
    var titolo = getElementsByClass('grizakapo',document,'h2')[i];
    if (!titolo) break;
    var ligilo = 'kaŝi';
    videbla[i] = !(getElementsByClass('chefpagh_enteno',null,'div')[i].style.display == 'none') ;
    if (!videbla[i]) ligilo = 'montri';
    titolo.innerHTML += " <span style='font-size: xx-small; font-weight: normal; float: none; margin-right:100px' class='editsection'>[<a id='KaŝSkatolChefpagho" + i + "' href='javascript:montruSkatolChefpagho(" + i + ");'>" + ligilo + "</a>] </span>";
    KaŝSkatolVal[i] = videbla[i];
    sumSkatolChefpagho++;
  }
  kuketSkatolChefpagho = getCookieVal(kuketKaŝSkatolNomo);
  for ( var i=0; i< sumSkatolChefpagho ; i++ ) {
    n =Math.pow(2,i);
    aff = !(kuketSkatolChefpagho & n);
    if (!aff) montruSkatolChefpagho(i);
  }
}
addOnloadHook(LigilojSkatolChefpagho);
 
/** Plibonigo por la Ĉefpaĝo *********************************************************
  *
  *  Priskribo  :        Diversaj plibonigoj por la ĉefpaĝo, inkluzive ligon al plena listo  
  *                      de haveblaj lingvoj    
  *                      <kaj renomo de 'artikolo' al 'portalo'.> ????
  *  Adaptado de [[en:MediaWiki:Common.js]]
  */
 
 function mainPageAppendCompleteListLink() {
     try {
         var node = document.getElementById( "p-lang" )
                            .getElementsByTagName('div')[0]
                            .getElementsByTagName('ul')[0];
 
         var aNode = document.createElement( 'a' );
         var liNode = document.createElement( 'li' );
 
         aNode.appendChild( document.createTextNode( 'Plena listo' ) );
         aNode.setAttribute( 'href' , 'http://meta.wikimedia.org/wiki/Listo_de_Vikipedioj' );
         liNode.appendChild( aNode );
         liNode.style.fontWeight = 'bold';
         node.appendChild( liNode );
      } catch(e) {
        // lets just ignore what's happened
        return;
     }
 }
 
 if ( wgPageName == "Ĉefpaĝo" ) {
        addOnloadHook( mainPageAppendCompleteListLink );
 }
 
/**
 * Forŝovo de la geografiaj koordinatoj supre de la paĝo 
 */
/* Tio ne taŭge funkcias : la globeto kiu ebligas ligon al VikiMiniatlaso ne aperas
 
function moveCoord() {
  var h1 = document.getElementsByTagName("h1")[0];
  var coord = document.getElementById('coordinates');
  if ( !coord || !h1 ) return;
  coord.id = "coordinates-title";
  h1.insertBefore(coord, h1.firstChild);
}
 
addOnloadHook(moveCoord); */
 
/** Skripto por Ŝablono:Galerio */
addOnloadHook(function() {
  if (document.URL.match(/printable/g)) return;
 
  function toggleImageFunction(group,  remindex, shwindex) {
    return function() {
      document.getElementById("ImageGroupsGr" + group + "Im" + remindex).style["display"] = "none";
      document.getElementById("ImageGroupsGr" + group + "Im" + shwindex).style["display"] = "block";
      return false;
    };
  }
 
  var divs = document.getElementsByTagName("div");
  var i = 0, j = 0;
  var units, search;
  var currentimage;
  var UnitNode;
  for (i = 0; i < divs.length; i++) {
    if (divs[i].className !== "ImageGroup") { continue; }
    UnitNode = undefined;
    search = divs[i].getElementsByTagName("div");
    for (j = 0; j < search.length; j++) {
      if (search[j].className !== "ImageGroupUnits") { continue; }
      UnitNode=search[j];
      break;
    }
    if (UnitNode === undefined) { continue; }
    units = [];
    for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
      var temp = UnitNode.childNodes[j];
      if (temp.className === "center") { units.push(temp); }
    }
    var rightlink = undefined;
    var commentText = undefined;
    for (j = 0; j < units.length; j++) {
      currentimage = units[j];
      currentimage.id = "ImageGroupsGr" + i + "Im" + j;
      var leftlink = document.createElement("a");
      if (commentText !== undefined) {
        leftlink.setAttribute("title", commentText);
      }
      var comment;
      if (typeof(currentimage.getAttribute("title")) !== "string") {
        commentText = (j+1) + "/" + units.length;
        comment = document.createElement("tt").appendChild(document.createTextNode("("+ commentText + ")"));
      }
      else {
        commentText = currentimage.getAttribute("title");
        comment = document.createElement("span").appendChild(document.createTextNode(commentText));
        currentimage.removeAttribute("title");
      }
      if(rightlink !== undefined) {
        rightlink.setAttribute("title", commentText);
      }
      var imghead = document.createElement("div");
      rightlink = document.createElement("a");
      if (j != 0) {
        leftlink.href = "#";
        leftlink.onclick = toggleImageFunction(i, j, j-1);
        leftlink.appendChild(document.createTextNode("◀"));
      }
      if (j != units.length - 1) {
        rightlink.onclick = toggleImageFunction(i, j, j+1);
        rightlink.appendChild(document.createTextNode("▶"));
      }
      imghead.style["fontSize"] = "110%";
      imghead.style["fontweight"] = "bold";
      imghead.appendChild(leftlink);
      imghead.appendChild(document.createTextNode("\xA0"));
      imghead.appendChild(comment);
      imghead.appendChild(document.createTextNode("\xA0"));
      imghead.appendChild(rightlink);
      if (units.length > 1) {
        currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      }
      if (j != 0) {
        currentimage.style["display"] = "none";
      }
    }
  }
});
 
// Ĝuste akiras la tekstan entenon de nodo kaj de ties idaj nodoj
// Kopirajto Harmen Christophe, http://openweb.eu.org/articles/validation_avancee, CC
 
function getTextContent(oNode) {
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
 
/**
 * Laŭ [[:fr:Wikipédia:Prise de décision/Lien interprojet]]
 * Kopias la interprojektajn ligilojn el la ŝablono {{Projektoj}}
 * en la maldekstran ilstrion.
 * remove_other_projects = true; en persona monobook por plie aktivigi
 * la forigon de la ŝablono {{Projektoj}} malsupre de la artikoloj.
 * no_other_projects = true; en persona monobook por plena malaktivigi
 * la skripton kaj la enmeton enla maldekstran ilstrion.
 */
 
function aliajProjektoj() {
  if ((typeof no_other_projects != "undefined") && (no_other_projects)) return;
  if(!(wgNamespaceNumber==0)) return;
  if(!(wgAction=="view")) return;
  var div = document.getElementById('aliaj_projektoj');
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
  interProject.innerHTML = '<h5>Aliaj projektoj<\/h5><div class="'+PBody_ClassName+'"><ul>'+newlist.innerHTML+'</ul></div>';
  insertAfter(document.getElementById(Column_Id),interProject,document.getElementById('p-tb'));
  if ((typeof remove_other_projects != "undefined") && (remove_other_projects)) {
    document = div.parentNode.removeChild(div);
  }
}
 
addOnloadHook(aliajProjektoj);
 
 
// simila al innerHTML, sed resendas nur la teksterojn en la internaj ekskludas HTML 
 function pickUpText(aParentElement) {
   var str = "";
 
   function pickUpTextInternal(aElement) {
     var child = aElement.firstChild;
     while (child) {
       if (child.nodeType == 1)		// ELEMENT_NODE 
         pickUpTextInternal(child);
       else if (child.nodeType == 3)	// TEXT_NODE
         str += child.nodeValue;
 
       child = child.nextSibling;
     }
   }
 
   pickUpTextInternal(aParentElement);
 
   return str;
 }
 
 
 
 
/** "Teknikaj  limigoj" titolriparo *****************************************
  *
  *  Priskribo:
  *  Maintainers: [[User:Interiot]], [[User:Mets501]]
  *  Kopiota el  [[:en:MediaWiki:Common.js]] tra [[:it:MediaWiki:Vector.js]]
  * laŭ [[Vikipediisto:Airon90/malkorekta titolo.js]]
  */
 
 // Por paĝoj kiuj enhavas ion kia [[Ŝablono:minusklo]] aŭ [[Ŝablono:Malsama titolo]], anstataŭigas la titolon, sed nur se ĝi estas
 // valida eltondebla-kopiebla kiel viki-ligilo.
 //	(ekzemple titolo de  [[iPod]] estas anstatŭigita.  
 // <nowiki>Sed [[C#]] ne estas ekvivalenta vikiligilo sekve [[C Sharp]] ne havas sian ĉeftitolon ŝanĝita</nowiki>
 //
 // La funkcio serĉas titolstrion kia : <nowiki>
 // <div id="RealTitleBanner">    <!-- div kaŝiĝas-->
 //   <span id="RealTitle">title</span>
 // </div>
 // </nowiki>elemento kun id=DisableRealTitle malaktivigas ĉi tiun funkcion 
 
/*
 var disableRealTitle = 0;		// uzanto povas malaktivigi tion igante tion true per sia monobook.js
 function korektaTitolo() {
 	try {
 		var realTitleBanner = document.getElementById("RealTitleBanner");
 		if (realTitleBanner && !document.getElementById("DisableRealTitle") && !disableRealTitle) {
 			var realTitle = document.getElementById("RealTitle");
 			if (realTitle) {
 				var realTitleHTML = realTitle.innerHTML;
 				realTitleText = pickUpText(realTitle);
 
 				var isPasteable = 0;
 				//var containsHTML = /</.test(realTitleHTML);	// contains ANY HTML
 				var containsTooMuchHTML = /</.test( realTitleHTML.replace(/<\/?(sub|sup|small|big|a)>/gi, "") ); 
// entenas HTML-on kiu estos ignorita kiam eltondita kaj kopiita kiel vikiligilo
 
 				var h1 = document.getElementsByTagName("h1")[0];
 				if (h1) {     // tolto il controllo isPasteable
 					h1.innerHTML = containsTooMuchHTML ? realTitleText : realTitleHTML;
 					// if (!containsTooMuchHTML) // ankoraŭ, adapto por it.wiki
 						realTitleBanner.style.display = "none";
 				}
 				document.title = realTitleText + " - Vikipedio";
 			}
 		}
 	}
 }
 addOnloadHook(korektaTitolo);
 
/**** ImageAnnotator ******
 * Globally enabled per
 * http://commons.wikimedia.org/w/index.php?title=Commons:Village_pump&oldid=26818359#New_interface_feature
 *
 * Maintainer: [[User:Lupo]]
 ****/
 
if (wgNamespaceNumber != -1 && wgAction && (wgAction == 'view' || wgAction == 'purge')) {
  // Not on Special pages, and only if viewing the page
  if (typeof (ImageAnnotator_disable) == 'undefined' || !ImageAnnotator_disable) {
    // Don't even import it if it's disabled.
    importScript ('MediaWiki:Gadget-ImageAnnotator.js');
  }
}
 
 
/* document.write('<script type="text/javascript" src="' 
     + 'http://eo.wikipedia.org/w/index.php?title=MediaWiki:konkurso.js' 
     + '&action=raw&ctype=text/javascript&dontcountme=s""></script>'); */
/*  </nowiki> </pre>*/
 
 
/** Magic editintros ****************************************************
 *
 *  Priskribo: Aldonas averton Bdv-averto en paĝoj de vivantaj homoj.
 *  Aldonita de: [[Uzanto:Yekrats]] laŭ la anglalingva vikipedio
 */
 
function addEditIntro(name)
{
  var el = document.getElementById('ca-edit');
  if (!el)
    return;
  el = el.getElementsByTagName('a')[0];
  if (el)
    el.href += '&editintro=' + name;
}
 
if (wgNamespaceNumber == 0) {
  addOnloadHook(function(){
    var cats = document.getElementById('mw-normal-catlinks');
    if (!cats)
      return;
    cats = cats.getElementsByTagName('a');
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].title == 'Kategorio:Vivantaj homoj' ) {
        addEditIntro('Ŝablono:Bdv-averto');
        break;
      }
    }
  });
}
 
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
 * Prenita el la kataluna vikipedio
 * Afegir la pestanya "Documentació" per plantilles
 */
 
if( wgNamespaceNumber == 10 || wgNamespaceNumber == 11 ) {
    importScript('Mediawiki:Common.js/documentation_tab.js');
}