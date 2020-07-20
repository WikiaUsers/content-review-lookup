/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

 /** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *			   http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'Свернуть';
var expandCaption = 'Развернуть';
 
function collapseTable( tableIndex ) {
        var Button = document.getElementById( 'collapseButton' + tableIndex );
        var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
        if ( !Table || !Button ) {
                return false;
        }
 
        var Rows = Table.rows;
 
        if ( Button.firstChild.data == collapseCaption ) {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = 'none';
                }
                Button.firstChild.data = expandCaption;
        } else {
                for ( var i = 1; i < Rows.length; i++ ) {
                        if (Rows[0].style.display) {
                                Rows[i].style.display = Rows[0].style.display;
                        } else {
                                Rows[i].style.display = 'table-row';
                        }
                }
                Button.firstChild.data = collapseCaption;
        }
}
 
function createCollapseButtons() {
        var tableIndex = 0;
        var NavigationBoxes = new Object();
        var Tables = document.getElementsByTagName( 'table' );
 
        for ( var i = 0; i < Tables.length; i++ ) {
                if ( $(Tables[i]).hasClass('collapsible') ) {
 
                        /* only add button and increment count if there is a header row to work with */
                        var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
                        if ( !HeaderRow ) {
                                continue;
                        }
                        var Header = HeaderRow.getElementsByTagName( 'th' )[0];
                        if ( !Header ) {
                                continue;
                        }
 
                        NavigationBoxes[tableIndex] = Tables[i];
                        Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
                        var Button = document.createElement( 'span' );
                        var ButtonLink = document.createElement( 'a' );
                        var ButtonText = document.createTextNode( collapseCaption );
                        Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
                        Button.style.styleFloat = "right";
                        Button.style.cssFloat = "right";
                        Button.style.fontWeight = "normal";
                        Button.style.textAlign = "right";
                        Button.style.width = "6em";
 
                        ButtonLink.style.color = Header.style.color;
                        ButtonLink.setAttribute( 'id', Button.className + tableIndex );
                        ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( '[' ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( ']' ) );
 
                        Header.insertBefore( Button, Header.childNodes[0] );
                        tableIndex++;
                }
        }
 
        for ( var i = 0;  i < tableIndex; i++ ) {
                if ( $(NavigationBoxes[i]).hasClass('collapsed') || ( tableIndex >= autoCollapse && $(NavigationBoxes[i]).hasClass('autocollapse') ) ) {
                        collapseTable( i );
                } else if ( $(NavigationBoxes[i]).hasClass('innercollapse') ) {
                        var element = NavigationBoxes[i];
                        while ( element = element.parentNode ) {
                                if ( $(element).hasClass('outercollapse') ) {
                                        collapseTable( i );
                                        break;
                                }
                        }
                }
        }
}
 
addOnloadHook( createCollapseButtons );


var dr1 = "https://images.wikia.nocookie.net/__cb20111209074026/submachine/ru/images/6/60/Button_clear.png"
var dr2 = "https://images.wikia.nocookie.net/__cb20111109155751/submachine/ru/images/8/8a/Submachine_Series_button.png"
 
function onloadhookcustom3() {
  var replace = document.getElementById("Button1");
 
  if (null != replace) {
    replace.innerHTML='<a href="http://ru.submachine.wikia.com/wiki/Серия_Submachine"><img alt="Серия Submachine" width=121 height=71 src="https://images.wikia.nocookie.net/__cb20111209074026/submachine/ru/images/6/60/Button_clear.png" onmouseover="this.src=dr2" onmouseout="this.src=dr1"></a>';
  }
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom3,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom3);



var dr1 = "https://images.wikia.nocookie.net/submachine/ru/images/d/d3/Sub8logo1.gif"
var dr2 = "https://images.wikia.nocookie.net/submachine/ru/images/5/55/Sub8logo2.gif"

function onloadhookcustom3() {
  var replace = document.getElementById("Logo");
 
  if (null != replace) {
    replace.innerHTML='<a href="http://ru.submachine.wikia.com/wiki/Служебная:Random"><img alt="Logo" width=284 height=284 src="https://images.wikia.nocookie.net/submachine/ru/images/d/d3/Sub8logo1.gif" onmouseover="this.src=dr2" onmouseout="this.src=dr1"></a>';
  }
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom3,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom3);

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

//**Back to top**//
importScriptPage('BackToTopButton/code.js', 'dev');