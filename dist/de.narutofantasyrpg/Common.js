// <pre>
/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
// ================================================================================
/** CSS einbinden */
 function addCSS(title) {
     document.write(
                '<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=' + 
                encodeURIComponent(title) + '&action=raw&ctype=text/css"; /*]]>*/</style>');
 }
 
 /** JS einbinden */
 function addJS(title) {
     document.write(
                '<scr'+'ipt type="text/javascript" src="/index.php?title=' +
                encodeURIComponent(title) + '&action=raw&ctype=text/javascript"></scr'+'ipt>');
 }pers
 
 // anzeigen & verbergen
 function einaus (inhalt, einblenden, ausblenden) {
    var thisLevel  = document.getElementById(inhalt);
    var otherLevel = document.getElementById(einblenden);
    var linkLevel  = document.getElementById(ausblenden);
    if (thisLevel.style.display == 'none') {
        thisLevel.style.display = 'block';
        otherLevel.style.display = 'none';
        linkLevel.style.display = 'inline';
    } else {
        thisLevel.style.display = 'none';
        otherLevel.style.display = 'inline';
        linkLevel.style.display = 'none';
    }
 }
 
 //================================================================================
 // alles mit class='jstest' ist dragbar
 
 /***********************************************
 * Drag and Drop Script: © Dynamic Drive (http://www.dynamicdrive.com)
 * This notice MUST stay intact for legal use
 * Visit http://www.dynamicdrive.com/ for this script and 100s more.
 ***********************************************/
 
 var dragobject={
 z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0,
 initialize:function(){
 document.onmousedown=this.drag
 document.onmouseup=function(){this.dragapproved=0}
 },
 drag:function(e){
 var evtobj=window.event? window.event : e
 this.targetobj=window.event? event.srcElement : e.target
 if (this.targetobj.className=="jstest"){
 this.dragapproved=1
 if (isNaN(parseInt(this.targetobj.style.left))){this.targetobj.style.left=0}
 if (isNaN(parseInt(this.targetobj.style.top))){this.targetobj.style.top=0}
 this.offsetx=parseInt(this.targetobj.style.left)
 this.offsety=parseInt(this.targetobj.style.top)
 this.x=evtobj.clientX
 this.y=evtobj.clientY
 if (evtobj.preventDefault)
 evtobj.preventDefault()
 document.onmousemove=dragobject.moveit
 }
 },
 moveit:function(e){
 var evtobj=window.event? window.event : e
 if (this.dragapproved==1){
 this.targetobj.style.left=this.offsetx+evtobj.clientX-this.x+"px"
 this.targetobj.style.top=this.offsety+evtobj.clientY-this.y+"px"
 return false
 }
 }
 }
 
 dragobject.initialize();   
 
 
// Ein- und Ausblenden per Javascript
 
// mit den folgenden Funktionen lässt sich ein div-Konstrukt in ein Einblende-Ausblende-Ding verwandeln
//
// Variante 1 (Klick irgendwo blendet ein oder aus):
//	<div class="klapp">
//		<div class="klapp_t">Titel im eingeblendeten Zustand</div>
//		<div class="klapp_e">Titel im ausgeblendeten Zustand</div>
//		<div class="klapp_i">Einzublendender Inhalt</div>
//	</div>
//
// Variante 2 (ein- und ausblenden nur mit Links):
//	<div class="klapp_x">
//		<div class="klapp_t">Titel im eingeblendeten Zustand mit <span class="klapp">Einblendelink</span></div>
//		<div class="klapp_e">Titel im ausgeblendeten Zustand mit <span class="klapp">Ausblendelink</span></div>
//		<div class="klapp_i">Einzublendender Inhalt</div>
//	</div>
 
function ausklapp( element )
{
	var klapp_i = null;
	var klapp_e = null;
	var klapp_t = null;
 
	for (i=0; i<element.childNodes.length; i++)
	{
		if( element.childNodes[i].nodeType == 1 )
		{
			if ( element.childNodes[i].className == "klapp_i" )
				klapp_i = element.childNodes[i];
			else if ( element.childNodes[i].className == "klapp_t" )
				klapp_t = element.childNodes[i];
			else if ( element.childNodes[i].className == "klapp_e" )
				klapp_e = element.childNodes[i];
		}
 
		if ( klapp_i && klapp_t && klapp_e )
			break;
	}
 
	if( klapp_i.style.display != "none")
	{
		klapp_i.style.display = "none";
		klapp_e.style.display = "none";
		klapp_t.style.display = "block";
 
	}
	else
	{
		klapp_i.style.display = "block";
		klapp_e.style.display = "block";
		klapp_t.style.display = "none";
	}
 
}
 
function getKlappDiv( obj )
{
	while ( obj && obj.parentNode && obj.className != "klapp_x" )
		obj = obj.parentNode;
 
	return obj;
}
 
// Event-Handler für alle class="klapp"-Objekte zuweisen
function makeAusklapp()
{
	// klapp-div-Rahmen
	var a = document.getElementsByTagName("div"); 
	for ( div=0; div<a.length; div++ )
	{
		if ( a[div].className == "klapp" )
		{
			//Leider nicht IE-Kompatibel:
			//var f = function () { ausklapp(this) };
			//addEvent( a[div], "click", f , false );
			//stattdessen:
 
			a[div].onclick = function () { ausklapp(this);}
		}
	}
 
	// klapp-spans-Rahmen als Link-Ersatz
	var a = document.getElementsByTagName("span"); 
	for ( span=0; span<a.length; span++ )
	{
		if ( a[span].className == "klapp" )
		{
			a[span].onclick = function () { ausklapp(getKlappDiv( this ));}
		}
	}
 
}
 
// Nach dem Laden des Fensters folgendes Ausführen:
addOnloadHook(makeAusklapp);
 
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
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "verbergen";
var expandCaption = "anzeigen";
 
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
 
            var NavToggleText = document.createTextNode(NavigationBarHide);
            for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if (NavChild.style.display == 'none') {
                        NavToggleText = document.createTextNode(NavigationBarShow);
                        break;
                    }
                }
            }
 
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
 
 
// Eigenes Script für Spoiler
// http://de.naruto.wikia.com - by [[Benutzer:TrunX]]
 
var SpoilerHide = "Spoiler verbergen";
var SpoilerShow = "Spoiler anzeigen";
 
function createSpoilerLink()
{
   var obj;
   for(var i=0; i < document.getElementsByTagName("div").length; i++)
   {
      obj = document.getElementsByTagName("div")[i];
      if(obj.className == 'Head_Spoil')
      {
         obj.className = 'Head_Spoil';
         var SpoilerLink= document.createElement("a");
         SpoilerLink.setAttribute('id', 'cmdSpoil');
         SpoilerLink.setAttribute('href', 'javascript:clickShowHide();');
         SpoilerLink.appendChild(document.createTextNode( SpoilerShow ));
 
         var child = obj.firstChild;
         obj.removeChild(child);
         SpoilerLink.appendChild(child);
         //alert(obj.innerHTML);
         obj.insertBefore(SpoilerLink, obj.firstChild);
         //alert(obj.innerHTML);
         var pseudodummy= obj.innerHTML;
      }
   }
}
function clickShowHide()
{
	var SpoilerLink= document.getElementById('cmdSpoil');
	if (!SpoilerLink) {
		return false;
	}
	// Wenn Spoiler == Spoiler anzeigen
	if(SpoilerLink.firstChild.data == SpoilerShow)
	{
		SpoilerLink.firstChild.data = SpoilerHide;
	}
	else
	{
		SpoilerLink.firstChild.data = SpoilerShow;
	}
	SearchSpoilerClasses('span');
	SearchSpoilerClasses('div');
	SearchSpoilerClasses('tr');
	SearchSpoilerClasses('td');
}
function SearchSpoilerClasses(tag)
{
	var obj;
	for(var i=0; i < document.getElementsByTagName(tag).length; i++)
	{
		obj= document.getElementsByTagName(tag)[i];
		if(obj.className == 'Spoiler')
		{
			obj.className = 'UnSpoiler';
		}
		else if(obj.className == 'UnSpoiler')
		{
			obj.className = 'Spoiler';
		}
	}
}
 
addOnloadHook(createSpoilerLink);
 
// Für Toggeln
// http://de.naruto.wikia.com - by [[Benutzer:TrunX]]
function createToggle()
{
	var obj;
	var index = 1;
	for(var i=0; i < document.getElementsByTagName("span").length; i++)
	{
		obj = document.getElementsByTagName("span")[i];
		var elemClasses = obj.className.split(' ');
		if(elemClasses[0] == 'toToggle'|| elemClasses[0] == 'unToggle') // || elemClasses[1] == 'SB')
		{
			var SpoilerLink= document.createElement("a");
			var attrVar;
			SpoilerLink.setAttribute('id', obj.className);
			SpoilerLink.setAttribute('href', "javascript:ToggleClasses('" + obj.className + "');");
 
			var child = obj.firstChild;
			obj.removeChild(child);
			SpoilerLink.appendChild(child);
			obj.insertBefore(SpoilerLink, obj.firstChild);
			var pseudodummy= obj.innerHTML;
		}
	}
}
function ToggleClasses(Toggle)
{
	var SpoilerLink= document.getElementById(Toggle);
	if (!SpoilerLink) {
		return false;
	}
	// Funktionsaufruf Toggler ein-ausblenden
	Toggle = Toggle.split(' ');
	ToogleTag(Toggle,'div');
	ToogleTag(Toggle,'tr');
	ToogleTag(Toggle,'td');
 
	if(Toggle[0] == 'unToggle')
		Toggle[0] = 'toToggle';
	else
		Toggle[0] = 'unToggle';
 
	// Funktionsaufruf um die Clicker zu ändern
	TogglerClicker(Toggle);
}
function ToogleTag(Toggle,Tag)
{
	for(var i=0; i < document.getElementsByTagName(Tag).length; i++)
	{
		var obj= document.getElementsByTagName(Tag)[i];
		var elemClasses = obj.className.split(' ');
 
		for(var j=1; j < Toggle.length; j++)
		{
			if(elemClasses[1] != Toggle[1])
				break;
			if(typeof elemClasses[j] == 'undefined')
			{
				elemClasses[0] = 'unToggle';
				break;
			}
			if(elemClasses[j] == Toggle[j] && elemClasses.length <= Toggle.length)
				elemClasses[0] = Toggle[0];
			else
			{
				elemClasses[0] = 'toToggle';
				break;
			}
		}
		obj.className = elemClasses.join(' ');
	}
}
function TogglerClicker(Toggle)
{
	var SpoilerLink;
	for(var i=0; i < document.getElementsByTagName("span").length; i++)
	{
		var elemClasses = document.getElementsByTagName("span")[i].className.split(' ');
		if(elemClasses[0] == 'toToggle' || elemClasses[0] == 'unToggle')
		{
			SpoilerLink= document.getElementById(elemClasses.join(' '));
 
			if(SpoilerLink == null)
			{
				if(elemClasses[0] == 'unToggle')
					elemClasses[0] = 'toToggle'
				else
					elemClasses[0] = 'unToggle'
				SpoilerLink= document.getElementById(elemClasses.join(' '));
			}
 
			for(var j=1; j < Toggle.length; j++)
			{
				if(elemClasses[1] != Toggle[1])
					break;
				if(typeof elemClasses[j] == 'undefined')
				{
					elemClasses[0] = Toggle[0];
					break;
				}
				if(elemClasses[j] == Toggle[j] && elemClasses.length <= Toggle.length)
					elemClasses[0] = Toggle[0];
				else
				{
					elemClasses[0] = 'unToggle';
					break;
				}
			}
			if(SpoilerLink.innerHTML == 'Anzeigen' && elemClasses[0] == 'toToggle')
				SpoilerLink.innerHTML = 'Verbergen'
			else if(SpoilerLink.innerHTML == 'Verbergen' && elemClasses[0] == 'unToggle')
				SpoilerLink.innerHTML = 'Anzeigen'
			else;
			SpoilerLink.setAttribute('class', elemClasses.join(' '));
			SpoilerLink.setAttribute('id', elemClasses.join(' '));
			SpoilerLink.setAttribute('href', "javascript:ToggleClasses('" + elemClasses.join(' ') + "');");
		}
	}
}
 
 
addOnloadHook(createToggle);
 
// Für wusstest du dass...
function DidYouKnow()
{
	var obj;
	var a = new Array();
 
	for(var i=0; i < document.getElementsByTagName("div").length; i++)
	{
		obj= document.getElementsByTagName("div")[i];
		if(obj.className == 'DidYouKnow')
		{
			a[i]= obj;
		}
	}
	var i=4;
	var j;
	if(0 < a.length)
	{
		do
		{
			j= Math.round(Math.random()*(a.length-1));
			if(a[j] != null)
			{
				if(a[j].className != null)
				{
					if(a[j].className == 'DidYouKnow')
					{
						a[j].className= 'iKnow';
						i--;
					}
				}
			}
		}
		while(i != 0);
	}
}
addOnloadHook(DidYouKnow);
 
/* Logo ändern (test) */
function changeStart()
{
	var foo = document.getElementById('p-logo');
	if(foo == null)
	{
		return false;
	}
	foo.style.background="url('https://images.wikia.nocookie.net/narutofantasyrpg/de/images/4/40/Rpg.png') no-repeat left top";
	foo.style.display="inline";
 
}
addOnloadHook(changeStart); 



//-------------------------------------------------------------------------------------
//Fügt Vorlage:Dateiinfo auf Spezial:Hochladen ein....Zum Testen
//Übernommen aus der MediaWiki:Common.js der http://www.jedipedia.net/wiki/ und auf die hiesige Dateivorlage angepasst  - by [[Benutzer:Pain88]]

function setSpecialUploadTemplate() {
  if (wgPageName=="Spezial:Hochladen") {
    var editbox=document.getElementById("wpUploadDescription");
    if (editbox.value == '') {
      editbox.value = "{"+"{Dateiinfo\n"
                 + "|Beschreibung=\n"
                 + "|Datum=\n"
                 + "|Autor=\n"
                 + "|Quelle=\n"
                 + "|Lizenz=\n"
                 + "|Sonstiges=\n"
                 + "}"+"}";
    }
  }
} 
addOnloadHook(setSpecialUploadTemplate);

hookEvent( 'load', function() {
//currentFocused ist eine Variable von [[MediaWiki:Edittools]], siehe /w/skins/common/edit.js
currentFocused=document.getElementById("wpUploadDescription");
});
 
// </pre>



//================================================================================
//*** Dynamic Navigation Bars for Monaco, Oasis (New Wikia), Adjura, Final Fantasy, Vector, MonoBook and default skins of MediaWiki
//*** Script written by Tim Weyer (SVG) <svg@tim-weyer.org> and others
 
var navbarsDone;
 
// set up the words in your language
var NavigationBarHide = 'einklappen';
var NavigationBarShow = 'ausklappen';
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
if (typeof NavigationBarShowDefault == 'undefined' ) {
    var NavigationBarShowDefault = 0;
}
 
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
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
   if (navbarsDone) return;
   var indexNavigationBar = 0;
   // iterate over all < div >-elements
   var divs = document.getElementsByTagName("div");
   for (var i=0;  i<divs.length; i++) {
       var NavFrame = divs[i];
       // if found a navigation bar
       if (NavFrame.className == "NavFrame" || NavFrame.className == "NavFrame shown" || NavFrame.className == "NavFrame hidden") {
 
           indexNavigationBar++;
           var NavToggle = document.createElement("a");
           NavToggle.className = 'NavToggle';
           NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
           NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
           var NavToggleText = document.createTextNode(NavigationBarHide);
           NavToggle.appendChild(NavToggleText);
 
           // add NavToggle-Button as first div-element 
           // in < div class="NavFrame" >
           NavFrame.insertBefore(
               NavToggle,
               NavFrame.firstChild
           );
           NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
if (NavFrame.className == "NavFrame hidden") toggleNavigationBar(indexNavigationBar);
       }
   }
   // if more Navigation Bars found than Default: hide all
   if (NavigationBarShowDefault < indexNavigationBar) {
       for(
               var i=1; 
               i<=indexNavigationBar; 
               i++
       ) {
           var NavFrame = document.getElementById("NavFrame" + i);
           if (NavFrame.className == "NavFrame") toggleNavigationBar(i);
       }
   }
  navbarsDone = true;
}
 
addOnloadHook(createNavigationBarToggleButton);
 
// **************************************************
//  - end -  Dynamic Navigation Bars
// **************************************************
//


/*
 
 
==================================================
  $Id: tabber.js,v 1.9 2006/04/27 20:51:51 pat Exp $
  tabber.js by Patrick Fitzgerald pat@barelyfitz.com
 
  Documentation can be found at the following URL:
  http://www.barelyfitz.com/projects/tabber/
 
  License (http://www.opensource.org/licenses/mit-license.php)
 
  Copyright (c) 2006 Patrick Fitzgerald
 
  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:
 
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
 
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  ==================================================*/
 
function tabberObj(argsObj)
{
  var arg; /* name of an argument to override */
 
  /* Element for the main tabber div. If you supply this in argsObj,
     then the init() method will be called.
  */
  this.div = null;
 
  /* Class of the main tabber div */
  this.classMain = "tabber";
 
  /* Rename classMain to classMainLive after tabifying
     (so a different style can be applied)
  */
  this.classMainLive = "tabberlive";
 
  /* Class of each DIV that contains a tab */
  this.classTab = "tabbertab";
 
  /* Class to indicate which tab should be active on startup */
  this.classTabDefault = "tabbertabdefault";
 
  /* Class for the navigation UL */
  this.classNav = "tabbernav";
 
  /* When a tab is to be hidden, instead of setting display='none', we
     set the class of the div to classTabHide. In your screen
     stylesheet you should set classTabHide to display:none.  In your
     print stylesheet you should set display:block to ensure that all
     the information is printed.
  */
  this.classTabHide = "tabbertabhide";
 
  /* Class to set the navigation LI when the tab is active, so you can
     use a different style on the active tab.
  */
  this.classNavActive = "tabberactive";
 
  /* Elements that might contain the title for the tab, only used if a
     title is not specified in the TITLE attribute of DIV classTab.
  */
  this.titleElements = ['h2','h3','h4','h5','h6'];
 
  /* Should we strip out the HTML from the innerHTML of the title elements?
     This should usually be true.
  */
  this.titleElementsStripHTML = false;
 
  /* If the user specified the tab names using a TITLE attribute on
     the DIV, then the browser will display a tooltip whenever the
     mouse is over the DIV. To prevent this tooltip, we can remove the
     TITLE attribute after getting the tab name.
  */
  this.removeTitle = true;
 
  /* If you want to add an id to each link set this to true */
  this.addLinkId = false;
 
  /* If addIds==true, then you can set a format for the ids.
     <tabberid> will be replaced with the id of the main tabber div.
     <tabnumberzero> will be replaced with the tab number
       (tab numbers starting at zero)
     <tabnumberone> will be replaced with the tab number
       (tab numbers starting at one)
     <tabtitle> will be replaced by the tab title
       (with all non-alphanumeric characters removed)
   */
  this.linkIdFormat = '<tabberid>nav<tabnumberone>';
 
  /* You can override the defaults listed above by passing in an object:
     var mytab = new tabber({property:value,property:value});
  */
  for (arg in argsObj) { this[arg] = argsObj[arg]; }
 
  /* Create regular expressions for the class names; Note: if you
     change the class names after a new object is created you must
     also change these regular expressions.
  */
  this.REclassMain = new RegExp('\\b' + this.classMain + '\\b', 'gi');
  this.REclassMainLive = new RegExp('\\b' + this.classMainLive + '\\b', 'gi');
  this.REclassTab = new RegExp('\\b' + this.classTab + '\\b', 'gi');
  this.REclassTabDefault = new RegExp('\\b' + this.classTabDefault + '\\b', 'gi');
  this.REclassTabHide = new RegExp('\\b' + this.classTabHide + '\\b', 'gi');
 
  /* Array of objects holding info about each tab */
  this.tabs = new Array();
 
  /* If the main tabber div was specified, call init() now */
  if (this.div) {
 
    this.init(this.div);
 
    /* We don't need the main div anymore, and to prevent a memory leak
       in IE, we must remove the circular reference between the div
       and the tabber object. */
    this.div = null;
  }
}
 
 
/*--------------------------------------------------
  Methods for tabberObj
  --------------------------------------------------*/
 
 
tabberObj.prototype.init = function(e)
{
  /* Set up the tabber interface.
 
     e = element (the main containing div)
 
     Example:
     init(document.getElementById('mytabberdiv'))
   */
 
  var
  childNodes, /* child nodes of the tabber div */
  i, i2, /* loop indices */
  t, /* object to store info about a single tab */
  defaultTab=0, /* which tab to select by default */
  DOM_ul, /* tabbernav list */
  DOM_li, /* tabbernav list item */
  DOM_a, /* tabbernav link */
  aId, /* A unique id for DOM_a */
  headingElement; /* searching for text to use in the tab */
 
  /* Verify that the browser supports DOM scripting */
  if (!document.getElementsByTagName) { return false; }
 
  /* If the main DIV has an ID then save it. */
  if (e.id) {
    this.id = e.id;
  }
 
  /* Clear the tabs array (but it should normally be empty) */
  this.tabs.length = 0;
 
  /* Loop through an array of all the child nodes within our tabber element. */
  childNodes = e.childNodes;
  for(i=0; i < childNodes.length; i++) {
 
    /* Find the nodes where class="tabbertab" */
    if(childNodes[i].className &&
       childNodes[i].className.match(this.REclassTab)) {
 
      /* Create a new object to save info about this tab */
      t = new Object();
 
      /* Save a pointer to the div for this tab */
      t.div = childNodes[i];
 
      /* Add the new object to the array of tabs */
      this.tabs[this.tabs.length] = t;
 
      /* If the class name contains classTabDefault,
	 then select this tab by default.
      */
      if (childNodes[i].className.match(this.REclassTabDefault)) {
	defaultTab = this.tabs.length-1;
      }
    }
  }
 
  /* Create a new UL list to hold the tab headings */
  DOM_ul = document.createElement("ul");
  DOM_ul.className = this.classNav;
 
  /* Loop through each tab we found */
  for (i=0; i < this.tabs.length; i++) {
 
    t = this.tabs[i];
 
    /* Get the label to use for this tab:
       From the title attribute on the DIV,
       Or from one of the this.titleElements[] elements,
       Or use an automatically generated number.
     */
    t.headingText = t.div.title;
 
    /* Remove the title attribute to prevent a tooltip from appearing */
    if (this.removeTitle) { t.div.title = ''; }
 
    if (!t.headingText) {
 
      /* Title was not defined in the title of the DIV,
	 So try to get the title from an element within the DIV.
	 Go through the list of elements in this.titleElements
	 (typically heading elements ['h2','h3','h4'])
      */
      for (i2=0; i2<this.titleElements.length; i2++) {
	headingElement = t.div.getElementsByTagName(this.titleElements[i2])[0];
	if (headingElement) {
	  t.headingText = headingElement.innerHTML;
	  if (this.titleElementsStripHTML) {
	    t.headingText.replace(/<br>/gi," ");
	    t.headingText = t.headingText.replace(/<[^>]+>/g,"");
	  }
	  break;
	}
      }
    }
 
    if (!t.headingText) {
      /* Title was not found (or is blank) so automatically generate a
         number for the tab.
      */
      t.headingText = i + 1;
    }
 
    /* Create a list element for the tab */
    DOM_li = document.createElement("li");
 
    /* Save a reference to this list item so we can later change it to
       the "active" class */
    t.li = DOM_li;
 
    /* Create a link to activate the tab */
    DOM_a = document.createElement("a");
    DOM_a.appendChild(document.createTextNode(t.headingText));
    DOM_a.href = "javascript:void(null);";
    DOM_a.title = t.headingText;
    DOM_a.onclick = this.navClick;
 
    /* Add some properties to the link so we can identify which tab
       was clicked. Later the navClick method will need this.
    */
    DOM_a.tabber = this;
    DOM_a.tabberIndex = i;
 
    /* Do we need to add an id to DOM_a? */
    if (this.addLinkId && this.linkIdFormat) {
 
      /* Determine the id name */
      aId = this.linkIdFormat;
      aId = aId.replace(/<tabberid>/gi, this.id);
      aId = aId.replace(/<tabnumberzero>/gi, i);
      aId = aId.replace(/<tabnumberone>/gi, i+1);
      aId = aId.replace(/<tabtitle>/gi, t.headingText.replace(/[^a-zA-Z0-9\-]/gi, ''));
 
      DOM_a.id = aId;
    }
 
    /* Add the link to the list element */
    DOM_li.appendChild(DOM_a);
 
    /* Add the list element to the list */
    DOM_ul.appendChild(DOM_li);
  }
 
  /* Add the UL list to the beginning of the tabber div */
  e.insertBefore(DOM_ul, e.firstChild);
 
  /* Make the tabber div "live" so different CSS can be applied */
  e.className = e.className.replace(this.REclassMain, this.classMainLive);
 
  /* Activate the default tab, and do not call the onclick handler */
  this.tabShow(defaultTab);
 
  /* If the user specified an onLoad function, call it now. */
  if (typeof this.onLoad == 'function') {
    this.onLoad({tabber:this});
  }
 
  return this;
};
 
 
tabberObj.prototype.navClick = function(event)
{
  /* This method should only be called by the onClick event of an <A>
     element, in which case we will determine which tab was clicked by
     examining a property that we previously attached to the <A>
     element.
 
     Since this was triggered from an onClick event, the variable
     "this" refers to the <A> element that triggered the onClick
     event (and not to the tabberObj).
 
     When tabberObj was initialized, we added some extra properties
     to the <A> element, for the purpose of retrieving them now. Get
     the tabberObj object, plus the tab number that was clicked.
  */
 
  var
  rVal, /* Return value from the user onclick function */
  a, /* element that triggered the onclick event */
  self, /* the tabber object */
  tabberIndex, /* index of the tab that triggered the event */
  onClickArgs; /* args to send the onclick function */
 
  a = this;
  if (!a.tabber) { return false; }
 
  self = a.tabber;
  tabberIndex = a.tabberIndex;
 
  /* Remove focus from the link because it looks ugly.
     I don't know if this is a good idea...
  */
  a.blur();
 
  /* If the user specified an onClick function, call it now.
     If the function returns false then do not continue.
  */
  if (typeof self.onClick == 'function') {
 
    onClickArgs = {'tabber':self, 'index':tabberIndex, 'event':event};
 
    /* IE uses a different way to access the event object */
    if (!event) { onClickArgs.event = window.event; }
 
    rVal = self.onClick(onClickArgs);
    if (rVal === false) { return false; }
  }
 
  self.tabShow(tabberIndex);
 
  return false;
};
 
 
tabberObj.prototype.tabHideAll = function()
{
  var i; /* counter */
 
  /* Hide all tabs and make all navigation links inactive */
  for (i = 0; i < this.tabs.length; i++) {
    this.tabHide(i);
  }
};
 
 
tabberObj.prototype.tabHide = function(tabberIndex)
{
  var div;
 
  if (!this.tabs[tabberIndex]) { return false; }
 
  /* Hide a single tab and make its navigation link inactive */
  div = this.tabs[tabberIndex].div;
 
  /* Hide the tab contents by adding classTabHide to the div */
  if (!div.className.match(this.REclassTabHide)) {
    div.className += ' ' + this.classTabHide;
  }
  this.navClearActive(tabberIndex);
 
  return this;
};
 
 
tabberObj.prototype.tabShow = function(tabberIndex)
{
  /* Show the tabberIndex tab and hide all the other tabs */
 
  var div;
 
  if (!this.tabs[tabberIndex]) { return false; }
 
  /* Hide all the tabs first */
  this.tabHideAll();
 
  /* Get the div that holds this tab */
  div = this.tabs[tabberIndex].div;
 
  /* Remove classTabHide from the div */
  div.className = div.className.replace(this.REclassTabHide, '');
 
  /* Mark this tab navigation link as "active" */
  this.navSetActive(tabberIndex);
 
  /* If the user specified an onTabDisplay function, call it now. */
  if (typeof this.onTabDisplay == 'function') {
    this.onTabDisplay({'tabber':this, 'index':tabberIndex});
  }
 
  return this;
};
 
tabberObj.prototype.navSetActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that only one nav item can be active at a time.
  */
 
  /* Set classNavActive for the navigation list item */
  this.tabs[tabberIndex].li.className = this.classNavActive;
 
  return this;
};
 
 
tabberObj.prototype.navClearActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that one nav should always be active.
  */
 
  /* Remove classNavActive from the navigation list item */
  this.tabs[tabberIndex].li.className = '';
 
  return this;
};
 
 
/*==================================================*/
 
 
function tabberAutomatic(tabberArgs)
{
  /* This function finds all DIV elements in the document where
     class=tabber.classMain, then converts them to use the tabber
     interface.
 
     tabberArgs = an object to send to "new tabber()"
  */
  var
    tempObj, /* Temporary tabber object */
    divs, /* Array of all divs on the page */
    i; /* Loop index */
 
  if (!tabberArgs) { tabberArgs = {}; }
 
  /* Create a tabber object so we can get the value of classMain */
  tempObj = new tabberObj(tabberArgs);
 
  /* Find all DIV elements in the document that have class=tabber */
 
  /* First get an array of all DIV elements and loop through them */
  divs = document.getElementsByTagName("div");
  for (i=0; i < divs.length; i++) {
 
    /* Is this DIV the correct class? */
    if (divs[i].className &&
	divs[i].className.match(tempObj.REclassMain)) {
 
      /* Now tabify the DIV */
      tabberArgs.div = divs[i];
      divs[i].tabber = new tabberObj(tabberArgs);
    }
  }
 
  return this;
}
 
 
/*==================================================*/
 
 
function tabberAutomaticOnLoad(tabberArgs)
{
 
  /* This function adds tabberAutomatic to the window.onload event,
     so it will run after the document has finished loading.
  */
//  var oldOnLoad;
 
  if (!tabberArgs) { tabberArgs = {}; }
 
  /* Taken from: http://simon.incutio.com/archive/2004/05/26/addLoadEvent */
 
  /*oldOnLoad = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = function() {
      tabberAutomatic(tabberArgs);
    };
  } else {
    window.onload = function() {
      oldOnLoad();
      tabberAutomatic(tabberArgs);
    };
  }*/
 
//Use the wiki onload
addOnloadHook(function() {
      tabberAutomatic(tabberArgs);
    })
 
}
 
 
/*==================================================*/
 
 
/* Run tabberAutomaticOnload() unless the "manualStartup" option was specified */
 
if (typeof tabberOptions == 'undefined') {
 
    tabberAutomaticOnLoad();
 
} else {
 
  if (!tabberOptions['manualStartup']) {
    tabberAutomaticOnLoad(tabberOptions);
  }
 
}


//* Für einen späteren Test ('nav.WikiNav > ul > li:nth-child(2) > ul > li > [href="/wiki/Nebenfiguren"]').text('Nebenfiguren'); *//