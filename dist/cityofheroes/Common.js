/* Any JavaScript here will be loaded for all users on every page load. */

// Following is from http://www.wikia.com/index.php?title=Help:Dynamic_navigation&oldid=88652

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
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
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6%";
 
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
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  // var NavigationBarShowDefault = autoCollapse;
  
  
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
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
  } 
  addOnloadHook( createNavigationBarToggleButton );

// End from http://www.wikia.com/index.php?title=Help:Dynamic_navigation&oldid=88652

function activateDivs()
{
   // iterate over all < div >-elements 
   var divs = document.getElementsByTagName("div");
   for( var i=0; eachDiv = divs[i]; i++ )
   {
       if (hasClass(eachDiv, "Clippy")) {

           // if found a Clippy div
           var ClippyEmbed = document.createElement("embed");
           ClippyEmbed.setAttribute('src', 'http://www.swfcabin.com/swf-files/1336591138.swf');
           ClippyEmbed.setAttribute('width', '110');
           ClippyEmbed.setAttribute('height', '14');
           ClippyEmbed.setAttribute('name', 'clippy');
           ClippyEmbed.setAttribute('quality', 'high');
           ClippyEmbed.setAttribute('allowScriptAccess', 'always');
           ClippyEmbed.setAttribute('type', 'application/x-shockwave-flash');
           ClippyEmbed.setAttribute('pluginspage', 'http://www.macromedia.com/go/getflashplayer');
           ClippyEmbed.setAttribute('FlashVars', 'text=' + eachDiv.getAttribute('title'));

           eachDiv.appendChild(ClippyEmbed);
           continue;
       }

       childAnchors = eachDiv.getElementsByTagName('a');
       if(childAnchors.length > 0)
       {
         lastLink = childAnchors[childAnchors.length - 1].href;
       }
       else
       {
         lastLink = '#';
       }

       if (hasClass(eachDiv, "unspecifiedfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass(""); arrowClass("unspecifiedfilter"); return false');
       else if (hasClass(eachDiv, "blasterfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("blaster"); arrowClass("blasterfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "controllerfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("controller"); arrowClass("controllerfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "defenderfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("defender"); arrowClass("defenderfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "scrapperfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("scrapper"); arrowClass("scrapperfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "tankerfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("tanker"); arrowClass("tankerfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "peacebringerfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("peacebringer"); arrowClass("peacebringerfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "warshadefilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("warshade"); arrowClass("warshadefilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "brutefilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("brute"); arrowClass("brutefilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "stalkerfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("stalker"); arrowClass("stalkerfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "mastermindfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("mastermind"); arrowClass("mastermindfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "dominatorfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("dominator"); arrowClass("dominatorfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "corruptorfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("corruptor"); arrowClass("corruptorfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "widowfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("widow"); arrowClass("widowfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "soldierfilter"))
           eachDiv.setAttribute('onclick', 'displayATClass("soldier"); arrowClass("soldierfilter")' + (lastLink.charAt(lastLink.length - 1) == '#' ? '; return false' : ''));
       else if (hasClass(eachDiv, "neutralfilter"))
           eachDiv.setAttribute('onclick', 'strikeClass(""); hideClass(""); arrowClass("neutralfilter"); return false');
       else if (hasClass(eachDiv, "herofilter"))
           eachDiv.setAttribute('onclick', 'strikeClass("nohero"); hideClass("(alttextslash|alttextvillain)"); arrowClass("herofilter"); return false');
       else if (hasClass(eachDiv, "vigilantefilter"))
           eachDiv.setAttribute('onclick', 'strikeClass(""); hideClass("(alttextslash|alttextvillain)"); arrowClass("vigilantefilter"); return false');
       else if (hasClass(eachDiv, "villainfilter"))
           eachDiv.setAttribute('onclick', 'strikeClass("novillain"); hideClass("(alttexthero|alttextslash)"); arrowClass("villainfilter"); return false');
       else if (hasClass(eachDiv, "roguefilter"))
           eachDiv.setAttribute('onclick', 'strikeClass(""); hideClass("(alttexthero|alttextslash)"); arrowClass("roguefilter"); return false');
       else if (hasClass(eachDiv, "loyalistfilter"))
           eachDiv.setAttribute('onclick', 'strikeClass("nopraetorian"); hideClass("(alttexthero|alttextslash)"); arrowClass("loyalistfilter"); return false');
       else if (hasClass(eachDiv, "resistancefilter"))
           eachDiv.setAttribute('onclick', 'strikeClass("nopraetorian"); hideClass("(alttextslash|alttextvillain)"); arrowClass("resistancefilter"); return false');
   }
}
addOnloadHook( activateDivs );

function hideReadMore()
{
   // iterate over all < table >-elements 
   tables = document.getElementsByTagName("table");
   for( var i=0; NavboxTable = tables[i]; i++ )
   {
       if (hasClass(NavboxTable, "navbox"))
       {
           // if found a navbox table
           navs = document.getElementsByTagName("nav");
           for( var j=0; RPMNav = navs[j]; j++ )
           {
               if (hasClass(RPMNav, "RelatedPagesModule"))
               {
                   // if found a RelatedPagesModule nav
                   RPMNav.setAttribute('style', 'display:none;');
               }
           }
           // only need to do this for the first navbox table we find
           break;
       }
   }
}
addOnloadHook( hideReadMore );

// Strikethrough table rows < tr > with a given class, and
// remove strikethrough on rows without that given class.
// If class is empty string, remove strikethrough on all rows.
function strikeClass(className)
{
  rows = document.getElementsByTagName("tr"); 
  for( var i=0; eachRow = rows[i]; i++ )
  { 
    if (className != "" && hasClass(eachRow, className))
    {
      if(!hasClass(eachRow, "strikeout"))
      {
        eachRow.className += " strikeout";
      }
    }
    else
    {
      eachRow.className = eachRow.className.replace( /(?:^|\s)strikeout(?!\S)/ , '' );
    }
  } 
}

// Hide spans with a given class, unhide spans without that given class.
// If class is empty string, unhide all spans.
function hideClass(className)
{
  spans = document.getElementsByTagName("span"); 
  for( var i=0; eachSpan = spans[i]; i++ )
  { 
    if (className != "" && hasClass(eachSpan, className))
    {
      if(!hasClass(eachSpan, "alttexthidden"))
      {
        eachSpan.className += " alttexthidden";
      }
    }
    else
    {
      eachSpan.className = eachSpan.className.replace( /(?:^|\s)alttexthidden(?!\S)/ , '' );
    }
  } 
}

// Add background to divs with a given class, and
// remove from divs without that given class.
function arrowClass(className)
{
  divs = document.getElementsByTagName("div"); 
  for( var i=0; eachDiv = divs[i]; i++ )
  { 
    if (className != "" && hasClass(eachDiv, "arrowblock") && hasClass(eachDiv, className))
    {
      if(!hasClass(eachDiv, "arrowbackground"))
      {
        eachDiv.className += " arrowbackground";
      }
    }
    else
    {
      eachDiv.className = eachDiv.className.replace( /(?:^|\s)arrowbackground(?!\S)/ , '' );
    }
  } 
}

// Unhide divs with the given archetype, hide divs not matching.
// If archetype is empty string, unhide unspecified, hide archetypes.
function displayATClass(className)
{
  if(className == "")
  {
    className = "unspecified";
  }
  divs = document.getElementsByTagName("div"); 
  for( var i=0; eachDiv = divs[i]; i++ )
  { 
    if (hasClass(eachDiv, "archetype") && hasClass(eachDiv, className))
    {
      if(!hasClass(eachDiv, "defaultdisplay"))
      {
        eachDiv.className += " defaultdisplay";
      }
    }
    else
    {
      eachDiv.className = eachDiv.className.replace( /(?:^|\s)defaultdisplay(?!\S)/ , '' );
    }
  } 
}