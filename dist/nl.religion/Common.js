/*
{{MediaWiki CSS/JS navigatie}}
/*
</pre>

== Laad volglijst script ==
<pre>
*/
if (wgPageName == "Speciaal:Volglijst"){
    importScript("MediaWiki:Common.js/watchlist.js")
}
/*
</pre>

== Bind of verbreek een evenement van een specifiek object ==
Cross-browser event attachment (John Resig)
http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html

<pre>
/*
 * obj  : DOM tree object to attach the event to
 * type : String, event type ("click", "mouseover", "submit", etc.)
 * fn   : Function to be called when the event is triggered (the ''this''
 *        keyword points to ''obj'' inside ''fn'' when the event is triggered)
 *
 * Maintainer: [[:Commons:User:Dschwen]]
 */
 
function addEvent( obj, type, fn ){
 if (obj.addEventListener)
  obj.addEventListener( type, fn, false );
 else if (obj.attachEvent)
 {
  obj["e"+type+fn] = fn;
  obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
  obj.attachEvent( "on"+type, obj[type+fn] );
 }
}
 
function removeEvent( obj, type, fn ){
 if (obj.removeEventListener)
  obj.removeEventListener( type, fn, false );
 else if (obj.detachEvent)
 {
  obj.detachEvent( "on"+type, obj[type+fn] );
  obj[type+fn] = null;
  obj["e"+type+fn] = null;
 }
}

/*
</pre>

== Extra knopje in de toolbar ==
Gebaseerd op [[:en:Wikipedia:Tools/Editing tools]]. Maintainers: [[:en:User:MarkS|User:MarkS]]?, [[:en:User:Voice of All|User:Voice of All]], [[:en:User:R. Koot|User:R. Koot]]

Om uit te zetten voegt u <code>mwCustomEditButtons = [];<code> toe aan [[Speciaal:Mypage/monobook.js]]

<pre>
*/

 if (mwCustomEditButtons) { 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/04/Button_array.png",
     "speedTip": "Voeg tabel in",
     "tagOpen": '{| class="prettytable"\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "! kop 1\n! kop 2\n! kop 3\n|-\n| rij 1, cel 1\n| rij 1, cel 2\n| rij 1, cel 3\n|-\n| rij 2, cel 1\n| rij 2, cel 2\n| rij 2, cel 3"};
 }
 
/*
</pre>
== Uitgelicht in andere talen ==
Sterren voor interwikilinks van de [[Wikipedia:Etalage]]-artikelen van andere Wikipedia's. Zie {{tl|Link FA}}. Overgenomen van [[:de:MediaWiki:Common.js]]

Om deze functie uit te zetten, zet <code>enable_linkFA = false;</code> in [[Special:Mypage/monobook.js]].

<pre>
*/

 var enable_linkFA = true;

 function linkFA() {
     if (!enable_linkFA) return;
     
     // links are to replaced in p-lang only
     var pLang = document.getElementById("p-lang");
     if (!pLang) {
         return;
     }
     var lis = pLang.getElementsByTagName("li");
     for (var i=0; i<lis.length; i++) {
          var li = lis[i];
          // alleen links met een Link FA-sjabloon
          if (!document.getElementById(li.className + "-fa"))   continue;
          
          // Extra css-klasse zodat het effect verborgen kan worden met CSS
          li.className += " FA";
          
          // Verander titel
          li.title = "Dit is een etalage-artikel in een andere taal.";
     }
 }

 addOnloadHook(linkFA);

/*
</pre>
== Autotekst in uploadpagina voor bestanden ==
Description: Script voor Speciaal:Uploaden
Maintainers: [[:commons:User:Yonidebest]], [[:commons:User:Dschwen]]

<pre>
*/
if (wgPageName == 'Speciaal:Uploaden' || wgPageName == 'Special:Upload' || wgPageName == 'Speciaal:Upload') {
importScript('MediaWiki:Upload.js');
}

/*</pre>

== Meerdere sets speciale tekens ==
Geeft menu in [[MediaWiki:Edittools]] waarmee meerdere sets speciale tekens kunnen worden geraadpleegd. Zie ook [[MediaWiki:Onlyifediting.js]]
<pre>
*/
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     importScript('MediaWiki:Onlyifediting.js');
 }
 
/*
</pre>

== NavFrame ==
Van [[:en:MediaWiki:Common.js]]
Test if an element has a certain class
Description: Uses regular expressions and caching for better performance.
Maintainers: [[:en:User:Mike Dillon]], [[:en:User:R. Koot]], [[:en:User:SG]]
<pre>
*/
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

/* </pre>
Collapsible tables
Description: Allows tables to be collapsed, showing only the header. See [[:en:Wikipedia:NavFrame]].
Maintainers: [[:en:User:R. Koot]]
<pre>
*/
 var autoCollapse = 2;
 var collapseCaption = "verberg";
 var expandCaption = "toon";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
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
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );

/*
</pre>

== Overige ==
;pickUpText(aParentElement)
:similar to innerHTML, but only returns the text portions of the insides, excludes HTML
:Overblijfsel van de RealTitle functie
:Maintainers op enwiki: [[:en:User:Interiot|User:Interiot]], [[:en:User:Mets501|User:Mets501]]

<pre>
*/

function pickUpText(aParentElement) {
  var str = "";

  function pickUpTextInternal(aElement) {
    var child = aElement.firstChild;
    while (child) {
      if (child.nodeType == 1)          // ELEMENT_NODE 
        pickUpTextInternal(child);
      else if (child.nodeType == 3)     // TEXT_NODE
        str += child.nodeValue;

      child = child.nextSibling;
    }
  }

  pickUpTextInternal(aParentElement);

  return str;
}

/*
</pre>
== begin SpecialSearchEnhanced ==
Dit voegt twee externe zoekmachines toe aan Speciaal:Search
Het is een bewerking van fr:MediaWiki:Monobook.js
en en:MediaWiki:Common.js
wat gemaakt is door fr:User:Dake en de auteurs van
en:MediaWiki:Common.js onder de licentie GFDL
Deze functie is aangepast aan MWSearch.
<pre>
*/
if (wgCanonicalSpecialPageName == "Search") {
        addOnloadHook(SpecialSearchEnhanced);
}

function SpecialSearchEnhanced() 
{
    if (document.forms['powersearch'])
    var searchForm = document.forms['powersearch'];
    if (document.forms['search'])
    var searchForm = document.forms['search'];
    if (searchForm.lsearchbox) {
        var searchBox = searchForm.lsearchbox;
    } else {
        var searchBox = searchForm.search;
    }

    var searchValue = searchBox.value
    var safeSearchValue = searchValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    var node = document.createElement('div');

    var SearchEnhancedText = '<p/><br/>U kunt ook met onderstaande externe zoekmachines zoeken in Wikipedia. Deze kunnen resultaten opleveren die met de interne zoekmachine niet gevonden worden. Bij Google kunt u ook andere taalversies van Wikipedia selecteren.';
    
    var googleSearch =  '<p/><table width=100%><tr valign=top><td align=left>';
        googleSearch += '<form method=get action="http://www.google.nl/search">';
        googleSearch += '<input type=text name=q value="' + safeSearchValue + '">';
        googleSearch += '<input type=hidden name=hl value=nl>';
        googleSearch += '&#32;<select name=sitesearch>';
        googleSearch += '<option value="nl.wikipedia.org"> Nederlands </option>';
        googleSearch += '<option value="en.wikipedia.org"> Engels </option>';
        googleSearch += '<option value="de.wikipedia.org"> Duits </option>';
        googleSearch += '<option value="fr.wikipedia.org"> Frans </option>';
        googleSearch += '<option value="es.wikipedia.org"> Spaans </option>';
        googleSearch += '<option value="pt.wikipedia.org"> Portugees </option>';
        googleSearch += '<option value="it.wikipedia.org"> Italiaans </option>';
        googleSearch += '<option value="sv.wikipedia.org"> Zweeds </option>';
        googleSearch += '<option value="no.wikipedia.org"> Noors </option>';
        googleSearch += '<option value="da.wikipedia.org"> Deens </option>';
        googleSearch += '<option value="pl.wikipedia.org"> Pools </option>';
        googleSearch += '<option value="fy.wikipedia.org"> Fries </option>';
        googleSearch += '<option value="li.wikipedia.org"> Limburgs </option>';
        googleSearch += '<option value="nds-nl.wikipedia.org"> Nedersaksisch </option>';
        googleSearch += '<option value="vls.wikipedia.org"> West-Vlaams </option>';
        googleSearch += '<option value="wikipedia.org"> Alle talen </option>';
        googleSearch += '</select>&#32;<input type=submit value="Zoek met Google">';
        googleSearch += '</form></td>';

   var wikiwixSearch =  '<td>&nbsp;</td><td align=right>';
       wikiwixSearch += '<form method=get action="http://nl.wikiwix.com/">';
       wikiwixSearch += '<input type=text name=action value="' + safeSearchValue + '">';
       wikiwixSearch += '&#32;<input type=submit value="Zoek met Wikiwix">';
       wikiwixSearch += '</form></td>';

    var yahooSearch =  '<td>&nbsp;</td><td align=right>';
        yahooSearch += '<form method=get action="http://nl.search.yahoo.com/search">';
        yahooSearch += '<input type=text name=p value="' + safeSearchValue + '">';
        yahooSearch += '<input type=hidden name=vs value=nl.wikipedia.org>';
        yahooSearch += '&#32;<input type=submit value="Zoek met Yahoo">';
        yahooSearch += '</form></td></tr></table><br/>';

    node.innerHTML = node.innerHTML + SearchEnhancedText + googleSearch + wikiwixSearch + yahooSearch;
  	
    var nonefound = document.getElementById("nonefound")
    if (nonefound) {      
        nonefound.innerHTML = nonefound.innerHTML + '<div>' + node.innerHTML + '</div>';
        
    } else {     
        searchForm.parentNode.insertBefore(node, searchForm.nextSibling);
    }
}

/*
 *   10 regels in plaats van 7 bij suggestiefunctie bij zoekvak.
 *   Dit voorkomt het tonen van een scrollbalk.
 */
os_max_lines_per_suggest = 10;

/**
 * InterProjectLinks (iProject)
 * Adds links to other WMF projects in the sidebar.
 */

importScript('MediaWiki:IProject.js'); 

// ============================================================
// BEGIN Dynamisch inklapbare div

// set up the words in your language
var UitklapDivHide = 'Inklappen';
var UitklapDivShow = 'Uitklappen';

// shows and hides content of Uitklap divs
// Parameters:
//     indexUitklapDiv: the index of Uitklap div to be toggled
function toggleUitklapDiv(indexUitklapDiv)
{
   var UitklapToggle = document.getElementById("UitklapToggle" + indexUitklapDiv);
   var UitklapFrame = document.getElementById("UitklapFrame" + indexUitklapDiv);

   if (!UitklapFrame || !UitklapToggle) {
       return false;
   }

   // if shown now
   if (UitklapToggle.firstChild.data == UitklapDivHide) {
       for (
               var UitklapChild = UitklapFrame.firstChild;
               UitklapChild != null;
               UitklapChild = UitklapChild.nextSibling
           ) {
           if (UitklapChild.className == 'UitklapContent') {
               UitklapChild.style.display = 'none';
           }
           if (UitklapChild.className == 'UitklapToggle') {
               UitklapChild.firstChild.data = UitklapDivShow;
           }
       }

   // if hidden now
   } else if (UitklapToggle.firstChild.data == UitklapDivShow) {
       for (
               var UitklapChild = UitklapFrame.firstChild;
               UitklapChild != null;
               UitklapChild = UitklapChild.nextSibling
           ) {
           if (UitklapChild.className == 'UitklapContent') {
               UitklapChild.style.display = 'block';
           }
           if (UitklapChild.className == 'UitklapToggle') {
               UitklapChild.firstChild.data = UitklapDivHide;
           }
       }
   }
}

// adds show/hide-button to navigation bars
function createUitklapDivToggleButton()
{
   var indexUitklapDiv = 0;
   // iterate over all < div >-elements
   for(
           var i=0; 
           UitklapFrame = document.getElementsByTagName("div")[i]; 
           i++
       ) {
       // if found a navigation bar
       if (UitklapFrame.className == "UitklapFrame" || UitklapFrame.className == "UitklapFrameNoClear") {

           indexUitklapDiv++;
           var UitklapToggle = document.createElement("a");
           UitklapToggle.className = 'UitklapToggle';
           UitklapToggle.setAttribute('id', 'UitklapToggle' + indexUitklapDiv);
           UitklapToggle.setAttribute('href', 'javascript:toggleUitklapDiv(' + indexUitklapDiv + ');');

           var UitklapToggleText = document.createTextNode(UitklapDivHide);
           UitklapToggle.appendChild(UitklapToggleText);

           // add NavToggle-Button as first div-element 
           // in < div class="UitklapFrame" >
           UitklapFrame.insertBefore(
               UitklapToggle,
               UitklapFrame.firstChild
           );
           UitklapFrame.setAttribute('id', 'UitklapFrame' + indexUitklapDiv);
       }
   }
   for(
       var i=1; 
       i<=indexUitklapDiv; 
       i++
   ) {
       toggleUitklapDiv(i);
   }

}

addOnloadHook( createUitklapDivToggleButton );

// EIND Dynamisch inklapbare div
// ============================================================

/** extract a URL parameter from the current URL **********
 * From [[en:User:Lupin/autoedit.js]]
 *
 * paramName  : the name of the parameter to extract
 *
 * Local Maintainer: [[User:Dschwen]]
 */
 
function getParamValue( paramName ) 
{
 var cmdRe=RegExp( '[&?]' + paramName + '=([^&]*)' );
 var h = document.location.href;
 var m=cmdRe.exec(h);
 if (m) {
  try {
   return decodeURIComponent(m[1]);
  } catch (someError) {}
 }
 return null;
}
 
/** &withJS= URL parameter *******
 * Allow to try custom scripts on the MediaWiki namespace without
 * editing [[Special:Mypage/monobook.js]]
 *
 * Maintainer: [[User:Platonides]]
 */
{
 var extraJS = getParamValue("withJS");
 if (extraJS)
  if (extraJS.match("^MediaWiki:[^&<>=%]*\.js$"))
   importScript(extraJS);
  else
   alert(extraJS + " javascript not allowed to be loaded.");
}

function loggedOutTalkPage() {
  if (!wgUserName) {
    addPortletLink('p-personal', '', '', 'pt-userpage', '', '', document.getElementById('pt-login'));
    document.getElementById('pt-userpage').innerHTML = '<span style="color: gray;">Niet aangemeld</span>';
    addPortletLink('p-personal', 'http://nl.wikipedia.org/wiki/Special:MyTalk', 'Overlegpagina IP-adres', 'pt-mytalk', 'Overlegpagina IP-adres [n]', 'n', document.getElementById('pt-login'));
    addPortletLink('p-personal', 'http://nl.wikipedia.org/wiki/Special:MyContributions', 'Bijdragen IP-adres', 'pt-mycontris', 'Bijdragen IP-adres [y]', 'y', document.getElementById('pt-login'));
  }
}

addOnloadHook(loggedOutTalkPage);

//toont Beta inschakelen link voor geregistreerde gebruikers
function ShowBeta() {
  if (wgUserName) {
   var el = document.getElementById('pt-optin-try')
   if(el) el.style.display='inline'
  }
}

addOnloadHook(ShowBeta);



/** IPv6 AAAA connectivity testing **/

var __ipv6wwwtest_factor = 100;
var __ipv6wwwtest_done = 0;
if ((wgServer != "https://secure.wikimedia.org") && (Math.floor(Math.random()*__ipv6wwwtest_factor)==42)) {
    importScript("MediaWiki:Common.js/IPv6.js");
}

// Bewerken en overleg bij een afbeelding op Commons linken naar Commons (kopie van de Duitse Wikipedia)

if (wgNamespaceNumber === 6) addOnloadHook( function() {
	if (window.keepLocalFileTabs ) return;
	if (document.getElementById( 'ca-history')) return; // Lokale beschrijving aanwezig?
	if (!getElementsByClassName(document, 'div', 'sharedUploadNotice')[0]) return; // Alleen doen bij afbeeldingen op Commons
 
	var path = wgServer.match(/^https/)
		? 'https://secure.wikimedia.org/wikipedia/commons/wiki/'
		: 'http://commons.wikimedia.org/wiki/';

	// Andere link voor overlegpagina
	// vector uses ca-image_talk
	var talk = document.getElementById('ca-talk') || document.getElementById('ca-image_talk');
	if (talk && talk.className.match(/(^| )new( |$)/)) {
		var link		= talk.getElementsByTagName('a')[0];
		link.href       = path + 'File_talk:' + encodeURIComponent(wgTitle) + '?uselang=' + wgUserLanguage;
		link.className  += ' commonstab';
	}
 
	// Bewerken link
	var edit	= document.getElementById('ca-edit') || document.getElementById('ca-viewsource');
	if (edit) { 
		var link		= edit.getElementsByTagName('a')[0];
		link.href       = path + 'File:' + encodeURIComponent(wgTitle) + '?uselang=' + wgUserLanguage + '&action=edit';
		link.className  += ' commonstab';
		link.firstChild.nodeValue = 'bewerken';
	}
});