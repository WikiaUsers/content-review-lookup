/*<pre>*/
 
/** Collapsible tables from Wikipedia********************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header.
 */
var autoCollapse;
if( autoCollapse == undefined ) autoCollapse = 2;
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
            Button.style.marginLeft = "-100%";
 
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
            /* only add button and increment count if there is a header row to work with */
            if (Header) {
                Header.insertBefore( Button, Header.childNodes[0] );
                tableIndex++;
            }
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        }
    }
}
 
addOnloadHook( createCollapseButtons );
 
/*</pre>*/
 
/*<pre>*/
 
/** Dynamic Navigation Bars *************************************
 *
 *  Base Description: See Wikipedia:Wikipedia:NavFrame.
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = autoCollapse;
 
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//	 indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
	var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
	var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
	if (!NavFrame || !NavToggle) {
		return false;
	}
 
	if (NavToggle.firstChild.data == NavigationBarHide) {// if shown now
		for (
				var NavChild = NavFrame.firstChild;
				NavChild != null;
				NavChild = NavChild.nextSibling
			) {
			if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent') ) {
				NavChild.style.display = 'none';
			}
		}
		NavToggle.firstChild.data = NavigationBarShow;
	} else if (NavToggle.firstChild.data == NavigationBarShow) {// if hidden now
		var TagRelations = {
			'table': 'table',
			'span':  'inline',
			'label': 'inline'
		};
		for (
				var NavChild = NavFrame.firstChild;
				NavChild != null;
				NavChild = NavChild.nextSibling
			) {
			if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent') ) {
				var disp = TagRelations[NavChild.tagName.toLowerCase()];
				NavChild.style.display = ( disp ? disp : 'block' );
			}
		}
		NavToggle.firstChild.data = NavigationBarHide;
	}
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
	var indexNavigationBar = 0;
	// iterate over all < div >-elements, < span >-elements, and <fieldset>-elements
	var blocks = document.getElementsByTagName("div");
	var spans = document.getElementsByTagName("span");
	var fieldsets = document.getElementsByTagName("fieldset");
	for(
			var i=0;
			i < spans.length;
			i++
		) blocks[blocks.length+i] = spans[i];
	for(
			var i=0;
			i < fieldsets.length;
			i++
		) blocks[blocks.length+spans.length+i] = fieldsets[i];
	for(
			var i=0; 
			NavFrame = blocks[i]; 
			i++
		) {
		// if found a navigation bar
		if (hasClass(NavFrame, "NavFrame")) {
 
			indexNavigationBar++;
			var NavToggle = document.createElement("a");
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
			NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
			var NavToggleText = document.createTextNode(NavigationBarHide);
			NavToggle.appendChild(NavToggleText);
			// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
			for(
			  var j=0; 
			  j < NavFrame.childNodes.length; 
			  j++
			) {
			  if (hasClass(NavFrame.childNodes[j], "NavHead")) {
				if( NavFrame.childNodes[j].tagName.toLowerCase() == 'legend' )
					NavFrame.childNodes[j].appendChild(document.createTextNode(' - '));
				NavFrame.childNodes[j].appendChild(NavToggle);
			  }
			}
			NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
		}
	}
	// if more Navigation Bars found than Default: hide all
	if (indexNavigationBar >= NavigationBarShowDefault) {
		for(
				var i=1; 
				i<=indexNavigationBar; 
				i++
		) {
			toggleNavigationBar(i);
		}
	}
 
}
 
addOnloadHook( createNavigationBarToggleButton );
 
/*<pre>*/
 
/*<pre>*/
 
/** Collapsible Edittools *************************************
 *
 * Author: Dantman
 */
 
var edittools;
var edittools_head;
var edittools_button;
var edittools_button_text;
var edittools_content;
 
var edittools_cookiename = 'autoCollapseEdittools';
var edittools_cookiepos = document.cookie.indexOf(edittools_cookiename+'=');
var edittools_cookievalue = "";
if (edittools_cookiepos > -1) {
	edittools_cookiepos = edittools_cookiepos + edittools_cookiename.length + 1;
	var edittools_cookieend = document.cookie.indexOf(";", edittools_cookiepos);
	if (edittools_cookieend > -1) {
		edittools_cookievalue = document.cookie.substring(edittools_cookiepos, edittools_cookieend);
	} else {
		edittools_cookievalue = document.cookie.substring(edittools_cookiepos);
	}
}
 
addOnloadHook(setupCollapseibleEdittools);
function setupCollapseibleEdittools() {
	edittools = document.getElementById( 'edittools' );
 
	if( edittools ) {
		edittools_head    = document.getElementById( 'edittools_head' );
		edittools_content = document.getElementById( 'edittools_content' );
		edittools_button = document.createElement("a");
		edittools_button.setAttribute('id', 'edittools_button');
		edittools_button.setAttribute('href', 'javascript:void(0);');
		edittools_button.setAttribute('onclick', 'javascript: toggleEdittools(true);');
		edittools_button_text = document.createTextNode(NavigationBarHide);
		edittools_button.appendChild(edittools_button_text);
		edittools_head.getElementsByTagName('p')[0].appendChild(edittools_button);
		if( edittools_cookievalue == 'true' ) toggleEdittools(false);
	}
}
function toggleEdittools(doCookie) {
	var date = new Date();
	if( edittools_button_text.data == NavigationBarShow ) {
		date.setTime(date.getTime() - 30*86400*1000);
		edittools_button_text.data = NavigationBarHide;
		edittools_content.style.display = 'block';
		if(doCookie) document.cookie = edittools_cookiename + "=false; expires="+date.toGMTString() + "; path=/";
	} else {
		date.setTime(date.getTime() + 30*86400*1000);
		edittools_button_text.data = NavigationBarShow;
		edittools_content.style.display = 'none';
		if(doCookie) document.cookie = edittools_cookiename + "=true; expires="+date.toGMTString() + "; path=/";
	}
}
 
/*<pre>*/