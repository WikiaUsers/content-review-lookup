/* Any JavaScript here will be loaded for all users on every page load. */
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Please wait for the timer to load. If it does not load, make sure your browser has JavaScript enabled.</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************



/*<source lang="javascript">*/

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
         document.write('<script type="text/javascript" src="'
           + 'http://meta.wikimedia.org/w/index.php?title=User:Pathoschild/Scripts/AJAX_transclusion_table.js' 
           + '&action=raw&ctype=text/javascript&dontcountme=s"></script>');
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
//if we're loading up the block settings for an already-blocked IP (then you can't see whether the block was AO or not
	if(wgCanonicalSpecialPageName == 'GlobalBlock' && window.wgUserGroups && wgUserGroups.join(' ').indexOf('steward') != -1){
		if (document.location.href.indexOf('wpAnonOnly=') == -1 && document.getElementById('mw-globalblock-expiry-other').value == ""){
			document.getElementById('mw-globalblock-anon-only').checked = true;
		}
	}
});

// stolen from [[commons:MediaWiki:Common.js]] by [[commons:User:Remember the dot]] - thanks
// Import language-specific stylesheet, especially useful for languages like German that have (un)usual capitalization rules
//
importStylesheet("MediaWiki:" + skin + ".css/" + wgUserLanguage);

/**
 * Implements language selection for multilingual elements
 * 
 * In certain environments, it's not feasible to neatly box away each
 * different language into its own section of the site. By marking elements
 * multilingual, you can emulate this behavior by only displaying the 
 * message in the user's language. This reduced the "Tower of Babel" effect.
 * 
 * @author Edward Z. Yang (Ambush Commander)
 * @version $Id: language_select.js 1358 2007-02-19 15:34:59Z Edward $
 */

/* Configuration: */

// in your monobook.js, set ls_enable = false to stop the javascript
// maybe it should be cookie configurable. However, you can achieve
// something almost to this effect through cookie settings
var ls_enable = true;

// the cookie name we use to stash the info.
// change this if you are porting it to another wiki!
var ls_cookie = 'metawiki_language_js';

// link to the language select page
var ls_help_url = 'http://meta.wikimedia.org/wiki/Meta:Language_select';

// strings that are part of the widgets
var ls_string_help = 'Language select:';
var ls_string_select = 'Select';
var ls_string_showall = 'Show all';

// define some meta-variables
var ls__first = true; // the first iteration?

// node compatability fix
if (!window.Node) {
    var Node = {
        ELEMENT_NODE : 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_FRAGMENT_NODE: 11
    };
}

// autodetects a browser language
function ls_getBrowserLanguage() {
    var language;
    // borrowed from Wikimedia's site error notice
    // find the language
    if (navigator.userLanguage) {
        // use the user's preferred language (non-Gecko)
        language = navigator.userLanguage;
    } else if (navigator.appName == 'Netscape') {
        // use the only language information available to Gecko
        language = navigator.language;
    } else {
        // get the browser language information in non-Gecko browsers
        // (IE, Opera, Konqueror)
        language = navigator.browserLanguage;
    }
    return language;
}

// grabs language from cookie
function ls_getCookieLanguage() {
    var allcookies = document.cookie;
    var marker = ls_cookie + '=';
    var pos = allcookies.indexOf(marker);
    
    // cookie isn't set, so no behavior defined
    if (pos === -1) return null;
    
    // cookie is set
    var start = pos + marker.length;
    var end   = allcookies.indexOf(';', start);
    if (end == -1) end = allcookies.length;
    
    var raw   = allcookies.substring(start,end);
    var value = unescape(raw);
    
    return value;
}

// sets a new language to the cookie
function ls_setCookieLanguage(language) {
    var today = new Date();
    var expiry = new Date(today.getUTCFullYear() + 30, 1);
    document.cookie = ls_cookie + '=' + escape(language) + '; expires=' + expiry.toGMTString();
}

// deletes the cookie
function ls_deleteCookieLanguage(language) {
    document.cookie = ls_cookie + '=; expires=Fri, 02-Jan-1970 00:00:00 GMT';
}

// grabs the ISO 639 language code based
// on either the browser or a supplied cookie
// return of "mul" will display all available strings
function ls_getLanguage() {
    var language = '';
    
    // Priority:
    //  1. Cookie
    //  2. wgUserLanguage global variable
    //  3. Browser autodetection
    
    // grab according to cookie
    language = ls_getCookieLanguage();
    
    // grab according to wgUserLanguage
    if (!language && window.wgUserLanguage) {
        language = wgUserLanguage;
    }
    
    // grab according to browser if none defined
    if (!language) {
        language = ls_getBrowserLanguage();
    }
    
    // inflexible: can't accept multiple languages
    
    // remove dialect/region code, leaving only the ISO 639 code
    var length;
    // possible bug: supposedly the language string could be en_US
    // switch to regexps when we get the chance
    if ((length = language.indexOf('-')) !== -1) {
        language = language.substr(0, length);
    }
    
    return language;
}

// walks all child elements and finds all elements with multilingual in them
function ls_getAllMultilingualElements(n) {
    var elements = new Array();
    // possible bug if we have a classname that includes the word multilingual
    //   but it's unlikely
    if (n.className && n.className.indexOf('multilingual') != -1) {
        elements = elements.concat(n);
    }
    var children = n.childNodes;
    for(var i=0; i < children.length; i++) {
        if (children[i].nodeType !== Node.ELEMENT_NODE) continue;
        elements = elements.concat(ls_getAllMultilingualElements(children[i]));
    }
    return elements;
}

// walks a hash and hides all non-matching languages
function ls_hideAllExcept(lang_element_hash, language) {
    for (var n in lang_element_hash) {
        if (n == language) {
            lang_element_hash[n].style.display = '';
        } else {
            lang_element_hash[n].style.display = 'none';
        }
    }
}

// walks a hash and shows all languages
function ls_showAll(lang_element_hash) {
    for (var n in lang_element_hash) {
        if (lang_element_hash[n].style.display) {
            lang_element_hash[n].style.display = '';
        }
    }
}

// build widget for changing the language cookie
function ls_buildWidget(language) {
   
    // set up the floating form
    var form = document.createElement('form');
    form.className = 'lang_info';
    form.onsubmit = function() {
        if (this.elements[2].ls_mul_flag) {
            this.elements[2].ls_mul_flag = false;
            var language = 'mul';
            var temporary = true;
        } else {
            ls_setCookieLanguage(this.elements[0].value);
            var language = this.elements[0].value;
            var temporary = false;
        }
        ls_applyLanguageSelect(language, temporary);
        
        return false; // don't perform action
    };
    form.appendSpace = function() {
        this.appendChild(document.createTextNode(' '));
    };
    
    // link to language select description page
    var link = document.createElement('a');
    link.href = ls_help_url;
    link.className = 'ls_link';
    link.appendChild(document.createTextNode(ls_string_help));
    form.appendChild(link);
    
    form.appendSpace();
    
    // input box for the language
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('size', '2');
//    input.setAttribute('maxlength', '7');
    input.onclick = function() { this.select(); };
    input.className = 'ls_input';
    input.value = language;
    form.appendChild(input);
    
    form.appendSpace();
    
    // save button
    var submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.value = ls_string_select;
    submit.className = 'ls_select';
    form.appendChild(submit);
    
    form.appendSpace();
    
    // show all button 
    // equivalent to setting input box to "mul" and pressing save
    var showall = document.createElement('input');
    showall.setAttribute('type', 'submit');
    showall.value = ls_string_showall;
    showall.onclick = function() {
        this.ls_mul_flag = true;
    };
    form.appendChild(showall);
    
    return form;
    
}

// main body of the function
function ls_applyLanguageSelect(language, temporary) {
    
    // possible site for cookie checking to disable language select
    if (!ls_enable) return;
    
    // if language is blank, delete the cookie and then recalculate
    if (!language) {
        ls_deleteCookieLanguage();
        language = ls_getLanguage();
    }
    
    // grab the body element (only one)
    var body = document.getElementsByTagName('body')[0];
    
    // grab an array of multilingual elements
    var mls = ls_getAllMultilingualElements(body);
    
    // this will get overwritten many times, temporary variable
    var form, language_element_hash;
    
    // iterate through all those elements
    for (var i = 0; i < mls.length; i++) {
        var ml   = mls[i];        // the current multilingual container
        var ml_c = ml.childNodes; // children of the container
        
        // if it's the first iteration...
        if (ls__first) {
            form = ls_buildWidget(language);
            ml.appendChild(form, ml_c[0]);
        } else {
            // update widget
            form = ml_c[ml_c.length - 1]; // form is last element
            if (!temporary) {
                form.elements[0].value = language;
                form.elements[0].removeAttribute('disabled');
                form.elements[2].removeAttribute('disabled');
            } else {
                form.elements[0].setAttribute('disabled', 'disabled');
                form.elements[2].setAttribute('disabled', 'disabled');
            }
        }
        
        form.elements[0].style.background="#FFF";
        
        // tells us whether or not to blindly perform the keep
        var message_exists  = false;
        
        // iterate through all languages and set up a hash
        //   with references to each of the language nodes
        lang_element_hash = new Object();
        for (var j = 0; j < ml_c.length; j++) {
            var n = ml_c[j];
            if (n.nodeType != Node.ELEMENT_NODE) continue; // skip non-elements
            if (!n.lang) continue; // skip non-language specific elements
            if (n.lang.indexOf(language) === 0) {
                // it turns out our language is here
                message_exists  = true;
            }
            lang_element_hash[n.lang] = n;
        }
        
        // if a preferred language was kept, do quickest processing
        if (message_exists) {
            ls_hideAllExcept(lang_element_hash, language);
            continue;
        }
        
        // otherwise, nothing happened, this means that it wasn't found
        
        // if it's not the first time, repaint all of them
        if (!ls__first) {
            ls_showAll(lang_element_hash);
        }
        
        if (language != 'mul') {
            form.elements[0].style.background="#FCC";
        }
        
    }
    
    // we've already processed once
    ls__first = false;
    
}

function ls_applyDefaultLanguageSelect() {
    ls_applyLanguageSelect(ls_getLanguage(), false);
}

// register as onload function (there must be a better way)
if (window.addEventListener) {
    window.addEventListener("load", ls_applyDefaultLanguageSelect, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", ls_applyDefaultLanguageSelect);
}