 /* **************************************************
  * BOTONES ADICIONALES
  */
 
 if (typeof(mwCustomEditButtons) != 'undefined') {
 	mwCustomEditButtons[mwCustomEditButtons.length] = {
 		'imageFile': "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
 		'speedTip': "Código fuente",
 		'tagOpen': "<code><nowiki>",
 		'tagClose': "</"+ "nowiki></code>",
 		'sampleText': "Código fuente"};
 	
 	mwCustomEditButtons[mwCustomEditButtons.length] = {
 		'imageFile': "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
 		'speedTip': "Plantillas",
 		'tagOpen': "{{",
 		'tagClose': "}}",
 		'sampleText': "Plantilla"};
 	
 	mwCustomEditButtons[mwCustomEditButtons.length] = {
 		'imageFile': "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
 		'speedTip': "Enlace a usuario",
 		'tagOpen': "[[Usuario:",
 		'tagClose': "|]]",
 		'sampleText': "Usuario"};
 	
 	mwCustomEditButtons[mwCustomEditButtons.length] = {
 		'imageFile': "https://images.wikia.nocookie.net/inciclopedia/images/6/64/Bot%C3%B3n_categor%C3%ADa.png",
 		'speedTip': "Categoría",
 		'tagOpen': "[[Categoría:",
 		'tagClose': "|{" + "{PAGENAME}}]]",
 		'sampleText': "Nombre categoría"};
 	
 	mwCustomEditButtons[mwCustomEditButtons.length] = {
 		'imageFile': "http://upload.wikimedia.org/wikipedia/commons/e/ec/Button_aviso.png",
 		'speedTip': "Advertir de vandalismo a un usuario",
 		'tagOpen': "{{vandalismo|",
 		'tagClose': "}}",
 		'sampleText': "Motivo de aviso"};
 	
 	mwCustomEditButtons[mwCustomEditButtons.length] = {
 		'imageFile': "https://images.wikia.nocookie.net/__cb20100417162808/es.gta/images/e/ef/Borrar.png",
 		'speedTip': "Proponer el artículo para ser borrado",
 		'tagOpen': "{{borrar|",
 		'tagClose': "}}",
 		'sampleText': "Motivo por el que se propone para borrar"};
 	
 	mwCustomEditButtons[mwCustomEditButtons.length] = {
 		'imageFile': "https://images.wikia.nocookie.net/__cb20100417162729/es.gta/images/c/c2/Enobras.png",
 		'speedTip': "Advertir de que se está trabajando en el artículo",
 		'tagOpen': "{{enobras|",
 		'tagClose': "}}",
 		'sampleText': "Nick del usuario"};
 	
 	mwCustomEditButtons[mwCustomEditButtons.length] = {
 		'imageFile': "https://images.wikia.nocookie.net/lossimpson/es/images/a/ad/Boton_redirect.png",
 		'speedTip': "Añadir redirección",
 		'tagOpen': "#REDIRECT [[",
 		'tagClose': "]]",
 		'sampleText': "Página a enlazar"};
 };

 /* **************************************************
  * Experimental javascript countdown timer (Splarka)
  * Version 0.0.3
  *
  * Usage example:
  *  <span class="countdown" style="display:none;">
  *  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
  *  </span>
  *  <span class="nocountdown">Javascript disabled.</span>
  *
  * If the date is in the format "x|January 01 2007 00:00:00 PST", then the timer is periodic with period x seconds using the given date as the starting time.
  */
 
 function updatetimer(i) {
 	var now = new Date();
 	var then = timers[i].eventdate;
 	var diff = Math.floor((then.getTime()-now.getTime())/1000);
 	
 	// catch bad date strings
 	if(isNaN(diff)) { 
 		timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
 		return;
 	}
 	
 	// reduce modulo period if necessary
 	if(timers[i].period > 0){
 		if(diff<0) diff = timers[i].period - ((-diff)%timers[i].period); else diff = diff%timers[i].period;
 	}
 	
 	// determine plus/minus
 	if(diff<0) {
 		diff = -diff;
 		var tpm = ' ';
 	} else {
 		var tpm = ' ';
 	}
 	
 	// calcuate the diff
 	var left = (diff%60) + ' segundos';
 	diff=Math.floor(diff/60);
 	if(diff > 0) left = (diff%60) + ' minutos ' + left;
 	diff=Math.floor(diff/60);
 	if(diff > 0) left = (diff%24) + ' horas ' + left;
 	diff=Math.floor(diff/24);
 	if(diff > 0) left = diff + ' días ' + left;
 	timers[i].firstChild.nodeValue = tpm + left;
 	
 	// a setInterval() is more efficient, but calling setTimeout()
 	// makes errors break the script rather than infinitely recurse
 	timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
 };
 
 function checktimers() {
 	//hide 'nocountdown' and show 'countdown'
 	var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
 	for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
 	var countdowns = getElementsByClassName(document, 'span', 'countdown');
 	for(var i in countdowns) countdowns[i].style.display = 'inline';
 	
 	//set up global objects timers and timeouts.
 	timers = getElementsByClassName(document, 'span', 'countdowndate');
 	timeouts = new Array(); // generic holder for the timeouts, global
 	if(timers.length == 0) return;
 	for(var i in timers) {
 		var str = timers[i].firstChild.nodeValue;
 		var j = str.indexOf('|');
 		if(j == -1) timers[i].period = 0;
 		else {
 			timers[i].period = parseInt(str.substr(0, j));
 			if(isNaN(timers[i].period) || timers[i].period < 0) timers[i].period = 0;
 			str = str.substr(j + 1);
 		}
 		timers[i].eventdate = new Date(str);
 		updatetimer(i);  //start it up
 	}
 };
 
 addOnloadHook(checktimers);
 /* - end -  Experimental javascript countdown timer */

 /* **************************************************
  * Test if an element has a certain class
  *
  * Description: Uses regular expressions and caching for better performance.
  */
 
 var hasClass = (function () {
 	var reCache = {};
 	return function (element, className) {
 		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
 	};
 })();

 /* **************************************************
  * Internet Explorer bug fix
  *
  *  Description: UNDOCUMENTED
  */
 
 if (window.showModalDialog && document.compatMode) {
 	var oldWidth;
 	var docEl = document.documentElement;
 	
 	function fixIEScroll() {
 		if (!oldWidth || docEl.clientWidth > oldWidth) {
 			doFixIEScroll();
 		} else {
 			setTimeout(doFixIEScroll, 1);
		}
 		oldWidth = docEl.clientWidth;
 	}
 	
 	function doFixIEScroll() {
 		docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? 'hidden' : '';
 	}
 	try {
 		document.attachEvent('onreadystatechange', fixIEScroll);
 		attachEvent('onresize', fixIEScroll);
 	}
 	catch(e) { }
 };

 /* **************************************************
  * Collapsible tables
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  */
 
 var autoCollapse = 1;
 var collapseCaption = '-';
 var expandCaption = '+';
 
 function collapseTable( tableIndex ) {
 	var Button = document.getElementById( 'collapseButton' + tableIndex );
 	var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 	
 	if ( !Table || !Button ) {
 		return false;
 	}
 	
 	var Rows = Table.rows;
 	
 	if ( Button.firstChild.data == collapseCaption ) {
 		for ( var i = 1; i < Rows.length; i++ ) {
 			Rows[i].style.display = 'none';
 		}
 		Button.firstChild.data = expandCaption;
 	} else {
 		for ( var i = 1; i < Rows.length; i++ ) {
 			Rows[i].style.display = Rows[0].style.display;
 		}
 		Button.firstChild.data = collapseCaption;
 	}
 }
 
 function createCollapseButtons() {
 	var tableIndex = 0;
 	var NavigationBoxes = new Object();
 	var Tables = document.getElementsByTagName( 'table' );
 	
 	for ( var i = 0; i < Tables.length; i++ ) {
 		if ( hasClass( Tables[i], 'collapsible' ) ) {
 		
 			/* only add button and increment count if there is a header row to work with */
 			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
 			if (!HeaderRow) continue;
 			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
 			if (!Header) continue;
 			
 			NavigationBoxes[ tableIndex ] = Tables[i];
 			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 			
 			var Button     = document.createElement( 'span' );
 			var ButtonLink = document.createElement( 'a' );
 			var ButtonText = document.createTextNode( collapseCaption );
 			
 			Button.style.styleFloat = 'right';
 			Button.style.cssFloat = 'right';
 			Button.style.fontWeight = 'normal';
 			Button.style.textAlign = 'right';
 			Button.style.width = '6em';
 			
 			ButtonLink.style.color = Header.style.color;
 			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
 			ButtonLink.setAttribute( 'href', 'javascript:collapseTable(' + tableIndex + ');' );
 			ButtonLink.appendChild( ButtonText );
 			
 			Button.appendChild( document.createTextNode( '[' ) );
 			Button.appendChild( ButtonLink );
 			Button.appendChild( document.createTextNode( ']' ) );
 			
 			Header.insertBefore( Button, Header.childNodes[0] );
 			tableIndex++;
 		}
 	}
 	
 	for ( var i = 0;  i < tableIndex; i++ ) {
 		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
 			collapseTable( i );
 		}
 	}
 };
 
 addOnloadHook( createCollapseButtons );

 /* **************************************************
  * Fix edit summary prompt for undo
  *
  * Fixes the fact that the undo function combined with the "no edit summary prompter"
  * causes problems if leaving the edit summary unchanged.
  */
 
 addOnloadHook(function () {
 	if (document.location.search.indexOf('undo=') != -1 && document.getElementsByName('wpAutoSummary')[0]) {
 		document.getElementsByName('wpAutoSummary')[0].value='';
 	}
 });

 /* **************************************************
  * Búsqueda especial extendida (specialsearch)
  *
  * Añade a la página [[Special:Search]] enlaces a buscadores externos como Yahoo, Google, MSN Live y Exalead.
  * Trabaja en conjunto con el módulo [[MediaWiki:SpecialSearch.js]] y está basado en [[w:fr:MediaWiki:Monobook.js]].
  */
 
 document.write('<script type="text/javascript" src="' 
 	+ '/w/index.php?title=MediaWiki:SpecialSearch.js'
 	+ '&action=raw&ctype=text/javascript&dontcountme=s&smaxage=3600"></script>');

 /* **************************************************
  * Cerrar mensajes
  * Ver ejemplo en [[Usuario:Chabacano/Fírmalo]], por [[Usuario:Platonides]].
  */
 
 addOnloadHook( function() {
 	if (document.getElementById('cierraPadre')) {
 		document.getElementById('cierraPadre').childNodes[0].onclick= function () { 
			document.getElementById('cierraPadre').style.cursor = 'pointer';
			document.getElementById('cierraPadre').parentNode.style.display = 'none';
			return false; //no seguir el href
		} 
 	}
 });

 /* **************************************************
  * Texto sólo para biblios
  */
 
 function userInGroup(group) {
 	return (wgUserGroups && (('|' + wgUserGroups.join('|') + '|').indexOf('|' + group + '|') != -1));
 }
 
 addOnloadHook ( function() {
 	if ( userInGroup('sysop') ) {
 		if (document.styleSheets[0].cssRules) {
 			for (i=document.styleSheets.length-1; i >= 0; i--) {
 				try {
 					//Añadir al final (Gecko)
 					document.styleSheets[i].insertRule('.para_biblios { display: inline; }', document.styleSheets[i].cssRules.length);
 					break;
 				} catch(e) {
 				//Ignorar el error y probar con la hoja de estilos anterior. 
 				//Así, por ejemplo [[Usuario:Axxgreazz/Monobook-Suite/popups.js]] carga una hoja de estilos desde en.wikipedia.org, lo que provoca un error 'Access to URI denied' (NS_ERROR_DOM_BAD_URI).
 				}
 			}
 		} else if (document.styleSheets[0].rules) { //IE
 			document.styleSheets[document.styleSheets.length-1].addRule('.para_biblios', 'display: inline');
 		}
 	}
 });

 /* **************************************************
  * Mejoras de diseño de la Portada
  *
  *  Descripción: Varias mejoras de diseño para la portada, incluyendo un
  *               enlace adicional a la lista completa de idiomas disponibles
  *               y renombrar 'artículo' a 'portada'.
  *  Adaptado de [[en:MediaWiki:Common.js]]
  */
 
 function mainPageAppendCompleteListLink() {
 	try {
 		var node = document.getElementById( 'p-lang' )
 							.getElementsByTagName('div')[0]
 							.getElementsByTagName('ul')[0];
 		
 		var aNode = document.createElement( 'a' );
 		var liNode = document.createElement( 'li' );
 		
 		aNode.appendChild( document.createTextNode( 'Lista completa' ) );
 		aNode.setAttribute( 'href' , 'http://meta.wikimedia.org/wiki/Lista_de_Wikipedias' );
 		liNode.appendChild( aNode );
 		liNode.style.fontWeight = 'bold';
 		node.appendChild( liNode );
 	} catch(e) {
 		// lets just ignore what's happened
 		return;
 	}
 };
 
 if ( wgPageName == 'Simpson_Wiki_en_Español:Portada' ) {
 		addOnloadHook( mainPageAppendCompleteListLink );
 };

 /* **************************************************
  * Desactiva el botón "guardar" a los anónimos hasta que previsualicen
  * Copyright Marc Mongenet, 2006 (fr.wikipedia.org)
  * Plyd 05/2007: add "after preview" in the button to prevent misunderstanding from beginners
  * Platonides 5/2008: Traído a es.wikipedia
  */
 function forcePreview() {
 	if (wgUserName != null || wgAction != 'edit') return;
 	saveButton = document.getElementById('wpSave');
 	if (!saveButton) return;
 	saveButton.disabled = true;
 	saveButton.value += ' (previsualizar antes)';
 	saveButton.style.fontWeight = 'normal';
 	document.getElementById('wpPreview').style.fontWeight = 'bold';
 };
 
 addOnloadHook(forcePreview);

 /* **************************************************
  * ????
  */
 
 var wma_settings = {buttonImage: 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Erioll_world.svg/15px-Erioll_world.svg.png'};








// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 
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
 
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 1;
 var collapseCaption = "-";
 var expandCaption = "+";
 
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
 
// ==================================================
//  Folding Multi Wiki Tabs (experimental)
// ==================================================
 
function foldingTabsMulti() {
  var len=0;
  ftsets = getElementsByClassName(document, 'div', 'foldtabSet');  //global object array thingy
  if(ftsets.length==0) return
 
  for(var i=0;i<ftsets.length;i++) {  
    ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
    ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
    ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');
 
    if(ftsets[i].links.length < ftsets[i].boxen.length) {
      len = ftsets[i].boxen.length;
    } else {
      len = ftsets[i].links.length;
    }
 
    for(var j=0;j<len;j++) {
      ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
      ftsets[i].links[j].title = 'click to display tab ' + j + ' of set ' + i;
    }
    showmultitab(i,'0');
    ftsets[i].head.style.display = 'block';
  }
}
addOnloadHook(foldingTabsMulti);
 
function showmultitab(set,num) {
  for(var j=0;j<ftsets[set].boxen.length;j++) {
    if(j==num) {
      ftsets[set].boxen[j].style.display = 'block';
    } else {
      ftsets[set].boxen[j].style.display = 'none';
    }
  }
  for(var j=0;j<ftsets[set].links.length;j++) {
    if(j==num) {
      ftsets[set].links[j].className = 'selected';
      ftsets[set].links[j].blur();
    } else {
      ftsets[set].links[j].className = '';
    }
  }
}
 
// ==================================================
//            END Folding Multi Wiki Tabs
// ==================================================
 
 
/* Any JavaScript here will be loaded for all users on every page load. */
 
// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>
 
 
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
	if( skin == 'oasis' )
	{
		$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href' );
		$('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
		return;
	}
 
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}
 
//=============================================================================
// IRC support
// from http://dev.wikia.com/wiki/Freenode_IRC#Embedding_Wikia.27s_IRC_gateway
//=============================================================================
function onloadhookcustomirc() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=wikia-onepiece" width="450" height="400"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustomirc,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustomirc);
 
 
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '== Source ==\n\n== Licensing ==\n\n[[Category:';
	}
}
addOnloadHook(FairUseRationale);
 
 
// ****** END: JavaScript for [[Special:Upload]] ******
 
// ============================================================
//                       Imports
// ============================================================
// Check the original pages for more informations.
 
importArticles({
    type: 'script',
    articles: [
        // List all duplicate images
        'w:dev:DupImageList/code.js',
        // SignatureCheck
        'w:c:dev:SignatureCheck/code.js',
        // Display Clock
        'w:dev:DisplayClock/code.js',
        // ExternalImageLoader
        'w:dev:ExternalImageLoader/code.js',
        // Mini complete http://dev.wikia.com/wiki/MiniComplete
        'w:c:dev:MiniComplete/code.js',
    ]
});
 
//File Links AutoUpdate
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js", "dev");
}
 
// ============================================================
//                       Custom Edit Buttons
// ============================================================
if (mwCustomEditButtons) {
 
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
     "speedTip": "Add the ō character",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Add the ū character",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
}
 
/* Auto Refresh */
AjaxRCRefreshText = 'Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:DISPLAYTITLE/code.js',
    ]
});