/* <nowiki> */

/**
 * Script for automatically refreshing "recent changes" and "watchlist" via AJAX
 * Script by User:pcj (http://www.wowpedia.org)
 * Bug fixes by User:Grunny (http://dev.wikia.com) and User:Porter21 (http://www.falloutwiki.com)
 * Source: http://dev.wikia.com/wiki/AjaxRC 
 */

var ajaxPages = new Array("Special:RecentChanges", "Special:Watchlist");
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Auto-refresh';
var refreshHover = 'Enable auto-refreshing page loads';
var doRefresh = true;
var ajaxBC = '#bodyContent';

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
   var ajaxRLCookie = (getCookie("ajaxload-" + mw.config.get('wgPageName')) == "on") ? true : false;

   $('.firstHeading').append('&#160;<span style="font-size: x-small; line-height: 100%;" id="ajaxRefresh"><span id="ajaxToggleText" class="va-tooltip" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="vertical-align: bottom;" id="ajaxToggle"></span><span style="display: none; padding-left: 3px;" id="ajaxLoadProgress">' + vaultConfig.loadIndicator + '</span>');

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

         if (typeof messagingImprovements !== 'undefined') {
            messagingImprovements();
         }
     }
   } );

   $('#ajaxToggle').click(toggleAjaxReload).attr('checked', ajaxRLCookie);

   if (getCookie("ajaxload-" + mw.config.get('wgPageName')) == "on") {
      loadPageData();
   }
}

/**
 * Turn refresh on and off by toggling the checkbox
 */
function toggleAjaxReload() {
   if ($('#ajaxToggle').prop('checked') === true) {
      setCookie("ajaxload-" + mw.config.get('wgPageName'), "on", 30);
      doRefresh = true;
      loadPageData();
   } else {
      setCookie("ajaxload-" + mw.config.get('wgPageName'), "off", 30);
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

jQuery(function($) {
   for (var x in ajaxPages) {
      if (mw.config.get('wgPageName') == ajaxPages[x] && $("#ajaxToggle").length == 0) {
         preloadAJAXRL();
      }
   }
});

/* </nowiki> */