/*Códigos de Wikia Developers*/
/**Botón volver arriba**/
/**Tabla de contenidos flotante**/
/**Barra de navegación extendida**/
/**Sugerencias de busquedas**/
importArticles({
    type: 'script',
    articles: [
        'u:dev:BackToTopButton/es/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:SearchSuggest/code.js'
    ]
});
/***Oasis Sitenotice*******************************************************
*Muestra el Sitenotice en cada página de la Wikia
*Se muestra como las noticias normales de Wikia
*La noticia tiene que ser actualizada manualmente
después de editar MediaWiki:Sitenotice y MediaWiki:Sitenotice id
*Escrito por el usuario JBed de Final Fantasy Wiki (En Inglés)
 ****************************************************************************/
//Como actualizar el Oasis Sitenotice:
//Ingresa a una página en Monobook usando ?useskin=monobook en la URL,
//Hacer click derecho y seleccionar "Ver código fuente de la página" en tu navegador,
//Ctrl+F y teclea "siteNoticeID",
//Aquí se encontraran 2 líneas,
//Una comenzando con "var siteNoticeID", la otra con "var siteNoticeValue",
//Copiar estas dos líneas y pegarlas sobre las respectivas líneas de abajo
console.log("siteNotice stuff", new Date());

var siteNoticeID = "1.0";
var siteNoticeValue = "\x3cdiv id=\"localNotice\" lang=\"es\" dir=\"ltr\"\x3e\x3ccenter\x3e¡Bienvenido a Skullgirls Wiki!\x3cbr /\x3ePor favor lee las reglas antes de comenzar a editar: \x3ca href=\"/wiki/Skullgirls_Wiki:Reglas\" title=\"Skullgirls Wiki:Reglas\"\x3eSkullgirls Wiki:Reglas\x3c/a\x3e.\x3c/center\x3e\n\x3c/div\x3e";

if (siteNoticeValue !== "") {
  var cookieValue = "";
  var cookieName = "dismissSiteNotice=";
  var cookiePos = document.cookie.indexOf(cookieName);

  if (cookiePos > -1) {
    cookiePos = cookiePos + cookieName.length;
    var endPos = document.cookie.indexOf(";", cookiePos);
    if (endPos > -1) {
      cookieValue = document.cookie.substring(cookiePos, endPos);
    } else {
      cookieValue = document.cookie.substring(cookiePos);
    }
  }
  if (cookieValue != siteNoticeID) {
    function dismissNotice() {
      var date = new Date();
      date.setTime(date.getTime() + 30 * 86400 * 1000);
      document.cookie = cookieName + siteNoticeID + "; expires=" + date.toGMTString() + "; path=/";
      var element = document.getElementById('mw-dismissable-notice');
      element.parentNode.removeChild(element);
    }
    var notice = document.createElement("li");
    notice.id = "mw-dismissable-notice";
    notice.innerHTML = siteNoticeValue;
    var WikiaNotif = document.getElementById("WikiaNotifications");
    if (WikiaNotif) {
      var belowElement = WikiaNotif.getElementsByTagName("ul")[0];
      WikiaNotif.insertBefore(notice, belowElement);
      var getNotice = document.getElementById("localNotice");
      getNotice.innerHTML = '<a class="sprite close-notification" href="javascript:dismissNotice();"></a>' + getNotice.innerHTML;
    } else {
      var barWrapper = document.getElementById("WikiaBarWrapper");
      if (barWrapper) {
        var WikiaNotif = document.createElement("ul");
        WikiaNotif.id = "WikiaNotifications";
        WikiaNotif.className = "WikiaNotifications";
        barWrapper.parentNode.insertBefore(WikiaNotif, barWrapper);
        WikiaNotif.appendChild(notice);
        var getNotice = document.getElementById("localNotice");
        getNotice.innerHTML = '<a class="sprite close-notification" href="javascript:dismissNotice();"></a>' + getNotice.innerHTML;
      }
    }
  }
}
/*Botón de idiomas*/
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['en'] = '<img class="en-image" width="22" height="16" src="https://images.wikia.nocookie.net/elderscrolls/pl/images/8/85/Flag_en.gif" title="Inglés">';
	flags['de'] = '<img class="de-image" width="22" height="16" src="https://images.wikia.nocookie.net/elderscrolls/pl/images/3/34/Flag_de.gif" title="Alemán">';
	flags['es'] = '<img class="es-image" width="22" height="16" src="https://images.wikia.nocookie.net/elderscrolls/pl/images/9/9a/Flag_es.gif" title="Español">';
	flags['fr'] = '<img class="fr-image" width="22" height="16" src="https://images.wikia.nocookie.net/elderscrolls/pl/images/2/22/Flag_fr.gif" title="Francés">';
	flags['pl'] = '<img class="pl-image" width="22" height="16" src="https://images.wikia.nocookie.net/arrow/pl/images/c/ce/Flag_pl.gif" title="Polaco">';
	flags['pt-br'] = '<img class="pt-br-image" width="22" height="16" src="https://images.wikia.nocookie.net/elderscrolls/pl/images/9/90/Flag_pt.gif" title="Portugués Brasileño">';
	flags['ru'] = '<img class="ru-image" width="22" height="16" src="https://images.wikia.nocookie.net/elderscrolls/pl/images/8/88/Flag_ru.gif" title="Ruso">';
	flags['ja'] = '<img class="ja-image" width="22" height="16" src="https://images.wikia.nocookie.net/elderscrolls/pl/images/9/9f/Flag_ja.gif" title="Japonés">';
 
	$('.WikiaPageHeader .comments').after(html);
 
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
			case "English":
				languages['en'] = href;
				break;
			case "Deutsch":
				languages['de'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Português do Brasil":
				languages['pt-br'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "日本語":
				languages['ja'] = href;
				break;
		}
	});
 
	var language = wgContentLanguage;
	$.each(flags, function (key, value) {
		if (key === language) {
			$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
		} 
		else {
			if (languages[key]) {
				$('.WikiaPageHeader .chooselanguage ul').append('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="' + languages[key] + '"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
			}
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('click', function () {
		if ($(this).hasClass('active') === false) {
			$(this).addClass('active');
		} 
		else {
			$(this).removeClass('active');
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('mouseleave', function () {
		var that = this;
		var timeOut = setTimeout(function () { $(that).removeClass('active'); }, 500);
 
		$('.chooselanguage').on('mouseenter', function () {
			clearTimeout(timeOut);
		});
	});
}
if( $('.WikiaArticleInterlang').length > 0 ) {
	addOnloadHook(appendLanguageDropdown);
}
 
jQuery( function($) {
	var track = Wikia.Tracker.buildTrackingFunction({
		category: 'interlanguage-nav',
		action: Wikia.Tracker.ACTIONS.CLICK,
		trackingMethod: 'ga'
	});
 
	var $WikiaInterlanguageDefaultLink = $('nav.WikiaArticleInterlang');
	$WikiaInterlanguageDefaultLink.on( 'mousedown', 'a', function(e) {
		track({
			browserEvent: e,
			label: 'interlanguage-deafult-link'
		});
	} );
 
	var $WikiaInterlanguageCustomLink = $('.WikiaPageHeader');
	$WikiaInterlanguageCustomLink.on( 'mousedown', '.chooselanguage a', function(e) {
		track({
			browserEvent: e,
			label: 'interlanguage-custom-link'
		});
	} );
} );
/*Modulo de imáges nuevas, código copiado y modifícado de http://dev.wikia.com/wiki/Thread:6226*/
//var NewFilesModuleCompact = 1; //optional compact mode
if ($('#WikiaRail').length) { //only on pages where the rail is present
  $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
    if ($('.ChatModule').length && !$("#NewFilesModule").length) { // Only add it ''once''
      if (typeof $temp == "undefined") { // Only load it ''once''
        $temp = $('<div>'); // this line, and the next, originate from http://dev.wikia.com/wiki/AjaxRC/code.js <3
        $temp.load("/wiki/Especial:NuevasImágenes/12" + " #gallery-", function () {
          $('.ChatModule').after("<section id='NewFilesModule' class='module'><h2><a href='/wiki/Especial:NuevasImágenes'>Nuevos Archivos</a><a class='wikia-button' style='width:93%; text-align:center; margin-top:5px;' href='/wiki/Especial:SubirArchivo'>Subir un archivo</a><a class='wikia-button' style='width:93%; text-align:center; margin-top:5px;' href='/wiki/Especial:SubirMúltiplesArchivos'>Subir múltiples archivos</a><div style='font-style:italic; text-align:center; font-size:x-small; text-shadow:none;'>Recuerda que al subir archivos debes añadirles sus respectivas categorías y un nombre correcto.</div></h2>");
          if (typeof NewFilesModuleCompact != "undefined" && NewFilesModuleCompact) {
            $('#gallery-', $temp).html($('#gallery-', $temp).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/106?"));
            $("#NewFilesModule").addClass("compact");
          }
          $("#NewFilesModule").append($('#gallery-', $temp));
          $("#NewFilesModule .wikia-photogallery-add").remove();
          delete $temp; //delete it, in case the rail is wiped after this point.
        });
      }
    }
  });  //end of DOMNodeInserted block
  $('head').append('<style type="text/css">\n#gallery- { height:452px; overflow-y:auto; clear: both; text-align:center; padding-bottom: 5em;}\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; height: auto !important; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display: block; }\n#NewFilesModule.compact .wikia-gallery-item:hover .lightbox-caption { display: none; }\n#NewFilesModule h1 {margin: 0 2em 0 0;}\n#NewFilesModule h1 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; }\n.wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n.wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n</style>');
}
/*Pestaña de ediciones de usuarios en páginas de usuarios, código originario de Lego Wiki en inglés*/
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://es.skullgirls.wikia.com/wiki/Especial:Ediciones_de_Usuario/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Ediciones del Usuario</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});
/*Texto de busqueda, código hecho por ShermanTheMythran*/
$('.Search .WikiaSearch input[name="search"]').attr('placeholder','Buscar en Skullgirls Wiki...');