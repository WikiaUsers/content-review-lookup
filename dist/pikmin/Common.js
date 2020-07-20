/* tooltips and access keys */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
ta = new Object();
ta['pt-userpage'] = new Array('.','My user page');
ta['pt-anonuserpage'] = new Array('.','The user page for the ip you\'re editing as');
ta['pt-mytalk'] = new Array('n','My talk page');
ta['pt-anontalk'] = new Array('n','Discussion about edits from this ip address');
ta['pt-preferences'] = new Array('','My preferences');
ta['pt-watchlist'] = new Array('l','The list of pages you\'re monitoring for changes.');
ta['pt-mycontris'] = new Array('y','List of my contributions');
ta['pt-login'] = new Array('o','You are encouraged to log in, it is not mandatory however.');
ta['pt-anonlogin'] = new Array('o','You are encouraged to log in, it is not mandatory however.');
ta['pt-logout'] = new Array('o','Log out');
ta['ca-talk'] = new Array('t','Discussion about the content page');
ta['ca-edit'] = new Array('e','You can edit this page. Please use the preview button before saving.');
ta['ca-addsection'] = new Array('+','Add a comment to this discussion.');
ta['ca-viewsource'] = new Array('e','This page is protected. You can view its source.');
ta['ca-history'] = new Array('h','Past versions of this page.');
ta['ca-protect'] = new Array('=','Protect this page');
ta['ca-delete'] = new Array('d','Delete this page');
ta['ca-undelete'] = new Array('d','Restore the edits done to this page before it was deleted');
ta['ca-move'] = new Array('m','Move this page');
ta['ca-watch'] = new Array('w','Add this page to your watchlist');
ta['ca-unwatch'] = new Array('w','Remove this page from your watchlist');
ta['search'] = new Array('f','Search this wiki');
ta['p-logo'] = new Array('','Main Page');
ta['n-mainpage'] = new Array('z','Visit the Main Page');
ta['n-portal'] = new Array('','About the project, what you can do, where to find things');
ta['n-currentevents'] = new Array('','Find background information on current events');
ta['n-recentchanges'] = new Array('r','The list of recent changes in the wiki.');
ta['n-randompage'] = new Array('x','Load a random page');
ta['n-help'] = new Array('','The place to find out.');
ta['n-sitesupport'] = new Array('','Support us');
ta['t-whatlinkshere'] = new Array('j','List of all wiki pages that link here');
ta['t-recentchangeslinked'] = new Array('k','Recent changes in pages linked from this page');
ta['feed-rss'] = new Array('','RSS feed for this page');
ta['feed-atom'] = new Array('','Atom feed for this page');
ta['t-contributions'] = new Array('','View the list of contributions of this user');
ta['t-emailuser'] = new Array('','Send a mail to this user');
ta['t-upload'] = new Array('u','Upload images or media files');
ta['t-specialpages'] = new Array('q','List of all special pages');
ta['ca-nstab-main'] = new Array('c','View the content page');
ta['ca-nstab-user'] = new Array('c','View the user page');
ta['ca-nstab-media'] = new Array('c','View the media page');
ta['ca-nstab-special'] = new Array('','This is a special page, you can\'t edit the page itself.');
ta['ca-nstab-project'] = new Array('a','View the project page');
ta['ca-nstab-image'] = new Array('c','View the image page');
ta['ca-nstab-mediawiki'] = new Array('c','View the system message');
ta['ca-nstab-template'] = new Array('c','View the template');
ta['ca-nstab-help'] = new Array('c','View the help page');
ta['ca-nstab-category'] = new Array('c','View the category page');
ta['ca-nstab-forum'] = new Array('c','View the forum page');

 /** Execute function on page load *********************************************
  *
  *  Description: Wrapper around addOnloadHook() for backwards compatibility.
  *               Will be removed in the near future.
  *  Maintainers: [[Wikipedia:User:R. Koot]]
  */
 
 function addLoadEvent( f ) { addOnloadHook( f ); }

 /* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: [[Wikipedia:User:Mike Dillon]], [[Wikipedia:User:R. Koot]], [[Wikipedia:User:SG]]
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName === undefined || tagName === null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
    }
	return array;
}
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};
 
 
function getElementsByName (name, root) {
 if (root === undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}

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
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild !== null;
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
                 NavChild !== null;
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
                  NavChild !== null;
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


/*Chat*/

function onloadhookcustom() {
  var replace = document.getElementById("chat");
  if (null !== replace) {
    replace.innerHTML='<applet width="100%" height="500" code="IRCApplet.class" archive="irc.jar,pixx.jar" codebase="http://java.freenode.net/freenode/pjirc"><param name="nick" value="Guest???"/><param name="alternatenick" value="Guest???"/><param name="name" value="Pikipedia User"/><param name="host" value="irc2.darkmyst.org"/><param name="gui" value="pixx"/><param name="command1" value="/join #pikipedia"/><param name="command2" value="/clear"/><param name="quitmessage" value="Long live Sporkman."/><param name="pixx:timestamp" value="true"/><param name="pixx:nickfield" value="true"/><param name="style:highlightlinks" value="true"/><param name="pixx:setfontonstyle" value="true"/><param name="pixx:styleselector" value="true"/><h1>No java support</h1><p><font color="green">Sorry, but you need a Java 1.4.x-enabled browser to use our chat.</font></p></applet>';
  }
}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);

/** Main Page layout fixes *********************************************************
 *
 *  Description:        Various layout fixes for the main page, including an
 *                      additional link to the complete list of languages available
 *                      and the renaming of the 'Article' to to 'Main Page'.
 *  Maintainers:        User:AzaToth, User:R. Koot
 */

function mainPageRenameNamespaceTab() {
    try {
        var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
        if ( Node.textContent ) {      // Per DOM Level 3
            Node.textContent = 'Main Page';
        } else if ( Node.innerText ) { // IE doesn't handle .textContent
            Node.innerText = 'Main Page';
        } else {                       // Fallback
            Node.replaceChild( Node.firstChild, document.createTextNode( 'Main Page' ) ); 
        }
    } catch(e) {
        // bailing out!
    }
}

if ( wgTitle == 'Main Page' && ( wgNamespaceNumber === 0 || wgNamespaceNumber == 1 ) ) {
       addOnloadHook( mainPageRenameNamespaceTab );
}

/* Tabber */

function mainpageTabs() {
  if(!document.getElementById('tabbyHead') || !document.getElementById('tabbyBoxes')) return;
  var box = document.getElementById('tabbyBoxes');
  tabbyBoxen = getElementsByClassName(document, 'div', 'tabbyBox');  //global
  tabbyLinks = document.getElementById('tabbyHead').getElementsByTagName('a');
  showbox(0);

  if(tabbyLinks.length < tabbyBoxen.length) {
    var len = tabbyLinks.length;
  } else {
    var len = tabbyBoxen.length;
  }

  for(var i=0;i<len;i++) {
    tabbyLinks[i].href = 'javascript:showbox("' + i + '");';
    tabbyLinks[i].title = 'click to display';
  }

}
addOnloadHook(mainpageTabs);

function showbox(num) {
  for(var i=0;i<tabbyBoxen.length;i++) {
    if(i==num) {
      tabbyBoxen[i].style.display = 'block';
    } else {
      tabbyBoxen[i].style.display = 'none';
    }
  }
  for(var i=0;i<tabbyLinks.length;i++) {
    if(i==num) {
      tabbyLinks[i].className = 'selected';
    } else {
      tabbyLinks[i].className = '';
    }
  }
}

/* Any JavaScript here will be loaded for all users on every page load. */
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            default:
                // Toggle
                for (var j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}

// addOnloadHook(toggleInit);