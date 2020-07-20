/* <pre><nowiki> */

/* changes the background image based on the window width */
var defaultBgIsActive = true;

function switchBgImage() {
  var winWidth = 0;
  var defaultBgImage = "url(https://images.wikia.nocookie.net/jamescameronsavatar/images/3/36/Oasis_Background_2_1280.jpg)";
  var wideBgImage = "url(https://images.wikia.nocookie.net/jamescameronsavatar/images/a/aa/Oasis_Background_2_1280_wide.jpg)";
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    winWidth = window.innerWidth;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    winWidth = document.documentElement.clientWidth;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    winWidth = document.body.clientWidth;
  }
  if ( winWidth > 0 ) {
    if (winWidth > 1350 && defaultBgIsActive) {
      // switch to widescreen background
      document.body.style.backgroundImage = wideBgImage;
      defaultBgIsActive = false;
    } else if (winWidth <= 1350 && !defaultBgIsActive) {
      // switch to default background
      document.body.style.backgroundImage = defaultBgImage
      defaultBgIsActive = true;
    }
  }
}

if ( skin == "oasis" ) {
  if (window.addEventListener) window.addEventListener("resize",switchBgImage,false);
  else if (window.attachEvent) window.attachEvent("onresize",switchBgImage);
  switchBgImage();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* code for enabling Flash-based embedded MP3 streams */
function loadStreamPlayers(radioplayers) {
  for (var i = 0; i < radioplayers.length; i++) {
    var radioplayer = radioplayers[i];
    var radioparams = radioplayer.innerHTML;
    radioplayer.innerHTML = '<iframe src="'+unescape('\x68\x74\x74\x70\x3A\x2F\x2F\x77\x65\x62\x6D\x61\x73\x74\x65\x72\x66\x69\x6C\x65\x73\x2E\x64\x65\x2F\x6E\x61\x74\x69\x76\x65\x72\x61\x64\x69\x6F\x2F\x72\x61\x64\x69\x6F\x2D\x73\x6D\x61\x6C\x6C\x2E\x70\x68\x70\x3F')+radioparams+'" width="200" height="50" scrolling="no" frameborder="0" />';
    radioplayer.style.display = 'inline';
  }
}

function onLoadStreamPlayers() {
  loadStreamPlayers(getElementsByClassName('streamplayer'));
  if (typeof(wgUserName) != 'undefined' && wgUserName != null) {
    loadStreamPlayers(getElementsByClassName('loggedinstreamplayer'));
  }
}

if (window.addEventListener) window.addEventListener("load",onLoadStreamPlayers,false);
else if (window.attachEvent) window.attachEvent("onload",onLoadStreamPlayers);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// IRC CHAT

function onloadhookcustom() {
  var replace = document.getElementById("chat");
  if (null != replace) {

    replace.innerHTML='<applet width="640" height="400" code="IRCApplet.class" archive="irc.jar,pixx.jar"  codebase="http://irc.byte-storm.com/"><param name="nick" value="AvatarWiki???"/><param name="alternatenick" value="Guest???"/><param name="name" value="WebChat User"/><param name="host" value="irc.quakenet.org"/><param name="gui" value="pixx"/><param name="command1" value="/join #Avatar_Wiki"/><param name="command2" value="/clear"/><param name="quitmessage" value="Webchat"/><param name="pixx:timestamp" value="true"/><param name="autoconnection" value="false"><param name="pixx:nickfield" value="true"/><param name="style:highlightlinks" value="true"/><param name="pixx:setfontonstyle" value="true"/><param name="pixx:styleselector" value="true"/><param name="style:link" value=":link: http://img148.imageshack.us/img148/6707/copyoflinkkm3.png)"> <h1>No java support</h1><p><font color="green">Sorry, but you need a Java 1.4.x-enabled browser to use the Avatar Wiki Chatroom.</font></p></applet>';
  }
}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);



function startchat() {
  var nick = document.getElementById("webchatnick");
  var replace = document.getElementById("webchat");

  if (null != replace && nick.value != '') {

    replace.innerHTML='<applet width="640" height="400" code="IRCApplet.class" archive="irc.jar,pixx.jar"  codebase="http://irc.byte-storm.com/"><param name="nick" value="'+nick.value+'"/><param name="alternatenick" value="Guest???"/><param name="name" value="WebChat User"/><param name="host" value="irc.quakenet.org"/><param name="gui" value="pixx"/><param name="command1" value="/join #Avatar_Wiki"/><param name="command2" value="/clear"/><param name="quitmessage" value="Webchat"/><param name="pixx:timestamp" value="true"/><param name="autoconnection" value="true"><param name="pixx:nickfield" value="true"/><param name="style:highlightlinks" value="true"/><param name="pixx:setfontonstyle" value="true"/><param name="pixx:styleselector" value="true"/><param name="style:link" value=":link: http://img148.imageshack.us/img148/6707/copyoflinkkm3.png)"> <h1>No java support</h1><p><font color="green">Sorry, but you need a Java 1.4.x-enabled browser to use the Avatar Wiki Chatroom.</font></p></applet>';
  }
  return false;
}

function onloadhookwebchat() {
  var replace = document.getElementById("webchat");
  if (null != replace) {
    replace.innerHTML='<form onsubmit="return startchat();"><input type="text" id="webchatnick" name="webchatnick" /><input type="submit" value="Login" /></form>';
  }
}

if (window.addEventListener) window.addEventListener("load",onloadhookwebchat,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookwebchat);

/////////////////////////////////////////////////////////////////////////////////////

/* Add "History" and "What links here" link  the "edit" dropdown menu. */

/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

if (getElementsByClassName("wikia-menu-button")[0] && getElementsByClassName("wikia-menu-button")[0].getElementsByTagName("ul")[0]) {
  var articleActionList = getElementsByClassName("wikia-menu-button")[0].getElementsByTagName("ul")[0];
  var historyLink = '<li><a href="/index.php?title=' + wgPageName  + '&amp;action=history" accesskey="h" data-id="history">History</a></li>';
  var whatLinksHereLink = '<li><a href="/wiki/Special:WhatLinksHere/' + wgPageName  + '" accesskey="w" data-id="whatlinkshere">What links here</a></li>';
  var purgeLink = '<li><a href="/index.php?title=' + wgPageName  + '&amp;action=purge" accesskey="p" data-id="purge">Purge Cache</a></li>';

  articleActionList.innerHTML = /* historyLink + */ articleActionList.innerHTML + whatLinksHereLink + purgeLink;
}

/////////////////////////////////////////////////////////////////////////////////////

/* Toggling of images in infoboxes */

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
            case "":
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


function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}

if (window.addEventListener) window.addEventListener("load",toggleInit,false);
else if (window.attachEvent) window.attachEvent("onload",toggleInit);

/////////////////////////////////////////////////////////////////////////////////////

function showEras(className)
{
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;

    var titleDiv = document.getElementById(className);

    if(titleDiv == null || titleDiv == undefined)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}

function getDescendantById(p, id)
{
	var childNodes = p.all ? p.all : p.getElementsByTagName("*");
	for(var i = 0, len = childNodes.length; i < len; i++)
		if(childNodes[i].id == id)
			return childNodes[i];
	return null;
}


function getFirstHeading()
{
    var elements = null;
    if (skin == 'oasis') {
      var content = document.getElementById('WikiaMainContent');
      var elements = getDescendantById(content, 'WikiaPageHeader').getElementsByTagName('h1');
    } else {
      var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    }
    return (elements != null && elements.length > 0) ? elements[0] : null;
}

function moveRating()
{
    var elements = getElementsByClass('ratings-top', document.getElementById('content'), 'div');
    if(elements[0] == null || elements[0] == undefined)
        return;
    var cloneNode = elements[0].cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}


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

function substUsernameTOC() {
	var toc = document.getElementById('toc');
	var userpage = document.getElementById('pt-userpage');
    
	if( !userpage || !toc )
		return;
        
	var username = userpage.firstChild.firstChild.nodeValue;
	var elements = getElementsByClass('toctext', toc, 'span');

	for( var i = 0; i < elements.length; i++ )
		elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
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

moveRating();
showEras('title-linktabs');
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AUTO REFRESHING RECENT CHANGES AND WATCHLIST
// Code courtesy of "pcj" of WoWWiki.

// WHAT IT DOES
// The code adds a checkbox at the top of Special:RecentChanges and Special:Watchlist, next to the header.
// Ticking this sets a cookie (specific to each wiki) and starts updating the list.
// This occurs silently every 60 seconds without a full page reload occurring.

///////////////////////////////////////////////////////////////////////////////////////////////////////////


ajaxPages="Special:RecentChanges,Special:Watchlist,";

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
document.getElementsByTagName("h1")[0].innerHTML += '&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">AJAX:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
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

//rcURL = 'http://disneyparks.wikia.com/index.php?title=Special:RecentChanges&from=20080930151557&days=30&limit=500&hideminor=0';

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
document.getElementById("bodyContent").innerHTML = updatedText + document.getElementById("bodyContent").innerHTML;
rcTimer = setTimeout("loadRCData();", rcRefresh);
}
}

if (ajaxPages.indexOf(wgPageName)!=-1) { addOnloadHook(preloadAJAXRC); }

/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide/code.js', 'dev')

///////////////////////////////////////////////////////////////////////////////////////////////////////////


// END OF CODE