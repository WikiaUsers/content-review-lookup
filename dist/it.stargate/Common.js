/* Funzioni di utilità generale */

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




/* Script importati */
function import_script (condition, script) {
   if(!condition) return;
   var scriptElem = document.createElement( 'script' );
   scriptElem.type = 'text/javascript';
   scriptElem.language = 'javascript';
   scriptElem.src = '/index.php?title=' + script + '&action=raw&ctype=text/javascript&smaxage=8400';
   document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
   return;
}

addOnloadHook(function() {
import_script((wgPageName == "Speciale:WidgetDashboard"), "Nonciclopedia:Script/Shoutbox.js");

}
);



/* Aggiunge l'editintro nei link di modifica anche per gli utenti registrati */
function addeditintro()
{
  if (wgUserName == null) return false;
  if (document.getElementById('ca-talk')) {
   if (document.getElementById('ca-talk').getAttribute('class')=='new')
   {
     document.getElementById('ca-talk').getElementsByTagName('a')[0].href = document.getElementById('ca-talk').getElementsByTagName('a')[0].href.concat('&editintro=MediaWiki:Editintro');
   }
  }
  if (document.getElementById('ca-edit'))
  {
    var link = document.getElementById('ca-edit').getElementsByTagName('a')[0];
    if(link==null) return false; /*non sono sicuro che serva, ma nel dubbio lo lascio*/
  }
  else
  {
    return false;
  }
  if (wgCurRevisionId)
  {
    if(link==null) return false;
    link.href = link.href.concat('&editintro=MediaWiki:Editintro');
  }
  function sections () {
 var spans = document.getElementsByTagName('span');
 var i = 0, l;
 for (i in spans) {
	if (/editsection/.test(spans[i].className)) {
		l = spans[i].getElementsByTagName('a')[0];
		if (l == null) continue;
		l.href = l.href.concat('&editintro=MediaWiki:Editintro');
	 }
  }
 return;
}
 sections();
}
addOnloadHook(addeditintro);



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
  addOnloadHook( createNavigationBarToggleButton );
 

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


 addOnloadHook(UserNameReplace); 

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
addOnloadHook(alertLink);

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
addOnloadHook(alertLoad);


/* Carica uno o più alert all'uscita dalla pagina */
function alertUnLoad() {
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
addOnloadHook(alertUnLoad);

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
addOnloadHook(randomlist);



/* Hook that enables collapsing objects.
 * Added 11/5/2007 by WhiteMystery (misterioblanco@gmail.com) 
 * on Encyclopedia Dramatica, stolen by Zaza
 * Improved with multiMorph and galleryMorph by MFH
 * Uses publicly available code in one function, where noted. */

var galleryCounter = 0; /* Needed for galleryMorph */
addOnloadHook(createToggleLinks);

/* Function that toggles collapsing objects.
 * Added 11/5/2007 by WhiteMystery (misterioblanco@gmail.com) 
 * on Encyclopedia Dramatica, stolen by Zaza
 * Uses publicly available code in one function, where noted. */

function tableOrNot(objId) {
	
	if (document.getElementById(objId).tagName == "TABLE") return "table";
	else return "block";
}

function toggleCollapse(objToToggle, collapseText, expandText) {

	var linkText = "";
	var targetObject = returnObjById(objToToggle);
	
	if ( targetObject ) {
	
		if ( targetObject.style.display == "none" ) {
			
			targetObject.style.display = tableOrNot(objToToggle);
			linkText = collapseText;
		}
			
		else {
			
			targetObject.style.display = "none";
			linkText = expandText;
		}
		
		var toggleLink = document.createElement("div");
		toggleLink.appendChild(document.createTextNode(linkText));
		toggleLink.setAttribute("onclick", "javascript:toggleCollapse('" + objToToggle + "','" + collapseText + "','" + expandText + "')");
		toggleLink.setAttribute("class", "morphLink");
		
		returnObjById(objToToggle + "Link").innerHTML = "";
		returnObjById(objToToggle + "Link").appendChild(toggleLink, 0);
	}
}

/* Functions that performs the morph operation.
 * Added 11/5/2007 by WhiteMystery (misterioblanco@gmail.com) 
 * on Encyclopedia Dramatica, stolen by Zaza
 * Uses publicly available code in one function, where noted. */

function performMorph(targetID, targetNumber) {

	var counter = 1;
	
	while ( returnObjById(targetID + "Content" + counter) ) {
	
		if ( counter == targetNumber )
			returnObjById(targetID + "Content" + counter).style.display = tableOrNot(targetID + "Content" + counter);
		else
			returnObjById(targetID + "Content" + counter).style.display = "none";
			
		counter++;
	}
	
	returnObjById(targetID + "Master").innerHTML = targetNumber;
}

function morphForward(targetID) {

	var nextPane = parseInt(returnObjById(targetID + "Master").innerHTML) + 1;
	
	if ( returnObjById(targetID + "Content" + nextPane) )
		performMorph(targetID, nextPane);
		
	else
		performMorph(targetID, "1");
}

function morphBackward(targetID) {

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
	
		if ( counter == targetNumber )
			returnObjById(targetID + "Content" + counter).style.display = tableOrNot(targetID + "Content" + counter);
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

function galleryMorphForward(targetID) {

	var nextPane = parseInt(returnObjById(targetID + "Master").innerHTML) + 1;
	
	if ( returnObjById(targetID + "Content" + nextPane) )
		performGalleryMorph(targetID, nextPane);
		
	else
		performGalleryMorph(targetID, "1");
}

function galleryMorphBackward(targetID) {

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

function createToggleLinks() {

	var toggleLinkCollection = document.getElementsByClass("toggleLink");
	var morphMasterCollection = document.getElementsByClass("morphMaster");
	var multiMorphMasterCollection = document.getElementsByClass("multiMorphMaster");
	var galleryMorphMasterCollection = document.getElementsByClass("galleryMorphMaster");
	
	for (var i = 0; i < toggleLinkCollection.length; i++) {
		var spanID = toggleLinkCollection[i].getAttribute("id");
		var targetID = spanID.substr(0, spanID.length - 4);
		var collapseText = returnObjById(targetID + "CollapseText").innerHTML;
		var expandText = returnObjById(targetID + "ExpandText").innerHTML;
		var initialState = returnObjById(targetID + "InitialState").innerHTML;
		
		var toggleLink = document.createElement("div");
		
		if (initialState == "0") {
			
			returnObjById(targetID).style.display = "none";
			toggleLink.appendChild(document.createTextNode(expandText));
		}
		
		else {
			
			returnObjById(targetID).style.display = tableOrNot(targetID);
			toggleLink.appendChild(document.createTextNode(collapseText));
		}
		
		toggleLink.setAttribute("onclick", "javascript:toggleCollapse('" + targetID + "','" + collapseText + "','" + expandText + "')");
		toggleLink.setAttribute("class", "morphLink");
		
		toggleLinkCollection[i].appendChild(toggleLink);
	}

	for (var i = 0; i < morphMasterCollection.length; i++) {
		
		var spanID = morphMasterCollection[i].getAttribute("id");
		var targetID = spanID.substr(0, spanID.length - 6);
		var counter = 1;
		
		// Create forward and backward paging if the paging elements exist
		if ( returnObjById(targetID + "LinkNext") && returnObjById(targetID + "LinkPrev") && returnObjById(targetID + "Content1") ) {
		
			// Create the forward link
			var nextLink = document.createElement("div");	
			nextLink.innerHTML = returnObjById(targetID + "LinkNext").innerHTML;
			nextLink.setAttribute("onclick", "javascript:morphForward('" + targetID + "')");
			nextLink.setAttribute("class", "morphLink");
			
			returnObjById(targetID + "LinkNext").innerHTML = "";
			returnObjById(targetID + "LinkNext").appendChild(nextLink, 0);
			
			// Create the backward link
			var prevLink = document.createElement("div");	
			prevLink.innerHTML = returnObjById(targetID + "LinkPrev").innerHTML;
			prevLink.setAttribute("onclick", "javascript:morphBackward('" + targetID + "')");
			prevLink.setAttribute("class", "morphLink");
			
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
			morphLink.setAttribute("onclick", "javascript:performMorph('" + targetID + "','" + counter + "')");
			morphLink.setAttribute("class", "morphLink");
			
			returnObjById(targetID + "Link" + counter).innerHTML = "";
			returnObjById(targetID + "Link" + counter).appendChild(morphLink, 0);
			
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
				nextLink.setAttribute("onclick", "javascript:morphForward('" + targetID + "')");
				nextLink.setAttribute("class", "morphLink");
				
				nextLinkCollection[j].innerHTML = "";
				nextLinkCollection[j].appendChild(nextLink, 0);
			}
			
			// Create the backward link
			var prevLinkCollection = document.getElementsByClass(targetID + "LinkPrev");
			for (j = 0; j < prevLinkCollection.length; j++) {
				var prevLink = document.createElement("div");
				prevLink.innerHTML = prevLinkCollection[j].innerHTML;
				prevLink.setAttribute("onclick", "javascript:morphBackward('" + targetID + "')");
				prevLink.setAttribute("class", "morphLink");
				
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
				morphLink.setAttribute("onclick", "javascript:performMorph('" + targetID + "','" + counter + "')");
				morphLink.setAttribute("class", "morphLink");
				
				morphLinkCollection[j].innerHTML = "";
				morphLinkCollection[j].appendChild(morphLink, 0);
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
			nextLink.setAttribute("onclick", "javascript:galleryMorphForward('" + targetID + "')");
			nextLink.setAttribute("class", "morphLink");
			
			returnObjById(targetID + "LinkNext").innerHTML = "";
			returnObjById(targetID + "LinkNext").appendChild(nextLink, 0);
			
			// Create the backward link
			var prevLink = document.createElement("div");	
			prevLink.innerHTML = returnObjById(targetID + "LinkPrev").innerHTML;
			prevLink.setAttribute("onclick", "javascript:galleryMorphBackward('" + targetID + "')");
			prevLink.setAttribute("class", "morphLink");
			
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
addOnloadHook(charinsert_anon_hack);




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
    document.getElementById('ca-report-problem').getElementsByTagName('a')[0].href = 'http://nonciclopedia.wikia.com/index.php?title=' + wgPageName + '&action=purge';
    document.getElementById('ca-report-problem').setAttribute('id', 'ca-purge');
  }
  else {
    var menuList = document.getElementById('p-cactions').getElementsByTagName('ul')[0];
    var newLi = document.createElement('li');
    newLi.setAttribute('id', 'ca-purge');
    newLi.innerHTML = '<a href="http://nonciclopedia.wikia.com/index.php?title=' + wgPageName + '&action=purge">Purge</a>';
    menuList.appendChild(newLi);
  }
}
addOnloadHook(createPurgeButton);

/* Inizio funzione per i javascript "ad paginam".
 * Per prima cosa si dichiara a quale pagina corrisponde un determinato script. */
arrayPagine = new Array();

/* Per inserire un nuovo script usare il codice qui sotto:
***        INIZIO CODICE        ***
arrayPagine[numero] = new Array('nomePagina', 'nomePaginaScript');
***         FINE CODICE         ***
   dove numero è un numero sequenziale a partire da 0,
   nomePagina è il nome della pagina, non l'url,
   mentre nomePaginaScript è il nome della pagina contenente
   lo script, non l'url.
   Importante: tutti gli spazi nei nomi delle due pagine vanno
   sostituiti con degli underscore: _ */

arrayPagine[0] = new Array('Giochi:CasiNonci/Slot_machine', 'Nonciclopedia:Script/SlotMachine.js');

for (var i = 0; i < arrayPagine.length; i++) {
  if (arrayPagine[i][0] == wgPageName) {
    document.write('<script type="text/javascript" src="/index.php?title=' + arrayPagine[i][1] + '&action=raw&ctype=text/javascript"></script>');
  }
}