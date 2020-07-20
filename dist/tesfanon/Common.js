/* <pre><nowiki> */

/* Any JavaScript here will be loaded for all users on every page load. */

/** onload handlers ************
 *  Simple fix such that crashes in one handler don't prevent later handlers from running.
 *
 *  Maintainer: [[commons:User:Lupo]]
 */

if (typeof (onloadFuncts) != 'undefined') {

  // Enhanced version of jsMsg from wikibits.js. jsMsg can display only one message, subsequent
  // calls overwrite any previous message. This version appends new messages after already
  // existing ones.
  function jsMsgAppend (msg, className)
  {
    var msg_div = document.getElementById ('mw-js-message');
    var msg_log = document.getElementById ('mw-js-exception-log');
    if (!msg_log) {
      msg_log = document.createElement ('ul');
      msg_log.id = 'mw-js-exception-log';
      if (msg_div && msg_div.firstChild) {
        // Copy contents of msg_div into first li of msg_log
        var wrapper = msg_div.cloneNode (true);
        wrapper.id = "";
        wrapper.className = "";
        var old_stuff = document.createElement ('li');
        old_stuff.appendChild (wrapper);
        msg_log.appendChild (old_stuff);
      }
    }
    var new_item = document.createElement ('li');
    new_item.appendChild (msg);
    msg_log.appendChild (new_item);
    jsMsg (msg_log, className);
  }

  var Logger = {

    // Log an exception. If present, try to use a JS console (e.g., Firebug's). If no console is
    // present, or the user is a sysop, also put the error message onto the page itself.
    logException : function (ex) {
      try {
        var name = ex.name || "";
        var msg  = ex.message || "";
        var file = ex.fileName || ex.sourceURL || null; // Gecko, Webkit, others
        var line = ex.lineNumber || ex.line || null;    // Gecko, Webkit, others
        var logged = false;
        if (typeof (console) != 'undefined' && typeof (console.log) != 'undefined') {
          // Firebug, Firebug Lite, or browser-native or other JS console present. At the very
          // least, these will allow us to print a simple string.
          var txt = name + ': ' + msg;
          if (file) {
            txt = txt + '; ' + file;
            if (line) txt = txt + ' (' + line + ')';
          }
          if (typeof (console.error) != 'undefined') {
            if (   console.firebug
                || (   console.provider && console.provider.indexOf
                    && console.provider.indexOf ('Firebug') >= 0)
               )
            {
              console.error (txt + " %o", ex); // Use Firebug's object dump to write the exception
            } else {
              console.error (txt);
            }
          } else
            console.log (txt);
          logged = true;
        } 
        if (!logged || wgUserGroups.join (' ').indexOf ('sysop') >= 0) {
          if (name.length == 0 && msg.length == 0 && !file) return; // Don't log if there's no info
          if (name.length == 0) name = 'Unknown error';
          // Also put it onto the page for sysops.
          var log  = document.createElement ('span');
          if (msg.indexOf ('\n') >= 0) {
            var tmp = document.createElement ('span');
            msg = msg.split ('\n');
            for (var i = 0; i < msg.length; i++) {
              tmp.appendChild (document.createTextNode (msg[i]));
              if (i+1 < msg.length) tmp.appendChild (document.createElement ('br'));
            }
            log.appendChild (document.createTextNode (name + ': '));
            log.appendChild (tmp);
          } else {
            log.appendChild (document.createTextNode (name + ': ' + msg));
          }
          if (file) {
            log.appendChild (document.createElement ('br'));
            var a = document.createElement ('a');
            a.href = file;
            a.appendChild (document.createTextNode (file));
            log.appendChild (a);
            if (line) log.appendChild (document.createTextNode (' (' + line + ')'));
          }
          jsMsgAppend (log, 'error');        
        }
      } catch (anything) {
        // Swallow
      }
    }
  } // end Logger

  // Wrap a function with an exception handler and exception logging.
  function makeSafe (f) {
    return function () {
             try {
               return f.apply (this, arguments);
             } catch (ex) {
               Logger.logException (ex);
               return null;
             }
           };
  }

  // Wrap the already registered onload hooks
  for (var i = 0; i < onloadFuncts.length; i++)
    onloadFuncts[i] = makeSafe (onloadFuncts[i]);

  // Redefine addOnloadHook to catch future additions
  function addOnloadHook (hookFunct) {
    // Allows add-on scripts to add onload functions
    if (!doneOnloadHook) {
      onloadFuncts[onloadFuncts.length] = makeSafe (hookFunct);
    } else {
      makeSafe (hookFunct)();  // bug in MSIE script loading
    }
  }
} // end onload hook improvements

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
 //  * description   : String, text appearing next to the widget in the preferences, or an hash-object
 //                    containing translations of the description indexed by the language code
 //  * prefpage      : Integer (optional), section in the preferences to insert the widget:
 //                     0 : User profile         User profile
 //                     1 : Skin                 Appearance
 //                     2 : Math                 Date and Time
 //                     3 : Files                Editing
 //                     4 : Date and time        Recent Changes
 //                     5 : Editing              Watchlist
 //                     6 : Recent changes       Search Options
 //                     7 : Watchlist            Misc
 //                     8 : Search               Gadgets
 //                     9 : Misc
 //
 // Access keys through JSconfig.keys[name]
 //
 registerKey : function( name, default_value, description, prefpage )
 {
  if( typeof JSconfig.keys[name] == 'undefined' ) 
   JSconfig.keys[name] = default_value;
  else {
   // all cookies are read as strings, 
   // convert to the type of the default value
   switch( typeof default_value )
   {
    case 'boolean' : JSconfig.keys[name] = ( JSconfig.keys[name] == 'true' ); break;
    case 'number'  : JSconfig.keys[name] = JSconfig.keys[name]/1; break;
   }
  }

  JSconfig.meta[name] = { 
   'description' : 
    description[wgUserLanguage] || description.en || 
    ( typeof(description) == "string" && description ) || 
    "<i>en</i> translation missing", 
   'page' : prefpage || 0, 'default_value' : default_value };

  // if called after setUpForm(), we'll have to add an extra input field
  if( JSconfig.prefsTabs ) JSconfig.addPrefsInput( name );
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
  var expdate = new Date();
  expdate.setTime(expdate.getTime()+1000*60*60*24*3650);  // expires in 3560 days
  for( var key in JSconfig.keys )
   document.cookie = JSconfig.prefix + key + '=' + JSconfig.keys[key] + '; path=/; expires=' + expdate.toUTCString();
 },

 evaluateForm : function()
 {
  var w_ctrl,wt;
  //alert('about to save JSconfig');
  for( var key in JSconfig.meta ) {
   w_ctrl = document.getElementById( JSconfig.prefix + key )
   if( w_ctrl ) 
   {
    wt = typeof JSconfig.meta[key].default_value;
    switch( wt ) {
     case 'boolean' : JSconfig.keys[key] = w_ctrl.checked; break;
     case 'string' : JSconfig.keys[key] = w_ctrl.value; break;
    }
   }
  }

  JSconfig.writeCookies();
  return true;
 },

 prefsTabs : false,

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
  JSconfig.prefsTabs = tabs;

  //
  // Create Widgets for all registered config keys
  //
  for( var key in JSconfig.meta ) JSconfig.addPrefsInput(key);

  addEvent(document.getElementById('preferences').parentNode, 'submit', JSconfig.evaluateForm );
 },

 addPrefsInput : function( key ) {
  var w_div = document.createElement( 'DIV' );

  var w_label = document.createElement( 'LABEL' );
  var wt = typeof JSconfig.meta[key].default_value;
  switch ( wt ) {
   case 'boolean':
    JSconfig.meta[key].description = " " + JSconfig.meta[key].description;
    break;
   case 'string': default:
    JSconfig.meta[key].description += ": ";
    break;
  }
  w_label.appendChild( document.createTextNode( JSconfig.meta[key].description ) );
  w_label.htmlFor = JSconfig.prefix + key;

  var w_ctrl = document.createElement( 'INPUT' );
  w_ctrl.id = JSconfig.prefix + key;

  // before insertion into the DOM tree
  switch( wt ) {
   case 'boolean':
    w_ctrl.type = 'checkbox';
    w_div.appendChild( w_ctrl );
    w_div.appendChild( w_label );
    break;
   case 'string': default:
    w_ctrl.type = 'text';
    w_div.appendChild( w_label );
    w_div.appendChild( w_ctrl );
    break;
  }

  JSconfig.prefsTabs[JSconfig.meta[key].page].appendChild( w_div );
  
  // after insertion into the DOM tree
  switch( wt ) {
   case 'boolean' : w_ctrl.defaultChecked = w_ctrl.checked = JSconfig.keys[key]; break;
   case 'string' : w_ctrl.defaultValue = w_ctrl.value = JSconfig.keys[key]; break;
  }
 }
};

JSconfig.readCookies();
if( wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == "Preferences" )
 addOnloadHook(JSconfig.setUpForm);

/** extract a URL parameter from the current URL **********
 * From [[en:User:Lupin/autoedit.js]]
 *
 * paramName  : the name of the parameter to extract
 *
 * Local Maintainer: [[User:Dschwen]]
 */

function getParamValue( paramName, url) 
{
 if (typeof (url) == 'undefined' ) url = document.location.href;
 var cmdRe=RegExp( '[&?]' + paramName + '=([^&]*)' );
 var m=cmdRe.exec(url);
 if (m) {
  try {
   return decodeURIComponent(m[1]);
  } catch (someError) {}
 }
 return null;
}

/** &withJS= URL parameter *******
 * Allow to try custom scripts on the MediaWiki namespace without
 * editing [[Special:Mypage/monobook.js]]
 *
 * Maintainer: [[User:Platonides]]
 */
{
 var extraJS = getParamValue("withJS");
 if (extraJS)
  if (extraJS.match("^MediaWiki:[^&<>=%]*\.js$"))
   importScript(extraJS);
  else
   alert(extraJS + " javascript not allowed to be loaded.");
}

/** Attach (or remove) an Event to a specific object **********
 * Cross-browser event attachment (John Resig)
 * http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
 *
 * obj  : DOM tree object to attach the event to
 * type : String, event type ("click", "mouseover", "submit", etc.)
 * fn   : Function to be called when the event is triggered (the ''this''
 *        keyword points to ''obj'' inside ''fn'' when the event is triggered)
 *
 * Local Maintainer: [[User:Dschwen]]
 */
function addEvent( obj, type, fn )
{
 if (obj.addEventListener)
  obj.addEventListener( type, fn, false );
 else if (obj.attachEvent)
 {
  obj["e"+type+fn] = fn;
  obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
  obj.attachEvent( "on"+type, obj[type+fn] );
 }
}
function removeEvent( obj, type, fn )
{
 if (obj.removeEventListener)
  obj.removeEventListener( type, fn, false );
 else if (obj.detachEvent)
 {
  obj.detachEvent( "on"+type, obj[type+fn] );
  obj[type+fn] = null;
  obj["e"+type+fn] = null;
 }
}

/* Edit script */
if (wgAction == "edit" || wgAction == "submit" || wgPageName == "Special:Upload") //scripts specific to editing pages
{
    importScript("MediaWiki:Common.js/edit.js")
}

/* Special:Upload */
document.write('<script type="text/javascript" src="' 
    + '/index.php?title=MediaWiki:Upload.js&action=raw&ctype=text/javascript"></script>');

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWWiki.

///////////////////////////////////////////////////////////////////////////////////////////////////////////

ajaxPages = new Array("Special:RecentChanges", "Special:Watchlist", "Special:Log");

function setCookie(c_name,value,expiredays) {
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=")
if (c_start!=-1) { 
c_start=c_start + c_name.length+1 
c_end=document.cookie.indexOf(";",c_start)
if (c_end==-1) c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))
} 
}
return ""
}

function getXmlHttpRequestObject() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest(); //Not Internet Explorer
} else if(window.ActiveXObject) {
return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
} else {
//fail silently
}
}
getRCDataRO = getXmlHttpRequestObject();
var cr = new RegExp("\r", "gm");
var lf = new RegExp("\n", "gm");
var endText = new RegExp('</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "mi");
var rcTimer;
var rcRefresh = 60000;
function preloadAJAXRC() {
if (skin == "monaco") {
s = 1;
} else {
s = 0;
}
ajaxRCCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
document.getElementsByTagName("h1")[0].innerHTML += ' <span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">AJAX:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
document.getElementById("ajaxRCtoggle").checked = ajaxRCCookie;
if (getCookie("ajaxload-"+wgPageName)=="on") loadRCData();
}

function toggleRC() {
if (document.getElementById("ajaxRCtoggle").checked == true) {
setCookie("ajaxload-"+wgPageName, "on", 30);
loadRCData();
} else {
setCookie("ajaxload-"+wgPageName, "off", 30);
clearTimeout(rcTimer);
}
}

function loadRCData() {
if (getRCDataRO.readyState == 4 || getRCDataRO.readyState == 0) {
if (location.href.indexOf("/wiki/")) {
rcURL = "http://" + location.hostname + "/wiki/" + wgPageName + location.search;
} else {
rcURL = "http://" + location.hostname + "/" + wgPageName + location.search;
}
getRCDataRO.open("GET", rcURL, true);
getRCDataRO.onreadystatechange = parseRCdata;
getRCDataRO.send(null);
}
}

function parseRCdata() {
if (getRCDataRO.readyState == 4) {
textFilter = new RegExp('<div id="bodyContent">.*?</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "i");
rawRCdata = getRCDataRO.responseText.replace(cr, "").replace(lf, "");
filteredRCdata = textFilter.exec(rawRCdata);
updatedText = filteredRCdata[0].replace('<div id="bodyContent">', "").replace(endText, "");
document.getElementById("bodyContent").innerHTML = updatedText;
rcTimer = setTimeout("loadRCData();", rcRefresh);
}
}

for (x in ajaxPages) {
if (wgPageName == ajaxPages[x]) addOnloadHook(preloadAJAXRC);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX AUTO-REFRESH

///////////////////////////////////////////////////////////////////////////////////////////////////////////


// ================================================================
// BEGIN JavaScript title rewrite
// jQuery version and Oasis skin fixes by Grunny of Wookiepedia
// ================================================================
 
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	if( $('#title-meta').length == 0 ) {
		return;
	}
 
	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}
 
addOnloadHook( rewriteTitle );
 
function showEras(className) {
	if( skin == 'oasis' ) {
		return;
	}
 
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;
 
	var titleDiv = document.getElementById( className );
 
	if( titleDiv == null || titleDiv == undefined )
		return;
 
	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}
 
addOnloadHook( showEras );
 
// ================================================================
// END JavaScript title rewrite
// ================================================================

// ================================================================
// BEGIN - Ticker MAGIC
// By Manyman
// ================================================================
 
/* Ticker */
var ticker;
var tickertxt;
var tickerdiv;
 
function newsticker() {
  if (document.getElementById) {
  if ((document.getElementById('ticker'))&&(document.getElementById('tickerdiv'))&&(document.getElementById('tickertxt'))) {
    ticker = document.getElementById('ticker'); 
    ticker.style.display = 'block';
    tickerdiv = document.getElementById('tickerdiv');
    tickertxt = document.getElementById('tickertxt').offsetWidth; 
    tickerdiv.style.left = parseInt(ticker.style.width) + 10 + 'px';
    lefttime=setInterval("newstickergo()",200);
  }
  }
}
 
function newstickergo() {
  tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-10 - tickertxt) ) ? parseInt(tickerdiv.style.left) - 10 + "px" : parseInt(ticker.style.width) + 10 + "px";
} 
addOnloadHook( newsticker );
 
// ================================================================
// END - Ticker MAGIC
// ================================================================


/* </nowiki></pre> */