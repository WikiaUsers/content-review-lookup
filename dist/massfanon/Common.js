/* Any JavaScript here will be loaded for all users on every page load. */

/* <pre><nowiki> */

// *******************************************************************************************************
// ******************************** BEGINNING: JavaScript for [[Special:Upload]] *************************
// ******** Code courtesy of "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]] ********
// ******************************************** Thanks, Pinky! *******************************************
// *******************************************************************************************************
 
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("==Summary==\r{{Information\r|attention=\r|description=\r|source=\r|author=\r|filespecs=\r|licensing=\r|other versions=\r}}"));
 
}
addOnloadHook (preloadUploadDesc)
 
// *******************************************************************************************************
// *********************************** END: JavaScript for [[Special:Upload]] ****************************
// *******************************************************************************************************

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

/* <pre style="overflow: scroll; height: 25em"><nowiki> */

/*
    This file is a collection of reusable functions from Wookieepedia.
*/

/*
    This global variable specifies if client-side persistent storage is available. Currently, only Firefox 2 supports this specification. On Wookieepedia, this global storage is used to store information about which infoboxes are hidden.
*/
window.storagePresent = (typeof(globalStorage) != 'undefined');

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

function storePageName()
{
    window.pageName = wgPageName;
}


/* </nowiki></pre> */

// BEGIN JavaScript title rewrite

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE )
		return;
	var titleDiv = document.getElementById('title-meta');

	if( titleDiv == null )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	var node = firstHeading.childNodes[0];

	// new, then old!
	firstHeading.replaceChild(cloneNode, node);
	cloneNode.style.display = "inline";

	var titleAlign = document.getElementById('title-align');
	firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}
addOnloadHook( rewriteTitle );


/* </nowiki></pre> */