/* Any JavaScript here will be loaded for all users on every page load. */
/*From wikipedia with modifications from one piece (http://onepiece.wikia.com/wiki/MediaWiki:Common.js) - loaded by Boy.pockets*/
//<source lang="javascript">
//Map jQuery over to $
//Will be done by ResourceLoader later on
//No script here is/should use prototype etc.
if (typeof $ == 'undefined') $=jQuery;

/*
 * Description: Redirects from /User:UserName/skin.js or .css to the user's actual skin page
 * Maintainer: Cacycle
 */
if (wgArticleId == 0 && wgUserName) {
  var slash = wgPageName.indexOf('/');
  var norm = wgPageName.substr(0, slash) + wgPageName.substr(slash).toLowerCase();
  var test = 'User:' + wgUserName.replace(/ /g, '_') + '/skin.';
  var ext = null;
  if (norm == test + 'js') ext = 'js';
  else if (norm == test + 'css') ext = 'css';
  if (ext != null) window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin + '.' + ext);
}

/** extract a URL parameter from the current URL **********
 * From [[en:User:Lupin/autoedit.js]]
 *
 * paramName  : the name of the parameter to extract
 */
function getURLParamValue( paramName, url) 
{
 if (typeof (url) == 'undefined'  || url === null) url = document.location.href;
 var cmdRe=RegExp( '[&?]' + paramName + '=([^&#]*)' ); // Stop at hash
 var m=cmdRe.exec(url);
 if (m && m.length > 1) return decodeURIComponent(m[1]);
 return null;
}

/** &withJS= URL parameter *******
 * Allow to try custom scripts from MediaWiki space 
 * without editing [[Special:Mypage/monobook.js]]
 */
var extraJS = getURLParamValue("withJS");
if ( extraJS && extraJS.match("^MediaWiki:[^&<>=%]*\.js$") ) {
  importScript(extraJS);
}

/* Import more specific scripts if necessary */

if (wgAction == "edit" || wgAction == "submit" || wgPageName == "Special:Upload") //scripts specific to editing pages
{
    importScript("MediaWiki:Common.js/edit.js")
}
else if (wgPageName == "Special:Watchlist") //watchlist scripts
{
    importScript("MediaWiki:Common.js/watchlist.js")
}
if( wgNamespaceNumber == 6 ) {
    importScript('MediaWiki:Common.js/file.js');
}

/** For sysops and accountcreators *****************************************
 *
 *  Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]],
 *               and accountcreator-specific CSS at [[MediaWiki:Accountcreator.css]].
 */
if ( wgUserGroups ) {
  for ( var g = 0; g < wgUserGroups.length; ++g ) {
    if ( wgUserGroups[g] == "sysop" ) {
      importStylesheet("MediaWiki:Sysop.css");
      addOnloadHook( function() {
        if ( !window.disableSysopJS ) {
          importScript("MediaWiki:Sysop.js");
        }
      } );
    } 
    else if ( wgUserGroups[g] == "accountcreator" ) {
      importStylesheet("MediaWiki:Accountcreator.css");
    }
  }
}


/** WikiMiniAtlas *******************************************************
  *
  *  Description: WikiMiniAtlas is a popup click and drag world map.
  *               This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
  *               The script itself is located on meta because it is used by many projects.
  *               See [[Meta:WikiMiniAtlas]] for more information. 
  *  Maintainers: [[User:Dschwen]]
  */

if (wgServer == "https://secure.wikimedia.org") {
    var metaBase = "https://secure.wikimedia.org/wikipedia/meta";
} else {
    var metaBase = "http://meta.wikimedia.org";
}
importScriptURI(metaBase+"/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400")

/* Scripts specific to Internet Explorer */

if (navigator.appName == "Microsoft Internet Explorer")
{
    /** Internet Explorer bug fix **************************************************
     *
     *  Description: Fixes IE horizontal scrollbar bug
     *  Maintainers: [[User:Tom-]]?
     */
    
    var oldWidth;
    var docEl = document.documentElement;
    
    function fixIEScroll()
    {
        if (!oldWidth || docEl.clientWidth > oldWidth)
            doFixIEScroll();
        else
            setTimeout(doFixIEScroll, 1);
        
        oldWidth = docEl.clientWidth;
    }
    
    function doFixIEScroll() {
        docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
    }
    
    document.attachEvent("onreadystatechange", fixIEScroll);
    document.attachEvent("onresize", fixIEScroll);
    
    // In print IE (7?) does not like line-height
    appendCSS( '@media print { sup, sub, p, .documentDescription { line-height: normal; }}');

    // IE overflow bug
    appendCSS('div.overflowbugx { overflow-x: scroll !important; overflow-y: hidden !important; } div.overflowbugy { overflow-y: scroll !important; overflow-x: hidden !important; }');

    // IE zoomfix
    //Use to fix right floating div/table inside tables.
    appendCSS('.iezoomfix div, .iezoomfix table { zoom: 1;}' );
    
    //Import scripts specific to Internet Explorer 6
    if (navigator.appVersion.substr(22, 1) == "6") {
        importScript("MediaWiki:Common.js/IE60Fixes.js")
    }
}

/* Load fixes for Windows font rendering */
if( navigator.platform.indexOf( "Win" ) != -1 ) {
  importStylesheet( 'MediaWiki:Common.css/WinFixes.css' );
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


/** Interwiki links to featured articles ***************************************
 *
 *  Description: Highlights interwiki links to featured articles (or
 *               equivalents) by changing the bullet before the interwiki link
 *               into a star.
 *  Maintainers: [[User:R. Koot]]
 */

function LinkFA() 
{
    if ( document.getElementById( "p-lang" ) ) {
        var InterwikiLinks = document.getElementById( "p-lang" ).getElementsByTagName( "li" );

        for ( var i = 0; i < InterwikiLinks.length; i++ ) {
            if ( document.getElementById( InterwikiLinks[i].className + "-fa" ) ) {
                InterwikiLinks[i].className += " FA"
                InterwikiLinks[i].title = "This is a featured article in another language.";
            } else if ( document.getElementById( InterwikiLinks[i].className + "-ga" ) ) {
                InterwikiLinks[i].className += " GA"
                InterwikiLinks[i].title = "This is a good article in another language.";
            }
        }
    }
}

addOnloadHook( LinkFA );


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


/** Main Page layout fixes *********************************************************
 *
 *  Description: Adds an additional link to the complete list of languages available.
 *  Maintainers: [[User:AzaToth]], [[User:R. Koot]], [[User:Alex Smotrov]]
 */

if (wgPageName == 'Main_Page' || wgPageName == 'Talk:Main_Page') 
    addOnloadHook(function () {
        addPortletLink('p-lang', 'http://meta.wikimedia.org/wiki/List_of_Wikipedias',
                 'Complete list', 'interwiki-completelist', 'Complete list of Wikipedias')
        var nstab = document.getElementById('ca-nstab-main')
        if (nstab && wgUserLanguage=='en') {
            while (nstab.firstChild) nstab = nstab.firstChild
            nstab.nodeValue = 'Main Page'
        }
    }
)


/** Table sorting fixes ************************************************
  *
  *  Description: Disables code in table sorting routine to set classes on even/odd rows
  *  Maintainers: [[User:Random832]]
  */

ts_alternate_row_colors = false;


/***** uploadwizard_newusers ********
 * Switches in a message for non-autoconfirmed users at [[Wikipedia:Upload]]
 *
 *  Maintainers: [[User:Krimpet]]
 ****/
function uploadwizard_newusers() {
  if (wgNamespaceNumber == 4 && wgTitle == "Upload" && wgAction == "view") {
    var oldDiv = document.getElementById("autoconfirmedusers"),
        newDiv = document.getElementById("newusers");
    if (oldDiv && newDiv) {
      if (typeof wgUserGroups == "object" && wgUserGroups) {
        for (i = 0; i < wgUserGroups.length; i++) {
          if (wgUserGroups[i] == "autoconfirmed") {
            oldDiv.style.display = "block";
            newDiv.style.display = "none";
            return;
          }
        }
      }
      oldDiv.style.display = "none";
      newDiv.style.display = "block";
      return;
    }
  }
}
addOnloadHook(uploadwizard_newusers);


/** IPv6 AAAA connectivity testing **/

var __ipv6wwwtest_factor = 100;
var __ipv6wwwtest_done = 0;
if ((wgServer != "https://secure.wikimedia.org") && (Math.floor(Math.random()*__ipv6wwwtest_factor)==42)) {
    importScript("MediaWiki:Common.js/IPv6.js");
}

/** Magic editintros ****************************************************
 *
 *  Description: Adds editintros on disambiguation pages and BLP pages.
 *  Maintainers: [[User:RockMFR]]
 */

function addEditIntro(name)
{
  var el = document.getElementById('ca-edit');
  if (!el)
    return;
  el = el.getElementsByTagName('a')[0];
  if (el)
    el.href += '&editintro=' + name;
}


if (wgNamespaceNumber == 0) {
  addOnloadHook(function(){
    if (document.getElementById('disambigbox'))
      addEditIntro('Template:Disambig_editintro');
  });

  addOnloadHook(function(){
    var cats = document.getElementById('mw-normal-catlinks');
    if (!cats)
      return;
    cats = cats.getElementsByTagName('a');
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].title == 'Category:Living people' || cats[i].title == 'Category:Possibly living people') {
        addEditIntro('Template:BLP_editintro');
        break;
      }
    }
  });
}

/*
 * Description: Stay on the secure server as much as possible
 * Maintainers: [[User:TheDJ]]
 */
if(wgServer == 'https://secure.wikimedia.org') {
    importScript( 'MediaWiki:Common.js/secure.js');
}

// Define ta for now. Bugzilla 23175
window.ta = [];

//</source>

/*Loaded from Commons.MediaWiki by Boy.pockets*/
//<source lang="javascript">

/** onload handlers ************
 *  Simple fix such that crashes in one handler don't prevent later handlers from running.
 *
 *  Maintainer: [[User:Lupo]]
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
 * url        : optional URL to extract the parameter from, document.location.href if not given.
 *
 * Local Maintainer: [[User:Dschwen]], [[User:Lupo]]
 */

function getParamValue( paramName, url) 
{
 if (typeof (url) == 'undefined' || url === null) url = document.location.href;
 var cmdRe=RegExp( '[&?]' + paramName + '=([^&#]*)' ); // Stop at hash
 var m=cmdRe.exec(url);
 if (m && m.length > 1) return decodeURIComponent(m[1]);
 return null;
}

/** &withJS= URL parameter *******
 * Allow to try custom scripts on the MediaWiki namespace without
 * editing [[Special:Mypage/monobook.js]]
 *
 * Maintainer: [[User:Platonides]], [[User:Lupo]]
 */
var extraJS = getParamValue("withJS"); // Leave here for backwards compatibility
(function (extraJS) {
 if (!extraJS) return;
 if (extraJS.match("^MediaWiki:[^&<>=%#]*\\.js$")) // Disallow some characters in file name
  importScript (extraJS);
 else {
  // Dont use alert but the jsMsg system. Run jsMsg only once the DOM is ready.
  addOnloadHook (function () {
   jsMsgAppend (document.createTextNode (extraJS + " javascript not allowed to be loaded."),'error');
  });
 }
})(extraJS);
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
/** Extra toolbar options ***********
 * Append custom buttons to the edit mode toolbar. 
 * This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All.
 * This is based on the original code on Wikipedia:Tools/Editing tools
 * To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]
 *  
 *  Maintainers: [[User:MarkS]]?, [[User:Voice of All]], [[User:R. Koot]]
 */
if (mwCustomEditButtons) {
  mwCustomEditButtons.push({
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
    "speedTip": "Redirect",
    "tagOpen": "#REDIRECT [[",
    "tagClose": "]]",
    "sampleText": "Insert text"
  });
}

/***** Edittools ********
 * Formatting buttons for special characters below the edit field
 * Also enables these buttons on any textarea or input field on
 * the page. Moved here from Monobook.js on 2009-09-09.
 *
 * Maintainers: [[User:Lupo]]
 */
var load_edittools = true; // Legacy...
importScript('MediaWiki:Edittools.js');

//
// Collapsible tables
//
importScript('MediaWiki:CollapsibleTables.js');
importScript('MediaWiki:CollapsibleTemplates.js');

/**** ImageAnnotator ******
 * Globally enabled per
 * http://commons.wikimedia.org/w/index.php?title=Commons:Village_pump&oldid=26818359#New_interface_feature
 *
 * Maintainer: [[User:Lupo]]
 ****/

if (wgNamespaceNumber != -1 && wgAction && (wgAction == 'view' || wgAction == 'purge')) {
  // Not on Special pages, and only if viewing the page
  if (typeof (ImageAnnotator_disable) == 'undefined' || !ImageAnnotator_disable) {
    // Don't even import it if it's disabled.
    importScript ('MediaWiki:Gadget-ImageAnnotator.js');
  }
}

/**** Special:Upload enhancements ******
 * moved to [[MediaWiki:Upload.js]]
 * 
 *  Maintainer: [[User:Lupo]]
 ****/
JSconfig.registerKey('UploadForm_loadform', true, 
 {
  'bg': 'Използване на логиката на новия формуляр за качвания',
  'en': 'Use new upload form logic', // default
  'mk': 'Искористете ја логиката на новиот образец за подигнување',
  'ru': 'Использовать новую логику формы загрузки'
 }, 3);
JSconfig.registerKey('UploadForm_newlayout', true, 
 {
  'bg': 'Използване на облика на новия формуляр за качвания',
  'en': 'Use new upload form layout', // default
  'mk': 'Искористете го рувото на новиот образец за подигнување',
  'ru': 'Использовать новый интерфейс формы загрузки'
 }, 3);

function enableNewUploadForm ()
{
  var match = navigator.userAgent.match(/AppleWebKit\/(\d+)/);
  if (match) {
    var webKitVersion = parseInt(match[1]);
    if (webKitVersion < 420) return; // Safari 2 crashes hard with the new upload form...
  }

  // honor JSConfig user settings
  if( !JSconfig.keys['UploadForm_loadform'] ) return;

  importScript( 'MediaWiki:UploadForm.js' );
}

if (wgPageName == 'Special:Upload') 
{
 importScript( 'MediaWiki:Upload.js' );
 // Uncomment the following line (the call to enableNewUploadForm) to globally enable the
 // new upload form. Leave the line *above* (the include of MediaWiki:Upload.js) untouched;
 // that script provides useful default behavior if the new upload form is disabled or
 // redirects to the old form in case an error occurs.
 enableNewUploadForm ();
}

// We may be running MediaWiki:UploadForm.js on this site. The following script changes the
// "reupload" links on image pages to go to the basic form.
if (wgNamespaceNumber == 6) importScript ('MediaWiki:UploadFormLinkFixer.js');
/**** QICSigs ******
 * Fix for the broken signatures in gallery tags
 * needed for [[COM:QIC]]
 *
 *  Maintainers: [[User:Dschwen]]
 ****/
if( wgPageName == "Commons:Quality_images_candidates/candidate_list" && wgAction == "edit" )
{
 importScript( 'MediaWiki:QICSigs.js' );
}

/**** VICValidate ******
 * Some basic form validation for creating new Valued image nominations
 * needed for [[COM:VIC]]
 *
 *  Maintainers: [[User:Dschwen]]
 ****/
if( wgPageName == "Commons:Valued_image_candidates" && wgAction == "view" )
{
 importScript( 'MediaWiki:VICValidate.js' );
}
/***** subPagesLink ********
 * Adds a link to subpages of current page
 *
 *  Maintainers: [[:he:משתמש:ערן]], [[User:Dschwen]]
 *
 *  JSconfig items: bool JSconfig.subPagesLink
 *                       (true=enabled (default), false=disabled)
 ****/
var subPagesLink =
{ 
 //
 // Translations of the menu item
 //
 i18n :
 {
  'bg': 'Подстраници',
  'ca': 'Subpàgines',
  'cs': 'Podstránky',
  'de': 'Unterseiten',
  'en': 'Subpages',    // default
  'et': 'Alamlehed',
  'eo': 'Subpaĝoj',
  'eu': 'Azpiorrialdeak',
  'es': 'Subpáginas',
  'fi': 'Alasivut',
  'fr': 'Sous-pages',
  'gl': 'Subpáxinas',
  'he': 'דפי משנה',
  'hr': 'Podstranice',
  'it': 'Sottopagine',
  'is': 'Undirsíður',
  'ko': '하위 문서 목록',
  'mk': 'Потстраници',
  'nl': "Subpagina's",
  'no': 'Undersider',
  'pl': 'Podstrony',
  'ru': 'Подстраницы'
 },

 install: function()
 {
  // honor user configuration
  if( !JSconfig.keys['subPagesLink'] ) return;

  if ( document.getElementById("t-whatlinkshere") 
       &&  wgNamespaceNumber != -2   // Media: (upcoming)
       &&  wgNamespaceNumber != -1   // Special:
       && wgNamespaceNumber != 6     // Image:
       &&  wgNamespaceNumber != 14   // Category:
     )
  {
   var subpagesText = subPagesLink.i18n[wgUserLanguage] || subPagesLink.i18n['en'];
   var subpagesLink = wgArticlePath.replace('$1','Special:Prefixindex/' + wgPageName +'/');

   addPortletLink( 'p-tb', subpagesLink, subpagesText, 't-subpages' );
  }
 }
}
JSconfig.registerKey('subPagesLink', true, 
 {
  'bg': 'Показване на връзката Подстраници в менюто с инструменти',
  'cs': 'Zobrazovat v panelu nástrojů odkaz Podstránky',
  'en': 'Show a Subpages link in the toolbox', // default
  'mk': 'Покажи врска до потстраниците во алатникот',
  'pl': 'Pokaż w panelu bocznym link do podstron',
  'ru': 'Показывать ссылку на подстраницы в меню инструментов'
 }, 7);
addOnloadHook(subPagesLink.install);
/***** new os_createContainer ********
 * make the width of the search suggest window customizable
 *
 *  Maintainers: [[User:Dschwen]]
 ****/

// Translations of the message in the user preferences
if( typeof os_createContainer != 'undefined' ) {
  JSconfig.registerKey('os_suggest_width', "", 
   {
    'bg': 'Ширина на падащото меню с AJAX предположения',
    'cs': 'Šířka AJAXového napovídače',
    'en': 'Custom AJAX suggestion box width', // default
    'mk': 'Широчина на кутијата со предлози со AJAX',
    'ru': 'Ширина выпадающей AJAX-подсказки'
   }, 6);
  var old_os_createContainer = os_createContainer;
  os_createContainer = function( r) 
  {
   var c = old_os_createContainer( r );
   var w = JSconfig.keys['os_suggest_width'];
   if( w != "" ) c.style.width = w + "px";
   return c;
  }
}
/***** gallery_dshuf_prepare ********
 * prepare galleries which are surrounded by <div class="dshuf"></div>
 * for shuffling with dshuf (see below).
 *
 *  Maintainers: [[User:Dschwen]]
 ****/
function gallery_dshuf_prepare()
{
 var tables = document.getElementsByTagName("table");
 var divsorig, divs, newdiv, parent, j, i;

 for ( i = 0; i < tables.length; i++)
  if ( tables[i].className == 'gallery' && 
       tables[i].parentNode.className == 'dshuf' )
  {
   divsorig = tables[i].getElementsByTagName( 'div' );
   divs = [];
   for ( j = 0; j < divsorig.length; j++) divs.push(divsorig[j]);
   for ( j = 0; j < divs.length; j++)
    if ( divs[j].className == 'gallerybox' )
    {
     newdiv = document.createElement( 'DIV' );
     newdiv.className = 'dshuf dshufset' + i;
     while( divs[j].childNodes.length > 0 )
      newdiv.appendChild( divs[j].removeChild(divs[j].firstChild) );
     divs[j].appendChild( newdiv );
    }
  }
}
addOnloadHook(gallery_dshuf_prepare);
/***** dshuf ********
 * shuffles div elements with the class dshuf and 
 * common class dshufsetX (X being an integer)
 * taken from http://commons.wikimedia.org/w/index.php?title=MediaWiki:Common.js&oldid=7380543
 *
 *  Maintainers: [[User:Gmaxwell]], [[User:Dschwen]]
 ****/
function dshuf(){
 var shufsets = {};
 var rx = new RegExp('dshuf'+'\\s+(dshufset\\d+)', 'i');
 var divs = document.getElementsByTagName("div");
 var i = divs.length;
 while( i-- )
 {
  if( rx.test(divs[i].className) )
  {
   if ( typeof shufsets[RegExp.$1] == "undefined" )
   { 
    shufsets[RegExp.$1] = {};
    shufsets[RegExp.$1].inner = [];
    shufsets[RegExp.$1].member = [];
   }
   shufsets[RegExp.$1].inner.push( { key:Math.random(), html:divs[i].innerHTML } );
   shufsets[RegExp.$1].member.push(divs[i]);
  }
 }

 for( shufset in shufsets )
 {
  shufsets[shufset].inner.sort( function(a,b) { return a.key - b.key; } );
  i = shufsets[shufset].member.length;
  while( i-- )
  {
   shufsets[shufset].member[i].innerHTML = shufsets[shufset].inner[i].html;
   shufsets[shufset].member[i].style.display = "block";
  }
 }
}
addOnloadHook(dshuf);
//Adds a dismissable notice to Special:Watchlist
//Useful to use instead of the sitenotice for messages only
//relevant to registered users.
if( wgCanonicalSpecialPageName == "Watchlist" ) importScript( 'MediaWiki:Common.js/WatchlistNotice.js' );

/***** localizeSignature ********
 * localizes the signature on Commons with the string in the user's preferred language
 *
 * Maintainer: [[User:Slomox]]
 ****/
function localizeSignature() {
 var talkTextLocalization = { ca: 'Discussió', cs: 'diskuse', de: 'Diskussion', fr: 'd', nds: 'Diskuschoon' };
 var talkText = talkTextLocalization[wgUserLanguage];
 if (!talkText) return;
 var spans=document.getElementsByTagName("span");
 for (var i = 0; i < spans.length; i++) {
  if ( spans[i].className == 'signature-talk' ) {
   spans[i].innerHTML = talkText;
  }
 }
}
addOnloadHook(localizeSignature);

// Load POTY gallery enhancements
function POTYenhancements() {
    var g = document.getElementById('poty-voting')
    if (g && wgUserName) {
        uri = wgScript + '?title=User:Kalan/poty.js&action=raw&ctype=text/javascript&go=' + g.className.match(/version-\d+/)[0]
        importScriptURI(uri)
    }
}

/*addOnloadHook(POTYenhancements)*/

//
// Add "Nominate for Deletion" to toolbar ([[MediaWiki talk:Quick-delete-code.js]])
//
importScript('MediaWiki:Quick-delete-code.js');

//
// Import usergroup-specific stylesheet, only for admins atm
//
for( var key in wgUserGroups )
{
   if (wgUserGroups[key] =="sysop")
   {
       importStylesheet("MediaWiki:Admin.css");
   } 
   else if (wgUserGroups[key] =="filemover")
   {
       importStylesheet("MediaWiki:Filemover.css");
   }
}

// Ajax Translation of /lang links, see [[MediaWiki:AjaxTranslation.js]]
// Maintainer: [[User:ערן]]
importScript('MediaWiki:AjaxTranslation.js');

// SVG images: adds links to rendered PNG images in different resolutions
function SVGThumbs() {
	var file = document.getElementById("file"); // might fail if MediaWiki can't render the SVG
	if (file && wgIsArticle && wgTitle.match(/\.svg$/i)) {
		var thumbu = file.getElementsByTagName('IMG')[0].src;
		if(!thumbu) return;
 
		function svgAltSize( w, title) {
			var path = thumbu.replace(/\/\d+(px-[^\/]+$)/, "/" + w + "$1");
			var a = document.createElement("A");
			a.setAttribute("href", path);
			a.appendChild(document.createTextNode(title));
			return a;
		}
 
		var p = document.createElement("p");
		p.className = "SVGThumbs";
		p.appendChild(document.createTextNode("This image rendered as PNG in other sizes"+": "));
		var l = [200, 500, 1000, 2000];
                for( var i = 0; i < l.length; i++ ) {
			p.appendChild(svgAltSize( l[i], l[i] + "px"));
			if( i < l.length-1 ) p.appendChild(document.createTextNode(", "));
                }
		p.appendChild(document.createTextNode("."));
		var info = getElementsByClassName( file.parentNode, 'div', 'fullMedia' )[0];
		if( info ) info.appendChild(p);
	}
};
addOnloadHook( SVGThumbs );

//Language & skin specific JavaScript and CSS.
//may be useful for renaming tab in main page in every language.
importScript('MediaWiki:Common.js/' + wgUserLanguage);
importScript('MediaWiki:' + skin + '.js/' + wgUserLanguage);
importStylesheet('MediaWiki:Common.css/' + wgUserLanguage);
importStylesheet('MediaWiki:' + skin + '.css/' + wgUserLanguage);

/* Quick-adding a command CommonsDelinker's command line */
/* Local maintainer: [[User:Kwj2772]] */
importScript('MediaWiki:CommonsDelinker.js');

/*Automatic language selection using javascript*/
importScript('MediaWiki:Common.js/LangSelect.js');

/*External click logging see http://lists.wikimedia.org/pipermail/commons-l/2009-November/005202.html for details*/
// deactivated as it carelessly overwrites the click handlers. needs fixing.
//importScript('User:Magnus Manske/log external link clicks.js');

// per talkpage It will be useful to normalize date used by script (e.g. Flickrreview script)
function getISODate() { // UTC
    var date = new Date();
    var dd = date.getUTCDate();
    if (dd < 10) { dd = "0"+ dd.toString(); }
    var mm = date.getUTCMonth()+1;
    if (mm < 10) { mm = "0"+ mm.toString(); }
    var YYYY = date.getUTCFullYear();
    ISOdate = YYYY + '-' + mm + '-' + dd
    return (ISOdate);
}


// Hide title on all main pages and change the "Gallery" tab text to "Main page" (or equivalent
// in user's language) on all main pages and their talk pages
if (wgNamespaceNumber == 0 || wgNamespaceNumber == 1) {
    importScript('MediaWiki:MainPages.js');
}

//
// Change target of add-section links
// See Template:ChangeSectionLink
//
addOnloadHook(function () 
{
 var changeAddSection = document.getElementById('jsChangeAddSection')
 if (changeAddSection)
 {
  var addSection = document.getElementById('ca-addsection');
  if (addSection)
  {
   addSection.firstChild.setAttribute('href', wgScript + 
    '?action=edit&section=new&title=' + encodeURIComponent(
    changeAddSection.getAttribute('title')));
  }
 }
});


/**
 * Add links to GlobalUsage and the CommonsDelinker log to file deletion log entries.
 *
 * Maintainer(s): [[User:Ilmari Karonen]]
 */
addOnloadHook(function () {
    // guard against multiple inclusion
    if (window.commonsDelinkerLogLinksAdded) return;
    window.commonsDelinkerLogLinksAdded = true;

    var content = document.getElementById("bodyContent") ||       // monobook & vector skins
                  document.getElementById("mw_contentholder") ||  // modern skin
                  document.getElementById("article");             // classic skins
    if (!content) return;

    var deletions = getElementsByClassName(content, "li", "mw-logline-delete");
    if (!deletions || !deletions.length) return;

    // create the links in advance so we can cloneNode() them quickly in the loop
    var guLink = document.createElement("a");
    guLink.className = "delinker-log-globalusage";
    guLink.appendChild(document.createTextNode("global usage"));

    var cdLink = document.createElement("a");
    cdLink.className = "delinker-log-link extiw";
    cdLink.appendChild(document.createTextNode("delinker log"));
            
    var span = document.createElement("span");
    span.className = "delinker-log-links";
    span.appendChild(document.createTextNode(" ("));
    span.appendChild(guLink);
    span.appendChild(document.createTextNode("; "));
    span.appendChild(cdLink);
    span.appendChild(document.createTextNode(")"));

    for (var i = 0; i < deletions.length; i++) {
        var match = null;
        for (var elem = deletions[i].firstChild; elem; elem = elem.nextSibling) {
            if (!elem.tagName || elem.tagName.toLowerCase() != 'a') continue;
            if (/mw-userlink/.test(elem.className)) continue;
            match = /^File:(.*)/.exec(getInnerText(elem));
            if (match) break;
        }
        if (match) {
            var filename = encodeURIComponent(match[1].replace(/ /g, "_"));
            guLink.href = wgScript + "?title=Special:GlobalUsage&target=" + filename;
            guLink.title = "Current usage of " + match[1] + " on all Wikimedia projects";
            cdLink.href = "http://toolserver.org/~delinker/index.php?image=" + filename;
            cdLink.title = "CommonsDelinker log for " + match[1];
            deletions[i].appendChild(span.cloneNode(true));
        }
    }
});


//</source>