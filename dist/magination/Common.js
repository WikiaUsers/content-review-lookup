/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

// =====================================================================
// hasClass (Test if an element has a certain class)
// 
// Description: Uses regular expressions and caching for better performance.
// Maintainers: User:Mike Dillon, User:R. Koot, User:SG
// =====================================================================

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

// =====================================================================
// End of hasClass
// =====================================================================

// =====================================================================
// Collapsible Tables
//
// Description: Allows tables to be collapsed, showing only the header.
// Reference:   [[Wikipedia:Wikipedia:NavFrame]]
//              [[Wikipedia:Help:Collapsing]]
// Maintainers: [[Wikipedia:User:R. Koot]]
//
// =====================================================================
 
  var autoCollapse = 2;
  var collapseCaption = "hide";
  var expandCaption = "show";
 
  function collapseTable( tableIndex )
  {
      var Button = document.getElementById( "collapseButton" + tableIndex );
      var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
      if ( !Table || !Button ) {
          return false;
      }
 
      var Rows = Table.getElementsByTagName( "tr" ); 
  
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
 
  function createCollapseButtons()
  {
      var tableIndex = 0;
      var NavigationBoxes = new Object();
      var Tables = document.getElementsByTagName( "table" );
 
      for ( var i = 0; i < Tables.length; i++ ) {
          if ( hasClass( Tables[i], "collapsible" ) ) {
 
              /* Only add button and increment count if there is a header row to work with */
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
              Button.style.width = "6em";
 
              ButtonLink.style.color = Header.style.color;
              ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
              ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
              ButtonLink.appendChild( ButtonText );
 
              Button.appendChild( document.createTextNode( "[" ) );
              Button.appendChild( ButtonLink );
              Button.appendChild( document.createTextNode( "]" ) );
 
              Header.insertBefore( Button, Header.childNodes[0] );
              tableIndex++;
          }
      }
 
      for ( var i = 0;  i < tableIndex; i++ ) {
          if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
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

// =====================================================================
// End of Collapsible Tables
// =====================================================================

// ==================================================================
// Added SiteNotice Functionality
// 
// Functions:
//   * Moves the dismiss link into the SiteNotice table.
//   * Saves the show/hide status of the SiteNotice in a cookie.
//   * Automatically expands the SiteNotice when the ID is updated.
// ==================================================================

addOnloadHook(editSiteNotice);
var dCookieName = "dismissSiteNotice=";
var msgClose = "dismiss";

var hCookieName = "hideSiteNotice=";
var hCookiePos = document.cookie.indexOf(hCookieName);
var hCookieValue = "";
   
function editSiteNotice() {
    var snbox = document.getElementById('mw-dismissable-notice');
   
    if (snbox != null){
        if (hCookiePos > -1) {
            hCookiePos = hCookiePos + hCookieName.length;
            var hideEndPos = document.cookie.indexOf(";", hCookiePos);
            if (hideEndPos > -1) {
                hCookieValue = document.cookie.substring(hCookiePos, hideEndPos);
            } else {
                hCookieValue = document.cookie.substring(hCookiePos);
            }
        }
      
        var newLink = document.createElement('a');
        newLink.setAttribute('href', "javascript:dismissNotice();");
        newLink.setAttribute('title', 'Dismiss this notice.');
        newLink.innerHTML = msgClose;

        var hideLink = document.getElementById( "collapseButton" + "0" );
        hideLink.href = "javascript:hideSiteNotice();"
        hideLink.parentNode.style.width = "12em";
        hideLink.parentNode.appendChild(document.createTextNode(' [')); 
        hideLink.parentNode.appendChild(newLink);
        hideLink.parentNode.appendChild(document.createTextNode(']'));
      
        snbox.tBodies[0].rows[0].deleteCell(1);

        if (hCookieValue != siteNoticeID && hideLink.innerHTML == "show") {
            collapseTable(0);
        }
        if (hCookieValue == siteNoticeID && hideLink.innerHTML == "hide") {
            collapseTable(0);
        }
    }
}

function hideSiteNotice() {
    var hideLink = document.getElementById( "collapseButton" + "0" );
    var date = new Date();
    
    if (hideLink.innerHTML == 'hide'){
        date.setTime(date.getTime() + 30*86400*1000);
    } else {
        date.setTime(date.getTime() - 30*86400*1000);
    }
    document.cookie = hCookieName + siteNoticeID + "; expires="+date.toGMTString() + "; path=/";
    collapseTable(0);
}

// ==================================================================
// End of Added SiteNotice Functionality
// ==================================================================

/* </pre> */