/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 * Source: Wikipedia Common.js, imported 2/1/10
 * Additional Notes: This is a utility method used in other methods.
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
 *  Source: Wikipedia Common.js, imported 2/1/10
 *  Additional Notes: This is the primary method used to collapse navigational templates.
 *  Usage: Create a table and give it the class "collapsible".  Ensure that the table has a header row.  Add the class
 *  "collapsed" if you wish the table to be collapsed on page load.
 */
 
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
 
function createTableCollapseButtons()
{
    var tableIndex = 0;
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
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );
 
            // fix width of table to be the same when shown or hidden (IE only)
            Tables[i].style.width = Tables[i].offsetWidth;
 
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
 
addOnloadHook( createTableCollapseButtons );
 
 
/** Collapsible Spoiler divs *********************************************************
 *
 *  Description: Allows a specific div structure to be collapsed.  Parent div is marked as collapsible, first child
 *   div is always displayed, second and third child div are hidden/displayed.
 *  Maintainers: [[User:Pagoda]]
 *  Source: Dragon Quest Wiki
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseDiv( divIndex )
{
    var Button = document.getElementById( "collapseDivButton" + divIndex );
    var Div = document.getElementById( "collapsibleDiv" + divIndex );
 
    if ( !Div || !Button ) {
        return false;
    }
 
    if ( Button.firstChild.data == collapseCaption ) {
        //Div.getElementsByTagName("div")[1].style.display = "none";
        //Div.getElementsByTagName("div")[2].style.display = "none";
        document.getElementById( "collapsibleSpoilerBody" + divIndex ).style.display = "none";
        document.getElementById( "collapsibleSpoilerEnd" + divIndex ).style.display = "none";
        Button.firstChild.data = expandCaption;
    } else {
        //Div.getElementsByTagName("div")[1].style.display = "block";
        //Div.getElementsByTagName("div")[2].style.display = "block";
        document.getElementById( "collapsibleSpoilerBody" + divIndex ).style.display = "block";
        document.getElementById( "collapsibleSpoilerEnd" + divIndex ).style.display = "inline";
        Button.firstChild.data = collapseCaption;
    }
}
 
function createDivCollapseButtons()
{
    var divIndex = 0;
    var NavigationBoxes = new Object();
    var Divs = document.getElementsByTagName( "div" );
 
    for ( var i = 0; i < Divs.length; i++ ) {
        if ( hasClass( Divs[i], "collapsible" ) ) {
 
            var SubDivs = Divs[i].getElementsByTagName( "div" );
            var SpoilerHeadDiv = SubDivs[0];
            var SpoilerBodyDiv = SubDivs[1];
            var SpoilerEndDiv = SubDivs[SubDivs.length-1];
            if (!SpoilerHeadDiv) continue;
 
            NavigationBoxes[ divIndex ] = Divs[i];
            Divs[i].setAttribute( "id", "collapsibleDiv" + divIndex );
            SpoilerHeadDiv.setAttribute( "id", "collapsibleSpoilerHead" + divIndex );
            SpoilerBodyDiv.setAttribute( "id", "collapsibleSpoilerBody" + divIndex );
            SpoilerEndDiv.setAttribute( "id", "collapsibleSpoilerEnd" + divIndex );
 
            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
            ButtonLink.style.color = Divs[i].style.color;
            ButtonLink.setAttribute( "id", "collapseDivButton" + divIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseDiv(" + divIndex + ");" );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            SpoilerHeadDiv.insertBefore( Button, SpoilerHeadDiv.childNodes[0] );
            divIndex++;
        }
    }
 
    for ( var i = 0;  i < divIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( divIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseDiv( i );
        } 
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseDiv ( i );
                    break;
                }
            }
        }
    }
}
 
addOnloadHook( createDivCollapseButtons );
 
// 
 
  function liveClock() {
  	var link = wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge';
  	if (skin == 'monobook') {
  		$('#p-personal .pBody ul').append('<li id="utcdate"><a href="'+link+'"></a></li>');
  	} else if (skin == 'oasis') {
  		$('#WikiaPage #WikiHeader div.buttons').prepend('<div id="utcdate"><a href="'+link+'"></a></div>');
  	}
  	$('#utcdate').css({fontSize: 'larger', fontWeight: 'bolder', textTransform: 'none'});
 
  	showTime();        
  }
  addOnloadHook(liveClock);
 
  function showTime() {
  	var now = new Date();
  	var hh = now.getUTCHours();
  	var mm = now.getUTCMinutes();
  	var ss = now.getUTCSeconds();
  	var dd = now.getUTCDate();
  	var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  	    month  = months[now.getUTCMonth()];
  	var year   = now.getUTCFullYear();
  	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss ) + ', ' + ( dd < 10 ? '0' + dd : dd ) + ' ' + month + ' ' + year + ' (UTC)';
  	$('#utcdate a').text(time);
 
  	window.setTimeout(showTime, 1000);
  }
 
  //