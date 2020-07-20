/* <nowiki> */

/* ####################################################################### */
/* ### Este JavaScript se cargará para todos los usuarios y pieles     ### */
/* ### Importado de Nukapedia                                          ### */
/* ### https://fallout.wikia.com/wiki/MediaWiki:Common.js              ### */
/* ### Se quitaron scripts de "MediaWiki:ImportJS" y se trasladon aquí ### */
/* ####################################################################### */

/* ######################################################################## */
/* ### ICONOS DE TÍTULOS (Plantilla:Juegos)                             ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Añade iconos a los artículos                        ### */
/* ### Créditos:    Usuario:Porter21                                    ### */
/* ######################################################################## */

function addTitleIcons () {
   var iconBar = $('#va-titleicons');
   var previewBar = $('#va-titleicons-preview');

   if (skin != 'monobook' && skin != 'oasis' && skin != 'wikia') {
      return;
   }

   if (iconBar.length > 0 && $('a', previewBar).length > 0) {
      if (skin == 'oasis' || skin == 'wikia') {
         var articleDiv = $('#WikiaArticle');

         if (articleDiv.length > 0) {
            iconBar.css('display', 'block').prependTo(articleDiv);
         }
      } else if (skin == 'monobook') {
         var firstHeading = $('#firstHeading').css('position', 'relative');

         if (firstHeading.length > 0) {
            iconBar.css('display', 'block').appendTo(firstHeading.css('padding-right', previewBar.width() + 25));
         }
      }

      $('#va-titleicons-more').append('<img width="0" height="0" class="va-titleicons-chevron" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">');

      iconBar.hover(
         function () {
            $(this).addClass('va-titleicons-hover');
         }, function () {
            $(this).removeClass('va-titleicons-hover');
         });
   }
}

/* Games template fix to remove Lazy load by User:Sakaratte                 */
function rmvLzyLoad(lazyIcon) {
    var lazyIconCleanse = lazyIcon.getElementsByTagName("img");
    for (i = 0; i < lazyIconCleanse.length; i++)
        {
            var iconSrc = lazyIconCleanse[i].getAttribute("data-src");
            if (iconSrc !== null) /*Does nothing if there is no data-src */ { 
            lazyIconCleanse[i].setAttribute("src", iconSrc);
        }
            lazyIconCleanse[i].className="";
    }
}

var gamesCheck = document.getElementById("va-titleicons");

if (gamesCheck !== null)
{
    var lazyIconSmall = document.getElementById("va-titleicons-preview");
    var lazyIconLarge = document.getElementById("va-titleicons-fullsize");
    rmvLzyLoad(lazyIconSmall);
    rmvLzyLoad(lazyIconLarge);
}

var lzyHelip = document.getElementById("np-collapsed");
    if (lzyHelip !== null) {
        rmvLzyLoad(lzyHelip);
    }

/* ######################################################################### */
/* ### ARCHIVE TOOL                                                      ### */
/* ### ----------------------------------------------------------------- ### */
/* ### Descripción: Archivado de páginas de discusión mediante de GUI    ### */
/* ### Créditos:    Usuario:Dantman (original)                           ### */
/* ###              Usuario:Porter21 (Oasis & Monobook support)          ### */
/* ### Aviso legal: Véase https://dev.wikia.com/wiki/ArchiveTool/code.js ### */
/* ######################################################################### */
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archivados',
   archivePageTemplate: 'PágArchivada',
   archiveSubpage: 'Archivado',
   userLang: true
};
importScriptPage('MediaWiki:ArchiveTool/code.js', 'dev');

/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Actualizar automáticamente "Actividad reciente"     ### */
/* ###              mediante de AJAX                                    ### */
/* ### Créditos:    Usuario:pcj (original)                              ### */
/* ###              Usuario:Grunny (arreglos)                           ### */
/* ######################################################################## */

var ajaxIndicator = stylepath + '/common/progress-wheel.gif';
var ajaxPages = new Array("Especial:CambiosRecientes", "Especial:WikiActivity", "Fallout_Wiki:WikiActivity");
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Autorefrescar';
var refreshHover = 'Actualizar esta página automáticamente';
var doRefresh = true;
var ajaxBC = ($('#WikiaArticle').length ) ? '#WikiaArticle' : '#bodyContent';

/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie(c_name, value, expiredays) {
   var exdate = new Date();
   exdate.setDate(exdate.getDate() + expiredays);
   document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}

/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie(c_name) {
   if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=");
      if (c_start !== -1) {
         c_start = c_start + c_name.length + 1; 
         var c_end = document.cookie.indexOf(";", c_start);
         if (c_end === -1) {
            c_end = document.cookie.length;
         }
         return unescape(document.cookie.substring(c_start, c_end));
      } 
   }
   return "";
}

/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
   var ajaxRLCookie = (getCookie("ajaxload-" + wgPageName) == "on") ? true : false;
   var appTo = ($('#WikiaPageHeader' ).length) ? $('#WikiaPageHeader > h1') : ($('#AdminDashboardHeader').length ? $('#AdminDashboardHeader > h1') : $('.firstHeading')); 

   appTo.append('&#160;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="float: none; vertical-align: baseline;" border="0" alt="Actualizando página" /></span></span>');

   $('#ajaxLoadProgress').ajaxSend(function(event, xhr, settings) {
      if (location.href == settings.url) {
         $(this).show();
      }
   } ).ajaxComplete(function(event, xhr, settings) {
      if (location.href == settings.url) {
         $(this).hide();

         // Re-run certain functions
         if ($(ajaxBC + ' .mw-collapsible').length) {
            $(ajaxBC + ' .mw-collapsible').makeCollapsible();
         }
 
         if (mw.config.get("wgNamespaceNumber") == -1 
            && mw.config.get("wgCanonicalSpecialPageName") == "Recentchanges") {
            mw.special.recentchanges.init();
         }
      }
   } );

   $('#ajaxToggle').click(toggleAjaxReload).attr('checked', ajaxRLCookie);

   if (getCookie("ajaxload-" + wgPageName) == "on") {
      loadPageData();
   }
}

/**
 * Turn refresh on and off by toggling the checkbox
 */
function toggleAjaxReload() {
   if ($('#ajaxToggle').prop('checked') === true) {
      setCookie("ajaxload-" + wgPageName, "on", 30);
      doRefresh = true;
      loadPageData();
   } else {
      setCookie("ajaxload-" + wgPageName, "off", 30);
      doRefresh = false;
      clearTimeout(ajaxTimer);
   }
}

/**
 * Does the actual refresh
 */
function loadPageData() {
   $(ajaxBC).load(location.href + " " + ajaxBC + " > *", function (data) {
      if (doRefresh) {
         ajaxTimer = setTimeout(loadPageData, ajaxRefresh);
      }
   });
}

/* ######################################################################## */
/* ### DESACTIVAR LA EDICIÓN DE ARCHIVADOS                              ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Elimina los enlaces de edición de sección y oculta  ### */
/* ###              el botón de  edición principal en las páginas de    ### */
/* ###              conversación archivadas                             ### */
/* ### Créditos:      Usuario:Porter21                                  ### */
/* ######################################################################## */

function disableArchiveEdit () {
   // Configuration
   var userconfig = (window.DisableArchiveEditConfig) ? window.DisableArchiveEditConfig : {};
   var config = $.extend(true, {
      archiveSubpage: 'Archivado',
      disableCompletely: false,
      textColor: '#D9D9D9',
      userLang: false,
      // English
      es: {
         archived: 'Archivado',
         archivedTooltip: 'Esta página está archivada y no debe ser editada.'
      }
   }, userconfig);
 
   // Function for multi-language support (by Daniel Friesen aka User:Dantman)
   function msg(name) {
      if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] )
         return config[wgUserLanguage][name];
      if ( wgContentLanguage in config && name in config[wgContentLanguage] )
         return config[wgContentLanguage][name];
      return config.en[name];
   }
 
   // Check whether page is an archive
   if ((new RegExp('\\/\[' + config.archiveSubpage.substr(0,1).toUpperCase()
      + config.archiveSubpage.substr(0,1).toLowerCase() + '\]' + config.archiveSubpage.substr(1)
      + '\\s\*\\d\*')).test(wgTitle)) {
      // Remove "add new section" links and prepare altering "edit" page control
      switch (skin) {
         case 'monaco':
            $('#control_addsection').remove();
            $('#fe_newsection').remove();
 
            editlink = $('#ca-edit');
            break;
         case 'monobook':
            $('#ca-addsection').remove();
 
            editlink = $('#ca-edit > a');
            break;
         case 'oasis':
         case 'wikia':
            var oasisButton = $(($('#WikiaUserPagesHeader').length ? '.UserProfileActionButton' : '#WikiaPageHeader') + ' > .wikia-menu-button');
 
            oasisButton.children("a:first").prependTo($('ul:first', oasisButton)).wrap('<li />').children('img').remove();
            oasisButton.prepend('<a />');
            $('a[data-id="addtopic"]', oasisButton).parent().remove();
 
            editlink = $('a:first', oasisButton);
            break;
      }
 
      // Remove "edit section" links
      $('span.editsection').remove();
 
      // Alter "edit" page control
      if (config.disableCompletely) {
         editlink.remove();
      } else {
         editlink.attr('title', msg('archivedTooltip')).css('color', config.textColor).text(msg('archivado'));
      }
   }
}
 
/* ######################################################################## */
/* ### CUENTA REGRESIVA                                                 ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Agrega una cuenta regresiva a una fecha específica  ### */
/* ###              en una página.                                      ### */
/* ###              (versión jQuery de https://dev.wikia.com/Countdown) ### */
/* ### Créditos:    Usuario:Splarka (original)                          ### */
/* ###              Usuario:Porter21 (versión jQuery)                   ### */
/* ######################################################################## */

// Usage example:
// <span class="countdown" style="display:none;">Only <span class="countdowndate">January 01 2019 00:00:00</span> until the new year...</span>


/* ######################################################################## */
/* ### LISTA DE ARCHIVOS DUPLICADOS                                     ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Encuentra archivos duplicados en la wiki.           ### */
/* ### Créditos:      Usuario:pcj (https://www.wowpedia.org)            ### */
/* ######################################################################## */

function findDupFiles(gf) {
   var fileDiv = $('#mw-dupfiles');

   if (fileDiv.length) {
      dil = new Array();
      ajaxIndicator = stylepath + '/common/progress-wheel.gif';
      output = '';
      url = '/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json';

      if (!($('#dupFilesProgress').length)) {
         fileDiv.prepend('<span style="float: right;" id="dupFilesProgress" title="En progreso..."><img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="En Progreso..." /></span>');
      }

      if (gf) {
         url += "&gaifrom=" + gf;
      }

      $.getJSON( url, function (data) {
         if ( data.query ) {
            pages = data.query.pages;

            for (pageID in pages) {
               dils = "," + dil.join();

               if ( dils.indexOf("," + pages[pageID].title) == -1 
                  && pages[pageID].title.indexOf("Archivo::") == -1 && pages[pageID].duplicatefiles ) {
                  output += "<h3><a href='/wiki/" + encodeURIComponent(pages[pageID].title).replace(/'/g, "%27") + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";

                  for ( x = 0; x < pages[pageID].duplicatefiles.length; x++ ) {
                     output += "<li><a href='/wiki/Archivo:" + encodeURIComponent(pages[pageID].duplicatefiles[x].name).replace(/'/g, "%27") + "'>Archivo:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                     dil.push("Archivo:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                  }
                  output += "</ul>\n\n";
               }
            }

            fileDiv.append(output);

            if (data["query-continue"]) {
               setTimeout("findDupFiles('" + encodeURIComponent(data["query-continue"].allimages.gaifrom).replace(/'/g, "%27") + "');", 5000);
            } else {
               $('#dupFilesProgress').hide();
            }
         }
      } );
   }
}

/* ######################################################################## */
/* ### MEJORAS DE CHAT                                                  ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Mejoras para Especial: Chat                         ### */
/* ### Créditos:      Usuario:Porter21                                  ### */
/* ######################################################################## */

function openChatWindow() {
   vaultChatWindow = window.open('/wiki/Special:Chat', 'wikiachat', 'width=600, height=600, location=no, menubar=no, resizable=yes, scrollbars=no, status=no, toolbar=no');
   return vaultChatWindow;
}

function rewriteChatLink() {
   $('#WikiHeader > nav > ul > li > ul.subnav > li > a[href="/wiki/Special:Chat"]').click(function(e){
      e.preventDefault();
      openChatWindow();
      return false;
   });
}

/* ######################################################################## */
/* ### ENLACES PATRULLADOS CON JQUERY AJAX                              ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Marcar las páginas como patrulladas mediante AJAX   ### */
/* ### Créditos:    Usuario:Grunny (https://dev.wikia.com)              ### */
/* ######################################################################## */

function ajaxPatrolLinks() {
   var ajaxIndicator = stylepath + '/common/progress-wheel.gif';
   var patrolLinks = $('.patrollink');

   if(!patrolLinks.length) {
      return;
   }

   patrolLinks.click(function (e) {
      var curLink = $(this);
      var curURL = curLink.children('a').attr('href');

      e.preventDefault();
      curLink.html('<img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="Marcando como patrullado" />');
      $.get(curURL, function (data) {
         curLink.css('color', 'grey').text('[Marcado como patrullado]');
      });
   });
}

/* ######################################################################## */
/* ### CARGADOR DE SCRIPTS                                              ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Carga los demás scripts                             ### */
/* ### Créditos:    Usuario:Porter21                                    ### */
/* ######################################################################## */

function vaultScriptLoader () {
   // Always loaded
   rewriteChatLink();
   ajaxPatrolLinks();

   // Only loaded for specific namespaces
   if ((wgNamespaceNumber == 0 || wgNamespaceNumber == 4 || wgNamespaceNumber == 110 || wgNamespaceNumber == 502) &&
      !window.wgIsMainpage) {
      addTitleIcons();
   }

   if (wgNamespaceNumber%2 != 0 && wgNamespaceNumber != 501) {
      disableArchiveEdit();
   }

   // Only loaded for specific pages
   if (wgPageName == 'Fallout_Wiki:Archivos_duplicados') {
      findDupFiles();
   }

   for (var x in ajaxPages) {
      if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) {
         preloadAJAXRL();
      }
   }
}

jQuery(function($) {
   vaultScriptLoader();
});

/* ######################################################################## */
/* ### ALTERNAR IMAGENES                                                ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Permite alternar varias imágenes en el infobox      ### */
/* ### Créditos:    Usuario:MarkvA                                      ### */
/* ######################################################################## */
$(document).ready(function() {
var infoboxHasImageToggler = $('table.va-infobox').hasClass('imagetoggler-enabled');

if(infoboxHasImageToggler == true) {
	var ImageToggler = {};
	ImageToggler.count = 0;
	ImageToggler.images = [];
	function setupToggler() {
		$('tr.va-infobox-row-mainimage').each(function(i) {
			$(this).attr("id",'imagetoggler-'+i);
			$(this).addClass("imagetoggler");
			var currentToggler = $(this).closest("tr.va-infobox-row-mainimage").attr("id");
		});
		$('tr.va-infobox-row-mainimage .va-infobox-mainimage-image a').each(function(i) {
			var currentToggler = $(this).closest("tr.va-infobox-row-mainimage").attr("id");
			$(this).addClass('imagetoggler-image imagetoggler-image-'+i);
		
			ImageToggler.images.push(currentToggler+'^'+$(this).attr('href'));
			ImageToggler.count = ImageToggler.count + 1;
		});

	}
	setupToggler();
		
	if(ImageToggler.count > 0) {
		
		$('.va-infobox-mainimage').prepend('<div class="imagetoggler-thumbs"></div>');
		
		$('.imagetoggler').each(function(i) {
		var currentToggler = $(this).attr("id");
			$('#'+currentToggler + ' .imagetoggler-image').each(function(i) {
				if(i == 0) {
					$(this).css('display','inline');
				}
				else {
					$(this).css('display','none');
				}
			});
		});
		
		$(ImageToggler.images).each(function(i) {
			var splitHref = ImageToggler.images[i].split('^');
			var currentToggler = splitHref[0];
			var currentHref = splitHref[1];

			$('#' + currentToggler + ' .imagetoggler-thumbs').append('<img class="imagetoggler-thumb" src="'+currentHref+'" />');
			$('#' + currentToggler + ' .imagetoggler-thumb-0').addClass('imagetoggler-active-thumb');
			$('#' + currentToggler + ' .imagetoggler-thumb').css('width','auto');
			$('#' + currentToggler + ' .imagetoggler-thumb').css('height','50px');
		});
		$('tr.va-infobox-row-mainimage').each(function(i) {
			$('.imagetoggler-thumb').each(function(i) {
				$(this).addClass('imagetoggler-thumb-'+i);
			});
		});		
		
		
		$('.imagetoggler-thumb').on('click',function() {
			var currentToggler = $(this).closest("tr").attr("id");
			$('#' + currentToggler + ' .imagetoggler-thumb').removeClass('imagetoggler-active-thumb');
			$(this).addClass('imagetoggler-active-thumb');
			ImageToggler.activeclass = $(this).attr('class').split(' ');
			ImageToggler.activenumber = ImageToggler.activeclass[1].split('-');

			$('#' + currentToggler + ' .imagetoggler-image').css('display','none');
			$('#' + currentToggler + ' .imagetoggler-image-'+ImageToggler.activenumber[2]).css('display','inline');
		});
	}
}
});

/* ########################################################################## */
/* ### ReferencePopups - CUENTA REGRESIVA - AJAX AR - ENLACES PATRULLADOS ### */
/* ### ------------------------------------------------------------------ ### */
/* ### Descripción: - Crea un cuadro emergente con el contenido de una    ### */
/* ###              referencia cuando se pasa el cursor sobre el          ### */
/* ###              marcador de citas.                                    ### */
/* ###              - Agrega una cuenta regresiva modificable a           ### */
/* ###              cualquier página.                                     ### */
/* ### Créditos:    Usuario:Lunarity                                      ### */
/* ###              Usuario:Sammylau                                      ### */
/* ###              Usuario:Grunny                                        ### */
/* ###              Usuario:Kangaroopower                                 ### */
/* ###              Usuario:Cqm                                           ### */
/* ########################################################################## */
importArticles({
    type: "script",
    articles: [
		"w:c:dev:Countdown/code.js",
		"w:c:dev:ReferencePopups/code.js",
		"w:c:dev:MediaWiki:InputUsername/code.js",
		"w:c:dev:PurgeButton/code.js",
		"w:c:dev:MediaWiki:AjaxBatchDelete/code.2.js",
		"w:c:dev:CategoryRenameAuto-update/code.js"
    ]
});

/* </nowiki> */

/* ############################################################################### */
/* ### EDITHELP                                                                ### */
/* ### ----------------------------------------------------------------------- ### */
/* ### Descripción: Muestra la documentación de las plantillas dentro del      ### */
/* ###              editor clásico                                             ### */
/* ###              classic editor                                             ### */
/* ### Créditos:    Usuario:Mazn                                               ### */
/* ### Aviso legal: Véase https://fallout.wikia.com/wiki/MediaWiki:EditHelp.js ### */
/* ############################################################################### */
/*
if ( /[?&]action=edit/.test( window.location.search ) ) {
    $.getScript('/load.php?mode=articles&only=scripts&articles=MediaWiki:EditHelp.js');
}
*/

/* ############################################################################ */
/* ### Reemplaza {{USERNAME}} con el nombre del usuario que navega por      ### */
/* ### la página.                                                           ### */
/* ### Requiere copiar la Plantilla:USERNAME                                ### */
/* ### Copiado de templates.wikia.com - (Template:USERNAME)                 ### */
/* ############################################################################ */
// {{USERNAME|texto alternativo}}
// <span class="InputUsername">texto alternativo;</span>

/* ######################################################################### */
/* ### Imagenes de Administradores                                       ### */
/* ### ----------------------------------------------------------------- ### */
/* ### Descripción: Carga las imágenes más recientes del equipo en la    ### */
/* ### página de administradores.                                        ### */
/* ### URL: https://es.fallout.wikia.com/wiki/El Refugio:Administradores ### */
/* ### Créditos:    Usuario:TwoBearsHigh-Fiving                          ### */
/* ######################################################################### */
function loadStaffImages() {
    // Container surrounding the user boxes
    var $staffBox = $('#staff-container');
 
    // Return if the container doesn't exist
    if (!$staffBox.length) { return; }
 
    // Grab all the placeholders
    var $placeholders = $('.img-placeholder');
 
    // Build an array of user names
    var users = [];
    $placeholders.each(function() {
        users.push($(this).attr('data-user'));
    });
 
    // Create a query string from user names
    var queryString = users.join(',');
 
    // Call to API to fetch images
    $.ajax({
        url: "/api/v1/User/Details",
        data: { "ids": queryString },
        success: function(response) {
            var userItems = response.items;
            for (var i = 0; i < userItems.length; i++) {
                var $placeholder = $(".img-placeholder[data-user='" + userItems[i].name + "']");
                $placeholder.html("<img src='" + userItems[i].avatar + "'/>");
            }
        }, 
        dataType: "json"
    });
}
addOnloadHook(loadStaffImages);

/* ##################################################################################### */
/* ### Contenido notable                                                             ### */
/* ### --------------------------------------------------------------------          ### */
/* ### Descripción: Crea una plantilla colapsable donde no sea adecuado              ### */
/* ### usar mw-collapsable                                                           ### */
/* ### URL: https://fallout.wikia.com/wiki/Fallout_Wiki:Notable_content/draft        ### */
/* ### Creditos:    Usuario:Sakaratte                                                ### */
/* ##################################################################################### */
 
/*Initialise variables */
var helipInitialise = document.getElementsByClassName('np-helip');
 
/* Remove duplicate id's from article */
for (i=0; i < helipInitialise.length; ++i)
    {
        var newHelip = "np-helip" + i;
        var newCollapse = "np-Collapsed" + i;
    document.getElementById("np-helip").setAttribute("onclick", 'npCollapsible("' + newHelip + '", "' + newCollapse + '")');
    document.getElementById("np-helip").innerHTML = "Más";
    document.getElementById("np-collapsed").id = newCollapse;
    document.getElementById("np-helip").id = newHelip;
    }
 
/* Switches collapsible content between hidden and visible */
function npCollapsible (helipName, collapseName) {
    var collapseCaption = "Menos";
    var expandCaption = "Más";
 
    navState = document.getElementById(helipName).innerHTML;
    navClass = document.getElementById(collapseName).classList;
    if (navState == expandCaption) {
        navClass.add("np-visible");
        navClass.remove("np-hidden");
        document.getElementById(helipName).innerHTML = collapseCaption;
    } else {
        navClass.remove("np-visible");
        navClass.add("np-hidden");
        document.getElementById(helipName).innerHTML = expandCaption;
    }
}

/* ######################################################################## */
/* ### MassCategorization                                               ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Categorizasión mediante AJAX                        ### */
/* ### Créditos:    Usuario:Ozank Cx                                    ### */
/* ###              Usuario:Dorumin                                     ### */
/* ### Aviso legal: Véase https://dev.wikia.com/wiki/MassCategorization ### */
/* ######################################################################## */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
	massCategorizationDelay = 1000;
	importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}