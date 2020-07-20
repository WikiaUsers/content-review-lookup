mw.loader.using( [ 'mediawiki.util' ], function() { $( function() {
  var c = document.getElementById('coordinates');
  if (!c) return;
 
  var a = c.getElementsByTagName('a');
  var geohack = false;
  for (var i = 0; i < a.length; i++) {
    var h = a[i].href;
    if (!h.match(/geohack/)) continue;
    if (h.match(/_globe:/)) continue; // no OSM for moon, mars, etc
    geohack = true;
    break;
  }
  if (!geohack) return;
 
  var na = document.createElement('a');
  na.href = '#';
  na.onclick = openStreetMapToggle ;
  na.appendChild(document.createTextNode('Karte'));
  c.appendChild(document.createTextNode(' ('));
  c.appendChild(na);
  c.appendChild(document.createTextNode(')     '));
})});
 
function openStreetMapToggle() {
  var c = document.getElementById('coordinates');
  if (!c) return;
  var cs = document.getElementById('contentSub');
  var osm = document.getElementById('openstreetmap');
 
  if (cs && osm) {
    if (osm.style.display === 'none') {
      osm.style.display = 'block';
    } else {
      osm.style.display = 'none';
    }
    return false;
  }
 
  var found_link = false;
  var a = c.getElementsByTagName('a');
  var h;
  for (var i = 0; i < a.length; i++) {
    h = a[i].href;
    if (!h.match(/geohack/)) continue;
    found_link = true;
    break;
  }
  if (!found_link) return; // No geohack link found
 
  h = h.split('params=')[1];
 
  var iframe = document.createElement('iframe');
  var url = '//toolserver.org/~kolossos/openlayers/kml-on-ol.php?lang=de&uselang=' + mw.util.rawurlencode( mw.config.get( 'wgUserLanguage' ) ) + '&params=' + h + '&title=' + mw.util.wikiUrlencode( mw.config.get( 'wgTitle' ) );
 
  iframe.id = 'openstreetmap';
  iframe.style.width = '100%';
  iframe.style.height = '350px';
  iframe.style.clear = 'both';
  iframe.src = url;
  cs.appendChild(iframe);
  return false;
}

function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
replace.innerHTML='<object width="300" height="360" id="obj_1275223074349"><param name="movie" value="http://Wikis.chatango.com/group"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1275223074349&a=030424&b=100&c=FEF8D2&d=B2B1B1&f=10&g=C0E0FC&i=36&j=FEF8D2&k=FEF8D2&l=000421&m=FEF8D2&n=000421&o=75&r=100&s=1&t=0"/><embed id="emb_1275223074349" src="http://Wikis.chatango.com/group" width="300" height="360" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1275223074349&a=030424&b=100&c=FEF8D2&d=B2B1B1&f=10&g=C0E0FC&i=36&j=FEF8D2&k=FEF8D2&l=000421&m=FEF8D2&n=000421&o=75&r=100&s=1&t=0"></embed></object><br>[ <a href="http://Wikis.chatango.com/clonegroup?ts=1275223074349">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1275223074349">Start New</a> | <a href="http://Wikis.chatango.com">Full Size</a> ]';
  }
}


if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}

function onloadhookcustom() {
  var replace = document.getElementById("JRChatReplace");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=Kongregate" width="450" height="400"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("JRChatReplace").innerHTML);

}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);



 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }


// <pre>
/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
// ================================================================================
// Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }


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
// </pre>

// --------------------------------------------------
//  <TT> News ticker 2.0, by Splarka, better version
// --------------------------------------------------

var ticker;
var tickertxt;
var tickerdiv;

function newsticker() {
  if (document.getElementById) {
  if ((document.getElementById('ticker'))&&(document.getElementById('tickerdiv'))&&(document.getElementById('tickertxt'))) {
    ticker = document.getElementById('ticker'); 
    ticker.style.display = 'block';
    tickerdiv = document.getElementById('tickerdiv');
    tickertxt = document.getElementById('tickertxt').offsetWidth; 
    tickerdiv.style.left = parseInt(ticker.style.width) + 10 + 'px';
    lefttime=setInterval("newstickergo()",200);
  }
  }
}

function newstickergo() {
  tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-10 - tickertxt) ) ? parseInt(tickerdiv.style.left) - 10 + "px" : parseInt(ticker.style.width) + 10 + "px";
} 
addOnloadHook(newsticker);

// --------------------------------------------------
//             End <TT> News ticker 2.0
// --------------------------------------------------