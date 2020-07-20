// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 
/* Test if an element has a certain class **************************************
*
* Description: Uses regular expressions and caching for better performance.
* Maintainers: None
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
  *               [[Wikipedia:Wikipedia:NavFrame|Wikipedia:NavFrame]].
  *  Maintainers: None
  */
 
var autoCollapse = 2;
var collapseCaption = "скрыть";
var expandCaption = "показать";
 
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
             Button.style.fontSize = "75%" ;
             Button.style.width = "9em";
 
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
 
/** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:Wikipedia:NavFrame|Wikipedia:Navframe]].
  *  Maintainers: None
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
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
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
     for(
             var i=0; 
             NavFrame = divs[i]; 
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
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
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
 

 
/* Preloaded stuff */
 
document.write('<script type="text/javascript" src="' 
    + '/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript"></script>');
 
 
// onload stuff
var firstRun = true;
 
function loadFunc()
{
    if(firstRun)
        firstRun = false;
    else
        return;
 
    initFunctionsJS();
 
    // DEPRECATED
    if(document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null)
    {
        document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[' + collapseCaption +']</a>';
    }
 
    addHideButtons();
 
    if(document.getElementById('mp3-navlink') != null)
    {
        document.getElementById('mp3-navlink').onclick = onArticleNavClick;
        document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
    }
 
    if(window.storagePresent)
        initVisibility();
 
    rewriteSearchFormLink();
    fillEditSummaries();
    fillDeleteReasons();
    fillPreloads();
 
    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;
 
    if(!bodyClass || (bodyClass.indexOf('page-') == -1))
    {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }
 
    if(typeof(onPageLoad) != "undefined")
    {
        onPageLoad();
    }
}
 
function fillEditSummaries()
{
    var label = document.getElementById("wpSummaryLabel");
 
    if(label == null)
        return;
 
    var comboString = "Summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
    comboString += "</select><br />";
    label.innerHTML = comboString + label.innerHTML;
 
    requestComboFill('stdSummaries', 'Template:Stdsummaries');
}
 
function onStdSummaryChange()
{
    var combo = document.getElementById("stdSummaries");
    var value = combo.options[combo.selectedIndex].value;
 
    if(value != "")
    {
		if(skin == 'monaco')
		{
			document.getElementById("wpSummaryEnhanced").value = value;
		}
		else
		{
			document.getElementById("wpSummary").value = value;
		}
    }
}
 
function fillDeleteReasons()
{
    var label = document.getElementById("wpReason");
 
    if(label == null)
        return;
 
    label = document.getElementById("contentSub");
 
    if(label == null)
        return;
 
    var comboString = "<br /><select id='stdReasons' onchange='onStdReasonChange()'>";
    comboString += "</select>";
    label.innerHTML += comboString;
 
    requestComboFill('stdReasons', "Template:Stdreasons");
}
 
function onStdReasonChange()
{
    var combo = document.getElementById("stdReasons");
    var value = combo.options[combo.selectedIndex].value;
 
    if(value != "")
        document.getElementById("wpReason").value = value;
}
 
function fillPreloads()
{
    var div = document.getElementById("lf-preload");
 
    if(div == null)
        return;
 
    div.style.display = 'block';
    var span = document.getElementById('lf-preload-cbox');
 
    var comboString = "<select id='stdPreloads' onchange='onPreloadChange()'>";
    comboString += "</select>";
    span.innerHTML = comboString;
 
    span = document.getElementById('lf-preload-pagename');
    span.innerHTML = '<input type="text" class="textbox" />';
    span = document.getElementById('lf-preload-button');
    span.innerHTML = '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />';
 
    requestComboFill('stdPreloads', "Template:Stdpreloads");
}
 
function doCustomPreload()
{
    doPreload(document.getElementById('lf-preload-pagename').getElementsByTagName('input')[0].value);
}
 
function onPreloadChange()
{
    var combo = document.getElementById("stdPreloads");
    var value = combo.options[combo.selectedIndex].value;
 
    if(value == "")
        return;
 
    value = "Template:" + value + "/preload";
    value = value.replace(" ", "_");
    doPreload(value);
}
 
function initVisibility()
{
    var storage = globalStorage[window.location.hostname];
 
    var page = window.pageName.replace(/\W/g,'_');
    var show = storage.getItem('infoboxshow-' + page);
 
    if(show == 'false')
    {
        infoboxToggle();
    }
 
    var hidables = getElementsByClass('hidable');
 
    for(var i = 0; i < hidables.length; i++)
    {
        show = storage.getItem('hidableshow-' + i  + '_' + page);
 
        if(show == 'false')
        {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);
 
            if(content != null && content.length > 0 &&
                button != null && button.length > 0 && content[0].style.display != 'none')
            {
                button[0].onclick('bypass');
            }
        }
        else if(show == 'true')
        {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);
 
            if(content != null && content.length > 0 &&
                button != null && button.length > 0 && content[0].style.display == 'none')
            {
                button[0].onclick('bypass');
            }
        }
    }
}
 
function addHideButtons()
{
    var hidables = getElementsByClass('hidable');
 
    for(var i = 0; i < hidables.length; i++)
    {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');
 
        if(button != null && button.length > 0)
        {
            button = button[0];
 
            button.onclick = toggleHidable;
            button.appendChild(document.createTextNode('[' + collapseCaption + ']'));
 
            if(new ClassTester('start-hidden').isMatch(box))
                button.onclick('bypass');
        }
    }
}
 
function toggleHidable(bypassStorage)
{
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;
 
    if(content != null && content.length > 0)
    {
        content = content[0];
 
        if(content.style.display == 'none')
        {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[' + collapseCaption + ']';
            nowShown = true;
        }
        else
        {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[' + expandCaption + ']';
            nowShown = false;
        }
 
        if(window.storagePresent && (typeof(bypassStorage) == 'undefined' || bypassStorage != 'bypass'))
        {
            var page = window.pageName.replace(/\W/g, '_');
            var items = getElementsByClass('hidable');
            var item = -1;
 
            for(var i = 0; i < items.length; i++)
            {
                if(items[i] == parent)
                {
                    item = i;
                    break;
                }
            }
 
            if(item == -1)
            {
                return;
            }
 
            var storage = globalStorage[window.location.hostname];
            storage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}
 
//addOnloadHook(loadFunc);
 
YAHOO.util.Event.onDOMReady(loadFunc);
 
/* // BEGIN WIKED
addOnloadHook(fillPreloads);
// install [[User:Cacycle/wikEd]] in-browser text editor
if(!wysiwygToolbarItems) {
document.write('<script type="text/javascript" src="'
+ 'http://en.wikipedia.org/w/index.php?title=User:Cacycle/wikEd.js'
+ '&action=raw&ctype=text/javascript"></' + 'script>');
} */
 
////////////////////////////////////////////////////////////////
// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWWiki.
// See http://dev.wikia.com/wiki/AjaxRC
////////////////////////////////////////////////////////////////
 
importScriptPage('AjaxRC/code.js', 'dev');
 
// Faster Dynamic Navigation
 
// set up the words in your language
var NavigationBarHide = '▲';
var NavigationBarShow = '▼';
var NavigationTitleHide = 'скрыть';
var NavigationTitleShow = 'показать';
 
// adds show/hide-button to collapsible navigation
function collapsible_navigation()
{
	$('div.NavFrame').each( function() {
		var	$that = $(this), css_width = $that.css( 'width' ), attr_width = $that.attr( 'width' ),
			which = $that.hasClass( 'selected' ) ? NavigationBarShow : NavigationBarHide;
 
		if ( (!css_width || css_width === 'auto') && (!attr_width || attr_width === 'auto') ) {
			$that.css( 'width', $that.width() );
		}
 
		$that.children('.NavHead').each( function() {
			$(this).append( '<a class="NavToggle">' + which + '</a>' ).click( function() {
				var which = $that.toggleClass('selected').hasClass( 'selected' ), $this = $(this);
 
				$this.find( '.NavToggle' ).text( which ? NavigationBarShow : NavigationBarHide );
 
				if ( which ) {
					$this.attr( 'title', NavigationTitleShow )
						.siblings( ':not(.NavHead)' ).stop( true, true ).fadeOut();
				} else {
					$this.attr( 'title', NavigationTitleHide )
						.siblings( ':not(.NavHead)' ).stop( true, true ).fadeIn();
				}
			}).click();
		});
	});
}
 
$(document).ready( collapsible_navigation );