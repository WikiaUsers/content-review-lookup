/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre style="overflow: scroll; height: 25em"><nowiki> */

/*
    This file is a collection of reusable functions from Wookieepedia.
*/

/*
    This global variable specifies if client-side persistent storage is available. Currently, only Firefox 2 supports this specification. On Wookieepedia, this global storage is used to store information about which infoboxes are hidden.
*/
window.storagePresent = (typeof(globalStorage) != 'undefined');

/*
    Stores the (unmodified) page title.
*/
function storePageName()
{
    window.pageName = getFirstHeading().childNodes[0].nodeValue.trim();
}

/*
    Adds a trim method to string variables.
*/
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };

/*
    Searches an array for an element and returns its index, or -1 if it's not in the array.
*/
function arrayFind(array, value)
{
    for(var i = 0; i < array.length; i++)
    {
        if(array[i] == value)
            return i;
    }
	
    return -1;
}

/*
    Removes the first occurrence of an element in an array, if it is there.
*/
function arrayRemove(array, value)
{
    var i = arrayFind(array, value);
	
    if(i != -1)
        array.splice(i, 1);
}

/*
	the ContentLoader class to encapsulate "creative differences" with XHR
	
    Usage:
        - construct a ContentLoader object: var loader = new ContentLoader();
        - set necessary state parameters (via fields); e.g. loader.myvar = 'mytext';
        - set the callback: loader.callback = myfunc;
        - send the request:
            loader.send(url, postdata = null, contentType = 'application/x-www-form-urlencoded');
            (if postdata isn't null or omitted, POST is used, otherwise GET)
        - the callback function is called when the content is loaded
            - the ContentLoader object is this
            - the raw response data is this.text
            - the XML DOM object, if any, is this.document
*/
function ContentLoader()
{
    this.cache = true;
}

ContentLoader.prototype.enableCache = function(caching)
{
    this.cache = (caching == null) ? true : this.cache;
}

ContentLoader.prototype.createRequest = function()
{
	if(typeof(XMLHttpRequest) != 'undefined')
	{
		return new XMLHttpRequest();
	}
	else if(typeof(ActiveXObject) != 'undefined')
	{
		return new ActiveXObject("Msxml2.XMLHTTP");
	}
	
	return null;
}

ContentLoader.prototype.send = function(url, postdata, contentType)
{
	var method = (postdata == null) ? 'GET' : 'POST';
	this.request = this.createRequest();
	this.request.open(method, url);

	if(!this.cache)
		this.request.setRequestHeader( "If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT" );

	var request = this.request;
	var loader = this;
	
	if(postdata == null)
	{
	    if(contentType == null)
	        contentType = 'application/x-www-form-urlencoded';
	
	    request.setRequestHeader('Content-type', contentType);
	}
	
	var f = function()
    {
    	if(request.readyState == 4)
    	{
    		loader.text = request.responseText;
    		loader.document = request.responseXML;
    		request = null;
    		loader.request = null;
    		loader.callback();
    	}
    }
	
	this.request.onreadystatechange = f;
	this.request.send(postdata);
}
/*
	end ContentLoader
*/

/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
function getElementsByClass(searchClass, node, tag)
{
	var classElements = new Array();

	if(node == null)
		node = document;

	if(tag == null)
		tag = '*';

	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);

	for(i = 0, j = 0; i < elsLen; i++)
	{
		if(tester.isMatch(els[i]))
		{
			classElements[j] = els[i];
			j++;
		}
	}
    
	return classElements;
}

function ClassTester(className)
{
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function(element)
{
    return this.regex.test(element.className);
}
/*
    end getElementsByClass
*/

/*
    Returns the parameter as it appears in the query string. Equivalent to $_GET[p] in PHP.
*/
function queryString(p) 
{
    var re = RegExp('[&?]' + p + '=([^&]*)');
    var matches;

    if(matches = re.exec(document.location))
    {
        try
        {
            return decodeURI(matches[1]);
        }
        catch(e) { }
    }

    return null;
}
/*
    end temporary per-page unique CSS (Splarka)
*/

/*
    Dynamically load a combobox's content by pagename (e. g. Template:Stdsummaries)
    The page should be of the same format as http://starwars.wikia.com/wiki/Template:Stdsummaries
*/
function requestComboFill(id, page)
{
    var loader = new ContentLoader();
    loader.comboID = id;
    loader.callback = onComboDataArrival;
    loader.send('/index.php?title=' + page + '&action=raw&ctype=text/plain');
}

function onComboDataArrival()
{
    fillCombo(this.text, this.comboID);
}

function fillCombo(text, comboid)
{
    var combo = document.getElementById(comboid);
    var lines = text.split("\n");

    for(var i = 0; i < lines.length; i++)
    {
        var value = lines[i].indexOf("-- ") == 0 ? lines[i].substring(3) : "";
        var option = document.createElement('option');
        option.setAttribute('value', value);
        option.appendChild(document.createTextNode(lines[i]));
        combo.appendChild(option);
    }
}
/*
    end combo fill code
*/

/*
    Loads the current source of the page "pagename" (as stored in the database)
    and inserts it at the cursor position
*/
function doPreload(pagename)
{
    var loader = new ContentLoader();
    loader.callback = onPreloadArrival;
    loader.send('/index.php?title=' + pagename + '&action=raw&ctype=text/plain');
}

function insertAtCursor(myField, myValue)
{
    //IE support
    if (document.selection)
    {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA/NETSCAPE support
    else if(myField.selectionStart || myField.selectionStart == '0')
    {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
        + myValue
        + myField.value.substring(endPos, myField.value.length);
    }
    else
    {
        myField.value += myValue;
    }
}

function onPreloadArrival()
{
    insertAtCursor(document.getElementById('wpTextbox1'), this.text);
}
/*
    end preload code
*/

/*
    Returns h1.firstHeading (the page title element).
*/
function getFirstHeading()
{
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements != null && elements.length > 0) ? elements[0] : null;
}

/*
    Returns the element's nearest parent that has the specified CSS class.
*/
function getParentByClass(className, element)
{
    var tester = new ClassTester(className);
    var node = element.parentNode;
    
    while(node != null && node != document)
    {
        if(tester.isMatch(node))
            return node;
            
        node = node.parentNode;
    }
    
    return null;
}

/*
    Makes the image on the search form, if one is present, point to the search page
    instead of the Wikia main page.
*/
function rewriteSearchFormLink()
{
    var links = document.getElementById('searchform').getElementsByTagName('a');
    
    if(links.length > 0)
        links[0].href = "/index.php?title=Special:Search&adv=1";
}

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername()
{
    var spans = getElementsByClass('insertusername', null, 'span');

    for(var i = 0; i < spans.length; i++)
    {
        spans[i].innerHTML = wgUserName;
    }
}

/*
    Performs dynamic hover class rewriting to work around the IE6 :hover bug
    (needs CSS changes as well)
*/
function rewriteHover()
{
  var gbl = document.getElementById("hover-global");

  if(gbl == null)
      return;

  var nodes = getElementsByClass("hoverable", gbl);

  for (var i = 0; i < nodes.length; i++) {
    nodes[i].onmouseover = function() {
      this.className += " over";
    }
    nodes[i].onmouseout = function() {
      this.className = this.className.replace(new RegExp(" over\\b"), "");
    }
  }
}

/*
    to call in onload hooks
*/
function initFunctionsJS()
{
    storePageName();
}

/* </nowiki></pre> */

/* 
////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE NAVIGATION TEMPLATE COLLAPSABLE
////////////////////////////////////////////////////////////////
*/

 // ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

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



/* 
/////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE DROPDOWN FOR MEDIAWIKI:EDITTOOLS
/////////////////////////////////////////////////////////////////
*/

/* </pre>
==addLoadEvent==
<pre> */
function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}

/* </pre>
===addOnloadHook===
<pre> */
//use both names for it, for Wikipedia compatability (just in case)
function addOnloadHook(f) {
  addLoadEvent(f);
}

/* </pre>

==Cookies==
<pre> */

//Cookie helpers
function setCookie(cookieName, cookieValue) {
 var today = new Date();
 var expire = new Date();
 var nDays = 30;
 expire.setTime( today.getTime() + (3600000 * 24 * nDays) );
 document.cookie = cookieName + "=" + escape(cookieValue)
                 + ";path=/w"
                 + ";expires="+expire.toGMTString();
 document.cookie = cookieName + "=" + escape(cookieValue)
                 + ";path=/wiki"
                 + ";expires="+expire.toGMTString();
}

function getCookie(cookieName) {
  var start = document.cookie.indexOf( cookieName + "=" );
  if ( start == -1 ) return "";
  var len = start + cookieName.length + 1;
  if ( ( !start ) &&
    ( cookieName != document.cookie.substring( 0, cookieName.length ) ) )
      {
        return "";
      }
  var end = document.cookie.indexOf( ";", len );
  if ( end == -1 ) end = document.cookie.length;
  return unescape( document.cookie.substring( len, end ) );
}

function deleteCookie(cookieName) {
  if ( getCookie(cookieName) ) {
    document.cookie = cookieName + "=" + ";path=/w" +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    document.cookie = cookieName + "=" + ";path=/wiki" +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
  }
}

/* </pre>
==addCharSubsetMenu==
<pre> */
/* add menu for selecting subsets of special characters */
/***** must match MediaWiki:Edittools *****/
function addCharSubsetMenu() {
  var edittools = document.getElementById('editpage-specialchars');

  if (edittools) {
    var menu = "<select id=\"charSubsetControl\" style=\"display:inline\" onChange=\"chooseCharSubset(selectedIndex)\">";
    menu += "<option>Edit Tools</option>";
    menu += "<option>Latin/Roman</option>";
    menu += "<option>Miscellaneous</option>";
    menu += "<option>Wiki Markup</option>";
    menu += "<option>Special Characters</option>";
    menu += "<option>Admin Templates</option>";
    menu += "</select>";
    edittools.innerHTML = menu + edittools.innerHTML;

    /* default subset from cookie */
    var s = parseInt( getCookie('edittoolscharsubset') );
    if ( isNaN(s) ) s = 0;

    /* update dropdown control to value of cookie */
    document.getElementById('charSubsetControl').selectedIndex = s; 

    /* display the subset indicated by the cookie */
    chooseCharSubset( s );
  }
}

/* </pre>
===chooseCharSubsetMenu===
<pre> */
/* select subsection of special characters */
function chooseCharSubset(s) {
  var l = document.getElementById('editpage-specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
  setCookie('edittoolscharsubset', s);
}



/* </pre>
==addHelpToolsMenu==
<pre> */
/* add menu for selecting help info */
/***** must match MediaWiki:Edittools *****/
function addHelpToolsMenu() {
  var edittools = document.getElementById('editpage-helpmenu');

  if (edittools) {
    var menu = "<select id=\"helpControl\" style=\"display:inline\" onChange=\"chooseHelpTools(selectedIndex)\">";
    menu += "<option>Help Topics</option>";
    menu += "<option>Naming Conventions</option>";
    menu += "<option>Template Help</option>";
    menu += "<option>Image Help</option>";
    menu += "<option>Miscellaneous</option>";
    menu += "<option>Asking Questions</option>";
    menu += "</select>";
    edittools.innerHTML = menu + edittools.innerHTML;

    /* default subset from cookie */
    var s = parseInt( getCookie('edittoolshelpmenu') );
    if ( isNaN(s) ) s = 0;

    /* update dropdown control to value of cookie */
    document.getElementById('helpControl').selectedIndex = s; 

    /* display the subset indicated by the cookie */
    chooseHelpTools( s );
  }
}

/* </pre>
===chooseHelpToolsMenu===
<pre> */
/* select subsection of special characters */
function chooseHelpTools(s) {
  var l = document.getElementById('editpage-helpmenu').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
  setCookie('edittoolshelpmenu', s);
}


/* 
//////////////////////////////////////////////////////////////////
// THE BELOW CODE EXECUTES EVERYTHING ON PAGELOAD EVENT (REQUIRED)
//////////////////////////////////////////////////////////////////
*/
/* </pre>
==customizeWiki==
<pre> */
/* do any Wiki customizations */
function customizeWiki() {
  addCharSubsetMenu();
  addHelpToolsMenu();
  addDigg();
}

addLoadEvent(customizeWiki);


/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/3/3e/Small_Button.png",
     "speedTip": "Small",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Insert text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"}
}

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
     "speedTip": "Insert character template",
     "tagOpen": "\{\{Character Template\r| Image                   = ",
     "tagClose": "\r| ImageText               = \r| RealName                = \r| CurrentAlias            = \r| Distinguish1            = \r| Distinguish2            = \r| Aliases                 = \r| Identity                = \r| Alignment               = \r| Affiliation             = \r| Relatives               = \r| Universe                = \r| BaseOfOperations        = \r\r| Gender                  = \r| Height                  = \r| Weight                  = \r| Eyes                    = \r| Hair                    = \r| UnusualFeatures         = \r\r| Citizenship             = \r| MaritalStatus           = \r| Occupation              = \r| Education               = \r\r| Origin                  = \r| PlaceOfBirth            = \r| Creators                = \r| First                   = \r\r| HistoryText             = \r\r| Powers                  = \r| Abilities               = \r| Strength                = \r| Weaknesses              = \r\r| Equipment               = \r| Transportation          = \r| Weapons                 = \r\r| Notes                   = \r| Trivia                  = \r| Marvel                  = \r| Wikipedia               = \r| Links                   = \r\}\}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png",
     "speedTip": "Insert comic template",
     "tagOpen": "\{\{Comic Template\r| Image               = ",
     "tagClose": "\r| Month               = \r| Year                = \r\r| Editor-in-Chief     = \r| CoverArtist1        = \r\r| Editor1_1           = \r| Writer1_1           = \r| Penciler1_1         = \r| Inker1_1            = \r| Colourist1_1        = \r| Letterer1_1         = \r\r| Quotation           = \r| Speaker             = \r\r| StoryTitle1         = \r| Synopsis1           = \r\r| Appearing1 = \r'''Featured Characters:'''\r* <br/>\r'''Supporting Characters:'''\r* <br/>\r'''Villains:'''\r* <br/>\r'''Other Characters:'''\r* <br/>\r'''Locations:'''\r* <br/>\r'''Items:'''\r* <br/>\r'''Vehicles:'''\r* <br/>\r\r| Notes               = \r| Trivia              = \r| Recommended         = \r| Links               = \r\}\}",
     "sampleText": ""}

}