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