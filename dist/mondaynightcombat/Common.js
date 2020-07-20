/* Any JavaScript here will be loaded for all users on every page load. */
// <nowiki><pre>

// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
    $(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});

// ============================================================
// BEGIN Scripts for Internet Explorer 6
// ============================================================

// Description: Import scripts specific to Internet Explorer 6
// Credit:      This script is from Wikipedia. Please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history

if (navigator.appName == "Microsoft Internet Explorer") {
   if (navigator.appVersion.substr(22, 1) == "6") {
      importScript("MediaWiki:Common.js/IE60Fixes.js")
   }
}

// ============================================================
// END Scripts for Internet Explorer 6
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

var autoCollapse = 3;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable( tableIndex ) {
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

addOnloadHook( createCollapseButtons );

// ============================================================
// END Collapsible tables
// ============================================================

// ============================================================
// BEGIN ArchiveTool
// ============================================================

// Description: Add tool for easier talk page archiving
// Credit:      User:Dantman (http://dev.wikia.com)

var archiveListTemplate = 'Archives'; 
var archivePageTemplate = 'Archivepage'; 
importScriptPage('ArchiveTool/code.js', 'dev');

// ============================================================
// END ArchiveTool
// ============================================================

// ============================================================
// BEGIN Grayed-out edit button for archived talk pages
// ============================================================

// Description: Remove section edit links and gray out main edit button on archived talk pages
// Credit:      User:Porter21 (based on "Archive edit tab disabling" by User:Spang and User:Uberfuzzy)

function disableArchiveEdit () {
   if ((wgNamespaceNumber%2 == 0 && wgNamespaceNumber%2 != 501) || 
     (wgTitle.indexOf('/Archive ') == -1 && wgTitle.indexOf('/archive ') == -1)) {
     return;
   }

   if (document.getElementById('ca-edit')) {
     if (skin == 'monaco') {
       editLink = document.getElementById('ca-edit');
     }
     else if (skin == 'monobook') {
       editLink = document.getElementById('ca-edit').firstChild;
     }
     editLink.title = 'This page is an archive and should usually not be edited.';
     editLink.style.color = 'gray';
     editLink.innerHTML = 'Archived';
   }

   $('span.editsection').remove();

   if((skin == 'monaco' && document.getElementById('control_addsection')) ||
     (skin == 'monobook' && document.getElementById('ca-addsection'))) {
     if (skin == 'monaco') {
       addsectionButton = document.getElementById('control_addsection');
     }
     else if (skin == 'monobook') {
       addsectionButton = document.getElementById('ca-addsection');
     }
     addsectionButton.style.display = 'none';
     addsectionButton.style.visibility = 'hidden';
   }

   if (skin == 'monaco' && document.getElementById('fe_newsection')) {
     document.getElementById('fe_newsection').style.display = 'none';
     document.getElementById('fe_newsection').style.visibility = 'hidden';
   }
}

addOnloadHook (disableArchiveEdit);

// ============================================================
// END Grayed-out edit button for archived talk pages
// ============================================================

// ============================================================
// BEGIN AjaxRC
// ============================================================

// Description: Automatically refreshes "Recent changes"
// Credit:      User:pcj (http://www.wowwiki.com)

var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');

// ============================================================
// END AjaxRC
// ============================================================