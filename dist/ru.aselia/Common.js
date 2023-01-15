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


/** Main Page layout fixes *********************************************************
 *
 *  Description: Adds an additional link to the complete list of languages available.
 *  Maintainers: [[User:AzaToth]], [[User:R. Koot]], [[User:Alex Smotrov]]
 */

function mainPageAppendCompleteListLink() {
    addPortletLink('p-lang', 'http://meta.wikimedia.org/wiki/List_of_Wikipedias',
                   'Complete list', 'interwiki-completelist', 'Complete list of Wikipedias')
}

if ((wgTitle == 'Main Page' && wgNamespaceNumber == 0) || (wgTitle == 'Wikipedia' && wgNamespaceNumber == 100)) {
    addOnloadHook(mainPageAppendCompleteListLink);
    addOnloadHook(dshuf);
}

//Shuffle for election candidates.
function dshuf() {
    var shufsets=new Object()
    var rx=new RegExp('dshuf'+'\\s+(dshufset\\d+)', 'i') 
    var divs=document.getElementsByTagName("div")
    for (var i=0; i<divs.length; i++) {
	if (rx.test(divs[i].className)) {
	    if (typeof shufsets[RegExp.$1]=="undefined") { 
		shufsets[RegExp.$1]=new Object() 
		shufsets[RegExp.$1].inner=[] 
		shufsets[RegExp.$1].member=[]
	    }
	    shufsets[RegExp.$1].inner.push({key:Math.random(),html:divs[i].innerHTML}) 
	    shufsets[RegExp.$1].member.push(divs[i]) 
	}
    }
    for (shufset in shufsets) {
	shufsets[shufset].inner.sort(function(a,b) {return a.key-b.key})
	for (var i=0; i<shufsets[shufset].member.length; i++) {
	    shufsets[shufset].member[i].innerHTML=shufsets[shufset].inner[i].html
	    shufsets[shufset].member[i].style.display="block"
	}
    }
}



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
 *               An element with id=DisableRealTitle disables the function.
 *  Maintainers: Remember_the_dot
 */

if (wgIsArticle) //prevents the "Editing " prefix from disappearing during preview
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
                
                //delete the real title banner since the problem is solved
                var realTitleBanner = document.getElementById("RealTitleBanner")
                realTitleBanner.parentNode.removeChild(realTitleBanner)
            }
            
            //no matter what, correct the page title
            document.title = realTitleText + " - Wikipedia, the free encyclopedia"
        }
    })
}


/** Table sorting fixes ************************************************
  *
  *  Description: Disables code in table sorting routine to set classes on even/odd rows
  *  Maintainers: [[User:Random832]]
  */

ts_alternate_row_colors = false;


/** Modernista referrer ************************************************
  *
  *  Description: Adds a notice to pages viewed through modernista.com
  *  Maintainers: [[User:Random832]]
  */

addOnloadHook(function(){
  if(/modernista\.com/.test(document.referrer)) {
	 jsMsg('<table><tr><td><img src="http://upload.wikimedia.org/'
	 +'wikipedia/commons/thumb/d/dc/Nuvola_apps_important_yellow.svg/'
	 +'48px-Nuvola_apps_important_yellow.svg.png" /></td><td><br /><br />You '
	 +'appear to have come here from the Modernista website. They '
	 +'enclose Wikipedia’s content with a frame and overlay their '
	 +'own navigation banner on top. Wikipedia does not endorse '
	 +'Modernista and its appearance here should not be taken to '
	 +'imply this.</td></tr></table>');
  }
});

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

/** Disambig editintro ********************************************************
 *
 *  Description: Adds an editintro on disambiguation pages. Original code
 *  located at [[User:RockMFR/disambigeditintro.js]].
 *
 *  Maintainers: [[User:RockMFR]], [[User:Quiddity]]
 */
 
if (wgNamespaceNumber == 0) addOnloadHook(function(){
 if (!document.getElementById('disambig')) return
 var el = document.getElementById('ca-edit')
 if (el) el = el.getElementsByTagName('a')[0]
 if (el) el.href += '&editintro=Template:Disambig_editintro'
})

//</source>
/**
 * jQuery makeCollapsible
 *
 * Dual licensed:
 * - CC BY 3.0 <http://creativecommons.org/licenses/by/3.0>
 * - GPL2 <http://www.gnu.org/licenses/old-licenses/gpl-2.0.html>
 *
 * @class jQuery.plugin.makeCollapsible
 */
( function ( $, mw ) {

	/**
	 * Handler for a click on a collapsible toggler.
	 *
	 * @private
	 * @param {jQuery} $collapsible
	 * @param {string} action The action this function will take ('expand' or 'collapse').
	 * @param {jQuery|null} [$defaultToggle]
	 * @param {Object|undefined} [options]
	 */
	function toggleElement( $collapsible, action, $defaultToggle, options ) {
		var $collapsibleContent, $containers, hookCallback;
		options = options || {};

		// Validate parameters

		// $collapsible must be an instance of jQuery
		if ( !$collapsible.jquery ) {
			return;
		}
		if ( action !== 'expand' && action !== 'collapse' ) {
			// action must be string with 'expand' or 'collapse'
			return;
		}
		if ( $defaultToggle === undefined ) {
			$defaultToggle = null;
		}
		if ( $defaultToggle !== null && !$defaultToggle.jquery ) {
			// is optional (may be undefined), but if defined it must be an instance of jQuery.
			// If it's not, abort right away.
			// After this $defaultToggle is either null or a valid jQuery instance.
			return;
		}

		// Trigger a custom event to allow callers to hook to the collapsing/expanding,
		// allowing the module to be testable, and making it possible to
		// e.g. implement persistence via cookies
		$collapsible.trigger( action === 'expand' ? 'beforeExpand.mw-collapsible' : 'beforeCollapse.mw-collapsible' );
		hookCallback = function () {
			$collapsible.trigger( action === 'expand' ? 'afterExpand.mw-collapsible' : 'afterCollapse.mw-collapsible' );
		};

		// Handle different kinds of elements

		if ( !options.plainMode && $collapsible.is( 'table' ) ) {
			// Tables
			// If there is a caption, hide all rows; otherwise, only hide body rows
			if ( $collapsible.find( '> caption' ).length ) {
				$containers = $collapsible.find( '> * > tr' );
			} else {
				$containers = $collapsible.find( '> tbody > tr' );
			}
			if ( $defaultToggle ) {
				// Exclude table row containing togglelink
				$containers = $containers.not( $defaultToggle.closest( 'tr' ) );
			}

			if ( action === 'collapse' ) {
				// Hide all table rows of this table
				// Slide doesn't work with tables, but fade does as of jQuery 1.1.3
				// http://stackoverflow.com/questions/467336#920480
				if ( options.instantHide ) {
					$containers.hide();
					hookCallback();
				} else {
					$containers.stop( true, true ).fadeOut().promise().done( hookCallback );
				}
			} else {
				$containers.stop( true, true ).fadeIn().promise().done( hookCallback );
			}

		} else if ( !options.plainMode && ( $collapsible.is( 'ul' ) || $collapsible.is( 'ol' ) ) ) {
			// Lists
			$containers = $collapsible.find( '> li' );
			if ( $defaultToggle ) {
				// Exclude list-item containing togglelink
				$containers = $containers.not( $defaultToggle.parent() );
			}

			if ( action === 'collapse' ) {
				if ( options.instantHide ) {
					$containers.hide();
					hookCallback();
				} else {
					$containers.stop( true, true ).slideUp().promise().done( hookCallback );
				}
			} else {
				$containers.stop( true, true ).slideDown().promise().done( hookCallback );
			}

		} else {
			// Everything else: <div>, <p> etc.
			$collapsibleContent = $collapsible.find( '> .mw-collapsible-content' );

			// If a collapsible-content is defined, act on it
			if ( !options.plainMode && $collapsibleContent.length ) {
				if ( action === 'collapse' ) {
					if ( options.instantHide ) {
						$collapsibleContent.hide();
						hookCallback();
					} else {
						$collapsibleContent.slideUp().promise().done( hookCallback );
					}
				} else {
					$collapsibleContent.slideDown().promise().done( hookCallback );
				}

			// Otherwise assume this is a customcollapse with a remote toggle
			// .. and there is no collapsible-content because the entire element should be toggled
			} else {
				if ( action === 'collapse' ) {
					if ( options.instantHide ) {
						$collapsible.hide();
						hookCallback();
					} else {
						if ( $collapsible.is( 'tr' ) || $collapsible.is( 'td' ) || $collapsible.is( 'th' ) ) {
							$collapsible.fadeOut().promise().done( hookCallback );
						} else {
							$collapsible.slideUp().promise().done( hookCallback );
						}
					}
				} else {
					if ( $collapsible.is( 'tr' ) || $collapsible.is( 'td' ) || $collapsible.is( 'th' ) ) {
						$collapsible.fadeIn().promise().done( hookCallback );
					} else {
						$collapsible.slideDown().promise().done( hookCallback );
					}
				}
			}
		}
	}

	/**
	 * Handle clicking/keypressing on the collapsible element toggle and other
	 * situations where a collapsible element is toggled (e.g. the initial
	 * toggle for collapsed ones).
	 *
	 * @private
	 * @param {jQuery} $toggle the clickable toggle itself
	 * @param {jQuery} $collapsible the collapsible element
	 * @param {jQuery.Event|null} e either the event or null if unavailable
	 * @param {Object|undefined} options
	 */
	function togglingHandler( $toggle, $collapsible, e, options ) {
		var wasCollapsed, $textContainer, collapseText, expandText;
		options = options || {};

		if ( e ) {
			if (
				e.type === 'click' &&
				options.linksPassthru &&
				$.nodeName( e.target, 'a' ) &&
				$( e.target ).attr( 'href' ) &&
				$( e.target ).attr( 'href' ) !== '#'
			) {
				// Don't fire if a link with href !== '#' was clicked, if requested  (for premade togglers by default)
				return;
			} else if ( e.type === 'keypress' && e.which !== 13 && e.which !== 32 ) {
				// Only handle keypresses on the "Enter" or "Space" keys
				return;
			} else {
				e.preventDefault();
				e.stopPropagation();
			}
		}

		// This allows the element to be hidden on initial toggle without fiddling with the class
		if ( options.wasCollapsed !== undefined ) {
			wasCollapsed = options.wasCollapsed;
		} else {
			wasCollapsed = $collapsible.hasClass( 'mw-collapsed' );
		}

		// Toggle the state of the collapsible element (that is, expand or collapse)
		$collapsible.toggleClass( 'mw-collapsed', !wasCollapsed );

		// Toggle the mw-collapsible-toggle classes, if requested (for default and premade togglers by default)
		if ( options.toggleClasses ) {
			$toggle
				.toggleClass( 'mw-collapsible-toggle-collapsed', !wasCollapsed )
				.toggleClass( 'mw-collapsible-toggle-expanded', wasCollapsed );
		}

		// Toggle the text ("Show"/"Hide"), if requested (for default togglers by default)
		if ( options.toggleText ) {
			collapseText = options.toggleText.collapseText;
			expandText = options.toggleText.expandText;

			$textContainer = $toggle.find( '> a' );
			if ( !$textContainer.length ) {
				$textContainer = $toggle;
			}
			$textContainer.text( wasCollapsed ? collapseText : expandText );
		}

		// And finally toggle the element state itself
		toggleElement( $collapsible, wasCollapsed ? 'expand' : 'collapse', $toggle, options );
	}

	/**
	 * Enable collapsible-functionality on all elements in the collection.
	 *
	 * - Will prevent binding twice to the same element.
	 * - Initial state is expanded by default, this can be overridden by adding class
	 *   "mw-collapsed" to the "mw-collapsible" element.
	 * - Elements made collapsible have jQuery data "mw-made-collapsible" set to true.
	 * - The inner content is wrapped in a "div.mw-collapsible-content" (except for tables and lists).
	 *
	 * @param {Object} [options]
	 * @param {string} [options.collapseText] Text used for the toggler, when clicking it would
	 *   collapse the element. Default: the 'data-collapsetext' attribute of the
	 *   collapsible element or the content of 'collapsible-collapse' message.
	 * @param {string} [options.expandText] Text used for the toggler, when clicking it would
	 *   expand the element. Default: the 'data-expandtext' attribute of the
	 *   collapsible element or the content of 'collapsible-expand' message.
	 * @param {boolean} [options.collapsed] Whether to collapse immediately. By default
	 *   collapse only if the elements has the 'mw-collapsible' class.
	 * @param {jQuery} [options.$customTogglers] Elements to be used as togglers
	 *   for this collapsible element. By default, if the collapsible element
	 *   has an id attribute like 'mw-customcollapsible-XXX', elements with a
	 *   *class* of 'mw-customtoggle-XXX' are made togglers for it.
	 * @param {boolean} [options.plainMode=false] Whether to use a "plain mode" when making the
	 *   element collapsible - that is, hide entire tables and lists (instead
	 *   of hiding only all rows but first of tables, and hiding each list
	 *   item separately for lists) and don't wrap other elements in
	 *   div.mw-collapsible-content. May only be used with custom togglers.
	 * @return {jQuery}
	 * @chainable
	 */
	$.fn.makeCollapsible = function ( options ) {
		options = options || {};

		this.each( function () {
			var $collapsible, collapseText, expandText, $caption, $toggle, actionHandler, buildDefaultToggleLink,
				premadeToggleHandler, $toggleLink, $firstItem, collapsibleId, $customTogglers, firstval;

			// Ensure class "mw-collapsible" is present in case .makeCollapsible()
			// is called on element(s) that don't have it yet.
			$collapsible = $( this ).addClass( 'mw-collapsible' );

			// Return if it has been enabled already.
			if ( $collapsible.data( 'mw-made-collapsible' ) ) {
				return;
			} else {
				$collapsible.data( 'mw-made-collapsible', true );
			}

			// Use custom text or default?
			collapseText = options.collapseText || $collapsible.attr( 'data-collapsetext' ) || mw.msg( 'collapsible-collapse' );
			expandText = options.expandText || $collapsible.attr( 'data-expandtext' ) || mw.msg( 'collapsible-expand' );

			// Default click/keypress handler and toggle link to use when none is present
			actionHandler = function ( e, opts ) {
				var defaultOpts = {
					toggleClasses: true,
					toggleText: { collapseText: collapseText, expandText: expandText }
				};
				opts = $.extend( defaultOpts, options, opts );
				togglingHandler( $( this ), $collapsible, e, opts );
			};
			// Default toggle link. Only build it when needed to avoid jQuery memory leaks (event data).
			buildDefaultToggleLink = function () {
				return $( '<a href="#"></a>' )
					.text( collapseText )
					.wrap( '<span class="mw-collapsible-toggle"></span>' )
						.parent()
						.prepend( '<span class="mw-collapsible-bracket">[</span>' )
						.append( '<span class="mw-collapsible-bracket">]</span>' )
						.on( 'click.mw-collapsible keypress.mw-collapsible', actionHandler );
			};

			// Default handler for clicking on premade toggles
			premadeToggleHandler = function ( e, opts ) {
				var defaultOpts = { toggleClasses: true, linksPassthru: true };
				opts = $.extend( defaultOpts, options, opts );
				togglingHandler( $( this ), $collapsible, e, opts );
			};

			// Check if this element has a custom position for the toggle link
			// (ie. outside the container or deeper inside the tree)
			if ( options.$customTogglers ) {
				$customTogglers = $( options.$customTogglers );
			} else {
				collapsibleId = $collapsible.attr( 'id' ) || '';
				if ( collapsibleId.indexOf( 'mw-customcollapsible-' ) === 0 ) {
					$customTogglers = $( '.' + collapsibleId.replace( 'mw-customcollapsible', 'mw-customtoggle' ) )
						.addClass( 'mw-customtoggle' );
				}
			}

			// Add event handlers to custom togglers or create our own ones
			if ( $customTogglers && $customTogglers.length ) {
				actionHandler = function ( e, opts ) {
					var defaultOpts = {};
					opts = $.extend( defaultOpts, options, opts );
					togglingHandler( $( this ), $collapsible, e, opts );
				};

				$toggleLink = $customTogglers
					.on( 'click.mw-collapsible keypress.mw-collapsible', actionHandler )
					.prop( 'tabIndex', 0 );

			} else {
				// If this is not a custom case, do the default: wrap the
				// contents and add the toggle link. Different elements are
				// treated differently.

				if ( $collapsible.is( 'table' ) ) {

					// If the table has a caption, collapse to the caption
					// as opposed to the first row
					$caption = $collapsible.find( '> caption' );
					if ( $caption.length ) {
						$toggle = $caption.find( '> .mw-collapsible-toggle' );

						// If there is no toggle link, add it to the end of the caption
						if ( !$toggle.length ) {
							$toggleLink = buildDefaultToggleLink().appendTo( $caption );
						} else {
							actionHandler = premadeToggleHandler;
							$toggleLink = $toggle.on( 'click.mw-collapsible keypress.mw-collapsible', actionHandler )
								.prop( 'tabIndex', 0 );
						}
					} else {
						// The toggle-link will be in one of the cells (td or th) of the first row
						$firstItem = $collapsible.find( 'tr:first th, tr:first td' );
						$toggle = $firstItem.find( '> .mw-collapsible-toggle' );

						// If theres no toggle link, add it to the last cell
						if ( !$toggle.length ) {
							$toggleLink = buildDefaultToggleLink().prependTo( $firstItem.eq( -1 ) );
						} else {
							actionHandler = premadeToggleHandler;
							$toggleLink = $toggle.on( 'click.mw-collapsible keypress.mw-collapsible', actionHandler )
								.prop( 'tabIndex', 0 );
						}
					}

				} else if ( $collapsible.parent().is( 'li' ) &&
					$collapsible.parent().children( '.mw-collapsible' ).length === 1 &&
					$collapsible.find( '> .mw-collapsible-toggle' ).length === 0
				) {
					// special case of one collapsible in <li> tag
					$toggleLink = buildDefaultToggleLink();
					$collapsible.before( $toggleLink );
				} else if ( $collapsible.is( 'ul' ) || $collapsible.is( 'ol' ) ) {
					// The toggle-link will be in the first list-item
					$firstItem = $collapsible.find( 'li:first' );
					$toggle = $firstItem.find( '> .mw-collapsible-toggle' );

					// If theres no toggle link, add it
					if ( !$toggle.length ) {
						// Make sure the numeral order doesn't get messed up, force the first (soon to be second) item
						// to be "1". Except if the value-attribute is already used.
						// If no value was set WebKit returns "", Mozilla returns '-1', others return 0, null or undefined.
						firstval = $firstItem.prop( 'value' );
						if ( firstval === undefined || !firstval || firstval === '-1' || firstval === -1 ) {
							$firstItem.prop( 'value', '1' );
						}
						$toggleLink = buildDefaultToggleLink();
						$toggleLink.wrap( '<li class="mw-collapsible-toggle-li"></li>' ).parent().prependTo( $collapsible );
					} else {
						actionHandler = premadeToggleHandler;
						$toggleLink = $toggle.on( 'click.mw-collapsible keypress.mw-collapsible', actionHandler )
							.prop( 'tabIndex', 0 );
					}

				} else { // <div>, <p> etc.

					// The toggle-link will be the first child of the element
					$toggle = $collapsible.find( '> .mw-collapsible-toggle' );

					// If a direct child .content-wrapper does not exists, create it
					if ( !$collapsible.find( '> .mw-collapsible-content' ).length ) {
						$collapsible.wrapInner( '<div class="mw-collapsible-content"></div>' );
					}

					// If theres no toggle link, add it
					if ( !$toggle.length ) {
						$toggleLink = buildDefaultToggleLink().prependTo( $collapsible );
					} else {
						actionHandler = premadeToggleHandler;
						$toggleLink = $toggle.on( 'click.mw-collapsible keypress.mw-collapsible', actionHandler )
							.prop( 'tabIndex', 0 );
					}
				}
			}

			$( this ).data( 'mw-collapsible', {
				collapse: function () {
					actionHandler.call( $toggleLink.get( 0 ), null, { instantHide: true, wasCollapsed: false } );
				},
				expand: function () {
					actionHandler.call( $toggleLink.get( 0 ), null, { instantHide: true, wasCollapsed: true } );
				},
				toggle: function () {
					actionHandler.call( $toggleLink.get( 0 ), null, null );
				}
			} );

			// Initial state
			if ( options.collapsed || $collapsible.hasClass( 'mw-collapsed' ) ) {
				// One toggler can hook to multiple elements, and one element can have
				// multiple togglers. This is the sanest way to handle that.
				actionHandler.call( $toggleLink.get( 0 ), null, { instantHide: true, wasCollapsed: false } );
			}

		} );

		/**
		 * Fired after collapsible content has been initialized
		 *
		 * This gives an option to modify the collapsible behavior.
		 *
		 * @event wikipage_collapsibleContent
		 * @member mw.hook
		 * @param {jQuery} $content All the elements that have been made collapsible
		 */
		mw.hook( 'wikipage.collapsibleContent' ).fire( this );

		return this;
	};

	/**
	 * @class jQuery
	 * @mixins jQuery.plugin.makeCollapsible
	 */

}( jQuery, mediaWiki ) );