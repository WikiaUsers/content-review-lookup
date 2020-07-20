/********************** OnloadHooks **********************/
/* Funzioni generali */
function hooks_common () {
	Script_Import();
	hooks_common_render();
	createPurgeButton();
	return;
}
addOnloadHook(hooks_common);

/* Funzioni del rendering - separate per richiamarle in anteprima rapida */
function hooks_common_render () {
	randomlist();
	createCollapseButtons();
	createNavigationBarToggleButton();
	createToggleLinks();
	createMorphLinks();
	UserNameReplace();
	ref_tooltip();
	alertLink();
	setTimeout(alertLoad, 1);
	alertUnload();
	target_blank();
	hiddencats_IE();
multislide_startup();
multifade_startup();
	return;
}

/* Funzioni dell'editor */
function hooks_common_edit () {
	if (wgAction != 'edit' && wgAction != 'submit') return;
	charinsert_anon_hack();
	return;
}
addOnloadHook(hooks_common_edit);


/********* Funzioni di utilità generale ********/

 /* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();


function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	 }
	return array;
 }

/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};


 function getText (e) {
	 if (e.textContent) return e.textContent;
	  else if (e.innerText) return e.innerText;
	  else return null;
  }
 
 function setText (e, t) {
	 if (e.textContent) e.textContent = t;
	  else if (e.innerText) e.innerText = t;
	  else { e.textContent = t; e.innerText = t; } // entrambi nulli, non si può discriminare
	 return;
  }

 function appendText (e, t) {
	 if (e.textContent) e.textContent += t;
	  else if (e.innerText) e.innerText += t;
	  else { e.textContent = t; e.innerText = t; }
	 return;
  }

/* Crea una request Ajax */
function createRequest () {
	if (window.XMLHttpRequest) { // Mozilla, Safari...
		return new XMLHttpRequest();
	 }
	 else if (window.ActiveXObject) { // IEmmerda
		return new ActiveXObject("Microsoft.XMLHTTP");
	 }
	return
 }

/* Restituisce il valore di un cookie */
function getCookie(name) {
	if (document.cookie.length == 0) return null;
	var start = document.cookie.indexOf(name);
	if (start == -1) return null;
	start += name.length + 1;
	var end = document.cookie.indexOf(';', start);
	if (end == -1) end = document.cookie.length;
	return unescape(document.cookie.substring(start,end));
 }

/* Aggiunge uno zero alle cifre minori di 10 nella rappresentazione testuale */
function addzero(n) {
	if (n<10) return '0' + n.toString();
	 else return n.toString();
 }


/***** Funzioni applicative *****/

/* Importazione script */
function Script_Import () {
/*
Sintassi: import_script(CONDIZIONE, SCRIPT);
Es.: import_script((wgPageName == "Esempio"), "Esempio.js");
*/

import_script((wgPageName == "Speciale:WidgetDashboard"), "Nonciclopedia:Script/Shoutbox.js");
import_script((wgPageName == "Giochi:CasiNonci/Slot_machine") , "Nonciclopedia:Script/SlotMachine.js");

return;
}

function import_script (condition, script) {
   if(!condition) return;
   var scriptElem = document.createElement( 'script' );
   scriptElem.type = 'text/javascript';
   scriptElem.language = 'javascript';
   scriptElem.src = '/index.php?title=' + script + '&action=raw&ctype=text/javascript&smaxage=8400';
   document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
   return;
}


// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 0; // numero massimo di barre visibili
                       // per default al caricamento di una pagina
 var collapseCaption = "nascondi";
 var expandCaption = "vedi";
 
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
         if ( hasClass( Tables[i], "collapsible" ) && !Tables[i].id) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].id = "collapsibleTable" + tableIndex;
 
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

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
  
  
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled

var noNavSlide = false;
function toggleNavigationBar(indexNavigationBar)  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
  
     if (!NavFrame || !NavToggle) {
         return false;
     }
  
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
		 if (!hasClass(NavFrame, 'no-slide') && !noNavSlide) NavSlide(NavFrame, true);
		 else {
			 for (
					 var NavChild = NavFrame.firstChild;
					 NavChild != null;
					 NavChild = NavChild.nextSibling
				 ) {
				 if ( hasClass( NavChild, 'NavPic' ) ) {
					 NavChild.style.display = 'none';
				 }
				 if ( hasClass( NavChild, 'NavContent') ) {
					 NavChild.style.display = 'none';
				 }
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
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
		 if (!hasClass(NavFrame, 'no-slide') && !noNavSlide) NavSlide(NavFrame, false);
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
  
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
  
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
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
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
  
var NavigationBarSlideDelay = 600;
var NavigationBarSlideInterval = 70;
var NavigationBarFadeDelay = 400;
var NavigationBarFadeInterval = 70;

function NavSlide (NavFrame, close) {
/* close = chiusura */
 for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
	if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent') ) Slide(NavChild);
	}
	return;
	
 function Slide (element) {
 	 if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.userAgent[navigator.userAgent.indexOf("MSIE") + 5]) >= 8) return;
	 var fade = !hasClass(NavFrame, 'no-fade');
	 var start_time = new Date().getTime() + NavigationBarFadeDelay * ((close && fade)? 1.1 : 0);
	 var size = element.offsetHeight;
	 var start_value = close? 0: 0 - size;
	 var final_value = close? 0 - size : 0;
	 element.style.marginTop = start_value + 'px';
	 element.style.width = 'auto';
	 if (fade) {
		 if (close) Fade(element, NavigationBarFadeDelay, NavigationBarFadeInterval, true, 0.7);
		  else {
			element.style.filter = "alpha(opacity=0)";
			element.style.opacity = 0;
		  }
	  }
	 setTimeout(function() { Do(); } , NavigationBarSlideInterval + NavigationBarFadeDelay * ((close && fade)? 1.1 : 0));
	 return;
	 
	 function Do() {
		 var cur_time = new Date().getTime();
		 var past_time = cur_time - start_time;
		 if (past_time >= NavigationBarSlideDelay) {
			element.style.marginTop = final_value + 'px';
			if (!close && fade) Fade(element, NavigationBarFadeDelay, NavigationBarFadeInterval, false, 1);
			if (close) element.style.display = 'none';
			return;
		  }
		 var progress = past_time/NavigationBarSlideDelay;
		 var new_value = close? final_value * progress : start_value * (1 - progress);
		 element.style.marginTop = new_value + 'px';
		 setTimeout(function() { Do(); } , NavigationBarSlideInterval);
		 return;
		}
 }
}
 

 /** Codice sostituzione Username ([[template:USERNAME]]) *******************************
  * Inserts user name into <span id="insertusername"></span>
  * By [[wikia:User:Splarka|Splarka]]
  */
 var disableUsernameReplace = false;
 function UserNameReplace() {
	if (disableUsernameReplace) return;
	var list = getElementsByClass(document.getElementsByTagName('body')[0], "insertusername", 'span');
	if (list.length < 1) return;
	if (wgUserName) {
		for (var i=0; UserName = list[i]; i++) {
			setText(UserName, wgUserName);
		 }
		return;
	 }
	var defaultText = "<tuo nome>";
	var userpage = document.getElementById("pt-anonuserpage");
	if (userpage != null) {
		var IP = getText(userpage.getElementsByTagName('a')[0]);
		if (IP == null) return;
		for (var i=0; UserName = list[i]; i++) {
			if (getText(UserName) == defaultText)
				setText(UserName, IP);
		 }
		return;
	 }
	var httpRequest;
	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
	    httpRequest = new XMLHttpRequest();
	 } else if (window.ActiveXObject) { // IE
	    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	 }
	var id = setTimeout(function() { httpRequest.abort();}, 30000);
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState != 4) return;
		clearTimeout(id);
		if (httpRequest.status != 200) return;
		if (httpRequest.responseXML == null)  return;
		var IP = httpRequest.responseXML.getElementsByTagName('userinfo')[0].getAttribute("name");
		if (IP == null) return;
		for (var i=0; UserName = list[i]; i++) {
			if (getText(UserName) == defaultText)
				setText(UserName, IP);
		 }
		return;
	 }
	httpRequest.open('GET', wgServer + wgScriptPath + "/api.php?action=query&meta=userinfo&format=xml", true);
	httpRequest.send('');
	return;
 }



/* Generatori di alert */

/* Carica un alert su un link prima di caricare la nuova pagina, oppure su un link "fasullo", senza caricare nessuna nuova pagina*/
function alertLink() {
 for(var i=0; Elem = document.getElementsByTagName("span")[i]; i++) {
  if((Elem.getAttribute('id') == "alert-link") || (Elem.getAttribute('id') == "alert-nolink")) {
   var Link = Elem.firstChild;
   var Testo = Elem.title;
   Link.setAttribute('onclick', 'alert("' + Testo + '");');
   if(Elem.getAttribute('id') == "alert-nolink") {
    Link.removeAttribute('href',0);
   }
  }
 }
}

/* Carica uno o più alert al caricamento della pagina */
var disablealertLoad = 0;
function alertLoad() {
 if (disablealertLoad) return;
 for(var i=0; Elem = document.getElementsByTagName("span")[i]; i++) {
  if(Elem.getAttribute('id') == "alert-load") {
   var Testo = Elem.innerText || Elem.textContent;
   alert(Testo);
  }
 }
}


/* Carica uno o più alert all'uscita dalla pagina */
function alertUnload() {
 if (disablealertLoad) return;
 for(var i=0; Elem = document.getElementsByTagName("span")[i]; i++) {
  if(Elem.getAttribute('id') == "alert-unload") {
   var Testo = Elem.innerText || Elem.textContent;
   var temp = document.getElementsByTagName("body")[0].getAttribute('onUnload');
   if (temp) document.getElementsByTagName("body")[0].setAttribute('onUnload', temp + 'alert("' + Testo + '");');
    else document.getElementsByTagName("body")[0].setAttribute('onUnload', 'alert("' + Testo + '");');
  }
 }
}


/* Elenchi random */
function randomlist () {
 var Div;
 for(var I=0; Div = document.getElementById("bodyContent").getElementsByTagName("div")[I]; I++) {
  if(Div.id == "randomlist") {
   var List = new Array();
   var i=0;
   var max = parseInt(Div.title);
   do { Div1 = Div.getElementsByTagName('div')[i]; i++;} while (Div1.id != "randomcontent");
   for( i=0; Div1.getElementsByTagName('li')[i]; i++) {
    List[i] = Div1.getElementsByTagName('li')[i].innerHTML;
    }
   do { Text = Div.getElementsByTagName('*')[i]; i++;} while (Text.id != "randomtext");
   if (!Text) return;
   var Format = Text.cloneNode(true);
   Text.innerHTML = '';
   N = new Array();
   var Item;
   for (i=0; i < max; i++) {
    do {
     n = Math.round(Math.random() * (List.length - 1));
     for (ii = 0; ii < i && n != -1; ii++) {
      if (N[ii] == n)
       n = -1;
      }
     } while (n == -1)
    N[i] = n;
    Item = Format.cloneNode(true);
    Item.innerHTML = Item.innerHTML.replace(/\.\.\./,List[n]);
    Text.appendChild(Item);
    }
   }
  }
 }



/* Hook that enables collapsing objects.
 * Added 11/5/2007 by WhiteMystery (misterioblanco@gmail.com) 
 * on Encyclopedia Dramatica, stolen by Zaza
 * Improved with multiMorph and galleryMorph by MFH
 * Enhanced with fading effect by Sanjilops
 * Uses publicly available code in one function, where noted. */

var noMorphSFX = false;

var galleryCounter = 0; /* Needed for galleryMorph */

/* Function that toggles collapsing objects.
 * Added 11/5/2007 by WhiteMystery (misterioblanco@gmail.com) 
 * on Encyclopedia Dramatica, stolen by Zaza
 * Uses publicly available code in one function, where noted. */

function tableOrNot(objId) {
	
	if (document.getElementById(objId).tagName == "TABLE") return "table";
	else return "block";
}

var toggleLinkDelay = 700;
var toggleLinkInterval = 10;

function toggleCollapse(objToToggle) {
	var objToToggle = this.parentNode.id.replace(/Link$/, '');

	var linkText = "";
	var targetObject = returnObjById(objToToggle);
	if (!targetObject) return;
	var collapseText = returnObjById(objToToggle + "CollapseText").innerHTML;
	var expandText = returnObjById(objToToggle + "ExpandText").innerHTML;
	var slide = !hasClass(returnObjById(objToToggle + "Link"), "no-slide") && !noMorphSFX;
	var fade = !hasClass(returnObjById(objToToggle + "Link"), 'no-fade') && !noMorphSFX;
	if ( targetObject.style.display == "none" ) {
		targetObject.style.display = tableOrNot(objToToggle);
		linkText = collapseText;
		if (slide) Slide(targetObject, false);
		if (fade) {
			if (!parseInt(targetObject.style.width) && navigator.appName == "Microsoft Internet Explorer") targetObject.style.width = targetObject.offsetWidth + 'px';
			targetObject.style.filter = "alpha(opacity=0)";
			targetObject.style.opacity = 0;
			setTimeout(function () {Fade(targetObject, toggleLinkDelay, toggleLinkInterval, false, 1);}, 1);
		 }
	 }
		
	else {
		if (slide) {
			Slide(targetObject, true);
			setTimeout(function() {	targetObject.style.display = "none"; }, toggleLinkDelay + toggleLinkInterval);
			if (fade) setTimeout(function () {Fade(targetObject, toggleLinkDelay, toggleLinkInterval, true, 0.8);}, 1);
		 }
		 else {
			if (fade) {
				setTimeout(function () {Fade(targetObject, toggleLinkDelay, toggleLinkInterval, true, 0.8);}, 1);
				setTimeout(function () {targetObject.style.display = "none"; }, toggleLinkDelay + toggleLinkInterval);
			 }
			 else targetObject.style.display = "none";
		 }
		linkText = expandText;
	}
	
	var toggleLink = returnObjById(objToToggle + "Link-");
	toggleLink.innerHTML = linkText;
	
	
 function Slide (element, close) {
 	 if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.userAgent[navigator.userAgent.indexOf("MSIE") + 5]) >= 8) return;
	 var start_time = new Date().getTime();
	 var size = element.offsetHeight;
	 var start_value = close? 0: 0 - size;
	 var final_value = close? 0 - size : 0;
	 element.style.marginTop = start_value + 'px';
	 element.style.width = 'auto';
	 setTimeout(function() { Do(); } , toggleLinkInterval);
	 return;
	 
	 function Do() {
		 var cur_time = new Date().getTime();
		 var past_time = cur_time - start_time;
		 if (past_time >= NavigationBarSlideDelay) {
			element.style.marginTop = final_value + 'px';
			return;
		  }
		 var progress = past_time/toggleLinkDelay;
		 var new_value = close? final_value * progress : start_value * (1 - progress);
		 element.style.marginTop = new_value + 'px';
		 setTimeout(function() { Do(); } , toggleLinkInterval);
		 return;
		}
 }
}

function createToggleLinks() {

	var toggleLinkCollection = document.getElementsByClass("toggleLink");
	
	for (var i = 0; i < toggleLinkCollection.length; i++) {
		var spanID = toggleLinkCollection[i].getAttribute("id");
		var targetID = spanID.substr(0, spanID.length - 4);
		var collapseText = returnObjById(targetID + "CollapseText").innerHTML;
		var expandText = returnObjById(targetID + "ExpandText").innerHTML;
		var initialState = returnObjById(targetID + "InitialState").innerHTML;
		
		var toggleLink = document.createElement("a");
		toggleLinkCollection[i].appendChild(toggleLink);
		
		if (initialState == "0") {
			
			returnObjById(targetID).style.display = "none";
			toggleLink.innerHTML = expandText;
		}
		
		else {
			
			returnObjById(targetID).style.display = tableOrNot(targetID);
			toggleLink.innerHTML = collapseText;
		}
		
		toggleLink.onclick = toggleCollapse;

		//toggleLink.className = "morphLink";
		toggleLink.id = targetID + "Link-";
		
	}
}



/* Functions that performs the morph operation.
 * Added 11/5/2007 by WhiteMystery (misterioblanco@gmail.com) 
 * on Encyclopedia Dramatica, stolen by Zaza
 * Uses publicly available code in one function, where noted. */

 var MorphFadeDelay = 800;
 var MorphFadeInterval = 50;

function performMorph(targetID, targetNumber) {
	
	var counter = 1;
	
	while ( returnObjById(targetID + "Content" + counter) ) {
	
		if ( counter == targetNumber ) {
			if (!noMorphSFX) {
			if (hasClass(returnObjById(targetID + "Master"), 'slide')) $('#' + targetID + "Content" + counter).slideDown(toggleLinkDelay);
			if (hasClass(returnObjById(targetID + "Master"), 'slide-fade')) {
			returnObjById(targetID + "Master").style.filter = "alpha(opacity=0)";
			returnObjById(targetID + "Master").style.opacity = 0;
$('#' + targetID + "Content" + counter).slideDown(toggleLinkDelay).fadeIn(MorphFadeDelay);
}
			if (!hasClass(returnObjById(targetID + "Master"), 'no-fade')) $('#' + targetID + "Content" + counter).fadeIn(MorphFadeDelay);
			 }
			else returnObjById(targetID + "Content" + counter).style.display = tableOrNot(targetID + "Content" + counter);
			}
		else  returnObjById(targetID + "Content" + counter).style.display = "none";
			
		counter++;
	}
	
	returnObjById(targetID + "Master").innerHTML = targetNumber;
}


function morphForward() {

	var targetID = this.getAttribute('name').replace(/LinkNext$/, '');
	var nextPane = parseInt(returnObjById(targetID + "Master").innerHTML) + 1;
	
	if ( returnObjById(targetID + "Content" + nextPane) )
		performMorph(targetID, nextPane);
		
	else
		performMorph(targetID, "1");
}

function morphBackward() {

	var targetID = this.getAttribute('name').replace(/LinkPrev$/, '');
	var prevPane = parseInt(returnObjById(targetID + "Master").innerHTML) - 1;
	
	if ( prevPane > 0 )
		performMorph(targetID, prevPane);
		
	else {
	
		var maxIndex = 1;
		
		while ( returnObjById(targetID + "Content" + maxIndex) )
			maxIndex++;
		
		performMorph(targetID, maxIndex - 1);
	}
}

/* Special functions for the galleryMorph,
 * created by MFH */

function performGalleryMorph(targetID, targetNumber) {

	var counter = 1;
	
	while ( returnObjById(targetID + "Content" + counter) ) {
	
		if ( counter == targetNumber ) {
			returnObjById(targetID + "Content" + counter).style.display = tableOrNot(targetID + "Content" + counter);
			if (!hasClass(returnObjById(targetID + "Master"), 'no-fade') && !noMorphSFX) Fade(returnObjById(targetID + "Content" + counter), MorphFadeDelay, MorphFadeInterval, false, 1);
		 }
		else
			returnObjById(targetID + "Content" + counter).style.display = "none";
			
		counter++;
	}
	
	if (targetNumber == 1) {
		returnObjById(targetID + "LinkPrev").style.display = "none";
	}
	else {
		returnObjById(targetID + "LinkPrev").style.display = tableOrNot(targetID + "LinkPrev");
	}
	
	if (targetNumber == counter - 1) {
		returnObjById(targetID + "LinkNext").style.display = "none";
	}
	else {
		returnObjById(targetID + "LinkNext").style.display = tableOrNot(targetID + "LinkNext");
	}
	
	returnObjById(targetID + "Counter").innerHTML = "(" + targetNumber + "/" + galleryCounter + ")";
	returnObjById(targetID + "Master").innerHTML = targetNumber;
}

function galleryMorphForward() {

	var targetID = this.getAttribute('name').replace(/LinkNext$/, '');
	var nextPane = parseInt(returnObjById(targetID + "Master").innerHTML) + 1;
	
	if ( returnObjById(targetID + "Content" + nextPane) )
		performGalleryMorph(targetID, nextPane);
		
	else
		performGalleryMorph(targetID, "1");
}

function galleryMorphBackward() {
	var targetID = this.getAttribute('name').replace(/LinkPrev$/, '');
	var prevPane = parseInt(returnObjById(targetID + "Master").innerHTML) - 1;
	
	if ( prevPane > 0 )
		performGalleryMorph(targetID, prevPane);
		
	else {
	
		var maxIndex = 1;
		
		while ( returnObjById(targetID + "Content" + maxIndex) )
			maxIndex++;
		
		performGalleryMorph(targetID, maxIndex - 1);
	}
}

/* Function that creates ED's collapsing objects and toggle links.
 * Added 11/5/2007 by WhiteMystery (misterioblanco@gmail.com) 
 * on Encyclopedia Dramatica, stolen by Zaza
 * Uses publicly available code in one function, where noted.
 *
 * Updated: 1/11/2008 by WhiteMystery to add new Morphing Objects
 * functionality.
 * Updated: 23/5/2009 by MFH to add 2 new kinds of morph:
 * multiMorph and galleryMorph */

function createMorphLinks () {

	var morphMasterCollection = document.getElementsByClass("morphMaster");
	var multiMorphMasterCollection = document.getElementsByClass("multiMorphMaster");
	var galleryMorphMasterCollection = document.getElementsByClass("galleryMorphMaster");
	
	for (var i = 0; i < morphMasterCollection.length; i++) {
		
		var spanID = morphMasterCollection[i].getAttribute("id");
		var targetID = spanID.substr(0, spanID.length - 6);
		var counter = 1;
		
		// Create forward and backward paging if the paging elements exist
		if ( returnObjById(targetID + "LinkNext") && returnObjById(targetID + "LinkPrev") && returnObjById(targetID + "Content1") ) {
		
			// Create the forward link
			var nextLink = document.createElement("div");	
			nextLink.innerHTML = returnObjById(targetID + "LinkNext").innerHTML;
			nextLink.setAttribute('name', targetID + "LinkNext");
			nextLink.onclick = morphForward;
			nextLink.className = "morphLink";
			
			returnObjById(targetID + "LinkNext").innerHTML = "";
			returnObjById(targetID + "LinkNext").appendChild(nextLink, 0);
			
			// Create the backward link
			var prevLink = document.createElement("div");	
			prevLink.innerHTML = returnObjById(targetID + "LinkPrev").innerHTML;
			prevLink.setAttribute('name', targetID + "LinkPrev");
			prevLink.onclick = morphBackward;
			prevLink.className = "morphLink";
			
			returnObjById(targetID + "LinkPrev").innerHTML = "";
			returnObjById(targetID + "LinkPrev").appendChild(prevLink, 0);
			
			// Initialize content panes
			while ( returnObjById(targetID + "Content" + counter) ) {
				
				if ( counter == 1 )
					returnObjById(targetID + "Content" + counter).style.display = tableOrNot(targetID + "Content" + counter);
				else
					returnObjById(targetID + "Content" + counter).style.display = "none";
					
				counter++;
			}	
		}

		counter = 1;
		
		// Whether or not there is paging, generate normal links				
		while (returnObjById(targetID + "Link" + counter) && returnObjById(targetID + "Content" + counter)) {
			
			var morphLink = document.createElement("div");
			morphLink.innerHTML = returnObjById(targetID + "Link" + counter).innerHTML;			
			returnObjById(targetID + "Link" + counter).innerHTML = "";
			returnObjById(targetID + "Link" + counter).appendChild(morphLink);
			morphLink.className = "morphLink";
			morphLink.setAttribute('name', targetID + "Link" + counter);
			morphLink.onclick = function () {
					var targetID = this.getAttribute('name').replace(/Link\d+$/, '');
					var targetNumber = this.parentNode.id.replace(/.+Link/, '');
					performMorph(targetID, targetNumber);
					return
				 };
			
			// Initialize content panes
			if (counter == 1)
				returnObjById(targetID + "Content" + counter).style.display = tableOrNot(targetID + "Content" + counter);
			else
				returnObjById(targetID + "Content" + counter).style.display = "none";
				
			counter++;
		}
		
		morphMasterCollection[i].innerHTML = "1";
		morphMasterCollection[i].style.display = "none";
	}

	for (var i = 0; i < multiMorphMasterCollection.length; i++) {
		
		var spanID = multiMorphMasterCollection[i].getAttribute("id");
		var targetID = spanID.substr(0, spanID.length - 6);
		var counter = 1;
		
		// Create forward and backward paging if the paging elements exist
		if (document.getElementsByClass(targetID + "LinkNext") && document.getElementsByClass(targetID + "LinkPrev") && document.getElementsByClass(targetID + "Content1")) {
		
			// Create the forward link
			var nextLinkCollection = document.getElementsByClass(targetID + "LinkNext");
			for (j = 0; j < nextLinkCollection.length; j++) {
				var nextLink = document.createElement("div");
				nextLink.innerHTML = nextLinkCollection[j].innerHTML;
				nextLink.setAttribute('name', targetID + "LinkNext");
				nextLink.onclick = morphForward;
				nextLink.className = "morphLink";
				
				nextLinkCollection[j].innerHTML = "";
				nextLinkCollection[j].appendChild(nextLink, 0);
			}
			
			// Create the backward link
			var prevLinkCollection = document.getElementsByClass(targetID + "LinkPrev");
			for (j = 0; j < prevLinkCollection.length; j++) {
				var prevLink = document.createElement("div");
				prevLink.innerHTML = prevLinkCollection[j].innerHTML;
				prevLink.setAttribute('name', targetID + "LinkPrev");
				prevLink.onclick = morphBackward;
				prevLink.className = "morphLink";
				
				prevLinkCollection[j].innerHTML = "";
				prevLinkCollection[j].appendChild(prevLink, 0);
			}
			
			// Initialize content panes
			while (returnObjById(targetID + "Content" + counter)) {
				
				if (counter == 1)
					returnObjById(targetID + "Content" + counter).style.display = tableOrNot(targetID + "Content" + counter);
				else
					returnObjById(targetID + "Content" + counter).style.display = "none";
					
				counter++;
			}	
		}

		counter = 1;
		
		// Whether or not there is paging, generate normal links				
		while ( document.getElementsByClass(targetID + "Link" + counter) && returnObjById(targetID + "Content" + counter) ) {
			
			var morphLinkCollection = document.getElementsByClass(targetID + "Link" + counter);
			for (j = 0; j < morphLinkCollection.length; j++) {
				var morphLink = document.createElement("div");
				morphLink.innerHTML = morphLinkCollection[j].innerHTML;
				morphLinkCollection[j].innerHTML = "";
				morphLink.setAttribute('name', targetID + "Link" + counter);
				morphLinkCollection[j].appendChild(morphLink, 0);
				
				morphLink.onclick = function () {
					var targetID = this.getAttribute('name').replace(/Link\d+$/, '');
					var targetNumber = this.getAttribute('name').replace(/.+Link/, '');
					performMorph(targetID, targetNumber);
					return
				 };
				morphLink.className = "morphLink";
				
			}
			
			// Initialize content panes
			if (counter == 1)
				returnObjById(targetID + "Content" + counter).style.display = tableOrNot(targetID + "Content" + counter);
			else
				returnObjById(targetID + "Content" + counter).style.display = "none";
				
			counter++;
		}
		
		multiMorphMasterCollection[i].innerHTML = "1";
		multiMorphMasterCollection[i].style.display = "none";
	}
	
	for (var i = 0; i < galleryMorphMasterCollection.length; i++) {
		
		var spanID = galleryMorphMasterCollection[i].getAttribute("id");
		var targetID = spanID.substr(0, spanID.length - 6);
		var counter = 1;
		
		// Create forward and backward paging if the paging elements exist
		if ( returnObjById(targetID + "LinkNext") && returnObjById(targetID + "LinkPrev") && returnObjById(targetID + "Content1") ) {
		
			// Create the forward link
			var nextLink = document.createElement("div");	
			nextLink.innerHTML = returnObjById(targetID + "LinkNext").innerHTML;
			nextLink.setAttribute('name', targetID + "LinkNext");
			nextLink.onclick = galleryMorphForward;
			nextLink.className = "morphLink";
			
			returnObjById(targetID + "LinkNext").innerHTML = "";
			returnObjById(targetID + "LinkNext").appendChild(nextLink, 0);
			
			// Create the backward link
			var prevLink = document.createElement("div");	
			prevLink.innerHTML = returnObjById(targetID + "LinkPrev").innerHTML;
			prevLink.setAttribute('name', targetID + "LinkPrev");
			prevLink.onclick = galleryMorphBackward;
			prevLink.className = "morphLink";
			
			returnObjById(targetID + "LinkPrev").innerHTML = "";
			returnObjById(targetID + "LinkPrev").appendChild(prevLink, 0);
			
			// Initialize content panes
			while ( returnObjById(targetID + "Content" + counter) ) {
				
				if (counter == 1)
					returnObjById(targetID + "Content" + counter).style.display = tableOrNot(targetID + "Content" + counter);
				else
					returnObjById(targetID + "Content" + counter).style.display = "none";
					
				counter++;
			}
			
			if (counter == 2) {
				returnObjById(targetID + "LinkNext").style.display = "none";
			}
			
			galleryCounter = counter - 1;
			if (returnObjById(targetID + "Counter")) {
				returnObjById(targetID + "Counter").innerHTML = "(1/" + galleryCounter + ")";
			}
		}
		
		galleryMorphMasterCollection[i].innerHTML = "1";
		galleryMorphMasterCollection[i].style.display = "none";
	}
}

/* Function that toggles ED's collapsing objects.
 * Added 11/5/2007 by WhiteMystery (misterioblanco@gmail.com) 
 * on Encyclopedia Dramatica, stolen by Zaza
 * Taken from http://www.netlobo.com/javascript_get_element_id.html */

function returnObjById(id) {
	 
    if (document.getElementById) 
        var returnVar = document.getElementById(id); 
    else if (document.all) 
        var returnVar = document.all[id]; 
    else if (document.layers) 
        var returnVar = document.layers[id]; 
    return returnVar; 
}



/* Attiva il charinsert per gli anonimi nel box "newarticleintro" */
function charinsert_anon_hack () {
	if(!(wgAction == "edit" && wgArticleId == 0 && wgUserName == null)) return;
	var box = getElementsByClass(document.getElementById("bodyContent"), "mw-newarticletextanon", 'div')[0];
	if (!box) return;
	var link = '<' + 'a href="#" onclick="insertTags(&#39;$1&#39;,&#39;&#39;,&#39;&#39;);return false">$1<' + '/a>';
	box.innerHTML = box.innerHTML.replace(/&lt;charinsert&gt;(.+?)&lt;\/charinsert&gt;/, link);
	return;
 }


/* Function to add a "purge" button at the top of the page,
 * usefull for dpl, random and similar things that need the
 * cache of the server.
 *
 * Created by MFH */
var buttonPurge = 0;

function createPurgeButton() {
  if (buttonPurge == 0 || wgCanonicalNamespace == 'Special') return;
  if (document.getElementById('ca-report-problem')) { /* Modifies the "report a problem" button, that is already invisible */
    document.getElementById('ca-report-problem').getElementsByTagName('a')[0].innerHTML = 'Purge';
    document.getElementById('ca-report-problem').getElementsByTagName('a')[0].href = wgServer + wgScriptPath + '/index.php?title=' + wgPageName + '&action=purge';
    document.getElementById('ca-report-problem').setAttribute('id', 'ca-purge');
  }
  else {
    var menuList = document.getElementById('p-cactions').getElementsByTagName('ul')[0];
    var newLi = document.createElement('li');
    newLi.setAttribute('id', 'ca-purge');
    newLi.innerHTML = '<a href="' + wgServer + wgScriptPath + '/index.php?title=' + wgPageName + '&action=purge">Purge</a>';
    menuList.appendChild(newLi);
  }
}


/* Visualizza correttamente categorie nascoste in IE */
function hiddencats_IE () {
	 if (navigator.appName != "Microsoft Internet Explorer") return;
	 var div = document.getElementById("mw-hidden-catlinks");
	 if (div == null) return;
	 var span = document.createElement('span');
	 span.id = 'mw-hidden-catlinks-switch';
	 span.innerHTML = "&gt;&gt;";
	 div.insertBefore(span, div.firstChild);
	 return;
}

/* Class che aggiunge "target= '_blank'" ai link */
function target_blank () {
 var tags = getElementsByClass(document.getElementsByTagName('body')[0], "target-blank");
 if (tags == null) return;
 var i, j, links;
 for (i=0; i < tags.length; i++) {
	links = tags[i].getElementsByTagName('a');
	for (j=0; j < links.length; j++) links[j].target = '_blank';
 }
 return;
}

/* Visualizza note come tooltip */
/* by Sanjilops - http://nonciclopedia.wikia.com/wiki/Utente:Sanjilops */
var disablereftooltip = false;
function ref_tooltip () {
 if (disablereftooltip) return;
 var refs = getElementsByClass(document.getElementById('bodyContent'), "reference", 'sup');
 if (!refs) return;
 for (var i = 0; i < refs.length; i++) Do(refs[i]);
 return;
 
 function Do (ref) {
	var tip = document.createElement('div');
	var id = ref.id.substr('cite_ref-'.length);
	tip.className = "reference-tt";
	tip.id = "cite_tt-" + id;
	var li = document.getElementById('cite_note-' + id.replace(/_(\d+)-\d+$/, '-$1'));
	if (!li) return;
	var temp = li.innerHTML;
	temp = temp.split(/^.+a href=\"#cite_ref-.+\" title=\"\">.+?<\/a>(<\/sup>)? /);
	tip.innerHTML = (temp.length)? temp[temp.length - 1] : temp;
	var max_width = document.getElementById('bodyContent').offsetWidth/2;
	if (ref.offsetLeft < max_width) tip.style.left = (ref.offsetWidth - 1) + 'px';
	 else tip.style.right =  (ref.offsetWidth - 1) + 'px';
	ref.appendChild(tip);
	temp = getText(tip);
	temp = temp.length * 12;
	tip.style.width = (temp < max_width - 5)? temp + 'px' : (max_width - 5) + 'px';
	addEvent(ref, 'mouseover', function () {document.getElementById(tip.id).style.display = ''; Fade(document.getElementById(tip.id), 500, 10, false, 0.9);});
	addEvent(ref, 'mouseout', function () {setTimeout(function () {document.getElementById(tip.id).style.display = 'none'; }, 600); Fade(document.getElementById(tip.id), 500, 10, true, 0.9);});
	tip.style.display = 'none';
	return;
 }
}



/* aggiunte */
function getElementsByName (name, root) {
 if (root == undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}


function addEvent(el, ev, f, capt) {
 if (capt == undefined) capt = false;
 if (el.addEventListener) el.addEventListener(ev, f, capt);
  else if (el.attachEvent) el.attachEvent('on' + ev, f);
 return;
}

function removeEvent(el, ev, f, capt) {
 if (capt == undefined) capt = false;
 if (el.removeEventListener) el.removeEventListener(ev, f, capt);
  else if (el.detachEvent) el.detachEvent('on' + ev, f);
 return;
}

/*** Animazioni ***/
var noFade = false;
function Fade (element, delay, i, rev, ratio) {
 if (noFade) return;
/* rev = sparizione; se !rev, ratio = opacità finale; se rev, ratio = opacità iniziale*/
 var start_time = new Date().getTime();
 var start_value = rev? ratio : 0;
 element.style.filter = "alpha(opacity=" + start_value * 100 + ")";
 element.style.opacity = start_value;
 if (!parseInt(element.style.width) && navigator.appName == "Microsoft Internet Explorer") element.style.width = element.offsetWidth + 'px';
 setTimeout(function() { Do()} , i);
 return;
 
 function Do() {
	 var cur_time = new Date().getTime();
	 var past_time = cur_time - start_time;
	 if (past_time >= delay) { /* ultima chiamata */
		var final_value = rev? 0 : ratio;
		element.style.filter = "alpha(opacity=" + final_value * 100 + ")";
		element.style.opacity = final_value;
		return;
	  }
	 var progress = past_time/delay;
	 var new_value = rev? ratio * (1 - progress) : ratio * progress;
	 element.style.filter = "alpha(opacity=" + new_value * 100 + ")";
	 element.style.opacity = new_value;
	 setTimeout(function() { Do(); } , i);
	 return;
	}
}

var noSlide = false;
function Slide(element, param, final_value, final_size, delay, i) {
 if (noSlide) return;
 /* NB: Il valore finale deve avere la stessa unità di misura di quello iniziale! */
 var start_time = new Date().getTime();
 var unit = 'px';
 if (typeof(final_value) == 'string') {
	 final_value = final_value.split(/\D/);
	 if (final_value.length > 1) unit = final_value[1];
	 final_value = parseFloat(final_value[0]);
  }
 var start_value = Get();
 var sub = (start_value > final_value)? true : false;
 var diff = Math.abs(start_value - final_value);
 var start_size;
 if (param == 'top' || param == 'bottom') start_size = element.parentNode.offsetHeight;
  else if (param == 'left' || param == 'right')	start_size = element.parentNode.offsetWidth;
 var diff_size = Math.abs(start_size - final_size);
 setTimeout( function() {Do(); } , i);
 return;
 
 function Do() {
	 var cur_time = new Date().getTime();
	 var past_time = cur_time - start_time;
	 if (past_time >= delay) { /* ultima chiamata */
		Set(final_value);
	 if (param == 'top' || param == 'bottom') element.parentNode.style.height = final_size + unit;
	  else if (param == 'left' || param == 'right') element.parentNode.style.width = final_size + unit;		
		return;
	  }
	 var progress = diff * past_time/delay;
	 new_value = (sub)? start_value - progress : start_value + progress;
	 Set(new_value);
	 new_size = (sub)? start_size - diff_size * past_time/delay: start_size + diff_size * past_time/delay;
	 if (param == 'top' || param == 'bottom') element.parentNode.style.height = new_size + unit;
	  else if (param == 'left' || param == 'right') element.parentNode.style.width = new_size + unit;
	 setTimeout(function() { Do(); } , i);
	 return;
 }
 
 function Get() {
	var ret;
	switch (param) {
		case 'top':
		 ret = element.style.top;
		 break;
		case 'bottom':
		 ret = element.style.bottom;
		 break;
		case 'left':
		 ret = element.style.left;
		 break;
		case 'right':
		 ret = element.style.right;
		 break;
		default:
		 return false;
	}
	if (/em/i.test(ret)) return parseFloat(ret);
	return (/\d+/.test(ret))? parseInt(ret) : 0;
  }
  
 function Set(v) {
	switch (param) {
		case 'top':
		 element.style.top = v + unit;
		 return;
		case 'bottom':
		 element.style.bottom = v + unit;
		 return;
		case 'left':
		 element.style.left = v + unit;
		 return;
		case 'right':
		 element.style.right = v + unit;
		 return;
		default:
		 return false;
	}
  }
}


var multislide_time = 1000;
var multislide_interval = 10;
var noMultislide = false;
var multislide_state = new Object();
var multislide_master = new Object();
function multislide_startup () {
 if (noMultislide) return;
 var toggles = getElementsByClass(document, "multislideToggle");
 if (!toggles.length) return;
 var names = new Array();
 var id = '', i, elements, master;
 for (var I=0; I< toggles.length; I++) { 
	id = toggles[I].title;
	if (String(names).indexOf(id) != -1) continue;
	names[names.length] = id;
	multislide_state[id] = false;
	master = document.getElementById(id + "Master");
	if (master) {
		multislide_master[id] = new Object();
		multislide_master[id].onload = hasClass(master, "slideOnload");
		multislide_master[id].time = (/slideTime-\d+/.test(master.className))? parseInt(master.className.match(/slideTime-(\d+)/)[1]) : -1;
		multislide_master[id].fade = hasClass(master, "slideFade");
	 }
	 else multislide_master[id] = null;
  }
 var dom, n;
 for (I=0; I< names.length; I++) {
	id = names[I];
	n = 0;
	dom = document.getElementsByTagName('body')[0].getElementsByTagName('*');
	for (i = 0; i < dom.length; i++) {
		if (dom[i].title == id && dom[i].nodeName.toUpperCase() != 'A') {
			if (hasClass(dom[i], "multislideToggle")) {
				dom[i].setAttribute('name', id + "-Toggle");
				CreateToggle(dom[i], id, n);
				n++;
			 }
			 else {
				dom[i].setAttribute('name', id +  "-Content");
				SetStartPosition(dom[i]);
			 }
			dom[i].removeAttribute('title');
		 }
	 }
	if (multislide_master[id] && multislide_master[id].onload) multislide_toggle(id, multislide_master[id].time);
  }
 return;

 function CreateToggle (el, id, n) {
	var time = (/slideTime-\d+/.test(el.className))? parseInt(el.className.match(/slideTime-(\d+)/)[1]) : -1;
	var fade = hasClass(el, "slideFade");
	if (hasClass(el, "slideHover")) {
	 	el.onmouseover = function () {multislide_toggle(id, time, fade, true); return;}
	 	el.onmouseout = function () {multislide_toggle(id, time, fade, false); return;}
	 }
 	 else el.onclick = function () {multislide_toggle(id, time, fade); return;};
	var On = getElementsByClass(el, "slideOn")[0];
	if (!On) return;
	var toggle;
	if (el.firstChild.nodeType != 1) {
		toggle = document.createElement('span');
		toggle.innerHTML = el.firstChild.nodeValue;
		el.replaceChild(toggle, el.firstChild);
	 }
	 else toggle = el.firstChild;
	toggle.id = id + "-toggle" + n; /* dato che n è i, gli id possono non essere consecutivi */
	On.id = id + "-toggle" + n + "-on";
	var Off = getElementsByClass(el, "slideOff")[0];
	if (!Off) {
		Off = toggle.cloneNode(true);
		Off.style.display = 'none';
		el.appendChild(Off);
	 }
	Off.id = id + "-toggle" + n + "-off";
	return;
 }

 function SetStartPosition (el) {
	var height = el.offsetHeight;
	var width = el.offsetWidth;
	if (hasClass(el, "slideFromTop")) {
		el.style.top = '-' + height + 'px';
		return;
	 }
	if (hasClass(el, "slideFromBottom")) {
		el.style.bottom = '-' + height + 'px';
		return;
	 }
	if (!hasClass(el.parentNode, "slideNoResize") && (el.parentNode.style == undefined || !el.parentNode.style.height)) el.parentNode.style.height = height + 'px';
	if (hasClass(el, "slideFromLeft")) {
		el.style.left = '-' + width + 'px';
		return;
	 }
	if (hasClass(el, "slideFromRight")) el.style.right = '-' + width + 'px';
	return;
 }
}

function multislide_toggle(id, toggle_time, toggle_fade, hoverWantedState) {
 if(hoverWantedState != undefined && hoverWantedState == multislide_state[id]) return;
 var contents = getElementsByName(id + "-Content");
 var el, time, fade;
 for (var i = 0; i < contents.length; i++) {
	el = contents[i];
	if (/slideTime-\d+/.test(el.className)) time = parseInt(el.className.match(/slideTime-(\d+)/)[1]);
	 else {
		if (toggle_time != -1) time = toggle_time;
		 else {
			if (multislide_master[id] && multislide_master[id].time != -1) time = multislide_master[id].time;
			 else time = multislide_time;
		 }
	 }
	fade = hasClass(el, "slideFade") || toggle_fade || (multislide_master[id] && multislide_master[id].fade);
	var dir = el.className.match(/slideFrom(Top|Bottom|Left|Right)/)[0].substr(9).toLowerCase();
	var framesize;
	if (!multislide_state[id]) {
		if (dir == 'top' || dir == 'bottom') framesize = el.parentNode.offsetHeight + el.offsetHeight;
		 else if (dir == 'left' || dir == 'right') framesize = el.parentNode.offsetWidth + el.offsetWidth;
		Slide(el, dir, 0, framesize, time, multislide_interval);
	 }
	 else {
		var size;
		if (dir == 'top' || dir == 'bottom') { size = el.offsetHeight; framesize = el.parentNode.offsetHeight - size; }
		 else if (dir == 'left' || dir == 'right') { size = el.offsetWidth; framesize = el.parentNode.offsetWidth - size; }
		Slide(el, dir, 0 - size, framesize, time, multislide_interval);
	 }
	if (fade) _fade(el, time, multislide_state[id]);
  }
 var toggles = getElementsByName(id + "-Toggle");
 for (var i = 0; i < toggles.length; i++) {
	var el = document.getElementById(id + "-toggle" + i);
	if (!el) continue;
	el.innerHTML = (multislide_state[id])? document.getElementById(id + "-toggle" + i + "-off").innerHTML : document.getElementById(id + "-toggle" + i + "-on").innerHTML;
  }
 multislide_state[id] = !multislide_state[id];
 return;
 
 function _fade (el, time, rev) {
	 setTimeout(function () {Fade(el, time, multislide_interval, rev, (rev? 0.8 : 1)); }, 1);
	 setTimeout(function () {el.style.filter = "alpha(opacity=100)"; el.style.opacity = 1; }, time + 5*multislide_interval);
	 return;}
}


var multifade_time = 1000;
var multifade_interval = 10;
var multifade_state = new Object();
var multifade_master = new Object();
var noMultifade = false;
function multifade_startup () {
 if (noMultifade) return;
 var toggles = getElementsByClass(document, "multifadeToggle");
 if (!toggles.length) return;
 var names = new Array();
 var id = '', i, elements, master;
 for (var I=0; I< toggles.length; I++) { 
	id = toggles[I].title;
	if (String(names).indexOf(id) != -1) continue;
	names[names.length] = id;
	multifade_state[id] = false;
	master = document.getElementById(id + "Master");
	if (master) {
		multifade_master[id] = new Object();
		multifade_master[id].onload = hasClass(master, "fadeOnload");
		multifade_master[id].time = (/fadeTime-\d+/.test(master.className))? parseInt(master.className.match(/fadeTime-(\d+)/)[1]) : -1;
	 }
	 else multifade_master[id] = null;
  }
 var dom, n;
 for (I=0; I< names.length; I++) {
	id = names[I];
	n = 0;
	dom = document.getElementsByTagName('body')[0].getElementsByTagName('*');
	for (i = 0; i < dom.length; i++) {
		if (dom[i].title == id && dom[i].nodeName.toUpperCase() != 'A') {
			if (hasClass(dom[i], "multifadeToggle")) {
				dom[i].setAttribute('name', id + "-Toggle");
				CreateToggle(dom[i], id, n);
				n++;
			 }
			 else {
				dom[i].setAttribute('name', id + "-Content");
				dom[i].style.opacity = 0;
				dom[i].style.filter = 'alpha(opacity=0)';
			 }
			dom[i].removeAttribute('title');
		 }
	 }
	if (multifade_master[id] && multifade_master[id].onload) multifade_toggle(id, multifade_master[id].time);
  }
 return;

 function CreateToggle (el, id, n) {
	el.setAttribute('name', id + "-Toggle");
	var time = (/fadeTime-\d+/.test(el.className))? parseInt(el.className.match(/fadeTime-(\d+)/)[1]) : -1;
	if (hasClass(el, "fadeHover")) {
	 	el.onmouseover = function () {multifade_toggle(id, time, true); return;}
	 	el.onmouseout = function () {multifade_toggle(id, time, false); return;}
	 }
 	 else el.onclick = function () {multifade_toggle(id, time); return;};
	var On = getElementsByClass(el, "fadeOn")[0];
	if (!On) return;
	var toggle;
	if (el.firstChild.nodeType != 1) {
		toggle = document.createElement('span');
		toggle.innerHTML = el.firstChild.nodeValue;
		el.replaceChild(toggle, el.firstChild);
	 }
	 else toggle = el.firstChild;
	toggle.id = id + "-toggle" + n; /* dato che n è i, gli id possono non essere consecutivi */
	On.id = id + "-toggle" + n + "-on";
	var Off = getElementsByClass(el, "fadeOff")[0];
	if (!Off) {
		Off = toggle.cloneNode(true);
		Off.style.display = 'none';
		el.appendChild(Off);
	 }
	Off.id = id + "-toggle" + n + "-off";
	return;
 }
}

function multifade_toggle(id, general_time, hoverWantedState) {
 if(hoverWantedState != undefined && hoverWantedState == multifade_state[id]) return;
 var contents = getElementsByName(id + "-Content");
 var el, time;
 for (var i = 0; i < contents.length; i++) {
	el = contents[i];
	if (/fadeTime-\d+/.test(el.className)) time = parseInt(el.className.match(/fadeTime-(\d+)/)[1]);
	 else {
		if (general_time != -1) time = general_time;
		 else {
			if (multifade_master[id] && multifade_master[id].time != -1) time = multifade_master[id].time;
			 else time = multifade_time;
		 }
	 }
	Fade(el, time, multifade_interval, multifade_state[id], multifade_state[id]? 0.8 : 1);
  }
 var toggles = getElementsByName(id + "-Toggle");
 for (var i = 0; i < toggles.length; i++) {
	var el = document.getElementById(id + "-toggle" + i);
	if (!el) continue;
	el.innerHTML = (multifade_state[id])? document.getElementById(id + "-toggle" + i + "-off").innerHTML : document.getElementById(id + "-toggle" + i + "-on").innerHTML;
  }
 multifade_state[id] = !multifade_state[id];
 return;
}




function rum() {
 if ((wgPageName != "Utente:Sanjilops")) return;
	var e = document.getElementById("rumore");
	if (!e) {
		if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.userAgent[navigator.userAgent.indexOf("MSIE") + 5]) >= 8) {
			e = document.createElement('bgsound');
			e.loop = '1';
			document.getElementsByTagName('head')[0].appendChild(e);
		 }
		 else {
			e = document.createElement('audio');
			e.autoplay = 'autoplay';
			e.style.display = 'none';
			document.getElementsByTagName('body')[0].appendChild(e);
		 }
		e.id = "rumore";
	 }
	e.src = "http://www.wav-sounds.com/movie/terminator.wav";
	return;
 }

addOnloadHook(rum);