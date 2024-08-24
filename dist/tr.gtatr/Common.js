//<source lang="javascript">

/* Import more specific scripts if necessary */

if (wgAction == "edit" || wgAction == "submit" || wgPageName == "Special:Upload") //scripts specific to editing pages
{
    importScript("MediaWiki:Common.js/edit.js")
}
else if (wgPageName == "Special:Watchlist") //watchlist scripts
{
    importScript("MediaWiki:Common.js/watchlist.js")
}
else if (wgPageName == "Special:Search") //scripts specific to Special:Search
{
    importScript("MediaWiki:Common.js/search.js")
}


/** Sysop Javascript *******************************************************
  *
  *  Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]].
  */
function sysopFunctions() {
    if ( wgUserGroups && !window.disableSysopJS ) {
        for ( var g = 0; g < wgUserGroups.length; ++g ) {
            if ( wgUserGroups[g] == "sysop" ) {
                importScript( "MediaWiki:Sysop.js" );
                break;
            }
        }
    }
}

addOnloadHook( sysopFunctions );


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
    
    
    /**
     * Remove need for CSS hacks regarding MSIE and IPA.
     */
    
    if (document.createStyleSheet) {
        document.createStyleSheet().addRule('.IPA', 'font-family: "Doulos SIL", "Charis SIL", Gentium, "DejaVu Sans", Code2000, "TITUS Cyberbit Basic", "Arial Unicode MS", "Lucida Sans Unicode", "Chrysanthi Unicode";');
    }
    
    
    //Import scripts specific to Internet Explorer 6
    if (navigator.appVersion.substr(22, 1) == "6")
    {
        importScript("MediaWiki:Common.js/IE60Fixes.js")
    }
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
var collapseCaption = "Gizle";
var expandCaption = "Göster";

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


/** "Technical restrictions" title fix *****************************************
 *
 *  Description: For pages that have something like Template:Wrongtitle, replace
 *               the title, but only if it is cut-and-pasteable as a valid
 *               wikilink. For instance, "NZR WB class" can be changed to
 *               "NZR W<sup>B</sup> class", but [[C#]] is not an equivalent wikilink,
 *               so [[C Sharp]] doesn't have its main title changed.
 *
 *               The function looks for a banner like this: 
 *               <div id="RealTitleBanner"> ... <span id="RealTitle">title</span> ... </div>
 *  Maintainers: Remember_the_dot
 */

if (wgAction == "view") //prevents "Editing " from disappearing during preview
{
    addOnloadHook(function()
    {
        var realTitle = document.getElementById("RealTitle")
        
        if (realTitle)
        {
            //normalizes a title or a namespace name (but not both)
            //trims leading and trailing underscores and converts (possibly multiple) spaces and underscores to single underscores
            function normalizeTitle(title)
            {
                return title.replace(/^_+/, "").replace(/_+$/, "").replace(/[\s_]+/g, "_")
            }
            
            if (realTitle.textContent) //everyone but IE
            {
                var realTitleText = realTitle.textContent
            }
            else //IE
            {
                var realTitleText = realTitle.innerText
            }
            
            var normalizedRealTitle
            var normalizedPageTitle
            var indexOfColon = realTitleText.indexOf(":")
            var normalizedNamespaceName = normalizeTitle(realTitleText.substring(0, indexOfColon)).toLowerCase()
            
            //make namespace prefix lowercase and uppercase the first letter of the title
            if (indexOfColon == -1 || wgCanonicalNamespace.toLowerCase() != normalizedNamespaceName) //no namespace prefix - either no colon or a nonsensical namespace prefix (for example, "Foo" in "Foo: The Story of My Life")
            {
                normalizedRealTitle = normalizeTitle(realTitleText)
                normalizedRealTitle = normalizedRealTitle.charAt(0).toUpperCase() + normalizedRealTitle.substring(1)
                normalizedPageTitle = wgPageName.charAt(0).toUpperCase() + wgPageName.substring(1)
            }
            else //using a namespace prefix
            {
                var normalizedRealPageTitle = normalizeTitle(realTitleText.substring(indexOfColon + 1))
                
                normalizedRealTitle = normalizedNamespaceName
                if (normalizedNamespaceName != "") //namespace 0 is a special case where the leading colon should never be shown
                {
                    normalizedRealTitle += ":"
                }
                normalizedRealTitle += normalizedRealPageTitle.charAt(0).toUpperCase() + normalizedRealPageTitle.substring(1)
                normalizedPageTitle = wgPageName.substring(0, wgPageName.indexOf(":") + 1).toLowerCase() + wgPageName.substring(wgPageName.indexOf(":") + 1)
            }
            
            if (normalizedRealTitle == normalizedPageTitle) //normalized titles match, so we can do full replacement
            {
                var h1 = document.getElementsByTagName("h1")[0]
                
                //remove all child nodes, including text
                while (h1.firstChild) 
                {
                    h1.removeChild(h1.firstChild)
                }
                
                //populate with nodes of real title
                while (realTitle.firstChild) //the children are moved to a new parent element
                {
                    h1.appendChild(realTitle.firstChild)
                }
                
                //correct the page title
                document.title = realTitleText + " - Wikipedia, the free encyclopedia"
                
                //delete the real title banner since the problem is solved
                var realTitleBanner = document.getElementById("RealTitleBanner")
                if (realTitleBanner) realTitleBanner.parentNode.removeChild(realTitleBanner)
            }
        }
    })
}


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


/** IPv6 AAAA connectivity testing *******************************************************
  *
  *  Description: Uses hidden images to measure the possible negative impact of IPv6
  *  enabling the Wikimedia sites.
  *  This works by adding a hidden div to the footer with several image tags. 
  *  The source addresses of the image tags are set to domainnames which have v4, v6 and
  *  both address types set.  The script times how long objects take to load.
  *  Results are sent back to the server. http://ipv6and4.labs.wikimedia.org/stats.html
  *  Based on http://www.braintrust.co.nz/ipv6wwwtest/
  *  Contact: [[User:Gmaxwell]], [[User:Mark Bergsma]], [[User:Mindspillage]]
  */

var __ipv6wwwtest_factor = 100;
var __ipv6wwwtest_done = 0;
if ((wgServer != "https://secure.wikimedia.org") && (Math.floor(Math.random()*__ipv6wwwtest_factor)==42)) {
        var __ipv6wwwtest_timeoutMsec = 10000; // Timeout for 'final' result message in milliseconds
        var __ipv6wwwtest_hostSuffix = ".labs.wikimedia.org"; // Suffix to go on the IMG hostnames
        var __ipv6wwwtest_stopAtTimeout = true; // Whether to stop when the timeout is reached or not

        var __ipv6wwwtest_pageLoadTime;
        var __ipv6wwwtest_timeout = false;
        var __ipv6wwwtest_ipv4LoadTime = false;
        var __ipv6wwwtest_ipv4relLoadTime = false;
        var __ipv6wwwtest_ipv6LoadTime = false;
        var __ipv6wwwtest_ipv6bigLoadTime = false;
        var __ipv6wwwtest_ipv6and4LoadTime = false;
        var __ipv6wwwtest_id = Math.floor(Math.random()*Math.pow(2,31));

        function __ipv6wwwtest_startTest() {
                __ipv6wwwtest_pageLoadTime = new Date();
                document.getElementById("__ipv6wwwtest_ipv4Img").src = "http://ipv4" + __ipv6wwwtest_hostSuffix +"/ipv4.gif?id=" + __ipv6wwwtest_id;
                document.getElementById("__ipv6wwwtest_ipv4relImg").src = "//ipv4" + __ipv6wwwtest_hostSuffix +"/ipv4.gif?rel=1&id=" + __ipv6wwwtest_id;
                document.getElementById("__ipv6wwwtest_ipv6Img").src = "http://ipv6" + __ipv6wwwtest_hostSuffix +"/ipv6.gif?id=" + __ipv6wwwtest_id;
                document.getElementById("__ipv6wwwtest_ipv6and4Img").src = "http://ipv6and4" + __ipv6wwwtest_hostSuffix +"/ipv6and4.gif?id=" + __ipv6wwwtest_id;
                document.getElementById("__ipv6wwwtest_ipv6bigImg").src = "http://ipv6" + __ipv6wwwtest_hostSuffix +"/ipv6big.gif?id=" + __ipv6wwwtest_id;
        }

        function __ipv6wwwtest_sendResults(stage) {
                document.getElementById("__ipv6wwwtest_resultsImg").src = "http://results" + __ipv6wwwtest_hostSuffix +"/results.gif?id=" + __ipv6wwwtest_id + "&stage=" + stage + "&timeout=" + __ipv6wwwtest_timeoutMsec + "&stop_at_timeout=" + __ipv6wwwtest_stopAtTimeout + "&ipv4=" + __ipv6wwwtest_getLoadTime(__ipv6wwwtest_ipv4LoadTime) + "&ipv6=" + __ipv6wwwtest_getLoadTime(__ipv6wwwtest_ipv6LoadTime) + "&ipv6and4=" + __ipv6wwwtest_getLoadTime(__ipv6wwwtest_ipv6and4LoadTime) + "&ipv6big=" + __ipv6wwwtest_getLoadTime(__ipv6wwwtest_ipv6bigLoadTime) +"&ipv4rel="+ __ipv6wwwtest_getLoadTime(__ipv6wwwtest_ipv4relLoadTime) + "&rate=" + __ipv6wwwtest_factor;
        };

        function __ipv6wwwtest_getLoadTime(item) {
                if (item == false) {
                        return "NaN";
                } else {
                        return (item.getTime() - __ipv6wwwtest_pageLoadTime.getTime());
                }
        }

        function __ipv6wwwtest_checkFinished() {
                if ( (! __ipv6wwwtest_ipv6LoadTime) || (! __ipv6wwwtest_ipv4LoadTime) || (! __ipv6wwwtest_ipv6and4LoadTime) || (! __ipv6wwwtest_ipv6bigLoadTime) || (! __ipv6wwwtest_getLoadTime)) {
                        if (!__ipv6wwwtest_timeout) {
                                __ipv6wwwtest_timeout = window.setTimeout('__ipv6wwwtest_sendFinalResults()',__ipv6wwwtest_timeoutMsec);
                        }
                        __ipv6wwwtest_sendResults('partial');
                } else {
                        __ipv6wwwtest_sendFinalResults();
                }
        }

        function __ipv6wwwtest_sendFinalResults() {
                if (__ipv6wwwtest_done==0) {
                  if (__ipv6wwwtest_timeout) {
                          window.clearTimeout(__ipv6wwwtest_timeout);
                  }
                  __ipv6wwwtest_sendResults('final');

                  if (__ipv6wwwtest_stopAtTimeout) {
                          document.getElementById("__ipv6wwwtest_ipv4Img").src = "";
                          document.getElementById("__ipv6wwwtest_ipv4relImg").src = "";
                          document.getElementById("__ipv6wwwtest_ipv6Img").src = "";
                          document.getElementById("__ipv6wwwtest_ipv6and4Img").src = "";
                          document.getElementById("__ipv6wwwtest_ipv6bigImg").src = "";
                  }
                }
                __ipv6wwwtest_done=1;
        }
  addOnloadHook(function() {
        v6sub=document.getElementById("footer");
        v6sub.innerHTML=v6sub.innerHTML+'<div style="visibility: hidden;"> <img height="1" width="1" src="" id="__ipv6wwwtest_ipv4Img" onload="__ipv6wwwtest_ipv4LoadTime = new Date(); __ipv6wwwtest_checkFinished();" /> <img height="1" width="1" src="" id="__ipv6wwwtest_ipv4relImg" onload="__ipv6wwwtest_ipv4relLoadTime = new Date(); __ipv6wwwtest_checkFinished();" /> <img height="1" width="1" src="" id="__ipv6wwwtest_ipv6and4Img" onload="__ipv6wwwtest_ipv6and4LoadTime = new Date(); __ipv6wwwtest_checkFinished();" /> <img height="1" width="1" src="" id="__ipv6wwwtest_ipv6Img" onload="__ipv6wwwtest_ipv6LoadTime = new Date(); __ipv6wwwtest_checkFinished();" /> <img height="1" width="1" src="" id="__ipv6wwwtest_ipv6bigImg" onload="__ipv6wwwtest_ipv6bigLoadTime = new Date(); __ipv6wwwtest_checkFinished();" /> <img height="1" width="1" src="" id="__ipv6wwwtest_resultsImg" /> </div>';
       if (document.getElementById("__ipv6wwwtest_ipv4Img") && document.getElementById("__ipv6wwwtest_ipv6Img") && document.getElementById("__ipv6wwwtest_ipv6and4Img") && document.getElementById("__ipv6wwwtest_ipv6bigImg")) {
         __ipv6wwwtest_startTest();
       }
   });
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
    if (document.getElementById('disambig') || document.getElementById('disambigbox'))
      addEditIntro('Template:Disambig_editintro');
  });

  addOnloadHook(function(){
    var cats = document.getElementById('mw-normal-catlinks');
    if (!cats)
      return;
    cats = cats.getElementsByTagName('a');
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].title == 'Category:Living people') {
        addEditIntro('Template:BLP_editintro');
        break;
      }
    }
  });
}

/** Mobile browser helper link ************************************************
 *
 *  Adds a link to the mobile-optimized gateway at en.m.wikimedia.org
 *  for viewers on iPhone, iPod Touch, and Android devices.
 *  This is semi-experimental to drive more test traffic there for now;
 *  it's still in development but very usable for reading!
 *
 *  Currently set to always show the link on main page and search results,
 *  and w/ 25% probability on other page views.
 *
 *  Maintainer: [[User:Brion VIBBER]]
 */
if (/(Android|iPhone|iPod)/.test(navigator.userAgent)) {
  addOnloadHook(function() {
    var prob = 1.0;
    if (wgCanonicalNamespace == 'Special' && wgCanonicalSpecialPageName == 'Search') {
       var pageLink = '?search=' + encodeURIComponent(document.getElementById('searchText').value);
    } else if (wgPageName == 'Main_Page') {
       var pageLink = '::Home'; // Special case
    } else {
       var pageLink = encodeURIComponent(wgPageName).replace('%2F','/').replace('%3A',':');
    }
    if (prob < Math.random()) return;

    var div = document.createElement('div');
    div.setAttribute( "id", "mobileDeviceNotice" );
    div.style.fontSize = '30pt';
    div.style.lineHeight = '40pt';
    div.style.textAlign = 'center';
    div.style.marginTop = '20px';
    div.style.marginBottom = '20px';
    div.style.padding = '20px';
    div.style.border = '2px solid gray';
    div.appendChild(document.createTextNode("View this page on "));
    var link = document.createElement('a');
    link.href = 'http://en.m.wikipedia.org/wiki/' + pageLink;
    link.appendChild(document.createTextNode("Wikipedia's mobile site"));
    div.appendChild(link);
    var content=document.getElementById('content');
    content.insertBefore(div,content.firstChild);
  });
}

//</source>





/**
 * Add a link to one of the portlet menus on the page, including:
 *
 * p-cactions: Content actions (shown as tabs above the main content in Monobook)
 * p-personal: Personal tools (shown at the top right of the page in Monobook)
 * p-navigation: Navigation
 * p-tb: Toolbox
 *
 * This function exists for the convenience of custom JS authors.  All
 * but the first three parameters are optional, though providing at
 * least an id and a tooltip is recommended.
 *
 * By default the new link will be added to the end of the list.  To
 * add the link before a given existing item, pass the DOM node of
 * that item (easily obtained with document.getElementById()) as the
 * nextnode parameter; to add the link _after_ an existing item, pass
 * the node's nextSibling instead.
 *
 * @param String portlet -- id of the target portlet ("p-cactions", "p-personal", "p-navigation" or "p-tb")
 * @param String href -- link URL
 * @param String text -- link text (will be automatically lowercased by CSS for p-cactions in Monobook)
 * @param String id -- id of the new item, should be unique and preferably have the appropriate prefix ("ca-", "pt-", "n-" or "t-")
 * @param String tooltip -- text to show when hovering over the link, without accesskey suffix
 * @param String accesskey -- accesskey to activate this link (one character, try to avoid conflicts)
 * @param Node nextnode -- the DOM node before which the new item should be added, should be another item in the same list
 *
 * @return Node -- the DOM node of the new item (an LI element) or null
 */
function addPortletLink(portlet, href, text, id, tooltip, accesskey, nextnode) {
	var node = document.getElementById(portlet);
	if ( !node ) return null;
	node = node.getElementsByTagName( "ul" )[0];
	if ( !node ) return null;

	var link = document.createElement( "a" );
	link.appendChild( document.createTextNode( text ) );
	link.href = href;

	var item = document.createElement( "li" );
	item.appendChild( link );
	if ( id ) item.id = id;

	if ( accesskey ) {
		link.setAttribute( "accesskey", accesskey );
		tooltip += " ["+accesskey+"]";
	}
	if ( tooltip ) {
		link.setAttribute( "title", tooltip );
	}
	if ( accesskey && tooltip ) {
		updateTooltipAccessKeys( new Array( link ) );
	}

	if ( nextnode && nextnode.parentNode == node )
		node.insertBefore( item, nextnode );
	else
		node.appendChild( item );  // IE compatibility (?)

	return item;
}

function getInnerText(el) {
	if (typeof el == "string") return el;
	if (typeof el == "undefined") { return el };
	if (el.textContent) return el.textContent; // not needed but it is faster
	if (el.innerText) return el.innerText;     // IE doesn't have textContent
	var str = "";

	var cs = el.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				str += ts_getInnerText(cs[i]);
				break;
			case 3:	//TEXT_NODE
				str += cs[i].nodeValue;
				break;
		}
	}
	return str;
}



/**
 * Set up accesskeys/tooltips from the deprecated ta array.  If doId
 * is specified, only set up for that id.  Note that this function is
 * deprecated and will not be supported indefinitely -- use
 * updateTooltipAccessKey() instead.
 *
 * @param mixed doId string or null
 */
function akeytt( doId ) {
	// A lot of user scripts (and some of the code below) break if
	// ta isn't defined, so we make sure it is.  Explictly using
	// window.ta avoids a "ta is not defined" error.
	if (!window.ta) window.ta = new Array;

	// Make a local, possibly restricted, copy to avoid clobbering
	// the original.
	var ta;
	if ( doId ) {
		ta = [doId];
	} else {
		ta = window.ta;
	}

	// Now deal with evil deprecated ta
	var watchCheckboxExists = document.getElementById( 'wpWatchthis' ) ? true : false;
	for (var id in ta) {
		var n = document.getElementById(id);
		if (n) {
			var a = null;
			var ak = '';
			// Are we putting accesskey in it
			if (ta[id][0].length > 0) {
				// Is this object a object? If not assume it's the next child.

				if (n.nodeName.toLowerCase() == "a") {
					a = n;
				} else {
					a = n.childNodes[0];
				}
			 	// Don't add an accesskey for the watch tab if the watch
			 	// checkbox is also available.
				if (a && ((id != 'ca-watch' && id != 'ca-unwatch') || !watchCheckboxExists)) {
					a.accessKey = ta[id][0];
					ak = ' ['+tooltipAccessKeyPrefix+ta[id][0]+']';
				}
			} else {
				// We don't care what type the object is when assigning tooltip
				a = n;
				ak = '';
			}

			if (a) {
				a.title = ta[id][1]+ak;
			}
		}
	}
}

var checkboxes;
var lastCheckbox;

function setupCheckboxShiftClick() {
	checkboxes = [];
	lastCheckbox = null;
	var inputs = document.getElementsByTagName('input');
	addCheckboxClickHandlers(inputs);
}

function addCheckboxClickHandlers(inputs, start) {
	if ( !start) start = 0;

	var finish = start + 250;
	if ( finish > inputs.length )
		finish = inputs.length;

	for ( var i = start; i < finish; i++ ) {
		var cb = inputs[i];
		if ( !cb.type || cb.type.toLowerCase() != 'checkbox' )
			continue;
		var end = checkboxes.length;
		checkboxes[end] = cb;
		cb.index = end;
		cb.onclick = checkboxClickHandler;
	}

	if ( finish < inputs.length ) {
		setTimeout( function () {
			addCheckboxClickHandlers(inputs, finish);
		}, 200 );
	}
}

function checkboxClickHandler(e) {
	if (typeof e == 'undefined') {
		e = window.event;
	}
	if ( !e.shiftKey || lastCheckbox === null ) {
		lastCheckbox = this.index;
		return true;
	}
	var endState = this.checked;
	var start, finish;
	if ( this.index < lastCheckbox ) {
		start = this.index + 1;
		finish = lastCheckbox;
	} else {
		start = lastCheckbox;
		finish = this.index - 1;
	}
	for (var i = start; i <= finish; ++i ) {
		checkboxes[i].checked = endState;
		if( i > start && typeof checkboxes[i].onchange == 'function' )
			checkboxes[i].onchange(); // fire triggers
	}
	lastCheckbox = this.index;
	return true;
}

function toggle_element_activation(ida,idb) {
	if (!document.getElementById) {
		return;
	}
	document.getElementById(ida).disabled=true;
	document.getElementById(idb).disabled=false;
}

function toggle_element_check(ida,idb) {
	if (!document.getElementById) {
		return;
	}
	document.getElementById(ida).checked=true;
	document.getElementById(idb).checked=false;
}

/*
	Written by Jonathan Snook, http://www.snook.ca/jonathan
	Add-ons by Robert Nyman, http://www.robertnyman.com
	Author says "The credit comment is all it takes, no license. Go crazy with it!:-)"
	From http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
*/
function getElementsByClassName(oElm, strTagName, oClassNames){
	var arrReturnElements = new Array();
	if ( typeof( oElm.getElementsByClassName ) == "function" ) {
		/* Use a native implementation where possible FF3, Saf3.2, Opera 9.5 */
		var arrNativeReturn = oElm.getElementsByClassName( oClassNames );
		if ( strTagName == "*" )
			return arrNativeReturn;
		for ( var h=0; h < arrNativeReturn.length; h++ ) {
			if( arrNativeReturn[h].tagName.toLowerCase() == strTagName.toLowerCase() )
				arrReturnElements[arrReturnElements.length] = arrNativeReturn[h];
		}
		return arrReturnElements;
	}
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrRegExpClassNames = new Array();
	if(typeof oClassNames == "object"){
		for(var i=0; i<oClassNames.length; i++){
			arrRegExpClassNames[arrRegExpClassNames.length] =
				new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)");
		}
	}
	else{
		arrRegExpClassNames[arrRegExpClassNames.length] =
			new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)");
	}
	var oElement;
	var bMatchesAll;
	for(var j=0; j<arrElements.length; j++){
		oElement = arrElements[j];
		bMatchesAll = true;
		for(var k=0; k<arrRegExpClassNames.length; k++){
			if(!arrRegExpClassNames[k].test(oElement.className)){
				bMatchesAll = false;
				break;
			}
		}
		if(bMatchesAll){
			arrReturnElements[arrReturnElements.length] = oElement;
		}
	}
	return (arrReturnElements)
}

function redirectToFragment(fragment) {
	var match = navigator.userAgent.match(/AppleWebKit\/(\d+)/);
	if (match) {
		var webKitVersion = parseInt(match[1]);
		if (webKitVersion < 420) {
			// Released Safari w/ WebKit 418.9.1 messes up horribly
			// Nightlies of 420+ are ok
			return;
		}
	}
	if (is_gecko) {
		// Mozilla needs to wait until after load, otherwise the window doesn't scroll
		addOnloadHook(function () {
			if (window.location.hash == "")
				window.location.hash = fragment;
		});
	} else {
		if (window.location.hash == "")
			window.location.hash = fragment;
	}
}

/**************************************************************/
/* sliders using jquery by User:Tierrie in Dragon Age Wiki */
/**************************************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
});

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
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

/** Change "Patroller" to newGroup **/
if((wgPageName == 'User:ExtremoMania') || (wgPageName == 'User_talk:ExtremoMania') || (wgPageName == 'User_blog:ExtremoMania') || (wgPageName == 'Special:Contributions/ExtremoMania')) {
  $('.group').html('Patroller');
}