/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* 0. Nawigacja */
// ============================================================
 // BEGIN Dynamic Navigation Bars (experimantal)
 // pochodzi z http://en.wikipedia.org/wiki/MediaWiki:Monobook.js
 // autorzy: http://en.wikipedia.org/w/index.php?title=MediaWiki:Monobook.js&action=history
 // licencja: GFDL
 // set up the words in your language
 var NavigationBarHide = '[ukryj]';
 var NavigationBarShow = '[pokaż]';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 1; 
 
 // shows and hides content and picture (if available) of navigation bars
 // Parameters:
 //     indexNavigationBar: the index of navigation bar to be toggled
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
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
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
        }
    NavToggle.firstChild.data = NavigationBarHide;
    }
 }
 
 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
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
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(
              var j=0; 
              j < NavFrame.childNodes.length; 
              j++
            ) {
              if (NavFrame.childNodes[j].className == "NavHead") {
                NavFrame.childNodes[j].appendChild(NavToggle);
              }
            }
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
 
 addOnloadHook(function(){createNavigationBarToggleButton();});
 
 // END Dynamic Navigation Bars

UWAGA! Ten JavaScript działa dla wszystkich skórek. Należy zachować szczególną ostrożność wprowadzając tutaj zmiany!
 
'''Wyłączenie poszczególnych możliwości/skryptów'''
* Oznaczanie artykułów medalowych i dobrych artykułów (dla interwiki)
 window.LinkFADone = true;
* Przesunięcie linków [ edytuj ] przy sekcjach
 var oldEditsectionLinks=true;
*/
 
/*
	Dodawanie ciasteczek wygasających po pewnym czasie
 
	name - nazwa ciasteczka
	value - wartość do ustawienia
 
	// opcje (wszystkie opcjonalne)
	options = {days:7, path:'/'}	// defaults
*/
function addLongTermCookie(name, value, options)
{
	// options
	if (typeof(options)!='object')
	{
		options = new Object();
	}
	var days = (options.days) ? options.days : 7;
	var path = (options.path) ? options.path : '/';
 
	// setup date
	var dt = new Date();
	dt = new Date(dt.getTime()+days*24*3600000); //(ilość sekund * 1000)
 
	// set
	document.cookie = name+"="+value+"; path="+path+"; expires=" + dt.toGMTString();
}
 
/*
==== funkcja insertTagsTo_ ====
; Author: phpBB Team, WikiMedia, Maciej Jaros [[:pl:User:Nux]]
; Licence: [http://opensource.org/licenses/gpl-license.php GNU General Public License v2]
; Description: Apply tagOpen/tagClose to selection in given textarea/input, use sampleText instead of selection if there is none. Copied and adapted from phpBB
*/
// outputid = 'some_id_of_a_textarea_or_a_text_input'
function insertTagsTo_(tagOpen, tagClose, sampleText, outputid) {
	var txtarea = document.getElementById(outputid);
	if (!txtarea)
		return
	;
 
	// IE
	if (document.selection  && !is_gecko) {
		var theSelection = document.selection.createRange().text;
		if (!theSelection)
			theSelection=sampleText;
		txtarea.focus();
		if (theSelection.charAt(theSelection.length - 1) == " ") { // exclude ending space char, if any
			theSelection = theSelection.substring(0, theSelection.length - 1);
			document.selection.createRange().text = tagOpen + theSelection + tagClose + " ";
		} else {
			document.selection.createRange().text = tagOpen + theSelection + tagClose;
		}
 
	// Mozilla
	} else if(txtarea.selectionStart || txtarea.selectionStart == '0') {
		var replaced = false;
		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd;
		if (endPos-startPos)
			replaced = true;
		var scrollTop = txtarea.scrollTop;
		var myText = (txtarea.value).substring(startPos, endPos);
		if (!myText)
			myText=sampleText;
		if (myText.charAt(myText.length - 1) == " ") { // exclude ending space char, if any
			subst = tagOpen + myText.substring(0, (myText.length - 1)) + tagClose + " ";
		} else {
			subst = tagOpen + myText + tagClose;
		}
		txtarea.value = txtarea.value.substring(0, startPos) + subst +
			txtarea.value.substring(endPos, txtarea.value.length);
		txtarea.focus();
		//set new selection
		if (replaced) {
			var cPos = startPos+(tagOpen.length+myText.length+tagClose.length);
			txtarea.selectionStart = cPos;
			txtarea.selectionEnd = cPos;
		} else {
			txtarea.selectionStart = startPos+tagOpen.length;
			txtarea.selectionEnd = startPos+tagOpen.length+myText.length;
		}
		txtarea.scrollTop = scrollTop;
	}
	// reposition cursor if possible
	if (txtarea.createTextRange)
		txtarea.caretPos = document.selection.createRange().duplicate();
}
 
/*
==== Dodanie linka [edytuj] dla sekcji nagłówkowej ====
; Pomysł: [[:en:User:Pile0nades]]
; Wykonanie: Maciej Jaros [[:pl:User:Nux]]
; Licencja: [http://opensource.org/licenses/gpl-license.php GNU General Public License v2]
*/
// Liczba nagłówków drugiego, trzeciego i czwartego stopnia
// jakie muszą się pojawić w artykule, żeby pojawił się link
var addEditTopLinkNumHeaders = 2; // dla 2 => dla dwóch i więcej się pojawi
function addEditTopLink() {
	//
	// somehow it gets run twice on some pages - stop that
	if (window.addEditTopLinkDone)
		return
	;
	window.addEditTopLinkDone = true;
 
	//	
	// if this is preview page or there is no edit tab, stop
	if (!wgIsArticle)
		return
	;
 
	//	
	// if there are no edit-section links then stop
	var spans = document.getElementById("bodyContent").getElementsByTagName("span");
	var i;
	for (i = 0; i < spans.length; i++) {
		if (spans[i].className == 'editsection')
			break
		;
	}
	if (i>=spans.length)
		return
	;
 
	//
	// additional checkup to stop
	var test = document.getElementById("bodyContent").getElementsByTagName("h2").length +
		document.getElementById("bodyContent").getElementsByTagName("h3").length +
		document.getElementById("bodyContent").getElementsByTagName("h4").length;
	// note that there is always siteSub (h3)
	if (test<=addEditTopLinkNumHeaders)
		return
	;
 
	//
	// get first header element
	var fst_h1 = document.getElementById("content").getElementsByTagName("h1")[0];
 
	//
	// Creating elements
	//
	// create div
	var div = document.createElement("DIV");
	div.className = 'editsection';
	// create link
	var link = document.createElement("A");
	link.href = document.getElementById("ca-edit").getElementsByTagName("a")[0].href + '&section=0';
	link.setAttribute('title', 'edytuj sekcję nagłówkową artykułu');
	link.appendChild(document.createTextNode('edytuj'));
	// append link and stuff to div
	div.appendChild(document.createTextNode('['));
	div.appendChild(link);
	div.appendChild(document.createTextNode(']'));
 
	//
	// Styling
	//
	div.style.cssText = 'padding:.7em 0 0 1.0em; float:right; font-size:x-small;';
 
	//
	// Insert edit div into h1 and content of h1 to div (it has to be like that so that FF doesn't select the edit link on double click)
	//
	var div_h1 = document.createElement("div");
	// move children
	while(fst_h1.childNodes.length)
	{
		div_h1.appendChild(fst_h1.firstChild)
	}
	fst_h1.appendChild(div);	// edit link
	fst_h1.appendChild(div_h1);	// previous h1 content
}
if (skin=='vector' || skin=='monobook')
{
	addOnloadHook(addEditTopLink);
}
 
/*
== Przesunięcie linków [ edytuj ] przy sekcjach ==
; Autor: Copyright 2006, Marc Mongenet
; Opis: Wyszukuje &lt;span class="editsection"> i przesuwa na koniec ich rodzica (nagłówka sekcji) wyświetlając ''inline'' ze zmniejszoną czcionką.
; Licencja: 
This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
 
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 
http://www.gnu.org/licenses/gpl.html
*/
addOnloadHook(function() {
 try {
	if (!(typeof oldEditsectionLinks == 'undefined' || oldEditsectionLinks == false)) return;
	var spans = document.getElementsByTagName("span");
	for (var s = 0; s < spans.length; ++s) {
		var span = spans[s];
		if (span.className == "editsection") {
			span.style.cssText = 'float:none; font-size:x-small; font-weight: normal;';
			span.parentNode.appendChild(document.createTextNode(" "));
			span.parentNode.appendChild(span);
		}
	}
 } catch (e) { /* błąd */ }
});
 
 
/** Interwiki links to featured articles ***************************************
 *
 *  Description: Highlights interwiki links to featured articles (or
 *               equivalents) by changing the bullet before the interwiki link
 *               into a star.
 *  Maintainers: [[User:R. Koot]]
 */
 
function LinkFA() 
{
	if ( window.LinkFADone )
		return;
 
	if ( document.getElementById( "p-lang" ) ) {
		var InterwikiLinks = document.getElementById( "p-lang" ).getElementsByTagName( "li" );
 
		for ( var i = 0; i < InterwikiLinks.length; i++ ) {
			if ( document.getElementById( InterwikiLinks[i].className + "-fa" ) ) {
				InterwikiLinks[i].className += " FA"
				InterwikiLinks[i].title = "Artykuł w tym języku jest na medal";
			}
			else if ( document.getElementById( InterwikiLinks[i].className + "-ga" ) ) {
				InterwikiLinks[i].className += " GArt"
				InterwikiLinks[i].title = "Artykuł w tym języku jest dobrym artykułem";
			}
		}
	}
 
	window.LinkFADone = true;
}
addOnloadHook( LinkFA );
 
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
 
/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[en:Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
var autoCollapse = 2;
var collapseCaption = "ukryj";
var expandCaption = "pokaż";
 
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
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
addOnloadHook( createCollapseButtons );
 
 
/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if ( hasClass( NavChild, 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
            if ( hasClass( NavChild, 'NavContent') ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var isCollapsed = hasClass( NavFrame, "collapsed" );
            /*
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if ( NavChild.style.display == 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
 
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}
 
addOnloadHook( createNavigationBarToggleButton );
 
/**
 * Skrypt dla Szablon:Galeria
 */
function toggleImage(group, remindex, shwindex) {
  document.getElementById("ImageGroupsGr"+group+"Im"+remindex).style.display="none";
  document.getElementById("ImageGroupsGr"+group+"Im"+shwindex).style.display="inline";
}
function ImageGroup(){
  if (document.URL.match(/printable/g)) return;
  var divs=document.getElementsByTagName("div");
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
      var leftlink = document.createElement("a");
      var rightlink = document.createElement("a");
      if (j != 0) {
        leftlink.href = "javascript:toggleImage("+i+","+j+","+(j-1)+");";
        leftlink.innerHTML="◀";
      }
      if (j != units.length - 1) {
        rightlink.href = "javascript:toggleImage("+i+","+j+","+(j+1)+");";
        rightlink.innerHTML="▶";
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
      if (units.length>1) currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      if (j != 0) currentimage.style.display="none";
    }
  }
}
addOnloadHook(ImageGroup);
 
//
// "Focus the cursor in the search bar on loading the Main Page"
// Autor: [[:en:User:Nihiltres]]
// Zaimportowany z http://en.wikipedia.org/wiki/MediaWiki:Gadget-searchFocus.js wg stanu na 7 paź. 2008
//
// opis działania: skrypt ustawia automatycznie kursor w polu wyszukiwania.
 
if (wgPageName == "Strona_główna") {
	addOnloadHook(function() {
		var searchInput = document.getElementById("searchInput");
		if (searchInput)
			searchInput.focus();
	});
}
 
/////////////////////////////////////////
/////       Skrypty zewnętrzne     //////
/////////////////////////////////////////
 
 
// Importowanie funkcji działających podczas edycji. Patrz: [[MediaWiki:Common-edit.js]]
 
if (wgAction == 'edit' || wgAction == 'submit')
{
	if (wgNamespaceNumber > -1)
	{
		importScript( "MediaWiki:Common-edit.js" );
		importScript( "MediaWiki:Gadget-edit-buttons.js" );
		importScript( "MediaWiki:nuxedtoolkit.js" );	// tworzenie przycisków w toolbarach edycyjnych
		importScript( "MediaWiki:NuxTBKeys.js" );	// Autokorekta
	}
	if (wgCanonicalNamespace=='Project')
	{
		importScript( "MediaWiki:SubEd.js" );		// uproszczone dodawanie podstron
	}
}
importScript( "MediaWiki:sel_t.js" ); // zaznaczenie tekstu
importScript( "MediaWiki:SftJSmsg.js" ); // klasa obsługi komunikatów JS-HTML
 
importScript( "MediaWiki:HeadingIcons.js"); // poprawa ikonek nagłówka
 
if (wgUserGroups == null) {
	// Importowanie skryptów tylko dla anomimowych użytkowników.
	// Patrz: [[MediaWiki:Common-Anon.js]]
	importScript( "MediaWiki:Common-Anon.js" );
}
 
var beau$userGroups = {};
 
if (wgUserGroups) {
	for (var i = 0; i < wgUserGroups.length; i++) {
		beau$userGroups[ wgUserGroups[i] ] = true;
	}
}
 
if ( beau$userGroups["sysop"] ) {
	// Importowanie skryptów tylko dla administratorów.
	// Patrz: [[MediaWiki:Common-Sysop.js]]
	importScript( "MediaWiki:Common-Sysop.js" )
}
else {
	// Dla osób nie będących administratorami
	// Popup do zgłaszania błędów. Patrz: [[MediaWiki:Wikibugs.js]]
	importScript( "MediaWiki:Wikibugs.js" )
}
 
if (wgCanonicalSpecialPageName == 'Upload') {
	// Skrypty na stronie przesyłania plików
	importScript("MediaWiki:Common-Upload.js");
}
else if (wgCanonicalSpecialPageName == 'Search') {
	// Skrypty na stronie wyszukiwania
	importScript("MediaWiki:Common-Search.js");
}
else if ( wgPageName == "Wikipedia:CommonsTicker" ) {
	// Pobieranie styli CSS dla [[Wikipedia:CommonsTicker]]
	importStylesheet( "MediaWiki:CommonsTicker.css" );
}
 
/** WikiMiniAtlas *******************************************************
  *
  *  Description: WikiMiniAtlas is a popup click and drag world map.
  *               This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
  *               The script itself is located on meta because it is used by many projects.
  *               See [[Meta:WikiMiniAtlas]] for more information. 
  *  Maintainers: [[User:Dschwen]]
  */
 
if (wgServer == "https://secure.wikimedia.org") {
	var metaBase = "https://secure.wikimedia.org/wikipedia/meta";
} else {
	var metaBase = "http://meta.wikimedia.org";
}
importScriptURI(metaBase+"/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400");
 
var wma_settings =
{
	height : 400,
	width : 700
}
 
/** extract a URL parameter from the current URL **********
 * From [[en:User:Lupin/autoedit.js]]
 * Local Maintainer: [[User:Saper]]
 */
function getParamValue( paramName, url) 
{
 if (typeof (url) == 'undefined' ) url = document.location.href;
 var cmdRe=RegExp( '[&?]' + paramName + '=([^&]*)' );
 var m=cmdRe.exec(url);
 if (m) {
  try {
   return decodeURIComponent(m[1]);
  } catch (someError) {}
 }
 return null;
}
/** Parametr &withJS= *******
 * Spróbuj załadować dodatkowy skrypt z przestrzeni MediaWiki
 * bez potrzeby edytowania [[Special:Mypage/monobook.js]]
 *
 * Maintainer: commons: [[User:Platonides]], plwiki: [[User:Saper]]
 */
{
 var extraJS = getParamValue("withJS");
 if (extraJS)
  if (extraJS.match("^MediaWiki:[^&<>=%]*\.js$"))
   importScript(extraJS);
  else
   alert("Plik " + extraJS + " nie powinien byc ladowany.");
}
 
/*
== Drobne skrypty ==
; Author: Maciej Jaros [[:pl:User:Nux]]
; License: Public domain
*/
//
// Zaznacza wszystkie elementy typu "checkbox" na stronie - wywołanie javascript:ZaznaczWszystkie()
//
function ZaznaczWszystkie()
{
	var inpt = document.getElementsByTagName('input');
	for (var i=inpt.length-1; i>=0; i--)
		if (inpt[i].type=='checkbox')
			inpt[i].checked=true;
}
//
// RSS kategorii
//
if (wgNamespaceNumber == 14)
{
	addOnloadHook(function()
	{
		var rsslink = 'http://toolserver.org/~cspurrier/rss/rss.php'
			+'?lang=pl&family=wikipedia'
			+'&desc=RSS%20kategorii%20Wikipedii'
			+'&title='+encodeURIComponent(wgTitle)
			+'&categories='+encodeURIComponent(wgTitle);
 
		addPortletLink('p-tb', rsslink, 'RSS kategorii', 't-katrss', 'RSS kategorii ' + wgTitle, null, null);
	});
}
//
// Array.indexOf() dla kompatybilności różnych skryptów z IE
// (skrypt z Mozilli)
if (!Array.prototype.indexOf)
{
	Array.prototype.indexOf = function(elt /*, from*/)
	{
		var len = this.length;
 
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0)
			from += len;
 
		for (; from < len; from++)
		{
			if (from in this && this[from] === elt)
				return from;
		}
		return -1;
	};
}
//
// Ustawienie wysokości "Usunięcie" pustego elementu contentSub
//
addOnloadHook(function()
{
	var el=document.getElementById('mw-revisiontag');
	if (el && el.className.indexOf('flaggedrevs_short')!=-1)
	{
		if (el.parentNode.id=='contentSub') el.parentNode.style.height='17px';
	}
});
 
addOnloadHook(function()
{
	var fn = getElementsByClassName(document, 'table', 'navbox');
	if (fn.length) fn[0].className+=' firstNavbox';
})
 
/*
=== Link do brudnopisów w menu osobistym ===
 
; autor: [[Wikipedysta:Herr Kriss]]
*/
 
var disableSandboxLink = 0;	// ustawienie tego na 1 lub true w swoim monobook.js pozwoli wyłączyć tę funkcjonalność
 
addOnloadHook(function()
{
	if (wgUserName != null && disableSandboxLink == 0)
	{
		var caption = 'Mój brudnopis'
		if (wgUserLanguage != 'pl')
			caption = 'My sandbox';
 
		addPortletLink('p-personal', wgServer + wgScript + '?title=Special:Mypage/brudnopis', caption, 'pt-sandbox', caption, '', document.getElementById('pt-preferences'));
	}
});