/* A Monobook felületet használó szerkesztők számára betöltendő JavaScriptek */

importScript('MediaWiki:Functions.js');
importScript('MediaWiki:Common.js');
importScriptPage('MediaWiki:Common.js/displayTimer.js');

/* tooltips and access keys */
ta = new Object();
ta['pt-userpage'] = new Array('.','My user page');
ta['pt-anonuserpage'] = new Array('.','The user page for the ip you\'re editing as');
ta['pt-mytalk'] = new Array('n','My talk page');
ta['pt-anontalk'] = new Array('n','Discussion about edits from this ip address');
ta['pt-preferences'] = new Array('','My preferences');
ta['pt-watchlist'] = new Array('l','The list of pages you\'re monitoring for changes.');
ta['pt-mycontris'] = new Array('y','List of my contributions');
ta['pt-login'] = new Array('o','You are encouraged to log in, it is not mandatory however.');
ta['pt-anonlogin'] = new Array('o','You are encouraged to log in, it is not mandatory however.');
ta['pt-logout'] = new Array('o','Log out');
ta['ca-talk'] = new Array('t','Discussion about the content page');
ta['ca-edit'] = new Array('e','You can edit this page. Please use the preview button before saving.');
ta['ca-addsection'] = new Array('+','Add a comment to this discussion.');
ta['ca-viewsource'] = new Array('e','This page is protected. You can view its source.');
ta['ca-history'] = new Array('h','Past versions of this page.');
ta['ca-protect'] = new Array('=','Protect this page');
ta['ca-delete'] = new Array('d','Delete this page');
ta['ca-undelete'] = new Array('d','Restore the edits done to this page before it was deleted');
ta['ca-move'] = new Array('m','Move this page');
ta['ca-watch'] = new Array('w','Add this page to your watchlist');
ta['ca-unwatch'] = new Array('w','Remove this page from your watchlist');
ta['search'] = new Array('f','Search this wiki');
ta['p-logo'] = new Array('','Main Page');
ta['n-mainpage'] = new Array('z','Visit the Main Page');
ta['n-portal'] = new Array('','About the project, what you can do, where to find things');
ta['n-currentevents'] = new Array('','Find background information on current events');
ta['n-recentchanges'] = new Array('r','The list of recent changes in the wiki.');
ta['n-randompage'] = new Array('x','Load a random page');
ta['n-help'] = new Array('','The place to find out.');
ta['n-sitesupport'] = new Array('','Support us');
ta['t-whatlinkshere'] = new Array('j','List of all wiki pages that link here');
ta['t-recentchangeslinked'] = new Array('k','Recent changes in pages linked from this page');
ta['feed-rss'] = new Array('','RSS feed for this page');
ta['feed-atom'] = new Array('','Atom feed for this page');
ta['t-contributions'] = new Array('','View the list of contributions of this user');
ta['t-emailuser'] = new Array('','Send a mail to this user');
ta['t-upload'] = new Array('u','Upload images or media files');
ta['t-specialpages'] = new Array('q','List of all special pages');
ta['ca-nstab-main'] = new Array('c','View the content page');
ta['ca-nstab-user'] = new Array('c','View the user page');
ta['ca-nstab-media'] = new Array('c','View the media page');
ta['ca-nstab-special'] = new Array('','This is a special page, you can\'t edit the page itself.');
ta['ca-nstab-project'] = new Array('a','View the project page');
ta['ca-nstab-image'] = new Array('c','View the image page');
ta['ca-nstab-mediawiki'] = new Array('c','View the system message');
ta['ca-nstab-template'] = new Array('c','View the template');
ta['ca-nstab-help'] = new Array('c','View the help page');
ta['ca-nstab-category'] = new Array('c','View the category page');
ta['ca-nstab-forum'] = new Array('c','View the forum page');



/********************************************
***** PRELOADABLE TEMPLATE SYSTEM ***********
*********************************************
** from [[starwars:User:Sikon/preload.js]] **
*********************************************
  This system moved here from common.js,
  where it was causing problems with Safari
  in Wikia skin.  A new Wikia solution has
  been implemented at wikia.js.  If this
  version causes problems in Monobook, then
  thought will have to be given to moving
  the solution at wikia.js to common.js
  in order to force that solution to work
  for both skins. 
*********************************************/

document.write('<script type="text/javascript" src="' 
    + '/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript"></script>');

function fillPreloads()
{
    var div = document.getElementById("lf-preload");

    if(div == null)
        return;

    div.style.display = 'block';
    var span = document.getElementById('lf-preload-cbox');

    var comboString = "<select id='stdPreloads' onchange='onPreloadChange()'>";
    comboString += "</select>";
    span.innerHTML = comboString;
    
    span = document.getElementById('lf-preload-pagename');
    span.innerHTML = '<input type="text" class="textbox" />';
    span = document.getElementById('lf-preload-button');
    span.innerHTML = '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />';

    requestComboFill('stdPreloads', "Template:Stdpreloads");
}

function doCustomPreload()
{
    doPreload(document.getElementById('lf-preload-pagename').getElementsByTagName('input')[0].value);
}

function onPreloadChange()
{
    var combo = document.getElementById("stdPreloads");
    var value = combo.options[combo.selectedIndex].value;

    if(value == "")
        return;

    value = "Template:" + value + "/preload";
    value = value.replace(" ", "_");
    doPreload(value);
}

addOnloadHook(fillPreloads);

/* Preload system ends */


// Shameless import from es.pokemon.wikia.com
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
function PositionToolboxElements() {
	var wikicitieshome = $('#n-wikicitieshome');
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
 
	$('#t-multiupload').children().eq(0).text('Multiple upload');
 
	$('#t-contributions').before('<hr style="margin: 3px; background-color: #2f2cb8;color:white;" />');
	$('#t-print').before('<hr style="margin: 3px; background-color: #2f2cb8;color:white;" />');
	$('#t-upload').before('<hr style="margin: 3px; background-color: #2f2cb8;color:white;" />');
	$('#t-whatlinkshere').before('<hr style="margin: 3px; background-color: #2f2cb8;color:white;" />');
 
	$('#p-wikicities-nav').children().eq(0).text('community');
	$('#p-wikicities-nav').children().eq(1).children().eq(2).children().eq(0).attr('id','n-activityfeed');
	$('#p-wikicities-nav').children().eq(1).children().eq(2).children().eq(0).children().eq(0).text('recent activity');
	$('#p-wikicities-nav').children().eq(1).children().eq(2).children().eq(0).children().eq(0).attr('href','http://tardis.wikia.com/wiki/Special:RecentChanges');
 
	$('#p-wikicities-nav').children().eq(1).children().eq(0)
	.prepend($('#n-wikicitieshome'))
	.prepend($('#n-irc'))
	.prepend($('#n-activityfeed'));
 
	$('#p-lang').before($('#p-wikicities-nav'));
 
	addPortletLink('p-tb', 'http://www.google.com/custom?domains=tardis.wikia.com&sitesearch=tardis.wikia.com&sa=Search&client=pub-4086838842346968&forid=1&channel=6987656965&ie=UTF-8&oe=UTF-8&cof=GALT%3A%2346ABFF%3BGL%3A1%3BDIV%3A%23FFCA2B%3BVLC%3A4274FF%3BAH%3Acenter%3BBGC%3AFFFAD9%3BLBGC%3AFFCA2B%3BALC%3A002bb8%3BLC%3A002bb8%3BT%3A000000%3BGFNT002bb8%3BGIMP002bb8%3BLH%3A100%3BLW%3A100%3BL%3Ahttp%3A%2F%2Fimages.wikia.com%2Ftardis%2Fimages%2Fb%2Fb5%2FLogo_Buscador_Google.png%3BS%3Ahttp%3A%2F%2Ftardis.wikia.com%2F%3BLP%3A1%3BFORID%3A1%3B&hl=en', 'Google Search', 't-googlesearch', 'Search the Data Core using Google', false, $('#n-recentchanges').next().get(0));
}
$(PositionToolboxElements);

// ShoutBox en Monobook - LazyLoad para no molestar a quienes no quieran tenerlo abierto y tarde menos en cargar
/* Turning this off, because I'm getting errors that it can't find  variable $UT
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
*/
//End Shameless import