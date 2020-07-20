/* ######################################################################### */
/* ### JavaScript here is loaded for all users.                          ### */
/* ######################################################################### */
 
// <nowiki><pre>
 
// ============================================================
// BEGIN Template:Games
// ============================================================
 
// Description: Add icons to article title
// Credit:      User:Porter21
 
function addTitleIcons () {
   var iconBar = $('#va-titleicons');
   var previewBar = $('#va-titleicons-preview');
 
   if (iconBar.length > 0 && $('a', previewBar).length > 0) {
      if (skin == 'oasis' || skin == 'wikia') {
         var detailsBar = $('#WikiaPageHeader details');
 
         if (detailsBar.length > 0) {
            iconBar.css('display', 'block').appendTo(detailsBar);
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
 
jQuery(function($) {
   if (skin == 'monobook' || skin == 'oasis' || skin == 'wikia') {
      addTitleIcons();
   }
});
 
// ============================================================
// END Template:Games
// ============================================================
 
// ============================================================
// BEGIN Collapsible tables
// ============================================================
 
// Description: Allow tables to be collapsible
// Credit:      This script is from Wikipedia. Please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
//              Customized for Fallout Wiki by User:Porter21
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
   var reCache = {};
   return function (element, className) {
      return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
   };
})();
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 1;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(tableIndex) {
   var Button = document.getElementById( "collapseButton" + tableIndex );
   var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
   if ( !Table || !Button ) {
      return false;
   }
 
   var Rows = Table.rows;
 
   if ( Button.firstChild.data == collapseCaption ) {
      for ( var i = 1; i < Rows.length; i++ ) {
          Rows[i].style.display = "none";
      }
      Button.firstChild.data = expandCaption;
   } else {
      for ( var i = 1; i < Rows.length; i++ ) {
          Rows[i].style.display = Rows[0].style.display;
      }
      Button.firstChild.data = collapseCaption;
   }
}
 
function createCollapseButtons() {
   var tableIndex = 0;
   var collapseIndex = 0;
   var NavigationBoxes = new Object();
   var Tables = document.getElementsByTagName( "table" );
 
   for ( var i = 0; i < Tables.length; i++ ) {
      if ( hasClass( Tables[i], "collapsible" ) ) {
 
         /* only add button and increment count if there is a header row to work with */
         var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
         if (!HeaderRow) continue;
         var Header = HeaderRow.getElementsByTagName( "th" )[0];
         if (!Header) continue;
 
         NavigationBoxes[ tableIndex ] = Tables[i];
         Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
         var Button     = document.createElement( "span" );
         var ButtonLink = document.createElement( "a" );
         var ButtonText = document.createTextNode( collapseCaption );
 
         Button.style.styleFloat = "right";
         Button.style.cssFloat = "right";
         Button.style.fontWeight = "normal";
         Button.style.textAlign = "right";
         Button.style.width = "4em";
         Button.className = "t_show_hide";
 
         ButtonLink.style.color = Header.style.color;
         ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
         ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
         ButtonLink.appendChild( ButtonText );
 
         Button.appendChild( document.createTextNode( "[" ) );
         Button.appendChild( ButtonLink );
         Button.appendChild( document.createTextNode( "]" ) );
 
         Header.insertBefore( Button, Header.childNodes[0] );
 
         if ( !hasClass( Tables[i], "nocount" ) ) {
            collapseIndex++;
	 }
         tableIndex++;
      }
   }
 
   for ( var i = 0;  i < tableIndex; i++ ) {
      if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( collapseIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
         collapseTable( i );
      } 
      else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
         var element = NavigationBoxes[i];
         while (element = element.parentNode) {
            if ( hasClass( element, "outercollapse" ) ) {
               collapseTable ( i );
               break;
            }
         }
      }
   }
}
 
jQuery(function($) {
   createCollapseButtons();
});
 
// ============================================================
// END Collapsible tables
// ============================================================
 
// ============================================================
// BEGIN ArchiveTool
// ============================================================
 
// Description: Add tool for easier talk page archiving
// Credit:      User:Dantman (original), User:Porter21 (Oasis & Monobook support)
 
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivepage',
   archiveSubpage: 'Archive'
};
importScriptPage('ArchiveTool/code.js', 'dev');
 
// ============================================================
// END ArchiveTool
// ============================================================
 
// ============================================================
// BEGIN AjaxRC
// ============================================================
 
/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (original)                                 ### */
/* ###              User:Grunny (bug fixes)                             ### */
/* ######################################################################## */
 
var ajaxIndicator = stylepath + '/common/progress-wheel.gif';
var ajaxPages = new Array("Special:RecentChanges", "Special:WikiActivity", "The_Vault:WikiActivity");
var ajaxCallAgain = [];
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Auto-refresh';
var refreshHover = 'Enable auto-refreshing page loads';
var doRefresh = true;
 
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
         for(var i in ajaxCallAgain) {
            ajaxCallAgain[i]();
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
   var cC = ($('#WikiaArticle').length ) ? '#WikiaArticle' : '#bodyContent';
   $(cC).load(location.href + " " + cC + " > *", function (data) {
      if (doRefresh) {
         ajaxTimer = setTimeout(loadPageData, ajaxRefresh);
      }
   });
}
// ============================================================
// END AjaxRC
// ============================================================
 
// ============================================================
// BEGIN Facebook Fanbox
// ============================================================
 
// Description: Integrate Facebook Fanbox into Wiki
// Credit:      User:edricteo (http://redwall.wikia.com)
 
jQuery(function($) {
   $('#Wikifbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=104178646292440&amp;connections=10&amp;stream=1" align="top" frameborder="0" width="300" height="550" scrolling="no" />');
});
 
// ============================================================
// END Facebook Fanbox
// ============================================================
 
// ============================================================
// BEGIN Disable archive edit
// ============================================================
 
// Description: Remove section edit links and gray out main edit button on archived talk pages
// Credit:      User:Porter21
 
importScriptPage('DisableArchiveEdit/code.js', 'dev');
 
// ============================================================
// END Disable archive edit
// ============================================================
 
// ==================================================================
// Insert username 
// ==================================================================
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
}); 
// ============================================================
// BEGIN Countdown
// ============================================================
 
// Description: Adds countdown to specific date to a page.
//              For usage instructions, see http://dev.wikia.com/wiki/Countdown
// Credit:      User:Splarka (http://community.wikia.com)
 
importScriptPage('Countdown/code.js', 'dev');
 
// ============================================================
// END Countdown
// ============================================================
 
// </nowiki></pre>