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
 }
 
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
 

 /* Logo ändern (test) */
function changeStart()
{
	var foo = document.getElementById('p-logo');
	if(foo == null)
	{
		return false;
	}
	foo.style.background="url('https://images.wikia.nocookie.net/__cb20110811150907/de.nintendo/images/d/d1/Front_oasis_monobook.png') no-repeat left top";
	foo.style.display="inline";
 
}
addOnloadHook(changeStart); 
 
if (mwCustomEditButtons) {
 
/*** wrappers *****/
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png",
     "speedTip": "Kategorie",
     "tagOpen": "[[Kategorie:",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png",
     "speedTip": "Weiterleitung",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/ac/Button_redir_rtl.png",
     "speedTip": "Neue Zeile",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_delete.png",
     "speedTip": "Löschantrag stellen",
     "tagOpen": "{{löschen|",
     "tagClose": "}}",
     "sampleText": "Grund"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/6/60/Button_support.png",
     "speedTip": "Mit PRO stimmen",
     "tagOpen": "{{PRO",
     "tagClose": "}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/9/98/Button_oppose.png",
     "speedTip": "Mit CONTRA stimmen",
     "tagOpen": "{{CONTRA",
     "tagClose": "}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
     "speedTip": "Gallerie einfügen",
     "tagOpen": "<gallery>",
     "tagClose": "</gallery>",
     "sampleText": "Füge hier deine Bilder ein"};
 
      mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/9/92/Anbeten.png",
     "speedTip": "Anbeten",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812184938/vereins/images/e/ee/Mx1.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/c/cf/Nagelfeile.png",
     "speedTip": "Nagelfeile",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812184602/vereins/images/0/01/Gi30.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/8/8d/HarHarHar.png",
     "speedTip": "HarHar",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812185322/vereins/images/e/ee/Twinkle.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/6/6a/Verlegen.png",
     "speedTip": "Verlegen sein",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812184604/vereins/images/f/f6/Helga.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/5/51/Help_me.png",
     "speedTip": "Zu Hülf",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812184630/vereins/images/a/ad/Help.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/4/48/LOL.png",
     "speedTip": "LOL",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20090812184834/vereins/images/6/6d/Lol1.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/4/4f/Fragezeichen.png",
     "speedTip": "???",
     "tagOpen": "http://upload.wikimedia.org/wikipedia/commons/e/e4/IrritierterSmiley.gif",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/vereins/images/7/75/Zwinkern.png",
     "speedTip": "Zwinkern",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20091006204740/vereins/images/c/c3/Zwinker.png",
     "tagClose": "",
     "sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100519195130/vereins/images/8/83/Kopf.png",
     "speedTip": "Aua",
     "tagOpen": "https://images.wikia.nocookie.net/__cb20100408194335/de/images/7/7e/Kopf_an_die_Wand.gif",
     "tagClose": "",
     "sampleText": ""};
 
}
 
 
/* add contribs to user menu - 2/1/11 */
function UserBeoMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="http://de.community.wikia.com/wiki/Benutzer:'+ encodeURIComponent (wgUserName) +'">Zentral-Account</a></li>');
} 
addOnloadHook(UserBeoMenuItem);
 
/* add contribs to user menu - 2/1/11 */
function UserContribsMenuItem() {
$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Eigene Beiträge</a></li>');
} 
addOnloadHook(UserContribsMenuItem);