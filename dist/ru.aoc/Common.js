/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */


// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
*
* Description: Uses regular expressions and caching for better performance.
* Maintainers: User:Mike Dillon, User:R. Koot, User:SG
*/

/* <pre> */

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

// item tooltips
loadedJS = {};
function loadJS( page ) {
if( loadedJS[page] ) {
return;
}
loadedJS[page] = true;
var url = wgScriptPath
+ '/index.php?title='
+ encodeURIComponent( page.replace( / /g, '_' ) )
+ '&action=raw&ctype=text/javascript';
var scriptElem = document.createElement( 'script' );
scriptElem.setAttribute( 'src' , url );
scriptElem.setAttribute( 'type' , 'text/javascript' );
document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
}
loadJS("MediaWiki:Tooltips.js");


 /** Import module *************************************************************
  *
  *  Description: Includes a raw wiki page as javascript or CSS, 
  *               used for including user made modules.
  *  Maintainers: [[wikipedia:User:AzaToth]]
  */
 importedScripts = {}; // object keeping track of included scripts, so a script ain't included twice
 function importScript( page ) {
     if( importedScripts[page] ) {
         return;
     }
     importedScripts[page] = true;
     var url = wgScriptPath
             + '/index.php?title='
             + encodeURIComponent( page.replace( / /g, '_' ) )
             + '&action=raw&ctype=text/javascript';
     var scriptElem = document.createElement( 'script' );
     scriptElem.setAttribute( 'src' , url );
     scriptElem.setAttribute( 'type' , 'text/javascript' );
     document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
 }
 
 function importStylesheet( page ) {
     var sheet = '@import "'
               + wgScriptPath
               + '/index.php?title='
               + encodeURIComponent( page.replace( / /g, '_' ) )
               + '&action=raw&ctype=text/css";'
     var styleElem = document.createElement( 'style' );
     styleElem.setAttribute( 'type' , 'text/css' );
     styleElem.appendChild( document.createTextNode( sheet ) );
     document.getElementsByTagName( 'head' )[0].appendChild( styleElem );
 }

 /** Reskin parser ***********************************************************
 * Instructions:
 * 1) Add the page title and namespace exactly ("Name_space:Page_name") as new skin, use 
 *    UNDERSCORES *NOT* SPACES: ("Main_Page": "", should be first line). The next parameter 
 *    is optionally an existing "MediaWiki:Skin/"-prefixed file (in which case you can skip 
 *    step 2).
 * 2) Create MediaWiki:Skin/Name_Space:Page_Name.css and place reskin CSS content there.
 */
 
 reskin = {
    "Main_Page": "",
    "User:Severe/Sandbox/Custom": "Severe.css",
    "User:Daworm/Temp/Mainpage_coloured": "Newsite.css",
 //Make sure all lines in this list except the last one have a comma after!
 }
 var skinName;
 
 if (reskin[wgPageName] != undefined && wgIsArticle == true) {
     skinName = (reskin[wgPageName].length > 0) ? reskin[wgPageName] : wgPageName + '.css';
     document.write('<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=MediaWiki:Skin/' + skinName + '&action=raw&ctype=text/css"; /*]]>*/</style>');
 }


 /** Username replace function ([[template:USERNAME]]) *******************************
  * Inserts user name into <span id="insertusername"></span>
  * By [[wikia:User:Splarka|Splarka]]
  */
 addOnloadHook(UserNameReplace);
 
 function UserNameReplace() {
 if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
    for(var i=0; UserName = document.getElementsByTagName("span")[i]; i++) {
        if ((document.getElementById('pt-userpage'))&&(UserName.getAttribute('id') == "insertusername")) {
            UserName.innerHTML = wgUserName;
        }
    }
 }


/* </pre> */