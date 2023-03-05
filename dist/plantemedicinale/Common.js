/* tooltips and access keys */
ta = new Object();
ta['pt-userpage'] = new Array('.','Pagina mea de utilizator');
ta['pt-anonuserpage'] = new Array('.','Pagina de utilizator pentru adresa IP curentă');
ta['pt-mytalk'] = new Array('n','Pagina mea de discuţii');
ta['pt-anontalk'] = new Array('n','Discuţii despre editări pentru adresa IP curentă');
ta['pt-preferences'] = new Array('','Diverse setări');
ta['pt-watchlist'] = new Array('l','Lista paginilor monitorizate.');
ta['pt-mycontris'] = new Array('y','Lista mea de contribuţii');
ta['pt-login'] = new Array('o','Autentificarea nu este obligatorie, ci doar foarte indicată.');
ta['pt-anonlogin'] = new Array('o','Autentificarea nu este obligatorie, ci doar foarte indicată.');
ta['pt-logout'] = new Array('o','Închidere sesiune');
ta['ca-talk'] = new Array('t','Discuţie despre articol');
ta['ca-edit'] = new Array('e','Puteţi modifica această pagină. Vă rugăm să previzualizaţi conţinutul înainte de salvare.');
ta['ca-addsection'] = new Array('+','Adăugare comentariu la această discuţie.');
ta['ca-viewsource'] = new Array('e','Aceasta pagina este protejată. Puteţi vedea doar codul sursă.');
ta['ca-history'] = new Array('h','Versiuni vechi ale acestui document.');
ta['ca-protect'] = new Array('=','Protejare document.');
ta['ca-delete'] = new Array('d','Ştergere document.');
ta['ca-undelete'] = new Array('d','Recuperarea acestui document şters.');
ta['ca-move'] = new Array('m','Mutare document.');
ta['ca-watch'] = new Array('w','Adăugare document curent în lista mea de pagini urmărite.');
ta['ca-unwatch'] = new Array('w','Ştergere document curent din lista mea de pagini urmărite.');
ta['search'] = new Array('f','Căutare în Wikipedia.');
ta['p-logo'] = new Array('','Pagina principală');
ta['n-mainpage'] = new Array('z','Vizualizarea paginii principale.');
ta['n-portal'] = new Array('','Despre proiect, cum se poate contribui, ajutor.');
ta['n-currentevents'] = new Array('','Informaţii despre evenimentele curente');
ta['n-recentchanges'] = new Array('r','Ultimele modificări în paginile Wikipediei.');
ta['n-randompage'] = new Array('x','Afişarea unei pagini la întâmplare');
ta['n-help'] = new Array('','Locul în care găsiţi ajutor.');
ta['n-sitesupport'] = new Array('','Sprijiniţi-ne');
ta['t-whatlinkshere'] = new Array('j','Lista tuturor paginilor wiki care trimit la această pagină');
ta['t-recentchangeslinked'] = new Array('k','Schimbări recente în legătură cu această pagină');
ta['feed-rss'] = new Array('','Alimentare flux RSS pentru această pagină');
ta['feed-atom'] = new Array('','Alimentare flux Atom pentru această pagină');
ta['t-contributions'] = new Array('','Lista de contribuţii ale acestui utilizator');
ta['t-emailuser'] = new Array('','Trimitere e-mail către acest utilizator');
ta['t-upload'] = new Array('u','Trimitere imagini sau fişiere media');
ta['t-specialpages'] = new Array('q','Lista tuturor paginilor speciale');
ta['ca-nstab-main'] = new Array('c','Afişare articolul');
ta['ca-nstab-user'] = new Array('c','Afişare pagină de utilizator');
ta['ca-nstab-media'] = new Array('c','Afişare pagină media');
ta['ca-nstab-special'] = new Array('','Aceasta este o pagină specială, (nu) o puteţi modifica.');
ta['ca-nstab-wp'] = new Array('a','Afişare pagină proiect');
ta['ca-nstab-image'] = new Array('c','Afişare pagină imagine');
ta['ca-nstab-mediawiki'] = new Array('c','Afişare mesaj de sistem');
ta['ca-nstab-template'] = new Array('c','Afişare formatul');
ta['ca-nstab-help'] = new Array('c','Afişare pagină de ajutor');
ta['ca-nstab-category'] = new Array('c','Afişare categorie');

if (window.showModalDialog && document.compatMode && document.compatMode == "CSS1Compat")
{
  var oldWidth;
  var docEl = document.documentElement;

  function fixIEScroll()
  {
    if (!oldWidth || docEl.clientWidth > oldWidth)
      doFixIEScroll();
    else
      setTimeout(doFixIEScroll, 1);
  
    oldWidth = docEl.clientWidth;
  }

  function doFixIEScroll() {
    docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
  }

  document.attachEvent("onreadystatechange", fixIEScroll);
  attachEvent("onresize", fixIEScroll);
}

function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}

function LegAF() 
{
   // iterate over all <span>-elements
   for(var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      // if found a AF span
      if(a.className == "AF") {
         // iterate over all <li>-elements
         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            // if found a AF link
            if(b.className == "interwiki-" + a.id) {
               b.style.padding = "0 0 0 16px";
               b.style.backgroundImage = "url('http://upload.wikimedia.org/wikipedia/ro/5/53/Pictograma-LegAF.png')";
               b.style.backgroundRepeat = "no-repeat";
               b.title = "Acest articol este considerat a fi de calitate";
            }
         }
      }
   }
}

addLoadEvent(LegAF);

 /** Import module *************************************************************
  *
  *  Description: Includes a raw wiki page as javascript or CSS, 
  *               used for including user made modules.
  *  Maintainers: [[User:AzaToth]]
  */
 importedScripts = {}; // object keeping track of included scripts, so a script ain't included twice
 function importScript( page ) {
     if( importedScripts[page] ) {
         return;
     }
     importedScripts[page] = true;
     var url = wgScriptPath
             + '/index.php?title='
             + encodeURIComponent( page.replace( / /g, '_' ) )
             + '&action=raw&ctype=text/javascript';
     var scriptElem = document.createElement( 'script' );
     scriptElem.setAttribute( 'src' , url );
     scriptElem.setAttribute( 'type' , 'text/javascript' );
     document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
 }
 
 function importStylesheet( page ) {
     var sheet = '@import "'
               + wgScriptPath
               + '/index.php?title='
               + encodeURIComponent( page.replace( / /g, '_' ) )
               + '&action=raw&ctype=text/css";'
     var styleElem = document.createElement( 'style' );
     styleElem.setAttribute( 'type' , 'text/css' );
     styleElem.appendChild( document.createTextNode( sheet ) );
     document.getElementsByTagName( 'head' )[0].appendChild( styleElem );
 }
 
 /* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

 /*AICI începe codul funcţional pentru "metacasete"*/

 /* Funcţionarea Format:Metacasetă */

function MetaCasetaInit(){
  //Se execută la încărcarea paginii dacă există metacesete,
  // sunt ataşate evenimentele la butoane
  //alert("MetaCasetaInit");
  
  var i=0       //Iniţializare contor casete
  for (i=0;i<=9;i++){
     var vMc = document.getElementById("mc"+i);
     if (!vMc) break;
     //alert("MetaCasetaInit, gasit MetaCasetaInit mc"+i);
     
     var j=1    //Iniţializare contor butoane din casetă
     var vFilaIni = 0  //Filă vizibilă iniţial
     for (j=1;j<=9;j++){
        var vBt = document.getElementById("mc"+i+"bt"+j);
        if (!vBt) break;
        //alert("MetaCasetaInit, gasit buton mc"+i+"bt"+j);
        vBt.onclick = MetaCasetaAfisareFila;          //La fiecare buton sunt ataşate evenimentele onclick
        //alert (vBt.className);
        if (vBt.className=="mcButoSel") vFilaIni=j;  //Dacă este selecţionat un buton, vizualizăm indexul
     }
     //alert ("mc="+i+", fila="+j+", filaini="+vFilaIni );
     if (vFilaIni == 0) { //Dacă niciun buton nu este selecţionat, atunci afişarea este aleatorie
         vFilaIni = 1+Math.floor((j-1)*Math.random()) ;
         //alert ("Activare Fila; _mc"+i+"bt"+vFilaIni +"_");
         document.getElementById("mc"+i+"fila"+vFilaIni).style.display = "block";
         document.getElementById("mc"+i+"fila"+vFilaIni).style.visibility = "visible";
         document.getElementById("mc"+i+"bt"+vFilaIni).className="mcButoSel";
     } 
  }
 }
   
 function MetaCasetaAfisareFila(){
  //Se execută la apăsarea unei file,
  //aceea este vizibilă, iar celelalte se ascund
  var vMcNume = this.id.substr(0,3); //pornind de la numele butonului, se deduce numele casetei
  var vIndex = this.id.substr(5,1); //Şi indexul
  
  var i=1
  for (i=1;i<=9;i++){        //se caută toate butoanele acelei file
      //alert(vMcNume+"fila"+i);
        var vFilaElem = document.getElementById(vMcNume+"fila"+i);
        if (!vFilaElem) break;
        if (vIndex==i){ //Dacă este fila bună aceasta este afişată şi se schimbă clasa butonului
                vFilaElem.style.display = "block";
                vFilaElem.style.visibility = "visible";
                document.getElementById(vMcNume+"bt"+i).className="mcButoSel";
        } else {             //Dacă nu, este ascunsă şi se schimbă clasa butonului
                vFilaElem.style.display = "none";
                vFilaElem.style.visibility = "hidden";
                document.getElementById(vMcNume+"bt"+i).className="mcButo";
        }
  }
  return false; //evitarea reîncărcării paginii
 }
 
 addLoadEvent(MetaCasetaInit);

 /*AICI se termină codul funcţional pentru "metacasete"*/

/* ************************************************************** */
//
// Ajustări pentru pagina principală
//
//
/* ************************************************************** */
function mainPageRenameNamespaceTab() {
    try {
        var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
        if ( Node.textContent ) {      // Per DOM Level 3
            Node.textContent = 'Pagina principală';
        } else if ( Node.innerText ) { // IE doesn't handle .textContent
            Node.innerText = 'Pagina principală';
        } else {                       // Fallback
            Node.replaceChild( Node.firstChild, document.createTextNode( 'Pagina principală' ) ); 
        }
    } catch(e) {
        // bailing out!
    }
}
 
function mainPageAppendCompleteListLink() {
    try {
        var node = document.getElementById( "p-lang" )
                           .getElementsByTagName('div')[0]
                           .getElementsByTagName('ul')[0];
 
        var aNode = document.createElement( 'a' );
        var liNode = document.createElement( 'li' );
 
        aNode.appendChild( document.createTextNode( 'Lista completă' ) );
        aNode.setAttribute( 'href' , 'http://meta.wikimedia.org/wiki/List_of_Wikipedias' );
        liNode.appendChild( aNode );
        liNode.className = 'interwiki-completelist';
        node.appendChild( liNode );
     } catch(e) {
       // lets just ignore what's happened
       return;
    }
}
 
if ( wgTitle == 'Pagina principală' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
       addOnloadHook( mainPageRenameNamespaceTab );
}
 
if ( wgTitle == 'Pagina principală' && wgNamespaceNumber == 0 ) {
       addOnloadHook( mainPageAppendCompleteListLink );
}

/* ************************************************************** */
//
// AICI se termină ajustările pentru pagina principală
//
//
/* ************************************************************** */

// ============================================================
// BEGIN Dynamic Navigation Bars
// NEEDS Enable multiple onload functions 

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


 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all <div>-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);

            // add NavToggle-Button as first div-element 
            // in <div class="NavFrame">
            NavFrame.insertBefore(
                NavToggle,
                NavFrame.firstChild
            );
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }

 }

 if (window.addEventListener) window.addEventListener("load",createNavigationBarToggleButton,false);
 else if (window.attachEvent) window.attachEvent("onload",createNavigationBarToggleButton);


var NavigationBarHide = '[ ascundere ]';
var NavigationBarShow = '[ extindere ]';

var NavigationBarShowDefault = 1;

function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarShow;
            }
        }

    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarHide;
            }
        }
    }
}

// END Dynamic Navigation Bars
// ============================================================

//============================================================
//
// ÎNCEPUT dispariţie titlu din pagina principală (test)
//
//============================================================

var mpTitle = "Pagina principală";
var isMainPage = (document.title.substr(0, document.title.lastIndexOf(" - ")) == mpTitle);
var isDiff = (document.location.search && (document.location.search.indexOf("diff=") != -1 || document.location.search.indexOf("oldid=") != -1));

if (isMainPage && !isDiff) 
{
document.write('<style type="text/css">/*<![CDATA[*/ #lastmod, #siteSub, #contentSub, h1.firstHeading { display: none !important; } /*]]>*/</style>');

var mpSmallEnabled;
var mpMinWidth = 700;

function mainPageTransform()
{
       if ((isMainPage || /[\/=:]Main_Page/.test(document.location)) && document.getElementById('ca-nstab-main'))     
       document.getElementById('ca-nstab-main').firstChild.innerHTML = 'Pagina principală';
        var mpContentEl = document.getElementById("bodyContent");
        var mpBrowseEl = document.getElementById("EnWpMpBrowse");
        var mpContainEl = document.getElementById("EnWpMpBrowseContainer");
        var mpMarginEl = document.getElementById("EnWpMpMargin");
        var mpEl = document.getElementById("EnWpMainPage");

        if (!mpContentEl || !mpBrowseEl || !mpContainEl || !mpMarginEl || !mpEl)
                return;

        if (!mpSmallEnabled && mpContentEl.offsetWidth < mpMinWidth)
        {
                mpContainEl.insertBefore(mpBrowseEl, mpContainEl.firstChild);
                mpBrowseEl.className = "EnWpMpBrowseBottom";
                mpMarginEl.style.marginRight = 0;
                mpSmallEnabled = true;
        }
        else if (mpSmallEnabled && mpContentEl.offsetWidth > mpMinWidth)
        {
                mpEl.insertBefore(mpBrowseEl, mpEl.firstChild);
                mpBrowseEl.className = "EnWpMpBrowseRight";
                mpMarginEl.style.marginRight = "13.8em";
                mpSmallEnabled = false;
        }
}

var onloadFuncts = [ mainPageTransform ];

if (window.addEventListener) 
  window.addEventListener("resize", mainPageTransform, false);
else if (window.attachEvent) 
  window.attachEvent("onresize", mainPageTransform);

}

//============================================================
// SFÂRŞIT dispariţie titlu din pagina principală
//============================================================

//============================================================
//
// ÎNCEPUT previzualizare rapidă
//
//============================================================

/**
 * Script de ajoutant une option de prévisualisation rapide.
 * 
 *
 * English: Add a Quick View option on the Edit pages.
 * This script add 2 new buttons into the "editButtons" div.
 * When QuickPrev button is press, the content of edit window 
 * is retreived and parsed using regular expressions.
 *
 * @author: fr:user:aoineko
 * @version: 0.2
 */
function addQuickPreview() 
{
  var QuickPreviewBtnTitle  = "Previzualizare rapidă a modificărilor dumneavoastră [Alt + Q]";
  var QuickPreviewBtnValue  = "Previzualizare rapidă";
  var QuickPrevHideBtnTitle = "Ascundeţi previzualizarea rapidă [Alt + H]";
  var QuickPrevHideBtnValue = "Ascundeţi";

  var div = document.getElementsByTagName('div');
  for(var i = 0; i < div.length ; i++)
  {
    if(div[i].className == "editButtons") // search "editButtons" div
    {
      div[i].appendChild(document.createElement("br")); // add a <br/>

      var wpQuick = document.createElement("input"); // create and set the "QuickPrev" button
      wpQuick.setAttribute("id",        "wpQuick");
      wpQuick.setAttribute("name",      "wpQuick");
      wpQuick.setAttribute("title",     QuickPreviewBtnTitle);
      wpQuick.setAttribute("value",     QuickPreviewBtnValue);
      wpQuick.setAttribute("type",      "button");
      wpQuick.setAttribute("onclick",   "doQuickPreview();");
      wpQuick.setAttribute("tabindex",  "8");
      wpQuick.setAttribute("accesskey", "Q");
      div[i].appendChild(wpQuick);

      var wpHide = document.createElement("input"); // create and set the "Hide" button
      wpHide.setAttribute("id",        "wpHide");
      wpHide.setAttribute("name",      "wpHide");
      wpHide.setAttribute("title",     QuickPrevHideBtnTitle);
      wpHide.setAttribute("value",     QuickPrevHideBtnValue);
      wpHide.setAttribute("type",      "button");
      wpHide.setAttribute("onclick",   "hideQuickPreview();");
      wpHide.setAttribute("tabindex",  "9");
      wpHide.setAttribute("accesskey", "H");
      div[i].appendChild(wpHide);
    }
  }
}

/// Retreive current code and parse it
function doQuickPreview() 
{
  var wpQuickPreview = document.getElementById("wpQuickPreview");
  if(!wpQuickPreview) 
  {
    /*var l = document.getElementsByTagName('div');
    for(var i = 0; i < l.length ; i++)
      if(l[i].className == "previewnote")
        wpQuickPreview = l;
    
    if(!wpQuickPreview)*/
    {
      wpQuickPreview = document.createElement("div");
      wpQuickPreview.setAttribute("style", "border:solid 1px gray; width:100%; margin-top:1em; margin-bottom:1em; padding:0.5em;");
      var wpSummaryLabel = document.getElementById("wpSummaryLabel");
      wpSummaryLabel.parentNode.insertBefore(wpQuickPreview, wpSummaryLabel);
    }
    wpQuickPreview.setAttribute("id",    "wpQuickPreview");
  }
  wpQuickPreview.style.display = "block";

  wpTextbox1 = document.getElementById("wpTextbox1");
  var str = "=Previzualizare rapidă=\n" + wpTextbox1.value;
  var qp = new QuickPreview(str);
  wpQuickPreview.innerHTML = qp.Parse();
}

function QuickPreview(wiki)
{
  this.line = wiki.split(/\n/);
  this.html = new String;
  
  this.list = 0; // current list depth
  this.tab  = 0; // current tabulation depth
  this.pre  = false; /// inside a <pre> tag
  this.para = false; /// inside a paragraph

  this.HandlePre = function(i)
  {
      if(this.line[i][0] == ' ')
      {
        if(this.para)
        {
          this.para = false;
          this.html += "</p>\n";
        }
        if(!this.pre)
        {
          this.pre = true;
          this.html += "<pre>\n";
        }
        this.html += this.line[i] + "\n";
        return true;
      }
      else if(this.pre)
      {
        this.pre = false;
        this.html += "</pre>\n";
      }
      return false;
  };

  this.HandleH = function(i)
  {
    if(res = this.line[i].match(/^(={1,6})(.*)\1(.*)$/))
    {
        this.line[i] = "<h" + res[1].length + ">" + res[2] + "</h" + res[1].length + ">" + res[3];
        return true;
    }
    return false;
  };
  
  this.Parse = function()
  {
    this.html = "";

    for(var i = 0; i < this.line.length ; i++)
    {
      var p = true;
    
      if(this.HandlePre(i))
        continue;

      if(this.HandleH(i))
        p = false;
      
      if(p && !this.para)
      {
        this.para = true;
        this.html += "<p>";
      }

      this.html += this.line[i]

      // Sign //
      .replace(/~{5}/g, Date())
      .replace(/~{4}/g, "<span style='padding:0.2em; margin:0.5em; border:dashed 1px yellow;'>Semnătură</span> "+Date())
      .replace(/~{3}/g, "<span style='padding:0.2em; margin:0.5em; border:dashed 1px yellow;'>Semnătură</span>")

      // Style //
      .replace(/'''''(.*?)''(.*?)'''/g, "<strong><em>$1</em>$2</strong>")
      .replace(/'''''(.*?)'''(.*?)''/g, "<em><strong>$1</strong>$2</em>")
      .replace(/'''(.*?)''(.*?)'''''/g, "<strong>$1<em>$2</em></strong>")
      .replace(/'''''(.*?)''''/g,       "<strong><em>\'$1</em></strong>")
      .replace(/''''(.*?)''''/g,        "<strong><em>$1</em></strong>")
      .replace(/''''(.*?)'''/g,         "<strong>\'$1</strong>")
      .replace(/'''(.*?)'''/g,          "<strong>$1</strong>")
      .replace(/'''(.*?)''/g,           "<em>\'$1</em>")
      .replace(/''(.*?)''/g,            "<em>$1</em>")

      // List //
      .replace(/^\*(.*)/g,  "<li>$1</li>")
      .replace(/^#(.*)/g,   "<li>$1</li>")
      .replace(/^:(.*)/g,   "<li>$1</li>")

      // Link //
      .replace(/\{\{([^\|]*).*}}/g, "<span style='padding:0.2em; margin:0.5em; border:dashed 1px lightgreen;'>Format : $1</span>")
      .replace(/\[\[[Ii]magine:([^\|]*)[^\[]*\]\]/g, "<span style='padding:0.2em; margin:0.5em; border:dashed 1px lightblue;'>Imagine : $1</span>")
      .replace(/\[\[[Cc]ategorie:([^\|]*)[^\[]*\]\]/g, "<span style='padding:0.2em; margin:0.5em; border:dashed 1px #FF8080;'><a href='/wiki/Categorie:$1' title='$1'>Categorie : $1</a></span>")
      .replace(/\[\[([^\[.]*)\|([^\[.]*)\]\]/g, "<a href='/wiki/$1' title='$1'>$2</a>")
      .replace(/\[\[([^\[.]*)\]\]/g,      "<a href='/wiki/$1' title='$1'>$1</a>")
/*
      // Special //
      .replace(/\n\n/g,          "\n\n<br/>")
      .replace(/(^|\n)-{4}(?!~)/g, "<hr/>")

      // Table //
      .replace(/(^|\n)\{\|(.*)/g, "$1<table $2>")
      .replace(/(^|\n)\|}/g, "$1</table>")
      .replace(/(^|\n)(\|.*)\|\|/g, "$1$2</td><td>")
      .replace(/(^|\n)\|[^-}](.*)/g, "$1</td>$2<td>")
      .replace(/(^|\n)(!.*)!!/g, "$1$2</th><th>")
      .replace(/(^|\n)![^-](.*)/g, "$1</th>$2<th>")
*/
      ;
      this.html += "\n";
    }

    return this.html;
  };
};

/// Hide
function hideQuickPreview() 
{
  var wpQuickPreview = document.getElementById("wpQuickPreview");
  if(wpQuickPreview) 
  {
    wpQuickPreview.style.display = 'none';
  }
}

addLoadEvent(addQuickPreview);

//============================================================
// SFÂRŞIT previzualizare rapidă
//============================================================

//============================================================
// ÎNCEPUT repararea titlurilor cu iniţială mică
//============================================================

 // For pages that have something like Template:Lowercase, replace the title, but only if it is cut-and-pasteable as a valid wikilink.
 //	(for instance [[iPod]]'s title is updated.  <nowiki>But [[C#]] is not an equivalent wikilink, so [[C Sharp]] doesn't have its main title changed)</nowiki>
 //
 // The function looks for a banner like this: <nowiki>
 // <div id="RealTitleBanner">    <!-- div that gets hidden -->
 //   <span id="RealTitle">title</span>
 // </div>
 // </nowiki>An element with id=DisableRealTitle disables the function.
 var disableRealTitle = 0;		// users can disable this by making this true from their monobook.js
 if (wgIsArticle) {			// don't display the RealTitle when editing, since it is apparently inconsistent (doesn't show when editing sections, doesn't show when not previewing)
     addOnloadHook(function() {
 	try {
 		var realTitleBanner = document.getElementById("RealTitleBanner");
 		if (realTitleBanner && !document.getElementById("DisableRealTitle") && !disableRealTitle) {
 			var realTitle = document.getElementById("RealTitle");
 			if (realTitle) {
 				var realTitleHTML = realTitle.innerHTML;
 				realTitleText = pickUpText(realTitle);
 
 				var isPasteable = 0;
 				//var containsHTML = /</.test(realTitleHTML);	// contains ANY HTML
 				var containsTooMuchHTML = /</.test( realTitleHTML.replace(/<\/?(sub|sup|small|big)>/gi, "") ); // contains HTML that will be ignored when cut-n-pasted as a wikilink
 				// calculate whether the title is pasteable
 				var verifyTitle = realTitleText.replace(/^ +/, "");		// trim left spaces
 				verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);	// uppercase first character
 
 				// if the namespace prefix is there, remove it on our verification copy.  If it isn't there, add it to the original realValue copy.
 				if (wgNamespaceNumber != 0) {
 					if (wgCanonicalNamespace == verifyTitle.substr(0, wgCanonicalNamespace.length).replace(/ /g, "_") && verifyTitle.charAt(wgCanonicalNamespace.length) == ":") {
 						verifyTitle = verifyTitle.substr(wgCanonicalNamespace.length + 1);
 					} else {
 						realTitleText = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleText;
 						realTitleHTML = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleHTML;
 					}
 				}
 
 				// verify whether wgTitle matches
 				verifyTitle = verifyTitle.replace(/^ +/, "").replace(/ +$/, "");		// trim left and right spaces
 				verifyTitle = verifyTitle.replace(/_/g, " ");		// underscores to spaces
 				verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);	// uppercase first character
 				isPasteable = (verifyTitle == wgTitle);
 
 				var h1 = document.getElementsByTagName("h1")[0];
 				if (h1 && isPasteable) {
 					h1.innerHTML = containsTooMuchHTML ? realTitleText : realTitleHTML;
 					if (!containsTooMuchHTML)
 						realTitleBanner.style.display = "none";
 				}
 				document.title = realTitleText + " - Wikipedia";
 			}
 		}
 	} catch (e) {
 		/* Something went wrong. */
 	}
     });
 }
 
 
 // similar to innerHTML, but only returns the text portions of the insides, excludes HTML
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

//============================================================
// SFÂRŞIT repararea titlurilor cu iniţială mică
//============================================================

 /** WikiMiniAtlas *******************************************************
   *
   *  Description: WikiMiniAtlas is a popup click and drag world map.
   *               This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
   *               The script itself is located on meta because it is used by many projects.
   *               See [[Meta:WikiMiniAtlas]] for more information. 
   *  Created by: [[User:Dschwen]]
   */
 
 document.write('<script type="text/javascript" src="' 
     + 'http://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js' 
     + '&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400"></script>');

/** Funcţie care adaugă [[Format:Informaţii]] în cutia pentru trimitere fişiere************** 
  *
  *  Writen by [[commons:User:Yonidebest|User:Yonidebest]]
  */

function loadAutoInfomationTemplate()
{
 uploadDescription = document.getElementById('wpUploadDescription');
 if (uploadDescription==null) {
  return null;
 }

 var tripleTilda = '~~' + '~';
 var doubleBracket = '{' + '{';
 if (
  wgUserLanguage != 'fromflickr' &&
  wgUserLanguage != 'fromwikimedia' &&
  wgUserLanguage != 'fromgov'
 ) {
  uploadDescription.focus();
  switch(wgUserLanguage) {
   case "ownwork":
    uploadDescription.value =
     doubleBracket +
     'Informaţii\n|Descriere=\n|Sursa=self-made\n|Data=\n|'+
     'Autor= MyName (' + tripleTilda + ')\n|Permisiune=\n|alte_versiuni=\n}}\n';
    break;
   case "ro-nuestelibera":
    uploadDescription.value =
     doubleBracket +
     'Material cu copyright\n|Descriere=\n|Sursa=\n|Articol=*OBLIGATORIU*\n|'+
     'Secţiune=\n|Rezoluţie joasă=da sau nu?\n|Scop=\n|Înlocuibil=da sau nu\n|Alte informaţii=\n}}\n';
    break;
   default:
    uploadDescription.value =
     doubleBracket +
     'Informaţii\n|Descriere=\n|Sursa=\n|Data=\n|' +
     'Autor=\n|Permisiune=\n|alte_versiuni=\n}}\n';
    break;
  }
 }
}
addOnloadHook(loadAutoInfomationTemplate);

// support for project:IRC
 addOnloadHook(function () {var ircAdd = document.createElement("script"); ircAdd.setAttribute("type", "text/javascript"); ircAdd.setAttribute("src", "http://ro.wikinews.org/w/index.php?title=mediawiki:Irc.js&action=raw&ctype=text/javascript");
  document.getElementsByTagName("head")[0].appendChild(ircAdd);
 });

// adding language tabs at special:Preferences
if(wgCanonicalSpecialPageName == "Preferences") addOnloadHook(function() {
  var langs = ['ro','en','fr','it','es','pt','de'];
  for(var i=0;i<langs.length;i++) {
    addPortletLink('p-cactions',wgServer + wgScript + '?title=' + encodeURIComponent(wgPageName) + '&uselang=' + langs[i], langs[i]);
  }
});

 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "▼";
 var expandCaption = "▲";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );
 /** END Collapsible tables *********************************************************/