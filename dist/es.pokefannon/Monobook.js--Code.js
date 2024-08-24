{{:MediaWiki:Common.js/Code.js}}
window.wgIRCUrl = '{{:MediaWiki:Irc-url}}';
/* MediaWiki:Monobook.js v2.22 <pre> */

try {
	if (window.CreaEnlacesDex) {
		CreaEnlacesDex.registerRenderFn(function() {
			$('#p-tb').after('<div class="portlet" id="p-dexlinks"><h5>Otras Pokédex</h5><div class="pBody"><ul></ul></div></div>');
		});
		CreaEnlacesDex.registerLinkFn(function(url, text, caption) {
			addPortletLink('p-dexlinks', url, text, false, caption);
		});
		(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(CreaEnlacesDex.init);
	}
} catch(e) {
	typeof(window.trataError)=='function'&&trataError(e);
}

/* alternateBG: Agrega un class al body durante los primeros 30 min de cada hora */
(function () {
	var d = new Date();
	if (d.getMinutes() < 30) {
		try {
			document.body.className += ' alternateBG';
		} catch(e) {
			(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass('alternateBG')});
		}
	}
}());
function FondoFooter() {
	$('#globalWrapper').append($('#footer'));
}
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(FondoFooter);
/* fin alternateBG */

/* MONOBOOK SIDEBAR */
// Para editar los elementos del sidebar, cambiar [[MediaWiki:Monobook.js/Sidebar.js]]
window.wgSidebar = (window.wgSidebar||{});
importScript('MediaWiki:Monobook.js/Sidebar.js');

/*
* MonobookSidebar v1.1: Permite definir submenús para elementos del Sidebar de MonoBook, agregando clases
* especiales al pasar con el puntero por encima para permitir el efecto en todos los navegadores.
*
* Copyright (C) 2010  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 2 of the License, or
*   (at your option) any later version
*/
MonobookSidebar = {
	re_s: / /g,
	re_p: /%/g,
	loadedMenus: [],
	init: function() {
		if (!window.wgSidebar) return;
		for (var menu in wgSidebar) {
			var item = document.getElementById(MonobookSidebar.getId(menu));
			if (!item) continue;
			var menuId = $(item).parents().get(2).id;
			// Check it's a valid portlet item
			if (!menuId || menuId == '') continue;
			// Generate menu hierarchy
			MonobookSidebar.buildSubmenu(item, wgSidebar[menu]);
			// Set events
			MonobookSidebar.setEvents(menuId);
		}
	},
	buildSubmenu: function(el, arr) {
		var ul = document.createElement('ul');
		ul.className = 'sub-menu';
		for (var i = 0; i < arr.length; i++) {
			var li = document.createElement('li');
			if (typeof arr[i] == 'string') {
				var a = MonobookSidebar.linkFromText(arr[i]);
				li.appendChild(a);
			} else {
				for (var menukey in arr[i]) {
					a = MonobookSidebar.linkFromText(menukey);
					li.appendChild(a);
					MonobookSidebar.buildSubmenu(li, arr[i][menukey]);
				}
			}
			ul.appendChild(li);
		}
		el.appendChild(ul);
		el.className = 'with-sub-menu';
		var em = document.createElement('em');
		em.appendChild(document.createTextNode('\u203A'));
		el.firstChild.appendChild(em);
	},
	setEvents: function(menuId) {
		for (var i = 0; i < MonobookSidebar.loadedMenus; i++) {
			if (MonobookSidebar.loadedMenus[i] == menuId) return;
		}
		$('#'+menuId).children().eq(1).children().eq(0).bind('mouseover',MonobookSidebar.mouseover).bind('mouseout',MonobookSidebar.mouseout);
		MonobookSidebar.loadedMenus.push(menuId);
	},
	mouseover: function(e) {
		var target = e.target;
		while (target.tagName.toLowerCase() != 'div') {
			if (target.tagName.toLowerCase() == 'a') {
				target = target.parentNode;
			}
			if (target.tagName.toLowerCase() == 'li') {
				$(target).addClass('hover');
			}
			target = target.parentNode;
		}
	},
	mouseout: function(e) {
		var target = e.target;
		while (target.tagName.toLowerCase() != 'div') {
			if (target.tagName.toLowerCase() == 'a') {
				target = target.parentNode;
			}
			if (target.tagName.toLowerCase() == 'li') {
				$(target).removeClass('hover');
			}
			target = target.parentNode;
		}
	},
	linkFromText: function(txt) {
		var article = '', caption = '', sepPos = txt.indexOf('|');
		if (sepPos > 0) {
			article = txt.substr(0, sepPos);
			caption = txt.substr(sepPos+1);
		} else {
			article = caption = txt;
		}
		var a = document.createElement('a');
		if (article.length > 7 && article.substr(0,7) == 'http://') {
			a.setAttribute('href',article);
		} else {
			article = encodeURIComponent(article.replace(MonobookSidebar.re_s, '_'));
			a.setAttribute('href',wgArticlePath.replace('$1',article));
		}
		a.appendChild(document.createTextNode(caption));
		return a;
	},
	getId: function(name) {
		return 'n-' + encodeURIComponent(name.replace(MonobookSidebar.re_s, '-')).replace(MonobookSidebar.re_p, '.');
	}
};

// Mueve cambios recientes a toolbox
function PosicionaElementosToolbox() {
	$('#p-tb').children().eq(1).children().eq(0)
	// Opciones en páginas de usuario
	.prepend($('#t-emailuser'))
	.prepend($('#t-blockip'))
	.prepend($('#t-log'))
	.prepend($('#t-contributions'))
	// 'Enlace permanente' y 'Versión para imprimir'
	.prepend($('#t-permalink'))
	.prepend($('#t-print'))
	// Opciones principales
	.prepend($('#t-specialpages'))
	.prepend($('#t-recentchangeslinked'))
	.prepend($('#t-whatlinkshere'))
	.prepend($('#t-multiupload'))
	.prepend($('#t-upload'))
	.prepend($('#n-randompage'))
	.prepend($('#t-googlesearch'))
	.prepend($('#n-recentchanges'));

	if ($('#t-multiupload').length == 0 && $('#t-upload').length == 1) {
		$('<a></a>').prop('href', wgArticlePath.replace('$1', 'Especial:MultipleUpload')).wrap('<li id="t-multiupload"></li>').parent().insertAfter('#t-upload');
	}
	$('#t-multiupload').children().eq(0).text('Subir varios archivos');

	$('#t-contributions').before('<hr style="margin: 5px; margin-bottom: -1px; background-color: #E2A600;" />');
	$('#t-print').before('<hr style="margin: 5px; margin-bottom: -1px; background-color: #E2A600;" />');
	$('#t-upload').before('<hr style="margin: 5px; margin-bottom: -1px; background-color: #E2A600;" />');
	$('#t-whatlinkshere').before('<hr style="margin: 5px; margin-bottom: -1px; background-color: #E2A600;" />');

	addPortletLink('p-tb', window.wgIRCUrl, 'Chat de soporte', 'n-irc', 'Accede al chat de WikiDex', false, $('#n-recentchanges').next().get(0));
	addPortletLink('p-tb', 'https://www.google.com/cse/home?cx=012049278226999628206:45yxdtixipa', 'Búsqueda Google', 't-googlesearch', 'Buscar en WikiDex usando el buscador de Google', false, $('#n-recentchanges').next().get(0));
}
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(PosicionaElementosToolbox);

//Traduce los enlaces del pie de página y añade 'disclaminer' sobre Pokémon
function TraducirFooter() {
	$('#about').children().eq(0).text('Sobre Wikia');
	$('#contact').children().eq(0).text('Contactar con Wikia');
	$('#disclaimer').children().eq(0).text('Términos de uso');
	$('#privacy').children().eq(0).text('Privacidad');
	$('#hosting').append('<br />Nintendo, Pokémon y el resto de nombres relacionados son propiedad de Nintendo, Creatures, Game Freak, TV Tokyo, ShoPro y JR Kikaku.<br />Imágenes, audio y vídeo se utilizan de acuerdo a los términos del Fair Use.');
}
if (window.wgUserLanguage == 'es') {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(TraducirFooter);
}

//Cambia la pestaña 'Artículo' por 'Portada' en la portada
function TabPortada() {
	$('#ca-nstab-main').children().text('Portada');
}

if (window.wgIsMainpage) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(TabPortada);
}

// Reescribe el enlace de login de Wikia para que no haga una redirección y pierda el useskin=monobook, es muy molesto cuando se cierra la sesión
if (!window.wgUserName) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		var a = $('#pt-login').children('a').eq(0);
		a.attr('href', a.attr('href').replace('Especial:Entrar', 'Especial:Signup'));
	});
}

// UserWikiInfo
if ((window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Contributions') || (window.wgCanonicalNamespace == 'User' || window.wgCanonicalNamespace == 'User_talk' || window.wgCanonicalNamespace == 'Usuario_Blog')) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		if (!window.disableUserWikiInfo) {
			importScript('MediaWiki:Common.js/Clases/UserWikiInfo.js');
		}
	});
}

/* WMU en Monobook */
if (window.wgAction == 'edit' || window.wgAction == 'submit') {
	/*GLOBAL WMU VARS*/
	window.wmu_back = "volver";
	window.wmu_imagebutton = "Agregar imágenes";
	window.wmu_close = "cerrar";
	window.wmu_no_preview = "No se puede agregar imágenes desde la página en modo de previsualización";
	window.wmu_warn1 = "Debes especificar el texto a buscar";
	window.wmu_warn2 = "Selecciona primero el archivo a subir";
	window.wmu_warn3 = "¡Es necesario especificar el nombre del archivo primero!";
	window.wmu_bad_extension = "El tipo de archivo que intentas subir no está permitido. Puedes consultar la lista de extensiones soportadas en [[Especial:Version]].";
	window.wmu_show_message = "mostrar mensaje";
	window.wmu_hide_message = "ocultar mensaje";
	window.wmu_show_license_message = "mostrar licencia";
	window.wmu_hide_license_message = "ocultar licencia";
	window.wmu_max_thumb = "Se ha superado el tamaño máximo de la miniatura. Se devolverá al tamaño original.";
	importScript('MediaWiki:Common.js/Extra/WikiaWMU.js');
	importStylesheetURI(wgExtensionsPath+'/wikia/WikiaMiniUpload/css/WMU.css?'+wgStyleVersion);
}
/* fin WMU en Monobook */

// Arreglo Special:Search, roto por culpa de Wikia y su "tracking system"
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
	if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Search') {
		if (!$.tracker) {
			$.tracker = {};
		}
		if (!$.tracker.byStr) {
			$.tracker.byStr = function() {};
		}
		if (!$.internalTrack) {
			$.internalTrack = function(a, b, c) {c();};
		}
	}
});

// Añade un 'span' que sirve para añadir una imagen de fondo a la barra de categorías
function ImagenCatlinks() {
	$('#mw-normal-catlinks').before('<span id="catlinks-background-image">&nbsp;</span>');
}
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(ImagenCatlinks);

/* </pre> */