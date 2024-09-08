// **************************************************
// Importa el código para plegado de bloques
// **************************************************
importScriptPage('ShowHide/code.js', 'dev');

// **************************************************
// BOTONES ADICIONALES - Para página de edición
// **************************************************

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


// **************************************************
// NOMBRE DEL USUARIO
// **************************************************
// Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
// o la [[Plantilla:NOMBREUSUARIO]]
// Traída inicialmente de Uncyclopedia y corregida por 
// uncyclopedia:es:user:Ciencia Al Poder ,
// para que funcione correctamente usando ''class='' en vez de ''id=''.
// **************************************************

function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
  
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}

addOnloadHook(UserNameReplace);


// **************************************************
// REDEFINICIÓN DE ORDENACIÓN DE TABLAS "SORTABLE"
// Añadido por: [[uncyclopedia:es:user:Chixpy]]
// Estos ingleses se creen el centro del universo y en las tablas que se
// pueden ordenar reconocen el punto como símbolo decimal así que hago
// Este apaño para que lo haga correctamente..
// **************************************************

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

// Modificado por Sanbec en WP-es aplicando la solución de WP en sueco
// (Anteriormente parece que solo cambiaba un punto)
// EXPERIMENTAL: Añadido además para que ordene los porcentajes.
function ts_parseFloat(num) {
        if (!num) return 0;
        num = num.replace("%", "");
        num = num.replace(/\./g, "");
        num = num.replace(/,/, ".");
        num = parseFloat(num);
        return (isNaN(num) ? 0 : num);
}

// Modificación hecha por Sanbec en WP-es para que ordene alfabéticamente bien
// ignorando acentos y no se limite a ordenarlo según el código ASCII.
function ts_sort_caseinsensitive(a,b) {
var aa = a[1].toLowerCase();
var bb = b[1].toLowerCase();
return(aa.localeCompare(bb));
}

// **************************************************
// Wikimediaplayer
// **************************************************
document.write('<script type="text/javascript" src="' 
+ '/w/index.php?title=MediaWiki:Wikimediaplayer.js'
+ '&action=raw&ctype=text/javascript&dontcountme=s&smaxage=3600"></script>');


// **************************************************
// Para subir archivos
// **************************************************
function adaptUploadFilename(){
	var ff = $('mw-upload-form').wpDestFile;
	var fn = ff.value;
	if (fn.length < 4) return;
	var fe = fn.substr(fn.length-4,4);
	if (fe != fe.toLowerCase())
		ff.value = ff.value.substr(0,fn.length-4)+fe.toLowerCase();
}

$(function(){
	var uf = $('mw-upload-form');
	if (uf && uf.wpDestFile) $UT.addHandler(uf,'submit',adaptUploadFilename);
});


// **************************************************
// Desactivación de pestaña de editar en foros 
// Desactiva la pestaña de editar en los temas más antiguos del foro, evitando 
// que la gente pueda reabrir temas antiguos. Las paginas pueden ser editadas 
// igualmente desde la pestaña historial, etc, o escribiendo la dirección de 
// editar manualmente.
// Por [[User:Spang|Spang]]
// Soporte para Monaco [[User:Uberfuzzy|Uberfuzzy]]
// Soporte para Oasis [[User:Uberfuzzy|Uberfuzzy]]
// Traducción al español [[User:Bola|Bola]]
// **************************************************
 
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
		$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archivado').removeAttr('href' );
		$('#WikiaPageHeader .wikia-button').html('Archivado').removeAttr('href');
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
	editLink.innerHTML = 'Archivado';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}
 
// **************************************************
// Bloqueo de comentarios para los blogs que no
// hayan sido comentados en más de 30 días
// Por: [[User:Joeyaa|Joey Ahmadi]]
// Traducción al español: [[User:Bola|Bola]]
// **************************************************
 
$(function() {
if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
var then = $('#article-comments-ul > .article-comments-li:first .permalink').attr('href');
then = new String(then.match(/\d{8}/));
var monthnames = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];
var year = then.match(/^\d{4}/);
var month = then.substring(4,6); 
month--;
month= monthnames[month];
var day = then.match(/\d{2}$/);
then = new Date(month+''+day+', '+year); 
var old = parseInt(now - then);
old = Math.floor(old/(1000*60*60*24));
if (old > 30) {
$('#article-comm').attr('disabled','disabled').text('Esta entrada de blog no ha sido comentada en los últimos 30 días, por lo que no es necesario añadir nuevos comentarios.');
$('#article-comm-submit').attr('disabled','disabled');
$('.article-comm-reply').remove();
}
}
});



// **************************************************
// FIND DUPLICATE IMAGES
// Code courtesy of "pcj" of WoWWiki.
// **************************************************
dil = new Array();

function findDupImages(gf) {
	indicator = stylepath + '/common/progress-wheel.gif';
	output = "";
	url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
	if (!($('#dupImagesProgress').length)) {
		$("#mw-dupimages").prepend('<span style="float: right;" id="dupImagesProgress" title="En progreso..."><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="En progreso..." /></span>');
	}
	if ( gf ) {
		url += "&gaifrom=" + gf;
	}
	$.getJSON( url, function (data) {
		if ( data.query ) {
			pages = data.query.pages;
			for ( pageID in pages ) {
				dils = "," + dil.join();
				if ( dils.indexOf("," + pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles ) {
					output += "<h3><a href='/wiki/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
					for ( x = 0; x < pages[pageID].duplicatefiles.length; x++ ) {
						output += "<li><a href='/wiki/File:" + pages[pageID].duplicatefiles[x].name + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
						dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
					}
					output += "</ul>\n\n"
				}
			}
			$("#mw-dupimages").append(output);
			if (data["query-continue"]) setTimeout("findDupImages('" + encodeURIComponent(data["query-continue"].allimages.gaifrom).replace(/'/g, "%27") + "');", 5000);
		}
	} );
}
$( function () {
	if ( $("#mw-dupimages").length ) {
		findDupImages();
	} else {
		$('#dupImagesProgress').hide();
	}
} );

// *****************************************************
// * Javascript Countdown Timer                        *
// * Version 1.5.6                                     *
// *                                                   *
// * Original script by Splarka                        *
// * Additional script by Eladkse                      *
// * Multi-language support script by Dantman          *
// *****************************************************
//
// Usage Example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2013 00:00:00 GMT</span> until the new year...
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
//
// Output Example:
//  Only 25 days, 6 hours, 42 minutes and 23 seconds until the new year...
//
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  var userconfig = (window.CountdownConfig) ? window.CountdownConfig : {};
  var config = $.extend(true, {
    'en': {
      and: "and",
      second: "second",
      seconds: "seconds",
      minute: "minute",
      minutes: "minutes",
      hour: "hour",
      hours: "hours",
      day: "day",
      days: "days"
    },
    'fr': {
      and: "et",
      second: "seconde",
      seconds: "secondes",
      minute: "minute",
      minutes: "minutes",
      hour: "heure",
      hours: "heures",
      day: "jour",
      days: "jours"
    },
    'es': {
      and: "",
      second: "",
      seconds: "",
      minute: ":",
      minutes: ":",
      hour: ":",
      hours: ":",
      day: ":",
      days: ":"
    },
    'de': {
      and: "und",
      second: "Sekunde",
      seconds: "Sekunden",
      minute: "Minute",
      minutes: "Minuten",
      hour: "Stunde",
      hours: "Stunden",
      day: "Tag",
      days: "Tage"
    },
    'it': {
      and: "e",
      second: "secondo",
      seconds: "secondi",
      minute: "minuto",
      minutes: "minuti",
      hour: "ora",
      hours: "ore",
      day: "giorno",
      days: "giorni"
    },
    'pl': {
      and: "i",
      second: "sekund(y)",
      seconds: "sekund(y)",
      minute: "minut(y)",
      minutes: "minut(y)",
      hour: "godzin(y)",
      hours: "godzin(y)",
      day: "dni",
      days: "dni"
    },
    'hu': {
      and: "és",
      second: "másodperc",
      seconds: "másodpercek",
      minute: "perc",
      minutes: "percek",
      hour: "óra",
      hours: "órák",
      day: "nap",
      days: "napok"
    }
  }, userconfig);
 
  // define language
  function msg(name) {
    if ( wgContentLanguage in config && name in config[wgContentLanguage] ) {
      return config[wgContentLanguage][name];
    }
    return config.en[name];
  }
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
  }
 
  // calculate the diff
  if ((diff%60) == 1) {
    left = (diff%60) + msg('second');
  } else {
    left = (diff%60) + msg('seconds');
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + msg('minute') + left;
    } else {
      left = (diff%60) + msg('minutes') + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + msg('hour') + left;
    } else {
      left = (diff%24) + msg('hours') + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + msg('day') + left;
    } else {
      left = diff + msg('days') + left;
    }
  }
  timers[i].firstChild.nodeValue = left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  // hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  // set up global objects timers and timeouts.
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
//  End of Code                                     *
// **************************************************