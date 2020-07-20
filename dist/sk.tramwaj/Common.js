//<source lang="javascript">
 
/* Import more specific scripts if necessary */
 
if (wgAction == "edit" || wgAction == "submit") //scripts specific to editing pages
{
    importScript("MediaWiki:Common.js/edit.js")
}
else if (wgPageName == "Špeciálne:Watchlist") //watchlist scripts
{
    importScript("MediaWiki:Common.js/watchlist.js")
}
else if (wgPageName == "Špeciálne:Search") //scripts specific to Special:Search
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
 
if (wgServer == "https://sk.wikipedia.org" || "https://secure.wikimedia.org") {
  var metaBase = "https://meta.wikimedia.org";
} else {
  var metaBase = "http://meta.wikimedia.org";
}
importScriptURI(metaBase+"/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400")
 
 
/**
 * Load scripts specific to Internet Explorer
 */
if ( $.client.profile().name === 'msie' ) {
    importScript( 'MediaWiki:Common.js/IEFixes.js' );
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
    var langbox = document.getElementById("p-lang");
    if (!langbox) return;
    var interwiki = langbox.getElementsByTagName("li");
    // iterace přes všechny mezijazykové odkazy
    for (var i = 0; i < interwiki.length; ++i)
    {
        var link = interwiki[i];
        var language = link.className.substring(10); // smazat "interwiki-"
        // zkusit najít odpovídající FA nebo GA element
        var falink = document.getElementById("fa-link-" + language);
        if (falink)
        {
            link.className += " featured";
            link.title = "Tento článok je ohodnotený ako perfektný v inej jazykovej verzii.";
        } else {
            var galink = document.getElementById("ga-link-" + language);
            if (galink)
            {
                link.className += " good";
                link.title = "Tento článok je ohodnotený ako dobrý v inej jazykovej verzii.";
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
var collapseCaption = "skry";
var expandCaption = "rozbaľ";
 
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
 
 
/** Main Page layout fixes *********************************************************
 *
 *  Description: Adds an additional link to the complete list of languages available.
 *  Maintainers: [[User:AzaToth]], [[User:R. Koot]], [[User:Alex Smotrov]]
 */
 
function mainPageAppendCompleteListLink() {
    addPortletLink('p-lang', '//meta.wikimedia.org/wiki/List_of_Wikipedias',
                   'Úplný zoznam', 'interwiki-completelist', 'Zoznam všetkých jazykových verzií Wikipédie')
}
 
if ((wgTitle == 'Hlavná stránka' && wgNamespaceNumber == 0)) {
    addOnloadHook(mainPageAppendCompleteListLink);
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
 
 
/** Anon tips and donation banner **************************
  *
  *  Description: This implements an anon tips / donation banner. It includes a workaround for
  *               the Z-index bug found in Internet Explorer. It correctly places the anon notice
  *               on the page, even under IE6. See this Google search for more information about the bug:
  *               http://www.google.com/search?q=z-index+ie6+bug
  *  Maintainers: [[User:Gmaxwell]], [[User:MZMcBride]]
  */
 
if(wgUserName == null && skin == 'monobook') addOnloadHook((function (){
    var message=new Array();
        message[0]='Your <a href="//wikimediafoundation.org/wiki/Fundraising?source=enwiki_00" class="extiw" title="wikimedia:Fundraising"><b>continued donations</b></a> keep Wikipedia running!';
        message[1]='<a href="//wikimediafoundation.org/wiki/Fundraising?source=enwiki_01" class="extiw" title="foundation:Fundraising"><b>Make a donation</b></a> to Wikipedia and give the gift of knowledge!';
        message[2]='Wikipedia is sustained by people like you. Please <a href="//wikimediafoundation.org/wiki/Fundraising?source=enwiki_02" class="extiw" title="foundation:fundraising"><b>donate</b></a> today.';
        message[3]='Help us improve Wikipedia by <a href="//wikimediafoundation.org/wiki/Fundraising?source=enwiki_03" class="extiw" title="foundation:Fundraising"><b>supporting it financially</b></a>.';
        message[4]='You can <a href="//wikimediafoundation.org/wiki/Fundraising?source=enwiki_04" class="extiw" title="wikimedia:Fundraising"><b>support Wikipedia</b></a> by making a tax-deductible donation.'
        message[5]='Help us provide free content to the world by <a href="//wikimediafoundation.org/wiki/Fundraising?source=enwiki_05" class="extiw" title="foundation:Fundraising"><b>donating today</b></a>!';
        message[6]='<a href="//en.wikipedia.org/wiki/Wikipedia:Researching_with_Wikipedia" title="Wikipedia:Researching with Wikipedia">Learn more about using Wikipedia for research.</a>';
        message[7]='<a href="//en.wikipedia.org/wiki/Wikipedia:Ten_things_you_may_not_know_about_Wikipedia" title="Wikipedia:Ten things you may not know about Wikipedia">Ten things you may not know about Wikipedia.</a>';
        message[8]='<a href="//en.wikipedia.org/wiki/Wikipedia:Ten_things_you_may_not_know_about_images_on_Wikipedia" title="Wikipedia:Ten things you may not know about images on Wikipedia">Ten things you may not know about images on Wikipedia.</a>';
        message[9]='<a href="//en.wikipedia.org/wiki/Wikipedia:Citing_Wikipedia" title="Wikipedia:Citing Wikipedia">Learn more about citing Wikipedia.</a>';
        message[10]='Have questions? <a href="//en.wikipedia.org/wiki/Wikipedia:Questions" title="Wikipedia:Questions">Find out how to ask questions and get answers.</a>';
        message[11]='<a href="//en.wikipedia.org/wiki/Wikipedia:Basic_navigation" title="Wikipedia:Basic navigation">Find out more about navigating Wikipedia and finding information.</a>';
        message[12]='<a href="//en.wikipedia.org/wiki/Wikipedia:Contributing_to_Wikipedia" title="Wikipedia:Contributing to Wikipedia">Interested in contributing to Wikipedia?</a>';
    var weightLimit = 6;
    var biasPercent = 0.815;
    var whichMessage = (Math.random() < biasPercent) ? weightLimit : message.length;
 
    whichMessage = Math.floor(Math.random() * whichMessage);
 
    var wrapper = document.getElementById("globalWrapper");
    if (wrapper) {
        var div = document.createElement('div');
        div.id = "anon-banner";
        div.style.cssText = "position:absolute; z-index:40; left:155px; top:1px; clear:both; float:left; font-size:90%; font-style:italic; white-space:nowrap";
        div.innerHTML = message[whichMessage];
        wrapper.insertBefore(div, wrapper.firstChild);
    }
}));
 
 
/** Secure upload link fix ************************************************
  *
  *  Description: Fix "Upload file" link when using the secure proxy.
  *               This is a workaround that can be removed when [[bugzilla:10843]] is fixed.
  *  Maintainers: [[User:Remember the dot]]
  */
 
addOnloadHook(function()
{
    if (document.getElementById("t-upload"))
    {
        document.getElementById("t-upload").getElementsByTagName("a")[0].href = wgArticlePath.replace("$1", "Wikipedia:Upload")
    }
})
 
 
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
	 jsMsg('<table><tr><td><img src="//upload.wikimedia.org/'
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
 
//////////////////////////////////////////////////////////////////////////////////
////////// Funkcie neinportovane z anglickej wikipedie ///////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
 
 /*
  * Položka "Nahrať na Commons" v ponuke nástroje
  * zdroj: //cs.wikipedia.org/wiki/MediaWiki:Common.js
  */
 
 function addCommonsUpload ()
 {
   nodUpload = document.getElementById ("t-upload");
 
   if (nodUpload)
   {
     var nodToolsList = nodUpload.parentNode;
     var nodUploadCommons_li = document.createElement ("li");
     var nodUploadCommons_a = document.createElement ("a");
 
     nodUploadCommons_li.id = "t-upload-commons";
     nodUploadCommons_a.href = "//commons.wikimedia.org/wiki/Special:UploadWizard?uselang=sk";
 
     nodUploadCommons_a.appendChild (document.createTextNode ("Nahrať na Commons"));
     nodUploadCommons_li.appendChild (nodUploadCommons_a);
 
     nodToolsList.insertBefore (nodUploadCommons_li, nodUpload.nextSibling);
   }
 }
 
 addOnloadHook( addCommonsUpload );
 
 /*
  * Nový nahrávací formulár
  * zdroj: //cs.wikipedia.org/wiki/MediaWiki:Common.js
  */
 
  function EasyUpload()
 {
   uploadLink = document.getElementById("t-upload");
   if (!uploadLink) return;
 
   a = uploadLink.firstChild;
   a.setAttribute('href', '/wiki/Pomoc:Nahrať_súbor');
 }
 
 addOnloadHook( EasyUpload );
 
 /*
  * Predvyplnenie popisu súboru
  * zdroj: //cs.wikipedia.org/wiki/MediaWiki:Common.js
  */
 
  function PrefillUploadDescription ()
  {
  if (wgPageName == "Špeciálne:Upload")
    document.getElementById ("wpUploadDescription").value="{{Informácia o súbore\n  | Popis =\n  | Zdroj =\n  | Dátum =\n  | Autor =\n  | Povolenie =\n  | Iné verzie =\n}}";
  }
 
 addOnloadHook( PrefillUploadDescription );
 
 
/**
 * Šablóna:Album obrázkov
 */
function toggleImage(group, remindex, shwindex) {
  document.getElementById("ImageGroupsGr"+group+"Im"+remindex).style.display="none";
  document.getElementById("ImageGroupsGr"+group+"Im"+shwindex).style.display="inline";
}
 
function imageGroup(){
  if (document.URL.match(/printable/g)) return;
  var bc=document.getElementById("bodyContent");
  if( !bc ) bc = document.getElementById("mw_contentholder");
  if( !bc ) return;
  var divs=bc.getElementsByTagName("div");
  var i = 0, j = 0;
  var units, search;
  var currentimage;
  var UnitNode;
  for (i = 0; i < divs.length ; i++) {
    if (divs[i].className != "ImageGroup") continue;
    UnitNode=undefined;
    search=divs[i].getElementsByTagName("div");
    for (j = 0; j < search.length ; j++) {
      if (search[j].className != "ImageGroupUnits") continue;
      UnitNode=search[j];
      break;
    }
    if (UnitNode==undefined) continue;
    units=Array();
    for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
      var temp = UnitNode.childNodes[j];
      if (temp.className=="center") units.push(temp);
    }
    for (j = 0 ; j < units.length ; j++) {
      currentimage=units[j];
      currentimage.id="ImageGroupsGr"+i+"Im"+j;
      var imghead = document.createElement("div");
      var leftlink;
      var rightlink;
      if (j != 0) {
        leftlink = document.createElement("a");
        leftlink.href = "javascript:toggleImage("+i+","+j+","+(j-1)+");";
        leftlink.innerHTML="◀";
      } else {
        leftlink = document.createElement("span");
        leftlink.innerHTML="&nbsp;";
      }
      if (j != units.length - 1) {
        rightlink = document.createElement("a");
        rightlink.href = "javascript:toggleImage("+i+","+j+","+(j+1)+");";
        rightlink.innerHTML="▶";
      } else {
        rightlink = document.createElement("span");
        rightlink.innerHTML="&nbsp;";
      }
      var comment = document.createElement("tt");
      comment.innerHTML = "("+ (j+1) + "/" + units.length + ")";
      with(imghead) {
        style.fontSize="110%";
        style.fontweight="bold";
        appendChild(leftlink);
        appendChild(comment);
        appendChild(rightlink);
      }
      currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      if (j != 0) currentimage.style.display="none";
    }
  }
}
 
addOnloadHook(imageGroup);
 
 
//</source>
 
/*
=== Odkaz na pieskovisko ===
 
; autor: [[pl:Wikipedysta:Herr Kriss]]
*/
 
var disableSandboxLink = 0;	// ustawienie tego na 1 lub true w swoim monobook.js pozwoli wyłączyć tę funkcjonalność
 
addOnloadHook(function()
{
	if (wgUserName != null && disableSandboxLink == 0)
	{
		var caption = 'Moje pieskovisko'
		if (wgUserLanguage != 'sk')
			caption = 'My sandbox';
 
		addPortletLink('p-personal', wgServer + wgScript + '?title=Special:Mypage/pieskovisko', caption, 'pt-sandbox', caption, '', document.getElementById('pt-preferences'));
	}
});
 
/* OSM gadget */
var osm_proj_map = 'Mapa...';  // "map" link caption in project language
var osm_proj_lang = 'sk';      // project language
 
var metaBase = "//meta.wikimedia.org";
 
mw.loader.load(metaBase+'/w/index.php?title=MediaWiki:OSM.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400');