/* <pre style="overflow:scroll; height:25em"><nowiki> */

/* 
**    This file is a collection of reusable functions
*/

/* the ContentLoader class to encapsulate "creative differences" with XHR
	
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
/* end ContentLoader
*/

/* Returns the parameter as it appears in the query string. Equivalent to $_GET[p] in PHP.
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
    if( combo == null ) {
        return;
    }

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
function rewriteSearchFormLink() {
	if( $('#searchform').length == 0 ) {
		return;
	}
	var links = document.getElementById('searchform').getElementsByTagName('a');

	if( links.length > 0 ) {
		links[0].href = wgScriptPath + '/index.php?title=Special:Search&adv=1';
	}
}

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername() {
	$('.insertusername').html(wgUserName);
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