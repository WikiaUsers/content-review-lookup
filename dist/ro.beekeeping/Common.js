/*
<pre><nowiki>
*/

/* tooltips and access keys */
ta = new Object();
ta['pt-userpage'] = new Array('.','Pagina mea de utilizator');
ta['pt-anonuserpage'] = new Array('.','Pagina de utilizator pentru adresa IP curentă');
ta['pt-mytalk'] = new Array('n','Pagina mea de discuţii');
ta['pt-anontalk'] = new Array('n','Discuţii despre editări pentru adresa IP curentă');
ta['pt-preferences'] = new Array('','Diverse setări');
ta['pt-watchlist'] = new Array('l','Lista paginilor pe care le monitorizez.');
ta['pt-mycontris'] = new Array('y','Lista mea de contribuţii');
ta['pt-login'] = new Array('o','Autentificarea nu este obligatorie, ci doar foarte indicată.');
ta['pt-anonlogin'] = new Array('o','Autentificarea nu este obligatorie, ci doar foarte indicată.');
ta['pt-logout'] = new Array('o','Închide sesiunea');
ta['ca-talk'] = new Array('t','Discuţie despre articol');
ta['ca-edit'] = new Array('e','Puteţi modifica această pagină. Vă rugăm să previzualizaţi conţinutul înainte de salvare.');
ta['ca-addsection'] = new Array('+','Adaug un comentariu la această discuţie.');
ta['ca-viewsource'] = new Array('e','Aceasta pagina este protejată. Puteţi doar vedea codul sursă.');
ta['ca-history'] = new Array('h','Versiuni vechi ale acestui document.');
ta['ca-protect'] = new Array('=','Protejează acest document.');
ta['ca-delete'] = new Array('d','Şterge acest document.');
ta['ca-undelete'] = new Array('d','Recuperează acest document şters.');
ta['ca-move'] = new Array('m','Mută acest document.');
ta['ca-watch'] = new Array('w','Adaugă acest document în lista mea de pagini urmărite.');
ta['ca-unwatch'] = new Array('w','Şterge acest document din lista mea de pagini urmărite.');
ta['search'] = new Array('f','Caută în Wikipedia.');
ta['p-logo'] = new Array('','Pagina principală');
ta['n-mainpage'] = new Array('z','Vizitaţi pagina principală.');
ta['n-portal'] = new Array('','Despre proiect, cum puteţi contribui, ajutor.');
ta['n-currentevents'] = new Array('','Informaţii despre evenimentele curente');
ta['n-recentchanges'] = new Array('r','Ultimele modificări în paginile Wikipediei.');
ta['n-randompage'] = new Array('x','Afişează o pagină la întîmplare');
ta['n-help'] = new Array('','Locul în care găsiţi ajutor.');
ta['n-sitesupport'] = new Array('','Sprijiniţi-ne');
ta['t-whatlinkshere'] = new Array('j','Lista tuturor paginilor wiki care trimit la această pagină');
ta['t-recentchangeslinked'] = new Array('k','Schimbări recente în legătură cu această pagină');
ta['feed-rss'] = new Array('','Alimentează fluxul RSS pentru această pagină');
ta['feed-atom'] = new Array('','Alimentează fluxul Atom pentru această pagină');
ta['t-contributions'] = new Array('','Lista de contribuţii ale acestui utilizator');
ta['t-emailuser'] = new Array('','Trimite un e-mail acestui utilizator');
ta['t-upload'] = new Array('u','Trimite imagini sau fişiere media');
ta['t-specialpages'] = new Array('q','Lista tuturor paginilor speciale');
ta['ca-nstab-main'] = new Array('c','Afişează articolul');
ta['ca-nstab-user'] = new Array('c','Afişează pagina de utilizator');
ta['ca-nstab-media'] = new Array('c','Afişează pagina media');
ta['ca-nstab-special'] = new Array('','Aceasta este o pagină specială, (nu) o puteţi modifica.');
ta['ca-nstab-wp'] = new Array('a','Afişează pagina proiectului');
ta['ca-nstab-image'] = new Array('c','Afişează pagina imaginii');
ta['ca-nstab-mediawiki'] = new Array('c','Afişează mesajul de sistem');
ta['ca-nstab-template'] = new Array('c','Afişează formatul');
ta['ca-nstab-help'] = new Array('c','Afişează pagina de ajutor');
ta['ca-nstab-category'] = new Array('c','Afişează categoria');

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


/*
</nowiki> </pre>
*/