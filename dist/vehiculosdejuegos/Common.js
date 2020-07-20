/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* Any JavaScript here will be loaded for all users on every page load. */
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
//
// If the date is in the format "x|January 01 2007 00:00:00 PST", then the timer is periodic with period x seconds using the given date as the starting time.
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
  if(diff > 0) left = diff + ' días ' + left
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
  timers = getElementsByClassName(document, 'span', 'countdowndate');
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    var str = timers[i].firstChild.nodeValue;
    var j = str.indexOf('|');
    if(j == -1) timers[i].period = 0; else {
      timers[i].period = parseInt(str.substr(0, j));
      if(isNaN(timers[i].period) || timers[i].period < 0) timers[i].period = 0;
      str = str.substr(j + 1);
    }
    timers[i].eventdate = new Date(str);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
 
/*
 
/* 
El contenido aquí mostrado se aplicará en todos los skins, por favor, estas páginas afectan de forma muy significativa al funcionamiento del wiki, no las alteres a menos que estés completamente seguro de lo que estás haciendo. Gran parte del texto ha sido extraído de Inciclopedia y adaptado para Grand Theft Encyclopedia, por favor ten en cuenta al copiar el texto que es probable que no funcione correctamente en tu wiki. Gracias.
*/
 
/* Copyright (c) 2008 Kean Loong Tan http://www.gimiti.com/kltan
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * jFlow
 * Version: 1.2 (July 7, 2008)
 * Requires: jQuery 1.2+
 */
 
(function($) {
 
	$.fn.jFlow = function(options) {
		var opts = $.extend({}, $.fn.jFlow.defaults, options);
		var randNum = Math.floor(Math.random()*11);
		var jFC = opts.controller;
		var jFS =  opts.slideWrapper;
		var jSel = opts.selectedWrapper;
 
		var cur = 0;
		var maxi = $(jFC).length;
		// sliding function
		var slide = function (dur, i) {
			$(opts.slides).children().css({
				overflow:"hidden"
			});
			$(opts.slides + " iframe").hide().addClass("temp_hide");
			$(opts.slides).animate({
				marginLeft: "-" + (i * $(opts.slides).find(":first-child").width() + "px")}, 
				opts.duration*(dur),
				opts.easing,
				function(){
					$(opts.slides).children().css({
						overflow:"auto"
					});
					$(".temp_hide").show();
				}
			);
 
		}
		$(this).find(jFC).each(function(i){
			$(this).click(function(){
				if ($(opts.slides).is(":not(:animated)")) {
					$(jFC).removeClass(jSel);
					$(this).addClass(jSel);
					var dur = Math.abs(cur-i);
					slide(dur,i);
					cur = i;
				}
			});
		});	
 
		$(opts.slides).before('<div id="'+jFS.substring(1, jFS.length)+'"></div>').appendTo(jFS);
 
		$(opts.slides).find("div").each(function(){
			$(this).before('<div class="jFlowSlideContainer"></div>').appendTo($(this).prev());
		});
 
		//initialize the controller
		$(jFC).eq(cur).addClass(jSel);
 
		var resize = function (x){
			$(jFS).css({
				position:"relative",
				width: opts.width,
				height: opts.height,
				overflow: "hidden"
			});
			//opts.slides or #mySlides container
			$(opts.slides).css({
				position:"relative",
				width: $(jFS).width()*$(jFC).length+"px",
				height: $(jFS).height()+"px",
				overflow: "hidden"
			});
			// jFlowSlideContainer
			$(opts.slides).children().css({
				position:"relative",
				width: $(jFS).width()+"px",
				height: $(jFS).height()+"px",
				"float":"left",
				overflow:"auto"
			});
 
			$(opts.slides).css({
				marginLeft: "-" + (cur * $(opts.slides).find(":eq(0)").width() + "px")
			});
		}
 
		// sets initial size
		resize();
 
		// resets size
		$(window).resize(function(){
			resize();						  
		});
 
		$(opts.prev).click(function(){
			if ($(opts.slides).is(":not(:animated)")) {
				var dur = 1;
				if (cur > 0)
					cur--;
				else {
					cur = maxi -1;
					dur = cur;
				}
				$(jFC).removeClass(jSel);
				slide(dur,cur);
				$(jFC).eq(cur).addClass(jSel);
			}
		});
 
		$(opts.next).click(function(){
			if ($(opts.slides).is(":not(:animated)")) {
				var dur = 1;
				if (cur < maxi - 1)
					cur++;
				else {
					cur = 0;
					dur = maxi -1;
				}
				$(jFC).removeClass(jSel);
				slide(dur, cur);
				$(jFC).eq(cur).addClass(jSel);
			}
		});
	};
 
	$.fn.jFlow.defaults = {
		controller: ".jFlowControl", // must be class, use . sign
		slideWrapper : "#jFlowSlide", // must be id, use # sign
		selectedWrapper: "jFlowSelected",  // just pure text, no sign
		easing: "swing",
		duration: 400,
		width: "100%",
		prev: ".jFlowPrev", // must be class, use . sign
		next: ".jFlowNext" // must be class, use . sign
	};
 
})(jQuery);
 
 
 
 
 
 
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit )
		return;
	if(!document.getElementById('old-forum-warning') ||
		 !document.getElementById('ca-edit') )
		return;
 
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else if( skin == 'wikia' )
	{
		editLink = document.getElementByClassName('wikia-menu-button').firstChild;
	}
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archivado';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}
 
/* De Wikidex */
// Está obligando a hacer login para editar si no tiene cookies habilitadas
if (document.cookie.length == 0) {
	wgComboAjaxLogin = false;
}
 
/*
-------------------------------------
AYUDAS EMERGENTES Y ATAJOS DE TECLADO
-------------------------------------
Esta sección contiene las traducciones de los mensajes emergentes en
  los enlaces de los menús.
 
A su vez también define la tecla que se debe usar junto con la
  tecla ALT para acceder a esas páginas.
 
En algunos exploradores usan otra tecla especial para ello:
  por ejemplo el SeaMonkey usa MAYS+ALT+la tecla correspondiente.
*/
 
ta = new Object();
ta['pt-userpage'] = new Array('.','Mi página de usuario');
ta['pt-anonuserpage'] = new Array('.','La página de usuario de la IP desde la que editas');
ta['pt-mytalk'] = new Array('n','Mi página de discusión');
ta['pt-anontalk'] = new Array('n','Discusión sobre ediciones hechas desde esta dirección IP');
ta['pt-preferences'] = new Array('','Mis preferencias');
ta['pt-watchlist'] = new Array('l','La lista de páginas para las que estás vigilando los cambios');
ta['pt-mycontris'] = new Array('y','Lista de mis contribuciones');
ta['pt-login'] = new Array('o','Te animamos a registrarte, aunque no es obligatorio');
ta['pt-anonlogin'] = new Array('o','Te animamos a registrarte, aunque no es obligatorio');
ta['pt-logout'] = new Array('o','Salir de la sesión');
ta['ca-talk'] = new Array('t','Discusión acerca del artículo');
ta['ca-edit'] = new Array('e','Puedes editar esta página. Por favor, usa el botón de previsualización antes de grabar.');
ta['ca-addsection'] = new Array('+','Añade un comentario a esta discusión');
ta['ca-viewsource'] = new Array('e','Esta página está protegida, sólo puedes ver su código fuente');
ta['ca-history'] = new Array('h','Versiones anteriores de esta página y sus autores');
ta['ca-protect'] = new Array('=','Proteger esta página');
ta['ca-delete'] = new Array('d','Borrar esta página');
ta['ca-undelete'] = new Array('d','Restaurar las ediciones hechas a esta página antes de que fuese borrada');
ta['ca-move'] = new Array('m','Trasladar (renombrar) esta página');
ta['ca-watch'] = new Array('w','Añadir esta página a tu lista de seguimiento');
ta['ca-unwatch'] = new Array('w','Borrar esta página de tu lista de seguimiento');
ta['search'] = new Array('f','Buscar en este wiki');
ta['p-logo'] = new Array('','Portada');
ta['n-mainpage'] = new Array('z','Visitar la Portada');
ta['n-portal'] = new Array('','Acerca del proyecto, qué puedes hacer, dónde encontrar información');
ta['n-currentevents'] = new Array('','Información de contexto sobre acontecimientos actuales');
ta['n-recentchanges'] = new Array('r','La lista de cambios recientes en el wiki');
ta['n-randompage'] = new Array('x','Cargar una página aleatoriamente');
ta['n-help'] = new Array('','El lugar para aprender');
ta['n-sitesupport'] = new Array('','Respáldanos');
ta['t-whatlinkshere'] = new Array('j','Lista de todas las páginas del wiki que enlazan con ésta');
ta['t-recentchangeslinked'] = new Array('k','Cambios recientes en las páginas que enlazan con esta otra');
ta['feed-rss'] = new Array('','Sindicación RSS de esta página');
ta['feed-atom'] = new Array('','Sindicación Atom de esta página');
ta['t-contributions'] = new Array('','Ver la lista de contribuciones de este usuario');
ta['t-emailuser'] = new Array('','Enviar un mensaje de correo a este usuario');
ta['t-upload'] = new Array('u','Subir imágenes o archivos multimedia');
ta['t-specialpages'] = new Array('q','Lista de todas las páginas especiales');
ta['ca-nstab-main'] = new Array('c','Ver el artículo');
ta['ca-nstab-user'] = new Array('c','Ver la página de usuario');
ta['ca-nstab-media'] = new Array('c','Ver la página de multimedia');
ta['ca-nstab-special'] = new Array('','Esta es una página especial, no se puede editar la página en sí');
ta['ca-nstab-wp'] = new Array('a','Ver la página de proyecto');
ta['ca-nstab-image'] = new Array('c','Ver la página de la imagen');
ta['ca-nstab-mediawiki'] = new Array('c','Ver el mensaje de sistema');
ta['ca-nstab-template'] = new Array('c','Ver la plantilla');
ta['ca-nstab-help'] = new Array('c','Ver la página de ayuda');
ta['ca-nstab-category'] = new Array('c','Ver la página de categoría');
ta['ca-nstab-forum'] = new Array('c','Ver página del foro');
 
/*
-------------------
BOTONES ADICIONALES
-------------------
Añadido por: [[uncyclopedia:es:user:Chixpy]]
*/
 
 if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
     "speedTip": "Código fuente",
     "tagOpen": "<code><nowiki>",
     "tagClose": "</"+ "nowiki></code>",
     "sampleText": "Código fuente"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
     "speedTip": "Plantillas",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Plantilla"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enlace a usuario",
     "tagOpen": "[[user:",
     "tagClose": "|]]",
     "sampleText": "Usuario"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/6/64/Bot%C3%B3n_categor%C3%ADa.png",
     "speedTip": "Categoría",
     "tagOpen": "[[Category:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nombre categoría"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/7/7a/Bot%C3%B3n_tablas.png",
     "speedTip": "Insertar tabla",
     "tagOpen": '{| {' + '{tablabonita|alineacion=col1izq col2cen col3der|}}\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "!| encabezado 1\n!| encabezado 2\n!| encabezado 3\n|-\n|| fila 1, columna 1\n|| fila 1, columna 2\n|| fila 1, columna 3\n|-\n|| fila 2, columna 1\n|| fila 2, columna 2\n|| fila 2, columna 3"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/70/Button_fusion.png",
     "speedTip": "Pedir que se fusione el artículo a otro",
     "tagOpen": "{{fusionar|",
     "tagClose": "}}",
     "sampleText": "Nombre del artículo con el que se debe fusionar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
     "speedTip": "Página de desambiguación",
     "tagOpen": "{{desambiguacion}}",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ec/Button_aviso.png",
     "speedTip": "Advertir de vandalismo a un usuario",
     "tagOpen": "{{vandalismo|",
     "tagClose": "}}",
     "sampleText": "Motivo de aviso"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162808/es.gta/images/e/ef/Borrar.png",
     "speedTip": "Proponer el artículo para ser borrado",
     "tagOpen": "{{borrar|",
     "tagClose": "}}",
     "sampleText": "Motivo por el que se propone para borrar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/f3/Button_broom2.png",
     "speedTip": "Pedir que se arregle el artículo",
     "tagOpen": "{{arreglar|",
     "tagClose": "}}",
     "sampleText": "Motivo por el que se pide el arreglo"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162634/es.gta/images/d/d1/Sin_foto.png",
     "speedTip": "Advertir de que el artículo necesita imágenes",
     "tagOpen": "{{sinfoto}}",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162729/es.gta/images/c/c2/Enobras.png",
     "speedTip": "Advertir de que se está trabajando en el artículo",
     "tagOpen": "{{enobras|",
     "tagClose": "}}",
     "sampleText": "Nick del usuario"};
 }
 
/*

 
/* 
------------------
NOMBRE DEL USUARIO
------------------
Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
  o la [[Plantilla:NOMBREUSUARIO]]
 
Traida inicialmente de Uncyclopedia y corregida por uncyclopedia:es:user:Ciencia Al Poder ,
  para que funcione correctamente usando ''class='' en vez de ''id=''.
*/
 
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);
 
/*
 
-------------------------------------------------------------------------------
                    REDEFINICIONES DE COMPORTAMIENTO
-------------------------------------------------------------------------------
 
-------------------------------------
REDEFINICION DEL BOTÓN "SUBIR IMAGEN"
-------------------------------------
Añadido por: [[uncyclopedia:es:user:Chixpy]]
 
Aquí hago una redifición de la función llamada por el enlace subir imagen que hay en la barra de herramientas.
 
En vez de usar [[Special:MiniUpload]] llama a [[Special:Upload]]
*/
 
function specialImageUpload(tagOpen, tagClose, sampleText)
{
   // Hack: We need to know whether or not a user is logged in
   // before they can upload a file.  Therefore, to know whether or not
   // they are logged in, we can look for the "watch this" checkbox on
   // the edit page since this only appears when the user is logged in to
   // the site.  If they are not logged in, we display a message and prompt
   // to ask if they would like to log in now.  If they are logged in, we
   // open up the image upload popup window, and allow them to upload.
 
    // if user is not logged in
    if ( document.getElementById('wpWatchthis') == null )
      loginBeforeUpload();
    else
    {
    	var re = /http:\/\/([^\/]*)\//g;
    	var matches = re.exec(window.location.href);
    	if ( !matches ) {
		// TAH: firefox bug: have to do it twice for it to work
		matches = re.exec(window.location.href);
	}
	var domain = matches[1];
 
	//alert("logged in, let's open the image uploader popup: " + domain);
 
	if (imageUploadDialog && imageUploadDialog.open && !imageUploadDialog.closed)
	  imageUploadDialog.close();
 
    	imageUploadDialog = window.open("http://" + domain + "/wiki/Special:Upload",
          "upload_file",
          "toolbar=no,location=no,top=0,left=0,menubar=0,scrollbars=yes,width=800"); 
    }
}
 
 
/*
-----------------------------------------------
REDEFINICIÓN DE ORDENACIÓN DE TABLAS "SORTABLE"
-----------------------------------------------
Añadido por: [[uncyclopedia:es:user:Chixpy]]
 
Estos ingleses se creen el centro del universo y en las tablas que se
  pueden ordenar reconocen el punto como símbolo decimal así que hago
  este apaño para que lo haga correctamente..
*/
 
function ts_dateToSortKey(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	if (date.length == 11) {
		switch (date.substr(3,3).toLowerCase()) {
			case "ene": var month = "01"; break;
			case "feb": var month = "02"; break;
			case "mar": var month = "03"; break;
			case "abr": var month = "04"; break;
			case "may": var month = "05"; break;
			case "jun": var month = "06"; break;
			case "jul": var month = "07"; break;
			case "ago": var month = "08"; break;
			case "sep": var month = "09"; break;
			case "oct": var month = "10"; break;
			case "nov": var month = "11"; break;
			case "dic": var month = "12"; break;
			// default: var month = "00";
		}
		return date.substr(7,4)+month+date.substr(0,2);
	} else if (date.length == 10) {
		if (ts_europeandate == false) {
			return date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
		} else {
			return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
		}
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
		if (ts_europeandate == true) {
			return yr+date.substr(3,2)+date.substr(0,2);
		} else {
			return yr+date.substr(0,2)+date.substr(3,2);
		}
	}
	return "00000000";
}
 
//Modificado por Sanbec en WP-es aplicando la solución de WP en sueco
//(Anteriormente parece que solo cambiaba un punto)
//EXPERIMENTAL: Añadido además para que ordene los porcentajes.
function ts_parseFloat(num) {
        if (!num) return 0;
        num = num.replace("%", "");
        num = num.replace(/\./g, "");
        num = num.replace(/,/, ".");
        num = parseFloat(num);
        return (isNaN(num) ? 0 : num);
}
 
//Modificación hecha por Sanbec en WP-es para que ordene alfabéticamente bien
// ignorando acentos y no se limite a ordenarlo según el código ASCII.
function ts_sort_caseinsensitive(a,b) {
var aa = a[1].toLowerCase();
var bb = b[1].toLowerCase();
return(aa.localeCompare(bb));
}
 
/*
 
== Logo en buscador ==
*/
 
/*
	the ContentLoader class to encapsulate "creative differences" with XHR
 
		Usage:
				- construct a ContentLoader object: var loader = new ContentLoader();
				- set necessary state parameters (via fields); e.g. loader.myvar = 'mytext';
				- set the callback: loader.callback = myfunc;
				- send the request:
						loader.send(url, postdata = null, contentType = 'application/x-www-form-urlencoded');
						(if postdata isn't null or omitted, POST is used, otherwise GET)
				- the callback function is called when the content is loaded
						- the ContentLoader object is this
						- the raw response data is this.text
						- the XML DOM object, if any, is this.document
*/
function ContentLoader()
{
		this.cache = true;
}
 
ContentLoader.prototype.enableCache = function(caching)
{
		this.cache = (caching == null) ? true : this.cache;
}
 
ContentLoader.prototype.createRequest = function()
{
	if(typeof(XMLHttpRequest) != 'undefined')
	{
		return new XMLHttpRequest();
	}
	else if(typeof(ActiveXObject) != 'undefined')
	{
		return new ActiveXObject("Msxml2.XMLHTTP");
	}
 
	return null;
}
 
ContentLoader.prototype.send = function(url, postdata, contentType)
{
	var method = (postdata == null) ? 'GET' : 'POST';
	this.request = this.createRequest();
	this.request.open(method, url);
 
	if(!this.cache)
		this.request.setRequestHeader( "If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT" );
 
	var request = this.request;
	var loader = this;
 
	if(postdata == null)
	{
			if(contentType == null)
					contentType = 'application/x-www-form-urlencoded';
 
			request.setRequestHeader('Content-type', contentType);
	}
 
	var f = function()
		{
			if(request.readyState == 4)
			{
				loader.text = request.responseText;
				loader.document = request.responseXML;
				request = null;
				loader.request = null;
				loader.callback();
			}
		}
 
	this.request.onreadystatechange = f;
	this.request.send(postdata);
}
/*
	end ContentLoader
*/
 
function replaceSearchIcon()
{
return; // remove this line when you fix FIXME
        if (skin=="quartz"){return;}//no search icon to replace
	var innerDiv;
 
	var searchbox = document.getElementById('searchBody');
 
	if(searchbox)
	{
		innerDiv = searchbox.getElementsByTagName('div')[0];
		var link = innerDiv.getElementsByTagName('a')[0];
 
		if(link)
			innerDiv.removeChild(link);
	}
	else
	{
// there is no searchBox element anymore
		searchbox = getElementsByClassName(document.getElementById('searchBox'),  'div', 'r_boxContent')[0]; // FIXME
		innerDiv = searchbox.getElementsByTagName('div')[1];
	}
 
	var loader = new ContentLoader();
	loader.div = innerDiv;
	loader.callback = onSearchIconsArrival;
	loader.send('/index.php?title=Plantilla:Searchicons&action=raw');
}
 
addOnloadHook(replaceSearchIcon);
 
function rand(n)
{
	return Math.round(Math.random() * n);
}
 
function onSearchIconsArrival()
{
	var lines = this.text.split('\n');
	var line = lines[rand(lines.length - 1)];
	var pos = line.indexOf(' ');
 
	var link = document.createElement('div');
//	link.href = '/index.php?title=Special:Search&adv=1';
	link.id = 'search-icon-wrapper';
	var img = document.createElement('img');
	img.alt = 'Buscador';
	img.src = (pos == -1) ? line : line.substring(0, pos);
	link.appendChild(img);
 
	this.div.insertBefore(link, this.div.firstChild);
 
	var div = document.createElement('div');
	div.id = 'search-popup';
	div.style.display = 'none';
	var ul = document.createElement('ul');
 
	var li;
	var a;
 
	li = document.createElement('li');
	a = document.createElement('a');
	a.href = '/index.php?title=Special:Search&adv=1';
	a.appendChild(document.createTextNode('Búsqueda avanzada'));
	li.appendChild(a);
	ul.appendChild(li);
 
	li = document.createElement('li');
	a = document.createElement('a');
	a.href = (pos == -1) ? 'javascript:emptySearchDesc()' : '/wiki/' + line.substring(pos + 1);
	a.appendChild(document.createTextNode("¿Quién es? (" + ((pos == -1) ? 'NO DESCRIPTION' : line.substring(pos + 1)) + ')'));
	li.appendChild(a);
	ul.appendChild(li);
 
	li = document.createElement('li');
	a = document.createElement('a');
	a.href = 'javascript:closeSearchPopup()';
	a.appendChild(document.createTextNode("Cerrar"));
	li.appendChild(a);
	ul.appendChild(li);
 
	div.appendChild(ul);
	document.getElementById('globalWrapper').appendChild(div);
 
	link.onclick = openSearchPopup;
}
 
function openSearchPopup(event)
{
	var div = document.getElementById('search-popup');
	var e = event || window.event;
 
	div.style.display = (div.style.display == 'none') ? 'block' : 'none';
	div.style.left = e.clientX + 'px';
	div.style.top = (e.clientY + document.documentElement.scrollTop) + 'px';
}
 
function closeSearchPopup()
{
	document.getElementById('search-popup').style.display = 'none';
}
 
function emptySearchDesc()
{
	alert('No existe descripción para este ícono de búsqueda. Por favor contacta a los administradores para resolver este problema.');
}
 
 
/* Wikimediaplayer */
 
document.write('<script type="text/javascript" src="' 
+ '/w/index.php?title=MediaWiki:Wikimediaplayer.js'
+ '&action=raw&ctype=text/javascript&dontcountme=s&smaxage=3600"></script>');

/****************************************/
/* libraco */
/****************************************/
var photos = new Array();
photos = [
	/* this is the way to reference external images, if you want to us filters on the image
	{source:'imgproxy.php?url=http://www.netzgesta.de/lab/images/example/screen.jpg', caption:'external image'}, 
	*/
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/3/3e/Introducci%C3%B3n.png', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'anaglyph'}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/c/c9/Autobus_futurista.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'anaglyph'}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/c/c9/Batmobile.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'posterize',s:3}], delay:2, imgshift:0.001},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/5/55/Behemoth.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'invert'}], delay:3},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/e/ee/Bentley_Blower.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'solarize'}], delay:4, imgshift:0.5},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/7/79/BMW_M3.jpg', comment:'Source:http://vehiculosdejuegos.wikia.com', filter:[{f:'smooth',s:4}], delay:5, caption:'Knocking on heavens door!'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/2/2a/BMW_Z4.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'motionblur',s:[32,90]}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/6/62/Bonesaw.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'solarize'}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/f/f9/Cobretti_Severus.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'grayscale'}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/6/60/Culver_Especial_Detective.jpg', comment:'Source:http://vehiculosdejuegos.wikia.com', filter:[{f:'sepia'}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/d/d1/Delacate_Presta.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'adjustrgba',s:[1,2,3,1]}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/f/fa/Deutz-Fahr_Agrotron_X_720.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'mixrgb',s:[[0,0,255],[0,0,0]]}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/b/ba/Dirt.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'gamma',s:1.2}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/2/2e/Dodge_Challeger.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'tritone'}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/4/46/Sultan.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'brightness',s:1.2}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/e/e8/Ferrari_F2012.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'contrast',s:1.5}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/6/68/Tren_Umbrella.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'exposure',s:2}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/c/cc/Ford_Rally_Car.jpg', comment:'Source:http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/a/ac/General_Dynamics_LAV-25.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/d/db/Hot_rod.jpg', comment:'Source:http://vehiculosdejuegos.wikia.com', caption:'Ese es mi coche'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/0/06/Huntley_Sport.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/8/8a/Juggernaut.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/6/61/Kamikaze.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/3/31/Kaneda.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/5/52/Koenigsegg_Agera_R.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/5/5b/Lamborghini_Murcielago.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/1/1b/Lamborghini_Revent%C3%B3n.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/0/0b/Lord_Shaggy_JT_500.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', link:'http://www.publicdomainpictures.net/view-image.php?image=1151&picture=schokolade', target:'_blank'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/1/1c/Luciferon.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/c/c2/Mannheim-Baden.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/d/d9/Maserati_MC12.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/e/eb/Maserati.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/4/4a/Mitsubishi_Eclipse.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/5/50/Mitsubishi_Lancer_Evolution_VIII.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', caption:'A strong burning fire!'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/8/83/Morgan_3_Wheeler.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/5/53/Mrs_Venus.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com'},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/1/1b/Opel_Diplomat_E_Gobernor.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'motionblur',s:[32,270]}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/6/62/Quad_ATV.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'zoomblur',s:16}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/d/d0/Raven_X.jpg', comment:'Source:http://vehiculosdejuegos.wikia.com', filter:[{f:'smooth',s:6}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/7/77/Smith_S200.jpg', comment:'Source: http://vehiculosdejuegos.wikia.com', filter:[{f:'spinblur',s:4}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/9/90/Sentinel.jpg', comment:'Image is copyrighted and used for demonstration only!', filter:[{f:'adjusthsba',s:[1,2,1,1]},{f:'tiltshift',s:[.576,.3,0,4]}]},
	{source:'https://images.wikia.nocookie.net/chiquito/es/images/8/8d/V-Tol.jpg', comment:'http://vehiculosdejuegos.wikia.com', filter:[{f:'adjusthsba',s:[1,2,1,1]},{f:'tiltshift',s:[.33,.3,1,3]}]},
];
window.onload = function() {
	booklet.add(document.getElementById('wrapper'),{
		imagearray: photos,
		language: get_Booklet_Language(),
		covertexture:'sunrise/cover.jpg',
		overlayimage: '',
		buttonbgcolor: '#600000',
		buttonfgcolor: '#f0e0d0',
		pagecolor : '#141214',
		buttonradius: 10, 
		poweroftwo: 3,
		playdelay: 6,
		mainwidth: 1000, 
		mainheight: 474,
		doublepage: true,
		topdownshadow: true,
		forcecaption: true,
		forceimginfo: true,
		noradius: true,
		verbose: false
	});
}
/**
 * booklet.js 1.3 (02-Feb-2011) (c) by Christian Effenberger
 * All Rights Reserved. Source: booklet.netzgesta.de
 * Distributed under Netzgestade Software License Agreement.
 * This license permits free of charge use on non-commercial
 * and private web sites only under special conditions.
 * Read more at... http://www.netzgesta.de/cvi/LICENSE.txt
 * Compatible browsers: Firefox 2+, Safari 2+, Chrome 4+,
 *						Internet Explorer 6+, Opera 9

 syntax:
 
	booklet.defaultCallback			= "";				//STR function name
	booklet.defaultGifpath			= "images/nop.gif"; //STR function name
	booklet.defaultLanguage			= null;				//OBJ e.g. cvi_bt_en
 
 		var cvi_bt_en=new Object();
		cvi_bt_en.overlaytext = "loading images...";	//STR text below spinner animation
		cvi_bt_en.playbutton  = "play/pause";			//STR button title text
		cvi_bt_en.nextbutton  = "next";					//STR button title text
		cvi_bt_en.prevbutton  = "previous";				//STR button title text
		cvi_bt_en.firstbutton = "first";				//STR button title text
		cvi_bt_en.lastbutton  = "last";					//STR button title text
		cvi_bt_en.fwardbutton = "5x forward";			//STR button title text
		cvi_bt_en.bwardbutton = "5x backward";			//STR button title text
		cvi_bt_en.menubutton  = "back to contents";		//STR button title text
		cvi_bt_en.listbutton  = "imprint/epilog";		//STR button title text
		cvi_bt_en.tablebutton = "table of contents";	//STR button title text
		...
 
	booklet.defaultImagearray		= null;			//OBJ e.g. photos
	
		var photos = [
			{
				source: 'path/file.jpg', 	// required (minimum dimension 64x64)
				caption: 'string',			// optional
				comment: 'string',			// optional
				imgshift : Float,			// optional image shift value (0==top|left, 0.5==center, 1==bottom|right)
				delay : Float,				// optional delay value (seconds)
			  	link: 'URL',				// optional (js-function by "javascript:...")
			  	title: 'string',			// optional
			  	target: '_self',			// optional
				filter: [{f:'grayscale'},{f:'emboss', s:1}...] (depends on cvi_filter_lib.js) // optional
			}
		];
	
	
	** depends on: cvi_filter_lib.js (syntax at: filter.netzgesta.de) **
	booklet.defaultFilter			= null;			//OBJ e.g. [{f:'grayscale'},{f:'emboss', s:1}...] 
	booklet.defaultFiltertoc		= false;		//BOOLEAN filter also the thumbnails
	booklet.defaultForceglobal		= false;		//BOOLEAN force global filter over local filter
	** depends on: cvi_filter_lib.js **
	
	booklet.defaultMainwidth		= 600;			//INT 280|180-n (px width) 
	booklet.defaultMainheight		= 400;			//INT 180|280-n (px height)
	booklet.defaultShade			= 50;			//INT 1-100 (% opacity)
	booklet.defaultShadow			= 50;			//INT 1-100 (% opacity)
	booklet.defaultPoweroftwo		= 4;			//INT 2x2 | 3x3 | 4x4 ... TOC thumbs per page
	booklet.defaultImprintheader	= "";			//STR imprint header text
		header == <big>...</big>  				
	booklet.defaultImprintbody		= "";			//STR imprint body text
		body == <em>...[<tt>...<b>...</b></tt>]</em>
	booklet.defaultImprintfooter	= "";			//STR imprint footer text
		footer == <small>...</small>
	booklet.defaultDoublepage		= false;		//BOOLEAN 1 image fills 2 pages
	booklet.defaultCalendarmode		= false;		//BOOLEAN Top 2 Bottom instead of Left 2 Right
	booklet.defaultTopdownshadow	= false;		//BOOLEAN instead of leftTop to RightBottom
	booklet.defaultForcecaption		= false;		//BOOLEAN use the filename if caption is missing
	booklet.defaultForceimginfo		= false;		//BOOLEAN append image dimensions and used filters to comment
	booklet.defaultAutoplay			= false; 		//BOOLEAN set automode to on|off
	booklet.defaultVerbose			= false; 		//BOOLEAN console output is more chatty (warnings)
	booklet.defaultBuffered			= false;		//BOOLEAN set render buffer to on|off
	booklet.defaultNoshadow			= false;		//BOOLEAN set shadow to on|off
	booklet.defaultNocover			= false;		//BOOLEAN set cover to on|off
	booklet.defaultNopanel			= false;		//BOOLEAN lock the navigation panel
	booklet.defaultNoradius			= false;		//BOOLEAN set cover radius to on|off
	booklet.defaultNotoc			= false;		//BOOLEAN toc equals Table of contents
	booklet.defaultTocfirst			= false;		//BOOLEAN starts up with the toc
	booklet.defaultToctooltip		= false;		//BOOLEAN tooltip instead of overlay text
		name   == <small>......</small>
		number == <small><b>...</b></small>
	
	booklet.defaultPagecolor		= '#f8f8f8';	//STR '#000000'-'#ffffff'
	booklet.defaultCovercolor		= '#808080';	//STR '#000000'-'#ffffff'
	booklet.defaultSelectorcolor	= '#000000'; 	//STR '#000000'-'#ffffff'
	booklet.defaultCovertexture		= '';			//STR (image source)
	booklet.defaultTextureopacity	= 100;			//FLT 1-100 (% opacity)
	booklet.defaultInfobgopacity	= 50; 			//FLT 1-100 (% opacity)
	booklet.defaultLayeropacity		= 50; 			//FLT 1-100 (% opacity)	
	booklet.defaultLayercolor		= '#ffffff'; 	//STR '#000000'-'#ffffff'
	booklet.defaultInfobgcolor		= '#000000'; 	//STR '#000000'-'#ffffff'
	booklet.defaultInfotxcolor		= '#ffffff'; 	//STR '#000000'-'#ffffff'
		caption == <big>...</big>  				
		comment == <em>...[<tt>...<b>...</b></tt>]</em>
		number  == <small>...</small>
	
	booklet.defaultAnimsteps		= 0; 			//INT 0-n equals anim steps (0 == use pxperstep value)
	booklet.defaultPxperstep		= 16; 			//INT 1-n equals pixel per step
	booklet.defaultFramedelay		= 33; 			//INT 20-50 equals milli seconds (1/1000)
	booklet.defaultPlaydelay		= 0; 			//INT 0-n equals seconds
	booklet.defaultLoadtimeout		= 3; 			//INT 1-60 equals seconds
	booklet.defaultMeter			= false;		//BOL  (true | false)
	booklet.defaultNotrans:		 	= false;		//BOL  no transposing from Mfgcolor to Mftcolor
	booklet.defaultMfgcolor			= '#008000';	//STR  '#000000'-'#ffffff'
	booklet.defaultMftcolor			= '#ff0000';	//STR  '#000000'-'#ffffff'
	booklet.defaultMbgcolor			= '#ffffff';	//STR  '#000000'-'#ffffff'
	booklet.defaultMopacity			= 0.5;			//FLT  0.1-1.0 (opacity)
	booklet.defaultMsize			= 32;			//INT  24-min(width,height)
	booklet.defaultMposx			= 10;			//INT  0-(width-msize)
	booklet.defaultMposy			= 10;			//INT  0-(height-msize)
	booklet.defaultButtonsize 		= 32; 			//INT 24|32|40|48|56|64 (px)
	booklet.defaultButtonradius 	= 100; 			//FLT 0.001-100 (% of half size)
	booklet.defaultButtonfgcolor	= '#ffffff'; 	//STR (text) hex color declaration '#000000'-'#ffffff'
	booklet.defaultButtonbgcolor	= '#000000';	//STR (background) hex color declaration '#000000'-'#ffffff'
	booklet.defaultOverlayimage		= "images/logo.png"; //STR (text) background-image 
	booklet.defaultOverlaystyle		= "font-weight:bold; font-size:14px; color:grey;"; 	//STR (text) style sheet declaration e.g. "color: black;" or style sheet classes e.g. "overlay text"
	
	booklet.defaultOverlayoptions	= {color:'white', opacity:0.5};	//OBJ default values [overlay syntax]
	
	overlay syntax:
		color	: 'white'	//STR css color declaration e.g. 'black' or '#000000' or 'rgb(0,0,0)' 
		opacity : 0.5		//FLT 0.0 - 1.0
		
	booklet.defaultBusyoptions		= {color:'#000000', size:100, type:'o'}; //OBJ default values [busy syntax]
		
	busy syntax:
		color	: '#000'	//STR '#000000' - '#ffffff' or '#000' - '#fff' 
		size	: 32		//INT 16 - 512 (pixel)
		type	: 'tube'	//STR 'circle|oval|polygon|rectangle|tube' or 'c|o|p|r|t' 
		iradius	: 8			//INT 6 - 254 (pixel) 
		weight	: 3			//INT 1 - 254 (pixel) 
		count	: 12		//INT 5 - 36 (rays) 
		speed	: 96		//INT 30 - 1000 (millisec) 
		minopac : 0.25		//FLT 0.0 - 0.5 (opacity)

	booklet.add( object, options );
	
	booklet.first( object );
	booklet.prev( object );
	booklet.show( object, image_number );
	booklet.play( object );
	booklet.stop( object );
	booklet.next( object );
	booklet.last( object );
	
VAL=booklet.get( object, ['setup'|'blocked'|'curling'|'playing'|'current'|'total'|'viewmode'|'origin'|'imginfo', image_number] );
	setup		== uninitialized  			//BOL
	blocked		== unaccessible  			//BOL
	curling		== transition in action 	//BOL
	playing 	== autoplay in action 		//BOL
	current		== current image number 	//INT (starting with zero)
	total		== no. of all images  		//INT
	viewmode	== matches "image" or "toc"	//STR
	origin		== location protocol & host //STR
	imginfo		== [name|source|abs_url|diff_origin|filter|width|height] //OBJ
	
	booklet.set( object, [playdelay'|'nopanel'], value );
	playdelay 	value = //INT 0 - n seconds
	nopanel	  	value = //BOL true | false
	
	booklet.data( object, imagearray, options );
		options		e.g. {verbose: true, playdelay: 3, ...}
			language		= cvi_bt_en;	//OBJ e.g. cvi_bt_en
			filter			= null;			//OBJ e.g. [{f:'grayscale'},{f:'emboss', s:1}...]
			filtertoc		= false;		//BOOLEAN filter also the thumbnails
			tocfirst		= false;		//BOOLEAN starts up with the toc
			nopanel	  		= false; 		//BOOLEAN lock the navigation panel
			autoplay		= false; 		//BOOLEAN set automode to on|off
			verbose			= false; 		//BOOLEAN console output is more chatty (warnings)
			forcecaption	= false; 		//BOOLEAN use the filename if caption is missing
			forceimginfo	= false;		//BOOLEAN append image dimensions to comment
			forceglobal		= false;		//BOOLEAN force global filter over local filter
			toctooltip		= false;		//BOOLEAN tooltip instead of overlay text
			buffered		= false;		//BOOLEAN set render buffer to on|off
			meter			= false;		//BOOLEAN duration meter (true | false)
			notrans			= false;		//BOOl no transposing from Mfgcolor to Mftcolor
			mfgcolor		= '#008000';	//STR '#000000'-'#ffffff'
			mftcolor		= '#ff0000';	//STR '#000000'-'#ffffff'
			mbgcolor		= '#ffffff';	//STR '#000000'-'#ffffff'
			mopacity		= 0.5;			//FLT 0.1 - 1.0 (opacity)
			msize			= 32;			//INT 24 - min(width,height)
			mposx			= 10;			//INT 0 - (width-msize)
			mposy			= 10;			//INT 0 - (height-msize)
			loadtimeout		= 3; 			//INT 1-60 equals seconds
			playdelay		= 0; 			//INT 0-n equals seconds
			animsteps		= 0; 			//INT 0-n equals anim steps (0 == use pxperstep value)
			framedelay		= 33; 			//INT 20-50 equals milli seconds (1/1000)
			pxperstep		= 16; 			//INT 1-n equals pixel per step
	
	booklet.remove( object, fadeout );
BOL=booklet.vml();
BOL=booklet.canvas();
FLT=booklet.version;
STR=booklet.released;

Hierarchy

	div "name" == super wrapper
		div "name_main" == outer wrapper
			canvas "name_cover" == output from cvi_bt_cover.js
			div "name_frame" == inner wrapper
				canvas "name_crlyid" == curl page painter output
				canvas "name_ltlyid" == left top page painter output
				canvas "name_rblyid" == right bottom page painter output
				div "name_thumb" == thumb selector 
					div unnamed background
					div unnamed background
					div unnamed background
					div unnamed background
					canvas unnamed background
					div unnamed text wrapper
						div unnamed text background
						div "name_thumb_text" == thumb text
				div "name_lt_text" == left top popup text wrapper
					div unnamed placeholder
					div "name_lt_content" == left top inner text wrapper
						span unnamed 
				a "name_lt_link" == left top link button wrapper
					div unnamed placeholder
				div "name_lt_info" == left top info button wrapper
					canvas "name_lt_bt_info" == output from cvi_bt_ctrl.js
				div "name_lt_event" == left top curl button wrapper
				div "name_rb_text" == right bottom popup text wrapper
					div unnamed placeholder
					div "name_rb_content" == right bottom inner text wrapper
						span unnamed 
				a "name_rb_link" == right bottom link button wrapper
					div unnamed placeholder
				div "name_rb_info" == right bottom info button wrapper
					canvas "name_rb_bt_info" == output from cvi_bt_ctrl.js
				div "name_rb_event" == right bottom curl button wrapper
				div "name_thumbs" == thumb selector area
				div "name_lock" == blocking visual access 
				div "name_bt_event" == centered ctrl button wrapper
					table "name_ctrl" == centered ctrl button wrapper
						td "name_td_first" 
							canvas "name_bt_first" == output from cvi_bt_ctrl.js
						td "name_td_bward" 
							canvas "name_bt_bward" == output from cvi_bt_ctrl.js
						td "name_td_prev" 
							canvas "name_bt_prev" == output from cvi_bt_ctrl.js
						td "name_td_table" 
							canvas "name_bt_table" == output from cvi_bt_ctrl.js
						td "name_td_play" 
							canvas "name_bt_play" == output from cvi_bt_ctrl.js
						td "name_td_list" 
							canvas "name_bt_list" == output from cvi_bt_ctrl.js
						td "name_td_next" 
							canvas "name_bt_next" == output from cvi_bt_ctrl.js
						td "name_td_fward" 
							canvas "name_bt_fward" == output from cvi_bt_ctrl.js
						td "name_td_last" 
							canvas "name_bt_last" == output from cvi_bt_ctrl.js
					table "name_ctoc" == centered ctoc button wrapper
						td "name_tc_first" 
							canvas "name_bc_first" == output from cvi_bt_ctrl.js
						td "name_tc_prev" 
							canvas "name_bc_prev" == output from cvi_bt_ctrl.js
						td "name_tc_menu" 
							canvas "name_bc_menu" == output from cvi_bt_ctrl.js
						td "name_tc_next" 
							canvas "name_bc_next" == output from cvi_bt_ctrl.js
						td "name_tc_last" 
							canvas "name_bc_last" == output from cvi_bt_ctrl.js
									
 *
**/

var booklet = {version : 1.3, released : '2011-02-02 12:00:00',
	defaultCallback : "",
	defaultGifpath : "images/nop.gif",
	defaultLanguage : null,
	defaultImagearray : null,
	defaultFilter : null,
	defaultMainwidth : 600,
	defaultMainheight : 400,
	defaultShade : 50,
	defaultShadow : 50,
	defaultDoublepage : false,
	defaultCalendarmode : false,
	defaultPagecolor : '#f8f8f8',
	defaultTopdownshadow : false,
	defaultNoshadow : false,
	defaultNocover : false,
	defaultNopanel : false,
	defaultCovercolor : '#808080',
	defaultCovertexture : '',
	defaultTextureopacity : 100,
	defaultNoradius : false,
	defaultButtonsize : 32,
	defaultButtonradius : 100,
	defaultButtonfgcolor : '#ffffff',
	defaultButtonbgcolor : '#000000',
	defaultMeter: false,
	defaultMfgcolor: '#008000',
	defaultMftcolor: '#ff0000',
	defaultMbgcolor: '#ffffff',
	defaultNotrans: false,
	defaultMopacity: 0.5,
	defaultMsize: 32,
	defaultMposx: 10,
	defaultMposy: 10,
	defaultImprintheader : "",
	defaultImprintbody	: "",
	defaultImprintfooter : "",
	defaultInfobgopacity : 50,
	defaultInfotxcolor : '#ffffff',
	defaultInfobgcolor : '#000000',
	defaultForcecaption	: false,
	defaultForceimginfo	: false,
	defaultSelectorcolor : '#000000',
	defaultLayercolor : '#ffffff',
	defaultLayeropacity : 50,
	defaultPoweroftwo : 4,
	defaultAnimsteps : 0,
	defaultPxperstep : 16,
	defaultFramedelay : 33,
	defaultToctooltip : false,
	defaultFiltertoc : false,
	defaultForceglobal : false,
	defaultBuffered : false,
	defaultNotoc : false,
	defaultTocfirst : false,
	defaultVerbose : false,
	defaultPlaydelay : 0,
	defaultAutoplay : false,	
	defaultLoadtimeout : 3,
	defaultOverlayimage : "",
	defaultOverlaystyle : "font-weight:bold; font-size:14px; color:white; text-shadow: 0px 0px 3px black;",
	defaultOverlayoptions : {color:'white', opacity:0.5},
	defaultBusyoptions : {color:'#000000', size:100, type:'o'},
    vml	: function() {var vs=false; if(document.all&&document.namespaces&&!window.opera) {var a=document.body.appendChild(document.createElement('div'));a.innerHTML='<v:shape id="vml_flag1" adj="1" />';var b=a.firstChild;b.style.behavior="url(#default#VML)";vs=b?typeof b.adj=="object":true;a.parentNode.removeChild(a);} return vs;},//IE resource
	canvas : function(v) {var c=false,t=document.createElement('canvas'); if(t.tagName.toUpperCase()=="CANVAS") {try {c=t.getContext("2d");}catch(e) {}} if(c&&v&&(typeof v==='string')){if(c[v]){return true;}else if(t[v]){return true;}else{return false;}}else {return Boolean(c);}},
	engine : (window.opera?"O":document.all&&!window.opera?"Ms":navigator.userAgent.indexOf('WebKit')>-1?"Webkit":navigator.userAgent.indexOf('KHTML')>-1&&navigator.userAgent.indexOf('WebKit')==-1?"Khtml":navigator.userAgent.indexOf('Gecko')>-1&&window.updateCommands?"Moz":""),
	gif : "data:image/gif;base64,R0lGODlhAQABAJH/AP///wAAAP///wAAACH/C0FET0JFOklSMS4wAt7tACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==",				
	add : function(obj,opts) {
		function uniqueID() {var val=Date.parse(new Date())+Math.floor(Math.random()*100000000000); return val.toString(16);}
		function getFName(v,s) {var fn=v.replace(/^.*[\/\\]/g, ''),t=fn.lastIndexOf(".");if(s&&t>0) {fn=fn.substring(0,t);}return fn;};
		function getArg(a,t) {return (typeof opts[a]===t?opts[a]:obj.opts[a]);};
		if(obj.tagName.toUpperCase()=="IMG"&&obj.parentNode.tagName.toUpperCase()=="DIV") {var z=obj.parentNode;obj=z;}
		if(obj&&!obj.mainid) {var i,l,w,h,st,bt,tr,td,ctx,main,tmp; if(typeof obj.bak!=='object') {obj.bak=obj.cloneNode(true);} obj.setup=false; obj.curling=false; obj.callafter='';
			obj.vml=booklet.vml();//IE resource
			obj.w3c=booklet.canvas(); 
			obj.gid=booklet.canvas('getImageData');
			obj.cfa=Boolean(typeof(cvi_filter)!='undefined');
			obj.ttn=booklet.engine.match(/(Ms|Webkit)/i);
			obj.wcs=navigator.userAgent.indexOf('WebKit')!=-1&&!window.external&&!document.defaultCharset?1:0;
			obj.ie6=document.documentMode?0:1; //IE resource
			obj.ie8=document.documentMode&&document.documentMode==8?1:0; //IE resource
			obj.chakra=document.documentMode&&document.documentMode>=9?1:0;
			if(obj.vml||obj.w3c) {//IE resource
				obj.innerHTML="";
				var defopts={
					"callback": booklet.defaultCallback,
					"gifpath": booklet.defaultGifpath,
					"language" : booklet.defaultLanguage,
					"imagearray" : booklet.defaultImagearray,
					"mainwidth" : booklet.defaultMainwidth,
					"mainheight" : booklet.defaultMainheight,
					"shade" : booklet.defaultShade,
					"shadow" : booklet.defaultShadow,
					"doublepage" : booklet.defaultDoublepage,
					"calendarmode" : booklet.defaultCalendarmode,
					"poweroftwo" : booklet.defaultPoweroftwo,
					"pagecolor" : booklet.defaultPagecolor,
					"layercolor" : booklet.defaultLayercolor,
					"covercolor" : booklet.defaultCovercolor,
					"topdownshadow" : booklet.defaultTopdownshadow,
					"noshadow" : booklet.defaultNoshadow,
					"nocover" : booklet.defaultNocover,
					"nopanel" : booklet.defaultNopanel,
					"notoc" : booklet.defaultNotoc,
					"tocfirst" : booklet.defaultTocfirst,
					"toctooltip" : booklet.defaultToctooltip,
					"covertexture" : booklet.defaultCovertexture,
					"textureopacity" : booklet.defaultTextureopacity,
					"selectorcolor" : booklet.defaultSelectorcolor,
					"forcecaption" : booklet.defaultForcecaption,
					"forceimginfo" : booklet.defaultForceimginfo,
					"noradius" : booklet.defaultNoradius,
					"overlayoptions" : booklet.defaultOverlayoptions,
					"filtertoc" : booklet.defaultFiltertoc,
					"forceglobal" : booklet.defaultForceglobal,
					"layeropacity" : booklet.defaultLayeropacity,
					"overlayimage" : booklet.defaultOverlayimage,
					"overlaystyle" : booklet.defaultOverlaystyle,
					"busyoptions" : booklet.defaultBusyoptions,
					"loadtimeout" : booklet.defaultLoadtimeout,
					"playdelay" : booklet.defaultPlaydelay,
					"animsteps" : booklet.defaultAnimsteps,
					"pxperstep" : booklet.defaultPxperstep,
					"framedelay" : booklet.defaultFramedelay,
					"buffered" : booklet.defaultBuffered,
					"verbose" : booklet.defaultVerbose,
					"filter" : booklet.defaultFilter,
					"meter": booklet.defaultMeter,
					"notrans": booklet.defaultNotrans,
					"mfgcolor": booklet.defaultMfgcolor,
					"mftcolor": booklet.defaultMftcolor,
					"mbgcolor": booklet.defaultMbgcolor,
					"mopacity": booklet.defaultMopacity,
					"msize": booklet.defaultMsize,
					"mposx": booklet.defaultMposx,
					"mposy": booklet.defaultMposy,
					"autoplay" : booklet.defaultAutoplay,
					"buttonsize" : booklet.defaultButtonsize,
					"buttonradius" : booklet.defaultButtonradius,
					"infobgopacity" : booklet.defaultInfobgopacity,
					"infotxcolor" : booklet.defaultInfotxcolor,
					"infobgcolor" : booklet.defaultInfobgcolor,
					"buttonbgcolor" : booklet.defaultButtonbgcolor,
					"buttonfgcolor" : booklet.defaultButtonfgcolor,
					"imprintheader" : booklet.defaultImprintheader,
					"imprintbody" : booklet.defaultImprintbody,
					"imprintfooter" : booklet.defaultImprintfooter
				};
				if(opts) {for(i in defopts){if(!opts[i]){opts[i]=defopts[i];}}}else{opts=defopts;} tmp=(typeof opts['imagearray']==='object'?opts['imagearray']:new Array());
				if(tmp&&tmp.length&&tmp.length>1) {obj.photo=tmp; tmp='';
					//IE resource START
					if(obj.vml) {
						if(document.namespaces['v']==null) {
							var e=["shape","shapetype","group","background","path","formulas","handles","fill","stroke","shadow","textbox","textpath","imagedata","line","polyline","curve","roundrect","oval","rect","arc","image"],s=document.createStyleSheet(); 
							for(var i=0; i<e.length; i++) {s.addRule("v\\:"+e[i],"behavior: url(#default#VML);");} document.namespaces.add("v","urn:schemas-microsoft-com:vml");
						}
					}
					//IE resource END
					for(i=0,l=obj.photo.length; i<l; i++) {
						obj.photo[i].n=getFName(obj.photo[i].source,true).replace(/(_+|-+|\.+)/g," "); 
						if(typeof(obj.photo[i].caption)=='undefined') {obj.photo[i].caption='';}
					}
					obj.ios=navigator.platform.match(/^iPod|iPad|iPhone$/i); obj.viewmode="image"; obj.blocked=true;
					obj.boxmode=(document.compatMode=='BackCompat'||document.compatMode=='QuirksMode'?true:false);  
					obj.opts=opts; obj.language=getArg('language','object'); obj.filter=getArg('filter','object');
					obj.calendarmode=getArg('calendarmode','boolean'); 
					obj.notoc=obj.vml?true:getArg('notoc','boolean'); //IE resource
					obj.gifpath=getArg('gifpath','string')||"images/nop.gif"; //IE resource
					tmp=getArg('mainwidth','number'); obj.mainwidth=parseInt(Math.max(obj.calendarmode?180:obj.notoc?280:308,tmp%2==0?tmp:tmp-1));
					tmp=getArg('mainheight','number'); obj.mainheight=parseInt(Math.max(obj.calendarmode?obj.notoc?280:308:180,tmp%2==0?tmp:tmp-1));
					obj.overlayimage=getArg('overlayimage','string'); obj.overlaystyle=getArg('overlaystyle','string');
					obj.overlayoptions=getArg('overlayoptions','object'); obj.busyoptions=getArg('busyoptions','object');
					obj.selectorcolor=booklet.C(getArg('selectorcolor','string'),obj.opts['selectorcolor']);
					obj.buttonfgcolor=booklet.C(getArg('buttonfgcolor','string'),obj.opts['buttonfgcolor']);
					obj.buttonbgcolor=booklet.C(getArg('buttonbgcolor','string'),obj.opts['buttonbgcolor']);
					obj.infotxcolor=booklet.C(getArg('infotxcolor','string'),obj.opts['infotxcolor']);
					obj.infobgcolor=booklet.C(getArg('infobgcolor','string'),obj.opts['infobgcolor']);
					obj.pagecolor=booklet.C(getArg('pagecolor','string'),obj.opts['pagecolor']);
					obj.covercolor=booklet.C(getArg('covercolor','string'),obj.opts['covercolor']);
					obj.layercolor=booklet.C(getArg('layercolor','string'),obj.opts['layercolor']);
					obj.imprintheader=getArg('imprintheader','string'); obj.imprintbody=getArg('imprintbody','string'); 
					obj.imprintfooter=getArg('imprintfooter','string'); obj.callback=getArg('callback','string');
					obj.noimprint=(obj.imprintheader!=""||obj.imprintbody!=""||obj.imprintfooter!=""?false:true);
					tmp=getArg('buttonsize','number'); while(tmp%8!=0) {tmp=tmp+1;}; obj.buttonsize=Math.max(24,Math.min(64,tmp));
					tmp=getArg('buttonradius','number'); obj.buttonradius=(tmp<=1?0:Math.max(Math.min(tmp,100),1));
					obj.loadtimeout=parseInt(Math.max(1,Math.min(60,getArg('loadtimeout','number'))))*1000;
					obj.playdelay=parseInt(Math.max(0,Math.min(3600,getArg('playdelay','number'))));
					obj.autoplay=getArg('autoplay','boolean'); obj.verbose=getArg('verbose','boolean'); 
					obj.toctooltip=getArg('toctooltip','boolean'); obj.filtertoc=getArg('filtertoc','boolean');
					tmp=getArg('shade','number'); obj.shade=tmp<0.01?0.0:Math.max(Math.min(tmp,100),1)*.01;
					tmp=getArg('shadow','number'); obj.shadow=tmp<0.01?0.0:Math.max(Math.min(tmp,100),1)*.01; 
					tmp=getArg('textureopacity','number'); obj.textureopacity=tmp<0.01?0.0:Math.max(Math.min(tmp,100),1)*.01;
					tmp=getArg('infobgopacity','number'); obj.infobgopacity=tmp<0.01?0.0:Math.max(Math.min(tmp,100),1)*.01;
					tmp=getArg('layeropacity','number'); obj.layeropacity=tmp<0.01?0.0:Math.max(Math.min(tmp,100),1)*.01;
					obj.poweroftwo=Math.max(Math.min(getArg('poweroftwo','number'),8),2); obj.buffered=getArg('buffered','boolean');
					obj.forcecaption=getArg('forcecaption','boolean'); obj.forceimginfo=getArg('forceimginfo','boolean'); 
					obj.doublepage=getArg('doublepage','boolean'); obj.nocover=getArg('nocover','boolean'); 
					obj.nopanel=getArg('nopanel','boolean'); obj.forceglobal=getArg('forceglobal','boolean');
					obj.noshadow=getArg('noshadow','boolean'); obj.topdownshadow=getArg('topdownshadow','boolean');
					obj.noradius=getArg('noradius','boolean'); obj.covertexture=getArg('covertexture','string');
					obj.bt=obj.notoc?["first","bward","prev","play","next","fward","last"]:["first","bward","prev","table","play","list","next","fward","last"];
					obj.bc=["first","prev","menu","next","last"]; obj.tc=-1; obj.tocfirst=obj.notoc?false:getArg('tocfirst','boolean');
					obj.tm=!obj.doublepage&&obj.poweroftwo%2!=0?parseInt(obj.poweroftwo-1,10):obj.poweroftwo; 
					obj.curimg=0; obj.curtoc=0; obj.automode=false; obj.id=obj.id!='undefined'?obj.id:uniqueID();
					obj.frameb=obj.nocover?0:Math.round((obj.mainwidth+obj.mainheight)/200); 
					obj.frameo=0; obj.framep=40; obj.framei=24;
					obj.framewidth=obj.mainwidth-(4*obj.frameb); 
					obj.frameheight=obj.mainheight-(4*obj.frameb); 
					obj.framex=obj.frameb*2; 
					obj.framey=obj.frameb*2; 
					if(!obj.noshadow) {
						obj.frameo=Math.round((obj.mainwidth+obj.mainheight)/150); 
						obj.framex=(obj.topdownshadow?obj.framex+obj.frameo:obj.framex); 
						obj.framewidth=obj.framewidth-(2*obj.frameo); 
						obj.frameheight=obj.frameheight-(2*obj.frameo);
					} 
					while((obj.bt.length*obj.buttonsize)>((obj.calendarmode?obj.frameheight:obj.framewidth)-(2*obj.framep))) {
						obj.buttonsize=obj.buttonsize-8;
					}; 
					obj.meter=getArg('meter','boolean'); obj.notrans=getArg('notrans','boolean');
					obj.mfgcolor=booklet.C(getArg('mfgcolor','string'),obj.opts['mfgcolor']); obj.mfgc=booklet.R(obj.mfgcolor);
					obj.mftcolor=booklet.C(getArg('mftcolor','string'),obj.opts['mftcolor']); obj.mftc=booklet.R(obj.mftcolor);
					obj.mbgcolor=booklet.C(getArg('mbgcolor','string'),obj.opts['mbgcolor']); obj.mbgc=booklet.R(obj.mbgcolor);
					tmp=getArg('mopacity','number'); obj.mopacity=tmp<0.1?0.5:Math.max(Math.min(tmp,1.0),0.1);
					tmp=getArg('msize','number'); obj.msize=parseInt(tmp<24?32:Math.max(Math.min(tmp,Math.min(obj.framewidth,obj.frameheight)),24),10);
					tmp=getArg('mposx','number'); obj.mposx=parseInt(tmp<1?0:Math.max(Math.min(tmp,obj.framewidth-obj.msize),0),10);
					tmp=getArg('mposy','number'); obj.mposy=parseInt(tmp<1?0:Math.max(Math.min(tmp,obj.frameheight-obj.msize),0),10);
					obj.animsteps=getArg('animsteps','number'); obj.animsteps=obj.animsteps>5?obj.animsteps:0;
					obj.framedelay=parseInt(Math.max(20,Math.min(50,getArg('framedelay','number'))));
					obj.pxperstep=parseInt(Math.max(1,Math.min(obj.calendarmode?obj.frameheight:obj.framewidth,obj.animsteps?((obj.calendarmode?obj.frameheight:obj.framewidth)/obj.animsteps):getArg('pxperstep','number'))));
					obj.duration=parseFloat((((obj.calendarmode?obj.frameheight:obj.framewidth)/obj.pxperstep)*obj.framedelay)/1000);
					obj.buttonsize=Math.max(24,obj.buttonsize);
					obj.origin=window.location.protocol+"//"+window.location.host;
					obj.regex=new RegExp("^"+obj.origin,"i");
					obj.maxheight=(obj.calendarmode?.5*obj.frameheight:obj.frameheight); 
					obj.maxwidth=(obj.calendarmode?obj.framewidth:.5*obj.framewidth);
					if(!obj.doublepage) {obj.pw=obj.maxwidth;obj.ph=obj.maxheight;}
					else {obj.pw=obj.framewidth;obj.ph=obj.frameheight;}
					obj.tw=obj.pw/obj.tm;obj.th=obj.ph/obj.tm;
					if(obj.verbose) {booklet.L('log','booklet.js HINT: optimal image dimension > '+obj.pw+'x'+obj.ph);}
					obj.wf=obj.pw>obj.ph?1:obj.ph>obj.pw?obj.pw/obj.ph:1;obj.hf=obj.ph>obj.pw?1:obj.pw>obj.ph?obj.ph/obj.pw:1;obj.fc=obj.wf==1?(obj.pw/obj.ph):(obj.ph/obj.pw);
					obj.fontSize=Math.ceil(Math.min(16,Math.max(11,(obj.framewidth+obj.frameheight)/75)));
					if(!obj.calendarmode&&!obj.doublepage) {obj.fontSize=Math.min(16,Math.max(11,(obj.fontSize/8)*7));}
					/* create "main" div */
					main=booklet.E('div'),st=main.style; main.id=obj.id+'_main'; main.height=obj.mainheight; main.width=obj.mainwidth; main.top=0; main.left=0;
					st.display='block'; st.overflow='hidden'; st.position='relative'; st.visibility='visible'; st.opacity=0.0; 
					st.top=main.top+'px'; st.left=main.left+'px'; st.height=main.height+'px'; st.width=main.width+'px'; st.margin='0px'; st.padding='0px';
					st.MozUserSelect='none'; st.KhtmlUserSelect='none'; main.unselectable='on'; booklet.A(obj,main); obj.mainid=main.id;
					/* create "cover" canvas/var */
					bt_cover.add(booklet.G(obj.mainid),{parent:obj.id, width:obj.mainwidth, height:obj.mainheight, color:obj.covercolor, texture:obj.covertexture, shade:obj.shade*100, shadow:obj.shadow*100, opacity:obj.textureopacity*100, downshadow:obj.topdownshadow, vertical:obj.calendarmode, noradius:obj.noradius, noshadow:obj.noshadow, noframe:obj.nocover}); 
					/* create "frame" div */
					tmp=booklet.E('div'),st=tmp.style;
					tmp.id=obj.id+'_frame';
					tmp.height=obj.frameheight;
					tmp.width=obj.framewidth;
					tmp.left=obj.framex; 
					tmp.top=obj.framey;
					st.overflow='hidden';
					st.display='block';
					st.position='absolute';
					st.opacity=1;
					st.margin='0px';
					st.padding='0px';
					st.left=tmp.left+'px';
					st.top=tmp.top+'px';
					st.height=tmp.height+'px';
					st.width=tmp.width+'px';
					booklet.A(main,tmp); obj.frameid=tmp.id;
					main=tmp;
					/* create "buffer" canvas */
					if(obj.w3c) {
						obj.buf=[]; 
						for(i=0,l=(obj.doublepage?1:2); i<l; i++) {
							obj.buf[i]=booklet.E('canvas');
							obj.buf[i].height=obj.ph;
							obj.buf[i].width=obj.pw;
							if(obj.wcs) {
								obj.buf[i].id=obj.id+'_buf_'+i;
								obj.buf[i].style.position='fixed';
								obj.buf[i].style.height=obj.ph+'px';
								obj.buf[i].style.width=obj.pw+'px';
								obj.buf[i].style.left='-9999px';
								obj.buf[i].style.top='0px';
								booklet.A(main,obj.buf[i]);
							}
							tmp=obj.buf[i].getContext("2d"); 
							tmp.clearRect(0,0,obj.pw,obj.ph); 
							tmp.fillStyle='rgb('+booklet.R(obj.pagecolor)+')';
							tmp.fillRect(0,0,obj.pw,obj.ph);
							tmp.save();
						}
					/* create "crlayer" canvas/var "crlyid" */
						tmp=booklet.E('canvas'),st=tmp.style;
						tmp.id=obj.id+'_crlyid';
						tmp.height=obj.frameheight;
						tmp.width=obj.framewidth;
						tmp.left=0; tmp.top=0;
						st.position='absolute'; 
						st.opacity=0.0;
						st.left='0px'; st.top='0px';
						st.height=tmp.height+'px';
						st.width=tmp.width+'px';
						booklet.A(main,tmp); obj.crlyid=tmp.id;
					/* create "ltlayer" canvas/var "ltlyid"*/
						tmp=booklet.E('canvas'),st=tmp.style;
						tmp.id=obj.id+'_ltlyid';
						tmp.height=obj.frameheight;
						tmp.width=obj.framewidth;
						tmp.left=0; tmp.top=0;
						st.position='absolute'; 
						st.opacity=1.0;
						st.visibility='hidden';
						st.left='0px'; st.top='0px';
						st.height=tmp.height+'px';
						st.width=tmp.width+'px';
						booklet.A(main,tmp); obj.ltlyid=tmp.id;
					/* create "rblayer" canvas/var "rblyid" */
						tmp=booklet.E('canvas'),st=tmp.style;
						tmp.id=obj.id+'_rblyid';
						tmp.height=obj.frameheight;
						tmp.width=obj.framewidth;
						tmp.left=0; tmp.top=0;
						st.position='absolute'; 
						st.opacity=1.0;
						st.visibility='hidden';
						st.left='0px'; st.top='0px';
						st.height=tmp.height+'px';
						st.width=tmp.width+'px';
						booklet.A(main,tmp); obj.rblyid=tmp.id;
					//IE resource START
					}else {
						/* create "crlayer" canvas/var "crlyid" */
						tmp=booklet.E('div'),st=tmp.style;
						tmp.id=obj.id+'_crlyid';
						st.position='absolute'; 
						st.filter="alpha(opacity=0)";
						st.left='0px'; st.top='0px';
						st.height=obj.frameheight+'px';
						st.width=obj.framewidth+'px';
						booklet.A(main,tmp); obj.crlyid=tmp.id;
						/* create "ltlayer" canvas/var "ltlyid"*/
						tmp=booklet.E('div'),st=tmp.style;
						tmp.id=obj.id+'_ltlyid';
						st.position='absolute'; 
						if(!obj.ie8) {
							st.filter="alpha(opacity=100)";
						}
						st.visibility='visible';
						st.left='0px'; st.top='0px';
						st.height=obj.frameheight+'px';
						st.width=obj.framewidth+'px';
						booklet.A(main,tmp); obj.ltlyid=tmp.id;
						//tmp.unselectable=true; 
						//st.visibility='hidden';
						/* create "rblayer" canvas/var "rblyid" */
						tmp=booklet.E('div'),st=tmp.style;
						tmp.id=obj.id+'_rblyid';
						st.position='absolute'; 
						if(!obj.ie8) {
							st.filter="alpha(opacity=100)";
						}
						st.visibility='visible';
						st.left='0px'; st.top='0px';
						st.height=obj.frameheight+'px';
						st.width=obj.framewidth+'px';
						booklet.A(main,tmp); obj.rblyid=tmp.id;
						//tmp.unselectable=true; 
						//st.visibility='hidden';
					//IE resource END
					}	
					/* create "imprint" div */
					if(obj.w3c) {
						tr=booklet.E('div'); st=tr.style; tr.id=obj.id+'_ip_text'; 
						st.visibility='hidden'; st.display='block'; st.position='absolute'; st.opacity=0; 
						tr.width=obj.framewidth; tr.height=obj.frameheight; tr.left=-obj.framewidth; tr.top=0;
						st.width=tr.width+'px'; st.height=tr.height+'px'; st.left='0px'; st.top='0px';
						booklet.A(main,tr); obj.iptxid=tr.id;
						td=booklet.E('div'); st=td.style; st.position='absolute';
						st.left='0px'; st.bottom='0px'; st.height='100%'; st.width='100%';
						st.opacity=obj.infobgopacity; st.backgroundColor=obj.infobgcolor;
						booklet.A(tr,td);
						tmp=booklet.E('div'); tmp.id=obj.id+'_ip_content'; 
						tmp.unselectable='on'; st=tmp.style; st.margin='auto auto'; st.padding='1em 2em';
						st.display='block'; st.position='relative'; 
						st.color=obj.infotxcolor; st.fontStyle='normal'; 
						st.fontWeight='normal'; st.fontSize=obj.fontSize+'px';
						st.textShadow='0px 0px 4px '+obj.infobgcolor+', '+(obj.topdownshadow?0:1)+'px 1px 0px '+obj.infobgcolor;
						booklet.A(tr,tmp); obj.ipctid=tmp.id;
					/* create "thumb" canvas */
						h=obj.th*(obj.calendarmode?(obj.doublepage?1:2):1);
						w=obj.tw*(obj.calendarmode?1:(obj.doublepage?1:2));
						tmp=booklet.E('div'),st=tmp.style;
						tmp.id=obj.id+'_thumb';
						tmp.height=(obj.frameheight*2)-Math.ceil(h);
						tmp.width=(obj.framewidth*2)-Math.ceil(w);
						tmp.left=0; tmp.top=0;
						st.WebkitTapHighlightColor='rgba(0,0,0,0)';
						st.position='absolute'; 
						st.overflow='hidden'; 
						st.opacity=1;
						st.visibility='hidden';
						st.left=(Math.ceil(w)-obj.framewidth)+'px'; 
						st.top=(Math.ceil(h)-obj.frameheight)+'px';
						st.height=tmp.height+'px';
						st.width=tmp.width+'px';
						booklet.A(main,tmp); obj.thumb=tmp.id;
						tr=booklet.E('div'),st=tr.style;
						st.position='absolute'; 
						st.opacity=obj.layeropacity;
						st.background=obj.layercolor;
						st.width=(obj.framewidth-Math.ceil(w))+'px';
						st.height=obj.frameheight+'px';
						st.left='0px'; st.top='0px';
						booklet.A(tmp,tr); 
						tr=booklet.E('div'),st=tr.style;
						st.position='absolute'; 
						st.opacity=obj.layeropacity;
						st.background=obj.layercolor;
						st.width=obj.framewidth+'px';
						st.height=(obj.frameheight-Math.ceil(h))+'px';
						st.left=(obj.framewidth-Math.ceil(w))+'px'; 
						st.top='0px';
						booklet.A(tmp,tr); 
						tr=booklet.E('div'),st=tr.style;
						st.position='absolute'; 
						st.opacity=obj.layeropacity;
						st.background=obj.layercolor;
						st.width=obj.framewidth+'px';
						st.height=(obj.frameheight-Math.ceil(h))+'px';
						st.left='0px'; 
						st.top=obj.frameheight+'px';
						booklet.A(tmp,tr); 
						tr=booklet.E('div'),st=tr.style;
						st.position='absolute'; 
						st.opacity=obj.layeropacity;
						st.background=obj.layercolor;
						st.width=(obj.framewidth-Math.ceil(w))+'px';
						st.height=obj.frameheight+'px';
						st.left=obj.framewidth+'px'; 
						st.top=(obj.frameheight-Math.ceil(h))+'px';
						booklet.A(tmp,tr); 
						td=booklet.E('canvas'),st=td.style; 
						td.h=h; td.w=w; 
						td.height=Math.ceil(td.h);
						td.width=Math.ceil(td.w);
						td.left=0; td.top=0;
						st.position='absolute'; 
						st.left=(obj.framewidth-td.width)+'px'; 
						st.top=(obj.frameheight-td.height)+'px';
						st.height=td.height+'px';
						st.width=td.width+'px';
						st.WebkitBoxShadow="0px 0px 16px "+obj.layercolor+", inset "+(obj.topdownshadow?0:4)+"px 4px 8px "+obj.selectorcolor;
						st.MozBoxShadow="0px 0px 16px "+obj.layercolor+", inset "+(obj.topdownshadow?0:4)+"px 4px 8px "+obj.selectorcolor;
						st.boxShadow="0px 0px 16px "+obj.layercolor+", inset "+(obj.topdownshadow?0:4)+"px 4px 8px "+obj.selectorcolor;
						booklet.A(tmp,td);
						ctx=td.getContext("2d"); 
						ctx.clearRect(0,0,td.width,td.height); 
						if(obj.calendarmode) {
							booklet._ltShade(ctx,0,0,obj.tw,obj.th*(obj.doublepage?1:2),obj.shade,obj.calendarmode);
							booklet._rbShade(ctx,0,0,obj.tw,obj.th*(obj.doublepage?1:2),obj.shade,obj.calendarmode);
						}else {
							booklet._ltShade(ctx,0,0,obj.tw*(obj.doublepage?1:2),obj.th,obj.shade,obj.calendarmode);
							booklet._rbShade(ctx,0,0,obj.tw*(obj.doublepage?1:2),obj.th,obj.shade,obj.calendarmode);
						}
						ctx.strokeStyle=obj.selectorcolor; ctx.lineWidth=4; 
						ctx.strokeRect(0,0,td.width,td.height);
						/* create "thumb_text" div */ 
						if(!obj.toctooltip) {
							tr=booklet.E('div'),st=tr.style; 
							st.display='block'; st.position='absolute';
							st.left=(obj.framewidth-td.width)+'px'; 
							st.bottom=(obj.frameheight-td.height)+'px';
							st.height='auto'; st.maxHeight=td.height+'px'; 
							st.width=td.width+'px'; st.overflow='hidden';
							st.WebkitTapHighlightColor='rgba(0,0,0,0)';
							booklet.A(tmp,tr);
							td=booklet.E('div'); st=td.style; st.position='absolute';
							st.left='0px'; st.bottom='0px'; st.height='100%'; st.width='100%'; st.minHeight='1px';
							st.opacity=obj.infobgopacity; st.backgroundColor=obj.infobgcolor;
							booklet.A(tr,td);
							tmp=booklet.E('div'); tmp.id=obj.id+'_thumb_text'; 
							tmp.unselectable='on'; st=tmp.style; 
							st.right='0px'; st.bottom='0px'; st.margin='0px'; 
							st.maxHeight=tr.style.maxHeight; st.zoom=1;
							st.display='block'; st.position='relative';
							st.color=obj.infotxcolor; st.fontStyle='normal'; 
							st.fontWeight='normal'; st.fontSize=obj.fontSize+'px';
							st.textShadow='0px 0px 4px '+obj.infobgcolor+', '+(obj.topdownshadow?0:1)+'px 1px 0px '+obj.infobgcolor;
							st.textAlign='left'; st.verticalAlign='top'; 
							booklet.A(tr,tmp); obj.txt=tmp.id;
						}
					}	
					// left
					if(!obj.doublepage) {
						/* create "lt_text" div */ 
						tr=booklet.E('div'),st=tr.style; tr.id=obj.id+'_lt_text';
						st.visibility='hidden'; st.display='block'; st.position='absolute';
						st.opacity=0; 
						//IE resource START
						st.filter="alpha(opacity=100)";//IE6-7
						//IE resource END
						st.left='0px'; st.bottom=(obj.calendarmode?(main.height/2):0)+'px'; 
						st.height='auto'; st.maxHeight=obj.maxheight+'px'; 
						st.width=(obj.calendarmode?main.width:main.width/2)+'px';
						st.overflow='hidden';
						booklet.A(main,tr); obj.lttxid=tr.id;
						td=booklet.E('div'); st=td.style; st.position='absolute';
						st.left='0px'; st.bottom='0px'; st.height='100%'; st.width='100%';
						st.color=obj.infotxcolor; st.fontSize='1px';st.lineHeight='0px';
						st.opacity=obj.infobgopacity; 
						//IE resource START
						st.zoom=1;
						st.filter="alpha(opacity="+(obj.infobgopacity*100)+")";//IE6-7
						//IE resource END
						st.backgroundColor=obj.infobgcolor;
						booklet.A(tr,td);
						tmp=booklet.E('div'); tmp.id=obj.id+'_lt_content'; 
						tmp.unselectable='on'; st=tmp.style; 
						st.left='0px'; st.bottom='0px'; st.margin='8px 16px 8px 16px'; 
						st.maxHeight=obj.maxheight+'px'; 
						st.display='block'; st.position='relative';
						st.color=obj.infotxcolor; st.fontStyle='normal'; 
						st.fontWeight='normal'; st.fontSize=obj.fontSize+'px';
						st.textShadow='0px 0px 4px '+obj.infobgcolor+', '+(obj.topdownshadow?0:1)+'px 1px 0px '+obj.infobgcolor;
						st.textAlign='left'; st.verticalAlign='top'; 
						//IE resource START
						st.filter="alpha(opacity=100)";//IE6-7
						//IE resource END
						booklet.A(tr,tmp); obj.ltctid=tmp.id;
						//IE resource START
						if(obj.vml) {
							if(obj.ie8) {
								tmp.setAttribute("onmouseover","this.parentNode.style.visibility='hidden';");
								tmp.setAttribute("onmouseout","this.parentNode.style.visibility='hidden';");
							}else {
								tmp.onmouseover=function(){this.parentNode.style.visibility='hidden';};
								tmp.onmouseout=function(){this.parentNode.style.visibility='hidden';};
							}
						}
						//IE resource END
					}
					/* create "lt_link" div */ 
					td=booklet.E('a');
					td.id=obj.id+'_lt_link';
					td.href='javascript:void(0);';
					td.target="_self";
					td.title="";
					td.style.cursor='default';
					st.WebkitTapHighlightColor='rgba(0,0,0,0)';
					td.style.visibility='visible';
					booklet.A(main,td); obj.ltlkid=td.id;
					tmp=booklet.E('div'),st=tmp.style;
					tmp.height=obj.calendarmode?(main.height/2)-obj.framep:main.height-obj.buttonsize;
					tmp.width=obj.calendarmode?main.width-obj.buttonsize:(main.width/2)-obj.framep;
					tmp.left=obj.calendarmode?0:obj.framep; 
					tmp.top=obj.calendarmode?obj.framep:0;
					st.display='block';
					st.position='absolute';
					st.margin='0px';
					st.padding='0px';
					st.left=tmp.left+'px';
					st.top=tmp.top+'px';
					st.height=tmp.height+'px';
					st.width=tmp.width+'px';
					st.backgroundColor='red';
					st.WebkitTouchCallout='none';
					//IE resource START
					if(obj.vml) {
						st.background="url('"+obj.gifpath+"') transparent";
						st.filter="alpha(opacity=0)";//IE6-7
					}
					//IE resource END
					st.opacity=0;
					booklet.A(td,tmp); 
					if(!obj.doublepage) {
						/* create "lt_info" div */ 
						tmp=booklet.E('div'),st=tmp.style;
						tmp.id=obj.id+'_lt_info';
						tmp.eleid=obj.lttxid;
						tmp.height=20; tmp.width=20;
						if(obj.calendarmode) {tmp.right=3; tmp.top=3;}else {tmp.left=3; tmp.bottom=3;} 
						st.display='block';
						st.position='absolute';
						st.WebkitTapHighlightColor='rgba(0,0,0,0)';
						if(obj.vml){st.background="url('"+obj.gifpath+"') transparent";} //IE resource
						st.cursor='pointer';
						st.margin='0px';
						st.padding='0px';
						st.opacity=0;
						//IE resource START
						st.filter="alpha(opacity=100)";//IE6-7
						//IE resource END
						if(obj.calendarmode) {st.right='3px'; st.top='3px';}else {st.left='3px'; st.bottom='3px';} 
						st.height=tmp.height+'px';
						st.width=tmp.width+'px';
						booklet.A(main,tmp); obj.ltifid=tmp.id;
						if(obj.w3c) {
							tmp.setAttribute("onmouseover","booklet._infoover(this);");
							tmp.setAttribute("onmouseout","booklet._infoout(this);");
						}
						bt_ctrl.defaultRadius=obj.buttonradius;
						bt_ctrl.add(tmp,{parent:obj.id+'_lt',size:20,shape:'info'});
						//IE resource START
						if(obj.vml) {tmp=booklet.G(obj.id+'_lt_bt_info');
							if(tmp&&obj.ie8) {
								tmp.setAttribute("onmouseenter","booklet._infoover_ie(this);");
								tmp.setAttribute("onmouseleave","booklet._infoout_ie(this);");
							}else if(tmp&&!obj.ie8) {
								tmp.onmouseenter=function(){booklet._infoover_ie(this);};
								tmp.onmouseleave=function(){booklet._infoout_ie(this);};
							}
						}
						//IE resource END
					}
					/* create "lt_event" div */ 
					tmp=booklet.E('div'),st=tmp.style;
					tmp.id=obj.id+'_lt_event';
					tmp.ele=obj.ltlyid;
					tmp.title=booklet._getLang(obj,'prevbutton',"previous");
					tmp.height=obj.calendarmode?obj.framep:main.height-obj.framei;
					tmp.width=obj.calendarmode?main.width-obj.framei:obj.framep;
					tmp.left=0; tmp.top=0;
					st.display='block';
					st.position='absolute';
					st.visibility='visible';
					st.WebkitTapHighlightColor='rgba(0,0,0,0)';
					if(obj.vml){st.background="url('"+obj.gifpath+"') transparent";} //IE resource
					st.cursor='pointer';					
					st.margin='0px';
					st.padding='0px';
					st.left=tmp.left+'px';
					st.top=tmp.top+'px';
					st.height=tmp.height+'px';
					st.width=tmp.width+'px';
					booklet.A(main,tmp); obj.ltevid=tmp.id;
					if(obj.w3c) {
						tmp.setAttribute("onmouseover","booklet._eventover(this);");
						tmp.setAttribute("onmouseout","booklet._eventout(this);");
					}
					// right
					/* create "rb_text" div */ 
					tr=booklet.E('div'); st=tr.style; tr.id=obj.id+'_rb_text';
					st.visibility='hidden'; st.display='block'; st.position='absolute';
					st.opacity=0; 
					//IE resource START
					st.filter="alpha(opacity=100)";//IE6-7
					//IE resource END
					if(obj.calendarmode) {st.left='0px';}else {st.right='0px';} st.bottom='0px'; 
					st.height='auto'; st.maxHeight=(obj.calendarmode&&obj.doublepage?obj.maxheight*2:obj.maxheight)+'px'; 
					st.width=(obj.calendarmode?main.width:main.width/(obj.doublepage?1:2))+'px';
					booklet.A(main,tr); obj.rbtxid=tr.id;
					td=booklet.E('div'); st=td.style; st.position='absolute';
					st.left='0px'; st.bottom='0px'; st.height='100%'; st.width='100%';
					st.color=obj.infotxcolor; st.fontSize='1px';st.lineHeight='0px';
					st.opacity=obj.infobgopacity; 
					//IE resource START
					st.zoom=1;
					st.filter="alpha(opacity="+(obj.infobgopacity*100)+")";//IE6-7
					//IE resource END
					st.backgroundColor=obj.infobgcolor;
					booklet.A(tr,td);
					tmp=booklet.E('div'); tmp.id=obj.id+'_rb_content'; 
					tmp.unselectable='on'; st=tmp.style; 
					st.left='0px'; st.bottom='0px'; st.margin='8px 16px 8px 16px'; 
					st.maxHeight=(obj.calendarmode&&obj.doublepage?obj.maxheight*2:obj.maxheight)+'px'; 
					st.display='block'; st.position='relative'; 
					st.color=obj.infotxcolor; st.fontStyle='normal'; 
					st.fontWeight='normal'; st.fontSize=obj.fontSize+'px';
					st.textShadow='0px 0px 4px '+obj.infobgcolor+', '+(obj.topdownshadow?0:1)+'px 1px 0px '+obj.infobgcolor;
					st.textAlign='left'; st.verticalAlign='top'; 
					//IE resource START
					st.filter="alpha(opacity=100)";//IE6-7
					//IE resource END
					booklet.A(tr,tmp); obj.rbctid=tmp.id;
					//IE resource START
					if(obj.vml) {
						if(obj.ie8) {
							tmp.setAttribute("onmouseover","this.parentNode.style.visibility='hidden';");
							tmp.setAttribute("onmouseout","this.parentNode.style.visibility='hidden';");
						}else {
							tmp.onmouseover=function(){this.parentNode.style.visibility='hidden';};
							tmp.onmouseout=function(){this.parentNode.style.visibility='hidden';};
						}
					}
					//IE resource END
					/* create "rb_link" div */ 
					td=booklet.E('a');
					td.id=obj.id+'_rb_link';
					td.href='javascript:void(0);';
					td.target="_self";
					td.title="";
					td.style.cursor='default';
					st.WebkitTapHighlightColor='rgba(0,0,0,0)';
					td.style.visibility='visible';
					booklet.A(main,td); obj.rblkid=td.id;
					tmp=booklet.E('div'),st=tmp.style;
					tmp.height=obj.calendarmode?(main.height/2)-obj.framep:main.height-obj.buttonsize;
					tmp.width=obj.calendarmode?main.width-obj.buttonsize:(main.width/2)-obj.framep;
					if(obj.calendarmode) {tmp.left=0; tmp.bottom=obj.framep;}else {tmp.right=obj.framep; tmp.top=0;}
					st.display='block';
					st.position='absolute';
					st.margin='0px';
					st.padding='0px';
					if(obj.calendarmode) {st.left='0px'; st.bottom=tmp.bottom+'px';}else{st.right=tmp.right+'px'; st.top='0px';}
					st.height=tmp.height+'px';
					st.width=tmp.width+'px';
					st.backgroundColor='red';
					st.WebkitTouchCallout='none';
					st.opacity=0;
					//IE resource START
					if(obj.vml) {
						st.background="url('"+obj.gifpath+"') transparent";
						st.filter="alpha(opacity=0)";//IE6-7
					}
					//IE resource END
					booklet.A(td,tmp); 
					/* create "rb_info" div */ 
					tmp=booklet.E('div'),st=tmp.style;
					tmp.id=obj.id+'_rb_info';
					tmp.eleid=obj.rbtxid;
					tmp.height=20;
					tmp.width=20;
					tmp.right=3; tmp.bottom=3;
					st.display='block';
					st.position='absolute';
					st.WebkitTapHighlightColor='rgba(0,0,0,0)';
					if(obj.vml){st.background="url('"+obj.gifpath+"') transparent";} //IE resource
					st.margin='0px';
					st.padding='0px';
					st.cursor='pointer';
					st.right=tmp.right+'px';
					st.bottom=tmp.bottom+'px';
					st.height=tmp.height+'px';
					st.width=tmp.width+'px';
					st.opacity=0;
					//IE resource START
					st.filter="alpha(opacity=100)";//IE6-7
					//IE resource END
					booklet.A(main,tmp); obj.rbifid=tmp.id;
					if(obj.w3c) {
						tmp.setAttribute("onmouseover","booklet._infoover(this);");
						tmp.setAttribute("onmouseout","booklet._infoout(this);");
					}
					bt_ctrl.defaultRadius=obj.buttonradius;
					bt_ctrl.add(tmp,{parent:obj.id+'_rb', size:20, shape:'info'});
					//IE resource START
					if(obj.vml) {tmp=booklet.G(obj.id+'_rb_bt_info');
						if(tmp&&obj.ie8) {
							tmp.setAttribute("onmouseenter","booklet._infoover_ie(this);");
							tmp.setAttribute("onmouseleave","booklet._infoout_ie(this);");
						}else if(tmp&&!obj.ie8) {
							tmp.onmouseenter=function(){booklet._infoover_ie(this);};
							tmp.onmouseleave=function(){booklet._infoout_ie(this);};
						}
					}
					//IE resource END
					/* create "rb_event" div */
					tmp=booklet.E('div'),st=tmp.style;
					tmp.id=obj.id+'_rb_event';
					tmp.ele=obj.rblyid;
					tmp.title=booklet._getLang(obj,'nextbutton',"next");
					tmp.height=obj.calendarmode?obj.framep:main.height-obj.framei;
					tmp.width=obj.calendarmode?main.width-obj.framei:obj.framep;
					if(obj.calendarmode) {tmp.left=0; tmp.bottom=0;}else {tmp.right=0; tmp.top=0;}
					st.display='block';
					st.position='absolute';
					st.visibility='visible';
					st.WebkitTapHighlightColor='rgba(0,0,0,0)';
					if(obj.vml){st.background="url('"+obj.gifpath+"') transparent";} //IE resource
					st.cursor='pointer';
					st.margin='0px';
					st.padding='0px';
					if(obj.calendarmode) {st.left='0px'; st.bottom='0px';}else {st.right='0px'; st.top='0px';}
					st.height=tmp.height+'px';
					st.width=tmp.width+'px';
					booklet.A(main,tmp); obj.rbevid=tmp.id;
					if(obj.w3c) {
						tmp.setAttribute("onmouseover","booklet._eventover(this);");
						tmp.setAttribute("onmouseout","booklet._eventout(this);");
					}
					/* create "thumbs" div */
					if(obj.w3c) {
						tmp=booklet.E('div'),st=tmp.style;
						tmp.ele=obj.thumb;
						tmp.txt=obj.txt;
						tmp.id=obj.id+'_thumbs';
						tmp.height=obj.frameheight;
						tmp.width=obj.framewidth;
						tmp.left=0; tmp.top=0;
						st.position='absolute'; 
						st.overflow='hidden'; 
						st.opacity=1.0;
						st.left='0px'; st.top='0px';
						st.height=tmp.height+'px';
						st.width=tmp.width+'px';
						booklet.A(main,tmp); obj.thumbs=tmp.id;
						tmp.xoff=0; tmp.yoff=0; main.curtmb=0;
						tmp.evtx=0; tmp.evty=0; tmp.moving=false;
						tmp.tw=obj.tw*(obj.calendarmode?1:(obj.doublepage?1:2));
						tmp.th=obj.th*(obj.calendarmode?(obj.doublepage?1:2):1);
						tmp.ltx=obj.framewidth-Math.ceil(tmp.tw); 
						tmp.lty=obj.frameheight-Math.ceil(tmp.th);
						tmp.xc=parseInt(tmp.width/tmp.tw,10)/(obj.calendarmode?1:(obj.doublepage?1:2));
						tmp.yc=parseInt(tmp.height/tmp.th,10)/(obj.calendarmode?(obj.doublepage?1:2):1);
						if(obj.chakra) {st.background="url("+booklet.gif+") transparent";}
						st.visibility='hidden';
						tmp.onmouseover=booklet._onOver;
					}
					// center
					/* create "meter" div */
					tmp=booklet.E(obj.w3c?'canvas':'div');
					st=tmp.style;
					tmp.id=obj.id+'_meter';
					tmp.width=obj.msize;
					tmp.height=obj.msize;
					st.height=obj.msize+'px';
					st.width=obj.msize+'px';
					st.display='block';
					st.visibility='visible';
					st.position='absolute';
					st.left=obj.mposx+'px';
					st.top=obj.mposy+'px';
					st.margin='0px';
					st.padding='0px';
					st.zIndex=99;
					booklet.A(main,tmp); obj.meterid=tmp.id;
					if(obj.vml) {
						tmp.innerHTML='<v:oval strokeweight="0" stroked="f" filled="t" fillcolor="#808080" style="zoom:1;display:block;position:absolute;left:0px;top:0px;margin:0px;padding:0px;width:'+obj.msize+'px;height:'+obj.msize+'px;"><v:fill color="'+obj.mbgcolor+'" opacity="'+obj.mopacity+'" /></v:oval><v:shape path="m 500,500 ae 500,500,500,500,5898150,23592960 x e" coordorigin="0,0" coordsize="1000,1000" strokeweight="0" stroked="f" filled="t" fillcolor="#808080" style="zoom:1;display:block;position:absolute;left:0px;top:0px;margin:0px;padding:0px;width:'+obj.msize+'px;height:'+obj.msize+'px;"><v:fill color="'+obj.mfgcolor+'" opacity="'+obj.mopacity+'" /></v:shape>';
						tmp.unselectable=true; 
						st.visibility='hidden';
					}	
					/* create "lock" div */
					tmp=booklet.E('div'),st=tmp.style;
					tmp.id=obj.id+'_lock';
					tmp.width=obj.mainwidth;
					tmp.height=obj.mainheight;
					tmp.left=0; tmp.top=0;
					st.zIndex=100;
					st.display='block';
					st.visibility='visible';
					st.WebkitTapHighlightColor='rgba(0,0,0,0)';
					st.position='absolute';
					st.margin='0px';
					st.padding='0px';
					st.left=(obj.framex*-1)+'px';
					st.top=(obj.framey*-1)+'px';
					st.height=tmp.height+'px';
					st.width=tmp.width+'px';
					st.MozUserSelect='none'; 
					st.KhtmlUserSelect='none';
					tmp.unselectable='on';
					booklet.A(main,tmp); obj.lockid=tmp.id;
					/* create "bt_event" div */
					tmp=booklet.E('div'),st=tmp.style;
					tmp.id=obj.id+'_bt_event';
					tmp.height=obj.calendarmode?main.height-(2*obj.framep):obj.buttonsize;
					tmp.width=obj.calendarmode?obj.buttonsize:main.width-(2*obj.framep);
					if(obj.calendarmode) {tmp.right=0; tmp.top=obj.framep;}else {tmp.left=obj.framep; tmp.bottom=0;} 
					st.display='block';
					st.position='absolute';
					st.WebkitTapHighlightColor='rgba(0,0,0,0)';
					st.overflow='hidden';
					st.margin='0px';
					st.padding='0px';
					if(obj.vml){st.background="url('"+obj.gifpath+"') transparent";} //IE resource
					if(obj.calendarmode) {st.right='0px'; st.top=tmp.top+'px';}else {st.left=tmp.left+'px'; st.bottom='0px';} 
					st.height=tmp.height+'px';
					st.width=tmp.width+'px';
					booklet.A(main,tmp); obj.btevid=tmp.id;
					main=tmp; tmp.chakra=obj.chakra;
					/* create "ctrl" table  */
					tmp=booklet.E('table'),st=tmp.style;
					tmp.id=obj.id+'_ctrl'; obj.ctrlid=tmp.id; tmp.nopanel=obj.nopanel;
					tmp.height=obj.calendarmode?(obj.bt.length*obj.buttonsize):obj.buttonsize; 
					tmp.width=obj.calendarmode?obj.buttonsize:(obj.bt.length*obj.buttonsize);
					if(obj.calendarmode) {tmp.right=obj.buttonsize*(-1); tmp.top=parseInt((main.height-tmp.height)/2);}else {tmp.left=parseInt((main.width-tmp.width)/2); tmp.bottom=obj.buttonsize*(-1);} 
					st.display='block';
					st.position='absolute';
					st.border='0px none';
					st.borderSpacing='0px';
					st.borderCollapse='collapse';
					st.WebkitTapHighlightColor='rgba(0,0,0,0)';
					st.lineHeight='1px';
					st.margin='0px';
					st.padding='0px';
					st.opacity=0;
					//IE resource START
					st.filter="alpha(opacity=100)";//IE6-7
					//IE resource END
					if(obj.calendarmode) {st.right=tmp.right+'px'; st.top=tmp.top+'px';}else {st.left=tmp.left+'px'; st.bottom=tmp.bottom+'px';} 
					st.height=tmp.height+'px';
					st.width=tmp.width+'px';
					booklet.A(main,tmp); 
					td=booklet.E('tbody'); booklet.A(tmp,td); 
					bt_ctrl.defaultFgcolor=obj.buttonfgcolor; 
					bt_ctrl.defaultBgcolor=obj.buttonbgcolor;
					bt_ctrl.defaultRadius=obj.buttonradius;
					tmp=td; if(!obj.calendarmode) {tr=booklet.E('tr'); booklet.A(tmp,tr);}
					for(i=0; i<obj.bt.length; i++) {
						if(obj.calendarmode) {tr=booklet.E('tr'); booklet.A(tmp,tr);}
						td=booklet.E('td'); td.id=obj.id+'_td_'+obj.bt[i]; 
						td.style.width=obj.buttonsize+'px'; td.style.height=obj.buttonsize+'px'; 
						td.style.visibility="visible"; td.style.padding='0px'; 
						td.style.lineHeight='10px'; td.style.margin='0px'; td.style.cursor='pointer'; 
						if(obj.vml){td.style.background="url('"+obj.gifpath+"') transparent";} //IE resource
						td.title=booklet._getLang(obj,obj.bt[i]+"button",obj.bt[i]); 
						booklet.A(tr,td); 
						if(obj.w3c) {
							td.setAttribute("onmouseover","bt_ctrl.modify(this.firstChild,{invert:true});");
							td.setAttribute("onmouseout","bt_ctrl.modify(this.firstChild,{invert:false});");
						}
						bt_ctrl.add(td,{parent:obj.id, size:obj.buttonsize, shape:obj.bt[i]});
					}
					//IE resource START
					if(obj.vml) {
						if(obj.ie8) {
							tmp=booklet.G(obj.id+'_bt_play'); tmp.setAttribute("onclick","booklet.play(booklet.G('"+obj.id+"'));");
							main.setAttribute("onmouseenter","booklet._ctrlover_ie(this.firstChild,"+obj.calendarmode+");");
							main.setAttribute("onmouseleave","booklet._ctrlout_ie(this.firstChild,"+obj.calendarmode+");");
						}else {
							tmp=booklet.G(obj.id+'_bt_play'); tmp.onclick=function(){booklet.play(booklet.G(obj.id));};
							main.onmouseenter=function(){booklet._ctrlover_ie(this.firstChild,obj.calendarmode);};
							main.onmouseleave=function(){booklet._ctrlout_ie(this.firstChild,obj.calendarmode);};
						}
					}else {
					//IE resource END
						tmp=booklet.G(obj.id+'_bt_play'); tmp.setAttribute("onclick","booklet.play(booklet.G('"+obj.id+"'));");
						if(!obj.notoc) {
							tmp=booklet.G(obj.id+'_bt_table'); tmp.setAttribute("onclick","booklet._openTOC(booklet.G('"+obj.id+"'));");
							tmp=booklet.G(obj.id+'_bt_list'); tmp.setAttribute("onclick","booklet._openTOC(booklet.G('"+obj.id+"'));");
						}
						if(!obj.notoc) {
							tmp=booklet.G(obj.id+'_bt_list'); tmp.setAttribute("onclick","booklet._openTOC(booklet.G('"+obj.id+"'));");
						}
						main.setAttribute("onmouseover","booklet._ctrlover(this.firstChild,"+obj.calendarmode+");");
						main.setAttribute("onmouseout","booklet._ctrlout(this.firstChild,"+obj.calendarmode+");");
					}
					/* create "toc" canvas buffer */
					if(!obj.notoc&&!obj.vml) {//IE resource 
						obj.toc=[];
						obj.toc[0]=booklet.E('canvas');
						obj.toc[0].height=obj.ph;
						obj.toc[0].width=obj.pw;
						if(obj.wcs) {
							obj.toc[0].id=obj.id+'_img_0';
							obj.toc[0].style.position='fixed';
							obj.toc[0].style.height=obj.ph+'px';
							obj.toc[0].style.width=obj.pw+'px';
							obj.toc[0].style.left='-9999px';
							obj.toc[0].style.top='0px';
							booklet.A(main,obj.toc[0]);
						}
						tmp=obj.toc[0].getContext("2d"); 
						tmp.clearRect(0,0,obj.pw,obj.ph); 
						tmp.fillStyle='rgb('+booklet.R(obj.pagecolor)+')';
						tmp.fillRect(0,0,obj.pw,obj.ph);
						tmp.save();
					}
					/* create "ctoc" table */ 
					if(!obj.vml) {//IE resource
						tmp=booklet.E('table'),st=tmp.style;
						tmp.id=obj.id+'_ctoc'; obj.ctocid=tmp.id;
						tmp.height=obj.calendarmode?(obj.bc.length*obj.buttonsize):obj.buttonsize; 
						tmp.width=obj.calendarmode?obj.buttonsize:(obj.bc.length*obj.buttonsize);
						if(obj.calendarmode) {tmp.right=obj.buttonsize*(-1); tmp.top=parseInt((main.height-tmp.height)/2);}else {tmp.left=parseInt((main.width-tmp.width)/2); tmp.bottom=obj.buttonsize*(-1);} 
						st.display='block';
						st.position='absolute';
						st.border='0px none';
						st.borderSpacing='0px';
						st.borderCollapse='collapse';
						st.WebkitTapHighlightColor='rgba(0,0,0,0)';
						st.lineHeight='1px';
						st.margin='0px';
						st.padding='0px';
						if(!obj.wcs) {
							st.opacity=0;
							st.visibility='hidden';
						}
						if(obj.calendarmode) {st.right=tmp.right+'px'; st.top=tmp.top+'px';}else {st.left=tmp.left+'px'; st.bottom=tmp.bottom+'px';} 
						st.height=tmp.height+'px';
						st.width=tmp.width+'px';
						booklet.A(main,tmp); 
						td=booklet.E('tbody'); booklet.A(tmp,td); 
						bt_ctrl.defaultFgcolor=obj.buttonfgcolor; 
						bt_ctrl.defaultBgcolor=obj.buttonbgcolor;
						bt_ctrl.defaultRadius=obj.buttonradius;
						tmp=td; if(!obj.calendarmode) {tr=booklet.E('tr'); booklet.A(tmp,tr);}
						for(i=0; i<obj.bc.length; i++) {
							if(obj.calendarmode) {tr=booklet.E('tr'); booklet.A(tmp,tr);}
							td=booklet.E('td'); td.id=obj.id+'_tc_'+obj.bc[i]; 
							td.style.width=obj.buttonsize+'px'; td.style.height=obj.buttonsize+'px'; 
							td.style.visibility="visible"; td.style.padding='0px'; 
							td.style.lineHeight='10px'; td.style.margin='0px'; td.style.cursor='pointer'; 
							td.title=booklet._getLang(obj,obj.bc[i]+"button",obj.bc[i]); 
							booklet.A(tr,td); 
							td.setAttribute("onmouseover","bt_ctrl.modify(this.firstChild,{invert:true});");
							td.setAttribute("onmouseout","bt_ctrl.modify(this.firstChild,{invert:false});");
							bt_ctrl.add(td,{parent:obj.id, size:obj.buttonsize, string:'_bc_', shape:obj.bc[i]});
						}
						tmp=booklet.G(obj.id+'_bc_menu'); tmp.setAttribute("onclick","booklet._closeTOC(booklet.G('"+obj.id+"'));");
						if(obj.viewmode=="toc") {
							main.setAttribute("onmouseover","booklet._ctrlover(this.lastChild,"+obj.calendarmode+");");
							main.setAttribute("onmouseout","booklet._ctrlout(this.lastChild,"+obj.calendarmode+");");
						} 
					}
					/* create "busy" span id and option args*/
					obj.busyid=obj.id+'_busy'; 
					obj.overlayoptions.text=booklet._getLang(obj,'overlaytext',"loading images...");
					obj.overlayoptions.spanid=obj.busyid;
					obj.overlayoptions.styles=obj.overlaystyle;
					obj.overlayoptions.bgimage=obj.overlayimage;
					/* create "busy" canvas == busy */
					obj.cover=set_BT_BusyOverlay(booklet.G(obj.frameid),obj.overlayoptions,obj.busyoptions);
					// fade in
					main=booklet.G(obj.mainid); if(main.timer) {window.clearInterval(main.timer);} var c=0,n=0,m=100,t=10,p=1; 
					main.timer=window.setInterval(function() {
						main.z=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n))); 
						main.style.opacity=main.z/100; 
						c++; 
						if(c>t) {
							window.clearInterval(main.timer); 
							main.style.opacity=1; 
							booklet._preload(obj,0);
						}
					},obj.framedelay);
				} else {booklet.L('error','[exit] booklet.add(): insufficient images'); }
			} else {booklet.L('error','[exit] booklet.add(): unsupported browser'); }
		} else {booklet.L('warn','booklet.add(): object still exists'); }
		return false; 
	},
	play : function(obj,wait) {
		if(obj&&typeof(obj.mainid)==="string") { 
			var i,tmp,ele,stp=obj.doublepage?1:2,cnt=obj.curimg;
			if(!obj.automode&&obj.viewmode==="image") {
				if(obj.timer) {window.clearInterval(obj.timer);} 
				for(i=0; i<obj.bt.length; i++) {
					tmp=booklet.G(obj.id+'_bt_'+obj.bt[i]);
					if(obj.bt[i]!=="play") {
						//IE resource START
						if(obj.vml) {
							if(!obj.ie8) {
								tmp.style.filter="alpha(opacity=25)"; 
							}else {
								bt_ctrl.modify(tmp,{alpha:25});
							}
							tmp.onclick='';
						}else {
						//IE resource END
							tmp.style.opacity=0.2; 
							tmp.setAttribute("onclick","");
						}
					}
				}
				//IE resource START
				tmp=booklet.G(obj.id+'_bt_play');
				bt_ctrl.modify(tmp,{shape:'pause'});
				if(obj.vml) {
					if(obj.ie8) {
						tmp.setAttribute("onclick","booklet.stop(booklet.G('"+obj.id+"'));");
					}else {
						tmp.onclick=function(){booklet.stop(booklet.G(obj.id));};
					}	
				} else {
				//IE resource END
					tmp.setAttribute("onclick","booklet.stop(booklet.G('"+obj.id+"'));");
				}
				booklet.G(obj.ltevid).style.visibility='hidden';
				booklet.G(obj.rbevid).style.visibility='hidden';
				booklet.G(obj.ltlkid).style.visibility='hidden'; 
				booklet.G(obj.rblkid).style.visibility='hidden'; 
				ele=booklet.G(obj.ltifid); if(ele) {if(obj.calendarmode){ele.style.top='-30px';}else{ele.style.bottom='-30px';}} 
				ele=booklet.G(obj.rbifid); if(ele) {ele.style.bottom='-30px';} 
				obj.automode=true; 
				var delay=parseInt(Math.max(0,Math.min(3600,obj.playdelay)))*1000;
				if(typeof(obj.photo[obj.curimg].delay)==='number') {
					delay+=(parseInt(Math.max(0,Math.min(3600,obj.photo[obj.curimg].delay)))*1000);	
				}
				if(obj.meter) {
					booklet._meter(obj,delay,stp,cnt);	
				} else {
					obj.timer=window.setTimeout(function() {
						obj.curimg=(cnt<(obj.photo.length-stp)?cnt+stp:0); 
						if(obj.curimg==0) {
							booklet._set(obj,obj.curimg,false,true); 
						}else {
							booklet._set(obj,obj.curimg,false,false,true); 
						}
					}, wait?delay:0);
				}
			}
		}else {booklet.L('warn','booklet.play(): object does not exist'); }
		return false; 
	},
	stop : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") { 
			var tmp=booklet.G(obj.id+'_bt_play'); 
			if(tmp&&obj.automode&&obj.viewmode==="image") {
				obj.automode=false; 
				//IE resource START
				if(obj.vml) {
					tmp.onclick='';
					if(!obj.ie8) {
						tmp.style.filter="alpha(opacity=100)"; 
						bt_ctrl.modify(tmp,{shape:'play'});
					}else {
						bt_ctrl.modify(tmp,{alpha:100,shape:'play'});
					}
				}else {
				//IE resource END
					tmp.setAttribute("onclick","");
					tmp.style.opacity=0.2;
					bt_ctrl.modify(tmp,{shape:'play'});
				}
				if(obj.meter) {
					var meter=booklet.G(obj.meterid);
					if(meter.timer) {window.clearInterval(meter.timer);}
					if(obj.w3c) {var ctx=meter.getContext("2d");
						if(ctx) {ctx.clearRect(0,0,meter.width,meter.height);}
					}
					meter.style.visibility='hidden';
				} else {
					if(obj.timer) {window.clearTimeout(obj.timer);} 
				}
				if(obj.curling) {
					obj.callafter='_reset';
				}else {
					booklet._reset(obj);
					booklet._set(obj,obj.curimg,true); 
				}
			}
		}else {booklet.L('warn','booklet.stop(): object does not exist'); }
		return false; 
	},
	first : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") { 
			if(!obj.automode&&!obj.curling&&(obj.curimg>0||obj.viewmode==="toc")) {
				if(obj.viewmode=="toc") {booklet._closeTOC(obj,0);}else {booklet._set(obj,0);}
			}
		}else {booklet.L('warn','booklet.first(): object does not exist'); }
		return false;
	},
	last : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") { 
			var step=obj.doublepage?1:2,val=obj.photo.length%2==0?obj.photo.length-step:obj.photo.length-1;
			if(!obj.automode&&!obj.curling&&(obj.curimg<(obj.photo.length-step)||obj.viewmode==="toc")) {
				if(obj.viewmode=="toc") {booklet._closeTOC(obj,val);}else {booklet._set(obj,val);}
			}
		}else {booklet.L('warn','booklet.last(): object does not exist'); }
		return false;
	},
	next : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") { 
			var step=obj.doublepage?1:2,val=obj.curimg+step;
			if(!obj.automode&&!obj.curling&&obj.curimg<(obj.photo.length-step)) {
				if(obj.viewmode=="toc") {booklet._closeTOC(obj,val);}else {booklet._set(obj,val);}
			}
		}else {booklet.L('warn','booklet.next(): object does not exist'); }
		return false;
	},
	prev : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") { 
			var step=obj.doublepage?1:2,val=obj.curimg-step;
			if(!obj.automode&&!obj.curling&&obj.curimg>=step) {
				if(obj.viewmode=="toc") {booklet._closeTOC(obj,val);}else {booklet._set(obj,val);}
			}
		}else {booklet.L('warn','booklet.prev(): object does not exist'); }
		return false;
	},
	show : function(obj,v) {
		if(obj&&typeof(obj.mainid)==="string") {
			if(v&&typeof(v)==="number") { 
				var step=obj.doublepage?1:2,max=obj.photo.length%2==0?obj.photo.length-step:obj.photo.length-1,val=Math.min(max,Math.abs(v-1)); 
				if(!obj.doublepage) {val-=(val%2==0?0:1);} 
				if(!obj.automode&&!obj.curling&&(val>=0&&val<=max&&(obj.curimg!==val||obj.viewmode==="toc"))) {
					if(obj.viewmode=="toc") {booklet._closeTOC(obj,val);}else {booklet._set(obj,val);}
				}
			}else {booklet.L('warn','booklet.show(): image number "'+v+'" does not exist'); }
		}else {booklet.L('warn','booklet.show(): object does not exist'); }
		return false;
	},
	get : function(obj,v,n) {
		function getURL(url) {var a=booklet.E('a');a.href=url;return a.href;};
		if(obj&&typeof(obj.mainid)==="string"&&v&&typeof(v)==="string") { var io=null;
	 		switch(v.toLowerCase()){
	 			case "setup": io=obj.setup; break;
	 			case "blocked": io=obj.blocked; break;
	 			case "curling": io=obj.curling; break;
	 			case "playing": io=obj.automode; break;
	 			case "viewmode": io=obj.viewmode; break;
	 			case "imginfo": io=Math.max(1,Math.min(obj.photo.length,parseInt(n,10)))-1; var d=new Object(); d.name=obj.photo[io].n; d.source=obj.photo[io].source;
	 				d.width=obj.photo[io].w; d.height=obj.photo[io].h; d.diff_origin=obj.photo[io].sop; d.abs_url=getURL(obj.photo[io].source); d.filter="";
	 				if(obj.photo[io].filter&&obj.photo[io].filter.length>0) {for(var i=0; i<obj.photo[io].filter.length; i++) {d.filter+=(d.filter.length>0?'|':'')+obj.photo[io].filter[i].f;}} io=d; break;
	 			case "origin": io=obj.origin; break;
	 			case "current": io=obj.curimg+1; break;
	 			case "total": io=obj.photo.length; break;
	 		}return io;
		}else {booklet.L('warn','booklet.get(): object does not exist'); }
		return false;
	},
	set : function(obj,t,val) {
		if(obj&&typeof(obj.mainid)==="string"&&t&&typeof(t)==="string") {
	 		switch(t.toLowerCase()){
	 			case "playdelay": obj.playdelay=parseInt(Math.max(0,Math.min(3600,val||0))); break;
	 			case "nopanel": obj.nopanel=Boolean(val); var ele=booklet.G(obj.ctrlid); ele.nopanel=obj.nopanel; if(obj.nopanel) {ele.style.opacity=0; if(obj.calendarmode) {ele.style.right=(ele.width*(-1))+'px';}else {ele.style.bottom=(ele.height*(-1))+'px';}} break;
	 		}
		}else {booklet.L('warn','booklet.set(): object does not exist'); }
		return false;
	},
	data : function(obj,data,opts) {
		function getFName(v,s) {var fn=v.replace(/^.*[\/\\]/g, ''),t=fn.lastIndexOf(".");if(s&&t>0) {fn=fn.substring(0,t);}return fn;};
		function getArg(a,t) {return (typeof opts[a]===t?opts[a]:obj[a]);};
		if(obj&&typeof(obj.mainid)==="string") {
			if(!obj.automode&&!obj.curling) {
				if(data&&data.length&&data.length>1) {
					var i,l,ctx,ele,frm=booklet.G(obj.frameid);
					if(frm.timer) {window.clearInterval(frm.timer);} 
					if(frm.style.opacity>0) {var c=0,n=frm.style.opacity*100,m=0,t=10,p=1,o=0; 
						booklet.G(obj.lockid).style.visibility='visible';
						frm.timer=window.setInterval(function() {
							o=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)));
							frm.style.filter="alpha(opacity="+o+")";//IE6-7
							frm.style.opacity=o/100; c++;
							if(c>t) {window.clearInterval(frm.timer); frm.style.opacity=0; 
								for(i=0,l=obj.photo.length; i<l; i++) {obj.photo[i].n=getFName(obj.photo[i].source,true); if(typeof(obj.photo[i].caption)=='undefined') {obj.photo[i].caption='';}}
								if(obj.vml) {
									obj.tc=-1; obj.curimg=0; obj.curtoc=0; obj.blocked=true; obj.setup=false;
									ele=booklet.G(obj.crlyid); 
									if(ele) {
										ele.innerHTML="";
										ele.style.filter="alpha(opacity=0)";//IE6-7
									}
									ele=booklet.G(obj.ltlyid); if(ele) {ele.innerHTML="";}
									ele=booklet.G(obj.rblyid); if(ele) {ele.innerHTML="";}
								}else if(obj.w3c){
									for(i=0; i<(obj.toc.length-1); i++) {obj.toc.splice(i,1); i--;} obj.photo=data;
									if(obj.toc[0]&&obj.toc[0].getContext) {ctx=obj.toc[0].getContext("2d"); ctx.clearRect(0,0,obj.pw,obj.ph);}
									obj.tc=-1; obj.curimg=0; obj.curtoc=0; obj.blocked=true; obj.setup=false;
									ele=booklet.G(obj.crlyid); if(ele&&ele.getContext) {ele.style.opacity=0; ctx=ele.getContext("2d");ctx.clearRect(0,0,ele.width,ele.height); }
									ele=booklet.G(obj.ltlyid); if(ele&&ele.getContext) {ele.style.opacity=0; ctx=ele.getContext("2d");ctx.clearRect(0,0,ele.width,ele.height); }
									ele=booklet.G(obj.rblyid); if(ele&&ele.getContext) {ele.style.opacity=0; ctx=ele.getContext("2d");ctx.clearRect(0,0,ele.width,ele.height); }
									if(obj.viewmode==="toc") {var tmp,ele; obj.viewmode="image";
										tmp=booklet.G(obj.id+'_bt_event');
										tmp.setAttribute("onmouseover","booklet._ctrlover(this.firstChild,"+obj.calendarmode+");");
										tmp.setAttribute("onmouseout","booklet._ctrlout(this.firstChild,"+obj.calendarmode+");");
										booklet._ctrlout(tmp.lastChild,obj.calendarmode);
										booklet.G(obj.thumbs).style.visibility='hidden';
										booklet.G(obj.thumb).style.visibility='hidden';
										ele=booklet.G(obj.ctocid); if(ele) {if(obj.calendarmode) {ele.style.right=(ele.width*(-1))+'px';}else {ele.style.bottom=(ele.height*(-1))+'px';}}
										ele=booklet.G(obj.ltifid); if(ele) {ele.style.opacity=0; if(obj.calendarmode){ele.style.top='0px';}else{ele.style.bottom='0px';}}
										ele=booklet.G(obj.rbifid); if(ele) {ele.style.opacity=0; ele.style.bottom='0px';} obj.callafter='';
									}
								}
								if(typeof(opts)==='object') {
									obj.callback=getArg('callback','string');
									obj.language=getArg('language','object'); 
									obj.filter=getArg('filter','object');
									obj.meter=getArg('meter','boolean'); 
									obj.notrans=getArg('notrans','boolean');
									obj.tocfirst=getArg('tocfirst','boolean');
									obj.mfgcolor=booklet.C(getArg('mfgcolor','string'),obj.opts['mfgcolor']); obj.mfgc=booklet.R(obj.mfgcolor);
									obj.mftcolor=booklet.C(getArg('mftcolor','string'),obj.opts['mftcolor']); obj.mftc=booklet.R(obj.mftcolor);
									obj.mbgcolor=booklet.C(getArg('mbgcolor','string'),obj.opts['mbgcolor']); obj.mbgc=booklet.R(obj.mbgcolor);
									obj.mopacity=Math.max(Math.min(getArg('mopacity','number'),1.0),0.1);
									obj.msize=parseInt(Math.max(Math.min(getArg('msize','number'),Math.min(obj.framewidth,obj.frameheight)),24),10);
									obj.mposx=parseInt(Math.max(Math.min(getArg('mposx','number'),obj.framewidth-obj.msize),0),10);
									obj.mposy=parseInt(Math.max(Math.min(getArg('mposy','number'),obj.frameheight-obj.msize),0),10);
									obj.nopanel=getArg('nopanel','boolean'); 
									obj.verbose=getArg('verbose','boolean'); 
									obj.autoplay=getArg('autoplay','boolean'); 
									obj.buffered=getArg('buffered','boolean');
									obj.toctooltip=getArg('toctooltip','boolean'); 
									obj.filtertoc=getArg('filtertoc','boolean');
									obj.forceglobal=getArg('forceglobal','boolean');
									obj.forcecaption=getArg('forcecaption','boolean');
									obj.forceimginfo=getArg('forceimginfo','boolean');
									obj.imprintheader=getArg('imprintheader','string');
									obj.imprintbody=getArg('imprintbody','string');
									obj.imprintfooter=getArg('imprintfooter','string');
									obj.noimprint=(obj.imprintheader!=""||obj.imprintbody!=""||obj.imprintfooter!=""?false:true);
									obj.loadtimeout=parseInt(Math.max(1,Math.min(60,getArg('loadtimeout','number'))))*1000;
									obj.playdelay=parseInt(Math.max(0,Math.min(3600,getArg('playdelay','number'))));
									obj.animsteps=getArg('animsteps','number'); obj.animsteps=obj.animsteps>5?obj.animsteps:0;
									obj.framedelay=parseInt(Math.max(20,Math.min(50,getArg('framedelay','number'))));
									obj.pxperstep=parseInt(Math.max(1,Math.min(obj.calendarmode?obj.frameheight:obj.framewidth,obj.animsteps?((obj.calendarmode?obj.frameheight:obj.framewidth)/obj.animsteps):getArg('pxperstep','number'))));
								}
								if(frm.style.opacity<1) {c=0,n=frm.style.opacity*100,m=100,t=10,p=1;
									frm.timer=window.setInterval(function() {
										o=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)));
										frm.style.filter="alpha(opacity="+o+")";//IE6-7
										frm.style.opacity=o/100; c++; 
										if(c>t) {window.clearInterval(frm.timer); 
											frm.style.filter="alpha(opacity=100)";//IE6-7
											frm.style.opacity=1;
											obj.cover=set_BT_BusyOverlay(booklet.G(obj.frameid),obj.overlayoptions,obj.busyoptions);
											booklet.G(obj.lockid).style.visibility='hidden';
											booklet._preload(obj,0);
										}
									},obj.framedelay);
								}
							}
						},obj.framedelay);
					}
				}else {booklet.L('warn','booklet.data(): data is wrong');}
			}else {booklet.L('warn','booklet.data(): object is busy');}
		}else {booklet.L('warn','booklet.data(): object does not exist');}
		return false; 
	},	
	remove : function(obj,fade) {
		if(obj&&obj.setup&&typeof(obj.ctrlid)==="string") {obj.automode=false; 
			if(obj.timer) {window.clearInterval(obj.timer);}
			if(obj.curltimer) {window.clearInterval(obj.curltimer);}
			var par=obj.parentNode,bak=obj.bak; 
			if(fade) {
				var c=0,n=100,m=0,t=10,p=1,v=1,main=booklet.G(obj.mainid); 
				if(main.timer) {window.clearInterval(main.timer);} 
				main.timer=window.setInterval(function() {
					v=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)));
					main.style.opacity=v/100; c++; if(c>t) {
						window.clearInterval(main.timer); main.style.opacity=0; 
						obj.setup=false; obj.innerHTML=""; par.replaceChild(bak,obj);
					}
				},obj.framedelay);
			}else {
				obj.setup=false; obj.innerHTML=""; par.replaceChild(bak,obj);
			}
		}else {booklet.L('warn','booklet.remove(): object does not exist');}
		return false; 
	},
	_meter : function(obj,delay,stp,cnt) {
		function F(a,z,v) {var r,g,b,x,y,l; v=v||0; l=1-v;
			function h2d(h){return(Math.max(0,Math.min(parseInt(h,16),255)));};
			x=h2d(a.substr(1,2)); y=h2d(z.substr(1,2)); r=Math.max(0,Math.min(255,parseInt((x*l)+(y*v))));
			x=h2d(a.substr(3,2)); y=h2d(z.substr(3,2)); g=Math.max(0,Math.min(255,parseInt((x*l)+(y*v))));
			x=h2d(a.substr(5,2)); y=h2d(z.substr(5,2)); b=Math.max(0,Math.min(255,parseInt((x*l)+(y*v))));
			return(r+','+g+','+b);
		};
		if(obj&&typeof(obj.mainid)==="string") { 
			if(obj.automode) { 
				var meter=booklet.G(obj.meterid);
				if(meter.timer) {window.clearInterval(meter.timer);}
				meter.style.visibility='visible';
				if(obj.w3c) {
					var ctx=meter.getContext("2d"),bg=obj.mbgc,fg=obj.mfgc,t=Math.round(delay/50),d=Math.PI*2,s=d/t,c=0,w=meter.width,h=meter.height,x=w/2,y=h/2,a=(Math.PI/2)*-1,r=x;
					meter.timer=window.setInterval(function() {
						if(!obj.notrans) {fg=F(obj.mfgcolor,obj.mftcolor,c/t);}
						ctx.clearRect(0,0,w,h);ctx.save();ctx.arc(x,y,r,0,d,true);
						ctx.fillStyle="rgba("+bg+","+obj.mopacity+")";ctx.fill();
						ctx.fillStyle="rgba("+fg+","+obj.mopacity+")";ctx.beginPath();
						ctx.moveTo(x,y);ctx.arc(x,y,r,a,a+(c*s),true);
						ctx.closePath();ctx.fill();ctx.restore(); c++;
						if(c>t) {
							window.clearInterval(meter.timer);
							ctx.clearRect(0,0,w,h);
							obj.curimg=(cnt<(obj.photo.length-stp)?cnt+stp:0); 
							if(obj.curimg==0) {
								booklet._set(obj,obj.curimg,false,true); 
							}else {
								booklet._set(obj,obj.curimg,false,false,true); 
							}
						}
					}, 50);
				}else {
					var angle=meter.lastChild,
						t=Math.round(delay/50),
						m=0,
						s=360/t,
						c=0,
						a="m 500,500 ae 500,500,500,500,5898150,",
						z=" x e",
						p="";
					m=Math.round(360*65536);
					p=a+m+z;
					angle.path=p;
					meter.style.visibility='visible';
					meter.timer=window.setInterval(function() {
						m=Math.round((360-(c*s))*65536);
						p=a+m+z;
						angle.path=p;
						c++;
						if(c>t) {
							window.clearInterval(meter.timer);
							meter.style.visibility='hidden';
							obj.curimg=(cnt<(obj.photo.length-stp)?cnt+stp:0); 
							if(obj.curimg==0) {
								booklet._set(obj,obj.curimg,false,true); 
							}else {
								booklet._set(obj,obj.curimg,false,false,true); 
							}
						}
					}, 50);
				}
			}
		}else {booklet.L('warn','booklet._meter(): object does not exist'); }
		return false; 
	},
	_reset : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") { 
			booklet.G(obj.ltlkid).style.visibility='visible'; 
			booklet.G(obj.rblkid).style.visibility='visible'; 
			booklet.G(obj.ltevid).style.visibility='visible';
			booklet.G(obj.rbevid).style.visibility='visible';
			var ele=booklet.G(obj.ltifid); 
			if(ele&&!obj.doublepage) {
				if(obj.calendarmode) {
					ele.style.top='3px';
				}else{
					ele.style.bottom='3px';
				}
			}
			ele=booklet.G(obj.rbifid); if(ele) {ele.style.bottom='3px';}
			ele=booklet.G(obj.id+'_bt_play'); 
			if(ele) {
				ele.style.opacity=1.0;
				ele.setAttribute("onclick","booklet.play(booklet.G('"+obj.id+"'));");
			}
			obj.callafter='';
		}else {booklet.L('warn','booklet._reset(): object does not exist'); }
		return false; 
	},
	_openTOC : function(obj) {
		if(obj&&!obj.notoc&&typeof(obj.ctrlid)==="string") { 
			if(obj.viewmode!=="toc") {var tmp,ele;
				booklet.G(obj.lockid).style.visibility='visible';
				obj.viewmode="toc";
				tmp=booklet.G(obj.id+'_bt_event');
				booklet._ctrlout(tmp.firstChild,obj.calendarmode);
				tmp.setAttribute("onmouseover","booklet._ctrlover(this.lastChild,"+obj.calendarmode+");");
				tmp.setAttribute("onmouseout","booklet._ctrlout(this.lastChild,"+obj.calendarmode+");");
				booklet.G(obj.ltevid).style.visibility='hidden';
				booklet.G(obj.rbevid).style.visibility='hidden';
				booklet.G(obj.ltlkid).style.visibility='hidden'; 
				booklet.G(obj.rblkid).style.visibility='hidden'; 
				ele=booklet.G(obj.ltifid); if(ele) {if(obj.calendarmode){ele.style.top='-30px';}else{ele.style.bottom='-30px';}}
				ele=booklet.G(obj.rbifid); if(ele) {ele.style.bottom='-30px';}
				tmp=Math.min(obj.toc.length-1,Math.max(0,Math.floor(obj.curimg/(obj.tm*obj.tm))));
				obj.curtoc=obj.doublepage?tmp:tmp%2==0?tmp:tmp-1; obj.curthb=obj.curtoc;
				if(!obj.setup&&obj.tocfirst) {
					booklet._setTOC(obj,0,false,true);
				}else{
					booklet._setTOC(obj,obj.curtoc,true,true);
				}
			}
		}else {booklet.L('warn','booklet._openTOC(): object does not exist'); }
		return false; 
	},
	_setTOC : function(obj,val,force,first) {
		if(obj&&typeof(obj.mainid)==="string") {
			booklet.G(obj.lockid).style.visibility='visible';
			if(obj.curltimer) {window.clearInterval(obj.curltimer);} 
			if(obj.w3c) {obj.curling=true;
				var dir=0,pre=obj.curtoc,cur=val||0,rbe,lte,atx,btx,ctx,ztx,bmp,wbu=!obj.wcs&&obj.buffered,ele=booklet.G(obj.crlyid); 
				dir=(cur>pre||force?-1:cur<pre?1:0); obj.curtoc=cur;
				if(wbu) {
					bmp=booklet.E('canvas');
					bmp.height=obj.frameheight;
					bmp.width=obj.framewidth;
				}
				function fill(ct,x,y,w,h,o,t) {
					var s=ct.createLinearGradient(x,y,w,h); 
					s.addColorStop(0.0,'rgba(0,0,0,'+(o*(t?0:.66))+')'); 
					s.addColorStop(0.5,'rgba(0,0,0,'+(o*.2)+')'); 
					s.addColorStop(1.0,'rgba(0,0,0,'+(o*(t?.66:0))+')'); 
					return s;
				};
				function ltfill(ct,x,y,w,h,o) {
					var s=ct.createLinearGradient(x,y,w,h); 
					s.addColorStop(1.0,'rgba(0,0,0,'+(o*1.125)+')'); 
					s.addColorStop(0.9625,'rgba(0,0,0,'+(o*1.25)+')'); 
					s.addColorStop(0.761,'rgba(0,0,0,0.0)'); 
					s.addColorStop(0.76,'rgba(255,255,255,0.0)'); 
					s.addColorStop(0.6,'rgba(255,255,255,'+(o*.5)+')'); 
					s.addColorStop(0.0,'rgba(255,255,255,0.0)'); 
					return s;
				};
				function rbfill(ct,x,y,w,h,o) {var s; 
					var s=ct.createLinearGradient(x,y,w,h); 
					s.addColorStop(0.0,'rgba(0,0,0,'+(o*1.2)+')'); 
					s.addColorStop(0.125,'rgba(0,0,0,'+o+')'); 
					s.addColorStop(0.5,'rgba(0,0,0,'+(o*.25)+')'); 
					s.addColorStop(1.0,'rgba(0,0,0,0)'); 
					return s;
				};				
				if(dir==-1) {
					rbe=booklet.G(obj.rblyid);
					if(wbu) {
						ctx=bmp.getContext("2d"); 
						ztx=rbe.getContext("2d"); 
						ztx.clearRect(0,0,ele.width,ele.height); 
					}else {
						ctx=rbe.getContext("2d"); 
					}
					ctx.clearRect(0,0,rbe.width,rbe.height); 
					var x=0,y=0,w=0,h=0,c=1,t=5,v=0,s=obj.framedelay,p=obj.pxperstep,
					cm=obj.calendarmode,dp=obj.doublepage,
					ww=rbe.width,hh=rbe.height,
					t=parseInt(cm?hh/p:ww/p,10), p=t+t,
					mw=(cm?0:ww),mh=(cm?hh:0), 
					xs=cm?0:mw/p,ys=cm?mh/p:0,
					xo=dp?0:(cm?0:obj.pw),
					yo=dp?0:(cm?obj.ph:0),
					w2=ww/2,h2=hh/2,
					w3=ww/6,h3=hh/6,
					w5=ww/10,h5=hh/10,
					sw=0,sh=0;
					rbe.style.visibility='visible'; 
					rbe.style.opacity=1.0; 
					obj.curltimer=window.setInterval(function() {
						v=booklet._twee(t,c)*t;
						w=(cm?ww:xs*v); h=(cm?ys*v:hh); 
						x=cm?0:mw-(w*2); y=cm?mh-(h*2):0;
						ctx.drawImage(obj.toc[obj.curtoc],0,0,w,h,x,y,w,h);
						// front-shadow
						ctx.beginPath(); ctx.rect(x-(cm?0:16),y-(cm?16:0),cm?w:16,cm?16:h); ctx.closePath(); 
						ctx.fillStyle=fill(ctx,x-(cm?0:16),y-(cm?16:0),x+(cm?0:16),y+(cm?16:0),obj.shade,true); 
						ctx.fill(); // left-shadow
						sw=Math.min(w,w3); sh=Math.min(h,h3);
						ctx.beginPath(); ctx.rect(x+(cm?0:w-sw),y+(cm?h-sh:0),cm?w:sw,cm?sh:h); ctx.closePath(); 
						ctx.fillStyle=ltfill(ctx,x+(cm?0:w-sw),y+(cm?h-sh:0),x+(cm?0:w),y+(cm?h:0),obj.shade); 
						ctx.fill(); 
						x=(cm?0:(dp?mw:xo)-w); y=(cm?(dp?mh:yo)-h:0); 
						ctx.drawImage(obj.toc[obj.curtoc+(dp?0:1)],x,y,w,h,xo+x,yo+y,w,h);
						// right-shadow
						sw=Math.min(w,w5); sh=Math.min(h,h5);
						ctx.beginPath(); ctx.rect(x+(cm?0:dp?0:w2),y+(cm?dp?0:h2:0),cm?w:sw,cm?sh:h); ctx.closePath(); 
						ctx.fillStyle=rbfill(ctx,x+(cm?0:dp?0:w2),y+(cm?dp?0:h2:0),x+(cm?0:(dp?0:w2)+sw),y+(cm?(dp?0:h2)+sh:0),obj.shade); 
						ctx.fill(); 
						if(wbu) {
							ztx.drawImage(bmp,0,0,ele.width,ele.height);
						}
						c++; 
						if(c>t) {
							window.clearInterval(obj.curltimer);
							btx=ele.getContext("2d"); 
							btx.drawImage(rbe,0,0,ele.width,ele.height);
							btx.beginPath(); 
							btx.moveTo(cm?0:w2,cm?h2:0); 
							btx.lineTo(cm?ww:w2,cm?h2:hh); 
							btx.closePath(); 
							btx.strokeStyle='rgba(0,0,0,'+obj.shade+')'; 
							btx.lineWidth=0.5; 
							btx.stroke(); 
							ctx.clearRect(0,0,rbe.width,rbe.height); 
							rbe.style.opacity=0;
							rbe.style.visibility='hidden'; 
							obj.curling=false; 
							if(first) {booklet.G(obj.thumbs).style.visibility='visible';}
							booklet._ctrlTOC(obj);
							booklet._curl(obj);
						}
					},s);
				}else if(dir==1) {
					lte=booklet.G(obj.ltlyid);
					if(wbu) {
						ctx=bmp.getContext("2d"); 
						ztx=lte.getContext("2d"); 
						ztx.clearRect(0,0,ele.width,ele.height); 
					}else {
						ctx=lte.getContext("2d"); 
					}
					ctx.clearRect(0,0,lte.width,lte.height); 
					var x=0,y=0,w=0,h=0,c=1,t=5,v=0,s=obj.framedelay,p=obj.pxperstep,
					cm=obj.calendarmode,dp=obj.doublepage,
					ww=lte.width,hh=lte.height,
					t=parseInt(cm?hh/p:ww/p,10), p=t+t,
					mw=(cm?0:ww),mh=(cm?hh:0), 
					xs=cm?0:mw/p,ys=cm?mh/p:0,
					xo=cm?0:dp?ww:obj.pw,
					yo=cm?dp?hh:obj.ph:0,
					w2=ww/2,h2=hh/2,
					w3=ww/6,h3=hh/6,
					w5=ww/10,h5=hh/10,
					sw=0,sh=0;
					lte.style.visibility='visible'; 
					lte.style.opacity=1.0; 
					obj.curltimer=window.setInterval(function() {
						v=booklet._twee(t,c)*t;
						w=(cm?ww:xs*v); h=(cm?ys*v:hh); 
						x=cm?0:mw-(w*2); y=cm?mh-(h*2):0;
						ctx.drawImage(obj.toc[obj.curtoc],0,0,w,h,0,0,w,h);
						x=(cm?0:w); y=(cm?h:0); 
						ctx.drawImage(obj.toc[obj.curtoc+(dp?0:1)],xo-x,yo-y,w,h,x,y,w,h);
						// left-shadow
						sw=Math.min(w,w3); sh=Math.min(h,h3);
						ctx.beginPath(); ctx.rect(x-(cm?0:sw),y-(cm?sh:0),cm?w:sw,cm?sh:h); ctx.closePath(); 
						ctx.fillStyle=ltfill(ctx,x-(cm?0:sw),y-(cm?sh:0),x,y,obj.shade); 
						ctx.fill(); // right-shadow
						sw=Math.min(w,w5); sh=Math.min(h,h5);
						ctx.beginPath(); ctx.rect(x,y,cm?w:sw,cm?sh:h); ctx.closePath(); 
						ctx.fillStyle=rbfill(ctx,x,y,x+(cm?0:sw),y+(cm?sh:0),obj.shade); 
						ctx.fill(); // front-shadow
						ctx.beginPath(); ctx.rect(x+(cm?0:w),y+(cm?h:0),cm?w:16,cm?16:h); ctx.closePath(); 
						ctx.fillStyle=fill(ctx,x+(cm?0:w),y+(cm?h:0),x+(cm?0:w+16),y+(cm?h+16:0),obj.shade,false); 
						ctx.fill(); 
						if(wbu) {
							ztx.drawImage(bmp,0,0,ele.width,ele.height);
						}
						c++; 
						if(c>t) {
							window.clearInterval(obj.curltimer);
							btx=ele.getContext("2d"); 
							btx.drawImage(lte,0,0,ele.width,ele.height);
							btx.beginPath(); 
							btx.moveTo(cm?0:w2,cm?h2:0); 
							btx.lineTo(cm?ww:w2,cm?h2:hh); 
							btx.closePath(); 
							btx.strokeStyle='rgba(0,0,0,'+obj.shade+')'; 
							btx.lineWidth=0.5; 
							btx.stroke(); 
							ctx.clearRect(0,0,lte.width,lte.height); 
							lte.style.opacity=0; 
							lte.style.visibility='hidden'; 
							obj.curling=false;
							if(first) {booklet.G(obj.thumbs).style.visibility='visible';}
							booklet._ctrlTOC(obj);
							booklet._curl(obj);
						}
					},s);
				}else {
					ctx=ele.getContext("2d"); 
					ctx.clearRect(0,0,ele.width,ele.height); 
					ctx.fillStyle=obj.pagecolor; 
					ctx.fillRect(0,0,ele.width,ele.height); 
					ctx.save();
					ctx.drawImage(obj.toc[obj.curtoc],0,0,obj.toc[obj.curtoc].width,obj.toc[obj.curtoc].height);
					booklet._ltShade(ctx,0,0,ele.width,ele.height,obj.shade,obj.calendarmode);
					if(obj.doublepage) {booklet._rbShade(ctx,0,0,ele.width,ele.height,obj.shade,obj.calendarmode);}
					if(!obj.doublepage) {
						if(obj.curtoc+2<=obj.toc.length) {
							ctx.drawImage(obj.toc[obj.curtoc+1],(obj.calendarmode?0:obj.toc[obj.curtoc].width),(obj.calendarmode?obj.toc[obj.curtoc].height:0),obj.toc[obj.curtoc].width,obj.toc[obj.curtoc].height);
						}
						booklet._rbShade(ctx,0,0,ele.width,ele.height,obj.shade,obj.calendarmode);
					}
					ctx.restore(); obj.curling=false; 
					if(first) {booklet.G(obj.thumbs).style.visibility='visible';}
					booklet._ctrlTOC(obj);
					booklet._curl(obj);
				}
			}
		}else {booklet.L('warn','booklet._setTOC(): object does not exist'); }
		return false; 
	},
	_ctrlTOC : function(obj) {
		if(obj&&!obj.notoc&&typeof(obj.mainid)==="string") {
			if(obj.viewmode==="toc") {
				var temp,val,max,last,first,prev,next,step=obj.doublepage?1:2;
				max=obj.toc.length%2==0?obj.toc.length-step:obj.toc.length-1;
				first=(obj.curtoc>0?0:-1);
				last=(obj.curtoc<(obj.toc.length-step)?max:-1); 
				prev=(obj.curtoc>=step?obj.curtoc-step:-1);
				next=(obj.curtoc<(obj.toc.length-step)?obj.curtoc+step:-1); 
				temp=booklet.G(obj.id+'_bc_prev'); temp.style.opacity=prev>-1?1.0:0.2;
				val=(prev>-1?"if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._setTOC(booklet.G('"+obj.id+"'),"+prev+");}":"");
				temp.setAttribute("onclick",val); 
				temp=booklet.G(obj.id+'_bc_next'); temp.style.opacity=next>-1?1.0:0.2  ;
				val=(next>-1?"if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._setTOC(booklet.G('"+obj.id+"'),"+next+");}":"");
				temp.setAttribute("onclick",val); 
				temp=booklet.G(obj.id+'_bc_first'); temp.style.opacity=first>-1?1.0:0.2;
				temp.setAttribute("onclick",(first>-1?"if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._setTOC(booklet.G('"+obj.id+"'),"+first+");}":""));
				temp=booklet.G(obj.id+'_bc_last'); temp.style.opacity=last>-1?1.0:0.2;
				temp.setAttribute("onclick",(last>-1?"if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._setTOC(booklet.G('"+obj.id+"'),"+last+");}":""));
			}
		}else {booklet.L('warn','booklet._ctrlTOC(): object does not exist'); }
		return false; 
	},
	_closeTOC : function(obj,val) {
		if(obj&&!obj.notoc&&typeof(obj.ctrlid)==="string") { 
			if(obj.viewmode==="toc") {var tmp,ele;
				val=typeof(val)!=='number'?obj.curimg:val;
				obj.viewmode="image";
				tmp=booklet.G(obj.id+'_bt_event');
				tmp.setAttribute("onmouseover","booklet._ctrlover(this.firstChild,"+obj.calendarmode+");");
				tmp.setAttribute("onmouseout","booklet._ctrlout(this.firstChild,"+obj.calendarmode+");");
				booklet._ctrlout(tmp.lastChild,obj.calendarmode);
				booklet.G(obj.thumbs).style.visibility='hidden';
				booklet.G(obj.thumb).style.visibility='hidden';
				ele=booklet.G(obj.ctocid); obj.callafter='_reset';
				if(ele){if(obj.calendarmode) {ele.style.right=(ele.width*(-1))+'px';}else {ele.style.bottom=(ele.height*(-1))+'px';}}
				booklet._set(obj,val,false,true);
			}
		}else {booklet.L('warn','booklet._closeTOC(): object does not exist'); }
		return false; 
	},
	_deepCopy : function(o) {
	    if(typeof(o)!=="object"||o===null) {return o;} var c=(o instanceof Array)?[]:{}; for(var i in o) {if(o[i]&&typeof(o[i])=="object") {c[i]=booklet._deepCopy(o[i]);}else{c[i]=o[i];}}  return c;
	},
	_getLang : function(obj,a,c) {
		if(obj.language&&obj.opts.language) {
			return (typeof(obj.language[a])==="string"?obj.language[a]:typeof(obj.opts.language[a])==="string"?obj.opts.language[a]:c||"nop");
		}else {
			return c;
		} 
		return false;
	},
	_preload : function(obj,cnt) {
		function getURL(url) {var a=booklet.E('a');a.href=url;return a.href;};
		if(obj&&typeof(obj.mainid)==="string") {var img=null,tmp="",str='',txt=booklet._getLang(obj,'overlaytext',"loading images..."); 
			if(obj.timer) {window.clearTimeout(obj.timer);}
			if(cnt<obj.photo.length) {tmp=booklet.G(obj.busyid);
				if(tmp) {str=txt+' '+(cnt+1)+'/'+obj.photo.length; tmp.innerHTML=str;}
				obj.timer=window.setTimeout(function(){
					booklet.L('warn','booklet._preload():  timeout image > '+obj.photo[cnt].source);
					booklet._preload(booklet.G(obj.id),cnt+1);
				}, obj.loadtimeout);
				img=new Image();
				img.onabort=function() {booklet.L('warn','booklet._preload():  onabort image > '+obj.photo[cnt].source); if(obj.timer) {window.clearTimeout(obj.timer);} booklet._setup(obj);};
				img.onerror=function() {booklet.L('warn','booklet._preload():  onerror image > '+obj.photo[cnt].source); cnt++; booklet._preload(obj,cnt);};
				img.onload=function() {
					if(img.width&&img.height&&img.width>=64&&img.height>=64) {obj.tc++;
						var warn="log",verbose="",iw,ih,ix,iy,owf,ohf,iwf,ihf,pos,nw=img.naturalWidth||img.width,nh=img.naturalHeight||img.height,tmp=typeof(obj.photo[cnt].imgshift)==='number'?obj.photo[cnt].imgshift:0;
						obj.photo[cnt].l=true; obj.photo[cnt].w=nw; obj.photo[cnt].h=nh; tmp=tmp>0&&tmp<=0.0001?0:tmp||0.5; pos=Math.max(Math.min(tmp||0.5,1.0),0.0);
						owf=obj.wf; ohf=obj.hf; ix=0; iy=0;	iw=nw; ih=nh; iwf=iw>ih?1:ih>iw?iw/ih:1; ihf=ih>iw?1:iw>ih?ih/iw:1;
						if(owf==1&&ohf==1&&iwf==1&&ihf==1) {
						}else if(owf==1&&ohf==1&&iwf==1) {iw=ih; ix=(nw-iw)*pos;
						}else if(owf==1&&ohf==1&&ihf==1) {ih=iw; iy=(nh-ih)*pos;
						}else if(owf==1) {
							if(ihf<ohf) {iw=nh*obj.fc; ix=(nw-iw)*pos;}else {ih=nw*ohf; iy=(nh-ih)*pos;}
						}else if(ohf==1) {
							if(iwf<owf) {ih=nw*obj.fc; iy=(nh-ih)*pos;}else {iw=nh*owf; ix=(nw-iw)*pos;}
						}
						obj.photo[cnt].ix=ix; obj.photo[cnt].iy=iy; obj.photo[cnt].iw=iw; obj.photo[cnt].ih=ih;
						var cw=obj.pw,ch=obj.ph,xf=(cw/iw),ff=xf,yf=(ch/ih),ww=(nw*xf),hh=(nh*yf);
						obj.photo[cnt].wm=(ww*.75);obj.photo[cnt].hm=(hh*.75);pos=0.5-pos;
						obj.photo[cnt].ox=((cw/ww)-1)*pos;obj.photo[cnt].oy=((ch/hh)-1)*pos;
						obj.photo[cnt].ww=Math.round(ww);obj.photo[cnt].hh=Math.round(hh);
						obj.photo[cnt].xx=Math.round(ff*-ix);obj.photo[cnt].yy=Math.round(ff*-iy);
						verbose='booklet._preload():   loaded image > '+obj.photo[cnt].source+' > #'+(obj.tc+1)+' '+nw+'x'+nh;
						obj.photo[cnt].sop=false; obj.photo[cnt].img=img;
						if(obj.timer) {window.clearTimeout(obj.timer);} 
						if(getURL(obj.photo[cnt].source).match(obj.regex)===null) {obj.photo[cnt].sop=true;}
						if(obj.photo[cnt].sop&&!obj.vml) {warn='warn';
							verbose='booklet._preload(): external image > '+obj.photo[cnt].source+' > #'+(obj.tc+1)+' '+nw+'x'+nh;
						}
						if(!obj.notoc&&obj.tc>=0) {
							var ctx=null,ct=obj.tc,od=ct%2!=0?2:1,tm=obj.tm,tw=obj.tw,th=obj.th,ti=(tm*tm),tp=parseInt(ct/ti,10);
							if(obj.calendarmode) {
								var tx=parseInt((ct-(tp*ti))/tm,10),ty=(ct%tm);
							}else {
								var tx=(ct%tm),ty=parseInt((ct-(tp*ti))/tm,10);
							}
							if(obj.toc.length<(tp+1)) {
								obj.toc[tp]=booklet.E('canvas');
								obj.toc[tp].height=obj.ph;
								obj.toc[tp].width=obj.pw;
								if(obj.wcs) {
									obj.toc[tp].id=obj.id+'_img_'+tp;
									obj.toc[tp].style.position='fixed';
									obj.toc[tp].style.height=obj.ph+'px';
									obj.toc[tp].style.width=obj.pw+'px';
									obj.toc[tp].style.left='-9999px';
									obj.toc[tp].style.top='0px';
									booklet.A(obj,obj.toc[tp]);
								}
								ctx=obj.toc[tp].getContext("2d"); 
								ctx.clearRect(0,0,obj.pw,obj.ph); 
								ctx.fillStyle='rgb('+booklet.R(obj.pagecolor)+')';
								ctx.fillRect(0,0,obj.pw,obj.ph); 
								ctx.save();
							}else {
								ctx=obj.toc[tp].getContext("2d");
							}
							var filter=typeof(obj.filter)==='object'?booklet._deepCopy(obj.filter):0; if(!obj.forceglobal) {filter=typeof(obj.photo[cnt].filter)==='object'?booklet._deepCopy(obj.photo[cnt].filter):filter;}	
							verbose+=' (thumb: '+Math.floor(tw)+'x'+Math.floor(th)+')';
							if(filter&&filter.length>0) {
								verbose+=' ('; var val=booklet.engine==="O"?2:3;
								for(var i=0; i<filter.length; i++) {
									verbose+=filter[i].f+' ';
									if(filter[i].f=="smooth") {
										filter[i].s=Math.min(val,filter[i].s?filter[i].s:val);
									}else if(filter[i].f.match(/(zoomblur|spinblur)/i)) {
										filter[i].s=Math.min(val*2,filter[i].s?filter[i].s:val*2);
									}else if(filter[i].f=="motionblur") {
										filter[i].s[0]=Math.min(val*2,filter[i].s[0]?filter[i].s[0]:val*2);
									}else if(filter[i].f=="tiltshift") {
										filter[i].s[3]=Math.min(val,filter[i].s[3]?filter[i].s[3]:val);
									}
								} 
								verbose+=':filter)';
							}
							if(obj.photo[cnt].sop) {
								verbose+='\nUNEQUAL ORIGIN! This will cause DOM Exception 18 on using any image filter depending on the get/setImageData interface. This is because of the Same origin policy. SOLUTION: use a proxy like "imgproxy.php?url=" as a prefix in path!';
							}
							if(obj.filtertoc) {
								if(!obj.photo[cnt].sop&&obj.cfa&&obj.gid&&filter&&filter.length>0) {var kw=tw,kh=th; tw=Math.ceil(tw); th=Math.ceil(th);
									var source=document.createElement('canvas'); source.height=th+4; source.width=tw+4; var src=source.getContext("2d");
									var buffer=document.createElement('canvas'); buffer.height=th; buffer.width=tw; var btx=buffer.getContext("2d");
									if(src&&btx) {btx.clearRect(0,0,tw,th); btx.fillStyle='rgb('+booklet.R(obj.pagecolor)+')';
										btx.fillRect(0,0,tw+4,th+4); btx.drawImage(img,ix,iy,iw,ih,0,0,tw,th); 
										src.clearRect(0,0,tw+4,th+4); src.fillStyle='rgb('+booklet.R(obj.pagecolor)+')';
										src.fillRect(0,0,tw+4,th+4); src.drawImage(buffer,0,0,tw+4,th+4); src.drawImage(buffer,2,2,tw,th); 
										for (var i=0; i<filter.length; i++) {cvi_filter.add(source,buffer,filter[i],tw,th);} 
										ctx.drawImage(source,2,2,kw,kh,tx*kw,ty*kh,kw,kh);
									}else {
										ctx.drawImage(img,ix,iy,iw,ih,tx*kw,ty*kh,kw,kh);
									}
								}else {
									ctx.drawImage(img,ix,iy,iw,ih,tx*tw,ty*th,tw,th);
								}
							}else {
								ctx.drawImage(img,ix,iy,iw,ih,tx*tw,ty*th,tw,th);
							}
						}
						if(obj.verbose||warn=='warn') {booklet.L(warn,verbose);}
						cnt++; booklet._preload(obj,cnt);
					}else {
						booklet.L('warn','booklet._preload(): low dimension image > '+obj.photo[cnt].source);
						cnt++; booklet._preload(obj,cnt);
					} 
					//IE resource START
	          		if(obj.vml) {img.onload=''; img=null;}
					//IE resource END
				}; img.src=obj.photo[cnt].source;
			}else {
				for(var i=0; i<obj.photo.length; i++) {if(!obj.photo[i].l) {obj.photo.splice(i,1); i--;}} 
				if(obj.photo.length>1) {
					if(!obj.notoc) {var ctx,tp=obj.toc.length;
						if(!obj.doublepage&&tp%2!==0) {
							obj.toc[tp]=booklet.E('canvas');
							obj.toc[tp].height=obj.ph;
							obj.toc[tp].width=obj.pw;
							if(obj.wcs) {
								obj.toc[tp].id=obj.id+'_img_'+tp;
								obj.toc[tp].style.position='fixed';
								obj.toc[tp].style.height=obj.ph+'px';
								obj.toc[tp].style.width=obj.pw+'px';
								obj.toc[tp].style.left='-9999px';
								obj.toc[tp].style.top='0px';
								booklet.A(obj,obj.toc[tp]);
							}
							ctx=obj.toc[tp].getContext("2d"); 
							ctx.clearRect(0,0,obj.pw,obj.ph); 
							ctx.fillStyle='rgb('+booklet.R(obj.pagecolor)+')';
							ctx.fillRect(0,0,obj.pw,obj.ph); 
							ctx.save();
						}
					}	
					if(!obj.notoc&&obj.tocfirst) {
						obj.autoplay=false;
						booklet._openTOC(obj);
					}else {
						booklet._set(obj,obj.curimg);
					}
				} booklet._setup(obj);
			}
		}else {booklet.L('warn','booklet._preload(): object does not exist');}
		return false; 
	},
	_setup : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") {  
			if(obj.photo.length<=1) {
				obj.cover.remove(); var ele=booklet.G(obj.frameid); obj.firstChild.removeChild(ele); booklet.L('warn','booklet._setup(): insufficient images');
			}else {
				var c=0,n=0,m=100,t=10,p=1,b=obj.doublepage,cr,lt,rb; cr=booklet.G(obj.crlyid).style; 
				rb=booklet.G(obj.id+'_rb_info').style; if(!b) {lt=booklet.G(obj.id+'_lt_info').style;} 
				obj.timer=window.setInterval(function() {obj.z=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n))); 
					//IE resource START
					if(obj.vml) {
						cr.filter="alpha(opacity="+obj.z+")";
						rb.filter="alpha(opacity="+obj.z+")";
						if(!b) {
							rb.filter="alpha(opacity="+obj.z+")";
						}
					}else {
					//IE resource END
						cr.opacity=obj.z/100; rb.opacity=obj.z/100; if(!b) {lt.opacity=obj.z/100;}
					}
					c++; 
					if(c>t) {
						window.clearInterval(obj.timer); 
						obj.cover.remove(); obj.setup=true; obj.blocked=false;
						booklet.G(obj.lockid).style.visibility='hidden'; 
						if(obj.callback) {
							if(typeof(window[obj.callback])==='function') {
								try {
									window[obj.callback]();
								}catch(err){
									booklet.L('error','booklet._setup(): has failed '+err.message);
								}
							}else {
								booklet.L('warn','booklet._setup(): "'+obj.callback+'" is not a function!');
							}
						}
						if(obj.autoplay) {booklet.play(obj,true);}
					}
				},obj.framedelay);
			}
		}else {booklet.L('warn','booklet._setup(): object does not exist'); }
		return false; 
	},
	_ltShade : function(ctx,x,y,w,h,o,v) {var t; ctx.beginPath(); ctx.rect(x,y,v?w:(w/2),v?(h/2):h); ctx.closePath(); 
		t=ctx.createLinearGradient(v?x:x+(w/2),v?y+(h/2):y,x,y); 
		t.addColorStop(0,'rgba(0,0,0,'+(o*1.125)+')'); 
		t.addColorStop(0.0125,'rgba(0,0,0,'+(o*1.25)+')'); 
		t.addColorStop(0.1,'rgba(0,0,0,0)'); 
		t.addColorStop(0.101,'rgba(254,254,254,0)'); 
		t.addColorStop(0.15,'rgba(254,254,254,'+(o*.5)+')'); 
		t.addColorStop(0.35,'rgba(254,254,254,0)'); 
		t.addColorStop(1,'rgba(254,254,254,0)');
		ctx.fillStyle=t; 
		ctx.fill(); 
		return false;
	},
	_rbShade : function(ctx,x,y,w,h,o,v) {var s; 
		ctx.beginPath(); 
		ctx.rect(v?x:x+(w/2),v?y+(h/2):y,w,h); 
		ctx.closePath(); 
		s=ctx.createLinearGradient(v?x:x+(w/2),v?y+(h/2):y,v?x:x+w,v?y+h:y); 
		s.addColorStop(0,'rgba(0,0,0,'+(o*1.2)+')'); 
		s.addColorStop(0.025,'rgba(0,0,0,'+o+')'); 
		s.addColorStop(0.1,'rgba(0,0,0,'+(o*.25)+')'); 
		s.addColorStop(0.2,'rgba(0,0,0,0)'); 
		s.addColorStop(1,'rgba(0,0,0,0)'); 
		ctx.fillStyle=s; 
		ctx.fill(); 
		ctx.beginPath(); 
		ctx.moveTo(v?x:x+(w/2),v?y+(h/2):y); 
		ctx.lineTo(v?x+w:x+(w/2),v?y+(h/2):y+h); 
		ctx.closePath(); 
		ctx.strokeStyle='rgba(0,0,0,'+o+')'; 
		ctx.lineWidth=0.5; 
		ctx.stroke(); 
		return false;
	},
	_set : function(obj,val,nr,force,auto) {
		if(obj&&typeof(obj.mainid)==="string") {
			booklet.G(obj.lockid).style.visibility='visible';
			//IE resource START
			if(!obj.ie8) {
				booklet.G(obj.ltlyid).style.visibility='hidden';
				booklet.G(obj.rblyid).style.visibility='hidden';
			}
			//IE resource END
			if(obj.curltimer) {window.clearInterval(obj.curltimer);} 
			if(obj.w3c&&!nr) {obj.curling=true; 
				var rbe,lte,atx,btx,ctx,ztx,bmp,dir=0,wbu=!obj.wcs&&obj.buffered,pre=obj.curimg,cur=val||0,ele=booklet.G(obj.crlyid);
				dir=(cur<pre||force?1:cur>pre||auto?-1:0); obj.curimg=cur; 
				btx=obj.buf[0].getContext("2d"); 
				btx.clearRect(0,0,obj.pw,obj.ph); 
				btx.fillStyle='rgb('+booklet.R(obj.pagecolor)+')';
				btx.fillRect(0,0,obj.pw,obj.ph);
				btx.drawImage(obj.photo[obj.curimg].img,obj.photo[obj.curimg].ix,obj.photo[obj.curimg].iy,obj.photo[obj.curimg].iw,obj.photo[obj.curimg].ih,0,0,obj.pw,obj.ph);
				var filter=typeof(obj.filter)==='object'?obj.filter:0; if(!obj.forceglobal) {
					filter=typeof(obj.photo[obj.curimg].filter)==='object'?obj.photo[obj.curimg].filter:filter;
				}	
				if(obj.cfa&&obj.gid&&filter&&filter.length>0) { 
					if(obj.photo[obj.curimg]&&!obj.photo[obj.curimg].sop) {
					var source=document.createElement('canvas'); source.height=obj.ph+4; source.width=obj.pw+4; var src=source.getContext("2d");
					var buffer=document.createElement('canvas'); buffer.height=obj.ph; buffer.width=obj.pw; ctx=buffer.getContext("2d");
					if(src&&ctx) {ctx.clearRect(0,0,obj.pw,obj.ph); ctx.drawImage(obj.buf[0],0,0,obj.pw,obj.ph); 
						src.clearRect(0,0,obj.pw+4,obj.ph+4); src.drawImage(obj.buf[0],0,0,obj.pw+4,obj.ph+4); src.drawImage(obj.buf[0],2,2,obj.pw,obj.ph); 
						for (var i=0; i<filter.length; i++) {cvi_filter.add(source,buffer,filter[i],obj.pw,obj.ph);} 
						btx.drawImage(source,2,2,obj.pw,obj.ph,0,0,obj.pw,obj.ph);
					}}
				}
				if(!obj.doublepage) {filter=typeof(obj.filter)==='object'?obj.filter:0;
					atx=obj.buf[1].getContext("2d"); 
					atx.clearRect(0,0,obj.pw,obj.ph); 
					atx.fillStyle='rgb('+booklet.R(obj.pagecolor)+')';
					atx.fillRect(0,0,obj.pw,obj.ph);
					if(obj.curimg+2<=obj.photo.length) {
						atx.drawImage(obj.photo[obj.curimg+1].img,obj.photo[obj.curimg+1].ix,obj.photo[obj.curimg+1].iy,obj.photo[obj.curimg+1].iw,obj.photo[obj.curimg+1].ih,0,0,obj.pw,obj.ph);
					}
					if(obj.curimg+2<=obj.photo.length&&!obj.forceglobal) {filter=typeof(obj.photo[obj.curimg+1].filter)==='object'?obj.photo[obj.curimg+1].filter:filter;}
					if(obj.cfa&&obj.gid&&filter&&filter.length>0) {
						if(obj.photo[obj.curimg+1]&&!obj.photo[obj.curimg+1].sop) {
						var source=document.createElement('canvas'); source.height=obj.ph+4; source.width=obj.pw+4; var src=source.getContext("2d");
						var buffer=document.createElement('canvas'); buffer.height=obj.ph; buffer.width=obj.pw; ctx=buffer.getContext("2d");
						if(src&&ctx) {ctx.clearRect(0,0,obj.pw,obj.ph); ctx.drawImage(obj.buf[1],0,0,obj.pw,obj.ph); 
							src.clearRect(0,0,obj.pw+4,obj.ph+4); src.drawImage(obj.buf[1],0,0,obj.pw+4,obj.ph+4); src.drawImage(obj.buf[1],2,2,obj.pw,obj.ph); 
							for (var i=0; i<filter.length; i++) {cvi_filter.add(source,buffer,filter[i],obj.pw,obj.ph);} 
							atx.drawImage(source,2,2,obj.pw,obj.ph,0,0,obj.pw,obj.ph);
						}}
					}
				}
				if(wbu) {
					bmp=booklet.E('canvas');
					bmp.height=obj.frameheight;
					bmp.width=obj.framewidth;
				}
				function fill(ct,x,y,w,h,o,t) {
					var s=ct.createLinearGradient(x,y,w,h); 
					s.addColorStop(0.0,'rgba(0,0,0,'+(o*(t?0:.66))+')'); 
					s.addColorStop(0.5,'rgba(0,0,0,'+(o*.2)+')'); 
					s.addColorStop(1.0,'rgba(0,0,0,'+(o*(t?.66:0))+')'); 
					return s;
				};
				function ltfill(ct,x,y,w,h,o) {
					var s=ct.createLinearGradient(x,y,w,h); 
					s.addColorStop(1.0,'rgba(0,0,0,'+(o*1.125)+')'); 
					s.addColorStop(0.9625,'rgba(0,0,0,'+(o*1.25)+')'); 
					s.addColorStop(0.761,'rgba(0,0,0,0.0)'); 
					s.addColorStop(0.76,'rgba(255,255,255,0.0)'); 
					s.addColorStop(0.6,'rgba(255,255,255,'+(o*.5)+')'); 
					s.addColorStop(0.0,'rgba(255,255,255,0.0)'); 
					return s;
				};
				function rbfill(ct,x,y,w,h,o) {var s; 
					var s=ct.createLinearGradient(x,y,w,h); 
					s.addColorStop(0.0,'rgba(0,0,0,'+(o*1.2)+')'); 
					s.addColorStop(0.125,'rgba(0,0,0,'+o+')'); 
					s.addColorStop(0.5,'rgba(0,0,0,'+(o*.25)+')'); 
					s.addColorStop(1.0,'rgba(0,0,0,0)'); 
					return s;
				};				
				if(dir==-1) {
					rbe=booklet.G(obj.rblyid);
					if(wbu) {
						ctx=bmp.getContext("2d"); 
						ztx=rbe.getContext("2d"); 
						ztx.clearRect(0,0,ele.width,ele.height); 
					}else {
						ctx=rbe.getContext("2d"); 
					}
					ctx.clearRect(0,0,rbe.width,rbe.height); 
					var x=0,y=0,w=0,h=0,c=1,t=5,v=0,s=obj.framedelay,p=obj.pxperstep,
					cm=obj.calendarmode,dp=obj.doublepage,
					ww=rbe.width,hh=rbe.height,
					t=parseInt(cm?hh/p:ww/p,10), p=t+t,
					mw=(cm?0:ww),mh=(cm?hh:0), 
					xs=cm?0:mw/p,ys=cm?mh/p:0,
					xo=dp?0:(cm?0:obj.pw),
					yo=dp?0:(cm?obj.ph:0),
					w2=ww/2,h2=hh/2,
					w3=ww/6,h3=hh/6,
					w5=ww/10,h5=hh/10,
					sw=0,sh=0;
					rbe.style.visibility='visible'; 
					rbe.style.opacity=1.0; 
					obj.curltimer=window.setInterval(function() {
						v=booklet._twee(t,c)*t;
						w=(cm?ww:xs*v); h=(cm?ys*v:hh); 
						x=cm?0:mw-(w*2); y=cm?mh-(h*2):0;
						ctx.drawImage(obj.buf[0],0,0,w,h,x,y,w,h);
						// front-shadow
						ctx.beginPath(); ctx.rect(x-(cm?0:16),y-(cm?16:0),cm?w:16,cm?16:h); ctx.closePath(); 
						ctx.fillStyle=fill(ctx,x-(cm?0:16),y-(cm?16:0),x+(cm?0:16),y+(cm?16:0),obj.shade,true); 
						ctx.fill(); // left-shadow
						sw=Math.min(w,w3); sh=Math.min(h,h3);
						ctx.beginPath(); ctx.rect(x+(cm?0:w-sw),y+(cm?h-sh:0),cm?w:sw,cm?sh:h); ctx.closePath(); 
						ctx.fillStyle=ltfill(ctx,x+(cm?0:w-sw),y+(cm?h-sh:0),x+(cm?0:w),y+(cm?h:0),obj.shade); 
						ctx.fill(); 
						x=(cm?0:(dp?mw:xo)-w); y=(cm?(dp?mh:yo)-h:0);
						ctx.drawImage(obj.buf[dp?0:1],x,y,w,h,xo+x,yo+y,w,h);
						// right-shadow
						sw=Math.min(w,w5); sh=Math.min(h,h5);
						ctx.beginPath(); ctx.rect(x+(cm?0:dp?0:w2),y+(cm?dp?0:h2:0),cm?w:sw,cm?sh:h); ctx.closePath(); 
						ctx.fillStyle=rbfill(ctx,x+(cm?0:dp?0:w2),y+(cm?dp?0:h2:0),x+(cm?0:(dp?0:w2)+sw),y+(cm?(dp?0:h2)+sh:0),obj.shade); 
						ctx.fill(); 
						if(wbu) {
							ztx.drawImage(bmp,0,0,ele.width,ele.height);
						}
						c++; 
						if(c>t) {
							window.clearInterval(obj.curltimer);
							btx=ele.getContext("2d"); 
							btx.drawImage(rbe,0,0,ele.width,ele.height);
							btx.beginPath(); 
							btx.moveTo(cm?0:w2,cm?h2:0); 
							btx.lineTo(cm?ww:w2,cm?h2:hh); 
							btx.closePath(); 
							btx.strokeStyle='rgba(0,0,0,'+obj.shade+')'; 
							btx.lineWidth=0.5; 
							btx.stroke(); 
							rbe.style.opacity=0; 
							rbe.style.visibility='hidden'; 
							ctx.clearRect(0,0,rbe.width,rbe.height); 
							booklet._prepare(obj);
						}
					},s);
				}else if(dir==1) {
					lte=booklet.G(obj.ltlyid);
					if(wbu) {
						ctx=bmp.getContext("2d"); 
						ztx=lte.getContext("2d"); 
						ztx.clearRect(0,0,ele.width,ele.height); 
					}else {
						ctx=lte.getContext("2d"); 
					}
					ctx.clearRect(0,0,lte.width,lte.height); 
					var x=0,y=0,w=0,h=0,c=1,t=5,v=0,s=obj.framedelay,p=obj.pxperstep,
					cm=obj.calendarmode,dp=obj.doublepage,
					ww=lte.width,hh=lte.height,
					t=parseInt(cm?hh/p:ww/p,10), p=t+t,
					mw=(cm?0:ww),mh=(cm?hh:0), 
					xs=cm?0:mw/p,ys=cm?mh/p:0,
					xo=cm?0:dp?ww:obj.pw,
					yo=cm?dp?hh:obj.ph:0,
					w2=ww/2,h2=hh/2,
					w3=ww/6,h3=hh/6,
					w5=ww/10,h5=hh/10,
					sw=0,sh=0;
					lte.style.visibility='visible'; 
					lte.style.opacity=1.0; 
					obj.curltimer=window.setInterval(function() {
						v=booklet._twee(t,c)*t;
						w=(cm?ww:xs*v); h=(cm?ys*v:hh); 
						x=cm?0:mw-(w*2); y=cm?mh-(h*2):0;
						ctx.drawImage(obj.buf[0],0,0,w,h,0,0,w,h);
						x=(cm?0:w); y=(cm?h:0); 
						ctx.drawImage(obj.buf[dp?0:1],xo-x,yo-y,w,h,x,y,w,h);
						// left-shadow
						sw=Math.min(w,w3); sh=Math.min(h,h3);
						ctx.beginPath(); ctx.rect(x-(cm?0:sw),y-(cm?sh:0),cm?w:sw,cm?sh:h); ctx.closePath(); 
						ctx.fillStyle=ltfill(ctx,x-(cm?0:sw),y-(cm?sh:0),x,y,obj.shade); 
						ctx.fill(); // right-shadow
						sw=Math.min(w,w5); sh=Math.min(h,h5);
						ctx.beginPath(); ctx.rect(x,y,cm?w:sw,cm?sh:h); ctx.closePath(); 
						ctx.fillStyle=rbfill(ctx,x,y,x+(cm?0:sw),y+(cm?sh:0),obj.shade); 
						ctx.fill(); // front-shadow
						ctx.beginPath(); ctx.rect(x+(cm?0:w),y+(cm?h:0),cm?w:16,cm?16:h); ctx.closePath(); 
						ctx.fillStyle=fill(ctx,x+(cm?0:w),y+(cm?h:0),x+(cm?0:w+16),y+(cm?h+16:0),obj.shade,false); 
						ctx.fill(); 
						if(wbu) {
							ztx.drawImage(bmp,0,0,ele.width,ele.height);
						}
						c++; 
						if(c>t) {
							window.clearInterval(obj.curltimer);
							btx=ele.getContext("2d"); 
							btx.drawImage(lte,0,0,ele.width,ele.height);
							btx.beginPath(); 
							btx.moveTo(cm?0:w2,cm?h2:0); 
							btx.lineTo(cm?ww:w2,cm?h2:hh); 
							btx.closePath(); 
							btx.strokeStyle='rgba(0,0,0,'+obj.shade+')'; 
							btx.lineWidth=0.5; 
							btx.stroke(); 
							ctx.clearRect(0,0,lte.width,lte.height); 
							lte.style.visibility='hidden'; 
							lte.style.opacity=0.0; 
							booklet._prepare(obj);
						}
					},s);
				}else {
					ctx=ele.getContext("2d"); 
					ctx.clearRect(0,0,ele.width,ele.height); 
					ctx.fillStyle=obj.pagecolor; 
					ctx.fillRect(0,0,ele.width,ele.height); 
					ctx.drawImage(obj.buf[0],0,0,obj.pw,obj.ph);
					booklet._ltShade(ctx,0,0,ele.width,ele.height,obj.shade,obj.calendarmode);
					if(!obj.doublepage) {
						if(obj.curimg+2<=obj.photo.length) {
							ctx.drawImage(obj.buf[1],(obj.calendarmode?0:obj.pw),(obj.calendarmode?obj.ph:0),obj.pw,obj.ph);
						}
					}
					booklet._rbShade(ctx,0,0,ele.width,ele.height,obj.shade,obj.calendarmode);
					booklet._prepare(obj);
				}
			//IE resource START
			}else if(obj.vml&&!nr) {obj.curling=true;
				var canvas=null,cm=obj.calendarmode,dp=obj.doublepage,fw=obj.framewidth,fh=obj.frameheight,dir=0,cur=obj.curimg,ele=booklet.G(obj.crlyid),lts,rbs,pre=obj.curimg,cur=val||0,fin='</v:group>',h2=h5=cm?parseInt(obj.ph*0.2,10):obj.ph,w2=w5=cm?obj.pw:parseInt(obj.pw*0.2,10);
				var pth=cm?'m 0,'+parseInt(fh*50-100,10)+' l '+parseInt(fw*100,10)+','+parseInt(fh*50-100,10)+' e':'m '+parseInt(fw*50-100,10)+',0 l '+parseInt(fw*50-100,10)+','+parseInt(fh*100,10)+' e';
				if(!dp&&!cm) {w2=w5*.5;} else if(!dp&&cm) {h2=h5*.5;}
				if(dp&&!cm) {w5*=(dp?0.5:1); w2=w5*.5;} else if(dp&&cm) {h5*=(dp?0.5:1); h2=h5*.5;}
				dir=(cur<pre||force?1:cur>pre||auto?-1:0); obj.curimg=cur; 
				if(dir==-1) { // forward
					var w=parseInt(obj.pw,10),h=parseInt(obj.ph,10),p=null,d=cm?"up":"left",u=obj.duration*(dp?1:.5),o=0.5,v=cm?1:0,r=(d=='left'||d=='up'?'reverse':'forward'),ftrans="progid:DXImageTransform.Microsoft.GradientWipe(duration="+u+",gradientSize="+o+",motion="+r+",WipeStyle="+v+")";
					if(!dp) {
						p=obj.curimg+2<=obj.photo.length?obj.photo[obj.curimg+1]:null;
						canvas=booklet.G(obj.id+'_vml_rb');
						canvas.style.filter=ftrans;
						canvas.filters.item(filter).apply();
						if(canvas.filters.item(filter).status==1) {
							var b,a=canvas.firstChild; if(a) {
								if(p!==null) {
									b=document.createElement(['<v:fill src="'+p.source+'" size="'+p.wm+'pt,'+p.hm+'pt" origin="'+p.ox+','+p.oy+'" position="0,0" aspect="ignore" type="frame" />'].join(''));
								}else{
									b=document.createElement(['<v:fill color="'+obj.pagecolor+'" />'].join(''));
								}
								canvas.replaceChild(b,a);
							}
							canvas.filters.item(filter).play();
							if(canvas.filters.item(filter).status==2) {
								canvas.onfilterchange=function () {
									if(canvas.filters.item(filter).status==0) {
										p=obj.photo[obj.curimg];
										canvas=booklet.G(obj.id+'_vml_lt');
										canvas.style.filter=ftrans;
										canvas.filters.item(filter).apply();
										if(canvas.filters.item(filter).status==1) {
											var b,a=canvas.firstChild; if(a) {
												b=document.createElement(['<v:fill src="'+p.source+'" size="'+p.wm+'pt,'+p.hm+'pt" origin="'+p.ox+','+p.oy+'" position="0,0" aspect="ignore" type="frame" />'].join(''));
												canvas.replaceChild(b,a);
											}
											canvas.filters.item(filter).play();
											if(canvas.filters.item(filter).status==2) {
												canvas.onfilterchange=function () {
													if(canvas.filters.item(filter).status==0) {
														booklet._prepare(obj);
													}
												}
											}
										}
									}
								}
							}
						}
					}else{
						p=obj.photo[obj.curimg];
						canvas=booklet.G(obj.id+'_vml_lt');
						canvas.style.filter=ftrans;
						canvas.filters.item(filter).apply();
						if(canvas.filters.item(filter).status==1) {
							var b,a=canvas.firstChild; if(a) {
								b=document.createElement(['<v:fill src="'+p.source+'" size="'+p.wm+'pt,'+p.hm+'pt" origin="'+p.ox+','+p.oy+'" position="0,0" aspect="ignore" type="frame" />'].join(''));
								canvas.replaceChild(b,a);
							}
							canvas.filters.item(filter).play();
							if(canvas.filters.item(filter).status==2) {
								canvas.onfilterchange=function () {
									if(canvas.filters.item(filter).status==0) {
										booklet._prepare(obj);
									}
								}
							}
						}
					}
				}else if(dir==1){ // backward
					var w=parseInt(obj.pw,10),h=parseInt(obj.ph,10),p=null,d=cm?"down":"right",u=obj.duration*(dp?1:.5),o=0.5,v=cm?1:0,r=(d=='left'||d=='up'?'reverse':'forward'),ftrans="progid:DXImageTransform.Microsoft.GradientWipe(duration="+u+",gradientSize="+o+",motion="+r+",WipeStyle="+v+")";
					p=obj.photo[obj.curimg];
					canvas=booklet.G(obj.id+'_vml_lt');
					canvas.style.filter=ftrans;
					canvas.filters.item(filter).apply();
					if(canvas.filters.item(filter).status==1) {
						var b,a=canvas.firstChild; if(a) {
							b=document.createElement(['<v:fill src="'+p.source+'" size="'+p.wm+'pt,'+p.hm+'pt" origin="'+p.ox+','+p.oy+'" position="0,0" aspect="ignore" type="frame" />'].join(''));
							canvas.replaceChild(b,a);
						}
						canvas.filters.item(filter).play();
						if(canvas.filters.item(filter).status==2) {
							canvas.onfilterchange=function () {
								if(canvas.filters.item(filter).status==0) {
									if(!dp) {
										p=obj.curimg+2<=obj.photo.length?obj.photo[obj.curimg+1]:null;
										canvas=booklet.G(obj.id+'_vml_rb');
										canvas.style.filter=ftrans;
										canvas.filters.item(filter).apply();
										if(canvas.filters.item(filter).status==1) {
											var b,a=canvas.firstChild; if(a) {
												if(p!==null) {
													b=document.createElement(['<v:fill src="'+p.source+'" size="'+p.wm+'pt,'+p.hm+'pt" origin="'+p.ox+','+p.oy+'" position="0,0" aspect="ignore" type="frame" />'].join(''));
												}else{
													b=document.createElement(['<v:fill color="'+obj.pagecolor+'" />'].join(''));
												}
												canvas.replaceChild(b,a);
											}
											canvas.filters.item(filter).play();
											if(canvas.filters.item(filter).status==2) {
												canvas.onfilterchange=function () {
													if(canvas.filters.item(filter).status==0) {
														booklet._prepare(obj);
													}
												}
											}
										}
									}else{
										booklet._prepare(obj);
									}
								}
							}
						}
					}
				}else{
					tmp='<v:group style="zoom:1;display:block;margin:0;padding:0;position:relative;width:'+fw+'px;height:'+fh+'px;" coordsize="'+fw+','+fh+'">';
					rbs ='<v:rect strokeweight="0" filled="t" stroked="f" fillcolor="'+obj.pagecolor+'" style="zoom:1;display:block;position:absolute;margin:0px;padding:0px;left:'+(cm?0:obj.pw)+'px;top:'+(cm?obj.ph:0)+'px;width:'+obj.pw+'px;height:'+obj.ph+'px;"></v:rect>';
					rbs+='<v:rect id="'+obj.id+'_vml_rb" strokeweight="0" filled="t" stroked="f" fillcolor="'+obj.pagecolor+'" style="zoom:1;display:block;position:absolute;margin:0px;padding:0px;left:'+(cm?0:(dp?obj.pw*.5:obj.pw))+'px;top:'+(cm?(dp?obj.ph*.5:obj.pw):0)+'px;width:'+w5+'px;height:'+h5+'px;">';
					rbs+='<v:fill method="linear sigma" type="gradient" focus="0%" angle="'+(cm?180:270)+'" color="#000000" opacity="'+(1.2*obj.shade)+'" color2="#ffffff" o:opacity2="0.0" /></v:rect>';
					lts ='<v:rect id="'+obj.id+'_vml_lt" strokeweight="0" filled="t" stroked="f" fillcolor="'+obj.pagecolor+'" style="zoom:1;display:block;position:absolute;left:0px;top:0px;margin:0px;padding:0px;width:'+obj.pw+'px;height:'+obj.ph+'px;">';
					lts+='<v:fill id="vml_lt_opacity" src="'+obj.photo[obj.curimg].source+'" size="'+obj.photo[obj.curimg].wm+'pt,'+obj.photo[obj.curimg].hm+'pt" origin="'+obj.photo[obj.curimg].ox+','+obj.photo[obj.curimg].oy+'" position="0,0" aspect="ignore" type="frame" opacity="1.0" /></v:rect>';
					lts+='<v:rect strokeweight="0" filled="t" stroked="f" fillcolor="'+obj.pagecolor+'" style="zoom:1;display:block;position:absolute;left:'+(cm?0:(dp?obj.pw*.5:obj.pw)-w5)+'px;top:'+(cm?(dp?obj.ph*.5:obj.ph)-h5:0)+'px;margin:0px;padding:0px;width:'+w5+'px;height:'+h5+'px;">';
					lts+='<v:fill method="linear sigma" type="gradient" focus="0%" angle="'+(cm?0:90)+'" color="#000000" opacity="'+(1.2*obj.shade)+'" color2="#ffffff" o:opacity2="0.0" /></v:rect>';
					lts+='<v:rect strokeweight="0" filled="t" stroked="f" fillcolor="'+obj.pagecolor+'" style="zoom:1;display:block;position:absolute;left:'+(cm?0:(dp?obj.pw*.5:obj.pw)-w5-w2)+'px;top:'+(cm?(dp?obj.ph*.5:obj.ph)-h5-h2:0)+'px;margin:0px;padding:0px;width:'+(w5)+'px;height:'+(h5)+'px;">';
					lts+='<v:fill method="linear" type="gradient" focus="50%" angle="'+(cm?180:270)+'" color="#ffffff" opacity="0.0" color2="#ffffff" o:opacity2="'+(0.5*obj.shade)+'" /></v:rect>';
					if(!dp) {
						rbs ='<v:rect id="'+obj.id+'_vml_rb" strokeweight="0" filled="t" stroked="f" fillcolor="'+obj.pagecolor+'" style="zoom:1;display:block;position:absolute;margin:0px;padding:0px;left:'+(cm?-1:obj.pw-1)+'px;top:'+(cm?obj.ph-1:-1)+'px;width:'+obj.pw+'px;height:'+obj.ph+'px;">';
						if(obj.curimg+2<=obj.photo.length) {rbs+='<v:fill id="vml_rb_opacity" src="'+obj.photo[obj.curimg+1].source+'" size="'+obj.photo[obj.curimg+1].wm+'pt,'+obj.photo[obj.curimg+1].hm+'pt" origin="'+obj.photo[obj.curimg+1].ox+','+obj.photo[obj.curimg+1].oy+'" position="0,0" aspect="ignore" type="frame" opacity="1.0" />';}
						rbs+='</v:rect>';
						rbs+='<v:rect strokeweight="0" filled="t" stroked="f" fillcolor="'+obj.pagecolor+'" style="zoom:1;display:block;position:absolute;margin:0px;padding:0px;left:'+(cm?-1:obj.pw-1)+'px;top:'+(cm?obj.ph-1:-1)+'px;width:'+w5+'px;height:'+h5+'px;">';
						rbs+='<v:fill method="linear sigma" type="gradient" focus="0%" angle="'+(cm?180:270)+'" color="#000000" opacity="'+(1.2*obj.shade)+'" color2="#ffffff" o:opacity2="0.0" /></v:rect>';
					}
					fin ='<v:shape path="'+pth+'" coordorigin="0,0" coordsize="'+(fw*100)+','+(fh*100)+'" filled="f" stroked="t" strokeweight="1.0pt" strokecolor="#000000" style="zoom:1;display:block;position:absolute;margin:0px;padding:0px;left:0px;top:0px;width:'+fw+'px;height:'+fh+'px;">';
					fin+='<v:stroke color="#000000" opacity="'+obj.shade+'" weight="1.0pt" miterlimit="0" endcap="flat" /></v:shape>';
					fin+='</v:group>';
					ele.innerHTML=tmp+lts+rbs+fin;
					booklet._prepare(obj);
				}
			//IE resource END
			}else {booklet._prepare(obj);}
		}else {booklet.L('warn','booklet._set(): object does not exist'); }
		return false; 
	},
	_prepare : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") {
			if(obj.automode) {
				var delay=parseInt(Math.max(0,Math.min(3600,obj.playdelay)))*1000;
				if(typeof(obj.photo[obj.curimg].delay)==='number') {
					delay+=(parseInt(Math.max(0,Math.min(3600,obj.photo[obj.curimg].delay)))*1000);	
				}
				var stp=obj.doublepage?1:2,cnt=obj.curimg;
				if(obj.meter) {
					booklet._meter(obj,delay,stp,cnt);	
				} else {
					obj.timer=window.setTimeout(function() {
						obj.curimg=(cnt<(obj.photo.length-stp)?cnt+stp:0); 
						if(obj.curimg==0) {
							booklet._set(obj,obj.curimg,false,true); 
						}else {
							booklet._set(obj,obj.curimg,false,false,true); 
						}
					},delay);
				}
			}else {
				if(obj.callafter!=='') {booklet[obj.callafter](obj);}
				booklet._ltly(obj);
				booklet._rbly(obj);
				booklet._info(obj);
				booklet._link(obj);
				booklet._ctrl(obj);
			}
			obj.curling=false;
			booklet._curl(obj);
		}else {booklet.L('warn','booklet._prepare(): object does not exist'); }
		return false; 
	},
	_curl : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") {
			window.setTimeout(function(){
				booklet.G(obj.lockid).style.visibility='hidden';
			}, 5);
		}else {booklet.L('warn','booklet._curl(): object does not exist'); }
		return false; 
	},
	_ltly : function(obj) {
		function ltShade(ctx,x,y,w,h,o,v) {
			var t; ctx.beginPath(); ctx.rect(x,y,w,h); ctx.closePath(); 
			t=ctx.createLinearGradient(x,y,v?x:x+w,v?y+h:y); 
			t.addColorStop(0.0,'rgba(0,0,0,0)'); 
			t.addColorStop(0.3,'rgba(0,0,0,0)'); 
			t.addColorStop(0.4,'rgba(0,0,0,'+(o*.5)+')');
			t.addColorStop(0.41,'rgba(0,0,0,'+o+')');
			t.addColorStop(0.49,'rgba(0,0,0,0)'); 
			t.addColorStop(0.5,'rgba(254,254,254,0)'); 
			t.addColorStop(0.6,'rgba(254,254,254,'+o+')');
			t.addColorStop(0.7,'rgba(254,254,254,0)');
			t.addColorStop(0.71,'rgba(0,0,0,0)'); 
			t.addColorStop(0.8,'rgba(0,0,0,'+(o*.5)+')'); 
			t.addColorStop(0.81,'rgba(0,0,0,'+o+')'); 
			t.addColorStop(1.0,'rgba(0,0,0,0)'); 
			ctx.fillStyle=t; 
			ctx.fill(); 
		};
		function ltFilter(x,y,w,h,st) { 
			if(obj.curimg>=st) {
				var filter=typeof(obj.filter)==='object'?obj.filter:0; if(!obj.forceglobal) {
					filter=typeof(obj.photo[obj.curimg-st].filter)==='object'?obj.photo[obj.curimg-st].filter:filter;
				}	
			}
			if(obj.cfa&&obj.gid&&filter&&filter.length>0) {
				if(obj.photo[obj.curimg-st]&&!obj.photo[obj.curimg-st].sop) {
				var source=document.createElement('canvas'); source.height=h+4; source.width=w+4; var src=source.getContext("2d"); 
				var buffer=document.createElement('canvas'); buffer.height=h; buffer.width=w; var btx=buffer.getContext("2d");
				if(src&&btx) {btx.clearRect(0,0,w,h); btx.drawImage(ele,x,y,w,h,0,0,w,h); 
					src.clearRect(0,0,w+4,h+4); src.drawImage(ele,x,y,w,h,0,0,w+4,h+4); src.drawImage(ele,x,y,w,h,2,2,w,h); 
					for(var i=0; i<filter.length; i++) {cvi_filter.add(source,buffer,filter[i],w,h);} 
					ctx.drawImage(source,2,2,w,h,x,y,w,h);
				}}
			}
		};
		if(obj&&typeof(obj.mainid)==="string") {var stp=obj.doublepage?1:2;
			var f,x,y,w,h,ctx,img,v=obj.calendarmode,ste=2,ele=booklet.G(obj.ltlyid);
			if(obj.curimg>=stp) {
				if(ele&&ele.getContext) {
					ctx=ele.getContext("2d"); 
					ctx.clearRect(0,0,ele.width,ele.height); 
					ctx.fillStyle='rgb('+booklet.R(obj.pagecolor)+')'; ctx.save();
					if(obj.calendarmode) {x=0; w=obj.pw; h=(obj.framep-8)/2; y=h; f=obj.photo[obj.curimg-1].ih/obj.ph; ctx.fillRect(0,y,w,h); 
						ctx.drawImage(obj.photo[obj.curimg-1].img,obj.photo[obj.curimg-1].ix,obj.photo[obj.curimg-1].iy+obj.photo[obj.curimg-1].ih-(h*f),obj.photo[obj.curimg-1].iw,h*f,x,y,w,h);
					}else {y=0; h=obj.ph; w=(obj.framep-8)/2; x=w; f=obj.photo[obj.curimg-1].iw/obj.pw; ctx.fillRect(x,y,w,h);
						ctx.drawImage(obj.photo[obj.curimg-1].img,obj.photo[obj.curimg-1].ix+obj.photo[obj.curimg-1].iw-(w*f),obj.photo[obj.curimg-1].iy,w*f,obj.photo[obj.curimg-1].ih,x,y,w,h);
					} ltFilter(x,y,w,h,1); x=0; y=0;
					if(!obj.doublepage&&obj.curimg>=stp) {w=v?obj.pw:w; h=v?h:obj.ph; f=v?obj.photo[obj.curimg-ste].ih/obj.ph:obj.photo[obj.curimg-ste].iw/obj.pw; ctx.fillRect(x,y,w,h);
						ctx.drawImage(obj.photo[obj.curimg-ste].img,obj.photo[obj.curimg-ste].ix,obj.photo[obj.curimg-ste].iy,v?obj.photo[obj.curimg-ste].iw:w*f,v?h*f:obj.photo[obj.curimg-ste].ih,x,y,w,h);
						ltFilter(x,y,w,h,ste); ltShade(ctx,0,0,v?ele.width:obj.framep,v?obj.framep:ele.height,obj.shade,v);
					}else if(!obj.doublepage) {ctx.fillRect(x,y,v?ele.width:w,v?h:ele.height);
						ltFilter(x,y,w,h,ste); ltShade(ctx,0,0,v?ele.width:obj.framep,v?obj.framep:ele.height,obj.shade,v);
					}else {w=v?obj.pw:w; h=v?h:obj.ph; ctx.fillRect(x,y,w,h);
						ctx.drawImage(obj.photo[obj.curimg-1].img,obj.photo[obj.curimg-1].ix,obj.photo[obj.curimg-1].iy,v?obj.photo[obj.curimg-1].iw:w*f,v?h*f:obj.photo[obj.curimg-1].ih,x,y,w,h);
						ltFilter(x,y,w,h,1); ltShade(ctx,0,0,v?ele.width:obj.framep,v?obj.framep:ele.height,obj.shade,v);
					} 
					ctx.restore();
				}
			}
		}else {booklet.L('warn','booklet._ltly(): object does not exist'); }
		return false; 
	},
	_rbly : function(obj) {
		function rbShade(ctx,x,y,w,h,o,v) {
			var t; ctx.beginPath(); ctx.rect(x,y,w,h); ctx.closePath(); 
			t=ctx.createLinearGradient(x,y,v?x:x+w,v?y+h:y); 
			t.addColorStop(0.0,'rgba(0,0,0,0)'); 
			t.addColorStop(0.05,'rgba(0,0,0,0)'); 
			t.addColorStop(0.2,'rgba(0,0,0,'+(o*.8)+')');
			t.addColorStop(0.21,'rgba(0,0,0,0)');
			t.addColorStop(0.22,'rgba(254,254,254,0)'); 
			t.addColorStop(0.3,'rgba(254,254,254,'+(o*.5)+')');
			t.addColorStop(0.38,'rgba(254,254,254,0)');
			t.addColorStop(0.4,'rgba(0,0,0,0)'); 
			t.addColorStop(0.6,'rgba(0,0,0,'+o+')'); 
			t.addColorStop(0.8,'rgba(0,0,0,0)'); 
			t.addColorStop(1.0,'rgba(0,0,0,0)'); 
			ctx.fillStyle=t; 
			ctx.fill(); 
		};
		function rbFilter(x,y,w,h,st) { 
			if(obj.curimg<(obj.photo.length-st)) {
				var filter=typeof(obj.filter)==='object'?obj.filter:0; if(!obj.forceglobal) {
					filter=typeof(obj.photo[obj.curimg+st].filter)==='object'?obj.photo[obj.curimg+st].filter:filter;
				}	
			}
			if(obj.cfa&&obj.gid&&filter&&filter.length>0) {
				if(obj.photo[obj.curimg+st]&&!obj.photo[obj.curimg+st].sop) {
				var source=document.createElement('canvas'); source.height=h+4; source.width=w+4; var src=source.getContext("2d"); 
				var buffer=document.createElement('canvas'); buffer.height=h; buffer.width=w; var btx=buffer.getContext("2d");
				if(src&&btx) {btx.clearRect(0,0,w,h); btx.drawImage(ele,x,y,w,h,0,0,w,h); 
					src.clearRect(0,0,w+4,h+4); src.drawImage(ele,x,y,w,h,0,0,w+4,h+4); src.drawImage(ele,x,y,w,h,2,2,w,h); 
					for(var i=0; i<filter.length; i++) {cvi_filter.add(source,buffer,filter[i],w,h);} 
					ctx.drawImage(source,2,2,w,h,x,y,w,h);
				}}
			}
		};
		if(obj&&typeof(obj.mainid)==="string") {var stp=obj.doublepage?1:2;
			var f,x,y,w,h,ctx,img,v=obj.calendarmode,ste=3,ele=booklet.G(obj.rblyid);
			if(obj.curimg<(obj.photo.length-stp)) {
				if(ele&&ele.getContext) {
					ctx=ele.getContext("2d"); 
					ctx.clearRect(0,0,ele.width,ele.height); 
					ctx.fillStyle='rgb('+booklet.R(obj.pagecolor)+')'; ctx.save();
					if(obj.calendarmode) {x=0; w=obj.pw; h=(obj.framep-8)/2; y=ele.height-(h*2); f=obj.photo[obj.curimg+stp].ih/obj.ph;
						ctx.fillRect(x,y,w,h); 
						ctx.drawImage(obj.photo[obj.curimg+stp].img,obj.photo[obj.curimg+stp].ix,obj.photo[obj.curimg+stp].iy,obj.photo[obj.curimg+stp].iw,h*f,x,y,w,h);
					}else {y=0; h=obj.ph; w=(obj.framep-8)/2; x=ele.width-(w*2); f=obj.photo[obj.curimg+stp].iw/obj.pw;
						ctx.fillRect(x,y,w,h); 
						ctx.drawImage(obj.photo[obj.curimg+stp].img,obj.photo[obj.curimg+stp].ix,obj.photo[obj.curimg+stp].iy,w*f,obj.photo[obj.curimg+stp].ih,x,y,w,h);
					} rbFilter(x,y,w,h,stp);
					if(!obj.doublepage&&(obj.curimg+ste)<obj.photo.length) {
						if(obj.calendarmode) {x=0; y=ele.height-h; f=obj.photo[obj.curimg+ste].ih/obj.ph; ctx.fillRect(x,y,w,h); 
							ctx.drawImage(obj.photo[obj.curimg+ste].img,obj.photo[obj.curimg+ste].ix,obj.photo[obj.curimg+ste].iy+obj.photo[obj.curimg+ste].ih-(h*f),obj.photo[obj.curimg+ste].iw,h*f,x,y,w,h);
						}else {x=ele.width-w; y=0; f=obj.photo[obj.curimg+ste].iw/obj.pw; ctx.fillRect(x,y,w,h); 
							ctx.drawImage(obj.photo[obj.curimg+ste].img,obj.photo[obj.curimg+ste].ix+obj.photo[obj.curimg+ste].iw-(w*f),obj.photo[obj.curimg+ste].iy,w*f,obj.photo[obj.curimg+ste].ih,x,y,w,h);
						} rbFilter(x,y,w,h,ste);
						rbShade(ctx,v?0:ele.width-obj.framep,v?ele.height-obj.framep:0,v?ele.width:obj.framep,v?obj.framep:ele.height,obj.shade,v);
					}else if(!obj.doublepage) {
						if(obj.calendarmode) {x=0; y=ele.height-h;
							ctx.fillRect(x,y,ele.width,h);
						}else {x=ele.width-w; y=0; 
							ctx.fillRect(x,y,w,ele.height);
						} rbFilter(x,y,w,h,ste);
						rbShade(ctx,v?0:ele.width-obj.framep,v?ele.height-obj.framep:0,v?ele.width:obj.framep,v?obj.framep:ele.height,obj.shade,v);
					}else {
						if(obj.calendarmode) {x=0; y=ele.height-h; ctx.fillRect(x,y,w,h); 
							ctx.drawImage(obj.photo[obj.curimg+stp].img,obj.photo[obj.curimg+stp].ix,obj.photo[obj.curimg+stp].iy+obj.photo[obj.curimg+stp].ih-(h*f),obj.photo[obj.curimg+stp].iw,h*f,x,y,w,h);
						}else {x=ele.width-w; y=0; ctx.fillRect(x,y,w,h); 
							ctx.drawImage(obj.photo[obj.curimg+stp].img,obj.photo[obj.curimg+stp].ix+obj.photo[obj.curimg+stp].iw-(w*f),obj.photo[obj.curimg+stp].iy,w*f,obj.photo[obj.curimg+stp].ih,x,y,w,h);
						} rbFilter(x,y,w,h,stp);
						rbShade(ctx,v?0:ele.width-obj.framep,v?ele.height-obj.framep:0,v?ele.width:obj.framep,v?obj.framep:ele.height,obj.shade,v);
					} 
					ctx.restore();
				}
			}
		}else {booklet.L('warn','booklet._rbly(): object does not exist'); }
		return false; 
	},
	_ctrl : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") {
			if(!obj.automode) {
				var temp,val,max,last,first,bward,fward,prev,next,step=obj.doublepage?1:2;
				max=obj.photo.length%2==0?obj.photo.length-step:obj.photo.length-1;
				first=(obj.curimg>0?0:-1);
				last=(obj.curimg<(obj.photo.length-step)?max:-1); 
				bward=(obj.curimg>=(step*5)?obj.curimg-(step*5):-1);
				fward=(obj.curimg<(obj.photo.length-(step*5))?obj.curimg+(5*step):-1); 
				prev=(obj.curimg>=step?obj.curimg-step:-1);
				next=(obj.curimg<(obj.photo.length-step)?obj.curimg+step:-1); 
				//IE resource START
				if(obj.vml) {//&&!obj.ie8
					temp=booklet.G(obj.id+'_bt_prev'); val=null;
					if(!obj.ie8) {
						temp.style.filter="alpha(opacity="+(prev>-1?100:25)+")"; 
					}else {
						bt_ctrl.modify(temp,{alpha:(prev>-1?100:25)});
					}
					//temp.style.visibility=(prev>-1?'visible':'hidden');
					if(prev>-1) {val=function(){ if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._set(booklet.G(obj.id),prev);}};}
					temp.onclick=val; 
					//booklet.G(obj.id+'_bt_prev').style.visibility=(prev>-1?'visible':'hidden');
					temp=booklet.G(obj.ltevid); temp.onclick=val; 
					//temp.style.visibility=(prev>-1?'visible':'hidden');
					
					temp=booklet.G(obj.id+'_bt_next'); val=null;
					if(!obj.ie8) {
						temp.style.filter="alpha(opacity="+(next>-1?100:25)+")"; 
					}else {
						bt_ctrl.modify(temp,{alpha:(next>-1?100:25)});
					}
					//temp.style.visibility=(next>-1?'visible':'hidden');
					if(next>-1) {val=function(){ if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._set(booklet.G(obj.id),next);}};}
					temp.onclick=val; 
					//booklet.G(obj.id+'_bt_next').style.visibility=(next>-1?'visible':'hidden');
					temp=booklet.G(obj.rbevid); temp.onclick=val; 
					//temp.style.visibility=(next>-1?'visible':'hidden');
					
					temp=booklet.G(obj.id+'_bt_bward'); val=null;
					if(!obj.ie8) {
						temp.style.filter="alpha(opacity="+(bward>-1?100:25)+")"; 
					}else {
						bt_ctrl.modify(temp,{alpha:(bward>-1?100:25)});
					}
					//temp.style.visibility=(bward>-1?'visible':'hidden');
					if(bward>-1) {val=function(){ if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._set(booklet.G(obj.id),bward);}};}
					temp.onclick=val; 
					//booklet.G(obj.id+'_bt_bward').style.visibility=(bward>-1?'visible':'hidden');
					
					temp=booklet.G(obj.id+'_bt_fward'); val=null;
					if(!obj.ie8) {
						temp.style.filter="alpha(opacity="+(fward>-1?100:25)+")"; 
					}else {
						bt_ctrl.modify(temp,{alpha:(fward>-1?100:25)});
					}
					//temp.style.visibility=(fward>-1?'visible':'hidden');
					if(fward>-1) {val=function(){ if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._set(booklet.G(obj.id),fward);}};}
					temp.onclick=val; 
					//booklet.G(obj.id+'_bt_fward').style.visibility=(fward>-1?'visible':'hidden');
					
					temp=booklet.G(obj.id+'_bt_last'); val=null; 
					if(!obj.ie8) {
						temp.style.filter="alpha(opacity="+(last>-1?100:25)+")"; 
					}else {
						bt_ctrl.modify(temp,{alpha:(last>-1?100:25)});
					}
					//temp.style.visibility=(last>-1?'visible':'hidden');
					if(last>-1) {val=function(){ if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._set(booklet.G(obj.id),last);}};}
					temp.onclick=val; 
					//booklet.G(obj.id+'_bt_last').style.visibility=(last>-1?'visible':'hidden');
					
					temp=booklet.G(obj.id+'_bt_first'); val=null;
					if(!obj.ie8) {
						temp.style.filter="alpha(opacity="+(first>-1?100:25)+")"; 
					}else {
						bt_ctrl.modify(temp,{alpha:(first>-1?100:25)});
					}
					//temp.style.visibility=(first>-1?'visible':'hidden');
					if(first>-1) {val=function(){ if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._set(booklet.G(obj.id),first);}};}
					temp.onclick=val; 
					//booklet.G(obj.id+'_bt_first').style.visibility=(first>-1?'visible':'hidden');
				}else {
				//IE resource END
					if(!obj.notoc) {
						temp=booklet.G(obj.id+'_bt_table'); temp.style.opacity=1.0; 
						temp.setAttribute("onclick","booklet._openTOC(booklet.G('"+obj.id+"'));");
						temp=booklet.G(obj.id+'_bt_list'); temp.setAttribute("onclick",""); temp.eleid=obj.id;
						if(!obj.noimprint) {temp.style.opacity=1.0; 
							temp.setAttribute("onmouseover","bt_ctrl.modify(this.firstChild,{invert:true});booklet._ipover(this);");
							temp.setAttribute("onmouseout","bt_ctrl.modify(this.firstChild,{invert:false});booklet._ipout(this);");
						}else {temp.style.opacity=0.2; 
							temp.setAttribute("onmouseover","bt_ctrl.modify(this.firstChild,{invert:true});");
							temp.setAttribute("onmouseout","bt_ctrl.modify(this.firstChild,{invert:false});");
						}
					}	
					temp=booklet.G(obj.id+'_bt_prev'); temp.style.opacity=prev>-1?1.0:0.2;
					val=(prev>-1?"if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) { booklet._set(booklet.G('"+obj.id+"'),"+prev+");}":"");
					temp.setAttribute("onclick",val); temp=booklet.G(obj.ltevid); temp.setAttribute("onclick",val); temp.style.visibility=(prev>-1?'visible':'hidden');
					temp=booklet.G(obj.id+'_bt_next'); temp.style.opacity=next>-1?1.0:0.2;
					val=(next>-1?"if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) { booklet._set(booklet.G('"+obj.id+"'),"+next+");}":"");
					temp.setAttribute("onclick",val); temp=booklet.G(obj.rbevid); temp.setAttribute("onclick",val); temp.style.visibility=(next>-1?'visible':'hidden');
					temp=booklet.G(obj.id+'_bt_bward'); temp.style.opacity=bward>-1?1.0:0.2;
					temp.setAttribute("onclick",(bward>-1?"if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._set(booklet.G('"+obj.id+"'),"+bward+");}":""));
					temp=booklet.G(obj.id+'_bt_fward'); temp.style.opacity=fward>-1?1.0:0.2;
					temp.setAttribute("onclick",(fward>-1?"if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._set(booklet.G('"+obj.id+"'),"+fward+");}":""));
					temp=booklet.G(obj.id+'_bt_first'); temp.style.opacity=first>-1?1.0:0.2;
					temp.setAttribute("onclick",(first>-1?"if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._set(booklet.G('"+obj.id+"'),"+first+");}":""));
					temp=booklet.G(obj.id+'_bt_last'); temp.style.opacity=last>-1?1.0:0.2;
					temp.setAttribute("onclick",(last>-1?"if(!this.parentNode.parentNode.parentNode.parentNode.parentNode.automode) {booklet._set(booklet.G('"+obj.id+"'),"+last+");}":""));
				}
			}
		}else {booklet.L('warn','booklet._ctrl(): object does not exist'); }
		return false; 
	},
	_info : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") { var a,b,lt,rb,ri,cp,oi,tx,ty,tz,ph=obj.photo[obj.curimg];
			rb=booklet.G(obj.rbctid); ri=booklet.G(obj.rbifid); cp=ph.caption; if(obj.ie6) {rb.style.height="100%";}
			cp=obj.forcecaption?cp||ph.n:cp; oi=ph.comment||''; tx="<br/>";
			ty="<tt>&bull; Natural image dimensions: <b>"+ph.w+"</b>&nbsp;x&nbsp;<b>"+ph.h+"</b> px</tt>";
			if(obj.forceglobal&&obj.filter&&obj.filter.length&&obj.filter.length>0) {
				for(var t='',i=0; i<obj.filter.length; i++) {
					t+=obj.filter[i].f+' ';
				} ty+="<br/><tt>&bull; Applied filters (global): <b>"+t+"</b></tt>";
			}else if(!obj.forceglobal&&ph.filter&&ph.filter.length&&ph.filter.length>0) {
				for(var t='',i=0; i<ph.filter.length; i++) {
					t+=ph.filter[i].f+' ';
				} ty+="<br/><tt>&bull; Applied filters (local): <b>"+t+"</b></tt>";
			}
			oi=obj.forceimginfo?oi+(oi?tx:"")+ty:oi;
			tx="<big><b>"+cp+"</b></big><br/>";
			ty="<em>"+oi+"</em><br/>";
			if(obj.doublepage) {
				tz="<small><b>"+(obj.curimg+1)+"</b> / <b>"+obj.photo.length+"</b></small>";
				rb.innerHTML="<span>"+(cp?tx:"")+(oi?ty:"")+tz+"</span>";
				if(obj.ie6) {
					a=booklet.G(obj.rbtxid);
					b=a.firstChild;
					b.style.height=a.offsetHeight+"px";
				}//IE6 resource
			}else {
				lt=booklet.G(obj.ltctid); if(obj.ie6) {lt.style.height="100%";}
				tz="<small><b>"+(obj.curimg+1)+"</b> / <b>"+obj.photo.length+"</b></small>";
				lt.innerHTML="<span>"+(cp?tx:'')+(oi?ty:'')+(obj.calendarmode?'':"<div align='right'>")+tz+(obj.calendarmode?'':"</div>")+"</span>";
				if(obj.ie6) {
					a=booklet.G(obj.lttxid);
					b=a.firstChild;
					b.style.height=a.offsetHeight+"px";
				}//IE6 resource
				if(obj.curimg+2<=obj.photo.length) {ri.style.bottom='3px'; ph=obj.photo[obj.curimg+1]; 
					cp=ph.caption; cp=obj.forcecaption?cp||ph.n:cp; oi=ph.comment||''; tx="<br/>";
					ty="<tt>&bull; Natural image dimensions: <b>"+ph.w+"</b>&nbsp;x&nbsp;<b>"+ph.h+"</b> px</tt>";
					if(obj.forceglobal&&obj.filter&&obj.filter.length&&obj.filter.length>0) {
						for(var t='',i=0; i<obj.filter.length; i++) {
							t+=obj.filter[i].f+' ';
						} ty+="<br/><tt>&bull; Applied filters (global): <b>"+t+"</b></tt>";
					}else if(!obj.forceglobal&&ph.filter&&ph.filter.length&&ph.filter.length>0) {
						for(var t='',i=0; i<ph.filter.length; i++) {
							t+=ph.filter[i].f+' ';
						} ty+="<br/><tt>&bull; Applied filters (local): <b>"+t+"</b></tt>";
					}
					oi=obj.forceimginfo?oi+(oi?tx:"")+ty:oi;
					tx="<big><b>"+cp+"</b></big><br/>";
					ty="<em>"+oi+"</em><br/>";
					tz="<small><b>"+(obj.curimg+2)+"</b> / <b>"+obj.photo.length+"</b></small>";
					rb.innerHTML="<span>"+(cp?tx:"")+(oi?ty:"")+tz+"</span>";
					if(obj.ie6) {
						a=booklet.G(obj.rbtxid);
						b=a.firstChild;
						b.style.height=a.offsetHeight+"px";
					}//IE6 resource
				}else {
					ri.style.bottom='-30px';
				}
			}
			if(obj.w3c) {
				cp=booklet.G(obj.ipctid); 
				tx="<big>"+obj.imprintheader+"</big><br/>";
				ty="<em>"+obj.imprintbody+"</em><br/>";
				tz="<small>"+obj.imprintfooter+"</small>";
				cp.innerHTML="<span>"+tx+ty+tz+"</span>";
			}
		}else {booklet.L('warn','booklet.info(): object does not exist'); }
		return false; 
	},
	_link : function(obj) {
		if(obj&&typeof(obj.mainid)==="string") {var lt,rb;
			lt=booklet.G(obj.ltlkid); rb=booklet.G(obj.rblkid);
			if(lt&&obj.photo[obj.curimg].link) {lt.style.visibility='visible'; 
				lt.href=obj.photo[obj.curimg].link||"javascript:void(0);";
				lt.target=obj.photo[obj.curimg].target?obj.photo[obj.curimg].target:"_self";
				lt.title=obj.photo[obj.curimg].title?obj.photo[obj.curimg].title:""; 
				lt.style.cursor=lt.href!=="javascript:void(0);"?"pointer":"default"; 
			}else {lt.style.visibility='hidden'; rb.style.cursor='default';} 
			if(rb&&obj.doublepage) {
				if(obj.photo[obj.curimg].link) {rb.style.visibility='visible'; 
					rb.href=obj.photo[obj.curimg].link||"javascript:void(0);";
					rb.target=obj.photo[obj.curimg].target?obj.photo[obj.curimg].target:"_self";
					rb.title=obj.photo[obj.curimg].title?obj.photo[obj.curimg].title:""; 
					rb.style.cursor=rb.href!=="javascript:void(0);"?"pointer":"default";
				}else {rb.style.visibility='hidden'; } 
			}else if(!obj.doublepage&&obj.curimg+2<=obj.photo.length) {
				if(obj.photo[obj.curimg+1].link) {rb.style.visibility='visible'; 
					rb.href=obj.photo[obj.curimg+1].link||"javascript:void(0);";
					rb.target=obj.photo[obj.curimg+1].target?obj.photo[obj.curimg+1].target:"_self";
					rb.title=obj.photo[obj.curimg+1].title?obj.photo[obj.curimg+1].title:""; 
					rb.style.cursor=rb.href!=="javascript:void(0);"?"pointer":"default";
				}else {rb.style.visibility='hidden'; } 
			}else {rb.style.visibility='hidden'; rb.style.cursor='default';}
		}else {booklet.L('warn','booklet._link(): object does not exist'); }
		return false; 
	},
	_onOver : function(e) {
		if(!this.moving) {
			this.moving=true;
			this.xoff=booklet._xoff(this); 
			this.yoff=booklet._yoff(this);
			this.evtx=e.pageX-this.xoff; 
			this.evty=e.pageY-this.yoff; 
			this.onmousemove=booklet._onMove;
			this.onmouseout=booklet._onOut;
			this.onclick=function(){
				var ele=booklet.G(this.ele),obj=this.parentNode.parentNode.parentNode;
				this.moving=false; 
				this.onmousemove=null;
				this.onmouseout=null;
				this.onclick=null;
				this.title="";
				ele.left=(-this.ltx); 
				ele.top=(-this.lty);
				ele.style.left=ele.left+'px'; 
				ele.style.top=ele.top+'px';
				ele.style.visibility='hidden';
				booklet._closeTOC(booklet.G(obj.id),obj.curtmb);
			};
			var ele=booklet.G(this.ele);
			ele.left=1*(-this.ltx); 
			ele.top=1*(-this.lty);
			ele.style.left=ele.left+'px'; 
			ele.style.top=ele.top+'px';
			ele.style.opacity=1; 
			ele.style.visibility='visible';
		}return false;
	},
	_onMove : function(e) {
		if(this.moving) {
			this.evtx=e.pageX-this.xoff; this.evty=e.pageY-this.yoff; 
			var tmp,obj=this.parentNode.parentNode.parentNode,txt=booklet.G(this.txt),ele=booklet.G(this.ele).style;
			var xct=Math.floor(this.evtx/this.tw),yct=Math.floor(this.evty/this.th);
			var xc=this.xc,yc=this.yc,lx=this.ltx,ly=this.lty,
			max=obj.photo.length-1,po=xc*yc,os=obj.curtoc*po,
			yo=(obj.calendarmode?!obj.doublepage&&yct>=yc?po-yc:0:xc),
			xo=(obj.calendarmode?yc:!obj.doublepage&&xct>=xc?po-xc:0),
			cnt=(obj.calendarmode?os+(xct*xo)+yct+yo:os+xct+xo+(yct*yo));
			if((obj.doublepage?cnt:cnt*2)<=max) {
				obj.curtmb=Math.min(obj.doublepage?cnt:cnt*2,max);
				ele.left=((xct*this.tw)-lx)+'px';
				ele.top=((yct*this.th)-ly)+'px';
				this.style.cursor="pointer";
				if(obj.toctooltip) {
					tmp=(obj.curtmb+1)+'/'+obj.photo.length+' '+(obj.photo[obj.curtmb].caption||obj.photo[obj.curtmb].n); 
					tmp+=!obj.doublepage&&obj.curtmb<max?(obj.ttn?'\n':' | ')+(obj.curtmb+2)+'/'+obj.photo.length+' '+(obj.photo[obj.curtmb+1].caption||obj.photo[obj.curtmb+1].n):'';
					this.title=tmp;
				}else {
					tmp=(obj.curtmb+1)+'/'+obj.photo.length+' <b>'+(obj.photo[obj.curtmb].caption||obj.photo[obj.curtmb].n)+'</b>'; 
					tmp+=!obj.doublepage&&obj.curtmb<max?'<br/>'+(obj.curtmb+2)+'/'+obj.photo.length+' <b>'+(obj.photo[obj.curtmb+1].caption||obj.photo[obj.curtmb+1].n)+'</b>':'';
					txt.style.margin='8px 12px 8px 12px'; 
					txt.innerHTML='<small>'+tmp+'</small>';
				}				
			}else {
				if(obj.toctooltip) {
					this.title="";
				}else {
					txt.style.margin='0px'; 
					txt.innerHTML="";
				}
				this.style.cursor="auto";
			}
		}return false;
	},	
	_onOut : function(e) {
		if(this.moving) {
			this.moving=false; 
			this.onclick=null;
			this.onmousemove=null;
			this.onmouseout=null;
			var ele=booklet.G(this.ele);
			var x=1*(-this.ltx),y=1*(-this.lty),c=0,n=100,m=0,t=5,p=1; 
			if(this.parentNode.parentNode.parentNode.chakra) {
					ele.style.opacity=0; 
					ele.left=x; ele.top=y;
					ele.style.left=ele.left+'px'; 
					ele.style.top=ele.top+'px'; 
					ele.style.visibility='hidden';
			}else {
				ele.timer=window.setInterval(function() {
					ele.style.opacity=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)))/100; 
					c++; if(c>t) {window.clearInterval(ele.timer); 
					ele.style.opacity=0; 
					ele.left=x; ele.top=y;
					ele.style.left=ele.left+'px'; 
					ele.style.top=ele.top+'px'; 
					ele.style.visibility='hidden';
				}},20);
			}
		}return false;
	},
	_eventout : function(ele) {
		var obj=booklet.G(ele.ele),par=obj.parentNode.parentNode.parentNode; 
		if(obj&&!par.curling) {
			if(ele.timer) {window.clearInterval(ele.timer);} 
			obj=obj.style;
			if(obj.opacity>0) {var c=0,n=obj.opacity*100,m=0,t=5,p=1; 
				ele.timer=window.setInterval(function() {obj.opacity=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)))/100;
				c++; if(c>t) {window.clearInterval(ele.timer); obj.opacity=0; obj.visibility='hidden';}
			},20);}
		}return false; 
	},
	_eventover : function(ele) {
		var obj=booklet.G(ele.ele),par=obj.parentNode.parentNode.parentNode; 
		if(obj&&!par.curling) {
			if(ele.timer) {window.clearInterval(ele.timer);} 
			obj=obj.style; obj.visibility='visible';
			if(obj.opacity<1) {var c=0,n=obj.opacity*100,m=100,t=5,p=1; 
				ele.timer=window.setInterval(function() {obj.opacity=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)))/100; 
				c++; if(c>t) {window.clearInterval(ele.timer); obj.opacity=1;}
			},20);}
		}return false; 
	},
	_infoout : function(ele) {
		bt_ctrl.modify(ele.firstChild,{invert:false}); 
		if(ele.timer) {window.clearInterval(ele.timer);} 
		var obj=booklet.G(ele.eleid);
		if(obj) {
			if(obj.parentNode.parentNode.parentNode.chakra) {
				obj.style.opacity=0; obj.style.visibility='hidden';
			}else {obj=obj.style;
				if(obj.opacity>0) {var c=0,n=obj.opacity*100,m=0,t=10,p=1; 
					ele.timer=window.setInterval(function() {obj.opacity=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)))/100;
					c++; if(c>t) {window.clearInterval(ele.timer); obj.opacity=0; obj.visibility='hidden';}
				},20);}
			}
		}return false; 
	},
	_infoover : function(ele) {
		bt_ctrl.modify(ele.firstChild,{invert:true}); 
		if(ele.timer) {window.clearInterval(ele.timer);} 
		var obj=booklet.G(ele.eleid); 
		if(obj) {
			if(obj.parentNode.parentNode.parentNode.chakra) {
				obj.style.visibility='visible'; obj.style.opacity=1;
			}else {obj=obj.style; obj.visibility='visible';
				if(obj.opacity<1) {var c=0,n=obj.opacity*100,m=100,t=10,p=1; 
					ele.timer=window.setInterval(function() {obj.opacity=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)))/100; 
					c++; if(c>t) {window.clearInterval(ele.timer); obj.opacity=1;}
				},20);}
			}
		}return false; 
	},
	_ipout : function(ele) {
		if(ele.timer) {window.clearInterval(ele.timer);} var par=booklet.G(ele.eleid),obj=booklet.G(par.iptxid); 
		if(obj) {
			if(par.chakra) {
				obj.style.opacity=0; obj.style.visibility='hidden'; obj.style.left=-par.framewidth+'px';
			}else {obj=obj.style;
				if(obj.opacity>0) {var c=0,n=obj.opacity*100,m=0,t=10,p=1; 
					ele.timer=window.setInterval(function() {obj.opacity=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)))/100;
					c++; if(c>t) {window.clearInterval(ele.timer); obj.opacity=0; obj.visibility='hidden'; obj.left=-par.framewidth+'px';}
				},20);}
			}
		}return false; 
	},
	_ipover : function(ele) {
		if(ele.timer) {window.clearInterval(ele.timer);} var par=booklet.G(ele.eleid),obj=booklet.G(par.iptxid); 
		if(obj) {
			if(par.chakra) {
				obj.style.visibility='visible'; obj.style.opacity=1; obj.style.left='0px';
			}else {obj=obj.style; obj.visibility='visible'; obj.left='0px';
				if(obj.opacity<1) {var c=0,n=obj.opacity*100,m=100,t=10,p=1; 
					ele.timer=window.setInterval(function() {obj.opacity=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)))/100; 
					c++; if(c>t) {window.clearInterval(ele.timer); obj.opacity=1; obj.left='0px';}
				},20);}
			}
		}return false; 
	},
	_ctrlout : function(ele,mode) {
		if(!ele.nopanel) {
			if(ele.timer) {window.clearInterval(ele.timer);} 
			if(ele.parentNode.chakra) {
				ele.style.opacity=0; if(mode) {ele.style.right=(-ele.width)+'px';}else {ele.style.bottom=(-ele.height)+'px';}
			}else {
				if(ele.style.opacity>0) {var c=0,n=ele.style.opacity*100,m=0,t=10,p=1; 
					ele.timer=window.setInterval(function() {ele.style.opacity=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)))/100;
					c++; if(c>t) {window.clearInterval(ele.timer); ele.style.opacity=0;
					if(mode) {ele.style.right=(-ele.width)+'px';}else {ele.style.bottom=(-ele.height)+'px';}}
				},20);}
			}
		}return false; 
	},
	_ctrlover : function(ele,mode) {
		if(!ele.nopanel) {
			if(ele.timer) {window.clearInterval(ele.timer);} 
			if(mode) {ele.style.right='0px';}else {ele.style.bottom='0px';}
			if(ele.parentNode.chakra) {
				ele.style.opacity=1;
			}else {
				if(ele.style.opacity<1) {var c=0,n=ele.style.opacity*100,m=100,t=10,p=1; 
					ele.timer=window.setInterval(function() {ele.style.opacity=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)))/100; 
					c++; if(c>t) {window.clearInterval(ele.timer); ele.style.opacity=1;}
				},20);}
			}
		}return false; 
	},
	//IE resource START
	_infoout_ie : function(ele) {
		window.event.cancelBubble=true;
		var obj=booklet.G(ele.parentNode.eleid); 
		if(obj) {
			obj.style.filter="alpha(opacity=0)";//IE6-7
			obj.style.visibility='hidden';
		}
		return false; 
	},
	_infoover_ie : function(ele) {
		window.event.cancelBubble=true;
		var obj=booklet.G(ele.parentNode.eleid); 
		if(obj) {
			obj.style.visibility='visible'; 
			obj.style.filter="alpha(opacity=100)";//IE6-7
		}
		return false;
	},
	_ctrlout_ie : function(ele,mode) {
		if(!ele.nopanel) {
			if(ele.timer) {window.clearInterval(ele.timer);} 
			if(document.documentMode!=8&&ele.style.opacity>0) {var c=0,n=ele.style.opacity*100,m=0,t=10,p=1,z=0; 
				ele.timer=window.setInterval(function() {z=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)))/100;
					ele.style.opacity=z; ele.style.filter="alpha(opacity="+parseInt(z*100,10)+")";
				c++; if(c>t) {window.clearInterval(ele.timer); ele.style.opacity=0; ele.style.filter="alpha(opacity=0)";
				if(mode) {ele.style.right=(ele.width*(-1))+'px';}else{ele.style.bottom=(ele.height*(-1))+'px';} ele.style.visibility='hidden';}
			},30);}else{if(mode) {ele.style.right=(ele.width*(-1))+'px';}else{ele.style.bottom=(ele.height*(-1))+'px';} ele.style.visibility='hidden'; ele.style.filter="alpha(opacity=0)";}
		}return false; 
	},
	_ctrlover_ie : function(ele,mode) {
		if(!ele.nopanel) {
			if(ele.timer) {window.clearInterval(ele.timer);} 
			if(mode) {ele.style.right='0px';}else{ele.style.bottom='0px';} ele.style.visibility='visible';
			if(document.documentMode!=8&&ele.style.opacity<1) {var c=0,n=ele.style.opacity*100,m=100,t=10,p=1,z=0; 
				ele.timer=window.setInterval(function() {z=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n)))/100;
					ele.style.opacity=z; ele.style.filter="alpha(opacity="+parseInt(z*100,10)+")";
				c++; if(c>t) {window.clearInterval(ele.timer); ele.style.opacity=1; ele.style.filter="alpha(opacity=100)";}
			},30);}else{ele.style.filter="alpha(opacity=100)";}
		}return false; 
	},
	//IE resource END
	_twee : function(s,c) {return Math.sin(c/s*(Math.PI/2));},
	_xoff : function(n) {var r=n.offsetLeft; for(var p=n; p=p.offsetParent; p!=null) {r+=p.offsetLeft;} return r;},
	_yoff : function(n) {var r=n.offsetTop; for(var p=n; p=p.offsetParent; p!=null) {r+=p.offsetTop;} return r;},
	L : function(s,v) {s=s.toUpperCase()||'LOG'; if(window.console) {if(!window.console.warn||!s.match(/(zoomblur|spinblur)/i)) {window.console.log(s+': '+v);}else {window.console[s.toLowerCase()||'log'](v);}}else if(window.opera) {opera.postError(s+': '+v);}else {window.document.title=s+': '+v;} return false;},
	C : function(v) {if(v.toLowerCase().match(/^#[0-9a-f]{6}$/i)){return v;}else if(v.toLowerCase().match(/^#[0-9a-f]{3}$/i)){return '#'+v.substr(1,1)+v.substr(1,1)+v.substr(2,1)+v.substr(2,1)+v.substr(3,1)+v.substr(3,1);}else{return '#000000';}},
	R : function(v) {function h2d(h){return(Math.max(0,Math.min(parseInt(h,16),254)));};return h2d(v.substr(1,2))+','+h2d(v.substr(3,2))+','+h2d(v.substr(5,2));}, 
	G : function(v) {return(document.getElementById(v));}, E : function(v) {return(document.createElement(v));}, 
	A : function(o,v) {o.appendChild(v); return false;}
}

var bt_cover = {version : 1.3, released : '2011-02-02 12:00:00',
	defaultWidth : 600, 
	defaultHeight : 400, 
	defaultShade : 50, 
	defaultShadow : 50, 
	defaultOpacity : 100, 
	defaultColor : '#997755', 
	defaultTexture : '', 
	defaultDownshadow : false, 
	defaultVertical : false, 
	defaultNoradius : false, 
	defaultNoshadow : false, 
	defaultNoframe : false, 
	add: function(object, options) {
		if(object.tagName.toUpperCase()=="DIV") {
			var canvas,defopts={"width":bt_cover.defaultWidth, "height":bt_cover.defaultHeight, "shade":bt_cover.defaultShade, "color":bt_cover.defaultColor, "shadow":bt_cover.defaultShadow, "opacity":bt_cover.defaultOpacity, "downshadow":bt_cover.defaultDownshadow, "texture":bt_cover.defaultTexture, "vertical":bt_cover.defaultVertical, "noradius":bt_cover.defaultNoradius, "noshadow":bt_cover.defaultNoshadow, "noframe":bt_cover.defaultNoframe };
			if(options) {for(var i in defopts) {if(!options[i]) {options[i]=defopts[i];}}}else {options=defopts;}
			var width=(typeof options['width']=='number'?Math.max(180,options['width']%2==0?options['width']:options['width']-1):600);
			var height=(typeof options['height']=='number'?Math.max(180,options['height']%2==0?options['height']:options['height']-1):400);
			var parid=(typeof options['parent']=='string'?options['parent']:object.id||'parent');
			var vml=document.all&&!window.opera&&(!document.documentMode||document.documentMode<9)?1:0;
			try {
				if(vml&&document.namespaces) {
					canvas=document.createElement(['<var style="zoom:1;display:inline-block;width:'+width+'px;height:'+height+'px;margin:0px;padding:0px;">'].join(''));
				}else {
					canvas=document.createElement('canvas');
				}
				if(canvas||canvas.getContext("2d")) {canvas.options=options; canvas.id=parid+'_cover';
					canvas.height=height; canvas.width=width; canvas.top=0; canvas.left=0; canvas.vml=vml;
					canvas.style.position='absolute'; canvas.style.visibility='visible';
					canvas.style.top=canvas.top+'px'; canvas.style.left=canvas.left+'px';
					canvas.style.height=canvas.height+'px'; canvas.style.width=canvas.width+'px';
					object.appendChild(canvas); bt_cover.modify(canvas,options);
				}
			} catch (e) {
			}
		}
	},
	
	modify: function(canvas,options) {
		function getArg(a,t) {return (typeof options[a]===t?options[a]:canvas.options[a]);};
		function setMS(ctx,x,y,w,h,o1,o2,a,b) {var tmp=ctx.createLinearGradient(x,y,w,h); tmp.addColorStop(0,'rgba('+a+',0)'); tmp.addColorStop(0.03,'rgba('+a+','+o1+')'); tmp.addColorStop(0.06,'rgba('+a+',0)'); tmp.addColorStop(0.08,'rgba('+b+',0)'); tmp.addColorStop(0.18,'rgba('+b+','+o2+')'); tmp.addColorStop(0.58,'rgba('+b+',0)'); tmp.addColorStop(1,'rgba('+b+',0)'); return tmp;};
		function setRS(ctx,x1,y1,r1,x2,y2,r2,o) {var tmp=ctx.createRadialGradient(x1,y1,r1,x2,y2,r2); tmp.addColorStop(0,'rgba(0,0,0,'+o+')'); tmp.addColorStop(1,'rgba(0,0,0,0)'); return tmp;};
		function setLS(ctx,x,y,w,h,o,c) {var tmp=ctx.createLinearGradient(x,y,w,h); c=!c?'0,0,0':c; tmp.addColorStop(0,'rgba('+c+','+o+')'); tmp.addColorStop(1,'rgba('+c+',0)'); return tmp;};
		function hex2rgb(val,f,isIE) {
			function h2d(v) {return(Math.max(0,Math.min(parseInt(v,16),254)));}
			function d2h(v) {v=Math.round(Math.min(Math.max(0,v),255)); return("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16));}
			var cr=h2d(val.substr(1,2)),cg=h2d(val.substr(3,2)),cb=h2d(val.substr(5,2));
			if(isIE) {return '#'+d2h(cr*f)+''+d2h(cg*f)+''+d2h(cb*f);}else {return Math.floor(cr*f)+','+Math.floor(cg*f)+','+Math.floor(cb*f);}
		};
		function drawCorner(ctx,x,y,w,h,r,n) {
			ctx.beginPath(); ctx.moveTo(x,y+r); ctx.lineTo(x,y+h-r); ctx.quadraticCurveTo(x,y+h,x+r,y+h); ctx.lineTo(x+w-r,y+h); ctx.quadraticCurveTo(x+w,y+h,x+w,y+h-r);
			ctx.lineTo(x+w,y+r); ctx.quadraticCurveTo(x+w,y,x+w-r,y); ctx.lineTo(x+r,y); ctx.quadraticCurveTo(x,y,x,y+r); if(!n) {ctx.closePath();} 
		};
		function drawShadow(ctx,x,y,w,h,r,o) {var s;
			ctx.beginPath(); ctx.rect(x+r,y+r,w-(r*2),h-(r*2)); ctx.closePath(); ctx.fillStyle='rgba(0,0,0,'+o+')'; ctx.fill();
			ctx.beginPath(); ctx.rect(x+r,y,w-(r*2),y+r); ctx.closePath(); s=setLS(ctx,x+r,y+r,x+r,y,o); ctx.fillStyle=s; ctx.fill();
			ctx.beginPath(); ctx.rect(x,y,r,r); ctx.closePath(); s=setRS(ctx,x+r,y+r,0,x+r,y+r,r,o); ctx.fillStyle=s; ctx.fill();
			ctx.beginPath(); ctx.rect(x,y+r,r,h-(r*2)); ctx.closePath(); s=setLS(ctx,x+r,y+r,x,y+r,o); ctx.fillStyle=s; ctx.fill();
			ctx.beginPath(); ctx.rect(x,y+h-r,r,r); ctx.closePath(); s=setRS(ctx,x+r,y+h-r,0,x+r,y+h-r,r,o); ctx.fillStyle=s; ctx.fill();
			ctx.beginPath(); ctx.rect(x+r,y+h-r,w-(r*2),r); ctx.closePath(); s=setLS(ctx,x+r,y+h-r,x+r,y+h,o); ctx.fillStyle=s; ctx.fill();
			ctx.beginPath(); ctx.rect(x+w-r,y+h-r,r,r); ctx.closePath(); s=setRS(ctx,x+w-r,y+h-r,0,x+w-r,y+h-r,r,o); ctx.fillStyle=s; ctx.fill();
			ctx.beginPath(); ctx.rect(x+w-r,y+r,r,h-(r*2)); ctx.closePath(); s=setLS(ctx,x+w-r,y+r,x+w,y+r,o); ctx.fillStyle=s; ctx.fill();
			ctx.beginPath(); ctx.rect(x+w-r,y,r,r); ctx.closePath(); s=setRS(ctx,x+w-r,y+r,0,x+w-r,y+r,r,o); ctx.fillStyle=s; ctx.fill();
		};
		function drawShade(ctx,x,y,w,h,r,o,v) {var s;
			ctx.beginPath(); ctx.rect(v?x:x+r,v?y+r:y,v?w:(w/2)-r,v?(h/2)-r:h); ctx.closePath(); s=setMS(ctx,v?x:x+(w/2),v?y+(h/2):y,v?x:x+r,v?y+r:y,o*.7,o*.33,'0,0,0','254,254,254'); ctx.fillStyle=s; ctx.fill();
			ctx.beginPath(); ctx.rect(v?x:x+(w/2),v?y+(h/2):y,v?w:w-r,v?h-r:h); ctx.closePath(); s=setMS(ctx,v?x:x+(w/2),v?y+(h/2):y,v?x:x+w-r,v?y+h-r:y,o*.7,o*.33,'254,254,254','0,0,0'); ctx.fillStyle=s; ctx.fill();
		};
		function drawEdge(ctx,x,y,w,h,b,o,d) {
			ctx.beginPath(); ctx.moveTo(x+b,y+h-b); ctx.lineTo(x+w-b,y+h-b); ctx.closePath(); ctx.strokeStyle='rgba(0,0,0,'+o+')'; ctx.stroke();
			ctx.beginPath(); ctx.moveTo(x+b,y+b); ctx.lineTo(x+b,y+h-b); ctx.closePath(); ctx.strokeStyle='rgba(0,0,0,'+(d?0:o*.5)+')'; ctx.stroke();
			ctx.beginPath(); ctx.moveTo(x+w-b,y+b); ctx.lineTo(x+w-b,y+h-b); ctx.closePath(); ctx.strokeStyle='rgba(0,0,0,'+(d?o:o*.5)+')'; ctx.stroke();
		};
		function drawBound(ctx,x,y,w,h,r,o,d) {var s;
			ctx.beginPath(); ctx.rect(x+w-r,y,r,h); ctx.closePath(); s=setLS(ctx,x+w,y,x+w-r,y,o*(d?1:.4),'0,0,0'); ctx.fillStyle=s; ctx.fill();
			ctx.beginPath(); ctx.rect(x,y,r,h); ctx.closePath(); s=setLS(ctx,x,y,x+r,y,o*(d?1:.4),d?'254,254,254':'0,0,0'); ctx.fillStyle=s; ctx.fill();
			ctx.beginPath(); ctx.rect(x,y,w,r); ctx.closePath(); s=setLS(ctx,x,y,x,y+r,o,'254,254,254'); ctx.fillStyle=s; ctx.fill();
			ctx.beginPath(); ctx.rect(x,y+h-r,w,r); ctx.closePath(); s=setLS(ctx,x,y+h,x,y+h-r,o,'0,0,0'); ctx.fillStyle=s; ctx.fill();
		};
		try {	
			var vertical=getArg('vertical','boolean'), noradius=getArg('noradius','boolean'), noshadow=getArg('noshadow','boolean'), noframe=getArg('noframe','boolean');
			var ds=getArg('downshadow','boolean'), color=getArg('color','string'), texture=getArg('texture','string'); 
			var opacity=getArg('opacity','number'), shadow=getArg('shadow','number'), shade=getArg('shade','number'); 
			var ow,oh,iw,ih,x,y,os,bd,br,ir,op,vc,rd,sh,sd,bc=(color.match(/^#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]$/i)?color:'#997755');
			sh=shadow<0.01?0.0:Math.max(Math.min(shadow,100),1)/100; sd=shade<0.01?0.0:Math.max(Math.min(shade,100),1)/100;
			op=opacity<0.01?0.0:Math.max(Math.min(opacity,100),1)/100; vc=vertical; rd=(ds?false:true); ow=canvas.width; oh=canvas.height; 
			iw=ow; ih=oh; x=0; y=0; os=0; bd=Math.round((ow+oh)/200); br=Math.round((ow+oh)/100); ir=noradius||noframe?0:br; 
			if(!noshadow) {os=Math.round((ow+oh)/150); x=(rd?0:os); iw=iw-(2*os); ih=ih-(2*os);} 
			if(canvas.vml) {
				if(canvas.tagName.toUpperCase()=="VAR") {var img,head,foot,fill,bounds='',shadows='',shades=''; 
					foot='</v:group>'; 
					head='<v:group style="zoom:1;display:inline-block;margin:0;padding:0;position:relative;width:'+ow+'px;height:'+oh+'px;" coordsize="'+ow+','+oh+'"><v:rect strokeweight="0" filled="t" stroked="f" style="zoom:1;padding:0;margin:0;position:absolute;top:0px;left:0px;width:'+ow+'px;height:'+oh+'px;"><v:fill color="#ffffff" opacity="0.0" /></v:rect>';
					if(!noshadow) {
						shadows='<v:roundrect arcsize="2%" strokeweight="0" filled="t" stroked="f" fillcolor="#000000" style="top:'+(rd?os:0)+'px; left:'+(rd?os:0)+'px; width:'+(rd?ow-(3*os):ow-(2*os))+'px; height:'+(rd?oh-(3*os):oh-(2*os))+'px; position:absolute; margin:0px; padding:0px; filter:Alpha(opacity='+(sh*100)+'), progid:dxImageTransform.Microsoft.Blur(PixelRadius='+os+', MakeShadow=false);"></v:roundrect>';
					}
					color='<v:roundrect arcsize="'+(noradius||noframe?0:2)+'%" strokeweight="0" filled="t" stroked="f" fillcolor="'+bc+'" style="top:'+y+'px; left:'+x+'px; width:'+iw+'px; height:'+ih+'px; position:absolute; margin:0px; padding:0px;"></v:roundrect>';
					shades='<v:rect strokeweight="0" filled="t" stroked="f" style="top:'+(vc?y+(ih/4)-(br*2):y)+'px; left:'+parseInt(vc?x:x+(iw/4)-(br*2))+'px; width:'+parseInt(vc?iw:iw/4)+'px; height:'+parseInt(vc?ih/4:ih)+'px; position:absolute; margin:0px; padding:0px;"><v:fill method="linear" type="gradient" focus="0.75" angle="'+(vc?0:90)+'" color="#ffffff" opacity="0" color2="#ffffff" o:opacity2="'+(sd*.33)+'" /></v:rect>';
					shades+='<v:rect strokeweight="0" filled="t" stroked="f" style="top:'+(vc?y+(ih/2)-(br*2):y)+'px; left:'+parseInt(vc?x:x+(iw/2)-(br*2))+'px; width:'+parseInt(vc?iw:br*2)+'px; height:'+parseInt(vc?br*2:ih)+'px; position:absolute; margin:0px; padding:0px;"><v:fill method="linear" type="gradient" focus="0.5" angle="'+(vc?0:90)+'" color="#000000" opacity="0" color2="#000000" o:opacity2="'+(sd*.7)+'" /></v:rect>';
					shades+='<v:rect strokeweight="0" filled="t" stroked="f" style="top:'+(vc?y+(ih/2):y)+'px; left:'+parseInt(vc?x:x+(iw/2))+'px; width:'+parseInt(vc?iw:br*2)+'px; height:'+parseInt(vc?ir*2:ih)+'px; position:absolute; margin:0px; padding:0px;"><v:fill method="linear" type="gradient" focus="0.5" angle="'+(vc?0:90)+'" color="#ffffff" opacity="0" color2="#ffffff" o:opacity2="'+(sd*.7)+'" /></v:rect>';
					shades+='<v:rect strokeweight="0" filled="t" stroked="f" style="top:'+(vc?y+(ih/2)+(br*2):y)+'px; left:'+parseInt(vc?x:x+(iw/2)+(br*2))+'px; width:'+parseInt(vc?iw:iw/4)+'px; height:'+parseInt(vc?ih/4:ih)+'px; position:absolute; margin:0px; padding:0px;"><v:fill method="linear" type="gradient" focus="0.25" angle="'+(vc?0:90)+'" color="#000000" opacity="0" color2="#000000" o:opacity2="'+(sd*.33)+'" /></v:rect>';
					if(!noframe) {
						bounds='<v:shape strokeweight="0" filled="t" stroked="f" coordorigin="0,0" coordsize="'+iw+','+bd+'" path="m 0,'+bd+' l '+iw+','+bd+' qy '+(iw-bd)+',0 l '+bd+',0 qx 0,'+bd+' x e" style="top:'+y+'px; left:'+x+'px; width:'+iw+'px; height:'+bd+'px; position:absolute; margin:0px; padding:0px;"><v:fill method="linear" type="gradient" angle="0" color="#ffffff" opacity="0" color2="#ffffff" o:opacity2="'+sd+'" /></v:shape>';
						bounds+='<v:shape strokeweight="0" filled="t" stroked="f" coordorigin="0,0" coordsize="'+bd+','+ih+'" path="m 0,'+bd+' l 0,'+(ih-bd)+' qy '+bd+','+ih+' l '+bd+',0 qx 0,'+bd+' x e" style="top:'+y+'px; left:'+x+'px; width:'+bd+'px; height:'+ih+'px; position:absolute; margin:0px; padding:0px;"><v:fill method="linear" type="gradient" angle="90" color="'+(rd?'#ffffff':'#000000')+'" opacity="0" color2="'+(rd?'#ffffff':'#000000')+'" o:opacity2="'+(sd*(rd?1:.4))+'" /></v:shape>'; 
						bounds+='<v:shape strokeweight="0" filled="t" stroked="f" coordorigin="0,0" coordsize="'+iw+','+bd+'" path="m 0,0 l '+iw+',0 qy '+(iw-bd)+','+bd+' l '+bd+','+bd+' qx 0,0 x e" style="top:'+(y+ih-bd)+'px; left:'+x+'px; width:'+iw+'px; height:'+bd+'px; position:absolute; margin:0px; padding:0px;"><v:fill method="linear" type="gradient" angle="180" color="#000000" opacity="0" color2="#000000" o:opacity2="'+sd+'" /></v:shape>'; 
						bounds+='<v:shape strokeweight="0" filled="t" stroked="f" coordorigin="0,0" coordsize="'+bd+','+ih+'" path="m 0,0 l 0,'+ih+' qx '+bd+','+(ih-bd)+' l '+bd+','+bd+' qy 0,0 x e" style="top:'+y+'px; left:'+(x+iw-bd)+'px; width:'+bd+'px; height:'+ih+'px; position:absolute; margin:0px; padding:0px;"><v:fill method="linear" type="gradient" angle="270" color="#000000" opacity="0" color2="#000000" o:opacity2="'+(sd*(rd?1:.4))+'" /></v:shape>'; 
					}
					if(texture=='') {
						canvas.innerHTML=head+shadows+color+shades+bounds+foot;
					}else{
						img=new Image(); img.onabort=img.onerror=function() {canvas.innerHTML=head+shadows+color+shades+bounds+foot;};
						img.onload=function() {
							if(img.width>0&&img.height>0) {
								fill='<v:roundrect arcsize="'+(noradius||noframe?0:2)+'%" strokeweight="0" filled="t" stroked="f" fillcolor="'+bc+'" style="top:'+y+'px; left:'+x+'px; width:'+iw+'px; height:'+ih+'px; position:absolute; margin:0px; padding:0px;"><v:fill type="tile" opacity="'+op+'" src="'+img.src+'" /></v:roundrect>';
								canvas.innerHTML=head+shadows+color+fill+shades+bounds+foot;
							}else{canvas.innerHTML=head+shadows+color+shades+bounds+foot;}
						}; img.src=texture; 
					}
				}
			}else {
				if(canvas.tagName.toUpperCase()=="CANVAS"&&canvas.getContext("2d")) {
					var context=canvas.getContext("2d");
					context.clearRect(0,0,ow,oh); context.fillStyle='rgba(0,0,0,0)'; context.fillRect(0,0,ow,oh); context.save();
					if(!noshadow) {drawShadow(context,rd?os:0,rd?os:0,rd?ow-os:ow,rd?oh-os:oh,os*2,sh);}
					drawCorner(context,x,y,iw,ih,ir); context.clip(); if(window.opera){context.save();} context.fillStyle=color; context.fillRect(x,y,iw,ih);
					if(texture=='') { 
						drawShade(context,x,y,iw,ih,bd,sd,vc); if(!noframe) {drawBound(context,x,y,iw,ih,bd,sd,rd); drawEdge(context,x,y,iw,ih,bd*2,sd,rd);} context.restore();
					}else {var act=false,pat,img; img=new Image();  
						img.onabort=img.onerror=function() {drawShade(context,x,y,iw,ih,bd,sd,vc); act=1; if(!noframe) {drawBound(context,x,y,iw,ih,bd,sd,rd); drawEdge(context,x,y,iw,ih,bd*2,sd,rd);} context.restore();};
						img.onload=function() {
							if(img.width>0&&img.height>0) {pat=context.createPattern(img,'repeat'); context.fillStyle=pat; context.globalAlpha=op; context.fillRect(x,y,iw,ih); context.globalAlpha=1;} 
							drawShade(context,x,y,iw,ih,bd,sd,vc); act=1; if(!noframe) {drawBound(context,x,y,iw,ih,bd,sd,rd); drawEdge(context,x,y,iw,ih,bd*2,sd,rd);} context.restore();
						}; img.src=texture; 
						if(window.opera&&!act) {drawShade(context,x,y,iw,ih,bd,sd,vc); act=1; if(!noframe) {drawBound(context,x,y,iw,ih,bd,sd,rd); drawEdge(context,x,y,iw,ih,bd*2,sd,rd);} context.restore();}
					}
				}
			}
		} catch (e) {
		}
	}
}

var bt_ctrl = {version : 1.3, released : '2011-02-02 12:00:00',
	defaultSize : 32, 
	defaultShape : 'info', 
	defaultString : '_bt_', 
	defaultAlpha : 100, 
	defaultRadius : 100, 
	defaultFgglow : 50, 
	defaultFgcolor : '#ffffff', 
	defaultBgcolor : '#000000', 
	defaultInvert : false, 
	add: function(object, options) {
		if(object.tagName.toUpperCase()=="DIV"||object.tagName.toUpperCase()=="TD") {
			var canvas,tmp,defopts={"size":bt_ctrl.defaultSize, "alpha":bt_ctrl.defaultAlpha, "shape":bt_ctrl.defaultShape, "string":bt_ctrl.defaultString, "radius":bt_ctrl.defaultRadius, "fgglow":bt_ctrl.defaultFgglow, "fgcolor":bt_ctrl.defaultFgcolor, "bgcolor":bt_ctrl.defaultBgcolor, "invert":bt_ctrl.defaultInvert };
			if(options) {for(var i in defopts) {if(!options[i]) {options[i]=defopts[i];}}}else {options=defopts;}
			var size=(typeof options['size']=='number'?Math.max(20,options['size']%2==0?options['size']:options['size']+1):32);
			var parid=(typeof options['parent']=='string'?options['parent']:object.id||'parent');
			var strid=(typeof options['string']=='string'?options['string']:'_bt_');
			var objid=(typeof options['shape']=='string'?options['shape']:'info');
			var vml=document.all&&!window.opera&&(!document.documentMode||document.documentMode<9)?1:0;
			try {
				if(vml) {
					canvas=document.createElement(['<var style="zoom:1;display:block;width:'+size+'px;height:'+size+'px;margin:0px;padding:0px;">'].join(''));
				}else {
					canvas=document.createElement('canvas');
				}
				if(canvas||canvas.getContext("2d")) {
					canvas.options=options; 
					canvas.id=parid+strid+objid;
					canvas.height=size; 
					canvas.width=size; 
					canvas.top=0; 
					canvas.left=0;
					canvas.vml=vml;
					tmp=canvas.style;
					tmp.display='block'; 
					tmp.position='relative'; 
					tmp.visibility='visible';
					tmp.top=canvas.top+'px'; 
					tmp.left=canvas.left+'px';
					tmp.height=size+'px'; 
					tmp.width=size+'px';
					object.appendChild(canvas); 
					bt_ctrl.modify(canvas,options);
				}
			} catch (e) {
			}
		}
	},
	
	modify: function(canvas,options) {
		function _drawInfo(ctx,x,y,s,z,l) {ctx.fillRect(x+z,y,z+z,z); ctx.fillRect(x+z,y+z+l,z+z,z+z+l); }; 
		function _drawPlay(ctx,x,y,s,z,l) {ctx.lineWidth=l; ctx.beginPath(); ctx.moveTo((l*.5)+x+z,y+z); ctx.lineTo((l*.5)+x+z,y+s-z); ctx.lineTo((l*.5)+x+s-z,y+z+z); ctx.closePath(); ctx.fill(); ctx.stroke();}; 
		function _drawPause(ctx,x,y,s,z,l) {ctx.fillRect(x+z,y+z,z-(l*.5),z+z); ctx.fillRect(x+s-z-z+(l*.5),y+z,z-(l*.5),z+z);}; 
		function _drawPrev(ctx,x,y,s,z,l) {ctx.lineWidth=l; ctx.beginPath(); ctx.moveTo(x+z-1,y+z+z); ctx.lineTo(x+s-z-(l*.5),y+z); ctx.lineTo(x+s-z-(l*.5),y+s-z); ctx.closePath(); ctx.stroke();}; 
		function _drawNext(ctx,x,y,s,z,l) {ctx.lineWidth=l; ctx.beginPath(); ctx.moveTo((l*.5)+x+z,y+z); ctx.lineTo((l*.5)+x+z,y+s-z); ctx.lineTo((l*.5)+x+s-z,y+z+z); ctx.closePath(); ctx.stroke();}; 
		function _drawBward(ctx,x,y,s,z,l) {ctx.lineWidth=l; ctx.beginPath(); ctx.moveTo(x-l+z+z,y+z); ctx.lineTo(x-l+z,y+z+z); ctx.lineTo(x-l+z+z,y+s-z); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x+s-z,y+z); ctx.lineTo(x+s-z-z,y+z+z); ctx.lineTo(x+s-z,y+s-z); ctx.closePath(); ctx.stroke();}; 
		function _drawFward(ctx,x,y,s,z,l) {ctx.lineWidth=l; ctx.beginPath(); ctx.moveTo(x+z,y+z); ctx.lineTo(x+z+z,y+z+z); ctx.lineTo(x+z,y+s-z); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x+l+s-z-z,y+z); ctx.lineTo(x+l+s-z,y+z+z); ctx.lineTo(x+l+s-z-z,y+s-z); ctx.closePath(); ctx.stroke();};
		function _drawFirst(ctx,x,y,s,z,l) {ctx.lineWidth=l; ctx.beginPath(); ctx.moveTo(x+s-z,y+s-z); ctx.lineTo(x+z+l,y+z+z); ctx.lineTo(x+s-z,y+z); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x+z,y+z); ctx.lineTo(x+z,y+s-z); ctx.stroke();}; 
		function _drawLast(ctx,x,y,s,z,l) {ctx.lineWidth=l; ctx.beginPath(); ctx.moveTo(x+z,y+s-z); ctx.lineTo(x+s-z-l,y+z+z); ctx.lineTo(x+z,y+z); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x+s-z,y+z); ctx.lineTo(x+s-z,y+s-z); ctx.stroke();}; 
		function _drawMenu(ctx,x,y,s,z,l) {
			ctx.lineWidth=l; 
			ctx.beginPath(); 
			ctx.moveTo(x+z,y+z); 
			ctx.lineTo(x+s-z,y+z); 
			ctx.lineTo(x+z+z,y+s-z); 
			ctx.closePath(); 
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(x+z,y+(l*.5)+s-z); 
			ctx.lineTo(x+s-z,y+(l*.5)+s-z); 
			ctx.stroke();
		}; 
		function _drawTable(ctx,x,y,s,z,l) {
			ctx.fillRect(x+l,y+l,z+z-(l*1.5),z+z-(l*1.5)); 
			ctx.fillRect(x+z+z+(l*.5),y+l,z+z-(l*1.5),z+z-(l*1.5)); 
			ctx.fillRect(x+l,y+z+z+(l*.5),z+z-(l*1.5),z+z-(l*1.5)); 
			ctx.fillRect(x+z+z+(l*.5),y+z+z+(l*.5),z+z-(l*1.5),z+z-(l*1.5)); 
		}; 
		function _drawList(ctx,x,y,s,z,l) {
			ctx.lineWidth=l; 
			ctx.beginPath(); 
			ctx.moveTo(x+z,y+z); 
			ctx.lineTo(x+z+z+z,y+z); 
			ctx.stroke(); 
			ctx.beginPath(); 
			ctx.moveTo(x+z,y+z+z); 
			ctx.lineTo(x+z+z+z,y+z+z); 
			ctx.stroke(); 
			ctx.beginPath(); 
			ctx.moveTo(x+z,y+z+z+z); 
			ctx.lineTo(x+z+z+z,y+z+z+z); 
			ctx.stroke(); 
		}; 
		function _getRGB(v) {
			function h2d(h){return(Math.max(0,Math.min(parseInt(h,16),254)));};
			return h2d(v.substr(1,2))+','+h2d(v.substr(3,2))+','+h2d(v.substr(5,2));
		}; 
		try {	
			function getArg(c,a,t) {return (typeof options[a]===t?options[a]:c[a]);};
			var iv=getArg(canvas.options,'invert','boolean'), 
			op=Math.min(Math.max(getArg(canvas.options,'alpha','number'),0),100), 
			rd=Math.min(Math.max(getArg(canvas.options,'radius','number'),0),100), 
			gl=Math.min(Math.max(getArg(canvas.options,'fgglow','number'),0),100), 
			sh=getArg(canvas.options,'shape','string'), 
			fg=getArg(canvas.options,'fgcolor','string'), 
			bg=getArg(canvas.options,'bgcolor','string'); 
			canvas.options['alpha']=op;
			canvas.options['shape']=sh; 
			canvas.options['radius']=rd; 
			canvas.options['fgglow']=gl; 
			canvas.options['fgcolor']=fg; 
			canvas.options['bgcolor']=bg; 
			var sz=canvas.width, fc=(fg.match(/^#[0-9a-f]{6}$/i)?fg:'#ffffff'), bc=(bg.match(/^#[0-9a-f]{6}$/i)?bg:'#000000');
			var bd=Math.round(sz/16), bh=(bd/2), os=Math.round((sz/4)-bd), is=sz-(os*2), io=Math.round(is/4), pi=Math.PI, rp=Math.round((sz/2)*(rd/100));op/=100;
			if(canvas.vml) {
				if(canvas.tagName.toUpperCase()=="VAR") {var head, foot, fill, tpre, tsuf, shape='';
					head='<v:group style="zoom:1;display:block;margin:0;padding:0;position:relative;width:'+sz+'px;height:'+sz+'px;" coordsize="'+sz+','+sz+'">'; foot='</v:group>';
					if(rd>=100) {tpre=tsuf='oval';}else if(rd<1) {tpre=tsuf='rect';}else {tpre='roundrect arcsize="'+(rd*.5)+'%"'; tsuf='roundrect';}
					fill='<v:'+tpre+' filled="t" fillcolor="transparent" stroked="f" strokeweight="0" style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:'+(bh-1)+'px;left:'+(bh-1)+'+px;width:'+(sz-bd)+'px;height:'+(sz-bd)+'px;"><v:fill color="'+(iv?fc:bc)+'" opacity="'+op+'" /></v:'+tsuf+'>';
					switch(sh) {
						case "info": shape='<v:shape filled="t" stroked="f" coordorigin="0,0" coordsize="'+sz+','+sz+'" path="m '+(os+io)+','+(os)+' l '+(os+is-io)+','+(os)+' l '+(os+is-io)+','+(os+io)+' l '+(os+io)+','+(os+io)+' l '+(os+io)+','+(os)+' m '+(os+io)+','+(os+io+bd)+' l '+(os+is-io)+','+(os+io+bd)+' l '+(os+is-io)+','+(os+is)+' l '+(os+io)+','+(os+is)+' l '+(os+io)+','+(os+io+bd)+' e" style="display:block;position:absolute;margin:0px;padding:0px;top:-1px;left:-1px;width:'+sz+'px;height:'+sz+'px;"><v:fill color="'+(iv?bc:fc)+'" opacity="'+op+'" /></v:shape>'; break;
						case "first": shape='<v:shape filled="f" stroked="t" coordorigin="0,0" coordsize="'+sz+','+sz+'" path="m '+(bh+os+io)+','+(os+io)+' l '+(bh+os+io)+','+(os+is-io)+' l '+(os+is-io)+','+(os+io+io)+' l '+(bh+os+io)+','+(os+io)+' m '+(os+is-io)+','+(os+io)+' l '+(os+is-io)+','+(os+is-io)+' e" style="rotation:180;display:block;position:absolute;margin:0px;padding:0px;top:-1px;left:-1px;width:'+sz+'px;height:'+sz+'px;"><v:stroke color="'+(iv?bc:fc)+'" opacity="'+op+'" weight="'+bd+'px" miterlimit="0" endcap="round" joinstyle="round" /></v:shape>'; break;
						case "bward": shape='<v:shape filled="f" stroked="t" coordorigin="0,0" coordsize="'+sz+','+sz+'" path="m '+(os+io)+','+(os+io)+' l '+(os+io+io)+','+(os+io+io)+' l '+(os+io)+','+(os+is-io)+' l '+(os+io)+','+(os+io)+' m '+(os+bd+is-io-io)+','+(os+io)+' l '+(os+bd+is-io)+','+(os+io+io)+' l '+(os+bd+is-io-io)+','+(os+is-io)+' l '+(os+bd+is-io-io)+','+(os+io)+' e" style="rotation:180;display:block;position:absolute;margin:0px;padding:0px;top:-1px;left:-1px;width:'+sz+'px;height:'+sz+'px;"><v:stroke color="'+(iv?bc:fc)+'" opacity="'+op+'" weight="'+bd+'px" miterlimit="0" endcap="round" joinstyle="round" /></v:shape>'; break;
						case "prev": shape='<v:shape filled="f" stroked="t" coordorigin="0,0" coordsize="'+sz+','+sz+'" path="m '+(bh+os+io)+','+(os+io)+' l '+(bh+os+io)+','+(os+is-io)+' l '+(bh+os+is-io)+','+(os+io+io)+' x e" style="rotation:180;display:block;position:absolute;margin:0px;padding:0px;top:-1px;left:-1px;width:'+sz+'px;height:'+sz+'px;"><v:stroke color="'+(iv?bc:fc)+'" opacity="'+op+'" weight="'+bd+'px" miterlimit="0" endcap="round" joinstyle="round" /></v:shape>'; break;
						case "play": shape='<v:shape filled="t" stroked="t" coordorigin="0,0" coordsize="'+sz+','+sz+'" path="m '+(bh+os+io)+','+(os+io)+' l '+(bh+os+io)+','+(os+is-io)+' l '+(bh+os+is-io)+','+(os+io+io)+' x e" style="display:block;position:absolute;margin:0px;padding:0px;top:-1px;left:-1px;width:'+sz+'px;height:'+sz+'px;"><v:stroke color="'+(iv?bc:fc)+'" opacity="'+op+'" weight="'+bd+'px" miterlimit="0" endcap="round" joinstyle="round" /><v:fill color="'+(iv?bc:fc)+'" opacity="'+op+'" /></v:shape>'; break;
						case "pause": shape='<v:shape filled="t" stroked="f" coordorigin="0,0" coordsize="'+sz+','+sz+'" path="m '+(os+io)+','+(os+io)+' l '+(os+io+io-bh)+','+(os+io)+' l '+(os+io+io-bh)+','+(os+io+io+io)+' l '+(os+io)+','+(os+io+io+io)+' l '+(os+io)+','+(os+io)+'m '+(os+is-io-io+bh)+','+(os+io)+' l '+(os+is-io)+','+(os+io)+' l '+(os+is-io)+','+(os+io+io+io)+' l '+(os+is-io-io+bh)+','+(os+io+io+io)+' l '+(os+is-io-io+bh)+','+(os+io)+' e" style="display:block;position:absolute;margin:0px;padding:0px;top:-1px;left:-1px;width:'+sz+'px;height:'+sz+'px;"><v:fill color="'+(iv?bc:fc)+'" opacity="'+op+'" /></v:shape>'; break;
						case "next": shape='<v:shape filled="f" stroked="t" coordorigin="0,0" coordsize="'+sz+','+sz+'" path="m '+(bh+os+io)+','+(os+io)+' l '+(bh+os+io)+','+(os+is-io)+' l '+(bh+os+is-io)+','+(os+io+io)+' x e" style="display:block;position:absolute;margin:0px;padding:0px;top:-1px;left:-1px;width:'+sz+'px;height:'+sz+'px;"><v:stroke color="'+(iv?bc:fc)+'" opacity="'+op+'" weight="'+bd+'px" miterlimit="0" endcap="round" joinstyle="round" /></v:shape>'; break;
						case "fward": shape='<v:shape filled="f" stroked="t" coordorigin="0,0" coordsize="'+sz+','+sz+'" path="m '+(os+io)+','+(os+io)+' l '+(os+io+io)+','+(os+io+io)+' l '+(os+io)+','+(os+is-io)+' l '+(os+io)+','+(os+io)+' m '+(os+bd+is-io-io)+','+(os+io)+' l '+(os+bd+is-io)+','+(os+io+io)+' l '+(os+bd+is-io-io)+','+(os+is-io)+' l '+(os+bd+is-io-io)+','+(os+io)+' e" style="display:block;position:absolute;margin:0px;padding:0px;top:-1px;left:-1px;width:'+sz+'px;height:'+sz+'px;"><v:stroke color="'+(iv?bc:fc)+'" opacity="'+op+'" weight="'+bd+'px" miterlimit="0" endcap="round" joinstyle="round" /></v:shape>'; break;
						case "last": shape='<v:shape filled="f" stroked="t" coordorigin="0,0" coordsize="'+sz+','+sz+'" path="m '+(bh+os+io)+','+(os+io)+' l '+(bh+os+io)+','+(os+is-io)+' l '+(os+is-io)+','+(os+io+io)+' l '+(bh+os+io)+','+(os+io)+' m '+(os+is-io)+','+(os+io)+' l '+(os+is-io)+','+(os+is-io)+' e" style="display:block;position:absolute;margin:0px;padding:0px;top:-1px;left:-1px;width:'+sz+'px;height:'+sz+'px;"><v:stroke color="'+(iv?bc:fc)+'" opacity="'+op+'" weight="'+bd+'px" miterlimit="0" endcap="round" joinstyle="round" /></v:shape>'; break;
					} 
					canvas.innerHTML=head+fill+shape+foot;
				}
			}else {
				if(canvas.tagName.toUpperCase()=="CANVAS"&&canvas.getContext("2d")) {var context=canvas.getContext("2d");
					context.clearRect(0,0,sz,sz); context.save(); context.fillStyle=(iv?fc:bc); context.strokeStyle=fc; 
					context.lineCap='round'; context.lineJoin='round'; context.lineWidth=bd; 
					context.beginPath(); 
					if(rd>=100) {
						context.arc(sz/2,sz/2,(sz/2)-bh,0,(pi/180)*360,true); 
					}else if(rd<1) {
						context.moveTo(bh,bh);context.lineTo(sz-bh,bh);context.lineTo(sz-bh,sz-bh);context.lineTo(bh,sz-bh);
					}else {
						context.arc(rp,rp,rp-bh,pi,pi*(3/2),false);
						context.arc(sz-rp,rp,rp-bh,pi*(3/2),0,false);
						context.arc(sz-rp,sz-rp,rp-bh,0,pi*(1/2),false);
						context.arc(rp,sz-rp,rp-bh,pi*(1/2),pi,false);
					}
					context.closePath(); context.fill();
					context.fillStyle=(iv?bc:fc); context.strokeStyle=(iv?bc:fc); 
					context.shadowOffsetX=0; context.shadowOffsetY=0; context.shadowBlur=bd+bd; 
					context.shadowColor="rgba("+_getRGB(iv?bc:fc)+","+(gl/100)+")";
					switch(sh) {
						case "info":  _drawInfo(context,os,os,is,io,bd); break;
						case "first": _drawFirst(context,os,os,is,io,bd); break; 
						case "bward": _drawBward(context,os,os,is,io,bd); break; 
						case "prev":  _drawPrev(context,os,os,is,io,bd); break; 
						case "play":  _drawPlay(context,os,os,is,io,bd); break;
						case "pause": _drawPause(context,os,os,is,io,bd); break; 
						case "next":  _drawNext(context,os,os,is,io,bd); break;
						case "fward": _drawFward(context,os,os,is,io,bd); break;
						case "last":  _drawLast(context,os,os,is,io,bd); break;
						case "menu":  _drawMenu(context,os,os,is,io,bd); break;
						case "list":  _drawList(context,os,os,is,io,bd); break;
						case "table": _drawTable(context,os,os,is,io,bd); break;
					} 
					context.restore(); 
				}
			}
		} catch (e) {
		}
	}
}
/* bt_busy, version 1.3, released 2011-02-02 */
function set_BT_BusyOverlay(parent,overlay,busy) {
	if(typeof(parent)==='object' && document.getElementsByTagName) {
		function parseWidth(val) {return (isNaN(parseInt(val,10))?0:parseInt(val,10));}
		var isIE,isVL,isCV,isWK,isGE,i,b,o,lt,rt,lb,rb,cz,cs,size,inner,outer,string,canvas,context,ctrl,opacity,color,text,styles,spanid,bgrnd,waiting=true;
		if(parent.currentStyle){cs=parent.currentStyle;}else if(document.defaultView&&document.defaultView.getComputedStyle){cs=document.defaultView.getComputedStyle(parent,"");}else{cs=parent.style;}
		while(cs.display.search(/block|inline-block|table|inline-table|list-item/i)<0) {parent=parent.parentNode; if(parent.currentStyle){cs=parent.currentStyle;}else if(document.defaultView&&document.defaultView.getComputedStyle){cs=document.defaultView.getComputedStyle(parent,"");}else{cs=parent.style;} if(parent.tagName.toUpperCase()==='BODY') {parent="";}}
		if(typeof(parent)==='object') {
			if(!overlay) {overlay=new Object(); overlay['opacity']=0; overlay['color']='white'; overlay['text']=''; overlay['style']=''; overlay['bgimage']=''; }
			if(!busy) {busy=new Object(); busy['size']=32; busy['color']='#000'; busy['type']='tube'; busy['iradius']=8; busy['weight']=3; busy['count']=12; busy['speed']=96; busy['minopac']=.25;}
			opacity=Math.max(0.0,Math.min(1.0,(typeof overlay['opacity']==='number'?overlay['opacity']:0)||0)); color=(typeof overlay['color']==='string'?overlay['color']:'white');
			text=(typeof overlay['text']==='string'?overlay['text']:''); spanid=(typeof overlay['spanid']==='string'?overlay['spanid']:''); 
			styles=(typeof overlay['styles']==='string'?overlay['styles']:''); bgrnd=(typeof overlay['bgimage']==='string'?overlay['bgimage']:'');
			canvas=document.createElement("canvas"); isCV=canvas.getContext?1:0; 
			isWK=navigator.userAgent.indexOf('WebKit')>-1?1:0; isGE=navigator.userAgent.indexOf('Gecko')>-1&&window.updateCommands?1:0;
			isIE=navigator.appName=='Microsoft Internet Explorer'&&window.navigator.systemLanguage&&!window.opera?1:0;
			isVL=document.all&&document.namespaces&&!window.opera&&(!document.documentMode||document.documentMode<9)?1:0; 
			outer=document.createElement('div'); parent.style.position=(cs.position=='static'?'relative':cs.position); 
			cz=parent.style.zIndex>=0?(parent.style.zIndex-0+2):2; if(isIE && !cs.hasLayout) {parent.style.zoom=1;}
			outer.style.position='absolute'; outer.style.overflow='hidden'; outer.style.display='block'; outer.style.zIndex=cz; 
			outer.style.left=0+'px'; outer.style.top=0+'px'; outer.style.width='100%'; outer.style.height='100%';
			if(isIE) {outer.className='buzy_ele'; outer.style.zoom=1; outer.style.margin='0px'; outer.style.padding='0px'; outer.style.height=(parent.offsetHeight-parseWidth(cs.borderBottomWidth)-parseWidth(cs.borderTopWidth)); 
			outer.style.width=(parent.offsetWidth-parseWidth(cs.borderLeftWidth)-parseWidth(cs.borderRightWidth));} parent.appendChild(outer);
			inner=document.createElement('div'); inner.style.position='absolute'; inner.style.cursor='progress';
			inner.style.display='block'; inner.style.zIndex=(cz-1); inner.style.left=0+'px'; inner.style.top=0+'px';
			inner.style.width=100+'%';inner.style.height=100+'%';inner.style.backgroundPosition="50% 50%";inner.style.backgroundRepeat="no-repeat";inner.style.backgroundImage="url('"+bgrnd+"')";inner.style.backgroundColor=color;
			if(isIE) {inner.style.zoom=1; inner.style.margin='0px'; inner.style.padding='0px'; inner.style.height=outer.style.height; inner.style.width=outer.style.width; }
			if(isIE) {inner.style.filter="alpha(opacity="+parseInt(opacity*100)+")";}else {inner.style.opacity=opacity;}outer.appendChild(inner); 
			size=Math.max(16,Math.min(512,(typeof busy['size']==='number'?(busy['size']==0?32:busy['size']):32)));
			if(isVL){if(document.namespaces['v']==null) {var stl = document.createStyleSheet(); stl.addRule("v\\:*", "behavior: url(#default#VML);"); document.namespaces.add("v", "urn:schemas-microsoft-com:vml");}}
			if(!isCV){canvas=document.createElement("div");}
			canvas.style.position='absolute'; canvas.style.cursor='progress'; canvas.style.zIndex=(cz-0+1); canvas.style.top='50%'; 
			canvas.style.left='50%'; canvas.style.marginTop='-'+(size/2)+'px'; canvas.style.marginLeft='-'+(size/2)+'px';
			canvas.width=size; canvas.height=size; canvas.style.width=size+"px"; canvas.style.height=size+"px";
			outer.appendChild(canvas);
			if(typeof(text)!=""){
				string=document.createElement('div'); string.style.position='absolute'; string.style.overflow='hidden'; 
				string.style.cursor='progress'; string.style.zIndex=(cz-0+1); string.style.top='50%'; string.style.left='0px';
				string.style.marginTop=2+(size/2)+'px'; string.style.textAlign='center'; string.style.width=100+'%'; string.style.height='auto';
				if(typeof(styles)!=""){string.innerHTML='<span id="'+spanid+'" '+(styles.match(/:/i)?'style':'class')+'="'+styles+'">'+text+'</span>';}
				else {string.innerHTML='<span id="'+spanid+'">'+text+'</span>';}outer.appendChild(string);
			}
			if(isGE){outer.style.MozUserSelect="none"; inner.style.MozUserSelect="none"; canvas.style.MozUserSelect="none";}else 
			if(isWK){outer.style.KhtmlUserSelect="none"; inner.style.KhtmlUserSelect="none"; canvas.style.KhtmlUserSelect="none";}else 
			if(isIE){outer.unselectable="on"; inner.unselectable="on"; canvas.unselectable="on";}
			if(isVL){ctrl=get_BT_BusyVL(canvas,busy); ctrl.start();}else if(isCV){ctrl=get_BT_BusyCV(canvas.getContext("2d"),busy); ctrl.start();}
			return {remove: function (){if(waiting){if(outer.timer) {window.clearInterval(outer.timer);} var c=0,n=100,m=0,t=10,p=1; 
				outer.timer=window.setInterval(function() {outer.z=Math.ceil(n+(Math.pow(((1/t)*c),p)*(m-n))); outer.style.opacity=outer.z/100; outer.style.filter="alpha(opacity="+outer.z+")"; c++; 
				if(c>t) {window.clearInterval(outer.timer); waiting=false; ctrl.stop(); delete ctrl; parent.removeChild(outer);}
			},50);}}};
		}else {return false;}
	}else {return false;}
}
function get_BT_BusyVL(obj,opt) {
	function getHEX(v){
		var col=v||'#000000';
		if(!col.match(/^#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]$/i)) {
			if(v.match(/^#[0-9a-f][0-9a-f][0-9a-f]$/i)) {col='#'+v.substr(1,1)+v.substr(1,1)+v.substr(2,1)+v.substr(2,1)+v.substr(3,1)+v.substr(3,1);}
		}return col;
	};
	var cl,sz,tp,ir,w,ct,sp,mo,running=false,os=0,al=0,f=100,c,i,h,p,t,x,y,hs,qs,hw,qw,rp,sh,fl,ele=new Array();
	c=getHEX(opt['color']||'#000000');
	tp=opt['type']||"t"; t=(tp.match(/^[coprt]/i)?tp.substr(0,1).toLowerCase():'t');
	ct=Math.max(5,Math.min(36,opt['count']||12)); 
	sp=Math.max(30,Math.min(1000,opt['speed']||96)); 
	sz=Math.max(16,Math.min(512,opt['size']||32)); 
	ir=Math.max(1,Math.min((sz/2)-2,opt['iradius']||sz/4));
	w=Math.max(1,Math.min((sz/2)-ir,opt['weight']||sz/10)); 
	mo=Math.max(0,Math.min(0.5,opt['minopac']||0.25)); 
	h=(sz/2)-ir; x=sz/2; y=x; al=360/ct; 
	hs=parseInt((sz/2)*f); 
	qs=parseInt(hs/2); 
	hw=parseInt((w/2)*f); 
	qw=parseInt(hw/2); 
	rp=hs-parseInt(ir*f); 
	switch(t) {
		case "c": p='m '+hs+','+(rp-hw)+' ar '+(hs-hw)+','+(rp-hw-hw)+','+(hs+hw)+','+rp+','+(hs-hw)+','+(rp-hw-hw)+','+(hs-hw)+','+(rp-hw-hw)+' e'; break;
		case "p": p='m '+(hs-qw)+',0 l '+(hs-hw)+','+rp+','+(hs+hw)+','+rp+','+(hs+qw)+',0 x e'; break;
		case "o": p='m '+hs+','+(rp-qs)+' ar '+(hs-hw)+',0,'+(hs+hw)+','+rp+','+(hs-hw)+',0,'+(hs-hw)+',0 e'; break;
		case "t": p='m '+(hs-hw)+','+rp+' l '+(hs-hw)+','+hw+' qy '+hs+',0 qx '+(hs+hw)+','+hw+' l '+(hs+hw)+','+rp+' x e'; break;
		default: p='m '+(hs-hw)+',0 l '+(hs-hw)+','+rp+','+(hs+hw)+','+rp+','+(hs+hw)+',0 x e'; break;
	} 
	for(i=0;i<ct;i++) {
		sh=document.createElement('v:shape'); sh.setAttribute('filled','t'); sh.setAttribute('stroked','f'); 
		sh.setAttribute('coordorigin','0,0'); sh.setAttribute('coordsize',(sz*f)+','+(sz*f));
		sh.setAttribute('path',p); sh.style.rotation=(i*al); sh.style.position='absolute'; sh.style.margin='0px';
		sh.style.width=sz+'px'; sh.style.height=sz+'px'; sh.style.top='-1px'; sh.style.left='-1px'; obj.appendChild(sh);
		fl=document.createElement('v:fill'); fl.setAttribute('color',c); fl.setAttribute('opacity',Math.min(1,Math.max(mo,1-((ct+1-i)/(ct+1)))));
		sh.appendChild(fl); ele[i]=fl;
	}
	function nextLoop(){if(!running) {return;} os=(os+1)%ct; for(i=0;i<ct;i++){ al=((os+i)%ct); ele[al].setAttribute('opacity',Math.min(1,Math.max(mo,1-((ct+1-i)/(ct+1)))));}setTimeout(nextLoop,sp);}
	nextLoop(0);
	return {
		start: function (){if(!running){running=true; nextLoop(0);}}, stop: function (){running=false; for(i=0;i<ct;i++) {ele[i].setAttribute('opacity',0);}}, pause: function (){running=false; }
	};
}
function get_BT_BusyCV(ctx,opt) {
	function getRGB(v){
		function hex2dec(h){return(Math.max(0,Math.min(parseInt(h,16),255)));}
		var r=0,g=0,b=0; v = v||'#000'; if(v.match(/^#[0-9a-f]{3}$/i)) {
			r=hex2dec(v.substr(1,1)+v.substr(1,1)),g=hex2dec(v.substr(2,1)+v.substr(2,1)),b=hex2dec(v.substr(3,1)+v.substr(3,1));
		}else if(v.match(/^#[0-9a-f]{6}$/i)) {
			r=hex2dec(v.substr(1,2)),g=hex2dec(v.substr(3,2)),b=hex2dec(v.substr(5,2));
		} return r+','+g+','+b;
	}
	function drawOval(ctx,w,h){ctx.beginPath(); ctx.moveTo(-w/2,h/2); ctx.quadraticCurveTo(-w/2,0,0,0); ctx.quadraticCurveTo(w/2,0,w/2,h/2); ctx.quadraticCurveTo(w/2,h,0,h); ctx.quadraticCurveTo(-w/2,h,-w/2,h/2); ctx.fill();}
	function drawTube(ctx,w,h){ctx.beginPath(); ctx.moveTo(w/2,0); ctx.lineTo(-w/2,0); ctx.lineTo(-w/2,h-(w/2)); ctx.quadraticCurveTo(-w/2,h,0,h); ctx.quadraticCurveTo(w/2,h,w/2,h-(w/2)); ctx.fill();}
	function drawPoly(ctx,w,h){ctx.beginPath(); ctx.moveTo(w/2,0); ctx.lineTo(-w/2,0); ctx.lineTo(-w/4,h); ctx.lineTo(w/4,h); ctx.fill();}
	function drawCirc(ctx,r,z){ctx.beginPath(); ctx.arc(r,r,r,0,Math.PI*2,false); ctx.fill();}  
	var cl,sz,tp,ir,w,ct,sp,mo,running=false,os=0,al=0,c,i,h,t,x,y; 
	c=getRGB(opt['color']||'#000000'); tp=opt['type']||"t"; 
	t=(tp.match(/^[coprt]/i)?tp.substr(0,1).toLowerCase():'t'); 
	ct=Math.max(5,Math.min(36,opt['count']||12)); 
	sp=Math.max(30,Math.min(1000,opt['speed']||96));
	sz=Math.max(16,Math.min(512,opt['size']||32)); 
	ir=Math.max(1,Math.min((sz/2)-2,opt['iradius']||sz/4)); 
	w=Math.max(1,Math.min((sz/2)-ir,opt['weight']||sz/10)); 
	mo=Math.max(0,Math.min(0.5,opt['minopac']||0.25)); 
	h=(sz/2)-ir; x=sz/2; y=x;
	function nextLoop(){
		if(!running) {return;} os=(os+1)%ct; ctx.clearRect(0,0,sz,sz); ctx.save(); ctx.translate(x,y);
		for(i=0;i<ct;i++){ al=2*((os+i)%ct)*Math.PI/ct; 
			ctx.save(); ctx.translate(ir*Math.sin(-al),ir*Math.cos(-al)); ctx.rotate(al); ctx.fillStyle='rgba('+c+','+Math.min(1,Math.max(mo,1-((ct+1-i)/(ct+1))))+')';
			switch(t) {case "c": drawCirc(ctx,w/2,h); break; case "o": drawOval(ctx,w,h); break; case "p": drawPoly(ctx,w,h); break; case "t": drawTube(ctx,w,h); break; default: ctx.fillRect(-w/2,0,w,h); break;} ctx.restore();
		} ctx.restore(); setTimeout(nextLoop,sp);
	}
	nextLoop(0);
	return {
		start: function (){if(!running){running=true; nextLoop(0);}}, stop: function (){running=false; ctx.clearRect(0,0,sz,sz); }, pause: function (){running=false; }
	};
}
/**
 * booklet_lang.js 1.0 (29-Dec-2010) (c) by Christian Effenberger 
 * Don't expect to mutch. All translations made by babel fish only.
 * Parses ISO 2 letter (Alpha-2 code, ISO 639-1).

 * Distributed under the 3 General Public License Agreements.
 * This program is free software: you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License or 
 * GNU Lesser General Public License or GNU Affero General Public 
 * License as published by the Free Software Foundation, either 
 * version 3 of the Licenses, or (at your option) any later versions.
 * This program is distributed in the hope that it will be useful, 
 * but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 *
 * syntax: get_Booklet_Language(string)
**/

function get_Booklet_Language(v) { 
	if(!v||typeof(v)!=='string'||v.length!=2) {
		v=(typeof(navigator.language)==='string'?navigator.language:typeof(navigator.browserLanguage)==='string'?navigator.browserLanguage:'').substr(0,2);
	}
	switch(v) {
		case "zh":
			var cvi_bt_cn=new Object();
				cvi_bt_cn.overlaytext="装货图象...";
				cvi_bt_cn.playbutton="戏剧或停留";
				cvi_bt_cn.nextbutton="其次";
				cvi_bt_cn.prevbutton="早先";
				cvi_bt_cn.firstbutton="首先";
				cvi_bt_cn.lastbutton="为时";
				cvi_bt_cn.fwardbutton="5x 向前";
				cvi_bt_cn.bwardbutton="5x 向后";
				cvi_bt_cn.menubutton="回到内容";
				cvi_bt_cn.listbutton="版本记录或epilog";
				cvi_bt_cn.tablebutton="目录";
				return cvi_bt_cn;
		break;
		case "ja":
			var cvi_bt_jp=new Object();
				cvi_bt_jp.overlaytext="ローディングのイメージ...";
				cvi_bt_jp.playbutton="演劇か休止";
				cvi_bt_jp.nextbutton="次に";
				cvi_bt_jp.prevbutton="前";
				cvi_bt_jp.firstbutton="最初に";
				cvi_bt_jp.lastbutton="最後";
				cvi_bt_jp.fwardbutton="5x 前方";
				cvi_bt_jp.bwardbutton="5x 後方に";
				cvi_bt_jp.menubutton="目次に戻る";
				cvi_bt_jp.listbutton="押印かepilog";
				cvi_bt_jp.tablebutton="目録";
				return cvi_bt_jp;
		break;
		case "ko":
			var cvi_bt_kr=new Object();
				cvi_bt_kr.overlaytext="선적 심상...";
				cvi_bt_kr.playbutton="놀이또는쉼";
				cvi_bt_kr.nextbutton="다음";
				cvi_bt_kr.prevbutton="이전";
				cvi_bt_kr.firstbutton="첫째로";
				cvi_bt_kr.lastbutton="마지막";
				cvi_bt_kr.fwardbutton="5x 앞으로";
				cvi_bt_kr.bwardbutton="5x 뒤에";
				cvi_bt_kr.menubutton="목차 등을 맞댄";
				cvi_bt_kr.listbutton="인장 또는 epilog";
				cvi_bt_kr.tablebutton="목차";
				return cvi_bt_kr;
		break;
		case "ru":
			var cvi_bt_ru=new Object();
				cvi_bt_ru.overlaytext="Изображения нагрузки...";
				cvi_bt_ru.playbutton="игра/перерыв";
				cvi_bt_ru.nextbutton="затем";
				cvi_bt_ru.prevbutton="предыдуще";
				cvi_bt_ru.firstbutton="во первых";
				cvi_bt_ru.lastbutton="последнее";
				cvi_bt_ru.fwardbutton="5x передне";
				cvi_bt_ru.bwardbutton="5x ОН назад";
				cvi_bt_ru.menubutton="назад к содержанию";
				cvi_bt_ru.listbutton="отпечаток/epilog";
				cvi_bt_ru.tablebutton="содержание";
				return cvi_bt_ru;
		break;
		case "el":
			var cvi_bt_gr=new Object();
				cvi_bt_gr.overlaytext="Εικόνες φόρτωσης...";
				cvi_bt_gr.playbutton="παιχνίδι/μικρή διακοπή";
				cvi_bt_gr.nextbutton="έπειτα";
				cvi_bt_gr.prevbutton="προηγούμενος";
				cvi_bt_gr.firstbutton="πρώτα";
				cvi_bt_gr.lastbutton="διαρκέστε";
				cvi_bt_gr.fwardbutton="5x διαβιβάστε";
				cvi_bt_gr.bwardbutton="5x προς τα πίσω";
				cvi_bt_gr.menubutton="πίσω στο περιεχόμενο";
				cvi_bt_gr.listbutton="σφραγίδα/epilog";
				cvi_bt_gr.tablebutton="πίνακας περιεχομένων";
				return cvi_bt_gr;
		break;
		case "pt":
			var cvi_bt_pt=new Object();
				cvi_bt_pt.overlaytext="Imagens do carregamento...";
				cvi_bt_pt.playbutton="jogo/pausa";
				cvi_bt_pt.nextbutton="seguinte";
				cvi_bt_pt.prevbutton="precedente";
				cvi_bt_pt.firstbutton="primeiro";
				cvi_bt_pt.lastbutton="último";
				cvi_bt_pt.fwardbutton="5x para diante";
				cvi_bt_pt.bwardbutton="5x para trás";
				cvi_bt_pt.menubutton="de volta aos índices";
				cvi_bt_pt.listbutton="impressão/epilog";
				cvi_bt_pt.tablebutton="índice";
				return cvi_bt_pt;
		break;
		case "es":
			var cvi_bt_es=new Object();
				cvi_bt_es.overlaytext="Cargando imágenes pilgajo...";
				cvi_bt_es.playbutton="play/pausa";
				cvi_bt_es.nextbutton="siguiente";
				cvi_bt_es.prevbutton="anterior";
				cvi_bt_es.firstbutton="primero";
				cvi_bt_es.lastbutton="&uacute;ltimo";
				cvi_bt_es.fwardbutton="5x delantero";
				cvi_bt_es.bwardbutton="5x al revés";
				cvi_bt_es.menubutton="de nuevo a contenido";
				cvi_bt_es.listbutton="impresión/epilog";
				cvi_bt_es.tablebutton="contenido";	
				return cvi_bt_es;
		break;
		case "it":
			var cvi_bt_it=new Object();
				cvi_bt_it.overlaytext="Immagini di caricamento...";
				cvi_bt_it.playbutton="gioco/pausa";
				cvi_bt_it.nextbutton="dopo";
				cvi_bt_it.prevbutton="precedente";
				cvi_bt_it.firstbutton="primo";
				cvi_bt_it.lastbutton="ultimo";
				cvi_bt_it.fwardbutton="5x di andata";
				cvi_bt_it.bwardbutton="5x indietro";
				cvi_bt_it.menubutton="di nuovo al soddisfare";
				cvi_bt_it.listbutton="stampa/epilog";
				cvi_bt_it.tablebutton="indice";	
				return cvi_bt_it;
		break;
		case "fr":
			var cvi_bt_fr=new Object();
				cvi_bt_fr.overlaytext="Images de chargement...";
				cvi_bt_fr.playbutton="jeu/pause";
				cvi_bt_fr.nextbutton="après";
				cvi_bt_fr.prevbutton="précédent";
				cvi_bt_fr.firstbutton="d'abord";
				cvi_bt_fr.lastbutton="bout";
				cvi_bt_fr.fwardbutton="5x en avant";
				cvi_bt_fr.bwardbutton="5x vers l'arrière";
				cvi_bt_fr.menubutton="de nouveau au contenu";
				cvi_bt_fr.listbutton="impression/epilog";
				cvi_bt_fr.tablebutton="table des matières";
				return cvi_bt_fr;
		break;
		case "nl":
			var cvi_bt_nl=new Object();
				cvi_bt_nl.overlaytext="De beelden van de lading...";
				cvi_bt_nl.playbutton="spel/pauze";
				cvi_bt_nl.nextbutton="volgende";
				cvi_bt_nl.prevbutton="vorige";
				cvi_bt_nl.firstbutton="eerste";
				cvi_bt_nl.lastbutton="laatste";
				cvi_bt_nl.fwardbutton="5x voorwaartse";
				cvi_bt_nl.bwardbutton="5x achteruit";
				cvi_bt_nl.menubutton="terug naar inhoud";
				cvi_bt_nl.listbutton="afdruk/epiloog";
				cvi_bt_nl.tablebutton="inhoudstafel";
				return cvi_bt_nl;
		break;
		case "de":
			var cvi_bt_de=new Object();
				cvi_bt_de.overlaytext="Lade Bilder...";
				cvi_bt_de.playbutton="Abspielen/Pause";
				cvi_bt_de.nextbutton="Nächste Seite";
				cvi_bt_de.prevbutton="Vorige Seite";
				cvi_bt_de.firstbutton="Erste Seite";
				cvi_bt_de.lastbutton="Letzte Seite";
				cvi_bt_de.fwardbutton="5 Seiten Forwärts";
				cvi_bt_de.bwardbutton="5 Seiten Rückwärts";
				cvi_bt_de.menubutton="Zurück zu den Bildern";
				cvi_bt_de.listbutton="Impressum/Epilog";
				cvi_bt_de.tablebutton="Bilderübersicht";
				return cvi_bt_de;
		break;
		case "en":
		default: 
			var cvi_bt_en=new Object();
				cvi_bt_en.overlaytext="Loading images...";
				cvi_bt_en.playbutton="play/pause";
				cvi_bt_en.nextbutton="next";
				cvi_bt_en.prevbutton="previous";
				cvi_bt_en.firstbutton="first";
				cvi_bt_en.lastbutton="last";
				cvi_bt_en.fwardbutton="5x forward";
				cvi_bt_en.bwardbutton="5x backward";
				cvi_bt_en.menubutton="back to contents";
				cvi_bt_en.listbutton="imprint/epilog";
				cvi_bt_en.tablebutton="table of contents";
				return cvi_bt_en;
		break;
	} 
	return false;
}
/**
 * cvi_filter_lib.js 2.0 (13-Jan-2011) (c) by Christian Effenberger 
 * All Rights Reserved. Source: filter.netzgesta.de
 * Library supports: booklet.js|
 * cvi_bevel.js|cvi_corner.js|cvi_curl.js|cvi_edge.js|cvi_strip.js|
 * cvi_glossy.js|cvi_instant.js|cvi_reflex.js|cvi_slide.js|cvi_sphere.js
 * Distributed under Netzgestade Non-commercial Software License Agreement.
 * This license permits free of charge use on non-commercial 
 * and private web sites only under special conditions. 
 * Read more at... http://www.netzgesta.de/cvi/LICENSE.html
**/

var cvi_matrix=new Object(); // External kernel matrix definitions
// REMEMBER: Used names should not match any of the filter names!!!
cvi_matrix.blur		= [[ 1, 2, 1],[ 2, 4, 2],[ 1, 2, 1]]; // blurs the image using the Gaussian method.
cvi_matrix.median	= [[ 1, 1, 1],[ 1, 1, 1],[ 1, 1, 1]]; // smoothes grainy images.
cvi_matrix.sharpen	= [[ 0,-1, 0],[-1, 9,-1],[ 0,-1, 0]]; // makes the image sharper.
cvi_matrix.sharper	= [[-1,-1,-1],[-1,16,-1],[-1,-1,-1]]; // makes the image even sharper.
cvi_matrix.sharp	= [[-1,-1,-1],[-1, 9,-1],[-1,-1,-1]]; // makes the image sharper.
cvi_matrix.sharpest	= [[-1,-2,-1],[-2,13,-2],[-1,-2,-1]]; // makes the image sharper.
cvi_matrix.bumplt	= [[ 1, 1, 0],[ 1, 1,-1],[ 0,-1,-1]]; // embosses the image. 
cvi_matrix.bumpbr	= [[-1,-1, 0],[-1, 1, 1],[ 0, 1, 1]]; // embosses the image. 
/*** add H E R E your personal convolution kernels  ***/
/*** additional edge detection convolution kernels  ***/
cvi_matrix.laplace1	= [[-1, 0,-1],[ 0, 4, 0],[-1, 0,-1]]; // embosses the image. 
cvi_matrix.laplace2	= [[ 0, 1, 0],[ 1,-4, 1],[ 0, 1, 0]]; // embosses the image. 
cvi_matrix.laplace3	= [[ 1, 1, 1],[ 1,-8, 1],[ 1, 1, 1]]; // embosses the image. 
cvi_matrix.laplace4	= [[ 1, 2, 1],[ 2,-12,2],[ 1, 2, 1]]; // embosses the image. 
cvi_matrix.embossbr	= [[-1,-1, 0],[-1, 0, 1],[ 0, 1, 1]]; // embosses the image. normalize with s=[1,0]
cvi_matrix.embosslt	= [[ 1, 1, 0],[ 1, 0,-1],[ 0,-1,-1]]; // embosses the image. normalize with s=[1,0]
cvi_matrix.edge1	= [[-5, 0, 0],[ 0, 0, 0],[ 0, 0, 5]]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge2	= [[-5,-5,-5],[-5,39,-5],[-5,-5,-5]]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge3	= [[-1,-1,-1],[-1, 8,-1],[-1,-1,-1]]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge4	= [[-1,-1,-1],[ 0, 0, 0],[ 1, 1, 1]]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge5	= [[-1,-1,-1],[ 2, 2, 2],[-1,-1,-1]]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge6	= [[ 1, 1, 1],[ 1,-7, 1],[ 1, 1, 1]]; // edge detection. use s=[0-255,0-255]
cvi_matrix.edge7	= [[-1, 0, 1],[ 0, 0, 0],[ 1, 0,-1]]; // edge detection. use s=[0-255,0-255]

eval(function(p,a,c,k,e,r){e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'([9A-Z]|[12]\\w)'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('T 1z={version:2.0,released:\'2011-01-13 12:00:00\',2h:1o,2i:1o,2j:-1,CBunabled:navigator.userAgent.indexOf(\'WebKit\')!=-1&&!1p.external&&!1q.defaultCharset?1:0,add:17(N,K,Y,w,h){17 2k(h,s,b){T c,f,u,p,q,t;c=9.C(A,9.D(0,9.H(b/U*A)));B(s==0){O[c,c,c]}F{u=h%1e;f=u%60;p=9.C(A,9.D(0,9.H((b*(U-s))/10000*A)));q=9.C(A,9.D(0,9.H((b*(2l-s*f))/2m*A)));t=9.C(A,9.D(0,9.H((b*(2l-s*(60-f)))/2m*A)));switch(9.floor(u/60)){1h 0:O[c,t,p];1h 1:O[q,c,p];1h 2:O[p,c,t];1h 3:O[p,q,c];1h 4:O[t,p,c];1h 5:O[c,p,q]}}O[0,0,0]};17 1S(r,g,b){T rr,gr,br,h,a=9.D(r,g,b),i=9.C(r,g,b),d=a-i,n=a/A,s=(a!=0)?d/a:0;B(s==0){h=0}F{rr=(a-r)/d;gr=(a-g)/d;br=(a-b)/d;B(r==a){h=br-gr}F B(g==a){h=2+rr-br}F{h=4+gr-rr}h/=6;B(h<0){h++}}O[9.H(h*1e),9.H(s*U),9.H(n*U)]};17 2n(y,u,v){O[9.C(A,9.D(0,9.H(y+v/0.2o))),9.C(A,9.D(0,9.H(y-0.39466*u-0.5806*v))),9.C(A,9.D(0,9.H(y+u/0.2p)))]};17 2q(r,g,b){T y=0.1r*r+0.1s*g+0.1t*b;O[y,(b-y)*0.2p,(r-y)*0.2o]};17 1T(v,e){B(1p.2r){1p.2r.1T(v+e)}F B(1p.2s){2s.postError(v+e)}F{1p.1q.title=v}O 1u};17 1D(a,t){O(P Y[a]===t?Y[a]:1i[a])};B(N&&N.tagName.toUpperCase()=="CANVAS"){B(N.1j){T s,a,d,r,g,b,p,c,f,i,j,k,l,m,n,o,q,t,u,v,x=0,y=0,z=0,cb=1u,1v,L,Z,E,M,1i,1E,1U=1u,1V=P(1W)==="17"?1X:1u;E=N.1j(\'2d\');B(E.W){1E=1X}1i={"f":1z.2h,"m":1z.2i,"s":1z.2j};M=K.1j(\'2d\');B(Y){G(i in 1i){B(!Y[i]){Y[i]=1i[i]}}}F{Y=1i}f=1D(\'f\',\'string\');m=1D(\'m\',\'Q\');c=(P Y[\'s\']===\'Q\')?Y[\'s\']||-1:parseFloat(9.D(0,9.C(A,1D(\'s\',\'number\'))))||-1;B(M&&1E&&f!=1o&&w>0&&h>0&&!f.1Y(/(1Z|20|21|22|23)/i)){2t{2t{s=E.W(0,0,1,1)}2u(24){B(P(2v)==="Q"){2v.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead")}s=E.W(0,0,1,1)}}2u(24){1U=1X;1T(24.message,". Explanations:\\2w://en.wikipedia.2x/wiki/Same_origin_policy\\2w://www.w3.2x/TR/XMLHttpRequest/#exceptions")}}B(M&&f!=1o&&w>0&&h>0){w+=4;h+=4;B(1U||!1E||f.1Y(/(1Z|20|21|22|23)/i)){B(f=="23"){k=(c[0]>0?9.C(0.26,9.D(0.27,c[0])):0.5);m=(c[1]>=0?9.C(1,9.D(0,c[1])):0.4);l=(c[2]>0?Boolean(c[2]):0);v=(c[3]>0?9.C(8,9.D(1,c[3])):4);T 1k=1q.28(\'29\');1k.18=h-4;1k.19=w-4;T 1w=1q.28(\'29\');1w.18=h-4;1w.19=w-4;T 1x=1q.28(\'29\');1x.18=h-4;1x.19=w-4;T 2y=1k.1j(\'2d\'),2z=1w.1j(\'2d\'),11=1x.1j(\'2d\');2y.I(K,0,0,w-4,h-4);B(1V){1W(E,v,x,y,w,h)}F{t=9.H(v*5);b=9.H(w*.75);q=9.H(h*.75);G(i=0;i<t;i++){r=9.D(2,9.H(b-(2*i)));g=9.D(2,9.H(q-(2*i)));M.1l(0,0,w-4,h-4);M.I(N,0,0,w,h,0,0,r,g);E.1l(0,0,w,h);E.I(K,0,0,r,g,0,0,w,h)}}2z.I(N,2,2,w-4,h-4,0,0,w-4,h-4);E.I(1k,0,0,w-4,h-4,2,2,w-4,h-4);M.1l(0,0,w-4,h-4);11.1l(0,0,w-4,h-4);11.I(1k,0,0);11.2A="source-over";11.I(1w,0,0);11.2A="destination-out";T 14=11.createLinearGradient(0,0,(l?w-4:0),(l?0:h-4));14.1f(0,"1g(0,0,0,0)");B(k-(m/2)-0.05>=0.27){14.1f(k-(m/2)-0.05,"1g(0,0,0,0)")}B(k-(m/2)>=0.27){14.1f(k-(m/2),"1g(0,0,0,1)")}14.1f(k,"1g(0,0,0,1)");B(k+(m/2)<=0.26){14.1f(k+(m/2),"1g(0,0,0,1)")}B(k+(m/2)+0.05<=0.26){14.1f(k+(m/2)+0.05,"1g(0,0,0,0)")}14.1f(1,"1g(0,0,0,0)");11.fillStyle=14;11.fillRect(0,0,w-4,h-4);E.I(1x,0,0,w,h)}F B(f=="1Z"){v=(c>0?9.C(8,9.D(1,c)):1);t=9.H(v*5);b=9.H(w*.75);q=9.H(h*.75);G(i=0;i<t;i++){r=9.D(2,9.H(b-(2*i)));g=9.D(2,9.H(q-(2*i)));M.1l(0,0,w-4,h-4);M.I(N,0,0,w,h,0,0,r,g);E.1l(0,0,w,h);E.I(K,0,0,r,g,0,0,w,h)}M.I(N,0,0,w,h,0,0,w-4,h-4)}F B(f=="20"){M.I(N,0,0,w,h,0,0,w-4,h-4);v=(c>0?c:1);p=E.1a;b=.25;m=b/v;G(i=0;i<v;i++){E.1a=b-(m*i);E.I(K,0,0,K.19,K.18,-i,-i,w+(2*i),h+(2*i))}E.1a=p;M.I(N,0,0,w,h,0,0,w-4,h-4)}F B(f=="21"){M.I(N,0,0,w,h,0,0,w-4,h-4);v=(c[0]>0?c[0]:1);r=(c[1]>=0?9.C(1e,c[1]):0);p=E.1a;i=0;b=.25;m=b/v;T xo,yo,R,S,sx=1,sy=1,xi=0,yi=0,15;z=((r-90)*9.PI)/2b;xo=9.H(v*9.cos(z))+xi;yo=9.H(v*9.sin(z))+yi;R=xo-xi;S=yo-yi;B(R<0){sx=-1;R=-R}B(S<0){sy=-1;S=-S}R=R<<1;S=S<<1;B(S<R){15=S-(R>>1);2B(xi!=xo){B(15>=0){yi+=sy;15-=R}15+=S;xi+=sx;i++;E.1a=b-(m*i);E.I(K,0,0,K.19,K.18,xi,yi,w,h)}}F{15=R-(S>>1);2B(yi!=yo){B(15>=0){xi+=sx;15-=S}15+=R;yi+=sy;i++;E.1a=b-(m*i);E.I(K,0,0,K.19,K.18,xi,yi,w,h)}}E.1a=p;M.I(N,0,0,w,h,0,0,w-4,h-4)}F B(f=="22"){M.I(N,0,0,w,h,0,0,w-4,h-4);v=(c>0?c:1);b=.25;m=b/v;E.2c();E.translate(w/2,h/2);G(i=0;i<v;i++){E.1a=b-(m*i);E.2c();E.2C((9.PI*i)/2b);E.I(K,0,0,K.19,K.18,0-(w/2),0-(h/2),w,h);E.2e();E.2c();E.2C((9.PI*-i)/2b);E.I(K,0,0,K.19,K.18,0-(w/2),0-(h/2),w,h);E.2e()}E.2e();M.I(N,0,0,w,h,0,0,w-4,h-4)}}F{B(f=="convolve"&&(P m===\'Q\')&&m!=1o||(P 2D[f]===\'Q\')){s=E.W(x,y,w,h);a=s.V;d=E.W(x,y,w,h);j=h;i=w;n=w*4;k=2D[f]||m;t=(c[0]>=0?c[0]:k[0][0]+k[0][1]+k[0][2]+k[1][0]+k[1][1]+k[1][2]+k[2][0]+k[2][1]+k[2][2]);m=(c[1]>=0?9.C(A,c[1]):0);G(j=h;j>0;j--){q=[(j-2)*n,(j-1)*n,j*n];G(i=w;i>0;i--){o=[q[0]+(i-2)*4,q[1]+(i-1)*4,q[2]+i*4];r=(a[o[0]-4]*k[0][0]+a[o[0]]*k[0][1]+a[o[0]+4]*k[0][2]+a[o[1]-4]*k[1][0]+a[o[1]]*k[1][1]+a[o[1]+4]*k[1][2]+a[o[2]-4]*k[2][0]+a[o[2]]*k[2][1]+a[o[2]+4]*k[2][2])/t;g=(a[o[0]-3]*k[0][0]+a[o[0]+1]*k[0][1]+a[o[0]+5]*k[0][2]+a[o[1]-3]*k[1][0]+a[o[1]+1]*k[1][1]+a[o[1]+5]*k[1][2]+a[o[2]-3]*k[2][0]+a[o[2]+1]*k[2][1]+a[o[2]+5]*k[2][2])/t;b=(a[o[0]-2]*k[0][0]+a[o[0]+2]*k[0][1]+a[o[0]+6]*k[0][2]+a[o[1]-2]*k[1][0]+a[o[1]+2]*k[1][1]+a[o[1]+6]*k[1][2]+a[o[2]-2]*k[2][0]+a[o[2]+2]*k[2][1]+a[o[2]+6]*k[2][2])/t;d.V[o[1]]=9.C(A,9.D(0,r+m));d.V[o[1]+1]=9.C(A,9.D(0,g+m));d.V[o[1]+2]=9.C(A,9.D(0,b+m))}}E.1L(d,x,y)}F B(f=="outline"){v=(c[0]>=0?9.C(A,c[0]):1);b=(c[1]>=0?9.C(A,c[1]):0);t=(c[2]!=\'\'?c[2].1Y(/1m|1M|1N|1O|1P/i)?c[2]:\'1m\':\'1m\');s=E.W(x,y,w,h);a=s.V;d=E.W(x,y,w,h);u=X 1n();u.1m=X 1n();u.1m.y=[1,2,1,0,0,0,-1,-2,-1];u.1m.x=[1,0,-1,2,0,-2,1,0,-1];u.1M=X 1n();u.1M.y=[3,10,3,0,0,0,-3,-10,-3];u.1M.x=[3,0,-3,10,0,-10,3,0,-3];u.1N=X 1n();u.1N.y=[-1,-1,-1,0,0,0,1,1,1];u.1N.x=[1,0,-1,1,0,-1,1,0,-1];u.1O=X 1n();u.1O.y=[5,5,5,-3,0,-3,-3,-3,-3];u.1O.x=[5,-3,-3,5,0,-3,5,-3,-3];u.1P=X 1n();u.1P.y=[-1,0,0,0,1,0,0,0,0];u.1P.x=[0,0,-1,0,1,0,0,0,0];g=u[t].y;r=u[t].x;G(i=0,n=a.J;i<n;i+=4){o=[[i-(w+1)*4,i-w*4,i-(w-1)*4],[i-4,i,i+4],[i+(w-1)*4,i+w*4,i+(w+1)*4]];l=g[0]*(a[o[0][0]]||0)+g[1]*(a[o[0][1]]||0)+g[2]*(a[o[0][2]]||0)+g[3]*(a[o[1][0]]||0)+g[4]*(a[o[1][1]]||0)+g[5]*(a[o[1][2]]||0)+g[6]*(a[o[2][0]]||0)+g[7]*(a[o[2][1]]||0)+g[8]*(a[o[2][2]]||0);m=r[0]*(a[o[0][0]]||0)+r[1]*(a[o[0][1]]||0)+r[2]*(a[o[0][2]]||0)+r[3]*(a[o[1][0]]||0)+r[4]*(a[o[1][1]]||0)+r[5]*(a[o[1][2]]||0)+r[6]*(a[o[2][0]]||0)+r[7]*(a[o[2][1]]||0)+r[8]*(a[o[2][2]]||0);q=9.C(A,9.D(0,(9.sqrt((l*l)+(m*m))/v)+b));d.V[i]=d.V[i+1]=d.V[i+2]=q}E.1L(d,x,y)}F B(1V&&f=="stackblur"){1W(E,c,x,y,w,h)}F B(f=="anaglyph"){M.I(N,2,2,w-4,h-4,0,0,w-4,h-4);E.I(K,0,0,w-4,h-4,0,0,w,h);s=E.W(0,2,w-4,h-4);a=s.V;d=E.W(4,2,w-4,h-4).V;G(i=0,n=a.J;i<n;i+=4){a[i]=d[i]}E.1L(s,2,2);M.I(N,2,2,w-4,h-4,0,0,w-4,h-4)}F{s=E.W(x,y,w,h);a=s.V;B(f=="invertalpha"){G(i=0,n=a.J;i<n;i+=4){a[i+3]=A-a[i+3]}}F B(f=="invert"){G(i=0,n=a.J;i<n;i+=4){a[i]=A-a[i];a[i+1]=A-a[i+1];a[i+2]=A-a[i+2]}}F B(f=="grayscale"){G(i=0,n=a.J;i<n;i+=4){t=9.H(a[i]*0.1r+a[i+1]*0.1s+a[i+2]*0.1t);a[i]=a[i+1]=a[i+2]=t}}F B(f=="alphamask"){G(i=0,n=a.J;i<n;i+=4){t=9.H(a[i]*0.1r+a[i+1]*0.1s+a[i+2]*0.1t);a[i]=a[i+1]=a[i+2]=0;a[i+3]=A-t}}F B(f=="multiplyalpha"){G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];t=a[i+3]/A;a[i]=9.C(A,9.D(0,r*t));a[i+1]=9.C(A,9.D(0,g*t));a[i+2]=9.C(A,9.D(0,b*t))}}F B(f=="unmultiplyalpha"){G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];t=A/a[i+3];a[i]=9.C(A,9.D(0,r*t));a[i+1]=9.C(A,9.D(0,g*t));a[i+2]=9.C(A,9.D(0,b*t))}}F B(f=="solarize"){G(i=0,n=a.J;i<n;i+=4){B(a[i]>1d){a[i]=A-a[i]}B(a[i+1]>1d){a[i+1]=A-a[i+1]}B(a[i+2]>1d){a[i+2]=A-a[i+2]}}}F B(f=="threshold"){v=(c>=0?9.C(2,c)*1d:1d);G(i=0,n=a.J;i<n;i+=4){t=9.H(a[i]*0.1r+a[i+1]*0.1s+a[i+2]*0.1t);t=t>=v?A:0;a[i]=t;a[i+1]=t;a[i+2]=t}}F B(f=="gamma"){g=(c>=0?c:1);t=X 1Q();G(i=0;i<1y;i++){t[i]=9.C(A,9.D(0,(A*9.pow(i/A,1/g))+0.5))}G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];a[i]=t[r];a[i+1]=t[g];a[i+2]=t[b]}}F B(f=="colorkey"){l=(P c[0]===\'Q\')?c[0]:[0,0,0];k=(P c[1]===\'Q\')?c[1]:[A,A,A];G(i=0,n=a.J;i<n;i+=4){B((a[i]>=l[0]&&a[i]<=k[0])&&(a[i+1]>=l[1]&&a[i+1]<=k[1])&&(a[i+2]>=l[2]&&a[i+2]<=k[2])){a[i+3]=0}}}F B(f=="exposure"){v=(c>0?9.C(A,9.D(0,c)):1);B(v!=1){t=X 1Q();G(i=0;i<1y;i++){t[i]=9.C(A,9.D(0,A*(1-9.exp(-(i/A)*v))))}G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];a[i]=t[r];a[i+1]=t[g];a[i+2]=t[b]}}}F B(f=="brightness"){v=(c>=0?c:1);G(i=0,n=a.J;i<n;i+=4){a[i]=9.C(A,9.D(0,a[i]*v));a[i+1]=9.C(A,9.D(0,a[i+1]*v));a[i+2]=9.C(A,9.D(0,a[i+2]*v))}}F B(f=="adjustyuva"){k=(c[0]>=0?c[0]:1);t=(c[1]>=0?c[1]:1);m=(c[2]>=0?c[2]:1);v=(c[3]>=0?c[3]:1);G(i=0,n=a.J;i<n;i+=4){1v=2q(a[i],a[i+1],a[i+2]);Z=2n(1v[0]*k,1v[1]*t,1v[2]*m);a[i]=Z[0];a[i+1]=Z[1];a[i+2]=Z[2];a[i+3]=9.C(A,9.D(0,a[i+3]*v))}}F B(f=="chromakey"){k=(c[0]>=0?9.C(1e,c[0]):1d);t=(c[1]>=0?9.C(1e,c[1]*3.6):36);m=(c[2]>=0?9.C(U,c[2]):88);r=(c[3]>=0?9.C(U,c[3]):30);b=(c[4]>=0?9.C(U,9.D(r,c[4])):82);G(i=0,n=a.J;i<n;i+=4){v=1S(a[i],a[i+1],a[i+2]);B(v[1]>=m&&(v[2]>=r&&v[2]<=b)&&(v[0]-k<t)&&(v[0]-k>(-t))){a[i+3]=9.abs(v[0]-k)/t}}}F B(f=="sepia"){G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];a[i]=9.C(A,9.D(0,r*.393+g*.769+b*.189));a[i+1]=9.C(A,9.D(0,r*.349+g*.686+b*.168));a[i+2]=9.C(A,9.D(0,r*.272+g*.534+b*.131))}}F B(f=="mixrgb"){k=(P c[0]===\'Q\')?c[0]:[0,0,0];l=(P c[1]===\'Q\')?c[1]:[0,0,0];G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];a[i]=9.C(A,9.D(0,(k[0]*(l[2]*g+(A-l[2])*b)/A+(A-k[0])*r)/A));a[i+1]=9.C(A,9.D(0,(k[1]*(l[0]*b+(A-l[0])*r)/A+(A-k[1])*g)/A));a[i+2]=9.C(A,9.D(0,(k[2]*(l[1]*r+(A-l[1])*g)/A+(A-k[2])*b)/A))}}F B(f=="posterize"){v=(c>0?9.C(16,9.D(1,c)):1);t=X 1Q();G(i=0;i<1y;i++){t[i]=A*(v*i/1y)/(v-1)}G(i=0,n=a.J;i<n;i+=4){r=a[i];g=a[i+1];b=a[i+2];a[i]=9.C(A,9.D(0,t[r]));a[i+1]=9.C(A,9.D(0,t[g]));a[i+2]=9.C(A,9.D(0,t[b]))}}F B(f=="adjustrgba"){r=(c[0]>=0?c[0]:1);g=(c[1]>=0?c[1]:1);b=(c[2]>=0?c[2]:1);v=(c[3]>=0?c[3]:1);G(i=0,n=a.J;i<n;i+=4){a[i]=9.C(A,9.D(0,a[i]*r));a[i+1]=9.C(A,9.D(0,a[i+1]*g));a[i+2]=9.C(A,9.D(0,a[i+2]*b));a[i+3]=9.C(A,9.D(0,a[i+3]*v))}}F B(f=="contrast"){v=(c>=0?c:1);G(i=0,n=a.J;i<n;i+=4){a[i]=9.C(A,9.D(0,((((a[i]/A)-0.5)*v)+0.5)*A));a[i+1]=9.C(A,9.D(0,((((a[i+1]/A)-0.5)*v)+0.5)*A));a[i+2]=9.C(A,9.D(0,((((a[i+2]/A)-0.5)*v)+0.5)*A))}}F B(f=="adjusthsba"){k=(c[0]>=0?c[0]:1);t=(c[1]>=0?c[1]:1);m=(c[2]>=0?c[2]:1);v=(c[3]>=0?c[3]:1);G(i=0,n=a.J;i<n;i+=4){L=1S(a[i],a[i+1],a[i+2]);L[0]*=k;B(L[0]<0){L[0]=0}F B(L[0]>1e){L[0]=1e}L[1]*=t;B(L[1]<0){L[1]=0}F B(L[1]>U){L[1]=U}L[2]*=m;B(L[2]<0){L[2]=0}F B(L[2]>U){L[2]=U}Z=2k(L[0],L[1],L[2]);a[i]=Z[0];a[i+1]=Z[1];a[i+2]=Z[2];a[i+3]=9.C(A,9.D(0,a[i+3]*v))}}F B(f=="tritone"){k=(P c[0]===\'Q\')?c[0]:[A,0,0];l=(P c[1]===\'Q\')?c[1]:[0,A,0];m=(P c[2]===\'Q\')?c[2]:[0,0,A];t=X 1Q();G(i=0;i<2f;i++){q=i/1d;t[i]=[k[0]+q*(l[0]-k[0]),k[1]+q*(l[1]-k[1]),k[2]+q*(l[2]-k[2])]}G(i=2f;i<1y;i++){q=(i-1d)/2f;t[i]=[l[0]+q*(m[0]-l[0]),l[1]+q*(m[1]-l[1]),l[2]+q*(m[2]-l[2])]}G(i=0,n=a.J;i<n;i+=4){v=9.C(A,9.D(0,9.H(a[i]*0.1r+a[i+1]*0.1s+a[i+2]*0.1t)));a[i]=t[v][0];a[i+1]=t[v][1];a[i+2]=t[v][2]}}E.1L(s,x,y)}}}}}O 1u}}',[],164,'|||||||||Math|||||||||||||||||||||||||||255|if|min|max|ctx|else|for|round|drawImage|length|img|hsb|bcx|obj|return|typeof|object|dx|dy|var|100|data|getImageData|new|opts|rgb||ftx|||stl|frc||function|height|width|globalAlpha|||127|360|addColorStop|rgba|case|defopts|getContext|bfa|clearRect|sobel|Object|null|window|document|299|587|114|false|yuv|bfb|bfc|256|cvi_filter||||getArg|prepared|||||||putImageData|scharr|prewitt|kirsh|roberts|Array||rgb2hsb|log|exception|sba|cvi_stackblur|true|match|smooth|zoomblur|motionblur|spinblur|tiltshift|err||999|001|createElement|canvas||180|save||restore|128||defaultF|defaultM|defaultS|hsb2rgb|6000|600000|yuv2rgb|877|493|rgb2yuv|console|opera|try|catch|netscape|nhttp|org|btx|atx|globalCompositeOperation|while|rotate|cvi_matrix'.split('|'),0,{}))
/*
StackBlur - a fast almost Gaussian Blur For Canvas v0.2

Version:    0.2
Author:     Mario Klingemann
Contact:    mario@quasimondo.com
Website:    http://www.quasimondo.com/StackBlurForCanvas
Twitter:    @quasimondo

In case you find this class useful - especially in commercial projects -
I am not totally unhappy for a small donation to my PayPal account
mario@quasimondo.de

Copyright (c) 2010 Mario Klingemann

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

 * Special cvi version 1.1 (14-Jan-2011) by Christian Effenberger
 * Useable with cvi_trans_lib.js >= 1.3 and cvi_filter_lib.js >= 1.95
 * syntax:
	cvi_stackblur( context, radius, x_pos, y_pos, width, height );
		context == canvas context to work with
		radius 	== convolution radius for bluring [1-180]
		x_pos 	== from this x position
		y_pos 	== from this y position
		width 	== affected area width
		height 	== affected area height
*/
var mul_table=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];
var shr_table=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24]; function BlurStack(){this.a=0;this.r=0;this.g=0;this.b=0;this.next=null};
function cvi_stackblur(context,radius,top_x,top_y,width,height){if(isNaN(radius)||radius<1)return;radius=parseInt(Math.min(180,Math.max(1,radius)),10);var imageData;try{imageData=context.getImageData(top_x,top_y,width,height)}catch(e){throw new Error("unable to access image data: "+e);}var pixels=imageData.data;var x,y,i,p,yp,yi,yw,r_sum,g_sum,b_sum,a_sum,r_out_sum,g_out_sum,b_out_sum,a_out_sum,r_in_sum,g_in_sum,b_in_sum,a_in_sum,pr,pg,pb,pa,rbs;var div=radius+radius+1;var w4=width<<2;var widthMinus1=width-1;var heightMinus1=height-1;var radiusPlus1=radius+1;var sumFactor=radiusPlus1*(radiusPlus1+1)/2;var stackStart=new BlurStack();var stack=stackStart;for(i=1;i<div;i++){stack=stack.next=new BlurStack();if(i==radiusPlus1)var stackEnd=stack}stack.next=stackStart;var stackIn=null;var stackOut=null;yw=yi=0;var mul_sum=mul_table[radius];var shr_sum=shr_table[radius];for(y=0;y<height;y++){r_in_sum=g_in_sum=b_in_sum=a_in_sum=r_sum=g_sum=b_sum=a_sum=0;a_out_sum=radiusPlus1*(pa=pixels[yi]);r_out_sum=radiusPlus1*(pr=pixels[yi+1]);g_out_sum=radiusPlus1*(pg=pixels[yi+2]);b_out_sum=radiusPlus1*(pb=pixels[yi+3]);a_sum+=sumFactor*pa;r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.a=pa;stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}for(i=1;i<radiusPlus1;i++){p=yi+((widthMinus1<i?widthMinus1:i)<<2);a_sum+=(stack.a=(pa=pixels[p]))*(rbs=radiusPlus1-i);r_sum+=(stack.r=(pr=pixels[p+1]))*rbs;g_sum+=(stack.g=(pg=pixels[p+2]))*rbs;b_sum+=(stack.b=(pb=pixels[p+3]))*rbs;a_in_sum+=pa;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next}stackIn=stackStart;stackOut=stackEnd;for(x=0;x<width;x++){pixels[yi]=(a_sum*mul_sum)>>shr_sum;pixels[yi+1]=(r_sum*mul_sum)>>shr_sum;pixels[yi+2]=(g_sum*mul_sum)>>shr_sum;pixels[yi+3]=(b_sum*mul_sum)>>shr_sum;a_sum-=a_out_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;a_out_sum-=stackIn.a;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(yw+((p=x+radius+1)<widthMinus1?p:widthMinus1))<<2;a_in_sum+=(stackIn.a=pixels[p]);r_in_sum+=(stackIn.r=pixels[p+1]);g_in_sum+=(stackIn.g=pixels[p+2]);b_in_sum+=(stackIn.b=pixels[p+3]);a_sum+=a_in_sum;r_sum+=r_in_sum;g_sum+=g_in_sum;b_sum+=b_in_sum;stackIn=stackIn.next;a_out_sum+=(pa=stackOut.a);r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);a_in_sum-=pa;r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=4}yw+=width}for(x=0;x<width;x++){r_in_sum=g_in_sum=b_in_sum=a_in_sum=r_sum=g_sum=b_sum=a_sum=0;yi=x<<2;a_out_sum=radiusPlus1*(pa=pixels[yi]);r_out_sum=radiusPlus1*(pr=pixels[yi+1]);g_out_sum=radiusPlus1*(pg=pixels[yi+2]);b_out_sum=radiusPlus1*(pb=pixels[yi+3]);a_sum+=sumFactor*pa;r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.a=pa;stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}yp=width;for(i=1;i<=radius;i++){yi=(yp+x)<<2;a_sum+=(stack.a=(pa=pixels[yi]))*(rbs=radiusPlus1-i);r_sum+=(stack.r=(pr=pixels[yi+1]))*rbs;g_sum+=(stack.g=(pg=pixels[yi+2]))*rbs;b_sum+=(stack.b=(pb=pixels[yi+3]))*rbs;a_in_sum+=pa;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next;if(i<heightMinus1){yp+=width}}yi=x;stackIn=stackStart;stackOut=stackEnd;for(y=0;y<height;y++){p=yi<<2;pixels[p]=(a_sum*mul_sum)>>shr_sum;pixels[p+1]=(r_sum*mul_sum)>>shr_sum;pixels[p+2]=(g_sum*mul_sum)>>shr_sum;pixels[p+3]=(b_sum*mul_sum)>>shr_sum;a_sum-=a_out_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;a_out_sum-=stackIn.a;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(x+(((p=y+radiusPlus1)<heightMinus1?p:heightMinus1)*width))<<2;a_sum+=(a_in_sum+=(stackIn.a=pixels[p]));r_sum+=(r_in_sum+=(stackIn.r=pixels[p+1]));g_sum+=(g_in_sum+=(stackIn.g=pixels[p+2]));b_sum+=(b_in_sum+=(stackIn.b=pixels[p+3]));stackIn=stackIn.next;a_out_sum+=(pa=stackOut.a);r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);a_in_sum-=pa;r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=width}}context.putImageData(imageData,top_x,top_y)}