/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (original)                                 ### */
/* ###              User:Grunny (bug fixes)                             ### */
/* ### Fonte:       http://fallout.wikia.com                            ### */
/* ### Editato da:  Hershel_Layton                                      ### */
/* ######################################################################## */


var ajaxIndicator = stylepath + '/common/progress-wheel.gif';
var ajaxPages = new Array('Speciale:UltimeModifiche', 'Speciale:OsservatiSpeciali', 'Speciale:WikiActivity', 'Speciale:ImmaginiRecenti', 'Speciale:Registri');
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Aggiornamento automatico';
var refreshHover = 'Abilita l&#39;aggiornamento automatico della pagina';
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

appTo.append('&#160;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="float: none; vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');

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
------
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

/**
 * Call the function
 */
jQuery(function($) {
   for (var x in ajaxPages) {
      if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) {
         preloadAJAXRL();
      }
   }
});