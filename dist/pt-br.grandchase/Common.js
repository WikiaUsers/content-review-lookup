/*RailWAM for sitewide use*/
window.railWAM = {
    logPage:"Project:WAM Log"
};
/*RailWAM for sitewide use*/


// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


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
 
var autoCollapse = 2;
var collapseCaption = "Ocutar";
var expandCaption = "Mostrar";
 
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
 
function createCollapseButtons()
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
 
            Button.style.styleFloat = "right";    //
            Button.style.cssFloat = "right";      // REMOVE THESE LINES
            Button.style.fontWeight = "normal";   // ON 10 FEBRUARY 2009
            Button.style.textAlign = "right";     // 
            Button.style.width = "6em";           //
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
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

 /**
 * Barras de navegação dinâmicas (experimental)
 * Ver [[Wikipédia:NavFrame]].
 * @author: UNMAINTAINED
 * TODO: Remover quando [[mw:ResourceLoader/Default_modules#jQuery.makeCollapsible]] estiver em uso e
 * as predefinições forem adaptadas para usar o novo plugin
 */
 
// set up the words in your language
var	NavigationBarHide = '[' + collapseCaption + ']',
	NavigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars
 * @param {number} indexNavigationBar: the index of navigation bar to be toggled
 * @return {boolean} Caso não encontre a tabela ou o botão com o índice informado retorna false
 */
function toggleNavigationBar(indexNavigationBar) {
	var	NavChild,
		NavToggle = document.getElementById('NavToggle' + indexNavigationBar),
		NavFrame = document.getElementById('NavFrame' + indexNavigationBar);
 
	if (!NavFrame || !NavToggle) {
		return false;
	}
	var $child;
	// if shown now
	if (NavToggle.firstChild.data == NavigationBarHide) {
		for (NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling) {
			$child = $(NavChild);
			if ($child.hasClass('NavContent') || $child.hasClass('NavPic')) {
				NavChild.style.display = 'none';
			}
		}
		NavToggle.firstChild.data = NavigationBarShow;
 
		// if hidden now
	} else if (NavToggle.firstChild.data == NavigationBarShow) {
		for (NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling) {
			$child = $(NavChild);
			if ($child.hasClass('NavContent') || $child.hasClass('NavPic')) {
				NavChild.style.display = 'block';
			}
		}
		NavToggle.firstChild.data = NavigationBarHide;
	}
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
	var	NavChild, $child,
		indexNavigationBar = 0,
		// iterate over all < div >-elements
		divs = document.getElementsByTagName('div');
	NavFrame = divs[0];
	for ( var i = 0; NavFrame; i++ ) {
		var $frame = $(NavFrame);
		// if found a navigation bar
		if ($frame.hasClass( 'NavFrame' )) {
 
			indexNavigationBar++;
			var NavToggle = document.createElement( 'a' );
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar);
			NavToggle.setAttribute( 'href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');' );
 
			var isCollapsed = $frame.hasClass('collapsed');
			/*
			 * Check if any children are already hidden.  This loop is here for backwards compatibility:
			 * the old way of making NavFrames start out collapsed was to manually add style="display:none"
			 * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
			 * the content visible without JavaScript support), the new recommended way is to add the class
			 * 'collapsed' to the NavFrame itself, just like with collapsible tables.
			 */
			for (NavChild = NavFrame.firstChild; NavChild !== null && !isCollapsed; NavChild = NavChild.nextSibling) {
				$child = $(NavChild);
				if ($child.hasClass('NavPic') || $child.hasClass('NavContent')) {
					if (NavChild.style.display == 'none') {
						isCollapsed = true;
					}
				}
			}
			if (isCollapsed) {
				for (NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling) {
					$child = $(NavChild);
					if ($child.hasClass('NavPic') || $child.hasClass('NavContent')) {
						NavChild.style.display = 'none';
					}
				}
			}
			var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
			NavToggle.appendChild(NavToggleText);
			// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
			for (var j = 0; j < NavFrame.childNodes.length; j++) {
				var $node = $(NavFrame.childNodes[j]);
				if ($node.hasClass('NavHead')) {
					NavToggle.style.color = NavFrame.childNodes[j].style.color;
					NavFrame.childNodes[j].appendChild(NavToggle);
				}
			}
			NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar);
		}
		NavFrame = divs[i];
	}
}
 
$( createNavigationBarToggleButton );