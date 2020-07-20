/* Any JavaScript here will be loaded for all users on every page load. */
 
/*<source lang="javascript">*/
 
/*
 * Description: Add the signature button to namespace 0 (main/default namespace)
 * Originally written by Roan (Catrope)
 */
jQuery( document ).ready( function() {
	if ( !( 'wikiEditor' in jQuery ) || !jQuery.wikiEditor.isSupported( jQuery.wikiEditor.modules.toolbar ) ) {
		return;
	}
 
	jQuery( '#wpTextbox1' ).wikiEditor( 'addToToolbar', { section: 'main', group: 'insert', tools: { 'signature-ns0': {
							'labelMsg': 'wikieditor-toolbar-tool-signature',
							'filters': [ 'body.ns-0' ], // ONLY ns 0
							'type': 'button',
							'offset': [2, -1872],
							'icon': 'insert-signature.png',
							'action': {
								'type': 'encapsulate',
								'options': {
									'pre': '--~~' + '~~'
								}
							}
						}
	} } );
} );
 
/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainer on Wikipedia: [[User:R. Koot]]
  */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function hasClass( element, className ) {
  var Classes = element.className.split( " " );
  for ( var i = 0; i < Classes.length; i++ ) {
    if ( Classes[i] == className ) {
      return ( true );
    }
  }
  return ( false );
}
 
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
 
            var NavToggleText = document.createTextNode(NavigationBarHide);
            for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if (NavChild.style.display == 'none') {
                        NavToggleText = document.createTextNode(NavigationBarShow);
                        break;
                    }
                }
            }
 
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
 
 
//Shuffle for election candidates
function dshuf(){
                var shufsets=new Object()
                var rx=new RegExp('dshuf'+'\\s+(dshufset\\d+)', 'i') 
                var divs=document.getElementsByTagName("div")
                for (var i=0; i<divs.length; i++){
                        if (rx.test(divs[i].className)){
                                if (typeof shufsets[RegExp.$1]=="undefined"){ 
                                        shufsets[RegExp.$1]=new Object() 
                                        shufsets[RegExp.$1].inner=[] 
                                        shufsets[RegExp.$1].member=[]
                                }
                                        shufsets[RegExp.$1].inner.push(divs[i].innerHTML) 
                                        shufsets[RegExp.$1].member.push(divs[i]) 
                        }
                }
                for (shufset in shufsets){
                        shufsets[shufset].inner.sort(function() {return 0.5 - Math.random()})
                        for (var i=0; i<shufsets[shufset].member.length; i++){
                                shufsets[shufset].member[i].innerHTML=shufsets[shufset].inner[i]
                                shufsets[shufset].member[i].style.display="block"
                        }
                }
 
}
 
addOnloadHook(dshuf);
 
/*************
*** AJAX transclusion table <http://meta.wikimedia.org/wiki/User:Pathoschild/Scripts/AJAX_transclusion_table>
*** by [[m:user:Pathoschild]]
*************/
function attLoader() {
if(getElementsByClassName(document.getElementsByTagName('body')[0],'table','attable').length) {
         importScript('User:Pathoschild/Scripts/AJAX_transclusion_table.js');
}
}
addOnloadHook(attLoader);
 
/** JSconfig ************
* Global configuration options to enable/disable and configure
* specific script features from [[MediaWiki:Common.js]] and
* [[MediaWiki:Monobook.js]]
* This framework adds config options (saved as cookies) to [[Special:Preferences]]
* For a more permanent change you can override the default settings in your 
* [[Special:Mypage/monobook.js]]
* for Example: JSconfig.keys[loadAutoInformationTemplate] = false;
*
*  Maintainer: [[User:Dschwen]]
*/
 
var JSconfig =
{
prefix : 'jsconfig_',
keys : {},
meta : {},
 
//
// Register a new configuration item
//  * name          : String, internal name
//  * default_value : String or Boolean (type determines configuration widget)
//  * description   : String, text appearing next to the widget in the preferences
//  * prefpage      : Integer (optional), section in the preferences to insert the widget:
//                     0 : User profile
//                     1 : Skin
//                     2 : Math
//                     3 : Files
//                     4 : Date and time
//                     5 : Editing
//                     6 : Recent changes
//                     7 : Watchlist
//                     8 : Search
//                     9 : Misc
//
// Access keys through JSconfig.keys[name]
//
registerKey : function( name, default_value, description, prefpage )
{
  if( typeof(JSconfig.keys[name]) == 'undefined' ) 
   JSconfig.keys[name] = default_value;
  else {
 
   // all cookies are read as strings, 
   // convert to the type of the default value
   switch( typeof(default_value) )
   {
    case 'boolean' : JSconfig.keys[name] = ( JSconfig.keys[name] == 'true' ); break;
    case 'number'  : JSconfig.keys[name] = JSconfig.keys[name]/1; break;
   }
 
  }
 
  JSconfig.meta[name] = { 'description' : description, 'page' : prefpage || 0, 'default_value' : default_value };
},
 
readCookies : function()
{
  var cookies = document.cookie.split("; ");
  var p =JSconfig.prefix.length;
  var i;
 
  for( var key in cookies )
  {
   if( cookies[key].substring(0,p) == JSconfig.prefix )
   {
    i = cookies[key].indexOf('=');
    //alert( cookies[key] + ',' + key + ',' + cookies[key].substring(p,i) );
    JSconfig.keys[cookies[key].substring(p,i)] = cookies[key].substring(i+1);
   }
  }
},
 
writeCookies : function()
{
  for( var key in JSconfig.keys )
   document.cookie = JSconfig.prefix + key + '=' + JSconfig.keys[key] + '; path=/; expires=Thu, 2 Aug 2009 10:10:10 UTC';
},
 
evaluateForm : function()
{
  var w_ctrl,wt;
  //alert('about to save JSconfig');
  for( var key in JSconfig.meta ) {
   w_ctrl = document.getElementById( JSconfig.prefix + key )
   if( w_ctrl ) 
   {
    wt = typeof( JSconfig.meta[key].default_value );
    switch( wt ) {
     case 'boolean' : JSconfig.keys[key] = w_ctrl.checked; break;
     case 'string' : JSconfig.keys[key] = w_ctrl.value; break;
    }
   }
  }
 
  JSconfig.writeCookies();
  return true;
},
 
setUpForm : function()
{ 
  var prefChild = document.getElementById('preferences');
  if( !prefChild ) return;
  prefChild = prefChild.childNodes;
 
  //
  // make a list of all preferences sections
  //
  var tabs = new Array;
  var len = prefChild.length;
  for( var key = 0; key < len; key++ ) {
   if( prefChild[key].tagName &&
       prefChild[key].tagName.toLowerCase() == 'fieldset' ) 
    tabs.push(prefChild[key]);
  }
 
  //
  // Create Widgets for all registered config keys
  //
  var w_div, w_label, w_ctrl, wt;
  for( var key in JSconfig.meta ) {
   w_div = document.createElement( 'DIV' );
 
   w_label = document.createElement( 'LABEL' );
   w_label.appendChild( document.createTextNode( JSconfig.meta[key].description ) )
   w_label.htmlFor = JSconfig.prefix + key;
 
   wt = typeof( JSconfig.meta[key].default_value );
 
   w_ctrl = document.createElement( 'INPUT' );
   w_ctrl.id = JSconfig.prefix + key;
 
   // before insertion into the DOM tree
   switch( wt ) {
    case 'boolean' : w_ctrl.type = 'checkbox'; break;
    case 'string'  : w_ctrl.type = 'text'; break;
   }
 
   w_div.appendChild( w_label );
   w_div.appendChild( w_ctrl );
   tabs[JSconfig.meta[key].page].appendChild( w_div );
 
   // after insertion into the DOM tree
   switch( wt ) {
    case 'boolean' : w_ctrl.defaultChecked = w_ctrl.checked = JSconfig.keys[key]; break;
    case 'string' : w_ctrl.defaultValue = w_ctrl.value = JSconfig.keys[key]; break;
   }
 
  }
  addHandler(document.getElementById('preferences').parentNode, 'submit', JSconfig.evaluateForm );
}
}
 
JSconfig.readCookies();
addOnloadHook(JSconfig.setUpForm);
 
// ability to pull [[MediaWiki:Gadget-rtl.css]] on individual page loads by [[testwiki:User:Splarka]] and [[wm2008:User:Mr.Z-man]]
function importStylesheet(page) {
  if (page.indexOf('http://') == -1 && page.indexOf('https://') == -1 && page.indexOf('file:///') == -1)
     page = wgScript + '?action=raw&ctype=text/css&smaxage=0&title='
     + encodeURIComponent(page.replace(/ /g,'_'))
  return document.createStyleSheet ? document.createStyleSheet(page) : appendCSS('@import "' + page + '";')
}
 
function appendCSS(text){
var s = document.createElement('style')
s.setAttribute('type', 'text/css')
if (s.styleSheet) s.styleSheet.cssText = text //IE
else s.appendChild(document.createTextNode(text))
document.getElementsByTagName('head')[0].appendChild(s)
return s
}
 
if(document.URL.indexOf('rtl=1') != -1) importStylesheet('http://meta.wikimedia.org/w/index.php?title=MediaWiki:Gadget-rtl.css&action=raw&ctype=text/css');
 
//import module
importedScripts = {} 
function importScript(page, lang) {
page = '?title=' + encodeURIComponent(page.replace(' ','_'))
if (lang) page = 'http://' + lang + '.wikipedia.org/w/index.php' + page
else page = wgScript + page
if (importedScripts[page]) return
importedScripts[page] = true
var s = document.createElement('script')
s.type = 'text/javascript'
s.src = page + '&action=raw&ctype=text/javascript'
document.getElementsByTagName('head')[0].appendChild(s)
}
 
// Fix links like User:Example@somewiki. Author: VasilievVV, with modifications by Kalan and attempted rewrite by Splarka
if((typeof(disableInterlinkLogs) == 'undefined' || disableInterlinkLogs == false) && (wgCanonicalSpecialPageName == 'Log' || wgCanonicalSpecialPageName == 'Recentchanges'))
	importScript('MediaWiki:Common.js/interlinker.js')
 
addOnloadHook(function() {
    //Set a default of anon-only global blocks
    //We don't want to override the user's request when they're specifying [?&]wpAnonOnly=[01] in the URL or
    //if we're loading up the block settings for an already-blocked IP (then you can't see whether the block was AO or not)
    if(wgCanonicalSpecialPageName == 'GlobalBlock' && window.wgUserGroups && wgUserGroups.join(' ').indexOf('steward') != -1){
        if (document.getElementById('mw-globalblock-expiry-other') != null) {
            var expiry = document.getElementById('mw-globalblock-expiry-other').value;
            if ( expiry == "" && document.location.href.indexOf('wpAnonOnly=') == -1){
                document.getElementById('mw-globalblock-anon-only').checked = true;
            }
        }
    }
});
 
// stolen from [[commons:MediaWiki:Common.js]] by [[commons:User:Remember the dot]] - thanks
// Import language-specific stylesheet, especially useful for languages like German that have (un)usual capitalization rules
//
importStylesheet("MediaWiki:" + skin + ".css/" + wgUserLanguage);
 
//Multilingual description.js from commons
mw.loader.load('http://commons.wikimedia.org/w/index.php?title=MediaWiki:Multilingual_description.js&action=raw&ctype=text/javascript');
 
//Tabs
importScript ("MediaWiki:Tabs.js");
 
// Www portal preview script
importScript("User:Splarka/portalpreview.js");
 
// Handle {{InterProject}}
importScript('MediaWiki:InterProject.js');
 
/*
 * Description: Stay on the secure server as much as possible
 * Maintainers: [[User:TheDJ]]
 */
if(wgServer == 'https://secure.wikimedia.org') {
    importScript( 'MediaWiki:Common.js/secure.js');
}