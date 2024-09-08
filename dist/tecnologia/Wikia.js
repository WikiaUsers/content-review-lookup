/* Por [[w:User:Rappy 4187|Rappy 4187]] */
$(function addMastheadTags() {
  if ($('#UserProfileMasthead')) {
    var rights = {};
 
    rights["Master Riolu"]  = ["Reversor"];
    rights["Ultimate gigante"]  = ["Reversor"];
    
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
      $('.UserProfileMasthead .masthead-info span.tag').remove();
        for( var i=0, len=rights[user].length; i < len; i++) {
          $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
  }
});

/* Agrega una notificación en oasis. Por [[w:c:es.pokemon:User:Ciencia Al Poder]] */
window.SkinNotification = {
	article: 'Usuario_Blog:Ultimate_gigante/1.000_paginas',
	key: 'NfSkin',
	init: function() {
		if (!document.cookie || document.cookie.length == 0) return;
		var pref = $.cookies.get(SkinNotification.key);
		if (pref) return;
		SkinNotification.render();
	},
	render: function() {
		var tb = $('#WikiaFooter').children('div.toolbar');
		if (!tb.exists()) return;
		var nf = $('#WikiaNotifications');
		if (!nf.exists()) {
			tb.prepend('<ul id="WikiaNotifications" class="WikiaNotifications"><li></li></ul>');
			nf = $('#WikiaNotifications');
			$(document.body).addClass('notifications');
		}
		var sn = $('<div data-type="100"><a class="sprite close-notification"></a>Tecnología Wiki llego a los 1.000 artículos<a href="'+wgServer+wgArticlePath.replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'"> les damos las gracias a toda la comunidad</a>.</div>');
		nf.children().eq(0).append(sn);
		sn.children().eq(0).click(SkinNotification.dismiss);
	},
	dismiss: function(e) {
		$(e.target).parent().remove();
		$.cookies.set(SkinNotification.key,'1');
	}
};
 
function Tecnología_WikiaSkinLoad() {
	var ug = '';
	if (window.wgUserGroups) {
		ug = wgUserGroups.join(',').toLowerCase();
	}
	if (ug.indexOf('s'+'taf'+'f') == -1 && ug.indexOf('h'+'elp'+'er') == -1) {
		$(SkinNotification.init);
//		$(agregarEnlaceSkin);
	}
}
 
Tecnología_WikiaSkinLoad();

/* DisplayTimer */
importScript('MediaWiki:Wikia.js/displayTimer.js');

/* agregamos un botón secundario para que expanda el tamaño del contenido */
function CreateContentResizeButton() {
	var headerWidth = $('header#WikiaPageHeader.WikiaPageHeader details').width();
	var contentWidth = $('article#WikiaMainContent.WikiaMainContent').width();
	var catlinksWidth = $('div#catlinks.catlinks').width();
	if(contentWidth < 1000) {
		$('section article header ul.wikia-menu-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Amplía el área de contenido. Tenga en cuenta que se ocultarán la columna derecha."> Expandir </a></ul>');
		$('section article header a.wikia-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Amplía el área de contenido. Tenga en cuenta que se ocultarán la columna derecha."> Expandir </a></ul>');
		$('section article header a.view-source').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Amplía el área de contenido. Tenga en cuenta que se ocultarán la columna derecha."> Expandir </a></ul>');
		if(wgCanonicalNamespace == 'User_blog') {
			$('section article div#WikiaUserPagesHeader a.wikia-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Amplía el área de contenido. Tenga en cuenta que se ocultarán la columna derecha."> Expandir </a></ul>');
		}
	}
}
 
addOnloadHook(CreateContentResizeButton);
 
function ExpandContent(headerWidth, contentWidth, catlinksWidth) {
	$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": '980px'});
	$('article#WikiaMainContent.WikiaMainContent').css({"width": '1000px'});
	$('div#catlinks.catlinks').css({"width": '1000px'});
	$('div#WikiaRail.WikiaRail').css({"display": 'none'});
	$('ul#resizeButton').replaceWith('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="CompressContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Comprimir el área de contenido a su ancho original, y restaurar la columna derecha."> Comprimir </a></ul>');
}
 
function CompressContent(headerWidth, contentWidth, catlinksWidth) {
	$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": headerWidth});
	$('article#WikiaMainContent.WikiaMainContent').css({"width": contentWidth});
	$('div#catlinks.catlinks').css({"width": catlinksWidth});
	$('div#WikiaRail.WikiaRail').css({"display": 'block'});
	$('ul#resizeButton').replaceWith('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Amplía el área de contenido. Tenga en cuenta que se ocultarán la columna derecha."> Expandir </a></ul>');
}

/* Botón Monobook */
var sfwMonobookSwitch = document.createElement("a");
sfwMonobookSwitch.className = "wikia-button";
sfwMonobookSwitch.id = "SFWMonobookSwitch";
sfwMonobookSwitch.href = "?useskin=monobook";
sfwMonobookSwitch.innerHTML = "Monobook";
document.getElementsByClassName('header-container')[0].appendChild(sfwMonobookSwitch);
/* Fin de Botón Monobook */