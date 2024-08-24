{{:MediaWiki:Common.js/Debug.js}}
/* MediaWiki:Monobook.js v2.9 <pre> */
importStylesheetURI('https://images.wikia.nocookie.net/common/__cb35954/skins/wikia/shared.css?35953');
$(function() {
	if(window.CreaEnlacesDex){
		CreaEnlacesDex.prototype.link = function(url, text, caption){
			if (!document.getElementById('p-dexlinks')){
				$('#p-tb').after('<div class="portlet" id="p-dexlinks"><h5>Otras Pokédex</h5><div class="pBody"><ul></ul></div></div>');
			}
			addPortletLink('p-dexlinks', url, text, false, caption);
		}
	}
});
 
/* alternateBG: Agrega un class al body durante los primeros 30 min de cada hora */
(function () {
	var d = new Date();
	if (d.getMinutes() < 30) {
		try {
			document.body.className += ' alternateBG';
		} catch(e) {
			$(function(){$(document.body).addClass('alternateBG')});
		}
	}
}());
function FondoFooter() {
$('#globalWrapper').append($('#footer'));
}
$(FondoFooter);
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
 
	$('#t-multiupload').children().eq(0).text('Subir varios archivos');
 
	$('#n-wikicitieshome').children().eq(0).text('Wikia en español');
	$('#n-irc').children().eq(0).attr('href','http://webchat.freenode.net/?channels=WikiDex&uio=Mj10cnVlJjk9dHJ1ZSYxMT0zMQ46');
 
	$('#t-contributions').before('<hr style="margin: 5px; margin-bottom: -1px; background-color: #E2A600;" />');
	$('#t-print').before('<hr style="margin: 5px; margin-bottom: -1px; background-color: #E2A600;" />');
	$('#t-upload').before('<hr style="margin: 5px; margin-bottom: -1px; background-color: #E2A600;" />');
	$('#t-whatlinkshere').before('<hr style="margin: 5px; margin-bottom: -1px; background-color: #E2A600;" />');
 
	$('#p-wikicities-nav').children().eq(0).text('Comunidad');
	$('#p-wikicities-nav').children().eq(1).children().eq(2).children().eq(0).attr('id','n-activityfeed');
	$('#p-wikicities-nav').children().eq(1).children().eq(2).children().eq(0).children().eq(0).text('Actividad reciente');
	$('#p-wikicities-nav').children().eq(1).children().eq(2).children().eq(0).children().eq(0).attr('href','http://es.pokemon.wikia.com/wiki/Especial:CambiosRecientes');
 
	$('#p-wikicities-nav').children().eq(1).children().eq(0)
	.prepend($('#n-wikicitieshome'))
	.prepend($('#n-irc'))
	.prepend($('#n-activityfeed'));
 
	$('#p-lang').before($('#p-wikicities-nav'));
 
	addPortletLink('p-tb', 'http://www.google.com/custom?domains=es.pokemon.wikia.com&sitesearch=es.pokemon.wikia.com&sa=Search&client=pub-4086838842346968&forid=1&channel=6987656965&ie=UTF-8&oe=UTF-8&cof=GALT%3A%2346ABFF%3BGL%3A1%3BDIV%3A%23FFCA2B%3BVLC%3A4274FF%3BAH%3Acenter%3BBGC%3AFFFAD9%3BLBGC%3AFFCA2B%3BALC%3A002bb8%3BLC%3A002bb8%3BT%3A000000%3BGFNT002bb8%3BGIMP002bb8%3BLH%3A100%3BLW%3A100%3BL%3Ahttp%3A%2F%2Fimages.wikia.com%2Fes.pokemon%2Fimages%2Fb%2Fb5%2FLogo_Buscador_Google.png%3BS%3Ahttp%3A%2F%2Fes.pokemon.wikia.com%2F%3BLP%3A1%3BFORID%3A1%3B&hl=es', 'Búsqueda Google', 't-googlesearch', 'Buscar en WikiDex usando el buscador de Google', false, $('#n-recentchanges').next().get(0));
}
$(PosicionaElementosToolbox);
 
//Traduce los enlaces del pie de página y añade 'disclaminer' sobre Pokémon
function TraducirFooter() {
	$('#about').children().eq(0).text('Sobre Wikia');
	$('#contact').children().eq(0).text('Contactar con Wikia');
	$('#disclaimer').children().eq(0).text('Términos de uso');
	$('#privacy').children().eq(0).text('Privacidad');
	$('#hosting').append('<br />Nintendo, Pokémon y el resto de nombres relacionados son propiedad de Nintendo, Creatures, Game Freak, TV Tokyo, ShoPro y JR Kikaku.<br />Imágenes, audio y vídeo se utilizan de acuerdo a los términos del Fair Use.');
}
if (window.wgUserLanguage == 'es') {
	$(TraducirFooter);
}
 
//Cambia la pestaña 'Artículo' por 'Portada' en la portada
function TabPortada() {
	$('#ca-nstab-main').children().text('Portada');
}
 
if (window.wgIsMainpage) {
	$(TabPortada);
}
 
// Reescribe el enlace de login de Wikia para que no haga una redirección y pierda el useskin=monobook, es muy molesto cuando se cierra la sesión
if (!window.wgUserName) {
	$(function() {
		var a = $('#pt-login').children('a').eq(0);
		a.attr('href', a.attr('href').replace('Especial:Entrar', 'Especial:Signup'));
	});
}
 
// UserWikiInfo
if (!window.disableUserWikiInfo && ((window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Contributions') || (window.wgCanonicalNamespace == 'User' || window.wgCanonicalNamespace == 'User_talk' || window.wgCanonicalNamespace == 'Usuario_Blog'))) {
	if (window.wgAfterContentAndJS) {
		wgAfterContentAndJS.push(function() {
			importScript('MediaWiki:Common.js/Clases/UserWikiInfo.js');
		});
	} else {
		$(function() {
			importScript('MediaWiki:Common.js/Clases/UserWikiInfo.js');
		});
	}
}
 
// ShoutBox en Monobook - LazyLoad para no molestar a quienes no quieran tenerlo abierto y tarde menos en cargar
function loadShoutBox() {
	if (window.wgUserName) {
		if ($UT.cookie('WSB')) {
			importScript('MediaWiki:Common.js/Clases/WikiaShoutBox.js');
		} else {
			$('<div id="p-sb" class="portlet"><h5>Chat <a href="#" class="WidgetSprite start" title="Mostrar"><img src="'+window.wgBlankImgUrl+'" width="12" height="12"/></a></h5><div class="pBody"></div></div>').insertAfter('#p-tb');
			$('#p-sb').children('h5').children('a.WidgetSprite.start').click(function() {
				$UT.cookie('WSB', '1');
				importScript('MediaWiki:Common.js/Clases/WikiaShoutBox.js');
				$('#p-sb').find('a').unbind().end().remove();
				return false;
			});
		}
	}
}
$(loadShoutBox);
 
/* Arreglo para galerías de tipo slideshow */
function monobook_InitSlideshow() {
	var sld = null;
	for (var it = 0; (sld = document.getElementById('slideshow-'+it.toString())) || document.getElementById('gallery-'+it.toString()); it++) {
		if (!sld) continue;
		$.getScript(stylepath + '/common/jquery/jquery-slideshow-0.4.js?' + wgStyleVersion, function(i) {
			return function() {
				var slideshow = $('#slideshow-'+i.toString());
				var cb = function(index) {
					var item = slideshow.find('li').eq(index);
					if (item.attr('title')) {
						item.css('backgroundImage', 'url(' + item.attr('title') + ')');
						item.removeAttr('title');
					}
				};
				//var item = slideshow.find('li').first();
				var item = slideshow.find('li').eq(0);
				if (item.attr('title')!='') {
					item.css('backgroundImage', 'url(' + item.attr('title') + ')');
				}
				item.removeAttr('title');
				slideshow.slideshow({
					buttonsClass:'wikia-button',
					nextClass:'wikia-slideshow-next',
					prevClass:'wikia-slideshow-prev',
					slideWidth:'300px',
					slidesClass:'wikia-slideshow-images',
					slideCallback: cb
				});
			};
		}(it));
	}
}
 
if (jQuery.prototype.jquery == '1.3.2') {
	wgAfterContentAndJS.push(monobook_InitSlideshow);
}
/* fin arreglo para galerías de tipo slideshow */
 
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
 
// Arreglo Especial:ListaUsuarios
if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Listusers') {
	importScriptURI(wgExtensionsPath+'/wikia/Listusers/js/jquery.dataTables.min.js?'+wgStyleVersion);
}
 
// Añade un 'span' que sirve para añadir una imagen de fondo a la barra de categorías
function ImagenCatlinks() {
$('#mw-normal-catlinks').before('<span id="catlinks-background-image">&nbsp;</span>');
}
$(ImagenCatlinks);
 
/* </pre> */