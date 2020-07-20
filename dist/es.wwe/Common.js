importScript('MediaWiki:Common.js/HerramientasUtiles.js');
importScript('MediaWiki:Common.js/Expansibles.js');

/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/*****************/
/* NOMBREUSUARIO */
/*****************/

function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
  
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}

addOnloadHook(UserNameReplace);

/*****************/
/* BOTONERA */
/*****************/
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020121342/central/images/8/8f/Button_poeme.png",
     "speedTip": "Nombre del wiki",
     "tagOpen": "World Wrestling Enciclopedia",          
     "tagClose": "",
     "sampleText": ""};

  }

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

// Incluir Gadget-HotCat.js
// Para desactivar, agrega "window.noHotCat = true" en tu Monobook.js
if (wgAction == 'view' && (wgNamespaceNumber == 0 || wgNamespaceNumber == 6 || wgNamespaceNumber == 14)) {
	$(function() {
		if (!document.getElementById('csAddCategorySwitch') && !window.noHotCat) {
			importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
		}
	});
}

/* == Enlaces "editar" al lado del texto ==
Para desactivar, pon window.oldEditsectionLinks=1; en tu monobook.js
*/
function moveEditSection(){
	if (window.oldEditsectionLinks) return;
	for (var i=1;i<7;i++){
		for (var j=0,hs=document.getElementsByTagName('h'+i.toString());j<hs.length;j++){
			var ss=$UT.getElementsByClassName('editsection', 'span', hs[j]);
			if (ss.length !== 0){
				ss[0].className+=' editsection-nf';
				ss[0].removeAttribute('style'); // BigButton fix
				hs[j].appendChild(ss[0]);
			}
		}
	}
}

$(moveEditSection);

function setupMultipleUpload(){
	var f = $G('upload');
	if (!f) return;
	// Convertir descripcion en textarea
	var table = f.getElementsByTagName('table')[0], contador = 0;
	for (var i = 0, rs = table.rows; i < rs.length; i++){
		if (rs[i].cells.length < 3) continue;
		var c = rs[i].cells[2];
		if (c.getElementsByTagName('input').length == 0) continue;
		var oldValue = c.getElementsByTagName('input')[0].value,
			newName = 'wpUploadDescription_'+contador.toString();
		while (c.firstChild) c.removeChild(c.firstChild);
		c.appendChild($UT.create('textarea', {tabindex:'3', 'name':newName, 'id':newName}, oldValue));
		contador++;
	}
	// Tamaño normal en selector de licencia
	if ($G('wpLicense')) $G('wpLicense').removeAttribute('style');
}

if (wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName === 'MultipleUpload'){
	$(setupMultipleUpload);
}

/* === Sorttable corregido/mejorado ===
Al ordenar tablas donde una columna contenga sólo imágenes, se produce un error.
*/
window.ts_getInnerText = function(el){
	return $UT.getInnerText(el);
};
/* === Extensiones en minúscula al subir archivos === */
function adaptUploadFilename(){
	var ff = $G('mw-upload-form').wpDestFile;
	var fn = ff.value;
	if (fn.length < 4) return;
	var fe = fn.substr(fn.length-4,4);
	if (fe != fe.toLowerCase())
		ff.value = ff.value.substr(0,fn.length-4)+fe.toLowerCase();
}

$(function(){
	var uf = $G('mw-upload-form');
	if (uf && uf.wpDestFile) $UT.addHandler(uf,'submit',adaptUploadFilename);
});

/* Marcar con [RTE] las ediciones hechas con el RTE activado
function editSummaryCheckRTE() {
	if (!$('#wysiwygData').length) return;
	var tag = '[RTE]';
	if ($('#editform').hasClass('source_mode')) {
		tag = '[RTEs]';
	}
	var wps = $('#wpSummaryEnhanced').get(0);
	if ((wps.value).indexOf(tag) != 0) {
		wps.value = tag + ' ' + wps.value;
	}
	return 1;
}

if (wgAction == 'edit' || wgAction == 'submit') {
	$(function(){
		$('#wpSave').bind('click',editSummaryCheckRTE);
	});
}*/

/*== Funciones para administradores */
function loadSysopTools() {
	if (!window.wgUserGroups) return;
	for (var i = 0; i < wgUserGroups.length; i++) {
		if (wgUserGroups[i] == 'sysop') {
			importScript('MediaWiki:Common.js/Extra/SysopTools.js');
			break;
		}
	}
}

loadSysopTools();

// Añadir encabezado (h2) en 'category-gallery' (solo categorías)
function encabezadoCategorias() {
	$('.category-gallery').before('<h2>Muestrario de la categoría</h2>');
}

// TOC en categorías
function TOCCategorias() {
	$('#firstHeading').after('<ul id="categorytoc"><li style="font-weight:bold;">Contenidos:</li><li><a href="#mw-subcategories">Subcategorías</a></li> &#124; <li><a href="#mw-pages">Artículos</a></li> &#124; <li><a href="#mw-category-media">Archivos</a></li> &#124; <li><a href="#catlinks">Categorías</a></li></ul>');
	$('div.pagingLinks').prepend('<span style="font-weight:bold;">Navegación: </span>');
}
if (window.wgNamespaceNumber == 14 && window.wgAction == 'view') {
	$(TOCCategorias);
	$(encabezadoCategorias);
}

// Arregla los enlaces de los resultados de búsqueda
function fixSearchResultLinks() {
	$('ul.mw-search-results').find('a').each(function() {
		var a = $(this);
		a.attr('href', wgArticlePath.replace('$1', encodeURIComponent(a.text().replace(new RegExp(' ', 'g'), '_')).replace(new RegExp('%3A','g'),':')));
	});
}

if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Search') {
	$(fixSearchResultLinks);
}

// Incluir Gadget-HotCat.js
// Para desactivar, agrega "window.noHotCat = true" en tu Monobook.js
if (window.skin != 'oasis' && wgAction == 'view' &&
		(wgNamespaceNumber == 0 || wgNamespaceNumber == 6 || wgNamespaceNumber == 14) &&
		window.location.toString().indexOf('diff=') == -1) {
	$(function() {
		if (!document.getElementById('csAddCategorySwitch') && !window.noHotCat) {
			if ($('#catlinks').length == 0) {
				$('#bodyContent').children('div.printfooter').after('<div id="catlinks" class="catlinks"></div>');
			}
			if ($('#mw-normal-catlinks').length == 0) {
				$('#catlinks').prepend('<div id="mw-normal-catlinks"><a title="Especial:Categorías" href="'+wgArticlePath.replace('$1', 'Especial:Categorías')+'">Categorías</a></div>');
			}
			$('#mw-normal-catlinks').children('a').eq(0).after('<span class="noprint">&nbsp;<span>(<a style="cursor: pointer;" title="Modificar categorías"><span>+<sup>+</sup></span></a>)</span></span>').next().find('a').click(function() {
				$(this).unbind().parents('span.noprint').eq(0).remove();
				importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
				return false;
			});
			$('#catlinks').removeClass('catlinks-allhidden');
		}
	});
} else if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Upload') {
	importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
}

// Page tracker
try {
	$(function() {
		for (var i = 0, js = document.getElementsByTagName('script'); i < js.length; i++) {
			if (js[i].src && js[i].src.indexOf('.google-analytics.com/ga.js') != -1) {
				return;
			}
		}
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	});
} catch(e) {window._gaJSerror2 = e;}
// End Page tracker
//</pre>