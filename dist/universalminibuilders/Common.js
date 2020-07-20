/* Any JavaScript here will be loaded for all users on every page load. */


// ============================================================
// BEGIN Collapsible tables
// ============================================================
 
// Description: Allow tables to be collapsible
// Credit:      This script is from Wikipedia. Please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 */
 
var hasClass 
= (function () {
   var reCache 
= {};
   return function (element, className) {
      return (reCache[className] ? reCache[className] : (reCache[className] 
= new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
   };
})();
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               Wikipedia:NavFrame.
 */
 
var autoCollapse 
= 1;
var collapseCaption 
= "hide";
var expandCaption 
= "show";
 
function collapseTable( tableIndex ) {
   var Button 
= document.getElementById( "collapseButton" + tableIndex );
   var Table 
= document.getElementById( "collapsibleTable" + tableIndex );
 
   if ( !Table || !Button ) {
      return false;
   }
 
   var Rows 
= Table.rows;
 
   if ( Button.firstChild.data 
== collapseCaption ) {
      for ( var i 
= 1; i < Rows.length; i++ ) {
          Rows[i].style.display 
= "none";
      }
      Button.firstChild.data 
= expandCaption;
   } else {
      for ( var i 
= 1; i < Rows.length; i++ ) {
          Rows[i].style.display 
= Rows[0].style.display;
      }
      Button.firstChild.data 
= collapseCaption;
   }
}
 
function createCollapseButtons() {
   var tableIndex 
= 0;
   var collapseIndex 
= 0;
   var NavigationBoxes 
= new Object();
   var Tables 
= document.getElementsByTagName( "table" );
 
   for ( var i 
= 0; i < Tables.length; i++ ) {
      if ( hasClass( Tables[i], "collapsible" ) ) {
 
         /* only add button and increment count if there is a header row to work with */
         var HeaderRow 
= Tables[i].getElementsByTagName( "tr" )[0];
         if (!HeaderRow) continue;
         var Header 
= HeaderRow.getElementsByTagName( "th" )[0];
         if (!Header) continue;
 
         NavigationBoxes[ tableIndex ] 
= Tables[i];
         Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
         var Button     
= document.createElement( "span" );
         var ButtonLink 
= document.createElement( "a" );
         var ButtonText 
= document.createTextNode( collapseCaption );
 
         Button.style.styleFloat 
= "right";
         Button.style.cssFloat 
= "right";
         Button.style.fontWeight 
= "normal";
         Button.style.textAlign 
= "right";
         Button.style.width 
= "4em";
         Button.className 
= "t_show_hide";
 
         ButtonLink.style.color 
= Header.style.color;
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
 
   for ( var i 
= 0;  i < tableIndex; i++ ) {
      if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( collapseIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
         collapseTable( i );
      } 
      else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
         var element 
= NavigationBoxes[i];
         while (element 
= element.parentNode) {
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