/* <nowiki> */

/* ######################################################################## */
/* ### JavaScript here is loaded for all users and all skins.           ### */
/* ######################################################################## */

/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Beschreibung: Automatische Aktualisierung der                    ### */
/* ###               "Letzten Änderungen" via AJAX.                     ### */
/* ### Credit:       User:pcj (original)                                ### */
/* ###               User:Alessio79, Grunny (Fehlerbehebungen)          ### */
/* ######################################################################## */
 
var ajaxIndicator = stylepath + '/common/progress-wheel.gif';
var ajaxPages = new Array("Spezial:Letzte_Änderungen", "Spezial:WikiActivity", "Fallout_Wiki:WikiActivity");
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Automatische Aktualisierung';
var refreshHover = 'Automatisch aktualisierende Seitenneuladungen aktivieren';
var doRefresh = true;

/**
 * Setzt den Cookie
 * @param c_name string Name des Cookie
 * @param value string 'on' oder 'off'
 * @param expiredays integer Ablaufzeit des Cookie in Tage
 */
 
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}

/**
 * Holt den Cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
 
 function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" )
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		} 
	}
	return "";
}

/* Hauptfunktion um den Prozess der automatischen Aktualisierung zu starten */

function preloadAJAXRL() {
   var ajaxRLCookie = (getCookie("ajaxload-" + wgPageName) == "on") ? true : false;
   var appTo = ($('#WikiaPageHeader' ).length) ? $('#WikiaPageHeader') : ($('#AdminDashboardHeader').length ? $('#AdminDashboardHeader > h1') : $('.firstHeading'));

   appTo.append('&#160;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="Aktualisiere Seite" /></span></span>');

$('#ajaxLoadProgress').ajaxSend(function(event, xhr, settings) {
      if (location.href == settings.url) {
         $(this).show();
      }
   } ).ajaxComplete(function(event, xhr, settings) {
      if (location.href == settings.url) {
         $(this).hide();
         for(i in ajaxCallAgain) {
            ajaxCallAgain[i]();
         }
      }
   } );
 
   $('#ajaxToggle').click(toggleAjaxReload).attr('checked', ajaxRLCookie);
 
   if (getCookie("ajaxload-" + wgPageName) == "on") {
      loadPageData();
   }
}

/* Aktualisierung ein und ausschalten durch anklicken der Checkbox */

function toggleAjaxReload() {
	if ( $( '#ajaxToggle' ).prop( 'checked' ) == true ) {
		setCookie( "ajaxload-" + wgPageName, "on", 30 );
		doRefresh = true;
		loadPageData();
	} else {
		setCookie( "ajaxload-" + wgPageName, "off", 30 );
		doRefresh = false;
		clearTimeout( ajaxTimer );
	}
}
 
 /**
 * Lädt das Skript auf spezifischen Seiten
 */
 
$( function () { 
	for ( x in ajaxPages ) {
		if ( wgPageName == ajaxPages[x] && $( '#ajaxToggle' ).length === 0 ) {
			preloadAJAXRL();
		}
	}
} );

/* Erledigt die aktuelle Neuladung */

function loadPageData() {
	var cC = ( $( '#WikiaArticle' ).length ) ? '#WikiaArticle' : '#bodyContent';
	$( cC ).load( location.href + " " + cC, function ( data ) {
		if ( doRefresh ) {
			ajaxTimer = setTimeout( "loadPageData();", ajaxRefresh );
		}
	} );
}
 
// ============================================================
// END AjaxRC
// ============================================================

/*

############################################################################################### */
/* ### Leistungsverbesserung der Zwischenspeicherung                                           ### */
/* ### ----------------------------------------------------------------                        ### */
/* ### Beschreibung: Nutzt regelmäßige Ausdrücke und Zwischenspeicherung für bessere Leistung. ### */
/* ###                                                                                         ### */
/* ############################################################################################### */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/* ######################################################################## */
/* ### SKRIPTLADER                                                      ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Beschreibung: Lädt alle anderen Skripte.                         ### */
/* ### Credit:      Benutzer:Porter21                                   ### */
/* ######################################################################## */
 
// Globale Variablen einrichten

var fwConfig = {

   chevronDown:  '<span class="fw-chevron-down"></span>',
   chevronLeft:  '<span class="fw-chevron-left"></span>',
   chevronRight: '<span class="fw-chevron-right"></span>',
   chevronUp:    '<span class="fw-chevron-up"></span>',
   loadIndicator: '<img src="' + mw.config.get('stylepath') + '/common/images/ajax-loader.gif' + '" style="vertical-align: middle;" width="16" height="16" border="0" title="Im Gang..." alt="Im Gang..." />'

};
 
// Lade Skripte

function fwScriptLoader () {

   // Immer geladen
   fancyTooltips();

   // Nur für spezifische Namensräume geladen

   if ((wgNamespaceNumber == 0 || wgNamespaceNumber == 4 || wgNamespaceNumber == 110 || wgNamespaceNumber == 502) &&
      !window.wgIsMainpage) {
      addTitleIcons();
   }

   if (mw.config.get('wgNamespaceNumber') == 115) {
      wikilogCommentImprovements();
   }
 
   // Nur für spezifische Seiten geladen

   if (wgPageName == 'Fallout_Wiki:Dateiduplikate') {
      findDupFiles();
   }

   for (var x in ajaxPages) {
      if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) {
         preloadAJAXRL();
      }
   }
}
 
jQuery(function($) {
   fwScriptLoader();

});

/* ######################################################################## */
/* ### TITLE ICONS (Vorlage:Spiele)                                     ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Beschreibung: Fügt Icons zum Artikeltitel hinzu                  ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function addTitleIcons () {
   var iconBar = $('#fw-titleicons');
   var previewBar = $('#fw-titleicons-preview');
 
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
 
      $('#fw-titleicons-more').append('<img width="0" height="0" class="fw-titleicons-chevron" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">');
 
      iconBar.hover(
         function () {
            $(this).addClass('fw-titleicons-hover');
         }, function () {
            $(this).removeClass('fw-titleicons-hover');
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

var gamesCheck = document.getElementById("fw-titleicons");

if (gamesCheck !== null)
{
    var lazyIconSmall = document.getElementById("fw-titleicons-preview");
    var lazyIconLarge = document.getElementById("fw-titleicons-fullsize");
    rmvLzyLoad(lazyIconSmall);
    rmvLzyLoad(lazyIconLarge);
}

/* ######################################################################## */
/* ### FANCY TOOLTIPS (Vorlage:Icon, Vorlage:Infobox,                   ### */
/* ###                 Vorlage:Tooltip)                                 ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Beschreibung: Nicer-looking tooltips using jQuery.tipsy          ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */
 
function fancyTooltips () {
   var ftTooltipsE = $('.fw-infobox-tooltip-cell');
   var ftTooltipsS = $('.fw-icon, .fw-tooltip');
 
   if (ftTooltipsE.length || ftTooltipsS.length) {
      mw.loader.using('jquery.tipsy', function () {
         if (ftTooltipsE.length) {
            // Tooltip appears to the left of the element
            ftTooltipsE.tipsy({gravity: 'e'});
         }
         if (ftTooltipsS.length) {
            // Tooltip appears above the element
            ftTooltipsS.tipsy({gravity: 's'});
         }
      });
   }
}

/* ######################################################################## */
/* ### SHOW/HIDE                                                        ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Collapsible tables using jQuery. Allows tables to   ### */
/* ###              be collapsed, showing only the header.              ### */
/* ### Credit:      User:Dantman                                        ### */
/* ### Disclaimer:  See http://dev.wikia.com/wiki/ShowHide/code.js      ### */
/* ######################################################################## */
 
var ShowHideConfig = { autoCollapse: 1, userLang: false };
importScriptPage( 'ShowHide/code.js', 'dev' );


/* ######################################################################## */
/* ### DISABLE ARCHIVE EDIT                                             ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Remove section edit links and gray out main edit    ### */
/* ###              button on archived talk pages                       ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function disableArchiveEdit () {

   // Configuration

   var userconfig = (window.DisableArchiveEditConfig) ? window.DisableArchiveEditConfig : {};
   var config = $.extend(true, {
      archiveSubpage: 'Archive',
      disableCompletely: false,
      textColor: '#D9D9D9',
      userLang: false,
      // English
      en: {
         archived: "Archived",
         archivedTooltip: "This page is an archive and should not be edited."
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
            var oasisButton = $(((wgNamespaceNumber == 3) ? '#WikiaUserPagesHeader' : '#WikiaPageHeader') + ' > ul.wikia-menu-button > li');
 
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
         editlink.attr('title', msg('archivedTooltip')).css('color', config.textColor).text(msg('archived'));
      }
   }
}
 
/* ######################################################################## */
/* ### DUPLICATE FILE LIST                                              ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Finds duplicate files on the wiki.                  ### */
/* ### Credit:      User:pcj (http://www.wowpedia.org)                  ### */
/* ######################################################################## */

function findDupFiles(gf) {
   var fileDiv = $('#mw-dupfiles');

   if (fileDiv.length) {
      dil = new Array();
      ajaxIndicator = stylepath + '/common/progress-wheel.gif';
      output = '';
      url = '/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json';

      if (!($('#dupFilesProgress').length)) {
         fileDiv.prepend('<span style="float: right;" id="dupFilesProgress" title="In progress..."><img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="In progress..." /></span>');
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
                  && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles ) {
                  output += "<h3><a href='/wiki/" + encodeURIComponent(pages[pageID].title).replace(/'/g, "%27") + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";

                  for ( x = 0; x < pages[pageID].duplicatefiles.length; x++ ) {
                     output += "<li><a href='/wiki/File:" + encodeURIComponent(pages[pageID].duplicatefiles[x].name).replace(/'/g, "%27") + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                     dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                  }
                  output += "</ul>\n\n"
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
/* ### CHAT IMPROVEMENTS                                                ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Improvements for Special:Chat                       ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function openChatWindow() {
   vaultChatWindow = window.open('/wiki/Spezial:Chat', 'wikiachat', 'width=600, height=600, location=no, menubar=no, resizable=yes, scrollbars=no, status=no, toolbar=no');
   return vaultChatWindow;
}

function rewriteChatLink() {
   $('#WikiHeader > nav > ul > li > ul.subnav > li > a[href="/wiki/Spezial:Chat"]').click(function(e){
      openChatWindow();
      return false;
   });
}

/* ######################################################################## */
/* ### IMAGE TOGGLER                                                    ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Allows toggling of several images in infoboxes      ### */
/* ### Credit:      User:MarkvA                                         ### */
/* ######################################################################## */

$(document).ready(function() {
var infoboxHasImageToggler = $('table.fw-infobox').hasClass('imagetoggler-enabled')
 
if(infoboxHasImageToggler == true) {
	var ImageToggler = {};
	ImageToggler.count = 0;
	ImageToggler.images = [];
	function setupToggler() {
		$('tr.fw-infobox-row-mainimage').each(function(i) {
			$(this).attr("id",'imagetoggler-'+i);
			$(this).addClass("imagetoggler");
			var currentToggler = $(this).closest("tr.fw-infobox-row-mainimage").attr("id");
		});
		$('tr.fw-infobox-row-mainimage .fw-infobox-mainimage-image a').each(function(i) {
			var currentToggler = $(this).closest("tr.fw-infobox-row-mainimage").attr("id");
			$(this).addClass('imagetoggler-image imagetoggler-image-'+i);
 
			ImageToggler.images.push(currentToggler+'^'+$(this).attr('href'));
			ImageToggler.count = ImageToggler.count + 1;
		});
 
	}
	setupToggler();
 
	if(ImageToggler.count > 0) {
 
		$('.fw-infobox-mainimage').prepend('<div class="imagetoggler-thumbs"></div>');
 
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
		$('tr.fw-infobox-row-mainimage').each(function(i) {
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

/* ######################################################################## */
/* ### JQUERY AJAX PATROL LINKS                                         ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Mark pages as patrolled via AJAX                    ### */
/* ### Credit:      User:Grunny (http://dev.wikia.com)                  ### */
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
      curLink.html('<img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="Als gesichtet kennzeichnen..." />');
      $.get(curURL, function (data) {
         curLink.css('color', 'grey').text('[Als gesichtet gekennzeichnet]');
      });
   });
}

--><mainpage-rightcolumn-start />

<chat/>

function fb-page() {
	$('#fb-page').append('<iframe marginheight="0" marginwidth="0" src="https://www.facebook.com/FalloutWiki/"
&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="280" height="250" scrolling="no" />');
}
$(fb-page);