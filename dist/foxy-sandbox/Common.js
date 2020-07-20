/*</pre>*/

/** JS placed here will be applied to all skins */

//<source lang="javascript">

//Div Element for CardTable

function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe width="670" height="800" scrolling="no" src="http://widget.mibbit.com/?settings=43ea784413839f98229eab44e44c8842&server=irc.mibbit.net&channel=%23MHwikichatroom"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);

//Global vars
window.mcw = {};
window.mcw.baseURL = '/';
window.mcw.wikiURL = '/wiki/';

/* Variables for interface text used throughout the script, for ease of translating */
mcw.i18n = {
	// Collapsible tables and page loader
	hideText: 'hide',
	showText: 'show',
	
	// Grid
	gridPrefix: 'Grid',
	gridModsURL: 'Mods',
	
	// Page loader
	loadErrorTitle: 'An error occurred loading the content',
	
	// File upload
	defaultLicense: 'License'
};

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[wikipedia:Wikipedia:NavFrame]].
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
 *  Description: See [[wikipedia:Wikipedia:NavFrame]].
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
/*** end copied from [[wikipedia:MediaWiki:Common.js]] ***/

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

function setCookie(c_name,value,expiredays) {
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=");
if (c_start!=-1) { 
c_start=c_start + c_name.length+1;
c_end=document.cookie.indexOf(";",c_start);
if (c_end==-1) c_end=document.cookie.length;
return unescape(document.cookie.substring(c_start,c_end));
}
}
return "";
}

 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
$("div.NavFrame").each(function (i) {
NavToggleText = ($(this).children(".NavPic:visible,.NavContent:visible").length>0)?nbh:nbs;
$(this).children(".NavHead").append('<a href="javascript:toggleNavigationBar('+i+');" id="NavToggle'+i+'" class="NavToggle">'+NavToggleText+'</a>');
$(this).attr("id","NavFrame"+i);
});
}
 
// extract a URL parameter from the current URL
// From wikipedia:User:Lupin/autoedit.js
// paramName  : the name of the parameter to extract

function getParamValue(paramName) {
var cmdRe=RegExp( '[&?]' + paramName + '=([^&]*)' );
var h = document.location.href;
var m=cmdRe.exec(h);
if (m) {
try {
return decodeURIComponent(m[1]);
} catch (someError) {}
}
return null;
}

// &withJS= URL parameter
// Allow to try custom scripts on the MediaWiki namespace without
// editing [[Special:Mypage/myskin.js]]
// from Wikipedia

{
var extraJS = getParamValue("withJS");
if (extraJS) importScript(extraJS);
}

// patching in changes to table sorting and alt rows
function changeTS() {
window['ts_alternate'] = function (table) {
$(table).find("tbody").find("tr:odd").removeClass("alt");
$(table).find("tbody").find("tr:even").addClass("alt");
}
window['ts_makeSortable'] = function (table) {
if ($(table).find("tr").length>0) firstRow = ($(table).find("th").length>0)?$(table).find("tr:has(th)").eq(0):$(table).find("tr").eq(0);
if (!firstRow) return;
firstRow.children(":not('.unsortable')").append('&nbsp;&nbsp;<a href="javascript:;" class="sortheader" onclick="ts_resortTable(this); return false;"><span class="sortarrow"><img src="'+ts_image_path+ts_image_none+'" alt="&darr;"/></span></a>');
if (ts_alternate_row_colors) ts_alternate(table);
}
}

function requireImageLicense() {
if (wgPageName == "Special:Upload" && getParamValue("wpDestFile") == null) {
$wpu = $("#mw-upload-form").find("[name=wpUpload]").not("#wpUpload");
$wpu.attr("disabled","true");
$("#wpLicense").change(function () {
if ($("#wpLicense").val()) {
$wpu.removeAttr("disabled");
} else {
$wpu.attr("disabled","true");
}
});
}
}

function sortDays(a, b) {
return b.substring(b.indexOf(";")+1)-a.substring(a.indexOf(";")+1);
}

function loadGSList(){
if ($("#gslist").length>0) {
var timestamp = 0;
var today = new Date();
var tsDate = new Date();
var dateRE = /(\d{4})-(\d\d)-(\d\d).*/;
var pArr = new Array();
$.getJSON("http://www.wowwiki.com/api.php?action=query&generator=categorymembers&gcmlimit=500&gcmsort=timestamp&gcmdir=desc&gcmtitle=Category:Guild_stubs&prop=revisions&rvprop=timestamp&format=json&callback=?", function(data) {
if (data.query) {
pages = data.query.pages;
for (pageID in pages) {
timestamp = pages[pageID].revisions[0].timestamp;
dateREd = dateRE.exec(timestamp);
tsDate.setFullYear(dateREd[1],dateREd[2]-1,dateREd[3]);
daysElapsed = Math.round((today - tsDate) / 86400000);
pArr[pArr.length] = pages[pageID].title + ";" + daysElapsed;
}
pArr2 = pArr.sort(sortDays);
gslBuffer = "<ul>";
for (n in pArr2) {
guild = pArr2[n].substring(0,pArr2[n].indexOf(";"));
daysE = pArr2[n].substring(pArr2[n].indexOf(";")+1);
daysE = (daysE < 0)?0:daysE;
daysE = (daysE > 29)?'<span style="color:red;">('+daysE+' days)</span>':'('+daysE+' days)';
gslBuffer += '<li><a href="/'+guild+'" title="'+guild+'">'+guild+'</a> ' + daysE + ' - <a href="/'+guild+'?action=history">History</a> &bull; <a href="/'+guild+'?action=delete">Delete</a></li>';
}
gslBuffer += "</ul>";
$("#gslist").html(gslBuffer);
}
});
}
}

// AJAX RC
var ajaxPages = new Array("Special:RecentChanges");
var ajaxRCOverride = false;
var rcTimer;
var doRefresh = true;
var rcRefresh = 60000;
ajaxRCCookie = (getCookie("ajaxRC")=="on"||ajaxRCOverride) ? true:false;

function ajaxRC() {
appTo = ($("#WikiaPageHeader").length)?$("#WikiaPageHeader"):$(".firstHeading");
appTo.append('&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">AJAX:</span><input type="checkbox" id="ajaxToggle"><span style="position:relative; top:5px; left:5px;" id="ajaxRCprogress"><img src="https://images.wikia.nocookie.net/__cb20080505054258/wowwiki/images/0/0e/Progressbar.gif" border="0" alt="AJAX operation in progress" /></span>');
$("#ajaxRCprogress").bind("ajaxSend", function (){
$(this).show();
}).bind("ajaxComplete", function (){
$(this).hide();
});
$("#ajaxToggle").click(toggleRC);
$("#ajaxRCprogress").hide();
$("#ajaxToggle").attr("checked", ajaxRCCookie);
if (ajaxRCCookie) loadRCData();
}

function toggleRC() {
if ($("#ajaxToggle").attr("checked") == true) {
setCookie("ajaxRC", "on", 30);
doRefresh = true;
loadRCData();
} else {
setCookie("ajaxRC", "off", 30);
doRefresh = false;
clearTimeout(rcTimer);
}
}

function loadRCData() {
cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
$(cC).load(location.href + " "+cC, function (data) { 
if (doRefresh) rcTimer = setTimeout("loadRCData();", rcRefresh);
});
}

 
mcw.animation = function() {
	/**
	 * Element animator
	 *
	 * Will cycle the active class on any child elements
	 * within an element with the animated class.
	 */
	if ( mcw.animate === undefined && $( '.animated' ).length ) {
		mcw.animate = setInterval( function() {
			$( '.animated' ).each( function() {
				var current = $( this ).find( '.active' ).removeClass( 'active' ), next = current.next();
				if ( !current.next().length ) {
					next = $( this ).children().eq( 0 );
				}
				next.addClass( 'active' );
			} );
		}, 2000 );
	}
	
	
	/**
	 * Frame loader 
	 * 
	 * Loads a semi-colon (;) separated list of images
	 * to be animated by the element animator
	 * 
	 * Has special support for [[Template:Grid]]
	 */
	var $animate = $( '.animated' ), size = {}, fileNamespace = mw.config.get( 'wgFormattedNamespaces' )[6];
	if ( $animate.length ) {
		$animate.each( function() {
			var imgs = $( this ).data( 'imgs' ), imgSize = $( this ).data( 'img-size' ),
				grid = $( this ).closest( '.grid' ), mod = $( this ).data( 'mod' );
			
			if ( !imgs ) {
				return true;
			}
			if ( grid.length ) {
				grid = true;
				imgSize = '32x32';
			} else {
				grid = false;
				if ( imgSize ) {
					imgSize = imgSize.split( 'x' );
					imgSize[0] = imgSize[0].replace( /[\D ]/, '' );
					imgSize[1] = imgSize[1].replace( /[\D ]/, '' );
					
					if ( imgSize[1] ) {
						imgSize[0] += 'x' + imgSize[1];
					}
					
					imgSize = imgSize[0];
				} else {
					imgSize = '';
				}
			}
			
			if ( size[imgSize] === undefined ) {
				size[imgSize] = [];
			}
			
			imgs = imgs.split( ';' );
			imgs.shift();
			$.each( imgs, function() {
				if ( !this.trim() ) {
					return true;
				}
				
				var parts, name;
				if ( grid ) {
					if ( this.indexOf( ':' ) > -1 ) {
						parts = $.map( this.split( /[:,]+/ ), $.trim );
						if ( parts[0].toLowerCase() === 'v' || parts[0].toLowerCase() === 'vanilla' ) {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[1] + '.png';
						} else {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[1] + ' (' + parts[0] + ').png';
						}
					} else {
						parts = $.map( this.split( ',' ), $.trim );
						if ( !mod ) {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[0] + '.png';
						} else {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[0] + ' (' + mod + ').png';
						}
					}
					
					if ( size[imgSize].indexOf( name ) < 0 ) {
						size[imgSize].push( name );
					}
				} else if ( size[imgSize].indexOf( fileNamespace + ':' + this.trim() ) < 0 ) {
					size[imgSize].push( fileNamespace + ':' + this.trim() );
				}
			} );
		} );
		
		var redirectPromise = [], urlPromise = [], redirects = {}, urls = {};
		$.each( size, function( size ) {
			var titles = this;
			if ( !titles ) {
				return true;
			}
			
			// Split titles up into blocks of 50, which is the API's title limit for standard users
			for ( var i = 0; i < titles.length; i += 50 ) { ( function() {
				var section = titles.slice( i, i + 50 ).join( '|' );
			
				redirectPromise.push(
					// Thanks to bug 23750 (https://bugzilla.wikimedia.org/show_bug.cgi?id=23750)
					// &redirects doesn't work properly with prop=imageinfo. Some of the images
					// will return without any imageinfo, even though they are valid.
					// So the redirects have to be resolved in a separate request...
					$.ajax( {
						type: 'POST',
						url: '/api.php?action=query&format=json&redirects',
						data: { titles: section },
						timeout: 20000
					} ).done( function( data ) {
						if ( data.query.redirects ) {
							$.each( data.query.redirects, function() {
								redirects[this.to] = this.from;
								section = section.replace( this.from, this.to );
							} );
						}
						
						var thumburl = '', sizes = size.split( 'x' );
						if ( sizes[0] ) {
							thumburl = '&iiurlwidth=' + sizes[0];
							
							if ( sizes[1] ) {
								thumburl += '&iiurlheight=' + sizes[1];
							}
						}
						urlPromise.push(
							$.ajax( {
								type: 'POST',
								url: '/api.php?action=query&format=json&prop=imageinfo&iiprop=url' + thumburl,
								data: { titles: section },
								timeout: 20000
							} ).done( function( data ) {
								$.each( data.query.pages, function( index ) {
									if ( index < 0 ) {
										return true;
									}
									if ( !this.imageinfo ) {
										mw.log( 'Imageinfo is empty' );
										return true;
									}
									
									var url = this.imageinfo[0].thumburl || this.imageinfo[0].url;
									if ( redirects.hasOwnProperty( this.title ) ) {
										urls[redirects[this.title].replace( new RegExp( fileNamespace + ':(.*)' ), '$1' ) + size] = url;
									} else {
										urls[this.title.replace( new RegExp( fileNamespace + ':(.*)' ), '$1' ) + size] = url;
									}
								} );
							} ).fail( function( error ) {
								mw.log( error );
							} )
						);
					} ).fail( function( error ) {
						mw.log( error );
					} )
				);
			} )(); }
		} );
		
		$.when.apply( $, redirectPromise ).then( function() {
			$.when.apply( $, urlPromise ).then( function() {
				$animate.each( function() {
					var imgs = $( this ).data( 'imgs' ), imgSize = $( this ).data( 'img-size' ), html = '',
						grid = $( this ).closest( '.grid' ), mod = $( this ).data( 'mod' );
					
					if ( !imgs ) {
						return true;
					}
					if ( grid.length ) {
						grid = true;
						imgSize = '32x32';
					} else {
						grid = false;
						if ( imgSize ) {
							imgSize = imgSize.split( 'x' );
							imgSize[0] = imgSize[0].replace( /[\D ]/, '' );
							imgSize[1] = imgSize[1].replace( /[\D ]/, '' );
							
							if ( imgSize[1] ) {
								imgSize[0] += 'x' + imgSize[1];
							}
							
							imgSize = imgSize[0];
						} else {
							imgSize = '';
						}
					}
					
					imgs = imgs.split( ';' );
					imgs.shift();
					$.each( imgs, function() {
						if ( !this.trim() ) {
							if ( grid ) {
								html += '<span class="image">&nbsp;</span>';
							}
							return true;
						}
						
						var parts, name, link, url, num;
						if ( grid ) {
							if ( this.indexOf( ':' ) > -1 ) {
								parts = $.map( this.split( /[:,]+/ ), $.trim );
								if ( parts[0].toLowerCase() === 'v' || parts[0].toLowerCase() === 'vanilla' ) {
									name = link = parts[1];
									url = urls[mcw.i18n.gridPrefix + ' ' + parts[0] + '.png' + imgSize];
									num = parts[2];
								} else {
									name = parts[1] + ' (' + parts[0] + ')';
									link = mcw.i18n.gridModsURL + '/' + parts[0] + '/' + parts[1];
									url = urls[mcw.i18n.gridPrefix + ' ' + name + '.png' + imgSize];
									num = parts[2];
								}
							} else {
								parts = $.map( this.split( ',' ), $.trim );
								if ( !mod ) {
									name = link = parts[0];
									url = urls[mcw.i18n.gridPrefix + ' ' + parts[0] + '.png' + imgSize];
									num = parts[1];
								} else {
									name = parts[0] + ' (' + mod + ')';
									link = mcw.i18n.gridModsURL + '/' + mod + '/' + parts[0];
									url = urls[mcw.i18n.gridPrefix + ' ' + name + '.png' + imgSize];
									num = parts[1];
								}
							}
							
							html += '<span class="image">';
							if ( name ) {
								if ( url ) {
									html += '<a title="' + link + '" href="/' + link.replace( / /g, '_' ) + '"><img width="32" height="32" src="' + url + '" alt="' + name + '"></a>';
									if ( num ) {
										html += '<span class="number"><a title="' + link + '" href="/' + link.replace( / /g, '_' ) + '">' + num + '</a></span>';
									}
								} else {
									html += '<a class="new" title="' + fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + name + '.png" href="/index.php?title=Special:Upload&wpDestFile=' + mcw.i18n.gridPrefix + '_' + name.replace( / /g, '_' ) + '.png"></a>';
								}
							} else {
								html += '&nbsp;';
							}
							html += '</span>';
						} else {
							name = this.trim();
							html += '<span>';
							if ( urls[name + imgSize] ) {
								html += '<a href="/' + fileNamespace + ':' + name.replace( / /g, '_' ) + '"><img src="' + urls[name + imgSize] + '" alt="' + name + '"></a>';
							} else {
								html += '<a class="new" title="' + fileNamespace + ':' + name + '" href="/index.php?title=Special:Upload&wpDestFile=' + name.replace( / /g, '_' ) + '">' + fileNamespace + ':' + name + '</a>';
							}
							html += '</span>';
						}
					} );
					
					$( this ).append( html ).data( 'imgs', null );
				} );
			} );
		} );
	}
};
mcw.animation();
 
 
/**
 * Pause grid GUI templates (e.g. [[Template:Grid/Crafting Table]]) on mouseover
 *
 * This is so people have a chance to look at each image on the cell
 * and click on pages they want to view.
 */
$( 'body' ).delegate( '.grid, .grid-Crafting_Table, .grid-furnace, .grid-Brewing_Stand', {
	'mouseenter': function() { 
		$( this ).find( '.animated' ).removeClass( 'animated' ).addClass( 'paused' );
	},
	'mouseleave': function() {
		$( this ).find( '.paused' ).removeClass( 'paused' ).addClass( 'animated' );
	}
} );
 
 
/**
 * Add fake last-child class in navboxes for IE8
 */
if ( $.client.profile().name === 'msie' && $.client.profile().versionBase === '8' ) {
	$( '.navbox-list li:last' ).addClass( 'last-child' );
}

/**
 * Creates minecraft style tooltips
 *
 * Replaces normal tooltips. Supports minecraft [[formatting codes]] (except k), and a description with line breaks (/).
 * Use mcw.useNativeMinetip = true to use normal tooltips, with the description added
 */

/**mcw.minetip = {
	// Add normal minetip events, removing legacy tooltip
	create: function() {
		var tooltip;
		
		$( '#mw-content-text' ).on( {
			'mouseenter.minetip': function( e ) {
				var $elem = $( this ),
					title = $elem.data( 'minetip-title' ),
					description = $elem.data( 'minetip-text' );
				
				if ( title === undefined ) {
					// Use title attribute of the element or the first link directly under it
					title = $elem.attr( 'title' ) || $elem.find( '> a:first' ).attr( 'title' );
					
					if ( title ) {
						// Set the retrieved title as data for future use
						$elem.data( 'minetip-title', title );
					} else {
						return;
					}
				}
				
				$elem.add( '*', $elem ).filter( '[title]' ).removeAttr( 'title' );
				
				if ( title === 0 ) {
					return;
				}
				
				var text = '<span class="title">' + title + '&f</span>';
				if ( description ) {
					text += '\n<span class="description">' +
						description.replace( /\\\//g, '&#47;' ).replace( /\//g, '<br>' ) +
						'&f</span>';
				}
				
				if ( !$( '#minetip-tooltip' ).length ) {
					$( 'body' ).append( '<div id="minetip-tooltip"/>' );
				}
				tooltip = $( '#minetip-tooltip' );
				
				// Add classes for minecraft formatting codes
				while ( text.match( /&[0-9a-el-o]/ ) ) {
					text = text.replace( /&([0-9a-el-o])(.*?)(&f|$)/g, '<span class="format-$1">$2</span>&f' );
				}
				// Remove reset formatting
				text = text.replace( /&f/g, '' );
				
				tooltip.html( text );
				
				// Trigger a mouse movement to position the tooltip
				$elem.trigger( 'mousemove', e );
			},
			'mousemove.minetip': function( e, trigger ) {
				if ( !$( '#minetip-tooltip' ).length ) {
					$( this ).trigger( 'mouseenter' );
					return;
				}
				
				// Get event data from remote trigger
				e = trigger || e;
				
				var top = e.clientY - 34,
					left = e.clientX + 14,
					width = tooltip.outerWidth( true ),
					height = tooltip.outerHeight( true ),
					
					$win = $( window ),
					winWidth = $win.width(),
					winHeight = $win.height();
				
				// If going off the right of the screen, go to the left of the cursor
				if ( left + width > winWidth ) {
					left -= width + 36;
				}
				
				// If now going off to the left of the screen, resort to going below the cursor
				if ( left < 0 ) {
					left = 0;
					top += 82;
					
					// Go above the cursor if too low
					if ( top + height > winHeight ) {
						top -= 77 + height;
					}
				// Don't go off the top of the screen
				} else if ( top < 0 ) {
					top = 0;
				// Don't go off the bottom of the screen
				} else if ( top + height > winHeight ) {
					top = winHeight - height;
				}
				
				// Apply the positions
				tooltip.css( {
					top: top,
					left: left
				} );
			},
			'mouseleave.minetip': function() {
				if ( !tooltip ) {
					return;
				}
				
				tooltip.remove();
			}
		}, '.minetip, .grid .image' ).off( '.minetipNative' );
	},
	// Remove all events
	destroy: function() {
		$( '#mw-content-text' ).off( '.minetip .minetipNative' );
		$( '#minetip-tooltip' ).remove();
	},
	// Add native browser tooltip events, removing normal minetip
	native: function() {
		$( '#mw-content-text' ).on( 'mouseenter.minetipNative', '.minetip, .grid .image', function() {
			var title = $( this ).data( 'minetip-title' ),
				description = $( this ).data( 'minetip-text' ),
				existingTitle = $( this ).attr( 'title' ) || $( this ).find( '> a:first' ).attr( 'title' );
			
			if ( title || title === 0 || $( this ).attr( 'title' ) ) {
				// Remove titles within so they don't interfere
				$( this ).find( '[title]' ).removeAttr( 'title' );
			}
			
			if ( title === 0 ) {
				$( this ).removeAttr( 'title' );
				return;
			} else if ( !title && ( !existingTitle || !description ) ) {
				return;
			} else if ( !title && existingTitle ) {
				$( this ).data( 'minetip-title', existingTitle );
			}
			
			var text = title || existingTitle;
			if ( description ) {
				text += '\n' + description;
			}
			
			// Remove formatting
			text = text.replace( /&([0-9a-fl-o])/g, '' )
				.replace( /\\\//g, '&#47;' )
				.replace( /\//g, '\n' )
				.replace( /&#47;/g, '/' );
			
			$( this ).attr( 'title', text );
		} ).off( '.minetip' );
	}
};

if ( mcw.useNativeMinetip ) {
	mcw.minetip.native();
} else {
	mcw.minetip.create();
}
*/

/*</pre>*/