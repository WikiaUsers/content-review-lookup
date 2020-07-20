/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[wikipedia:User:Mike Dillon]], [[wikipedia:User:R. Koot]], [[wikipedia:User:SG]]
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
 *               [[wikipedia:Wikipedia:NavFrame]].
 *  Maintainers: [[wikipedia:User:R. Koot]]
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
 
 
/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[wikipedia:Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var isCollapsed = hasClass( NavFrame, "collapsed" );
            /*
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if ( NavChild.style.display == 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
 
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}
 
addOnloadHook( createNavigationBarToggleButton );

function ImagesOnWiki() {

$('.LatestPhotosModule details span.fixedwidth').html('Wikia Images');

}

addOnloadHook(ImagesOnWiki);

/* extra rollback links */
function CustomRollbacks() {
	var Buttons = [{ //Your buttons go here. You can copy and paste this to make more than three
		text: 'spam',
		title: 'Revert spam',
		summary: '[[Help:Spam|spam]]'
	}, {
		text: 'vandalism',
		title: 'Revert vandalism',
		summary: '[[Help:Vandalism|vandalism]]'
	}, {
		text: 'null',
		title: 'Revert with no summary',
		summary: ' ' //This one has no summary
	}];

	var list = document.getElementsByTagName('span');
	for(i in list) {
		if(list[i].className == 'mw-rollback-link') {
			var link = list[i];
			var rollback = link.innerHTML;
			for(j in Buttons) {
				var customlink = document.createElement('span');
				customlink.innerHTML = rollback;
				customlink.className = 'customrollback'; //we do this to avoid an infinite loop, because when we insert a <span> into the DOM, the list variable includes it
				customlink.getElementsByTagName('a')[0].title = Buttons[j].title;
				customlink.getElementsByTagName('a')[0].href += '&summary=' + Buttons[j].summary;
				customlink.getElementsByTagName('a')[0].innerHTML = Buttons[j].text;
				if(wgPageName == 'Special:RecentChanges' || wgPageName == 'Special:Contributions') {
					link.parentElement.appendChild(customlink);
					customlink.outerHTML = ' ' + customlink.outerHTML;
				}
				else { //assumes you're on history
					link.parentElement.insertBefore(customlink, link.nextSibling);
					customlink.outerHTML = ' | ' + customlink.outerHTML;
				}
			}
		}
	}
	for(i in list) { //why another one of these? we're fixing the class that we set to avoid an infinite loop
		if(list[i].className == 'customrollback') {
			list[i].className = 'mw-rollback-link';
		}
	}
}
 
addOnloadHook(CustomRollbacks);

function CreatePageButton() {
	$('#WikiaPageHeader .wikia-button').after('<a href="/wiki/Special:CreatePage" title="Create a new page on this wiki" class="wikia-button createpage"><img src="https://images.wikia.nocookie.net/__cb35955/common/skins/common/blank.gif" height="0" width="0" class="sprite new" style="margin-left:-5px;">Add a Page</a>');
	$('#WikiaPageHeader .wikia-menu-button').after('<a href="/wiki/Special:CreatePage" title="Create a new page on this wiki" class="wikia-button createpage"><img src="https://images.wikia.nocookie.net/__cb35955/common/skins/common/blank.gif" height="0" width="0" class="sprite new" style="margin-left:-5px;">Add a Page</a>');
}

addOnloadHook(CreatePageButton);

 function formatRecentChanges() {
   /*
    * formatRecentChanges()
    * (c) Tim Laqua, 2007
    */
 
   if (wgCanonicalNamespace == 'Special' && wgCanonicalSpecialPageName == 'Recentchanges' ) {
     var colorPrimaryRow = '#FFFFFF';
     var colorAltRow = '#EEEEEE';
     var colorPatrolledRow = '#FFFF99';
     var colorHeaderRow = '#cccccc';
     var colorFooterRow = '#cccccc';
     var columns = '7'; 
 
     var colUL = document.getElementsByTagName('ul');
     if ( colUL.length > 0 ) {
       var tableWrapper = document.createElement('table');
       var tableNode = document.createElement('tbody');
       tableWrapper.width = '100%';
       var contentDiv = document.getElementById('content');
       contentDiv.appendChild(tableWrapper);
       tableWrapper.appendChild(tableNode);
 
       for(var i=0; i<colUL.length; i++) {
         if (colUL[i].className == 'special') {
           var altRow = false;
 
           var nodeListHeading = document.getElementsByTagName('h4')[0];
           var rowHeading = document.createElement('tr');
           var cellHeading = document.createElement('td');
 
           cellHeading.appendChild(nodeListHeading);
           cellHeading.colSpan = columns;
           rowHeading.appendChild(cellHeading);
           rowHeading.style.backgroundColor = colorHeaderRow;
 
           tableNode.appendChild(rowHeading);
 
           var colLI = colUL[i].getElementsByTagName('li');
           for(var j=0; j<colLI.length; j++) {
             var minor = false;
             var bot = false;
             var unpatrolled = false;
             var newpage = false;
 
             var rowNode = document.createElement('TR');
 
             var flagNode = document.createElement('TD');
             flagNode.style.whiteSpace = 'nowrap'; 
 
             var changedNode = document.createElement('TD');
             changedNode.style.whiteSpace = 'nowrap';
             changedNode.style.textAlign = 'right';
 
             var messageNode = document.createElement('TD');
 
             //var colSPAN = colLI[j].getElementsByTagName('span');
             var colSPAN = colLI[j].childNodes;
             for(var k=0; k < colSPAN.length; k++) {
               if (colSPAN[k].nodeType == 1) {
                 switch (colSPAN[k].className.toLowerCase()) {
                   case 'mw-plusminus-neg':
                     //add to changedNode
                     changedNode.appendChild(colSPAN[k--]);
                     break;
                   case 'mw-plusminus-null':
                     //add to changedNode
                     changedNode.appendChild(colSPAN[k--]);
                     break;
                   case 'mw-plusminus-pos':
                     //add to changedNode
                     changedNode.appendChild(colSPAN[k--]);
                     break;
                   case 'unpatrolled':
                     //add to flagNode
                     unpatrolled = true;
                     flagNode.appendChild(colSPAN[k--]);
                     break;
                   case 'minor':
                     //add to flagNode
                     minor = true;
                     flagNode.appendChild(colSPAN[k--]);
                     break;
                   case 'newpage':
                     //add to flagNode
                     newpage = true;
                     flagNode.appendChild(colSPAN[k--]);
                     break;
                   case 'bot':
                     //add to flagNode
                     bot = true;
                     flagNode.appendChild(colSPAN[k--]);
                     break;
                   case 'comment':
                     //add to messageNode
                     messageNode.appendChild(colSPAN[k--]);
                     break;
                   default:
                     //do nothing
                 }
               }
             }
 
             //check for unpatrolled flag
             if (unpatrolled) {
               rowNode.style.backgroundColor = colorPatrolledRow;
             } else {
               if (altRow) {
                 rowNode.style.backgroundColor = colorAltRow;
               } else {
                 rowNode.style.backgroundColor = colorPrimaryRow;
               }
             }
             altRow = altRow ? false : true;
 
             var regexp = /; (\d\d:\d\d)/i;
             var colMatches = colLI[j].innerHTML.match(regexp);
             var time = colMatches[1];
             var cleanText = colLI[j].innerHTML.replace(regexp,'');
 
             var arrLI = cleanText.split(' . . ');
 
             var timeNode = document.createElement('TD');
             timeNode.innerHTML = time;
             timeNode.style.whiteSpace = 'nowrap';
 
             var contextNode = document.createElement('TD');
             contextNode.innerHTML = arrLI[0];
             contextNode.style.whiteSpace = 'nowrap';
 
             var titleNode = document.createElement('TD');
             //titleNode.style.whiteSpace = 'nowrap';
             var nameNode = document.createElement('TD');
             nameNode.style.whiteSpace = 'nowrap';
 
             if (arrLI.length == 4) {
               //standard entry
               titleNode.innerHTML = arrLI[1];
               nameNode.innerHTML = arrLI[3];
             } else if (arrLI.length == 2) {
               //log message - append fragment to message node
               nameNode.innerHTML = arrLI[1];
             }
 
             if (changedNode.firstChild) {
               changedNode.firstChild.innerHTML = 
                 changedNode.firstChild.innerHTML.replace(/(^\s*\()|(\)\s*$)/ig,'');
             }
 
             if (messageNode.firstChild) {
               messageNode.firstChild.innerHTML = 
                 messageNode.firstChild.innerHTML.replace(/(^\s*\()|(\)\s*$)/ig,'');
             }
 
             rowNode.appendChild(timeNode);
             rowNode.appendChild(contextNode);
             rowNode.appendChild(flagNode);
             rowNode.appendChild(titleNode);
             rowNode.appendChild(messageNode);
             rowNode.appendChild(nameNode);
             rowNode.appendChild(changedNode);
 
             tableNode.appendChild(rowNode);
           }
           colUL[i].parentNode.removeChild(colUL[i--]);
         }
       }
     }
   }
 }
 
 addOnloadHook(formatRecentChanges);