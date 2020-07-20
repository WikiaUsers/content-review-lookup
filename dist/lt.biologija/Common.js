/* Bet koks čia parašytas JavaScript bus rodomas kiekviename puslapyje kiekvienam naudotojui.*/

/**
* importScript inserts a javascript page either 
*    from Wiktionary: importScript('User:Connel MacKensie/yetanother.js');
*    from another Wikimedia wiki: importScript('User:Lupin/insane.js','en.wikipedia.org');
*
*    by specifying the third argument, an oldid can be passed to ensure that updates to the script are not included.
*    by specifying the fourth argument, a specific version of JavaScript can be declared.
*
*    based on [[w:MediaWiki:Common.js]] 2007-11-29
**/
var importedScripts={};
function importScript(page, wiki, oldid, jsver) {
//Default to local
if(!wiki){wiki="lt.biologija.wikia.com"};
 
//Only include scripts once
if(importedScripts[wiki+page])
return false;
importedScripts[wiki+page] = true;
 
var url = 'http://' +escape(wiki)+ wgScript //Assuming all wikis update in tandem
+ '?title=' +encodeURIComponent( page.replace(/ /g, '_') )
+ (oldid?'&oldid='+encodeURIComponent( oldid ):'')
+ '&action=raw&ctype=text/javascript&dontcountme=s';
 
var scriptElem = document.createElement("script");
scriptElem.setAttribute("src",url);
scriptElem.setAttribute("type", jsver ? "application/javascript;version=" + jsver : "text/javascript");
document.getElementsByTagName("head")[0].appendChild(scriptElem);
return true;
}
 
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
 
/*function hideFirstHeading (){*/
  /* Kad nerodytų Pagrindinis puslapis, pradiniame psl.*/
  var mpTitle = "Pagrindinis_puslapis";
  var isMainPage = (wgPageName == mpTitle);
  var isDiff = (document.location.search && (document.location.search.indexOf("diff=") != -1 ||  document.location.search.indexOf("oldid=") != -1));
  var isListTable = document.getElementById( "listtable" );
 
  if (isMainPage && !isDiff) 
  {
    document.write('<style type="text/css">/*<![CDATA[*/ #lastmod, #siteSub, #contentSub, h1.firstHeading { display: none  !important; } /*]]>*/</style>');
  }
  if (isListTable) 
  {
    document.write('<style type="text/css">/*<![CDATA[*/ #lastmod, #siteSub, #contentSub, h1.firstHeading { display: none  !important; } /*]]>*/</style>');
  }
/*}

addOnloadHook( hideFirstHeading );*/

function addLoadEvent(func) 
{
if (window.addEventListener) 
window.addEventListener("load", func, false);
else if (window.attachEvent) 
window.attachEvent("onload", func);
}
 
/* Import more specific scripts if necessary */
 
if (wgAction == "edit" || wgAction == "submit" || wgPageName == "Special:Upload") //scripts specific to editing pages
{
importScript("MediaWiki:Common.js/edit.js")
}

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
var autoCollapse = 2;
var collapseCaption = "slėpti";
var expandCaption = "rodyti";
 
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
 
/** Dynamic Navigation Bars (experimental) *************************************
*
*  Description: See [[Wikipedia:NavFrame]].
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
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}
 
addOnloadHook( createNavigationBarToggleButton );

function moveRc()
{
   var RcBar = document.getElementById("rc-nuorodos");
   var fieldsets = document.getElementById("fb-root");
   if (!RcBar || !fieldsets) {
        return false;
   }
   fieldsets[0].appendChild(RcBar);
}

if( wgNamespaceNumber >= 0 && !window.PurgeButtonsLoaded && document.getElementById('control_purge') == null && wgNamespaceNumber != 500 && wgNamespaceNumber != 502 ) {
	addOnloadHook( addPurgeButton );
}
var PurgeButtonsLoaded = true; // prevent duplicate running (but not dupe buttons from outside this code)

function addPurgeButton () {
	var theText = 'Atnaujinti'; //default text, ala SMW
	
	if( typeof PurgeButtonText == "string" ) {
		theText = PurgeButtonText;
	}

	switch( skin ) {
		case 'answers': /* forked from monaco, close enough, pass to monaco */
		case 'awesome': /* you really shouldnt even have this value... */
		case 'monaco_old': /* really, where are you getting these skin settings from... */
		case 'monaco':
			$('#page_controls').append('<li id="control_purgebutton"><img src="/skins/common/blank.gif" class="sprite refresh" /><a id="ca-purge" href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=purge" rel="nofollow" title="Atnaujinti puslapį">'+ theText + '</a></li>');
			break;


		case 'uncyclopedia': /* monobook clone, pass to monobook */
		case 'wowwiki': /* monobook clone, pass to monobook */
		case 'lostbook': /* monobook clone, pass to monobook */
		case 'monobook':
			$('#p-cactions > .pBody > ul').append('<li id="ca-purge"><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=purge" title="Atnaujinti puslapį">'+ theText + '</a></li>');
			break;

		case 'oasis':
			$('header.WikiaPageHeader > ul.wikia-menu-button > li > ul').append('<li><a href="/index.php?title='+encodeURIComponent(wgPageName)+'&action=purge" title="Atnaujinti puslapį">'+ theText + '</a></li>');
			break;

	}
}

if( wgNamespaceNumber >= 0 && !window.FactButtonsLoaded && document.getElementById('control_fact') == null && wgNamespaceNumber != 500 && wgNamespaceNumber != 502 ) {
	addOnloadHook( addFactButton );
}
var FactButtonsLoaded = true; // prevent duplicate running (but not dupe buttons from outside this code)

function addFactButton () {
	var theText = 'Faktai'; //default text, ala SMW
	
	if( typeof FactButtonText == "string" ) {
		theText = FactButtonText;
	}

	switch( skin ) {
		case 'answers': /* forked from monaco, close enough, pass to monaco */
		case 'awesome': /* you really shouldnt even have this value... */
		case 'monaco_old': /* really, where are you getting these skin settings from... */
		case 'monaco':
			$('#page_controls').append('<li id="control_factbutton"><img src="/skins/common/blank.gif" class="sprite refresh" /><a id="ca-fact" href="/wiki/Specialus:Browse/'+encodeURIComponent(wgPageName)+'" rel="nofollow" title="Faktai">'+ theText + '</a></li>');
			break;


		case 'uncyclopedia': /* monobook clone, pass to monobook */
		case 'wowwiki': /* monobook clone, pass to monobook */
		case 'lostbook': /* monobook clone, pass to monobook */
		case 'monobook':
			$('#p-cactions > .pBody > ul').append('<li id="ca-fact"><a href="/="/wiki/Specialus:Browse/'+encodeURIComponent(wgPageName)+'" title="Faktai">'+ theText + '</a></li>');
			break;

		case 'oasis':
			$('header.WikiaPageHeader > ul.wikia-menu-button > li > ul').append('<li><a href="/wiki/Specialus:Browse/'+encodeURIComponent(wgPageName)+'" title="Faktai">'+ theText + '</a></li>');
			break;

	}
}