/* Any JavaScript here will be loaded for all users on every page load. */

// --------------------------------------------------------
// Rights
// Sets a variable "rights" which will return "false" if the 
// currently logged in user is a bureaucrat, administrator, or autoconfirmed user. It will return true otherwise.
// it also defines variables which may be used elsewhere in scripts.
// --------------------------------------------------------

 var rights_isAdmin = (wgUserGroups.toString().indexOf('sysop') != -1);
 var rights_isAuto = (wgUserGroups.toString().indexOf('autoconfirmed') != -1);
 var rights_isCrat = (wgUserGroups.toString().indexOf('bureaucrat') != -1);
 var rights = true;
 if (rights_isCrat || rights_isAdmin || rights_isAuto)
 {rights=false}
//

// --------------------------------------------------------
// UTC Clock
// Adds a live UTC clock to the personal links.
// --------------------------------------------------------

function liveClock(){
	liveClock.node = addPortletLink( 'p-personal', wgServer + '/index.php?title=' + encodeURIComponent(wgPageName) + '&action=view', '', 'utcdate' );
	liveClock.node.style.fontSize = 'larger';
	liveClock.node.style.fontWeight = 'bolder';
 
	showTime();
}
addOnloadHook(liveClock);
 
function showTime(){
	var dateNode = liveClock.node;
	if( !dateNode ) {
		return;
	}
 
	var now = new Date();
	var hh = now.getUTCHours();
	var mm = now.getUTCMinutes();
	var ss = now.getUTCSeconds();
	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
	dateNode.firstChild.replaceChild( document.createTextNode( time ), dateNode.firstChild.firstChild );
 
	window.setTimeout(showTime, 1000);
}

// --------------------------------------------------------
// Collapsible tables
// Description: Allows tables to be collapsed, showing only the header. See [[Wikipedia:NavFrame]].
// Maintainers: User:R. Koot
// --------------------------------------------------------
 
var autoCollapse = 2;
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
        }
}
 
addOnloadHook( createCollapseButtons );


// --------------------------------------------------------
// Dynamic Navigation Bars (experimental)
// Description: See [[Wikipedia:NavFrame]].
// --------------------------------------------------------
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
        var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
        var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
        if (!NavFrame || !NavToggle) {
                return false;
        }
 
        // if shown now
        if (NavToggle.firstChild.data == NavigationBarHide) {
                for (
                        var NavChild = NavFrame.firstChild;
                        NavChild != null;
                        NavChild = NavChild.nextSibling
                ) {
                if ( hasClass( NavChild, 'NavPic' ) ) {
                        NavChild.style.display = 'none';
                }
                if ( hasClass( NavChild, 'NavContent') ) {
                        NavChild.style.display = 'none';
                }
        }
        NavToggle.firstChild.data = NavigationBarShow;
 
        // if hidden now
        } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
        ) {
                if( hasClass(NavChild, 'NavPic') ) {
                        NavChild.style.display = 'block';
                }
                if( hasClass(NavChild, 'NavContent') ) {
                        NavChild.style.display = 'block';
                }
        }
        NavToggle.firstChild.data = NavigationBarHide;
        }
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
        var indexNavigationBar = 0;
        // iterate over all < div >-elements 
        var divs = document.getElementsByTagName("div");
        for(
                var i=0; 
                NavFrame = divs[i]; 
                i++
                ) {
        // if found a navigation bar
        if( hasClass(NavFrame, "NavFrame") ) {
 
                indexNavigationBar++;
                var NavToggle = document.createElement("a");
                NavToggle.className = 'NavToggle';
                NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
                var NavToggleText = document.createTextNode(NavigationBarHide);
                for (
                        var NavChild = NavFrame.firstChild;
                        NavChild != null;
                        NavChild = NavChild.nextSibling
                        ) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        if (NavChild.style.display == 'none') {
                                NavToggleText = document.createTextNode(NavigationBarShow);
                                break;
                        }
                }
        }
 
                NavToggle.appendChild(NavToggleText);
                // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
                for(
                        var j=0;
                        j < NavFrame.childNodes.length;
                        j++
                        ) {
                        if( hasClass(NavFrame.childNodes[j], "NavHead") ) {
                                NavFrame.childNodes[j].appendChild(NavToggle);
                        }
                }
                NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
                }
        }
}
 
addOnloadHook( createNavigationBarToggleButton );
 

// --------------------------------------------------------
// Test if an element has a certain class
// Description: Uses regular expressions and caching for better performance.
// Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
// --------------------------------------------------------
 
var hasClass = (function () {
        var reCache = {};
        return function (element, className) {
                return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
        };
})();


// --------------------------------------------------------
// addPurge
// adds a "purge" tab (after "watch")
// --------------------------------------------------------
addOnloadHook(function () {
    if (wgAction != 'edit' && wgCanonicalNamespace != 'Special' && wgAction != 'history' && wgAction != 'delete' && wgAction != 'watch' && wgAction 
    != 'unwatch' && wgAction != 'protect' && wgAction != 'markpatrolled' && wgAction != 'rollback' && document.URL.indexOf('diff=') <= 0
    && document.URL.indexOf('oldid=') <=0)
    { var hist; var url;
    if (!(hist = document.getElementById('ca-history') )) return;
    if (!(url = hist.getElementsByTagName('a')[0] )) return;
    if (!(url = url.href )) return;
    addPortletLink('p-cactions', url.replace(/([?&]action=)history([&#]|$)/, '$1purge$2'),
                   'purge', 'ca-purge', 'Purge server cache for this page', '0');
}
});
//


// --------------------------------------------------------
// addSubpages
// adds a 'subpages' link to the toolbox bar (excludes File, MediaWiki and Category namespaces)
// --------------------------------------------------------
addOnloadHook(function () {
  var NSWithoutSubpages = new Array(-1, 6, 8, 14);
  if (document.getElementById('p-tb') && NSWithoutSubpages.indexOf(wgNamespaceNumber) == -1)
    {
    var linkSubpages = '/Special:PrefixIndex/' + wgPageName + '/';
    addPortletLink('p-tb', linkSubpages, 'Subpages', 't-subpages', 'Subpages of this page');
    }
});
//


// ForcePreviewLite //
// A modified version of http://en.wikipedia.org/wiki/Wikipedia:WikiProject_User_scripts/Scripts/Force_edit_summary_alternative //
// NOTE: This is not a completed script, only a test of possible options for future addition. Implementation of this script would be done by combining the code of "function forceSummary()" into "function forcePreview()" at http://www.mediawiki.org/wiki/Manual:Force_preview //
 
function addForceSummary()
{
    if(!/&action=edit/.test(window.location.href) && !/&action=submit/.test(window.location.href)) return;
    if(/&section=new/.test(window.location.href)) return;
    if(!document.forms.editform) return;
    document.forms.editform.wpSave.onclick = forceSummary;
}
 
function forceSummary()
{
        flashcolour(7);
        document.forms.editform.wpSave.onclick = "";
        return false;
}
 
var flashcolour_timer;
function flashcolour(count) {
    if (count%2 == 1)
        document.getElementById("wpPreview").style.backgroundColor = "silver";
    else
        document.getElementById("wpPreview").style.backgroundColor = "yellow";

 
    if (flashcolour_timer != null) {
        clearTimeout(flashcolour_timer);
        flashcolour_timer = null;
    }
 
    if (count > 0)
        flashcolour_timer = window.setTimeout("flashcolour(" + (count-1) + ")",350);
}
 
if (wgAction != "submit" && rights == true)
{
addOnloadHook(addForceSummary);
}
 
// (end of script)


importStylesheetURI('http://zeldawiki.org/User:Adam/menu.css&ctype=text/css&action=raw');