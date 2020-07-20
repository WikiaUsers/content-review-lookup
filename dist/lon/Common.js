/* Any JavaScript here will be loaded for all users on every page load. */

/* <pre> */

/* The following grabbed from WoWWiki by FlorenceSopher on 2 Sept 2007 */

 // ============================================================
 // BEGIN Dynamic Navigation Bars (experimental) Script taken from Wikipedia.
 /* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 */

 var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();
function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[wikipedia:Wikipedia:NavFrame]].
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
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         setCookie("hideTable-" + wgArticleId + "-" + tableIndex,1,30);
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         setCookie("hideTable-" + wgArticleId + "-" + tableIndex,0,30);
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
             Button.style.width = "3.5em";
 
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
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || getCookie("hideTable-" + wgArticleId + "-" + i) == 1 || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
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

/* end grab from WoWWiki */


// ************************************************************************************************
// Admin tool displayer
//  If an object has class="adminTools" and style="display:none;", 
//  it will be displayed for sysops
if(wgUserGroups.join(' ').indexOf('staff') + wgUserGroups.join(' ').indexOf('sysop') > -2) addOnloadHook(addMainPageTools)
function addMainPageTools() {
  var at = getElementsByClassName(document.getElementById('bodyContent'),'*','adminTools');
  if(at.length==0) return
  for(var i=0;i<at.length;i++) {
    at[i].style.display = 'block';
    at[i].className += ' plainlinks';
  }
}

// ************************************************************************************************
// Edit page tool selector
//  -> modified from http://commons.wikimedia.org/wiki/MediaWiki:Edittools.js

if(queryString('action')=='edit'||queryString('action')=='submit') addOnloadHook(customCharInsert)
function customCharInsert() {
  if(!window.wgCustomCharInsert||!wgUserName) return;
  var spec = document.getElementById('specialchars');
  var userp = document.createElement('p');
  userp.className = 'specialbasic';
  userp.id = 'Custom_Edittools'
  userp.style.display='none';

  for (var i=0;i<wgCustomCharInsert.length;i++) {
    var a = document.createElement('a');
    a.href='#';
    a.setAttribute('onclick', 'insertTags("' + wgCustomCharInsert[i].tagOpen + '","' + wgCustomCharInsert[i].tagClose + '","' + wgCustomCharInsert[i].sampleText + '"); return false;');
    a.appendChild(document.createTextNode(wgCustomCharInsert[i].tagOpen + wgCustomCharInsert[i].tagClose));
    userp.appendChild(a);
    if(i!=wgCustomCharInsert.length-1) userp.appendChild(document.createTextNode(' · '));
  }
  spec.appendChild(userp);
}

if(queryString('action')=='edit'||queryString('action')=='submit') addOnloadHook(edittoolsTabs)
function edittoolsTabs() {
  var spec = document.getElementById('specialchars');
  if(!spec) return;
  var sb = getElementsByClassName(spec,'p','specialbasic');
  if(sb.length<=1) return;

  var sel = document.createElement('select');
  sel.style.display = 'inline';
  sel.setAttribute('onchange','chooseCharSubset(selectedIndex)');

  for(var i=0;i<sb.length;i++) {
    var o = document.createElement('option');
    o.appendChild(document.createTextNode(sb[i].id.replace(/_/g,' ')));
    sel.appendChild(o);
  }
  spec.insertBefore(sel,spec.firstChild.nextSibling);
}

function chooseCharSubset(seld) {
 var spec = document.getElementById('specialchars');
 var sb = getElementsByClassName(spec,'p','specialbasic');
 for (var i = 0; i < sb.length ; i++) {
  sb[i].style.display = i == seld ? 'inline' : 'none';
 }
}

function queryString(p) {
  var re = RegExp('[&?]' + p + '=([^&]*)');
  var matches;
  if (matches = re.exec(document.location)) {
    try { 
      return decodeURI(matches[1]);
    } catch (e) {
    }
  }
  return null;
}

/* </pre> */