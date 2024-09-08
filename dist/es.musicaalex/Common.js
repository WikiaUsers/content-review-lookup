/* **************************************************
 * BOTONES ADICIONALES
 ****************************************************/
 
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
 Contador
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
 * Tablas colapsibles (De Wikipedia - en)
 *
 *  Permite ver solo el encabezado de las tablas, dejando el contenido oculto
 *               Ver [[wikipedia:Wikipedia:NavFrame]].
 */
 
var autoCollapse = 2;
var collapseCaption = "ocultar";
var expandCaption = "mostrar";
 
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
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
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
/* ********************
 * Refrescar automáticamente
 * Descripción: Refresca automáticamente 
 * la actividad reciente y cambios recientes
 *
 */
// Auto refrescar Wiki-actividad
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');