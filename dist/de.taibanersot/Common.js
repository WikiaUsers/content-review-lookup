/* Any JavaScript here will be loaded for all users on every page load. */
// Edit page tool selector
//  -> modified from http://commons.wikimedia.org/wiki/MediaWiki:Edittools.js

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


function queryString(p) {
  var re = RegExp('[&?]' + p + '=([^&]*)');
  var matches;
  if ((matches = re.exec(document.location))) {
    try { 
      return decodeURI(matches[1]);
    } catch (e) {
    }
  }
  return null;
}

function customCharInsert() {
  if(!window.wgCustomCharInsert||!wgUserName) { return; }
  var spec = document.getElementById('specialchars');
  var userp = document.createElement('p');
  userp.className = 'specialbasic';
  userp.id = 'Custom_Edittools';
  userp.style.display='none';
 
  for (var i=0;i<wgCustomCharInsert.length;i++) {
    var a = document.createElement('a');
    a.href='#';
    a.setAttribute('onclick', 'insertTags("' + wgCustomCharInsert[i].tagOpen + '","' + wgCustomCharInsert[i].tagClose + '","' + wgCustomCharInsert[i].sampleText + '"); return false;');
    a.appendChild(document.createTextNode(wgCustomCharInsert[i].tagOpen + wgCustomCharInsert[i].tagClose));
    userp.appendChild(a);
    if(i!=wgCustomCharInsert.length-1) { userp.appendChild(document.createTextNode(' · ')); }
  }
  spec.appendChild(userp);
}
if(queryString('action')=='edit'||queryString('action')=='submit') { addOnloadHook(customCharInsert); }
 
function edittoolsTabs() {
  var spec = document.getElementById('specialchars');
  if(!spec) { return; }
  var sb = getElementsByClassName(spec,'p','specialbasic');
  if(sb.length<=1) { return; }
 
  var sel = document.createElement('select');
  sel.style.display = 'inline';
  sel.setAttribute('onchange','chooseCharSubset(selectedIndex)');
 
  for(var i=0;i<sb.length;i++) {
    var o = document.createElement('option');
    o.appendChild(document.createTextNode(sb[i].id.replace(/_/g,' ')));
    sel.appendChild(o);
  }
  spec.insertBefore(sel,spec.firstChild.nextSibling);
}
if(queryString('action')=='edit'||queryString('action')=='submit') { addOnloadHook(edittoolsTabs); }
 
function chooseCharSubset(seld) {
 var spec = document.getElementById('specialchars');
 var sb = getElementsByClassName(spec,'p','specialbasic');
 for (var i = 0; i < sb.length ; i++) {
  sb[i].style.display = i == seld ? 'inline' : 'none';
 }
}
 

/* Code for demo widgets */
addWidgets = function() {
   var widgets = getElementsByClassName(document.getElementById('bodyContent'),'div','wikia_widget');
   for(var i = 0; i < widgets.length; i++){
      widgets[i].innerHTML = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='300' height='250' align='middle' id='wikia_widget'><param name='allowScriptAccess' value='always' /><param name='movie' value='https://images.wikia.nocookie.net/common/skins/common/flash_widgets/wikia_widget.swf' /><param name='quality' value='high' /> <param name='wmode' value='transparent' /><embed src='https://images.wikia.nocookie.net/common/skins/common/flash_widgets/wikia_widget.swf' FlashVars='backgroundColor=000000&backgroundImage=&borderColor=92947c&dropShadow=on&headerColor=92947c&headerAlpha=.05&headerBorderColor=000000&headline1=The Vault presents&headline1Color=CCCCCC&headline2=Most Wanted DLC Items&headline2Color=FFFFFF&clickURL=http://fallout.wikia.com&wikiURLColor=FFFFFF&wikiaLogoColor=FFFFFF&type=slideshow&slideshowImages=https://images.wikia.nocookie.net/fallout/images/8/8b/Widget_Auto-Axe.png,https://images.wikia.nocookie.net/fallout/images/f/ff/Widget_Gauss-Rifle.png,https://images.wikia.nocookie.net/fallout/images/6/6f/Widget_WidPower-Armor.png,https://images.wikia.nocookie.net/fallout/images/1/1c/Get_Shock-Sword.png&=Preview images in the widget&' quality='high' wmode='transparent' width='300' height='250' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' name='wikia_widget' /></object>";
   }
};

addOnloadHook(addWidgets);
/* End of code for demo widgets */


/* Force Preview  JavaScript code - Start */
// Code slightly modified from http://www.mediawiki.org/w/index.php?title=Manual:Force_preview&oldid=250009
var permittedGroups = ["sysop", "bureaucrat", "rollback"];
var permittedUsers = ["Kwigon the sharpshooter", "Temahk"];
 
Array.prototype.intersects = function() {
  // --------------------------------------------------------
  //  Returns true if any element in the argument array
  //  is the same as an element in this array
  // --------------------------------------------------------
  if( !arguments.length ){
    return false;
  }
  var array2 = arguments[0];
 
  var len1 = this.length;
  var len2 = array2.length;
  if( len2 === 0 ){
    return false;
  }
 
  for(var i=0; i<len1; i++){
    for(var j=0; j<len2; j++) {
      if( this[i] === array2[j] ) {
        return true;
      }
    }
  }
  return false;
};
 
function forcePreview() 
{
  if( wgAction != "edit") { return; }

  if( wgUserGroups === null) {
    wgUserGroups = [];
  }

  if( wgUserName === null) {
    wgUserName = [];
  }

  var UserName = new Array(1);
  UserName[0] = wgUserName;

  if( (wgUserGroups.intersects(permittedGroups)) || (UserName.intersects(permittedUsers)) ) {
    return;
  }

  var saveButton = document.getElementById("wpSave");
  if( !saveButton ) { return; }
  saveButton.disabled = true;
  saveButton.value = "Save page (use preview first)";
  saveButton.style.fontWeight = "normal";
  document.getElementById("wpPreview").style.fontWeight = "bold";
}
 
addOnloadHook(forcePreview);
/* Force Preview  JavaScript code - End */

/* Code used for Outfiter */
function outfiter_ajax() {
  getXmlHttpRequestObject = function () {
    if (window.XMLHttpRequest) { return new XMLHttpRequest(); }
    else if(window.ActiveXObject) { return new ActiveXObject("Microsoft.XMLHTTP"); }
    alert("Your browser doesn't support the XmlHttpRequest object. Update your browser.");
    return false;
  };
  if (typeof (lootparser_loot_r = getXmlHttpRequestObject()) == 'boolean') { return; }
  lootparser_loot_r.onreadystatechange = function() {
    if (lootparser_loot_r.readyState != 4) { return; }
    var text = lootparser_loot_r.responseText;
    var otext = text;

    text = text.slice(text.search('id="pre_outfiter1">')+19, text.search('</pre>'));
    newscript = document.createElement('style');
    newscript.setAttribute("rel", "stylesheet");
    newscript.setAttribute("type", "text/css");
    document.getElementsByTagName("head")[0].appendChild(newscript);
    newscript.appendChild(document.createTextNode(text));
    text = otext.slice(otext.search('</pre>')+4);
    text = text.slice(text.search('id="pre_outfiter2">')+19, text.search('</pre>'));
    text = text.replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"');
    document.getElementById('outfiter_container').innerHTML = text;

    text = otext.slice(otext.search('</pre>')+4);
    text = text.slice(text.search('</pre>')+4);
    text = text.slice(text.search('id="pre_outfiter3">')+19, text.search('</pre>'));
    text = text.replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"');
    newscript = document.createElement('script');
    newscript.setAttribute("type", "text/javascript");
    newscript.text = text;
    document.getElementById('outfiter_script').appendChild(newscript);
  };
  lootparser_loot_r.open('GET', '/wiki/Outfiter/Code');
  lootparser_loot_r.send(null);
}
/* End of Code used for Outfiter */

/* Hook for Outfiter */
if (wgPageName == 'Outfiter' && (wgAction == 'view' || wgAction == 'submit' || wgAction == 'purge')) {
  addOnloadHook(function() { outfiter_ajax(); });
}
/* End of Hook for Outfiter */

/* Code used for Loot_Statistics */
function lootparser_loot_ajax() {
  getXmlHttpRequestObject = function () {
    if (window.XMLHttpRequest) { return new XMLHttpRequest(); }
    else if(window.ActiveXObject) { return new ActiveXObject("Microsoft.XMLHTTP"); }
    alert("Your browser doesn't support the XmlHttpRequest object. Update your browser.");
    return false;
  };
  if (typeof (lootparser_loot_r = getXmlHttpRequestObject()) == 'boolean') { return; }
  lootparser_loot_r.onreadystatechange = function() {
    if (lootparser_loot_r.readyState != 4) { return; }
    var text = lootparser_loot_r.responseText;
    text = text.slice(text.search('id="pre_lootparser">')+20, text.search('</pre>'));
    text = text.replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"');
    newscript = document.createElement('script');
    newscript.setAttribute("type", "text/javascript");
    newscript.text = text;
    document.getElementById('lootparser_loot_script').appendChild(newscript);
  };
  lootparser_loot_r.open('GET', '/wiki/Loot_Statistics/Lootparserloot');
  lootparser_loot_r.send(null);
}
/* End of Code used for Loot_Statistics */
/* Hook for Loot_Statistics */
if (wgPageName == 'Loot_Statistics' && (wgAction == 'view' || wgAction == 'submit' || wgAction == 'purge')) {
  addOnloadHook(function() { lootparser_loot_ajax(); });
}
/* End of Hook for Loot_Statistics */
/* Code used for NPC Chat Windows */
addOnloadHook(function() {
  var x, y, cont, o = document.getElementsByTagName('div');
  for (x in o) { if (o[x].className == 'npc_chat_div' || o[x].className == 'npc_chat_div_r') {
    cont = o[x].getElementsByTagName('div');
    for (y in cont) { if (cont[y].className == 't3') {
      var lc = document.createElement('a');lc.setAttribute('href','#');lc.innerHTML = 'Collapse';
      lc.onclick = function() {var x,o,t=this;while(t.className!='npc_chat_div'&&t.className!='npc_chat_div_r') {t=t.parentNode;}o=t.getElementsByTagName('tr');for(x in o) {if(o[x].className=='m_tr') {if(o[x].style.display=='none'){o[x].style.display='';this.innerHTML='Collapse';}else{o[x].style.display='none';this.innerHTML='Expand';}}}return false;};
      var lm = document.createElement('span');lm.innerHTML = ' - ';
      var ls = document.createElement('a');ls.setAttribute('href','#');ls.innerHTML = 'Switch Color';
      ls.onclick = function() {var writeCookie = function(data) {var date=new Date();date.setTime(date.getTime()+(365*24*60*60*1000));date=date.toGMTString();document.cookie='npc_transcript_color='+data+';expires='+date+';path=/';};var x,o=document.getElementsByTagName('div');for(x in o){if(o[x].className=='npc_chat_div'){o[x].className='npc_chat_div_r';writeCookie('white');}else if(o[x].className=='npc_chat_div_r'){o[x].className='npc_chat_div';writeCookie('tibia');}}return false;};
      cont[y].appendChild(ls);cont[y].appendChild(lm);cont[y].appendChild(lc);
    } }
  } }
  if (document.cookie.indexOf('npc_transcript_color=white')!=-1) {o=document.getElementsByTagName('div');for(x in o){if(o[x].className=='npc_chat_div'){o[x].className='npc_chat_div_r';}}}
});
/* End of code used for NPC Chat Windows */