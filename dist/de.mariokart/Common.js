/** Username replace function
 * Inserts user name into 
 * By Splarka
 */
function UserNameReplace() {
  if ( typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace )
    return;
  $('span.insertusername').text(wgUserName);
}
$(UserNameReplace);
 
/* Following snow only have to be activated in winter. */
Link: http://de.mario-kart.wikia.com/wiki/Mario Kart Wiki:Schnee
 
// <pre>
/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */
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
 * Drag and Drop Script: � Dynamic Drive (http://www.dynamicdrive.com)
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
 
// mit den folgenden Funktionen l�sst sich ein div-Konstrukt in ein Einblende-Ausblende-Ding verwandeln
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
 
// Event-Handler f�r alle class="klapp"-Objekte zuweisen
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
 
// Nach dem Laden des Fensters folgendes Ausf�hren:
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
// </pre>
 
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' Sekunden';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' Minuten ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' Stunden ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' Tage ' + left
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// *************************************************
importScript('MediaWiki:Common.js/profileRedesign.js');
importArticles({
   type:'script',
   articles: [
        /*####################################*/
        /*##### Developer's Wiki Imports #####*/
        /*####################################*/
                // Back-To-Top-Button
                'u:dev:BackToTopButton/code.js',
		// Adds "cancel" button in editing screen
	        'w:c:admintools:MediaWiki:Wikia.js/cancelButton.js',
		// Adds "edit count" to user tabs
	        'w:c:rhf:MediaWiki:Wikia.js/editCount.js',
                // DisplayClock
                //'u:dev:DisplayClock/code.js',
                // Display Clock Customization
                'MediaWiki:DisplayClock.js'
	]
});
 
 
EditIntroButtonText = 'Intro bearbeiten';
importArticles({
   type:'script',
   articles: [
        /*####################################*/
        /*##### Developer's Wiki Imports #####*/
        /*####################################*/                
                // Auto-Aktualisierung
                'u:dev:AjaxRC/code.js',
                // EditIntro-Button
                'u:dev:EditIntroButton/code.js',
                // SignatureCheck
                'MediaWiki:Common.js/SignatureCheck.js',
		// YouTubePlayer
                'u:dev:YoutubePlayer/code.js',
                // ExternalImageLoader
                'u:dev:ExternalImageLoader/code.js',
                // ExtendedNavigation
                'u:dev:ExtendedNavigation/code.js',
                // ChatRefresh
                'u:dev:ChatRefresh/code.js',
                // FacebookLikeBox
                'u:dev:FacebookLikeBox/code.js'
	]
});
var ajaxPages = ["Spezial:Letzte_�nderungen", "Spezial:WikiActivity", "Spezial:Logbuch",
                 "Spezial:Beobachtungsliste", "Spezial:Beitr�ge",  
                 "Spezial:Neue_Dateien", "Spezial:Statistik", "Spezial:Neue_Seiten",
                 "Spezial:Dateien", "Spezial:Videos", "Spezial:WikiActivity/watchlist"];
var AjaxRCRefreshText = 'Auto-Aktualisierung';
 
/* DisplayClock Customization */
window.DisplayClockJS = '%2H:%2M:%2S %2d. %B %Y';
 
importArticles({
type: "script",
articles: [
            'MediaWiki:Time.js'
          ]
});